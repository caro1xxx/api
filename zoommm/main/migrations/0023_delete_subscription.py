# Generated by Django 4.2.4 on 2024-01-16 16:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0022_remove_flowrecord_user_remove_orders_plan_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Subscription',
        ),
    ]
