// Устанавливаем дату камбэка
let countdownDate = new Date('Nov 27, 2026 00:00:00').getTime();

// Функция форматирования чисел
function format(value) {
    return value < 10 ? '0' + value : value;
}

// Функция склонения слов
function pluralize(value, one, few, many) {
    if (value < 0 || typeof value !== 'number') {
        return many;
    }
    
    const lastDigit = value % 10;
    const lastTwoDigits = value % 100;
    
    if (lastDigit === 1 && lastTwoDigits !== 11) {
        return one;
    } else if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 10 || lastTwoDigits > 20)) {
        return few;
    } else {
        return many;
    }
}

// Основная функция обновления таймера
function updateCountdown() {
    const now = new Date().getTime();
    let distance = countdownDate - now;
    
    // Если время вышло
    if (distance < 0) {
        clearInterval(countdownInterval);
        distance = 0;
        
        // Можно добавить сообщение о завершении
        document.querySelector('h1').textContent = 'Легенда вернулся! 🎉';
    }
    
    // Вычисление единиц времени
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Обновление значений
    document.querySelector('.days').textContent = format(days);
    document.querySelector('.hours').textContent = format(hours);
    document.querySelector('.min').textContent = format(minutes);
    document.querySelector('.sec').textContent = format(seconds);
    
    // Обновление подписей с правильным склонением
    document.querySelector('.days-tx').textContent = pluralize(days, 'День', 'Дня', 'Дней');
    document.querySelector('.hours-tx').textContent = pluralize(hours, 'Час', 'Часа', 'Часов');
    document.querySelector('.min-tx').textContent = pluralize(minutes, 'Минута', 'Минуты', 'Минут');
    document.querySelector('.sec-tx').textContent = pluralize(seconds, 'Секунда', 'Секунды', 'Секунд');
}

// Запуск таймера сразу и затем каждую секунду
updateCountdown(); // Сразу обновляем, чтобы не было задержки
const countdownInterval = setInterval(updateCountdown, 1000);

// Для отладки: консоль
console.log('Таймер запущен. Камбэк назначен на 27 ноября 2026 года.');