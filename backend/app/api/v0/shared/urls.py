
from django.conf.urls import include
from django.urls import re_path
from rest_framework.routers import DefaultRouter
from db_schema.views import *
from .views.data import *

router = DefaultRouter()


urlpatterns = [
    re_path(r'^data/role$', GetRoleAPI.as_view()),
    re_path(r'^article/popular$', PopularArticlesView.as_view()),
    re_path(r'^article/follow_article$', FollowArticlesView.as_view()),
    re_path(r'^article/category_article$', CategoryArticlesView.as_view()),
]
