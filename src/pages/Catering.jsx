import React, { useEffect } from 'react';

const packages = [
  {
    icon: '♛',
    name: 'Private Events',
    desc: 'Geburtstage, Jubiläen, Familientreffen — wir bringen das volle Mogul-Erlebnis zu Ihrem privaten Anlass. Individuell geplant, professionell umgesetzt.'
  },
  {
    icon: '⚑',
    name: 'Firmenfeiern',
    desc: 'Unternehmensevents, Team-Dinner und Geschäftsessen mit der Qualität und dem Niveau, das Ihre Gäste verdienen. Flexible Menüoptionen inklusive.'
  },
  {
    icon: '♥',
    name: 'Hochzeiten',
    desc: 'Machen Sie Ihren besonderen Tag mit authentischer indisch-pakistanischer Küche unvergesslich. Buffet, Live-Station oder mehrgängiges Menü.'
  },
];

export default function CateringPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="catering-page">
      {/* Header */}
      <div className="container">
        <div className="catering-page-hero">
          <span className="label" style={{ display: 'block', marginBottom: '1.25rem' }}>Catering-Service</span>
          <h1 className="catering-page-title">
            Die Königlichen Aromen<br />
            <em>kommen zu Ihnen</em>
          </h1>
          <p style={{ color: 'var(--cream-dim)', fontWeight: 300, lineHeight: 1.9, marginTop: '2rem', maxWidth: '600px', fontSize: '1rem' }}>
            Mogul Bonn bringt über 30 Jahre kulinarische Exzellenz direkt zu Ihrem Event.
            Ob privat oder geschäftlich — unser Team sorgt für ein authentisches,
            unvergessliches Erlebnis.
          </p>
        </div>
      </div>

      {/* Full bleed image */}
      <img
        src="/catering-hero.png"
        alt="Mogul Bonn Catering Setup"
        className="catering-full-img"
        loading="lazy"
      />

      {/* Packages */}
      <section style={{ background: 'var(--ink)', padding: '6rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="label" style={{ display: 'block', marginBottom: '1rem' }}>Was wir anbieten</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300, color: 'var(--cream)' }}>
              Unsere <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Catering-Pakete</em>
            </h2>
          </div>

          <div className="catering-package-grid">
            {packages.map((pkg, i) => (
              <div className="catering-package" key={i}>
                <div className="catering-package-icon">{pkg.icon}</div>
                <h3>{pkg.name}</h3>
                <p>{pkg.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section style={{ background: 'var(--ink-2)', padding: '6rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8%', alignItems: 'center' }}>
            <div>
              <span className="label" style={{ display: 'block', marginBottom: '1.25rem' }}>Inklusive</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 300, color: 'var(--cream)', marginBottom: '2.5rem' }}>
                Alles aus <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>einer Hand</em>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  'Individuelle Menüplanung nach Ihren Wünschen',
                  'Berücksichtigung aller Ernährungsbedürfnisse (Vegetarisch, Vegan, Halal)',
                  'Premium Live-Grill-Station für Events im Freien',
                  'Professionelles Service-Personal',
                  'Auf- und Abbau inklusive',
                  'Beratungsgespräch kostenlos und unverbindlich',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <span style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '0.1rem' }}>✦</span>
                    <p style={{ fontSize: '0.95rem', color: 'var(--cream-dim)', lineHeight: 1.6, fontWeight: 300 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img
                src="/catering-hero.png"
                alt="Catering Details"
                style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', filter: 'brightness(0.75) saturate(0.8)' }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Strip */}
      <div className="catering-contact-strip">
        <div className="container">
          <span className="label" style={{ display: 'block', marginBottom: '1.5rem' }}>Angebot anfragen</span>
          <h2>Lassen Sie uns Ihr Event planen</h2>
          <p>Rufen Sie uns an oder schreiben Sie uns für ein unverbindliches Beratungsgespräch.</p>
          <a href="tel:+4915144200400" className="phone-link">+49 1514 4200400</a>
          <p style={{ fontSize: '0.85rem', color: 'var(--cream-dim)', marginBottom: '2.5rem' }}>
            Catering-Hotline (Mo–Sa, 10:00 – 18:00 Uhr)
          </p>
          <a
            href="mailto:info@mogulbonn.de"
            className="btn btn-gold"
            style={{ display: 'inline-flex' }}
          >
            E-Mail senden
          </a>
        </div>
      </div>
    </div>
  );
}
