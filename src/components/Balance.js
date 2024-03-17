import React from 'react';

function Balance({ totalBalance }) {
  return (
    <div className="balance">
      <h4>Total Balance</h4>
      <h1>${totalBalance.toFixed(2)}</h1>
    </div>
  );
}

export default Balance;
