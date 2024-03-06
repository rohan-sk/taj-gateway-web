import React, { useContext, useState } from "react"
import { theme } from "../../lib/theme"
import { urlFor } from "../../lib-sanity"
import dynamic from "next/dynamic"
import { getCookie } from "../../utils/cookie"
import { CONSTANTS, ICONS } from "../constants"
import { GAStore, UserStore } from "../../store"
import { triggerEvent } from "../../utils/analytics"
import { Box, Grid, Typography } from "@mui/material"
import { GoldMoreIcon } from "../../utils/customIcons"
import { ImageProps, parameterMapItems } from "../types"
import { useMobileCheck } from "../../utils/isMobilView"
import { UseAddress } from "../../utils/hooks/useAddress"
import { useAesthetics } from "../../utils/fetchAsthetics"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { GLOBAL_STORES } from "../../utils/Constants"
import { ActionProps, VideoProps } from "../types"
import { useImageUtility } from "../../utils/hooks/useImageUtility"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { MemberDataLayer } from "../../utils/analytics/member-data-layer"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { PageContext } from "../../PresentationalComponents/lib/prepare-page-context"
import { GIFT_CARD, PAGE_LANG, TAJ_HOTELS, AFFILIATION } from "../../utils/analytics/constants"
import {
  ContentWrapperBox,
  ActionButtonsWrapper,
  ButtonsCTAContainer,
  ImageActionWrapperBox,
  ContentTitleTypography,
  MainMediaWrapperContentBox,
} from "./styles/media-with-content-component.styles"
import GiftCardStore from "../../features/giftCard/store/globalStore/gift-card.store"
import PortableTextReadMore from "../hoc/PortableTextReadMore"
import VideoSEOScript from "../../utils/VideoSEOScript"
const BasicModal = dynamic(() => import("../hoc/modal/modal"))
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))
const MediaCardDescriptionContent = dynamic(() => import("./media-card-description-content"))
const VideoPlayerModal = dynamic(() => import("../modal/video-player-modal.component"))

interface CardMediaWithPopUpContentComponentProps {
  url: string
  _key: string
  content: any
  _type: string
  title: string
  metadata: any
  aesthetic: any
  variant: string
  urlType: string
  ctaLabel: string
  parentProps: any
  mediaType: string
  image: ImageProps
  gridSize?: number
  singleContent: any
  description: string
  largeVariant: string
  largeImage: ImageProps
  viewEventCallback: any
  videoAsset?: VideoProps
  charactersLimit: number
  isHeroTitleFont: boolean
  alignmentVariant?: string
  primaryAction: ActionProps
  headingElementForCard?: any
  secondaryAction: ActionProps
  enrichedDescription?: any
  parameterMap?: parameterMapItems[]
}
const CardMediaWithPopUpContentComponent = ({
  url,
  image,
  title,
  _type,
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
  gridSize = 2,
  parentProps,
  parameterMap,
  primaryAction,
  charactersLimit,
  isHeroTitleFont,
  secondaryAction,
  alignmentVariant,
  enrichedDescription,
  headingElementForCard,
}: CardMediaWithPopUpContentComponentProps) => {
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const { cardPadding, textColor, cardBackgroundColor } = useAesthetics(aesthetic?._ref)
  const [open, setOpen] = useState<boolean>(false)
  const [video, setVideo] = useState<string>("")
  const handleModelClose = () => setOpen(false)
  const Context = useContext(IHCLContext)
  const PortableText = Context!.PortableText

  const [more, setMore] = useState<number>(charactersLimit ?? CONSTANTS?.ITEM_DESCRIPTION_CHARACTER_LIMIT)
  const [openDescriptionModel, setOpenDescriptionModel] = useState<boolean>(false)
  const titleTextColor = aesthetic?.titleColor?.hex

  const videoUrl = videoAsset?.videoPlay?.asset?._ref
  const videoThumbnail = videoAsset?.videoThumbnail?.asset?._ref
  const IHCLContexts = useContext(IHCLContext)
  const userStore = IHCLContexts?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore

  const context = useContext(IHCLContext)
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const dataLayer = MemberDataLayer(userStore, gaStoreData, title, description, _type)
  const address = UseAddress(userStore)
  const { getOptimizeImageUrl } = useImageUtility()

  const GCFormDetailsStore = IHCLContexts?.getGlobalStore(GLOBAL_STORES.giftCardStore) as GiftCardStore

  const giftCardType = GCFormDetailsStore?.GCThemeData?.isPhysicalGIftCard ? "Physical-gift card" : "E-gift card"
  let pathname = global?.window?.location?.pathname
  let isMeetingPage = pathname?.includes("meetings")
  let isBussinessPage = pathname?.includes("business-service-sme")
  let luxuryPage = pathname?.includes("luxury-spa")
  const handleGCSelect = async (url: any, urlType: any, buttonTitle: string) => {
    const sku = url?.split("=")[1]
    !isMeetingPage &&
      !isBussinessPage &&
      !luxuryPage &&
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
          giftCardCategory: title,
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
  const handleGcType = (handleUrl: any, handleType: any) => {
    navigate(handleUrl, handleType)
    !isMeetingPage &&
      !isBussinessPage &&
      !luxuryPage &&
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
          flexDirection: isMobile ? "column" : "row",
        }}
        $isMobile={isMobile}>
        <ContentWrapperBox $isMobile={isMobile}>
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
                    : theme?.palette?.neuPalette?.hexSeventeen,
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
          {enrichedDescription && (
            <Box textAlign={"justify"}>
              <PortableTextReadMore
                variant={isMobile ? "m-body-sl" : "body-ml"}
                length={more}
                onClick={() => {
                  setOpenDescriptionModel(!openDescriptionModel)
                }}>
                {enrichedDescription}
              </PortableTextReadMore>
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
                    : theme?.palette?.neuPalette?.hexSeventeen,
                }}>
                {description?.slice(0, more)}
                {description?.length > more && (
                  <>
                    {!openDescriptionModel && <span>{`...`}</span>}
                    <span
                      onClick={() => {
                        setOpenDescriptionModel(!openDescriptionModel)
                      }}
                      style={{
                        cursor: "pointer",
                      }}
                      contentEditable="false"
                      suppressContentEditableWarning={true}>
                      {!openDescriptionModel && <GoldMoreIcon sx={{ display: "inherit !important" }} />}
                    </span>
                  </>
                )}
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
                      alt={primaryAction?.image?.altText || "prim-img"}
                      component={"img"}
                      sx={{ cursor: "pointer" }}
                      src={urlFor(primaryAction?.image?.asset?._ref)?.url()}
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
                      src={urlFor(secondaryAction?.image?.asset?._ref)?.url()}
                      onClick={() => secondaryAction?.url && navigate(secondaryAction?.url, secondaryAction?.urlType)}
                    />
                  )}
                </Grid>
              </Grid>
            </ImageActionWrapperBox>
          )}
          {(primaryAction?.title || secondaryAction?.title || ctaLabel) && (
            <ButtonsCTAContainer
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
                        handleGCSelect(primaryAction?.url, primaryAction?.urlType, primaryAction?.title)
                        handleGcType(primaryAction?.url, primaryAction?.urlType)
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
                        letterSpacing: "1.8px",
                        width: isMobile ? "50%" : "auto",
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
                alt={`${image?.altText || "img"}`}
                component="img"
                sx={{ width: "100%", height: "100%" }}
                src={getOptimizeImageUrl(urlFor(image?.asset?._ref).url(), gridSize)}
              />
            )
          ) : (
            largeImage?.asset?._ref && (
              <Box
                component="img"
                alt={`${largeImage?.altText || "img"}`}
                sx={{
                  width: DesktopPxToVw(863),
                }}
                src={getOptimizeImageUrl(urlFor(largeImage?.asset?._ref).url(), gridSize)}
              />
            )
          )}
        </Box>
        <VideoSEOScript {...videoAsset} />
        {open && <VideoPlayerModal videoUrl={video} handleModalOpen={open} handleModalClose={handleModelClose} />}
      </MainMediaWrapperContentBox>
      {openDescriptionModel && (
        <BasicModal
          width={"100%"}
          height={"100%"}
          ModalCloseButtonColor={theme?.palette?.neuPalette?.hexOne}
          handleClose={() => setOpenDescriptionModel(!openDescriptionModel)}
          open={openDescriptionModel}
          Component={
            <MediaCardDescriptionContent
              description={description}
              title={title}
              enrichedDescription={enrichedDescription}
            />
          }
          ModalCloseButtonStyles={{
            marginBottom: "1.04vw",
            right: DesktopPxToVw(478),
          }}
          mobileTop={"8.625vw !important"}
          iconRight="7.375vw !important"
          CloseIcon={ICONS?.CLOSE_GOLD_ICON}
          webCloseIcon={ICONS?.CLOSE_WHITE_ICON}
          mSiteCloseStyles={{
            padding: `${MobilePxToVw(68)} ${MobilePxToVw(58)} 0`,
          }}
        />
      )}
    </Box>
  )
}

export default CardMediaWithPopUpContentComponent
