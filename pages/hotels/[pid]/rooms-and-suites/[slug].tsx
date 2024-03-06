import { useRouter } from "next/router"
import { getClient, urlFor } from "../../../../lib-sanity"
import { breadcrumbList } from "../../../../schemas/breadCrumbList"
import { fetchWebPageSchema } from "../../../../schemas/webPageSchema"
import { fetchBreadSchema } from "../../../../schemas/breadCrumbSchema"
import PageLayoutComponent from "../../../../layout/PageLayoutComponent"
import { getPageQuery, fetchHotelRoomsDataWithIdentifier } from "../../../../lib/utils"
import STATICSEO from "../../../../components/staticSeo"
import { ROUTES } from "../../../../utils/routes"

export default function Preview(props: any) {
  const router = useRouter()
  const title = props?.data?.pageBody?.seo?.title
  const description = props?.data?.pageBody?.seo?.description
  const logo = props?.data?.header?.[0]?.logo?.asset?._ref
    ? urlFor(props?.data?.header?.[0]?.logo?.asset?._ref).url()
    : ""
  const keywords = props?.data?.pageBody?.seo?.keywords
  const metaTags = props?.data?.pageBody?.seo?.metaTags
  const scripts = props?.data?.pageBody?.seo?.scripts
  const enableBreadCrumb = props?.data?.pageBody?.items?.filter((val: any) => val?.variant === "share")?.length > 0

  return (
    <>
      <STATICSEO
        title={title}
        url={global?.window?.location?.href}
        metaTags={metaTags}
        keywords={keywords}
        scripts={scripts}
        webpageSchema={fetchWebPageSchema(title, description, logo)}
        organizationSchema={undefined}
        breadCrumbSchema={enableBreadCrumb && fetchBreadSchema(breadcrumbList(router), router)}
      />
      <PageLayoutComponent {...props} />
    </>
  )
}

export const getServerSideProps = async (context: any) => {
  let propertyData
  let tempPath = ROUTES.WITHOUTSEO_FOR_ROUTING.BOOKING.CART
  let queryParams = context.query
  const isMobile = /(iPhone|iPad|iPod|Android)/i.test(context.req.headers["user-agent"] || "")
  const query = getPageQuery(tempPath)
  const fetchedData = await getClient(true).fetch(query, { tempPath })
  const hotelQuery = fetchHotelRoomsDataWithIdentifier(context?.query?.pid)
  propertyData = await getClient(true).fetch(hotelQuery)

  if (fetchedData?.[0] == null) {
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
      isMobile: isMobile,
      propertyData: propertyData,
    },
  }
}
