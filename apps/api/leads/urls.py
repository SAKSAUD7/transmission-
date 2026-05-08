from django.urls import path
from . import views

urlpatterns = [
    path("", views.create_lead, name="create-lead"),   # POST /api/leads/
    path("list/", views.list_leads, name="list-leads"), # GET  /api/leads/list/
]
