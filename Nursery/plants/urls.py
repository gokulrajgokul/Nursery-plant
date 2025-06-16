from django.urls import path
from . import views

urlpatterns=[
    path('',views.home),
    path('home', views.home, name='home'),
    path('plants', views.plants, name='plants'),
    path('login', views.login, name='login'),
    path('register', views.register, name='register'),
    path('about', views.about, name='about'),
    path('contact', views.contact, name='contact'),   
]