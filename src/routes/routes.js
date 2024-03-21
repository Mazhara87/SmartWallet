const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const transactionController = require('../controllers/transactionController');

// Маршруты для пользователей
router.post('/register', userController.register);
router.post('/login', userController.login);

// Маршруты для транзакций
router.post('/transactions', transactionController.createTransaction);
router.get('/transactions/:userId', transactionController.getTransactionsByUser);

module.exports = router;
