// App.js

import React, { useState } from 'react';
import Header from './components/Header';
import TransactionForm from './components/TransactionForm';
import AuthModal from './components/AuthModal';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [username, setUsername] = useState(''); // Добавим состояние для имени пользователя
  const totalBalance = transactions.reduce((acc, curr) => acc + curr.amount, 0); // Вычисляем общий баланс

  const addTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <div className="container">
      <Header username={username} openAuthModal={openAuthModal} totalBalance={totalBalance} /> {/* Передаем имя пользователя и функцию открытия модального окна */}
      <TransactionForm addTransaction={addTransaction} transactions={transactions} deleteTransaction={deleteTransaction} totalBalance={totalBalance} />
      {isAuthModalOpen && <AuthModal closeModal={closeAuthModal} setUsername={setUsername} />} {/* Передаем функцию для обновления имени пользователя */}
    </div>
  );
}

export default App;
