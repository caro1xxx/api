# Generated by Django 4.2.4 on 2024-01-31 19:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0070_lotteryrecord'),
    ]

    operations = [
        migrations.CreateModel(
            name='PrizePool',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=32)),
                ('type', models.CharField(max_length=16)),
                ('icon', models.TextField()),
            ],
        ),
    ]
