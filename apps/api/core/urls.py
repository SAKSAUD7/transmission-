from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/",          admin.site.urls),
    path("api/vehicles/",   include("vehicles.urls")),
    path("api/parts/",      include("parts.urls")),
    path("api/leads/",      include("leads.urls")),
    path("api/reviews/",    include("reviews.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
