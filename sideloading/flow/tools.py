from datetime import datetime
import hashlib

def parsePingOutput(output):
    lines = output.split('\n')
    last_line = lines[-2]
    latency_str = last_line.split('=')[-1].strip().split()[0]
    return latency_str

def getCurrentYMD():
    current_time = datetime.now()
    return current_time.strftime("%y/%m/%d %H:%M:%S")


def encrypteSHA224(value):
    return hashlib.sha224(value.encode()).hexdigest()