
from django.conf.urls import include
from django.urls import re_path
from rest_framework.routers import DefaultRouter
from db_schema.views import *
router = DefaultRouter()


urlpatterns = [
    # User Analysis
    re_path(r'article$', ArticleView.as_view()),
    re_path(r'articles/(?P<id>[\w-]+)$', ArticleView.as_view(), name='article-detail'),
]
