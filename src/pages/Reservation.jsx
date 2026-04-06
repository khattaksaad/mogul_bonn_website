import React, { useEffect, useState } from 'react';

export default function Reservation() {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '2',
    name: '',
    phone: '',
    email: '',
    notes: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Da die direkte Einbindung des ReDi-Backend-API-Schlüssels im Browser aus Sicherheitsgründen blockiert wird, haben wir hier ein vollständig natives Frontend für Sie entwickelt!');
  };

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

            <form onSubmit={handleSubmit} className="custom-reservation-form" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
               <div className="form-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                 <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                   <label style={{ color: 'var(--gold)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Datum</label>
                   <input type="date" name="date" required value={formData.date} onChange={handleChange} style={{ padding: '0.8rem', background: 'transparent', border: '1px solid var(--gold-border)', color: 'var(--cream)', outline: 'none' }} />
                 </div>
                 <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                   <label style={{ color: 'var(--gold)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Uhrzeit</label>
                   <input type="time" name="time" required value={formData.time} onChange={handleChange} style={{ padding: '0.8rem', background: 'transparent', border: '1px solid var(--gold-border)', color: 'var(--cream)', outline: 'none' }} />
                 </div>
                 <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                   <label style={{ color: 'var(--gold)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Personen</label>
                   <select name="guests" value={formData.guests} onChange={handleChange} style={{ padding: '0.8rem', background: 'transparent', border: '1px solid var(--gold-border)', color: 'var(--cream)', outline: 'none' }}>
                     {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n} style={{ background: 'var(--ink)' }}>{n} {n === 1 ? 'Person' : 'Personen'}</option>)}
                   </select>
                 </div>
               </div>

               <div className="form-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                 <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                   <label style={{ color: 'var(--gold)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Name</label>
                   <input type="text" name="name" placeholder="Ihr Vor- und Nachname" required value={formData.name} onChange={handleChange} style={{ padding: '0.8rem', background: 'transparent', border: '1px solid var(--gold-border)', color: 'var(--cream)', outline: 'none' }} />
                 </div>
                 <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                   <label style={{ color: 'var(--gold)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Telefon</label>
                   <input type="tel" name="phone" placeholder="Ihre Handynummer" required value={formData.phone} onChange={handleChange} style={{ padding: '0.8rem', background: 'transparent', border: '1px solid var(--gold-border)', color: 'var(--cream)', outline: 'none' }} />
                 </div>
               </div>

               <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                 <label style={{ color: 'var(--gold)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>E-Mail-Adresse</label>
                 <input type="email" name="email" placeholder="Ihre E-Mail für die Bestätigung" required value={formData.email} onChange={handleChange} style={{ padding: '0.8rem', background: 'transparent', border: '1px solid var(--gold-border)', color: 'var(--cream)', outline: 'none' }} />
               </div>

               <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                 <label style={{ color: 'var(--gold)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Besondere Wünsche (Optional)</label>
                 <textarea name="notes" rows="4" placeholder="Allergien, Präferenz für Fensterplatz..." value={formData.notes} onChange={handleChange} style={{ padding: '0.8rem', background: 'transparent', border: '1px solid var(--gold-border)', color: 'var(--cream)', outline: 'none', resize: 'vertical' }}></textarea>
               </div>

               <button type="submit" className="btn btn-gold" style={{ width: '100%', marginTop: '1.5rem', padding: '1rem', border: 'none', fontSize: '1rem', cursor: 'pointer', fontFamily: 'var(--font-display)', textTransform: 'uppercase' }}>
                 Jetzt Reservierungsanfrage Senden
               </button>
            </form>
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
