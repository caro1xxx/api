# Generated by Django 4.2.2 on 2024-01-21 11:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('convert', '0005_alter_user_download_alter_user_upload'),
    ]

    operations = [
        migrations.AddField(
            model_name='node',
            name='ip',
            field=models.CharField(default=1, max_length=32),
            preserve_default=False,
        ),
    ]
