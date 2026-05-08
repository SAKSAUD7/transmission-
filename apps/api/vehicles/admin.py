from django.contrib import admin
from .models import VehicleMake, VehicleModel, Vehicle360Asset


class VehicleModelInline(admin.TabularInline):
    model = VehicleModel
    extra = 1
    fields = ["name"]


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


@admin.register(VehicleModel)
class VehicleModelAdmin(admin.ModelAdmin):
    list_display  = ["make", "name", "created_at"]
    list_filter   = ["make"]
    search_fields = ["name", "make__name"]


@admin.register(Vehicle360Asset)
class Vehicle360AssetAdmin(admin.ModelAdmin):
    list_display  = ["__str__", "asset_type", "part_slug", "is_active", "has_video", "uploaded_at"]
    list_filter   = ["asset_type", "is_active", "make"]
    search_fields = ["make__name", "model__name", "label"]
    list_editable = ["is_active"]
    fieldsets = [
        ("Vehicle", {"fields": ["make", "model", "year"]}),
        ("Asset Type", {"fields": ["asset_type", "part_slug", "label"]}),
        ("Media", {"fields": ["video", "thumbnail"]}),
        ("Status", {"fields": ["is_active"]}),
    ]

    def has_video(self, obj):
        return bool(obj.video)
    has_video.boolean = True
    has_video.short_description = "Video"
