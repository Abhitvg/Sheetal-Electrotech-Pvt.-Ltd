export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://sheetalelectrotech.com/#organization",
    name: "Sheetal Electrotech Private Limited",
    url: "https://sheetalelectrotech.com/",
    logo: "https://sheetalelectrotech.com/images/logo.webp",
    foundingDate: "1999",
    email: "info@sheetalelectrotech.com",
    telephone: "+91 93273 45295",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Survey No. 168/28 and 168/29, Opp. Givaudan India Pvt. Ltd, Dhabel",
      addressLocality: "Daman",
      addressPostalCode: "396210",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "info@sheetalelectrotech.com",
      telephone: "+91 93273 45295",
      availableLanguage: ["English", "Hindi"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
