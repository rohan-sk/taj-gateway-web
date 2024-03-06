import PageLayoutComponent from "../layout/PageLayoutComponent";
import { basePageServerSide } from "../lib/getPageSchema";
import { urlFor } from "../lib-sanity";
import STATICSEO from "../components/staticSeo";
import { fetchWebPageSchema } from "../schemas/webPageSchema";
import { fetchOrganizationSchema } from "../schemas/organizationSchema";
import { breadcrumbList } from "../schemas/breadCrumbList";
import { fetchBreadSchema } from "../schemas/breadCrumbSchema";
import { useRouter } from "next/router";

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
export const getServerSideProps = async (context: any) => {
  let { resolvedUrl } = context;
  const baseProps = await basePageServerSide(
    context,
    resolvedUrl.split("?")[0]
  );
  return baseProps;
};
