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
        VehicleModel.objects.filter(make__name=make_name).values("id", "name")
    )
    r = JsonResponse(models, safe=False)
    r["Access-Control-Allow-Origin"] = "*"
    return r


@require_http_methods(["GET"])
def years_list(request):
    years = [str(y) for y in range(2025, 1989, -1)]
    r = JsonResponse(years, safe=False)
    r["Access-Control-Allow-Origin"] = "*"
    return r


@require_http_methods(["GET"])
def asset_360(request):
    """
    Returns the 360° asset (video URL + thumbnail) for a given vehicle.
    Query params: make, model, year (optional), asset_type (car|part), part_slug (optional)
    """
    make_name  = request.GET.get("make", "")
    model_name = request.GET.get("model", "")
    year       = request.GET.get("year", "")
    asset_type = request.GET.get("asset_type", "car")
    part_slug  = request.GET.get("part_slug", "")

    qs = Vehicle360Asset.objects.filter(
        is_active=True,
        asset_type=asset_type,
        make__name=make_name,
    )
    if model_name:
        qs = qs.filter(model__name=model_name)
    if part_slug:
        qs = qs.filter(part_slug=part_slug)

    asset = qs.first()
    if not asset:
        r = JsonResponse({"found": False})
        r["Access-Control-Allow-Origin"] = "*"
        return r

    r = JsonResponse({
        "found": True,
        "videoUrl": asset.video_url,
        "thumbnailUrl": asset.thumbnail_url,
        "label": asset.label,
        "make": make_name,
        "model": model_name,
    })
    r["Access-Control-Allow-Origin"] = "*"
    return r
