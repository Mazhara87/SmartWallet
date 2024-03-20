const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

// Регистрация нового пользователя
exports.register = (req, res) => {
  const { username, email, password } = req.body;

  // Хешируем пароль
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ message: 'Ошибка при хешировании пароля' });
    }

    // Сохраняем пользователя в базе данных
    db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hash], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Ошибка при регистрации пользователя' });
      }
      res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
    });
  });
};

// Вход пользователя
exports.login = (req, res) => {
  const { email, password } = req.body;

  // Поиск пользователя по email в базе данных
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Ошибка при поиске пользователя' });
    }
    if (result.length === 0) {
      return res.status(401).json({ message: 'Неверный email или пароль' });
    }

    // Сравнение хэшированного пароля
    bcrypt.compare(password, result[0].password, (err, isEqual) => {
      if (err) {
        return res.status(500).json({ message: 'Ошибка при сравнении паролей' });
      }
      if (!isEqual) {
        return res.status(401).json({ message: 'Неверный email или пароль' });
      }

      // Генерация JWT токена
      const token = jwt.sign(
        { userId: result[0].id, email: result[0].email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.status(200).json({ token });
    });
  });
};
