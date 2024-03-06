import { PathType } from "../../types"
import { theme } from "../../lib/theme"
import dynamic from "next/dynamic"
import { CONSTANTS } from "../constants"
import { urlFor } from "../../lib-sanity"
import { Box, Typography } from "@mui/material"
import React, { useContext, useEffect, useRef, useState } from "react"
import { useMobileCheck } from "../../utils/isMobilView"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { RichTextItems } from "../types"
import { CardWithDescriptionCard } from "./styles/card-with-description-actions"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import {
  SubTitleBox,
  RichTextBox,
  StyledDivider,
  CenterFlexBox,
  DescriptionTypo,
  StyledBulletIcon,
  ActionContentBox,
  CardContentParentBox,
  CardContentChildrenBox,
  RichTextValueTypography,
  ParameterMapWrappingContainer,
  HighLightsBox,
  LocationTypo,
} from "./styles/card-with-desc"
import { GLOBAL_STORES } from "../../utils/Constants"
import { GAStore, UserStore } from "../../store"
import ModalStore from "../../store/global/modal.store"
import { useAesthetics } from "../../utils/fetchAsthetics"
import { MemberDataLayer } from "../../utils/analytics/member-data-layer"
import { useImageUtility } from "../../utils/hooks/useImageUtility"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import useLocation from "../../utils/hooks/useLocation"
import { useBrowserCheck } from "../../utils/hooks/useBrowserCheck"
import { handleWellness } from "../../utils/analytics/events/NonEcommerce/hotel-details-viewed-event"
import { handleHotelBooking } from "../../utils/analytics/events/NonEcommerce/hotel-selected-event"
import VideoSEOScript from "../../utils/VideoSEOScript"
const VideoPlayerModal = dynamic(() => import("../modal/video-player-modal.component"))
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))
const CustomReadMore = dynamic(() => import("../hoc/CustomReadMore"))

interface parameterMapItems {
  key: string
  value: string
}

const CardWithDesc = ({
  url,
  title,
  image,
  variant,
  content,
  urlType,
  subTitle,
  ctaLabel,
  richText,
  mediaType,
  highlights,
  largeImage,
  videoAsset,
  description,
  parameterMap,
  largeVariant,
  aesthetic,
  primaryAction,
  charactersLimit,
  alignmentVariant,
  roomModalDetails,
  singleContent,
  ctaLabelAction,
  hotelType,
  hotelAddress,
  brandName,
  gridSize = 2,
  maxheight,
  headingElementForCard,
  onPrimaryClick,
  synxisHotelId,
  locationText,
  locationDescription,
  lat,
  long,
  _type,
  selectedTab,
  selectedTheme,
  setTitleHeight,
  setSubTitleHeight,
  contentType,
  guestUserEnrolNowButton,
  subTitleMaxHeight,
  setParameterContainerHeight,
  maxParameterHeight,
  hidePrimaryCTA = false,
}: any) => {
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const Context = useContext(IHCLContext)
  const PortableText = Context!.PortableText
  const mobileImage = image?.asset?._ref
  const webImage = largeImage?.asset?._ref
  const videoUrl = videoAsset?.videoPlay?.asset?._ref
  const videoThumbnail = videoAsset?.videoThumbnail?.asset?._ref
  const playIcon = videoAsset?.playIcon?.asset?._ref
  const smallVideoThumbnail = videoAsset?.smallVideoThumbnail?.asset?._ref
  const imageAltText = isMobile ? image?.altText || largeImage?.altText : largeImage?.altText
  const [open, setOpen] = useState<boolean>(false)
  const [video, setVideo] = useState<string>("")
  const [more, setMore] = useState<number>(
    charactersLimit ? charactersLimit : CONSTANTS?.ITEM_DESCRIPTION_CHARACTER_LIMIT,
  )
  const { getOptimizeImageUrl } = useImageUtility()
  const getLocation = useLocation()

  const IHCLContexts = useContext(IHCLContext)
  const userStore = IHCLContexts?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const modalStore = ModalStore.getInstance()
  const { textColor } = useAesthetics(aesthetic?._ref)
  const handleModelClose = () => setOpen(false)
  const context = useContext(IHCLContext)
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const dataLayer = MemberDataLayer(userStore, gaStoreData)
  const titleElementRef = useRef<HTMLElement | null>(null)
  const paramenterBoxRef = useRef<HTMLElement | null>(null)
  const subTitleElementRef = useRef<HTMLElement | null>(null)
  const { isIos } = useBrowserCheck()

  const titleHeight = titleElementRef?.current?.getBoundingClientRect()?.height
  const subTitleHeight = subTitleElementRef?.current?.getBoundingClientRect()?.height
  const parameterMapHeight = paramenterBoxRef?.current?.getBoundingClientRect()?.height

  useEffect(() => {
    if (setTitleHeight && titleHeight && maxheight < titleHeight) {
      setTitleHeight(titleHeight)
    }
    if (parameterMap && setParameterContainerHeight && parameterMapHeight && maxParameterHeight < parameterMapHeight) {
      setParameterContainerHeight(parameterMapHeight)
    }
  }, [
    maxheight,
    setTitleHeight,
    titleHeight,
    parameterMapHeight,
    setParameterContainerHeight,
    maxParameterHeight,
    parameterMap,
  ])

  useEffect(() => {
    if (setSubTitleHeight && subTitleHeight && subTitleMaxHeight < subTitleHeight) {
      setSubTitleHeight(subTitleHeight)
    }
  }, [subTitleMaxHeight, subTitleHeight, setSubTitleHeight])

  const redirectToGoogleMaps = async (DestinationLat: string, DestinationLng: string, url: string) => {
    const origin =
      getLocation?.latitude && getLocation?.longitude ? `${getLocation?.latitude},${getLocation?.longitude}` : ""
    const storeLat = DestinationLat || ""
    const storeLng = DestinationLng || ""
    const destination = storeLat && storeLng ? `${storeLat},${storeLng}` : ""
    if (isIos) {
      window.open(`maps://?saddr=${origin}&daddr=${destination}`, "_blank")
    } else {
      window.open(`${url}?api=1&origin=${origin}&destination=${destination}&travelmode=car`, "_blank")
    }
  }
  let pathname = global?.window?.location?.pathname
  let isVenues = pathname?.includes("meetings-and-event-venues")
  const isContent =
    primaryAction?.title ||
    ctaLabel ||
    title ||
    content?.length > 0 ||
    subTitle ||
    highlights ||
    description ||
    richText?.length > 0 ||
    parameterMap?.length > 0 ||
    singleContent?.length > 0
  return (
    <Box display={"flex"} flexDirection={"column"} aria-label={`variant: ${isMobile ? variant : largeVariant}`}>
      <CardWithDescriptionCard>
        {mediaType === "video" ? (
          <Box
            sx={{
              position: "relative",
              width: "100%",
              display: "grid",
              placeItems: "center",
            }}>
            <Box
              alt="img"
              component="img"
              sx={{
                cursor: "pointer",
                position: "absolute",
              }}
              src={playIcon && urlFor(playIcon).url()}
              onClick={() => {
                videoUrl && setVideo(videoUrl), setOpen(true)
              }}
            />
            <Box
              alt="img"
              component="img"
              width={"100%"}
              // Remaining content isn't visible under the image in fire-fox browser in the meetings page
              // height={"100%"}
              loading="lazy"
              sx={{ cursor: "pointer" }}
              src={
                isMobile
                  ? smallVideoThumbnail && urlFor(smallVideoThumbnail).url()
                  : videoThumbnail && urlFor(videoThumbnail).url()
              }
              onClick={() => {
                videoUrl && setVideo(videoUrl), setOpen(true)
              }}
            />
          </Box>
        ) : (
          ((isMobile && mobileImage) || (!isMobile && webImage)) && (
            <Box
              alt={imageAltText || `-img`}
              width={"100%"}
              // Remaining content isn't visible under the image in fire-fox browser in the meetings page
              // height={"100%"}
              component={"img"}
              loading="lazy"
              src={getOptimizeImageUrl(urlFor(isMobile ? mobileImage : webImage).url(), isMobile ? 1 : gridSize)}
              onClick={() => {
                url && navigate(url, urlType)
              }}
              sx={{ cursor: url ? "pointer" : "" }}
            />
          )
        )}

        {isContent && (
          <CardContentParentBox $title={title || singleContent} className={"content"}>
            {alignmentVariant === "preceding-hyphen-title" && (
              <StyledDivider sx={{ background: `${textColor} !important` }} />
            )}
            <CardContentChildrenBox $isMobile={isMobile}>
              {title && (
                <Box sx={{ minHeight: maxheight ? maxheight : "auto" }}>
                  <Typography
                    ref={titleElementRef}
                    variant={isMobile ? "m-heading-xs" : "heading-xs"}
                    component={headingElementForCard || "h3"}
                    sx={{
                      color: textColor,
                    }}>
                    {title}
                  </Typography>
                </Box>
              )}
              {content?.map((content: any, index: number) => (
                <CenterFlexBox key={index}>
                  <PortableText blocks={content?.content} key={index} />
                </CenterFlexBox>
              ))}
              {locationDescription && (
                <DescriptionTypo color={textColor} variant={isMobile ? "m-body-l" : "body-ml"}>
                  {locationDescription}
                  {lat && long && (
                    <LocationTypo
                      onClick={() => {
                        redirectToGoogleMaps(lat, long, "https://www.google.com/maps/dir/")
                      }}
                      variant={isMobile ? "m-body-l" : "body-ml"}>
                      {locationText || "View map"}
                    </LocationTypo>
                  )}
                </DescriptionTypo>
              )}
              {/* shifted this component to top as per quo fixes */}
              {subTitle && (
                <SubTitleBox
                  className="hide-box"
                  sx={{
                    minHeight: subTitleMaxHeight ? subTitleMaxHeight : "0vw",
                  }}>
                  <Typography ref={subTitleElementRef} variant={isMobile ? "m-body-sl" : "body-ml"}>
                    {subTitle}
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
              {description && (
                <DescriptionTypo
                  color={textColor}
                  variant={isMobile ? "m-body-sl" : "body-ml"}
                  className="hide-box description"
                  // ref={titleElementRef}
                  sx={{
                    minHeight: description?.length > more ? "auto !important" : DesktopPxToVw(90),
                    // height: maxheight ? maxheight : "auto",
                  }}>
                  {description.length > more ? (
                    <>
                      <CustomReadMore
                        length={more}
                        variant={isMobile ? "m-body-sl" : "body-ml"}
                        textStyles={{
                          color: textColor,
                        }}>
                        {description}
                      </CustomReadMore>
                    </>
                  ) : (
                    description
                  )}
                </DescriptionTypo>
              )}
              {parameterMap && isMobile && contentType === "allRestaurants" && (
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
              {parameterMap &&
                ((!isMobile && contentType === "allRestaurants") || contentType !== "allRestaurants") && (
                  <ParameterMapWrappingContainer
                    className="hide-box"
                    ref={paramenterBoxRef}
                    sx={{ minHeight: maxParameterHeight ? maxParameterHeight : "auto" }}>
                    {parameterMap?.map((item: parameterMapItems, index: number) => (
                      <Box key={index}>
                        <Typography variant={isMobile ? "m-body-l" : "body-ml"}>
                          {item?.key}:<b>{item?.value}</b>
                        </Typography>
                      </Box>
                    ))}
                  </ParameterMapWrappingContainer>
                )}
              {richText?.length > 0 && (
                <RichTextBox $maxLength={richText?.length > 1 ? true : false} className="hide-box">
                  {richText?.map((item: RichTextItems, index: number) => (
                    <Box
                      key={index}
                      display={"flex"}
                      alignContent={"center"}
                      sx={{
                        paddingBottom: DesktopPxToVw(15),
                        gap: isMobile ? MobilePxToVw(14) : "initial",
                        alignItems: "baseline",
                      }}>
                      {item?.richTextKey && (
                        <Typography
                          variant={isMobile ? "m-body-l" : "body-ml"}
                          display={"flex"}
                          width={isMobile ? MobilePxToVw(19) : DesktopPxToVw(19)}
                          height={isMobile ? MobilePxToVw(19) : DesktopPxToVw(19)}
                          alignContent={"center"}>
                          {item?.richTextKey}
                        </Typography>
                      )}
                      <RichTextValueTypography
                        $highlightColor={item?.highlightColor}
                        sx={{
                          color: item?.highlightColor ? "#AD8B3A" : "initial",
                          fontWeight: "300 !important",
                          wordBreak: "break-word",
                        }}
                        onClick={
                          item?.identifier === "contact-info" && isMobile
                            ? () => {
                                navigate(`tel:${item?.richTextValue}`, PathType?.external)
                              }
                            : item?.identifier === "email"
                            ? () => {
                                navigate(`mailto:${item?.richTextValue}`)
                              }
                            : () => {}
                        }
                        variant={isMobile ? "m-body-l" : "body-ml"}>
                        {item?.richTextValue}
                      </RichTextValueTypography>
                    </Box>
                  ))}
                </RichTextBox>
              )}
              {singleContent && (
                <Box>
                  <Typography
                    variant="m-body-s"
                    sx={{
                      "& span": {
                        fontSize: isMobile ? "3.438vw" : "1.146vw",
                      },
                    }}>
                    <PortableText blocks={singleContent} />
                  </Typography>
                </Box>
              )}
              {(primaryAction?.title || ctaLabel) && (
                <ActionContentBox
                  className="hide-box"
                  flexDirection={
                    isMobile
                      ? typeof (primaryAction?.title || ctaLabel) === typeof "" // as it is updated due to /en-in/taj-e-magazine cards need booknow right side
                        ? "row-reverse"
                        : "row"
                      : "row"
                  }>
                  {!hidePrimaryCTA && (
                    <RenderActionItem
                      isActionButtonType={primaryAction?.variant === "link" ? false : true}
                      url={primaryAction?.url}
                      title={guestUserEnrolNowButton?.title ? guestUserEnrolNowButton?.title : primaryAction?.title}
                      variant={primaryAction?.variant}
                      navigationType={primaryAction?.urlType}
                      onClick={() => {
                        onPrimaryClick ? onPrimaryClick() : navigate(primaryAction?.url, primaryAction?.urlType),
                          !isVenues &&
                            handleHotelBooking(
                              "hotelSelected",
                              primaryAction,
                              dataLayer,
                              brandName,
                              hotelAddress,
                              title,
                              synxisHotelId,
                              hotelType,
                              _type,
                              description,
                              selectedTheme,
                              selectedTab,
                            )
                      }}
                      buttonStyles={{
                        minWidth: primaryAction?.urlType === "dialog" ? "9.45vw" : "9.79vw",
                        letterSpacing: "0.1em",
                      }}
                    />
                  )}
                  <RenderActionItem
                    url={url}
                    title={ctaLabel}
                    isActionButtonType={false}
                    navigationType={urlType}
                    variant={isMobile ? "m-text-link" : "link-m"}
                    onClick={() => {
                      if (ctaLabelAction) {
                        handleWellness(
                          ctaLabel,
                          url,
                          dataLayer,
                          urlType,
                          title,
                          description,
                          brandName,
                          synxisHotelId,
                          hotelType,
                          hotelAddress,
                          _type,
                        )
                        ctaLabelAction()
                      } else {
                        if (roomModalDetails) {
                          modalStore?.setPropertyData(roomModalDetails)
                          navigate(url, urlType)
                        } else {
                          navigate(url, urlType)
                          handleWellness(
                            ctaLabel,
                            url,
                            dataLayer,
                            urlType,
                            title,
                            description,
                            brandName,
                            synxisHotelId,
                            hotelType,
                            hotelAddress,
                            _type,
                          )
                        }
                      }
                    }}
                    iconStyles={{
                      color: textColor ? `${textColor} !important` : theme?.palette?.ihclPalette?.hexTwo,
                    }}
                    linkStyles={{
                      color: textColor ? textColor : theme?.palette?.ihclPalette?.hexTwo,
                    }}
                    buttonStyles={{
                      letterSpacing: isMobile ? "0.281vw" : "unset",
                    }}
                  />
                </ActionContentBox>
              )}
            </CardContentChildrenBox>
          </CardContentParentBox>
        )}
      </CardWithDescriptionCard>
      <VideoSEOScript {...videoAsset} />
      {open && <VideoPlayerModal videoUrl={video} handleModalOpen={open} handleModalClose={handleModelClose} />}
    </Box>
  )
}

export default CardWithDesc
