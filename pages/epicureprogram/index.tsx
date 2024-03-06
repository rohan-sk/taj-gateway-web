import { useRouter } from "next/router"
import { useEffect } from "react"
import { getClient, urlFor } from "../../lib-sanity"
import { fetchWebPageSchema } from "../../schemas/webPageSchema"
import { fetchBreadSchema } from "../../schemas/breadCrumbSchema"
import { breadcrumbList } from "../../schemas/breadCrumbList"
import PageLayoutComponent from "../../layout/PageLayoutComponent"
import { fetchEpicurePageDetails, getPageQuery } from "../../lib/utils"
import STATICSEO from "../../components/staticSeo"
import { fetchOrganizationSchema } from "../../schemas/organizationSchema"

export default function Preview(props: any) {
  const router: any = useRouter()
  const title = props?.data?.pageBody?.seo?.title
  const description = props?.data?.pageBody?.seo?.description
  const logo = props?.data?.header?.[0]?.logo?.asset?._ref
    ? urlFor(props?.data?.header?.[0]?.logo?.asset?._ref)?.url()
    : ""
  const keywords = props?.data?.pageBody?.seo?.keywords
  const metaTags = props?.data?.pageBody?.seo?.metaTags
  const scripts = props?.data?.pageBody?.seo?.scripts
  const enableBreadCrumb =
    props?.data?.pageBody?.items?.filter((val: any) => val?.variant === "share")
      ?.length > 0

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
        scripts={scripts}
        webpageSchema={fetchWebPageSchema(title, description, logo)}
        organizationSchema={
          props?.data?.pageBody?.path === "hotels"
            ? fetchOrganizationSchema(title, description, logo)
            : undefined
        }
        breadCrumbSchema={
          enableBreadCrumb && fetchBreadSchema(breadcrumbList(router), router)
        }
      />
      <PageLayoutComponent {...props} />
    </>
  )
}

export async function getStaticProps(context: any) {
  let queryParams = context.params
  let epicureProgramData: any
  let tempPath = `/epicureprogram/details`
  const query = getPageQuery(tempPath)
  const epicureQuery = await fetchEpicurePageDetails("epicureprogram")
  let fetchedData: any
  try {
    epicureProgramData = await getClient(true).fetch(epicureQuery)
    fetchedData = await getClient(true).fetch(query, { tempPath })
  } catch (error) {
    console.log(error)
  }

  if (
    fetchedData?.[0] == null ||
    epicureProgramData == null ||
    epicureProgramData?.length < 1
  ) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      key: tempPath + context?.params?.index,
      data: fetchedData?.[0] ?? [],
      bannerTitle: fetchedData?.[0]?.pageBody?.items?.[0]?.title || "",
      bannerLogo:
        fetchedData?.[0]?.header?.[0]?.secondaryLogo?.asset?._ref || "",
      queryParams: queryParams || null,
      propertyData: null,
      epicureProgramData: epicureProgramData?.[0],
    },
  }
}
