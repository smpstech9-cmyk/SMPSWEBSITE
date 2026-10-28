"""Authoritative seed data for real SMPS Tech Lab products, categories, and VTU internships."""
import uuid
from decimal import Decimal
from datetime import date

SEED_CATEGORIES = [
    {
        "id": uuid.UUID("a1000000-0000-0000-0000-000000000001"),
        "name": "Battery Energy Storage Systems (BESS)",
        "slug": "bess",
        "description": "Grid-scale and commercial modular energy storage systems for industrial and renewable integration.",
        "icon_name": "BatteryCharging",
    },
    {
        "id": uuid.UUID("a1000000-0000-0000-0000-000000000002"),
        "name": "Power Conversion Systems (PCS)",
        "slug": "pcs",
        "description": "High-efficiency bi-directional inverters and conversion systems with ultra-fast dynamic response.",
        "icon_name": "Zap",
    },
    {
        "id": uuid.UUID("a1000000-0000-0000-0000-000000000003"),
        "name": "Semiconductors & CCU Controllers",
        "slug": "semiconductors",
        "description": "Proprietary SaralaChip™ integrated controllers and smart BMS hardware modules.",
        "icon_name": "Cpu",
    },
    {
        "id": uuid.UUID("a1000000-0000-0000-0000-000000000004"),
        "name": "EV Fast Chargers & Telecom SMPS",
        "slug": "ev-telecom-power",
        "description": "DC fast charging stations, fleet depot chargers, and high-reliability telecom rectifiers.",
        "icon_name": "Power",
    },
    {
        "id": uuid.UUID("a1000000-0000-0000-0000-000000000005"),
        "name": "IoT & Robotics Development Kits",
        "slug": "iot-robotics",
        "description": "Engineering kits, microcontrollers, sensor suites, and embedded development boards.",
        "icon_name": "Bot",
    },
]

SEED_PRODUCTS = []


SEED_INTERNSHIP_PROGRAMS = []

