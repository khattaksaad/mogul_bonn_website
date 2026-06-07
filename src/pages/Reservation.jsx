import React, { useEffect } from 'react';

export default function Reservation() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const RUID = '8f4c63b5-308c-432e-990b-057b82f2697c';

  return (
    <div className="reservation-page" style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--ink)' }}>
      {/* ── HERO SECTION ───────────────────────────────────── */}
      <section className="menu-hero" style={{ position: 'relative', height: '45vh', overflow: 'hidden' }}>
        <div className="menu-hero-bg" style={{ position: 'absolute', inset: 0 }}>
          <img src="/assets/images/hero-bg.webp" alt="Mogul Bonn Reservation" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.4)' }} />
        </div>
        <div className="menu-hero-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, var(--ink))' }} />
        <div className="menu-hero-content reveal active" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <span className="label" style={{ display: 'block', marginBottom: '1rem', color: 'var(--gold)', letterSpacing: '0.25em' }}>
            Erleben Sie den Genuss
          </span>
          <h1 className="hero-title f-serif" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', color: 'var(--cream)', fontWeight: 300 }}>
            Tisch <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>reservieren</em>
          </h1>
        </div>
      </section>

      {/* ── RESERVATION FORM ───────────────────────────────── */}
      <section className="reservation-section" style={{ background: 'var(--ink)', paddingBottom: '6rem' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="reservation-card reveal active" style={{ 
            background: 'var(--ink-2)', 
            padding: '4rem 3rem', 
            borderRadius: '4px',
            border: '1px solid var(--gold-border)',
            marginTop: '-4rem',
            position: 'relative',
            zIndex: 10
          }}>
            <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 className="section-title f-serif" style={{ fontSize: '2.5rem', fontWeight: 300, color: 'var(--cream)' }}>Ihre <em style={{ color: 'var(--gold)' }}>Buchung</em></h2>
              <p style={{ color: 'var(--cream-dim)', marginTop: '1rem', fontSize: '1rem', lineHeight: 1.6 }}>
                Füllen Sie die Details unten aus. Für Gruppen ab 8 Personen bitten wir um telefonische Vorankündigung.
              </p>
            </div>

            <div style={{ width: '100%', height: '700px', marginTop: '2rem' }}>
              <iframe 
                src="https://tally.so/embed/aQzjaq?alignLeft=1&hideTitle=1&transparentBackground=1" 
                width="100%" 
                height="100%" 
                style={{ border: 'none' }}
                title="Mogul Bonn Reservation Form"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT INFO BELOW FORM ────────────────────────── */}
      <section style={{ padding: '4rem 0 6rem', textAlign: 'center', background: 'var(--ink)' }}>
        <div className="container">
          <h3 className="f-serif" style={{ fontSize: '2rem', color: 'var(--cream)', fontWeight: 300, marginBottom: '1rem' }}>
            Fragen zu Ihrer Reservierung?
          </h3>
          <p style={{ color: 'var(--cream-dim)' }}>
            Wir sind zu unseren Öffnungszeiten auch telefonisch für Sie erreichbar.
          </p>
          <a href="tel:+4922869556" className="btn btn-outline" style={{ marginTop: '2rem', display: 'inline-flex', padding: '0.75rem 2rem' }}>
            +49 228 695569
          </a>
        </div>
      </section>
    </div>
  );
}
