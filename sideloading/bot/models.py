from django.db import models


class BotUser(models.Model):
  userTelegramId = models.CharField(max_length=64,unique=True,db_index=True,primary_key=True)
  email = models.CharField(max_length=64,unique=True,db_index=True)