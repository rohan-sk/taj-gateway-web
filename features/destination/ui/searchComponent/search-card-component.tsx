import React, { useContext } from "react"
import { observer } from "mobx-react-lite"
import dynamic from "next/dynamic"
import { theme } from "../../../../lib/theme"
import RoomIcon from "@mui/icons-material/Room"
import CallIcon from "@mui/icons-material/Call"
import MailIcon from "@mui/icons-material/Mail"
import CircularProgress from "@mui/material/CircularProgress"
import { UserStore } from "../../../../store"
import { urlFor } from "../../../../lib-sanity"
import { hotelRoute } from "../../../property/ui/constants"
import { GLOBAL_STORES } from "../../../../utils/Constants"
import { Box, Button, Grid, Typography } from "@mui/material"
import { Aminity, ActionBtnContainer } from "./searchStyles"
import { currencyPrettier } from "../../../../utils/currency"
import { useMobileCheck } from "../../../../utils/isMobilView"
import { useLoggedIn } from "../../../../utils/hooks/useLoggedIn"
import { useAppNavigation } from "../../../../utils/NavigationUtility"
import getNonTajBrandCrossURL from "../../../../utils/getCrossBrandURL"
import { SEARCH_CARD_CONSTANTS, brandsToShowPrices } from "../../../../components/constants"
import { useImageUtility } from "../../../../utils/hooks/useImageUtility"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { CrossSiteNavigation } from "../../../../utils/sso/cross-site-navigation"
import BookingFlowGlobalStore from "../../../booking/store/globalStore/booking.flow.store"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import {
  CommonSpaceGrid,
  DetailsTypography,
  Diamond,
  FullDivider,
  IconTitleBox,
  IconWrapper,
  MailTitle,
  MainGrid,
  RatePriceBox,
  SearchDetailsGrid,
} from "../../../../components/card/SearchResultCards/styles/search-card"

const CustomReadMore = dynamic(() => import("../../../../components/hoc/CustomReadMore"))
const RenderActionItem = dynamic(() => import("../../../../components/hoc/actions/action-items-ui"))

export const gridBreakPointsGenerator = (isMobile: boolean, website: number = 12, mobile: number = 12) => {
  return {
    xs: mobile,
    sm: isMobile ? mobile : website,
    md: website,
    lg: website,
    xl: website,
  }
}

const SearchCardComponent = (props: any) => {
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const isUserLoggedIn = useLoggedIn()
  const context = useContext(IHCLContext)
  const { getOptimizeImageUrl } = useImageUtility()

  const userStore = context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const bookingFlowGlobalStore = context?.getGlobalStore(GLOBAL_STORES?.bookingFlowStore) as BookingFlowGlobalStore

  const { guestDetails, guestBookingSchedule, userEnteredPromoCode, loading } = bookingFlowGlobalStore

  const headingElement = "h2"
  const secondaryAction = props?.cardActionType?.find(
    (action: any) => action?.actionType === "secondaryAction",
  )?.secondaryAction

  const ctaLabel = props?.cardActionType?.find((action: any) => action?.actionType === "ctaLabel")?.ctaLabel

  const handleActionClick = async (isBookNowAction: boolean = false, type = "") => {
    const brandName = props?.brandName
    if (brandName?.toLowerCase() !== "taj") {
      const URL = getNonTajBrandCrossURL(
        brandName,
        props?.identifier,
        guestBookingSchedule?.userCheckOutDate,
        guestBookingSchedule?.userCheckInDate,
        guestDetails?.data,
        type,
        userEnteredPromoCode?.promoCode,
        "",
        userEnteredPromoCode?.agentId,
        userEnteredPromoCode?.couponCode,
        props?.searchTaxonomies?.synxisHotelId,
      )
      await CrossSiteNavigation({
        url: URL,
        loggedIn: isUserLoggedIn,
        userStore,
      })
    } else if (!isBookNowAction && ctaLabel?.title) {
      navigate(`${ctaLabel?.url}hotels/${props?.identifier}`, ctaLabel?.urlType)
    } else if (isBookNowAction && secondaryAction?.title) {
      navigate(`${secondaryAction?.url}?hotelId=${props?.hotelId}`, secondaryAction?.urlType)
    }
  }

  const fetBrandName = () => {
    switch (props?.brandName) {
      case "Ginger":
        return "none"
      case "AMA":
        return "none"
      case "Vivanta":
        return "none"
      case "Seleqtions":
        return "none"
      default:
        return "block"
    }
  }

  const getLocationDetails = () => {
    const hotelAddress = props?.hotelAddress
    const details = [
      hotelAddress?.addressLine1,
      hotelAddress?.city,
      hotelAddress?.state,
      hotelAddress?.pincode,
      hotelAddress?.country,
    ]
    const finalAddress = details
      ?.filter((detail: any, index: number) => {
        if (hotelAddress?.city === hotelAddress?.state && index === 2) {
          return null
        } else {
          return detail
        }
      })
      ?.filter((item: any) => item)
      ?.join(", ")
    return finalAddress
  }

  const getCharacterLimit = () => {
    const characterLength = props?.description?.length
    const minLimit = isMobile ? 117 : 140
    const maxLimit = isMobile ? 200 : 300
    const tolerance = isMobile ? 15 : 30
    return characterLength - minLimit > tolerance ? minLimit : maxLimit
  }

  return (
    <>
      <MainGrid container $isMobile={isMobile} aria-label="SearchCardComponent">
        <Grid container>
          <Grid item {...gridBreakPointsGenerator(isMobile, 3.82)} sx={{ position: "relative" }}>
            <Box
              loading="lazy"
              component="img"
              src={getOptimizeImageUrl(
                props?.image?.[0]?.imageAsset?.image?.[0]?.asset?._ref &&
                  urlFor(props?.image?.[0]?.imageAsset?.image?.[0]?.asset?._ref).url(),
                3,
              )}
              sx={{
                width: "100%",
                height: isMobile ? MobilePxToVw(380) : "100%",
                objectFit: "cover",
              }}
              alt={`
                ${props?.hotelName}_img
                `}
            />

            {/* 
            Commented as this is not available in Desktop 
            {isMobile && (
              <Box
              // onClick={() => {
              //   navigate(primaryAction?.url, primaryAction?.urlType)
              // }}
              >
                <Box
                  component="img"
                  src={GALLERY_IMAGE}
                  sx={{
                    right: `${MobilePxToVw(10)}`,
                    bottom: `${MobilePxToVw(12)}`,
                    width: "9.688vw",
                    height: "9.531vw",
                    position: "absolute",
                    cursor: "pointer",
                    padding: `${MobilePxToVw(12)} ${MobilePxToVw(10)}`,
                    background: "rgba(19, 19, 15, 0.30)",
                    backdropFilter: `blur${MobilePxToVw(20)}`,
                  }}
                />
              </Box>
            )} */}
          </Grid>
          <SearchDetailsGrid item $isMobile={isMobile} {...gridBreakPointsGenerator(isMobile, 8.18)}>
            <Grid container>
              <Grid item {...gridBreakPointsGenerator(isMobile, 9.8)}>
                <Grid container>
                  <CommonSpaceGrid container $isMobile={isMobile}>
                    <Typography
                      sx={{
                        color: `${theme?.palette?.ihclPalette?.hexSeventeen}`,
                      }}
                      component={headingElement}
                      variant={isMobile ? "m-heading-s" : "heading-s"}>
                      {props?.hotelName?.toUpperCase()}
                    </Typography>
                  </CommonSpaceGrid>
                  <CommonSpaceGrid
                    container
                    $isMobile={isMobile}
                    sx={{
                      marginBottom: isMobile ? "0vw" : "",
                    }}>
                    {props?.hotelAddress &&
                      String(props?.hotelAddress?.addressLine1)?.toLowerCase() !== "null" &&
                      String(props?.hotelAddress?.city)?.toLowerCase() !== "null" &&
                      String(props?.hotelAddress?.state)?.toLowerCase() !== "null" &&
                      String(props?.hotelAddress?.pincode)?.toLowerCase() !== "null" &&
                      String(props?.hotelAddress?.country)?.toLowerCase() !== "null" &&
                      props?.hotelAddress?.addressLine1 &&
                      props?.hotelAddress?.city &&
                      props?.hotelAddress?.state &&
                      props?.hotelAddress?.pincode &&
                      props?.hotelAddress?.country && (
                        <Grid
                          item
                          sx={{ marginBottom: isMobile ? "2.185vw" : "" }}
                          {...gridBreakPointsGenerator(isMobile, 12)}>
                          <IconTitleBox $isMobile={isMobile} alignItems={"flex-start !important"}>
                            <IconWrapper>
                              <RoomIcon
                                style={{
                                  fontSize: isMobile ? MobilePxToVw(22) : DesktopPxToVw(22),
                                }}
                              />
                            </IconWrapper>
                            <Box
                              sx={{
                                width: "100%",
                                overflowWrap: "break-word",
                              }}>
                              <DetailsTypography variant={isMobile ? "m-body-s" : "body-s"}>
                                {getLocationDetails()}
                              </DetailsTypography>
                            </Box>
                          </IconTitleBox>
                        </Grid>
                      )}
                  </CommonSpaceGrid>
                  <CommonSpaceGrid item $isMobile={isMobile} {...gridBreakPointsGenerator(isMobile)}>
                    <CustomReadMore variant={isMobile ? "m-body-s" : "body-s"} length={getCharacterLimit()}>
                      {props?.description}
                    </CustomReadMore>
                  </CommonSpaceGrid>
                </Grid>
              </Grid>
              {!isMobile &&
                brandsToShowPrices?.includes(props?.brandName?.toLowerCase()) &&
                props?.dynamicHotelData?.amountWithInclusiveTax && (
                  <Grid item {...gridBreakPointsGenerator(isMobile, 2.2)}>
                    <RatePriceBox>
                      <Typography
                        variant={isMobile ? "m-body-s" : "body-s"}
                        sx={{
                          color: `${theme?.palette?.ihclPalette?.hexTwelve}`,
                        }}>
                        {"Starting Rate/Night"}
                      </Typography>
                      {props?.dynamicHotelData?.amountWithInclusiveTax ? (
                        <Typography sx={{ paddingTop: DesktopPxToVw(20) }} variant="heading-s">
                          {currencyPrettier(
                            props?.dynamicHotelData?.amountWithInclusiveTax,
                            props?.dynamicHotelData?.currencyCode,
                          )}
                        </Typography>
                      ) : (
                        <Typography sx={{ paddingTop: DesktopPxToVw(20) }} variant="body-s">
                          {"Rates unavailable"}
                        </Typography>
                      )}
                    </RatePriceBox>
                  </Grid>
                )}
            </Grid>
            <Grid
              item
              {...gridBreakPointsGenerator(isMobile)}
              sx={{
                alignItems: "center",
              }}>
              <Grid container>
                {props?.hotelContact?.phone?.[0]?.mobile && props?.hotelContact?.phone?.[0]?.mobile !== "NULL" && (
                  <CommonSpaceGrid item $isMobile={isMobile} {...gridBreakPointsGenerator(isMobile, 6, 12)}>
                    <IconTitleBox $isMobile={isMobile}>
                      <IconWrapper>
                        <CallIcon
                          style={{
                            width: isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
                          }}
                        />
                      </IconWrapper>
                      <Typography
                        sx={{ color: theme?.palette?.ihclPalette?.hexTwo }}
                        variant={isMobile ? "m-body-s" : "body-s"}>
                        <a href={`tel:${props?.hotelContact?.phone?.[0]?.mobile}`}>
                          {props?.hotelContact?.phone?.[0]?.mobile}
                        </a>
                      </Typography>
                    </IconTitleBox>
                  </CommonSpaceGrid>
                )}
                {props?.hotelContact?.email?.filter((type: any) => {
                  return type?.type?.toLowerCase() === "business"
                })?.[0]?.email &&
                  props?.hotelContact?.email?.filter((type: any) => {
                    return type?.type?.toLowerCase() === "business"
                  })?.[0]?.email !== "NULL" && (
                    <CommonSpaceGrid item $isMobile={isMobile} {...gridBreakPointsGenerator(isMobile, 6, 12)}>
                      <IconTitleBox $isMobile={isMobile}>
                        <IconWrapper>
                          <MailIcon
                            style={{
                              fontSize: isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
                            }}
                          />
                        </IconWrapper>
                        <MailTitle $isMobile={isMobile} variant={isMobile ? "m-body-s" : "body-s"}>
                          <a
                            href={`mailto:${
                              props?.hotelContact?.email?.filter((type: any) => {
                                return type?.type?.toLowerCase() === "business"
                              })?.[0]?.email
                            }`}>
                            {
                              props?.hotelContact?.email?.filter((type: any) => {
                                return type?.type?.toLowerCase() === "business"
                              })?.[0]?.email
                            }
                          </a>
                        </MailTitle>
                      </IconTitleBox>
                    </CommonSpaceGrid>
                  )}
              </Grid>
            </Grid>
            {<FullDivider $isMobile={isMobile} />}
            {props?.facilities?.length > 0 && (
              <Box sx={{ display: fetBrandName() }}>
                <Grid container>
                  {props?.facilities &&
                    props?.facilities?.slice(0, 4)?.map((aminity: any, index: number) => (
                      <Grid key={index} item xs={6} md={6} sm={12} pb={2} pr={2}>
                        <Aminity>
                          <Diamond />
                          <Typography variant={isMobile ? "m-body-s" : "body-s"}>{aminity}</Typography>
                        </Aminity>
                      </Grid>
                    ))}
                </Grid>
                {!isMobile && <FullDivider $isMobile={isMobile} />}
              </Box>
            )}
            {isMobile &&
              brandsToShowPrices?.includes(props?.brandName?.toLowerCase()) &&
              props?.dynamicHotelData?.amountWithInclusiveTax && (
                <CommonSpaceGrid sx={{ marginBottom: "unset" }} container alignItems={"center"} $isMobile={isMobile}>
                  <Grid {...gridBreakPointsGenerator(isMobile, 6, 6)}>
                    <DetailsTypography variant={isMobile ? "m-body-s" : "body-s"}>
                      {"Starting Rate/Night"}
                    </DetailsTypography>
                  </Grid>
                  <Grid {...gridBreakPointsGenerator(isMobile, 6, 6)} sx={{ display: "flex", justifyContent: "end" }}>
                    {props?.dynamicHotelData?.amountWithInclusiveTax ? (
                      <DetailsTypography variant={isMobile ? "m-heading-s" : "heading-s"}>
                        {currencyPrettier(
                          props?.dynamicHotelData?.amountWithInclusiveTax,
                          props?.dynamicHotelData?.currencyCode,
                        )}
                      </DetailsTypography>
                    ) : (
                      <Typography sx={{ paddingTop: DesktopPxToVw(20) }} variant="m-body-s">
                        {"Rates unavailable"}
                      </Typography>
                    )}
                  </Grid>
                </CommonSpaceGrid>
              )}
            {!isMobile && (
              <Grid container>
                <ActionBtnContainer $restaurants={false} $isMobile={isMobile}>
                  <RenderActionItem
                    onClick={() => {
                      handleActionClick(false, "overview")
                    }}
                    url={""}
                    title={ctaLabel?.title}
                    navigationType={ctaLabel?.urlType}
                    variant={ctaLabel?.variant}
                    isActionButtonType={false}
                  />
                  {secondaryAction && (
                    <Button
                      variant={"light-contained"}
                      disabled={
                        brandsToShowPrices?.includes(props?.brandName?.toLowerCase())
                          ? !props?.dynamicHotelData?.amountWithInclusiveTax
                          : false
                      }
                      sx={{
                        opacity: brandsToShowPrices?.includes(props?.brandName?.toLowerCase())
                          ? props?.dynamicHotelData?.amountWithInclusiveTax
                            ? 1
                            : 0.8
                          : 1,
                      }}
                      startIcon={
                        !props?.dynamicHotelData?.amountWithInclusiveTax && loading ? (
                          <CircularProgress sx={{ width: "1.5vw !important", height: "1.5vw !important" }} />
                        ) : null
                      }
                      onClick={() => {
                        props?.setGlobalSearchedData(props)
                        handleActionClick(true)
                      }}>
                      {brandsToShowPrices?.includes(props?.brandName?.toLowerCase())
                        ? !props?.dynamicHotelData?.amountWithInclusiveTax && loading
                          ? "LOADING"
                          : !props?.dynamicHotelData?.amountWithInclusiveTax
                          ? SEARCH_CARD_CONSTANTS?.SOLD_OUT
                          : secondaryAction?.title
                        : secondaryAction?.title}
                    </Button>
                  )}
                </ActionBtnContainer>
              </Grid>
            )}
          </SearchDetailsGrid>
        </Grid>
        {isMobile && (
          <Grid
            container
            sx={{
              backgroundColor: `${theme?.palette?.background?.paper}`,
            }}>
            <ActionBtnContainer $isMobile={isMobile} $restaurants={false}>
              <RenderActionItem
                onClick={() => {
                  handleActionClick()
                }}
                url={`/${hotelRoute}/${props?.identifier}`}
                title={ctaLabel?.title}
                navigationType={ctaLabel?.urlType}
                variant={ctaLabel?.variant}
                isActionButtonType={false}
              />
              {secondaryAction?.title && (
                <Button
                  variant={"light-contained"}
                  disabled={
                    brandsToShowPrices?.includes(props?.brandName?.toLowerCase())
                      ? !props?.dynamicHotelData?.amountWithInclusiveTax
                      : false
                  }
                  sx={{
                    opacity: brandsToShowPrices?.includes(props?.brandName?.toLowerCase())
                      ? props?.dynamicHotelData?.amountWithInclusiveTax
                        ? 1
                        : 0.8
                      : 1,
                  }}
                  startIcon={
                    !props?.dynamicHotelData?.amountWithInclusiveTax && loading ? (
                      <CircularProgress sx={{ width: "1.5vw !important", height: "1.5vw !important" }} />
                    ) : null
                  }
                  onClick={() => {
                    props?.setGlobalSearchedData(props)
                    handleActionClick(true)
                  }}>
                  {brandsToShowPrices?.includes(props?.brandName?.toLowerCase())
                    ? !props?.dynamicHotelData?.amountWithInclusiveTax && loading
                      ? "LOADING"
                      : !props?.dynamicHotelData?.amountWithInclusiveTax
                      ? SEARCH_CARD_CONSTANTS?.SOLD_OUT
                      : secondaryAction?.title
                    : secondaryAction?.title}
                </Button>
              )}
            </ActionBtnContainer>
          </Grid>
        )}
      </MainGrid>
    </>
  )
}

export default observer(SearchCardComponent)
