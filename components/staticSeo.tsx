import React from "react";
import Head from "next/head";

interface SEOProps {
  title: string;
  metaTags: MetaTag[];
  keywords: string;
  url: string;
  webpageSchema?: any;
  organizationSchema?: any;
  breadCrumbSchema?: any;
  scripts?: ScriptTag[];
}

interface ScriptTag {
  src?: string;
  async?: boolean;
}

interface MetaTag {
  name: string;
  content: string;
}

const STATICSEO = (props: SEOProps) => {
  const {
    title,
    metaTags,
    keywords,
    url,
    webpageSchema,
    scripts,
    organizationSchema,
    breadCrumbSchema,
  } = props;
  return (
    <Head>
      <title>{title}</title>
      {url && <link rel="canonical" href={url} />}
      {url && <meta name="og:url" content={url} />}
      {metaTags?.map((item: MetaTag) => {
        return (
          <meta key={item?.name} name={item?.name} content={item?.content} />
        );
      })}
      {keywords && <meta name="keywords" content={keywords} />}
      {scripts?.map((item: ScriptTag, index: any) => {
        return (
          // eslint-disable-next-line react/jsx-key
          <script {...item} key={index} />
        );
      })}
      {webpageSchema && (
        <script
          key="web-page"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webpageSchema),
          }}
        />
      )}
      {organizationSchema && (
        <script
          key="organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
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

export default STATICSEO;
