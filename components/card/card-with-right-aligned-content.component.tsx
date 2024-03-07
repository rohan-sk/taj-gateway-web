import { useTheme } from "@mui/system"
import { CONSTANTS } from "../constants"
import dynamic from "next/dynamic"
import { urlFor } from "../../lib-sanity"
import React, { useContext, useEffect, useState, useRef } from "react"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { useMobileCheck } from "../../utils/isMobilView"
import { StyledChevronRight } from "./styles/common-styles"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { CardMedia, Typography, Box, Stack, Grid } from "@mui/material"
import {
  ImageProps,
  ActionProps,
  RichTextItems,
  ChipTextItems,
  parameterMapItems,
  SpecificationTagsItems,
  aestheticItems,
} from "../types"
import { HighLightsBox, StyledBulletIcon } from "./styles/card-with-desc"
import {
  ActionBox,
  ImageCard,
  ContentBox,
  CtaLabelBox,
  DescriptionCard,
  ChipTextButtonBox,
  ChipTextTextWrapBox,
  TitleChipTextWrapBox,
  PrimaryAndSecondaryActionBox,
  SubTitleBox,
} from "./styles/card-with-right-aligned-content"
import ModalStore from "../../store/global/modal.store"
import { GLOBAL_STORES } from "../../utils/Constants"
import { GAStore, PropertyStore, UserStore } from "../../store"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { gridBreakPointsGenerator } from "./SearchResultCards/search-card.component"
import { PortableText } from "../../lib/portable-text-serializers"
import { MemberDataLayer } from "../../utils/analytics/member-data-layer"
import { useImageUtility } from "../../utils/hooks/useImageUtility"
import { useAesthetics } from "../../utils/fetchAsthetics"
import { handleDestinationBooking } from "../../utils/analytics/events/NonEcommerce/offer-selected-event"
import { handleHotelandOfferDetailsViewed } from "../../utils/analytics/events/NonEcommerce/viewed-hotel-offer-details"
const CustomReadMore = dynamic(() => import("../hoc/CustomReadMore"))
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))

type CardWithRightAlignedContentProps = {
  content: any
  url: string
  urlType: any
  aesthetic: aestheticItems
  title: string
  subTitle: string
  ctaLabel: string
  image: ImageProps
  highLights: string
  description: string
  largeImage: ImageProps
  charactersLimit?: number
  richText: RichTextItems[]
  chipText: ChipTextItems[]
  primaryAction: ActionProps
  secondaryAction: ActionProps
  parameterMap: parameterMapItems[]
  specificationTags: SpecificationTagsItems[]
  variant: string
  largeVariant: string
  isFromProperty?: boolean
  galleryImages?: any
  roomModalDetails?: any
  singleContent?: any
  highlights?: any
  analytics?: any
  _type?: any
  onPrimaryClick?: Function
  onCtaClick?: Function
  contentType?: string
  hotelAddress?: any
  hotelType?: string
  hotelCode?: any
  brandName?: any
  gridSize?: number
  headingElementForCard?: any
  synxisHotelId?: any
  titleRef?: any
  maxheight?: any
  setTitleHeight?: Function
  setDescriptionHeight?: Function
  descriptionMaxheight: any
  hidePrimaryCTA: boolean
  sectionTitle: any
}

const CardWithRightAlignedContent = ({
  url,
  title,
  image,
  aesthetic,
  content,
  urlType,
  subTitle,
  ctaLabel,
  chipText,
  highLights,
  highlights,
  singleContent,
  largeImage,
  description,
  parameterMap,
  primaryAction,
  charactersLimit,
  secondaryAction,
  specificationTags,
  variant,
  largeVariant,
  isFromProperty = false,
  galleryImages,
  roomModalDetails,
  analytics,
  _type,
  onPrimaryClick,
  onCtaClick,
  contentType,
  hotelType,
  hotelAddress,
  hotelCode,
  brandName,
  gridSize = 2,
  titleRef,
  maxheight,
  headingElementForCard,
  synxisHotelId,
  setTitleHeight,
  setDescriptionHeight,
  descriptionMaxheight,
  hidePrimaryCTA,
  sectionTitle,
}: CardWithRightAlignedContentProps) => {
  const hidePrimary = !!hidePrimaryCTA === false
  const modalStore = ModalStore.getInstance()
  const more = charactersLimit ?? CONSTANTS?.ITEM_DESCRIPTION_CHARACTER_LIMIT
  const Context = useContext(IHCLContext)
  const theme = useTheme()
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const isRichTextAvailable = content?.length > 0
  const cardImage = isMobile ? image?.asset?._ref : largeImage?.asset?._ref
  const { getOptimizeImageUrl } = useImageUtility()
  const IHCLContexts = useContext(IHCLContext)
  const userStore = IHCLContexts?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const propertyStore = IHCLContexts?.getGlobalStore(GLOBAL_STORES?.propertyStore) as PropertyStore

  const context = useContext(IHCLContext)
  const { textColor, cardBackgroundColor } = useAesthetics(aesthetic?._ref)
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const dataLayer = MemberDataLayer(userStore, gaStoreData)

  const titleElementRef = useRef<HTMLElement | null>(null)
  const titleHeight = titleElementRef?.current?.getBoundingClientRect()?.height
  const descriptionElementRef = useRef<HTMLElement | null>(null)
  const descriptionHeight = descriptionElementRef?.current?.getBoundingClientRect()?.height

  useEffect(() => {
    if (setTitleHeight && titleHeight && maxheight < titleHeight) {
      setTitleHeight(titleHeight)
    }
  }, [maxheight, setTitleHeight, titleHeight])

  useEffect(() => {
    if (setDescriptionHeight && descriptionHeight && descriptionMaxheight < descriptionHeight) {
      setDescriptionHeight(descriptionHeight)
    }
  }, [descriptionMaxheight, setDescriptionHeight, descriptionHeight])
  let pathname = global?.window?.location?.pathname
  let isDestination = pathname?.includes("destinations")
  let isHotels = pathname?.includes("hotels")
  let isOffers = pathname?.includes("offers")
  let isOffersAndPromotions = contentType === "hotelOffers"
  let isExclusiveOffers = contentType === "exclusiveOffers"
  let isRestaurant = pathname?.includes("restaurants")
  const offerDate = parameterMap?.[0]?.value?.toLowerCase()?.includes("till")
    ? parameterMap?.[0]?.value?.toLowerCase()?.split("till")?.[1]?.trim()
    : parameterMap?.[0]?.value

  function isValidEmail(email: string) {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/

    return emailRegex.test(email)
  }

  return (
    <Box aria-label={isMobile ? variant : largeVariant}>
      {cardImage && (
        <Box position={"relative"}>
          <ImageCard>
            <CardMedia
              alt={isMobile ? image?.altText || "card-Image" : largeImage?.altText || "card-Image"}
              component="img"
              loading="eager"
              src={getOptimizeImageUrl(urlFor(cardImage)?.url(), gridSize)}
            />
          </ImageCard>
          <ContentBox
            $isMobile={isMobile}
            $padding={highLights}
            sx={{
              background: cardBackgroundColor ? cardBackgroundColor : theme?.palette?.background?.default,
              "& .text-theme": {
                color: textColor ? `${textColor}!important` : theme?.palette?.ihclPalette?.hexSeventeen,
              },
            }}>
            {(title || chipText || specificationTags) && (
              <TitleChipTextWrapBox>
                {title && (
                  <Typography
                    ref={titleElementRef}
                    variant="heading-xs"
                    className={"text-theme"}
                    component={headingElementForCard || "h3"}
                    sx={{
                      height: maxheight ? maxheight : "auto",
                      fontWeight: "600",
                    }}>
                    {title}
                  </Typography>
                )}
                {chipText?.length > 0 && (
                  <ChipTextTextWrapBox>
                    {chipText?.map((item: ChipTextItems, index: number) => (
                      <ChipTextButtonBox key={index}>
                        <Typography
                          variant="body-s"
                          className={"text-theme"}
                          sx={{ color: theme?.palette?.ihclPalette?.hexTwo }}>
                          {item?.chipTextValue}
                        </Typography>
                      </ChipTextButtonBox>
                    ))}
                  </ChipTextTextWrapBox>
                )}
                {specificationTags?.length > 0 && (
                  <ChipTextTextWrapBox>
                    {specificationTags?.map((item: any, index: number) => (
                      <ChipTextButtonBox key={index}>
                        <Typography variant="body-s" sx={{ color: theme?.palette?.ihclPalette?.hexTwo }}>
                          {item?.tag}
                        </Typography>
                      </ChipTextButtonBox>
                    ))}
                  </ChipTextTextWrapBox>
                )}
              </TitleChipTextWrapBox>
            )}
            {subTitle && (
              <SubTitleBox>
                <Typography className={"text-theme"} variant="body-ml">
                  {subTitle}
                </Typography>
              </SubTitleBox>
            )}
            {highLights && (
              <SubTitleBox sx={{ marginTop: "0.83vw" }}>
                <StyledBulletIcon />
                <Typography variant="body-s" className={"text-theme"}>
                  {highLights}
                </Typography>
              </SubTitleBox>
            )}
            {highlights &&
              highlights?.map((item: any, index: number) => (
                <HighLightsBox className="hide-box highlights" key={index}>
                  <StyledBulletIcon />
                  <Typography variant={isMobile ? "m-body-s" : "body-s"}>
                    {typeof item === typeof "" ? item : item?.term}
                  </Typography>
                </HighLightsBox>
              ))}
            {singleContent && (
              <Box mt={isMobile ? MobilePxToVw(10) : DesktopPxToVw(10)}>
                {singleContent?.map((content: string | {}, idx: number) => (
                  <PortableText blocks={content} key={idx} />
                ))}
              </Box>
            )}
            {description && (
              <DescriptionCard
                ref={descriptionElementRef}
                variant="body-s"
                sx={{
                  overflow: "hidden",
                  display: "webkitBox",
                  WebkitLineClamp: 2,
                  lineClamp: 2,
                  webkitBoxOrient: "vertical",
                  minHeight: descriptionMaxheight && descriptionMaxheight > 0 ? descriptionMaxheight : "initial",
                }}
                className="hide-box description">
                {description.length > more ? (
                  <CustomReadMore
                    textStyles={{
                      color: textColor ? `${textColor}!important` : theme?.palette?.ihclPalette?.hexSeventeen,
                    }}
                    length={more}
                    variant={"body-s"}>
                    {description}
                  </CustomReadMore>
                ) : (
                  description
                )}
              </DescriptionCard>
            )}
            {/* for keys and value labels */}
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
                        marginBottom: index < parameterMap?.length / 2 ? "0.521vw" : "0",
                      }}>
                      {item?.keyType === "image" ? (
                        <Typography
                          variant={isMobile ? "m-body-l" : "body-s"}
                          sx={{
                            color: isValidEmail(item?.value)
                              ? theme.palette.ihclPalette.hexTwo
                              : item?.key === CONSTANTS?.PHONE_KEY
                              ? theme.palette.ihclPalette.hexTwo
                              : "initial",
                          }}>
                          {(isMobile && item?.imageAsset?.image?.[0]?.asset?._ref) ||
                            (!isMobile && item?.imageAsset?.largeImage?.[0]?.asset?._ref && (
                              <Box
                                component="img"
                                alt={
                                  (isMobile
                                    ? item?.imageAsset?.image?.[0]?.altText
                                    : item?.imageAsset?.largeImage?.[0]?.altText) || `-image`
                                }
                                width={"17px"}
                                height={"13px"}
                                sx={{
                                  objectFit: "fill",
                                  display: "inline-block !important",
                                  marginRight: "10px",
                                }}
                                src={urlFor(
                                  isMobile
                                    ? item?.imageAsset?.image?.[0]?.asset?._ref
                                    : item?.imageAsset?.largeImage?.[0]?.asset?._ref,
                                ).url()}
                              />
                            ))}
                          {item?.value}
                        </Typography>
                      ) : (
                        <Typography variant={isMobile ? "m-body-l" : "body-s"}>
                          {item?.key}:<b> {item?.value}</b>
                        </Typography>
                      )}
                    </Grid>
                  ))}
              </Grid>
            ) : (
              <>
                {parameterMap && (
                  <Stack
                    className="hide-box"
                    direction={"row"}
                    justifyContent={"space-evenly"}
                    sx={{
                      marginTop: parameterMap?.[0]?.key ? "0.521vw" : "0vw",
                    }}>
                    {parameterMap?.map((item: parameterMapItems, index: number) => (
                      <Box key={index} sx={{ width: "100%" }}>
                        <Typography variant={isMobile ? "m-body-l" : "body-s"}>
                          {item?.key}:<b> {item?.value}</b>
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                )}
              </>
            )}
            {isRichTextAvailable && (
              <Box
                sx={{
                  marginTop: "0.531vw",
                  display: "flex",
                  justifyContent: "space-evenly",
                  "&>div": {
                    width: "100%",
                  },
                  fontSize: "0.94vw",
                }}>
                {content?.map((item: RichTextItems, index: number) => (
                  <>
                    {Context?.renderComponent(item._type, {
                      ...item,
                    })}
                  </>
                ))}
              </Box>
            )}
            {(primaryAction?.title || ctaLabel || secondaryAction?.title) && (
              <ActionBox
                sx={{
                  marginTop: isRichTextAvailable ? "1.09vw" : DesktopPxToVw(20),
                  justifyContent: primaryAction?.title || secondaryAction?.title ? "space-between" : "flex-start",
                }}
                className="hide-box">
                {((primaryAction?.title && hidePrimary) || secondaryAction?.title) && (
                  <PrimaryAndSecondaryActionBox>
                    {primaryAction?.title && hidePrimary && (
                      <RenderActionItem
                        url={primaryAction?.url}
                        title={primaryAction?.title}
                        navigationType={primaryAction?.urlType}
                        variant={primaryAction?.variant}
                        isActionButtonType={primaryAction?.variant === "link" ? false : true}
                        buttonStyles={{
                          letterSpacing: "0.1em",
                          fontSize: "0.94vw",
                        }}
                        onClick={() => {
                          if (onPrimaryClick) {
                            onPrimaryClick()
                            handleDestinationBooking(
                              primaryAction?.url,
                              primaryAction?.urlType,
                              contentType,
                              isOffers,
                              isOffersAndPromotions,
                              isDestination,
                              isHotels,
                              dataLayer,
                              title,
                              primaryAction,
                              brandName,
                              hotelAddress,
                              synxisHotelId,
                              hotelType,
                              _type,
                              description,
                              offerDate,
                              isMobile,
                              isRestaurant,
                              sectionTitle,
                            )
                          } else if (contentType === "hotelOffers") {
                            navigate(primaryAction?.url, primaryAction?.urlType)
                            handleDestinationBooking(
                              primaryAction?.url,
                              primaryAction?.urlType,
                              contentType,
                              isOffers,
                              isOffersAndPromotions,
                              isDestination,
                              isHotels,
                              dataLayer,
                              title,
                              primaryAction,
                              brandName,
                              hotelAddress,
                              synxisHotelId,
                              hotelType,
                              _type,
                              description,
                              offerDate,
                              isMobile,
                              isRestaurant,
                              sectionTitle,
                            )
                          } else {
                            navigate(
                              propertyStore?.propertyData?.hotelId
                                ? `${primaryAction?.url}?hotelId=${propertyStore?.propertyData?.hotelId}`
                                : primaryAction?.url,
                              primaryAction?.urlType,
                            )
                            handleDestinationBooking(
                              propertyStore?.propertyData?.hotelId
                                ? `${primaryAction?.url}?hotelId=${propertyStore?.propertyData?.hotelId}`
                                : primaryAction?.url,
                              primaryAction?.urlType,
                              contentType,
                              isOffers,
                              isOffersAndPromotions,
                              isDestination,
                              isHotels,
                              dataLayer,
                              title,
                              primaryAction,
                              brandName,
                              hotelAddress,
                              synxisHotelId,
                              hotelType,
                              _type,
                              description,
                              offerDate,
                              isMobile,
                              isRestaurant,
                              sectionTitle,
                            )
                          }
                        }}
                      />
                    )}
                    {secondaryAction?.title && (
                      <>
                        <RenderActionItem
                          url={secondaryAction?.url}
                          title={secondaryAction?.title}
                          navigationType={secondaryAction?.urlType}
                          variant={secondaryAction?.variant}
                          isActionButtonType={true}
                          buttonStyles={{
                            letterSpacing: "0.1em",
                            fontSize: "0.94vw",
                          }}
                          onClick={() => {
                            if (isFromProperty) {
                              modalStore?.setPropertyData(galleryImages)
                            }
                            navigate(secondaryAction?.url, secondaryAction?.urlType)
                          }}
                          image={secondaryAction?.image?.asset?._ref}
                          buttonImgStyles={{ width: "1.93vw" }}
                        />
                      </>
                    )}
                  </PrimaryAndSecondaryActionBox>
                )}
                {ctaLabel && (
                  <CtaLabelBox
                    onClick={() => {
                      if (onCtaClick) {
                        onCtaClick()
                      } else {
                        if (roomModalDetails) {
                          modalStore?.setPropertyData(roomModalDetails)
                        }
                        navigate(url, urlType)
                      }
                      handleHotelandOfferDetailsViewed(
                        url,
                        urlType,
                        isFromProperty,
                        isOffers,
                        isOffersAndPromotions,
                        isDestination,
                        isHotels,
                        dataLayer,
                        title,
                        ctaLabel,
                        brandName,
                        hotelType,
                        synxisHotelId,
                        hotelAddress,
                        _type,
                        contentType,
                        offerDate,
                        description,
                        isMobile,
                        sectionTitle,
                        isRestaurant,
                        isExclusiveOffers,
                      )
                    }}>
                    <Typography variant="link-m">{ctaLabel}</Typography>
                    {urlType !== CONSTANTS?.DIALOG && <StyledChevronRight />}
                  </CtaLabelBox>
                )}
              </ActionBox>
            )}
          </ContentBox>
        </Box>
      )}
    </Box>
  )
}

export default CardWithRightAlignedContent
