"""Database schema auto-initialization and seeding for local dev and testing."""
import uuid
from decimal import Decimal
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import engine, Base, AsyncSessionLocal
from app.core.seed import SEED_CATEGORIES, SEED_PRODUCTS, SEED_INTERNSHIP_PROGRAMS
from app.domains.auth.models import Role, User
from app.domains.internships.models import InternshipProgram, Batch
from app.domains.store.models import Category, Product, SKU, Inventory
from app.domains.media.models import GalleryItem


async def init_db_and_seed():
    """Create all tables and seed default roles, programs, and catalog if missing."""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as session:
        # 1. Seed Roles
        roles_data = [
            ("super_admin", "Global root administrator with elevated system permissions"),
            ("admin", "SMPS lab management and operations administrator"),
            ("student", "Enrolled engineering student with VTU course access"),
            ("ops", "Inventory and order fulfillment operations staff"),
        ]
        for role_name, desc in roles_data:
            stmt = select(Role).where(Role.name == role_name)
            res = await session.execute(stmt)
            if not res.scalars().first():
                session.add(Role(name=role_name, description=desc))
        await session.commit()

        # 2. Seed Default Super Admin and Demo Student
        stmt = select(User).where(User.email == "admin@smpstechlab.com")
        res = await session.execute(stmt)
        admin_user = res.scalars().first()
        if not admin_user:
            super_role = (await session.execute(select(Role).where(Role.name == "super_admin"))).scalars().first()
            admin_user = User(
                id=uuid.uuid4(),
                email="admin@smpstechlab.com",
                full_name="SMPS Super Admin",
                phone="+919876543210",
                is_active=1,
            )
            if super_role:
                admin_user.roles.append(super_role)
            session.add(admin_user)
            await session.commit()

        stmt = select(User).where(User.email == "student@vtu.ac.in")
        res = await session.execute(stmt)
        student_user = res.scalars().first()
        if not student_user:
            student_role = (await session.execute(select(Role).where(Role.name == "student"))).scalars().first()
            student_user = User(
                id=uuid.uuid4(),
                email="student@vtu.ac.in",
                full_name="Aarav Sharma",
                phone="+919876543211",
                is_active=1,
            )
            if student_role:
                student_user.roles.append(student_role)
            session.add(student_user)
            await session.commit()

        # 3. Seed Internship Programs and Batches
        for prog in SEED_INTERNSHIP_PROGRAMS:
            stmt = select(InternshipProgram).where(InternshipProgram.slug == prog["slug"])
            res = await session.execute(stmt)
            existing_prog = res.scalars().first()
            if not existing_prog:
                new_prog = InternshipProgram(
                    id=prog["id"],
                    slug=prog["slug"],
                    title=prog["title"],
                    domain=prog["domain"],
                    target_branches=prog["target_branches"],
                    description=prog["description"],
                    syllabus_json=prog["syllabus_json"],
                    eligibility_criteria=prog["eligibility_criteria"],
                    duration_weeks=prog["duration_weeks"],
                    is_active=prog["is_active"],
                )
                session.add(new_prog)
                await session.flush()

                for b in prog["batches"]:
                    new_batch = Batch(
                        id=b["id"],
                        program_id=new_prog.id,
                        batch_code=b["batch_code"],
                        start_date=b["start_date"],
                        end_date=b["end_date"],
                        mode=b["mode"],
                        location=b.get("location"),
                        capacity=b["capacity"],
                        enrolled_count=0,
                        price_inr=b["price_inr"],
                        is_open=b["is_open"],
                    )
                    session.add(new_batch)
                await session.commit()

        # 4. Seed Categories and Products
        for cat in SEED_CATEGORIES:
            stmt = select(Category).where(Category.slug == cat["slug"])
            res = await session.execute(stmt)
            if not res.scalars().first():
                session.add(Category(
                    id=cat["id"],
                    name=cat["name"],
                    slug=cat["slug"],
                    description=cat.get("description"),
                    icon_name=cat.get("icon_name"),
                ))
        await session.commit()

        for prod in SEED_PRODUCTS:
            stmt = select(Product).where(Product.slug == prod["slug"])
            res = await session.execute(stmt)
            if not res.scalars().first():
                new_prod = Product(
                    id=prod["id"],
                    category_id=prod["category_id"],
                    slug=prod["slug"],
                    name=prod["name"],
                    brand_line=prod["brand_line"],
                    short_description=prod.get("short_description"),
                    description=prod.get("description"),
                    specifications_json=prod.get("specifications_json", {}),
                    datasheet_url=prod.get("datasheet_url"),
                    primary_image_url=prod.get("primary_image_url"),
                    is_published=prod["is_published"],
                )
                session.add(new_prod)
                await session.flush()

                for sku_data in prod.get("skus", []):
                    new_sku = SKU(
                        id=sku_data["id"],
                        product_id=new_prod.id,
                        sku_code=sku_data["sku_code"],
                        title=sku_data["title"],
                        price_inr=sku_data["price_inr"],
                        hsn_code=sku_data.get("hsn_code", "85076000"),
                        tax_rate_percent=sku_data.get("tax_rate_percent", Decimal("18.00")),
                        weight_kg=sku_data.get("weight_kg", Decimal("1.50")),
                        is_active=True,
                    )
                    session.add(new_sku)
                    await session.flush()

                    new_inv = Inventory(
                        sku_id=new_sku.id,
                        quantity_available=sku_data.get("quantity_available", 50),
                        quantity_reserved=0,
                        low_stock_threshold=sku_data.get("low_stock_threshold", 5),
                    )
                    session.add(new_inv)
                await session.commit()

        # 5. Gallery items are managed authoritatively via the Operations Portal
        await session.commit()

