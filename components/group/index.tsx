import React, { useContext, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { groq } from "next-sanity"
import { CONSTANTS } from "../constants"
import { getClient, urlFor } from "../../lib-sanity"
import { LogoWrapper } from "./styles/main-group-styles"
import { Box, Stack, useMediaQuery } from "@mui/material"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { SocialContentPrimaryActionButton } from "../hoc/title/styles"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import GroupComponentRenderingUtility from "../../utils/GroupComponentRendering"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"

const MultiRowTitle = dynamic(() => import("../hoc/title/multi-row-title"))
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))
const MemoizedHotelContactData = dynamic(() => import("../card/hotel-contact-text.component"))
const SocialContentTitle = dynamic(() => import("../hoc/title/social-content-title.component"))
const GroupWithThreeColumnCardsWithBorder = dynamic(() => import("./3-column-cards-with-border.component"))
const TabFilterLogic = dynamic(() => import("../../utils/GroupFilteringLogic/tabFilterLogic/tab-filter-logic"))
const MultiCardsCarousalWithBgImage = dynamic(() => import("../carousal/multi-cards-carousal-with-bg.component"))
const GroupFilterLogic = dynamic(() => import("../../utils/GroupFilteringLogic/searchFilterLogic/group-filter-logic"))
const MultiCardsCarousalWithGoldColorText = dynamic(
  () => import("../carousal/multi-cards-carousel-with-gold-color-text"),
)

export default function Group(props: any) {
  const { primaryAction, secondaryAction } = props
  const navigate = useAppNavigation()
  const context = useContext(IHCLContext)
  const PortableText = context!.PortableText
  const isMobile = useMediaQuery("(max-width:641px)")

  const accessToken = global?.window?.localStorage?.getItem("accessToken")
  const titleFontSizeVariant = GetTitleVariant(isMobile ? props?.variant : props?.largeVariant)
  const isStickyEnable = props?.largeVariant === "details.hotels.group.navigation-tabs"
  const SSOButton = props?.largeVariant === "authentication.group.grey-grid"
  const isBgImageCarousal = props?.largeVariant == "ihcl.core.group.carousel-with-back-ground-image"
  const isBgImageWithCarousel =
    props?.largeVariant == "common-utils.group.center-moving-carousel-with-background-gradient"

  const isOffersComponentWithBorders =
    props?.largeVariant === "offers.group.3-column-grid-with-no-borders-lines-for-cards" ||
    props?.largeVariant === "ihcl.core.group.3-column-grid-with-border"
  const isSocialContentGroup = props?.largeVariant === "ihcl.core.group.multiple-row-four-column-grid"

  const canExcludeTitle = ["ihcl.core.group.group-with-stepper-and-tabs", "giftCards.group.stepper-tabs"]?.includes(
    props?.largeVariant,
  )

  const canExcludeActionBtn = [
    "ihcl.core.group.default-without-action-button",
    "authentication.group.grey-grid",
    "bookings.group.booking-payment-return",
    "loyalty.group-4-cards-with-comperative-specifications",
  ]?.includes(props?.largeVariant)

  const isLogin = props?.largeVariant === "authentication.group.grey-grid"
  const isConfirmation = props?.largeVariant === "bookings.group.booking-payment-return"
  const isLoyalty = props?.largeVariant === "loyalty.tier-card-with-right-aligned-content"
  const reverseVideo = props?.variant === "businessServices.group.full-width-media-with-bottom-content"
  const isMultiSlides = props?.variant === "details.group.center-card-carousel" && props?.items?.length > 1
  const isLoyaltyForm =
    props?.variant === "loyalty.group.form-details-with-neucoins" ||
    props?.largeVariant === "loyalty.group.form-details-with-neucoins"
  const canExcludeLogo = ["details.group.full-width-media-with-logo"]?.includes(props?.largeVariant)

  const [padding, setPadding] = useState<any>()
  const [textColor, setTextColor] = useState<string>()
  const [bgGradientData, setBgGradientData] = useState<any>()
  const [backgroundColor, setBackgroundColor] = useState<any>()
  const [filteredProps, setFilteredProps] = useState<any>(props)
  const [isShown, setIsShown] = useState<any>(secondaryAction?.allowOnHoverProperty)

  useEffect(() => {
    if (!props?.filterConfig && !props?.tabsConfig?.enableTabs) {
      setFilteredProps(props)
    }
  }, [props])

  const fetchRef = async () => {
    const query = groq`*[_id in ["${props?.aesthetic?._ref}"]]`
    await getClient(true)
      .fetch(query)
      .then((data) => {
        setPadding(data?.[0]?.padding)
        setBackgroundColor(data?.[0]?.backgroundColor?.hex)
        setTextColor(data?.[0]?.titleColor?.hex)
        setBgGradientData({
          color: data?.[0]?.gradient,
          isGradient: data?.[0]?.isGradientEnabled,
        })
      })
  }
  const onView = (ref: any) => {
    if (props?.viewEventCallback) {
      props?.viewEventCallback(props, ref)
    }
  }
  const analyticsEventProps = {
    viewEventCallback: onView,
    analyticsData: props,
  }

  useEffect(() => {
    if (props?.aesthetic !== "NULL") {
      if (Object?.keys(props?.aesthetic || {})?.length > 0) {
        setPadding(props?.aesthetic?.padding)
        setBackgroundColor(props?.aesthetic?.backgroundColor?.hex)
        setTextColor(props?.aesthetic?.titleColor?.hex)
        setBgGradientData({
          color: props?.aesthetic?.gradient,
          isGradient: props?.aesthetic?.isGradientEnabled,
        })
      }
    }
  }, [props?.aesthetic])

  const selectedProps = filteredProps ? filteredProps : props
  const finalchildrenProps =
    selectedProps?.items?.length > 0
      ? {
          ...selectedProps,
          items: selectedProps?.items?.filter((item: any) => !item?.isHidden),
        }
      : selectedProps

  useEffect(() => {
    props?.aesthetic?._ref !== undefined && fetchRef()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props?.aesthetic])

  return (
    <>
      {!props?.isHidden && (
        <>
          {props?.tabsConfig?.enableTabs && (
            <TabFilterLogic props={filteredProps} originalData={props} setFilteredProps={setFilteredProps} />
          )}
          <Box
            id={isLoyaltyForm ? "loyaltyForm" : props?.largeVariant}
            sx={{
              position: !isMobile ? (isStickyEnable ? "sticky" : "") : "",
              top: !isMobile ? (isStickyEnable ? DesktopPxToVw(0) : "") : "",
              zIndex: !isMobile ? (isStickyEnable ? "9" : "") : "",

              background: bgGradientData?.isGradient ? `${bgGradientData?.color}` : backgroundColor,
              backgroundImage: !bgGradientData?.isGradient
                ? (isMobile ? props?.mobileBackgroundImage?.asset?._ref : props?.backgroundImage?.asset?._ref)
                  ? `url(${urlFor(
                      isMobile ? props?.mobileBackgroundImage?.asset?._ref : props?.backgroundImage?.asset?._ref,
                    )})`
                  : "none"
                : "",
              padding: isMobile
                ? props?.aesthetic?.padding?.mobile || padding?.mobile
                : props?.aesthetic?.padding?.desktop || padding?.desktop
                ? !isBgImageCarousal &&
                  !isBgImageWithCarousel &&
                  (props?.aesthetic?.padding?.desktop || padding?.desktop)
                : props?.largeVariant === "offers.group.t&c-dropdown-content-layout-placeholder"
                ? ""
                : props?.largeVariant === "authentication.group.grey-grid"
                ? props?.aesthetic?.padding?.desktop || padding?.desktop
                  ? props?.aesthetic?.padding?.desktop || padding?.desktop
                  : "2.917vw 4.6875vw 2.917vw 4.6875vw"
                : "",
              margin:
                props?.largeVariant === "businessServices.group.group-with-1:2-outer-padding"
                  ? isMobile
                    ? `${MobilePxToVw(90)} ${MobilePxToVw(54)}`
                    : `${DesktopPxToVw(110)} ${DesktopPxToVw(237)}`
                  : "",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}>
            {props?.logo?.asset?._ref && !canExcludeLogo && (
              <LogoWrapper>
                <Box
                  loading="lazy"
                  component="img"
                  alt="back2top"
                  src={urlFor(props?.logo?.asset?._ref).url()}
                  width={
                    isConfirmation
                      ? isMobile
                        ? MobilePxToVw(70)
                        : DesktopPxToVw(70)
                      : isLogin
                      ? isMobile
                        ? MobilePxToVw(200)
                        : DesktopPxToVw(200)
                      : "auto"
                  }
                />
              </LogoWrapper>
            )}
            {(isBgImageCarousal && !isMobile) ||
            isOffersComponentWithBorders ||
            (isBgImageWithCarousel && !isMobile) ? (
              <>
                {isBgImageCarousal && (
                  <MultiCardsCarousalWithBgImage props={props} padding={padding} {...analyticsEventProps} />
                )}
                {isOffersComponentWithBorders && (
                  <GroupWithThreeColumnCardsWithBorder
                    props={props}
                    showDivider={props?.largeVariant === "ihcl.core.group.3-column-grid-with-border" ? true : false}
                    renderItemsCount={props?.preRenderItemsCount}
                  />
                )}
                {isBgImageWithCarousel && (
                  <MultiCardsCarousalWithGoldColorText props={props} padding={padding} {...analyticsEventProps} />
                )}
              </>
            ) : (
              <Box
                width={"100%"}
                display={reverseVideo ? "flex" : "unset"}
                flexDirection={reverseVideo ? "column-reverse" : "unset"}>
                {isSocialContentGroup ? (
                  <SocialContentTitle {...props} />
                ) : (
                  //below 3 lines are for gift card dynamic titles
                  // if variant is of gift card below component will not execute
                  ((!isMobile && props?.largeVariant && !canExcludeTitle) ||
                    (isMobile && props?.variant && !canExcludeTitle)) && (
                    <>
                      <MultiRowTitle
                        {...props}
                        isFilterAvailable={props?.largeVariant === "ihcl.core.group.default-tabs-title"}
                        titleVariant={titleFontSizeVariant}
                        titleTextColor={textColor}
                      />
                      {props?.description && (
                        <Box mb={isMobile ? MobilePxToVw(30) : DesktopPxToVw(30)}>
                          {props?.isConfirmationPage ? (
                            <Box
                              sx={{
                                margin: "0 auto",
                                textAlign: "center",
                                maxWidth: isMobile ? MobilePxToVw(490) : DesktopPxToVw(480),
                              }}>
                              <MemoizedHotelContactData
                                groupContent={props?.description}
                                identifier={props?.isConfirmationPage}
                                reservationNumber={props?.contactDetails}
                              />
                            </Box>
                          ) : (
                            props?.description?.map((content: string | {}, idx: number) => (
                              <PortableText blocks={content} key={idx} />
                            ))
                          )}
                        </Box>
                      )}
                    </>
                  )
                )}

                <Box mb={reverseVideo ? MobilePxToVw(55) : 0}>
                  {props?.filterConfig && (
                    <GroupFilterLogic
                      dynamicTabs
                      props={props}
                      textColor={textColor}
                      setFilteredProps={setFilteredProps}
                      backgroundColor={backgroundColor}
                    />
                  )}

                  <GroupComponentRenderingUtility
                    context={context}
                    isMobile={isMobile}
                    analyticsEventProps={analyticsEventProps}
                    filteredProps={finalchildrenProps}
                    backgroundColor={backgroundColor}
                    textColor={textColor}
                    isLoyalty={isLoyalty}
                  />
                </Box>
                {secondaryAction?.title &&
                  (isSocialContentGroup && isMobile ? (
                    <SocialContentPrimaryActionButton
                      variant={"light-outlined"}
                      onMouseEnter={() => setIsShown(!secondaryAction?.allowOnHoverProperty)}
                      onMouseLeave={() => setIsShown(secondaryAction?.allowOnHoverProperty)}
                      onClick={() => navigate(secondaryAction?.url, secondaryAction?.urlType)}>
                      {secondaryAction?.image && isShown && (
                        <Box
                          width={"20px"}
                          height={"20px"}
                          sx={{
                            marginRight: isMobile ? "5px" : "auto",
                          }}
                          alt={`-img`}
                          loading="lazy"
                          component={"img"}
                          src={urlFor(secondaryAction?.image).url()}
                        />
                      )}
                      {secondaryAction?.OnHoverField?.image && !isShown && (
                        <Box alt={`-img`} component={"img"} src={urlFor(secondaryAction?.OnHoverField?.image).url()} />
                      )}
                      {secondaryAction?.title}
                    </SocialContentPrimaryActionButton>
                  ) : !isMobile ? (
                    <Stack
                      flexDirection={isMobile ? "row-reverse" : "row"}
                      columnGap={isMobile ? "3.125vw" : "1.042vw"}
                      justifyContent={"center"}
                      alignItems={"flex-end"}
                      display={canExcludeActionBtn ? "block" : "none"}>
                      {/* Primary Action Button */}
                      {primaryAction?.title && (
                        <>
                          {!isSocialContentGroup && (
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}>
                              <RenderActionItem
                                url={primaryAction?.url}
                                title={primaryAction?.title}
                                navigationType={primaryAction?.urlType}
                                variant={primaryAction?.variant}
                                isActionButtonType={
                                  primaryAction?.variant === CONSTANTS?.VARIANT_LINK_TYPE ? false : true
                                }
                                buttonStyles={{
                                  marginTop: !accessToken ? DesktopPxToVw(12) : DesktopPxToVw(60),
                                }}
                              />
                            </Box>
                          )}
                        </>
                      )}
                      {/* Secondary Action Button */}
                      {secondaryAction?.title && (
                        <>
                          {!isSocialContentGroup && (
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                              }}>
                              <RenderActionItem
                                url={secondaryAction?.url}
                                title={secondaryAction?.title}
                                navigationType={secondaryAction?.urlType}
                                variant={secondaryAction?.variant}
                                isActionButtonType={
                                  secondaryAction?.variant === CONSTANTS?.VARIANT_LINK_TYPE ? false : true
                                }
                                buttonStyles={{
                                  letterSpacing: "1.8px",
                                  marginTop: isLogin
                                    ? DesktopPxToVw(0)
                                    : isLoyalty
                                    ? isMobile
                                      ? MobilePxToVw(55)
                                      : DesktopPxToVw(80)
                                    : DesktopPxToVw(80), // this gap is taken from global template
                                }}
                                widgetTitle={props?.parameterMap?.[0]?.value}
                                widgetType={props?._type}
                                isSocialContentGroup={isSocialContentGroup}
                              />
                            </Box>
                          )}
                        </>
                      )}
                    </Stack>
                  ) : (
                    <Stack
                      mt={
                        SSOButton ? "0vw" : isMobile ? (isMultiSlides ? MobilePxToVw(90) : MobilePxToVw(40)) : "2.083vw"
                      }
                      flexDirection={isMobile ? "row-reverse" : "row"}
                      columnGap={isMobile ? "3.125vw" : "1.042vw"}
                      justifyContent={"center"}>
                      {/* Primary Action Button */}
                      {primaryAction?.title && (
                        <>
                          {!isSocialContentGroup && (
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}>
                              <RenderActionItem
                                url={primaryAction?.url}
                                title={primaryAction?.title}
                                navigationType={primaryAction?.urlType}
                                variant={primaryAction?.variant}
                                isActionButtonType={
                                  primaryAction?.variant === CONSTANTS?.VARIANT_LINK_TYPE ? false : true
                                }
                              />
                            </Box>
                          )}
                        </>
                      )}
                      {/* Secondary Action Button */}
                      {secondaryAction?.title && (
                        <>
                          {!isSocialContentGroup && (
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                              }}>
                              <RenderActionItem
                                url={props?.secondaryAction?.url}
                                title={props?.secondaryAction?.title}
                                variant={props?.secondaryAction?.variant}
                                navigationType={props?.secondaryAction?.urlType}
                                isActionButtonType={
                                  props?.secondaryAction?.variant === CONSTANTS?.VARIANT_LINK_TYPE ? false : true
                                }
                                buttonStyles={{
                                  minWidth: SSOButton ? "9.167vw" : "13.59vw",
                                  height: "3.17vw",
                                  letterSpacing: "0.1em",
                                }}
                                linkStyles={{ color: textColor ?? "" }}
                                iconStyles={{
                                  color: `${textColor} !important` ?? "",
                                }}
                              />
                            </Box>
                          )}
                        </>
                      )}
                    </Stack>
                  ))}
              </Box>
            )}
          </Box>
        </>
      )}
    </>
  )
}

/*
 *Written to get title variant for specific components
 */
function GetTitleVariant(variant: string) {
  const isMobile = useMediaQuery("(max-width:641px)")
  switch (variant) {
    case "bookings.group.booking-payment-return":
      return isMobile ? "m-heading-s" : "heading-m"
    case "myAccount.group.section-specific-details":
      return isMobile ? "m-heading-s" : "heading-m"
    case "authentication.group.membership-carousel":
      return isMobile ? "m-heading-xs" : "heading-xs"
    case "ihcl.core.group.multiple-square-card-carousel":
      return isMobile ? "m-heading-xs" : "heading-xs"
    case "ihcl.core.group.toll-free-no":
      return isMobile ? "m-heading-m" : "heading-m"
    case "ihcl.core.group.option-selector-popup-modal":
      return isMobile ? "m-heading-m" : "heading-m"
    case "ihcl.core.group.multiple-square-card-carousel":
      return isMobile ? "m-heading-xs" : "heading-xs"
    case "partners.group.multiple-row-2-column-grid":
      return isMobile ? "m-heading-xs" : "heading-xs"
    case "ihcl.core.group.group-with-multiple-buttons":
      return isMobile ? "m-heading-s" : "heading-s"
    default:
      return isMobile ? "m-heading-m" : "heading-l"
  }
}
