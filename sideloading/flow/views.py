from django.http import JsonResponse
from rest_framework.views import APIView
from django.core import serializers
from convert.models import User,Node
import json
import subprocess
from flow.tools import parsePingOutput,getCurrentYMD,encrypteSHA224
from sideloading.settings import MAIN_BACKEN,ADMIN_EMAIL,COCPTOKEY
import requests


class FlowProperty(APIView):
  def get(self, request, *args, **kwargs):
    ret = {"code":200,"message":"成功"}
    try:
      username = request.GET.get('username', None)
      userFields = User.objects.filter(username=username).first()
      if userFields is None:
        ret["code"] = 404
        return JsonResponse(ret)
      ret["download"] = userFields.download
      ret["upload"] = userFields.upload
      ret["quota"] = userFields.quota
      return JsonResponse(ret)
    except Exception as e:
      print(str(e))
      return JsonResponse({'code': 500, 'message': '服务器繁忙,请稍后再试'})


class subscribeDispatchUrl(APIView):
  def get(self, request, *args, **kwargs):
    ret = {"code":200,"message":"成功"}
    try:
      username = request.GET.get('username', None)
      userFields = User.objects.filter(username=username).first()
      if userFields is None:
        ret["code"] = 404
        return JsonResponse(ret)
      ret['convert'] = f"https://subscribe.voteinfo.life/api/v1/side/ZOOM%E6%9C%BA%E5%9C%BA?token={userFields.plainText}"
      return JsonResponse(ret)
    except Exception as e:
      print(str(e))
      return JsonResponse({'code': 500, 'message': '服务器繁忙,请稍后再试'})

  
class Ping(APIView):
  def get(self, request, *args, **kwargs):
    ret = {"code":200,"message":"成功"}
    try:
      nodeTag = request.GET.get('nodeTag', None)
      domain = Node.objects.filter(pk=int(nodeTag)).first().domain.replace(":443","")
      result = subprocess.run(['ping', '-c', '4', domain], capture_output=True, text=True)
      output = result.stdout
      ret['ms'] = parsePingOutput(output).split("/")
      return JsonResponse(ret)
    except Exception as e:
      print(str(e))
      return JsonResponse({'code': 500, 'message': '服务器繁忙,请稍后再试'})


class GFW(APIView):
  def get(self, request, *args, **kwargs):
      ret = {'code': 200, 'message': '成功'}
      try:
        localDomain = request.GET.get('localDomain', None)
        nodeFields = Node.objects.filter(domain=f"{localDomain}:443").first()
        if nodeFields is not None:
          nodeFields.ban = True
          nodeFields.save()
        requests.post(f"{MAIN_BACKEN}mailTools",json={"topic":"主机已被阻断 - Zoommm","content":f'阻断主机:{localDomain}\n时间:{getCurrentYMD()}',"email":ADMIN_EMAIL})
        return JsonResponse(ret)
      except Exception as e:
        print(str(e))
        return JsonResponse({'code': 500, 'message': '服务器繁忙,请稍后再试'})


class Traffic(APIView):
  def get(self, request, *args, **kwargs):
    ret = {'code': 200, 'message': '成功'}
    try:
      usedTraffic = request.GET.get('usedTraffic', None)
      localDomain = request.GET.get('localDomain', None)
      nodeFields = Node.objects.filter(domain=f"{localDomain}:443").first()
      if nodeFields is not None:
        nodeFields.usedTraffice = round(float(usedTraffic),3)
        nodeFields.save()
        parcent = nodeFields.usedTraffice / nodeFields.sumTraffice * 100
        if parcent >= 90:
          requests.post(f"{MAIN_BACKEN}mailTools",json={"topic":"流量预警 - Zoommm","content":f'主机:{localDomain}\n百分比:90%\n已使用流量:{round(float(usedTraffic),3)}GB\n时间:{getCurrentYMD()}',"email":ADMIN_EMAIL})
        elif parcent >= 50:
          requests.post(f"{MAIN_BACKEN}mailTools",json={"topic":"流量预警 - Zoommm","content":f'主机:{localDomain}\n百分比:50%\n已使用流量:{round(float(usedTraffic),3)}GB\n时间:{getCurrentYMD()}',"email":ADMIN_EMAIL})
      return JsonResponse(ret)
    except Exception as e:
      print(str(e))
      return JsonResponse({'code': 500, 'message': '服务器繁忙,请稍后再试'})


class createUser(APIView):
  def get(self, request, *args, **kwargs):
    ret = {'code': 200, 'message': '成功'}
    try:
      username = request.GET.get('username', None)
      plainText = request.GET.get('plainText', None)
      quota = request.GET.get('quota', None)
      User.objects.create(username=username,password=encrypteSHA224(plainText),plainText=plainText,quota=int(float(quota)))
      return JsonResponse(ret)
    except Exception as e:
      print(str(e))
      return JsonResponse({'code': 500, 'message': '服务器繁忙,请稍后再试'})

  
class userExpired(APIView):
  def get(self, request, *args, **kwargs):
    ret = {'code': 200, 'message': '成功'}
    try:
      username = request.GET.get('username', None)
      auth = request.GET.get('auth', None)
      if auth != COCPTOKEY:
        ret["code"] = 400
        ret["message"] = "非法"
        return JsonResponse(ret)
      userFields = User.objects.filter(username=username).first()
      if userFields is not None:
        allNode = Node.objects.all()
        for node in allNode:
          subprocess.run(['/root/zoom/sideloading/trojan/trojan-go', '-api-addr', f'{node.ip}:30189', '-api','set','-delete-profile','-target-password',userFields.plainText], capture_output=True, text=True)
        User.objects.filter(username=username).delete()
      return JsonResponse(ret)
    except Exception as e:
      print(str(e))
      return JsonResponse({'code': 500, 'message': '服务器繁忙,请稍后再试'})