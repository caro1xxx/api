# Generated by Django 4.2.4 on 2024-01-16 19:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0028_alter_orders_plan_alter_orders_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orders',
            name='no',
            field=models.CharField(db_index=True, max_length=16, primary_key=True, serialize=False, unique=True),
        ),
    ]
