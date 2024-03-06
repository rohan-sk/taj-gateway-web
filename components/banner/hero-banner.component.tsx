import { useContext, useEffect, useState, Fragment, useMemo } from "react"
import Slider from "react-slick"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { theme } from "../../lib/theme"
import { ICONS } from "../constants"
import { observer } from "mobx-react-lite"
import { VolumeUp } from "@mui/icons-material"
import { Box, Stack, Typography } from "@mui/material"
import { GLOBAL_STORES } from "../../utils/Constants"
import { getVideoUrl, urlFor } from "../../lib-sanity"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import { useMobileCheck } from "../../utils/isMobilView"
import { HeaderSubTitle } from "./styles/mobile-hero-banner"
import { VerticalDivider } from "./guestRooms/GuestRoomStyles"
import { useAppNavigation } from "../../utils/NavigationUtility"
import getGiftCardDetails from "../../utils/fetchGiftCardDetails"
import { CommonCarouselStyles } from "../hoc/carousal-component-styles"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import {
  ContentBox,
  SearchText,
  TopGradientBox,
  BottomItemsBox,
  BottomGradientBox,
  VolumeControlButtonBox,
  BannerTitleLargeLogoWrappingBox,
  ReserveNowButtonAndContentWrapper,
  PointerBox,
  SearchIconParentBox,
} from "./styles"
import { useImageUtility } from "../../utils/hooks/useImageUtility"
import GiftCardStore from "../../features/giftCard/store/globalStore/gift-card.store"
import { useVoice } from "../../utils/useVoice"
import { VideoSEOScript } from "../../utils/VideoSEOScript"

const BasicModal = dynamic(() => import("../hoc/modal/modal"))
const SearchModal = dynamic(() => import("../modal/search-modal.component"))
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))
const CustomNextArrow = dynamic(() => import("../hoc/custom-arrows").then((module) => module.CustomNextArrow))
const CustomPrevArrow = dynamic(() => import("../hoc/custom-arrows").then((module) => module.CustomPrevArrow))
const HeroBannerMultiLineTitle = dynamic(() => import("../hoc/title/hero-banner-multi-line-title.component"))
const RenderSearchBar = dynamic(() => import("../SearchBar").then((module) => module.RenderSearchBar))

const HeroBanner = (props: any) => {
  const router = useRouter()
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const context: any = useContext(IHCLContext)
  const { getOptimizeImageUrl } = useImageUtility()

  const { sku, q } = router.query
  const PortableText = context!.PortableText

  const GCFormDetailsStore = context?.getGlobalStore(GLOBAL_STORES.gcStore) as GiftCardStore

  const cmsVideoUrl = props?.videoAsset?.videoPlay?.asset
  const cdnVideoUrl = props?.videoAsset?.videoUrl
  const isBannerWthAction = props?.variant === "banner-with-action"
  const galleryButtonImage = props?.primaryAction?.image?.asset?._ref
  const bannerImage = isMobile ? props?.imageAsset?.image : props?.imageAsset?.largeImage

  const [skuDetails, setSkuDetails] = useState<any>()
  const [fromMic, setFromMic] = useState<boolean>(false)
  const [muteVideo, setMuteVideo] = useState<boolean>(true)
  const [openModel, setOpenModel] = useState<boolean>(false)

  const GiftCardBanner = skuDetails?.bannerImage
  const hideBanner = props?.variant === "image-hider"
  const hideBottomGradient = props?.largeVariant === "image-without-gradient"
  const fullScreenImageWidth = props?.variant === "fullscreen-banner-image-width"
  const isSearchIconVariant = props?.searchFieldVariant === "ihcl.banner.search-icon"
  const allowSearchModal = ["ihcl.banner.global-search-field", "ihcl.banner.search-icon"]
  const globalSearchField = allowSearchModal?.includes(props?.searchFieldVariant)

  const controlVolume = () => (muteVideo === true ? setMuteVideo(false) : setMuteVideo(true))
  const handleOpen = () => navigate(props?.primaryAction?.url, props?.primaryAction?.urlType)
  const handleModelOpening = () => (openModel === true ? setOpenModel(false) : setOpenModel(true))

  const settings = {
    arrows: true,
    infinite: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    swipeToSlide: true,
    initialSlide: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: (
      <CustomPrevArrow
        cssData={{
          top: "45%",
          left: "4.5vw",
          width: "3.125vw",
          height: "3.125vw",
          background: `url(${ICONS?.TRANSPARENT_ARROW_LEFT}) no-repeat`,
          borderRadius: "50%",
          boxShadow: "-0.31vw 0.52vw 1.25vw rgba(0, 0, 0, 0.1)",
        }}
      />
    ),
    nextArrow: (
      <CustomNextArrow
        cssData={{
          top: "45%",
          right: "4.5vw",
          width: "3.125vw",
          height: "3.125vw",
          background: `url(${ICONS?.TRANSPARENT_ARROW_RIGHT}) no-repeat`,
          borderRadius: "50%",
          boxShadow: "-0.31vw 0.52vw 1.25vw rgba(0, 0, 0, 0.1)",
        }}
      />
    ),
  }

  const searchTerm = useMemo(() => {
    return global?.window !== undefined ? (q ? q : "") : ""
  }, [q])

  useEffect(() => {
    let GiftCardSKU = sku || GCFormDetailsStore?.GCThemeData?.sku
    if (GiftCardSKU) {
      let skuDetails = getGiftCardDetails(GiftCardSKU)
      skuDetails.then((data: any) => {
        GCFormDetailsStore?.updateGCThemeBanner(data?.[0]?.skuDetails?.bannerImage)
        setSkuDetails(data?.[0])
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sku, GCFormDetailsStore?.GCThemeData?.sku])
  const { isListening, listen } = useVoice()

  return (
    <>
      <Box
        sx={{
          position: "relative",
        }}>
        <Box
          sx={{
            position: "relative",
          }}>
          {props?.mediaType === "video" ? (
            <Box sx={{ minWidth: "100%", margin: "auto", height: "100vh" }}>
              <VideoSEOScript {...props?.videoAsset} />
              <video
                style={{ height: "100vh", objectFit: "cover" }}
                width={"100%"}
                loop={true}
                playsInline
                autoPlay={true}
                muted={muteVideo}>
                {(cmsVideoUrl || cdnVideoUrl) && (
                  <source src={cmsVideoUrl ? getVideoUrl(cmsVideoUrl) : cdnVideoUrl} type="video/mp4" />
                )}
              </video>
            </Box>
          ) : (
            bannerImage && (
              <>
                <Box width={"100%"}>
                  <CommonCarouselStyles>
                    <Slider {...settings}>
                      {bannerImage?.map((item: any, index: number) => (
                        <Fragment key={index}>
                          {fullScreenImageWidth ? (
                            <Box display={"block"} width={"100%"} height={"100vh"} className="hero-banner">
                              <Box
                                component={"img"}
                                src={`${getOptimizeImageUrl(urlFor(item?.asset?._ref)?.url(), 1)}`}
                                alt={item?.altText || `banner Image`}
                                style={{
                                  width: "100%",
                                  height: "100vh",
                                  objectFit: "cover",
                                  top: 0,
                                  left: 0,
                                }}
                              />
                            </Box>
                          ) : (
                            <Box key={index} display={"block!important"}>
                              <Box
                                sx={{
                                  visibility: hideBanner ? "hidden" : "visible",
                                }}
                                display={"block"}
                                alt={
                                  props?.dynamicGCBanner
                                    ? GiftCardBanner?.largeImage?.altText || item?.altText || `-img`
                                    : "-img"
                                }
                                width={"100%"}
                                height={"100%"}
                                loading={"lazy"}
                                component={"img"}
                                src={
                                  props?.dynamicGCBanner
                                    ? GiftCardBanner?.largeImage?.asset?._ref &&
                                      getOptimizeImageUrl(urlFor(GiftCardBanner?.largeImage?.asset?._ref)?.url(), 1)
                                    : item?.asset?._ref && getOptimizeImageUrl(urlFor(item?.asset?._ref).url(), 1)
                                }
                              />
                            </Box>
                          )}
                        </Fragment>
                      ))}
                    </Slider>
                  </CommonCarouselStyles>
                </Box>
              </>
            )
          )}
          {!hideBanner && (
            <PointerBox>
              <TopGradientBox $gradient={props?.aesthetic?.componentTopGradient} />
              {!hideBottomGradient && <BottomGradientBox $gradient={props?.aesthetic?.componentBottomGradient} />}
            </PointerBox>
          )}
        </Box>
        {props?.title && (
          <ContentBox
            $searchFieldIsNotAllowed={props?.searchFieldVariant! == undefined ? true : false}
            sx={{
              display: isBannerWthAction ? "block" : "flex",
              justifyContent: "space-between",
              flexDirection: props?.subTitle ? "column" : "",
            }}>
            <Box sx={{ width: "100%" }}>
              {(props?.title || props?.alignmentVariant || props?.largeImage?.asset?._ref) && (
                <BannerTitleLargeLogoWrappingBox $isNormalVariant={props?.alignmentVariant === "normal" ? true : false}>
                  {props?.alignmentVariant !== "normal" ? (
                    <Stack flexDirection={"column"} alignItems={"start"}>
                      {(props?.title || props?.alignmentVariant) && (
                        <HeroBannerMultiLineTitle
                          title={props?.title}
                          headingElement={props?.title?.headingElement}
                          aesthetic={props?.aesthetic}
                        />
                      )}
                      {(props?.subTitle || props?.dynamicGCBanner) && (
                        <HeaderSubTitle
                          $isNormalVariant={props?.alignmentVariant === "normal" ? true : false}
                          variant="heading-xs"
                          $marginLeft={props?.title?.desktopTitle?.length > 1 ? 0 : DesktopPxToVw(120)}>
                          {skuDetails?.heroSubtitle || props?.subTitle}
                        </HeaderSubTitle>
                      )}
                    </Stack>
                  ) : (
                    <Stack flexDirection={"column"} alignItems={"center"}>
                      {(props?.title || props?.alignmentVariant) && (
                        <Typography
                          color={theme?.palette?.ihclPalette?.hexOne}
                          lineHeight={"120%"}
                          whiteSpace={"nowrap"}
                          variant={isMobile ? "m-heading-l" : "heading-l"}>
                          {isMobile
                            ? props?.title?.mobileTitle || props?.title?.desktopTitle
                            : props?.title?.desktopTitle}
                        </Typography>
                      )}
                      {props?.subTitle && (
                        <HeaderSubTitle
                          $isNormalVariant={props?.alignmentVariant === "normal" ? true : false}
                          variant="heading-xs"
                          $marginLeft={DesktopPxToVw(55)}>
                          {props?.subTitle}
                        </HeaderSubTitle>
                      )}
                    </Stack>
                  )}
                  {props?.largeImage?.asset?._ref && (
                    <Box
                      alt={props?.largeImage?.altText || "banner-img"}
                      height={"100%"}
                      loading={"lazy"}
                      component={"img"}
                      src={urlFor(props?.largeImage?.asset?._ref)?.url()}
                    />
                  )}
                </BannerTitleLargeLogoWrappingBox>
              )}
              {searchTerm && <SearchText variant="heading-s">{searchTerm}</SearchText>}
            </Box>
            {galleryButtonImage && (
              <>
                {(galleryButtonImage || props?.primaryAction?.title) && (
                  <Box onClick={() => handleOpen()}>
                    <RenderActionItem
                      isActionButtonType={true}
                      url={props?.primaryAction?.url}
                      title={props?.primaryAction?.title}
                      variant={props?.primaryAction?.variant}
                      navigationType={props?.primaryAction?.urlType}
                      image={props?.primaryAction?.image?.asset?._ref}
                      buttonStyles={{
                        minWidth: "12.7vw",
                        display: "flex",
                        justifyContent: "flex-start",
                      }}
                      buttonImgStyles={{
                        width: "3.5vw",
                        height: "auto",
                        objectFit: "contain",
                        marginRight: "1.5vw",
                      }}
                    />
                  </Box>
                )}
              </>
            )}
            {isBannerWthAction && (
              <ReserveNowButtonAndContentWrapper>
                {props?.primaryAction?.title && (
                  <>
                    <RenderActionItem
                      isActionButtonType={true}
                      url={props?.primaryAction?.url}
                      title={props?.primaryAction?.title}
                      variant={props?.primaryAction?.variant}
                      navigationType={props?.primaryAction?.urlType}
                      buttonStyles={{
                        lineHeight: "140%",
                        letterSpacing: "1.8px",
                      }}
                    />
                    <VerticalDivider
                      orientation="vertical"
                      flexItem
                      sx={{
                        marginY: 0.8,
                        background: `${theme?.palette?.ihclPalette?.hexOne}!important`,
                      }}
                    />
                  </>
                )}
                <Box
                  sx={{
                    "> span": {
                      color: theme?.palette?.ihclPalette?.hexOne,
                    },
                  }}>
                  {props?.singleContent?.map((content: string | {}, idx: number) => (
                    <PortableText blocks={content} key={idx} />
                  ))}
                </Box>
              </ReserveNowButtonAndContentWrapper>
            )}
          </ContentBox>
        )}
        {(props?.mediaType === "video" || props?.searchFieldVariant) && (
          <BottomItemsBox
            sx={{
              justifyContent: props?.mediaType === "video" ? "unset" : "flex-end",
            }}>
            {props?.mediaType === "video" && (
              <Box
                sx={{
                  p: "0vw 3.2vw 0vw 6.1vw",
                  width: "auto",
                  visibility: "hidden",
                }}>
                <VolumeControlButtonBox onClick={() => controlVolume()}>
                  {muteVideo ? (
                    <Box
                      alt={`mic-img`}
                      loading={"lazy"}
                      component={"img"}
                      src={ICONS?.MIC_ICON}
                      sx={{ height: "3.125vw", width: "3.125vw" }}
                    />
                  ) : (
                    <VolumeUp />
                  )}
                </VolumeControlButtonBox>
              </Box>
            )}
            {!isMobile && !isBannerWthAction && props?.searchFieldVariant && (
              <Box
                sx={{
                  textAlign: "center",
                  pr: props?.mediaType === "video" ? "0" : "12.5vw",
                  width: props?.mediaType === "video" ? "75%" : "87.5vw",
                }}>
                <SearchIconParentBox
                  width={isSearchIconVariant ? "fit-content" : "100%"}
                  onClick={() => globalSearchField && handleModelOpening()}>
                  <RenderSearchBar props={props} variant={props?.searchFieldVariant} setFromMic={setFromMic} />
                </SearchIconParentBox>
              </Box>
            )}
            <>
              {(openModel || fromMic) && (
                <BasicModal
                  width={"100%"}
                  height={"100%"}
                  open={openModel}
                  bgcolor={""}
                  ModalCloseButtonColor={theme?.palette?.background?.paper}
                  handleClose={() => {
                    handleModelOpening()
                    fromMic && setFromMic(false)
                    isListening && listen()
                  }}
                  CloseIcon={ICONS?.CLOSE_WHITE_ICON}
                  webCloseIcon={ICONS?.CLOSE_WHITE_ICON}
                  Component={
                    <SearchModal
                      handleClose={() => {
                        handleModelOpening()
                        fromMic && setFromMic(false)
                      }}
                      fromMic={fromMic}
                      props={props}
                    />
                  }
                />
              )}
            </>
          </BottomItemsBox>
        )}
      </Box>
    </>
  )
}

export default observer(HeroBanner)
