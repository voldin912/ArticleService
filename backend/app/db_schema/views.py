from django.db import transaction
from .models import Article
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import *
from db_schema.serializers import *
import math

class ArticleView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request, id, *args, **kwargs):
        # IDに基づいて記事を取得
        article = get_object_or_404(Article, id=id)
        has_bought = Sales.objects.filter(article=article, buyer=request.user).exists()
        is_owner = article.created_by == request.user
        # コンテンツの決定
        if has_bought or is_owner:
            content = article.content  # コンテンツをそのまま返す
        else:
            length = math.ceil(((article.nonfree - 1) / 2 + 1) * 150)
            content = article.content[:length]  
            content += "..." 

        # シリアライズしてレスポンスを作成
        serializer = ArticleSerializer(article)
        response_data = serializer.data
        response_data['content'] = content  # コンテンツを上書き

        return Response(response_data, status=200)

    def post(self, request, *args, **kwargs):
        try:
            with transaction.atomic():
                article_id = request.data.get('id')  # リクエストからIDを取得
                # publicの値を取得
                public_value = request.data.get('public')

                # publicの値を判定
                if public_value is not None:  # publicが設定されている場合
                    article_public = public_value.lower() == 'true'  # "true"と等しい場合はTrueに設定
                else:
                    article_public = False  # 設定されていない場合はFalseをデフォルトに
                article_data = {
                    'cur_step': request.data.get('cur_step', 0),
                    'image': request.data.get('image'),  # 画像ファイルは適切に処理が必要
                    'title': request.data.get('title'),
                    'content': request.data.get('content'),
                    'price': request.data.get('price', 0.0),
                    'categories': request.data.get('category',''),
                    'nonfree': request.data.get('nonfree', 0),
                    'public': article_public,
                    'created_by': request.user  # 現在のユーザーを作成者として設定
                }

                # update_or_createを使って、存在する場合は更新、存在しない場合は作成
                article, created = Article.objects.update_or_create(
                    id=article_id,
                    defaults=article_data
                )

                return Response(ArticleSerializer(article).data, status=200)
        except Exception as e:
            print(str(e))
            return Response({"msg": str(e)}, status=400)

class PopularArticlesView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            category = request.data.get('category')
            print(category)
            top_articles = Article.objects.filter(public=1,categories__contains=category).order_by('-visited')[:4]
            return Response(ArticleSerializer(top_articles, many=True).data, 200)
        except Exception as e:
            print(str(e))
            return Response({"msg": "Can't find Article Info"}, status=404)
class FollowArticlesView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            category = request.data.get('category')
            print(category)
            top_articles = Article.objects.filter(public=1,categories__contains=category).order_by('-visited')[:4]
            return Response(ArticleSerializer(top_articles, many=True).data, 200)
        except Exception as e:
            print(str(e))
            return Response({"msg": "Can't find Article Info"}, status=404)
class CategoryArticlesView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        try:
            top_articles = Article.objects.filter(public=1,categories__contains='ゲーム').order_by('-visited')[:4]
            return Response(ArticleSerializer(top_articles, many=True).data, 200)
        except Exception as e:
            print(str(e))
            return Response({"msg": "Can't find Article Info"}, status=404)