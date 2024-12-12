
from django.conf.urls import include
from django.urls import re_path
from rest_framework.routers import DefaultRouter

from .views.data import *

router = DefaultRouter()


urlpatterns = [
    re_path(r'^data/role$', GetRoleAPI.as_view()),
]
