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

PART_PAGE_CHOICES = [("", "— Select Part Page —")] + PART_PAGES
PART_PAGE_LABELS  = {slug: label for slug, label in PART_PAGES}


# ── Smart upload path helpers ─────────────────────────────────────────────────
def _slug(text: str) -> str:
    return slugify(text or "unknown")


def vehicle_video_upload_path(instance, filename: str) -> str:
    """
    Car 360°:   360/vehicles/{make}/{model}/car.{ext}
    Part 360°:  360/parts/{part-slug}/{type-slug}/part.{ext}
    """
    ext = filename.rsplit(".", 1)[-1].lower() if "." in filename else "mp4"

    if instance.asset_type == "car":
        make_slug  = _slug(instance.make.name  if instance.make  else "unknown")
        model_slug = _slug(instance.model.name if instance.model else "generic")
        return f"360/vehicles/{make_slug}/{model_slug}/car.{ext}"
    else:
        part      = instance.part_slug or "unknown"
        type_slug = _slug(instance.part_type.label) if instance.part_type else "generic"
        return f"360/parts/{part}/{type_slug}/part.{ext}"


def vehicle_thumb_upload_path(instance, filename: str) -> str:
    ext = filename.rsplit(".", 1)[-1].lower() if "." in filename else "jpg"

    if instance.asset_type == "car":
        make_slug  = _slug(instance.make.name  if instance.make  else "unknown")
        model_slug = _slug(instance.model.name if instance.model else "generic")
        return f"360/vehicles/{make_slug}/{model_slug}/thumb.{ext}"
    else:
        part      = instance.part_slug or "unknown"
        type_slug = _slug(instance.part_type.label) if instance.part_type else "generic"
        return f"360/parts/{part}/{type_slug}/thumb.{ext}"


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

    # ── Car fields (used for Car assets) ──────────────────────────────────────
    make  = models.ForeignKey(
        VehicleMake, on_delete=models.CASCADE, related_name="assets",
        null=True, blank=True,
        help_text="Required for Car assets. Leave blank for Part assets.",
    )
    model = models.ForeignKey(
        VehicleModel, on_delete=models.CASCADE, related_name="assets",
        null=True, blank=True,
        help_text="Leave blank = applies to ALL models of this make",
    )
    year  = models.CharField(
        max_length=10, blank=True,
        help_text="Leave blank = applies to all years",
    )

    asset_type = models.CharField(max_length=10, choices=ASSET_TYPES, default="car")

    # ── Part fields (used for Part assets) ────────────────────────────────────
    part_slug = models.CharField(
        max_length=100, blank=True,
        choices=PART_PAGE_CHOICES,
        help_text="Which part page does this asset belong to?",
    )
    part_type = models.ForeignKey(
        "parts.PartType",
        on_delete=models.SET_NULL,
        null=True, blank=True,
        related_name="assets",
        help_text="Which type within this part? (e.g. Automatic, V6, Front)",
    )

    # ── Media ─────────────────────────────────────────────────────────────────
    video     = models.FileField(
        upload_to=vehicle_video_upload_path,
        blank=True, null=True,
        help_text="Upload MP4 360° spin video (max 50 MB recommended)",
    )
    thumbnail = models.ImageField(
        upload_to=vehicle_thumb_upload_path,
        blank=True, null=True,
        help_text="Optional preview thumbnail shown before video plays",
    )
    label     = models.CharField(
        max_length=200, blank=True,
        help_text='Friendly label, e.g. "Toyota Camry 2024" or "Automatic Transmission"',
    )
    is_active   = models.BooleanField(default=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering        = ["asset_type", "part_slug", "part_type__label", "make__name", "model__name"]
        verbose_name    = "360° Asset"
        verbose_name_plural = "360° Assets"

    def __str__(self):
        if self.asset_type == "part":
            part  = PART_PAGE_LABELS.get(self.part_slug, self.part_slug or "?")
            ttype = self.part_type.label if self.part_type else "All Types"
            return f"{part} — {ttype}"
        # Car asset
        parts = [self.make.name if self.make else "?"]
        if self.model:
            parts.append(self.model.name)
        if self.year:
            parts.append(f"({self.year})")
        return " ".join(parts) + " — Car 360°"

    @property
    def video_url(self):
        return self.video.url if self.video else None

    @property
    def thumbnail_url(self):
        return self.thumbnail.url if self.thumbnail else None

    @property
    def page_label(self):
        return PART_PAGE_LABELS.get(self.part_slug, self.part_slug or "—")


# ── Proxy models for split admin views ────────────────────────────────────────

class CarAsset(Vehicle360Asset):
    """Proxy: shows ONLY Car 360° assets — car-centric admin view."""
    class Meta:
        proxy = True
        verbose_name        = "Car 360° Asset"
        verbose_name_plural = "Car 360° Assets"


class PartAsset(Vehicle360Asset):
    """Proxy: shows ONLY Part 360° assets — part/type-centric admin view."""
    class Meta:
        proxy = True
        verbose_name        = "Part 360° Asset"
        verbose_name_plural = "Part 360° Assets"
