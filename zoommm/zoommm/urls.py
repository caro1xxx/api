from django.urls import re_path, path
from main.views.user import Login,Register,Order,Discount,Profile,Advanced,Invite
from main.views.plan import Plan
from main.views.server import Server
from main.views.admin import Traffic,GFW,PayCallback
from main.views.tools import Ping

urlpatterns = [
    re_path(r'^api/v1/zoommm/login$', Login.as_view()),
    re_path(r'^api/v1/zoommm/register$', Register.as_view()),
    re_path(r'^api/v1/zoommm/plans$', Plan.as_view()),
    re_path(r'^api/v1/zoommm/order$', Order.as_view()),
    re_path(r'^api/v1/zoommm/discount$', Discount.as_view()),
    re_path(r'^api/v1/zoommm/server$', Server.as_view()),
    re_path(r'^api/v1/zoommm/profile$', Profile.as_view()),
    re_path(r'^api/v1/zoommm/advanced$', Advanced.as_view()),
    re_path(r'^api/v1/zoommm/invite$', Invite.as_view()),
    re_path(r'^api/v1/zoommm/ping$', Ping.as_view()),

    # admin
    re_path(r'^api/v1/zoommm/traffic$', Traffic.as_view()),
    re_path(r'^api/v1/zoommm/gfwBan$', GFW.as_view()),
    re_path(r'^api/v1/zoommm/paymentStatus$', PayCallback.as_view()),
]