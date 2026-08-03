import React, { useEffect, useState, useCallback } from 'react';
import './AnnouncementPopup.css';

const SHOW_DELAY_MS = 3000;   // appear 3s after landing
const AUTO_HIDE_MS = 10000;   // stay visible for 10s, then auto-dismiss
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
      // Ignore storage access restrictions (e.g. Safari private mode)
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

  useEffect(() => {
    if (!visible) return;
    const hideTimer = setTimeout(() => handleClose(), AUTO_HIDE_MS);
    return () => clearTimeout(hideTimer);
  }, [visible, handleClose]);

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
        <img
          src="/assets/images/event-wine-sip.webp"
          alt="Wine Sip Event — Weiss. Rosé. Was? Am 21.08.2026 um 18:30 Uhr im Mogul Restaurant, Heerstraße 64, 53111 Bonn. 27€ pro Person."
          loading="eager"
        />
        <button
          className="announce-close"
          onClick={handleClose}
          aria-label="Schließen"
          type="button"
        >
          &times;
        </button>
      </div>
    </div>
  );
}

