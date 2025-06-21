from django.urls import path
from . import views

urlpatterns=[
    path('',views.home, name='home'),
    path('home', views.home, name='home'),
    path('plants', views.plants, name='plants'),
    path('signin', views.signin, name='signin'),
    path('register', views.register, name='register'),
    path('about', views.about, name='about'),
    path('contact', views.contact, name='contact'),  
    path('flowers', views.flowers_view, name='flowers'),
    path('trees/', views.trees_view, name='trees'),
]