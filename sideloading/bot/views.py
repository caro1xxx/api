from django.http import JsonResponse,HttpResponse
from rest_framework.views import APIView
from django.core import serializers
from bot.models import BotUser
from convert.models import Node
import json
import requests
from urllib.parse import quote
from django.core.cache import cache
from sideloading.settings import MARZAN_URL


class User(APIView):
  def get(self, request, *args, **kwargs):
    ret = {"code":200,"message":"success"}
    try:
      email = request.GET.get('email', None)
      telegramUserId = request.GET.get('telegramUserId', None)
      if email is None or telegramUserId is None:
        ret['code'] = 400
        ret['message'] = '输入格式有误'
        return JsonResponse(ret)
      headers = {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'bearer '+ cache.get("token")
      }
      user = requests.get(f"{MARZAN_URL}/api/user/{email}",headers=headers)
      if user.status_code != 200:
        ret['code'] = 400
        ret['message'] = '你没有注册ZoomCloud哦'
        return JsonResponse(ret)
      botUsers = BotUser.objects.filter(email=email).first()
      if botUsers is not None:
        ret['code'] = 400
        ret['message'] = '非法!'
        return JsonResponse(ret)
      botUsers = BotUser.objects.create(userTelegramId=telegramUserId,email=email)
      return JsonResponse(ret)
    except Exception as e:
      print(str(e))
      return JsonResponse({'code': 500, 'message': 'timeout'})

class Auth(APIView):
  def get(self, request, *args, **kwargs):
    ret = {"code":200,"message":"success"}
    try:
      telegramUserId = request.GET.get('telegramUserId', None)
      if telegramUserId is None:
        ret['code'] = 400
        ret['message'] = '输入格式有误'
        return JsonResponse(ret)
      botUsers = BotUser.objects.filter(userTelegramId=telegramUserId).first()
      if botUsers is  None:
        ret['code'] = 400
        ret['message'] = '未绑定ZoomCloud Bot!'
      return JsonResponse(ret)
    except Exception as e:
      print(str(e))
      return JsonResponse({'code': 500, 'message': 'timeout'})

class Core(APIView):
  def get(self, request, *args, **kwargs):
    ret = {"code":200,"message":"success"}
    try:
      if cache.get('core',None) is None:
        cache.set('core',1,60 * 10)
      else:
        ret['code'] = 412
        ret['message'] = '频率限制,请稍后再试'
        return JsonResponse(ret)
      headers = {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'bearer '+ cache.get("token")
      }
      user = requests.get(f"{MARZAN_URL}/api/system",headers=headers)
      if user.status_code != 200:
        ret['code'] = 400
      else:
        ret['message'] = user.json()
        ret['subNode'] = []
        nodeFields = Node.objects.all().order_by('sort')
        for node in nodeFields:
          ret['subNode'].append({
            "title":node.tag,
            "status":'connected'
          })
      return JsonResponse(ret)
    except Exception as e:
      print(str(e))
      return JsonResponse({'code': 500, 'message': 'timeout'})