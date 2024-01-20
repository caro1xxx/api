from django.http import JsonResponse
from rest_framework.views import APIView
from main.models import Plans
from django.core import serializers
import json
from main.tools import checkParams,encrypteToken,getCurrentTimestamp
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_control


class Plan(APIView):
  @method_decorator(cache_control(public=True, max_age=1800))
  def get(self, request, *args, **kwargs):
      ret = {'code': 200, 'message': '成功'}
      try:
        count = request.GET.get('count', None)
        if count is None:
          ret['data'] = json.loads(serializers.serialize('json', Plans.objects.all().order_by('pk')))
        else:
          ret['data'] = json.loads(serializers.serialize('json', Plans.objects.all().order_by('pk')[:int(count)]))
        return JsonResponse(ret)
      except Exception as e:
          print(str(e))
          return JsonResponse({'code': 500, 'message': '服务器繁忙,请稍后再试'})