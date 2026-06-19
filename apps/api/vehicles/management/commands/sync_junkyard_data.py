import json
import os
from django.core.management.base import BaseCommand
from vehicles.models import VehicleMake, VehicleModel, VehicleYear

class Command(BaseCommand):
    help = "Sync Transmission vehicle data perfectly with Junkyard JSON dump"

    def add_arguments(self, parser):
        parser.add_argument('json_path', type=str, help='Path to junkyard_leadform.json')

    def handle(self, *args, **options):
        json_path = options['json_path']

        if not os.path.exists(json_path):
            self.stderr.write(self.style.ERROR(f"File not found: {json_path}"))
            return

        self.stdout.write(f"Loading {json_path} (this may take a moment)...")
        
        with open(json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        makes_data = {}
        models_data = {}
        years_data = []

        # Parse JSON
        for item in data:
            model_type = item.get("model", "").lower()
            pk = item.get("pk")
            fields = item.get("fields", {})

            if model_type == "hollander.make":
                make_name = fields.get("make_name")
                if make_name:
                    makes_data[pk] = make_name

            elif model_type == "hollander.model":
                model_name = fields.get("model_name")
                # Django dumpdata uses the exact FK field name without _id usually, but let's be safe
                make_id = fields.get("make") or fields.get("make_id")
                if model_name and make_id:
                    models_data[pk] = {"name": model_name, "make_pk": make_id}

            elif model_type in ["hollander.yearrange", "hollander.year_range"]:
                year_start = fields.get("year_start")
                year_end = fields.get("year_end")
                model_id = fields.get("model") or fields.get("model_id")
                make_id = fields.get("make") or fields.get("make_id")
                
                if year_start and year_end and model_id:
                    years_data.append({
                        "start": int(year_start),
                        "end": int(year_end),
                        "model_pk": model_id,
                        "make_pk": make_id
                    })

        self.stdout.write(self.style.SUCCESS(f"Found {len(makes_data)} makes, {len(models_data)} models, {len(years_data)} year ranges in JSON."))

        # Warning before wipe
        self.stdout.write(self.style.WARNING("Clearing existing Transmission vehicle data..."))
        VehicleYear.objects.all().delete()
        VehicleModel.objects.all().delete()
        VehicleMake.objects.all().delete()

        # Insert Makes
        make_objects = {}
        for pk, name in makes_data.items():
            make_objects[pk] = VehicleMake.objects.create(name=name)
        
        # Insert Models
        model_objects = {}
        for pk, mdata in models_data.items():
            make_obj = make_objects.get(mdata["make_pk"])
            if make_obj:
                model_objects[pk] = VehicleModel.objects.create(make=make_obj, name=mdata["name"])

        # Insert Years
        created_years = 0
        bulk_years = []
        for ydata in years_data:
            model_obj = model_objects.get(ydata["model_pk"])
            if not model_obj:
                continue
            
            make_obj = model_obj.make
            for yr in range(ydata["start"], ydata["end"] + 1):
                bulk_years.append(VehicleYear(make=make_obj, model=model_obj, year=str(yr)))
        
        # Insert in batches to prevent memory issues
        batch_size = 5000
        for i in range(0, len(bulk_years), batch_size):
            VehicleYear.objects.bulk_create(bulk_years[i:i+batch_size], ignore_conflicts=True)
            created_years += len(bulk_years[i:i+batch_size])

        self.stdout.write(self.style.SUCCESS(f"Done! Inserted {len(make_objects)} makes, {len(model_objects)} models, and {created_years} individual year records to exactly match Junkyard!"))
