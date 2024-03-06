const GiftShopping = () => {
  return null
}

const pageSlugs = [
  { url: "en-in/gifting-and-shopping", priority: 1 },
  { url: "en-in/gifting-and-shopping/e-gift-cards", priority: 0.9},
  { url: "en-in/gifting-and-shopping/gift-cards", priority: 0.9},
  { url: "en-in/gifting-and-shopping/wedding-gift-cards", priority: 0.9},
  { url: "en-in/gifting-and-shopping/just-because", priority: 0.9},
  { url: "en-in/gifting-and-shopping/taj-gift-hampers", priority: 0.9},
  { url: "en-in/gifting-and-shopping/taj-gift-hampers/signature-hampers", priority: 0.9},
  { url: "en-in/hampers-detail", priority: 0.9},
  { url: "en-in/gifting-and-shopping/taj-khazana", priority: 0.9}
]

export const getServerSideProps = async ({ res, req }: any) => {
  const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL
  const GiftShoppingsitemap = `<?xml version="1.0" encoding="UTF-8"?>
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
  res.write(GiftShoppingsitemap)
  res.end()

  return {
    props: {},
  }
}

export default GiftShopping
