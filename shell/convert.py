from flask import Flask, jsonify,request,Response
import mysql.connector
import requests
from urllib.parse import quote
import base64



app = Flask(__name__)

db_config = {
    'host': '154.204.26.79',
    'user': 'zoommm',
    'password': '4896qwer',
    'database': 'zoommm'
}
db_conn = mysql.connector.connect(**db_config)
cursor = db_conn.cursor()

@app.route('/api/v2/client/ZOOM机场', methods=['GET'])
def subscribeHandle():
  token = request.args.get('token')
  target = request.args.get('target')

  # 查询用户plainText
  query = "SELECT * FROM users WHERE plainText = %s"
  cursor.execute(query, (token,))
  result = cursor.fetchone()

  nodeUrl = ""
  # 查询所有节点
  if result:
    query = "SELECT * FROM main_node WHERE ban = false ORDER BY id ASC"
    cursor.execute(query)
    allNodes = cursor.fetchall()
    for node in allNodes:
      nodeUrl = f"{nodeUrl}{node[2]}://{quote(token)}@{node[1]}?sni={quote(node[3])}&type={quote(node[4])}&path={quote('/'+node[5])}#{quote(node[8])}|"
  else:
    return "404 Not Found", 404

  response = requests.get(f"http://127.0.0.1:25500/sub?target={'clash' if target is None else target}&tfo={True}&interval={60 * 60 * 24}&filename={'ZOOM'}&append_info={True}&remove_emoji={False}&url={quote(nodeUrl[:-1])}")
  if response.status_code == 200:
    return response.text
  else:
    print(f"Server Error")
  return 'Zoommm 专业机场网络隐私安全'

if __name__ == '__main__':
  app.run(debug=True,host='0.0.0.0')