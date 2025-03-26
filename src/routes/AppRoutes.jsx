import React, { Suspense, useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import { useAuth } from '../context/AuthContext';

const LoadingFallback = () => (
  <div className="loading-spinner">Loading...</div>
);

// Components
const Home = React.lazy(() => import( '../components/common/Home'));
const Host = React.lazy(() => import( '../components/host/Host'));
const GuestForm = React.lazy(() => import( '../components/guests/GuestForm'));
const SignupHost = React.lazy(() => import( '../components/auth/SignupHost'));
const HostLogin = React.lazy(() => import( '../components/auth/HostLogin'));
const HostOptions = React.lazy(() => import( '../components/host/HostOptions'));
const CreateEvent = React.lazy(() => import( '../components/events/CreateEvent'));
const SuccessMessage = React.lazy(() => import( '../components/events/SuccessMessage'));
const ViewEvents = React.lazy(() => import( '../components/events/ViewEvents'));
const ContactPage = React.lazy(() => import( '../components/common/ContactPage'));
const AboutPage = React.lazy(() => import( '../components/common/AboutPage'));
const CustomizableInvitation = React.lazy(() => import( '../components/invitation/CustomizableInvitation'));
const EventDetails = React.lazy(() => import( '../components/events/EventDetails'));
const UploadGuestList =  React.lazy(() => import( '../components/events/UploadGuestList'));

const ProtectedRoute = () => {

  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <LoadingFallback />;
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/loginhost" replace />;

};
const createProtectedRoute = (path, Component) => ({
  path,
  element: <ProtectedRoute />,
  children: [
    {
      path: '',
      element: (
        <Suspense fallback={<LoadingFallback />}>
          <Component />
        </Suspense>
      )
    }
  ]
});
const createPublicRoute = (path, Component) => ({
  path,
  element: <Outlet />,
  children: [
    {
      path: '',
      element: (
        <Suspense fallback={<LoadingFallback />}>
          <Component />
        </Suspense>
      )
    }
  ]
});
const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      createProtectedRoute("/hostOptions" , HostOptions),
      createProtectedRoute("/create-event" , CreateEvent),
      createProtectedRoute("/view-events" , ViewEvents),
      createProtectedRoute("/successMessage" , SuccessMessage),
      createProtectedRoute("/customizableInvitation" , CustomizableInvitation),
      createProtectedRoute("/eventDetails" , EventDetails),
      createProtectedRoute("/UploadGuestList" , UploadGuestList),
    ]
      
  },
  {
    element: <MainLayout />,
    children: [
      createPublicRoute("/", Home),
      createPublicRoute("/home", Home),
      createPublicRoute("/contactPage", ContactPage),
      createPublicRoute("/aboutPage", AboutPage),
      createPublicRoute("/host", Host),
    ]
  },
  {
    element: <AuthLayout />,
    children: [
      createPublicRoute("/signuphost", SignupHost),
      createPublicRoute("/loginhost", HostLogin),
      createPublicRoute("/guest/:eventId", GuestForm),
    ]
  }
], {
  future: {
    v7_relativeSplatPath: true
  },
  basename: '/'
});

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};



export default AppRoutes;