import React, { useState } from 'react';
import Header from './components/Header';
import TransactionForm from './components/TransactionForm';
import './App.css';

// Добавим импорт для маршрутов
// import routes from './routes/routes';


function App() {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };

  // Вычисляем текущий баланс
  const totalBalance = transactions.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="container">
      <Header />
      {/* Передаем текущий баланс в компонент TransactionForm */}
      <TransactionForm addTransaction={addTransaction} transactions={transactions} deleteTransaction={deleteTransaction} totalBalance={totalBalance} />
    </div>
  );
}

export default App;
