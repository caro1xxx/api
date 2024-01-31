from zoommm import settings
import jwt
import time
import string
import random
import hashlib
from datetime import datetime,timedelta
import requests
from django.core.cache import cache


def timestampDatetimeString(timestamp):
    dt_object = datetime.fromtimestamp(timestamp)
    formatted_string = dt_object.strftime('%Y-%m-%dT%H:%M:%S')
    return formatted_string

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



def getDelay(nodeTag):
    response = requests.get(f"{settings.SIDEBACKENDURL}ping?nodeTag={nodeTag}")
    if response.status_code == 200:
        return response.text
    else:
        return False


def clearExpiredUseToSide(username):
    response = requests.get(f"{settings.SIDEBACKENDURL}expired?username={username}&auth={settings.SIDERKEY}")
    if response.status_code == 200:
        return response.text
    else:
        return False


# Marzban
def createMarzbanUser(username):
    marzbanToken = cache.get('token',None)
    if marzbanToken is None:
        marzbanToken = marzbanAuth()
        cache.set('token', marzbanToken, 60*60*5)
    data = {
        "username": username,
        "proxies": {
            "shadowsocks":{}
        },
        "inbounds": {
            "shadowsocks":["Shadowsocks TCP"]
        },
        "expire": getCurrentTimestamp(),
        "data_limit": 0,
        "data_limit_reset_strategy": "no_reset",
        "status": "active",
        "note": "",
        "on_hold_timeout":0,
        "on_hold_expire_duration": 0
    }
    headers = {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'bearer '+ marzbanToken
    }
    response = requests.post(f"{settings.MARZAN_URL}/api/user", headers=headers, json=data)
    if response.status_code == 200:
        return response.json()
    else:
        return False


def changeMarzbanUserData(username,flow,expire,reset,planTitle):
    marzbanToken = cache.get('token',None)
    if marzbanToken is None:
        marzbanToken = marzbanAuth()
        cache.set('token', marzbanToken, 60*60*5)
    data = {
        "proxies": {
            "shadowsocks":{}
        },
        "inbounds": {
            "shadowsocks":["Shadowsocks TCP"]
        },
        "expire": expire,
        "data_limit": flow,
        "data_limit_reset_strategy": reset,
        "status": "active",
        "note": planTitle,
        "on_hold_timeout":0,
        "on_hold_expire_duration": 0
    }
    headers = {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'bearer '+ marzbanToken
    }
    response = requests.put(f"{settings.MARZAN_URL}/api/user/{username}", headers=headers, json=data)
    if response.status_code == 200:
        return response.json()
    else:
        return False


def getMarzbanUserProfile(username):
    marzbanToken = cache.get('token',None)
    if marzbanToken is None:
        marzbanToken = marzbanAuth()
        cache.set('token', marzbanToken, 60*60*5)
    headers = {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'bearer '+ marzbanToken
    }
    response = requests.get(f"{settings.MARZAN_URL}/api/user/{username}", headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        return False


def marzbanAuth():
    headers = {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    data = {
        'grant_type': '',
        'username': 'bezos',
        'password': '4896qwer',
        'scope': '',
        'client_id': '',
        'client_secret': ''
    }
    response = requests.post(f"{settings.MARZAN_URL}/api/admin/token", headers=headers, data=data)
    if response.status_code == 200:
        return response.json()["access_token"]