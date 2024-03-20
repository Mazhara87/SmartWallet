// src/transactionModel.js

const db = require('./db');

exports.createTransaction = (userId, description, amount) => {
  const sql = 'INSERT INTO transactions (user_id, description, amount) VALUES (?, ?, ?)';
  return new Promise((resolve, reject) => {
    db.query(sql, [userId, description, amount], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.insertId);
      }
    });
  });
};

// Добавьте другие функции CRUD по мере необходимости
