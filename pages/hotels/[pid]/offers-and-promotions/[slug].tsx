import PageLayoutComponent from "../../../../layout/PageLayoutComponent"
import {
  defaultHotelOfferOverview,
  defaultOverviewRoute,
  hotelRoute,
  offersRoute,
} from "../../../../features/property/ui/constants"
import path from "path"
import { getClient, urlFor } from "../../../../lib-sanity"
import {
  getPageQuery,
  fetchHotelDataWithIdentifier,
  fetchOffersDataWithFilters,
  fetchHotelSpecificOffersDetailsData,
} from "../../../../lib/utils"
import DYNAMICSEO from "../../../../components/dynamicSeo"
import { fetchOfferSchema } from "../../../../schemas/offerSchema"
import { fetchWebPageSchema } from "../../../../schemas/webPageSchema"
import { useRouter } from "next/router"
import { breadcrumbList } from "../../../../schemas/breadCrumbList"
import { fetchBreadSchema } from "../../../../schemas/breadCrumbSchema"
import { SINGLE_PACKAGE_OFFERTYPE } from "../../../../components/constants"

export default function Preview(props: any) {
  const { offersData } = props
  const router = useRouter()
  const title = offersData?.data?.hotels?.pageTitle ?? offersData?.data?.pageTitle
  const description = offersData?.data?.hotels?.seoDescription ?? offersData?.data?.seoDescription
  const image = offersData?.data?.hotels?.thumbnail?.[0]?.imageAsset?.image?.[0]
  ?.asset?._ref
  ? urlFor(
    offersData?.data?.hotels?.thumbnail?.[0]?.imageAsset?.image?.[0]?.asset
        ?._ref
    )?.url()
  : offersData?.data?.thumbnail?.[0]?.imageAsset?.image?.[0]
    ?.asset?._ref
    ? urlFor(
        offersData?.data?.thumbnail?.[0]?.imageAsset?.image?.[0]?.asset
          ?._ref
      )?.url()
    : ""
  const logo = props?.data?.header?.[0]?.logo?.asset?._ref
    ? urlFor(props?.data?.header?.[0]?.logo?.asset?._ref).url()
    : ""
  const keywords = offersData?.data?.hotels?.seoKeywords ?? offersData?.data?.seoKeywords
  const enableBreadCrumb = props?.data?.pageBody?.items?.filter((val: any) => val?.variant === "share")?.length > 0

  return (
    <>
      <>
        <DYNAMICSEO
          title={title}
          description={description}
          url={global?.window?.location?.href}
          image={image}
          keywords={keywords}
          structureData={fetchOfferSchema(
            offersData?.data?.hotels
          )}
          webpageSchema={fetchWebPageSchema(title, description, logo)}
          breadCrumbSchema={enableBreadCrumb && fetchBreadSchema(breadcrumbList(router), router)}
        />
        <PageLayoutComponent {...props} />
      </>
    </>
  )
}

export async function getStaticPaths() {
  const paths = [
    {
      params: {
        slug: defaultOverviewRoute,
        pageId: 1,
        pid: "overview",
        index: "offers-and-promotions",
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
  let queryParams = context.params
  let offersDataWithFilter: any = { data: {}, filters: [] }
  const hotelData: any = fetchHotelDataWithIdentifier(queryParams?.pid)
  hotelPageData = await getClient(true).fetch(hotelData)
  const offersQuery = await fetchHotelSpecificOffersDetailsData(
    context?.params?.slug,
    hotelPageData?._id
  )
  const offersQueryFilter = fetchOffersDataWithFilters(context?.params?.slug)
  offersDataWithFilter.data = await getClient(true).fetch(offersQuery)
  offersDataWithFilter.filters = await getClient(true).fetch(offersQueryFilter)
  let layoutRoute =
    offersDataWithFilter?.data?.offerType === "hotel"
      ? offersDataWithFilter?.data?.packageType !== SINGLE_PACKAGE_OFFERTYPE
        ? `${defaultHotelOfferOverview}-multi-package`
        : defaultHotelOfferOverview
      : offersDataWithFilter?.data?.packageType !== SINGLE_PACKAGE_OFFERTYPE
      ? `${defaultOverviewRoute}-multi-package`
      : defaultOverviewRoute
  let tempPath = queryParams?.slug
    ? `/${hotelRoute}/${offersRoute}/${layoutRoute}`
    : path
  const query = getPageQuery(tempPath)
  const fetchedData = await getClient(true).fetch(query, { tempPath })
  if (
    fetchedData?.[0] == null ||
    offersDataWithFilter.data == null ||
    hotelPageData == null
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
      queryParams: queryParams,
      propertyData: hotelPageData,
      offersData: offersDataWithFilter ?? {},
    },
  }
}
