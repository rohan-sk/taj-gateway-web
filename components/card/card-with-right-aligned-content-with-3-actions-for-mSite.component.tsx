import React, { useContext, useRef, useEffect } from "react"
import dynamic from "next/dynamic"
import { ActionProps, ImageProps, RichTextItems, parameterMapItems, singleContentInterface } from "../types"
import { urlFor } from "../../lib-sanity"
import { Box, Typography } from "@mui/material"
import {
  ContentBox,
  RichTextBox,
  MarginTopBox,
  RichTextValueTypo,
  ActionItemsMainBox,
  ActionItemsInnerBox,
  FlexDirectionColumnBox,
  ParameterMapWrappingBox,
} from "./styles/card-with-right-aligned-content-for-mSite"
import { useMobileCheck } from "../../utils/isMobilView"
import { ActionButtonsWrapperBox, BrochureSaveAlt, InnerActionBox } from "./styles/right-aligned-content-with-3-actions"
import { CONSTANTS } from "../constants"
import { StyledChevronRight } from "./styles/common-styles"
import OnClickToRedirect from "../hoc/actions/on-click-to-redirect"
import { useRouter } from "next/router"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { useImageUtility } from "../../utils/hooks/useImageUtility"
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))
const CustomReadMore = dynamic(() => import("../hoc/CustomReadMore"))

type CardWithRightAlignedContentWithThreeActionsForMsiteProps = {
  urlType: string
  url: string
  title: string
  _type: string
  ctaLabel: string
  subTitle: string
  image: ImageProps
  description: string
  largeImage: ImageProps
  charactersLimit: number
  alignmentVariant: string
  richText: RichTextItems[]
  primaryAction: ActionProps
  secondaryAction: ActionProps
  isMultiBlockContent: boolean
  parameterMap: parameterMapItems[]
  singleContent: singleContentInterface[]
  titleRef?: any
  maxheight?: any
  setTitleHeight?: Function
}

const CardWithRightAlignedContentWithThreeActionsForMsite = ({
  url,
  title,
  image,
  richText,
  ctaLabel,
  description,
  parameterMap,
  primaryAction,
  singleContent,
  secondaryAction,
  charactersLimit,
  titleRef,
  maxheight,
  setTitleHeight,
}: CardWithRightAlignedContentWithThreeActionsForMsiteProps) => {
  const router = useRouter()
  const isMobile = useMobileCheck()
  const { getOptimizeImageUrl } = useImageUtility()
  const Context = useContext(IHCLContext)
  const PortableText = Context!.PortableText

  const isSecondaryActionAvailable = secondaryAction?.title
  const isActionAvailable = !!(ctaLabel || primaryAction?.title || secondaryAction?.title)

  const titleElementRef = useRef<HTMLElement | null>(null)
  const titleHeight = titleElementRef?.current?.getBoundingClientRect()?.height

  useEffect(() => {
    if (setTitleHeight && titleHeight && maxheight < titleHeight) {
      setTitleHeight(titleHeight)
    }
  }, [maxheight, setTitleHeight, titleHeight])
  return (
    <Box>
      {image?.asset?._ref && (
        <Box
          alt={image?.altText || `-img`}
          width={"100%"}
          component="img"
          height={"100%"}
          src={getOptimizeImageUrl(urlFor(image?.asset?._ref).url(), 1)}
        />
      )}
      <ContentBox $isActionAvailable={isActionAvailable}>
        <FlexDirectionColumnBox>
          <Typography
            ref={titleElementRef}
            variant="m-heading-xs"
            sx={{
              height: maxheight ? maxheight : "auto",
            }}>
            {title}
          </Typography>
          <Typography variant="m-body-l" sx={{ marginTop: "3.75vw" }}>
            <CustomReadMore length={charactersLimit}>{description}</CustomReadMore>
          </Typography>
          {parameterMap?.length > 0 && (
            <ParameterMapWrappingBox justifyContent={"space-between"} className="hide-box">
              {parameterMap?.map((item: parameterMapItems, index: number) => (
                <Box key={index}>
                  <Typography variant="m-body-s">
                    {item?.key}:<b> {item?.value}</b>
                  </Typography>
                </Box>
              ))}
            </ParameterMapWrappingBox>
          )}
          {richText?.length > 0 && (
            <MarginTopBox>
              {richText?.map((item: RichTextItems, index: number) => (
                <RichTextBox key={index}>
                  <Typography variant="m-body-s">{item?.richTextKey}</Typography>
                  <RichTextValueTypo variant="m-body-s">{item?.richTextValue}</RichTextValueTypo>
                </RichTextBox>
              ))}
            </MarginTopBox>
          )}
          {singleContent && (
            <Box sx={{ marginTop: "2.813vw", minHeight: "6.406vw" }}>
              <Typography
                variant="m-body-s"
                sx={{
                  "& span": {
                    fontSize: "2.813vw",
                  },
                }}>
                <PortableText blocks={singleContent} />
              </Typography>
            </Box>
          )}

          {(ctaLabel || primaryAction?.title || secondaryAction?.title) && (
            <ActionItemsMainBox
              sx={{
                marginTop: richText?.length > 0 ? "4.68vw" : "8.65vw",
                justifyContent:
                  isMobile && primaryAction?.title && !secondaryAction?.title && !ctaLabel
                    ? "flex-start"
                    : "space-between",
              }}>
              <ActionItemsInnerBox>
                {!isSecondaryActionAvailable && (
                  <RenderActionItem
                    url={url}
                    variant={"m-text-link"}
                    title={ctaLabel}
                    isActionButtonType={false}
                    navigationType={"internal"}
                  />
                )}
                {(primaryAction?.title || secondaryAction?.title) && (
                  <ActionButtonsWrapperBox>
                    {isSecondaryActionAvailable && (
                      <RenderActionItem
                        isActionButtonType={true}
                        url={secondaryAction?.url}
                        title={secondaryAction?.title}
                        variant={secondaryAction?.variant}
                        navigationType={secondaryAction?.urlType}
                      />
                    )}
                    {primaryAction?.title && (
                      <RenderActionItem
                        isActionButtonType={true}
                        url={primaryAction?.url}
                        title={primaryAction?.title}
                        variant={primaryAction?.variant}
                        navigationType={primaryAction?.urlType}
                      />
                    )}
                  </ActionButtonsWrapperBox>
                )}
              </ActionItemsInnerBox>
              {isSecondaryActionAvailable && (
                <Box sx={{ marginTop: "5.625vw" }}>
                  {ctaLabel && (
                    <InnerActionBox
                      sx={{ gap: "0.47vw", cursor: "pointer" }}
                      onClick={() => {
                        OnClickToRedirect(router, url)
                      }}>
                      {ctaLabel === CONSTANTS?.BROCHURE && <BrochureSaveAlt $isMobile={isMobile} />}
                      <Typography variant="m-text-link" sx={{ letterSpacing: "0.1em" }}>
                        {ctaLabel}
                      </Typography>
                      {ctaLabel !== CONSTANTS?.BROCHURE && <StyledChevronRight />}
                    </InnerActionBox>
                  )}
                </Box>
              )}
            </ActionItemsMainBox>
          )}
        </FlexDirectionColumnBox>
      </ContentBox>
    </Box>
  )
}

export default CardWithRightAlignedContentWithThreeActionsForMsite
