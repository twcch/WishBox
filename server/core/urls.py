"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path

from userapp.views import user_login, user_register, get_user
from productapp.views import get_product, get_products, create_product

urlpatterns = [
    path("cp/", admin.site.urls),
    # User URLs
    path("users/login/", user_login, name="user_login"),
    path("users/register/", user_register, name="user_register"),
    path("users/<int:user_id>/", get_user, name="get_user"),
    # Product URLs
    path("products/<int:product_id>/", get_product, name="get_product"),
    path("products/", get_products, name="get_products"),
    path("products/create/", create_product, name="create_product"),
]
