import React from "react";
import "./App.css";
import AppRoutes from './routes/AppRoutes.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { EventContextProvider } from './context/EventDataContext.jsx';

function App() {

  return (
    <AuthProvider>
      <EventContextProvider>
          <AppRoutes />
      </EventContextProvider>
    </AuthProvider>
  );
}

export default App;