from django.db import models

# Create your models here.
class OrderItem(models.Model):
    order_item_id = models.IntegerField(blank=False, null=False)
    order_id = models.IntegerField(blank=False, null=False)
    product_id = models.IntegerField(blank=False, null=False)
    quantity = models.IntegerField(blank=False, null=False)
    amount = models.DecimalField(max_digits=10, decimal_places=2, blank=False, null=False)
    
    product_name = models.CharField(max_length=100, blank=False, null=False)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=False, null=False)

    def __str__(self):
        return self.order_item_id