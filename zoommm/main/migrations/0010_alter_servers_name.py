# Generated by Django 4.2.4 on 2024-01-15 05:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0009_alter_servers_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='servers',
            name='name',
            field=models.TextField(),
        ),
    ]
