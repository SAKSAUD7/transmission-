"""
vehicles/admin.py
=================
Two completely separate admin views for the two asset types:

  VEHICLES section
  ─────────────────
  • Car 360° Assets  — Make / Model / Year focused
  • Vehicle Makes    — manage makes
  • Vehicle Models   — manage models (with inline asset list)

  PARTS section (handled from parts/admin.py but assets linked here)
  ─────────────────
  • Part 360° Assets — Part / Type focused, no car fields
"""
from django.contrib import admin
from django.utils.html import format_html
from django import forms

from .models import (
    VehicleMake, VehicleModel,
    Vehicle360Asset, CarAsset, PartAsset,
    PART_PAGES, PART_PAGE_LABELS,
)
from parts.models import PartType


# ─────────────────────────────────────────────────────────────────────────────
# SHARED HELPERS
# ─────────────────────────────────────────────────────────────────────────────
YEAR_CHOICES = [("", "— All years —")] + [(str(y), str(y)) for y in range(2026, 1984, -1)]

def _pill(text, colour):
    return format_html(
        '<span style="background:{};color:#fff;padding:2px 10px;border-radius:12px;'
        'font-size:11px;font-weight:700;white-space:nowrap">{}</span>',
        colour, text,
    )

def _tick(yes):
    return format_html(
        '<span style="font-size:16px">{}</span>', "✅" if yes else "❌"
    )


# ─────────────────────────────────────────────────────────────────────────────
# FORM: Car 360° Asset
# ─────────────────────────────────────────────────────────────────────────────
class CarAssetForm(forms.ModelForm):
    year = forms.ChoiceField(
        choices=YEAR_CHOICES, required=False,
        help_text="Leave blank to cover all years of this model",
    )

    class Meta:
        model  = Vehicle360Asset
        fields = ["make", "model", "year", "video", "thumbnail", "label", "is_active"]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["make"].required    = True
        self.fields["make"].empty_label = "— Select Make —"
        self.fields["model"].required   = False
        self.fields["model"].empty_label = "— All models of this make —"
        if self.instance.pk and self.instance.make_id:
            self.fields["model"].queryset = VehicleModel.objects.filter(make=self.instance.make)
        else:
            self.fields["model"].queryset = VehicleModel.objects.select_related("make").all()

    def save(self, commit=True):
        obj = super().save(commit=False)
        obj.asset_type = "car"
        obj.part_slug  = ""
        obj.part_type  = None
        if commit:
            obj.save()
        return obj


# ─────────────────────────────────────────────────────────────────────────────
# FORM: Part 360° Asset
# ─────────────────────────────────────────────────────────────────────────────
class PartAssetForm(forms.ModelForm):
    class Meta:
        model  = Vehicle360Asset
        fields = ["part_slug", "part_type", "video", "thumbnail", "label", "is_active"]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["part_slug"].required  = True
        self.fields["part_slug"].choices   = [("", "— Select Part —")] + PART_PAGES
        self.fields["part_type"].required  = False
        self.fields["part_type"].empty_label = "— Select Type (after choosing Part) —"

        # Filter part_type to match the current part_slug if editing
        if self.instance.pk and self.instance.part_slug:
            self.fields["part_type"].queryset = PartType.objects.filter(
                part_page__slug=self.instance.part_slug
            ).order_by("order", "label")
        else:
            self.fields["part_type"].queryset = PartType.objects.select_related("part_page").all()

    def save(self, commit=True):
        obj = super().save(commit=False)
        obj.asset_type = "part"
        obj.make  = None
        obj.model = None
        obj.year  = ""
        if commit:
            obj.save()
        return obj


# ─────────────────────────────────────────────────────────────────────────────
# ADMIN: Car 360° Assets
# ─────────────────────────────────────────────────────────────────────────────
@admin.register(CarAsset)
class CarAssetAdmin(admin.ModelAdmin):
    form = CarAssetForm

    list_display  = ["preview", "vehicle_name", "year_display", "label", "is_active", "uploaded_at"]
    list_display_links = ["preview", "vehicle_name"]
    list_filter   = ["is_active", "make", "year"]
    search_fields = ["make__name", "model__name", "year", "label"]
    list_editable = ["is_active"]
    ordering      = ["make__name", "model__name", "-year", "-uploaded_at"]

    fieldsets = [
        ("🚗  Vehicle", {
            "description": "Select Make first — Model dropdown updates automatically.",
            "fields": ["make", "model", "year"],
        }),
        ("🎬  Media", {
            "description": "Upload a 360° MP4 video or an image (PNG/JPG).",
            "fields": ["video", "thumbnail", "label"],
        }),
        ("✅  Status", {"fields": ["is_active"]}),
    ]

    class Media:
        js  = ("vehicles/admin_dynamic_dropdowns.js",)
        css = {"all": ("vehicles/admin_coverage.css",)}

    def get_queryset(self, request):
        return super().get_queryset(request).filter(asset_type="car")

    def preview(self, obj):
        if obj.thumbnail:
            return format_html('<img src="{}" style="height:40px; border-radius:4px; object-fit:cover;" />', obj.thumbnail.url)
        elif obj.video and str(obj.video).lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
            return format_html('<img src="{}" style="height:40px; border-radius:4px; object-fit:cover;" />', obj.video.url)
        elif obj.video:
            return format_html('<div style="height:40px; width:60px; background:#1f2937; border-radius:4px; display:flex; align-items:center; justify-content:center; color:#fff; font-size:10px;">MP4</div>')
        return format_html('<span style="color:#9ca3af">None</span>')
    preview.short_description = "Preview"

    def vehicle_name(self, obj):
        parts = [obj.make.name if obj.make else "?"]
        if obj.model:
            parts.append(obj.model.name)
        return " ".join(parts)
    vehicle_name.short_description = "Vehicle"
    vehicle_name.admin_order_field = "make__name"

    def year_display(self, obj):
        return obj.year if obj.year else format_html('<span style="color:#9ca3af">All years</span>')
    year_display.short_description = "Year"


# ─────────────────────────────────────────────────────────────────────────────
# ADMIN: Part 360° Assets
# ─────────────────────────────────────────────────────────────────────────────
@admin.register(PartAsset)
class PartAssetAdmin(admin.ModelAdmin):
    form = PartAssetForm

    list_display  = [
        "preview", "part_page_badge", "part_type_badge", "label",
        "is_active", "uploaded_at",
    ]
    list_display_links = ["preview", "part_page_badge"]
    list_filter   = ["is_active", "part_slug"]
    search_fields = ["part_slug", "part_type__label", "label"]
    list_editable = ["is_active"]
    ordering      = ["part_slug", "part_type__order", "part_type__label", "-uploaded_at"]

    fieldsets = [
        ("🔧  Part & Type", {
            "description": (
                "1. Select the Part page  →  "
                "2. The Type dropdown will load automatically  →  "
                "3. Select the specific type (e.g. Automatic, V6, Front)"
            ),
            "fields": ["part_slug", "part_type"],
        }),
        ("🎬  Media", {
            "description": "Upload a 360° MP4 video or an image (PNG/JPG).",
            "fields": ["video", "thumbnail", "label"],
        }),
        ("✅  Status", {"fields": ["is_active"]}),
    ]

    class Media:
        js  = ("vehicles/admin_dynamic_dropdowns.js",)
        css = {"all": ("vehicles/admin_coverage.css",)}

    def get_queryset(self, request):
        return super().get_queryset(request).filter(asset_type="part").select_related("part_type__part_page")

    def preview(self, obj):
        if obj.thumbnail:
            return format_html('<img src="{}" style="height:40px; border-radius:4px; object-fit:cover;" />', obj.thumbnail.url)
        elif obj.video and str(obj.video).lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
            return format_html('<img src="{}" style="height:40px; border-radius:4px; object-fit:cover;" />', obj.video.url)
        elif obj.video:
            return format_html('<div style="height:40px; width:60px; background:#1f2937; border-radius:4px; display:flex; align-items:center; justify-content:center; color:#fff; font-size:10px;">MP4</div>')
        return format_html('<span style="color:#9ca3af">None</span>')
    preview.short_description = "Preview"

    def part_page_badge(self, obj):
        label = PART_PAGE_LABELS.get(obj.part_slug, obj.part_slug or "?")
        return _pill(label, "#7c3aed")
    part_page_badge.short_description = "Part Page"
    part_page_badge.allow_tags = True
    part_page_badge.admin_order_field = "part_slug"

    def part_type_badge(self, obj):
        if not obj.part_type:
            return format_html('<span style="color:#9ca3af;font-style:italic">No type set</span>')
        return _pill(obj.part_type.label, "#0891b2")
    part_type_badge.short_description = "Type"
    part_type_badge.allow_tags = True
    part_type_badge.admin_order_field = "part_type__label"


# ─────────────────────────────────────────────────────────────────────────────
# ADMIN: Vehicle Make
# ─────────────────────────────────────────────────────────────────────────────
@admin.register(VehicleMake)
class VehicleMakeAdmin(admin.ModelAdmin):
    list_display  = ["name", "model_count", "created_at"]
    search_fields = ["name"]

    def model_count(self, obj):
        return obj.models.count()
    model_count.short_description = "Models"


# ─────────────────────────────────────────────────────────────────────────────
# ADMIN: Vehicle Model  (inline car assets per model)
# ─────────────────────────────────────────────────────────────────────────────
class CarAssetInline(admin.TabularInline):
    model  = Vehicle360Asset
    form   = CarAssetForm
    extra  = 1
    fields = ["year", "video", "thumbnail", "label", "is_active"]
    show_change_link = True

    def get_queryset(self, request):
        return super().get_queryset(request).filter(asset_type="car")

    class Media:
        js = ("vehicles/admin_dynamic_dropdowns.js",)


@admin.register(VehicleModel)
class VehicleModelAdmin(admin.ModelAdmin):
    list_display  = ["make", "name", "car_asset_count", "created_at"]
    list_filter   = ["make"]
    search_fields = ["name", "make__name"]
    inlines       = [CarAssetInline]

    def car_asset_count(self, obj):
        n = obj.assets.filter(asset_type="car").count()
        colour = "#16a34a" if n > 0 else "#9ca3af"
        return format_html(
            '<span style="color:{};font-weight:700">{} asset{}</span>',
            colour, n, "s" if n != 1 else "",
        )
    car_asset_count.short_description = "Car Assets"
    car_asset_count.allow_tags = True


# ─────────────────────────────────────────────────────────────────────────────
# Unregister the base Vehicle360Asset from admin (keep only the two proxy views)
# ─────────────────────────────────────────────────────────────────────────────
try:
    admin.site.unregister(Vehicle360Asset)
except admin.sites.NotRegistered:
    pass
