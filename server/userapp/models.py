from django.db import models
from django.contrib.auth.models import AbstractUser

# 擴充內建 User model
class CustomerUser(AbstractUser):
    phone_number = models.CharField(max_length=50, blank=False, null=True, unique=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    point = models.IntegerField(default=0)
    