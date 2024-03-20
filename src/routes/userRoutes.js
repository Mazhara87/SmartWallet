// src/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userModel = require('../userModel');

// Создание нового пользователя
router.post('/users', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userId = await userModel.createUser(username, email, password);
    res.status(201).json({ userId });
  } catch (error) {
    console.error('Ошибка при создании пользователя:', error);
    res.status(500).json({ error: 'Ошибка при создании пользователя' });
  }
});

// Получение информации о пользователе по его ID
router.get('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.getUserById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'Пользователь не найден' });
    }
  } catch (error) {
    console.error('Ошибка при получении информации о пользователе:', error);
    res.status(500).json({ error: 'Ошибка при получении информации о пользователе' });
  }
});

module.exports = router;
