from django.http import JsonResponse
from rest_framework.views import APIView
from main.models import Node
from django.core import serializers
import json
from main.tools import parsePingOutput
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_control
import subprocess


class Ping(APIView):
  @method_decorator(cache_control(public=True, max_age=1800))
  def get(self, request, *args, **kwargs):
      ret = {'code': 200, 'message': '成功'}
      try:
        nodeTag =  request.GET.get('node', None)
        domain = Node.objects.filter(pk=int(nodeTag)).first().domain.replace(":443","")
        result = subprocess.run(['ping', '-c', '4', domain], capture_output=True, text=True)
        output = result.stdout
        ret['ms'] = parsePingOutput(output).split("/")
        return JsonResponse(ret)
      except Exception as e:
        print(str(e))
        return JsonResponse({'code': 500, 'message': "timeout"})