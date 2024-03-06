import { useRouter } from "next/router"
import PageLayoutComponent from "../../../layout/PageLayoutComponent"
import { getClient, urlFor } from "../../../lib-sanity"
import { fetchBlogArticle, fetchBlogArticleTags, fetchBlogStoryThemes, getPageQuery } from "../../../lib/utils"
import DYNAMICSEO from "../../../components/dynamicSeo"
import { fetchWebPageSchema } from "../../../schemas/webPageSchema"
import { fetchBreadSchema } from "../../../schemas/breadCrumbSchema"
import { breadcrumbList } from "../../../schemas/breadCrumbList"

export default function Preview(props: any) {
  const router: any = useRouter()
  const { blogData } = props
  const title = blogData?.pageTitle
  const description = blogData?.seoDescription
  const image = blogData?.image?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref
    ? urlFor(blogData?.image?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref)?.url()
    : ""
  const logo = props?.data?.header?.[0]?.logo?.asset?._ref
    ? urlFor(props?.data?.header?.[0]?.logo?.asset?._ref)?.url()
    : ""
  const keywords = blogData?.seoKeywords
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
        pid: "travel-inspiration",
        pageId: 1,
        index: "best-5-star-luxury-hotels-in-mumbai",
      },
    },
  ]
  return {
    paths,
    fallback: true, // false or 'blocking'
  }
}

export async function getStaticProps(context: any) {
  let blogData: any
  let articleTags: any
  let articleThemes: any
  let queryParams = context?.params
  let tempPath = `/blog/article`

  const blogQuery = fetchBlogArticle(queryParams?.index)
  blogData = await getClient(true)?.fetch(blogQuery)

  const blogArticleTagQuery = fetchBlogArticleTags()
  articleTags = await getClient(true)?.fetch(blogArticleTagQuery)

  const blogArticleThemeQuery = fetchBlogStoryThemes()
  articleThemes = await getClient(true)?.fetch(blogArticleThemeQuery)

  const query = getPageQuery(tempPath)
  const fetchedData = await getClient(true)?.fetch(query, { tempPath })

  if (fetchedData?.[0] == null || blogData == null || blogData?.length < 1) {
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
      blogData: blogData?.[0],
      articleTags: articleTags,
      articleThemes: articleThemes,
    },
  }
}
