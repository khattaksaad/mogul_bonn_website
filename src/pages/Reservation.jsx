import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Reservation() {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    // Reveal animations logic (re-using the same one from Home.jsx if not global)
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('active');
            obs.unobserve(e.target);
        }
      }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <main className="reservation-page">
      {/* ═══ HERO ════════════════════════════════════════════════ */}
      <section className="hero hero-slim">
        <div className="hero-media">
          <img src="/assets/images/mogul-interior.webp" alt="Mogul Bonn Ambiance" />
        </div>
        <div className="hero-vignette" />
        <div className="hero-content">
          <span className="hero-eyebrow reveal">Tischreservierung</span>
          <h1 className="hero-title reveal" style={{ transitionDelay: '0.2s' }}>
            <span className="hero-word hero-word-3">Ihren</span>
            <span className="hero-word hero-word-4">Besuch</span>
            <br />
            <em className="hero-word" style={{ animationDelay: '1.2s' }}>planen</em>
          </h1>
          <p className="hero-sub reveal" style={{ transitionDelay: '0.4s' }}>
            Sichern Sie sich Ihren Tisch für ein unvergleichliches Gourmeterlebnis.
          </p>
        </div>
      </section>

      {/* ═══ RESERVATION FORM SECTION ═══════════════════════════ */}
      <section className="section section-dark">
        <div className="container">
          <div className="reservation-container reveal">
            <div className="reservation-header">
              <span className="section-label">Online Reservieren</span>
              <h2 className="section-title">
                Tisch <em>buchen</em>
              </h2>
              <div className="divider" />
              <p className="reservation-intro">
                Nutzen Sie unser Online-Formular, um schnell und einfach Ihren Tisch zu reservieren. 
                Sollten Sie für mehr als 10 Personen reservieren wollen, kontaktieren Sie uns bitte telefonisch.
              </p>
            </div>

            <div className="iframe-wrapper" style={{ display: 'flex', justifyContent: 'center', padding: '3rem 0' }}>
              <button 
                className="glf-button btn btn-gold" 
                data-glf-cuid="" 
                data-glf-ruid="8f4c63b5-308c-432e-990b-057b82f2697c" 
                data-glf-reservation="true"
                aria-label="Tisch online reservieren"
              >
                Tisch online reservieren
              </button>
            </div>

            <div className="reservation-footer-info">
              <div className="info-block">
                <h4>Haben Sie Fragen?</h4>
                <p>Rufen Sie uns an: <a href="tel:+49228695569" className="gold-link">+49 228 695569</a></p>
              </div>
              <div className="info-block">
                <h4>Anschrift</h4>
                <p>Heerstraße 64, 53111 Bonn</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ INFO SECTION ══════════════════════════════════════ */}
      <section className="section section-dark2">
        <div className="container">
          <div className="info-grid">
            <div className="reveal-left">
              <h3 className="f-serif" style={{ fontSize: 'var(--fs-h3)', color: 'var(--gold)', marginBottom: '1rem' }}>
                Wichtige Informationen
              </h3>
              <ul className="info-list">
                <li>✦ Reservierungen sind bis zu 30 Tage im Voraus möglich.</li>
                <li>✦ Bitte informieren Sie uns bei Verspätungen ab 15 Minuten.</li>
                <li>✦ Für Gruppen über 10 Personen rufen Sie uns bitte direkt an.</li>
                <li>✦ Besondere Wünsche? Vermerken Sie diese einfach im Kommentarfeld.</li>
              </ul>
            </div>
            <div className="reveal-right">
                <img 
                    src="/assets/images/lamb-biryani.webp" 
                    alt="Mogul Cuisine" 
                    className="info-image" 
                    style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '4px' }}
                />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
