from django.contrib import admin
from .models import Lead


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display  = ["full_name", "phone", "email", "car_make", "car_model", "car_year",
                     "part_slug", "part_type", "is_contacted", "created_at"]
    list_filter   = ["is_contacted", "part_slug", "car_make", "created_at"]
    search_fields = ["full_name", "phone", "email", "car_make", "car_model"]
    list_editable = ["is_contacted"]
    readonly_fields = ["created_at"]
    ordering      = ["-created_at"]
    fieldsets = [
        ("Contact Info",   {"fields": ["full_name", "phone", "email", "zip_code"]}),
        ("Vehicle",        {"fields": ["car_make", "car_model", "car_year"]}),
        ("Part Request",   {"fields": ["part_slug", "part_type", "source_page"]}),
        ("Status",         {"fields": ["is_contacted", "notes", "created_at"]}),
    ]
