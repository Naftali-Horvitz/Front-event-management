import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Host from "../src/components/host/Host";
import GuestForm from "../src/components/guest/GuestForm";
import Home from "./components/Home";
import SignupHost from "../src/components/host/SignupHost";
import HostLogin from "../src/components/host/HostLogin";
import Header from "./components/Header";
import HostOptions from "../src/components/host/HostOptions";
import CreateEvent from "../src/components/host/CreateEvent";
import SuccessMessage from "../src/components/host/SuccessMessage";
import ViewEvents from "../src/components/host/ViewEvents";

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/host" element={<Host />} />
          <Route path="/signuphost" element={<SignupHost />} />
          <Route path="/loginhost" element={<HostLogin />} />
          <Route path="/guest/:eventId" element={<GuestForm />} />
          <Route path="/hostOptions" element={<HostOptions />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/success-message" element={<SuccessMessage />} />
          <Route path="/view-events" element={<ViewEvents />} />
        </Routes>
      </main>
    </div>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;