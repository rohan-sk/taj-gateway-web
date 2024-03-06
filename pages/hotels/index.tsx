import { useRouter } from "next/router";
import STATICSEO from "../../components/staticSeo";
import { hotelRoute } from "../../features/property/ui/constants";
import PageLayoutComponent from "../../layout/PageLayoutComponent";
import { getClient, urlFor } from "../../lib-sanity";
import { getPageQuery } from "../../lib/utils";
import { fetchOrganizationSchema } from "../../schemas/organizationSchema";
import { fetchWebPageSchema } from "../../schemas/webPageSchema";
import { fetchBreadSchema } from "../../schemas/breadCrumbSchema";
import { breadcrumbList } from "../../schemas/breadCrumbList";

export default function Preview(props: any) {
  const router = useRouter()
  const title = props?.data?.pageBody?.seo?.title;
  const description = props?.data?.pageBody?.seo?.description;
  const logo = props?.data?.header?.[0]?.logo?.asset?._ref
    ? urlFor(props?.data?.header?.[0]?.logo?.asset?._ref).url()
    : "";
  const keywords = props?.data?.pageBody?.seo?.keywords;
  const metaTags = props?.data?.pageBody?.seo?.metaTags;
  const scripts = props?.data?.pageBody?.seo?.scripts;
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
        organizationSchema={
          props?.data?.pageBody?.path === "/homepage"
            ? fetchOrganizationSchema(title, description, logo)
            : undefined
        }
        breadCrumbSchema={enableBreadCrumb && fetchBreadSchema(breadcrumbList(router), router)}
      />
      <PageLayoutComponent {...props} />
    </>
  );
}
export async function getStaticProps(context: any) {
  let queryParams = context.params;
  let tempPath = `/${hotelRoute}`;

  const query = getPageQuery(tempPath);
  const fetchedData = await getClient(true).fetch(query, { tempPath });

  if (fetchedData?.[0] == null) {
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
    },
  };
}
