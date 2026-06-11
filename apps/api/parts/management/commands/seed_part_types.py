"""
Seed or refresh all PartType rows from the canonical type lists.

Usage:
    python manage.py seed_part_types          # insert missing, skip existing
    python manage.py seed_part_types --reset  # delete all, then re-insert
"""

from django.core.management.base import BaseCommand
from parts.models import PartPage, PartType

# ── Canonical type lists (mirrors apps/web/src/data/vehicles.ts) ─────────────
PART_TYPES = {
    "transmissions-for-sale": [
        "Automatic", "Manual / Standard", "CVT", "Semi-Automatic",
        "Dual-Clutch (DCT)", "Tiptronic", "Torque Converter",
        "4-Speed Automatic", "5-Speed Automatic", "6-Speed Automatic",
        "8-Speed Automatic", "10-Speed Automatic",
    ],
    "engines-for-sale": [
        "4-Cylinder", "6-Cylinder (V6)", "8-Cylinder (V8)", "3-Cylinder",
        "5-Cylinder", "10-Cylinder (V10)", "12-Cylinder (V12)",
        "Diesel", "Hybrid", "Electric", "Turbocharged", "Supercharged",
    ],
    "axle-shaft-for-sale": [
        "Front Axle Shaft", "Rear Axle Shaft", "Left Axle Shaft",
        "Right Axle Shaft", "CV Axle", "Half Shaft", "Prop Shaft",
    ],
    "drive-shaft-for-sale": [
        "Front Drive Shaft", "Rear Drive Shaft", "One-Piece Drive Shaft",
        "Two-Piece Drive Shaft", "Carbon Fiber Drive Shaft",
        "Aluminum Drive Shaft", "4WD / AWD Drive Shaft",
    ],
    "differential-for-sale": [
        "Front Differential", "Rear Differential", "Center Differential",
        "Limited Slip (LSD)", "Locking Differential", "Open Differential",
        "Posi-Traction", "Torsen Differential",
    ],
    "speedometer-for-sale": [
        "Analog Speedometer", "Digital Speedometer",
        "Electronic (VSS) Speedometer", "Cable-Driven Speedometer",
        "Cluster Assembly", "GPS Speedometer",
    ],
    "throttle-body-for-sale": [
        "Single Throttle Body", "Dual Throttle Body",
        "Electronic (ETC) Throttle Body", "Cable-Operated Throttle Body",
        "Fuel Injected Throttle Body", "Carbureted Throttle Body",
    ],
    "transfer-case-assembly-for-sale": [
        "Chain-Driven Transfer Case", "Gear-Driven Transfer Case",
        "Manual Shift Transfer Case", "Electric Shift Transfer Case",
        "BW1354 Transfer Case", "BW4407 Transfer Case",
        "NP246 Transfer Case", "NP261 Transfer Case",
    ],
    "steering-gear-rack-pinion-for-sale": [
        "Power Steering Rack", "Manual Steering Rack",
        "Electric (EPS) Steering Rack", "Hydraulic Steering Rack",
        "Quick Ratio Steering Rack", "Variable Ratio Steering Rack",
    ],
    "intake-manifold-for-sale": [
        "Upper Intake Manifold", "Lower Intake Manifold",
        "Aluminum Intake Manifold", "Composite Intake Manifold",
        "Performance Intake Manifold", "Stock OEM Intake Manifold",
        "Dual-Plane Intake Manifold",
    ],
    "steering-column-for-sale": [
        "Tilt Steering Column", "Telescoping Steering Column",
        "Fixed Steering Column", "Electric Steering Column",
        "Steering Column with Airbag", "Steering Column without Airbag",
        "Collapsible Steering Column",
    ],
    "spindle-knuckle-for-sale": [
        "Front Left Spindle Knuckle", "Front Right Spindle Knuckle",
        "Rear Left Spindle Knuckle", "Rear Right Spindle Knuckle",
        "2WD Spindle Knuckle", "4WD Spindle Knuckle",
    ],
    "axle-assembly-for-sale": [
        "Front Axle Assembly", "Rear Axle Assembly", "Complete Axle Assembly",
        "Dana 30 Axle Assembly", "Dana 44 Axle Assembly",
        "8.8 Ford Axle Assembly", "12-Bolt Chevy Axle Assembly",
        "Sterling 10.5 Axle Assembly",
    ],
    "abs-assembly-for-sale": [
        "Front ABS Assembly", "Rear ABS Assembly", "Complete ABS Module",
        "ABS Pump & Motor", "ABS Control Module",
        "ABS Wheel Speed Sensor", "ABS Modulator Valve",
    ],
}


class Command(BaseCommand):
    help = "Seed PartType rows from the canonical type lists"

    def add_arguments(self, parser):
        parser.add_argument(
            "--reset", action="store_true",
            help="Delete all existing PartType rows before seeding",
        )

    def handle(self, *args, **options):
        if options["reset"]:
            deleted, _ = PartType.objects.all().delete()
            self.stdout.write(self.style.WARNING(f"Deleted {deleted} existing PartType rows."))

        created_total = 0
        skipped_total = 0

        for slug, labels in PART_TYPES.items():
            try:
                page = PartPage.objects.get(slug=slug)
            except PartPage.DoesNotExist:
                self.stdout.write(self.style.WARNING(
                    f"  SKIP: PartPage '{slug}' not found -- run seed_parts first."
                ))
                continue

            for order, label in enumerate(labels):
                obj, created = PartType.objects.get_or_create(
                    part_page=page,
                    label=label,
                    defaults={"order": order},
                )
                if created:
                    created_total += 1
                else:
                    skipped_total += 1

            self.stdout.write(f"  OK  {page.name}: {len(labels)} types processed")

        self.stdout.write(self.style.SUCCESS(
            f"Done -- {created_total} created, {skipped_total} already existed."
        ))
