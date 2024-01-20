from zoommm import settings
import jwt
import time
import string
import random
import hashlib
from datetime import datetime,timedelta
import requests

def getMonthOverResetDate():
    current_time = datetime.now()
    future_time = current_time + timedelta(days=30)
    return future_time.strftime("%Y/%m/%d")


def toMD5(text):
    return hashlib.md5(text.encode()).hexdigest()

def getCurrentYMD():
    current_time = datetime.now()
    return current_time.strftime("%y/%m/%d %H:%M:%S")


def checkParams(parmas):
    for p in parmas:
        if p == '' or p is None:
            return False
    return True

def getCurrentTimestamp():
    current_timestamp = int(time.time())
    return current_timestamp

def encrypteToken(user):
    payload = {
        'username': user['username'],
        'expire': getCurrentTimestamp() + 60 * 60 * 24 * 14,
    }
    token = jwt.encode(payload, settings.JWT_SECRET_KEY,
                       algorithm=settings.JWT_ALGORITHM)
    return token

def decodeToken(token):
    return jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=settings.JWT_ALGORITHM)


def decodeToken(token):
    return jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=settings.JWT_ALGORITHM)


def generateRandomString(length):
    characters = string.ascii_letters + string.digits
    random_string = ''.join(random.choice(characters) for _ in range(length))
    return random_string


def encrypteSHA224(value):
    return hashlib.sha224(value.encode()).hexdigest()


def parsePingOutput(output):
    lines = output.split('\n')
    last_line = lines[-2]
    latency_str = last_line.split('=')[-1].strip().split()[0]
    return latency_str


def createOrder(data):
    response = requests.post(settings.TIANXINGPAYURL+"/mapi.php", data=data)
    if response.status_code == 200:
        return response.text
    else:
        return False

def getClientIp(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip