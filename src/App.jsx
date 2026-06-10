import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Galerie from './pages/Galerie';
import CateringPage from './pages/Catering';
import Kontakt from './pages/Kontakt';
import Reservation from './pages/Reservation';
import Admin from './pages/Admin';
import Impressum from './pages/Impressum';
import Datenschutz from './pages/Datenschutz';
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
        <Route path="/reservieren" element={<Reservation />} />
        <Route path="/admin"      element={<Admin />} />
        <Route path="/impressum"  element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
        {/* Legacy redirect aliases */}
        <Route path="/menu"       element={<Menu />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
