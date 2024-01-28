from django.urls import re_path, path
from convert.views.convert import Convert
from flow.views import Ping,GFW,Traffic,Token

urlpatterns = [
    re_path(r'^api/v1/side/ZOOM机场$', Convert.as_view()),
    re_path(r'^api/v1/side/ping$', Ping.as_view()),
    re_path(r'^api/v1/side/token$', Token.as_view()),
    # re_path(r'^api/v1/side/gfwBan$', GFW.as_view()),
    # re_path(r'^api/v1/side/traffic$', Traffic.as_view()),
]
