# Generated by Django 4.2.4 on 2024-01-14 11:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_users_anonymous'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='username',
            field=models.CharField(db_index=True, max_length=32, primary_key=True, serialize=False, unique=True),
        ),
    ]
