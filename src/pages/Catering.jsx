import React, { useEffect, useRef, useState } from 'react';

const PACKAGES = [
  {
    num: '01',
    name: 'Private Events',
    tag: 'Geburtstag · Jubiläum · Familie',
    desc: 'Das volle Mogul-Erlebnis bei Ihnen zu Hause oder in Ihrer Location. Individuell geplant, professionell umgesetzt — von der ersten Vorspeise bis zum letzten Dessert.',
    img: '/assets/images/catering-private.png',
  },
  {
    num: '02',
    name: 'Firmenfeiern',
    tag: 'Team-Dinner · Business-Lunch · Events',
    desc: 'Unternehmensevents mit der Qualität und dem Niveau, das Ihre Gäste verdienen. Flexible Buffet- und Menüoptionen, angepasst an Ihre Gästezahl.',
    img: '/assets/images/catering-corporate.png',
  },
  {
    num: '03',
    name: 'Hochzeiten',
    tag: 'Buffet · Live-Station · Mehrgänger',
    desc: 'Machen Sie Ihren besonderen Tag mit authentischer indisch-pakistanischer Küche unvergesslich — ob Buffet, Live-Grill-Station oder mehrgängiges Menü.',
    img: '/assets/images/catering-wedding.png',
  },
];

const INCLUDES = [
  'Individuelle Menüplanung nach Ihren Wünschen',
  'Vegetarisch, Vegan & Halal auf Anfrage',
  'Premium Live-Grill-Station für Events im Freien',
  'Professionelles Service-Personal',
  'Auf- und Abbau inklusive',
  'Kostenloses Erstberatungsgespräch',
];

const STATS = [
  { value: 30, suffix: '+', label: 'Jahre Erfahrung' },
  { value: 500, suffix: '+', label: 'Events catered' },
  { value: 3, suffix: '', label: 'Event-Pakete' },
];

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatItem({ value, suffix, label }) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  const count = useCountUp(value, 1600, active);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setActive(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="ct-stat" ref={ref}>
      <span className="ct-stat-num">{count}{suffix}</span>
      <span className="ct-stat-label">{label}</span>
    </div>
  );
}

export default function CateringPage() {
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    // reveal on scroll
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('active'); obs.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="ct-page">

      {/* ══════════════════════════════════════════════════════
          HERO — Full-bleed cinematic
      ══════════════════════════════════════════════════════ */}
      <section className="ct-hero">
        <div className="ct-hero-media">
          <img src="/assets/images/catering-hero.webp" alt="Mogul Bonn Catering" />
        </div>
        <div className="ct-hero-overlay" />

        <div className="ct-hero-content">
          <span className="ct-eyebrow">Catering-Service</span>
          <h1 className="ct-hero-title">
            <span className="ct-hw ct-hw-1">Die Königlichen</span>
            <br />
            <em className="ct-hw ct-hw-2">Aromen kommen</em>
            <br />
            <span className="ct-hw ct-hw-3">zu Ihnen</span>
          </h1>
          <p className="ct-hero-sub">
            Über 30 Jahre kulinarische Exzellenz — direkt zu Ihrem Event.
          </p>
        </div>

        {/* Stats bar */}
        <div className="ct-stats-bar">
          {STATS.map((s, i) => <StatItem key={i} {...s} />)}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PACKAGES — Alternating editorial cards
      ══════════════════════════════════════════════════════ */}
      <section className="ct-packages">
        {PACKAGES.map((pkg, i) => (
          <article
            key={i}
            className={`ct-pkg ${i % 2 === 1 ? 'ct-pkg--reverse' : ''} reveal`}
            onMouseEnter={() => setActiveCard(i)}
            onMouseLeave={() => setActiveCard(null)}
          >
            {/* Image side */}
            <div className="ct-pkg-img-wrap">
              <img src={pkg.img} alt={pkg.name} className="ct-pkg-img" />
              <div className="ct-pkg-img-overlay" />
              <span className="ct-pkg-num">{pkg.num}</span>
            </div>

            {/* Text side */}
            <div className="ct-pkg-body">
              <span className="ct-eyebrow">{pkg.tag}</span>
              <h2 className="ct-pkg-name">{pkg.name}</h2>
              <div className="ct-pkg-divider" />
              <p className="ct-pkg-desc">{pkg.desc}</p>
              <a href="tel:+4915144200400" className="ct-pkg-cta">
                Anfragen
                <span className="ct-pkg-cta-arrow">→</span>
              </a>
            </div>
          </article>
        ))}
      </section>

      {/* ══════════════════════════════════════════════════════
          INCLUDES — Split layout with animated list
      ══════════════════════════════════════════════════════ */}
      <section className="ct-includes">
        <div className="container">
          <div className="ct-includes-grid">
            {/* Left: image with decorative frame */}
            <div className="ct-includes-img-wrap reveal-left">
              <img src="/assets/images/catering-hero.webp" alt="Catering Inklusive" className="ct-includes-img" />
              <div className="ct-includes-frame" />
              <div className="ct-includes-badge">
                <span>Mogul</span>
                <small>Catering</small>
              </div>
            </div>

            {/* Right: checklist */}
            <div className="ct-includes-content reveal-right">
              <span className="ct-eyebrow">Inklusive</span>
              <h2 className="ct-includes-title">
                Alles aus<br /><em>einer Hand</em>
              </h2>
              <ul className="ct-checklist">
                {INCLUDES.map((item, i) => (
                  <li key={i} className="ct-check-item" style={{ '--i': i }}>
                    <span className="ct-check-mark">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA FINALE — Bold full-bleed dark strip
      ══════════════════════════════════════════════════════ */}
      <section className="ct-finale">
        <div className="ct-finale-bg">
          <img src="/assets/images/catering-hero.webp" alt="" aria-hidden="true" />
        </div>
        <div className="ct-finale-overlay" />
        <div className="ct-finale-content reveal">
          <span className="ct-eyebrow">Angebot anfragen</span>
          <h2 className="ct-finale-title">
            Lassen Sie uns<br /><em>Ihr Event planen</em>
          </h2>
          <p className="ct-finale-sub">
            Rufen Sie uns an oder schreiben Sie uns für ein unverbindliches Beratungsgespräch.
          </p>
          <div className="ct-finale-actions">
            <a href="tel:+4915144200400" className="btn btn-gold">
              +49 1514 4200400
            </a>
            <a href="mailto:info@mogulbonn.de" className="btn btn-outline">
              E-Mail senden
            </a>
          </div>
          <p className="ct-finale-note">Catering-Hotline · Mo–Sa, 10:00–18:00 Uhr</p>
        </div>
      </section>

    </div>
  );
}
