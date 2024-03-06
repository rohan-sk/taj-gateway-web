import PageLayoutComponent from "../../layout/PageLayoutComponent"
import { getClient, urlFor } from "../../lib-sanity"
import { getPageQuery } from "../../lib/utils"
import { getGiftCardDetailsbyIdentifier } from "../../utils/fetchGiftCardDetails"
import { useRouter } from "next/router"
import DYNAMICSEO from "../../components/dynamicSeo"
import { breadcrumbList } from "../../schemas/breadCrumbList"
import { fetchBreadSchema } from "../../schemas/breadCrumbSchema"
import { fetchWebPageSchema } from "../../schemas/webPageSchema"
import { useEffect } from "react"

export default function Preview(props: any) {
  const router: any = useRouter()
  const { gcData } = props
  const title = gcData?.pageTitle
  const description = gcData?.seoDescription
  const image = gcData?.image?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref
    ? urlFor(gcData?.image?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref)?.url()
    : ""
  const logo = props?.data?.header?.[0]?.logo?.asset?._ref
    ? urlFor(props?.data?.header?.[0]?.logo?.asset?._ref)?.url()
    : ""
  const keywords = gcData?.seoKeywords
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
        pid: "j-wellness",
        pageId: 1,
      },
    },
  ]
  return {
    paths,
    fallback: true, // false or 'blocking'
  }
}

export async function getStaticProps(context: any) {
  let gcData: any
  let queryParams = context.params
  let tempPath = `/gc/identifier`
  const query = getPageQuery(tempPath)

  let fetchedData: any
  try {
    gcData = await getGiftCardDetailsbyIdentifier(queryParams?.pid)
    fetchedData = await getClient(true).fetch(query, { tempPath })
  } catch (error) {
    console.log(error)
  }

  if (fetchedData?.[0] == null || gcData == null || gcData?.length < 1) {
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
      gcData: gcData?.[0],
    },
  }
}
