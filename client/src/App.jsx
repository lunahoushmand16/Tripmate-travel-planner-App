// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NewTrip from './pages/NewTrip';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-trip" element={<NewTrip />} />
      </Routes>
    </Router>
  );
}

export default App;
