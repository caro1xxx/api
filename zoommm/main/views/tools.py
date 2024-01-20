from django.http import JsonResponse
from rest_framework.views import APIView
from django.core import serializers
import json
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_control
from main.tools import getDelay
from main.task import asyncSendMail


class Ping(APIView):
  @method_decorator(cache_control(public=True, max_age=1800))
  def get(self, request, *args, **kwargs):
      ret = {'code': 200, 'message': '成功'}
      try:
        nodeTag = request.GET.get('node', None)
        delay = getDelay(nodeTag)
        if delay == False:
          ret['code'] = 500
          ret['message'] = "timeout"
        ret['ms'] = json.loads(delay)['ms']
        return JsonResponse(ret)
      except Exception as e:
        print(str(e))
        return JsonResponse({'code': 500, 'message': "timeout"})


class MailTools(APIView):
  def post(self, request, *args, **kwargs):
      ret = {'code': 200, 'message': '成功'}
      try:
        topice = json.loads(request.body).get('topice', None)
        content = json.loads(request.body).get('content', None)
        email = json.loads(request.body).get('email', None)
        asyncSendMail.delay(topice,content,[email])
        return JsonResponse(ret)
      except Exception as e:
        print(str(e))
        return JsonResponse({'code': 500, 'message': "timeout"})