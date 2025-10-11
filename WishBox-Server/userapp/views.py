import json
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

import json
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def user_login(request):
    if request.method == "POST":
        try:
            # 1) 解析 JSON body
            data = json.loads(request.body.decode('utf-8'))
            username = data.get("username")
            password = data.get("password")

            if not username or not password:
                return JsonResponse({"error": "Missing username or password"}, status=400)

            # 2) 驗證帳號密碼
            user = authenticate(request, username=username, password=password)

            if user is not None:
                # 3) 登入 (建立 session)
                login(request, user)

                # 4) 回傳使用者資料
                user_data = {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "date_joined": user.date_joined,
                    "last_login": user.last_login,
                }

                return JsonResponse({
                    "message": "Login success",
                    "user": user_data
                }, status=200)

            else:
                return JsonResponse({"error": "Invalid username or password"}, status=401)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)

    return JsonResponse({"error": "Only POST method allowed"}, status=405)

