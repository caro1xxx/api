from django.http import JsonResponse,HttpResponse
from rest_framework.views import APIView
from main.models import Member,Orders,Plans
import json
from main.tools import checkParams,encrypteToken,getCurrentTimestamp,getCurrentYMD,toMD5
from main.task import asyncSendMail
from zoommm.settings import ADMIN_EMAIL,TINAXINGKEY
from main.task import asyncAddProperty

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
        asyncAddProperty.delay(param,out_trade_no)
        return HttpResponse("success")
      except Exception as e:
        print(str(e))
        return JsonResponse({'code': 500, 'message': '服务器繁忙,请稍后再试'})