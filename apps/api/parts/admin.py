from django.contrib import admin
from django.utils.html import format_html
from .models import PartPage, PartType, PackageDetail, Partner


class PartTypeInline(admin.TabularInline):
    model   = PartType
    extra   = 2
    fields  = ["label", "order"]
    ordering = ["order", "label"]


class PackageDetailInline(admin.TabularInline):
    model   = PackageDetail
    extra   = 2
    fields  = ["detail_text", "order"]
    ordering = ["order"]


@admin.register(PartPage)
class PartPageAdmin(admin.ModelAdmin):
    list_display  = ["name", "slug", "type_count", "is_active", "updated_at"]
    list_filter   = ["is_active"]
    search_fields = ["name", "slug"]
    list_editable = ["is_active"]
    prepopulated_fields = {"slug": ("name",)}
    inlines = [PartTypeInline, PackageDetailInline]
    fieldsets = [
        ("Identification", {"fields": ["slug", "name", "page_title", "is_active"]}),
        ("Hero",           {"fields": ["hero_headline", "hero_subtitle", "hero_image", "hero_image_upload", "video_url", "hero_video_upload"]}),
        ("About Section",  {"fields": ["about_text", "about_extra", "product_image"]}),
        ("Part Finder",    {"fields": ["part_type_label", "part_finder_title"]}),
        ("Benefits",       {"fields": ["benefit_title"]}),
        ("360° Asset",     {"fields": ["asset_360_video", "asset_360_thumbnail", "asset_360_label"]}),
    ]

    def type_count(self, obj):
        count = obj.part_types.count()
        colour = "#16a34a" if count > 0 else "#dc2626"
        return format_html(
            '<span style="background:{};color:#fff;padding:2px 8px;border-radius:12px;'
            'font-size:11px;font-weight:700;">{} types</span>',
            colour, count,
        )
    type_count.short_description = "Types"
    type_count.allow_tags = True


@admin.register(PartType)
class PartTypeAdmin(admin.ModelAdmin):
    list_display  = ["label", "part_page", "order", "asset_count"]
    list_filter   = ["part_page"]
    search_fields = ["label", "part_page__name"]
    list_editable = ["order"]
    ordering      = ["part_page__name", "order", "label"]

    def asset_count(self, obj):
        count = obj.assets.count()
        if count == 0:
            return format_html('<span style="color:#9ca3af">0</span>')
        return format_html(
            '<span style="background:#7c3aed;color:#fff;padding:2px 8px;border-radius:10px;'
            'font-size:11px;font-weight:700">{} assets</span>',
            count,
        )
    asset_count.short_description = "360° Assets"
    asset_count.allow_tags = True


@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    list_display  = ["label", "name", "is_active", "order"]
    list_filter   = ["is_active"]
    search_fields = ["name", "label", "tagline"]
    list_editable = ["is_active", "order"]
    ordering      = ["order", "name"]
