from django.urls import path
from . import views

urlpatterns = [
    # path('', views.home, name='home'),
    # path('create_order/', views.create_order, name='create_order'),
    # path('verify_payment/', views.verify_payment, name='verify_payment'),
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('preorder/', views.preorder, name='preorder'),
    path('check_preorder/', views.check_preorder, name='check_preorder'),
    path('admin_login/', views.admin_login, name='admin_login'),
    path('user_counts/', views.user_counts, name='user_counts'),
    path('users_list/', views.users_list, name='users_list'),
    path('delete_user/<int:user_id>/', views.delete_user, name='delete_user'),
    path('prebooked_users/', views.prebooked_users, name='prebooked_users'),
    path('adminlogout/', views.adminlogout, name='adminlogout'),
    path('google_login/', views.google_login, name='google_login'),
    path('password-reset/', views.password_reset_request, name='password_reset_request'),
    path('password-reset-confirm/', views.password_reset_confirm, name='password_reset_confirm'),
    path('verify_otp/', views.verify_otp, name='verify_otp'),
]
