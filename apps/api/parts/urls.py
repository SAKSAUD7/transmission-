from django.urls import path
from . import views

urlpatterns = [
    path("", views.parts_list, name="parts-list"),
    path("partners/", views.partners_list, name="partners-list"),
    path("<str:slug>/", views.part_detail, name="part-detail"),
]
