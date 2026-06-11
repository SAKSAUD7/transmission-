from django.urls import path, re_path
from . import views

urlpatterns = [
    path("", views.parts_list, name="parts-list"),
    path("partners/", views.partners_list, name="partners-list"),
    path("partners", views.partners_list, name="partners-list-noslash"),
    re_path(r"^(?P<slug>[\w-]+)/?$", views.part_detail, name="part-detail"),
]
