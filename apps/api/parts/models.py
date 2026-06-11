from django.db import models


class PartPage(models.Model):
    slug            = models.CharField(max_length=100, unique=True)
    name            = models.CharField(max_length=100)
    page_title      = models.CharField(max_length=200)
    hero_headline   = models.TextField(default="Get the Lowest Prices on\nUsed Parts!")
    hero_subtitle   = models.CharField(max_length=300, default="Save Up to 50% Off Dealer Prices with Fast Shipping!")
    hero_image      = models.CharField(max_length=300, default="/images/hero.png")
    product_image   = models.CharField(max_length=300, blank=True)
    video_url       = models.CharField(max_length=300, blank=True, help_text="Legacy hero video URL")
    about_text      = models.TextField()
    about_extra     = models.TextField(blank=True)
    part_type_label = models.CharField(max_length=100)
    part_finder_title = models.TextField()
    benefit_title   = models.CharField(max_length=200)
    is_active       = models.BooleanField(default=True)
    created_at      = models.DateTimeField(auto_now_add=True)
    updated_at      = models.DateTimeField(auto_now=True)

    # ── 360° / 3D asset for this part ──────────────────────────────────────────
    asset_360_video     = models.FileField(
        upload_to="360/parts/",
        blank=True, null=True,
        help_text="Upload an MP4 360° spin video for this part (e.g. transmission spinning)"
    )
    asset_360_thumbnail = models.ImageField(
        upload_to="360/parts/thumbnails/",
        blank=True, null=True,
        help_text="Preview thumbnail shown before the video plays"
    )
    asset_360_label     = models.CharField(
        max_length=200, blank=True,
        help_text="Display label for the 3D view, e.g. 'OEM Automatic Transmission'"
    )

    class Meta:
        ordering = ["name"]
        verbose_name = "Part Page"
        verbose_name_plural = "Part Pages"

    def __str__(self):
        return f"{self.name} ({self.slug})"

    @property
    def asset_360_video_url(self):
        if self.asset_360_video:
            return self.asset_360_video.url
        return None

    @property
    def asset_360_thumbnail_url(self):
        if self.asset_360_thumbnail:
            return self.asset_360_thumbnail.url
        return None


class PartType(models.Model):
    """The dropdown options for a specific part page (e.g. Automatic, Manual, CVT)"""
    part_page = models.ForeignKey(PartPage, on_delete=models.CASCADE, related_name="part_types")
    label     = models.CharField(max_length=100)
    order     = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "label"]
        verbose_name = "Part Type Option"
        verbose_name_plural = "Part Type Options"

    def __str__(self):
        return self.label


class PackageDetail(models.Model):
    """Bullet points shown in the Warranty section for each part page"""
    part_page   = models.ForeignKey(PartPage, on_delete=models.CASCADE, related_name="package_details")
    detail_text = models.CharField(max_length=300)
    order       = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]
        verbose_name = "Package Detail"
        verbose_name_plural = "Package Details"

    def __str__(self):
        return f"{self.part_page.name} → {self.detail_text[:50]}"


class Partner(models.Model):
    """Companies that are partnered with us."""
    name         = models.CharField(max_length=100, unique=True, help_text="Internal name (e.g., SUZUKI)")
    label        = models.CharField(max_length=100, help_text="Display name (e.g., Suzuki)")
    tagline      = models.CharField(max_length=200, blank=True, help_text="Short tagline (e.g., Way of Life!)")
    accent_color = models.CharField(max_length=20, default="#000000", help_text="Hex color code (e.g., #003087)")
    logo         = models.ImageField(upload_to="partners/logos/", help_text="Partner logo image")
    description  = models.TextField(blank=True, help_text="Detailed description of the partner")
    is_active    = models.BooleanField(default=True)
    order        = models.PositiveIntegerField(default=0, help_text="Lower numbers appear first")

    class Meta:
        ordering = ["order", "name"]
        verbose_name = "Partner"
        verbose_name_plural = "Partners"

    def __str__(self):
        return self.label
