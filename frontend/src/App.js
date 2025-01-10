import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import Dashboard from './pages/Dashboard/Dashboard';
import TestPage from './pages/TestPage/TestPage';
import OnboardingPage from './pages/OnboardingPage/OnboardingPage';
import Profile from './pages/Profile/Profile'; 
//import MessagesPage from './pages/MessagesPage/MessagesPage';
//import EditProfile from './pages/Profile/Edit/Edit'; 
//<Route path="/messages" element={ <MessagesPage />} />
import './style.css';

// This is only here because we cant seem to comment in the return
//<Route path="/profile/edit" element={ <EditProfile />} />

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={ <LandingPage />} />
        <Route path="/onboarding" element={ <OnboardingPage />} />
        <Route path="/dashboard" element={ <Dashboard />} />
        <Route path="/test" element={ <TestPage/>} />
      </Routes>
    </Router>
  );
};

export default App;
