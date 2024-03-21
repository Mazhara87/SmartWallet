const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./src/db'); // Импортируем соединение с базой данных
const app = express();
const PORT = process.env.PORT || 5000;

// Подключаем парсер для данных в формате JSON
app.use(bodyParser.json());

// Обработчик маршрута для регистрации пользователей
app.post('/api/register', (req, res) => {
  // Получаем данные из тела запроса
  const { email, password } = req.body;

  // Сохраняем данные в базе данных
  connection.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password], (err, result) => {
    if (err) {
      console.error('Ошибка при сохранении данных в базу данных:', err);
      res.status(500).json({ success: false, message: 'Произошла ошибка при регистрации пользователя' });
      return;
    }
    console.log('Пользователь успешно зарегистрирован:', result);
    res.status(200).json({ success: true, message: 'Пользователь успешно зарегистрирован' });
  });
});

// Запускаем сервер
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
