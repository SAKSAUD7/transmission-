from django.contrib import admin
from .models import Review


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    # ── List view ──────────────────────────────────────────────────────────────
    list_display  = ("name", "rating_display", "part_type", "title_short",
                     "is_approved", "is_featured", "submitted_at")
    list_display_links = ("name",)
    list_editable = ("is_approved", "is_featured")
    list_filter   = ("is_approved", "is_featured", "part_type", "rating",
                     "submitted_at")
    search_fields = ("name", "location", "title", "body")
    ordering      = ("-is_featured", "-submitted_at")
    date_hierarchy = "submitted_at"

    # ── Detail / edit view ─────────────────────────────────────────────────────
    fieldsets = (
        ("Reviewer Info", {
            "fields": ("name", "location"),
        }),
        ("Review Content", {
            "fields": ("part_type", "rating", "title", "body", "loved_most"),
        }),
        ("Moderation", {
            "fields": ("is_approved", "is_featured"),
            "description": (
                "✅ Tick <b>Approved</b> to make the review visible on the website.<br>"
                "⭐ Tick <b>Featured</b> to pin it to the top of the list."
            ),
        }),
    )

    readonly_fields = ("submitted_at", "updated_at")

    # ── Bulk actions ───────────────────────────────────────────────────────────
    actions = ["approve_reviews", "reject_reviews", "feature_reviews", "unfeature_reviews"]

    @admin.action(description="✅ Approve selected reviews")
    def approve_reviews(self, request, queryset):
        updated = queryset.update(is_approved=True)
        self.message_user(request, f"{updated} review(s) approved and now visible on the website.")

    @admin.action(description="🚫 Reject (hide) selected reviews")
    def reject_reviews(self, request, queryset):
        updated = queryset.update(is_approved=False)
        self.message_user(request, f"{updated} review(s) hidden from the website.")

    @admin.action(description="⭐ Feature selected reviews")
    def feature_reviews(self, request, queryset):
        updated = queryset.update(is_featured=True)
        self.message_user(request, f"{updated} review(s) marked as featured.")

    @admin.action(description="★ Un-feature selected reviews")
    def unfeature_reviews(self, request, queryset):
        updated = queryset.update(is_featured=False)
        self.message_user(request, f"{updated} review(s) un-featured.")

    # ── Custom display helpers ─────────────────────────────────────────────────
    @admin.display(description="Rating", ordering="rating")
    def rating_display(self, obj):
        return "★" * obj.rating + "☆" * (5 - obj.rating)

    @admin.display(description="Title")
    def title_short(self, obj):
        return obj.title[:60] + ("…" if len(obj.title) > 60 else "")
