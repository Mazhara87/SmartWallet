// controllers/transactionController.js
const db = require('../db');

// Создание новой транзакции
exports.createTransaction = (req, res) => {
  const { userId, description, amount } = req.body;

  // Сохраняем транзакцию в базе данных
  db.query('INSERT INTO transactions (user_id, description, amount) VALUES (?, ?, ?)', [userId, description, amount], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Ошибка при создании транзакции' });
    }
    res.status(201).json({ message: 'Транзакция успешно создана' });
  });
};

// Получение всех транзакций для конкретного пользователя
exports.getTransactionsByUser = (req, res) => {
  const { userId } = req.params;

  // Получаем все транзакции для конкретного пользователя из базы данных
  db.query('SELECT * FROM transactions WHERE user_id = ?', [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Ошибка при получении транзакций' });
    }
    res.status(200).json(result);
  });
};
