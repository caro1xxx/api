# Generated by Django 4.2.4 on 2024-01-15 10:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0017_subscription'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='users',
            name='expire',
        ),
    ]
