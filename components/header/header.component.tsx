import React, { useState, useEffect, useContext } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { PathType } from "../../types"
import { CONSTANTS } from "../constants"
import { urlFor } from "../../lib-sanity"
import { observer } from "mobx-react-lite"
import { ROUTES } from "../../utils/routes"
import { GAStore, UserStore } from "../../store"
import { GLOBAL_STORES } from "../../utils/Constants"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import { useLoggedIn } from "../../utils/hooks/useLoggedIn"
import { Close, KeyboardArrowDown } from "@mui/icons-material"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { ImageBoxWrapper } from "./styles/default-mobile-header"
import { MemberDataLayer } from "../../utils/analytics/member-data-layer"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { PLACEHOLDERS, Profile_icon, Gold_Profile_icon } from "../forms/gift-card-form/constants"
import { Box, Button, Divider, useTheme, Typography, Collapse, useMediaQuery } from "@mui/material"
import {
  LogoBox,
  ButtonBox,
  StyledTitle,
  LoginLinkBox,
  StyledAppBar,
  BookingMenuBox,
  DropDownMenuBox,
  StyledProfileIcon,
  NavigationLinksBox,
  NavigationLinksPrimaryBox,
  NavigationLinksSecondaryBox,
} from "./styles"
import { handleStay } from "../../utils/analytics/events/NonEcommerce/book-a-stay-event"
import { handleTopNav } from "../../utils/analytics/events/NonEcommerce/top-nav-clicked-event"
import { useRouter } from "next/router"
import BookingFlowGlobalStore from "../../features/booking/store/globalStore/booking.flow.store"
import useDebouncedFunction from "../../utils/useDebouncedFunction"

const DropDownMenu = dynamic(() => import("./dropDownMenu"))
const BookingMenu = dynamic(() => import("./booking-menu.component"))
const RewardsDropDown = dynamic(() => import("./rewards-drop-down"))

const Header = (headerData: any) => {
  const theme = useTheme()
  const isMobile = useMediaQuery("(max-width:641px)")
  const navigate = useAppNavigation()
  const isUserLoggedIn = useLoggedIn()
  const context = useContext(IHCLContext)
  const router = useRouter()

  //* * User details store
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const userStore = context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  //**  Global Store
  const bookingFlowGlobalStore = context?.getGlobalStore(GLOBAL_STORES?.bookingFlowStore) as BookingFlowGlobalStore

  const { bookingOrderData } = bookingFlowGlobalStore

  const isSEB =
    Boolean(router?.query?.sebbalance) ||
    (Boolean(bookingOrderData?.bookingOrderResponse?.orderLineItems?.[0]?.hotel?.isSeb) && !isUserLoggedIn)
  const dataLayer = MemberDataLayer(userStore, gaStoreData)
  const rewardsData = headerData?.[0]?.dropDownItems[0]
  const primaryLogo = headerData?.[0]?.logo?.asset?._ref
  const dropDownListItems = headerData?.[0]?.dropDownList[0]
  const firstSixItems = headerData?.[0]?.navItems?.slice(0, 6)
  const secondaryLogo = headerData?.[0]?.secondaryLogo?.asset?._ref
  const dropDownItems = headerData?.[0]?.navItems?.slice(6, headerData?.[0]?.navItems?.length)

  const [scrollDowned, setScrollDowned] = useState<boolean>(false)
  const [showBookingMenu, setShowBookingMenu] = useState<boolean>(false)
  const [showDropDownMenu, setShowDropDownMenu] = useState<boolean>(false)
  const [showRewordsDropDown, setShowRewordsDropDown] = useState<boolean>(false)
  const [isNavBarNotTransparent, setIsNavBarNotTransparent] = useState<boolean>(false)
  const [customerHashPresent, setCustomerHashPresent] = useState<boolean>(false)

  const isCustomerHashPresent = global?.window?.localStorage?.getItem("customerHash")

  const toggleDropDowns = (value: number) => {
    switch (value) {
      case 1:
        setShowBookingMenu((prev: any) => !prev)
        setShowDropDownMenu(() => false)
        setShowRewordsDropDown(() => false)
        break
      case 2:
        setShowBookingMenu(() => false)
        setShowDropDownMenu((prev: any) => !prev)
        setShowRewordsDropDown(() => false)
        break
      case 3:
        setShowBookingMenu(() => false)
        setShowDropDownMenu(() => false)
        setShowRewordsDropDown((prev: any) => !prev)
        break
      default:
        break
    }
  }

  useEffect(() => {
    setShowDropDownMenu(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [global?.window?.location?.pathname])

  useEffect(() => {
    const body = document?.body?.style
    const headerElementNav = document?.getElementById("main__Header_nav")
    const documentWidth = document.documentElement.clientWidth
    const scrollbarWidth = Math.abs(global?.window?.innerWidth - documentWidth)
    if (showBookingMenu) {
      body.paddingRight = `${scrollbarWidth}px`
      if (headerElementNav) {
        headerElementNav.style.paddingRight = `${scrollbarWidth}px`
      }
      body.overflow = "hidden"
    } else {
      body.overflow = "auto"
      body.paddingRight = "0"
      if (headerElementNav) {
        headerElementNav.style.paddingRight = "0"
      }
    }
  }, [showBookingMenu])

  const showSecondaryHeaderStyles = scrollDowned || showDropDownMenu || showRewordsDropDown

  const changeNavbarColor = () => {
    if (window.scrollY >= 120 || headerData?.headerBackgroundVariant?.toLowerCase() === "gradient") {
      setScrollDowned(true)
      setIsNavBarNotTransparent(true)
    } else {
      setScrollDowned(false)
      setIsNavBarNotTransparent(false)
    }
  }

  const debouncedScrollFunction = useDebouncedFunction(changeNavbarColor, 200)

  useEffect(() => {
    if (headerData?.headerBackgroundVariant?.toLowerCase() === "gradient") {
      setScrollDowned(true)
      setIsNavBarNotTransparent(true)
    } else {
      changeNavbarColor()
      global?.window?.addEventListener("scroll", debouncedScrollFunction, { passive: true })
    }

    return () => {
      // Cleanup: Remove the event listener when the component unmounts
      global?.window?.removeEventListener("scroll", changeNavbarColor)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [global?.window?.location?.pathname, global?.window?.scrollY])

  useEffect(() => {
    global?.window?.addEventListener("storage", function (e) {
      if (!!global?.window?.localStorage?.getItem("customerHash")) {
        setCustomerHashPresent(true)
      } else {
        setCustomerHashPresent(false)
      }
    })
    return global?.window?.removeEventListener("storage", () => {})
  }, [isUserLoggedIn, isCustomerHashPresent, showSecondaryHeaderStyles, isNavBarNotTransparent, scrollDowned])

  const handleRoute = async (url: string, type: PathType | undefined, linkText: string) => {
    let IsMore = linkText === "MORE"
    let IsRewards = linkText === "MEMBERSHIPS"
    !IsMore && !IsRewards && handleTopNav(url, type, linkText, dataLayer, isUserLoggedIn, headerData)
    navigate(url, type)
  }

  return (
    <Box sx={{ position: "relative", width: "100%" }} id="main__Header">
      <StyledAppBar
        component="nav"
        $showDropDownMenu={showSecondaryHeaderStyles}
        $isNavBarNotTransparent={isNavBarNotTransparent}
        id="main__Header_nav">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: isMobile ? "12px" : "",
          }}>
          {primaryLogo && secondaryLogo && (
            <LogoBox $isMobile={isMobile} $showHeaderStyles={showSecondaryHeaderStyles}>
              <Link href={"/"}>
                <ImageBoxWrapper
                  alt="taj-logo"
                  loading="lazy"
                  component="img"
                  src={urlFor(showSecondaryHeaderStyles ? secondaryLogo : primaryLogo).url()}
                  $showDropDownMenu={showSecondaryHeaderStyles}
                  $isMobile={isMobile}
                />
              </Link>
            </LogoBox>
          )}
          {!isMobile && (
            <NavigationLinksBox>
              <NavigationLinksPrimaryBox
                $isScrollDowned={scrollDowned}
                sx={{
                  gap: DesktopPxToVw(35),
                }}>
                {firstSixItems?.map((item: any, index: number) => (
                  <NavigationLinksSecondaryBox
                    key={item?._key}
                    onClick={() => {
                      firstSixItems?.length - 1 == index && toggleDropDowns(2)
                      firstSixItems?.length - 2 == index && toggleDropDowns(3)
                    }}>
                    <StyledTitle
                      $ShowCursor={
                        item?.url || firstSixItems?.length - 1 == index || firstSixItems?.length - 2 == index
                      }
                      fontWeight={400}
                      $color={showSecondaryHeaderStyles}
                      variant="body-ml"
                      onClick={() =>
                        firstSixItems?.length - 1 !== index &&
                        firstSixItems?.length - 2 !== index &&
                        handleRoute(item?.url, item?.urlType, item?.title)
                      }>
                      {item?.title}
                    </StyledTitle>
                    {firstSixItems?.length - 1 == index && (
                      <KeyboardArrowDown
                        sx={{
                          transform: showDropDownMenu ? "rotate(180deg)" : "rotate(0deg)",
                          transitionDuration: "0.5s",
                          transitionProperty: "transform",
                          width: "auto",
                          cursor: "pointer",
                          height: "1.25vw",
                          color: showSecondaryHeaderStyles
                            ? theme?.palette?.ihclPalette?.hexTwo
                            : theme?.palette?.ihclPalette?.hexOne,
                        }}
                      />
                    )}
                    {firstSixItems?.length - 2 == index && (
                      <KeyboardArrowDown
                        sx={{
                          transform: showRewordsDropDown ? "rotate(180deg)" : "rotate(0deg)",
                          transitionDuration: "0.5s",
                          transitionProperty: "transform",
                          width: "auto",
                          cursor: "pointer",
                          height: "1.25vw",
                          color: showSecondaryHeaderStyles
                            ? theme?.palette?.ihclPalette?.hexTwo
                            : theme?.palette?.ihclPalette?.hexOne,
                        }}
                      />
                    )}
                  </NavigationLinksSecondaryBox>
                ))}
              </NavigationLinksPrimaryBox>
              {!isSEB && (
                <ButtonBox $isScrollDowned={scrollDowned}>
                  {headerData?.[0]?.loginList?.map((item: any, index: number) => (
                    <LoginLinkBox key={item?._key}>
                      {item?.title?.toLowerCase() == CONSTANTS?.LOGIN &&
                        isUserLoggedIn &&
                        (customerHashPresent || isCustomerHashPresent) && (
                          <Box>
                            <StyledTitle
                              sx={{
                                gap: 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                              onClick={() =>
                                global?.window?.location?.pathname !==
                                  ROUTES?.WITHOUTSEO_FOR_ROUTING?.MY_ACCOUNT?.OVERVIEW &&
                                handleRoute(
                                  ROUTES?.WITHOUTSEO_FOR_ROUTING?.MY_ACCOUNT?.OVERVIEW,
                                  PathType?.internal,
                                  PLACEHOLDERS?.ACCOUNT,
                                )
                              }
                              $ShowCursor={false}
                              $color={showSecondaryHeaderStyles}
                              fontWeight={400}
                              variant="body-ml">
                              <StyledProfileIcon
                                component="img"
                                loading="lazy"
                                alt="profile-icon"
                                src={!scrollDowned ? Profile_icon : Gold_Profile_icon}
                              />
                              <Box sx={{ cursor: "pointer" }}>{PLACEHOLDERS?.ACCOUNT}</Box>
                            </StyledTitle>
                          </Box>
                        )}
                      {headerData?.[0]?.loginList?.length > 0 && headerData?.[0]?.loginList?.length - 1 == index && (
                        <Divider
                          orientation="vertical"
                          variant="middle"
                          flexItem
                          sx={{
                            opacity: "0.2",
                            visibility: "hidden",
                            marginRight: DesktopPxToVw(15),
                            marginLeft: DesktopPxToVw(7),
                            height: "16px",
                            backgroundColor: showSecondaryHeaderStyles
                              ? theme?.palette?.ihclPalette?.hexTwo
                              : theme?.palette?.ihclPalette?.hexOne,
                          }}
                        />
                      )}
                      {headerData?.[0]?.loginList?.length > 0 && !(customerHashPresent || !!isCustomerHashPresent) && (
                        <Typography
                          variant="body-ml"
                          sx={{
                            fontWeight: 400,
                            letterSpacing: "0.03em",
                            cursor: "pointer",
                            color: showSecondaryHeaderStyles
                              ? theme?.palette?.ihclPalette?.hexTwo
                              : theme?.palette?.ihclPalette?.hexOne,
                          }}
                          onClick={() => {
                            !router?.query?.sebbalance && handleRoute(item?.url, item?.urlType, item?.title)
                          }}>
                          {item?.title}
                        </Typography>
                      )}
                      {
                        //? commented as Surinder asked to remove the arrow
                        /* {headerData?.[0]?.loginList?.length > 0 &&
                        headerData?.[0]?.loginList?.length - 1 === index && (
                          <KeyboardArrowDown
                            sx={{
                              transform: "rotate(0deg)",
                              transitionDuration: "0.5s",
                              transitionProperty: "transform",
                              width: "auto",
                              cursor: "pointer",
                              height: "1.25vw",
                              color: showSecondaryHeaderStyles
                                ? theme?.palette?.ihclPalette?.hexTwo
                                : theme?.palette?.ihclPalette?.hexOne,
                            }}
                          />
                        )} */
                      }
                    </LoginLinkBox>
                  ))}
                  <Box sx={{ position: "relative" }}>
                    <Typography
                      variant="body-ml"
                      sx={{
                        letterSpacing: "0.1em",
                        width: DesktopPxToVw(220),
                        color: showSecondaryHeaderStyles
                          ? theme?.palette?.ihclPalette?.hexTwo
                          : theme?.palette?.ihclPalette?.hexOne,
                      }}
                      onClick={() => {
                        toggleDropDowns(1), handleStay("book_a_stay_Clicked", dataLayer, headerData, isUserLoggedIn)
                      }}>
                      {showBookingMenu ? (
                        <>
                          <span>{CONSTANTS?.CLOSE}</span>
                          <Close />
                        </>
                      ) : (
                        headerData?.[0]?.primaryAction?.title
                      )}
                    </Typography>
                    <BookingMenuBox>
                      <Collapse in={showBookingMenu} timeout={300}>
                        <Box>
                          <BookingMenu
                            setShowBookingMenu={setShowBookingMenu}
                            showBookingMenu={showBookingMenu}
                            GaEvent={handleStay}
                            headerData={headerData}
                          />
                        </Box>
                      </Collapse>
                    </BookingMenuBox>
                  </Box>
                </ButtonBox>
              )}
            </NavigationLinksBox>
          )}
        </Box>
      </StyledAppBar>
      <DropDownMenuBox>
        <DropDownMenu
          dropDownItems={dropDownItems}
          dropDownListItems={dropDownListItems}
          setShowDropDownMenu={setShowDropDownMenu}
          showDropDownMenu={showDropDownMenu}
          headerData={headerData}
          GaEvent={handleTopNav}
          dataLayer={dataLayer}
          isUserLoggedIn={isUserLoggedIn}
        />
      </DropDownMenuBox>
      <DropDownMenuBox sx={{ width: "100%" }}>
        <RewardsDropDown
          dropDownItems={rewardsData}
          bookingData={dropDownListItems}
          setShowRewordsDropDown={setShowRewordsDropDown}
          showRewordsDropDown={showRewordsDropDown}
          headerData={headerData}
          GaEvent={handleTopNav}
          dataLayer={dataLayer}
          isUserLoggedIn={isUserLoggedIn}
        />
      </DropDownMenuBox>
    </Box>
  )
}

export default observer(Header)
