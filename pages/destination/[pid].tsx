import { useRouter } from "next/router"
import {
  DestinationHighlightsRoute,
  countryRoute,
  destinationsRoute,
} from "../../features/property/ui/constants"
import PageLayoutComponent from "../../layout/PageLayoutComponent"
import { getClient, urlFor } from "../../lib-sanity"
import {
  fetchCountryDestination,
  fetchCountryDestinationWithIdentifier,
  fetchDestinationsIdentifier,
  getPageQuery,
} from "../../lib/utils"
import DYNAMICSEO from "../../components/dynamicSeo"
import { fetchWebPageSchema } from "../../schemas/webPageSchema"
import { fetchLocalBusinessSchema } from "../../schemas/localBusinessSchema"
import { fetchBreadSchema } from "../../schemas/breadCrumbSchema"
import { breadcrumbList } from "../../schemas/breadCrumbList"
import { DESTINATION_NAVIGATION_TABS } from "../../components/constants"

export default function Preview(props: any) {
  const router: any = useRouter()
  const { destinationData } = props
  const SEOData =
    props?.destinationDataType === "country"
      ? destinationData?.[0]
      : destinationData?.[0]?.seoData?.filter((val: any) => {
          return (
            val?.navItem === router?.query?.pid?.split("-in-")?.[0]?.replace(/-/g, "_") ||
            val?.navItem === router?.query?.pid?.split("-")?.[0]
          )
        })?.[0]
  const title = SEOData?.pageTitle
  const description = SEOData?.seoDescription
  const image = SEOData?.image?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref
    ? urlFor(
        SEOData?.image?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref
      )?.url()
    : ""
  const logo = props?.data?.header?.[0]?.logo?.asset?._ref
    ? urlFor(props?.data?.header?.[0]?.logo?.asset?._ref)?.url()
    : ""
  const keywords = SEOData?.seoKeywords
  const enableBreadCrumb = props?.data?.pageBody?.items?.filter((val: any) => val?.variant === "share")?.length > 0

  return (
    <>
      <DYNAMICSEO
        title={title}
        description={description}
        url={global?.window?.location?.href}
        image={image}
        keywords={keywords}
        webpageSchema={fetchWebPageSchema(title, description, logo)}
        localBusinessSchema={
          router?.query?.pid?.split("-in-")?.[0] === "hotels"
            ? fetchLocalBusinessSchema(title, image)
            : null
        }
        breadCrumbSchema={enableBreadCrumb && fetchBreadSchema(breadcrumbList(router), router)}
      />
      <PageLayoutComponent {...props} />
    </>
  )
}

export async function getStaticPaths() {
  const paths = [
    {
      params: { pid: "hotels", pageId: 1 },
    },
  ]
  return {
    paths,
    fallback: true, // false or 'blocking'
  }
}

export async function getStaticProps(context: any) {
  let destinationData: any
  let queryParams = context.params
  let countryCheck
  let routeCheck: any = []

  if (queryParams?.pid?.includes("hotels-in-")) {
    const identifyDestinationType = fetchCountryDestination(
      queryParams?.pid?.split("-in-")?.[1]?.toLowerCase()
    )
    countryCheck = await getClient(true).fetch(identifyDestinationType)
  }

  let layoutRoute =
    countryCheck?.length > 0
      ? countryRoute
      : queryParams?.pid?.includes(`${DestinationHighlightsRoute}-`)
      ? `${DestinationHighlightsRoute}`
      : queryParams?.pid?.split("-in-")?.[0]
  let tempPath = `/destinations/${layoutRoute}`

  if (countryCheck?.length > 0) {
    const destinationQuery = fetchCountryDestinationWithIdentifier(
      queryParams?.pid?.split("-in-")?.[1]
    )
    destinationData = await getClient(true).fetch(destinationQuery)
    routeCheck = destinationData
  } else {
    const destinationQuery = fetchDestinationsIdentifier(
      queryParams?.pid?.includes(`${DestinationHighlightsRoute}-`)
        ? queryParams?.pid
            ?.split(`${DestinationHighlightsRoute}-`)?.[1]
        : queryParams?.pid?.split("-in-")?.[1]
    )
    destinationData = await getClient(true).fetch(destinationQuery)
    let arr = DESTINATION_NAVIGATION_TABS.filter((val: any) => {
      return destinationData?.[0]?.destinationNavigation?.[val?.key] === true
    })

    routeCheck = arr?.filter((val: any) => {
      return (
        val?.key?.toLowerCase()?.replace(/_/g, "-") === layoutRoute ||
        val?.url?.toLowerCase()?.split("/")?.[1] === layoutRoute
      )
    })
  }

  const query = getPageQuery(tempPath)
  const fetchedData = await getClient(true).fetch(query, { tempPath })

  if (
    fetchedData?.[0] == null ||
    destinationData == null ||
    destinationData?.length < 1 ||
    routeCheck?.length < 1
  ) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      key: tempPath + context?.params?.pid,
      data: fetchedData?.[0] ?? [],
      bannerTitle: fetchedData?.[0]?.pageBody?.items?.[0]?.title || "",
      bannerLogo:
        fetchedData?.[0]?.header?.[0]?.secondaryLogo?.asset?._ref || "",
      queryParams: queryParams || null,
      destinationData: destinationData,
      destinationDataType: countryCheck?.length > 0 ? "country" : "city",
    },
  }
}
