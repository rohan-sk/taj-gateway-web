import { HOTEL_NAVIGATION_TABS } from "../components/constants"
import { fetchPropertiesXMLURLs } from "../utils/fetchPropertiesXMLURLs"

const TajProperties = () => {
  return null
}

export const getServerSideProps = async ({ res, req }: any) => {
  const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL
  let response = await fetchPropertiesXMLURLs()
  let slugs: any = []
  response?.map((hotel: any) => {
    HOTEL_NAVIGATION_TABS?.map((val: any) => {
      if (hotel?.hotelNavigation?.[val?.key] === true) {
        slugs.push(
          `/hotels/${hotel?.identifier?.replace(/\&/g, "&amp;")}${val?.url !== "/" ? val?.url?.replace(/\&/g, "&amp;") : ""}`
        )
      }
    })
  })

  const tajPropertiesSitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <url>
          <loc>${domainUrl}en-in/hotels</loc>
          <lastmod>2023-09-02</lastmod>
          <changefreq>Daily</changefreq>
          <priority>1</priority>
          </url>
    ${slugs
      .map((url: any) => {
        return `
          <url>
          <loc>${domainUrl}en-in${url}</loc>
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
  res.write(tajPropertiesSitemap)
  res.end()

  return {
    props: {},
  }
}

export default TajProperties
