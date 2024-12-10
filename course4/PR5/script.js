document.write("<h3>Завдання №1</h3>");
let task1Date = new Date(2021, 1, 20, 3, 12);
document.write(`Дата: ${task1Date.toLocaleString()}<br>`);


document.write("<h3>Завдання №2</h3>");
function getWeekDay(date) {
    const days = ['НД', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
    return days[date.getDay()];
}
let task2Date = new Date(2024, 11, 18); // 3 січня 2012
document.write(`Робочий день: ${getWeekDay(task2Date)}<br>`);


document.write("<h3>Завдання №3</h3>");
function getLastDayOfMonth(year, month) {
    let date = new Date(year, month + 1, 0);
    return date.getDate();
}
let task3Year = 2024;
let task3Month = 11;
document.write(`Останній день місяця: ${getLastDayOfMonth(task3Year, task3Month)}<br>`);


document.write("<h3>Завдання №4</h3>");
function getSecondsToTomorrow() {
    let now = new Date();
    let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    let diff = tomorrow - now;
    return Math.floor(diff / 1000);
}
document.write(`Секунд до завтра: ${getSecondsToTomorrow()}<br>`);


document.write("<h3>Завдання №5</h3>");
function formatDate(date) {
    let now = new Date();
    let diff = now - date;
    if (diff < 1000) {
        return "прямо зараз";
    } else if (diff < 60000) {
        return `${Math.floor(diff / 1000)} сек. назад`;
    } else if (diff < 3600000) {
        return `${Math.floor(diff / 60000)} хв. назад`;
    } else {
        let day = date.getDate().toString().padStart(2, '0');
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let year = date.getFullYear().toString().slice(-2);
        let hours = date.getHours().toString().padStart(2, '0');
        let minutes = date.getMinutes().toString().padStart(2, '0');
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    }
}
let task5Date = new Date(2024, 11, 3, 0, 4);
document.write(`Форматована дата: ${formatDate(task5Date)}<br>`);