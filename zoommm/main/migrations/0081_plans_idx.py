# Generated by Django 4.2.4 on 2024-02-04 16:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0080_plans_account_plans_nodes_plans_panel_plans_record_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='plans',
            name='idx',
            field=models.IntegerField(null=True),
        ),
    ]
