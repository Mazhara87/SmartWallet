const mysql = require('mysql2');

// Создание соединения с базой данных
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Здесь укажите ваш пароль для доступа к MySQL
  database: 'smartwallet'
});

// Проверка соединения
connection.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err);
    return;
  }
  console.log('Соединение с базой данных успешно установлено');
});

module.exports = connection;

