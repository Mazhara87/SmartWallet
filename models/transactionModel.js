// models/transactionModel.js
const db = require('../db');

// Здесь можно добавить другие функции для работы с данными о транзакциях, если необходимо

module.exports = {
  // Функция для создания новой транзакции
  createTransaction: (userId, description, amount) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO transactions (user_id, description, amount) VALUES (?, ?, ?)', [userId, description, amount], (err, result) => {
        if (err) {
          reject('Ошибка при создании транзакции');
        } else {
          resolve('Транзакция успешно создана');
        }
      });
    });
  },
  // Функция для получения всех транзакций пользователя
  getTransactionsByUser: (userId) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM transactions WHERE user_id = ?', [userId], (err, result) => {
        if (err) {
          reject('Ошибка при получении транзакций');
        } else {
          resolve(result);
        }
      });
    });
  }
};
