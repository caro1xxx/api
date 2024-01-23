import requests
import psutil  # 用于获取系统的网络流量信息

backend = "https://side.voteinfo.life/api/v1/side/traffic"
localDomain = "zoom-jp-osaka.t7xqp3r.life"

# 获取已使用的流量（以GB为单位）
def get_used_traffic():
  network_stats = psutil.net_io_counters()
  used_traffic_gb = network_stats.bytes_sent / (1024**3) + network_stats.bytes_recv / (1024**3)
  return used_traffic_gb

# 向后端发送GET请求
def send_get_request(used_traffic_gb):
  backend_url = backend
  params = {"usedTraffic": used_traffic_gb,"localDomain":localDomain}

  try:
    response = requests.get(backend_url, params=params)
  except Exception as e:
    print(f"Error: {e}")

if __name__ == "__main__":
  used_traffic_gb = get_used_traffic()
  send_get_request(used_traffic_gb)