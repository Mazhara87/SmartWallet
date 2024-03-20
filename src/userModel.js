// src/userModel.js

const db = require('./db');

exports.createUser = (username, email, password) => {
  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  return new Promise((resolve, reject) => {
    db.query(sql, [username, email, password], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.insertId);
      }
    });
  });
};

exports.getUserById = (id) => {
  const sql = 'SELECT * FROM users WHERE id = ?';
  return new Promise((resolve, reject) => {
    db.query(sql, [id], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows[0]);
      }
    });
  });
};

// Добавьте другие функции CRUD по мере необходимости
