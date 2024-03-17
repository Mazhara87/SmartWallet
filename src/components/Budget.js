import React from 'react';

function Budget({ transactions }) {
  // Фильтруем транзакции для вычисления общего дохода
  const totalIncome = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((total, transaction) => total + transaction.amount, 0);

  // Фильтруем транзакции для вычисления общих расходов
  const totalExpense = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((total, transaction) => total + transaction.amount, 0);

  // Вычисляем общий баланс (доходы - расходы)
  const balance = totalIncome + totalExpense;

  return (
    <div>
      <h2>Общий баланс: {balance}</h2>
      <p>Доходы: {totalIncome}</p>
      <p>Расходы: {totalExpense}</p>
    </div>
  );
}

export default Budget;