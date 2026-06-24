import json
from django.http  import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import Review


def _cors(response):
    response["Access-Control-Allow-Origin"]  = "*"
    response["Access-Control-Allow-Headers"] = "Content-Type"
    return response


@require_http_methods(["GET"])
def reviews_list(request):
    """Return all approved reviews, newest first.
    Optional query param: ?type=Transmission  to filter by part type.
    """
    qs = Review.objects.filter(is_approved=True).order_by("-is_featured", "-submitted_at")

    part_type = request.GET.get("type", "").strip()
    if part_type:
        qs = qs.filter(part_type__iexact=part_type)

    data = [
        {
            "id":        r.id,
            "name":      r.name,
            "location":  r.location,
            "rating":    r.rating,
            "partType":  r.part_type,
            "title":     r.title,
            "body":      r.body,
            "lovedMost": r.loved_most_list(),
            "featured":  r.is_featured,
        }
        for r in qs
    ]
    return _cors(JsonResponse(data, safe=False))


@csrf_exempt
@require_http_methods(["POST", "OPTIONS"])
def reviews_submit(request):
    """Accept a new review submission from the frontend.
    The review is saved with is_approved=False so an admin must approve it first.
    """
    if request.method == "OPTIONS":
        r = JsonResponse({})
        r["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        return _cors(r)

    try:
        body = json.loads(request.body)
    except (json.JSONDecodeError, ValueError):
        return _cors(JsonResponse({"error": "Invalid JSON"}, status=400))

    name      = (body.get("name")     or "").strip()
    title     = (body.get("title")    or "").strip()
    review_body = (body.get("body")   or "").strip()

    if not name or not title or not review_body:
        return _cors(JsonResponse({"error": "name, title, and body are required."}, status=400))

    loved_lines = body.get("lovedMost", [])
    if isinstance(loved_lines, list):
        loved_lines = [str(x).strip() for x in loved_lines if str(x).strip()][:4]
        loved_text  = "\n".join(loved_lines)
    else:
        loved_text = ""

    review = Review.objects.create(
        name       = name,
        location   = (body.get("location") or "").strip(),
        rating     = max(1, min(5, int(body.get("rating", 5)))),
        part_type  = body.get("partType", "Transmission"),
        title      = title,
        body       = review_body,
        loved_most = loved_text,
        is_approved = False,   # Requires admin approval before going live
    )

    return _cors(JsonResponse({
        "success": True,
        "id":      review.id,
        "message": "Your review has been submitted and is pending approval. Thank you!",
    }, status=201))
