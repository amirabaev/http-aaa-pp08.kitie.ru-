// Открытие/закрытие мобильного меню
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navList = document.getElementById('navList');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Закрытие меню при клике вне его
    document.addEventListener('click', function(event) {
        if (!mobileNav.contains(event.target) && !menuToggle.contains(event.target)) {
            mobileNav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
    
    // Инициализация счетчика посетителей
    initVisitorCounter();
    
    // Инициализация новостей с анимацией
    initNewsAnimation();
});

// Счетчик посетителей с анимацией
function initVisitorCounter() {
    const counterElement = document.getElementById('visitorCounter');
    if (!counterElement) return;
    
    let count = parseInt(localStorage.getItem('visitorCount') || '1000');
    
    // Увеличиваем счетчик каждые 5 секунд
    setInterval(() => {
        count += Math.floor(Math.random() * 3) + 1;
        localStorage.setItem('visitorCount', count.toString());
        
        // Анимация обновления счетчика
        counterElement.style.transform = 'scale(1.1)';
        counterElement.style.color = '#4A6FA5';
        
        setTimeout(() => {
            counterElement.textContent = count.toLocaleString();
            counterElement.style.transform = 'scale(1)';
            counterElement.style.color = '';
        }, 150);
        
    }, 5000);
    
    counterElement.textContent = count.toLocaleString();
}

// Анимация новостей (масштабирование при наведении)
function initNewsAnimation() {
    const newsImages = document.querySelectorAll('.news-image');
    
    newsImages.forEach(img => {
        const originalSrc = img.src;
        const hoverSrc = img.dataset.hover || originalSrc;
        
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
            if (hoverSrc !== originalSrc) {
                this.src = hoverSrc;
            }
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            if (hoverSrc !== originalSrc) {
                this.src = originalSrc;
            }
        });
    });
}