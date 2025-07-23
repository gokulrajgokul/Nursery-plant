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
    path('flowers1', views.flowers1_view, name='flowers1'),
    path('trees1/', views.trees1_view, name='trees1'),
    path('herbs1/', views.herbs1_view, name='herbs1'),
    path('accessories1/', views.accessories1_view, name='accessories1'),



    path('flowers2', views.flowers2_view, name='flowers2'),
    path('trees2/', views.trees2_view, name='trees2'),
    path('herbs2/', views.herbs2_view, name='herbs2'),
    path('accessories2/', views.accessories2_view, name='accessories2'),
]