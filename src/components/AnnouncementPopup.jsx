import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './AnnouncementPopup.css';

const SHOW_DELAY_MS = 2500;   // appear 2.5s after landing
const STORAGE_KEY = 'mogul-announcement-wine-sip-2026-08-21';

export default function AnnouncementPopup() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    // Only show once per browser (until it's cleared / storage reset)
    if (typeof window === 'undefined') return;
    try {
      if (window.localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      // Ignore storage access restrictions
    }

    const showTimer = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => clearTimeout(showTimer);
  }, []);

  const handleClose = useCallback((e) => {
    if (e && typeof e.stopPropagation === 'function') {
      e.stopPropagation();
    }
    setClosing((alreadyClosing) => {
      if (alreadyClosing) return true;
      try {
        window.localStorage.setItem(STORAGE_KEY, '1');
      } catch {
        // Ignore storage write restrictions
      }
      setTimeout(() => setVisible(false), 400); // match CSS exit transition
      return true;
    });
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`announce-overlay${closing ? ' is-closing' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Wine Sip Event Ankündigung"
      onClick={handleClose}
    >
      <div className="announce-card" onClick={(e) => e.stopPropagation()}>
        <button
          className="announce-close"
          onClick={handleClose}
          aria-label="Schließen"
          type="button"
        >
          &times;
        </button>

        <div className="announce-header">
          <span className="announce-eyebrow">EXKLUSIVES EVENT · MOGUL BONN</span>
          <h2 className="announce-title">
            Weiss. Rosé. <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Was?</em>
          </h2>
          <div className="announce-date">
            📅 Freitag, 21. August 2026 · 18:30 Uhr · 27 € p.P.
          </div>
        </div>

        <div className="announce-image-frame">
          <img
            src="/assets/images/event-wine-sip.webp"
            alt="Wine Sip Event am 21.08.2026 im Mogul Restaurant Bonn"
            loading="eager"
          />
        </div>

        <div className="announce-footer">
          <p className="announce-desc">
            Genießen Sie einen unvergesslichen Abend voller erlesener Weine und abgestimmter kulinarischer Köstlichkeiten in der Heerstraße.
          </p>
          <div className="announce-actions">
            <Link 
              to="/reservieren" 
              className="btn btn-gold announce-btn-reserve"
              onClick={handleClose}
            >
              Jetzt Tisch Reservieren 🪑
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
