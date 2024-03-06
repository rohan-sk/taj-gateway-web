const JWellnessCircle = () => {
  return null
}

export const getServerSideProps = async ({ res, req }: any) => {
  const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL
  const slugs = [
    "en-in/j-wellness-circle",
    "en-in/j-wellness-circle/wellness-products",
    "en-in/j-wellness-circle/luxury-spa",
  ]
  const JWellnessCirclesitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    ${slugs
      .map((url: any) => {
        return `
          <url>
          <loc>${domainUrl}${url}</loc>
          <lastmod>2023-09-02</lastmod>
          <changefreq>Daily</changefreq>
          <priority>0.9</priority>
          </url>
            `
      })
      .join("")}
      </urlset>
    `

  res.setHeader("Content-Type", "text/xml")
  res.write(JWellnessCirclesitemap)
  res.end()

  return {
    props: {},
  }
}

export default JWellnessCircle
