import { useRouter } from "next/router";
import PageLayoutComponent from "../../../layout/PageLayoutComponent";
import { urlFor, getClient } from "../../../lib-sanity";
import { getPageQuery, fetchHolidayOffers } from "../../../lib/utils";
import { breadcrumbList } from "../../../schemas/breadCrumbList";
import { fetchBreadSchema } from "../../../schemas/breadCrumbSchema";
import { fetchWebPageSchema } from "../../../schemas/webPageSchema";
import DYNAMICSEO from "../../../components/dynamicSeo";


export default function Preview(props: any) {
  const {holidayData} = props
  const router = useRouter()
  const title = holidayData?.pageTitle
  const description = holidayData?.seoDescription
  const image = holidayData?.thumbnail?.[0]?.imageAsset
    ?.image?.[0]?.asset?._ref
    ? urlFor(
        holidayData?.thumbnail?.[0]?.imageAsset
          ?.image?.[0]?.asset?._ref
      )?.url()
    : ""
  const logo = props?.data?.header?.[0]?.logo?.asset?._ref
    ? urlFor(props?.data?.header?.[0]?.logo?.asset?._ref).url()
    : ""
  const keywords = holidayData?.seoKeywords
  const enableBreadCrumb = props?.data?.pageBody?.items?.filter((val: any) => val?.variant === "share")?.length > 0

  return (
    <>
      <DYNAMICSEO
        title={title}
        description={description}
        url={global?.window?.location?.href}
        image={image}
        keywords={keywords}
        webpageSchema={fetchWebPageSchema(title, description, logo)}
        breadCrumbSchema={enableBreadCrumb && fetchBreadSchema(breadcrumbList(router), router)}
      />
      <PageLayoutComponent {...props} />
    </>
  );
}

export async function getStaticPaths() {
  const paths = [
    {
      params: { pid: "royal-india", pageId: 1 },
    },
  ];
  return {
    paths,
    fallback: true, // false or 'blocking'
  };
}

export async function getStaticProps(context: any) {
  let queryParams = context.params;
  let tempPath = `/taj-holidays/experiences`;
  let holidayData;

  const query = getPageQuery(tempPath);
  const fetchedData = await getClient(true).fetch(query, { tempPath });

  const holidayInfo = fetchHolidayOffers(queryParams?.pid);
  holidayData = await getClient(true).fetch(holidayInfo);


  if (fetchedData?.[0] == null || holidayData == null) {
    return {
      notFound: true,
    };
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
      holidayData: holidayData
    },
  };
}
