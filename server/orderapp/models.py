from django.db import models

# Create your models here.
class Order(models.Model):
    order_id = models.IntegerField(blank=False, null=False)
    user_id = models.IntegerField(blank=False, null=False)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.order_id