import subprocess
import requests

backend = "http://154.204.26.79:8001/api/v1/zoommm/gfwBan"
localDomain = "zoom-jp-osaka.t7xqp3r.life"


# 向后端发送GET请求
def send_get_request():
  backend_url = backend
  params = {"localDomain":localDomain}
  try:
    response = requests.get(backend_url, params=params)
  except Exception as e:
    print(f"Error: {e}")

def check_ip_blocking():
    # 获取IP地址
    ip_address = subprocess.check_output(["curl", "-s", "ifconfig.me"]).decode("utf-8").strip()
    # 执行 ping 命令，并检查结果
    try:
        result = subprocess.run(["ping", "-c", "5", "-W", "2", "-i", "0.2", "www.itdog.cn"], capture_output=True, text=True, timeout=10)
        if "100% packet loss" in result.stdout:
            print("当前IP已经被封锁")
            send_get_request()
        else:
            print("当前IP未被封锁")
    except subprocess.TimeoutExpired:
        print("Ping命令超时")


if __name__ == "__main__":
    check_ip_blocking()
