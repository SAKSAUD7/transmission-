from django.db import models
from django.utils.text import slugify


# ── Single source of truth for all 14 part pages ──────────────────────────────
PART_PAGES = [
    ("transmissions-for-sale",             "Transmissions"),
    ("engines-for-sale",                   "Engines"),
    ("axle-shaft-for-sale",                "Axle Shaft"),
    ("drive-shaft-for-sale",               "Drive Shaft"),
    ("differential-for-sale",              "Differential"),
    ("speedometer-for-sale",               "Speedometer"),
    ("throttle-body-for-sale",             "Throttle Body"),
    ("transfer-case-assembly-for-sale",    "Transfer Case Assembly"),
    ("steering-gear-rack-pinion-for-sale", "Steering Gear Rack & Pinion"),
    ("intake-manifold-for-sale",           "Intake Manifold"),
    ("steering-column-for-sale",           "Steering Column"),
    ("spindle-knuckle-for-sale",           "Spindle Knuckle"),
    ("axle-assembly-for-sale",             "Axle Assembly"),
    ("abs-assembly-for-sale",              "ABS Assembly"),
]

PART_PAGE_CHOICES = [("", "— Not applicable (car asset) —")] + PART_PAGES
PART_PAGE_LABELS  = {slug: label for slug, label in PART_PAGES}


# ── Smart upload path helpers ─────────────────────────────────────────────────
def _make_slug(text: str) -> str:
    return slugify(text or "unknown")


def vehicle_video_upload_path(instance, filename: str) -> str:
    """
    Organises uploaded videos into a meaningful folder hierarchy:

    Car 360°:
        360/vehicles/{make-slug}/{model-slug}/car.{ext}

    Part 360° (specific model):
        360/parts/{part-slug}/{make-slug}/{model-slug}/part.{ext}

    Part 360° (generic / all models):
        360/parts/{part-slug}/{make-slug}/generic/part.{ext}
    """
    ext        = filename.rsplit(".", 1)[-1].lower() if "." in filename else "mp4"
    make_slug  = _make_slug(instance.make.name  if instance.make  else "unknown")
    model_slug = _make_slug(instance.model.name if instance.model else "generic")

    if instance.asset_type == "car":
        return f"360/vehicles/{make_slug}/{model_slug}/car.{ext}"
    else:
        part = instance.part_slug or "unknown"
        return f"360/parts/{part}/{make_slug}/{model_slug}/part.{ext}"


def vehicle_thumb_upload_path(instance, filename: str) -> str:
    ext        = filename.rsplit(".", 1)[-1].lower() if "." in filename else "jpg"
    make_slug  = _make_slug(instance.make.name  if instance.make  else "unknown")
    model_slug = _make_slug(instance.model.name if instance.model else "generic")

    if instance.asset_type == "car":
        return f"360/vehicles/{make_slug}/{model_slug}/thumb.{ext}"
    else:
        part = instance.part_slug or "unknown"
        return f"360/parts/{part}/{make_slug}/{model_slug}/thumb.{ext}"


# ── Models ─────────────────────────────────────────────────────────────────────
class VehicleMake(models.Model):
    name       = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering        = ["name"]
        verbose_name    = "Vehicle Make"
        verbose_name_plural = "Vehicle Makes"

    def __str__(self):
        return self.name


class VehicleModel(models.Model):
    make       = models.ForeignKey(VehicleMake, on_delete=models.CASCADE, related_name="models")
    name       = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering        = ["name"]
        unique_together = [["make", "name"]]
        verbose_name    = "Vehicle Model"
        verbose_name_plural = "Vehicle Models"

    def __str__(self):
        return f"{self.make.name} {self.name}"


class Vehicle360Asset(models.Model):
    ASSET_TYPES = [
        ("car",  "Car 360° View"),
        ("part", "Part 360° View"),
    ]

    make       = models.ForeignKey(VehicleMake,  on_delete=models.CASCADE, related_name="assets")
    model      = models.ForeignKey(VehicleModel, on_delete=models.CASCADE, related_name="assets",
                                   null=True, blank=True,
                                   help_text="Leave blank = applies to ALL models of this make")
    year       = models.CharField(max_length=10, blank=True,
                                  help_text="Leave blank = applies to all years")
    asset_type = models.CharField(max_length=10, choices=ASSET_TYPES, default="car")

    # Dropdown from PART_PAGES — prevents slug typos
    part_slug  = models.CharField(
        max_length=100, blank=True,
        choices=PART_PAGE_CHOICES,
        help_text="Select the website page this part video belongs to (Part assets only)",
    )

    video      = models.FileField(
        upload_to=vehicle_video_upload_path,
        blank=True, null=True,
        help_text="Upload .mp4 360° spin video (max 50 MB recommended)",
    )
    thumbnail  = models.ImageField(
        upload_to=vehicle_thumb_upload_path,
        blank=True, null=True,
        help_text="Optional preview image shown before video loads",
    )
    label      = models.CharField(
        max_length=200, blank=True,
        help_text='Friendly label shown on website, e.g. "Toyota Camry 2024"',
    )
    is_active  = models.BooleanField(default=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering        = ["make__name", "model__name", "asset_type", "part_slug"]
        verbose_name    = "360° Asset"
        verbose_name_plural = "360° Assets"

    def __str__(self):
        base = self.make.name
        if self.model:
            base += f" {self.model.name}"
        if self.year:
            base += f" ({self.year})"
        page = PART_PAGE_LABELS.get(self.part_slug, "") if self.part_slug else ""
        suffix = page if page else self.get_asset_type_display()
        return f"{base} — {suffix}"

    @property
    def video_url(self):
        return self.video.url if self.video else None

    @property
    def thumbnail_url(self):
        return self.thumbnail.url if self.thumbnail else None

    @property
    def page_label(self):
        """Human-friendly page name for the part slug."""
        return PART_PAGE_LABELS.get(self.part_slug, self.part_slug or "—")
