import React, { useRef, useEffect } from "react"
import { theme } from "../../lib/theme"
import dynamic from "next/dynamic"
import { urlFor } from "../../lib-sanity"
import { Box, Typography } from "@mui/material"
import { ActionProps, ImageProps } from "../types"
import { StyledChevronRight } from "./styles/common-styles"
import { useAppNavigation } from "../../utils/NavigationUtility"
import {
  ContentBox,
  ActionItemBox,
  DescriptionTypo,
} from "./styles/card-with-half-image-and-content"
import { useImageUtility } from "../../utils/hooks/useImageUtility"
const CustomReadMore = dynamic(() => import("../hoc/CustomReadMore"))

interface CardWithHalfImageAndContent {
  title: string
  image: ImageProps
  description: string
  primaryAction: ActionProps
  charactersLimit: number
  gridSize?: number
  titleRef?: any
  maxheight?: any
  setTitleHeight?: Function
}

const CardWithHalfImageAndContent = ({
  title,
  image,
  description,
  primaryAction,
  charactersLimit,
  gridSize = 1,
  titleRef,
  maxheight,
  setTitleHeight
}:  CardWithHalfImageAndContent) => {
  const navigate = useAppNavigation()
  const { getOptimizeImageUrl } = useImageUtility()


  const titleElementRef = useRef<HTMLElement | null>(null)
  const titleHeight = titleElementRef?.current?.getBoundingClientRect()?.height
    useEffect(() => {
    if (setTitleHeight && titleHeight && maxheight < titleHeight) {
      setTitleHeight(titleHeight)
    }
  }, [maxheight, setTitleHeight, titleHeight])


  return (
    <>
      {image?.asset?._ref && (
        <Box>
          <Box
            alt={image?.altText || "-img"}
            component={"img"}
            src={getOptimizeImageUrl(urlFor(image?.asset?._ref)?.url(), gridSize)}
            sx={{ height: "100%", width: "100%", objectFit: "contain" }}
          />
          <ContentBox sx={{ background: theme?.palette?.neuPalette?.hexOne }}>
            {title && (
              <Typography
                letterSpacing={"-0.06em"}
                variant="m-heading-s"
                color={theme?.palette?.text?.primary}
                ref={titleElementRef}
                sx={{ height: maxheight ? maxheight : "auto" }}>
                {title}
              </Typography>
            )}
            {description && (
              <Box sx={{ minHeight: "13.438vw", marginTop: "1.87vw" }}>
                <CustomReadMore
                  length={charactersLimit ? Number(charactersLimit) : 110}
                  variant={"m-body-sl"}
                  customReadMoreColor={theme?.palette?.neuPalette?.hexTwo}>
                  {description}
                </CustomReadMore>
              </Box>
            )}
            {primaryAction?.url && (
              <ActionItemBox>
                <Typography
                  variant="m-text-link"
                  onClick={() =>
                    navigate(primaryAction?.url, primaryAction?.urlType)
                  }>
                  {primaryAction?.title}
                </Typography>
                <StyledChevronRight />
              </ActionItemBox>
            )}
          </ContentBox>
        </Box>
      )}
    </>
  )
}

export default CardWithHalfImageAndContent
