import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import Lead


@csrf_exempt
@require_http_methods(["POST", "OPTIONS"])
def create_lead(request):
    if request.method == "OPTIONS":
        r = JsonResponse({})
        r["Access-Control-Allow-Origin"]  = "*"
        r["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        r["Access-Control-Allow-Headers"] = "Content-Type"
        return r

    try:
        data = json.loads(request.body)
        lead = Lead.objects.create(
            full_name   = data.get("fullName",   "").strip(),
            phone       = data.get("phone",      "").strip(),
            email       = data.get("email",      "").strip(),
            zip_code    = data.get("zip",        "").strip(),
            car_make    = data.get("carMake",    "").strip(),
            car_model   = data.get("carModel",   "").strip(),
            car_year    = data.get("carYear",    "").strip(),
            part_slug   = data.get("partSlug",   "").strip(),
            part_type   = data.get("partType",   "").strip(),
            source_page = data.get("sourcePage", "").strip(),
            notes       = data.get("notes",      "").strip(),   # ← was missing
        )
        r = JsonResponse({"success": True, "id": lead.id, "message": "Lead saved"}, status=201)
    except Exception as e:
        r = JsonResponse({"success": False, "error": str(e)}, status=400)

    r["Access-Control-Allow-Origin"] = "*"
    return r


@require_http_methods(["GET"])
def list_leads(request):
    leads = Lead.objects.all().values(
        "id", "full_name", "phone", "email", "zip_code",
        "car_make", "car_model", "car_year",
        "part_slug", "part_type", "source_page",
        "notes", "created_at", "is_contacted"
    )
    r = JsonResponse(list(leads), safe=False)
    r["Access-Control-Allow-Origin"] = "*"
    return r
