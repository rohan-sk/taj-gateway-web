import PageLayoutComponent from "../../layout/PageLayoutComponent"
import {
  defaultOverviewRoute,
  hotelRoute,
} from "../../features/property/ui/constants"
import { getClient, urlFor } from "../../lib-sanity"
import { getPageQuery, fetchHotelDataWithIdentifier } from "../../lib/utils"
import DYNAMICSEO from "../../components/dynamicSeo"
import { fetchLocalBusinessSchema } from "../../schemas/localBusinessSchema"
import { fetchHotelSchema } from "../../schemas/hotelSchema"
import { fetchWebPageSchema } from "../../schemas/webPageSchema"
import { useRouter } from "next/router"
import { fetchBreadSchema } from "../../schemas/breadCrumbSchema"
import { breadcrumbList } from "../../schemas/breadCrumbList"
import { HOTEL_NAVIGATION_TABS } from "../../components/constants"

export default function Preview(props: any) {
  const { propertyData } = props
  const router = useRouter()
  const title = propertyData?.[defaultOverviewRoute]?.pageTitle
  const description = propertyData?.[defaultOverviewRoute]?.description
  const image = propertyData?.[defaultOverviewRoute]?.image
    ? urlFor(propertyData?.[defaultOverviewRoute]?.image).url()
    : ""
  const logo = props?.data?.header?.[0]?.logo?.asset?._ref
    ? urlFor(props?.data?.header?.[0]?.logo?.asset?._ref).url()
    : ""
  const keywords = propertyData?.[defaultOverviewRoute]?.seoKeywords
  const enableBreadCrumb = props?.data?.pageBody?.items?.filter((val: any) => val?.variant === "share")?.length > 0

  return (
    <>
      <DYNAMICSEO
        title={title}
        description={description}
        url={global?.window?.location?.href}
        image={image}
        keywords={keywords}
        structureData={fetchHotelSchema(
          propertyData,
          image,
          defaultOverviewRoute
        )}
        webpageSchema={fetchWebPageSchema(title, description, logo)}
        localBusinessSchema={fetchLocalBusinessSchema(
          title,
          image,
          propertyData
        )}
        breadCrumbSchema={enableBreadCrumb && fetchBreadSchema(breadcrumbList(router), router)}
      />
      <PageLayoutComponent {...props} />
    </>
  )
}

export async function getStaticPaths() {
  const paths = [
    {
      params: { pid: defaultOverviewRoute, pageId: 1 },
    },
  ]
  return {
    paths,
    fallback: true, // false or 'blocking'
  }
}

export async function getStaticProps(context: any) {
  let hotelPageData: any
  let queryParams = context.params
  let layoutRoute = defaultOverviewRoute
  let tempPath = `/${hotelRoute}/${layoutRoute}`

  const query = getPageQuery(tempPath)
  const fetchedData = await getClient(true).fetch(query, { tempPath })

  const hotelData = fetchHotelDataWithIdentifier(queryParams?.pid)
  hotelPageData = await getClient(true).fetch(hotelData)

  let routeCheck = await HOTEL_NAVIGATION_TABS?.filter((val: any) => {
    return hotelPageData?.hotelNavigation?.[val?.key] === true
  })?.filter((val: any) => {
    return val?.key?.toLowerCase()?.replace(/_/g, "-") === layoutRoute
  })

  if (
    fetchedData?.[0] == null ||
    hotelPageData == null ||
    routeCheck?.length < 1
  ) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      key: tempPath + context?.query?.pid,
      data: fetchedData?.[0] ?? [],
      bannerTitle: fetchedData?.[0]?.pageBody?.items?.[0]?.title || "",
      bannerLogo:
        fetchedData?.[0]?.header?.[0]?.secondaryLogo?.asset?._ref || "",
      queryParams: queryParams || null,
      propertyData: hotelPageData,
    },
  }
}
