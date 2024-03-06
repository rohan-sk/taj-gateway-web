import React, { Fragment, useContext, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/router"
import { ToggleTabsTypes } from "./types"
import { observer } from "mobx-react-lite"
import { getCookie } from "../../utils/cookie"
import { GAStore, UserStore } from "../../store"
import { triggerEvent } from "../../utils/analytics"
import { GLOBAL_STORES } from "../../utils/Constants"
import { useMobileCheck } from "../../utils/isMobilView"
import { HotelDataLayer } from "../../utils/analytics/hotel-data-layer"
import { MemberDataLayer } from "../../utils/analytics/member-data-layer"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import BookingFlowGlobalStore from "../../features/booking/store/globalStore/booking.flow.store"
import { MainBox, StyledButton, ButtonTypo, ToggleWrapper } from "../BookingFlow/styles/toggle-button"

const ToggleTabs = (props: ToggleTabsTypes) => {
  const { tabs } = props
  const router = useRouter()
  const isMobile = useMobileCheck()
  const context = useContext(IHCLContext)
  const hotelDataLayer = HotelDataLayer()

  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [activeTabData, setActiveTabData] = useState<any>()
  const [offersTabName, setOffersTabName] = useState<string | undefined>()

  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const userStore = context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const bookingFlowGlobalStore = context?.getGlobalStore(GLOBAL_STORES?.bookingFlowStore) as BookingFlowGlobalStore

  const { roomsAvailability } = bookingFlowGlobalStore
  const dataLayer = MemberDataLayer(userStore, gaStoreData)

  const specialCode = router?.query?.sc as string
  const codes = bookingFlowGlobalStore?.userEnteredPromoCode
  const dates = bookingFlowGlobalStore?.guestBookingSchedule
  const details = bookingFlowGlobalStore?.addToCartPayload
  const toggleTabs = roomsAvailability?.availabilityResponse?.tab

  //? using to show in the tab list
  const promotionTab = useMemo(() => {
    switch (specialCode?.toLowerCase()) {
      case "corporate access code":
        return "corporate plan"
      case "travel agency code":
        return "travel agent"
      case "business connect code":
        return "business connect"
      case "group code":
        return "group plan"
      case "special offer code":
        return "special offer"
      default:
        return "promotions"
    }
  }, [specialCode])

  useEffect(() => {
    if (global?.window !== undefined) {
      let urlParams = new URLSearchParams(global?.window?.location?.search)
      setOffersTabName(urlParams?.get("offerName") || undefined)
    }
  }, [])

  useEffect(() => {
    setActiveTabData([
      {
        ...tabs?.[0]?.tabItems?.[0],
        activeTabIndexedData: toggleTabs?.[activeIndex],
      },
    ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, roomsAvailability])

  useEffect(() => {
    if (toggleTabs?.length === 1) {
      setActiveIndex(0)
    }
  }, [toggleTabs])


  const activeTabName = activeTabData?.[0]?.activeTabIndexedData
  global?.window?.localStorage?.setItem("activeTabName", activeTabName)
  const handlePackage = (title: any) => {
    let roomsData = bookingFlowGlobalStore?.guestDetails?.data
    let adultCount: number = 0
    let childCount: number = 0
    roomsData?.map((room: any) => {
      if (room?.adults) {
        adultCount = adultCount + room?.adults
      }
      if (room?.child) {
        childCount = childCount + room?.child
      }
    })
    const presentDate = new Date()
    const checkInDate = new Date(dates?.userCheckInDate)
    triggerEvent({
      action: "packageSelected",
      params: {
        ...dataLayer,
        ...hotelDataLayer,
        event: "packageSelected",
        buttonLinkName: title,
        eventTicketsQty: "",
        eventDate: "",
        eventName: "",
        eventPlace: "",
        eventType: "",
        offerName: "",
        offerCode: "",
        offerID: "",
        offerCategory: "",
        offerValidity: "",
        destinationSelected: details?.hotel?.[0]?.hotelName,
        datesToBook: Math.ceil((checkInDate.getTime() - presentDate.getTime()) / 86400000),
        arrivalDate: dates?.userCheckInDate,
        departureDate: dates?.userCheckOutDate,
        noOfRooms: bookingFlowGlobalStore?.guestDetails?.data?.length,
        noOfAdults: adultCount,
        noOfChild: childCount,
        specialCode:
          codes?.agentId || codes?.couponCode || codes?.promoCode || codes?.rateCode || codes?.index || codes?.title,
        clientId: getCookie("_ga")?.slice(6),
        visitSource: "",
        brandName: details?.hotel?.[0]?.hotelName,
        package: "",
        link_url: "",
        link_text: title,
        widget_title: title,
        widget_description: "",
        widget_type: props?._type,
        widget_position: "",
        outbound: "",
        item_name: title,
        item_type: props?._type,
        no_of_items: toggleTabs?.length,
        location: "",
        roomName: "",
        roomOffer: "",
      },
    })
  }

  const handleScroll = (element: any) => {
    element?.scrollIntoView({
      block: "center",
      behavior: "smooth",
      inline: "center",
    })
  }
  useEffect(() => {
    const element = document?.getElementById(`active-tab-${activeIndex + 2}`)
    element && handleScroll(element)
  }, [activeIndex])

  return (
    <>
      <ToggleWrapper
        sx={{
          overflowX: isMobile ? "auto" : "none",
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
        $isMobile={isMobile}>
        <MainBox>
          {toggleTabs?.map((item: any, index: number) => (
            <Fragment key={index}>
              {activeIndex == index ? (
                <StyledButton
                  key={index}
                  variant="contained"
                  disableRipple={true}
                  $numberOfTabs={toggleTabs?.length}
                  onClick={() => {
                    setActiveIndex(index)
                    handlePackage(item)
                  }}
                  style={
                    (offersTabName?.length || item?.length) > 30
                      ? {
                          overflow: "hidden",
                          display: "inline-block",
                          textOverflow: "ellipsis",
                          padding: isMobile ? MobilePxToVw(8) : `${DesktopPxToVw(5)} ${DesktopPxToVw(20)}`,
                          minHeight: isMobile ? MobilePxToVw(65) : DesktopPxToVw(63),
                        }
                      : {}
                  }
                  id={`active-tab-${index + 2}`}>
                  {item?.toLowerCase() === "offers" && offersTabName !== undefined
                    ? offersTabName
                    : item?.toLowerCase() === "promotions"
                    ? promotionTab
                    : item}
                </StyledButton>
              ) : (
                <ButtonTypo
                  variant={isMobile ? "m-heading-xxs" : "heading-xs"}
                  $numberOfTabs={toggleTabs?.length}
                  style={
                    (offersTabName?.length || item?.length) > 30
                      ? {
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          display: "inline-block",
                          textOverflow: "ellipsis",
                          maxWidth: isMobile ? MobilePxToVw(350) : DesktopPxToVw(350),
                          paddingLeft: isMobile ? MobilePxToVw(10) : DesktopPxToVw(10),
                        }
                      : {}
                  }
                  onClick={() => {
                    setActiveIndex(index)
                    handlePackage(item)
                    global?.window?.localStorage?.setItem("activeTabName", item)
                  }}
                  id="non-active-tab">
                  {item?.toLowerCase() === "offers" && offersTabName !== undefined
                    ? offersTabName
                    : item?.toLowerCase() === "promotions"
                    ? promotionTab
                    : item}
                </ButtonTypo>
              )}
            </Fragment>
          ))}
        </MainBox>
      </ToggleWrapper>
      {activeTabData?.map((item: any) => context?.renderComponent(item?._type, item))}
    </>
  )
}

export default observer(ToggleTabs)
