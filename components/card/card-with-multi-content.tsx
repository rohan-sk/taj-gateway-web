import React from "react"
import { observer } from "mobx-react-lite"
import { useMobileCheck } from "../../utils/isMobilView"
import { useImageUtility } from "../../utils/hooks/useImageUtility"
import { Box } from "@mui/material"
import { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { urlFor } from "../../lib-sanity"
import { PortableText } from "../../lib/portable-text-serializers"
import { BlogBlockContent, BlogContentText } from "./styles/card-with-multi-content-styles"

function CardWithMultiContent({ data, isFirstItem }: any) {
  const { contentType, text, headingText, blockContent, image } = data
  const isMobile = useMobileCheck()
  const { getOptimizeImageUrl } = useImageUtility()
  return (
    <>
      {contentType == "text" && (
        <BlogContentText
          $isMobile={isMobile}
          $isHeadingElement={false}
          $isFirstItem={isFirstItem}
          variant={isMobile ? "m-body-sl" : "body-ml"}>
          {text}
        </BlogContentText>
      )}
      {contentType == "headingElement" && (
        <BlogContentText
          $isMobile={isMobile}
          $isHeadingElement={true}
          $isFirstItem={isFirstItem}
          variant={isMobile ? "m-heading-xs" : "heading-xs"}>
          {headingText}
        </BlogContentText>
      )}
      {contentType == "blockContent" && (
        <BlogBlockContent $isMobile={isMobile}>
          <PortableText blocks={blockContent} />
        </BlogBlockContent>
      )}
      {contentType == "image" && (
        <Box
          display={"block"}
          alt={image?.altText || `-img`}
          width={"100%"}
          height={"100%"}
          component={"img"}
          px={isMobile ? MobilePxToVw(83) : 0}
          src={getOptimizeImageUrl(urlFor(image?.asset?._ref)?.url(), 1)}
        />
      )}
    </>
  )
}

export default observer(CardWithMultiContent)
