import { DESTINATION_NAVIGATION_TABS } from "../components/constants"
import {
  fetchCountryDestinationXMLURLs,
  fetchDestinationXMLURLs,
} from "../utils/fetchDestinationXMLURLs"

const Destinations = () => {
  return null
}

export const getServerSideProps = async ({ res, req }: any) => {
  const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL
  let response = await fetchDestinationXMLURLs()
  let slugs: any = []
  response?.map((destination: any) => {
    DESTINATION_NAVIGATION_TABS?.map((val: any) => {
      if (destination?.destinationNavigation?.[val?.key] === true) {
        slugs.push(
          `/destination${val?.url?.replace(/\&/g, "&amp;")}${val?.key === "highlights" ? "" : "-in"}-${
            destination?.identifier?.replace(/\&/g, "&amp;")
          }`
        )
      }
    })
  })

  let countrySlug = await fetchCountryDestinationXMLURLs()

  countrySlug?.map((destination: any) => {
    slugs.push(`/destination/hotels-in-${destination?.identifier}`)
  })

  const DestinationSitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <url>
    <loc>${domainUrl}en-in/destinations</loc>
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
  res.write(DestinationSitemap)
  res.end()

  return {
    props: {},
  }
}

export default Destinations
