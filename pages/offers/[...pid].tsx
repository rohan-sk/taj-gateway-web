import { basePageServerSide } from "../../lib/getPageSchema"
import PageLayoutComponent from "../../layout/PageLayoutComponent"
import { urlFor } from "../../lib-sanity"
import DYNAMICSEO from "../../components/dynamicSeo"
import { fetchWebPageSchema } from "../../schemas/webPageSchema"
import { fetchOfferSchema } from "../../schemas/offerSchema"
import { useRouter } from "next/router"
import { breadcrumbList } from "../../schemas/breadCrumbList"
import { fetchBreadSchema } from "../../schemas/breadCrumbSchema"

export default function Preview(props: any) {
  const { offersData } = props
  const router = useRouter()
  const title = offersData?.data?.pageTitle
  const description = offersData?.data?.seoDescription
  const image = offersData?.data?.thumbnail?.[0]?.imageAsset?.image?.[0]?.asset
    ?._ref
    ? urlFor(
        offersData?.data?.thumbnail?.[0]?.imageAsset?.image?.[0]?.asset?._ref
      )?.url()
    : ""
  const logo = props?.data?.header?.[0]?.logo?.asset?._ref
    ? urlFor(props?.data?.header?.[0]?.logo?.asset?._ref)?.url()
    : ""
  const keywords = offersData?.data?.seoKeywords
  const enableBreadCrumb = props?.data?.pageBody?.items?.filter((val: any) => val?.variant === "share")?.length > 0


  return (
    <>
      {offersData?.data?.offerType !== "cug" && (
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
      )}
      <PageLayoutComponent {...props} />
    </>
  )
}
export const getServerSideProps = async (context: any) => {
  const baseProps = await basePageServerSide(
    context,
    context?.query?.pid?.length > 0 ? `/offer-detail` : "/offers",
    false,
    true
  )
  return baseProps
}
