import React, { useContext, useEffect, useMemo, useState, useRef } from "react"
import dynamic from "next/dynamic"
import { ICONS } from "../constants"
import { Button } from "@mui/material"
import { theme } from "../../lib/theme"
import { observer } from "mobx-react-lite"
import useStorage from "../../utils/useStorage"
import { GAStore, UserStore } from "../../store"
import { useMobileCheck } from "../../utils/isMobilView"
import { UseAddress } from "../../utils/hooks/useAddress"
import { useLoggedIn } from "../../utils/hooks/useLoggedIn"
import { GLOBAL_STORES, PAGE_STORES } from "../../utils/Constants"
import { ParentStack, TickImage } from "./styles/tab-with-selection-tick"
import { MemberDataLayer } from "../../utils/analytics/member-data-layer"
import { HotelDataLayer } from "../../utils/analytics/hotel-data-layer"
import BookingsFlowStore from "../../features/booking/store/pageStore/booking.store"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { PageContext } from "../../PresentationalComponents/lib/prepare-page-context"
import BookingFlowGlobalStore from "../../features/booking/store/globalStore/booking.flow.store"
import { PaymentInItModalData } from "../../features/booking/JSON_Data/payment-init-alert"
import { handleBeginCheckOut } from "../../utils/analytics/events/Ecommerce/Booking-Journey/begin-checkout"

const BasicModal = dynamic(() => import("../hoc/modal/modal"))
const LoadingSpinner = dynamic(() => import("../../utils/SpinnerComponent"))
const ErrorModal = dynamic(() => import("../../features/booking/ui/error-modal.component"))
const TenderModeClearanceAlert = dynamic(() => import("../../features/booking/ui/tender-mode-clearance-dialog"))
const NoRoomsAvailabilityAlertAtPaymentINIT = dynamic(
  () => import("../../features/booking/ui/no-room-availability-at-init-component"),
)

const TabWithSelectionTick = (props: any) => {
  const { getItem } = useStorage()
  const isMobile = useMobileCheck()
  const isUserLoggedIn = useLoggedIn()
  const buttonsRef: any = useRef(null)
  const context = useContext(IHCLContext)
  const pageContext: any = useContext(PageContext)

  //** Store
  const bookingFlowPageStore = pageContext?.getPageStore(PAGE_STORES?.bookingFlowStore) as BookingsFlowStore
  const bookingFlowGlobalStore = context?.getGlobalStore(GLOBAL_STORES?.bookingFlowStore) as BookingFlowGlobalStore
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const userStore = context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore

  const [updatedTab, setUpdatedTab] = useState<any>()
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [activeTabData, setActiveTabData] = useState<any>()
  const [openInItModal, setOpenInItModal] = useState<boolean>(false)
  const [tabData, setTabData] = useState<any>({
    tabData: null,
    activeIndex: null,
    paymentType: "",
    openTenderModeAlert: false,
  })

  const address = UseAddress(userStore)
  const hotelDataLayer = HotelDataLayer()
  const dataLayer = MemberDataLayer(userStore, gaStoreData)
  const customerHash: any =
    global?.localStorage?.getItem("customerHash") || global?.localStorage?.getItem("guestCustomerHash")

  const {
    isValid,
    formError,
    guestFormDetails,
    setIsUserCreatedOrder,
    isUserSelectedTCCheckBoxToPay,
    setUserSelectedTCCheckBoxToPay,
  } = bookingFlowPageStore
  const {
    loading,
    cartDetails,
    isCouponApplied,
    handleCouponModal,
    orderDetails,
    paymentLabelDetails,
    setActiveTab,
    setCreateOrder,
    setUpdatePaymentType,
    setInitiatePaymentSDK,
    clearOrderResponse,
    clearCartResponse,
    setCartErrorResponse,
  } = bookingFlowGlobalStore

  const paymentTabs = useMemo(
    () =>
      updatedTab &&
      Object.keys(updatedTab)
        ?.filter((key: any) => updatedTab[key] === true)
        .map((key: any) => {
          return {
            label: key
              ?.replace(/([A-Z])/g, " $1")
              ?.trim()
              ?.toUpperCase(),
            keyName: key,
          }
        }),
    [updatedTab],
  )

  const tabsToDisplay = useMemo(
    () =>
      paymentTabs?.map((pTab: any) => {
        const foundTab = props?.tabs?.find((SanityTab: any) => pTab?.label == SanityTab?.title)
        return { ...pTab, ...foundTab }
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [paymentTabs],
  )

  const codes = bookingFlowGlobalStore?.userEnteredPromoCode
  const roomDetails = cartDetails?.cartDetailsResponse?.items?.[0]?.hotel?.[0]?.room
  const roomData = cartDetails?.cartDetailsResponse?.items?.[0]?.hotel?.[0]?.room?.[0]
  const isInvalidVoucherDetails = orderDetails?.error && orderDetails?.isInvalidVoucherDetails
  const isUserAddedTenderModesToTheCart =
    cartDetails?.cartDetailsResponse?.paymentSummary?.neuCoins > 0 ||
    cartDetails?.cartDetailsResponse?.paymentSummary?.giftCardPrice > 0
  const isConfirmBooking = tabsToDisplay?.length === 1 && tabsToDisplay?.[0]?.title?.toLowerCase() === "confirm booking"

  //? using to create order and change the payment type
  const createOrder = async (index: number, tabData: any, paymentType: string) => {
    const expandPaymentSDK =
      (paymentType?.toUpperCase() == "PAY FULL" || paymentType?.toUpperCase() == "PAY NOW") && isUserLoggedIn
    //? expandPaymentSDK value is using for:   For logged in user we have to expand redeem & save component instead of payment SDK if we have the redeem & save component
    if (orderDetails?.orderDetailsResponse?.orderId) {
      handleScroll()
      if (
        index !== activeIndex &&
        isUserAddedTenderModesToTheCart &&
        (paymentType?.toUpperCase() !== "PAY FULL" || paymentType?.toUpperCase() !== "PAY NOW")
      ) {
        setTabData({
          tabData: tabData,
          activeIndex: index,
          paymentType: paymentType,
          openTenderModeAlert: true,
        })
        return
      } else {
        await setUpdatePaymentType({
          cardNo: "",
          nameOnCard: "",
          expiryDate: "",
          paymentType: paymentType,
          customerHash: customerHash,
          orderId: orderDetails?.orderDetailsResponse?.orderId,
        })
        if (cartDetails?.error === false) {
          setActiveIndex(index)
          setActiveTabData(tabData)
          setInitiatePaymentSDK(!expandPaymentSDK)
        }
      }
    } else {
      await setCreateOrder(guestFormDetails, paymentType)
      if (cartDetails?.error === false) {
        setActiveIndex(index)
        setActiveTabData(tabData)
        setInitiatePaymentSDK(!expandPaymentSDK)
      }
    }
  }

  const handleModalClose = () => {
    setOpenInItModal(false)
    handleCouponModal(false)
  }

  const handleRestart = () => {
    clearOrderResponse()
    clearCartResponse()
    setUserSelectedTCCheckBoxToPay(false)
  }

  const handleTryAgainToReEnterTheVoucherDetails = () => {
    clearOrderResponse()
    setUserSelectedTCCheckBoxToPay(false)
  }

  //? Using to bring the buttons and payment options into the viewport
  const handleScroll = () => {
    if (buttonsRef?.current) {
      const elementTop = buttonsRef?.current.getBoundingClientRect().top
      const offset = isMobile ? 150 : 100
      window.scrollTo({
        top: elementTop + window.scrollY - offset,
        behavior: "smooth",
      })
    }
  }

  //? Using this useEffect we are checking guest details in the form and disabling the PAY NOW or PAY AT HOTEL buttons
  useEffect(() => {
    if (
      guestFormDetails?.firstName?.length > 0 &&
      guestFormDetails?.lastName?.length > 0 &&
      guestFormDetails?.email?.length > 0 &&
      guestFormDetails?.phoneNumber?.length > 0
    ) {
      bookingFlowPageStore?.updateFormValidation(false)
    } else {
      bookingFlowPageStore?.updateFormValidation(true)
    }
  }, [
    bookingFlowPageStore,
    guestFormDetails?.phoneNumber?.length,
    guestFormDetails?.email?.length,
    guestFormDetails?.firstName?.length,
    guestFormDetails?.lastName?.length,
  ])

  //? Using to create order on filling the form details and consent accepting
  useEffect(() => {
    const expandPaymentSDK =
      (tabsToDisplay?.[0]?.label?.toUpperCase() == "PAY FULL" ||
        tabsToDisplay?.[0]?.label?.toUpperCase() == "PAY NOW") &&
      isUserLoggedIn //? expandPaymentSDK value is using for:  For logged in user we have to expand redeem & save component instead of payment SDK if we have the redeem & save component
    if (isUserSelectedTCCheckBoxToPay && !isValid && !formError) {
      setCreateOrder(guestFormDetails, tabsToDisplay?.[0]?.label)
      setInitiatePaymentSDK(!expandPaymentSDK)
      handleBeginCheckOut(
        "begin_checkout",
        dataLayer,
        hotelDataLayer,
        roomDetails,
        bookingFlowPageStore,
        bookingFlowGlobalStore,
        cartDetails,
        address,
        roomData,
        getItem,
        codes,
      )
      if (cartDetails?.error === false) {
        handleScroll()
        setIsUserCreatedOrder(true)
        setActiveTabData(tabsToDisplay?.[0]?.tabItems)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserSelectedTCCheckBoxToPay, isValid, formError, guestFormDetails])

  useEffect(() => {
    setActiveTab(tabsToDisplay?.[activeIndex]?.label)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabsToDisplay, activeIndex])

  //? Removing isInternational key from the payment labels
  useEffect(() => {
    const removedInternationalKey = JSON?.parse(JSON?.stringify(paymentLabelDetails?.paymentLabelsResponse))
    delete removedInternationalKey.isInternational
    const isAllFalse = Object.keys(paymentLabelDetails?.paymentLabelsResponse)?.every(
      (key: any) => paymentLabelDetails?.paymentLabelsResponse[key] === false,
    )
    //?When all tabs are false, Setting pay now to true
    if (isAllFalse) {
      removedInternationalKey["payNow"] = true
    }
    setUpdatedTab(removedInternationalKey)
  }, [paymentLabelDetails?.paymentLabelsResponse])

  //? Using to open the modal, to show the no availability message in the user selected rooms
  useEffect(() => {
    if (
      orderDetails?.orderDetailsResponse?.errorCode !== "200" &&
      orderDetails?.orderDetailsResponse?.errorMessage?.length > 0
    ) {
      setOpenInItModal(true)
    }
  }, [orderDetails?.orderDetailsResponse?.errorCode, orderDetails?.orderDetailsResponse?.errorMessage?.length])

  return (
    <>
      {loading && <LoadingSpinner />}
      <ParentStack $isConfirmBooking={isConfirmBooking} aria-label="TabWithSelectionTick" ref={buttonsRef}>
        {!isConfirmBooking &&
          tabsToDisplay?.map((item: any, index: number) => (
            <Button
              key={index}
              sx={{ minWidth: isMobile ? "40.625vw" : "15.625vw" }}
              variant={activeIndex == index ? "light-contained" : "light-outlined"}
              disabled={!isUserSelectedTCCheckBoxToPay || isValid || formError}
              onClick={() => {
                activeIndex !== index && createOrder(index, item?.tabItems, item?.label)
              }}
              startIcon={
                activeIndex == index &&
                isUserSelectedTCCheckBoxToPay &&
                orderDetails?.orderDetailsResponse?.orderId && (
                  <TickImage component="img" src={ICONS?.BUTTON_TICK_ICON} />
                )
              }>
              {item?.title}
            </Button>
          ))}
      </ParentStack>
      {loading && (
        //? Using for component level loading
        <LoadingSpinner componentLevel={true} />
      )}
      {isUserSelectedTCCheckBoxToPay &&
        orderDetails?.error === false &&
        orderDetails?.orderDetailsResponse?.orderId &&
        activeTabData?.map((item: any) => context?.renderComponent(item?._type, item))}

      {tabData?.openTenderModeAlert && (
        <TenderModeClearanceAlert
          tabData={tabData}
          setTabData={setTabData}
          setActiveIndex={setActiveIndex}
          setActiveTabData={setActiveTabData}
          openDialog={tabData?.openTenderModeAlert}
        />
      )}
      {(openInItModal || isInvalidVoucherDetails || orderDetails?.error || cartDetails?.error) && (
        <BasicModal
          width={"100%"}
          height={"100%"}
          showLogo={true}
          tajLogoTop={"0vh"}
          open={openInItModal || orderDetails?.error || cartDetails?.error}
          handleClose={
            openInItModal
              ? handleModalClose
              : isInvalidVoucherDetails
              ? handleTryAgainToReEnterTheVoucherDetails
              : cartDetails?.error
              ? setCartErrorResponse
              : handleRestart
          }
          CloseIcon={ICONS?.CLOSE_GOLD_ICON}
          webCloseIcon={ICONS?.CLOSE_WHITE_ICON}
          ModalCloseButtonStyles={{ right: "25.5%" }}
          ModalCloseButtonColor={theme?.palette?.background?.paper}
          bgcolor={isMobile ? theme?.palette?.background?.default : ""}
          Component={
            openInItModal ? (
              <NoRoomsAvailabilityAlertAtPaymentINIT data={PaymentInItModalData} handleModalClose={handleModalClose} />
            ) : (
              <ErrorModal
                actionHandler={
                  cartDetails?.error
                    ? setCartErrorResponse
                    : isInvalidVoucherDetails
                    ? handleTryAgainToReEnterTheVoucherDetails
                    : handleRestart
                }
                primaryAction={cartDetails?.error || isInvalidVoucherDetails ? "TRY AGAIN" : "RESTART"}
                title={!isInvalidVoucherDetails && "We are unable to process your request at this moment"}
                subTitle={
                  cartDetails.errorResponse?.data ||
                  orderDetails?.errorResponse?.data ||
                  "please try again after some time"
                }
              />
            )
          }
        />
      )}
      <BasicModal
        width={"100%"}
        height={"100%"}
        showLogo={true}
        tajLogoTop={"0vh"}
        open={isCouponApplied}
        handleClose={handleModalClose}
        CloseIcon={ICONS?.CLOSE_GOLD_ICON}
        webCloseIcon={ICONS?.CLOSE_WHITE_ICON}
        ModalCloseButtonStyles={{ right: "25.5%" }}
        ModalCloseButtonColor={theme?.palette?.background?.paper}
        bgcolor={isMobile ? theme?.palette?.background?.default : ""}
        Component={
          <ErrorModal
            primaryAction={"CONTINUE"}
            actionHandler={handleModalClose}
            title={"Coupon applied successfully"}
            subTitle={"Coupon discount is successfully applied to your current booking"}
          />
        }
      />
    </>
  )
}

export default observer(TabWithSelectionTick)
