import { useRouter } from "next/router"
import { useEffect } from "react"
import DYNAMICSEO from "../../../components/dynamicSeo"
import PageLayoutComponent from "../../../layout/PageLayoutComponent"
import { urlFor, getClient } from "../../../lib-sanity"
import { fetchEpicureBankDetails, getPageQuery } from "../../../lib/utils"
import { breadcrumbList } from "../../../schemas/breadCrumbList"
import { fetchBreadSchema } from "../../../schemas/breadCrumbSchema"
import { fetchWebPageSchema } from "../../../schemas/webPageSchema"

export default function Preview(props: any) {
  const router: any = useRouter()
  const { epicureData } = props
  const title = epicureData?.pageTitle
  const description = epicureData?.seoDescription

  const image = epicureData?.image?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref
    ? urlFor(epicureData?.image?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref)?.url()
    : ""

  const logo = props?.data?.header?.[0]?.logo?.asset?._ref
    ? urlFor(props?.data?.header?.[0]?.logo?.asset?._ref)?.url()
    : ""

  const keywords = epicureData?.seoKeywords
  const enableBreadCrumb = props?.data?.pageBody?.items?.filter((val: any) => val?.variant === "share")?.length > 0

  useEffect(() => {
    const handleGotoTop = () => {
      // Scroll to the top of the page when the route changes
      window.scrollTo(0, 0)
    }

    // Subscribe to route changes
    router.events.on("routeChangeComplete", handleGotoTop)

    // Unsubscribe from the event when the component is unmounted
    return () => {
      router.events.off("routeChangeComplete", handleGotoTop)
    }
  }, [router.events])
  return (
    <>
      <DYNAMICSEO
        title={title}
        description={description}
        url={global?.window?.location?.href}
        image={image}
        keywords={keywords}
        webpageSchema={fetchWebPageSchema(title, description, logo)}
        localBusinessSchema={null}
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
        slug: "axis",
        pageId: 1,
        pid: "bank",
      },
    },
  ]
  return {
    paths,
    fallback: true, // false or 'blocking'
  }
}

export async function getStaticProps(context: any) {
  let epicureData: any
  let queryParams = context.params
  let tempPath = `/epicureprogram/bank`
  const query = getPageQuery(tempPath)
  const epQuery = await fetchEpicureBankDetails(queryParams?.slug)

  let fetchedData: any
  try {
    fetchedData = await getClient(true).fetch(query, { tempPath })
    epicureData = await getClient(true).fetch(epQuery)
  } catch (error) {
    console.log(error)
  }

  if (fetchedData?.[0] == null || epicureData == null || epicureData?.length < 1) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      key: tempPath + context?.params?.pid,
      data: fetchedData?.[0] ?? [],
      bannerTitle: fetchedData?.[0]?.pageBody?.items?.[0]?.title || "",
      bannerLogo: fetchedData?.[0]?.header?.[0]?.secondaryLogo?.asset?._ref || "",
      queryParams: queryParams || null,
      epicureData: epicureData?.[0],
    },
  }
}
