import { useRouter } from "next/router"
import { useEffect } from "react"
import DYNAMICSEO from "../../../components/dynamicSeo"
import PageLayoutComponent from "../../../layout/PageLayoutComponent"
import { urlFor, getClient } from "../../../lib-sanity"
import { fetchEpicureTermsAndConditions, getPageQuery } from "../../../lib/utils"
import { breadcrumbList } from "../../../schemas/breadCrumbList"
import { fetchBreadSchema } from "../../../schemas/breadCrumbSchema"

export default function Preview(props: any) {
  const router: any = useRouter()
  const { epicureTermsAndConditionsData } = props
  const title = epicureTermsAndConditionsData?.pageTitle
  const description = epicureTermsAndConditionsData?.seoDescription

  const image = epicureTermsAndConditionsData?.image?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref
    ? urlFor(epicureTermsAndConditionsData?.image?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref)?.url()
    : ""

  const keywords = epicureTermsAndConditionsData?.seoKeywords
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
        pid: "terms-and-conditions",
      },
    },
  ]
  return {
    paths,
    fallback: true, // false or 'blocking'
  }
}

export async function getStaticProps(context: any) {
  let epicureTermsAndConditionsData: any
  let queryParams = context.params
  let tempPath = `/epicureprogram/terms-and-conditions`
  const query = getPageQuery(tempPath)

  const epBankTermAndConditionsQuery = await fetchEpicureTermsAndConditions(queryParams?.slug)

  let fetchedData: any
  try {
    fetchedData = await getClient(true).fetch(query, { tempPath })
    epicureTermsAndConditionsData = await getClient(true).fetch(epBankTermAndConditionsQuery)
  } catch (error) {
    console.log(error)
  }
  if (fetchedData?.[0] == null || epicureTermsAndConditionsData == null || epicureTermsAndConditionsData?.length < 1) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      key: tempPath + context?.params?.pid,
      data: fetchedData?.[0] ?? [],
      queryParams: queryParams || null,
      epicureTermsAndConditionsData: epicureTermsAndConditionsData?.[0],
    },
  }
}
