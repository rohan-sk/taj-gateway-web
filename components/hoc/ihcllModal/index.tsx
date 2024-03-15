import dynamic from "next/dynamic"
import { ICONS } from "../../constants"
import { theme } from "../../../lib/theme"
import { observer } from "mobx-react-lite"
import MUIModal from "@mui/material/Modal"
import { Typography } from "@mui/material"
import { UserStore } from "../../../store"
import { ROUTES } from "../../../utils/routes"
import { Enquire } from "../../Enquire/Enquire"
import { GLOBAL_STORES } from "../../../utils/Constants"
import { useIsLargeView } from "../../../utils/isLargeView"
import { useMobileCheck } from "../../../utils/isMobilView"
import { VenueDetails } from "../../venueDetails/VenueDetails"
import { useAppNavigation } from "../../../utils/NavigationUtility"
import { GalleryCarousel } from "../../GalleryCarousel/GalleryCarousel"
import { ReactNode, useContext, useEffect, useMemo, useState } from "react"
import { GazeboExperience } from "../../ExperienceEnquiry/GazeboExperience"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { ManageCardsModal } from "../../modal/manage-cards-modal-components/ManageCards"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import ModalStore from "../../../store/global/modal.store"
import { RoomDetailsModal } from "../../venueDetails/hotel-room-details.modal.component"
import { RenderEpicureComparsionModal } from "../../../features/loyalty/UI/render-epicure-comparsion-modal"
import {
  ModalContext,
  ModalContextProps,
  prepareModalContext,
} from "../../../PresentationalComponents/lib/prepare-page-context"

const BasicModal = dynamic(() => import("../modal/modal"))
const DefaultModal = dynamic(() => import("./default-modal"))
const RegisterForm = dynamic(() => import("../../Login/register-form/register-form.component"))
const RenderOtpComponent = dynamic(() => import("../../Login/OtpInputLogic/render-otp-component"))
const SubscriptionSuccess = dynamic(() => import("../../nudge/nudge-for-subscription-success.component"))
const CookiesManagementSystem = dynamic(() => import("../../card/CookiesModal/cookies.management.component"))
const LoginFormWithMultipleTabs = dynamic(() => import("../../Login/login-form-with-multiple-tabs.component"))
const BulkEnquiryComponent = dynamic(() => import("../../modal/manage-cards-modal-components/enquiry.component"))
const OfferFormComponent = dynamic(() => import("../../modal/book-a-stay-modal-components/offers-form.component"))
const PaymentModelComponent = dynamic(() => import("../../modal/manage-cards-modal-components/payment-model.component"))
const NewSsoComponent = dynamic(() => import("../../NewSsoComponent"))
const BlogCommentsModal = dynamic(() => import("../../nudge/nudge-for-blog-comments"))
const SSOLoginModalDataForm = dynamic(() => import("../../Login/SSOLoginForm/SSOLoginModalDataForm"))
const BookingMaskForMsite = dynamic(() => import("../../../features/booking/ui/msite-booking-mask.component"))
const RoomReviewModalAfterLogin = dynamic(() => import("../../../features/booking/ui/room-review-modal.component"))
const SubscriptionEnquireSuccess = dynamic(
  () => import("../../nudge/nudge-with-subscription-enquire-successful.component"),
)
const RoomDetailModalSwitchCaseLogicComponent = dynamic(
  () => import("../../../features/booking/ui/room-review-modal-tier-based-switch-case.component"),
)
const MediaCardsComponentInsideTheModel = dynamic(
  () => import("../../modal/media-cards-component-inside-model/media-cards-component-inside-model"),
)

export const DIALOG_VARIANTS = {
  CORE: {
    COOKIES_SYSTEM_MODAL: "common-utils.dialog.cookies-system-modal",
    INTERSTITIAL: "homepage.interstitialDialog",
    GALLERY_CAROUSEL: "details.dialog.gallery-with-carousel",
    MANAGE_CARD: "manage-card",
    ENQUIRE_BULK_GIFT_CARD: "enquire-bulk-gift-card",
    SIGN_IN_NEU_PASS: "login-form-with-multiple-tabs",
    SSO_NEW_SIGN_IN_NEU_PASS: "authentication.dialog.sso-tabs",
    NEW_SIGN_IN_NEU_PASS: "authentication.dialog.login-and-registration",
    OTP_NEU_PASS: "authentication.dialog.otp-login-model",
    SIGN_UP_NEU_PASS: "authentication.dialog.global-register-user-details",
    SIGN_UP_SUCCESS_NEU_PASS: "authentication.dialog.on-successful-global-registration",
    VENUE_DETAILS_TOGGLE: "details.dialog.hotel-accommodation-and-general-information",
    SUBSCRIPTION_ENQUIRE_SUCCESSFUL: "ihcl.core.alert",
    EMAIL_PHONE_NUMBER_SIGN_UP: "authentication.dialog.mobile-number-registration",
    ENQURIES_FORM_MODAL: "details.dialog.enquiries-form-models",
    EPICURE_DIALOG_MODAL: "details.dialog.enquiries-comparison-models",
    GAZEBO_EXPERIENCE_MODAL: "details.dialog.image-carousel-model",
    NEU_PASS_MEMBERSHIP_PASSWORD: "authentication.dialog.global-membership-login",
    ROOM_DETAILS: "details.dialog.hotel-room-types",
    RATE_DETAIL_MODAL: "bookings.dialog.rate-detail-modal",
    BUSINESS_SERVICES_ENQUIRY: "businessServices.card.enquiry-form",
    SPA_SUCCESS_SCREEN: "details.venue-enquiry",
    SUBSCRIPTION_SUCCESS: "details.thank-you-subscription",
    BOOKING_MASK_IN_MSITE: "bookings.dialog.booking-mask",
    BOOKING_SUCCESS_AND_FAILURE_MODAL: "bookings.dialog.success-and-failure-pop-up",
    DESTINATION_BOOKING_MASK_FOR_MSITE: "bookings.dialog.destination-booking-mask",
  },
  GIFT_CARD: {
    PARTICIPATING_HOTEL_MODAL: "giftCards.dialog.finding-participating-hotel-search-modal",
    PAYMENT_MODAL: "giftCards.dialog.payment-i-frame",
  },
  OFFERS: {
    BOOK_A_STAY: "offers.dialog.offers-check-rates",
  },
  BOOKING: {
    CART_CLEARANCE: "bookings.dialog.reselect-room-modal",
  },
  BLOG: {
    COMMENT_SUBMIT: "blog.dialog.alert-message",
  },
  INNERGISE_DIALOG_POP_UP_MODEL: "details.dialog.innergise-pop-up-model",
}

interface ModalProps {
  connectedStores?: any
  title?: string
  description?: string
  variant?: string
  items?: any[]
  children?: ReactNode
  hideDialogHeader?: boolean
  handleClose?: Function
}

const modalStore = ModalStore.getInstance()

const handleClose = (props?: any) => {
  const actionBtn = props?.items?.[0]?.cases?.[0]?.item?.[0]?.secondaryAction
  if (props?.largeVariant === "bookings.dialog.success-and-failure-pop-up") {
    modalStore?.closeModal()
    props?.navigate(`${actionBtn?.url}?tab=1`, actionBtn?.urlType)
  } else {
    modalStore?.closeModal()
    if (modalStore?.propertyData?.length > 0) {
      modalStore?.clearPropertyData()
    }
  }
}

const handleCloseIcon = (userStore: any) => {
  userStore?.clearUserEnteredRegistrationMobileNumber()
  userStore?.clearUserEmailID()
  userStore?.clearUserCountryCode()
  userStore?.clearUserMobileNumber()
  userStore?.updateUserEnteredMemberID("")
  handleClose()
}

const renderModalChildren = (props: any) => {
  const { isMobile } = props
  switch (props.variant) {
    case DIALOG_VARIANTS.CORE.INTERSTITIAL:
      return (
        <MUIModal
          onClose={handleClose}
          aria-labelledby={props.title}
          aria-describedby={props.description}
          open={modalStore?.visibility}>
          <Typography>{"Dialog"}</Typography>
        </MUIModal>
      )

    case DIALOG_VARIANTS.CORE.GALLERY_CAROUSEL:
      return (
        <BasicModal
          width={"100%"}
          height={"100%"}
          handleClose={handleClose}
          open={modalStore?.visibility}
          bgcolor={theme?.palette?.background?.paper}
          Component={<GalleryCarousel data={props} />}
          ModalCloseButtonStyles={{
            right: DesktopPxToVw(240),
            marginBottom: DesktopPxToVw(20),
          }}
          CloseIcon={ICONS?.CLOSE_GOLD_ICON}
          mobileTop={"10.625vw !important"}
          iconPosition={"absolute !important"}
          iconRight="9.375vw !important"
          mobileJustifyContent="flex-end !important"
          webCloseIcon={ICONS?.CLOSE_BLACK_ICON}
        />
      )
    case DIALOG_VARIANTS.CORE.MANAGE_CARD:
      return (
        <BasicModal
          width={"100%"}
          height={"100%"}
          ModalCloseButtonColor={theme?.palette?.ihclPalette?.hexOne}
          // bgcolor={theme?.palette?.background?.paper}
          handleClose={handleClose}
          open={modalStore?.visibility}
          Component={<ManageCardsModal {...props} />}
          ModalCloseButtonStyles={{ marginBottom: "1.04vw", right: "19.5vw" }}
          mobileTop={"8.625vw !important"}
          iconPosition={"absolute !important"}
          iconRight="7.375vw !important"
          mobileJustifyContent="flex-end !important"
          CloseIcon={ICONS?.CLOSE_GOLD_ICON}
          webCloseIcon={ICONS?.CLOSE_WHITE_ICON}
        />
      )
    case DIALOG_VARIANTS.GIFT_CARD.PAYMENT_MODAL:
      return (
        <BasicModal
          width={"100%"}
          height={"100%"}
          ModalCloseButtonColor={theme?.palette?.ihclPalette?.hexOne}
          // bgcolor={theme?.palette?.background?.paper}
          handleClose={handleClose}
          open={modalStore?.visibility}
          Component={<PaymentModelComponent {...props} />}
          ModalCloseButtonStyles={{ marginBottom: "1.04vw", right: "19.5vw" }}
          mobileTop={"8.625vw !important"}
          iconPosition={"absolute !important"}
          iconRight="7.375vw !important"
          mobileJustifyContent="flex-end !important"
          CloseIcon={ICONS?.CLOSE_GOLD_ICON}
          webCloseIcon={ICONS?.CLOSE_WHITE_ICON}
        />
      )
    case DIALOG_VARIANTS.CORE.ENQUIRE_BULK_GIFT_CARD:
      return (
        <BasicModal
          width={"100%"}
          height={"100%"}
          bgcolor={theme?.palette?.background?.paper}
          handleClose={handleClose}
          open={modalStore?.visibility}
          Component={<BulkEnquiryComponent {...props} />}
          mobileTop={"10.625vw !important"}
          iconPosition={"absolute !important"}
          iconRight="9.375vw !important"
          ModalCloseButtonStyles={{ marginBottom: "-1.4vw", right: "13vw" }}
        />
      )
    case DIALOG_VARIANTS.CORE.SSO_NEW_SIGN_IN_NEU_PASS:
      return (
        <BasicModal
          width={"100%"}
          height={"100%"}
          bgcolor={theme?.palette?.ihclPalette?.hexOne}
          ModalCloseButtonDisplay={"none"}
          handleClose={() => {
            handleCloseIcon(props?.userStore)
            if (global?.window?.localStorage?.getItem("gotoAfterLogin")) {
              global?.window?.localStorage?.removeItem("gotoAfterLogin")
            }
            if (global?.window?.localStorage?.getItem("gotoAfterLoginType")) {
              global?.window?.localStorage?.removeItem("gotoAfterLoginType")
            }
          }}
          open={modalStore?.visibility}
          Component={<SSOLoginModalDataForm props={props} />}
          ModalCloseIconHeight={"1.250vw"}
          ModalCloseIconWidth={"1.250vw"}
          tajLogoTop={"0.85vw"}
          showLogo={true}
          overflowData={"scroll"}
          webCloseIcon={ICONS?.GATEWAY_CROSS_ICON_GREEN}
          isDesktopInnerContentCenterAligned={false}
          ModalCloseButtonStyles={{
            right: "2.60vw",
            top: "2.76vw",
          }}
          CloseIcon={ICONS.CLOSE_GOLD_ICON}
        />
      )
    case DIALOG_VARIANTS.CORE.SIGN_IN_NEU_PASS:
      return (
        <BasicModal
          width={"100%"}
          height={"100%"}
          bgcolor={theme?.palette?.ihclPalette?.hexOne}
          ModalCloseButtonDisplay={"none"}
          handleClose={() => {
            handleCloseIcon(props?.userStore)
          }}
          open={modalStore?.visibility}
          Component={<LoginFormWithMultipleTabs data={props} />}
          ModalCloseIconHeight={"1.250vw"}
          ModalCloseIconWidth={"1.250vw"}
          iconPosition={"relative !important"}
          mobileTop={"3vw !important"}
          tajLogoTop={"2vw"}
          showLogo={true}
          iconRight={"1vw"}
          ModalCloseButtonStyles={{
            right: "2.604vw",
            top: "2.760vw",
            fontSize: DesktopPxToVw(24),
            "@media (max-width: 640px)": {
              fontSize: "9vw !important",
              right: "1vw !important",
              top: "1vw !important",
            },
          }}
          CloseIcon={ICONS.CLOSE_GOLD_ICON}
        />
      )
    case DIALOG_VARIANTS.CORE.NEW_SIGN_IN_NEU_PASS:
      return (
        <BasicModal
          width={"100%"}
          height={"100%"}
          bgcolor={theme?.palette?.ihclPalette?.hexOne}
          ModalCloseButtonDisplay={"none"}
          handleClose={() => {
            handleCloseIcon(props?.userStore)
          }}
          open={modalStore?.visibility}
          Component={<NewSsoComponent data={props} handleClose={handleClose} />}
          ModalCloseIconHeight={"1.250vw"}
          ModalCloseIconWidth={"1.250vw"}
          iconPosition={"relative !important"}
          mobileTop={"3vw !important"}
          tajLogoTop={"2vw"}
          showLogo={true}
          iconRight={"1vw"}
          ModalCloseButtonStyles={{
            right: "2.604vw",
            top: "2.760vw",
            fontSize: DesktopPxToVw(24),
            "@media (max-width: 640px)": {
              fontSize: "9vw !important",
              right: "1vw !important",
              top: "1vw !important",
            },
          }}
          CloseIcon={ICONS.CLOSE_GOLD_ICON}
        />
      )
    case DIALOG_VARIANTS.CORE.OTP_NEU_PASS:
      return (
        <BasicModal
          width={"100%"}
          height={"100%"}
          ModalCloseIconHeight={"2vw"}
          ModalCloseIconWidth={"2vw"}
          handleClose={() => {
            handleCloseIcon(props?.userStore)
          }}
          open={modalStore?.visibility}
          mobileJustifyContent={"center"}
          mobileTop={"10.625vw"}
          mobileMargin={"0vw 0vw 12.125vw 0vw"}
          Component={<RenderOtpComponent data={props} />}
          CloseIcon={ICONS?.CLOSE_GOLD_ICON}
          ModalCloseButtonStyles={{
            display: "none",
          }}
        />
      )
    case DIALOG_VARIANTS.CORE.SIGN_UP_NEU_PASS:
      return (
        <BasicModal
          width={"100%"}
          height={"100%"}
          bgcolor={theme?.palette?.ihclPalette?.hexOne}
          handleClose={() => {
            handleCloseIcon(props?.userStore)
          }}
          open={modalStore?.visibility}
          Component={<RegisterForm data={props} />}
          ModalCloseButtonDisplay={"none"}
          ModalCloseIconHeight={"1.250vw"}
          ModalCloseIconWidth={"1.250vw"}
          iconPosition={"relative !important"}
          mobileTop={"3vw !important"}
          tajLogoTop={"2vw"}
          showLogo={true}
          iconRight={"1vw"}
          CloseIcon={ICONS?.CLOSE_GOLD_ICON}
          ModalCloseButtonStyles={{
            right: "2.604vw",
            top: "2.760vw",
          }}
        />
      )
    case DIALOG_VARIANTS.CORE.SIGN_UP_SUCCESS_NEU_PASS:
      return (
        <BasicModal
          width={"100%"}
          height={"100%"}
          bgcolor={theme?.palette?.background?.default}
          ModalCloseButtonDisplay={"none"}
          handleClose={() => {
            handleCloseIcon(props?.userStore)
          }}
          open={modalStore?.visibility}
          Component={<RegisterForm data={props} isThankYouScreen={true} />}
          ModalCloseIconHeight={"1.250vw"}
          ModalCloseIconWidth={"1.250vw"}
          ModalCloseButtonStyles={{
            marginBottom: "1.04vw",
            right: "2.604vw",
            top: "2.760vw",
          }}
          iconPosition={"relative !important"}
          mobileTop={"3vw !important"}
          tajLogoTop={"2vw"}
          showLogo={true}
          iconRight={"1vw"}
          CloseIcon={ICONS?.CLOSE_GOLD_ICON}
        />
      )
    case DIALOG_VARIANTS.CORE.EMAIL_PHONE_NUMBER_SIGN_UP:
      return (
        <BasicModal
          width={"100%"}
          height={"100%"}
          bgcolor={theme?.palette?.ihclPalette?.hexOne}
          ModalCloseButtonDisplay={"none"}
          ModalCloseIconHeight={"1.250vw"}
          ModalCloseIconWidth={"1.250vw"}
          handleClose={() => {
            handleCloseIcon(props?.userStore)
          }}
          isDesktopInnerContentCenterAligned={false}
          open={modalStore?.visibility}
          Component={<RegisterForm data={props} />}
          iconPosition={"relative !important"}
          mobileTop={"3vw !important"}
          tajLogoTop={"2vw"}
          showLogo={true}
          iconRight={"1vw"}
          ModalCloseButtonStyles={{
            right: "2.604vw",
            top: "2.760vw",
          }}
        />
      )
    case DIALOG_VARIANTS.CORE.NEU_PASS_MEMBERSHIP_PASSWORD:
      return (
        <BasicModal
          width={"100%"}
          height={"100%"}
          bgcolor={theme?.palette?.ihclPalette?.hexOne}
          handleClose={() => {
            handleCloseIcon(props?.userStore)
          }}
          isDesktopInnerContentCenterAligned={false}
          open={modalStore?.visibility}
          Component={<RegisterForm data={props} isPasswordScreen={true} />}
          ModalCloseButtonDisplay={"none"}
          ModalCloseIconHeight={"1.250vw"}
          ModalCloseIconWidth={"1.250vw"}
          iconPosition={"absolute !important"}
          mobileTop={"10vw !important"}
          tajLogoTop={"2vw"}
          showLogo={true}
          iconRight={"9vw"}
          mobileMargin={"0vw 1vw 13.281vw 0vw"}
          ModalCloseButtonStyles={{
            right: "1.5vw",
            top: "2.8vw",
            fontSize: DesktopPxToVw(24),
            "@media (max-width: 640px)": {
              fontSize: "9vw !important",
              right: "2.604vw",
              top: "2.760vw",
            },
          }}
        />
      )
    case DIALOG_VARIANTS.CORE.VENUE_DETAILS_TOGGLE:
      return (
        <BasicModal
          width={"100%"}
          height={"100%"}
          handleClose={handleClose}
          open={modalStore?.visibility}
          Component={<VenueDetails data={props} />}
          bgcolor={theme?.palette?.background?.paper}
          ModalCloseButtonStyles={{ marginBottom: "1.04vw" }}
        />
      )
    case DIALOG_VARIANTS.CORE.ENQURIES_FORM_MODAL:
      return (
        <BasicModal
          width={"100%"}
          height={"100%"}
          handleClose={handleClose}
          open={modalStore?.visibility}
          Component={<Enquire data={props} />}
          bgcolor={
            props?.isMobile
              ? props?.items?.[0]?.largeVariant === "common-utils.forms.subscription"
                ? theme?.palette?.background?.default
                : theme?.palette?.background?.paper
              : ""
          }
          CloseIcon={props?.isMobile ? ICONS?.CLOSE_GOLD_ICON : ICONS?.CLOSE_WHITE_ICON}
          webCloseIcon={ICONS?.CLOSE_WHITE_ICON}
          ModalCloseButtonColor={theme?.palette?.background?.paper}
          ModalCloseButtonStyles={{
            top: "1vw",
            right: props?.items?.[0]?.largeVariant === "common-utils.forms.subscription" ? "18.906vw" : "12.5vw",
            marginBottom: "1.04vw",
          }}
          iconPosition={
            props?.isMobile && props?.items?.[0]?.largeVariant !== "common-utils.forms.subscription"
              ? "initial"
              : "absolute !important"
          }
          iconRight="9.375vw !important"
          mobileTop={"10.156vw !important"}
          mobileMargin={"5.469vw 0vw 0vw"}
        />
      )
    case DIALOG_VARIANTS.CORE.EPICURE_DIALOG_MODAL:
      return (
        <BasicModal
          width={"100%"}
          height={"100%"}
          handleClose={handleClose}
          open={modalStore?.visibility}
          Component={<RenderEpicureComparsionModal {...props} />}
          bgcolor={props?.isMobile ? theme?.palette?.background?.default : ""}
          CloseIcon={ICONS?.CLOSE_BLACK_ICON}
          webCloseIcon={ICONS?.CLOSE_WHITE_ICON}
          ModalCloseButtonColor={theme?.palette?.ihclPalette?.hexOne}
          ModalCloseButtonStyles={{
            top: "1vw",
            right: "16.667vw",
          }}
          mSiteCloseStyles={{
            padding: `${MobilePxToVw(25)} ${MobilePxToVw(20)} 0vw`,
          }}
          msiteCloseIconStyles={{
            width: MobilePxToVw(28),
            height: MobilePxToVw(28),
          }}
        />
      )

    case DIALOG_VARIANTS.CORE.BOOKING_SUCCESS_AND_FAILURE_MODAL:
      return (
        <BasicModal
          width={"100%"}
          height={"100%"}
          handleClose={() => {
            handleClose(props), props?.navigate(ROUTES?.WITHOUTSEO_FOR_ROUTING?.MY_ACCOUNT?.OVERVIEW)
          }}
          open={modalStore?.visibility}
          Component={<Enquire data={props} />}
          bgcolor={props?.isMobile ? theme?.palette?.ihclPalette?.hexOne : theme?.palette?.ihclPalette?.rgbaOne}
          ModalCloseButtonStyles={{
            top: "0.2vw",
            right: "25.5vw",
            marginBottom: "1.04vw",
          }}
          iconPosition={"absolute !important"}
          iconRight="9.375vw !important"
          mobileTop={"10.156vw !important"}
          CloseIcon={ICONS?.CLOSE_GOLD_ICON}
          webCloseIcon={ICONS?.CLOSE_WHITE_ICON}
          ModalCloseButtonColor={theme?.palette?.ihclPalette?.hexOne}
          tajLogoTop={0}
          showLogo={true}
        />
      )
    case DIALOG_VARIANTS.CORE.GAZEBO_EXPERIENCE_MODAL:
      return (
        <BasicModal
          width={"100%"}
          height={"100%"}
          bgcolor={theme?.palette?.ihclPalette?.hexOne}
          handleClose={handleClose}
          open={modalStore?.visibility}
          Component={<GazeboExperience data={props} />}
          ModalCloseButtonStyles={{ marginBottom: "1.04vw", right: "12.5vw" }}
        />
      )
    case DIALOG_VARIANTS.CORE.ROOM_DETAILS:
      return (
        <BasicModal
          width={"100%"}
          height={"100%"}
          bgcolor={props?.isMobile ? theme?.palette?.background?.default : theme?.palette?.ihclPalette?.rgbaOne}
          CloseIcon={ICONS?.CLOSE_GOLD_ICON}
          webCloseIcon={ICONS?.CLOSE_WHITE_ICON}
          ModalCloseButtonColor={theme?.palette?.ihclPalette?.hexOne}
          handleClose={handleClose}
          open={modalStore?.visibility}
          Component={<RoomDetailsModal props={props} />}
          ModalCloseButtonStyles={{
            marginBottom: "1.04vw",
            right: "19vw",
          }}
        />
      )
    case DIALOG_VARIANTS.CORE.RATE_DETAIL_MODAL:
      return (
        <BasicModal
          width={"100%"}
          height={"100%"}
          bgcolor={props?.isMobile ? theme?.palette?.background?.default : theme?.palette?.ihclPalette?.rgbaOne}
          handleClose={handleClose}
          open={modalStore?.visibility}
          Component={<VenueDetails props={props} />}
          ModalCloseButtonStyles={{ marginBottom: "1.04vw", right: "19vw" }}
          tajLogoTop={0}
          showLogo={true}
          iconPosition={"relative"}
          mobileTop={`-${MobilePxToVw(5)}`}
          iconRight={`-${MobilePxToVw(5)}`}
          CloseIcon={ICONS?.CLOSE_GOLD_ICON}
          webCloseIcon={ICONS?.CLOSE_WHITE_ICON}
          ModalCloseButtonColor={theme?.palette?.ihclPalette?.hexOne}
        />
      )
    case DIALOG_VARIANTS.CORE.SPA_SUCCESS_SCREEN:
      return (
        <BasicModal
          width={"100%"}
          height={"100%"}
          handleClose={handleClose}
          open={modalStore?.visibility}
          Component={<RegisterForm data={props} />}
          mobileTop={"20vw"}
          webCloseIcon={ICONS?.CLOSE_WHITE_ICON}
          CloseIcon={ICONS?.CLOSE_GOLD_ICON}
          ModalCloseButtonColor={theme?.palette?.ihclPalette?.hexOne}
          showLogo={props?.isMobile ? true : false}
          tajLogoTop={"0vw"}
          ModalCloseButtonStyles={{ marginBottom: "1.72vw", right: "25.5vw" }}
        />
      )
    case DIALOG_VARIANTS.GIFT_CARD.PARTICIPATING_HOTEL_MODAL:
      return (
        <BasicModal
          width={"100%"}
          height={"100%"}
          ModalCloseButtonColor={theme?.palette?.ihclPalette?.hexOne}
          bgcolor={props?.isMobile ? theme?.palette?.background?.paper : theme?.palette?.ihclPalette?.rgbaOne}
          CloseIcon={ICONS?.CLOSE_GOLD_ICON}
          webCloseIcon={ICONS?.CLOSE_WHITE_ICON}
          handleClose={handleClose}
          open={modalStore?.visibility}
          Component={<BulkEnquiryComponent {...props} />}
          ModalCloseButtonStyles={{ marginBottom: "-1vw", right: "11.5vw" }}
          mobileTop={"10.625vw !important"}
          iconPosition={"absolute !important"}
          iconRight="9.375vw !important"
        />
      )
    case DIALOG_VARIANTS.OFFERS.BOOK_A_STAY:
      return (
        <BasicModal
          width={"100%"}
          height={"100%"}
          bgcolor={props?.isMobile ? theme?.palette?.background?.paper : ""}
          webCloseIcon={ICONS?.CLOSE_WHITE_ICON}
          ModalCloseButtonColor={theme?.palette?.ihclPalette?.hexOne}
          handleClose={handleClose}
          CloseIcon={ICONS?.CLOSE_GOLD_ICON}
          open={modalStore?.visibility}
          Component={<OfferFormComponent {...props} />}
          ModalCloseButtonStyles={{ marginBottom: "-1vw", right: "13vw" }}
        />
      )
    case DIALOG_VARIANTS.CORE.SUBSCRIPTION_SUCCESS:
      return (
        <BasicModal
          width={"100%"}
          height={"100%"}
          handleClose={handleClose}
          open={modalStore?.visibility}
          bgcolor={theme?.palette?.background?.paper}
          Component={<SubscriptionSuccess {...props?.items?.[0]} />}
          ModalCloseButtonStyles={{ right: "25.5vw", marginBottom: "1.72vw" }}
          mobileTop={"10.625vw !important"}
          iconPosition={"absolute !important"}
          iconRight="9.375vw !important"
        />
      )
    case DIALOG_VARIANTS.BLOG.COMMENT_SUBMIT:
      return (
        <BasicModal
          width={"100%"}
          height={"100%"}
          handleClose={handleClose}
          open={modalStore?.visibility}
          Component={<BlogCommentsModal {...props?.items?.[0]} />}
          bgcolor={props?.isMobile ? theme?.palette?.background?.default : theme?.palette?.ihclPalette?.rgbaOne}
          ModalCloseButtonColor={isMobile ? theme?.palette?.ihclPalette?.hexThree : theme?.palette?.ihclPalette?.hexOne}
          ModalCloseButtonStyles={{ right: "25.5vw", marginBottom: "1.72vw" }}
          CloseIcon={ICONS?.CLOSE_GOLD_ICON}
          webCloseIcon={ICONS?.CLOSE_WHITE_ICON}
          mobileTop={"10.625vw !important"}
          iconPosition={"absolute !important"}
          iconRight="9.375vw !important"
        />
      )
    case DIALOG_VARIANTS.CORE.BOOKING_MASK_IN_MSITE:
      return (
        <BasicModal
          width={"100%"}
          height={"100%"}
          showLogo={true}
          tajLogoTop={"-0.1vh"}
          handleClose={handleClose}
          open={modalStore?.visibility}
          bgcolor={theme.palette.background.default}
          Component={<BookingMaskForMsite setOpenGuestDetailsModal={handleClose} isDestinationBookingMask={false} />}
          CloseIcon={ICONS.CLOSE_GOLD_ICON}
          iconPosition={"relative"}
          mobileTop={`-${MobilePxToVw(5)}`}
          iconRight={`-${MobilePxToVw(5)}`}
        />
      )

    case DIALOG_VARIANTS?.CORE?.COOKIES_SYSTEM_MODAL:
      return (
        <BasicModal
          width={"100%"}
          height={"100%"}
          handleClose={handleClose}
          open={modalStore?.visibility}
          tajLogoTop={"2vw"}
          showLogo={true}
          bgcolor={theme?.palette?.background?.default}
          Component={<CookiesManagementSystem {...props?.items?.[0]} handleClose={handleClose} />}
          ModalCloseButtonStyles={{
            display: "none",
          }}
        />
      )
    case DIALOG_VARIANTS.CORE.SUBSCRIPTION_ENQUIRE_SUCCESSFUL:
      return (
        <BasicModal
          width={"100%"}
          height={"100%"}
          handleClose={handleClose}
          open={modalStore?.visibility}
          bgcolor={
            props?.isMobile
              ? props?.items?.[0]?.variant === "events.card.she-remains-the-taj-modal"
                ? theme?.palette?.background?.paper
                : theme?.palette?.background?.default
              : ""
          }
          Component={<SubscriptionEnquireSuccess {...props?.items?.[0]} />}
          ModalCloseButtonStyles={{
            right: "19.4vw",
            marginBottom: "1.72vw",
          }}
          ModalCloseButtonColor={isMobile ? theme?.palette?.ihclPalette?.hexThree : theme?.palette?.ihclPalette?.hexOne}
          CloseIcon={ICONS?.CLOSE_GOLD_ICON}
          webCloseIcon={ICONS?.CLOSE_WHITE_ICON}
          mobileTop={"10.625vw !important"}
          iconPosition={"absolute !important"}
          iconRight="9.375vw !important"
        />
      )
    case DIALOG_VARIANTS.BOOKING.CART_CLEARANCE:
      return (
        <RoomDetailModalSwitchCaseLogicComponent
          cases={props?.items?.[0]?.cases}
          handleClose={handleClose}
          openModal={modalStore?.visibility}
        />
      )
    case DIALOG_VARIANTS.INNERGISE_DIALOG_POP_UP_MODEL:
      return (
        <BasicModal
          width={"100%"}
          height={"100%"}
          ModalCloseButtonColor={theme?.palette?.ihclPalette?.hexOne}
          bgcolor={props?.isMobile ? theme?.palette?.background?.default : theme?.palette?.ihclPalette?.rgbaOne}
          CloseIcon={ICONS?.CLOSE_GOLD_ICON}
          webCloseIcon={ICONS?.CLOSE_WHITE_ICON}
          handleClose={handleClose}
          open={modalStore?.visibility}
          Component={<MediaCardsComponentInsideTheModel {...props} />}
          ModalCloseButtonStyles={{
            marginBottom: DesktopPxToVw(30),
            right: DesktopPxToVw(238),
          }}
          mobileTop={"10.625vw !important"}
          iconRight="9.375vw !important"
          mSiteCloseStyles={{
            padding: `${MobilePxToVw(68)} ${MobilePxToVw(59)} ${MobilePxToVw(35)}`,
          }}
        />
      )

    /**
    once CMS send the variant Will integrate with switch case
    <BasicModal   
      width={"100%"}
      height={"100%"}
      open={modalStore?.visibility}
      handleClose={handleClose}
      iconPosition={"absolute"}
      mobileTop={"10.469vw !important"}
      iconRight={"9.375vw !important"}
      mobileColor={theme?.palette?.ihclPalette?.hexOne}
      ModalCloseButtonStyles={{ marginBottom: "2.083vw", right: "12.5vw" }}
      Component={<GoogleMapCard />}
     />
      */

    case DIALOG_VARIANTS.CORE.DESTINATION_BOOKING_MASK_FOR_MSITE:
      return (
        <BasicModal
          width={"100%"}
          height={"100%"}
          showLogo={true}
          tajLogoTop={"-0.1vh"}
          handleClose={handleClose}
          open={modalStore?.visibility}
          bgcolor={theme.palette.background.default}
          Component={<BookingMaskForMsite setOpenGuestDetailsModal={handleClose} isDestinationBookingMask={true} />}
          CloseIcon={ICONS.CLOSE_GOLD_ICON}
          iconPosition={"relative"}
          mobileTop={`-${MobilePxToVw(5)}`}
          iconRight={`-${MobilePxToVw(5)}`}
        />
      )
    default:
      return <DefaultModal {...props} />
  }
}

const ModalComponent = (props: ModalProps) => {
  const [visibility, setVisibility] = useState(false)
  const isMobile = useMobileCheck()
  useEffect(() => {
    setVisibility(modalStore?.visibility)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalStore?.visibility])

  useEffect(() => {
    if (modalStore?.visibility) {
      window.addEventListener("popstate", () => {
        modalStore?.closeModal()
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalStore?.visibility])

  const navigate = useAppNavigation()

  const IHCLContexts = useContext(IHCLContext)
  //global user store
  const userStore = IHCLContexts?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore

  useEffect(() => {
    let element: any = document.scrollingElement
    if (!element) return
    element.style.overflowY = visibility && "hidden"
    return () => {
      element.style.overflowY = "scroll"
    }
  }, [visibility])
  const isLarge = useIsLargeView()
  const modalData = {
    ...props,
    ...modalStore.schema,
    items: props.items || modalStore.schema.items,
    title: props.title || modalStore.schema.title,
    description: props.description || modalStore.schema.description,
    variant:
      modalStore.variant ||
      (isLarge && modalStore.schema.largeVariant ? modalStore.schema.largeVariant : modalStore.schema.variant),
    activePath: modalStore.path,
    dialogSize: modalStore.schema?.dialogSize,
  }
  const modalContextAdditionalData = useMemo<ModalContextProps>(
    () => prepareModalContext(modalData?.connectedStores),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [modalData?.connectedStores],
  )

  const modalContext = useMemo(
    () => ({
      ...modalContextAdditionalData,
      modalData,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [modalContextAdditionalData],
  )

  return (
    <>
      <ModalContext.Provider value={modalContext}>
        {renderModalChildren({
          ...modalData,
          handleClose,
          visibility,
          userStore,
          isMobile,
          navigate,
        })}
      </ModalContext.Provider>
    </>
  )
}

export const Modal = observer(ModalComponent)

export default Modal
