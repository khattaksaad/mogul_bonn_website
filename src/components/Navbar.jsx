import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const RUID = '8f4c63b5-308c-432e-990b-057b82f2697c';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  // prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Re-bind GloriaFood widget after React renders
  useEffect(() => {
    const bindGloriaFood = () => {
      if (typeof window.glfBindButtons === 'function') {
        window.glfBindButtons();
      }
    };
    
    // Try binding immediately
    bindGloriaFood();
    
    // The GloriaFood script loads asynchronously. We poll a few times
    // to ensure the buttons are bound once the script is ready,
    // and also to catch any dynamically loaded components.
    const intervalId = setInterval(bindGloriaFood, 500);
    const timeoutId = setTimeout(() => clearInterval(intervalId), 5000);
    
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [location.pathname]);

  return (
    <nav className={`navbar${scrolled || menuOpen ? ' scrolled' : ''}`}>
      <div className="container nav-inner">
        <Link to="/" className="nav-logo">MOGUL</Link>

        <div className={`nav-links${menuOpen ? ' mobile-open' : ''}`}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/speisekarte" className="nav-link">Speisekarte</Link>
          <Link to="/galerie" className="nav-link">Galerie</Link>
          <Link to="/catering" className="nav-link">Catering</Link>
          <Link to="/kontakt" className="nav-link">Kontakt</Link>
        </div>

        {/* CTA buttons */}
        <div className="nav-actions">
          {/* Online Order → triggers GloriaFood ordering popup */}
          <button
            className="glf-button nav-cta-order"
            data-glf-cuid=""
            data-glf-ruid={RUID}
            aria-label="Online bestellen"
          >
            Bestellen
          </button>

          {/* Table Reservation → Native GloriaFood Popup */}
          <button
            className="glf-button nav-cta btn"
            data-glf-cuid=""
            data-glf-ruid={RUID}
            data-glf-reservation="true"
            aria-label="Tisch reservieren"
          >
            Reservieren
          </button>
        </div>

        <button
          className={`nav-hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menü"
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
