# Generated by Django 4.2.4 on 2024-01-19 18:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0052_member_balance'),
    ]

    operations = [
        migrations.AddField(
            model_name='node',
            name='sumTraffice',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
