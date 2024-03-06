import {
  hotelRoute,
  restaurantsRoute,
} from "../features/property/ui/constants"
import { fetchBrandRestaurantsXMLURLs } from "../utils/fetchBrandRestaurantsXMLURLs"
import { fetchRestaurantXMLURLS } from "../utils/fetchRestaurantXMLURLS"

const Restaurants = () => {
  return null
}

export const getServerSideProps = async ({ res, req }: any) => {
  const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL
  let response = await fetchRestaurantXMLURLS()
  let slugs: any = []
  let brandResponse = await fetchBrandRestaurantsXMLURLs()
  brandResponse?.map((restaurants: any) => {
    slugs.push(`/${restaurantsRoute}/${restaurants?.identifier?.replace(/\&/g, "&amp;")}`)
  })
  response?.map((restaurants: any) => {
    restaurants?.participatingHotels?.map((hotel: any) => {
    if(hotel?.identifier !== null && hotel?.identifier !== undefined)  slugs.push(`/${hotelRoute}/${hotel?.identifier?.replace(/\&/g, "&amp;")}/${restaurantsRoute}/${restaurants?.identifier?.replace(/\&/g, "&amp;")}`)
    })
  })

  const restaurantSitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <url>
    <loc>${domainUrl}en-in/restaurants</loc>
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
  res.write(restaurantSitemap)
  res.end()

  return {
    props: {},
  }
}

export default Restaurants
