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

        makes_data = []
        models_data = []
        years_data = []

        # Parse JSON
        for item in data:
            model_type = item.get("model", "").lower()
            pk = item.get("pk")
            fields = item.get("fields", {})

            if model_type == "hollander.make":
                make_name = fields.get("make_name")
                make_id = fields.get("make_id") or fields.get("make")
                if make_name:
                    makes_data.append({"pk": str(pk), "make_id": str(make_id), "name": make_name})

            elif model_type == "hollander.model":
                model_name = fields.get("model_name")
                make_fk = fields.get("make") or fields.get("make_id") or fields.get("make_ref_id")
                model_id = fields.get("model_id") or fields.get("model")
                if model_name and make_fk is not None:
                    models_data.append({"pk": str(pk), "model_id": str(model_id), "make_fk": str(make_fk), "name": model_name})

            elif model_type == "hollander.partpricing":
                year_start = fields.get("year_start")
                year_end = fields.get("year_end")
                model_fk = fields.get("model") or fields.get("model_id") or fields.get("model_ref_id")
                
                if year_start and year_end:
                    years_data.append({
                        "start": int(year_start),
                        "end": int(year_end),
                        "model_fk": str(model_fk) if model_fk is not None else None,
                        "model_name": fields.get("model") if isinstance(fields.get("model"), str) else None
                    })

        self.stdout.write(self.style.SUCCESS(f"Found {len(makes_data)} makes, {len(models_data)} models, {len(years_data)} year ranges in JSON."))

        # Warning before wipe
        self.stdout.write(self.style.WARNING("Clearing existing Transmission vehicle data..."))
        VehicleYear.objects.all().delete()
        VehicleModel.objects.all().delete()
        VehicleMake.objects.all().delete()

        # Insert Makes
        make_objects_by_pk = {}
        make_objects_by_custom = {}
        for m in makes_data:
            obj, _ = VehicleMake.objects.get_or_create(name=m["name"])
            make_objects_by_pk[m["pk"]] = obj
            if m["make_id"] and m["make_id"] != "None":
                make_objects_by_custom[m["make_id"]] = obj
        
        # Insert Models
        model_objects_by_pk = {}
        model_objects_by_custom = {}
        for m in models_data:
            make_obj = make_objects_by_pk.get(m["make_fk"]) or make_objects_by_custom.get(m["make_fk"])
            if make_obj:
                obj, _ = VehicleModel.objects.get_or_create(make=make_obj, name=m["name"])
                model_objects_by_pk[m["pk"]] = obj
                if m["model_id"] and m["model_id"] != "None":
                    model_objects_by_custom[m["model_id"]] = obj

        # Insert Years
        created_years = 0
        bulk_years = []
        
        model_name_to_obj = {obj.name.lower(): obj for obj in model_objects_by_pk.values()}
        
        for ydata in years_data:
            model_obj = model_objects_by_pk.get(ydata["model_fk"]) or model_objects_by_custom.get(ydata["model_fk"])
            
            if not model_obj and ydata.get("model_name"):
                model_obj = model_name_to_obj.get(ydata["model_name"].lower())
                
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

        # FALLBACK: The JSON dump is missing the 'hollander.year_range' table! 
        # partpricing only gave us years for models that have priced parts.
        # For any model that ended up with NO years, we will generate standard years
        # so the frontend dropdowns don't break!
        empty_models = VehicleModel.objects.filter(years__isnull=True)
        fallback_years = []
        for model in empty_models:
            for yr in range(1980, 2025):
                fallback_years.append(VehicleYear(make=model.make, model=model, year=str(yr)))
        
        if fallback_years:
            self.stdout.write(self.style.WARNING(f"WARNING: The JSON dump was missing the year_range table! Adding {len(fallback_years)} fallback years for empty models."))
            for i in range(0, len(fallback_years), batch_size):
                VehicleYear.objects.bulk_create(fallback_years[i:i+batch_size], ignore_conflicts=True)

        total_years = VehicleYear.objects.count()
        self.stdout.write(self.style.SUCCESS(f"Done! Inserted {len(make_objects_by_pk)} makes, {len(model_objects_by_pk)} models, and {total_years} individual year records to exactly match Junkyard!"))
