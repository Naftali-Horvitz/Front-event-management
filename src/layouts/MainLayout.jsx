import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import '../cssS/MainLayout.css';

const MainLayout = () => {
  return (
    <div className="layout-container">
      <Header />
      <main className="main-content-full">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;