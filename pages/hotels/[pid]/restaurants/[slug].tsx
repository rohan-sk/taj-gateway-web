import PageLayoutComponent from "../../../../layout/PageLayoutComponent"
import {
  defaultOverviewRoute,
  hotelRoute,
  restaurantsRoute,
} from "../../../../features/property/ui/constants"
import path from "path"
import { getClient, urlFor } from "../../../../lib-sanity"
import {
  getPageQuery,
  fetchHotelDataWithIdentifier,
  fetchRestaurantsDataWithIdentifier,
} from "../../../../lib/utils"
import DYNAMICSEO from "../../../../components/dynamicSeo"
import { fetchWebPageSchema } from "../../../../schemas/webPageSchema"
import { fetchRestaurantSchema } from "../../../../schemas/restaurantSchema"
import { useRouter } from "next/router"
import { breadcrumbList } from "../../../../schemas/breadCrumbList"
import { fetchBreadSchema } from "../../../../schemas/breadCrumbSchema"

export default function Preview(props: any) {
  const { restaurantData } = props
  const router = useRouter()
  const title = restaurantData?.[0]?.pageTitle
  const description = restaurantData?.[0]?.seoDescription
  const image = restaurantData?.[0]?.thumbnail?.[0]?.imageAsset?.image?.[0]
    ?.asset?._ref
    ? urlFor(
        restaurantData?.[0]?.thumbnail?.[0]?.imageAsset?.image?.[0]?.asset?._ref
      )?.url()
    : ""
  const logo = props?.data?.header?.[0]?.logo?.asset?._ref
    ? urlFor(props?.data?.header?.[0]?.logo?.asset?._ref)?.url()
    : ""
  const keywords = restaurantData?.[0]?.seoKeywords
  const enableBreadCrumb = props?.data?.pageBody?.items?.filter((val: any) => val?.variant === "share")?.length > 0


  return (
    <>
      <DYNAMICSEO
        title={title}
        description={description}
        url={global?.window?.location?.href}
        image={image}
        keywords={keywords}
        structureData={fetchRestaurantSchema(restaurantData?.[0])}
        webpageSchema={fetchWebPageSchema(title, description, logo)}
        breadCrumbSchema={enableBreadCrumb && fetchBreadSchema(breadcrumbList(router), router)}
      />
      <PageLayoutComponent {...props} />
    </>
  )
}

export async function getStaticPaths() {
  const paths = [
    {
      params: {
        index: "restaurants",
        slug: "suvarna-mahal",
        pageId: 1,
        pid: "rambagh-palace-jaipur",
      },
    },
  ]
  return {
    paths,
    fallback: true, // false or 'blocking'
  }
}

export async function getStaticProps(context: any) {
  let hotelPageData
  let restaurantData
  let queryParams = context.params

  let layoutRoute = defaultOverviewRoute
  let tempPath = queryParams?.slug
    ? `/${hotelRoute}/${restaurantsRoute}/${layoutRoute}`
    : path
  const query = getPageQuery(tempPath)
  const fetchedData = await getClient(true).fetch(query, { tempPath })

  const hotelData = fetchHotelDataWithIdentifier(queryParams?.pid)
  hotelPageData = await getClient(true).fetch(hotelData)

  const resInfo = fetchRestaurantsDataWithIdentifier(queryParams?.slug)
  restaurantData = await getClient(true).fetch(resInfo)

  let filteredData =
    (await restaurantData?.length) > 1
      ? restaurantData?.filter(
          (val: any) =>
            val?.participatingHotels?.[0]?.identifier === queryParams?.pid
        )
      : restaurantData

  if (
    fetchedData?.[0] == null ||
    restaurantData == null ||
    hotelPageData == null ||
    restaurantData?.length < 1
  ) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      key: tempPath + "/" + context?.params?.pid + "/" + context?.params?.slug,
      data: fetchedData?.[0] ?? [],
      bannerTitle: fetchedData?.[0]?.pageBody?.items?.[0]?.title || "",
      bannerLogo:
        fetchedData?.[0]?.header?.[0]?.secondaryLogo?.asset?._ref || "",
      queryParams: queryParams || null,
      propertyData: hotelPageData || null,
      restaurantData: filteredData || null,
    },
  }
}
