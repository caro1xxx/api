from django.http import JsonResponse
from rest_framework.views import APIView
from main.models import LotteryRecord,Member,PrizePool,Plans
from django.core import serializers
import json
from main.tools import getCurrentDate,generateRandomString,getCurrentTimestamp,changeMarzbanUserData
import random


class Lottery(APIView):
  def get(self, request, *args, **kwargs):
    ret = {'code': 200, 'message': '获取成功'}
    try:
      ret["data"] = json.loads(serializers.serialize('json', PrizePool.objects.all().order_by('idx')))
      return JsonResponse(ret)
    except Exception as e:
      print(str(e))
      return JsonResponse({'code': 500, 'message': '服务器繁忙,请稍后再试'})

  def post(self, request, *args, **kwargs):
    ret = {'code': 200, 'message': '成功'}
    try:
      username = request.payload_data["username"]
      memberFields = Member.objects.filter(email=username).first()
      if memberFields is None:
        ret['code'] = 404
        ret['message'] = '非法'
        return JsonResponse(ret)
      lotteryFields = LotteryRecord.objects.filter(date=getCurrentDate(),member=memberFields).first()
      if lotteryFields is not None:
        ret['code'] = 201
        ret['message'] = '您今日已抽奖,请明天再来'
      else:
        all_prizes = PrizePool.objects.all()
        total_weight = sum(prize.weights for prize in all_prizes)
        if memberFields.expireTime < getCurrentTimestamp():
          total_weight *= 1.2
        rand_num = random.uniform(0, total_weight)
        current_weight = 0
        for prize in all_prizes:
          current_weight += prize.weights
          if rand_num <= current_weight:
            ret['prize'] = {
              "idx":prize.idx,
              "name":prize.name,
              "type":prize.type
            }
            break
        lotteryItem = LotteryRecord.objects.create(code=f'ZOOMCLOUD{generateRandomString(7)}',date=getCurrentDate(),member=memberFields,prize=f'{ret["prize"]["name"]}-{ret["prize"]["type"]}',time=getCurrentTimestamp())
        realFlow = 0
        planTitle = 1.7
        expire = getCurrentTimestamp() + 60*60*24
        reset = 'no_reset'
        if memberFields.plan is None:
          realFlow = (int(lotteryItem.prize.replace("GB-流量","")) * 1073741824) / 1.7
          memberFields.plan = Plans.objects.filter(no=14).first()
          memberFields.expireTime = getCurrentTimestamp() + 60*60*24
        else:
          if memberFields.plan.time == 30:
            planFlow = int(memberFields.plan.flow * 1073741824 / float(memberFields.plan.real))
          elif memberFields.plan.time <= 360:
            planFlow = (memberFields.plan.flow / (memberFields.plan.time / 30)  * 1073741824) / float(memberFields.plan.real)
            reset = 'month'
          realFlow = planFlow  + (int(lotteryItem.prize.replace("GB-流量","")) * 1073741824) / float(memberFields.plan.real)
          expire = memberFields.expireTime
          planTitle = memberFields.plan.real
        changeMarzbanUserData(username,realFlow,expire,reset,planTitle)
        memberFields.save()
        ret['prize']['code'] = lotteryItem.code
      return JsonResponse(ret)
    except Exception as e:
      print(str(e))
      return JsonResponse({'code': 500, 'message': '服务器繁忙,请稍后再试'})

  def put(self, request, *args, **kwargs):
    ret = {'code': 200, 'message': '成功'}
    try:
      username = request.payload_data["username"]
      memberFields = Member.objects.filter(email=username).first()
      if memberFields is None:
        ret['code'] = 404
        ret['message'] = '非法'
        return JsonResponse(ret)
      lotteryFields = LotteryRecord.objects.filter(date=getCurrentDate(),member=memberFields).first()
      if lotteryFields is not None:
        ret['code'] = 201
        ret['message'] = '您今日已抽奖,请明天再来'
        ret['prize'] = {
          "code":lotteryFields.code
        }
        return JsonResponse(ret)
      return JsonResponse(ret)
    except Exception as e:
      print(str(e))
      return JsonResponse({'code': 500, 'message': '服务器繁忙,请稍后再试'})