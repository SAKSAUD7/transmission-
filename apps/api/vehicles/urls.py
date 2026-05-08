from django.urls import path
from . import views

urlpatterns = [
    path("makes/",  views.makes_list,  name="vehicle-makes"),
    path("models/", views.models_list, name="vehicle-models"),
    path("years/",  views.years_list,  name="vehicle-years"),
    path("360/",    views.asset_360,   name="vehicle-360"),
]
