from django.db import models


class VehicleMake(models.Model):
    name = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["name"]
        verbose_name = "Vehicle Make"
        verbose_name_plural = "Vehicle Makes"

    def __str__(self):
        return self.name


class VehicleModel(models.Model):
    make = models.ForeignKey(VehicleMake, on_delete=models.CASCADE, related_name="models")
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["name"]
        unique_together = [["make", "name"]]
        verbose_name = "Vehicle Model"
        verbose_name_plural = "Vehicle Models"

    def __str__(self):
        return f"{self.make.name} {self.name}"


class Vehicle360Asset(models.Model):
    ASSET_TYPES = [
        ("car", "Car 360° View"),
        ("part", "Part 360° View"),
    ]

    make = models.ForeignKey(VehicleMake, on_delete=models.CASCADE, related_name="assets")
    model = models.ForeignKey(VehicleModel, on_delete=models.CASCADE, related_name="assets", null=True, blank=True)
    year = models.CharField(max_length=10, blank=True, help_text="Leave blank to apply to all years")
    asset_type = models.CharField(max_length=10, choices=ASSET_TYPES, default="car")
    part_slug = models.CharField(max_length=100, blank=True, help_text="e.g. transmissions-for-sale (for part assets only)")
    # Video file upload
    video = models.FileField(upload_to="360/videos/", blank=True, null=True, help_text="Upload MP4 360° spin video")
    thumbnail = models.ImageField(upload_to="360/thumbnails/", blank=True, null=True, help_text="Preview thumbnail image")
    label = models.CharField(max_length=200, blank=True, help_text="e.g. Mercedes-Benz AMG GT Coupe 2024")
    is_active = models.BooleanField(default=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-uploaded_at"]
        verbose_name = "360° Asset"
        verbose_name_plural = "360° Assets"

    def __str__(self):
        base = f"{self.make.name}"
        if self.model:
            base += f" {self.model.name}"
        if self.year:
            base += f" ({self.year})"
        return f"{base} — {self.get_asset_type_display()}"

    @property
    def video_url(self):
        if self.video:
            return self.video.url
        return None

    @property
    def thumbnail_url(self):
        if self.thumbnail:
            return self.thumbnail.url
        return None
