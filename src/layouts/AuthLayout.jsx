import React from 'react';
import { Outlet } from 'react-router-dom';
import '../styles/components/AuthLayout.css';
import BackButton from '../components/common/BackButton.jsx';

const AuthLayout = () => {
  return (
    <div className="auth-container">
      <div className="p-4">
        <BackButton />
      </div>
      <main className="auth-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;