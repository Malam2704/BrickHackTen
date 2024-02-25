import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import MapComponent from './MapComponent';
// Import or define your About and Support components

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MapComponent />} />
        <Route path="/about" element={<div>About Page</div>} /> {/* Replace with your actual About component */}
        <Route path="/support" element={<div>Support Page</div>} /> {/* Replace with your actual Support component */}
      </Routes>
    </Router>
  );
}

export default App;
