import time
from datetime import datetime


def getCurrentTimestamp():
  current_timestamp = int(time.time())
  return current_timestamp


def formatTstoDatetimestamp(timestamp):
  dt_object = datetime.fromtimestamp(timestamp)
  return dt_object.strftime('%y/%m/%d')