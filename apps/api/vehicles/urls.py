from django.urls import path
from . import views
from .views_admin import coverage_dashboard, part_types_for_slug

urlpatterns = [
    path("makes/",       views.makes_list,      name="vehicle-makes"),
    path("makes",        views.makes_list,      name="vehicle-makes-ns"),
    path("models/",      views.models_list,     name="vehicle-models"),
    path("models",       views.models_list,     name="vehicle-models-ns"),
    path("years/",       views.years_list,      name="vehicle-years"),
    path("years",        views.years_list,      name="vehicle-years-ns"),
    path("360/",         views.asset_360,       name="vehicle-360"),
    path("360",          views.asset_360,       name="vehicle-360-ns"),
    path("coverage/",    coverage_dashboard,    name="vehicle-coverage"),
    path("coverage",     coverage_dashboard,    name="vehicle-coverage-ns"),
    path("part-types/",  part_types_for_slug,   name="vehicle-part-types"),
    path("part-types",   part_types_for_slug,   name="vehicle-part-types-ns"),
]
