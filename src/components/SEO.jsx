import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title, 
  description, 
  keywords, 
  canonicalUrl, 
  schemaData 
}) {
  const siteTitle = title ? `${title} | Mogul Bonn` : 'Mogul Bonn – Indisches & Pakistanisches Restaurant';
  const defaultDescription = "Authentische indisch-pakistanische Küche seit über 30 Jahren. Heerstraße 64, 53111 Bonn. Tisch reservieren: 0228 695569. Biryani, Curry, Tandoori.";
  const defaultKeywords = "Indisches Restaurant Bonn, Pakistanisches Restaurant Bonn, Mogul Bonn, Biryani Bonn, Curry Bonn, Heerstraße, Halal Essen Bonn";

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="title" content={siteTitle} />
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      
      {/* Canonical URL to prevent duplicate content issues */}
      {canonicalUrl && <link rel="canonical" href={`https://mogulbonn.com${canonicalUrl}`} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://mogulbonn.com${canonicalUrl || ''}`} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content="https://mogulbonn.com/hero-bg.png" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={`https://mogulbonn.com${canonicalUrl || ''}`} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={description || defaultDescription} />
      <meta property="twitter:image" content="https://mogulbonn.com/hero-bg.png" />

      {/* Inject Page-Specific Schema.org JSON-LD if provided */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
}
