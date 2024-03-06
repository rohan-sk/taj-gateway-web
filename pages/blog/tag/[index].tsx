import { useRouter } from "next/router"
import PageLayoutComponent from "../../../layout/PageLayoutComponent"
import { getClient, urlFor } from "../../../lib-sanity"
import { fetchBlogArticleTags, fetchBlogStoryThemes, fetchTagRelatedBlogs, getPageQuery } from "../../../lib/utils"
import DYNAMICSEO from "../../../components/dynamicSeo"
import { fetchWebPageSchema } from "../../../schemas/webPageSchema"
import { fetchBreadSchema } from "../../../schemas/breadCrumbSchema"
import { breadcrumbList } from "../../../schemas/breadCrumbList"

export default function Preview(props: any) {
  const router: any = useRouter()
  const { blogListingData } = props
  const title = blogListingData?.pageTitle
  const description = blogListingData?.seoDescription
  const image = blogListingData?.image?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref
    ? urlFor(blogListingData?.image?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref)?.url()
    : ""
  const logo = props?.data?.header?.[0]?.logo?.asset?._ref
    ? urlFor(props?.data?.header?.[0]?.logo?.asset?._ref)?.url()
    : ""
  const keywords = blogListingData?.seoKeywords
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
        pid: "tag",
        pageId: 1,
        index: "taj-hotel",
      },
    },
  ]
  return {
    paths,
    fallback: true, // false or 'blocking'
  }
}

export async function getStaticProps(context: any) {
  let blogListingData: any
  let queryParams = context?.params
  let tempPath = `/blog/tag/tag-name`
  let tagName = queryParams?.index
  let articleTags: any
  let articleThemes: any

  {
    /* Need to call tag listing api here */
  }
  const tagsQuery = fetchTagRelatedBlogs(queryParams?.index)
  blogListingData = await getClient(true)?.fetch(tagsQuery)

  const query = getPageQuery(tempPath)
  const fetchedData = await getClient(true)?.fetch(query, { tempPath })

  const blogArticleTagQuery = fetchBlogArticleTags()
  articleTags = await getClient(true)?.fetch(blogArticleTagQuery)

  const blogArticleThemeQuery = fetchBlogStoryThemes()
  articleThemes = await getClient(true)?.fetch(blogArticleThemeQuery)

  if (fetchedData?.[0] == null || blogListingData == null || blogListingData?.length < 1) {
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
      blogListingData: blogListingData?.[0],
      articleTags: articleTags,
      articleThemes: articleThemes,
    },
  }
}
