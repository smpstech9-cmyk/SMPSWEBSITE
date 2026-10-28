"""Hardware Store & E-Commerce Subsystem Unit and Integration Tests."""
import uuid
from decimal import Decimal
import pytest
from fastapi import HTTPException
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

from app.core.database import Base
from app.domains.auth.models import User, Role, UserRole
from app.domains.internships.models import InternshipProgram, Batch, Application, Enrollment
from app.domains.orders.models import Order, OrderItem
from app.domains.payments.models import Payment, PaymentEvent
from app.domains.store.models import Category, Product, SKU, Inventory

from app.domains.store.schemas import ProductCreateRequest, SKUCreateRequest, ProductUpdateRequest
from app.domains.store.services import (
    list_categories,
    get_category_by_slug,
    list_products,
    get_product_by_slug,
    get_product_by_id,
    admin_create_product,
    admin_update_product,
    admin_adjust_inventory,
)


@pytest.fixture
async def async_store_db():
    """In-memory async SQLite engine with schema and initial store catalog seeded."""
    engine = create_async_engine("sqlite+aiosqlite:///:memory:")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    AsyncSession = async_sessionmaker(bind=engine, expire_on_commit=False)
    async with AsyncSession() as session:
        # Create Admin User
        admin_user = User(
            id=uuid.uuid4(),
            email="admin.store@smpstechlab.com",
            full_name="Store Admin",
            is_active=1,
        )
        session.add(admin_user)

        # Create Category
        bess_category = Category(
            id=uuid.uuid4(),
            name="Battery Energy Storage Systems",
            slug="bess",
            description="Commercial energy storage units",
            icon_name="BatteryCharging",
        )
        iot_category = Category(
            id=uuid.uuid4(),
            name="IoT & Robotics Kits",
            slug="iot-robotics",
            description="Student microcontrollers and dev kits",
            icon_name="Bot",
        )
        session.add_all([bess_category, iot_category])
        await session.flush()

        # Create Products
        purna = Product(
            id=uuid.uuid4(),
            category_id=bess_category.id,
            slug="purna-bess-50kwh",
            name="PURNA BESS™ 50kWh Commercial System",
            brand_line="PURNA BESS™",
            short_description="50kWh LFP commercial battery container.",
            description="High safety liquid-cooled commercial battery storage unit.",
            specifications_json={"capacity": "50 kWh", "chemistry": "LFP"},
            primary_image_url="/images/products/purna-bess.jpg",
            is_published=True,
        )
        session.add(purna)
        await session.flush()

        purna_sku1 = SKU(
            id=uuid.uuid4(),
            product_id=purna.id,
            sku_code="SMPS-PURNA-50",
            title="PURNA BESS 50kWh Standard Unit",
            price_inr=Decimal("1450000.00"),
            hsn_code="85076000",
            tax_rate_percent=Decimal("18.00"),
            weight_kg=Decimal("650.00"),
            is_active=True,
        )
        session.add(purna_sku1)
        await session.flush()

        inv1 = Inventory(
            sku_id=purna_sku1.id,
            quantity_available=4,
            quantity_reserved=0,
            low_stock_threshold=2,
        )
        session.add(inv1)

        # Create IoT Kit Product (Out of Stock SKU demo)
        iot_kit = Product(
            id=uuid.uuid4(),
            category_id=iot_category.id,
            slug="smps-iot-dev-kit",
            name="SMPS IoT & Edge Computing Kit",
            brand_line="SMPS EduTech",
            short_description="ESP32-S3 IoT developer kit.",
            description="Hands-on sensor experiments kit.",
            specifications_json={"mcu": "ESP32-S3", "sensors": "14 modules"},
            primary_image_url="/images/products/iot-kit.jpg",
            is_published=True,
        )
        session.add(iot_kit)
        await session.flush()

        iot_sku = SKU(
            id=uuid.uuid4(),
            product_id=iot_kit.id,
            sku_code="SMPS-KIT-IOT",
            title="SMPS IoT Starter Edition",
            price_inr=Decimal("3499.00"),
            hsn_code="84715000",
            tax_rate_percent=Decimal("18.00"),
            weight_kg=Decimal("0.75"),
            is_active=True,
        )
        session.add(iot_sku)
        await session.flush()

        inv2 = Inventory(
            sku_id=iot_sku.id,
            quantity_available=0,  # Currently out of stock
            quantity_reserved=0,
            low_stock_threshold=5,
        )
        session.add(inv2)

        # Create Draft Unpublished Product
        draft = Product(
            id=uuid.uuid4(),
            category_id=bess_category.id,
            slug="unreleased-prototype-bess",
            name="Unreleased Prototype BESS",
            brand_line="PURNA BESS™",
            short_description="Confidential next-gen storage.",
            description="Internal development unit.",
            specifications_json={"capacity": "1 MWh"},
            is_published=False,
        )
        session.add(draft)
        await session.commit()

        yield {
            "session": session,
            "admin_user": admin_user,
            "bess_category": bess_category,
            "iot_category": iot_category,
            "purna": purna,
            "purna_sku1": purna_sku1,
            "iot_kit": iot_kit,
            "iot_sku": iot_sku,
        }

    await engine.dispose()


@pytest.mark.asyncio
async def test_list_categories(async_store_db):
    """Test category listing returns alphabetical list of categories."""
    db = async_store_db["session"]
    categories = await list_categories(db)
    assert len(categories) == 2
    category_slugs = [c.slug for c in categories]
    assert "bess" in category_slugs
    assert "iot-robotics" in category_slugs


@pytest.mark.asyncio
async def test_get_category_by_slug(async_store_db):
    """Test querying category by its unique URL slug."""
    db = async_store_db["session"]
    cat = await get_category_by_slug(db, "bess")
    assert cat is not None
    assert cat.name == "Battery Energy Storage Systems"

    non_existent = await get_category_by_slug(db, "non-existent-category")
    assert non_existent is None


@pytest.mark.asyncio
async def test_list_products_default_published(async_store_db):
    """Test listing public catalog products returns only published items with SKUs and stock."""
    db = async_store_db["session"]
    products = await list_products(db, is_published=True)
    # Draft prototype should not be included
    assert len(products) == 2
    slugs = [p.slug for p in products]
    assert "purna-bess-50kwh" in slugs
    assert "smps-iot-dev-kit" in slugs
    assert "unreleased-prototype-bess" not in slugs

    # Verify relationships are loaded
    first = products[0]
    assert first.category is not None
    assert len(first.skus) > 0
    assert first.skus[0].inventory is not None
    assert first.skus[0].quantity_available >= 0


@pytest.mark.asyncio
async def test_list_products_filtering(async_store_db):
    """Test multifaceted filtering by category, search, price, and stock."""
    db = async_store_db["session"]

    # Filter by category
    bess_items = await list_products(db, category_slug="bess")
    assert len(bess_items) == 1
    assert bess_items[0].slug == "purna-bess-50kwh"

    # Search filter
    search_res = await list_products(db, search="ESP32")
    assert len(search_res) == 1
    assert search_res[0].slug == "smps-iot-dev-kit"

    # Brand filter
    brand_res = await list_products(db, brand_line="PURNA BESS")
    assert len(brand_res) == 1
    assert brand_res[0].slug == "purna-bess-50kwh"

    # In-stock only filter (IoT kit has 0 stock, so only PURNA BESS should match)
    in_stock_res = await list_products(db, in_stock_only=True)
    assert len(in_stock_res) == 1
    assert in_stock_res[0].slug == "purna-bess-50kwh"

    # Price range filter (Under 10,000 INR)
    affordable_res = await list_products(db, max_price=Decimal("10000.00"))
    assert len(affordable_res) == 1
    assert affordable_res[0].slug == "smps-iot-dev-kit"


@pytest.mark.asyncio
async def test_get_product_by_slug(async_store_db):
    """Test fetching product detail page data with SKUs and inventory."""
    db = async_store_db["session"]
    prod = await get_product_by_slug(db, "purna-bess-50kwh")
    assert prod is not None
    assert prod.name == "PURNA BESS™ 50kWh Commercial System"
    assert len(prod.skus) == 1
    assert prod.skus[0].price_inr == Decimal("1450000.00")
    assert prod.skus[0].quantity_available == 4


@pytest.mark.asyncio
async def test_admin_create_product_success(async_store_db):
    """Test admin creation of a new product with multiple SKUs and inventory tracking."""
    db = async_store_db["session"]
    admin = async_store_db["admin_user"]
    cat = async_store_db["bess_category"]

    payload = ProductCreateRequest(
        category_id=cat.id,
        slug="subal-pcs-50kw",
        name="SUBAL PCS™ 50kW Bi-Directional Converter",
        brand_line="SUBAL PCS™",
        short_description="Grid-tied dynamic inverter for energy storage.",
        description="Features 98.5% peak efficiency with ultra-fast sub-20ms grid response.",
        specifications_json={"efficiency": "98.5%", "grid_voltage": "415V 3-phase"},
        primary_image_url="/images/products/subal-pcs.jpg",
        is_published=True,
        skus=[
            SKUCreateRequest(
                sku_code="SMPS-PCS-50KW",
                title="SUBAL PCS 50kW Standard Converter",
                price_inr=Decimal("320000.00"),
                hsn_code="85044090",
                tax_rate_percent=Decimal("18.00"),
                weight_kg=Decimal("140.00"),
                initial_stock=8,
            )
        ],
    )

    created_prod = await admin_create_product(db, payload, actor_id=admin.id)
    assert created_prod is not None
    assert created_prod.slug == "subal-pcs-50kw"
    assert len(created_prod.skus) == 1
    assert created_prod.skus[0].sku_code == "SMPS-PCS-50KW"
    assert created_prod.skus[0].quantity_available == 8


@pytest.mark.asyncio
async def test_admin_create_product_duplicate_slug_rejected(async_store_db):
    """Test that creating a product with an existing slug raises 400."""
    db = async_store_db["session"]
    admin = async_store_db["admin_user"]
    cat = async_store_db["bess_category"]

    payload = ProductCreateRequest(
        category_id=cat.id,
        slug="purna-bess-50kwh",  # Already exists
        name="Duplicate PURNA BESS",
        brand_line="PURNA BESS™",
        short_description="Duplicate product short desc",
        description="Duplicate product full description",
    )

    with pytest.raises(HTTPException) as exc:
        await admin_create_product(db, payload, actor_id=admin.id)
    assert exc.value.status_code == 400


@pytest.mark.asyncio
async def test_admin_update_product(async_store_db):
    """Test modifying product information and toggling publication state."""
    db = async_store_db["session"]
    admin = async_store_db["admin_user"]
    purna = async_store_db["purna"]

    payload = ProductUpdateRequest(
        name="PURNA BESS™ 50kWh Generation 2",
        short_description="Upgraded 50kWh LFP commercial battery container.",
        is_published=False,
    )

    updated = await admin_update_product(db, product_id=purna.id, payload=payload, actor_id=admin.id)
    assert updated.name == "PURNA BESS™ 50kWh Generation 2"
    assert updated.short_description == "Upgraded 50kWh LFP commercial battery container."
    assert updated.is_published is False


@pytest.mark.asyncio
async def test_admin_adjust_inventory(async_store_db):
    """Test admin updating stock level and threshold for an existing SKU."""
    db = async_store_db["session"]
    admin = async_store_db["admin_user"]
    sku_id = async_store_db["iot_sku"].id

    adjusted_sku = await admin_adjust_inventory(
        db=db,
        sku_id=sku_id,
        quantity_available=150,
        low_stock_threshold=10,
        actor_id=admin.id,
    )

    assert adjusted_sku.quantity_available == 150
    assert adjusted_sku.inventory.quantity_available == 150
    assert adjusted_sku.inventory.low_stock_threshold == 10
