import React, { useContext, Fragment } from "react"
import RoomIcon from "@mui/icons-material/Room"
import CallIcon from "@mui/icons-material/Call"
import MailIcon from "@mui/icons-material/Mail"
import dynamic from "next/dynamic"
import { theme } from "../../../lib/theme"
import { ROUTES } from "../../../utils/routes"
import { observer } from "mobx-react-lite"
import { urlFor } from "../../../lib-sanity"
import { getCookie } from "../../../utils/cookie"
import { GAStore, UserStore } from "../../../store"
import { Box, Grid, Typography } from "@mui/material"
import CircularProgress from "@mui/material/CircularProgress"
import { triggerEvent } from "../../../utils/analytics"
import { GLOBAL_STORES } from "../../../utils/Constants"
import { currencyPrettier } from "../../../utils/currency"
import { useMobileCheck } from "../../../utils/isMobilView"
import { useLoggedIn } from "../../../utils/hooks/useLoggedIn"
import { useAppNavigation } from "../../../utils/NavigationUtility"
import { useImageUtility } from "../../../utils/hooks/useImageUtility"
import { offersRoute } from "../../../features/property/ui/constants"
import getNonTajBrandCrossURL from "../../../utils/getCrossBrandURL"
import { SEARCH_CARD_CONSTANTS, brandsToShowPrices, externalNavigation } from "../../constants"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { MemberDataLayer } from "../../../utils/analytics/member-data-layer"
import { CrossSiteNavigation } from "../../../utils/sso/cross-site-navigation"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import BookingFlowGlobalStore from "../../../features/booking/store/globalStore/booking.flow.store"
import { dateFormatConverter, getDayAfterTomorrowDate, getTomorrowDate } from "../../../utils/getDate"
import {
  ActionBtnContainer,
  Aminity,
  AminityContainer,
  CommonSpaceGrid,
  DetailsTypography,
  Diamond,
  FullDivider,
  HotelDetailsGrid,
  IconTitleBox,
  IconWrapper,
  MailTitle,
  MainGrid,
  RatePriceBox,
  SearchDetailsGrid,
  StyledTitle,
  TypographyMobile,
} from "./styles/search-card"

const CustomReadMore = dynamic(() => import("../../hoc/CustomReadMore"))
const RenderActionItem = dynamic(() => import("../../hoc/actions/action-items-ui"))

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
  const isLogin = useLoggedIn()
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const context = useContext(IHCLContext)
  const { getOptimizeImageUrl } = useImageUtility()

  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const userStore = context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const bookingFlowGlobalStore = context?.getGlobalStore(GLOBAL_STORES?.bookingFlowStore) as BookingFlowGlobalStore

  const {
    loading,
    userEnteredPromoCode,
    destinationAvailabilityPayload
  } = bookingFlowGlobalStore

  const dataLayer = MemberDataLayer(userStore, gaStoreData)

  const fetchBrandName = () => {
    switch (String(props?.category).toLowerCase()) {
      case "restaurants":
        return props?.brand_name || "taj"
      case "holidays":
        return props?.brand_name
      case "hotels":
        return props?.hotel_brand
      default:
        return "taj"
    }
  }

  const checkButtonColor = brandsToShowPrices?.includes(fetchBrandName()?.toLowerCase())
    ? !!props?.dynamicHotelData?.amountWithInclusiveTax
      ? theme?.palette?.neuPalette?.hexOne
      : theme?.palette?.neuPalette?.rgbaFour
    : theme?.palette?.neuPalette?.hexOne

  const checkButtonBackgroundColor = brandsToShowPrices?.includes(fetchBrandName()?.toLowerCase())
    ? !!props?.dynamicHotelData?.amountWithInclusiveTax
      ? theme?.palette?.neuPalette?.hexTwo
      : theme?.palette?.neuPalette?.rgbaSix
    : theme?.palette?.neuPalette?.hexTwo

  const fetchCategoryPrimaryAction = () => {
    switch (String(props?.category).toLowerCase()) {
      case "restaurants":
        return "MORE"
      case "holidays":
        return "MORE"
      case "hotels":
        return "VISIT HOTEL"
      default:
        return "MORE"
    }
  }

  const fetchCategorySecondaryAction = (isNotDisabled: boolean = false) => {
    switch (String(props?.category).toLowerCase()) {
      case "restaurants":
        return SEARCH_CARD_CONSTANTS?.RESERVE_NOW
      case "holidays":
        return SEARCH_CARD_CONSTANTS?.VIEW_PACKAGES
      case "hotels":
        return isNotDisabled ? SEARCH_CARD_CONSTANTS?.BOOK_NOW : SEARCH_CARD_CONSTANTS?.SOLD_OUT
      default:
        return isNotDisabled ? SEARCH_CARD_CONSTANTS?.BOOK_NOW : SEARCH_CARD_CONSTANTS?.SOLD_OUT
    }
  }

  const handleRedirection = async (props: any) => {
    const URL = getNonTajBrandCrossURL(
      fetchBrandName(),
      props?.hotel_identifier || props?.identifier || "",
      destinationAvailabilityPayload?.endDate || dateFormatConverter(getDayAfterTomorrowDate()),
      destinationAvailabilityPayload?.startDate || dateFormatConverter(getTomorrowDate()),
      bookingFlowGlobalStore?.guestDetails?.data,
      "",
      userEnteredPromoCode?.promoCode,
      "",
      userEnteredPromoCode?.agentId,
      userEnteredPromoCode?.couponCode,
      "",
    )
    await CrossSiteNavigation({
      url: URL,
      loggedIn: isLogin,
      userStore,
    })
  }

  const handleBooking = (handleUrl: any, handleType: any, eventName: string) => {
    navigate(handleUrl, handleType)
    triggerEvent({
      action: eventName,
      params: {
        ...dataLayer,
        address: props?.address || "",
        hotelCity: props?.city || "",
        hotelState: props?.state || "",
        hotelPincode: props?.pincode || "",
        hotelCountry: props?.country || "",
        hotelCode: props?.id || "",
        hotelName: props?.name || "",
        rating: props?.rating || "",
        hotelCategory: props?.category || "",
        buttonLinkName: fetchCategorySecondaryAction(),
        link_url: props?.path,
        brandName: props?.searchFilters?.brand_name || "",
        hotelBrand: props?.searchFilters?.brand_name || "",
        hotelType: props?.searchFilters?.hotel_type || "",
        hotelFeature: props?.searchFilters?.hotel_feature || "",
        cuisineType: props?.searchFilters?.cuisines || "",
        dressCode: props?.searchFilters?.dress_code || "",
        holidayType: props?.searchFilter?.experience || "",
        destinationSelected: props?.searchFilters?.city || "",
        theme: props?.theme || "",
        clientId: getCookie("_ga")?.slice(6),
        eventType: "",
        eventName: "",
        eventPlace: "",
        eventTicketsQty: "",
        eventDate: "",
        noOfAdults: "",
        noOfChild: "",
        noOfRooms: "",
        specialCode: "",
        offerName: "",
        offerCode: "",
        offerID: "",
        offerCategory: "",
        offerValidity: "",
        bunglowCode: "",
      },
    })
  }

  const handleUserNavigation = async (item: any) => {
    const brand = fetchBrandName()?.toUpperCase()
    const getIdentifier = item?.hotel_identifier || item?.identifier
    const navUrl = externalNavigation[brand]
    if (item?.hotel_brand?.toLowerCase() !== "taj") {
      CrossSiteNavigation({
        url: `${navUrl}/${getIdentifier}?`,
        loggedIn: isLogin,
        userStore,
      })
    } else {
      navigate(`/hotels/${item?.hotel_identifier}`)
    }
  }

  //Todo,  uncomment it for restuarantselect event if any change in requirement
  // const handleRestoBooking = (handleUrl: any, handleType: any, eventName: string) => {
  //   navigate(handleUrl, handleType)
  //   triggerEvent({
  //     action: eventName,
  //     params: {
  //       ...dataLayer,
  // destinationSelected: props?.searchFilters?.city || "",
  //       buttonLinkName: fetchCategorySecondaryAction(),
  //       link_url: props?.path,
  //       cuisineType: props?.cuisine || "",
  //       dressCode: props?.dress_code || "",
  //       theme: props?.theme || "",
  //       clientId: getCookie("_ga")?.slice(6),
  //       eventType: "",
  //       eventName: eventName,
  //       eventPlace: "",
  //       eventTicketsQty: "",
  //       eventDate: "",
  //       restaurantName: props?.restaurant_name,
  //       restaurantCity: props?.city,
  //       restaurantCountry: props?.country,
  //       themeType: "",
  //       businessType: props?.type,
  //       datesToBook: "",
  //       arrivalDate: "",
  //       departureDate: "",
  //       noOfAdults: "",
  //       noOfChild: "",
  //       noOfRooms: "",
  //       specialCode: "",
  //       offerName: "",
  //       offerCode: "",
  //       offerID: "",
  //       offerCategory: "",
  //       offerValidity: "",
  //     },
  //   })
  // }

  let toggleSpace: boolean = false
  const isValidAddress =
    String(props?.address)?.toLowerCase() !== "null" &&
    String(props?.city)?.toLowerCase() !== "null" &&
    String(props?.state)?.toLowerCase() !== "null" &&
    String(props?.pincode)?.toLowerCase() !== "null" &&
    String(props?.country)?.toLowerCase() !== "null"
  const showHotelDetails: boolean =
    props?.cuisine || props?.dress_code || props?.timings || props?.timing || props?.dinner || props?.lunch
  const hotelDetails = {
    [SEARCH_CARD_CONSTANTS?.CUISINE]: props?.cuisine,
    [SEARCH_CARD_CONSTANTS?.DRESS_CODE]: props?.dress_code,
    [SEARCH_CARD_CONSTANTS?.TIMING]: props?.timing,
    [SEARCH_CARD_CONSTANTS?.TIMINGS]: props?.timings,
    [SEARCH_CARD_CONSTANTS?.LUNCH]: props?.lunch,
    [SEARCH_CARD_CONSTANTS?.DINNER]: props?.dinner,
  }
  const viewedImage =
    props?.category?.toLowerCase() === "restaurants"
      ? props?.restaurant_image?.trim() || props?.images?.[0]
      : props?.images?.[0]

  const showAmenities =
    props?.category?.toLowerCase() !== "hotels"
      ? true
      : props?.category?.toLowerCase() === "hotels" && props?.hotel_brand?.toLowerCase() === "taj"
      ? true
      : false

  const getLocationDetails = () => {
    const details = [props?.address, props?.city, props?.state, props?.pincode, props?.country]
    const finalAddress = details
      ?.filter((detail: any, index: number) => {
        if (props?.city === props?.state && index === 2) {
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
      <MainGrid aria-label="search-card-component" container $isMobile={isMobile}>
        <Grid container>
          <Grid item {...gridBreakPointsGenerator(isMobile, 3.82)}>
            <Box
              component="img"
              src={
                viewedImage && viewedImage?.toLowerCase() !== "null" && viewedImage !== " " && viewedImage !== ""
                  ? getOptimizeImageUrl(urlFor(viewedImage)?.url(), 3)
                  : ""
              }
              sx={{
                width: "100%",
                height: isMobile ? MobilePxToVw(380) : "100%",
                objectFit: "cover",
              }}
              alt={`
                ${props?.category?.toLowerCase() === "restaurants" ? props?.restaurant_name : props?.name}_img
                `}
            />
          </Grid>
          <SearchDetailsGrid item $isMobile={isMobile} {...gridBreakPointsGenerator(isMobile, 8.18)}>
            <Grid container>
              <Grid
                item
                {...gridBreakPointsGenerator(isMobile, props?.category?.toLowerCase() !== "restaurants" ? 9.8 : 10.4)}>
                <Grid container>
                  <CommonSpaceGrid container $isMobile={isMobile}>
                    <StyledTitle variant={isMobile ? "m-heading-s" : "heading-s"}>
                      {props?.category?.toLowerCase() === "restaurants"
                        ? props?.restaurant_title?.toUpperCase()
                        : props?.name?.toUpperCase()}
                    </StyledTitle>
                  </CommonSpaceGrid>
                  <CommonSpaceGrid
                    container
                    $isMobile={isMobile}
                    sx={{
                      marginBottom: isMobile ? "0vw" : "",
                    }}>
                    {props?.category?.toLowerCase() === "restaurants" && (
                      <CommonSpaceGrid
                        item
                        sx={{
                          marginBottom: isMobile ? "2.18vw" : "0vw",
                        }}
                        $isMobile={isMobile}
                        {...gridBreakPointsGenerator(isMobile, isValidAddress ? 4.9 : 12)}>
                        <DetailsTypography sx={{ fontWeight: 700 }} variant={isMobile ? "m-body-s" : "body-s"}>
                          {props?.name}
                        </DetailsTypography>
                      </CommonSpaceGrid>
                    )}
                    {props?.address &&
                      String(props?.address)?.toLowerCase() !== "null" &&
                      String(props?.city)?.toLowerCase() !== "null" &&
                      String(props?.state)?.toLowerCase() !== "null" &&
                      String(props?.pincode)?.toLowerCase() !== "null" &&
                      String(props?.country)?.toLowerCase() !== "null" && (
                        <Grid
                          item
                          sx={{ marginBottom: isMobile ? "2.185vw" : "" }}
                          {...gridBreakPointsGenerator(isMobile, props?.restaurant_name ? 7 : 12)}>
                          <IconTitleBox $isMobile={isMobile}>
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
                              <DetailsTypography
                                sx={{
                                  lineHeight: "140%",
                                  display: "flex",
                                  alignItems: "flex-start",
                                }}
                                variant={isMobile ? "m-body-s" : "body-s"}>
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
                  <Grid
                    item
                    {...gridBreakPointsGenerator(isMobile)}
                    sx={{
                      alignItems: "center",
                    }}>
                    <Grid container alignItems={"center"}>
                      {props?.mobile && props?.mobile !== "NULL" && (
                        <CommonSpaceGrid
                          item
                          $isMobile={isMobile}
                          {...gridBreakPointsGenerator(
                            isMobile,
                            props?.category?.toLowerCase() !== "restaurants" ? 5.09 : 4.95,
                          )}>
                          {props?.mobile?.toLowerCase() !== "null" && (
                            <IconTitleBox $isMobile={isMobile} sx={{ alignItems: "center" }}>
                              <IconWrapper>
                                <CallIcon
                                  style={{
                                    width: isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
                                  }}
                                />
                              </IconWrapper>
                              <TypographyMobile $isMobile={isMobile} variant={isMobile ? "m-body-s" : "body-s"}>
                                <a href={`tel:${props?.mobile}`}>{props?.mobile}</a>
                              </TypographyMobile>
                            </IconTitleBox>
                          )}
                        </CommonSpaceGrid>
                      )}
                      {props?.businessEmail && props?.businessEmail !== "NULL" && (
                        <CommonSpaceGrid
                          item
                          $isMobile={isMobile}
                          {...gridBreakPointsGenerator(
                            isMobile,
                            props?.category?.toLowerCase() !== "restaurants" ? 6.8 : 7.05,
                          )}>
                          <IconTitleBox $isMobile={isMobile}>
                            <IconWrapper>
                              <MailIcon
                                style={{
                                  fontSize: isMobile ? MobilePxToVw(20) : DesktopPxToVw(17),
                                  alignSelf: "center",
                                }}
                              />
                            </IconWrapper>
                            <MailTitle $isMobile={isMobile} variant={isMobile ? "m-body-s" : "body-s"}>
                              <a href={`mailto:${props?.businessEmail}`}>{props?.businessEmail}</a>
                            </MailTitle>
                          </IconTitleBox>
                        </CommonSpaceGrid>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {!isMobile && props?.category?.toLowerCase() !== "restaurants" && (
                <Grid
                  item
                  {...gridBreakPointsGenerator(isMobile, props?.category?.toLowerCase() !== "restaurants" ? 2.2 : 1.6)}>
                  {brandsToShowPrices?.includes(fetchBrandName()?.toLowerCase()) &&
                    props?.dynamicHotelData?.amountWithInclusiveTax && (
                      <RatePriceBox>
                        <Typography
                          variant={isMobile ? "m-body-s" : "body-s"}
                          sx={{
                            color: `${theme?.palette?.neuPalette?.hexTwelve}`,
                          }}>
                          {"Starting Rate/Night"}
                        </Typography>
                        <>
                          {props?.dynamicHotelData?.amountWithInclusiveTax ? (
                            <Typography sx={{ paddingTop: DesktopPxToVw(20) }} variant="heading-s">
                              {currencyPrettier(
                                props?.dynamicHotelData?.amountWithInclusiveTax,
                                props?.dynamicHotelData?.currencyCode,
                              )}
                            </Typography>
                          ) : (
                            <Typography variant="body-s">{"Rates unavailable"}</Typography>
                          )}
                        </>
                      </RatePriceBox>
                    )}
                </Grid>
              )}
            </Grid>
            {showAmenities && (props?.aminities?.length > 0 || showHotelDetails) && (
              <>
                {<FullDivider $isMobile={isMobile} />}
                <Grid container>
                  <Grid container>
                    {props?.aminities &&
                      props?.aminities?.slice(0, 4)?.map((aminity: string, index: number) => (
                        <CommonSpaceGrid
                          key={index}
                          item
                          $isMobile={isMobile}
                          {...gridBreakPointsGenerator(
                            isMobile,
                            index % 2 == 0
                              ? props?.aminities?.length && props?.aminities[index + 1]
                                ? 4.27
                                : 12
                              : 7.7,
                          )}
                          sx={{
                            overflowWrap: "break-word",
                          }}>
                          <Aminity>
                            <AminityContainer>
                              <Diamond />
                            </AminityContainer>
                            <Typography sx={{ lineHeight: "140%" }} variant={isMobile ? "m-body-s" : "body-s"}>
                              {aminity}
                            </Typography>
                          </Aminity>
                        </CommonSpaceGrid>
                      ))}
                  </Grid>
                  {Object?.keys(hotelDetails)?.map((hotelDetailKey: string, index: number) => {
                    if (
                      hotelDetails?.[hotelDetailKey]?.length > 0 &&
                      hotelDetails?.[hotelDetailKey]?.toLowerCase() !== "null" &&
                      hotelDetails?.[hotelDetailKey] !== " "
                    ) {
                      toggleSpace = !toggleSpace
                      return (
                        <Fragment key={index}>
                          <HotelDetailsGrid
                            item
                            $isMobile={isMobile}
                            {...gridBreakPointsGenerator(isMobile, toggleSpace ? 4.32 : 7.68)}>
                            {hotelDetails?.[hotelDetailKey] && (
                              <Typography variant={isMobile ? "m-body-s" : "body-s"}>
                                {hotelDetailKey}: <b>{hotelDetails?.[hotelDetailKey]}</b>
                              </Typography>
                            )}
                          </HotelDetailsGrid>
                        </Fragment>
                      )
                    } else {
                      return <></>
                    }
                  })}
                </Grid>
                {!isMobile && <FullDivider $isMobile={isMobile} />}
              </>
            )}
            {isMobile &&
              props?.category?.toLowerCase() !== "restaurants" &&
              brandsToShowPrices?.includes(fetchBrandName()?.toLowerCase()) && (
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
              <Grid
                container
                sx={{
                  marginTop: props?.category?.toLowerCase() === "restaurants" ? "2.604vw" : "",
                }}>
                <ActionBtnContainer
                  $restaurants={props?.category?.toLowerCase() === "restaurants"}
                  $isMobile={isMobile}>
                  <RenderActionItem
                    url={`${props?.path}?hotelId=${props?.id}`}
                    title={fetchCategoryPrimaryAction()}
                    navigationType={"internal"}
                    variant={"light-contained"}
                    isActionButtonType={false}
                    onClick={() => {
                      if (fetchBrandName()?.toLowerCase() !== "taj") {
                        handleUserNavigation(props)
                      } else if (props?.category?.toLowerCase() === "restaurants") {
                        navigate(`/hotels/${props?.hotel_identifier}/restaurants/${props?.restaurant_identifier}`)
                      } else if (props?.category?.toLowerCase() === "holidays") {
                        navigate(`/hotels/${props?.identifier}/${offersRoute}#hotelHolidays`)
                      } else {
                        navigate(`/hotels/${props?.hotel_identifier}`)
                      }
                    }}
                  />
                  {props?.category?.toLowerCase() !== "restaurants" && (
                    <RenderActionItem
                      url={`${ROUTES?.WITHOUTSEO_FOR_ROUTING?.BOOKING?.CART}?hotelId=${props?.id}`}
                      title={(!props?.dynamicHotelData?.amountWithInclusiveTax && loading)
                        ? "LOADING"
                        : fetchCategorySecondaryAction(
                          brandsToShowPrices?.includes(fetchBrandName()?.toLowerCase())
                            ? !!props?.dynamicHotelData?.amountWithInclusiveTax
                            : true,
                        )}
                      navigationType={"internal"}
                      variant={"light-contained"}
                      isActionButtonType={true}
                      isDisable={
                        brandsToShowPrices?.includes(fetchBrandName()?.toLowerCase())
                          ? !!props?.dynamicHotelData?.amountWithInclusiveTax
                          : true
                      }
                      buttonStyles={{
                        color: checkButtonColor,
                        backgroundColor: checkButtonBackgroundColor,
                        "&:hover": {
                          color: checkButtonColor,
                          backgroundColor: checkButtonBackgroundColor,
                        },
                      }}
                      buttonProps={{
                        startIcon: (!props?.dynamicHotelData?.amountWithInclusiveTax && loading) 
                        ? <CircularProgress sx={{ width: "1.5vw !important", height: "1.5vw !important" }} />
                        : null
                      }}
                      onClick={() => {
                        if (fetchBrandName()?.toLowerCase() !== "taj") {
                          handleRedirection(props)
                        } else {
                          if (!!props?.dynamicHotelData?.amountWithInclusiveTax) {
                            handleBooking(
                              `${ROUTES?.WITHOUTSEO_FOR_ROUTING?.BOOKING?.CART}?hotelId=${props?.id}`,
                              "internal",
                              "hotelSelected",
                            )
                          }
                        }
                      }}
                    />
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
            <ActionBtnContainer $isMobile={isMobile} $restaurants={props?.category?.toLowerCase() === "restaurants"}>
              <RenderActionItem
                url={`${props?.path}?hotelId=${props?.id}`}
                title={fetchCategoryPrimaryAction()}
                navigationType={"internal"}
                variant={"light-contained"}
                isActionButtonType={false}
                onClick={() => {
                  if (fetchBrandName()?.toLowerCase() !== "taj") {
                    handleUserNavigation(props)
                  } else if (props?.category?.toLowerCase() === "restaurants") {
                    navigate(`/hotels/${props?.hotel_identifier}/restaurants/${props?.restaurant_identifier}`)
                  } else if (props?.category?.toLowerCase() === "holidays") {
                    navigate(`/hotels/${props?.identifier}/${offersRoute}#hotelHolidays`)
                  } else {
                    navigate(`/hotels/${props?.hotel_identifier}`)
                  }
                }}
              />
              {props?.category?.toLowerCase() !== "restaurants" && (
                <RenderActionItem
                  url={`${ROUTES?.WITHOUTSEO_FOR_ROUTING?.BOOKING?.CART}?hotelId=${props?.id}`}
                  title={(!props?.dynamicHotelData?.amountWithInclusiveTax && loading) ? "LOADING" : fetchCategorySecondaryAction(
                    brandsToShowPrices?.includes(fetchBrandName()?.toLowerCase())
                      ? !!props?.dynamicHotelData?.amountWithInclusiveTax
                      : true,
                  )}
                  navigationType={"internal"}
                  variant={"light-contained"}
                  isActionButtonType={true}
                  isDisable={
                    brandsToShowPrices?.includes(fetchBrandName()?.toLowerCase())
                      ? !!props?.dynamicHotelData?.amountWithInclusiveTax
                      : true
                  }
                  buttonProps={{
                    startIcon: (!props?.dynamicHotelData?.amountWithInclusiveTax && loading) 
                    ? <CircularProgress sx={{ width: "1.5vw !important", height: "1.5vw !important" }} />
                    : null
                  }}
                  buttonStyles={{
                    color: checkButtonColor,
                    backgroundColor: checkButtonBackgroundColor,
                    "&:hover": {
                      color: checkButtonColor,
                      backgroundColor: checkButtonBackgroundColor,
                    },
                  }}
                  onClick={() => {
                    if (fetchBrandName()?.toLowerCase() !== "taj") {
                      handleRedirection(props)
                    } else {
                      if (!!props?.dynamicHotelData?.amountWithInclusiveTax) {
                        handleBooking(
                          `${ROUTES?.WITHOUTSEO_FOR_ROUTING?.BOOKING?.CART}?hotelId=${props?.id}`,
                          "internal",
                          "hotelSelected",
                        )
                      }
                    }
                  }}
                />
              )}
            </ActionBtnContainer>
          </Grid>
        )}
      </MainGrid>
    </>
  )
}

export default observer(SearchCardComponent)
