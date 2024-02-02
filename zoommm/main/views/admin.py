from django.http import JsonResponse,HttpResponse
from rest_framework.views import APIView
from main.models import Member,Orders,Plans,Config,TicketRecord
import json
from main.tools import checkParams,encrypteToken,getCurrentTimestamp,getCurrentYMD,toMD5,clearExpiredUseToSide,generateRandomString,changeMarzbanUserData,getMonthOverResetDate
from main.task import asyncSendMail
from zoommm.settings import ADMIN_EMAIL,TINAXINGKEY
from django.core import serializers
from main.task import asyncAddProperty
from apscheduler.schedulers.background import BackgroundScheduler
from django_apscheduler.jobstores import DjangoJobStore, register_events, register_job
from datetime import datetime


# 实例化调度器
scheduler = BackgroundScheduler()
# 调度器使用默认的DjangoJobStore()
scheduler.add_jobstore(DjangoJobStore(), 'default')

class PayCallback(APIView):
  def get(self, request, *args, **kwargs):
      ret = {'code': 200, 'message': '成功'}
      try:
        pid = request.GET.get('pid', None)
        trade_no = request.GET.get('trade_no', None)
        out_trade_no = request.GET.get('out_trade_no', None)
        type = request.GET.get('type', None)
        name = request.GET.get('name', None)
        money = request.GET.get('money', None)
        trade_status = request.GET.get('trade_status', None)
        param = request.GET.get('param', None)
        sign = request.GET.get('sign', None)
        if checkParams([pid,trade_no,out_trade_no,type,name,money,trade_status,param,sign]) == False:
          ret['code'] = 422
          ret['message'] = "非法"
          return JsonResponse(ret)
        orderParmas = {
          "pid":pid,
          "trade_no":trade_no,
          "out_trade_no":out_trade_no,
          "type":type,
          "name":name,
          "money":money,
          "trade_status":trade_status,
          "param":param,
        }
        sortedParams = sorted((key, value) for key, value in orderParmas.items())
        signStr = "&".join(f"{key}={value}" for key, value in sortedParams)
        orderParmas["sign"] = toMD5(signStr+TINAXINGKEY)
        if orderParmas["sign"] != sign:
          ret['code'] = 422
          ret['message'] = "非法"
          return JsonResponse(ret)
        memberFields = Member.objects.filter(email=param).first()
        ordersFields = Orders.objects.filter(no=out_trade_no,status=False).first()
        memberFields.expireTime = getCurrentTimestamp()+ordersFields.plan.time*60*60*24 if memberFields.expireTime <= getCurrentTimestamp() else memberFields.expireTime + ordersFields.plan.time*60*60*24
        # requests.get(f"http://127.0.0.1:8001/api/v1/zoommm/corn?taskName=clearUser&excuteTime={memberFields.expireTime}&target={memberFields.email}")
        memberFields.plan = ordersFields.plan
        plainText = generateRandomString(16)
        loopFlow = ordersFields.plan.flow
        if ordersFields.plan.time > 30 and ordersFields.plan.time <= 360:
          loopFlow = ordersFields.plan.flow / (ordersFields.plan.time / 30)
          memberFields.nextReset = getMonthOverResetDate()
        createResult = changeMarzbanUserData(ordersFields.user.email,int((loopFlow*1073741824)/ordersFields.plan.real),memberFields.expireTime,"month" if ordersFields.plan.time > 30 and ordersFields.plan.time <= 360 else 'no_reset',ordersFields.plan.real)
        planFields = Plans.objects.filter(no=ordersFields.plan.no).first()
        if planFields is not None:
          planFields.stock = planFields.stock - 1
          planFields.save()
        ordersFields.status = True
        memberFields.save()
        ordersFields.save()
        return HttpResponse("success")
      except Exception as e:
        print(str(e))
        return JsonResponse({'code': 500, 'message': '服务器繁忙,请稍后再试'})

  def post(self, request, *args, **kwargs):
    ret = {'code': 200, 'message': '成功'}
    try:
      order = json.loads(request.body).get('order', None)
      ordersFields = Orders.objects.filter(no=order).first()
      if ordersFields is None:
        ret['code'] = 404
        ret['message'] = '订单不存在'
        return JsonResponse(ret)
      if ordersFields.status == False:
        ret['code'] = 403
        ret['message'] = '未支付'
        return JsonResponse(ret)
      ret['order'] = order
      return JsonResponse(ret)
    except Exception as e:
      print(str(e))
      return JsonResponse({'code': 500, 'message': "timeout"})


class Corn(APIView):
  def get(self, request, *args, **kwargs):
    ret = {'code': 200, 'message': '成功'}
    try:
      taskName = request.GET.get('taskName', None)
      target = request.GET.get('target', None)
      excuteTime = request.GET.get('excuteTime', None)
      if taskName == "clearUser":
        scheduler.add_job(clearUser, 'date',args=(target,),run_date=datetime.fromtimestamp(int(excuteTime)).strftime('%Y-%m-%d %H:%M:%S'))
      return HttpResponse("success")
    except Exception as e:
      print(str(e))
      return JsonResponse({'code': 500, 'message': '服务器繁忙,请稍后再试'})


class Notify(APIView):
  def get(self, request, *args, **kwargs):
    ret = {'code': 200, 'message': '成功'}
    try:
      notifyFiedls = Config.objects.filter(type='notify').first()
      ret['data'] = {
        "updateTime":notifyFiedls.updateTime,
        "content":notifyFiedls.content
      }
      return JsonResponse(ret)
    except Exception as e:
      print(str(e))
      return JsonResponse({'code': 500, 'message': '服务器繁忙,请稍后再试'})


class Ticket(APIView):
  def get(self, request, *args, **kwargs):
    ret = {'code': 200, 'message': '成功'}
    try:
      username = request.payload_data["username"]
      ret['data'] = json.loads(serializers.serialize('json',TicketRecord.objects.filter(user=username).all().order_by('-createTime')))
      return JsonResponse(ret)
    except Exception as e:
      print(str(e))
      return JsonResponse({'code': 500, 'message': '服务器繁忙,请稍后再试'})


  def post(self, request, *args, **kwargs):
    ret = {'code': 200, 'message': '成功'}
    try:
      username = request.payload_data["username"]
      email = json.loads(request.body).get('email', None)
      type = json.loads(request.body).get('type', None)
      content = json.loads(request.body).get('content', None)

      if checkParams([email,type,content]) == False:
        ret['code'] = 413
        ret['message'] = '请输入完整'
      else:
        TicketRecord.objects.create(type=type,content=content,createTime=getCurrentTimestamp(),user=username,email=email)
      return JsonResponse(ret)
    except Exception as e:
      print(str(e))
      return JsonResponse({'code': 500, 'message': '服务器繁忙,请稍后再试'})


def clearUser(target):
  clearExpiredUseToSide(target)


# 注册定时任务并开始
register_events(scheduler)
scheduler.start()