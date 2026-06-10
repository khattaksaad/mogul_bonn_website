import React, { useEffect } from 'react';

const Impressum = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ padding: '120px 20px', maxWidth: 'var(--container)', margin: '0 auto', color: 'var(--cream)' }}>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--fs-h2)', marginBottom: '40px' }}>Impressum</h1>
      
      <div style={{ fontSize: '1.1rem', lineHeight: '1.8', opacity: 0.9 }}>
        <h2>Angaben gemäß § 5 TMG</h2>
        <p>
          Mogul Restaurant<br />
          Heerstraße 64<br />
          53111 Bonn<br />
          Deutschland
        </p>

        <h2 style={{ marginTop: '30px' }}>Vertreten durch</h2>
        <p>Inhaber: Aleem Latif</p>

        <h2 style={{ marginTop: '30px' }}>Kontakt</h2>
        <p>
          Telefon: +49 (0) 228 69 55 69<br />
          E-Mail: info@mogulbonn.de
        </p>

        <h2 style={{ marginTop: '30px' }}>Umsatzsteuer-ID</h2>
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
          DE349689184
        </p>

        <h2 style={{ marginTop: '30px' }}>Streitschlichtung</h2>
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)' }}>https://ec.europa.eu/consumers/odr</a>.<br />
          Unsere E-Mail-Adresse finden Sie oben im Impressum.
        </p>
        <p>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </div>
    </div>
  );
};

export default Impressum;
