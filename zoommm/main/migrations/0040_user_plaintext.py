# Generated by Django 4.2.4 on 2024-01-18 19:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0039_member_expiretime'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='plainText',
            field=models.CharField(default=1, max_length=16),
            preserve_default=False,
        ),
    ]
