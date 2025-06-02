// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NewTrip from './pages/NewTrip';
import Profile from './pages/Profile'; 
import Login from './pages/Login';
import Signup from './pages/Signup'; 
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} /> {/* ✅ new route */}
        <Route path="/new-trip" element={<NewTrip />} />
        <Route path="/login" element={<Login />} /> {/* ADD THese login & sign up */}
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
