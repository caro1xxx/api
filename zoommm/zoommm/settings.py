from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = 'django-insecure-*6u1#w0cll%ig&@x)n+pc54w@a7cs55b1g!6a+fvx@856(k)i2'
DEBUG = True
ALLOWED_HOSTS = ['*']
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'main',
    'django_apscheduler'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'main.middlewares.authentication.CheckAccessToken',
]

ROOT_URLCONF = 'zoommm.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'zoommm.wsgi.application'

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


LANGUAGE_CODE = 'zh-hans'
TIME_ZONE = 'Asia/Shanghai'
USE_I18N = True
USE_TZ = True
STATIC_URL = 'static/'
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# 数据库
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'zoommm',
        'USER': 'zoommm',
        'PASSWORD': '4896qwer',
        'HOST': '127.0.0.1',
        'PORT': '3306',
        'OPTIONS': {
            'charset': 'utf8mb4',
        },
    }
}

# jwt
JWT_SECRET_KEY = 'Ja6T96y95uYD2wts'
JWT_ALGORITHM = 'HS256'
JWT_EXPIRATION_DELTA = 259200

# redis
CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://127.0.0.1:6379/0",
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
            "CONNECTION_POOL_KWARGS": {"max_connections": 10000},
            "DECODE_RESPONSES": True,
            "PASSWORD": "",
            'MAX_ENTRIES': 10000,
            'CULL_FREQUENCY': 3,
            'TIMEOUT': 7200,
        }
    }
}

# celery
CELERY_BROKER_URL = "redis://127.0.0.1:6379/0"
CELERY_ACCEPT_CONTENT = ['application/json', ]
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_RESULT_EXPIRES = 3600

# admin email
ADMIN_EMAIL = 'caro1xxxhv@gmail.com'
# mail
EMAIL_HOST = 'smtp.qq.com'
EMAIL_PORT = 25
EMAIL_HOST_USER = 'wakeups@qq.com'
EMAIL_HOST_PASSWORD = 'tsxwwpxunwiaechh'
EMAIL_USER_TLS = True

# 天星易支付
TIANXINGPAYURL = "https://pay.yi-zhifu.cn"
TINAXINGID = 1238
TINAXINGKEY = "zB7ofiiImTtBiK7P7KPTiDIpfRfKm9et"


# side
SIDEBACKENDURL = "https://subconvert.t7xqp3r.life/api/v1/side/"
SIDERKEY = "7cBm7JdBU2i84y"

# scheduler
DJANGO_APSCHEDULER_EXECUTION_LOG = True


# marzban
MARZAN_URL = "http://46.250.249.209:8000"
MARZAN_AUTHORIZATION = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiZXpvcyIsImFjY2VzcyI6InN1ZG8iLCJpYXQiOjE3MDYxODUyMzAsImV4cCI6MTcwNjI3MTYzMH0.iRFJWKnaO32YSCQ4v88wa-gsX5dHVbLjWld0lpNBnzE'