// models/userModel.js
const db = require('../db');

// Здесь можно добавить другие функции для работы с данными о пользователях, если необходимо

module.exports = {
  // Функция для регистрации нового пользователя
  registerUser: (username, email, password) => {
    return new Promise((resolve, reject) => {
      // Хешируем пароль
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          reject('Ошибка при хешировании пароля');
        } else {
          // Сохраняем пользователя в базе данных
          db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hash], (err, result) => {
            if (err) {
              reject('Ошибка при регистрации пользователя');
            } else {
              resolve('Пользователь успешно зарегистрирован');
            }
          });
        }
      });
    });
  },
  // Функция для входа пользователя
  loginUser: (email, password) => {
    return new Promise((resolve, reject) => {
      // Поиск пользователя по email в базе данных
      db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
        if (err) {
          reject('Ошибка при поиске пользователя');
        } else if (result.length === 0) {
          reject('Неверный email или пароль');
        } else {
          // Сравнение хэшированного пароля
          bcrypt.compare(password, result[0].password, (err, isEqual) => {
            if (err) {
              reject('Ошибка при сравнении паролей');
            } else if (!isEqual) {
              reject('Неверный email или пароль');
            } else {
              // Генерация JWT токена
              const token = jwt.sign(
                { userId: result[0].id, email: result[0].email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
              );
              resolve(token);
            }
          });
        }
      });
    });
  }
};
