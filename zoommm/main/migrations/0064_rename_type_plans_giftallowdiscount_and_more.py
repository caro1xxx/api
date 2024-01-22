# Generated by Django 4.2.4 on 2024-01-22 12:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0063_delete_node_delete_user'),
    ]

    operations = [
        migrations.RenameField(
            model_name='plans',
            old_name='type',
            new_name='giftAllowDiscount',
        ),
        migrations.RemoveField(
            model_name='plans',
            name='recommend',
        ),
        migrations.AddField(
            model_name='plans',
            name='giftCurrentCoutn',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='plans',
            name='giftEndTime',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='plans',
            name='giftStartTime',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='plans',
            name='giftSumCount',
            field=models.IntegerField(default=0),
        ),
    ]