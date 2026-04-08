import React, { useState, useEffect, useRef } from 'react';

const LeafIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: 'middle', marginTop: '-2px' }}>
    <path d="M12 2L15 5C17.5 7.5 17.5 11.5 15 14L12 17L9 14C6.5 11.5 6.5 7.5 9 5L12 2Z" fill="#22c55e" />
    <path d="M12 17V10" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const ChiliIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: 'middle', marginTop: '-2px' }}>
    <path d="M14.5 2.5l-1.5 3" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M18 6c-2-2-5-2.5-7.5-1-4 2.5-6.5 8.5-6.5 13 0 3 2.5 5 5.5 5 4.5 0 9-5 9-11 0-3-1.5-5-2.5-6z" fill="#ef4444" />
    <path d="M16 11c-1.5-1-3-1-4.5 0" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);


/* ── Full Menu Data ───────────────────────────────────────────── */
const menuData = {
  "Vorspeisen": {
    emoji: "🥟",
    items: [
      { name: "Sabzi Samosa",   price: "7,50 €", desc: "Zwei knusprige Teigtaschen mit gewürzten Kartoffeln und gemischtem Gemüse", veg: true },
      { name: "Chicken Samosa", price: "7,50 €", desc: "Zwei knusprige Teigtaschen mit leicht gewürztem Hühnerfleisch" },
      { name: "Piazi Pakora",   price: "7,00 €", desc: "In Kichererbsenmehl panierte gewürzte frische Zwiebeln", veg: true },
      { name: "Aloo Pakora",    price: "7,00 €", desc: "In Kichererbsenmehl panierte gewürzte Kartoffeln", veg: true },
      { name: "Palak Pakora",   price: "7,00 €", desc: "In Kichererbsenmehl panierter Spinat mit frischen Zwiebeln", veg: true },
      { name: "Gobi Pakora",    price: "7,00 €", desc: "In Kichererbsenmehl panierter gewürzter Blumenkohl", veg: true },
      { name: "Paneer Pakora",  price: "7,00 €", desc: "Kichererbsenmehl-panierter gewürzter Weichkäse mit frischen Zwiebeln", veg: true },
      { name: "Sabzi Pakora",   price: "7,00 €", desc: "Mix aus Zwiebeln, Kartoffeln, Blumenkohl und Auberginen", veg: true },
      { name: "Murgh Pakora",   price: "7,00 €", desc: "In Kichererbsenmehl paniertes gewürztes Hühnerfleisch" },
      { name: "Jheenga Pakora", price: "9,00 €", desc: "In Kichererbsenmehl panierte gebratene Riesengarnelen" },
      { name: "Fisch Pakora",   price: "8,50 €", desc: "In Kichererbsenmehl panierte gewürzte Kabeljaufiletstücke" },
      { name: "Bhindi Pakora",  price: "8,00 €", desc: "In Kichererbsenmehl panierte gewürzte Okraschotenstücke", veg: true },
      { name: "Papadum",        price: "4,00 €", desc: "Dünnes Brot aus Linsenmehl mit Kreuzkümmel (2 Stück)", veg: true },
    ]
  },
  "Suppen & Paratha": {
    emoji: "🍵",
    items: [
      { name: "Sabzi ka Shorba",   price: "7,00 €", desc: "Schmackhafte Gemüsesuppe mit feinsten Kräutern nach speziellem Rezept", veg: true },
      { name: "Dal ka Shorba",     price: "7,00 €", desc: "Delikate Linsensuppe mit erlesenen Kräutern und milden Gewürzen", veg: true },
      { name: "Murgh ka Shorba",   price: "7,50 €", desc: "Würzige Hühnersuppe nach einem überlieferten Mogul-Rezept" },
      { name: "Paneer Paratha",    price: "7,50 €", desc: "Knusprig gebratenes Fladenbrot, gefüllt mit hausgemachtem Weichkäse", veg: true },
      { name: "Chicken Paratha",   price: "7,50 €", desc: "Knusprig gebratenes Fladenbrot, gefüllt mit leicht gewürztem Hühnerfleisch" },
      { name: "Kartoffel Paratha", price: "7,50 €", desc: "Knusprig gebratenes Fladenbrot, gefüllt mit gewürzten Kartoffeln", veg: true },
    ]
  },
  "Vegetarisch": {
    emoji: "🌿",
    items: [
      { name: "Tutti Frutti",   price: "15,50 €", desc: "Curry mit frischen Bananen, Ananas, Papaya und würziger Curry-Sahnesoße", veg: true },
      { name: "Bananen Curry",  price: "15,50 €", desc: "Frische Bananenscheiben in würziger Curry-Joghurtsoße mit Tomaten, Zwiebeln und Ingwer", veg: true },
      { name: "Chana Masala",   price: "15,50 €", desc: "Kichererbsen, Tomaten, Zwiebeln, Knoblauch und Ingwer in Currysoße", veg: true },
      { name: "Navratan Korma", price: "15,50 €", desc: "Sommergemüse mit Mandeln, Kokosraspeln, Cashewnüssen, Rosinen und Ananas", veg: true },
      { name: "Paneer Kofta",   price: "15,50 €", desc: "Käsebällchen, Kartoffeln, Mandeln, Cashewnüsse in delikater Sahnesoße", veg: true },
      { name: "Bhindi Masala",  price: "16,50 €", desc: "Frische Okraschoten mit Zwiebeln, Tomatensoße, Ingwer, Knoblauch und Joghurt", veg: true },
      { name: "Bhindi Chana",   price: "16,50 €", desc: "Okraschoten mit Kichererbsen, Zwiebeln, Tomaten und Gewürzen", veg: true },
      { name: "Palak Paneer",   price: "15,50 €", desc: "Hausgemachter Weichkäse mit Blattspinat, Zwiebeln, Tomaten und Joghurt", veg: true },
      { name: "Daal Tarka",     price: "15,50 €", desc: "Delikate Linsen mit Knoblauch, Ingwer, frischen Zwiebeln und Tomaten", veg: true },
      { name: "Mattar Paneer",  price: "15,50 €", desc: "Frischkäse mit grünen Erbsen, Zwiebeln und Tomaten", veg: true },
      { name: "Vindaloo Gobhi", price: "15,50 €", desc: "Scharfer Blumenkohl mit Ingwer, Knoblauch, frischen Zwiebeln und Kräutern", veg: true, spicy: true },
    ]
  },
  "Chicken": {
    emoji: "🍗",
    items: [
      { name: "Chicken Curry",       price: "16,50 €", desc: "Zartes Hühnerfleisch in würziger Curry-Sahnesoße nach traditionellem Mogul-Rezept" },
      { name: "Murgh Tikka",         price: "16,50 €", desc: "Gegrillte Hühnerfleischstreifen mariniert mit pikanten Gewürzen" },
      { name: "Karahi Murgh",        price: "16,50 €", desc: "Gebratene Hühnerfleischstücke mit Paprika, Zwiebeln, Tomaten, Knoblauch und Ingwer" },
      { name: "Murgh Korma",         price: "16,50 €", desc: "Saftiges Hühnerfleisch in milder Currysoße mit Mandeln, Kokosnuss und Cashewnüssen" },
      { name: "Vindaloo Murgh",      price: "16,50 €", desc: "Deftiges Hühnerfleisch mit Kartoffeln, pikanter Soße und Zwiebelkernen", spicy: true },
      { name: "Palak Murgh",         price: "16,50 €", desc: "Hühnerfleisch mit kräftigem Blattspinat, Zwiebeln, Tomaten und Knoblauch" },
      { name: "Butter Chicken",      price: "17,90 €", desc: "Zartes Hühnerfleisch in Tomaten-Cashewnuss-Buttersoße — ein Klassiker" },
      { name: "Chicken Mango Curry", price: "16,50 €", desc: "Zartes Hühnerfleisch mit Mango, Ingwer und Tomaten in Currysoße" },
    ]
  },
  "Lamm": {
    emoji: "🥩",
    items: [
      { name: "Mutton Curry",     price: "18,50 €", desc: "Deftiges Lammfleisch in Currysoße mit ausgewogener Gewürzmischung" },
      { name: "Taj Mutton Korma", price: "18,50 €", desc: "Zartes Lammfleisch mit Mandeln, Kokosnuss, Cashewnüssen und Rosinen" },
      { name: "Karahi Gosht",     price: "18,50 €", desc: "Gebratenes Lammfleisch mit Paprika, Zwiebeln, Tomaten, Knoblauch und Ingwer" },
      { name: "Bengan Gosht",     price: "18,50 €", desc: "Zartes Lammfleisch mit saftigen Auberginen, frischen Zwiebeln und Tomaten" },
      { name: "Palak Gosht",      price: "18,50 €", desc: "Gebratenes Lammfleisch mit kräftigem Blattspinat und besonderen Gewürzen" },
      { name: "Bhindi Gosht",     price: "18,90 €", desc: "Gebratenes Lammfleisch mit saftigen Okraschoten, Zwiebeln, Tomaten und Ingwer" },
    ]
  },
  "Fisch & Garnelen": {
    emoji: "🦐",
    items: [
      { name: "Fisch Curry",         price: "19,90 €", desc: "Frisches Lachsfilet in würziger Curry-Sahnesoße" },
      { name: "Fisch Masala",        price: "19,90 €", desc: "Gebratenes Lachsfilet mit kräftiger Soße, Tomaten und frischen Zwiebeln" },
      { name: "Jheenga Grill",       price: "19,90 €", desc: "Große gebratene Garnelen in delikater Soße, serviert mit gebratenem Reis" },
      { name: "Shahi Jhinga Masala", price: "19,90 €", desc: "Gebratene Garnelen mit Tomaten, frischen Zwiebeln und grüner Paprika" },
    ]
  },
  "Biryani": {
    emoji: "🍚",
    items: [
      { name: "Vegetarisches Biryani", price: "15,90 €", desc: "Gebratener Basmatireis mit Sommergemüse und besonderer Gewürzmischung", veg: true },
      { name: "Hühner Biryani",        price: "16,90 €", desc: "Gebratener Basmatireis mit Hühnerfleisch, Cashewnüssen und Rosinen" },
      { name: "Lamm Biryani",          price: "17,90 €", desc: "Gebratener Basmatireis mit Lammfleisch, Cashewnüssen und Rosinen" },
      { name: "Delhi Biryani",         price: "19,90 €", desc: "Prachtvoller Mix aus Hühnerfleisch, Lammfleisch, Garnelen und Nüssen" },
    ]
  },
  "Beilagen": {
    emoji: "🫓",
    items: [
      { name: "Naan",           price: "3,00 €",    desc: "Frisch gebackenes, weiches Weizenmehlbrot", veg: true },
      { name: "Knoblauch Naan", price: "3,50 €",    desc: "Naan mit frischem Knoblauch", veg: true },
      { name: "Butter Naan",    price: "3,50 €",    desc: "Naan mit Butter verfeinert", veg: true },
      { name: "Zwiebel Naan",   price: "4,50 €",    desc: "Naan gefüllt mit gewürzten Zwiebeln", veg: true },
      { name: "Paneer Naan",    price: "4,50 €",    desc: "Naan gefüllt mit hausgemachtem Weichkäse", veg: true },
      { name: "Chapati",        price: "3,00 €",    desc: "Dünnes Vollkornfladenbrot", veg: true },
      { name: "Safran Reis",    price: "inklusive", desc: "Delikater Langkornreis verfeinert mit Safran (zu allen Hauptgerichten)", veg: true },
    ]
  },
};

export default function Menu() {
  const cats = Object.keys(menuData);
  const [active, setActive] = useState(cats[0]);
  const [animKey, setAnimKey] = useState(0);
  const tabsRef = useRef(null);

  const changeCategory = (cat) => {
    if (cat === active) return;
    setActive(cat);
    setAnimKey(k => k + 1);
  };

  // Scroll active tab into view
  useEffect(() => {
    const bar = tabsRef.current;
    if (!bar) return;
    const btn = bar.querySelector('.menu-tab.active');
    btn?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [active]);

  // Stagger item animations
  useEffect(() => {
    const rows = document.querySelectorAll('.menu-item-row');
    rows.forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.04}s`;
      requestAnimationFrame(() => el.classList.add('visible'));
    });
  }, [animKey, active]);

  const items = menuData[active].items;

  return (
    <div className="menu-page">
      {/* Hero */}
      <section className="menu-hero">
        <div className="menu-hero-bg">
          <img src="/assets/images/hero-bg.webp" alt="Mogul Bonn Restaurant" />
        </div>
        <div className="menu-hero-content">
          <span className="menu-hero-eyebrow">The Mogul Collection</span>
          <h1 className="menu-hero-title">Speisekarte</h1>
        </div>
      </section>

      {/* Category Tabs */}
      <nav className="menu-tabs-bar" aria-label="Menü-Kategorien">
        <div className="menu-tabs-scroll" ref={tabsRef}>
          {cats.map(cat => (
            <button
              key={cat}
              id={`tab-${cat.replace(/[^a-z0-9]/gi, '-')}`}
              className={`menu-tab${active === cat ? ' active' : ''}`}
              onClick={() => changeCategory(cat)}
              aria-current={active === cat ? 'true' : undefined}
            >
              {menuData[cat].emoji} {cat}
            </button>
          ))}
        </div>
      </nav>

      {/* Items */}
      <section className="menu-items-section">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="menu-section-head">
            <h2 className="menu-section-title">
              {menuData[active].emoji} {active}
            </h2>
            <div className="menu-legend">
              <div className="legend-item" title="Vegetarisch">
                <LeafIcon /> <span>Veg</span>
              </div>
              <div className="legend-item" title="Scharf / Pikant">
                <ChiliIcon /> <span>Scharf</span>
              </div>
            </div>
            <span className="menu-section-count">{items.length} Gerichte</span>
          </div>

          <div className="menu-items-list" key={animKey}>
            {items.map((item, i) => (
              <article className="menu-item-row" key={i}>
                <div className="menu-item-left">
                  <div className="menu-item-name-row">
                    {item.veg && (
                      <span className="veg-icon" title="Vegetarisch" aria-label="Vegetarisch">
                        <LeafIcon />
                      </span>
                    )}
                    <h3 className="menu-item-name">{item.name}</h3>
                    {item.spicy && (
                      <span className="spice-icon" title="Scharf" aria-label="Scharf">
                        <ChiliIcon />
                      </span>
                    )}
                  </div>
                  <p className="menu-item-desc">{item.desc}</p>
                </div>
                <span className="menu-item-price">{item.price}</span>
              </article>
            ))}
          </div>

          <div className="menu-footer-notice">
            <p>
              <strong>Alle Hauptgerichte</strong> werden standardmäßig mit <strong>Safran-Reis</strong> serviert.<br />
              Schärfegrad wählbar: <strong>Mild · Europäisch · Würzig · Halbindisch · Indisch (Extrem Scharf)</strong>.<br />
              Bei Allergenen sprechen Sie bitte unser Team an. <span style={{ color: 'var(--gold)' }}>✦</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
