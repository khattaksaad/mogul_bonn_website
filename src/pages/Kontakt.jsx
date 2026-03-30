import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const HOURS = [
  { day: 'Montag',     time: '16:00 – 23:00' },
  { day: 'Dienstag',   time: 'Ruhetag',        closed: true },
  { day: 'Mittwoch',   time: '16:00 – 23:00' },
  { day: 'Donnerstag', time: '16:00 – 23:00' },
  { day: 'Freitag',    time: '12:00 – 23:00' },
  { day: 'Samstag',    time: '12:00 – 23:00' },
  { day: 'Sonntag',    time: '12:00 – 23:00' },
];

function getTodayIndex() {
  const d = new Date().getDay();
  return d === 0 ? 6 : d - 1;
}

export default function Kontakt() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const todayIdx = getTodayIndex();

  return (
    <div className="contact-page">
      <div className="container">
        {/* Header */}
        <div className="contact-hero-text">
          <span className="label" style={{ display: 'block', marginBottom: '1.25rem' }}>Kontakt &amp; Anfahrt</span>
          <h1 className="contact-hero-title">
            Besuchen Sie<br />
            <em>uns in Bonn</em>
          </h1>
        </div>

        {/* Main grid */}
        <div className="contact-grid">
          {/* Info column */}
          <div className="contact-info-block">
            <div className="contact-info-item">
              <h4>Adresse</h4>
              <p>
                Heerstraße 64<br />
                53111 Bonn<br />
                Nordrhein-Westfalen, Deutschland
              </p>
            </div>

            <div className="contact-info-item">
              <h4>Telefon</h4>
              <p>
                <a href="tel:+4922869556">+49 228 695569</a><br />
                <small style={{ fontSize: '0.82rem', color: 'var(--cream-dim)', display: 'block', marginTop: '0.3rem' }}>
                  Reservierungen &amp; Anfragen
                </small>
              </p>
              <p style={{ marginTop: '0.75rem' }}>
                <a href="tel:+4915144200400">+49 1514 4200400</a><br />
                <small style={{ fontSize: '0.82rem', color: 'var(--cream-dim)', display: 'block', marginTop: '0.3rem' }}>
                  Catering-Anfragen
                </small>
              </p>
            </div>

            <div className="contact-info-item">
              <h4>Öffnungszeiten</h4>
              <div className="contact-hours-grid">
                {HOURS.map((h, i) => (
                  <div className="contact-hours-row" key={i}>
                    <span className="day" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {i === todayIdx && (
                        <span style={{
                          display: 'inline-block', width: 7, height: 7, borderRadius: '50%',
                          background: '#4ade80', animation: 'blink 2s ease-in-out infinite', flexShrink: 0
                        }} title="Heute" />
                      )}
                      {h.day}
                    </span>
                    <span className={`time${h.closed ? ' closed' : ''}`}
                      style={{ color: h.closed ? 'rgba(242,235,224,0.3)' : i === todayIdx ? 'var(--gold)' : 'var(--cream)' }}
                    >
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="contact-info-item">
              <h4>Reservierung</h4>
              <p style={{ marginBottom: '1.5rem' }}>
                Für Reservierungen rufen Sie uns an oder buchen Sie direkt online.
                Bei Gruppen ab 8 Personen bitten wir um telefonische Vorankündigung.
              </p>
              <a
                href="https://royalblue-jaguar-568705.hostingersite.com/reservation/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold"
              >
                Online reservieren
              </a>
            </div>
          </div>

          {/* Map column */}
          <div className="contact-map-block">
            <iframe
              className="map-embed"
              title="Mogul Bonn Standort"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2527.5!2d7.0982!3d50.7374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bee74b39c9b4c5%3A0x7da6c9c8c88e013a!2sHeerstra%C3%9Fe%2064%2C%2053111%20Bonn!5e0!3m2!1sde!2sde!4v1680000000000!5m2!1sde!2sde"
              style={{ border: 0 }}
            />
            <div style={{
              padding: '1.5rem',
              background: 'var(--ink-2)',
              border: '1px solid var(--gold-border)',
              borderTop: 'none'
            }}>
              <p style={{ fontSize: '0.88rem', color: 'var(--cream-dim)', lineHeight: 1.6 }}>
                <strong style={{ color: 'var(--gold)', display: 'block', marginBottom: '0.4rem' }}>Mit dem ÖPNV</strong>
                Linie 61 / 62 — Haltestelle Heerstraße
              </p>
            </div>

            {/* Social links */}
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href="https://www.instagram.com/mogul.bonn/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ fontSize: '0.65rem' }}
              >
                Instagram →
              </a>
              <a
                href="https://www.facebook.com/mogulbonn"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ fontSize: '0.65rem' }}
              >
                Facebook →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom marquee */}
      <div style={{
        background: 'var(--gold)',
        color: 'var(--ink)',
        padding: '1rem',
        textAlign: 'center',
        fontFamily: 'var(--font-display)',
        fontSize: '0.7rem',
        letterSpacing: '0.3em',
        textTransform: 'uppercase'
      }}>
        Heerstraße 64 · 53111 Bonn · Tel. 0228 695569 · Di Ruhetag
      </div>
    </div>
  );
}
