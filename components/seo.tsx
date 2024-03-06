import React from "react";
import Head from "next/head";

interface SEOProps {
  title: string;
  description: string;
  keywords: string[];
  image: string;
  openGraphType?: string;
  url?: string;
  createdAt?: string;
  updatedAt?: string;
  metadata?: any;
}

const defaultProps = {
  meta: {
    social: {
      twitter: {
        siteContent: "",
        creator: "",
      },
    },
    siteName: "",
  },
};

const socialTags = ({
  openGraphType,
  url,
  title,
  description,
  image,
  createdAt,
  updatedAt,
}: SEOProps) => {
  const metaTags = [
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:site",
      content: defaultProps?.meta?.social?.twitter?.siteContent,
    },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    {
      name: "twitter:creator",
      content: defaultProps?.meta?.social?.twitter?.creator,
    },
    { name: "twitter:image:src", content: image },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "og:title", content: title },
    { name: "og:type", content: openGraphType },
    { name: "og:url", content: url },
    { name: "og:image", content: image },
    { name: "og:description", content: description },
    {
      name: "og:site_name",
      content: defaultProps?.meta?.siteName,
    },
    {
      name: "og:published_time",
      content: createdAt || new Date().toISOString(),
    },
    {
      name: "og:modified_time",
      content: updatedAt || new Date().toISOString(),
    },
  ];

  return metaTags;
};

const SEO = (props: SEOProps) => {
  const { title, description, image, keywords } = props;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta itemProp="name" content={title} />
      <meta itemProp="keywords" content={keywords?.join(", ")} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={image} />

      {socialTags(props).map(({ name, content }) => {
        return <meta key={name} name={name} content={content} />;
      })}
    </Head>
  );
};

SEO.defaultProps = {
  ...defaultProps,
};

export default SEO;
