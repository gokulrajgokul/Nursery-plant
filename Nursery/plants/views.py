from django.shortcuts import render

def home(request):
    return render(request,'home.html')

def plants(request):
    return render(request,'plants.html')

def about(request):
    return render(request,'about.html')

def contact(request):
    return render(request,'contact.html')

def login(request):
    return render(request,'login.html')

# def loginpage(request):
#     if request.method == 'POST':
#         username = request.POST.get('name').lower()
#         password = request.POST.get('password')

#         if not username or not password:
#             messages.error(request, "Both fields are required!")
#             return redirect('signup')

#         user = authenticate(username=username, password=password)
#         if user is not None:
#             login(request, user)
#             return redirect('homepage')
#         else:
#             messages.error(request, "Invalid username or password!")
#     return render(request, 'signup.html')
        
# def logoutpage(request):
#     logout(request)
#     return redirect('login')



def register(request):
    return render(request,'register.html')