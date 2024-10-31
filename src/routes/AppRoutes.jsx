import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';

// Components
import Home from '../components/Home';
import TextHome from '../components/TextHome';
import Host from '../components/host/Host';
import GuestForm from '../components/guest/GuestForm';
import SignupHost from '../components/host/SignupHost';
import HostLogin from '../components/host/HostLogin';
import HostOptions from '../components/host/HostOptions';
import CreateEvent from '../components/host/CreateEvent';
import SuccessMessage from '../components/host/SuccessMessage';
import ViewEvents from '../components/host/ViewEvents';
import ContactPage from '../components/ContactPage';
import AboutPage from '../components/AboutPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Main Layout Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<TextHome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/host" element={<Host />} />
        <Route path="/hostOptions" element={<HostOptions />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/view-events" element={<ViewEvents />} />
        <Route path="/guest/:eventId" element={<GuestForm />} />
        <Route path="/success-message" element={<SuccessMessage />} />
        <Route path="/contactPage" element={<ContactPage />} />
        <Route path="/aboutPage" element={<AboutPage />} />
      </Route>

      {/* Auth Layout Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/signuphost" element={<SignupHost />} />
        <Route path="/loginhost" element={<HostLogin />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;