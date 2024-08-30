from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from gameapp.models import OTPVerification, Preorder, Verification

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']



    def create(self, validated_data):
        username = validated_data.get('username')
        email = validated_data.get('email')

        if User.objects.filter(username=username).exists():
            raise ValidationError({'username': 'A user with this username already exists.'})
        if User.objects.filter(email=email).exists():
            raise ValidationError({'email': 'A user with this email already exists.'})
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        
        user.set_password(validated_data['password'])
        user.save()
        return user
    

class PreorderSerializer(serializers.ModelSerializer):
    user=UserSerializer()
    class Meta:
        model = Preorder
        fields = ['id', 'user', 'order']


class OTPVerificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = OTPVerification
        fields = ['user', 'otp']


class VerificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Verification
        fields = ['user', 'is_verified']
      