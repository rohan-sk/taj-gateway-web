import React, { useEffect, useRef, useState } from "react"
import { Box, Typography } from "@mui/material"
import { MasonryCardContentWrapper, TitleHyphenDivider } from "../styles/blog-cards-styles"
import { urlFor } from "../../../../lib-sanity"
import { formatDateWithMONTH } from "../../../../utils/getDate"
import dynamic from "next/dynamic"
import { useMobileCheck } from "../../../../utils/isMobilView"
import { useAppNavigation } from "../../../../utils/NavigationUtility"
import { useRouter } from "next/router"
import { PathType } from "../../../../components"
import { CONSTANTS } from "../../../../components/constants"

const CustomReadMore = dynamic(() => import("../../../../components/hoc/CustomReadMore"))

const IndividualTagsListItem = ({
  tagItems,
  maxheight,
  setTitleHeight,
  cardCharactersCountLimit,
  mobileCardFullWidth,
}: any) => {
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const router = useRouter()
  const routerPath = router?.asPath?.split("/")?.slice(0, 2)?.join("/")
  const [more, setMore] = useState<number>(
    cardCharactersCountLimit ? cardCharactersCountLimit : CONSTANTS?.ITEM_DESCRIPTION_CHARACTER_LIMIT,
  )

  const titleElementRef = useRef<HTMLElement | null>(null)
  const titleHeight = titleElementRef?.current?.getBoundingClientRect()?.height

  useEffect(() => {
    if (setTitleHeight && titleHeight && maxheight < titleHeight) {
      setTitleHeight(titleHeight)
    }
  }, [maxheight, setTitleHeight, titleHeight])

  return (
    <>
      {tagItems?.bannerImage?.[0]?.imageAsset && (
        <Box
          alt="Theme Image"
          component="img"
          sx={{ cursor: "pointer" }}
          onClick={() => {
            navigate(`${routerPath}/${tagItems?.theme?.identifier}/${tagItems?.identifier}`, PathType?.internal)
          }}
          width={"100%"}
          height={isMobile ? "75vw" : "16.67vw"}
          src={urlFor(tagItems?.bannerImage?.[0]?.imageAsset?.image?.[0]?.asset)?.url()}
        />
      )}
      <MasonryCardContentWrapper sx={{ margin: isMobile && mobileCardFullWidth ? "0vw 8.125vw" : "0vw" }}>
        <TitleHyphenDivider />
        <Box>
          {tagItems?.title && (
            <Box sx={{ minHeight: isMobile ? "auto" : maxheight ? maxheight : "auto" }}>
              <Typography
                ref={titleElementRef}
                variant={isMobile ? "m-heading-m" : "heading-xs"}
                sx={{ letterSpacing: isMobile ? "0vw" : "1.2px" }}>
                {tagItems?.title}
              </Typography>
            </Box>
          )}
          {tagItems?.description && (
            <Typography
              variant={isMobile ? "m-body-sl" : "body-ml"}
              sx={{ display: "block", margin: isMobile ? "3.125vw 0vw 6.25vw 0vw" : "1.04vw 0vw 2.08vw 0vw" }}>
              {tagItems?.description.length > more ? (
                <CustomReadMore length={more} variant={isMobile ? "m-body-l" : "body-ml"}>
                  {tagItems?.description}
                </CustomReadMore>
              ) : (
                tagItems?.description
              )}
            </Typography>
          )}
          {tagItems?._updatedAt && (
            <Typography>{`By ${tagItems?.authorInfo?.title} Admin on ${formatDateWithMONTH(
              tagItems?._updatedAt,
              true,
            )}`}</Typography>
          )}
        </Box>
      </MasonryCardContentWrapper>
    </>
  )
}

export default IndividualTagsListItem
