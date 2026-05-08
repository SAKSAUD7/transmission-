from django.urls import path
from . import views

urlpatterns = [
    path("",          views.parts_list,   name="parts-list"),
    path("<str:slug>/", views.part_detail, name="part-detail"),
]
