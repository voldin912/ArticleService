from django.db import models
import json

from jwt_auth.models import *
# Create your models here.

class MemberFollow(models.Model):
    
    member = models.ForeignKey(User, on_delete=models.CASCADE, related_name="member")
    following = models.ForeignKey(User, on_delete=models.CASCADE, related_name="following")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Article(models.Model):

    cur_step = models.IntegerField(default=0)
    image = models.ImageField(upload_to='articles/images/', null=True, blank=True)
    title = models.CharField(max_length=255)
    content = models.TextField()
    categories = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=20, decimal_places=2, default=0.0)
    nonfree = models.IntegerField(default=0) 
    public = models.BooleanField(default=False)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)  # Link to User model
    created_at = models.DateTimeField(auto_now_add=True)  # Auto timestamp
    visited = models.IntegerField(default=0)
    def __str__(self):
        return self.title  # Display the title in admin and queries

class Sales(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    buyer = models.ForeignKey(User, on_delete=models.CASCADE)
    buy_at = models.DateTimeField(auto_now_add=True)