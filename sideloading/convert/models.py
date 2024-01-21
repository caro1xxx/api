from django.db import models


# trojan-go 持久化
class User(models.Model):
  id = models.AutoField(primary_key=True)
  username = models.CharField(max_length=32, unique=True,db_index=True)
  password = models.CharField(max_length=56, unique=True,db_index=True)
  plainText = models.CharField(max_length=16)
  quota = models.BigIntegerField(default=0)
  download = models.BigIntegerField(default=0)
  upload = models.BigIntegerField(default=0)
  class Meta:
      db_table = 'users'


class Node(models.Model):
  domain = models.CharField(max_length=64,unique=True,db_index=True)
  ip = models.CharField(max_length=32,unique=True)
  protocol = models.CharField(max_length=64,default="trojan-go")
  sni = models.CharField(max_length=64,default="microsoft.com")
  type = models.CharField(max_length=32,default="ws")
  path = models.CharField(max_length=32)
  shaEncryption = models.CharField(max_length=64,default="aes-128-gcm",null=True)
  encryptionKey = models.CharField(max_length=16,null=True)
  tag = models.TextField()
  sumTraffice = models.IntegerField()
  usedTraffice = models.FloatField(default=0.0)
  ban = models.BooleanField(default=False)