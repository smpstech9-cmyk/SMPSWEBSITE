# SMPS Tech Lab - Enterprise Business Platform

The official engineering and business platform for **SMPS Electric Control Private Limited** (SMPS Tech Lab™).

Operating out of the **VTU-VRIF-TCOE Facility** (Visvesvaraya Technological University Research & Innovation Foundation), Nagarbhavi, Bengaluru, Karnataka.

## Platform Capabilities
1. **VTU Engineering Internships**: Hands-on hardware training in Power Electronics, EV Charging Infrastructure, BMS, and Embedded Systems.
2. **SMPS Hardware Products Store**: Industrial energy storage (PURNA BESS™), power conversion (SUBAL PCS™), BMS (SWARNALI™), and semiconductor controllers (SaralaChip™).
3. **Corporate & B2B Solutions**: ODM research, institutional lab incubation, and fleet charging infrastructure.

## Architecture
* **Frontend**: Next.js App Router (TypeScript strict, Tailwind CSS, Lucide React, TanStack Query)
* **Backend**: Python 3.14+ FastAPI (`/api/v1/`), SQLAlchemy 2.0 Async, Pydantic v2, Alembic
* **Database & Auth**: Supabase PostgreSQL & Supabase Auth
* **Payments**: Razorpay with server-side HMAC webhook verification
