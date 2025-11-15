import json
from django.shortcuts import render
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Product

# Create your views here.
@csrf_exempt
def get_product(request, product_id):
    """
    根據 product_id 查詢單一商品資訊
    GET /products/<product_id>/
    """
    if request.method == "GET":
        try:
            # 查詢商品
            product = Product.objects.get(id=product_id)
            
            # 準備回傳資料
            product_data = {
                "id": product.id,
                "product_name": product.product_name,
                "description": product.description,
                "price": str(product.price),  # Decimal 轉字串避免序列化問題
                "image_url": product.image_url,
                "created_at": product.created_at.isoformat() if product.created_at else None,
                "updated_at": product.updated_at.isoformat() if product.updated_at else None,
            }
            
            return JsonResponse({
                "success": 200,
                "message": "Product found",
                "data": product_data
            }, status=200)
            
        except Product.DoesNotExist:
            return JsonResponse({
                "error": f"Product with id {product_id} not found"
            }, status=404)
        except Exception as e:
            return JsonResponse({
                "error": f"Unexpected error: {str(e)}"
            }, status=500)
    
    return JsonResponse({"error": "Only GET method allowed"}, status=405)

@csrf_exempt
def get_products(request):
    """
    查詢所有商品列表
    GET /products/
    """
    if request.method == "GET":
        try:
            # 查詢所有商品
            products = Product.objects.all()
            
            # 準備商品列表
            products_list = []
            for product in products:
                product_data = {
                    "id": product.id,
                    "product_name": product.product_name,
                    "description": product.description,
                    "price": str(product.price),
                    "image_url": product.image_url,
                    "created_at": product.created_at.isoformat() if product.created_at else None,
                    "updated_at": product.updated_at.isoformat() if product.updated_at else None,
                }
                products_list.append(product_data)
            
            return JsonResponse({
                "success": 200,
                "message": "Products retrieved successfully",
                "count": len(products_list),
                "data": products_list
            }, status=200)
            
        except Exception as e:
            return JsonResponse({
                "error": f"Unexpected error: {str(e)}"
            }, status=500)
    
    return JsonResponse({"error": "Only GET method allowed"}, status=405)

@csrf_exempt
def create_product(request):
    """
    創建新商品
    POST /products/create/
    """
    if request.method == "POST":
        try:
            # 1) 解析 JSON body
            data = json.loads(request.body.decode('utf-8'))
            product_name = data.get("product_name", "").strip()
            description = data.get("description", "").strip()
            price = data.get("price")
            image_url = data.get("image_url", "").strip()

            # 2) 驗證必要欄位
            if not product_name:
                return JsonResponse({"error": "Product name is required"}, status=400)
            
            if not price:
                return JsonResponse({"error": "Price is required"}, status=400)
            
            # 驗證價格格式
            try:
                price = float(price)
                if price < 0:
                    return JsonResponse({"error": "Price must be a positive number"}, status=400)
            except (ValueError, TypeError):
                return JsonResponse({"error": "Invalid price format"}, status=400)

            # 3) 創建新商品
            try:
                product = Product.objects.create(
                    product_name=product_name,
                    description=description if description else None,
                    price=price,
                    image_url=image_url if image_url else None
                )
                
                # 4) 準備回傳資料
                product_data = {
                    "id": product.id,
                    "product_name": product.product_name,
                    "description": product.description,
                    "price": str(product.price),
                    "image_url": product.image_url,
                    "created_at": product.created_at.isoformat() if product.created_at else None,
                    "updated_at": product.updated_at.isoformat() if product.updated_at else None,
                }

                return JsonResponse({
                    "success": 200,
                    "message": "Product created successfully",
                    "data": product_data
                }, status=201)

            except IntegrityError as e:
                return JsonResponse({
                    "error": f"Failed to create product due to data integrity error: {str(e)}"
                }, status=400)
            except Exception as e:
                return JsonResponse({
                    "error": f"Failed to create product: {str(e)}"
                }, status=500)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)
        except Exception as e:
            return JsonResponse({
                "error": f"Unexpected error: {str(e)}"
            }, status=500)

    return JsonResponse({"error": "Only POST method allowed"}, status=405)

# updateProduct
# deleteProduct
