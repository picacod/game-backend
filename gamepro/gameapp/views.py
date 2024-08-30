from django.http import JsonResponse
from django.shortcuts import render
import razorpay
from django.conf import settings
import hmac
import hashlib
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import status
from gameapp.models import OTPVerification, Preorder, Verification
from gameapp.serializers import  PreorderSerializer, UserSerializer
from django.contrib.auth import authenticate, login as auth_login
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from rest_framework.exceptions import NotFound
from django.contrib.auth import logout as django_logout

from google.oauth2 import id_token
from google.auth.transport import requests
from rest_framework.serializers import Serializer, EmailField
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str  
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
import random
from rest_framework import serializers
from django.utils import timezone
# Create your models here.

# client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))

# def home(request):
#     return render(request, 'home.html')

# def verify_payment(request):
#     client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
    
#     payment_id = request.POST.get('razorpay_payment_id')
#     order_id = request.POST.get('razorpay_order_id')
#     signature = request.POST.get('razorpay_signature')

#     params = f"{order_id}|{payment_id}"
#     secret = settings.RAZORPAY_KEY_SECRET
#     generated_signature = hmac.new(secret.encode(), params.encode(), hashlib.sha256).hexdigest()

#     if hmac.compare_digest(generated_signature, signature):
#         return JsonResponse({'status': 'success'})
#     else:
#         return JsonResponse({'status': 'failure'})

# def create_order(request):
#     client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))

#     amount = 100    # Amount in paise (50000 paise = 500 INR)
#     currency = 'INR'
#     order = client.order.create({'amount': amount, 'currency': currency, 'payment_capture': '1'})
    
#     return JsonResponse({
#         'id': order['id'],
#         'amount': order['amount'],
#         'currency': order['currency']
#     })


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

                
            otp = random.randint(100000, 999999)
            OTPVerification.objects.create(user=user, otp=otp)

            send_mail(
                'Your Verification Code',
                f'Your verification code is {otp}',
                settings.DEFAULT_FROM_EMAIL,
                [user.email],
                fail_silently=False,
            )

            return Response({
                'message': 'User registered successfully. A verification email has been sent.',
                'user_id': user.id
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    if request.method == 'POST':
        email = request.data.get('email')
        password = request.data.get('password')
        
        if not email or not password:
            return Response({'message': 'Email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = authenticate(email=email, password=password)
        
        if user is None:
            return Response({'message': 'Invalid email or password.'}, status=status.HTTP_401_UNAUTHORIZED)
        
        try:
            verification = Verification.objects.get(user=user)
            if not user.is_superuser and verification.is_verified:
                auth_login(request, user)
                refresh = RefreshToken.for_user(user)
                return Response({
                    'message': 'Login successful',
                    'access_token': str(refresh.access_token),
                    'refresh_token': str(refresh),
                    'user_id': user.id  # Include user ID in response
                }, status=status.HTTP_200_OK)
            elif not verification.is_verified:
                return Response({'message': 'Account is not verified. Please verify your OTP.'}, status=status.HTTP_403_FORBIDDEN)
            else:
                return Response({'message': 'Superusers cannot log in.'}, status=status.HTTP_403_FORBIDDEN)
        except Verification.DoesNotExist:
            return Response({'message': 'Verification record not found. Please verify your OTP.'}, status=status.HTTP_400_BAD_REQUEST)
       

@api_view(['POST'])
@permission_classes([AllowAny])
def preorder(request):
    user_id = request.data.get('user_id')
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({"message": "User not found."}, status=status.HTTP_400_BAD_REQUEST)

    # Check if user has already pre-ordered
    preorder_instance = Preorder.objects.filter(user=user).first()
    
    if preorder_instance and preorder_instance.order:
        return Response({"message": "You have already pre-ordered."}, status=status.HTTP_200_OK)
    
    if not preorder_instance:
        preorder_instance = Preorder(user=user, order=True)
    else:
        preorder_instance.order = True
    
    preorder_instance.save()

    # Serialize the preorder instance
    serializer = PreorderSerializer(preorder_instance)
    
    return Response({"message": "Pre-order successful.", "preorder": serializer.data}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([AllowAny])
def check_preorder(request):
    user_id = request.query_params.get('user_id') 
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({"preordered": False}, status=status.HTTP_200_OK)

    preorder_instance = Preorder.objects.filter(user=user).first()
    
    if preorder_instance and preorder_instance.order:
        serializer = PreorderSerializer(preorder_instance)
        return Response({"preordered": True, "preorder": serializer.data}, status=status.HTTP_200_OK)
    
    return Response({"preordered": False}, status=status.HTTP_200_OK)



@api_view(['POST'])
@permission_classes([AllowAny])
def admin_login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user is not None and user.is_staff:
        auth_login(request, user)
        refresh = RefreshToken.for_user(user)
        return Response({
            'message': 'Login successful',
            'access_token': str(refresh.access_token),
            'refresh_token': str(refresh),
            'user_id': user.id  
        }, status=status.HTTP_200_OK)
    else:
        return Response({'detail': 'Invalid credentials or not an admin'}, status=status.HTTP_401_UNAUTHORIZED)
    

@api_view(['GET'])
@permission_classes([AllowAny])
def user_counts(request):
    total_users = User.objects.count()-1
    prebooked_users = Preorder.objects.filter(order=True).count()
    
    return Response({
        'total_users': total_users,
        'prebooked_users': prebooked_users
    }, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
def users_list(request):
    users = User.objects.exclude(is_superuser=True)
    
    user_data = [{
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'date_joined': user.date_joined.strftime('%d/%m/%Y'),
        'is_active': user.is_active
    } for user in users]
    
    return Response(user_data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([AllowAny])
def delete_user(request, user_id):
    try:
        user = User.objects.get(pk=user_id)
        if user.is_superuser:
            return Response({'error': 'Cannot delete admin users'}, status=status.HTTP_403_FORBIDDEN)
        user.delete()
        return Response({'message': 'User deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    except User.DoesNotExist:
        raise NotFound('User not found')
    

@api_view(['GET'])
@permission_classes([AllowAny])
def prebooked_users(request):
    prebooked_users = Preorder.objects.filter(order=True) 

    user_data = [{
        'id': user.user.id,
        'username': user.user.username,
        'email': user.user.email,
        'date_joined': user.user.date_joined.strftime('%d/%m/%Y'),
        'is_active': user.user.is_active
    } for user in prebooked_users]

    return Response(user_data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([AllowAny])
def adminlogout(request):
    django_logout(request)  
    return JsonResponse({'message': 'Logged out successfully'}, status=200)


@api_view(['POST'])
@permission_classes([AllowAny])
def google_login(request):
    token = request.data.get('id_token')  # Ensure 'id_token' matches frontend

    if not token:
        return Response({'detail': 'ID token is required.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        id_info = id_token.verify_oauth2_token(token, requests.Request(), settings.GOOGLE_CLIENT_ID)
        
        user_email = id_info.get('email')
        user_name = id_info.get('name')
        
        if not user_email:
            return Response({'detail': 'Email is not provided by Google.'}, status=status.HTTP_400_BAD_REQUEST)
        
        user, created = User.objects.get_or_create(email=user_email, defaults={'username': user_name})
        if created:
            user.set_unusable_password()
            user.save()

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        return Response({
            'access_token': access_token,
            'refresh_token': refresh_token,
            'user_id': user.id
        })

    except ValueError as e:
        return Response({'detail': 'Invalid ID token.', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'detail': 'An error occurred.', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
 



class PasswordResetSerializer(Serializer):
    email = EmailField()

@api_view(['POST'])
@permission_classes([AllowAny])
def password_reset_request(request):
    serializer = PasswordResetSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        user = User.objects.filter(email=email).first()
        if user and user.pk:  # Ensure user is found and has a valid primary key
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)
            domain = 'http://localhost:5173'
            reset_link = f'{domain}/resetpassword/{uid}/{token}/'
            
            # Debugging Output
            print(f"UID: {uid}, Token: {token}, Reset Link: {reset_link}")
            
            # Send reset link via email
            subject = 'Password Reset Request'
            message = f'Please use the following link to reset your password: {reset_link}'
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [email],
                fail_silently=False,
            )
            
            return Response({'message': 'Password reset email sent.', 'reset_link': reset_link}, status=status.HTTP_200_OK)
        
        return Response({'error': 'Email not found.'}, status=status.HTTP_404_NOT_FOUND)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetConfirmSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()
    new_password = serializers.CharField(min_length=8)
    

@api_view(['POST'])
@permission_classes([AllowAny])
def password_reset_confirm(request):
    print("Request Data:", request.data)  # Debugging line

    serializer = PasswordResetConfirmSerializer(data=request.data)
    if serializer.is_valid():
        uid = serializer.validated_data['uid']
        token = serializer.validated_data['token']
        new_password = serializer.validated_data['new_password']

        try:
            uid = force_str(urlsafe_base64_decode(uid))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({'error': 'Invalid token or user ID.'}, status=status.HTTP_400_BAD_REQUEST)

        if default_token_generator.check_token(user, token):
            user.set_password(new_password)
            user.save()
            return Response({'message': 'Password has been reset successfully.'}, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def verify_otp(request):
    user_id = request.data.get('user_id')
    otp = request.data.get('otp')

    if not user_id or not otp:
        return Response({'error': 'User ID and OTP are required.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        otp_record = OTPVerification.objects.filter(user_id=user_id, otp=otp).latest('created_at')
        current_time = timezone.now()
        otp_created_at = otp_record.created_at

        # Calculate the difference in minutes
        time_diff = (current_time - otp_created_at).total_seconds() / 60

        if time_diff <= 10:
            Verification.objects.create(user_id=user_id, is_verified=True)
            return Response({'message': 'OTP verified successfully!'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'OTP has expired.'}, status=status.HTTP_400_BAD_REQUEST)

    except OTPVerification.DoesNotExist:
        return Response({'error': 'Invalid OTP.'}, status=status.HTTP_400_BAD_REQUEST)