from django.http import JsonResponse,HttpResponse
from rest_framework.views import APIView
from django.core import serializers
from convert.models import Node
import json
import requests
from urllib.parse import quote
from convert.tools import getCurrentTimestamp,formatTstoDatetimestamp
from sideloading.settings import MARZAN_URL
from django.core.cache import cache


class Convert(APIView):
  def get(self, request, *args, **kwargs):
    try:
      token = request.GET.get('token', None)
      target = request.GET.get('target', None)
      headers = {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'bearer '+cache.get("token")
      }
      response = requests.get(f"{MARZAN_URL}/sub/{token}/info", headers=headers)
      if response.status_code == 200:
        links = response.json()["links"]
        nodeFields = Node.objects.all().order_by("sort")
        replaceNodes = []
        userSubInfoNode = ""
        for node in nodeFields:
          for link in links:
            if node.ip in link:
              deleteOrigeiInfo = link.split("%29%20%5BShadowsocks%20-%20tcp%5D")
              puffix = deleteOrigeiInfo[0].split(":1080#")
              protocy = puffix[0].replace(f"{node.ip}",f"{node.entry}#{node.tag}")
              replaceNodes.append(protocy)
              if userSubInfoNode == "":
                userSubInfoNode = protocy
              break
        officeHint = f'{userSubInfoNode.split("#")[0]}#📢超时请刷新订阅 官网https://zoomm.cloud|'
        userSubInfoNode = f'{userSubInfoNode.split("#")[0]}#💧剩余≈{int(((response.json()["data_limit"] - response.json()["used_traffic"]) * float(response.json()["note"]))/ 1073741824)}GB ⌛到期:{formatTstoDatetimestamp(response.json()["expire"])}|'
        convertResponse = requests.get(f"http://127.0.0.1:25500/sub?target={'clash' if target is None else target}&tfo={True}&interval=43200&filename={'ZOOM'}&remove_emoji=false&url={quote(officeHint + userSubInfoNode+ '|'.join(replaceNodes))}")
        res = HttpResponse(convertResponse.text)
        res['Subscription-Userinfo'] = f"upload=-1; download={response.json()['used_traffic'] * float(response.json()['note'])}; total={response.json()['data_limit'] * float(response.json()['note'])}; expire={response.json()['expire']}"
        return res
      else:
        return HttpResponse('TOKEN_ERROR  Zoommm-专业机场网络隐私安全 https://zoomm.cloud')
    except Exception as e:
      print(str(e))
      return JsonResponse({'code': 500, 'message': 'TOKEN_ERROR  Zoommm-专业机场网络隐私安全 https://zoomm.cloud'})
