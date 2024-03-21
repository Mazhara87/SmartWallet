// Header.js

import React from 'react';

function Header({ username, openAuthModal }) {
  return (
    <div className="header">
      <h1>SmartWallet</h1>
      {/* Покажем имя пользователя, если оно есть, иначе кнопку для открытия модального окна */}
      {username ? <span>Welcome, {username}</span> : <button className="auth-button" onClick={openAuthModal}>Login/Register</button>}
    </div>
  );
}

export default Header;
