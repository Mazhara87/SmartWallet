import React from 'react';

function TransactionList({ transactions, deleteTransaction }) {
  return (
    <div className="transaction-list">
      <h3><i className="fas fa-history"></i> Transaction History</h3>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id} className={transaction.amount < 0 ? 'minus' : 'plus'}>
            {transaction.text} <span>${Math.abs(transaction.amount)}</span>
            <button onClick={() => deleteTransaction(transaction.id)} className="delete-btn"><i className="fas fa-trash-alt"></i></button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;
