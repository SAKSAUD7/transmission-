from django.db import models
from vehicles.models import VehicleMake, VehicleModel


class Lead(models.Model):
    # ── Contact info ───────────────────────────────────────────────────────────
    full_name    = models.CharField(max_length=200, verbose_name="Full Name")
    phone        = models.CharField(max_length=30, verbose_name="Phone Number")
    email        = models.EmailField(verbose_name="Email Address")
    zip_code     = models.CharField(max_length=20, blank=True, verbose_name="Zip Code")

    # ── Vehicle (FK + raw text fallback) ───────────────────────────────────────
    vehicle_make  = models.ForeignKey(
        VehicleMake, on_delete=models.SET_NULL, null=True, blank=True,
        related_name="leads", verbose_name="Make (FK)",
        help_text="Linked vehicle make from the database"
    )
    vehicle_model = models.ForeignKey(
        VehicleModel, on_delete=models.SET_NULL, null=True, blank=True,
        related_name="leads", verbose_name="Model (FK)",
        help_text="Linked vehicle model from the database"
    )
    car_make     = models.CharField(max_length=100, blank=True, verbose_name="Make (text)")
    car_model    = models.CharField(max_length=100, blank=True, verbose_name="Model (text)")
    car_year     = models.CharField(max_length=10, blank=True, verbose_name="Year")

    # ── Which part page + option ────────────────────────────────────────────────
    part_slug    = models.CharField(max_length=100, blank=True,
                                    help_text="e.g. transmissions-for-sale",
                                    verbose_name="Part Page Slug")
    part_type    = models.CharField(max_length=200, blank=True,
                                    help_text="Selected dropdown option",
                                    verbose_name="Part Type Selected")
    source_page  = models.CharField(max_length=200, blank=True, verbose_name="Source Page")

    # ── Status & notes ─────────────────────────────────────────────────────────
    is_contacted  = models.BooleanField(default=False, verbose_name="Contacted?")
    notes         = models.TextField(blank=True, verbose_name="Notes")
    created_at    = models.DateTimeField(auto_now_add=True, verbose_name="Received At")
    updated_at    = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Lead"
        verbose_name_plural = "Leads"

    def __str__(self):
        make = self.vehicle_make.name if self.vehicle_make else self.car_make
        model = self.vehicle_model.name if self.vehicle_model else self.car_model
        return f"{self.full_name} — {make} {model} — {self.part_slug}"

    @property
    def make_display(self):
        return self.vehicle_make.name if self.vehicle_make else self.car_make

    @property
    def model_display(self):
        return self.vehicle_model.name if self.vehicle_model else self.car_model
