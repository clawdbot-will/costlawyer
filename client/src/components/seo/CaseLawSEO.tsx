import { Helmet } from 'react-helmet-async';
import { Case } from '@shared/schema';

interface CaseLawSEOProps {
  caseData: Case;
}

export function CaseLawSEO({ caseData }: CaseLawSEOProps) {
  const { title, summary, slug, category, date, tags = [] } = caseData;
  // Always use the canonical HTTPS non-www URL for SEO consistency
  const siteUrl = "https://costlawyer.co.uk";
  const canonicalUrl = `${siteUrl}/cases/${slug}`;
  const keywords = [...tags, "case law", "legal costs", category].filter(Boolean);
  const formattedDate = new Date(date).toISOString();
  
  // Create schema.org LegalCase structured data
  const legalCaseStructuredData = {
    "@context": "https://schema.org",
    "@type": "LegalCase",
    "name": title,
    "description": summary,
    "url": canonicalUrl,
    "datePublished": formattedDate,
    "keywords": keywords.join(", "),
    "about": {
      "@type": "Thing",
      "name": category
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title} | Mackenzie Costs Case Law Updates</title>
      <meta name="description" content={summary} />
      <meta name="keywords" content={keywords.join(', ')} />
      
      {/* Canonical Link */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph Protocol */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={summary} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="article:published_time" content={formattedDate} />
      {category && <meta property="article:section" content={category} />}
      {tags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={summary} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(legalCaseStructuredData)}
      </script>
    </Helmet>
  );
}