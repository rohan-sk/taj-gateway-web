import { theme } from "../../lib/theme"
import { urlFor } from "../../lib-sanity"
import dynamic from "next/dynamic"
import { CONSTANTS } from "../constants"
import { observer } from "mobx-react-lite"
import { PropertyStore } from "../../store"
import React, { useContext, useState, useRef, useEffect } from "react"
import { Box, Grid, Typography } from "@mui/material"
import { GLOBAL_STORES } from "../../utils/Constants"
import ModalStore from "../../store/global/modal.store"
import { useMobileCheck } from "../../utils/isMobilView"
import { StyledBulletIcon } from "./styles/card-with-desc"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { useImageUtility } from "../../utils/hooks/useImageUtility"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { gridBreakPointsGenerator } from "./SearchResultCards/search-card.component"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import {
  ContentBox,
  RichTextBox,
  MarginTopBox,
  FullWidthBox,
  ChipTextTextBox,
  HighlightTextBox,
  ActionBoxWrapper,
  RichTextValueTypo,
  ChipTextTextMainBox,
  MarginTopDescriptionBox,
  BothActionButtonsWrapperBox,
} from "./styles/card-with-right-aligned-content-for-mSite"
import {
  PathType,
  ImageProps,
  ActionProps,
  RichTextItems,
  ChipTextItems,
  aestheticItems,
  parameterMapItems,
  SpecificationTagsItems,
} from "../types"
import { useAesthetics } from "../../utils/fetchAsthetics"
const CustomReadMore = dynamic(() => import("../hoc/CustomReadMore"))
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))
const LoadingSpinner = dynamic(() => import("../../utils/SpinnerComponent"))

interface CardWithRightAlignedContentForMsiteProps {
  url: string
  content: any
  title: string
  urlType: PathType
  ctaLabel: string
  checkBox: string
  subTitle: string
  image: ImageProps
  highlights: any
  highLights: string
  description: string
  charactersLimit?: number
  chipText: ChipTextItems[]
  richText: RichTextItems[]
  aesthetic: aestheticItems
  primaryAction: ActionProps
  secondaryAction: ActionProps
  specificationTags: SpecificationTagsItems[]
  parameterMap: parameterMapItems[]
  isFromProperty?: boolean
  galleryImages?: any
  roomModalDetails?: any
  gridSize?: number
  onPrimaryClick?: Function
  contentType?: string
  headingElementForCard?: any
  ctaLabelAlignment?: string
  titleRef?: any
  maxheight?: any
  setTitleHeight?: Function
  hidePrimaryCTA: boolean
  setContentHeight?: Function
  contentMaxHeight?: number
}

const CardWithRightAlignedContentForMsite = ({
  url,
  image,
  title,
  content,
  urlType,
  chipText,
  subTitle,
  richText,
  ctaLabel,
  highlights,
  highLights,
  description,
  aesthetic,
  primaryAction,
  secondaryAction,
  specificationTags,
  parameterMap,
  charactersLimit,
  isFromProperty = false,
  galleryImages,
  roomModalDetails,
  gridSize = 2,
  onPrimaryClick,
  contentType,
  headingElementForCard,
  ctaLabelAlignment,
  titleRef,
  maxheight,
  setTitleHeight,
  hidePrimaryCTA,
  setContentHeight,
  contentMaxHeight,
}: CardWithRightAlignedContentForMsiteProps) => {
  const hidePrimary = !!hidePrimaryCTA === false
  const modalStore = ModalStore.getInstance()
  const navigate = useAppNavigation()
  const Context = useContext(IHCLContext)
  const isContentAvailable = content?.length > 0
  const [more, setMore] = useState<number>(charactersLimit ?? CONSTANTS?.ITEM_DESCRIPTION_MOBILE_LIMIT)
  const propertyStore = Context?.getGlobalStore(GLOBAL_STORES?.propertyStore) as PropertyStore
  const isMobile = useMobileCheck()
  const { getOptimizeImageUrl } = useImageUtility()
  const { textColor, cardBackgroundColor } = useAesthetics(aesthetic?._ref)
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false)
  const titleElementRef = useRef<HTMLElement | null>(null)
  const contentElementRef = useRef<HTMLElement | null>(null)

  const titleHeight = titleElementRef?.current?.getBoundingClientRect()?.height
  const contentHeight = contentElementRef?.current?.getBoundingClientRect()?.height

  useEffect(() => {
    if (setTitleHeight && titleHeight && maxheight < titleHeight) {
      setTitleHeight(titleHeight)
    }
    if (setContentHeight && contentHeight) {
      setContentHeight(contentHeight)
    }
  }, [maxheight, setTitleHeight, titleHeight, setContentHeight, contentHeight])

  function isValidEmail(email: string) {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/

    return emailRegex.test(email)
  }
  function isValidPhoneNumber(phoneNumber: string) {
    const phoneRegex = /^\+\d{2} \d{5} \d{5}$/
    return phoneRegex.test(phoneNumber)
  }

  return (
    <Box aria-label="card-with-right-aligned-content-m" position={"relative"}>
      {!isImageLoaded && <LoadingSpinner componentLevel={true} />}
      {image?.asset?._ref && (
        <Box
          width={"100%"}
          height={"100%"}
          component="img"
          alt={image?.altText || "card-Image"}
          sx={{ objectFit: "contain" }}
          src={getOptimizeImageUrl(urlFor(image?.asset?._ref).url(), isMobile ? 1 : gridSize)}
          onLoad={() => setIsImageLoaded(true)}
        />
      )}
      <ContentBox
        className="content-box"
        sx={{
          marginTop: isMobile ? MobilePxToVw(-22) : MobilePxToVw(-18),
          background: cardBackgroundColor ? cardBackgroundColor : "",
        }}>
        {chipText?.length > 0 && (
          <ChipTextTextMainBox>
            {chipText?.map((item: ChipTextItems, index: number) => (
              <ChipTextTextBox key={index}>
                <Typography variant="m-body-s" sx={{ color: theme?.palette?.ihclPalette?.hexTwo }}>
                  {item?.chipTextValue}
                </Typography>
              </ChipTextTextBox>
            ))}
          </ChipTextTextMainBox>
        )}
        {specificationTags?.length > 0 && (
          <ChipTextTextMainBox>
            {specificationTags?.map((item: SpecificationTagsItems, index: number) => (
              <ChipTextTextBox key={index}>
                <Typography variant="m-body-s" sx={{ color: theme?.palette?.ihclPalette?.hexTwo }}>
                  {item?.tag}
                </Typography>
              </ChipTextTextBox>
            ))}
          </ChipTextTextMainBox>
        )}
        {title && (
          <Typography
            ref={titleElementRef}
            variant="m-heading-xs"
            sx={{
              color: textColor ?? theme?.palette?.text?.primary,
              height: maxheight ? maxheight : "auto",
            }}
            component={headingElementForCard || "h3"}>
            {title}
          </Typography>
        )}
        {subTitle && (
          <MarginTopBox>
            <Typography variant="m-body-s">{subTitle}</Typography>
          </MarginTopBox>
        )}
        {highLights && (
          <Box sx={{ marginTop: MobilePxToVw(15) }}>
            <StyledBulletIcon />
            <Typography variant="m-body-s">{highLights}</Typography>
          </Box>
        )}
        {highlights &&
          highlights?.map((item: any, index: number) => (
            <HighlightTextBox key={index}>
              <StyledBulletIcon />
              <Typography variant="m-body-s" sx={{ color: theme?.palette?.text?.primary }}>
                {typeof item === typeof "" ? item : item?.term}
              </Typography>
            </HighlightTextBox>
          ))}
        {description && (
          <MarginTopDescriptionBox $haveHighlights={highLights?.length > 0}>
            <CustomReadMore
              textStyles={{
                color: textColor ?? theme?.palette?.ihclPalette?.hexSeventeen,
              }}
              length={more}
              variant={"m-body-sl"}>
              {description}
            </CustomReadMore>
          </MarginTopDescriptionBox>
        )}
        {isFromProperty ? (
          <Grid
            container
            sx={{
              marginTop: parameterMap?.[0]?.key ? "0.521vw" : "0vw",
            }}
            className="hide-box">
            {parameterMap &&
              parameterMap?.map((item: any, index: number) => (
                <Grid
                  item
                  {...gridBreakPointsGenerator(isMobile, 6, 12)}
                  key={index}
                  sx={{
                    marginTop: index == 0 ? MobilePxToVw(14) : "0px",
                    marginBottom: index == 1 ? MobilePxToVw(20) : "0px",
                  }}>
                  {item?.keyType === "image" ? (
                    <Typography sx={{ display: "flex", alignItems: "center" }} variant={"m-body-sl"}>
                      {item?.imageAsset?.image?.[0]?.asset?._ref && (
                        <Box
                          component="img"
                          alt={item?.imageAsset?.image?.[0]?.altText || `-image`}
                          width={"17px"}
                          height={"13px"}
                          sx={{
                            objectFit: "fill",
                            display: "inline-block",
                            marginRight: "10px",
                          }}
                          src={getOptimizeImageUrl(urlFor(item?.imageAsset?.image?.[0]?.asset?._ref).url(), 1)}
                        />
                      )}
                      <Typography
                        variant={isMobile ? "m-body-sl" : "body-s"}
                        style={{
                          color: isValidEmail(item?.value)
                            ? theme.palette.ihclPalette.hexTwo
                            : isValidPhoneNumber(item?.value)
                            ? theme.palette.ihclPalette.hexTwo
                            : item?.key === CONSTANTS?.PHONE_KEY
                            ? theme.palette.ihclPalette.hexTwo
                            : "initial",
                        }}
                        onClick={
                          item?.key === CONSTANTS?.PHONE_KEY
                            ? () => {
                                navigate(`tel:${item?.value}`, PathType?.external)
                              }
                            : () => {}
                        }>
                        {item?.value}
                      </Typography>
                    </Typography>
                  ) : (
                    <Typography variant={"m-body-sl"}>
                      {item?.key} :<b> {item?.value}</b>
                    </Typography>
                  )}
                </Grid>
              ))}
          </Grid>
        ) : (
          <>
            {parameterMap?.length > 0 && (
              <>
                {parameterMap?.map((item: parameterMapItems, index: number) => (
                  <FullWidthBox
                    key={index}
                    sx={{
                      marginTop: index == 0 ? MobilePxToVw(14) : "0px",
                      marginBottom: index == 1 ? MobilePxToVw(20) : "0px",
                    }}>
                    <Typography variant={"m-body-sl"}>
                      {item?.key} :<b> {item?.value}</b>
                    </Typography>
                  </FullWidthBox>
                ))}
              </>
            )}
          </>
        )}
        {isContentAvailable && (
          <Box
            sx={{
              height: contentMaxHeight ? contentMaxHeight : "auto",
            }}
            mt={"1.875vw"}>
            {content?.map((item: RichTextItems, index: number) => (
              <Typography
                ref={contentElementRef}
                key={index}
                variant="m-body-s"
                sx={{
                  "& span": {
                    fontSize: "2.813vw",
                  },
                  "& img": {
                    width: DesktopPxToVw(20),
                    "@media (max-width: 640px)": {
                      width: MobilePxToVw(17),
                    },
                  },
                  "&>div": {
                    marginTop: "2.425vw",
                  },
                }}>
                {Context?.renderComponent(item._type, {
                  ...item,
                })}
              </Typography>
            ))}
          </Box>
        )}
        {richText?.length > 0 && (
          <MarginTopBox>
            {richText?.map((item: RichTextItems, index: number) => (
              <RichTextBox key={index} sx={{ marginTop: "0.78vw" }}>
                <Typography variant="m-body-l">{item?.richTextKey}</Typography>
                <RichTextValueTypo variant="m-body-l">{item?.richTextValue}</RichTextValueTypo>
              </RichTextBox>
            ))}
          </MarginTopBox>
        )}
        {(ctaLabel || primaryAction?.title || secondaryAction?.title) && (
          <ActionBoxWrapper
            sx={{
              flexDirection: secondaryAction?.title ? (urlType === PathType?.internal ? "row" : "column") : "row",
              alignItems: ctaLabelAlignment ? ctaLabelAlignment : urlType === PathType?.internal ? "center" : "left",
              justifyContent:
                isMobile && primaryAction?.title && !secondaryAction?.title && !ctaLabel ? "end" : "space-between",
            }}>
            {ctaLabel && (
              <Box
                sx={{
                  margin: secondaryAction?.title
                    ? urlType === PathType?.internal
                      ? "0vw 0vw 0vw"
                      : "0vw 0vw 4.6875vw 0vw"
                    : "0vw",
                }}>
                <RenderActionItem
                  url={url}
                  title={ctaLabel}
                  variant={"m-text-link"}
                  buttonStyles={{ letterSpacing: "0.1em" }}
                  navigationType={urlType}
                  isActionButtonType={false}
                  onClick={() => {
                    if (roomModalDetails) {
                      modalStore?.setPropertyData(roomModalDetails)
                    }
                    navigate(url, urlType)
                  }}
                />
              </Box>
            )}
            {((primaryAction?.title && hidePrimary) || secondaryAction?.title) && (
              <BothActionButtonsWrapperBox>
                {secondaryAction?.title && (
                  <RenderActionItem
                    isActionButtonType={true}
                    url={secondaryAction?.url}
                    title={secondaryAction?.title}
                    variant={secondaryAction?.variant}
                    navigationType={secondaryAction?.urlType}
                    buttonStyles={{ letterSpacing: "0.1em" }}
                    image={secondaryAction?.image?.asset?._ref}
                    onClick={() => {
                      if (isFromProperty) {
                        modalStore?.setPropertyData(galleryImages)
                      }
                      navigate(secondaryAction?.url, secondaryAction?.urlType)
                    }}
                  />
                )}
                {primaryAction?.title && hidePrimary && (
                  <RenderActionItem
                    isActionButtonType={primaryAction?.variant === CONSTANTS?.VARIANT_LINK_TYPE ? false : true}
                    url={primaryAction?.url}
                    title={primaryAction?.title}
                    variant={primaryAction?.variant}
                    navigationType={primaryAction?.urlType}
                    buttonStyles={{
                      letterSpacing: "0.1em",
                      whiteSpace: primaryAction?.title?.length < 11 ? "nowrap" : "unset",
                    }}
                    onClick={() => {
                      if (onPrimaryClick) {
                        onPrimaryClick()
                      } else if (contentType == "hotelOffers") {
                        navigate(primaryAction?.url, primaryAction?.urlType)
                      } else {
                        navigate(
                          propertyStore?.propertyData?.hotelId
                            ? `${primaryAction?.url}?hotelId=${propertyStore?.propertyData?.hotelId}`
                            : primaryAction?.url,
                          primaryAction?.urlType,
                        )
                      }
                    }}
                  />
                )}
              </BothActionButtonsWrapperBox>
            )}
          </ActionBoxWrapper>
        )}
      </ContentBox>
    </Box>
  )
}

export default observer(CardWithRightAlignedContentForMsite)
