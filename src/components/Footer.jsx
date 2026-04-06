import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <span className="f-logo">MOGUL</span>
            <p>
              Authentic Indian &amp; Pakistani cuisine in the heart of Bonn —
              serving the Royal Flavors of the Mogul Empire for over 30 years.
            </p>
          </div>

          {/* Navigation */}
          <div className="footer-col">
            <h5>Navigation</h5>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/speisekarte">Speisekarte</Link></li>
              <li><Link to="/galerie">Galerie</Link></li>
              <li><Link to="/catering">Catering</Link></li>
              <li><Link to="/kontakt">Kontakt</Link></li>
            </ul>
          </div>

          {/* Hours */}
          <div className="footer-col">
            <h5>Öffnungszeiten</h5>
            <ul>
              <li><span>Mo, Mi, Do: 16:00 – 23:00</span></li>
              <li><span style={{ color: 'rgba(242,235,224,0.3)' }}>Di: Ruhetag</span></li>
              <li><span>Fr – So: 12:00 – 23:00</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h5>Kontakt</h5>
            <ul>
              <li><span>Heerstraße 64</span></li>
              <li><span>53111 Bonn</span></li>
              <li><a href="tel:+4922869556">+49 228 695569</a></li>
              <li>
                <Link to="/reservieren">
                  Tisch reservieren →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {year} Mogul Bonn Restaurant. Alle Rechte vorbehalten.</p>
          <a href="/impressum">Impressum</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
