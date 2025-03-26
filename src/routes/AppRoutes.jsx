import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import EventContextProvider from '../context/EventDataContext';
import PrivateRoute from '../context/AuthContext';

// Components
import Home from '../components/common/Home';
import Host from '../components/host/Host';
import GuestForm from '../components/guests/GuestForm';
import SignupHost from '../components/auth/SignupHost';
import HostLogin from '../components/auth/HostLogin';
import HostOptions from '../components/host/HostOptions';
import CreateEvent from '../components/events/CreateEvent';
import SuccessMessage from '../components/events/SuccessMessage';
import ViewEvents from '../components/events/ViewEvents';
import ContactPage from '../components/common/ContactPage';
import AboutPage from '../components/common/AboutPage';
import CustomizableInvitation from '../components/invitation/CustomizableInvitation';
import EventDetails from '../components/events/EventDetails';
import UploadGuestList from '../components/events/UploadGuestList';

const AppRoutes = () => {
  return (
    <EventContextProvider>
      <Routes>
        {/* Main Layout Routes */}
        <Route element={<MainLayout />}>
          {/* Public Routes - נגישים לכולם */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contactPage" element={<ContactPage />} />
          <Route path="/aboutPage" element={<AboutPage />} />
          <Route path="/host" element={<Host />} />
          
          {/* Private Routes - נגישים רק למשתמשים מחוברים */}
          <Route element={<PrivateRoute />}>
            <Route path="/hostOptions" element={<HostOptions />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/view-events" element={<ViewEvents />} />
            <Route path="/successMessage" element={<SuccessMessage />} />
            <Route path="/customizableInvitation" element={<CustomizableInvitation />} />
            <Route path="/eventDetails" element={<EventDetails />} />
            <Route path="/UploadGuestList" element={<UploadGuestList />} />
          </Route>
        </Route>

        {/* Auth Layout Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/signuphost" element={<SignupHost />} />
          <Route path="/loginhost" element={<HostLogin />} />
          <Route path="/guest/:eventId" element={<GuestForm />} />
        </Route>
      </Routes>
    </EventContextProvider>
  );
};

export default AppRoutes;