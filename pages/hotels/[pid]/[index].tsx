import PageLayoutComponent from "../../../layout/PageLayoutComponent"
import {
  RoomsAndSuitesRoute,
  defaultOverviewRoute,
  hotelRoute,
} from "../../../features/property/ui/constants"
import { getClient, urlFor } from "../../../lib-sanity"
import { getPageQuery, fetchHotelDataWithIdentifier } from "../../../lib/utils"
import { useRouter } from "next/router"
import DYNAMICSEO from "../../../components/dynamicSeo"
import { fetchHotelSchema } from "../../../schemas/hotelSchema"
import { fetchWebPageSchema } from "../../../schemas/webPageSchema"
import { breadcrumbList } from "../../../schemas/breadCrumbList"
import { fetchBreadSchema } from "../../../schemas/breadCrumbSchema"
import { HOTEL_NAVIGATION_TABS } from "../../../components/constants"

export default function Preview(props: any) {
  const { propertyData } = props
  const router: any = useRouter()
  const title = propertyData?.[router?.query?.index]?.pageTitle
  const description = propertyData?.[router?.query?.index]?.description
  const image = propertyData?.[router?.query?.index]?.image
    ? urlFor(propertyData?.[router?.query?.index]?.image)?.url()
    : ""
  const logo = props?.data?.header?.[0]?.logo?.asset?._ref
    ? urlFor(props?.data?.header?.[0]?.logo?.asset?._ref)?.url()
    : ""
  const keywords = propertyData?.[router?.query?.index]?.seoKeywords
  const enableBreadCrumb = props?.data?.pageBody?.items?.filter((val: any) => val?.variant === "share")?.length > 0


  return (
    <>
      <DYNAMICSEO
        title={title}
        description={description}
        url={global?.window?.location?.href}
        image={image}
        keywords={keywords}
        structureData={
          router?.query?.index === RoomsAndSuitesRoute
            ? fetchHotelSchema(propertyData, image, router?.query?.index)
            : null
        }
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
      params: { pid: defaultOverviewRoute, pageId: 1, index: "overview" },
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
  let layoutRoute = queryParams?.index || defaultOverviewRoute
  let tempPath = `/${hotelRoute}/${layoutRoute}`

  const query = getPageQuery(tempPath)
  const fetchedData = await getClient(true).fetch(query, { tempPath })

  const hotelData = fetchHotelDataWithIdentifier(queryParams?.pid)
  hotelPageData = await getClient(true).fetch(hotelData)

  let arr = HOTEL_NAVIGATION_TABS.filter((val: any) => {
    return hotelPageData?.hotelNavigation?.[val?.key] === true
  })

  let routeCheck = arr?.filter((val: any) => {
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
      key: tempPath + "/" + context?.params?.pid + "/" + context?.params?.index,
      data: fetchedData?.[0] ?? [],
      bannerTitle: fetchedData?.[0]?.pageBody?.items?.[0]?.title || "",
      bannerLogo:
        fetchedData?.[0]?.header?.[0]?.secondaryLogo?.asset?._ref || "",
      queryParams: queryParams || null,
      propertyData: hotelPageData,
    },
  }
}
