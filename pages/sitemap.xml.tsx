const Sitemap = () => {
  return null
}

const pageSlugs = [
  { url: "taj-properties.xml", priority: 1 },
  { url: "destination.xml", priority: 1 },
  { url: "taj-holidays.xml", priority: 1 },
  { url: "restaurants.xml", priority: 1 },
  { url: "offers.xml", priority: 1 },
  { url: "j-wellness-circle.xml", priority: 1 },
  { url: "travel-inspiration.xml", priority: 1 },
  { url: "taj-membership.xml", priority: 1 },
  { url: "gifting-shopping.xml", priority: 1 },
  { url: "about-taj.xml", priority: 1 },
  { url: "taj-images.xml", priority: 1 },
]

export const getServerSideProps = async ({ res }: any) => {
  const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  ${pageSlugs
    .map((slug: any) => {
      return `
        <url>
        <loc>${domainUrl}${slug?.url}</loc>
        <lastmod>2023-09-02</lastmod>
        <changefreq>Daily</changefreq>
        <priority>${slug?.priority}</priority>
        </url>
          `
    })
    .join("")}
    </urlset>
  `

  res.setHeader("Content-Type", "text/xml")
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default Sitemap
