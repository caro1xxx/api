from django.utils.deprecation import MiddlewareMixin
from django.http import JsonResponse,HttpResponseNotFound
from main.tools import decodeToken, getCurrentTimestamp



class CheckAccessToken(MiddlewareMixin):
  def process_request(self, request):
    try:
        pathInfo = request.path_info.replace('/api/v1/zoommm/', '').split('/')[0]
        requestMethods = str(request.method)
        allowPath = []
        if requestMethods == 'GET':
            allowPath = ["plans","server","order","traffic","gfwBan","ping","paymentStatus",'corn','lottery','notify']
            pass

        if requestMethods == 'POST':
            allowPath = ["login","register","order","discount","mailTools"]
            pass

        if requestMethods == 'PUT':
            allowPath = ["order"]
            pass

        if requestMethods == 'DELETE':
            allowPath = []
            pass

        if pathInfo in allowPath:
            return None

        authorization_header = request.META.get('HTTP_AUTHORIZATION', None)

        if authorization_header is None or authorization_header == '' or authorization_header == 'Bearer':
            return JsonResponse({"code": 400, "message": "非法"})

        payload = decodeToken(authorization_header.replace('Bearer ', ''))

        if payload['username'] is None:
            return JsonResponse({"code": 400, "message": "非法"})

        data = {}
        for key, value in payload.items():
            data[key] = value
        request.payload_data = data
        return None
    except Exception as e:
        # print(str(e))
        return JsonResponse({"code": 400, "message": "非法"})