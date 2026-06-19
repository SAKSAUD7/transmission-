import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import VehicleMake, VehicleModel, Vehicle360Asset, VehicleYear


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
    make_name  = request.GET.get("make",  "").strip()
    model_name = request.GET.get("model", "").strip()

    if not make_name or not model_name:
        r = JsonResponse([], safe=False)
        r["Access-Control-Allow-Origin"] = "*"
        return r

    # Query the dedicated VehicleYear table for this exact Make + Model
    years = list(
        VehicleYear.objects.filter(
            make__name=make_name,
            model__name=model_name
        ).values_list("year", flat=True).distinct()
    )

    # Sort numerically descending (newest first)
    try:
        years = sorted(years, key=lambda x: int(x), reverse=True)
    except ValueError:
        years.sort(reverse=True)

    r = JsonResponse(years, safe=False)
    r["Access-Control-Allow-Origin"] = "*"
    return r


@require_http_methods(["GET"])
def asset_360(request):
    """
    Returns the best-matching 360 asset.
    Now uses strict separation:
      - Car Assets: filtered by make and optionally model.
      - Part Assets: filtered by part_slug and optionally part_type.
    """
    make_name       = request.GET.get("make",       "").strip()
    model_name      = request.GET.get("model",      "").strip()
    asset_type      = request.GET.get("asset_type", "car").strip()
    part_slug       = request.GET.get("part_slug",  "").strip()
    part_type_label = request.GET.get("part_type",  "").strip()

    base_qs = Vehicle360Asset.objects.filter(
        is_active=True,
        asset_type=asset_type
    )

    asset = None

    if asset_type == "part":
        if not part_slug:
            r = JsonResponse({"found": False})
            r["Access-Control-Allow-Origin"] = "*"
            return r

        # 1. Exact match: Part Slug + Specific Type Label
        if part_type_label:
            asset = base_qs.filter(
                part_slug=part_slug,
                part_type__label=part_type_label
            ).first()

        # 2. Fallback: Any asset for this Part Slug
        if not asset:
            asset = base_qs.filter(part_slug=part_slug).first()

    else:  # "car"
        if not make_name:
            r = JsonResponse({"found": False})
            r["Access-Control-Allow-Origin"] = "*"
            return r

        # 1. Exact match: Make + Model
        if model_name:
            asset = base_qs.filter(
                make__name=make_name,
                model__name=model_name
            ).first()

        # 2. Fallback: Any asset for this Make
        if not asset:
            asset = base_qs.filter(make__name=make_name).first()

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
        "partType":     asset.part_type.label if asset.part_type else None,
    })
    r["Access-Control-Allow-Origin"] = "*"
    return r
