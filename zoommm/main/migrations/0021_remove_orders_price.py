# Generated by Django 4.2.4 on 2024-01-15 15:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0020_rename_order_orders'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orders',
            name='price',
        ),
    ]
