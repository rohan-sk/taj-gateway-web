import React, { useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import { urlFor } from "../../lib-sanity"
import { CONSTANTS } from "../constants"
import { ActionProps, ImageProps, PathType } from "../types"
import { useLoggedIn } from "../../utils/hooks/useLoggedIn"
import { Typography, Box, Card, CardMedia } from "@mui/material"
import { useImageUtility } from "../../utils/hooks/useImageUtility"
import { CardContentBox } from "../carousal/styles/multi-cards-with-bg-image"

const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))
const CustomReadMore = dynamic(() => import("../hoc/CustomReadMore"))

type CardWithCenterAlignedContentProps = {
  title: string
  image: ImageProps
  description: string
  primaryAction: ActionProps
  charactersLimit?: number
  maxheight?: any
  setTitleHeight?: Function
  headingElementForCard?: any
}

const CardWithCenterAlignedContent = (props: CardWithCenterAlignedContentProps) => {
  const {
    title,
    image,
    maxheight,
    description,
    primaryAction,
    setTitleHeight,
    charactersLimit,
    headingElementForCard,
  } = props
  const isUserLoggedIn = useLoggedIn()
  const { getOptimizeImageUrl } = useImageUtility()
  const titleElementRef = useRef<HTMLElement | null>(null)
  const titleHeight = titleElementRef?.current?.getBoundingClientRect()?.height
  const nonLoggedInNuePassCard = title?.toUpperCase() == "NEUPASS" && !isUserLoggedIn

  useEffect(() => {
    if (setTitleHeight && titleHeight && maxheight < titleHeight) {
      setTitleHeight(titleHeight)
    }
  }, [maxheight, setTitleHeight, titleHeight])

  return (
    <Box sx={{ width: "100%" }}>
      <Card
        sx={{
          "&.MuiCard-root": {
            borderRadius: "0",
            boxShadow: "none",
          },
        }}>
        {image?.asset?._ref && (
          <CardMedia
            alt={image?.altText || "media"}
            component="img"
            width={"100%"}
            height={"100%"}
            src={getOptimizeImageUrl(urlFor(image?.asset?._ref).url(), 1)}
          />
        )}
        <CardContentBox
          sx={{
            gap: "0vw",
            maxWidth: "85% !important",
            padding: "6.25vw 0.625vw 7.5vw 0.625vw !important",
          }}>
          {title && (
            <Typography
              variant="m-heading-s"
              ref={titleElementRef}
              component={headingElementForCard || "h3"}
              sx={{ height: maxheight ? maxheight : "auto" }}>
              {title}
            </Typography>
          )}
          {description && (
            <CustomReadMore
              length={charactersLimit ?? 120}
              variant={"m-body-m"}
              textStyles={{
                marginTop: "2.5vw",
              }}>
              {description}
            </CustomReadMore>
          )}
          {primaryAction?.title && (
            <Box sx={{ marginTop: "4.375vw" }}>
              <RenderActionItem
                url={
                  isUserLoggedIn ? primaryAction?.url : nonLoggedInNuePassCard ? "/neupass-login" : primaryAction?.url
                }
                isActionButtonType={false}
                title={
                  isUserLoggedIn
                    ? primaryAction?.title
                    : nonLoggedInNuePassCard
                    ? CONSTANTS?.LOGIN_JOIN
                    : primaryAction?.title
                }
                variant={primaryAction?.variant}
                navigationType={
                  isUserLoggedIn
                    ? primaryAction?.urlType
                    : nonLoggedInNuePassCard
                    ? PathType.dialog
                    : primaryAction?.urlType
                }
              />
            </Box>
          )}
        </CardContentBox>
      </Card>
    </Box>
  )
}

export default CardWithCenterAlignedContent
