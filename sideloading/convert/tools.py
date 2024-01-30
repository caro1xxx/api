import time
from datetime import datetime
from sideloading.settings import MARZAN_URL
import requests

def getCurrentTimestamp():
  current_timestamp = int(time.time())
  return current_timestamp


def formatTstoDatetimestamp(timestamp):
  dt_object = datetime.fromtimestamp(timestamp)
  return dt_object.strftime('%y/%m/%d')


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
    response = requests.post(f"{MARZAN_URL}/api/admin/token", headers=headers, data=data)
    if response.status_code == 200:
        return response.json()["access_token"]