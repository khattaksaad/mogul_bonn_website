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

const RUID = '8f4c63b5-308c-432e-990b-057b82f2697c';

function getTodayIndex() {
  const d = new Date().getDay();
  return d === 0 ? 6 : d - 1;
}

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('active'); obs.unobserve(e.target); }
      }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

const MARQUEE = [
  'Authentisch Indisch', 'Mogul Cuisine', 'Seit Über 30 Jahren',
  'Heerstraße 64, Bonn', 'Reservierungen: 0228 695569',
  'Biryani · Curry · Tikka', 'Fine Dining Erfahrung', 'Catering für Events',
];

export default function Home() {
  useReveal();
  const todayIdx = getTodayIndex();
  const trackRef = useRef(null);
  const heroRef  = useRef(null);
  const contentRef = useRef(null);
  const canvasRef = useRef(null);

  /* ── Mouse parallax on hero content ─────────────────────────── */
  useEffect(() => {
    const hero = heroRef.current;
    const content = contentRef.current;
    if (!hero || !content) return;

    let raf;
    let tx = 0, ty = 0, cx = 0, cy = 0;

    const onMouseMove = (e) => {
      const rect = hero.getBoundingClientRect();
      tx = ((e.clientX - rect.left) / rect.width  - 0.5) * 18;
      ty = ((e.clientY - rect.top)  / rect.height - 0.5) * 10;
    };

    const animate = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      content.style.transform = `translate(${cx}px, ${cy}px)`;
      raf = requestAnimationFrame(animate);
    };

    hero.addEventListener('mousemove', onMouseMove);
    raf = requestAnimationFrame(animate);
    return () => {
      hero.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* ── Floating particle canvas ────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const N = 55;
    const particles = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.15,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,164,88,${p.alpha})`;
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* ── Drag-to-scroll dishes ───────────────────────────────────── */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let isDown = false, startX = 0, scrollLeft = 0;
    const onDown  = e => { isDown = true; el.style.cursor = 'grabbing'; startX = (e.pageX || e.touches[0].pageX) - el.offsetLeft; scrollLeft = el.scrollLeft; };
    const onUp    = () => { isDown = false; el.style.cursor = 'grab'; };
    const onMove  = e => { if (!isDown) return; e.preventDefault(); const x = (e.pageX || e.touches[0].pageX) - el.offsetLeft; el.scrollLeft = scrollLeft - (x - startX) * 1.6; };
    el.addEventListener('mousedown', onDown); el.addEventListener('mouseup', onUp);
    el.addEventListener('mouseleave', onUp);  el.addEventListener('mousemove', onMove);
    return () => { el.removeEventListener('mousedown', onDown); el.removeEventListener('mouseup', onUp); el.removeEventListener('mouseleave', onUp); el.removeEventListener('mousemove', onMove); };
  }, []);

  return (
    <main>
      {/* ═══ HERO ════════════════════════════════════════════════ */}
      <section className="hero" ref={heroRef}>

        {/* Background image with Ken Burns */}
        <div className="hero-media">
          <img src="/assets/images/hero-bg.webp" alt="Mogul Bonn Restaurant Ambiance" />
        </div>

        {/* Multi-gradient vignette */}
        <div className="hero-vignette" />

        {/* Floating gold particles */}
        <canvas className="hero-particles" ref={canvasRef} aria-hidden="true" />

        {/* Animated content */}
        <div className="hero-content" ref={contentRef}>
          {/* Eyebrow with char-by-char fade */}
          <span className="hero-eyebrow">
            Heerstraße 64 · Bonn · Seit Über 30 Jahren
          </span>

          {/* Title — each word clips up independently */}
          <h1 className="hero-title">
            <span className="hero-word hero-word-1">Die</span>
            <span className="hero-word hero-word-2">Kunst</span>
            <br />
            <em className="hero-word hero-word-3">des</em>
            <em className="hero-word hero-word-4">Mogul</em>
          </h1>

          <span className="hero-sub">Authentic Indian &amp; Pakistani Cuisine</span>

          <div className="hero-actions">
            <Link to="/speisekarte" className="btn btn-gold">Speisekarte</Link>
            <button
              className="glf-button btn btn-gold"
              data-glf-cuid=""
              data-glf-ruid="8f4c63b5-308c-432e-990b-057b82f2697c"
              aria-label="Online bestellen"
            >
              Online Bestellen
            </button>
            <button
              className="glf-button btn btn-outline"
              data-glf-cuid=""
              data-glf-ruid="8f4c63b5-308c-432e-990b-057b82f2697c"
              data-glf-reservation="true"
              aria-label="Tisch reservieren"
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
              <div className="reveal" style={{ marginTop: '2.5rem', transitionDelay: '0.3s' }}>
                <Link to="/speisekarte" className="btn btn-gold">Speisekarte entdecken</Link>
              </div>
            </div>

            <div className="story-image-wrap reveal-right">
              <img
                src="/assets/images/mogul-interior.webp"
                alt="Mogul Bonn Restaurant Interior"
                className="story-image-main"
                loading="lazy"
              />
              <div className="story-badge">
                <span className="badge-num">30+</span>
                <span className="badge-sub">Jahre<br />Tradition</span>
              </div>
              <img
                src="/assets/images/samosay.webp"
                alt="Sabzi Samosa Signature"
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
              { img: '/assets/images/lamb-biryani.webp', name: 'Lamb Biryani', desc: 'Basmatireis mit zartem Lammfleisch, Cashewnüssen, Rosinen und Gewürzen.', price: '17,90 €', num: '01' },
              { img: '/assets/images/butter-chicken.webp', name: 'Butter Chicken', desc: 'Zartes Hühnerfleisch in Tomaten-Cashewnuss-Buttersoße — ein Klassiker.', price: '17,90 €', num: '02' },
              { img: '/assets/images/chicken-biryani.webp', name: 'Chicken Biryani', desc: 'Feiner Basmati-Reis mit zartem Hühnerfleisch und Mogul-Gewürzen.', price: '16,90 €', num: '03' },
              { img: '/assets/images/palak-ghosht.webp', name: 'Palak Ghosht', desc: 'Gebratenes Lammfleisch mit kräftigem Blattspinat und besonderen Gewürzen.', price: '18,50 €', num: '04' },
              { img: '/assets/images/channa-masala.webp', name: 'Channa Masala', desc: 'Würzige Kichererbsen mit Ingwer, Knoblauch und aromatischen Gewürzen.', price: '15,50 €', num: '05' },
              { img: '/assets/images/samosay.webp', name: 'Sabzi Samosa', desc: 'Knusprige Teigtaschen gefüllt mit gewürzten Kartoffeln und Gemüse.', price: '7,50 €', num: '06' },
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
              <button
                className="glf-button btn btn-gold"
                data-glf-cuid=""
                data-glf-ruid="8f4c63b5-308c-432e-990b-057b82f2697c"
                data-glf-reservation="true"
                aria-label="Tisch reservieren"
                style={{ marginTop: '2.5rem', display: 'inline-flex' }}
              >
                Tisch reservieren
              </button>
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
          <img src="/assets/images/catering-hero.webp" alt="" aria-hidden="true" />
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
              <img src="/assets/images/catering-hero.webp" alt="Mogul Catering Setup" loading="lazy" />
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
