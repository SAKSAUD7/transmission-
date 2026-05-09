import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import VehicleMake, VehicleModel, Vehicle360Asset


@require_http_methods(["GET"])
def makes_list(request):
    makes = list(VehicleMake.objects.values("id", "name"))
    r = JsonResponse(makes, safe=False)
    r["Access-Control-Allow-Origin"] = "*"
    return r


@require_http_methods(["GET"])
def models_list(request):
    make_name = request.GET.get("make", "")
    if not make_name:
        r = JsonResponse([], safe=False)
        r["Access-Control-Allow-Origin"] = "*"
        return r
    models = list(
        VehicleModel.objects.filter(make__name=make_name)
        .order_by("name")
        .values("id", "name")
    )
    r = JsonResponse(models, safe=False)
    r["Access-Control-Allow-Origin"] = "*"
    return r


@require_http_methods(["GET"])
def years_list(request):
    years = [str(y) for y in range(2026, 1989, -1)]
    r = JsonResponse(years, safe=False)
    r["Access-Control-Allow-Origin"] = "*"
    return r


@require_http_methods(["GET"])
def asset_360(request):
    """
    Returns the best-matching 360° asset for a vehicle.

    Matching priority (most specific → most general):
      1. make + model + part_slug  (exact)
      2. make + model              (any part)
      3. make + part_slug          (model-agnostic with part)
      4. make only                 (generic make asset)

    This means an asset saved without a model FK still matches
    any model of that make — useful when you only have one
    360° video for all AMG GT Coupé variants, for example.
    """
    make_name  = request.GET.get("make",       "").strip()
    model_name = request.GET.get("model",      "").strip()
    asset_type = request.GET.get("asset_type", "car").strip()
    part_slug  = request.GET.get("part_slug",  "").strip()

    if not make_name:
        r = JsonResponse({"found": False})
        r["Access-Control-Allow-Origin"] = "*"
        return r

    base_qs = Vehicle360Asset.objects.filter(
        is_active=True,
        asset_type=asset_type,
        make__name=make_name,
    )

    asset = None

    # 1. Exact: make + model + part_slug
    if model_name and part_slug:
        asset = base_qs.filter(model__name=model_name, part_slug=part_slug).first()

    # 2. make + model (ignore part_slug)
    if not asset and model_name:
        asset = base_qs.filter(model__name=model_name).first()

    # 3. make + part_slug, model-agnostic (model FK is null)
    if not asset and part_slug:
        asset = base_qs.filter(model__isnull=True, part_slug=part_slug).first()

    # 4. make only — grab any active asset for this make
    if not asset:
        asset = base_qs.filter(model__isnull=True).first()

    # 5. Last resort — any active asset for this make regardless of model FK
    if not asset:
        asset = base_qs.first()

    if not asset:
        r = JsonResponse({"found": False})
        r["Access-Control-Allow-Origin"] = "*"
        return r

    r = JsonResponse({
        "found":        True,
        "videoUrl":     asset.video_url,
        "thumbnailUrl": asset.thumbnail_url,
        "label":        asset.label or str(asset),
        "make":         make_name,
        "model":        model_name,
        "assetModel":   asset.model.name if asset.model else None,
    })
    r["Access-Control-Allow-Origin"] = "*"
    return r
