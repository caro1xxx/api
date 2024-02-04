from django.db import models


class Plans(models.Model):
  no = models.CharField(max_length=32, unique=True,db_index=True, primary_key=True)
  title = models.CharField(max_length=32)
  time = models.IntegerField()
  price = models.CharField(max_length=12)
  stock = models.IntegerField()
  flow = models.IntegerField(verbose_name="单月流量")
  giftStartTime = models.IntegerField(default=0)
  giftEndTime = models.IntegerField(default=0)
  giftAllowDiscount = models.BooleanField(default=False)
  giftSumCount = models.IntegerField(default=0)
  giftCurrentCount = models.IntegerField(default=0)
  giftPrice = models.CharField(max_length=12,default='9999')
  type = models.CharField(default="cycle",null=True,max_length=32)
  state= models.BooleanField(default=True)
  idx = models.IntegerField(null=True)
  nodes = models.IntegerField(default=12)
  unlock = models.BooleanField(default=True)
  systemCount = models.BooleanField(default=True)
  reset = models.BooleanField(default=True)
  panel = models.BooleanField(default=True)
  account = models.BooleanField(default=True)
  record = models.BooleanField(default=True)
  welfare = models.BooleanField(default=True)


class Member(models.Model):
  email = models.CharField(max_length=32, unique=True,db_index=True, primary_key=True)
  password = models.CharField(max_length=32)
  createTime = models.IntegerField()
  code = models.CharField(max_length=6)
  expireTime = models.BigIntegerField(default=0)
  plan = models.ForeignKey(Plans, on_delete=models.CASCADE,null=True)
  system = models.BooleanField(default=True)
  concurrent = models.BooleanField(default=False)
  bascEmailNotify = models.BooleanField(default=True)
  marketingEmailNotify = models.BooleanField(default=True)
  rateLimit = models.IntegerField(default=0)
  cloudRules = models.BooleanField(default=False)
  balance = models.CharField(max_length=10,default="0")
  nextReset = models.CharField(max_length=16,default='0')
  temporaryTraffic = models.BigIntegerField(default=0,null=True)


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


class Invites(models.Model):
  invite = models.ForeignKey(Member, on_delete=models.CASCADE)
  inviteCode = models.CharField(max_length=6)
  inviteTime = models.IntegerField()
  subscription = models.BooleanField(default=False)
  commission = models.CharField(max_length=12,default="0")


class LotteryRecord(models.Model):
  code = models.CharField(max_length=16,unique=True,primary_key=True,db_index=True)
  date = models.CharField(max_length=24)
  member = models.ForeignKey(Member, on_delete=models.CASCADE,null=True)
  exchange = models.BooleanField(default=False)
  prize = models.CharField(max_length=32)
  time = models.IntegerField()


class PrizePool(models.Model):
  name = models.CharField(max_length=32)
  type = models.CharField(max_length=16)
  icon = models.TextField()
  idx = models.IntegerField()
  weights = models.IntegerField()


class Config(models.Model):
  type = models.CharField(max_length=64)
  content = models.TextField(null=True)
  updateTime = models.IntegerField(null=True)


class TicketRecord(models.Model):
  type = models.CharField(max_length=64)
  content = models.TextField()
  createTime = models.IntegerField()
  user = models.CharField(max_length=32)
  email = models.CharField(max_length=32)
  state = models.IntegerField(default=0)