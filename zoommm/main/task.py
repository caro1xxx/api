import django
django.setup()
from celery import shared_task
from django.core.mail import send_mail
from main.models import Invites,Member,Orders,User,Plans
from zoommm.settings import EMAIL_HOST_USER
from django.core.cache import cache
from main.tools import getCurrentTimestamp
from main.tools import generateRandomString,encrypteSHA224,getMonthOverResetDate

@shared_task  # 邮件
def asyncSendMail(subject, message, recipientMail):
  send_mail(subject, message, f'Zoommm <{EMAIL_HOST_USER}>', recipientMail)


@shared_task #添加邀请用户
def asyncAddInviteUser(receive,inviteCode):
  receiveUser = Member.objects.filter(email=receive).first()
  if receiveUser is not None:
    Invites.objects.create(invite=receiveUser,inviteCode=inviteCode,inviteTime=getCurrentTimestamp())
  return None


@shared_task #添加订阅
def asyncAddProperty(param,out_trade_no):
  memberFields = Member.objects.filter(email=param).first()
  ordersFields = Orders.objects.filter(no=out_trade_no,status=False).first()
  memberFields.expireTime = getCurrentTimestamp()+ordersFields.plan.time*60*60*24 if memberFields.expireTime <= getCurrentTimestamp() else memberFields.expireTime + ordersFields.plan.time*60*60*24
  memberFields.plan = ordersFields.plan
  plainText = generateRandomString(16)
  loopFlow = ordersFields.plan.flow
  if ordersFields.plan.time > 30:
    loopFlow = ordersFields.plan.flow / (ordersFields.plan.time / 30)
    memberFields.nextReset = getMonthOverResetDate()
  User.objects.create(username=ordersFields.user,password=encrypteSHA224(plainText),plainText=plainText,quota=loopFlow*1073741824)
  planFields = Plans.objects.filter(no=ordersFields.plan.no).first()
  if planFields is not None:
    planFields.stock = planFields.stock - 1
    planFields.save()
  ordersFields.status = True
  memberFields.save()
  ordersFields.save()
  return None