const connection = require('../bd');

// Добавление нового пользователя
const addUser = (userData, callback) => {
    const { username, email, password } = userData;
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    connection.query(sql, [username, email, password], (err, result) => {
        if (err) {
            console.error('Ошибка при добавлении пользователя:', err);
            callback(err, null);
            return;
        }
        console.log('Пользователь успешно добавлен');
        callback(null, result.insertId);
    });
};

// Получение информации о пользователе по его ID
const getUserById = (userId, callback) => {
    const sql = 'SELECT * FROM users WHERE id = ?';
    connection.query(sql, [userId], (err, result) => {
        if (err) {
            console.error('Ошибка при получении пользователя:', err);
            callback(err, null);
            return;
        }
        if (result.length === 0) {
            console.log('Пользователь не найден');
            callback(null, null);
            return;
        }
        console.log('Информация о пользователе получена');
        callback(null, result[0]);
    });
};

// Обновление информации о пользователе
const updateUser = (userId, userData, callback) => {
    const { username, email, password } = userData;
    const sql = 'UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?';
    connection.query(sql, [username, email, password, userId], (err, result) => {
        if (err) {
            console.error('Ошибка при обновлении пользователя:', err);
            callback(err, null);
            return;
        }
        console.log('Информация о пользователе успешно обновлена');
        callback(null, result.affectedRows);
    });
};

// Удаление пользователя по его ID
const deleteUser = (userId, callback) => {
    const sql = 'DELETE FROM users WHERE id = ?';
    connection.query(sql, [userId], (err, result) => {
        if (err) {
            console.error('Ошибка при удалении пользователя:', err);
            callback(err, null);
            return;
        }
        console.log('Пользователь успешно удален');
        callback(null, result.affectedRows);
    });
};

module.exports = {
    addUser,
    getUserById,
    updateUser,
    deleteUser
};
