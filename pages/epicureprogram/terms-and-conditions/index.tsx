import { useRouter } from "next/router"
import { useEffect } from "react"
import { getClient } from "../../../lib-sanity"
import { fetchBreadSchema } from "../../../schemas/breadCrumbSchema"
import { breadcrumbList } from "../../../schemas/breadCrumbList"
import PageLayoutComponent from "../../../layout/PageLayoutComponent"
import { fetchEpicureTermsAndConditions, getPageQuery } from "../../../lib/utils"
import STATICSEO from "../../../components/staticSeo"

export default function Preview(props: any) {
  const router: any = useRouter()
  const title = props?.data?.pageBody?.seo?.title
  const keywords = props?.data?.pageBody?.seo?.keywords
  const metaTags = props?.data?.pageBody?.seo?.metaTags
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
      <STATICSEO
        title={title}
        url={global?.window?.location?.href}
        metaTags={metaTags}
        keywords={keywords}
        breadCrumbSchema={enableBreadCrumb && fetchBreadSchema(breadcrumbList(router), router)}
      />
      <PageLayoutComponent {...props} />
    </>
  )
}

export async function getStaticProps(context: any) {
  let queryParams = context.params
  let epicureTermsAndConditionsData: any
  let tempPath = `/epicureprogram/terms-and-conditions`
  const query = getPageQuery(tempPath)
  const epTermAndConditionsQuery = fetchEpicureTermsAndConditions("epicureprogram")
  let fetchedData: any
  try {
    epicureTermsAndConditionsData = await getClient(true).fetch(epTermAndConditionsQuery)
    fetchedData = await getClient(true).fetch(query, { tempPath })
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
      key: tempPath + context?.params?.index,
      data: fetchedData?.[0] ?? [],
      queryParams: queryParams || null,
      epicureTermsAndConditionsData: epicureTermsAndConditionsData?.[0],
    },
  }
}
