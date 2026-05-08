from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import PartPage


@require_http_methods(["GET"])
def parts_list(request):
    pages = PartPage.objects.filter(is_active=True).prefetch_related("part_types", "package_details")
    data = [_serialize(p) for p in pages]
    r = JsonResponse(data, safe=False)
    r["Access-Control-Allow-Origin"] = "*"
    return r


@require_http_methods(["GET"])
def part_detail(request, slug):
    try:
        page = PartPage.objects.prefetch_related("part_types", "package_details").get(slug=slug, is_active=True)
    except PartPage.DoesNotExist:
        r = JsonResponse({"error": "Not found"}, status=404)
        r["Access-Control-Allow-Origin"] = "*"
        return r
    r = JsonResponse(_serialize(page))
    r["Access-Control-Allow-Origin"] = "*"
    return r


def _serialize(page):
    return {
        "slug": page.slug,
        "name": page.name,
        "pageTitle": page.page_title,
        "heroHeadline": page.hero_headline,
        "heroSubtitle": page.hero_subtitle,
        "heroImage": page.hero_image,
        "productImage": page.product_image,
        "videoUrl": page.video_url,
        "aboutText": page.about_text,
        "aboutExtra": page.about_extra,
        "partTypeLabel": page.part_type_label,
        "partFinderTitle": page.part_finder_title,
        "benefitTitle": page.benefit_title,
        "partTypes": [t.label for t in page.part_types.all()],
        "packageDetails": [d.detail_text for d in page.package_details.all()],
    }
