import React from "react";
import Head from "next/head";

interface SEOProps {
  title: string;
  description: string;
  keywords: string;
  image: string;
  url: string;
  structureData?: any;
  webpageSchema?: any;
  localBusinessSchema?: any;
  breadCrumbSchema?: any;
}

const DYNAMICSEO = (props: SEOProps) => {
  const {
    title,
    description,
    image,
    keywords,
    url,
    structureData,
    webpageSchema,
    localBusinessSchema,
    breadCrumbSchema,
  } = props;
  return (
    <Head>
      <title>{title}</title>
      {url && <link rel="canonical" href={url} />}
      {title && <meta name="name" content={title} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {description && <meta name="description" content={description} />}
      {image && <meta name="image" content={image} />}
      <meta name="twitter:card" content="product" />
      <meta name="twitter:site" content="@taj_team_build" />
      {description && <meta name="twitter:description" content={description} />}
      {title && <meta name="twitter:title" content={title} />}
      {image && <meta name="twitter:image" content={image} />}
      {title && <meta name="og:title" content={title} />}
      <meta name="og:type" content="website" />
      {url && <meta name="og:url" content={url} />}
      {description && <meta name="og:description" content={description} />}
      {image && <meta name="og:image" content={image} />}
      {webpageSchema && (
        <script
          key="web-page"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webpageSchema),
          }}
        />
      )}
      {structureData && (
        <script
          key="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structureData),
          }}
        />
      )}
      {localBusinessSchema && (
        <script
          key="local-business"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      )}
      {breadCrumbSchema && (
        <script
          key="breadcrumb"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadCrumbSchema),
          }}
        />
      )}
    </Head>
  );
};

export default DYNAMICSEO;
