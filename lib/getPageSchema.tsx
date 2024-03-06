import { SEB_PACKAGE_OFFERTYPE, SINGLE_PACKAGE_OFFERTYPE } from "../components/constants"
import { getClient } from "../lib-sanity"
import { getPageQuery, fetchVouchersData, fetchOffersData, fetchOffersDataWithFilters } from "./utils"

const getServerSideProps = async (
  context: any,
  path: any,
  isPropertyJourney: boolean = false,
  isFromOffers: boolean = false,
  isFromVouchers: boolean = false,
) => {
  const isMobile = /(iPhone|iPad|iPod|Android)/i.test(context.req.headers["user-agent"] || "")
  let queryParams = context.query
  let tempPath = path
  let offersDataWithFilter: any = { data: {}, filters: [] }
  let vouchersData
  if (isFromOffers) {
    const offersQuery = fetchOffersData(context.query?.pid?.[context.query?.pid?.length - 1])
    const offersQueryFilter = fetchOffersDataWithFilters(context.query?.pid?.[context.query?.pid?.length - 1])
    offersDataWithFilter.data = await getClient(true).fetch(offersQuery)
    offersDataWithFilter.filters = await getClient(true).fetch(offersQueryFilter)
    if (offersDataWithFilter.data?.packageType === SEB_PACKAGE_OFFERTYPE) {
      tempPath = "/seb-offer-detail"
    } else if (offersDataWithFilter.data?.packageType !== SINGLE_PACKAGE_OFFERTYPE) {
      tempPath = "/offer-detail-multi-package"
    }
  }
  if (isFromVouchers) {
    const vouchersQuery = fetchVouchersData(context.query?.pid?.[context.query?.pid?.length - 1])
    vouchersData = await getClient(true).fetch(vouchersQuery)
  }
  const query = getPageQuery(tempPath)
  const fetchedData = await getClient(true).fetch(query, { tempPath })

  if (fetchedData?.[0] == null || offersDataWithFilter.data == null) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      key: tempPath + context?.query?.pid,
      data: fetchedData?.[0] ?? [],
      bannerTitle: fetchedData?.[0]?.pageBody?.items?.[0]?.title || "",
      bannerLogo: fetchedData?.[0]?.header?.[0]?.secondaryLogo?.asset?._ref || "",
      queryParams: queryParams,
      offersData: offersDataWithFilter ?? {},
      vouchersData: vouchersData ?? {},
      isMobile: isMobile,
    },
  }
}

export { getServerSideProps as basePageServerSide }
