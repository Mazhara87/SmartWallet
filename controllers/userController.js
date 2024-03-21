// userController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

exports.register = (req, res) => {
  const { username, email, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ message: 'Ошибка при хешировании пароля' });
    }

    db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hash], (err, result) => {
      if (err) {
        console.error(err); // Печатаем ошибку для отладки
        return res.status(500).json({ message: 'Ошибка при регистрации пользователя' });
      }
      res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
    });
  });
};
