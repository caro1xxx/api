# Generated by Django 4.2.4 on 2024-01-19 18:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0053_node_sumtraffice'),
    ]

    operations = [
        migrations.AddField(
            model_name='node',
            name='usedTraffice',
            field=models.FloatField(default=1),
            preserve_default=False,
        ),
    ]
