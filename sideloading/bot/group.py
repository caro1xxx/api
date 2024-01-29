import telebot
from telebot import types  # 导入types模块
import requests
import re


user_inputs= {}

BAACK_URL = 'http://127.0.0.1:8001/api/v1/bot'

TOKEN = '6852811417:AAF5zZGUdE4cqQTjljhAy92kewIG-BnqqBU'
bot = telebot.TeleBot(TOKEN)

@bot.message_handler(commands=['start'])
def send_welcome(message):
    bot.reply_to(message, "牛子哥！欢迎你使用ZoomCloud Bot \n\n我告诉你！你要先执行绑定账号，不然下面的命令你用不了 \n /bind(请私聊我绑定账号,不要在群组内绑定!) \n\n /sign (签到)\n\n /sub (查询订阅信息)\n\n /node (检查节点服务器状态)\n\n /ping (检测延迟)")


@bot.message_handler(func=lambda message: True)
def coomand(message):
    if '/bind' in message.text:
        match = re.match(r'/bind (.+)', message.text)
        if match:
            user_email = match.group(1)
            telegram_user_id = message.from_user.id
            bot.reply_to(message, f"已收到你的邮箱地址: {user_email} 正在绑定中...")
            bindUseResponse = requests.get(f"{BAACK_URL}/user?email={user_email}&telegramUserId={telegram_user_id}")
            if bindUseResponse.json()["code"] == 200:
                bot.reply_to(message, f"绑定成功,可以返回群组进行互动了🎉")
            else:
                bot.reply_to(message, f"🤖俺出错了 {bindUseResponse.json()['message']}")
        else:
            bot.reply_to(message, "输入格式不正确，请使用 `/bind email@example.com` 格式。")
    elif '/node' in message.text:
        authResponse = requests.get(f"{BAACK_URL}/auth?telegramUserId={message.from_user.id}")
        if authResponse.json()['code'] != 200:
            bot.reply_to(message,f"🤖{authResponse.json()['message']}")
            return None
        coreResponse = requests.get(f"{BAACK_URL}/core")
        if coreResponse.json()["code"] == 200:
            data = coreResponse.json()['message']
            text = f"主节点:\n---------------------\nMen:{int((data['mem_used']/data['mem_total'])*100)}%   Core:{data['cpu_usage']}个\nUpload:{int(data['incoming_bandwidth']/1024/1024)}Mbps   Upload:{int(data['outgoing_bandwidth']/1024/1024/1024)}Mbps\n---------------------\n子节点:\n---------------------"
            for node in coreResponse.json()['subNode']:
                text+=f"\nName:{node['title']}    Status:{node['status']}"
            bot.reply_to(message,text)
        else:
            bot.reply_to(message,f"🤖{coreResponse.json()['message']}")
    else:
        bot.reply_to(message,"🤖努力开发中!")


# 启动机器人
bot.polling(none_stop=True)
