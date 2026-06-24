from django.db import models


class Review(models.Model):
    RATING_CHOICES = [(i, f"{i} Star{'s' if i != 1 else ''}") for i in range(1, 6)]
    TYPE_CHOICES = [
        ("Transmission", "Transmission"),
        ("Engine",        "Engine"),
        ("Axle",          "Axle"),
        ("Differential",  "Differential"),
        ("Drive Shaft",   "Drive Shaft"),
        ("Other",         "Other"),
    ]

    # Reviewer info
    name     = models.CharField(max_length=120, help_text="Display name, e.g. 'John D.'")
    location = models.CharField(max_length=200, blank=True, help_text="City, State ZIP")

    # Review content
    rating    = models.PositiveSmallIntegerField(choices=RATING_CHOICES, default=5)
    part_type = models.CharField(max_length=60, choices=TYPE_CHOICES, default="Transmission", verbose_name="Part Type")
    title     = models.CharField(max_length=200)
    body      = models.TextField()

    # "Loved the most" — stored as newline-separated items (up to 4)
    loved_most = models.TextField(
        blank=True,
        help_text="Enter each highlight on its own line (up to 4 lines)."
    )

    # Admin controls
    is_approved  = models.BooleanField(default=False, verbose_name="Approved",
                                       help_text="Only approved reviews appear on the website.")
    is_featured  = models.BooleanField(default=False, verbose_name="Featured",
                                       help_text="Pin this review to the top of the list.")
    submitted_at = models.DateTimeField(auto_now_add=True)
    updated_at   = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-is_featured", "-submitted_at"]
        verbose_name        = "Review"
        verbose_name_plural = "Reviews"

    def __str__(self):
        return f"{self.name} — {self.rating}★ ({self.part_type})"

    def loved_most_list(self) -> list[str]:
        """Return loved_most as a clean Python list."""
        return [line.strip() for line in self.loved_most.splitlines() if line.strip()][:4]
