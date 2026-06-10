import React, { useEffect } from 'react';

const Datenschutz = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ padding: '120px 20px', maxWidth: 'var(--container)', margin: '0 auto', color: 'var(--cream)' }}>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--fs-h2)', marginBottom: '40px' }}>Datenschutzerklärung</h1>
      
      <div style={{ fontSize: '1.1rem', lineHeight: '1.8', opacity: 0.9 }}>
        <h2>1. Datenschutz auf einen Blick</h2>
        <h3 style={{ marginTop: '20px' }}>Allgemeine Hinweise</h3>
        <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.</p>
        
        <h3 style={{ marginTop: '20px' }}>Datenerfassung auf dieser Website</h3>
        <p><strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.</p>

        <h2 style={{ marginTop: '30px' }}>2. Hosting</h2>
        <p>Wir hosten die Inhalte unserer Website bei folgendem Anbieter: Vercel.</p>

        <h2 style={{ marginTop: '30px' }}>3. Allgemeine Hinweise und Pflichtinformationen</h2>
        <h3 style={{ marginTop: '20px' }}>Datenschutz</h3>
        <p>Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>
        
        <h3 style={{ marginTop: '20px' }}>Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
        <p>Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.</p>

        <h2 style={{ marginTop: '30px' }}>4. Datenerfassung auf dieser Website</h2>
        <h3 style={{ marginTop: '20px' }}>Tischreservierungen</h3>
        <p>Wenn Sie über unser Online-System einen Tisch reservieren, erheben wir personenbezogene Daten, die für die Bearbeitung Ihrer Reservierung notwendig sind. Dazu gehören insbesondere Ihr <strong>Name, Ihre E-Mail-Adresse und Ihre Telefonnummer</strong>. Diese Daten werden ausschließlich zur Verwaltung Ihrer Reservierung, für eventuelle Rückfragen sowie zur Zusendung einer Bestätigung per E-Mail genutzt.</p>
        <p>Ihre Reservierungsdaten werden in unserer Datenbank gespeichert und nicht ohne Ihre ausdrückliche Zustimmung an Dritte weitergegeben. Die Datenverarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, der die Verarbeitung von Daten zur Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen gestattet.</p>

        <h3 style={{ marginTop: '20px' }}>Online-Bestellungen (GloriaFood)</h3>
        <p>Für die Abwicklung von Online-Bestellungen zur Abholung oder Lieferung nutzen wir den externen Dienstleister GloriaFood (Oracle). Wenn Sie über unsere Website Essen bestellen, werden die von Ihnen eingegebenen Daten (wie Name, Adresse, Telefonnummer, E-Mail und Bestelldetails) direkt an GloriaFood übermittelt und dort verarbeitet, um Ihre Bestellung auszuführen.</p>
        <p>Weitere Informationen zum Umgang mit Nutzerdaten finden Sie in der Datenschutzerklärung von GloriaFood/Oracle: <a href="https://www.oracle.com/legal/privacy/services-privacy-policy.html" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)' }}>Oracle Privacy Policy</a>.</p>
      </div>
    </div>
  );
};

export default Datenschutz;
