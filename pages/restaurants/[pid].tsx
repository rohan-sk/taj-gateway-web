import { useRouter } from "next/router";
import STATICSEO from "../../components/staticSeo";
import PageLayoutComponent from "../../layout/PageLayoutComponent";
import { getClient, urlFor } from "../../lib-sanity";
import { fetchRestaurantBrand, getPageQuery } from "../../lib/utils";
import { fetchOrganizationSchema } from "../../schemas/organizationSchema";
import { fetchWebPageSchema } from "../../schemas/webPageSchema";
import { breadcrumbList } from "../../schemas/breadCrumbList";
import { fetchBreadSchema } from "../../schemas/breadCrumbSchema";
import DYNAMICSEO from "../../components/dynamicSeo";

export default function Preview(props: any) {
  const router = useRouter()
  const title = props?.brandRestaurantData?.pageTitle;
  const description = props?.brandRestaurantData?.seoDescription;
  const logo = props?.data?.header?.[0]?.logo?.asset?._ref
    ? urlFor(props?.data?.header?.[0]?.logo?.asset?._ref)?.url()
    : "";
  const keywords = props?.brandRestaurantData?.seoKeywords;
  const image = props?.brandRestaurantData?.thumbnail?.[0]?.imageAsset?.image?.[0]
  ?.asset?._ref
  ? urlFor(
      props?.brandRestaurantData?.thumbnail?.[0]?.imageAsset?.image?.[0]?.asset?._ref
    )?.url()
  : "";
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
      params: { pid: "machan", pageId: 1},
    },
  ];
  return {
    paths,
    fallback: true, // false or 'blocking'
  };
}

export async function getStaticProps(context: any) {
  let restaurantData;
  let queryParams = context.params;
  let tempPath = `/restaurants/brand`;

  const query = getPageQuery(tempPath);
  const fetchedData = await getClient(true).fetch(query, { tempPath });

  const restaurantQuery = fetchRestaurantBrand(queryParams?.pid);
  restaurantData = await getClient(true).fetch(restaurantQuery);

  if (fetchedData?.[0] == null || restaurantData == null) {
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
      brandRestaurantData: restaurantData?.[0],
    },
  };
}
