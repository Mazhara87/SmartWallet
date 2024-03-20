// src/routes/transactionRoutes.js

const express = require('express');
const router = express.Router();
const transactionModel = require('../transactionModel');

// Создание новой транзакции
router.post('/transactions', async (req, res) => {
  try {
    const { userId, description, amount } = req.body;
    const transactionId = await transactionModel.createTransaction(userId, description, amount);
    res.status(201).json({ transactionId });
  } catch (error) {
    console.error('Ошибка при создании транзакции:', error);
    res.status(500).json({ error: 'Ошибка при создании транзакции' });
  }
});

// Добавьте другие обработчики маршрутов транзакций по мере необходимости

module.exports = router;
