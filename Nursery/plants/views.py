from django.shortcuts import render,redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.contrib import messages
from .models import Category, Product

def frontpage(request):
    return render(request,'frontpage.html')

def home(request):
    return render(request,'home.html')

def plants(request):
    return render(request,'plants.html')

def about(request):
    return render(request,'about.html')

def contact(request):
    return render(request,'contact.html')

def signin(request):
    if request.method == 'POST':
        username = request.POST.get('loginUsername')
        password = request.POST.get('loginPassword')

        # Validate required fields
        if not username or not password:
            messages.error(request, "Both Username and Password are required!")
            return redirect('login')

        # Authenticate
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            messages.success(request, "Logged in successfully!")
            return redirect('home')  # Change to your home/dashboard URL name
        else:
            messages.error(request, "Invalid Username or Password!")
            return redirect('signin')
    return render(request,'login.html')
        
def logout(request):
    return redirect('signin')

def register(request):
    if request.method == 'POST':
        full_name = request.POST.get('fullName')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirmPassword')
        
        if not full_name or not email or not phone or not password or not confirm_password:
            messages.error(request, "All fields are required!")
            return redirect('register')
        
        if User.objects.filter(username=full_name).exists():
            messages.error(request, "username is already registered!")
            return redirect('register')
        
        if User.objects.filter(email=email).exists():
            messages.error(request, "username is already registered!")
            return redirect('register')
        
        if len(phone) != 10:
            messages.error(request, "Invalid mobile number")
            return redirect('register')
        
        if len(password) < 8:
            messages.error(request, "Password must be at least 8 characters")
            return redirect('register')

        if password != confirm_password:
            messages.error(request, "Passwords do not match!")
            return redirect('register')  
        
        user = User.objects.create_user(username=full_name, email=email, password=password)
        user.save()
        
        messages.success(request, "Your account has been created successfully!")
        return redirect('signin')

    return render(request,'register.html')

def flowers_view(request):
    try:
        flower_category = Category.objects.get(name__iexact="Flowers")  #  not case-sensitive
        flower_products = Product.objects.filter(category=flower_category)
    except Category.DoesNotExist:
        flower_products = []

    return render(request, 'flowers.html', {'products': flower_products})

def trees_view(request):
    try:
        tree_category = Category.objects.get(name__iexact="trees")
        tree_products = Product.objects.filter(category=tree_category)
    except Category.DoesNotExist:
        tree_products = []

    return render(request, 'trees.html', {'products': tree_products})

def herbs_view(request):
    try:
        herbs_category = Category.objects.get(name__iexact="herbs")
        herbs_products = Product.objects.filter(category=herbs_category)
    except Category.DoesNotExist:
        herbs_products = []

    return render(request, 'herbs.html', {'products': herbs_products})

def accessories_view(request):
    try:
        accessories_category = Category.objects.get(name__iexact="Garden Accessories")
        accessories_products = Product.objects.filter(category=accessories_category)
    except Category.DoesNotExist:
        accessories_products = []

    return render(request, 'accessories.html', {'products': accessories_products})