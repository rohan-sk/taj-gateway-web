import React, { useContext, useEffect, useState } from "react"
import { groq } from "next-sanity"
import dynamic from "next/dynamic"
import { theme } from "../../lib/theme"
import { CONSTANTS } from "../constants"
import { Box, Grid, Typography } from "@mui/material"
import { getClient, urlFor } from "../../lib-sanity"
import { useMobileCheck } from "../../utils/isMobilView"
import { StyledBulletIcon } from "./styles/card-with-desc"
import { ActionProps, ImageProps, VideoProps, parameterMapItems } from "../types"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import {
  CtaLabelBox,
  TwoRowTitleBox,
  PrimaryActionBox,
  HighLightsInMediaCardBox,
  MediaCardSubTitleTypography,
  PrimarySecondaryWrappingBox,
  MediaCardDescriptionTypography,
  MediaCardComponentTotalContainerBox,
  FlexBox,
  MediaCardContentContainer,
} from "./styles/common-styles"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { useAesthetics } from "../../utils/fetchAsthetics"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import VideoSEOScript from "../../utils/VideoSEOScript"
const CustomReadMore = dynamic(() => import("../hoc/CustomReadMore"))
const VideoPlayerModal = dynamic(() => import("../modal/video-player-modal.component"))
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))
const TwoRowTitle = dynamic(() => import("../hoc/title/TwoRowTitle"))

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
  isHeroTitleFont?: boolean
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
  largeImage,
  highLights,
  description,
  largeVariant,
  parameterMap,
  primaryAction,
  singleContent,
  secondaryAction,
  charactersLimit,
  isHeroTitleFont,
}: MediaCardProps) => {
  const isMobile = useMobileCheck()
  const { textColor } = useAesthetics(aesthetic?._ref)

  const Context = useContext(IHCLContext)
  const PortableText = Context!.PortableText
  const videoUrl = videoAsset?.videoPlay?.asset?._ref
  const videoThumbnail = videoAsset?.videoThumbnail?.asset?._ref
  const isVariantCheck = largeVariant == "details.card.card-with-left-media-right-content-aspect-ratio-2:4"
  const leftSideShortImage = largeVariant == "businessServices.card.left-media-right-content-in-between-variable-gap"
  const isRightMediaContent = largeVariant == "details.card.card-with-right-media-left-content-aspect-ratio-2:4"
  const isLeftMediaContent = largeVariant == "partners.card.left-media-right-center-align-content"

  const [video, setVideo] = useState<string>("")
  const [open, setOpen] = useState<boolean>(false)
  const [cardPadding, setCardPadding] = useState<any>()
  const [cardBackgroundColor, setCardBackgroundColor] = useState<string>()
  const [more, setMore] = useState<number>(charactersLimit ?? CONSTANTS?.ITEM_DESCRIPTION_LARGE_LIMIT)
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
  const navigate = useAppNavigation()
  useEffect(() => {
    aesthetic?._ref !== undefined && fetchRef()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aesthetic])

  const handlePurchase = (url: any, type: any) => {
    navigate(url, type)
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
      <Grid
        container
        direction={isVariantCheck || leftSideShortImage || isLeftMediaContent ? "row" : "row-reverse"}
        sx={{
          justifyContent: "space-between",
        }}>
        <Grid
          xs={12}
          sm={isMobile ? 12 : 7.2}
          md={7.2}
          lg={7.2}
          xl={7.2}
          sx={{ marginBottom: `${isMobile ? "4.6vw" : "0"}` }}>
          {mediaType === "video" ? (
            <Box sx={{ width: "100%" }}>
              <Box
                alt="img"
                component="img"
                sx={{
                  cursor: "pointer",
                  width: "100%",
                }}
                src={videoThumbnail && urlFor(videoThumbnail).url()}
                onClick={() => {
                  videoUrl && setVideo(videoUrl), setOpen(true)
                }}
              />
            </Box>
          ) : (
            (largeImage?.asset?._ref || image?.asset?._ref) && (
              <Box
                alt={largeImage?.altText || `-img`}
                component="img"
                src={urlFor(isMobile && image?.asset?._ref ? image?.asset?._ref : largeImage?.asset?._ref).url()}
                sx={{ width: "100%" }}
              />
            )
          )}
          <VideoSEOScript {...videoAsset} />
          {open && <VideoPlayerModal videoUrl={video} handleModalOpen={open} handleModalClose={handleModelClose} />}
        </Grid>
        <Grid xs={12} sm={isMobile ? 12 : 3.775} md={3.775} lg={3.775} xl={3.775}>
          <MediaCardContentContainer>
            <Box>
              <TwoRowTitleBox>
                {parameterMap?.[0]?.key === "specialTitle" && (
                  <Box>
                    {parameterMap?.map((item: parameterMapItems, index: number) => (
                      <Typography key={index} variant={isMobile ? "m-heading-xs" : "heading-xs"}>
                        {item?.value}
                      </Typography>
                    ))}
                  </Box>
                )}
                {title && (
                  <Box mt={parameterMap ? (isMobile ? MobilePxToVw(20) : DesktopPxToVw(16)) : 0}>
                    <TwoRowTitle
                      title={title}
                      lineHeight={"110%"}
                      dividerWidth={isMobile ? "6.25vw" : "2vw"}
                      width={isRightMediaContent ? "90%" : "100%"}
                      color={textColor ? textColor : theme?.palette?.text?.primary}
                      fontSize={isMobile ? "5vw" : isHeroTitleFont ? "3.23vw" : "2.5vw"}
                    />
                  </Box>
                )}
                {content &&
                  content?.map((item: any, id: number) => (
                    <Box key={id} sx={{ marginTop: isMobile ? "2.188vw" : "1.823vw" }}>
                      <PortableText blocks={item?.content} />
                    </Box>
                  ))}
                {subTitle && (
                  <MediaCardSubTitleTypography variant={isMobile ? "m-body-l" : "body-ml"} $textColor={textColor}>
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
                            variant={
                              isMobile
                                ? item?.key === "price"
                                  ? "m-heading-m"
                                  : "m-body-l"
                                : item?.key === "price"
                                ? "heading-m"
                                : "body-s"
                            }
                            sx={{
                              paddingTop: item?.key === "price" ? "1.406vw" : "",
                            }}>
                            {item?.key === "price" ? (
                              <>₹ {item?.value}</>
                            ) : (
                              <Typography
                                variant={isMobile ? "m-body-l" : item?.key === "price" ? "heading-m" : "body-ml"}>
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
                    <MediaCardDescriptionTypography
                      variant={isMobile ? "m-body-l" : "body-ml"}
                      className="hide-box"
                      $textColor={textColor}>
                      {description.length > more ? (
                        <>
                          <CustomReadMore
                            length={more}
                            variant={isMobile ? "m-body-l" : "body-ml"}
                            textStyles={{
                              color: textColor ? textColor : theme?.palette?.text?.primary,
                            }}>
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
              {(primaryAction?.image?.asset?._ref || secondaryAction?.image?.asset?._ref) && (
                <Box
                  sx={{
                    display: "flex",
                    gap: isMobile ? "5.156vw" : "2.083vw",
                  }}>
                  {primaryAction?.image?.asset?._ref && (
                    <Box
                      width="206px"
                      height="100%"
                      alt={primaryAction?.image?.altText || "prim-img"}
                      component={"img"}
                      sx={{ cursor: "pointer" }}
                      src={urlFor(primaryAction?.image?.asset?._ref)?.url()}
                      onClick={() => primaryAction?.url && navigate(primaryAction?.url, primaryAction?.urlType)}
                    />
                  )}
                  {secondaryAction?.image?.asset?._ref && (
                    <Box
                      width="206px"
                      height="100%"
                      alt={secondaryAction?.image?.altText || "sec-img"}
                      component={"img"}
                      sx={{ cursor: "pointer" }}
                      src={urlFor(secondaryAction?.image?.asset?._ref)?.url()}
                      onClick={() => secondaryAction?.url && navigate(secondaryAction?.url, secondaryAction?.urlType)}
                    />
                  )}
                </Box>
              )}
              {(ctaLabel || primaryAction?.title || secondaryAction?.title) && (
                <PrimaryActionBox
                  sx={{
                    justifyContent: isMobile
                      ? ctaLabel && primaryAction?.title
                        ? "space-between!important"
                        : "center!important"
                      : "space-between!important",
                  }}>
                  {(primaryAction?.title || secondaryAction?.title) && (
                    <PrimarySecondaryWrappingBox>
                      {primaryAction?.title && (
                        <RenderActionItem
                          url=""
                          onClick={() => handlePurchase(primaryAction?.url, primaryAction?.urlType)}
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
          </MediaCardContentContainer>
        </Grid>
      </Grid>
      {singleContent && singleContent?.length > 0 && (
        <Grid container>
          <Box sx={{ paddingTop: singleContent ? "4.167vw" : "" }}>
            {singleContent &&
              singleContent?.map((item: singleContentItem, idx: number) => <PortableText blocks={item} key={idx} />)}
          </Box>
        </Grid>
      )}
    </MediaCardComponentTotalContainerBox>
  )
}
export default MediaCard
