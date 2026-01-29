import { Helmet } from "react-helmet-async";

export function SchemaJSON() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "Mackenzie Costs",
    "url": "https://costlawyer.co.uk",
    "logo": "https://costlawyer.co.uk/images/logo.png",
    "image": "https://costlawyer.co.uk/images/logo.png",
    "description": "Professional legal costs specialists providing expert advice and services in costs management, detailed assessment, and bill preparation.",
    "telephone": "+44 20 4576 8203",
    "email": "william@costlawyer.co.uk",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "86-90 Paul Street",
      "addressLocality": "London",
      "postalCode": "EC2A 4NE",
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 51.5255, 
      "longitude": -0.0847 
    },
    "areaServed": {
      "@type": "Country",
      "name": "United Kingdom"
    },
    "sameAs": [
      "https://twitter.com/mackenziecosts",
      "https://linkedin.com/company/mackenziecosts",
      "https://facebook.com/mackenziecosts"
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "09:00",
        "closes": "17:30"
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
}
