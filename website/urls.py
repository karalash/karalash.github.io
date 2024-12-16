from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', views.home, name='home'),
    path('courses/', views.courses, name='courses'),
    path('pricing/', views.pricing, name='pricing'),
    path('testimonials-json/', views.testimonials_json, name='testimonials_json'),
    path('about-us-json/', views.about_us_json, name='about_us_json'),
    path('courses/<int:course_id>/', views.course_details, name='course_details'),
    path('about-us/', views.about_us, name='about_us'),
    path('login/', views.login, name='login'),
    path('signup/', views.signup, name='signup'),
]


