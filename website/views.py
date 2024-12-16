from django.shortcuts import render, redirect, get_object_or_404
import os
import json
from django.conf import settings
from django.http import JsonResponse
from .models import Course
from django.contrib.auth.decorators import login_required
from .forms import LoginForm, SignUpForm
from .models import User
from django.contrib.auth import login as auth_login, logout as auth_logout
from django.contrib.auth.hashers import make_password, check_password
from django.utils import timezone
from django.contrib.auth import authenticate


def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            fullname = form.cleaned_data['fullname']
            email = form.cleaned_data['email']
            password = make_password(form.cleaned_data['password'])
            User.objects.create(fullname=fullname, email=email, password=password)
            return redirect('login')
    else:
        form = SignUpForm()

    return render(request, 'website/signup.html', {'form': form})


def login(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']
            remember_me = request.POST.get('remember_me')

            try:
                user = User.objects.get(email=email)
                if check_password(password, user.password):
                    user.last_login = timezone.now()
                    user.save()

                    request.session['user_id'] = user.id

                    if remember_me:
                        request.session.set_expiry(1209600)
                    else:
                        request.session.set_expiry(0)

                    return redirect('home')
                else:
                    form.add_error('password', 'Invalid password')
            except User.DoesNotExist:
                form.add_error('email', 'No user found with this email')

    else:
        form = LoginForm()

    return render(request, 'website/login.html', {'form': form})


def logout(request):
    auth_logout(request)
    return redirect('home')


def home(request):
    return render(request, 'website/home.html')


def courses(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')

    user = User.objects.get(id=user_id)
    return render(request, 'website/courses.html')


def pricing(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')

    user = User.objects.get(id=user_id)
    return render(request, 'website/pricing.html')


def about_us(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')

    user = User.objects.get(id=user_id)
    return render(request, 'website/about-us.html')


def testimonials_json(request):
    file_path = os.path.join(settings.BASE_DIR, 'website', 'static', 'website', 'json', 'testimonials.json')
    
    with open(file_path, 'r') as file:
        data = json.load(file)

    return JsonResponse(data, safe=False)

def about_us_json(request):
    file_path = os.path.join(settings.BASE_DIR, 'website', 'static', 'website', 'json', 'about-us.json')
    
    with open(file_path, 'r') as file:
        data = json.load(file)

    return JsonResponse(data, safe=False)


def course_details(request, course_id):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')

    course = get_object_or_404(Course, id=course_id)
    lessons = course.lessons.prefetch_related('topics').all()
    
    return render(request, 'website/course-details.html', {
        'title': course.title,
        'meta_description': course.meta_description,
        'course_name': course.course_name,
        'course_description': course.course_description,
        'course_image': course.course_image,
        'course_video': course.course_video,
        'lessons': lessons,
    })
