from django.contrib import admin
from .models import CustomerUser

# Register your models here.
admin.site.register(CustomerUser)

# 自訂後台標題
admin.site.site_header = "WishBox 管理後台"  # 左上角標題
admin.site.site_title = "WishBox 後台"  # 瀏覽器標籤頁標題
admin.site.index_title = "歡迎使用 WishBox 管理系統"  # 首頁標題
