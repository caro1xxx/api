# Generated by Django 4.2.4 on 2024-02-02 07:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0074_config'),
    ]

    operations = [
        migrations.RenameField(
            model_name='config',
            old_name='tag',
            new_name='updateTime',
        ),
    ]
