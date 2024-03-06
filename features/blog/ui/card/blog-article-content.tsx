import { observer } from "mobx-react-lite"
import { useMobileCheck } from "../../../../utils/isMobilView"
import { Box } from "@mui/material"
import { PortableText } from "../../../../lib/portable-text-serializers"
import { useImageUtility } from "../../../../utils/hooks/useImageUtility"
import { urlFor } from "../../../../lib-sanity"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { ImageProps, singleContentInterface } from "../../../../components/types"
import { BlogArticleHeadingText, BlogArticleParagraphText, BlogArticleText } from "../styles/blog-cards-styles"
interface ArticleContentTypeDeclaritions {
  data: {
    contentType: string
    text: string
    headingText: string
    blockContent: singleContentInterface[]
    image: ImageProps
  }
}

function BlogArticleContent({
  data: { contentType, text, headingText, blockContent, image },
}: ArticleContentTypeDeclaritions) {
  const isMobile = useMobileCheck()
  const { getOptimizeImageUrl } = useImageUtility()

  return (
    <Box sx={{ marginTop: isMobile ? MobilePxToVw(32) : DesktopPxToVw(32) }}>
      {contentType == "text" && <BlogArticleText variant={isMobile ? "m-body-sl" : "body-ml"}>{text}</BlogArticleText>}

      {contentType == "headingElement" && (
        <BlogArticleHeadingText variant={isMobile ? "m-heading-xs" : "heading-xs"} id={headingText}>
          {headingText}
        </BlogArticleHeadingText>
      )}

      {contentType == "blockContent" && (
        <BlogArticleParagraphText variant={isMobile ? "m-body-sl" : "body-ml"}>
          <PortableText blocks={blockContent} />
        </BlogArticleParagraphText>
      )}

      {contentType == "image" && (
        <Box
          display={"block"}
          alt={`-img`}
          width={"100%"}
          height={"100%"}
          component={"img"}
          src={getOptimizeImageUrl(urlFor(image?.asset?._ref)?.url(), 1)}
        />
      )}
    </Box>
  )
}

export default observer(BlogArticleContent)
