import React from 'react';
import { Outlet } from 'react-router-dom';
import '../styles/components/AuthLayout.css';
import BackButton from '../components/common/BackButton.jsx';

const AuthLayout = () => {
  return (
    <div className="auth-container">
      <div >
        <BackButton />
      </div>
      <div className="main-content">
        <main className="auth-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;