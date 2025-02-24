import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = 'forex education, trading, financial markets, forex trading',
  ogImage = '/og-image.jpg'
}) => {
  const siteUrl = 'https://your-domain.com';

  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{title} | Forex Education Platform</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph meta tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:type" content="website" />

      {/* Twitter Card meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />

      {/* Additional SEO meta tags */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="language" content="English" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={siteUrl} />
    </Helmet>
  );
};

export default SEO;
