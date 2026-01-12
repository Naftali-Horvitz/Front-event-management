import React from 'react';
import Header from '../components/common/Header';
import { Outlet } from 'react-router-dom';
import '../styles/layouts/PublicLayout.css';

const PublicLayout = () => {
  return (
    <div className="layout-container">
      <Header />
      <main className="main-content-full">
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;