from django.db import models


class Plans(models.Model):
  no = models.CharField(max_length=32, unique=True,db_index=True, primary_key=True)
  title = models.CharField(max_length=32)
  time = models.IntegerField()
  price = models.CharField(max_length=12)
  icon = models.TextField()
  stock = models.IntegerField()
  flow = models.IntegerField()
  type = models.BooleanField(default=False)
  recommend = models.CharField(max_length=24,null=True)


class Member(models.Model):
  email = models.CharField(max_length=32, unique=True,db_index=True, primary_key=True)
  password = models.CharField(max_length=32)
  createTime = models.IntegerField()
  code = models.CharField(max_length=6)
  expireTime = models.IntegerField(default=0)
  plan = models.ForeignKey(Plans, on_delete=models.CASCADE,null=True)
  system = models.BooleanField(default=True)
  concurrent = models.BooleanField(default=False)
  bascEmailNotify = models.BooleanField(default=True)
  marketingEmailNotify = models.BooleanField(default=True)
  rateLimit = models.IntegerField(default=0)
  cloudRules = models.BooleanField(default=False)
  balance = models.CharField(max_length=10,default="0")
  nextReset = models.CharField(max_length=16,default='0')


class Orders(models.Model):
  no = models.CharField(max_length=16,unique=True,db_index=True, primary_key=True)
  user = models.ForeignKey(Member, on_delete=models.CASCADE,null=True,default=None)
  plan = models.ForeignKey(Plans, on_delete=models.CASCADE)
  actuallyPaid = models.CharField(max_length=16)
  discount = models.CharField(max_length=16,default=None,null=True)
  createTime = models.IntegerField()
  status = models.BooleanField(default=False)


class DiscountCode(models.Model):
  no = models.CharField(max_length=16,unique=True,db_index=True, primary_key=True)
  sumCount = models.IntegerField()
  useCount = models.IntegerField(default=0)
  code = models.CharField(max_length=6)
  expire = models.IntegerField()
  effect = models.CharField(max_length=16)


class Servers(models.Model):
  name = models.TextField()
  local = models.CharField(max_length=32)
  magnification = models.IntegerField(default=1)
  delay = models.IntegerField(default=100)
  load = models.IntegerField(default=0)
  state = models.BooleanField(default=True)
  disney = models.BooleanField(default=True)
  netflix = models.BooleanField(default=True)
  dazm = models.BooleanField(default=True)
  openai = models.BooleanField(default=True)
  nodeTag = models.IntegerField(null=True)

# trojan-go 持久化
class User(models.Model):
  id = models.AutoField(primary_key=True)
  username = models.ForeignKey(Member, on_delete=models.CASCADE)
  password = models.CharField(max_length=56)
  plainText = models.CharField(max_length=16)
  quota = models.BigIntegerField(default=0)
  download = models.PositiveIntegerField(default=0)
  upload = models.PositiveIntegerField(default=0)
  class Meta:
      db_table = 'users'
      indexes = [
          models.Index(fields=['password'])
      ]


class Invites(models.Model):
  invite = models.ForeignKey(Member, on_delete=models.CASCADE)
  inviteCode = models.CharField(max_length=6)
  inviteTime = models.IntegerField()
  subscription = models.BooleanField(default=False)
  commission = models.CharField(max_length=12,default="0")


class Node(models.Model):
  domain = models.CharField(max_length=64,unique=True,db_index=True)
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