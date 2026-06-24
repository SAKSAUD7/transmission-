from django.urls import path
from . import views

urlpatterns = [
    path("",        views.reviews_list,   name="reviews-list"),
    path("submit/", views.reviews_submit, name="reviews-submit"),
]
