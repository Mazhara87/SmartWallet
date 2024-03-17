import React, { useState } from 'react';
import TransactionList from './TransactionList';
import Balance from './Balance';

function TransactionForm({ addTransaction, transactions, deleteTransaction, totalBalance }) {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: +amount
    };

    addTransaction(newTransaction);

    setText('');
    setAmount('');
  };

  return (
    <div>
      {/* Передаем текущий баланс компоненту Balance */}
      <Balance totalBalance={totalBalance} />
      <form onSubmit={onSubmit} className="transaction-form">
        <div className="form-control">
          <label htmlFor="text"><i className="fas fa-file-alt"></i> Description</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter description..." required />
        </div>
        <div className="form-control">
          <label htmlFor="amount"><i className="fas fa-money-bill-wave"></i> Amount <br /> (negative - expense, positive - income)</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." required />
        </div>
        <button className="btn"><i className="fas fa-plus"></i> Add Transaction</button>
      </form>
      <TransactionList transactions={transactions} deleteTransaction={deleteTransaction} />
      <footer>SmartWallet © 2024</footer>
    </div>
  );
}

export default TransactionForm;
