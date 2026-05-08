from django.contrib import admin
from .models import PartPage, PartType, PackageDetail


class PartTypeInline(admin.TabularInline):
    model = PartType
    extra = 2
    fields = ["label", "order"]


class PackageDetailInline(admin.TabularInline):
    model = PackageDetail
    extra = 2
    fields = ["detail_text", "order"]


@admin.register(PartPage)
class PartPageAdmin(admin.ModelAdmin):
    list_display  = ["name", "slug", "is_active", "updated_at"]
    list_filter   = ["is_active"]
    search_fields = ["name", "slug"]
    list_editable = ["is_active"]
    prepopulated_fields = {"slug": ("name",)}
    inlines = [PartTypeInline, PackageDetailInline]
    fieldsets = [
        ("Identification", {"fields": ["slug", "name", "page_title", "is_active"]}),
        ("Hero", {"fields": ["hero_headline", "hero_subtitle", "hero_image", "video_url"]}),
        ("About Section", {"fields": ["about_text", "about_extra", "product_image"]}),
        ("Part Finder", {"fields": ["part_type_label", "part_finder_title"]}),
        ("Benefits", {"fields": ["benefit_title"]}),
    ]
