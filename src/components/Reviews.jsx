import React from 'react';

/* Real reviews scraped from Google Maps — 4.4 ★, 644 reviews */
const REVIEWS = [
  {
    name: 'Frank G.',
    initial: 'F',
    rating: 5,
    text: 'Very authentic Indian food. The service is great and the atmosphere is very cozy.',
    date: 'vor 2 Monaten',
  },
  {
    name: 'Nancy Frisk',
    initial: 'N',
    rating: 5,
    text: 'Super tasty food and nice atmosphere! Try to book ahead since it can get a bit crowded.',
    date: 'vor 4 Monaten',
  },
  {
    name: 'Ashwin Kumar',
    initial: 'A',
    rating: 5,
    text: 'Excellent food and service. Highly recommended for vegetarians too.',
    date: 'vor 3 Monaten',
  },
  {
    name: 'Malik Muhammad Ahmad',
    initial: 'M',
    rating: 5,
    text: 'A variety of Pakistani / Indian dishes available with authentic taste. No complaints about the taste!',
    date: 'vor 1 Monat',
  },
  {
    name: 'Luke Liscio',
    initial: 'L',
    rating: 5,
    text: 'Great food, great service. Will definitely be back.',
    date: 'vor 5 Monaten',
  },
  {
    name: 'Polly B',
    initial: 'P',
    rating: 5,
    text: 'Amazing food and very friendly service.',
    date: 'vor 2 Monaten',
  },
  {
    name: 'Sachin Pradeep',
    initial: 'S',
    rating: 5,
    text: 'One of the best Indian restaurants in Bonn.',
    date: 'vor 6 Monaten',
  },
  {
    name: 'David Pizzini',
    initial: 'D',
    rating: 5,
    text: 'Authentic taste and nice staff.',
    date: 'vor 3 Monaten',
  },
  {
    name: 'William Goodman',
    initial: 'W',
    rating: 4,
    text: 'Solid Indian food in the heart of Bonn. Always a reliable choice.',
    date: 'vor 7 Monaten',
  },
  {
    name: 'Gaurav G.',
    initial: 'G',
    rating: 4,
    text: 'Had a great dinner here, the curry was flavorful and portion sizes were generous.',
    date: 'vor 2 Monaten',
  },
  {
    name: 'Muhammad Urwah Nasir',
    initial: 'M',
    rating: 5,
    text: 'Good food and great environment. A go-to spot for authentic South Asian cuisine.',
    date: 'vor 1 Monat',
  },
  {
    name: 'Siddharth Mehrotra',
    initial: 'S',
    rating: 4,
    text: 'Solid choice for Indian food in Bonn. The Biryani is especially good.',
    date: 'vor 4 Monaten',
  },
];

function Stars({ count }) {
  return (
    <div className="review-card-stars" aria-label={`${count} von 5 Sternen`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ color: i < count ? '#FBBC04' : 'rgba(251,188,4,0.25)' }}>★</span>
      ))}
    </div>
  );
}

export default function Reviews() {
  // Double the array for seamless infinite loop
  const doubled = [...REVIEWS, ...REVIEWS];

  return (
    <section className="reviews-section" aria-labelledby="reviews-heading">
      <div className="container">
        <div className="reviews-header-row">
          <div className="reveal-left">
            <span className="section-label">Kundenstimmen</span>
            <h2 className="section-title" id="reviews-heading">
              Was unsere Gäste<br /><em>sagen</em>
            </h2>
          </div>

          {/* Google rating badge */}
          <div className="reviews-google-badge reveal-right">
            <div>
              <span className="badge-score">4.4</span>
              <span className="badge-stars">★★★★★</span>
              <span className="badge-total">644 Bewertungen</span>
            </div>
            <div style={{ borderLeft: '1px solid var(--cream-ghost)', paddingLeft: '1rem' }}>
              <span className="badge-logo">Google</span>
              <span style={{ display: 'block', marginTop: '0.3rem' }}>
                <svg width="52" height="18" viewBox="0 0 272 92" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#EA4335"/>
                  <path d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#FBBC05"/>
                  <path d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" fill="#4285F4"/>
                  <path d="M225 3v65h-9.5V3h9.5z" fill="#34A853"/>
                  <path d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" fill="#EA4335"/>
                  <path d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z" fill="#4285F4"/>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Infinite-scroll carousel — no container padding so it goes edge-to-edge */}
      <div className="reviews-carousel-wrap">
        <div className="reviews-track" role="list">
          {doubled.map((review, i) => (
            <article className="review-card" key={i} role="listitem">
              <Stars count={review.rating} />
              <p className="review-card-text">{review.text}</p>
              <div className="review-card-author">
                <div className="review-avatar" aria-hidden="true">
                  {review.initial}
                </div>
                <div>
                  <span className="review-name">{review.name}</span>
                  <span className="review-date">{review.date} · Google</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="reviews-cta">
        <a
          href="https://www.google.com/maps/place/Indisches+Restaurant+Mogul/@50.7374,7.0982,17z"
          target="_blank"
          rel="noopener noreferrer"
        >
          Alle 644 Bewertungen auf Google ansehen →
        </a>
      </div>
    </section>
  );
}
