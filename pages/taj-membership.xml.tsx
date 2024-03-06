const MemberShipProgram = () => {
  return null
}

const pageSlugs = [
  { url: "en-in/thechambers", priority: 0.9 },
  { url: "en-in/neupass", priority: 1 },
  { url: "en-in/neupass-faq-page", priority: 0.9 },
  { url: "en-in/epicureprogram", priority: 1 },
  { url: "en-in/epicure-checkout-privileged", priority: 0.9 },
  { url: "en-in/epicure-checkout-preferred", priority: 0.9 },
  { url: "en-in/epicure-checkout", priority: 0.9 },
  { url: "en-in/epicure/checkout-preferred", priority: 0.9 },
  { url: "en-in/loyalty/epicure-membership-purchase	Weekly", priority: 0.9 },
  { url: "en-in/epicureprogram-terms-and-conditions", priority: 0.9 },
  { url: "en-in/epicure-faq-page", priority: 0.9 },
  { url: "en-in/business-service-sme", priority: 0.9 }
]

export const getServerSideProps = async ({ res, req }: any) => {
  const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL
  const memberShipProgramsitemap = `<?xml version="1.0" encoding="UTF-8"?>
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
  res.write(memberShipProgramsitemap)
  res.end()

  return {
    props: {},
  }
}

export default MemberShipProgram
