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

@csrf_exempt
def user_register(request):
    if request.method == "POST":
        try:
            # 1) 解析 JSON body
            data = json.loads(request.body.decode('utf-8'))
            username = data.get("username", "").strip()
            email = data.get("email", "").strip()
            password = data.get("password", "").strip()
            phone_number = data.get("phone_number", "").strip()
            first_name = data.get("first_name", "").strip()
            last_name = data.get("last_name", "").strip()
            address = data.get("address", "").strip()

            # 2) 驗證必要欄位
            if not username:
                return JsonResponse({"error": "Username is required"}, status=400)
            if not email:
                return JsonResponse({"error": "Email is required"}, status=400)
            if not password:
                return JsonResponse({"error": "Password is required"}, status=400)
            if not phone_number:
                return JsonResponse({"error": "Phone number is required"}, status=400)

            # 3) 檢查重複性
            # 檢查 username 是否已存在
            if CustomerUser.objects.filter(username=username).exists():
                return JsonResponse({"error": "Username already exists"}, status=409)
            
            # 檢查 email 是否已存在
            if CustomerUser.objects.filter(email=email).exists():
                return JsonResponse({"error": "Email already exists"}, status=409)
            
            # 檢查 phone_number 是否已存在
            if CustomerUser.objects.filter(phone_number=phone_number).exists():
                return JsonResponse({"error": "Phone number already exists"}, status=409)

            # 4) 創建新用戶
            try:
                user = CustomerUser.objects.create_user(
                    username=username,
                    email=email,
                    password=password,
                    phone_number=phone_number,
                    first_name=first_name,
                    last_name=last_name,
                    address=address if address else None
                )
                
                # 5) 透過 ID 查詢完整用戶資訊
                created_user = CustomerUser.objects.get(id=user.id)
                
                # 6) 準備回傳資料
                user_data = {
                    "id": created_user.id,
                    "username": created_user.username,
                    "email": created_user.email,
                    "first_name": created_user.first_name,
                    "last_name": created_user.last_name,
                    "phone_number": created_user.phone_number,
                    "address": created_user.address,
                }

                return JsonResponse({
                    "success": 200,
                    "message": "Registration successful",
                    "data": user_data
                }, status=201)

            except IntegrityError as e:
                return JsonResponse({"error": "Registration failed due to data integrity error"}, status=400)
            except Exception as e:
                return JsonResponse({"error": f"Registration failed: {str(e)}"}, status=500)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)
        except Exception as e:
            return JsonResponse({"error": f"Unexpected error: {str(e)}"}, status=500)

    return JsonResponse({"error": "Only POST method allowed"}, status=405)
