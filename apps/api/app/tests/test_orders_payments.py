"""Orders, Checkout, and Razorpay Payments Subsystem Unit and Integration Tests."""
import uuid
from decimal import Decimal
from datetime import datetime, timezone
import pytest
from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

from app.core.database import Base
from app.domains.auth.models import User, Role, UserRole
from app.domains.internships.models import InternshipProgram, Batch, Application, Enrollment
from app.domains.store.models import Category, Product, SKU, Inventory
from app.domains.orders.models import Order, OrderItem
from app.domains.payments.models import Payment, PaymentEvent, Refund

from app.domains.orders.schemas import OrderCreateRequest, OrderItemRequest, AddressSchema
from app.domains.orders.services import (
    create_order,
    get_order_by_id,
    get_order_by_number,
    list_user_orders,
    update_order_status,
)
from app.domains.payments.schemas import PaymentVerifyRequest
from app.domains.payments.services import (
    initiate_razorpay_order,
    verify_razorpay_payment,
    handle_webhook_event,
    generate_tax_invoice_data,
)


@pytest.fixture
async def async_orders_db():
    """In-memory async SQLite engine with schema and test customer, SKU, and inventory seeded."""
    engine = create_async_engine("sqlite+aiosqlite:///:memory:")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    AsyncSession = async_sessionmaker(bind=engine, expire_on_commit=False)
    async with AsyncSession() as session:
        # Create Customer User
        customer = User(
            id=uuid.uuid4(),
            email="customer.sharma@example.com",
            full_name="Aarav Sharma",
            phone="+919876543210",
            is_active=1,
        )
        session.add(customer)

        # Create Category & Product
        category = Category(
            id=uuid.uuid4(),
            name="IoT & Robotics Development Kits",
            slug="iot-robotics",
            description="Student microcontrollers",
        )
        session.add(category)
        await session.flush()

        product = Product(
            id=uuid.uuid4(),
            category_id=category.id,
            slug="smps-iot-dev-kit",
            name="SMPS IoT & Edge Computing Kit",
            brand_line="SMPS EduTech",
            short_description="ESP32-S3 IoT developer kit.",
            description="Hands-on sensor experiments kit.",
            specifications_json={"mcu": "ESP32-S3"},
            is_published=True,
        )
        session.add(product)
        await session.flush()

        # SKU 1: In-Stock IoT Kit (Price: 3499.00, Tax: 18%, Stock: 20)
        sku1 = SKU(
            id=uuid.uuid4(),
            product_id=product.id,
            sku_code="SMPS-KIT-IOT01",
            title="SMPS IoT Development Kit (Standard)",
            price_inr=Decimal("3499.00"),
            hsn_code="84715000",
            tax_rate_percent=Decimal("18.00"),
            weight_kg=Decimal("0.75"),
            is_active=True,
        )
        session.add(sku1)
        await session.flush()

        inv1 = Inventory(
            sku_id=sku1.id,
            quantity_available=20,
            quantity_reserved=0,
            low_stock_threshold=5,
        )
        session.add(inv1)

        # SKU 2: Limited Stock (Only 2 units)
        sku2 = SKU(
            id=uuid.uuid4(),
            product_id=product.id,
            sku_code="SMPS-KIT-IOT-PRO",
            title="SMPS IoT Development Kit (Pro Edition)",
            price_inr=Decimal("5999.00"),
            hsn_code="84715000",
            tax_rate_percent=Decimal("18.00"),
            weight_kg=Decimal("1.10"),
            is_active=True,
        )
        session.add(sku2)
        await session.flush()

        inv2 = Inventory(
            sku_id=sku2.id,
            quantity_available=2,
            quantity_reserved=0,
            low_stock_threshold=2,
        )
        session.add(inv2)
        await session.commit()

        yield {
            "session": session,
            "customer": customer,
            "sku1": sku1,
            "sku2": sku2,
            "inv1": inv1,
            "inv2": inv2,
        }

    await engine.dispose()


@pytest.mark.asyncio
async def test_create_order_success(async_orders_db):
    """Test cart order creation, exact GST calculation, and stock reservation."""
    db = async_orders_db["session"]
    customer = async_orders_db["customer"]
    sku1 = async_orders_db["sku1"]

    shipping = AddressSchema(
        recipient_name="Aarav Sharma",
        phone="+919876543210",
        street_line1="12th Main Road, Indiranagar",
        city="Bengaluru",
        state="Karnataka",
        postal_code="560038",
        country="IN",
    )

    payload = OrderCreateRequest(
        items=[OrderItemRequest(sku_id=sku1.id, quantity=2)],
        shipping_address=shipping,
        billing_address=shipping,
    )

    order = await create_order(db=db, user_id=customer.id, payload=payload)
    assert order is not None
    assert order.status == "CREATED"
    assert order.order_number.startswith("SMPS-ORD-")
    assert len(order.items) == 1

    # Calculation assertions:
    # Subtotal = 3499.00 * 2 = 6998.00
    # Tax (18%) = 6998.00 * 0.18 = 1259.64
    # Shipping = 0.00 (order > 2000)
    # Total = 6998.00 + 1259.64 = 8257.64
    assert order.subtotal_inr == Decimal("6998.00")
    assert order.tax_inr == Decimal("1259.64")
    assert order.shipping_fee_inr == Decimal("0.00")
    assert order.total_inr == Decimal("8257.64")

    # Inventory reservation assertions
    inv = await db.get(Inventory, sku1.id)
    assert inv.quantity_available == 18  # 20 - 2
    assert inv.quantity_reserved == 2    # 0 + 2


@pytest.mark.asyncio
async def test_create_order_insufficient_stock_fails(async_orders_db):
    """Test that requesting more units than available raises 400 Insufficient inventory."""
    db = async_orders_db["session"]
    customer = async_orders_db["customer"]
    sku2 = async_orders_db["sku2"]  # only 2 available

    shipping = AddressSchema(
        recipient_name="Aarav Sharma",
        phone="+919876543210",
        street_line1="12th Main Road",
        city="Bengaluru",
        state="Karnataka",
        postal_code="560038",
    )

    payload = OrderCreateRequest(
        items=[OrderItemRequest(sku_id=sku2.id, quantity=5)],  # Requests 5
        shipping_address=shipping,
        billing_address=shipping,
    )

    with pytest.raises(HTTPException) as exc:
        await create_order(db=db, user_id=customer.id, payload=payload)
    assert exc.value.status_code == 400
    assert "Insufficient inventory" in exc.value.detail


@pytest.mark.asyncio
async def test_order_cancellation_releases_stock(async_orders_db):
    """Test that cancelling an order restores reserved inventory back to available stock."""
    db = async_orders_db["session"]
    customer = async_orders_db["customer"]
    sku1 = async_orders_db["sku1"]

    shipping = AddressSchema(
        recipient_name="Aarav Sharma",
        phone="+919876543210",
        street_line1="12th Main",
        city="Bengaluru",
        state="Karnataka",
        postal_code="560038",
    )
    payload = OrderCreateRequest(
        items=[OrderItemRequest(sku_id=sku1.id, quantity=3)],
        shipping_address=shipping,
        billing_address=shipping,
    )

    order = await create_order(db=db, user_id=customer.id, payload=payload)
    inv = await db.get(Inventory, sku1.id)
    assert inv.quantity_available == 17  # 20 - 3
    assert inv.quantity_reserved == 3

    # Cancel order
    cancelled_order = await update_order_status(
        db=db,
        order_id=order.id,
        new_status="CANCELLED",
        actor_id=customer.id,
    )
    assert cancelled_order.status == "CANCELLED"

    # Inventory must be released
    await db.refresh(inv)
    assert inv.quantity_available == 20
    assert inv.quantity_reserved == 0


@pytest.mark.asyncio
async def test_initiate_razorpay_order(async_orders_db):
    """Test generating a Razorpay gateway order for a newly created checkout order."""
    db = async_orders_db["session"]
    customer = async_orders_db["customer"]
    sku1 = async_orders_db["sku1"]

    shipping = AddressSchema(
        recipient_name="Aarav Sharma",
        phone="+919876543210",
        street_line1="Indiranagar",
        city="Bengaluru",
        state="Karnataka",
        postal_code="560038",
    )
    order = await create_order(
        db=db,
        user_id=customer.id,
        payload=OrderCreateRequest(
            items=[OrderItemRequest(sku_id=sku1.id, quantity=1)],
            shipping_address=shipping,
            billing_address=shipping,
        ),
    )

    rzp_res = await initiate_razorpay_order(
        db=db,
        reference_type="ORDER",
        reference_id=order.id,
        user_id=customer.id,
    )

    assert rzp_res is not None
    assert rzp_res.gateway == "RAZORPAY"
    assert rzp_res.gateway_order_id.startswith("order_rzp_")
    assert rzp_res.amount_inr == order.total_inr
    assert rzp_res.currency == "INR"


@pytest.mark.asyncio
async def test_verify_razorpay_payment_success(async_orders_db):
    """Test verifying payment transitions order to PAID and releases reservation."""
    db = async_orders_db["session"]
    customer = async_orders_db["customer"]
    sku1 = async_orders_db["sku1"]

    shipping = AddressSchema(
        recipient_name="Aarav Sharma",
        phone="+919876543210",
        street_line1="Indiranagar",
        city="Bengaluru",
        state="Karnataka",
        postal_code="560038",
    )
    order = await create_order(
        db=db,
        user_id=customer.id,
        payload=OrderCreateRequest(
            items=[OrderItemRequest(sku_id=sku1.id, quantity=2)],
            shipping_address=shipping,
            billing_address=shipping,
        ),
    )

    rzp_order = await initiate_razorpay_order(
        db=db,
        reference_type="ORDER",
        reference_id=order.id,
        user_id=customer.id,
    )

    # Verify payment
    verify_req = PaymentVerifyRequest(
        payment_id=rzp_order.payment_id,
        gateway_order_id=rzp_order.gateway_order_id,
        gateway_payment_id="pay_test_998877",
        gateway_signature="test_signature_valid",
    )

    verified_payment = await verify_razorpay_payment(
        db=db,
        payload=verify_req,
        user_id=customer.id,
    )

    assert verified_payment.status == "SUCCESS"
    assert verified_payment.gateway_payment_id == "pay_test_998877"

    # Order must transition to PAID
    reloaded_order = await get_order_by_id(db, order.id)
    assert reloaded_order.status == "PAID"

    # Inventory reserved counter finalized
    inv = await db.get(Inventory, sku1.id)
    assert inv.quantity_reserved == 0


@pytest.mark.asyncio
async def test_idempotent_webhook_processing(async_orders_db):
    """Test webhook deduplication ensures exact-once processing."""
    db = async_orders_db["session"]
    event_id = "evt_test_unique_9988"

    payload_data = {
        "event": "payment.captured",
        "payload": {
            "payment": {
                "entity": {
                    "id": "pay_test_wh_123",
                    "order_id": "order_rzp_mock",
                    "amount": 825764,
                }
            }
        },
    }

    # First event delivery
    event1 = await handle_webhook_event(
        db=db,
        event_id=event_id,
        event_type="payment.captured",
        payload_data=payload_data,
    )
    assert event1 is not None
    assert event1.event_id == event_id

    # Duplicate delivery with same event_id
    event2 = await handle_webhook_event(
        db=db,
        event_id=event_id,
        event_type="payment.captured",
        payload_data=payload_data,
    )
    # Must return existing event without error or duplication
    assert event2.id == event1.id


@pytest.mark.asyncio
async def test_generate_tax_invoice_data(async_orders_db):
    """Test compliant Indian GST invoice generation with CGST, SGST, and HSN codes."""
    db = async_orders_db["session"]
    customer = async_orders_db["customer"]
    sku1 = async_orders_db["sku1"]

    shipping = AddressSchema(
        recipient_name="Aarav Sharma",
        phone="+919876543210",
        street_line1="12th Main Road",
        city="Bengaluru",
        state="Karnataka",
        postal_code="560038",
    )
    order = await create_order(
        db=db,
        user_id=customer.id,
        payload=OrderCreateRequest(
            items=[OrderItemRequest(sku_id=sku1.id, quantity=1)],
            shipping_address=shipping,
            billing_address=shipping,
        ),
    )

    invoice = await generate_tax_invoice_data(db=db, order_id=order.id)
    assert invoice is not None
    assert invoice["supplier"]["gstin"] == "29AABCS1429B1Z2"
    assert invoice["buyer"]["name"] == "Aarav Sharma"
    assert invoice["is_intra_state"] is True
    assert len(invoice["items"]) == 1
    assert invoice["items"][0]["hsn_code"] == "84715000"
    assert Decimal(invoice["summary"]["total_invoice_amount_inr"]) == order.total_inr
