import { useRouter } from "next/router"
import STATICSEO from "../components/staticSeo"
import PageLayoutComponent from "../layout/PageLayoutComponent"
import { urlFor, getClient } from "../lib-sanity"
import { getPageQuery, fetchDestinations } from "../lib/utils"
import { breadcrumbList } from "../schemas/breadCrumbList"
import { fetchBreadSchema } from "../schemas/breadCrumbSchema"
import { fetchWebPageSchema } from "../schemas/webPageSchema"

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
        breadCrumbSchema={enableBreadCrumb && fetchBreadSchema(breadcrumbList(router), router)}
      />
      <PageLayoutComponent {...props} />
    </>
  )
}
export async function getStaticProps(context: any) {
  let queryParams = context.params
  let tempPath = `/destinations`
  let destinationData

  const query = getPageQuery(tempPath)
  const fetchedData = await getClient(true).fetch(query, { tempPath })

  const destinationQuery = fetchDestinations()
  destinationData = await getClient(true).fetch(destinationQuery)

  if (fetchedData?.[0] == null || destinationData == null) {
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
      destinationData: destinationData,
    },
  }
}
