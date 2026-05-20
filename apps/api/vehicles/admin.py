from django.contrib import admin
from django.utils.html import format_html
from django import forms
from .models import VehicleMake, VehicleModel, Vehicle360Asset, PART_PAGES, PART_PAGE_LABELS


# ─────────────────────────────────────────────────────────────────────────────
# HELPERS
# ─────────────────────────────────────────────────────────────────────────────
TICK  = "✅"
CROSS = "❌"

def _coverage_html(assets_qs):
    """Returns coloured coverage pill: e.g. '3 / 14 pages covered'."""
    part_slugs = {a.part_slug for a in assets_qs if a.asset_type == "part" and a.is_active and a.video}
    n = len(part_slugs)
    total = len(PART_PAGES)
    colour = "#16a34a" if n == total else ("#d97706" if n > 0 else "#dc2626")
    return format_html(
        '<span style="background:{};color:#fff;padding:2px 8px;border-radius:12px;'
        'font-size:11px;font-weight:700;">{}/{} pages</span>',
        colour, n, total
    )


# ─────────────────────────────────────────────────────────────────────────────
# CUSTOM FORM — year as dropdown, model filtered by make
# ─────────────────────────────────────────────────────────────────────────────
class Vehicle360AssetForm(forms.ModelForm):
    YEAR_CHOICES = [("", "— All years —")] + [(str(y), str(y)) for y in range(2026, 1984, -1)]
    year = forms.ChoiceField(choices=YEAR_CHOICES, required=False,
                             help_text="Leave blank to apply to all years of this model")

    class Meta:
        model  = Vehicle360Asset
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance.pk and self.instance.make_id:
            self.fields["model"].queryset = VehicleModel.objects.filter(make=self.instance.make)
        else:
            self.fields["model"].queryset = VehicleModel.objects.select_related("make").all()

        self.fields["model"].required    = False
        self.fields["model"].empty_label = "— All models of this make —"
        self.fields["make"].empty_label  = "— Select Make first —"
        self.fields["part_slug"].help_text = (
            "Select the page this part video belongs to. "
            "Leave blank for Car 360° View assets."
        )


# ─────────────────────────────────────────────────────────────────────────────
# INLINE: 360° assets shown inside VehicleModel detail page
# ─────────────────────────────────────────────────────────────────────────────
class Vehicle360AssetInline(admin.StackedInline):
    model       = Vehicle360Asset
    form        = Vehicle360AssetForm
    extra       = 0
    fields      = ["asset_type", "part_slug", "year", "video", "thumbnail", "label", "is_active"]
    show_change_link = True

    class Media:
        js = ("vehicles/admin_asset_form.js",)


# ─────────────────────────────────────────────────────────────────────────────
# VEHICLE MAKE ADMIN
# ─────────────────────────────────────────────────────────────────────────────
@admin.register(VehicleMake)
class VehicleMakeAdmin(admin.ModelAdmin):
    list_display  = ["name", "model_count", "asset_count", "coverage_badge", "created_at"]
    search_fields = ["name"]
    inlines       = []          # models managed via VehicleModel admin

    def model_count(self, obj):
        return obj.models.count()
    model_count.short_description = "Models"

    def asset_count(self, obj):
        return obj.assets.count()
    asset_count.short_description = "Total Assets"

    def coverage_badge(self, obj):
        return _coverage_html(obj.assets.all())
    coverage_badge.short_description = "Page Coverage"
    coverage_badge.allow_tags = True


# ─────────────────────────────────────────────────────────────────────────────
# VEHICLE MODEL ADMIN  ← central hub for managing all assets per car
# ─────────────────────────────────────────────────────────────────────────────
@admin.register(VehicleModel)
class VehicleModelAdmin(admin.ModelAdmin):
    list_display  = ["make", "name", "car_360", "part_coverage", "missing_pages", "created_at"]
    list_filter   = ["make"]
    search_fields = ["name", "make__name"]
    inlines       = [Vehicle360AssetInline]

    def _assets(self, obj):
        return obj.assets.all()

    def car_360(self, obj):
        has = obj.assets.filter(asset_type="car", is_active=True, video__isnull=False).exists()
        # Also check via make (model-agnostic assets)
        if not has:
            has = obj.make.assets.filter(
                asset_type="car", is_active=True,
                model__isnull=True, video__isnull=False
            ).exists()
        return format_html('<span style="font-size:16px">{}</span>', TICK if has else CROSS)
    car_360.short_description = "Car 360°"
    car_360.allow_tags = True

    def part_coverage(self, obj):
        return _coverage_html(obj.assets.all())
    part_coverage.short_description = "Part Coverage"
    part_coverage.allow_tags = True

    def missing_pages(self, obj):
        covered = {
            a.part_slug
            for a in obj.assets.filter(asset_type="part", is_active=True)
            if a.video
        }
        missing = [label for slug, label in PART_PAGES if slug not in covered]
        if not missing:
            return format_html('<span style="color:#16a34a;font-weight:700">All covered ✅</span>')
        txt = ", ".join(missing[:4])
        if len(missing) > 4:
            txt += f" +{len(missing)-4} more"
        return format_html('<span style="color:#dc2626;font-size:11px">{}</span>', txt)
    missing_pages.short_description = "Missing Pages"
    missing_pages.allow_tags = True


# ─────────────────────────────────────────────────────────────────────────────
# VEHICLE 360° ASSET ADMIN  — improved flat list
# ─────────────────────────────────────────────────────────────────────────────
@admin.register(Vehicle360Asset)
class Vehicle360AssetAdmin(admin.ModelAdmin):
    form          = Vehicle360AssetForm
    list_display  = [
        "vehicle_name", "asset_type_badge", "page_name_display",
        "has_video", "is_active", "uploaded_at",
    ]
    list_filter   = ["asset_type", "is_active", "make", "part_slug"]
    search_fields = ["make__name", "model__name", "label", "part_slug"]
    list_editable = ["is_active"]
    ordering      = ["make__name", "model__name", "asset_type", "part_slug"]

    fieldsets = [
        ("🚗  Vehicle", {
            "description": (
                "Select Make first — the Model dropdown updates automatically. "
                "Leave Model blank to cover ALL models of this make."
            ),
            "fields": ["make", "model", "year"],
        }),
        ("📦  Asset Type & Page", {
            "description": (
                "Choose 'Car 360° View' for a full-car spin (no page needed). "
                "Choose 'Part 360° View' and select the page it belongs to."
            ),
            "fields": ["asset_type", "part_slug", "label"],
        }),
        ("🎬  Media Files", {
            "description": "MP4 recommended. Max 50 MB. No audio needed (plays muted).",
            "fields": ["video", "thumbnail"],
        }),
        ("✅  Status", {
            "fields": ["is_active"],
        }),
    ]

    class Media:
        js  = ("vehicles/admin_asset_form.js",)
        css = {"all": ("vehicles/admin_coverage.css",)}

    # ── Custom list columns ───────────────────────────────────────────────────

    def vehicle_name(self, obj):
        parts = [obj.make.name]
        if obj.model:
            parts.append(obj.model.name)
        if obj.year:
            parts.append(f"({obj.year})")
        else:
            parts.append("(all years)")
        return " ".join(parts)
    vehicle_name.short_description = "Vehicle"
    vehicle_name.admin_order_field = "make__name"

    def asset_type_badge(self, obj):
        if obj.asset_type == "car":
            return format_html(
                '<span style="background:#1d4ed8;color:#fff;padding:2px 8px;'
                'border-radius:10px;font-size:11px;font-weight:700">🚗 Car</span>'
            )
        return format_html(
            '<span style="background:#7c3aed;color:#fff;padding:2px 8px;'
            'border-radius:10px;font-size:11px;font-weight:700">🔧 Part</span>'
        )
    asset_type_badge.short_description = "Type"
    asset_type_badge.allow_tags = True

    def page_name_display(self, obj):
        if not obj.part_slug:
            return format_html('<span style="color:#9ca3af">—</span>')
        label = PART_PAGE_LABELS.get(obj.part_slug, obj.part_slug)
        return format_html('<span style="font-weight:600">{}</span>', label)
    page_name_display.short_description = "Page"
    page_name_display.allow_tags = True

    def has_video(self, obj):
        return bool(obj.video)
    has_video.boolean = True
    has_video.short_description = "Video ✅"
