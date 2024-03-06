import React, { useContext, useEffect, useRef, useState } from "react"
import dayjs from "dayjs"
import dynamic from "next/dynamic"
import { PathType } from "../types"
import { useRouter } from "next/router"
import { theme } from "../../lib/theme"
import { urlFor } from "../../lib-sanity"
import { observer } from "mobx-react-lite"
import { ROUTES } from "../../utils/routes"
import Pluralize from "../../utils/pluralize"
import { AppBar, Box, Typography } from "@mui/material"
import { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { useLoggedIn } from "../../utils/hooks/useLoggedIn"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { MobileDropDownMenuBox } from "./styles/mobile-main-menu"
import { CONSTANTS, ICONS, LOGIN_CONSTANTS } from "../constants"
import { GLOBAL_STORES, PAGE_STORES } from "../../utils/Constants"
import { useBrowserCheck } from "../../utils/hooks/useBrowserCheck"
import { useLeavePageConfirmation } from "../../utils/hooks/useLeavePageConfirmation"
import BookingsFlowStore from "../../features/booking/store/pageStore/booking.store"
import { PageContext } from "../../PresentationalComponents/lib/prepare-page-context"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import BookingPopupMessage from "../../mock-data/booking/booking-popup-messages.json"
import { CloseGoldIcon, HamburgerGoldIcon, HamburgerIcon } from "../../utils/customIcons"
import BookingFlowGlobalStore from "../../features/booking/store/globalStore/booking.flow.store"
import { getTomorrowDate, getDayAfterTomorrowDate, formatDateWithMON } from "../../utils/getDate"
import {
  MainBox,
  IconsBox,
  DateDivider,
  HamburgerBox,
  SearchButton,
  HeaderMainBox,
  SearchMainBox,
  CenterItemsBox,
  GuestDetailsDivider,
  HotelNameTypography,
  DateAndGuestTypography,
} from "./styles/default-mobile-header"
import BookingConfirmationPageStore from "../../features/booking/store/pageStore/booking.confirmation.store"
import { useImageUtility } from "../../utils/hooks/useImageUtility"

const BasicModal = dynamic(() => import("../hoc/modal/modal"))
const MobileMainMenu = dynamic(() => import("./mobile-main-menu.component"))
const BookingMaskForMsite = dynamic(() => import("../../features/booking/ui/msite-booking-mask.component"))
const CartClearanceDialog = dynamic(() => import("../../features/booking/ui/cart-clearance-modal-component"))

const MobileHeader = (headerData: any) => {
  const router = useRouter()
  const appRef = useRef(null)
  const navigate = useAppNavigation()
  const isUserLoggedIn = useLoggedIn()
  const context = useContext(IHCLContext)
  const pageContext = useContext(PageContext)
  const { isSafari, isIos } = useBrowserCheck()
  const { MY_ACCOUNT } = ROUTES

  const {
    cartDetails,
    guestDetails,
    timeRemaining,
    bookingOrderData,
    emptyUserCart,
    addToCartPayload,
    guestBookingSchedule,
    userEnteredPromoCode,
    clearOrderResponse,
    changeCurrentRoomId,
    setUserEnteredPromoCode,
    clearPaymentLabelResponse,
  } = context?.getGlobalStore(GLOBAL_STORES?.bookingFlowStore) as BookingFlowGlobalStore
  const bookingFlowPageStore = pageContext?.getPageStore(PAGE_STORES?.bookingFlowStore) as BookingsFlowStore
  const { getOptimizeImageUrl } = useImageUtility()
  const bookingConfirmationPageStore = pageContext?.getPageStore(
    PAGE_STORES.BOOKING_STORES.bookingConfirmationPageStore,
  ) as BookingConfirmationPageStore
  const confirmationResponse = bookingConfirmationPageStore?.bookingConfirmationResponse

  const isSEB =
    Boolean(router?.query?.sebbalance) ||
    Boolean(confirmationResponse?.isSeb) ||
    (Boolean(bookingOrderData?.bookingOrderResponse?.orderLineItems?.[0]?.hotel?.isSeb) && !isUserLoggedIn)
  const isCUGOffer = router?.query?.isCUGOffer === "true" //? Using to disable the booking mask if it is a CUG Offers journey
  const rewardsData = headerData?.[0]?.dropDownItems[0]
  const primaryLogo = headerData?.[0]?.logo?.asset?._ref
  const secondaryLogo = headerData?.[0]?.secondaryLogo?.asset?._ref
  const primaryCartIcon = headerData?.[0]?.cartIcon[0]?.primaryCartIcon?.asset?._ref
  const secondaryCartIcon = headerData?.[0]?.cartIcon[0]?.secondaryCartIcon?.asset?._ref
  const primaryProfileIcon = headerData?.[0]?.profileIcon[0]?.primaryProfileIcon?.asset?._ref
  const secondaryProfileIcon = headerData?.[0]?.profileIcon[0]?.secondaryProfileIcon?.asset?._ref
  const isBookingFlowPage =
    global?.window?.location?.pathname === `${ROUTES?.BOOKING.CART}` ||
    global?.window?.location?.pathname === `${ROUTES?.BOOKING.CONFIRMED_PAGE}`
  const isAccountFlow = [MY_ACCOUNT?.OVERVIEW, MY_ACCOUNT?.BOOKING_DETAILS, MY_ACCOUNT?.CANCEL_BOOKING]?.includes(
    global?.window?.location?.pathname,
  )
  const isBookingConfirmationPage = global?.window?.location?.pathname === `${ROUTES?.BOOKING.CONFIRMED_PAGE}`

  const [adultCount, setAdultCount] = useState<number>(1)
  const [childCount, setChildCount] = useState<number>(0)
  const [cartClearance, setCartClearance] = useState(false)
  const [shouldLeave, setShouldLeave] = useState<boolean>(false)
  const [openRewards, setOpenRewards] = useState<boolean>(false)
  const [scrollDowned, setScrollDowned] = useState<boolean>(false)
  const [disableBookingMask, setDisableBookingMask] = useState(false)
  const [isTajLogoClicked, setIsTajLogoClicked] = useState<boolean>(false)
  const [showHamBurgerMenu, setShowHamBurgerMenu] = useState<boolean>(false)
  const [pressedBackButton, setPressedBackButton] = useState<boolean>(false)
  const [isMyAccountClicked, setIsMyAccountClicked] = useState<boolean>(false)
  const [openGuestDetailsModal, setOpenGuestDetailsModal] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const totalGuestCount = adultCount + childCount

  let cartClearanceData = {
    ...BookingPopupMessage?.cartClearance,
  }
  const [popupData, setPopupData] = useState(cartClearanceData)

  const handleHamBurgerClick = () => {
    setOpenRewards(false)
    setShowHamBurgerMenu(!showHamBurgerMenu)
  }
  const handleModelOpening = () => setOpenGuestDetailsModal(!openGuestDetailsModal)
  const roomsAddedInCart = cartDetails?.cartDetailsResponse?.items?.length > 0
  const roomLength = cartDetails?.cartDetailsResponse?.items?.[0]?.hotel?.[0]?.room?.length
  const changeNavbarColor = () => {
    if (window.scrollY >= 200) {
      setScrollDowned(true)
    } else {
      setScrollDowned(false)
    }
  }

  const handleEmptyCart = () => {
    emptyUserCart()
    setShouldLeave(false)
    clearOrderResponse()
    clearPaymentLabelResponse()
    handleSearch()
    setCartClearance(false)
    setIsMyAccountClicked(false)
    setUserEnteredPromoCode({
      title: "",
      index: null,
      agentId: null,
      promoCode: null,
      couponCode: null,
    })
  }

  const shouldLeaveFunction = () => {
    setCartClearance(true)
    setPressedBackButton(true)
    setPopupData({
      ...cartClearanceData,
      title: cartClearanceData?.backClickTitle,
    })
    return undefined
  }
  useLeavePageConfirmation(shouldLeave, isTajLogoClicked, isMyAccountClicked, shouldLeaveFunction)

  const handleLogoClick = () => {
    if (
      global?.window?.location.pathname === ROUTES.BOOKING.CART &&
      cartDetails?.cartDetailsResponse?.items?.length > 0
    ) {
      setCartClearance(true)
      setIsTajLogoClicked(true)
    } else {
      setUserEnteredPromoCode({
        title: "",
        index: null,
        agentId: null,
        promoCode: null,
        couponCode: null,
      })
      setShowHamBurgerMenu(false)
      router?.push(ROUTES?.WITHOUTSEO_FOR_ROUTING?.HOMEPAGE)
    }
  }

  const handleMyAccountClick = () => {
    if (isUserLoggedIn) {
      if (
        showHamBurgerMenu &&
        ROUTES.WITHOUTSEO_FOR_ROUTING.MY_ACCOUNT.OVERVIEW ===
          `/${global?.window?.location.pathname.split("/").slice(2, 3)}`
      ) {
        setShowHamBurgerMenu(false)
        return
      }
      if (
        cartDetails?.cartDetailsResponse?.items?.length > 0 &&
        global?.window?.location.pathname === ROUTES.BOOKING.CART
      ) {
        setCartClearance(true)
        setIsMyAccountClicked(true)
      } else {
        setUserEnteredPromoCode({
          title: "",
          index: null,
          agentId: null,
          promoCode: null,
          couponCode: null,
        })
        navigate(ROUTES.WITHOUTSEO_FOR_ROUTING.MY_ACCOUNT.OVERVIEW, PathType?.internal)
      }
    } else {
      navigate(headerData?.[0]?.loginList?.[0]?.url, headerData?.[0]?.loginList?.[0]?.urlType)
    }
  }

  useEffect(() => {
    if (bookingFlowPageStore?.currentStepper?.stepName === CONSTANTS?.RESERVATION) {
      setDisableBookingMask(true)
    } else {
      setDisableBookingMask(false)
    }
  }, [bookingFlowPageStore?.currentStepper?.stepName])

  useEffect(() => {
    isBookingFlowPage && setScrollDowned(true)
    if (headerData?.headerBackgroundVariant?.toLowerCase() === "gradient") {
      setScrollDowned(true)
    } else {
      changeNavbarColor()
      global?.window?.addEventListener("scroll", changeNavbarColor)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [global?.window?.location?.pathname, global?.window?.scrollY])

  useEffect(() => {
    setAdultCount(
      guestDetails?.data?.reduce((accumulator: number, currentValue: any) => {
        return accumulator + Number.parseInt(currentValue.adults)
      }, 0),
    )
    setChildCount(
      guestDetails?.data?.reduce((accumulator: number, currentValue: any) => {
        return accumulator + Number.parseInt(currentValue.child)
      }, 0),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guestDetails])

  const handleEdit = () => {
    roomLength > 0 ? setCartClearance(true) : setOpenGuestDetailsModal(true)
    setIsEdit(true)
  }

  const handleSearch = async () => {
    clearOrderResponse()
    if (isEdit) {
      setCartClearance(false)
      setOpenGuestDetailsModal(true)
      changeCurrentRoomId(guestDetails?.data?.[0]?.id)
    }
  }

  const handleModalClose = () => {
    setCartClearance(false)
    setIsTajLogoClicked(false)
    setIsMyAccountClicked(false)
    setPopupData(cartClearanceData)
  }

  //?Written to close the cart clearance modal,Cart clearance model and Session timeout model
  useEffect(() => {
    if (cartClearance) {
      setCartClearance(false)
      setIsTajLogoClicked(false)
      setIsMyAccountClicked(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRemaining === 600, timeRemaining === 0])

  useEffect(() => {
    if (roomsAddedInCart) {
      setShouldLeave(true)
    } else {
      setShouldLeave(false)
    }
  }, [roomsAddedInCart])

  //?Using to clear the special code on browser button back click
  useEffect(() => {
    const handleRemoveSpecialCode = (event: any) => {
      if (event?.state) {
        setUserEnteredPromoCode({
          title: "",
          index: null,
          agentId: null,
          promoCode: null,
          couponCode: null,
        })
      }
    }
    if (userEnteredPromoCode?.title && isBookingFlowPage) {
      window?.addEventListener("popstate", handleRemoveSpecialCode)
      return () => {
        window?.removeEventListener("popstate", handleRemoveSpecialCode)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEnteredPromoCode?.title, isBookingFlowPage])

  return (
    <HeaderMainBox>
      <AppBar
        component="nav"
        ref={appRef}
        aria-label="mobile-app-bar"
        sx={{
          display: "flex",
          "&.MuiAppBar-root": {
            boxShadow: "none",
            justifyContent: "center",
            minHeight: showHamBurgerMenu || scrollDowned ? "15.625vw" : "14.84vw",
          },
          background:
            showHamBurgerMenu || scrollDowned
              ? isAccountFlow
                ? theme?.palette?.ihclPalette?.hexTwentyNine
                : theme?.palette?.ihclPalette?.hexTwentyNine
              : "linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(95, 95, 95, 0) 100%)",
        }}>
        {primaryLogo && secondaryLogo && (
          <MainBox>
            <Box
              alt="taj-logo-mob"
              loading="lazy"
              component="img"
              decoding="async"
              srcSet={getOptimizeImageUrl(
                urlFor(showHamBurgerMenu || scrollDowned ? secondaryLogo : primaryLogo)?.url(),
                1,
              )}
              sx={{
                objectFit: "contain",
                width: showHamBurgerMenu || scrollDowned ? "14.53vw" : "16.71vw",
                height: showHamBurgerMenu || scrollDowned ? "11.56vw" : "14.68vw",
                margin: showHamBurgerMenu || scrollDowned ? "1.1vw 0vw 1.5vw 8.5vw" : "3.438vw 0vw 0vw 8.438vw",
              }}
              onClick={handleLogoClick}
            />
            <IconsBox
              mt={showHamBurgerMenu || scrollDowned ? "0vw" : "12.031vw"}
              height={showHamBurgerMenu || scrollDowned ? "unset" : "fit-content"}>
              {!isSEB && (
                <Box
                  onClick={() => {
                    handleMyAccountClick()
                  }}>
                  {isUserLoggedIn ? (
                    <>
                      <Box
                        loading="lazy"
                        component="img"
                        alt="profile-icon"
                        decoding="async"
                        srcSet={getOptimizeImageUrl(
                          urlFor(showHamBurgerMenu || scrollDowned ? secondaryProfileIcon : primaryProfileIcon)?.url(),
                          1,
                        )}
                        sx={{
                          width: "5vw",
                          height: "5vw",
                          objectFit: "contain",
                          marginRight: showHamBurgerMenu ? MobilePxToVw(51) : MobilePxToVw(42),
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <Typography
                        variant="m-body-l"
                        sx={{
                          marginRight: showHamBurgerMenu ? MobilePxToVw(51) : MobilePxToVw(42),
                          color:
                            showHamBurgerMenu || scrollDowned
                              ? theme?.palette?.ihclPalette?.hexTwo
                              : theme?.palette?.ihclPalette?.hexOne,
                          fontSize: "3.438vw",
                        }}>
                        {LOGIN_CONSTANTS?.LOGIN_TITLE}
                      </Typography>
                    </>
                  )}
                </Box>
              )}
              {/* currently we don't have cart so commented */}
              {/* <Box
                alt="cart-icon"
                component="img"
                src={urlFor(
                  showHamBurgerMenu || scrollDowned ? secondaryCartIcon : primaryCartIcon
                )?.url()}
                sx={{
                  width: "4.37vw",
                  height: "5.62vw",
                  objectFit: "contain",
                  marginRight: "3.2vw",
                }}
              /> */}
              <HamburgerBox
                sx={{
                  width: showHamBurgerMenu ? MobilePxToVw(40) : MobilePxToVw(54),
                  color:
                    scrollDowned || showHamBurgerMenu
                      ? theme?.palette?.ihclPalette?.hexTwo
                      : theme?.palette?.ihclPalette?.hexOne,
                  marginRight: showHamBurgerMenu ? MobilePxToVw(59) : MobilePxToVw(53),
                }}
                onClick={() => {
                  handleHamBurgerClick()
                }}>
                {showHamBurgerMenu ? (
                  <CloseGoldIcon />
                ) : scrollDowned || showHamBurgerMenu ? (
                  <HamburgerGoldIcon />
                ) : (
                  <HamburgerIcon />
                )}
              </HamburgerBox>
            </IconsBox>
          </MainBox>
        )}
      </AppBar>
      {(showHamBurgerMenu || openRewards) && (
        <MobileDropDownMenuBox sx={{ overflow: "auto" }}>
          <MobileMainMenu
            appRef={appRef}
            megaMenuData={headerData?.[0]?.navItems}
            handleHamBurgerClick={handleHamBurgerClick}
            dropDownListItems={headerData?.[0]?.dropDownList?.[0]}
            setOpenRewards={setOpenRewards}
            openRewards={openRewards}
            rewardsData={rewardsData}
            headerData={headerData}
          />
        </MobileDropDownMenuBox>
      )}
      {!isBookingConfirmationPage && isBookingFlowPage && !showHamBurgerMenu && (
        <SearchMainBox $isSafari={isSafari}>
          <Box
            sx={
              disableBookingMask
                ? {
                    padding: "1.094vw 4.063vw 1.563vw 7.5vw",
                    pointerEvents: "none",
                    opacity: "0.6",
                    cursor: "not-allowed",
                  }
                : { padding: "1.094vw 4.063vw 1.563vw 7.5vw" }
            }>
            <HotelNameTypography variant="m-body-l">{addToCartPayload?.hotel[0]?.hotelName}</HotelNameTypography>
            <CenterItemsBox>
              <CenterItemsBox sx={{ gap: "1vw" }}>
                <DateAndGuestTypography variant="m-body-s">
                  {isIos ? (
                    <>
                      {guestBookingSchedule?.userCheckInDate
                        ? formatDateWithMON(dayjs(guestBookingSchedule?.userCheckInDate))
                        : formatDateWithMON(dayjs(getTomorrowDate()))}
                    </>
                  ) : (
                    <>
                      {guestBookingSchedule?.userCheckInDate
                        ? formatDateWithMON(dayjs(guestBookingSchedule?.userCheckInDate))
                        : formatDateWithMON(dayjs(getTomorrowDate()))}
                    </>
                  )}
                </DateAndGuestTypography>
                <DateDivider />
                <DateAndGuestTypography variant="m-body-s">
                  {isIos ? (
                    <>
                      {guestBookingSchedule?.userCheckOutDate
                        ? formatDateWithMON(dayjs(guestBookingSchedule?.userCheckOutDate))
                        : formatDateWithMON(dayjs(getDayAfterTomorrowDate()))}
                    </>
                  ) : (
                    <>
                      {guestBookingSchedule?.userCheckInDate
                        ? formatDateWithMON(dayjs(guestBookingSchedule?.userCheckOutDate))
                        : formatDateWithMON(dayjs(getDayAfterTomorrowDate()))}
                    </>
                  )}
                </DateAndGuestTypography>
              </CenterItemsBox>
              <GuestDetailsDivider />
              <DateAndGuestTypography variant="m-body-s">{`${Pluralize("Guest", totalGuestCount, false)},  ${Pluralize(
                "Room",
                guestDetails?.data?.length,
                false,
              )}`}</DateAndGuestTypography>
            </CenterItemsBox>
          </Box>
          <SearchButton
            disabled={disableBookingMask}
            variant="light-contained"
            onClick={() => (roomLength > 0 ? handleEdit() : setOpenGuestDetailsModal(true))}>
            EDIT
          </SearchButton>
        </SearchMainBox>
      )}
      {openGuestDetailsModal && (
        <>
          <BasicModal
            width={"100%"}
            height={"100%"}
            showLogo={true}
            tajLogoTop={"0vh"}
            open={openGuestDetailsModal}
            handleClose={handleModelOpening}
            CloseIcon={ICONS?.CLOSE_GOLD_ICON}
            Component={
              <BookingMaskForMsite
                setOpenGuestDetailsModal={setOpenGuestDetailsModal}
                isDestinationBookingMask={false}
              />
            }
          />
        </>
      )}

      {cartClearance && (
        <BasicModal
          width={"100vw"}
          height={"100vh"}
          open={cartClearance}
          mobileJustifyContent="center"
          CloseIcon={ICONS?.CLOSE_GOLD_ICON}
          handleClose={handleModalClose}
          bgcolor={theme?.palette?.background?.paper}
          mSiteCloseStyles={{
            position: "absolute",
            top: MobilePxToVw(67.5),
            right: MobilePxToVw(59.45),
            padding: 0,
          }}
          Component={
            <CartClearanceDialog
              {...popupData}
              handleClose={handleModalClose}
              handleEmptyCart={handleEmptyCart}
              isTajLogoClicked={isTajLogoClicked}
              pressedBackButton={pressedBackButton}
              isMyAccountClicked={isMyAccountClicked}
              setPressedBackButton={setPressedBackButton}
            />
          }
        />
      )}
      {/* {openClearance && roomLength > 0 && (
        <BasicModal
          width={"100vw"}
          height={"100vh"}
          open={openClearance}
          mobileJustifyContent="center"
          Component={
            <CartClearanceDialog
              {...popupData}
              handleClose={() => handlePopupClose()}
              handleEmptyCart={handleEmptyCart}
            />
          }
          handleClose={() => handlePopupClose()}
          bgcolor={theme?.palette?.background?.paper}
        />
      )} */}
    </HeaderMainBox>
  )
}

export default observer(MobileHeader)
