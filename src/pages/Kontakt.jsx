import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HOURS = [
  { day: 'Montag', time: '16:00 – 23:00' },
  { day: 'Dienstag', time: 'Ruhetag', closed: true },
  { day: 'Mittwoch', time: '16:00 – 23:00' },
  { day: 'Donnerstag', time: '16:00 – 23:00' },
  { day: 'Freitag', time: '12:00 – 23:00' },
  { day: 'Samstag', time: '12:00 – 23:00' },
  { day: 'Sonntag', time: '12:00 – 23:00' },
];

const GMAPS_LINK = 'https://www.google.com/maps/place/Indisches+Restaurant+Mogul/@50.7374,7.0982,17z';
const GMAPS_EMBED = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2527.5!2d7.0982!3d50.7374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bee74b39c9b4c5%3A0x7da6c9c8c88e013a!2sHeerstra%C3%9Fe%2064%2C%2053111%20Bonn!5e0!3m2!1sde!2sde!4v1680000000000!5m2!1sde!2sde&style=feature:all|element:labels.text.fill|color:0xc9a458&style=feature:water|color:0x08070a&style=feature:road|color:0x1a1820&style=feature:landscape|color:0x14121a';

function getTodayIndex() {
  const d = new Date().getDay();
  return d === 0 ? 6 : d - 1;
}

function isCurrentlyOpen() {
  const now = new Date();
  const day = getTodayIndex();
  const h = now.getHours() + now.getMinutes() / 60;
  if (day === 1) return false; // Dienstag
  if (day >= 0 && day <= 3) return h >= 16 && h < 23; // Mo, Mi, Do
  return h >= 12 && h < 23; // Fr, Sa, So
}

export default function Kontakt() {
  useEffect(() => {
    window.scrollTo(0, 0);

    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('active');
          obs.unobserve(e.target);
        }
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const todayIdx = getTodayIndex();
  const open = isCurrentlyOpen();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [showMap, setShowMap] = useState(false);

  return (
    <div className="kp-page">

      {/* ── PAGE HEADER ─────────────────────────────────────────── */}
      <div className="container">
        <div className="kp-header">
          <span className="kp-eyebrow">Kontakt &amp; Anfahrt</span>
          <h1 className="kp-title">
            Besuchen Sie<br /><em>uns in Bonn</em>
          </h1>
        </div>
      </div>

      {/* ── MAIN GRID ───────────────────────────────────────────── */}
      <div className="container">
        <div className="kp-grid">

          {/* ── LEFT: info ────────────────────────────────── */}
          <div className="kp-info">

            {/* Address */}
            <div className="kp-info-block reveal-left">
              <span className="kp-info-label">Adresse</span>
              <p className="kp-info-value">
                Heerstraße 64<br />
                53111 Bonn<br />
                <span style={{ opacity: 0.6 }}>Nordrhein-Westfalen, Deutschland</span>
              </p>
            </div>

            {/* Phone */}
            <div className="kp-info-block reveal-left" style={{ '--delay': '0.1s' }}>
              <span className="kp-info-label">Telefon</span>
              <div className="kp-phones">
                <div>
                  <a href="tel:+4922869556" className="kp-phone-link">+49 228 695569</a>
                  <small>Reservierungen &amp; Anfragen</small>
                </div>
                <div>
                  <a href="tel:+4915144200400" className="kp-phone-link">+49 1514 4200400</a>
                  <small>Catering-Hotline</small>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="kp-info-block reveal-left" style={{ '--delay': '0.2s' }}>
              <span className="kp-info-label">Öffnungszeiten</span>
              <div className={`kp-open-badge ${open ? 'kp-open-badge--open' : 'kp-open-badge--closed'}`}>
                <span className="kp-open-dot" />
                {open ? 'Jetzt geöffnet' : 'Momentan geschlossen'}
              </div>
              <div className="kp-hours-list">
                {HOURS.map((h, i) => (
                  <div key={i} className={`kp-hours-row${i === todayIdx ? ' kp-today' : ''}`}>
                    <span className="kp-hours-day">{h.day}</span>
                    <span className={`kp-hours-time${h.closed ? ' kp-closed' : ''}`}>{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reserve CTA */}
            <div className="kp-info-block reveal-left" style={{ '--delay': '0.3s' }}>
              <span className="kp-info-label">Reservierung</span>
              <p className="kp-reserve-text">
                Für Gruppen ab 8 Personen bitten wir um telefonische Vorankündigung.
              </p>
              <button
                className="glf-button btn btn-gold"
                data-glf-cuid=""
                data-glf-ruid="8f4c63b5-308c-432e-990b-057b82f2697c"
                data-glf-reservation="true"
                aria-label="Tisch reservieren"
              >
                Tisch reservieren
              </button>
            </div>

            {/* Socials */}
            <div className="kp-socials reveal-left" style={{ '--delay': '0.4s' }}>
              <a href="https://www.instagram.com/mogul.bonn/" target="_blank" rel="noopener noreferrer" className="kp-social-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                Instagram
              </a>
              <a href="https://www.facebook.com/mogulbonn" target="_blank" rel="noopener noreferrer" className="kp-social-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.514c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" /></svg>
                Facebook
              </a>
            </div>
          </div>

          {/* ── RIGHT: Premium map card ──────────────────── */}
          <div className="kp-map-card reveal-right">

            {/* Map preview / interactive area */}
            <div className="kp-map-area">
              {!showMap ? (
                /* Static preview with animated pin — click to load live map */
                <button
                  className="kp-map-preview"
                  onClick={() => setShowMap(true)}
                  aria-label="Karte anzeigen"
                >
                  {/* Dark grid overlay that looks like a map */}
                  <div className="kp-map-grid" aria-hidden="true">
                    <div className="kp-map-grid-lines" />
                    <div className="kp-map-street kp-street-h" style={{ top: '48%', left: 0, right: 0 }} />
                    <div className="kp-map-street kp-street-h" style={{ top: '32%', left: 0, right: 0, opacity: 0.4 }} />
                    <div className="kp-map-street kp-street-h" style={{ top: '65%', left: 0, right: 0, opacity: 0.35 }} />
                    <div className="kp-map-street kp-street-v" style={{ left: '42%', top: 0, bottom: 0 }} />
                    <div className="kp-map-street kp-street-v" style={{ left: '68%', top: 0, bottom: 0, opacity: 0.4 }} />
                    <div className="kp-map-street kp-street-v" style={{ left: '22%', top: 0, bottom: 0, opacity: 0.3 }} />
                    <div className="kp-map-label" style={{ top: '44%', left: '14%' }}>Heerstraße</div>
                    <div className="kp-map-label" style={{ top: '27%', left: '55%', opacity: 0.5 }}>Meckenheimer Allee</div>
                  </div>

                  {/* Animated pin */}
                  <div className="kp-pin-wrap">
                    <div className="kp-pin-pulse" />
                    <div className="kp-pin-pulse kp-pin-pulse--2" />
                    <div className="kp-pin">
                      <svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 22 14 22S28 24.5 28 14C28 6.268 21.732 0 14 0z" fill="#C9A458" />
                        <circle cx="14" cy="14" r="5" fill="#08070A" />
                      </svg>
                    </div>
                  </div>

                  {/* Click to activate overlay */}
                  <div className="kp-map-activate">
                    <span>Karte anzeigen</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 3h6m0 0v6m0-6L10 14M21 13v8H3V3h8" /></svg>
                  </div>
                </button>
              ) : (
                /* Live Google Maps iframe — loaded on demand */
                <iframe
                  className="kp-iframe"
                  title="Mogul Bonn Standort"
                  src={GMAPS_EMBED}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ border: 0 }}
                  onLoad={() => setMapLoaded(true)}
                />
              )}
            </div>

            {/* Info bar below the map */}
            <div className="kp-map-footer">
              <div className="kp-map-address">
                <div className="kp-map-pin-icon" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C7.589 0 4 3.589 4 8c0 6 8 16 8 16s8-10 8-16c0-4.411-3.589-8-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z" /></svg>
                </div>
                <div>
                  <strong>Mogul Bonn</strong>
                  <span>Heerstraße 64, 53111 Bonn</span>
                </div>
              </div>

              <div className="kp-map-actions">
                <a
                  href={GMAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="kp-gmaps-btn"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M15 3h6m0 0v6m0-6L10 14M21 13v8H3V3h8" /></svg>
                  In Google Maps öffnen
                </a>
                <a href="https://www.google.com/maps/dir/?api=1&destination=Heerstra%C3%9Fe+64,+53111+Bonn" target="_blank" rel="noopener noreferrer" className="kp-directions-btn">
                  Route planen
                </a>
              </div>
            </div>

            {/* ÖPNV card */}
            <div className="kp-transit">
              <div className="kp-transit-icon" aria-hidden="true">🚌</div>
              <div>
                <strong>Mit dem ÖPNV</strong>
                <span>Linie 61 / 62 — Haltestelle Heerstraße</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── GOLD BOTTOM BAR ─────────────────────────────────────── */}
      <div className="kp-bottom-bar">
        Heerstraße 64 · 53111 Bonn · Tel. 0228 695569 · Di Ruhetag
      </div>
    </div>
  );
}
