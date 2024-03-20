// transactionModel.js

const db = require('./bd');

// Создание новой транзакции
async function createTransaction(userId, description, amount) {
  try {
    const [result] = await db.query('INSERT INTO transactions (user_id, description, amount) VALUES (?, ?, ?)', [userId, description, amount]);
    return result.insertId;
  } catch (error) {
    console.error('Ошибка при создании транзакции:', error);
    throw error;
  }
}

// Получение информации о транзакции по её ID
async function getTransactionById(transactionId) {
  try {
    const [result] = await db.query('SELECT * FROM transactions WHERE id = ?', [transactionId]);
    return result[0];
  } catch (error) {
    console.error('Ошибка при получении информации о транзакции:', error);
    throw error;
  }
}

// Получение всех транзакций для определенного пользователя
async function getAllTransactionsByUserId(userId) {
  try {
    const [result] = await db.query('SELECT * FROM transactions WHERE user_id = ?', [userId]);
    return result;
  } catch (error) {
    console.error('Ошибка при получении всех транзакций пользователя:', error);
    throw error;
  }
}

// Обновление данных о существующей транзакции
async function updateTransaction(transactionId, updatedData) {
  const { description, amount } = updatedData;
  try {
    await db.query('UPDATE transactions SET description = ?, amount = ? WHERE id = ?', [description, amount, transactionId]);
    return true;
  } catch (error) {
    console.error('Ошибка при обновлении транзакции:', error);
    throw error;
  }
}

// Удаление транзакции
async function deleteTransaction(transactionId) {
  try {
    await db.query('DELETE FROM transactions WHERE id = ?', [transactionId]);
    return true;
  } catch (error) {
    console.error('Ошибка при удалении транзакции:', error);
    throw error;
  }
}

module.exports = {
  createTransaction,
  getTransactionById,
  getAllTransactionsByUserId,
  updateTransaction,
  deleteTransaction
};
