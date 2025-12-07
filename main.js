// ===== КОНФИГУРАЦИЯ =====
const COUNTDOWN_DATE = new Date('Nov 27, 2026 00:00:00').getTime();
const TOTAL_DURATION = 3 * 365 * 24 * 60 * 60 * 1000; // 3 года для прогресс-бара

// ===== ЭЛЕМЕНТЫ DOM =====
const elements = {
    days: document.querySelector('.days'),
    hours: document.querySelector('.hours'),
    minutes: document.querySelector('.min'),
    seconds: document.querySelector('.sec'),
    daysLabel: document.querySelector('.days-tx'),
    hoursLabel: document.querySelector('.hours-tx'),
    minutesLabel: document.querySelector('.min-tx'),
    secondsLabel: document.querySelector('.sec-tx'),
    title: document.querySelector('.title-text'),
    progressBar: document.getElementById('progress'),
    mobileMenuBtn: document.querySelector('.mobile-menu-btn'),
    mobileNav: document.querySelector('.mobile-nav'),
    menuIcon: document.querySelector('.mobile-menu-btn i')
};

let countdownInterval;

// ===== ФУНКЦИИ ВСПОМОГАТЕЛЬНЫЕ =====
function formatNumber(num) {
    return num < 10 ? '0' + num : num;
}

function getPluralForm(number, forms) {
    const cases = [2, 0, 1, 1, 1, 2];
    return forms[
        number % 100 > 4 && number % 100 < 20 
            ? 2 
            : cases[Math.min(number % 10, 5)]
    ];
}

function updateProgressBar(distance) {
    const passedTime = TOTAL_DURATION - distance;
    const progressPercent = (passedTime / TOTAL_DURATION) * 100;
    elements.progressBar.style.width = Math.min(progressPercent, 100) + '%';
}

// ===== ОБНОВЛЕНИЕ ТАЙМЕРА =====
function updateCountdown() {
    const now = new Date().getTime();
    let distance = COUNTDOWN_DATE - now;

    // Если время вышло
    if (distance <= 0) {
        clearInterval(countdownInterval);
        distance = 0;
        
        // Праздничный экран
        elements.title.textContent = 'Легенда вернулся! 🎉';
        document.querySelector('.title-sub').textContent = 'Долгожданный момент настал!';
        document.querySelector('.motivation-text p').innerHTML = 
            '<i class="fas fa-quote-left"></i> Он здесь! Творчество продолжается! <i class="fas fa-quote-right"></i>';
        
        // Анимация завершения
        document.querySelectorAll('.time-value').forEach(el => {
            el.style.animation = 'pulse 1s infinite';
        });
        
        return;
    }

    // Вычисление времени
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Обновление чисел
    elements.days.textContent = formatNumber(days);
    elements.hours.textContent = formatNumber(hours);
    elements.minutes.textContent = formatNumber(minutes);
    elements.seconds.textContent = formatNumber(seconds);

    // Обновление подписей
    elements.daysLabel.textContent = getPluralForm(days, ['день', 'дня', 'дней']);
    elements.hoursLabel.textContent = getPluralForm(hours, ['час', 'часа', 'часов']);
    elements.minutesLabel.textContent = getPluralForm(minutes, ['минута', 'минуты', 'минут']);
    elements.secondsLabel.textContent = getPluralForm(seconds, ['секунда', 'секунды', 'секунд']);

    // Обновление прогресс-бара
    updateProgressBar(distance);

    // Анимация обновления
    animateValueUpdate();
}

// ===== АНИМАЦИИ =====
function animateValueUpdate() {
    const values = document.querySelectorAll('.time-value');
    values.forEach(value => {
        value.style.transform = 'scale(1.1)';
        setTimeout(() => {
            value.style.transform = 'scale(1)';
        }, 300);
    });
}

// ===== МОБИЛЬНОЕ МЕНЮ =====
function toggleMobileMenu() {
    elements.mobileNav.classList.toggle('active');
    
    if (elements.mobileNav.classList.contains('active')) {
        elements.menuIcon.classList.remove('fa-bars');
        elements.menuIcon.classList.add('fa-times');
        document.body.style.overflow = 'hidden';
    } else {
        elements.menuIcon.classList.remove('fa-times');
        elements.menuIcon.classList.add('fa-bars');
        document.body.style.overflow = '';
    }
}

// Закрытие меню при клике на ссылку
document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
        elements.mobileNav.classList.remove('active');
        elements.menuIcon.classList.remove('fa-times');
        elements.menuIcon.classList.add('fa-bars');
        document.body.style.overflow = '';
    });
});

// Закрытие меню при клике вне его
document.addEventListener('click', (e) => {
    if (!elements.mobileNav.contains(e.target) && 
        !elements.mobileMenuBtn.contains(e.target) &&
        elements.mobileNav.classList.contains('active')) {
        toggleMobileMenu();
    }
});

// ===== ИНИЦИАЛИЗАЦИЯ =====
function init() {
    // Запуск таймера
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);

    // Мобильное меню
    elements.mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    // Плавное появление элементов
    setTimeout(() => {
        document.querySelector('.hero-section').style.opacity = '1';
        document.querySelector('.hero-section').style.transform = 'translateY(0)';
    }, 100);

    // Анимация миньона
    const minion = document.querySelector('.minion-img');
    setInterval(() => {
        minion.style.transform = `translateY(${Math.sin(Date.now() / 1000) * 10}px)`;
    }, 50);

    // Добавление CSS анимаций
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .hero-section {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .time-value {
            transition: transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);

    // Логирование
    console.log('🚀 Таймер запущен! Камбэк назначен на 27 ноября 2026 года.');
    console.log('📱 Адаптивный дизайн активен');
}

// ===== ЗАПУСК =====
document.addEventListener('DOMContentLoaded', init);

// Обновление при изменении ориентации
window.addEventListener('resize', () => {
    clearInterval(countdownInterval);
    countdownInterval = setInterval(updateCountdown, 1000);
});

// Сохранение состояния при уходе со страницы
window.addEventListener('beforeunload', () => {
    clearInterval(countdownInterval);
});