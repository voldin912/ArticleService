from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth.hashers import check_password, make_password
from utils.permissions import IsAuthenticated
from django.db.models import *
from django.db import transaction

from db_schema.models import *
from db_schema.serializers import *
from validations.auth.profile import *

# Create your views here.
class GetMyAccountInfoView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({"me": serializer.data})
    
    
class ProfileView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        
        try:
            serializer = UserFlatSerializer(request.user.user_info)

            return Response(serializer.data, 200)

        except Exception as e:
            print(str(e))
            return Response({"msg": "Can't find User Info"}, status=404)
    
    def post(self, request):
        
        try:
            errors, status, clean_data = validate_profile(request)
            if status != 200:
                return Response({"errors": errors}, status=status)    
            
            with transaction.atomic():
                m_user = User.objects.get(id=request.user.id)
                m_user.email = clean_data['email']
                m_user.save()

                m_user.user_info.last_name = clean_data['last_name']
                m_user.user_info.first_name = clean_data['first_name']
                m_user.user_info.last_name_furi = clean_data['last_name_furi']
                m_user.user_info.first_name_furi = clean_data['first_name_furi']
                m_user.user_info.name = clean_data['last_name'] + " " + clean_data['first_name']
                m_user.user_info.name_furi = clean_data['last_name_furi'] + " " + clean_data['first_name_furi']
                m_user.user_info.phone = clean_data['phone']
                m_user.user_info.save()

                return Response({
                    "msg": "プロフィール情報が正常に更新されました。"
                })
        except Exception as e:
            print(str(e))
            return Response({"msg": str(e)}, status=400)

class AvatarUploadView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:   
            with transaction.atomic():
                m_user = User.objects.get(id=request.user.id)
                print(str(request.user.id))
                file = request.data.get('avatar')
                if file:
                    m_user.user_info.avatar = file
                    m_user.user_info.save()
                    return Response(UserSerializer(m_user).data, status=200)
                return Response({"error": "No avatar file provided"}, status=400)
        except Exception as e:
            print(str(e))
            return Response({"msg": str(e)}, status=400)

class UserNameView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:   
            with transaction.atomic():
                m_user = User.objects.get(id=request.user.id)
                print(str(request.user.id))
                m_user.user_info.first_name = request.data.get('first_name')
                m_user.user_info.last_name = request.data.get('last_name')
                m_user.user_info.first_name_furi = request.data.get('first_name_furi')
                m_user.user_info.last_name_furi = request.data.get('last_name_furi')
                m_user.user_info.name = request.data.get('last_name') + " " + request.data.get('first_name')
                m_user.user_info.name_furi = request.data.get('last_name_furi') + " " + request.data.get('first_name_furi')

                m_user.user_info.save()
                return Response(UserSerializer(m_user).data, status=200)
        except Exception as e:
            print(str(e))
            return Response({"msg": str(e)}, status=400)
class ProfileTextView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        m_user = User.objects.get(id=request.user.id)
        m_user.user_info.profile_text = request.data.get('profile_text')

        m_user.user_info.save()
        return Response(UserSerializer(m_user).data, status=200)

class EmailView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        m_user = User.objects.get(id=request.user.id)
        m_user.email = request.data.get('email')

        m_user.save()
        return Response(UserSerializer(m_user).data, status=200)