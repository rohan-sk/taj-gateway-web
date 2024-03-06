import React, { useContext, useState } from "react"
import { PathType } from "../../types"
import dynamic from "next/dynamic"
import { theme } from "../../lib/theme"
import { CONSTANTS } from "../constants"
import { urlFor } from "../../lib-sanity"
import { Box, Typography } from "@mui/material"
import { useMobileCheck } from "../../utils/isMobilView"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { ImageProps, ActionProps, RichTextItems, VideoProps } from "../types"
import { CardWithDescriptionCard } from "./styles/card-with-description-actions"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import {
  SubTitleBox,
  RichTextBox,
  StyledDivider,
  CenterFlexBox,
  DescriptionTypo,
  StyledBulletIcon,
  CardContentParentBox,
  CardContentChildrenBox,
  RichTextValueTypography,
  ParameterMapWrappingContainer,
  HighLightsBox,
} from "./styles/card-with-desc"
import ModalStore from "../../store/global/modal.store"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import VideoSEOScript from "../../utils/VideoSEOScript"
const CustomReadMore = dynamic(() => import("../hoc/CustomReadMore"))
const VideoPlayerModal = dynamic(() => import("../modal/video-player-modal.component"))
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))

interface parameterMapItems {
  key: string
  value: string
}
type CardWithDescProps = {
  url: string
  content: any
  title: string
  subTitle: string
  ctaLabel: string
  variant?: string
  image: ImageProps
  urlType: PathType
  mediaType: string
  highLights: string
  description: string
  largeVariant?: string
  largeImage: ImageProps
  videoAsset: VideoProps
  alignmentVariant: string
  charactersLimit?: number
  richText: RichTextItems[]
  primaryAction: ActionProps
  showDividerForTitle: Boolean
  isMultiBlockContent: boolean
  parameterMap: parameterMapItems[]
  roomModalDetails?: any
}

const CardWithDescAndRightCtaAlignment = ({
  url,
  content,
  title,
  subTitle,
  ctaLabel,
  variant,
  image,
  urlType,
  mediaType,
  highLights,
  description,
  largeVariant,
  largeImage,
  videoAsset,
  alignmentVariant,
  charactersLimit,
  richText,
  primaryAction,
  showDividerForTitle,
  isMultiBlockContent,
  parameterMap,
  roomModalDetails,
}: CardWithDescProps) => {
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const Context = useContext(IHCLContext)
  const PortableText = Context!.PortableText
  const mobileImage = image?.asset?._ref
  const webImage = largeImage?.asset?._ref
  const altText = isMobile ? image?.altText || largeImage?.altText : largeImage?.altText
  const videoUrl = videoAsset?.videoPlay?.asset?._ref
  const videoThumbnail = videoAsset?.videoThumbnail?.asset?._ref
  const [open, setOpen] = useState<boolean>(false)
  const [video, setVideo] = useState<string>("")
  const [more, setMore] = useState<number>(
    charactersLimit ?? CONSTANTS?.ITEM_DESCRIPTION_CHARACTER_LIMIT
  )
  const modalStore = ModalStore.getInstance()
  const handleModelClose = () => setOpen(false)

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      aria-label={`variant: ${isMobile ? variant : largeVariant}`}
    >
      <CardWithDescriptionCard>
        {mediaType === "video" ? (
          <Box
            alt="img"
            loading="lazy"
            component="img"
            width={"100%"}
            height={"100%"}
            sx={{ cursor: "pointer" }}
            src={videoThumbnail && urlFor(videoThumbnail).url()}
            onClick={() => {
              videoUrl && setVideo(videoUrl), setOpen(true)
            }}
          />
        ) : (
          ((isMobile && mobileImage) || (!isMobile && webImage)) && (
            <Box
              alt={altText || `-img`}
              width={"100%"}
              height={"100%"}
              loading="lazy"
              component={"img"}
              src={urlFor(isMobile ? mobileImage : webImage).url()}
              onClick={() => {
                url && navigate(url, urlType)
              }}
              sx={{ cursor: url ? "pointer" : "default" }}
            />
          )
        )}
        <CardContentParentBox $title={title} className={"content"}>
          {alignmentVariant === "preceding-hyphen-title" && <StyledDivider />}
          <CardContentChildrenBox $isMobile={isMobile}>
            {title && (
              <Typography
                className="title"
                variant={isMobile ? "m-heading-xs" : "heading-xs"}
                sx={{
                  color: theme?.palette?.text?.primary,
                }}
              >
                {title}
              </Typography>
            )}
            {subTitle && (
              <SubTitleBox className="hide-box">
                <Typography variant={isMobile ? "m-body-sl" : "body-ml"}>
                  {subTitle}
                </Typography>
              </SubTitleBox>
            )}
            {highLights && (
              <HighLightsBox className="hide-box highlights">
                <StyledBulletIcon />
                <Typography variant={isMobile ? "m-body-s" : "body-s"}>
                  {highLights}
                </Typography>
              </HighLightsBox>
            )}
            {description && (
              <DescriptionTypo
                variant={isMobile ? "m-body-l" : "body-ml"}
                className="hide-box description"
              >
                {description.length > more ? (
                  <>
                    <CustomReadMore
                      length={more}
                      variant={isMobile ? "m-body-l" : "body-ml"}
                    >
                      {description}
                    </CustomReadMore>
                  </>
                ) : (
                  description
                )}
              </DescriptionTypo>
            )}
            {richText?.length > 0 && (
              <RichTextBox className="hide-box">
                {richText?.map((item: RichTextItems, index: number) => (
                  <Box key={index}>
                    <Typography variant={isMobile ? "m-body-l" : "body-ml"}>
                      {item?.richTextKey}
                    </Typography>
                    <RichTextValueTypography
                      variant={isMobile ? "m-body-l" : "body-ml"}
                    >
                      {item?.richTextValue}
                    </RichTextValueTypography>
                  </Box>
                ))}
              </RichTextBox>
            )}
            {parameterMap && (
              <ParameterMapWrappingContainer className="hide-box">
                {parameterMap?.map((item: parameterMapItems, index: number) => (
                  <Box key={index}>
                    <Typography variant={isMobile ? "m-body-l" : "body-ml"}>
                      {item?.key}:<b> {item?.value}</b>
                    </Typography>
                  </Box>
                ))}
              </ParameterMapWrappingContainer>
            )}
            {content && (
              <Box>
                {content?.map((singleContent: any, index: number) => (
                  <CenterFlexBox
                    key={index}
                    sx={{
                      marginBottom:
                        index < content?.length
                          ? isMobile
                            ? MobilePxToVw(15)
                            : DesktopPxToVw(15)
                          : "0vw",
                      img: {
                        width: isMobile ? "2.656vw" : "0.885vw",
                      },
                      span: {
                        fontSize: isMobile ? "3.438vw !important" : "1.146vw !important",
                      },
                    }}>
                    <PortableText blocks={singleContent?.content} key={index} />
                  </CenterFlexBox>
                ))}
              </Box>
            )}
            {(primaryAction?.title || ctaLabel) && (
              <Box
                className="hide-box"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    primaryAction?.title != undefined && ctaLabel
                      ? "space-between"
                      : "flex-end",
                }}
                flexDirection={
                  isMobile
                    ? typeof primaryAction?.title === typeof ""
                      ? "row-reverse"
                      : "row"
                    : "row"
                }
              >
                <RenderActionItem
                  isActionButtonType={
                    primaryAction?.variant === "link" ? false : true
                  }
                  url={primaryAction?.url}
                  title={primaryAction?.title}
                  variant={primaryAction?.variant}
                  navigationType={primaryAction?.urlType}
                  buttonStyles={{
                    minWidth:
                      primaryAction?.urlType === "dialog" ? "9.45vw" : "9.79vw",
                    letterSpacing: "1.8px",
                  }}
                />
                <RenderActionItem
                  url={url}
                  title={ctaLabel}
                  isActionButtonType={false}
                  navigationType={urlType}
                  variant={isMobile ? "m-text-link" : "link-m"}
                  onClick={() => {
                    if (roomModalDetails) {
                      modalStore?.setPropertyData(roomModalDetails)
                    }
                    navigate(url, urlType)
                  }}
                  buttonStyles={{
                    letterSpacing: "1.8px",
                  }}
                />
              </Box>
            )}
          </CardContentChildrenBox>
        </CardContentParentBox>
      </CardWithDescriptionCard>
      <VideoSEOScript {...videoAsset}/>
      {open && (
        <VideoPlayerModal
          videoUrl={video}
          handleModalOpen={open}
          handleModalClose={handleModelClose}
        />
      )}
    </Box>
  )
}

export default CardWithDescAndRightCtaAlignment
