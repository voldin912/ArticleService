from django.db import models
import json

from jwt_auth.models import *
# Create your models here.

class MemberFollow(models.Model):
    
    member = models.ForeignKey(User, on_delete=models.CASCADE, related_name="member")
    following = models.ForeignKey(User, on_delete=models.CASCADE, related_name="following")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)