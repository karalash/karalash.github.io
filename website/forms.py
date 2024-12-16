from django import forms

class SignUpForm(forms.Form):
    fullname = forms.CharField(max_length=50, widget=forms.TextInput(attrs={'placeholder': 'Enter your Name', 'required': 'required'}))
    email = forms.EmailField(widget=forms.EmailInput(attrs={'placeholder': 'Enter your Email', 'required': 'required', 'autocomplete': 'email'}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'placeholder': 'Enter your Password', 'required': 'required', 'autocomplete': 'current-password'}))
    agree = forms.BooleanField(required=True)


class LoginForm(forms.Form):
    email = forms.EmailField(widget=forms.EmailInput(attrs={'placeholder': 'Enter your Email', 'required': 'required', 'autocomplete': 'email'}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'placeholder': 'Enter your Password', 'required': 'required', 'autocomplete': 'current-password'}))
    remember_me = forms.BooleanField(required=False)
