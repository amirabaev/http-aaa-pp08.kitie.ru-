// Добавьте в начало auth.js
const adminUser = {
    id: 1,
    fullName: 'Администратор',
    login: 'admin',
    password: 'admin',
    email: 'admin@eduplatform.ru',
    role: 'admin',
    createdAt: new Date().toISOString()
};

// Проверяем и добавляем admin при инициализации
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([adminUser]));
}

class Auth {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users')) || [];
        this.initValidation();
    }
    
    initValidation() {
        const form = document.getElementById('registerForm');
        if (form) {
            form.addEventListener('submit', this.handleRegister.bind(this));
            
            // Валидация в реальном времени
            document.getElementById('fullName')?.addEventListener('blur', this.validateFullName);
            document.getElementById('email')?.addEventListener('blur', this.validateEmail);
            document.getElementById('password')?.addEventListener('blur', this.validatePassword);
            document.getElementById('confirmPassword')?.addEventListener('blur', this.validateConfirmPassword);
            document.getElementById('login')?.addEventListener('blur', this.validateLogin.bind(this));
        }
    }
    
    validateFullName() {
        const fullName = this.value.trim();
        const errorElement = document.getElementById('fullNameError');
        const regex = /^[А-ЯЁа-яё\s\-]+$/;
        
        if (!regex.test(fullName)) {
            this.classList.add('error');
            errorElement.style.display = 'block';
            return false;
        } else {
            this.classList.remove('error');
            errorElement.style.display = 'none';
            return true;
        }
    }
    
    validateEmail() {
        const email = this.value.trim();
        const errorElement = document.getElementById('emailError');
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!regex.test(email)) {
            this.classList.add('error');
            errorElement.style.display = 'block';
            return false;
        } else {
            this.classList.remove('error');
            errorElement.style.display = 'none';
            return true;
        }
    }
    
    validatePassword() {
        const password = this.value;
        const errorElement = document.getElementById('passwordError');
        
        if (password.length < 6) {
            this.classList.add('error');
            errorElement.style.display = 'block';
            return false;
        } else {
            this.classList.remove('error');
            errorElement.style.display = 'none';
            return true;
        }
    }
    
    validateConfirmPassword() {
        const password = document.getElementById('password').value;
        const confirmPassword = this.value;
        const errorElement = document.getElementById('confirmPasswordError');
        
        if (password !== confirmPassword) {
            this.classList.add('error');
            errorElement.style.display = 'block';
            return false;
        } else {
            this.classList.remove('error');
            errorElement.style.display = 'none';
            return true;
        }
    }
    
    async validateLogin() {
        const login = this.value.trim();
        const errorElement = document.getElementById('loginError');
        const regex = /^[a-zA-Z0-9_]+$/;
        
        if (!regex.test(login)) {
            this.classList.add('error');
            errorElement.textContent = 'Только латинские буквы, цифры и подчеркивание';
            errorElement.style.display = 'block';
            return false;
        }
        
        // Проверка уникальности логина
        const isUnique = await this.checkLoginUnique(login);
        
        if (!isUnique) {
            this.classList.add('error');
            errorElement.textContent = 'Логин уже занят';
            errorElement.style.display = 'block';
            return false;
        } else {
            this.classList.remove('error');
            errorElement.style.display = 'none';
            return true;
        }
    }
    
    async checkLoginUnique(login) {
        // Имитация запроса к серверу
        return new Promise(resolve => {
            setTimeout(() => {
                const existingUser = this.users.find(user => user.login === login);
                resolve(!existingUser);
            }, 300);
        });
    }
    
    async handleRegister(event) {
        event.preventDefault();
        
        // Валидация всех полей
        const validations = [
            this.validateFullName.call(document.getElementById('fullName')),
            await this.validateLogin.call(document.getElementById('login')),
            this.validateEmail.call(document.getElementById('email')),
            this.validatePassword.call(document.getElementById('password')),
            this.validateConfirmPassword.call(document.getElementById('confirmPassword'))
        ];
        
        const agreeTerms = document.getElementById('agreeTerms').checked;
        if (!agreeTerms) {
            document.getElementById('agreeTermsError').style.display = 'block';
            return;
        } else {
            document.getElementById('agreeTermsError').style.display = 'none';
        }
        
        if (validations.every(v => v) && agreeTerms) {
            // Создание пользователя
            const user = {
                id: Date.now(),
                fullName: document.getElementById('fullName').value.trim(),
                login: document.getElementById('login').value.trim(),
                email: document.getElementById('email').value.trim(),
                password: document.getElementById('password').value,
                role: 'user',
                createdAt: new Date().toISOString()
            };
            
            this.users.push(user);
            localStorage.setItem('users', JSON.stringify(this.users));
            
            // Успешная регистрация
            alert('Регистрация успешна! Теперь вы можете войти.');
            window.location.href = 'login.html';
        }
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    new Auth();
});