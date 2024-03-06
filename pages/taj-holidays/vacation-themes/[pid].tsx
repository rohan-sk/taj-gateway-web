import { useRouter } from "next/router"
import DYNAMICSEO from "../../../components/dynamicSeo"
import PageLayoutComponent from "../../../layout/PageLayoutComponent"
import { getClient, urlFor } from "../../../lib-sanity"
import { breadcrumbList } from "../../../schemas/breadCrumbList"
import { fetchBreadSchema } from "../../../schemas/breadCrumbSchema"
import { fetchOfferSchema } from "../../../schemas/offerSchema"
import { fetchWebPageSchema } from "../../../schemas/webPageSchema"
import {
  fetchOffersData,
  fetchOffersDataWithFilters,
  getPageQuery,
} from "../../../lib/utils"
import { SINGLE_PACKAGE_OFFERTYPE } from "../../../components/constants"

export default function Preview(props: any) {
  const { offersData } = props
  const router = useRouter()
  const title = offersData?.data?.pageTitle
  const description = offersData?.data?.seoDescription
  const image = offersData?.data?.thumbnail?.[0]?.imageAsset
    ?.image?.[0]?.asset?._ref
    ? urlFor(
        offersData?.data?.thumbnail?.[0]?.imageAsset
          ?.image?.[0]?.asset?._ref
      )?.url()
    : ""
  const logo = props?.data?.header?.[0]?.logo?.asset?._ref
    ? urlFor(props?.data?.header?.[0]?.logo?.asset?._ref).url()
    : ""
  const keywords = offersData?.data?.seoKeywords
  const enableBreadCrumb = props?.data?.pageBody?.items?.filter((val: any) => val?.variant === "share")?.length > 0


  return (
    <>
      <DYNAMICSEO
        title={title}
        description={description}
        url={global?.window?.location?.href}
        image={image}
        keywords={keywords}
        structureData={fetchOfferSchema(offersData?.data)}
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
      params: { pid: "royal-spa-experiences-offer", pageId: 1 },
    },
  ]
  return {
    paths,
    fallback: true, // false or 'blocking'
  }
}

export async function getStaticProps(context: any) {
  let queryParams = context.params
  let tempPath = `/offer-detail`
  let offersDataWithFilter: any = { data: {}, filters: [] }
  const query = getPageQuery(tempPath)
  const fetchedData = await getClient(true).fetch(query, { tempPath })
  const offersQuery = fetchOffersData(queryParams?.pid)
  const offersQueryFilter = fetchOffersDataWithFilters(queryParams?.pid)
  offersDataWithFilter.data = await getClient(true).fetch(offersQuery)
  offersDataWithFilter.filters = await getClient(true).fetch(offersQueryFilter)
  if (offersDataWithFilter.data?.packageType !== SINGLE_PACKAGE_OFFERTYPE) {
    tempPath = "/offer-detail-multi-package"
  }

  if (fetchedData?.[0] == null || offersDataWithFilter.data == null) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      key: tempPath,
      data: fetchedData?.[0] ?? [],
      bannerTitle: fetchedData?.[0]?.pageBody?.items?.[0]?.title || "",
      bannerLogo:
        fetchedData?.[0]?.header?.[0]?.secondaryLogo?.asset?._ref || "",
      queryParams: queryParams || null,
      propertyData: null,
      offersData: offersDataWithFilter ?? {},
    },
  }
}
