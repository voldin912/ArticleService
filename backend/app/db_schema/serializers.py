from rest_framework import serializers
from django.db.models import *
import re
from .models import *
from jwt_auth.serializers import *

class ArticleSerializer(serializers.ModelSerializer):
    has_bought = serializers.SerializerMethodField()
    created_by = UserSerializer(read_only=True)
    class Meta:
        model = Article
        fields = ["id", "cur_step", 'title', "content", "image", "price", 'categories', 'nonfree', 'created_by','created_at','public','has_bought']
    def get_has_bought(self, obj):
        # リクエストユーザーを取得
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            # ユーザーが記事を購入したかどうかを確認
            return Sales.objects.filter(article=obj, buyer=request.user).exists()
        return False  # 未認証の場合はFalseを返す