import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Reviews from '../components/Reviews';

/* Real opening hours data */
const HOURS = [
  { day: 'Montag',       time: '16:00 – 23:00' },
  { day: 'Dienstag',     time: 'Ruhetag', closed: true },
  { day: 'Mittwoch',     time: '16:00 – 23:00' },
  { day: 'Donnerstag',   time: '16:00 – 23:00' },
  { day: 'Freitag',      time: '12:00 – 23:00' },
  { day: 'Samstag',      time: '12:00 – 23:00' },
  { day: 'Sonntag',      time: '12:00 – 23:00' },
];

function getTodayIndex() {
  const d = new Date().getDay(); // 0=Sun … 6=Sat
  return d === 0 ? 6 : d - 1;   // shift to Mon=0 … Sun=6
}

function useReveal() {
  useEffect(() => {
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
}

/* Marquee Text content */
const MARQUEE = [
  'Authentisch Indisch', 'Mogul Cuisine', 'Seit Über 30 Jahren',
  'Heerstraße 64, Bonn', 'Reservierungen: 0228 695569',
  'Biryani · Curry · Tikka', 'Fine Dining Erfahrung', 'Catering für Events',
];

export default function Home() {
  useReveal();
  const todayIdx = getTodayIndex();
  const trackRef = useRef(null);

  // Drag-to-scroll dishes
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let isDown = false, startX = 0, scrollLeft = 0;
    const onDown  = e => { isDown = true; el.style.cursor = 'grabbing'; startX = (e.pageX || e.touches[0].pageX) - el.offsetLeft; scrollLeft = el.scrollLeft; };
    const onUp    = () => { isDown = false; el.style.cursor = 'grab'; };
    const onMove  = e => { if (!isDown) return; e.preventDefault(); const x = (e.pageX || e.touches[0].pageX) - el.offsetLeft; el.scrollLeft = scrollLeft - (x - startX) * 1.6; };
    el.addEventListener('mousedown', onDown);
    el.addEventListener('mouseup', onUp);
    el.addEventListener('mouseleave', onUp);
    el.addEventListener('mousemove', onMove);
    return () => { el.removeEventListener('mousedown', onDown); el.removeEventListener('mouseup', onUp); el.removeEventListener('mouseleave', onUp); el.removeEventListener('mousemove', onMove); };
  }, []);

  return (
    <main>
      {/* ═══ HERO ════════════════════════════════════════════════ */}
      <section className="hero">
        <div className="hero-media">
          <img src="/hero-bg.png" alt="Mogul Bonn Restaurant Ambiance" />
        </div>
        <div className="hero-vignette" />

        <div className="hero-content">
          <span className="hero-eyebrow">Heerstraße 64 · Bonn · Seit Über 30 Jahren</span>
          <h1 className="hero-title">
            Die Kunst<br />
            <em>des Mogul</em>
          </h1>
          <span className="hero-sub">Authentic Indian &amp; Pakistani Cuisine</span>
          <div className="hero-actions">
            <Link to="/speisekarte" className="btn btn-gold">Speisekarte</Link>
            {/* GloriaFood: triggers online ordering popup */}
            <button
              className="glf-button btn btn-gold"
              data-glf-cuid="8f4c63b5-308c-432e-990b-057b82f2697c"
              data-glf-ruid="8f4c63b5-308c-432e-990b-057b82f2697c"
            >
              Online Bestellen
            </button>
            {/* GloriaFood: triggers table reservation popup */}
            <button
              className="glf-button btn btn-outline"
              data-glf-cuid="8f4c63b5-308c-432e-990b-057b82f2697c"
              data-glf-ruid="8f4c63b5-308c-432e-990b-057b82f2697c"
              data-glf-reservation="true"
            >
              Reservierung
            </button>
          </div>
        </div>

        <div className="hero-scroll-hint">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ═══ MARQUEE TICKER ══════════════════════════════════════ */}
      <div className="marquee-strip">
        <div className="marquee-track" aria-hidden="true">
          {[...MARQUEE, ...MARQUEE].map((text, i) => (
            <span key={i} className="marquee-item">
              {text}
              <span className="marquee-dot"> ✦ </span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══ STORY / HERITAGE ════════════════════════════════════ */}
      <section className="story-section">
        <div className="container">
          <div className="story-grid">
            <div>
              <span className="story-number" aria-hidden="true">30+</span>
              <div className="section-header reveal">
                <span className="section-label">Unsere Geschichte</span>
                <h2 className="section-title">
                  Kulinarische Kunst<br /><em>über Generationen</em>
                </h2>
                <div className="divider" />
              </div>
              <p className="story-text reveal" style={{ transitionDelay: '0.1s' }}>
                Das <strong>Mogul Bonn</strong> steht seit mehr als drei Jahrzehnten für authentische
                indisch-pakistanische Küche in Bonn. Unsere Köche bringen jahrzehnte lange Erfahrung mit,
                verbinden traditionelle Gewürze mit zeitgenössischer Raffinesse und schaffen so ein
                unvergessliches Erlebnis an der historischen Heerstraße.
              </p>
              <p className="story-text reveal" style={{ marginTop: '1.25rem', transitionDelay: '0.2s' }}>
                Jedes Gericht erzählt eine Geschichte — die Geschichte der Mogulküche, eine der
                reichhaltigsten und vielseitigsten kulinarischen Traditionen der Welt.
              </p>
              <div style={{ marginTop: '2.5rem' }} className="reveal" style={{ transitionDelay: '0.3s' }}>
                <Link to="/speisekarte" className="btn btn-gold">Speisekarte entdecken</Link>
              </div>
            </div>

            <div className="story-image-wrap reveal-right">
              <img
                src="/hero-bg.png"
                alt="Mogul Bonn Atmosphäre"
                className="story-image-main"
                loading="lazy"
              />
              <div className="story-badge">
                <span className="badge-num">30+</span>
                <span className="badge-sub">Jahre<br />Tradition</span>
              </div>
              <img
                src="/dish-1.png"
                alt="Signature Dish"
                className="story-image-accent"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FEATURED DISHES ════════════════════════════════════ */}
      <section className="dishes-section">
        <div className="container">
          <div className="dishes-header">
            <div className="reveal-left">
              <span className="section-label">Signature Gerichte</span>
              <h2 className="section-title" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
                Unsere <em>Highlights</em>
              </h2>
            </div>
            <Link to="/speisekarte" className="btn btn-outline reveal-right">
              Alle Gerichte
            </Link>
          </div>
        </div>

        <div className="container" style={{ paddingRight: 0, maxWidth: '100%' }}>
          <div className="dishes-scroll-track" ref={trackRef}>
            {[
              { img: '/dish-1.png', name: 'Lamb Biryani', desc: 'Basmatireis mit zartem Lammfleisch, Cashewnüssen, Rosinen und Gewürzen.', price: '17,90 €', num: '01' },
              { img: '/dish-2.png', name: 'Butter Chicken', desc: 'Zartes Hühnerfleisch in Tomaten-Cashewnuss-Buttersoße — ein Klassiker.', price: '17,90 €', num: '02' },
              { img: '/dish-3.png', name: 'Delhi Biryani', desc: 'Prachtvoller Mix aus Hühnerfleisch, Lammfleisch, Garnelen und Nüssen.', price: '19,90 €', num: '03' },
              { img: '/dish-1.png', name: 'Palak Ghosht', desc: 'Gebratenes Lammfleisch mit kräftigem Blattspinat und besonderen Gewürzen.', price: '18,50 €', num: '04' },
              { img: '/dish-2.png', name: 'Karahi Murgh', desc: 'Gebratene Hühnerfleischstücke mit Paprika, Zwiebeln, Tomaten, Knoblauch.', price: '16,50 €', num: '05' },
              { img: '/catering-hero.png', name: 'Shahi Jhinga Masala', desc: 'Gebratene Garnelen mit Tomaten, frischen Zwiebeln und grüner Paprika.', price: '19,90 €', num: '06' },
            ].map((dish, i) => (
              <article className="dish-card" key={i}>
                <div className="dish-card-img">
                  <span className="dish-number">{dish.num}</span>
                  <img src={dish.img} alt={dish.name} loading="lazy" />
                </div>
                <div className="dish-card-info">
                  <h3 className="dish-card-name">{dish.name}</h3>
                  <p className="dish-card-desc">{dish.desc}</p>
                  <span className="dish-card-price">{dish.price}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ OPENING HOURS ══════════════════════════════════════ */}
      <section className="hours-section">
        <div className="container">
          <div className="hours-inner">
            <div className="reveal-left">
              <span className="section-label">Besuchen Sie Uns</span>
              <h2 className="hours-big-text">
                Wir freuen<br />
                uns auf <em>Sie</em>
              </h2>
              <div className="divider" style={{ marginTop: '2rem', marginBottom: '2rem' }} />
              <p style={{ color: 'var(--cream-dim)', fontWeight: 300, lineHeight: 1.8, fontSize: '0.95rem' }}>
                Heerstraße 64, 53111 Bonn<br />
                <a href="tel:+4922869556" style={{ color: 'var(--gold)', marginTop: '0.5rem', display: 'block' }}>
                  +49 228 695569
                </a>
              </p>
              <a
                href="https://royalblue-jaguar-568705.hostingersite.com/reservation/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold"
                style={{ marginTop: '2.5rem', display: 'inline-flex' }}
              >
                Tisch reservieren
              </a>
            </div>

            <div className="reveal-right">
              <div className="hours-table" role="table" aria-label="Öffnungszeiten">
                {HOURS.map((row, i) => {
                  const isToday = i === todayIdx;
                  return (
                    <div className="hours-row" key={i} role="row">
                      <span className="hours-day" role="cell">
                        {isToday && <span className="green-dot" title="Heute" />}
                        {row.day}
                      </span>
                      <span className={`hours-time${row.closed ? ' closed' : isToday ? ' open-today' : ''}`} role="cell">
                        {row.time}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ QUOTE / FULL BLEED CTA ════════════════════════════ */}
      <section className="fullbleed-cta">
        <div className="fullbleed-cta-bg">
          <img src="/catering-hero.png" alt="" aria-hidden="true" />
        </div>
        <div className="fullbleed-cta-overlay" />
        <div className="fullbleed-cta-content reveal">
          <p className="fullbleed-quote">
            "Where every dish is a journey through the history of the Mogul Empire."
          </p>
          <Link to="/speisekarte" className="btn btn-gold">Speisekarte ansehen</Link>
        </div>
      </section>

      {/* ═══ REVIEWS ════════════════════════════════════════════ */}
      <Reviews />

      {/* ═══ CATERING TEASER ════════════════════════════════════ */}
      <section className="catering-section">
        <div className="container">
          <div className="catering-grid">
            <div className="catering-img-block reveal-left">
              <img src="/catering-hero.png" alt="Mogul Catering Setup" loading="lazy" />
              <div className="catering-img-badge">
                Events · Hochzeiten · Firmenfeiern
              </div>
            </div>

            <div className="reveal-right">
              <span className="section-label">Catering Service</span>
              <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>
                Das Mogul Fest<br /><em>kommt zu Ihnen</em>
              </h2>
              <p style={{ color: 'var(--cream-dim)', fontWeight: 300, lineHeight: 1.9, marginBottom: '2.5rem', fontSize: '1rem' }}>
                Erleben Sie die königlichen Aromen von Mogul Bonn bei Ihrem privaten Anlass.
                Vom Firmenevent bis zur Hochzeit — unser Team sorgt für authentischen Genuss
                und professionellen Service direkt bei Ihnen vor Ort.
              </p>

              <div className="catering-features">
                {[
                  { icon: '♛', title: 'Individuelle Menüs', desc: 'Angepasst an alle Ernährungsbedürfnisse und Vorlieben.' },
                  { icon: '♨', title: 'Live-Grill-Setup', desc: 'Premium Live-Grill-Stationen für Events im Freien.' },
                  { icon: '✦', title: 'Professioneller Service', desc: 'Unser erfahrenes Team sorgt für einen reibungslosen Ablauf.' },
                ].map((f, i) => (
                  <div className="catering-feature" key={i}>
                    <div className="catering-feature-icon">{f.icon}</div>
                    <div className="catering-feature-text">
                      <h4>{f.title}</h4>
                      <p>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/catering" className="btn btn-gold" style={{ marginTop: '1rem' }}>
                Mehr über Catering
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
