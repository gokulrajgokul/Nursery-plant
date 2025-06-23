from django.urls import path
from . import views

urlpatterns=[
    path('',views.frontpage, name='frontpage'),
    path('frontpage', views.frontpage, name='frontpage'),
    path('home', views.home, name='home'),
    path('plants', views.plants, name='plants'),
    path('plant', views.plant, name='plant'),
    path('signin', views.signin, name='signin'),
    path('register', views.register, name='register'),
    path('signout', views.signout, name='signout'),
    path('about', views.about, name='about'),
    path('contact', views.contact, name='contact'),  
    path('flowers', views.flowers_view, name='flowers'),
    path('trees/', views.trees_view, name='trees'),
    path('herbs/', views.herbs_view, name='herbs'),
    path('accessories/', views.accessories_view, name='accessories'),
]