from django.http import JsonResponse,HttpResponse
from rest_framework.views import APIView
from django.core import serializers
from convert.models import User,Node
import json
import requests
from urllib.parse import quote
from convert.tools import getCurrentTimestamp


class Convert(APIView):
  def get(self, request, *args, **kwargs):
    try:
      token = request.GET.get('token', None)
      target = request.GET.get('target', None)
      userFields = User.objects.filter(plainText=token).first()
      if userFields is None:
        return HttpResponse("404")
      nodeUrl = ""
      nodeAll = Node.objects.all()
      for node in nodeAll:
        nodeUrl = f"{nodeUrl}{node.protocol}://{quote(token)}@{node.domain}?sni={quote(node.sni)}&type={quote(node.type)}&path={quote('/'+node.path)}#{quote(node.tag)}|"
      
      response = requests.get(f"http://127.0.0.1:25500/sub?target={'clash' if target is None else target}&tfo={True}&interval={60 * 60 * 24}&filename={'ZOOM'}&append_info={True}&remove_emoji={False}&url={quote(nodeUrl[:-1])}")
      if response.status_code == 200:
        return HttpResponse(response.text)
      return 'Zoommm 专业机场网络隐私安全'
    except Exception as e:
      print(str(e))
      return JsonResponse({'code': 500, 'message': '服务器繁忙,请稍后再试'})