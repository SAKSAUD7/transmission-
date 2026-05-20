"""
Custom Django admin view: 360° Asset Coverage Matrix.

Shows a matrix of VehicleModels (rows) × Part Pages (columns).
Each cell = ✅ has active video | 🟡 exists but inactive | ❌ missing.
Clicking ❌ goes straight to the "Add 360° Asset" pre-filled form.
"""
from django.contrib.admin.views.decorators import staff_member_required
from django.shortcuts import render
from django.urls import reverse
from django.utils.html import format_html

from .models import VehicleMake, VehicleModel, Vehicle360Asset, PART_PAGES, PART_PAGE_LABELS


@staff_member_required
def coverage_dashboard(request):
    # Build asset index: {(model_id, part_slug): asset}
    assets = Vehicle360Asset.objects.filter(asset_type="part").select_related("make", "model")
    car_assets = Vehicle360Asset.objects.filter(asset_type="car").select_related("make", "model")

    # Part assets indexed by (model_id, slug)
    part_index = {}
    for a in assets:
        if a.model_id:
            key = (a.model_id, a.part_slug)
            if key not in part_index or (a.is_active and a.video):
                part_index[key] = a

    # Car assets indexed by model_id
    car_index = {}
    for a in car_assets:
        if a.model_id:
            if a.model_id not in car_index or (a.is_active and a.video):
                car_index[a.model_id] = a
        else:
            # make-only car asset — covers all models of that make
            for m in a.make.models.all():
                if m.id not in car_index:
                    car_index[m.id] = a

    models = VehicleModel.objects.select_related("make").order_by("make__name", "name")

    add_url_base = reverse("admin:vehicles_vehicle360asset_add")

    rows = []
    for model in models:
        # Car 360° status
        car = car_index.get(model.id)
        if car and car.video and car.is_active:
            car_cell = {"status": "ok",       "icon": "✅", "url": None}
        elif car:
            car_cell = {"status": "inactive", "icon": "🟡", "url": None}
        else:
            car_cell = {"status": "missing",  "icon": "❌",
                        "url": f"{add_url_base}?make={model.make_id}&model={model.id}&asset_type=car"}

        # Part page cells
        page_cells = []
        for slug, label in PART_PAGES:
            a = part_index.get((model.id, slug))
            if a and a.video and a.is_active:
                cell = {"status": "ok",       "icon": "✅", "url": None, "label": label}
            elif a:
                cell = {"status": "inactive", "icon": "🟡", "url": None, "label": label}
            else:
                cell = {
                    "status": "missing", "icon": "❌", "label": label,
                    "url": (f"{add_url_base}?make={model.make_id}&model={model.id}"
                            f"&asset_type=part&part_slug={slug}")
                }
            page_cells.append(cell)

        covered = sum(1 for c in page_cells if c["status"] == "ok")
        rows.append({
            "make":       model.make.name,
            "model":      model.name,
            "model_url":  reverse("admin:vehicles_vehiclemodel_change", args=[model.id]),
            "car_cell":   car_cell,
            "page_cells": page_cells,
            "covered":    covered,
            "total":      len(PART_PAGES),
        })

    context = {
        "title":      "360° Asset Coverage Matrix",
        "part_pages": PART_PAGES,
        "rows":       rows,
        "opts":       {"app_label": "vehicles"},
        "has_permission": True,
    }
    return render(request, "admin/vehicles/coverage.html", context)
