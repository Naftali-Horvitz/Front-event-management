import React from 'react';
import { Outlet } from 'react-router-dom';
import '../cssS/AuthLayout.css';
import BackButton from '../components/features/BackButton.jsx';

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