import { DESTINATION_NAVIGATION_TABS, HOTEL_NAVIGATION_TABS } from "../../components/constants"
import { hotelRoute, offersRoute, restaurantsRoute } from "../../features/property/ui/constants"
import { fetchBrandRestaurantsXMLURLs } from "../../utils/fetchBrandRestaurantsXMLURLs"
import { fetchCountryDestinationXMLURLs, fetchDestinationXMLURLs } from "../../utils/fetchDestinationXMLURLs"
import { fetchOfferHotelXMLURLS, fetchOfferXMLURLS } from "../../utils/fetchOfferXMLURLS"
import { fetchPropertiesXMLURLs } from "../../utils/fetchPropertiesXMLURLs"
import { fetchRestaurantXMLURLS } from "../../utils/fetchRestaurantXMLURLS"

export default async function handler(req: any, res: any) {
  if (req.query.secret !== process.env.NEXT_PUBLIC_REVALIDATE_SECRET) {
    return res.status(401).json({ message: "Invalid token" })
  }
  let slugs: any = []
  const reqBodyData = req.body?.journey ? req.body?.journey : []
  const fetchHotelsData = async () => {
    const response = await fetchPropertiesXMLURLs()
    response?.map((hotel: any) => {
      HOTEL_NAVIGATION_TABS?.map((val: any) => {
        if (hotel?.hotelNavigation?.[val?.key] === true) {
          let hotelpageUrl = `/en-in/hotels/${hotel?.identifier?.replace(/\&/g, "&amp;")}${
            val?.url !== "/" ? val?.url?.replace(/\&/g, "&amp;") : ""
          }`
          res.revalidate(hotelpageUrl)
          slugs.push(hotelpageUrl)
        }
      })
    })
  }

  const fetchOffersSlugs = async () => {
    const response = await fetchOfferXMLURLS()
    response?.map((offer: any) => {
      let offerPage = `/en-in/offers/${offer?.identifier?.replace(/\&/g, "&amp;")}`
      res.revalidate(offerPage)
      slugs.push(offerPage)
    })
  }

  const fetchHotelSpecificOffersSlugs = async () => {
    const response = await fetchOfferHotelXMLURLS()
    response?.map((offer: any) => {
      offer?.participatingHotels?.map((hotel: any) => {
        if (hotel?.identifier !== null && hotel?.identifier !== undefined) {
          let hotelOffersPage = `/en-in/${hotelRoute}/${hotel?.identifier}/${offersRoute}/${offer?.identifier?.replace(
            /\&/g,
            "&amp;",
          )}`
          res.revalidate(hotelOffersPage)
          slugs.push(hotelOffersPage)
        }
      })
    })
  }

  const fetchDestinationsData = async () => {
    const response = await fetchDestinationXMLURLs()
    response?.map((destination: any) => {
      DESTINATION_NAVIGATION_TABS?.map((val: any) => {
        if (destination?.destinationNavigation?.[val?.key] === true) {
          let destinationPageUrl = `/en-in/destination${val?.url?.replace(/\&/g, "&amp;")}${
            val?.key === "highlights" ? "" : "-in"
          }-${destination?.identifier?.replace(/\&/g, "&amp;")}`
          res.revalidate(destinationPageUrl)
          slugs.push(destinationPageUrl)
        }
      })
    })
  }

  const fetchCountryDestinationSpecificSlugs = async () => {
    const response = await fetchCountryDestinationXMLURLs()
    response?.map((destination: any) => {
      let countryPage = `/en-in/destination/hotels-in-${destination?.identifier}`
      res.revalidate(countryPage)
      slugs.push(countryPage)
    })
  }

  const fetchRestaurantSlugs = async () => {
    const response = await fetchRestaurantXMLURLS()
    response?.map((restaurants: any) => {
      restaurants?.participatingHotels?.map((hotel: any) => {
        if (hotel?.identifier !== null && hotel?.identifier !== undefined) {
          let restaurantSlug = `/en-in/${hotelRoute}/${hotel?.identifier?.replace(
            /\&/g,
            "&amp;",
          )}/${restaurantsRoute}/${restaurants?.identifier?.replace(/\&/g, "&amp;")}`
          res.revalidate(restaurantSlug)
          slugs.push(restaurantSlug)
        }
      })
    })
  }

  const fetchBrandRestaurantsSlugs = async () => {
    const restaurantBrandPage = await fetchBrandRestaurantsXMLURLs()
    restaurantBrandPage?.map((brand: any) => {
      let restaurantBrandPage = `/en-in/${restaurantsRoute}/${brand?.identifier?.replace(/\&/g, "&amp;")}`
      res.revalidate(restaurantBrandPage)
      slugs.push(restaurantBrandPage)
    })
  }

  const fetchAllData = (journey: any) => {
    return Promise.all(
      journey?.map(async (item: any) => {
        const variant = item?.toLowerCase()
        switch (variant) {
          case "hotels":
            return fetchHotelsData()
          case "destinations":
            return fetchDestinationsData()
          case "countrydestinations":
            return fetchCountryDestinationSpecificSlugs()
          case "hoteloffers":
            return fetchHotelSpecificOffersSlugs()
          case "offers":
            return fetchOffersSlugs()
          case "restaurants":
            return fetchRestaurantSlugs()
          case "restaurantsbrands":
            return fetchBrandRestaurantsSlugs()
          default:
            return []
        }
      }),
    )
  }

  return new Promise((resolve: any, reject): any => {
    fetchAllData(reqBodyData)
      .then(() => {
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        res.setHeader("Cache-Control", "max-age=180000")
        if (slugs?.length > 0) {
          res.json({ revalidated: true, CachePurgedSlugs: slugs })
        }
        res.end(JSON.stringify(slugs))
        resolve()
      })
      .catch((error: any) => {
        res.json(error)
        res.status(405).end()
        resolve()
      })
  })
}
