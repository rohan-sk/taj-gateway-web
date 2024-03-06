import { theme } from "../../lib/theme"
import { CONSTANTS } from "../constants"
import dynamic from "next/dynamic"
import { urlFor } from "../../lib-sanity"
import { Box, Grid, Typography } from "@mui/material"
import React, { useContext, useState } from "react"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { useMobileCheck } from "../../utils/isMobilView"
import { ImageProps, parameterMapItems } from "../types"
import { useAesthetics } from "../../utils/fetchAsthetics"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { ActionProps, VideoProps } from "../types"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import {
  ContentWrapperBox,
  ImageActionWrapperBox,
  ContentTitleTypography,
  MainMediaWrapperContentBox,
  ActionButtonsWrapper,
  ButtonsCTAContainer,
} from "./styles/media-with-content-component.styles"
import { triggerEvent } from "../../utils/analytics"
import { GLOBAL_STORES, PAGE_STORES } from "../../utils/Constants"
import { GAStore, UserStore } from "../../store"
import { getCookie } from "../../utils/cookie"
import { UseAddress } from "../../utils/hooks/useAddress"
import { MemberDataLayer } from "../../utils/analytics/member-data-layer"
import { AFFILIATION, GIFT_CARD, PAGE_LANG, TAJ_HOTELS } from "../../utils/analytics/constants"
import { useImageUtility } from "../../utils/hooks/useImageUtility"
import { PageContext } from "../../PresentationalComponents/lib/prepare-page-context"
import { useBrowserCheck } from "../../utils/hooks/useBrowserCheck"
import manageGCStore from "../../features/giftCard/store/pageStore/manageGC.store"
import { getGiftCardType } from "../../lib/utils"
import VideoSEOScript from "../../utils/VideoSEOScript"
import { useRouter } from "next/router"
const CustomReadMore = dynamic(() => import("../hoc/CustomReadMore"))
const VideoPlayerModal = dynamic(() => import("../modal/video-player-modal.component"))
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))

interface MediaWithContentComponentProps {
  url: string
  _key: string
  content: any
  _type: string
  title: string
  metadata: any
  variant: string
  urlType: string
  ctaLabel: string
  mediaType: string
  image: ImageProps
  singleContent: any
  parentProps: any
  description: string
  largeVariant: string
  largeImage: ImageProps
  viewEventCallback: any
  videoAsset?: VideoProps
  charactersLimit: number
  isHeroTitleFont: boolean
  aesthetic: any
  primaryAction: ActionProps
  secondaryAction: ActionProps
  parameterMap?: parameterMapItems[]
  alignmentVariant?: string
  gridSize?: number
  headingElementForCard?: any
}
const MediaWithContentComponent = ({
  url,
  image,
  title,
  urlType,
  variant,
  content,
  ctaLabel,
  mediaType,
  aesthetic,
  videoAsset,
  largeImage,
  description,
  largeVariant,
  parameterMap,
  primaryAction,
  charactersLimit,
  isHeroTitleFont,
  secondaryAction,
  headingElementForCard,
  _type,
  alignmentVariant,
  gridSize = 2,
  parentProps,
}: MediaWithContentComponentProps) => {
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const { cardPadding, textColor, cardBackgroundColor } = useAesthetics(aesthetic?._ref)
  const [open, setOpen] = useState<boolean>(false)
  const [video, setVideo] = useState<string>("")
  const handleModelClose = () => setOpen(false)
  const Context = useContext(IHCLContext)
  const PortableText = Context!.PortableText
  const router = useRouter()

  const [more, setMore] = useState<number>(charactersLimit ?? CONSTANTS?.ITEM_DESCRIPTION_CHARACTER_LIMIT)
  const titleTextColor = aesthetic?.titleColor?.hex
  const rightMedia = largeVariant === "details.card.card-with-right-media-left-content-aspect-ratio-2:4"
  const leftMedia = largeVariant === "details.card.card-with-left-media-right-content-aspect-ratio-2:4"
  const rightHalfMedia = largeVariant === "details.card.card-with-left-media-right-content-aspect-ratio-2:2"

  const requiredPaddingForDescription = variant === "details.card.card-with-image-bottom-right-aligned-title"

  const videoUrl = videoAsset?.videoPlay?.asset?._ref
  const videoThumbnail = videoAsset?.videoThumbnail?.asset?._ref
  const IHCLContexts = useContext(IHCLContext)
  const pageContext = useContext(PageContext)

  const userStore = IHCLContexts?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const giftCardManageStore = pageContext?.getPageStore(PAGE_STORES?.giftCardManageCard) as manageGCStore

  const context = useContext(IHCLContext)
  const { isIos } = useBrowserCheck()
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const dataLayer = MemberDataLayer(userStore, gaStoreData, title, description, _type)
  const address = UseAddress(userStore)
  const { getOptimizeImageUrl } = useImageUtility()
  let giftCardType: string
  let pathname = global?.window?.location?.pathname
  let isGiftCard = pathname?.includes("gift-cards")
  const handleGCSelect = async (url: any, urlType: any, buttonTitle: string, giftCardType: any) => {
    if (url?.includes("sku")) {
      const gcSku = url?.split("=")?.[1]

      const gcTypeData: any = await getGiftCardType(gcSku)
      giftCardType = !!gcTypeData?.[0]?.isPhysicalGIftCard ? "Physical-gift card" : "E-gift card"
    }
    const sku = url?.split("=")[1]
    isGiftCard &&
      triggerEvent({
        action: "view_item",
        params: {
          event: "view_item",
          ...dataLayer,
          location: "",
          eventType: "",
          eventName: "",
          eventPlace: "",
          eventTicketsQty: "",
          eventDate: "",
          clientId: getCookie("_ga")?.slice(6),
          visitSource: "",
          datesToBook: "",
          arrivalDate: "",
          departureDate: "",
          noOfAdults: "",
          noOfChild: "",
          noOfRooms: "",
          brandName: "",
          giftCardCategory: giftCardType,
          giftCardType: title,
          giftCardValue: "",
          giftCardQuantity: "",
          offerName: "",
          offerCode: "",
          offerID: "",
          offerCategory: "",
          offerValidity: "",
          redemptionType: "",
          redemptionName: "",
          redemptionDescription: "",
          pointsType: "",
          pointstobeRedeemed: "",
          bookingType: "",
          bookingPaymentType: "",
          buttonLinkName: buttonTitle,
          link_url: url,
          link_text: buttonTitle,
          outbound: urlType == "internal" ? false : true,
          paymentType: "",
          userPinCode: address?.pinCode ? address?.pinCode : "",
          userState: address?.state ? address?.state : "",
          userCity: address?.cityTown ? address?.cityTown : "",
          pageHierarchy: JSON.parse(
            `["${TAJ_HOTELS}",` + `"${PAGE_LANG}",` + `"${AFFILIATION}",` + `"${url.replace("/", "").toUpperCase()}"]`,
          ),
          pageURL: `${global?.window?.location.origin}` + `${url}`,
          pageSection: title,
          ecommerce: {
            item_list_id: "",
            item_list_name: "",
            items: [
              {
                item_id: sku ? sku : "",
                item_name: title ? title : "",
                index: 0,
                item_category: GIFT_CARD,
                item_category2: giftCardType,
                item_category3: "New",
                item_category4: "",
                price: "",
                quantity: 1,
                affiliation: AFFILIATION,
                item_list_id: "",
                item_list_name: "",
              },
            ],
          },
        },
      })
  }
  const handleGcType = async (handleUrl: any, handleType: any) => {
    if (handleUrl?.includes("sku")) {
      await giftCardManageStore?.GCClearCart()
    }
    if (isGiftCard) {
      global?.window?.sessionStorage?.setItem("gcPurchaseStartPath", router?.asPath)
    }

    navigate(handleUrl, handleType)
    isGiftCard &&
      triggerEvent({
        action: "giftCardTypeSelected",
        params: {
          ...dataLayer,
          index: "",
          buttonLinkName: primaryAction?.title || "",
          link_text: primaryAction?.title || "",
          link_url: primaryAction?.url || "",
          eventType: "",
          eventName: "",
          eventPlace: "",
          eventTicketsQty: "",
          eventDate: "",
          clientId: getCookie("_ga")?.slice(6),
          giftCardCategory: "",
          giftCardType: title || "",
          outbound: primaryAction?.urlType?.toLowerCase() === "internal" ? false : true || false,
          item_name: title ? title : "",
          item_type: _type ? _type : "",
          no_of_items: "",
          pageHierarchy: JSON.parse(
            `["${TAJ_HOTELS}",` +
              `"${PAGE_LANG}",` +
              `"${AFFILIATION}",` +
              `"${primaryAction?.url.replace("/", "").toUpperCase()}"]`,
          ),
          pageURL: `${global?.window?.location.origin}` + `${primaryAction?.url}`,
        },
      })
  }
  return (
    <Box
      aria-label={isMobile ? variant : largeVariant}
      sx={{
        padding: isMobile
          ? cardPadding?.mobile || aesthetic?.padding?.mobile
          : cardPadding?.desktop || aesthetic?.padding?.desktop,
        backgroundColor: cardBackgroundColor || aesthetic?.backgroundColor?.hex,
      }}>
      <MainMediaWrapperContentBox
        sx={{
          flexDirection: isMobile
            ? "column-reverse"
            : rightMedia
            ? "row !important"
            : leftMedia
            ? "row-reverse !important"
            : "row",
        }}
        $isMobile={isMobile}>
        <ContentWrapperBox
          $leftMedia={leftMedia && leftMedia}
          $isMobile={isMobile}
          sx={{
            padding: isMobile ? (requiredPaddingForDescription ? `0 ${MobilePxToVw(82)}` : "unset") : "unset",
          }}>
          {parameterMap?.[0]?.key === CONSTANTS?.SPECIAL_TITLE && (
            <Box>
              {parameterMap?.map((item: parameterMapItems, index: number) => (
                <Typography key={index} variant={isMobile ? "m-heading-xs" : "heading-xs"}>
                  {item?.value}
                </Typography>
              ))}
            </Box>
          )}
          {title && (
            <Box>
              <ContentTitleTypography
                variant={
                  alignmentVariant === "regular-title-variable-font-size" && isMobile
                    ? "m-heading-s"
                    : isMobile
                    ? "m-heading-m"
                    : isHeroTitleFont
                    ? "heading-l"
                    : "heading-m"
                }
                $isMobile={isMobile}
                $isHeroTitleFont={isHeroTitleFont}
                $textColor={textColor || titleTextColor}
                sx={{
                  color: textColor
                    ? textColor
                    : titleTextColor
                    ? titleTextColor
                    : theme?.palette?.ihclPalette?.hexSeventeen,
                }}
                component={headingElementForCard || "h3"}>
                {title}
              </ContentTitleTypography>
            </Box>
          )}

          {parameterMap &&
            parameterMap?.[0]?.key !== CONSTANTS?.SPECIAL_TITLE &&
            parameterMap?.map((item: parameterMapItems, index: number) => (
              <Box key={index}>
                {item?.key === CONSTANTS?.PRICE ? (
                  <>
                    {item?.value && (
                      <Typography variant={isMobile ? "m-heading-m" : "heading-m"}>₹ {item?.value}</Typography>
                    )}
                  </>
                ) : (
                  <>
                    {item?.value && (
                      <Typography
                        variant={isMobile ? "m-body-l" : "body-ml"}
                        sx={{
                          fontSize: isMobile ? MobilePxToVw(22) : DesktopPxToVw(22),
                        }}>
                        {item?.key}: <b>{item?.value}</b>
                      </Typography>
                    )}
                  </>
                )}
              </Box>
            ))}
          {content && (
            <Box>
              {content && content?.map((item: any, idx: number) => <PortableText blocks={item?.content} key={idx} />)}
            </Box>
          )}
          {description && (
            <Box textAlign={"justify"}>
              <Typography
                variant={isMobile ? "m-body-sl" : "body-ml"}
                sx={{
                  color: textColor
                    ? textColor
                    : titleTextColor
                    ? titleTextColor
                    : theme?.palette?.ihclPalette?.hexSeventeen,
                }}>
                <CustomReadMore
                  length={more}
                  variant={isMobile ? "m-body-sl" : "body-ml"}
                  textStyles={{
                    color: textColor
                      ? textColor
                      : titleTextColor
                      ? titleTextColor
                      : theme?.palette?.ihclPalette?.hexSeventeen,
                  }}>
                  {description}
                </CustomReadMore>
              </Typography>
            </Box>
          )}
          {(primaryAction?.image?.asset?._ref || secondaryAction?.image?.asset?._ref) && (
            <ImageActionWrapperBox $isMobile={isMobile}>
              <Grid container spacing={5}>
                <Grid item md={6}>
                  {primaryAction?.image?.asset?._ref && (
                    <Box
                      width={"100%"}
                      height="100%"
                      component={"img"}
                      sx={{ cursor: "pointer" }}
                      alt={primaryAction?.image?.altText || "prim-img"}
                      src={getOptimizeImageUrl(urlFor(primaryAction?.image?.asset?._ref)?.url(), 1)}
                      onClick={() => primaryAction?.url && navigate(primaryAction?.url, primaryAction?.urlType)}
                    />
                  )}
                </Grid>
                <Grid item md={6}>
                  {secondaryAction?.image?.asset?._ref && (
                    <Box
                      width={"100%"}
                      height="100%"
                      alt={secondaryAction?.image?.altText || "sec-img"}
                      component={"img"}
                      sx={{ cursor: "pointer" }}
                      src={getOptimizeImageUrl(urlFor(secondaryAction?.image?.asset?._ref)?.url(), 1)}
                      onClick={() => secondaryAction?.url && navigate(secondaryAction?.url, secondaryAction?.urlType)}
                    />
                  )}
                </Grid>
              </Grid>
            </ImageActionWrapperBox>
          )}
          {(primaryAction?.title || secondaryAction?.title || ctaLabel) && (
            <ButtonsCTAContainer
              $leftMedia={leftMedia && leftMedia}
              $isSingleCTA={
                isMobile &&
                !!primaryAction?.title === false &&
                !!secondaryAction?.title === false &&
                !!ctaLabel === true
              }
              $isMobile={isMobile}>
              {(primaryAction?.title || secondaryAction?.title) && (
                <ActionButtonsWrapper
                  $isMobile={isMobile}
                  $isFromCarousal={parentProps?.fromCarousal}
                  $isSinglePrimary={
                    isMobile && !!primaryAction?.title && !!secondaryAction?.title === false && !!ctaLabel === false
                  }>
                  {primaryAction?.title && (
                    <RenderActionItem
                      url={primaryAction?.url}
                      isActionButtonType={true}
                      title={primaryAction?.title}
                      variant={primaryAction?.variant}
                      navigationType={primaryAction?.urlType}
                      onClick={() => {
                        handleGcType(primaryAction?.url, primaryAction?.urlType)
                        handleGCSelect(primaryAction?.url, primaryAction?.urlType, primaryAction?.title, giftCardType)
                      }}
                      buttonStyles={{
                        lineHeight: "140%",
                        letterSpacing: "1.8px",
                        width: "auto",
                        whiteSpace: "noWrap ",
                      }}
                    />
                  )}
                  {secondaryAction?.title && (
                    <RenderActionItem
                      url={secondaryAction?.url}
                      isActionButtonType={true}
                      title={secondaryAction?.title}
                      variant={secondaryAction?.variant}
                      navigationType={secondaryAction?.urlType}
                      buttonStyles={{
                        lineHeight: "140%",
                        letterSpacing: isIos ? "0vw" : "1.8px",
                        fontFamily: "supreme",
                        width: isMobile ? "50%" : "auto",
                        textWrap: secondaryAction?.title?.length < CONSTANTS?.TWELVE ? "nowrap !important" : "wrap",
                      }}
                    />
                  )}
                </ActionButtonsWrapper>
              )}
              {ctaLabel && (
                <RenderActionItem
                  url={url}
                  title={ctaLabel}
                  navigationType={urlType}
                  isActionButtonType={false}
                  buttonStyles={{
                    letterSpacing: "0.15em",
                    width: isMobile ? "100%" : "initial",
                  }}
                  variant={isMobile ? "m-text-link" : "link-m"}
                />
              )}
            </ButtonsCTAContainer>
          )}
        </ContentWrapperBox>
        <Box sx={{ width: "100%" }}>
          {mediaType === "video" ? (
            <Box
              alt="img"
              component="img"
              sx={{
                cursor: "pointer",
                width: isMobile ? "100%" : DesktopPxToVw(863),
                height: isMobile ? "100%" : DesktopPxToVw(480),
              }}
              src={videoThumbnail && urlFor(videoThumbnail).url()}
              onClick={() => {
                videoUrl && setVideo(videoUrl), setOpen(true)
              }}
            />
          ) : isMobile ? (
            image?.asset?._ref && (
              <Box
                component="img"
                alt={image?.altText || "image"}
                sx={{ width: "100%", height: "100%" }}
                src={getOptimizeImageUrl(urlFor(image?.asset?._ref).url(), isMobile ? 1 : gridSize)}
              />
            )
          ) : (
            largeImage?.asset?._ref && (
              <Box
                component="img"
                alt={largeImage?.altText || "image"}
                sx={{
                  width: DesktopPxToVw(rightHalfMedia ? 650 : 863),
                  //Commented as suggested by abhisheik
                  // height: DesktopPxToVw(480),
                }}
                src={getOptimizeImageUrl(urlFor(largeImage?.asset?._ref).url(), gridSize)}
              />
            )
          )}
        </Box>
        <VideoSEOScript {...videoAsset} />
        {open && <VideoPlayerModal videoUrl={video} handleModalOpen={open} handleModalClose={handleModelClose} />}
      </MainMediaWrapperContentBox>
    </Box>
  )
}

export default MediaWithContentComponent
