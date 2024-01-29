from django.urls import re_path, path
from convert.views.convert import Convert
from flow.views import Ping,GFW,Traffic,Token
from bot.views import User,Core,Auth

urlpatterns = [
    re_path(r'^api/v1/side/ZOOM机场$', Convert.as_view()),
    re_path(r'^api/v1/side/ping$', Ping.as_view()),
    re_path(r'^api/v1/side/token$', Token.as_view()),
    # bot
    re_path(r'^api/v1/bot/user$', User.as_view()),
    re_path(r'^api/v1/bot/core$', Core.as_view()),
    re_path(r'^api/v1/bot/auth$', Auth.as_view()),
    # re_path(r'^api/v1/side/gfwBan$', GFW.as_view()),
    # re_path(r'^api/v1/side/traffic$', Traffic.as_view()),
]
