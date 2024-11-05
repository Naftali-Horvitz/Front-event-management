import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';

// Components
import Home from '../components/Home';
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
import CustomizableInvitation from '../components/host/custom-event-invitation/CustomizableInvitation';
import EventDetails from '../components/host/EventDetails';
const AppRoutes = () => {
  return (
    <Routes>
      {/* Main Layout Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/host" element={<Host />} />
        <Route path="/hostOptions" element={<HostOptions />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/view-events" element={<ViewEvents />} />
        <Route path="/guest/:eventId" element={<GuestForm />} />
        <Route path="/successMessage" element={<SuccessMessage />} />
        <Route path="/customizableInvitation" element={<CustomizableInvitation />} />
        <Route path="/contactPage" element={<ContactPage />} />
        <Route path="/aboutPage" element={<AboutPage />} />
        <Route path="/eventDetails/:eventId" element={<EventDetails />} />
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