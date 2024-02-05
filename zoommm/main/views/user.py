from django.http import JsonResponse
from rest_framework.views import APIView
from main.models import Member,Plans,Orders,DiscountCode,Invites,Config
from django.core import serializers
import json
from main.tools import checkParams,encrypteToken,getCurrentTimestamp,generateRandomString,decodeToken,encrypteSHA224 ,\
                    createOrder,getClientIp,toMD5,createMarzbanUser,getMarzbanUserProfile,marzbanAuth
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_control
from main.task import asyncAddInviteUser
from zoommm.settings import TINAXINGID,TINAXINGKEY



class Login(APIView):
    def post(self, request, *args, **kwargs):
        ret = {'code': 200, 'message': '登录成功'}
        try:
            username = json.loads(request.body).get('username', None)
            password = json.loads(request.body).get('password', None)
            if checkParams([username,password]) == False:
                ret['code'] = 403
                ret['message'] = '参数错误'
                return JsonResponse(ret)

            userFields = Member.objects.filter(email=username,password=password).first()
            if userFields is None:
                ret['code'] = 404
                ret['message'] = '账号或密码错误'
                return JsonResponse(ret)
            ret['token'] = encrypteToken({"username":username})
            return JsonResponse(ret)
        except Exception as e:
            print(str(e))
            return JsonResponse({'code': 500, 'message': '服务器繁忙,请稍后再试'})


class Register(APIView):
    def post(self, request, *args, **kwargs):
        ret = {'code': 200, 'message': '注册成功'}
        try:
            username = json.loads(request.body).get('username', None)
            password = json.loads(request.body).get('password', None)
            code = json.loads(request.body).get('code', None)
            isCloseReigster = Config.objects.filter(type='register').first()
            if isCloseReigster.content == '1' or isCloseReigster.content == 1:
                ret['code'] = 441
                ret['message'] = '已关闭注册,下次开启时间请关注TG频道'
                return JsonResponse(ret)
            if checkParams([username,password]) == False:
                ret['code'] = 403
                ret['message'] = '参数错误'
                return JsonResponse(ret)
            userFields = Member.objects.filter(email=username).first()
            if userFields is not None:
                ret['code'] = 408
                ret['message'] = '该账号已被注册'
                return JsonResponse(ret)
            userFields = Member.objects.create(email=username, password=password, createTime=getCurrentTimestamp(),code=generateRandomString(6))
            ret['token'] = encrypteToken({"username": username})
            createMarzbanUser(username)
            if code is not None and len(code)==6:
                asyncAddInviteUser.delay(username,code)
            return JsonResponse(ret)
        except Exception as e:
            print(str(e))
            return JsonResponse({'code': 500, 'message': '服务器繁忙,请稍后再试'})


class Profile(APIView):
    def get(self, request, *args, **kwargs):
        ret = {'code': 200, 'message': '获取成功'}
        try:
            username = request.payload_data["username"]
            memberFields = Member.objects.filter(email=username).first()
            ret['data'] = {
                "plan": "未订阅" if memberFields.plan is None else  memberFields.plan.title,
                "subLink":"None",
                "expireTime":memberFields.expireTime,
                "used":-1,
                "remaining":-1,
                "system":memberFields.system,
                "concurrent":memberFields.concurrent,
                "bascEmailNotify":memberFields.bascEmailNotify,
                "marketingEmailNotify":memberFields.marketingEmailNotify,
                "rateLimit":memberFields.rateLimit,
                "cloudRules":memberFields.cloudRules,
                "reset":memberFields.nextReset
            }
            if memberFields.plan is not None:
                userProfile = getMarzbanUserProfile(memberFields.email)
                if userProfile != False:
                    ret['data']["used"] =userProfile["used_traffic"]
                    ret['data']['remaining'] =userProfile["data_limit"] - userProfile["used_traffic"]
                    ret['data']['reset'] = userProfile['data_limit_reset_strategy']
                    ret['data']['status'] = userProfile['status']
                    ret['data']['subLink'] = f"https://subconvert.t7xqp3r.life/api/v1/side/ZOOM%E6%9C%BA%E5%9C%BA?token={userProfile['subscription_url'].replace('/sub/','')}"
                    return JsonResponse(ret)
            return JsonResponse(ret)
        except Exception as e:
            print(str(e))
            return JsonResponse({'code': 500, 'message': '服务器繁忙,请稍后再试'})


class Order(APIView):
    def get(self, request, *args, **kwargs):
        ret = {'code': 200, 'message': '获取成功'}
        try:
            plans = request.GET.get('planId', None)
            orderFields = Orders.objects.filter(no=plans).first()
            planFields = Plans.objects.filter(no=orderFields.plan.no).first()
            ret['order'] = {
                "no":orderFields.no,
                "title":planFields.title,
                "price":planFields.price,
                "createTime":orderFields.createTime,
                "actuallyPaid":orderFields.actuallyPaid,
                "discount":orderFields.discount,
            }
            return JsonResponse(ret)
        except Exception as e:
            print(str(e))
            return JsonResponse({'code': 500, 'message': '服务器繁忙,请稍后再试'})

    def post(self, request, *args, **kwargs):
        ret = {'code': 200, 'message': '创建成功'}
        try:
            plans = json.loads(request.body).get('planId', None)
            planFields = Plans.objects.filter(no=plans).first()
            orderFields = Orders.objects.create(no=generateRandomString(16),createTime=getCurrentTimestamp(),plan=planFields,actuallyPaid=planFields.price)
            ret['order'] = orderFields.no
            return JsonResponse(ret)
        except Exception as e:
            print(str(e))
            return JsonResponse({'code': 500, 'message': '服务器繁忙,请稍后再试'})

    def put(self, request, *args, **kwargs):
        ret = {'code': 200, 'message': '下单成功'}
        try:
            order = json.loads(request.body).get('order', None)
            username = json.loads(request.body).get('username', None)
            password = json.loads(request.body).get('password', None)
            way = json.loads(request.body).get('way', None)

            userFields = {}
            if checkParams([username,password]) == False:
                authorization_header = request.META.get('HTTP_AUTHORIZATION', None)
                if authorization_header is None or authorization_header == '' or authorization_header == 'Bearer':
                    return JsonResponse({"code": 400, "message": "非法"})
                payload = decodeToken(authorization_header.replace('Bearer ', ''))
                userFields = Member.objects.filter(email=payload['username']).first()
            else:
                userFields = Member.objects.filter(email=username).first()
                if userFields is not None:
                    if userFields.password != password:
                        ret['code'] = 424
                        ret['message'] = '邮箱或密码错误'
                        return JsonResponse(ret)
                else:
                    userFields = Member.objects.create(email=username,password=password,createTime=getCurrentTimestamp(),code=generateRandomString(6))
                    createMarzbanUser(userFields.email)
            orderFields = Orders.objects.filter(no=order).first()
            orderFields.user = userFields
            orderFields.save()
            ret['order'] = orderFields.no
            ret['token'] = encrypteToken({"username": userFields.email})
            orderParmas = {
                "pid":TINAXINGID,
                "type":way,
                "out_trade_no":orderFields.no,
                "notify_url":"https://zoomm.cloud/api/v1/zoommm/paymentStatus",
                "name":orderFields.plan.title+"订阅",
                "money":orderFields.actuallyPaid,
                "clientip":getClientIp(request),
                "param":userFields.email,
            }
            sortedParams = sorted((key, value) for key, value in orderParmas.items())
            signStr = "&".join(f"{key}={value}" for key, value in sortedParams)
            orderParmas["sign"] = toMD5(signStr+TINAXINGKEY)
            orderParmas["sign_type"] = "MD5"
            orderResult = createOrder(orderParmas)
            if orderResult == False:
                ret['code'] = 421
                ret['messgae'] = "创建订单失败,请联系客服"
                return JsonResponse(ret)
            ret["order"] = json.loads(orderResult)
            return JsonResponse(ret)
        except Exception as e:
            print(str(e))
            return JsonResponse({'code': 500, 'message': '服务器繁忙,请稍后再试'})


class Discount(APIView):
    def post(self, request, *args, **kwargs):
        ret = {'code': 200, 'message': '使用成功'}
        try:
            order = json.loads(request.body).get('order', None)
            code = json.loads(request.body).get('code', None)
            discountFields = DiscountCode.objects.filter(code=code).first()
            if discountFields is None:
                ret['code'] = 404
                ret['message'] = '该折扣码不存在'
            elif discountFields.sumCount == discountFields.useCount:
                ret['code'] = 405
                ret['message'] = '该折扣码已达上限'
            elif discountFields.expire < getCurrentTimestamp():
                ret['code'] = 406
                ret['message'] = '该折扣码已过期'
            else:
                orderFields = Orders.objects.filter(no=order).first()
                if orderFields.discount is None:
                    if "%" in discountFields.effect:
                        orderFields.actuallyPaid = str(float(orderFields.actuallyPaid) - round(float(orderFields.actuallyPaid) * (float(discountFields.effect.replace("%",""))/100)))
                        orderFields.discount = code
                    discountFields.useCount = discountFields.useCount+1
                    orderFields.save()
                    discountFields.save()
                    ret['actuallyPaid'] = orderFields.actuallyPaid
                    ret['discount'] = code
                else:
                    ret['code'] = 407
                    ret['message'] = '该订单已使用折扣码'
                    
            return JsonResponse(ret)
        except Exception as e:
            print(str(e))
            return JsonResponse({'code': 500, 'message': '服务器繁忙,请稍后再试'})


class Invite(APIView):
    @method_decorator(cache_control(public=True, max_age=1800))
    def get(self, request, *args, **kwargs):
        ret = {'code': 200, 'message': '成功'}
        try:
            username = request.payload_data["username"]
            memberFields = Member.objects.filter(email=username).first()
            InvitesFields = Invites.objects.filter(inviteCode=memberFields.code).all()
            ret['data'] = []
            for invite in InvitesFields:
                ret['data'].append({
                    "invite":invite.invite.email,
                    "inviteTime":invite.inviteTime,
                    "subscription":invite.subscription,
                    "commission":invite.commission,
                })
            ret['balance'] = memberFields.balance
            ret['shareCode'] = memberFields.code
            ret['sumInvite'] = len(InvitesFields)
            ret['sumSub'] = sum(1 for invite in InvitesFields if invite.subscription)
            return JsonResponse(ret)
        except Exception as e:
            print(str(e))
            return JsonResponse({'code': 500, 'message': '服务器繁忙,请稍后再试'})