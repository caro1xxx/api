# Generated by Django 4.2.4 on 2024-02-04 15:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0077_member_temporarytraffic'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='plans',
            name='icon',
        ),
        migrations.RemoveField(
            model_name='plans',
            name='real',
        ),
        migrations.AddField(
            model_name='plans',
            name='featrue',
            field=models.CharField(default=1, max_length=16),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='plans',
            name='flow',
            field=models.IntegerField(verbose_name='单月流量'),
        ),
    ]
