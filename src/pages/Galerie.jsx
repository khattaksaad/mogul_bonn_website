import React, { useEffect } from 'react';

const galleryItems = [
  { img: '/dish-1.png',       label: 'Lamb Biryani',     wide: false, tall: false },
  { img: '/dish-2.png',       label: 'Butter Chicken',   wide: true,  tall: false },
  { img: '/dish-3.png',       label: 'Delhi Biryani',    wide: false, tall: false },
  { img: '/catering-hero.png',label: 'Catering Event',   wide: false, tall: false },
  { img: '/hero-bg.png',      label: 'Restaurant',       wide: true,  tall: false },
  { img: '/dish-1.png',       label: 'Signature Dish',   wide: false, tall: false },
  { img: '/dish-2.png',       label: 'Palak Gosht',      wide: false, tall: false },
  { img: '/dish-3.png',       label: 'Murgh Tikka',      wide: false, tall: false },
  { img: '/catering-hero.png',label: 'Private Dining',   wide: true,  tall: false },
];

export default function Galerie() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="gallery-page">
      {/* Hero */}
      <section className="gallery-page-hero">
        <div className="gallery-page-hero-bg">
          <img src="/catering-hero.png" alt="Mogul Bonn Gallery" />
        </div>
        <div className="gallery-page-hero-content">
          <span className="label" style={{ display: 'block', marginBottom: '1rem', textAlign: 'center' }}>
            Visuelle Eindrücke
          </span>
          <h1 className="gallery-hero-title">Galerie</h1>
        </div>
      </section>

      {/* Intro */}
      <section style={{ padding: '5rem 0 3rem', background: 'var(--ink)' }}>
        <div className="container" style={{ maxWidth: '700px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 300, fontStyle: 'italic', color: 'var(--cream-dim)', lineHeight: 1.8 }}>
            Die Schönheit des Mogul-Erlebnisses — von sorgfältig zubereiteten Gerichten
            bis hin zur eleganten Atmosphäre unseres Restaurants.
          </p>
          <div style={{ width: '40px', height: '1px', background: 'var(--gold)', margin: '2rem auto 0' }} />
        </div>
      </section>

      {/* Main grid */}
      <section style={{ padding: '2rem 0 6rem', background: 'var(--ink)' }}>
        <div className="container">
          <div className="gallery-big-grid">
            {galleryItems.map((item, i) => (
              <div
                key={i}
                className={`gallery-big-item${item.wide ? ' wide' : ''}`}
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <img src={item.img} alt={item.label} loading="lazy" />
                <div className="gallery-item-label">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--ink-2)', padding: '5rem 0', textAlign: 'center' }}>
        <div className="container">
          <span className="label" style={{ display: 'block', marginBottom: '1.5rem' }}>Reservierungen</span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300, color: 'var(--cream)', marginBottom: '2.5rem' }}>
            Erleben Sie es <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>persönlich</em>
          </h2>
          <a
            href="https://royalblue-jaguar-568705.hostingersite.com/reservation/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold"
          >
            Tisch reservieren
          </a>
        </div>
      </section>
    </div>
  );
}
