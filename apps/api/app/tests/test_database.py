"""Database model and constraint unit tests for Phase 3 verification."""
import uuid
import pytest
from decimal import Decimal
from datetime import date
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.database import Base
from app.domains.auth.models import User, Role
from app.domains.internships.models import InternshipProgram, Batch, Application, Enrollment
from app.domains.store.models import Category, Product, SKU, Inventory
from app.domains.orders.models import Order, OrderItem
from app.domains.payments.models import Payment, PaymentEvent
from app.domains.internships.schemas import ApplicationCreateRequest
from app.core.seed import SEED_CATEGORIES, SEED_PRODUCTS, SEED_INTERNSHIP_PROGRAMS


@pytest.fixture
def sqlite_session():
    """In-memory SQLite session for fast isolated constraint and model testing."""
    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(engine)
    Session = sessionmaker(bind=engine)
    session = Session()
    try:
        yield session
    finally:
        session.close()


def test_seed_data_integrity():
    """Verifies that seed data matches valid types and decimal precisions."""
    assert len(SEED_CATEGORIES) >= 4
    assert len(SEED_PRODUCTS) >= 2
    assert len(SEED_INTERNSHIP_PROGRAMS) >= 2

    # Check decimal types (strictly non-float)
    for prod in SEED_PRODUCTS:
        for sku in prod["skus"]:
            assert isinstance(sku["price_inr"], Decimal)
            assert sku["price_inr"] > 0

    for prog in SEED_INTERNSHIP_PROGRAMS:
        for batch in prog["batches"]:
            assert isinstance(batch["price_inr"], Decimal)
            assert batch["capacity"] > 0


def test_user_and_role_relationship(sqlite_session):
    """Verifies user creation and role association."""
    user = User(
        id=uuid.uuid4(),
        email="student@vtu.ac.in",
        full_name="Aarav Sharma",
        phone="+919876543210"
    )
    role = Role(name="student", description="Enrolled VTU student")
    user.roles.append(role)

    sqlite_session.add(user)
    sqlite_session.commit()

    saved_user = sqlite_session.query(User).filter_by(email="student@vtu.ac.in").first()
    assert saved_user is not None
    assert saved_user.full_name == "Aarav Sharma"
    assert len(saved_user.roles) == 1
    assert saved_user.roles[0].name == "student"


def test_product_and_sku_decimal_safety(sqlite_session):
    """Verifies that product and SKU monetary figures preserve decimal accuracy."""
    cat = Category(
        id=uuid.uuid4(),
        name="Power Electronics",
        slug="power-electronics"
    )
    prod = Product(
        id=uuid.uuid4(),
        category=cat,
        slug="subal-pcs-100kw",
        name="SUBAL PCS 100kW",
        brand_line="SUBAL PCS™",
        short_description="Grid scale converter",
        description="Detailed description",
        specifications_json={"efficiency": "98.9%"}
    )
    sku = SKU(
        id=uuid.uuid4(),
        product=prod,
        sku_code="SMPS-PCS-100KW",
        title="100kW PCS Unit",
        price_inr=Decimal("895420.50"),
        hsn_code="85044090",
        tax_rate_percent=Decimal("18.00")
    )
    inv = Inventory(
        sku=sku,
        quantity_available=10,
        quantity_reserved=0
    )

    sqlite_session.add_all([cat, prod, sku, inv])
    sqlite_session.commit()

    saved_sku = sqlite_session.query(SKU).filter_by(sku_code="SMPS-PCS-100KW").first()
    assert saved_sku is not None
    assert saved_sku.price_inr == Decimal("895420.50")
    assert saved_sku.inventory.quantity_available == 10


def test_application_schema_validation():
    """Verifies Pydantic USN pattern validation for VTU seat numbers."""
    valid_data = {
        "batch_id": uuid.uuid4(),
        "college_name": "R.V. College of Engineering",
        "usn": "1RV21EC045",
        "branch": "ECE",
        "semester": 6,
        "cgpa": Decimal("8.75")
    }
    app_req = ApplicationCreateRequest(**valid_data)
    assert app_req.usn == "1RV21EC045"
    assert app_req.semester == 6

    # Test invalid USN
    with pytest.raises(Exception):
        ApplicationCreateRequest(
            batch_id=uuid.uuid4(),
            college_name="College",
            usn="INVALID_USN",
            branch="ECE",
            semester=6
        )
