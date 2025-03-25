import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // התאם את הנתיב למיקום של AuthProvider

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // אם המשתמש מחובר, הצג את תוכן הראוט (Outlet)
  // אם לא, העבר לדף ההתחברות עם שמירת המיקום הקודם ב-state
  return( isAuthenticated ? (
    <Outlet />
  ) : (
    // <Navigate to="/loginhost" state={{ from: location.pathname }} replace />
    <Navigate to="/loginhost" />
  ));
};

export default PrivateRoute;