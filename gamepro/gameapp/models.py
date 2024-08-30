from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Preorder(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    order=models.BooleanField(default=False)


class OTPVerification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)


class Verification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_verified = models.BooleanField(default=False)
