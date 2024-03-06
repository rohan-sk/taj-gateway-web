export const fetchWebPageSchema = (
  name: string,
  description: string,
  logo: any
) => {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: name,
    description: description,
    url: global?.window?.location?.href,
    publisher: {
      "@type": "Organization",
      name: "Taj Hotels",
      url: global?.window?.location?.origin,
      logo: {
        "@type": "ImageObject",
        contentUrl: logo,
      },
    },
  };
};
