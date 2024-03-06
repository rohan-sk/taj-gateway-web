import { hotelRoute, offersRoute } from "../features/property/ui/constants"
import {
  fetchOfferHotelXMLURLS,
  fetchOfferXMLURLS,
} from "../utils/fetchOfferXMLURLS"

const Offers = () => {
  return null
}

export const getServerSideProps = async ({ res, req }: any) => {
  const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL
  let response = await fetchOfferHotelXMLURLS()
  let slugs: any = []
  let offerResponse = await fetchOfferXMLURLS()
  offerResponse?.map((offer: any) => {
    slugs.push(`/offers/${offer?.identifier?.replace(/\&/g, "&amp;")}`)
  })
  response?.map((offer: any) => {
    offer?.participatingHotels?.map((hotel: any) => {
      if (hotel?.identifier !== null && hotel?.identifier !== undefined) {
        slugs.push(
          `/${hotelRoute}/${hotel?.identifier
          }/${offersRoute}/${offer?.identifier?.replace(/\&/g, "&amp;")}`
        )
      }
    })
  })

  const offerSitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
      <url>
      <loc>${domainUrl}en-in/offers</loc>
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
  res.write(offerSitemap)
  res.end()

  return {
    props: {},
  }
}

export default Offers
