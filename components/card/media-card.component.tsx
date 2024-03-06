import React, { useContext, useEffect, useState } from "react"
import { groq } from "next-sanity"
import dynamic from "next/dynamic"
import { theme } from "../../lib/theme"
import { CONSTANTS } from "../constants"
import { Box, Stack, Typography } from "@mui/material"
import TwoRowTitle from "../hoc/title/TwoRowTitle"
import { getClient, urlFor } from "../../lib-sanity"
import { useMobileCheck } from "../../utils/isMobilView"
import { StyledBulletIcon } from "./styles/card-with-desc"
import { ActionProps, ImageProps, VideoProps, parameterMapItems } from "../types"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import {
  CtaLabelBox,
  TwoRowTitleBox,
  PrimaryActionBox,
  LargeImageOrVideoBox,
  HighLightsInMediaCardBox,
  MediaCardSubTitleTypography,
  PrimarySecondaryWrappingBox,
  MediaCardComponentContainerBox,
  MediaCardDescriptionTypography,
  MediaCardComponentTotalContainerBox,
  FlexBox,
} from "./styles/common-styles"
import { useAppNavigation } from "../../utils/NavigationUtility"
import VideoSEOScript from "../../utils/VideoSEOScript"
const CustomReadMore = dynamic(() => import("../hoc/CustomReadMore"))
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))
const VideoPlayerModal = dynamic(() => import("../modal/video-player-modal.component"))

type parameterMapItem = {
  key: string
  value: string
}
type childrenItem = {
  text: string
  _type: string
}
type singleContentItem = {
  style: string
  _type: string
  children: childrenItem[]
}
interface aestheticItems {
  _ref: string
  _type: string
  backgroundColor: any
  padding: any
}
interface MediaCardProps {
  url: string
  title: string
  content?: any
  urlType: string
  ctaLabel: string
  subTitle: string
  mediaType: string
  image: ImageProps
  titleColor: string
  description: string
  highLights?: string
  largeVariant: string
  largeImage: ImageProps
  videoAsset?: VideoProps
  charactersLimit: number
  aesthetic: aestheticItems
  primaryAction: ActionProps
  secondaryAction: ActionProps
  isComponentFullWidth: boolean
  isMultiBlockContent?: boolean
  parameterMap?: parameterMapItem[]
  singleContent?: singleContentItem[]
  headingElementForCard?: string
}
const MediaCard = ({
  url,
  title,
  image,
  urlType,
  content,
  ctaLabel,
  subTitle,
  mediaType,
  aesthetic,
  videoAsset,
  titleColor,
  largeImage,
  highLights,
  description,
  largeVariant,
  parameterMap,
  primaryAction,
  singleContent,
  secondaryAction,
  charactersLimit,
  headingElementForCard,
}: MediaCardProps) => {
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const Context = useContext(IHCLContext)
  const PortableText = Context!.PortableText

  const videoUrl = videoAsset?.videoPlay?.asset?._ref
  const videoThumbnail = videoAsset?.videoThumbnail?.asset?._ref
  const isVariantCheck = largeVariant == "details.card.card-with-left-media-right-content-aspect-ratio-2:4"
  const leftSideShortImage = largeVariant == "businessServices.card.left-media-right-content-in-between-variable-gap"
  const rightSideShortImage = largeVariant == "businessServices.card.right-media-left-content-in-between-variable-gap"
  const isRightMediaContent = largeVariant == "details.card.card-with-right-media-left-content-aspect-ratio-2:4"
  const isLeftMediaContent = largeVariant == "partners.card.left-media-right-center-align-content"

  const [video, setVideo] = useState<string>("")
  const [open, setOpen] = useState<boolean>(false)
  const [cardPadding, setCardPadding] = useState<any>()
  const [cardBackgroundColor, setCardBackgroundColor] = useState<string>()
  const [more, setMore] = useState<number>(charactersLimit ?? CONSTANTS?.ITEM_DESCRIPTION_CHARACTER_LIMIT)
  const handleModelClose = () => setOpen(false)
  const fetchRef = async () => {
    const query = groq`*[_id in ["${aesthetic?._ref}"]]`
    await getClient(true)
      .fetch(query)
      .then((data) => {
        setCardPadding(data?.[0]?.padding)
        setCardBackgroundColor(data?.[0]?.backgroundColor?.hex)
      })
  }
  useEffect(() => {
    aesthetic?._ref !== undefined && fetchRef()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aesthetic])

  if (isVariantCheck) {
    global?.window?.localStorage?.setItem("gc-title", title)
    if (title?.toLowerCase().match(/qmin/) !== null) global?.window?.localStorage?.setItem("theme", "qmin")
    else if (title?.toLowerCase().match(/wellness/) !== null) global?.window?.localStorage?.setItem("theme", "wellness")
    else global?.window?.localStorage?.setItem("theme", "taj experience")
  }

  return (
    <MediaCardComponentTotalContainerBox
      aria-label={largeVariant}
      $aesthetic={aesthetic?._ref}
      $cardPadding={
        isMobile
          ? cardPadding?.mobile || aesthetic?.padding?.mobile
          : cardPadding?.desktop || aesthetic?.padding?.desktop
      }
      $isMobile={isMobile}
      $isVariantCheck={isVariantCheck}
      $cardBackgroundColor={cardBackgroundColor || aesthetic?.backgroundColor?.hex}>
      <MediaCardComponentContainerBox
        $alignItems={parameterMap}
        $cardMediaGap={leftSideShortImage || rightSideShortImage}
        sx={{
          flexDirection: isMobile
            ? "column-reverse"
            : isVariantCheck || leftSideShortImage || isLeftMediaContent
            ? "row-reverse"
            : "row",
        }}>
        <Box>
          <TwoRowTitleBox>
            {parameterMap?.[0]?.key === "specialTitle" && (
              <Box sx={{ paddingBottom: "0.833vw" }}>
                {parameterMap?.map((item: parameterMapItems, index: number) => (
                  <Box key={index}>
                    <Typography variant={isMobile ? "m-heading-xs" : "heading-xs"}>{item?.value}</Typography>
                  </Box>
                ))}
              </Box>
            )}
            {title && (
              <TwoRowTitle
                title={title}
                lineHeight={"110%"}
                fontSize={isMobile ? "5vw" : "3.23vw"}
                dividerWidth={isMobile ? "6.25vw" : "2vw"}
                width={isRightMediaContent ? "80%" : "100%"}
                headingElementForCard={headingElementForCard || "h3"}
                color={titleColor || theme?.palette?.text?.primary}
              />
            )}
            {content && content?.map((item: any, id: number) => <PortableText blocks={item?.content} key={id} />)}
            {subTitle && (
              <MediaCardSubTitleTypography variant={isMobile ? "m-body-l" : "body-ml"}>
                {subTitle}
              </MediaCardSubTitleTypography>
            )}
            {highLights && (
              <HighLightsInMediaCardBox>
                <Box>
                  <StyledBulletIcon
                    sx={{
                      width: "0.625vw ! important",
                      height: "0.625vw ! important",
                    }}
                  />
                </Box>
                <Box>
                  <Typography variant="body-s">{highLights}</Typography>
                </Box>
              </HighLightsInMediaCardBox>
            )}
            <FlexBox
              sx={{
                flexDirection: isLeftMediaContent ? "column-reverse" : "column",
              }}>
              {parameterMap && parameterMap?.[0]?.key !== "specialTitle" && (
                <Box sx={{ mt: parameterMap?.[0]?.key ? "0.833vw" : "" }}>
                  {parameterMap?.map((item: parameterMapItem, index: number) => (
                    <Box key={index}>
                      <Typography
                        variant={isMobile ? "m-body-l" : item?.key === "price" ? "heading-m" : "body-ml"}
                        sx={{
                          paddingTop: item?.key === "price" ? "1.406vw" : "",
                        }}>
                        {item?.key === "price" ? (
                          <>₹ {item?.value}</>
                        ) : (
                          <Typography variant="body-s">
                            {item?.value ? (
                              <>
                                {item?.key}:<b> {item?.value}</b>
                              </>
                            ) : (
                              <>
                                <b>{item?.key}</b>
                              </>
                            )}
                          </Typography>
                        )}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
              {description && (
                <MediaCardDescriptionTypography variant={isMobile ? "m-body-l" : "body-ml"} className="hide-box">
                  {description.length > more ? (
                    <>
                      <CustomReadMore length={more} variant={isMobile ? "m-body-l" : "body-ml"}>
                        {description}
                      </CustomReadMore>
                    </>
                  ) : (
                    description
                  )}
                </MediaCardDescriptionTypography>
              )}
            </FlexBox>
          </TwoRowTitleBox>
          {(primaryAction?.image?.asset?._ref || primaryAction?.image?.asset?._ref) && (
            <Stack direction={"row"} columnGap={isMobile ? "5.156vw" : "2.083vw"} mt={isMobile ? "5.469vw" : "1.823vw"}>
              {primaryAction?.image?.asset?._ref && (
                <Box
                  component={"img"}
                  width="100%"
                  height="100%"
                  alt={primaryAction?.image?.altText || "prim-img"}
                  src={urlFor(primaryAction?.image?.asset?._ref)?.url()}
                  onClick={() => primaryAction?.url && navigate(primaryAction?.url, primaryAction?.urlType)}></Box>
              )}
              {secondaryAction?.image?.asset?._ref && (
                <Box
                  component={"img"}
                  width="100%"
                  height="100%"
                  src={urlFor(secondaryAction?.image?.altText || secondaryAction?.image?.asset?._ref)?.url()}
                  alt={"sec-img"}
                  onClick={() =>
                    secondaryAction?.url && navigate(secondaryAction?.url, secondaryAction?.urlType)
                  }></Box>
              )}
            </Stack>
          )}
          {(ctaLabel || primaryAction?.title || secondaryAction?.title) && (
            <PrimaryActionBox>
              {(primaryAction?.title || secondaryAction?.title) && (
                <PrimarySecondaryWrappingBox>
                  {primaryAction?.title && (
                    <RenderActionItem
                      url={primaryAction?.url}
                      isActionButtonType={true}
                      title={primaryAction?.title}
                      variant={primaryAction?.variant}
                      navigationType={primaryAction?.urlType}
                      buttonStyles={{ letterSpacing: "0.1em" }}
                    />
                  )}
                  {secondaryAction?.title && (
                    <RenderActionItem
                      url={secondaryAction?.url}
                      isActionButtonType={true}
                      title={secondaryAction?.title}
                      variant={secondaryAction?.variant}
                      navigationType={secondaryAction?.urlType}
                      buttonStyles={{ letterSpacing: "0.1em" }}
                    />
                  )}
                </PrimarySecondaryWrappingBox>
              )}
              {ctaLabel && (
                <CtaLabelBox>
                  <RenderActionItem
                    url={url}
                    title={ctaLabel}
                    variant={"link-m"}
                    navigationType={urlType}
                    isActionButtonType={false}
                    buttonStyles={{
                      letterSpacing: "0.1em",
                    }}
                  />
                </CtaLabelBox>
              )}
            </PrimaryActionBox>
          )}
        </Box>
        <Box>
          {mediaType === "video" ? (
            <LargeImageOrVideoBox $isMobile={isMobile}>
              <Box
                alt="img"
                component="img"
                sx={{
                  objectFit: "fill",
                  cursor: "pointer",
                  height: isMobile ? "100%" : "25vw",
                  width: isMobile ? "100%" : "auto",
                }}
                src={videoThumbnail && urlFor(videoThumbnail).url()}
                onClick={() => {
                  videoUrl && setVideo(videoUrl), setOpen(true)
                }}
              />
            </LargeImageOrVideoBox>
          ) : (
            (largeImage?.asset?._ref || image?.asset?._ref) && (
              <LargeImageOrVideoBox $isMobile={isMobile}>
                <Box
                  alt={(isMobile && image?.asset?._ref ? image?.altText : largeImage?.altText) || `-img`}
                  component={"img"}
                  sx={{
                    objectFit: "fill",
                    width: "100%",
                    height: isMobile ? "100%" : parameterMap ? "" : "25vw",
                  }}
                  src={urlFor(isMobile && image?.asset?._ref ? image?.asset?._ref : largeImage?.asset?._ref).url()}
                />
              </LargeImageOrVideoBox>
            )
          )}
        </Box>
        <VideoSEOScript {...videoAsset} />
        {open && <VideoPlayerModal videoUrl={video} handleModalOpen={open} handleModalClose={handleModelClose} />}
      </MediaCardComponentContainerBox>
      <Box sx={{ paddingTop: singleContent ? "4.167vw" : "" }}>
        {singleContent &&
          singleContent?.map((item: singleContentItem, idx: number) => <PortableText blocks={item} key={idx} />)}
      </Box>
    </MediaCardComponentTotalContainerBox>
  )
}

export default MediaCard
