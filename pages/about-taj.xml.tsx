import { fetchStaticXMLURLs } from "../utils/fetchStaticXMLURLs"

const AboutTaj = () => {
  return null
}

export const getServerSideProps = async ({ res, req }: any) => {
  const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL
  const response = await fetchStaticXMLURLs()
  const slugs = response?.slugs?.filter((data: any) => data?.enable === true)
  const aboutTajSitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
      ${slugs
        .map((data: any) => {
          return `
            <url>
            <loc>${domainUrl}en-in${data?.path}</loc>
            <lastmod>2023-09-02</lastmod>
            <changefreq>Daily</changefreq>
            <priority>${data?.priority || "0.9"}</priority>
            </url>
              `
        })
        .join("")}
        </urlset>
      `

  res.setHeader("Content-Type", "text/xml")
  res.write(aboutTajSitemap)
  res.end()

  return {
    props: {},
  }
}

export default AboutTaj
