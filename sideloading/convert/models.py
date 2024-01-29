from django.db import models

class Node(models.Model):
  domain = models.CharField(max_length=64,unique=True,db_index=True)
  ip = models.CharField(max_length=32,unique=True)
  entry = models.CharField(max_length=64,null=True)
  tag = models.TextField()
  sort = models.IntegerField(null=True)