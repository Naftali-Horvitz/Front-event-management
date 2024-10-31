import React from 'react';
import { Outlet } from 'react-router-dom';
import '../cssS/AuthLayout.css';

const AuthLayout = () => {
  return (
    <div className="auth-container">
      <main className="auth-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;