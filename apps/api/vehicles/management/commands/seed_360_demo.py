"""
Register the Mercedes demo 360-degree assets into the database.
Run once: python manage.py seed_360_demo
"""
from django.core.management.base import BaseCommand
from vehicles.models import VehicleMake, VehicleModel, Vehicle360Asset
import shutil, os
from pathlib import Path
from django.conf import settings


class Command(BaseCommand):
    help = "Register Mercedes demo 360 assets into the DB"

    def handle(self, *args, **options):
        make, _ = VehicleMake.objects.get_or_create(name="Mercedes-Benz")
        model, _ = VehicleModel.objects.get_or_create(make=make, name="AMG GT Coupe")

        # Source files copied into project
        web_videos_dir = Path(settings.BASE_DIR).parent.parent / "apps" / "web" / "public" / "videos" / "360"
        media_vehicles = settings.MEDIA_ROOT / "360" / "vehicles"
        media_parts    = settings.MEDIA_ROOT / "360" / "parts"
        media_vehicles.mkdir(parents=True, exist_ok=True)
        media_parts.mkdir(parents=True, exist_ok=True)

        car_src  = web_videos_dir / "mercedes-benz-car.mp4"
        part_src = web_videos_dir / "transmission-part.mp4"
        car_dest  = media_vehicles / "mercedes-benz-amg-gt-coupe.mp4"
        part_dest = media_parts    / "transmission-360.mp4"

        if car_src.exists() and not car_dest.exists():
            shutil.copy2(str(car_src), str(car_dest))

        if part_src.exists() and not part_dest.exists():
            shutil.copy2(str(part_src), str(part_dest))

        # Car asset
        car_asset, created = Vehicle360Asset.objects.update_or_create(
            make=make, model=model, asset_type="car",
            defaults={
                "year": "",
                "video": "360/vehicles/mercedes-benz-amg-gt-coupe.mp4",
                "label": "Mercedes-Benz AMG GT Coupe — 360 View",
                "is_active": True,
            }
        )
        self.stdout.write(f"Car asset: {'created' if created else 'updated'} — {car_asset}")

        # Transmission part asset
        part_asset, created = Vehicle360Asset.objects.update_or_create(
            make=make, model=model, asset_type="part", part_slug="transmissions-for-sale",
            defaults={
                "year": "",
                "video": "360/parts/transmission-360.mp4",
                "label": "Mercedes-Benz AMG GT Coupe — Transmission 360",
                "is_active": True,
            }
        )
        self.stdout.write(f"Part asset: {'created' if created else 'updated'} — {part_asset}")
        self.stdout.write(self.style.SUCCESS("[OK] Mercedes-Benz demo 360 assets registered successfully."))
