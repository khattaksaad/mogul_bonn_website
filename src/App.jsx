import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Galerie from './pages/Galerie';
import CateringPage from './pages/Catering';
import Kontakt from './pages/Kontakt';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/speisekarte" element={<Menu />} />
        <Route path="/galerie"    element={<Galerie />} />
        <Route path="/catering"   element={<CateringPage />} />
        <Route path="/kontakt"    element={<Kontakt />} />
        {/* Legacy redirect aliases */}
        <Route path="/menu"       element={<Menu />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
