"""Initial schema migration for SMPS Tech Lab.

Revision ID: 001_initial_schema
Revises: 
Create Date: 2026-10-25 21:30:00.000000
"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision: str = '001_initial_schema'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # 1. Identity & Access
    op.create_table(
        'roles',
        sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
        sa.Column('name', sa.String(length=50), nullable=False),
        sa.Column('description', sa.String(length=255), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_roles_name'), 'roles', ['name'], unique=True)

    op.create_table(
        'users',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False),
        sa.Column('full_name', sa.String(length=255), nullable=False),
        sa.Column('phone', sa.String(length=32), nullable=True),
        sa.Column('avatar_url', sa.String(length=500), nullable=True),
        sa.Column('is_active', sa.Integer(), nullable=False, server_default='1'),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_users_email'), 'users', ['email'], unique=True)

    op.create_table(
        'user_roles',
        sa.Column('user_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('role_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['role_id'], ['roles.id'], ondelete='RESTRICT'),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('user_id', 'role_id')
    )

    op.create_table(
        'audit_logs',
        sa.Column('id', sa.BigInteger(), autoincrement=True, nullable=False),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column('action', sa.String(length=100), nullable=False),
        sa.Column('resource_type', sa.String(length=50), nullable=False),
        sa.Column('resource_id', sa.String(length=100), nullable=False),
        sa.Column('changes', postgresql.JSONB(astext_type=sa.Text()), nullable=True),
        sa.Column('ip_address', sa.String(length=45), nullable=True),
        sa.Column('user_agent', sa.Text(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='SET NULL'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_audit_logs_action'), 'audit_logs', ['action'], unique=False)
    op.create_index(op.f('ix_audit_logs_created_at'), 'audit_logs', ['created_at'], unique=False)
    op.create_index(op.f('ix_audit_logs_resource_type'), 'audit_logs', ['resource_type'], unique=False)
    op.create_index(op.f('ix_audit_logs_user_id'), 'audit_logs', ['user_id'], unique=False)

    # 2. VTU Internships
    op.create_table(
        'internship_programs',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('slug', sa.String(length=100), nullable=False),
        sa.Column('title', sa.String(length=255), nullable=False),
        sa.Column('domain', sa.String(length=100), nullable=False),
        sa.Column('target_branches', postgresql.ARRAY(sa.String()), nullable=False),
        sa.Column('description', sa.Text(), nullable=False),
        sa.Column('syllabus_json', postgresql.JSONB(astext_type=sa.Text()), nullable=False),
        sa.Column('eligibility_criteria', sa.Text(), nullable=False),
        sa.Column('duration_weeks', sa.Integer(), nullable=False),
        sa.Column('certificate_template', sa.String(length=100), nullable=True),
        sa.Column('is_active', sa.Boolean(), nullable=False, server_default='true'),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_internship_programs_domain'), 'internship_programs', ['domain'], unique=False)
    op.create_index(op.f('ix_internship_programs_is_active'), 'internship_programs', ['is_active'], unique=False)
    op.create_index(op.f('ix_internship_programs_slug'), 'internship_programs', ['slug'], unique=True)

    op.create_table(
        'batches',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('program_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('batch_code', sa.String(length=50), nullable=False),
        sa.Column('start_date', sa.Date(), nullable=False),
        sa.Column('end_date', sa.Date(), nullable=False),
        sa.Column('mode', sa.String(length=30), nullable=False),
        sa.Column('location', sa.String(length=255), nullable=True),
        sa.Column('capacity', sa.Integer(), nullable=False),
        sa.Column('enrolled_count', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('price_inr', sa.Numeric(precision=10, scale=2), nullable=False),
        sa.Column('is_open', sa.Boolean(), nullable=False, server_default='true'),
        sa.CheckConstraint('capacity > 0', name='check_positive_capacity'),
        sa.CheckConstraint('enrolled_count >= 0', name='check_non_negative_enrolled'),
        sa.CheckConstraint('enrolled_count <= capacity', name='check_capacity_not_exceeded'),
        sa.CheckConstraint('price_inr >= 0', name='check_non_negative_program_price'),
        sa.ForeignKeyConstraint(['program_id'], ['internship_programs.id'], ondelete='RESTRICT'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_batches_batch_code'), 'batches', ['batch_code'], unique=True)
    op.create_index(op.f('ix_batches_is_open'), 'batches', ['is_open'], unique=False)
    op.create_index(op.f('ix_batches_program_id'), 'batches', ['program_id'], unique=False)

    op.create_table(
        'applications',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('batch_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('college_name', sa.String(length=255), nullable=False),
        sa.Column('usn', sa.String(length=50), nullable=False),
        sa.Column('branch', sa.String(length=50), nullable=False),
        sa.Column('semester', sa.Integer(), nullable=False),
        sa.Column('cgpa', sa.Numeric(precision=4, scale=2), nullable=True),
        sa.Column('resume_url', sa.String(length=500), nullable=True),
        sa.Column('status', sa.String(length=30), nullable=False, server_default='PENDING'),
        sa.Column('review_notes', sa.Text(), nullable=True),
        sa.Column('applied_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('reviewed_at', sa.DateTime(timezone=True), nullable=True),
        sa.CheckConstraint('semester >= 1 AND semester <= 8', name='check_valid_semester'),
        sa.ForeignKeyConstraint(['batch_id'], ['batches.id'], ondelete='RESTRICT'),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('user_id', 'batch_id', name='uq_user_batch_application')
    )
    op.create_index(op.f('ix_applications_batch_id'), 'applications', ['batch_id'], unique=False)
    op.create_index(op.f('ix_applications_status'), 'applications', ['status'], unique=False)
    op.create_index(op.f('ix_applications_user_id'), 'applications', ['user_id'], unique=False)
    op.create_index(op.f('ix_applications_usn'), 'applications', ['usn'], unique=False)

    op.create_table(
        'enrollments',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('application_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('batch_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('enrollment_number', sa.String(length=60), nullable=False),
        sa.Column('status', sa.String(length=30), nullable=False, server_default='CONFIRMED'),
        sa.Column('attendance_percent', sa.Numeric(precision=5, scale=2), nullable=True, server_default='0.00'),
        sa.Column('certificate_issued', sa.Boolean(), nullable=True, server_default='false'),
        sa.Column('certificate_id', sa.String(length=100), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('completed_at', sa.DateTime(timezone=True), nullable=True),
        sa.ForeignKeyConstraint(['application_id'], ['applications.id'], ondelete='RESTRICT'),
        sa.ForeignKeyConstraint(['batch_id'], ['batches.id'], ondelete='RESTRICT'),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='RESTRICT'),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('application_id'),
        sa.UniqueConstraint('certificate_id')
    )
    op.create_index(op.f('ix_enrollments_batch_id'), 'enrollments', ['batch_id'], unique=False)
    op.create_index(op.f('ix_enrollments_enrollment_number'), 'enrollments', ['enrollment_number'], unique=True)
    op.create_index(op.f('ix_enrollments_status'), 'enrollments', ['status'], unique=False)
    op.create_index(op.f('ix_enrollments_user_id'), 'enrollments', ['user_id'], unique=False)

    # 3. Store, Products, SKUs, Inventory
    op.create_table(
        'categories',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('name', sa.String(length=100), nullable=False),
        sa.Column('slug', sa.String(length=100), nullable=False),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('icon_name', sa.String(length=50), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_categories_name'), 'categories', ['name'], unique=True)
    op.create_index(op.f('ix_categories_slug'), 'categories', ['slug'], unique=True)

    op.create_table(
        'products',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('category_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('slug', sa.String(length=120), nullable=False),
        sa.Column('name', sa.String(length=255), nullable=False),
        sa.Column('brand_line', sa.String(length=100), nullable=False),
        sa.Column('short_description', sa.String(length=500), nullable=False),
        sa.Column('description', sa.Text(), nullable=False),
        sa.Column('specifications_json', postgresql.JSONB(astext_type=sa.Text()), nullable=False),
        sa.Column('datasheet_url', sa.String(length=500), nullable=True),
        sa.Column('primary_image_url', sa.String(length=500), nullable=True),
        sa.Column('is_published', sa.Boolean(), nullable=False, server_default='false'),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.ForeignKeyConstraint(['category_id'], ['categories.id'], ondelete='RESTRICT'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_products_brand_line'), 'products', ['brand_line'], unique=False)
    op.create_index(op.f('ix_products_category_id'), 'products', ['category_id'], unique=False)
    op.create_index(op.f('ix_products_is_published'), 'products', ['is_published'], unique=False)
    op.create_index(op.f('ix_products_slug'), 'products', ['slug'], unique=True)

    op.create_table(
        'skus',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('product_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('sku_code', sa.String(length=60), nullable=False),
        sa.Column('title', sa.String(length=255), nullable=False),
        sa.Column('price_inr', sa.Numeric(precision=12, scale=2), nullable=False),
        sa.Column('hsn_code', sa.String(length=20), nullable=False),
        sa.Column('tax_rate_percent', sa.Numeric(precision=4, scale=2), nullable=False, server_default='18.00'),
        sa.Column('weight_kg', sa.Numeric(precision=8, scale=2), nullable=True),
        sa.Column('is_active', sa.Boolean(), nullable=False, server_default='true'),
        sa.CheckConstraint('price_inr >= 0', name='check_non_negative_sku_price'),
        sa.CheckConstraint('tax_rate_percent >= 0 AND tax_rate_percent <= 100', name='check_valid_tax_rate'),
        sa.ForeignKeyConstraint(['product_id'], ['products.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_skus_is_active'), 'skus', ['is_active'], unique=False)
    op.create_index(op.f('ix_skus_product_id'), 'skus', ['product_id'], unique=False)
    op.create_index(op.f('ix_skus_sku_code'), 'skus', ['sku_code'], unique=True)

    op.create_table(
        'inventory',
        sa.Column('sku_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('quantity_available', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('quantity_reserved', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('low_stock_threshold', sa.Integer(), nullable=False, server_default='5'),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.CheckConstraint('quantity_available >= 0', name='check_non_negative_stock'),
        sa.CheckConstraint('quantity_reserved >= 0', name='check_non_negative_reserved'),
        sa.ForeignKeyConstraint(['sku_id'], ['skus.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('sku_id')
    )

    # 4. Orders & Order Items
    op.create_table(
        'orders',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('order_number', sa.String(length=50), nullable=False),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('status', sa.String(length=30), nullable=False, server_default='CREATED'),
        sa.Column('subtotal_inr', sa.Numeric(precision=12, scale=2), nullable=False),
        sa.Column('tax_inr', sa.Numeric(precision=12, scale=2), nullable=False),
        sa.Column('shipping_fee_inr', sa.Numeric(precision=8, scale=2), nullable=False, server_default='0.00'),
        sa.Column('discount_inr', sa.Numeric(precision=10, scale=2), nullable=False, server_default='0.00'),
        sa.Column('total_inr', sa.Numeric(precision=12, scale=2), nullable=False),
        sa.Column('shipping_address_json', postgresql.JSONB(astext_type=sa.Text()), nullable=False),
        sa.Column('billing_address_json', postgresql.JSONB(astext_type=sa.Text()), nullable=False),
        sa.Column('tracking_number', sa.String(length=100), nullable=True),
        sa.Column('carrier_name', sa.String(length=100), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.CheckConstraint('discount_inr >= 0', name='check_non_negative_discount'),
        sa.CheckConstraint('shipping_fee_inr >= 0', name='check_non_negative_shipping'),
        sa.CheckConstraint('subtotal_inr >= 0', name='check_non_negative_subtotal'),
        sa.CheckConstraint('tax_inr >= 0', name='check_non_negative_tax'),
        sa.CheckConstraint('total_inr >= 0', name='check_non_negative_order_total'),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='RESTRICT'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_orders_created_at'), 'orders', ['created_at'], unique=False)
    op.create_index(op.f('ix_orders_order_number'), 'orders', ['order_number'], unique=True)
    op.create_index(op.f('ix_orders_status'), 'orders', ['status'], unique=False)
    op.create_index(op.f('ix_orders_user_id'), 'orders', ['user_id'], unique=False)

    op.create_table(
        'order_items',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('order_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('sku_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('quantity', sa.Integer(), nullable=False),
        sa.Column('unit_price_inr', sa.Numeric(precision=12, scale=2), nullable=False),
        sa.Column('tax_rate_percent', sa.Numeric(precision=4, scale=2), nullable=False),
        sa.Column('total_price_inr', sa.Numeric(precision=12, scale=2), nullable=False),
        sa.CheckConstraint('quantity > 0', name='check_positive_quantity'),
        sa.CheckConstraint('total_price_inr >= 0', name='check_non_negative_item_total'),
        sa.CheckConstraint('unit_price_inr >= 0', name='check_non_negative_unit_price'),
        sa.ForeignKeyConstraint(['order_id'], ['orders.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['sku_id'], ['skus.id'], ondelete='RESTRICT'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_order_items_order_id'), 'order_items', ['order_id'], unique=False)
    op.create_index(op.f('ix_order_items_sku_id'), 'order_items', ['sku_id'], unique=False)

    # 5. Payments, Webhook Events, Refunds
    op.create_table(
        'payments',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('reference_type', sa.String(length=20), nullable=False),
        sa.Column('reference_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('gateway', sa.String(length=30), nullable=False, server_default='RAZORPAY'),
        sa.Column('gateway_order_id', sa.String(length=100), nullable=False),
        sa.Column('gateway_payment_id', sa.String(length=100), nullable=True),
        sa.Column('gateway_signature', sa.String(length=255), nullable=True),
        sa.Column('amount_inr', sa.Numeric(precision=12, scale=2), nullable=False),
        sa.Column('currency', sa.String(length=10), nullable=False, server_default='INR'),
        sa.Column('status', sa.String(length=30), nullable=False, server_default='INITIATED'),
        sa.Column('verified_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.CheckConstraint('amount_inr > 0', name='check_positive_payment_amount'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_payments_created_at'), 'payments', ['created_at'], unique=False)
    op.create_index(op.f('ix_payments_gateway_order_id'), 'payments', ['gateway_order_id'], unique=True)
    op.create_index(op.f('ix_payments_gateway_payment_id'), 'payments', ['gateway_payment_id'], unique=True)
    op.create_index(op.f('ix_payments_reference_id'), 'payments', ['reference_id'], unique=False)
    op.create_index(op.f('ix_payments_reference_type'), 'payments', ['reference_type'], unique=False)
    op.create_index(op.f('ix_payments_status'), 'payments', ['status'], unique=False)

    op.create_table(
        'payment_events',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('event_id', sa.String(length=100), nullable=False),
        sa.Column('event_type', sa.String(length=100), nullable=False),
        sa.Column('payload', postgresql.JSONB(astext_type=sa.Text()), nullable=False),
        sa.Column('processed_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_payment_events_event_id'), 'payment_events', ['event_id'], unique=True)
    op.create_index(op.f('ix_payment_events_event_type'), 'payment_events', ['event_type'], unique=False)

    op.create_table(
        'refunds',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('payment_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('gateway_refund_id', sa.String(length=100), nullable=True),
        sa.Column('amount_inr', sa.Numeric(precision=12, scale=2), nullable=False),
        sa.Column('reason', sa.Text(), nullable=False),
        sa.Column('authorized_by', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('status', sa.String(length=30), nullable=False, server_default='PENDING'),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('processed_at', sa.DateTime(timezone=True), nullable=True),
        sa.CheckConstraint('amount_inr > 0', name='check_positive_refund_amount'),
        sa.ForeignKeyConstraint(['authorized_by'], ['users.id'], ondelete='RESTRICT'),
        sa.ForeignKeyConstraint(['payment_id'], ['payments.id'], ondelete='RESTRICT'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_refunds_authorized_by'), 'refunds', ['authorized_by'], unique=False)
    op.create_index(op.f('ix_refunds_gateway_refund_id'), 'refunds', ['gateway_refund_id'], unique=True)
    op.create_index(op.f('ix_refunds_payment_id'), 'refunds', ['payment_id'], unique=False)
    op.create_index(op.f('ix_refunds_status'), 'refunds', ['status'], unique=False)


def downgrade() -> None:
    op.drop_table('refunds')
    op.drop_table('payment_events')
    op.drop_table('payments')
    op.drop_table('order_items')
    op.drop_table('orders')
    op.drop_table('inventory')
    op.drop_table('skus')
    op.drop_table('products')
    op.drop_table('categories')
    op.drop_table('enrollments')
    op.drop_table('applications')
    op.drop_table('batches')
    op.drop_table('internship_programs')
    op.drop_table('audit_logs')
    op.drop_table('user_roles')
    op.drop_table('users')
    op.drop_table('roles')
