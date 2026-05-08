from django.contrib import admin
from django import forms
from .models import VehicleMake, VehicleModel, Vehicle360Asset


# ── Inline: Models inside a Make ──────────────────────────────────────────────
class VehicleModelInline(admin.TabularInline):
    model = VehicleModel
    extra = 1
    fields = ["name"]


# ── Custom form: year as dropdown, filtered model queryset ───────────────────
class Vehicle360AssetForm(forms.ModelForm):
    YEAR_CHOICES = [("", "— All years —")] + [
        (str(y), str(y)) for y in range(2026, 1984, -1)
    ]
    year = forms.ChoiceField(
        choices=YEAR_CHOICES,
        required=False,
        help_text="Leave blank to apply to all years",
    )

    class Meta:
        model  = Vehicle360Asset
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # On edit: restrict model queryset to the saved make
        if self.instance.pk and self.instance.make_id:
            self.fields["model"].queryset = VehicleModel.objects.filter(
                make=self.instance.make
            )
        else:
            # Add form: show all, JS will handle filtering
            self.fields["model"].queryset = VehicleModel.objects.select_related("make").all()

        # Make model field optional & add helpful empty label
        self.fields["model"].required    = False
        self.fields["model"].empty_label = "— Select Make first, then Model —"
        self.fields["make"].empty_label  = "— Select Make —"

        # part_slug only relevant for part assets — JS hides it for car
        self.fields["part_slug"].help_text = "Required for Part assets (e.g. transmissions-for-sale)"


# ── Make Admin ────────────────────────────────────────────────────────────────
@admin.register(VehicleMake)
class VehicleMakeAdmin(admin.ModelAdmin):
    list_display  = ["name", "model_count", "asset_count", "created_at"]
    search_fields = ["name"]
    inlines       = [VehicleModelInline]

    def model_count(self, obj):
        return obj.models.count()
    model_count.short_description = "Models"

    def asset_count(self, obj):
        return obj.assets.count()
    asset_count.short_description = "360° Assets"


# ── Model Admin ───────────────────────────────────────────────────────────────
@admin.register(VehicleModel)
class VehicleModelAdmin(admin.ModelAdmin):
    list_display  = ["make", "name", "created_at"]
    list_filter   = ["make"]
    search_fields = ["name", "make__name"]


# ── Vehicle360Asset Admin ─────────────────────────────────────────────────────
@admin.register(Vehicle360Asset)
class Vehicle360AssetAdmin(admin.ModelAdmin):
    form         = Vehicle360AssetForm
    list_display = ["__str__", "asset_type", "part_slug", "is_active", "has_video", "uploaded_at"]
    list_filter  = ["asset_type", "is_active", "make"]
    search_fields = ["make__name", "model__name", "label"]
    list_editable = ["is_active"]

    fieldsets = [
        ("🚗  Vehicle", {
            "description": "Select Make first — the Model list will update automatically.",
            "fields": ["make", "model", "year"],
        }),
        ("📦  Asset Type", {
            "description": "Choose 'Car 360° View' for a full-car spin, or 'Part 360° View' for a part.",
            "fields": ["asset_type", "part_slug", "label"],
        }),
        ("🎬  Media", {
            "fields": ["video", "thumbnail"],
        }),
        ("✅  Status", {
            "fields": ["is_active"],
        }),
    ]

    # Inject custom JS for Make→Model chaining, year dropdown, part_slug toggle
    class Media:
        js = ("vehicles/admin_asset_form.js",)

    def has_video(self, obj):
        return bool(obj.video)
    has_video.boolean = True
    has_video.short_description = "Video"
