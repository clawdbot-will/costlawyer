import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  type?: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
}

const siteName = "Mackenzie Costs | Legal Costs Specialist";
const defaultDescription = "Professional legal costs specialists providing expert advice and services in costs management, detailed assessment, and bill preparation.";
const defaultKeywords = ["legal costs", "costs management", "detailed assessment", "bill preparation", "legal costs specialist"];
const defaultImage = "/images/logo.png";
const siteUrl = typeof window !== "undefined" ? window.location.origin : "";

export function SEO({
  title,
  description = defaultDescription,
  canonical,
  type = "website",
  keywords = defaultKeywords,
  image = defaultImage,
  noIndex = false,
}: SEOProps) {
  const fullTitle = title ? `${title} | Mackenzie Costs` : siteName;
  const canonicalUrl = canonical ? `${siteUrl}${canonical}` : undefined;
  const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Canonical Link */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph Protocol */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content={siteName} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
    </Helmet>
  );
}