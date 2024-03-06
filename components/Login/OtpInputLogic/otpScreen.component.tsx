import dynamic from "next/dynamic"
import React, { useCallback, useContext, useEffect, useState } from "react"
import { PathType } from "../../../types"
import { observer } from "mobx-react-lite"
import { GAStore, UserStore } from "../../../store"
import { theme } from "../../../lib/theme"
import { Box, Typography } from "@mui/material"
import { ROUTES } from "../../../utils/routes"
import EmailMask from "../../../utils/email-mask"
import { triggerEvent } from "../../../utils/analytics"
import { OTPScreenInterface } from "../login-form.types"
import ModalStore from "../../../store/global/modal.store"
import DesktopPxToVw from "../../../utils/DesktopFontCalc"
import { useMobileCheck } from "../../../utils/isMobilView"
import { CONSTANTS, LOGIN_CONSTANTS } from "../../constants"
import { maskNumbers } from "../../../utils/phone-number-mask"
import { useAppNavigation } from "../../../utils/NavigationUtility"
import { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
import BookingFlowGlobalStore from "../../../features/booking/store/globalStore/booking.flow.store"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { ModalContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import AuthenticLoginStore from "../../../features/login/store/authentication.login.store"
import AuthenticRegistrationStore from "../../../features/registration/store/authentic.registration.store"
import GetDefaultValue, { CheckDefaultValue } from "../../../utils/validations/getDefaultValue"
import { ERROR_MESSAGES } from "../../forms/gift-card-form/constants"
import { getRecaptchaToken } from "../../../utils/recaptcha"
import useStorage from "../../../utils/useStorage"
import crypto from "crypto"
import { generateCodeVerifier } from "../../../utils/sso/generate-code-verifier"
import { generateCodeChallenge } from "../../../utils/sso/generate-code-challenge"
import { getCookie } from "../../../utils/cookie"
import { useLoggedIn } from "../../../utils/hooks/useLoggedIn"
import { ageFromDOB } from "../../../utils/getDate"
import { AFFILIATION, PAGELANG, POWERED_BY_WIDGET } from "../../../features/booking/constants"
import {
  ErrorMessages,
  MainBoxContainer,
  MainBoxWrapper,
  ResendOtpText,
  ResendOtpWrapper,
  StyledClearIcon,
  SubTitleWrapper,
} from "../Styles/OtpStyled"
import {
  CHAMBERS_ID,
  CHAMBERS_TIER,
  EPICURE_ID,
  EPICURE_TIER,
  TAJ_HOTELS,
  USER_PHONE_NUMBER,
  USER_TIRE,
} from "../../../utils/analytics/constants"
import { CrossSiteNavigation } from "../../../utils/sso/cross-site-navigation"

const LoadingSpinner = dynamic(() => import("../../../utils/SpinnerComponent"))
const MobileOtpTimer = dynamic(() => import("./OtpInput/mobile-otp-timer.component"))
const OtpComponentLogic = dynamic(() =>
  import("./OtpInput/OtpComponentLogic").then((module) => module.OtpComponentLogic),
)
const RenderActionItem = dynamic(() => import("../../hoc/actions/action-items-ui"))

const OtpScreen = (props: OTPScreenInterface) => {
  const items = props?.data || props
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const modalStore = ModalStore.getInstance()
  const IHCLContexts = useContext(IHCLContext)
  const modalContext = useContext(ModalContext)

  const ComponentType = props?.data?.Type
  const primaryAction = items?.primaryAction
  const secondaryAction = items?.secondaryAction
  const mobileTitle = items?.parameterMap?.[0]?.value
  const mobileSubTitle = items?.parameterMap?.[1]?.value
  const isBookingJourneyPage = global?.window?.location?.pathname === ROUTES.BOOKING?.CART
  const UserType = global?.window?.localStorage?.getItem("userType")
  //* Global store values
  const userStore = IHCLContexts?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const authenticLoginStore = modalContext?.getPageStore(PAGE_STORES.loginStore) as AuthenticLoginStore
  const userRegistrationStore = modalContext?.getPageStore(PAGE_STORES.registrationStore) as AuthenticRegistrationStore
  const bookingFlowGlobalStore = IHCLContexts?.getGlobalStore(GLOBAL_STORES?.bookingFlowStore) as BookingFlowGlobalStore
  const Context = useContext(IHCLContext)
  const pageStoreData = Context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const LoginMethod = global?.window?.localStorage?.getItem("loginJourneyType")

  const { cartDetails } = bookingFlowGlobalStore
  const isLoggedIn = useLoggedIn()
  const { getItem } = useStorage()
  //* local state values
  const [otp, setOtp] = useState<string>("")
  const [otpLimit, setOtpLimit] = useState(4)
  const [resendOtp, setResendOtp] = useState(false)
  const [error, setError] = useState<boolean>(false)
  const [activeCounter, setActiveCounter] = useState<boolean>(true)
  const [loader, setLoader] = useState<boolean>(false)
  const [otpExpired, setOtpExpired] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [invalidOtp, setIsInvalidOtp] = useState<boolean>(false)
  const [otpExpiredTimer, setOtpExpiredTimer] = useState<boolean>(false)
  const [reSetCounter, setReSetCounter] = useState<boolean>(false)
  const [otpLink, setOtpLink] = useState<boolean>(false)
  const [hideActionBtn, setHideActionBtn] = useState<boolean>(false)

  // Analytics for checking missing data while login
  const [userType, setUserType] = useState(UserType)

  const UserEmail = global?.localStorage?.getItem("userEmail")
  const PhoneNumber = global?.localStorage?.getItem("userPhoneNumber")
  const handleLoginFail = (response: any) => {
    triggerEvent({
      action: "Login_Fail",
      params: {
        pageReferrer: global?.window?.localStorage?.getItem("previousPageURL") ?? "",
        pageURL: global?.window?.location?.href,
        device: isMobile ? "Mobile" : "Desktop",
        clientId: getCookie("_ga")?.slice(6),
        widget_powered_by: POWERED_BY_WIDGET,
        login_method: getItem("loginJourneyType") || LoginMethod,
        encryptedEmailID:
          userStore?.userEmailID || UserEmail
            ? crypto
                .createHash("sha256")
                .update(userStore?.userEmailID || UserEmail || "")
                .digest("hex")
            : "",
        encryptedMobileNo:
          userStore?.userMobileNumber || PhoneNumber
            ? crypto
                .createHash("sha256")
                .update(userStore?.userMobileNumber || PhoneNumber || "")
                .digest("hex")
            : "",
        buttonLinkName: primaryAction?.title,
        link_text: primaryAction?.title,
        link_url: primaryAction?.url,
        outbound: primaryAction?.urlType == "internal" ? false : true,
        membershipType: isLoggedIn ? `${CHAMBERS_TIER || EPICURE_TIER || "Neupass"} - ${USER_TIRE}` : "",
        membershipNumber: CHAMBERS_ID || EPICURE_ID || USER_PHONE_NUMBER || "",
        memberEmailId:
          userStore?.userEmailID || UserEmail
            ? crypto
                .createHash("sha256")
                .update(userStore?.userEmailID || UserEmail || "")
                .digest("hex")
            : "",
        memberMobileNo:
          userStore?.userMobileNumber || PhoneNumber
            ? crypto
                .createHash("sha256")
                .update(userStore?.userMobileNumber || PhoneNumber || "")
                .digest("hex")
            : "",
        memberName:
          `${response?.data?.nameDetails?.firstName || ""}` + `${response?.data?.nameDetails?.lastName || ""}`,
        memberGender: response?.data?.gender ? response?.data?.gender : "",
        memberDOB: response?.data?.dob ? response?.data?.dob : "",
        memberAge: response?.data?.dob ? ageFromDOB(response?.data?.dob) : "",
        memberCountry: response?.data?.addresses?.[0]?.country ? response?.data?.addresses?.[0]?.country : "",
        memberState: response?.data?.addresses?.[0]?.state ? response?.data?.addresses?.[0]?.state : "",
        memberCity: response?.data?.addresses?.[0]?.cityTown ? response?.data?.addresses?.[0]?.cityTown : "",
        memberPincode: response?.data?.addresses?.[0]?.pinCode ? response?.data?.addresses?.[0]?.pinCode : "",
        ponitsToBeRedeemed: response?.data?.loyaltyInfo?.[0]?.loyaltyPoints
          ? response?.data?.loyaltyInfo?.[0]?.loyaltyPoints
          : "",
        existingCustomer: response?.data?.existingCustomer ? "Yes" : "No",
        isMember: response?.data?.loyalCustomer ? "Yes" : "No",
        userStatus: "Not LoggedIn",
        widget_type: items?._type,
        widget_title: items?.title || items?.subtitle,
        widget_description: items?.description,
        widget_position: "",
        journey_type: UserType == "existing" ? "LogIn" : "SignUp",
        redemptionType: "",
        redemptionName: "",
        redemptionDescription: "",
        pointsType: "",
        brandName: AFFILIATION,
        userId: response?.data?.customerHash ? response?.data?.customerHash : "",
        userType: UserType || userType,
        eventType: "",
        eventName: "",
        eventPlace: "",
        eventTicketsQty: "",
        eventDate: "",
        specialCode: "",
        pageTitle: pageStoreData?.pageData?.pageTitle || "",
        pageHierarchy: JSON.parse(
          `["${TAJ_HOTELS}",` + `"${PAGELANG}",` + `"${AFFILIATION}",` + `"${pageStoreData?.pageData?.pageTitle}"]`,
        ),
        pageLanguage: PAGELANG,
        pageReferrerTitle: global?.window?.localStorage?.getItem("previousPageTitle") ?? "",
        location: "",
        pageSection: items?.title || items?.subtitle,
      },
    })
  }
  const handleOtpSubmitted = (response: any) => {
    triggerEvent({
      action: "user_verification",
      params: {
        pageReferrer: global?.window?.localStorage?.getItem("previousPageURL") ?? "",
        pageURL: global?.window?.location?.href,
        device: isMobile ? "Mobile" : "Desktop",
        clientId: getCookie("_ga")?.slice(6),
        widget_powered_by: POWERED_BY_WIDGET,
        login_method: getItem("loginJourneyType") || LoginMethod,
        encryptedEmailID:
          response?.data?.primaryEmailId || UserEmail
            ? crypto
                .createHash("sha256")
                .update(response?.data?.primaryEmailId || UserEmail)
                .digest("hex")
            : "",
        encryptedMobileNo: response?.data?.primaryMobile?.phoneNumber
          ? crypto.createHash("sha256").update(response?.data?.primaryMobile?.phoneNumber).digest("hex")
          : "",
        buttonLinkName: primaryAction?.title,
        link_text: primaryAction?.title,
        link_url: primaryAction?.url,
        outbound: primaryAction?.urlType == "internal" ? false : true,
        membershipType: `${
          getItem("chambersMemberTier") || CHAMBERS_TIER || getItem("epicureMemberTier") || EPICURE_TIER || "Neupass"
        } - ${getItem("userTier") || USER_TIRE}`,
        membershipNumber:
          getItem("chambersMemberID") ||
          CHAMBERS_ID ||
          getItem("epicureMemberID") ||
          EPICURE_ID ||
          getItem("userPhoneNumber") ||
          USER_PHONE_NUMBER ||
          "",
        memberEmailId:
          response?.data?.primaryEmailId || UserEmail
            ? crypto
                .createHash("sha256")
                .update(response?.data?.primaryEmailId || UserEmail)
                .digest("hex")
            : "",
        memberMobileNo: response?.data?.primaryMobile?.phoneNumber
          ? crypto.createHash("sha256").update(response?.data?.primaryMobile?.phoneNumber).digest("hex")
          : "",
        memberName:
          `${response?.data?.nameDetails?.firstName || ""}` + `${response?.data?.nameDetails?.lastName || ""}`,
        memberGender: response?.data?.gender ? response?.data?.gender : "",
        memberDOB: response?.data?.dob ? response?.data?.dob : "",
        memberAge: response?.data?.dob ? ageFromDOB(response?.data?.dob) : "",
        memberCountry: response?.data?.addresses?.[0]?.country ? response?.data?.addresses?.[0]?.country : "",
        memberState: response?.data?.addresses?.[0]?.state ? response?.data?.addresses?.[0]?.state : "",
        memberCity: response?.data?.addresses?.[0]?.cityTown ? response?.data?.addresses?.[0]?.cityTown : "",
        memberPincode: response?.data?.addresses?.[0]?.pinCode ? response?.data?.addresses?.[0]?.pinCode : "",
        ponitsToBeRedeemed: response?.data?.loyaltyInfo?.[0]?.loyaltyPoints
          ? response?.data?.loyaltyInfo?.[0]?.loyaltyPoints
          : "",
        existingCustomer: response?.data?.existingCustomer ? "Yes" : "No",
        isMember: response?.data?.loyalCustomer ? "Yes" : "No",
        userStatus: "Not LoggedIn",
        widget_type: items?._type,
        widget_title: items?.title || items?.subtitle,
        widget_description: items?.description,
        widget_position: "",
        journey_type: UserType == "existing" ? "LogIn" : "SignIn",
        redemptionType: "",
        redemptionName: "",
        redemptionDescription: "",
        pointsType: "",
        brandName: AFFILIATION,
        userId: response?.data?.customerHash ? response?.data?.customerHash : "",
        userType: userType || UserType,
        eventType: "",
        eventName: "",
        eventPlace: "",
        eventTicketsQty: "",
        eventDate: "",
        specialCode: "",
        pageTitle: pageStoreData?.pageData?.pageTitle || "",
        pageHierarchy: JSON.parse(
          `["${TAJ_HOTELS}",` + `"${PAGELANG}",` + `"${AFFILIATION}",` + `"${pageStoreData?.pageData?.pageTitle}"]`,
        ),
        pageLanguage: PAGELANG,
        pageReferrerTitle: global?.window?.localStorage?.getItem("previousPageTitle") ?? "",
        location: "",
        pageSection: items?.title || items?.subtitle,
      },
    })
  }
  const VerifyHandler = useCallback(async () => {
    setLoader(true)
    let response
    let codeVerifier: any
    let codeChallenge: any
    const refId: string = userStore?.refId
    const countryCode: string = userStore?.userCountryCode
    const mobileNumber: string = userStore?.userMobileNumber
    codeVerifier = generateCodeVerifier()
    codeChallenge = generateCodeChallenge(codeVerifier)
    if (userStore?.userMobileNumber !== "" && !userRegistrationStore) {
      response = await authenticLoginStore?.verifyOTP(
        JSON.stringify({
          phone: userStore.userMobileNumber,
          otp: otp,
          refId: refId,
          countryCode: countryCode,
          codeVerifier: codeVerifier,
          codeChallenge: codeChallenge,
        }),
      )
    } else if (userStore?.userMobileNumber !== "" && userRegistrationStore) {
      response = await userRegistrationStore?.verifyNewloginUserOTP(
        JSON.stringify({
          phone: userStore.userMobileNumber,
          otp: otp,
          refId: refId,
          countryCode: countryCode,
          codeVerifier: codeVerifier,
          codeChallenge: codeChallenge,
        }),
      )
    } else if (
      authenticLoginStore &&
      userStore?.userEmailID !== "" &&
      !userRegistrationStore &&
      ComponentType?.toLowerCase() !== "forgotpassword"
    ) {
      response = await authenticLoginStore?.verifyEmailOTP(
        JSON.stringify({
          email: userStore.userEmailID,
          otp: otp,
          refId: refId,
          codeVerifier: codeVerifier,
          codeChallenge: codeChallenge,
        }),
      )
    } else if (
      authenticLoginStore &&
      userStore?.userEmailID !== "" &&
      !userRegistrationStore &&
      ComponentType?.toLowerCase() === "forgotpassword"
    ) {
      response = await authenticLoginStore?.verifyTICEmailOtp(
        JSON.stringify({
          email: userStore.userEmailID,
          otp: otp,
          refId: refId,
          codeVerifier: codeVerifier,
          codeChallenge: codeChallenge,
        }),
      )
    } else if (userStore?.userEnteredRegistrationMobileNumber !== "") {
      response = await userRegistrationStore?.verifyNewloginUserOTP(
        JSON.stringify({
          phone: userStore?.userEnteredRegistrationMobileNumber,
          otp: otp,
          refId: refId,
          countryCode: countryCode,
          codeVerifier: codeVerifier,
          codeChallenge: codeChallenge,
        }),
      )
    } else if (userStore?.userEnteredMembershipID !== "") {
      response = await authenticLoginStore?.verifyMembershipIDOTP(
        JSON.stringify({
          memberId: userStore.userEnteredMembershipID,
          otp: otp,
          refId: refId,
          phone: mobileNumber,
          countryCode: countryCode,
          codeVerifier: codeVerifier,
          codeChallenge: codeChallenge,
        }),
      )
    }
    if (response?.headers) {
      global?.window?.localStorage?.setItem("accessToken", response?.headers["x-access-token"])
      global?.window?.localStorage?.setItem("refreshToken", response?.headers["x-refresh-token"])
    }
    if (response?.error === false || response?.data?.error === false) {
      await handleOtpSubmitted(response)
      userStore?.setUserRedId("")
      setLoader(false)
      if (
        ((response?.data?.status?.code === "200" && response?.data?.nameDetails?.firstName?.length > 0) ||
          (response?.status == "201" && response?.data?.nameDetails?.firstName?.length > 0) ||
          (response?.error === false &&
            !userRegistrationStore &&
            response?.data?.status?.code === "200" &&
            response?.data?.nameDetails?.firstName?.length > 0) ||
          (response?.data?.status?.code == "200" &&
            response?.data?.nameDetails?.firstName?.length > 0 &&
            (ComponentType?.toLowerCase() == "epicuremembership" ||
              ComponentType?.toLowerCase() == "chambersmembership"))) &&
        ComponentType?.toLowerCase() !== "forgotpassword"
      ) {
        global?.localStorage?.removeItem("userDialCode")
        if (response?.headers?.["x-access-token"]) {
          await userStore?.fetchCustomerMemberships()
          userStore?.createSessionApi()
        }
        userStore?.setUserDetailsStore(
          response?.data?.nameDetails?.salutation,
          GetDefaultValue(response?.data?.nameDetails?.firstName),
          GetDefaultValue(response?.data?.nameDetails?.lastName),
          GetDefaultValue(response?.data?.primaryMobile?.isdCode),
          GetDefaultValue(response?.data?.primaryMobile?.phoneNumber),
          CheckDefaultValue(response?.data?.primaryEmailId),
          response?.data?.customerHash,
          GetDefaultValue(response?.data?.dob),
          GetDefaultValue(response?.data?.gender),
          response?.data?.loyaltyInfo?.[0]?.loyaltyPoints,
          GetDefaultValue(response?.data?.tcpNumber),
          GetDefaultValue(response?.data?.addresses),
          response?.data?.loyaltyInfo?.[0]?.currentSlab || "copper",
        ),
          response?.data?.addresses?.map((item: any) => {
            if (item?.isPrimary === "true") {
              global?.window?.localStorage?.setItem("userPrimaryAddress", JSON?.stringify(item))
            }
          })
        global?.window?.localStorage?.setItem("customerHash", response?.data?.customerHash),
          GetDefaultValue(response?.data?.dob) &&
            global?.window?.localStorage?.setItem("userDOB", GetDefaultValue(response?.data?.dob)),
          global?.window?.localStorage?.setItem("neupassStartDateInfo", response?.data?.neuPassInfo?.startDate),
          GetDefaultValue(response?.data?.addresses?.[0]?.country)
        global?.window?.localStorage?.setItem(
          "userNationality",
          GetDefaultValue(response?.data?.addresses?.[0]?.country),
        ),
          global?.window?.localStorage?.setItem("userEmailVerified", response?.data?.emailVerified),
          GetDefaultValue(response?.data?.gender) &&
            global?.window?.localStorage?.setItem("userGender", GetDefaultValue(response?.data?.gender)),
          GetDefaultValue(response?.data?.nameDetails?.salutation) &&
            global?.window?.localStorage?.setItem(
              "userSalutation",
              GetDefaultValue(response?.data?.nameDetails?.salutation),
            ),
          GetDefaultValue(response?.data?.nameDetails?.firstName) &&
            global?.window?.localStorage?.setItem(
              "userFirstName",
              GetDefaultValue(response?.data?.nameDetails?.firstName),
            ),
          GetDefaultValue(response?.data?.nameDetails?.lastName) &&
            global?.window?.localStorage?.setItem(
              "userLastName",
              GetDefaultValue(response?.data?.nameDetails?.lastName),
            ),
          CheckDefaultValue(response?.data?.primaryEmailId) &&
            global?.window?.localStorage?.setItem("userEmail", CheckDefaultValue(response?.data?.primaryEmailId)),
          GetDefaultValue(response?.data?.primaryMobile?.isdCode) &&
            global?.window?.localStorage?.setItem(
              "userCountryCode",
              GetDefaultValue(response?.data?.primaryMobile?.isdCode),
            ),
          GetDefaultValue(response?.data?.primaryMobile?.phoneNumber) &&
            global?.window?.localStorage?.setItem(
              "userPhoneNumber",
              GetDefaultValue(response?.data?.primaryMobile?.phoneNumber),
            )
        global?.window?.localStorage?.setItem(
          "userTier",
          response?.data?.loyaltyInfo?.[0]?.currentSlab.replace(/\*$/, "") || "copper",
        )
        GetDefaultValue(response?.data?.tcpNumber) &&
          global?.window?.localStorage?.setItem("userTICNumber", GetDefaultValue(response?.data?.tcpNumber))
        global?.window?.localStorage?.setItem("neuCoins", response?.data?.loyaltyInfo?.[0]?.loyaltyPoints),
          setError(false)
        await triggerEvent({
          action: "Login_Success",
          params: {
            pageReferrer: global?.window?.localStorage?.getItem("previousPageURL") ?? "",
            device: isMobile ? "Mobile" : "Desktop",
            clientId: getCookie("_ga")?.slice(6),
            widget_powered_by: POWERED_BY_WIDGET,
            login_method: getItem("loginJourneyType") || LoginMethod,
            encryptedEmailID:
              response?.data?.primaryEmailId || UserEmail
                ? crypto
                    .createHash("sha256")
                    .update(response?.data?.primaryEmailId || UserEmail)
                    .digest("hex")
                : "",
            encryptedMobileNo: response?.data?.primaryMobile?.phoneNumber
              ? crypto.createHash("sha256").update(response?.data?.primaryMobile?.phoneNumber).digest("hex")
              : "",
            buttonLinkName: primaryAction?.title,
            link_text: primaryAction?.title,
            link_url: primaryAction?.url,
            outbound: primaryAction?.urlType == "internal" ? false : true,
            membershipType: `${
              getItem("chambersMemberTier") ||
              CHAMBERS_TIER ||
              getItem("epicureMemberTier") ||
              EPICURE_TIER ||
              "Neupass"
            } - ${getItem("userTier") || USER_TIRE}`,
            membershipNumber:
              getItem("epicureMemberID") ||
              EPICURE_ID ||
              getItem("chambersMemberID") ||
              CHAMBERS_ID ||
              getItem("userPhoneNumber") ||
              response?.data?.primaryMobile?.phoneNumber ||
              "",
            memberEmailId: response?.data?.primaryEmailId
              ? crypto.createHash("sha256").update(response?.data?.primaryEmailId).digest("hex")
              : "",
            memberMobileNo: response?.data?.primaryMobile?.phoneNumber
              ? crypto.createHash("sha256").update(response?.data?.primaryMobile?.phoneNumber).digest("hex")
              : "",
            memberName: `${response?.data?.nameDetails?.firstName}` + ` ${response?.data?.nameDetails?.lastName}`,
            memberGender: response?.data?.gender ? response?.data?.gender : "",
            memberDOB: response?.data?.dob ? response?.data?.dob : "",
            memberAge: response?.data?.dob ? ageFromDOB(response?.data?.dob) : "",
            memberCountry: response?.data?.addresses?.[0]?.country ? response?.data?.addresses?.[0]?.country : "",
            memberState: response?.data?.addresses?.[0]?.state ? response?.data?.addresses?.[0]?.state : "",
            memberCity: response?.data?.addresses?.[0]?.cityTown ? response?.data?.addresses?.[0]?.cityTown : "",
            memberPincode: response?.data?.addresses?.[0]?.pinCode ? response?.data?.addresses?.[0]?.pinCode : "",
            ponitsToBeRedeemed: response?.data?.loyaltyInfo?.[0]?.loyaltyPoints
              ? response?.data?.loyaltyInfo?.[0]?.loyaltyPoints
              : "",
            existingCustomer: response?.data?.existingCustomer ? "Yes" : "No",
            isMember: response?.data?.loyalCustomer ? "Yes" : "No",
            userStatus: "LoggedIn",
            pageReferrerTitle: global?.window?.localStorage?.getItem("previousPageTitle") ?? "",
            widget_type: items?._type,
            widget_title: items?.title || items?.subtitle,
            widget_description: items?.description,
            widget_position: "",
            journey_type: userType || UserType == "existing" ? "LogIn" : "SignIn",
            redemptionType: "",
            redemptionName: "",
            redemptionDescription: "",
            pointsType: "Neucoins",
            brandName: AFFILIATION,
            userId: response?.data?.customerHash ? response?.data?.customerHash : "",
            userType: UserType,
            eventType: "",
            eventName: "",
            eventPlace: "",
            eventTicketsQty: "",
            eventDate: "",
            specialCode: "",
            pageTitle: pageStoreData?.pageData?.pageTitle || "",
            pageURL: global?.window?.location?.href,
            pageHierarchy: JSON.parse(
              `["${TAJ_HOTELS}",` + `"${PAGELANG}",` + `"${AFFILIATION}",` + `"${pageStoreData?.pageData?.pageTitle}"]`,
            ),
            pageLanguage: PAGELANG,
            location: "",
            pageSection: items?.title || items?.subtitle,
          },
        })

        userStore?.setUserEncryptedCredentials("")
        if (isBookingJourneyPage) {
          let isCopperUser = (response?.data?.loyaltyInfo?.[0]?.currentSlab || "copper")?.toLowerCase() === "copper"
          const roomsAvailableInCart = bookingFlowGlobalStore?.cartDetails?.cartDetailsResponse?.items?.length > 0
          if (isCopperUser ? roomsAvailableInCart : true)
            navigate(ROUTES.WITHOUTSEO_FOR_ROUTING.BOOKING.REVIEW_BOOKING_MODAL, PathType.dialog)
          else {
            modalStore?.closeModal()
          }
        } else {
          modalStore?.closeModal()
        }
        if (localStorage?.getItem("gotoAfterLogin")) {
          if (localStorage?.getItem("gotoAfterLoginType")) {
            await CrossSiteNavigation({
              url: `${localStorage?.getItem("gotoAfterLogin")}`,
              loggedIn: true,
              userStore,
            })
            localStorage?.removeItem("gotoAfterLoginType")
          } else {
            navigate(localStorage?.getItem("gotoAfterLogin") || "", PathType?.internal)
          }
          localStorage?.removeItem("gotoAfterLogin")
        }
      } else if (!response?.data) {
        setResendOtp(!resendOtp)
        setOtp("")
        setError(true)
        setErrorMessage(LOGIN_CONSTANTS?.OTP_FAILED_ERROR)
        handleLoginFail(response)
        userStore?.setUserEncryptedCredentials("")
      } else if (response?.error === false && !response?.data && !userRegistrationStore) {
        setResendOtp(!resendOtp)
        setOtp("")
        setError(true)
        setErrorMessage(LOGIN_CONSTANTS?.OTP_FAILED_ERROR)
        handleLoginFail(response)
      } else if (userRegistrationStore && response?.data?.data === undefined && response?.error === true) {
        userStore?.setUserRedId("")
        setResendOtp(!resendOtp)
        setError(true)
        setOtp("")
        setErrorMessage(LOGIN_CONSTANTS?.OTP_FAILED_ERROR)
      } else if (!response?.data?.nameDetails?.firstName) {
        userStore?.setUserRedId("")
        if (userStore?.userCountryCode === "+91" || userStore?.userCountryCode === "91") {
          navigate(secondaryAction?.url, secondaryAction?.urlType)
        } else {
          navigate(primaryAction?.url, primaryAction?.urlType)
        }
      } else if (
        response?.error === false &&
        !userRegistrationStore &&
        ComponentType?.toLowerCase() === "forgotpassword"
      ) {
        userStore?.setUserRedId("")
        global?.localStorage?.removeItem("userDialCode")
        navigate(primaryAction?.url, primaryAction?.urlType)
      } else {
        userStore?.setUserRedId("")
        setResendOtp(!resendOtp)
        setOtp("")
        setError(true)
        setErrorMessage(ERROR_MESSAGES?.NETWORK_ERROR)
        handleLoginFail(response)
      }
    } else if (
      response?.response?.data?.code == "SSO-1049" ||
      response?.response?.data?.code == "SSO-1072" ||
      response?.response?.data?.code == "SSO-1051"
    ) {
      if (response?.response?.data?.code == "SSO-1072") {
        setHideActionBtn(true)
        setLoader(false)
      }
      if (response?.response?.data?.code == "SSO-1049") {
        setLoader(false)
        setOtp("")
        setErrorMessage(response?.response.data?.message)
        handleLoginFail(response)
        setHideActionBtn(false)
        setOtpExpiredTimer(false)
        setActiveCounter(false)
        setError(true)
      } else {
        handleLoginFail(response)
        setError(true)
        setLoader(false)
        setActiveCounter(true)
        setResendOtp(!resendOtp)
        setOtp("")
        setErrorMessage(response?.response.data?.message)
      }
    } else if (response?.error === true) {
      handleLoginFail(response)
      setLoader(false)
      setResendOtp(!resendOtp)
      setOtp("")
      setErrorMessage(response?.response?.data?.message || ERROR_MESSAGES?.NETWORK_ERROR)
    } else {
      setLoader(false)
      setResendOtp(!resendOtp)
      setOtp("")
      setErrorMessage(ERROR_MESSAGES?.NETWORK_ERROR)
      handleLoginFail(response)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    ComponentType,
    authenticLoginStore,
    cartDetails?.cartDetailsResponse?.items?.length,
    isBookingJourneyPage,
    isMobile,
    modalStore,
    navigate,
    otp,
    primaryAction,
    resendOtp,
    secondaryAction,
    userRegistrationStore,
    userStore,
  ])

  useEffect(() => {
    if (otp?.length > 5 && (activeCounter || (activeCounter && otp?.length > 5)) && !loader) {
      VerifyHandler()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCounter, otp?.length])

  const handleResendOtp = async () => {
    const recaptchaGenerated = await getRecaptchaToken()
    setLoader(true)
    let response: any
    const refId: string = userStore?.refId
    const countryCode: string = userStore?.userCountryCode
    if (userStore?.userMobileNumber !== "") {
      userStore.setUserMobileNumber(userStore?.userMobileNumber)
      if (authenticLoginStore) {
        response = await authenticLoginStore?.generateOTP(
          JSON.stringify({
            refId: refId,
            phone: userStore?.userMobileNumber,
            recaptchaToken: recaptchaGenerated,
            countryCode: countryCode,
          }),
        )
      } else if (userRegistrationStore) {
        response = await userRegistrationStore?.validateNewloginUser(
          JSON.stringify({
            refId: refId,
            phone: userStore?.userMobileNumber,
            countryCode: countryCode,
          }),
        )
      }
    } else if (userStore?.userEmailID !== "" && ComponentType?.toLowerCase() !== "forgotpassword") {
      response = await authenticLoginStore?.generateEmailOTP(
        JSON.stringify({
          refId: refId,
          email: userStore?.userEmailID,
          sendOtp: true,
          recaptchaToken: recaptchaGenerated,
        }),
      )
    } else if (
      authenticLoginStore &&
      userStore?.userEmailID !== "" &&
      !userRegistrationStore &&
      ComponentType?.toLowerCase() === "forgotpassword"
    ) {
      response = await authenticLoginStore?.generateTICEmailOtp(
        JSON.stringify({
          email: userStore.userEmailID,
          otp: otp,
          refId: refId,
        }),
      )
    } else if (userStore?.userEnteredMembershipID !== "") {
      response = await authenticLoginStore?.generateMembershipIDOTP(
        JSON.stringify({
          memberId: userStore.userEmailID,
          recaptchaToken: recaptchaGenerated,
        }),
      )
    }
    if (response?.error == false && response?.status === 201) {
      response?.data?.refId && userStore?.setUserRedId(response?.data?.refId)
      setLoader(false)
      setResendOtp(!resendOtp)
      setOtp("")
      setActiveCounter(true)
      setOtpLimit(otpLimit - 1)
      setError(true)
      setOtpExpiredTimer(false)
      setReSetCounter(true)
      setErrorMessage(ERROR_MESSAGES?.OTP_SUCCESS)
    } else if (response?.error == true) {
      handleLoginFail(response)
      setLoader(false)
      setReSetCounter(false)
      setOtpLimit(5)
      setError(true)
      setErrorMessage(response?.data || response?.response?.data?.message || "Network Error.!")
    }
  }

  const handleCloseIcon = () => {
    userStore?.clearUserEnteredRegistrationMobileNumber()
    userStore?.clearUserEmailID()
    userStore?.clearUserCountryCode()
    userStore?.clearUserMobileNumber()
    userStore?.updateUserEnteredMemberID("")
    modalStore?.closeModal()
    userStore?.setUserEncryptedCredentials("")
    global?.localStorage?.removeItem("userDialCode")
  }

  return (
    <>
      {loader && <LoadingSpinner />}
      <MainBoxWrapper>
        {!isMobile && <StyledClearIcon onClick={() => handleCloseIcon()} />}
        <MainBoxContainer>
          {isMobile && !authenticLoginStore ? (
            <Typography
              variant={isMobile ? "m-body-l" : "body-l"}
              sx={{
                fontFamily: "Inter",
                lineHeight: "140%",
                textAlign: "center",
                fontSize: isMobile ? "2.813vw" : "1.146vw",
              }}>
              {mobileTitle}
              <br />
              {mobileSubTitle}
            </Typography>
          ) : (
            <>
              {items?.title && (
                <Typography
                  variant={isMobile ? "m-body-l" : "body-l"}
                  sx={{
                    fontFamily: "Inter",
                    lineHeight: isMobile ? "140%" : "2.3vw",
                    fontSize: isMobile ? "2.813vw" : "1.146vw",
                    textAlign: "center",
                  }}>
                  {items?.title}
                </Typography>
              )}
            </>
          )}
          <SubTitleWrapper
            variant={isMobile ? "m-body-m" : "body-m"}
            sx={{
              fontSize: isMobile ? "2.813vw" : "1.146vw",
              fontWeight: 300,
              color: theme?.palette?.ihclPalette?.hexSeventeen,
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              padding: "0vw 0.4vw",
              lineHeight: isMobile ? "140%" : "2vw",
            }}>
            {items?.subtitle} &nbsp;
            {userStore?.userMobileNumber !== "" && authenticLoginStore && (
              <>
                {userStore?.userCountryCode?.includes("+")
                  ? userStore?.userCountryCode
                  : `+${userStore?.userCountryCode}`}
                &nbsp;
                {maskNumbers(userStore?.userMobileNumber)}
                &nbsp;
                {userStore?.encryptedCredentials && `and ${userStore?.encryptedCredentials}.`}
              </>
            )}
            {userStore?.userEnteredRegistrationMobileNumber !== "" && userRegistrationStore && (
              <>
                {userStore?.userCountryCode?.includes("+")
                  ? userStore?.userCountryCode
                  : `+${userStore?.userCountryCode}.`}
                &nbsp;
                {maskNumbers(userStore?.userEnteredRegistrationMobileNumber)}
                {userStore?.encryptedCredentials && ` and ${userStore?.encryptedCredentials}.`}
              </>
            )}
            {userStore?.userEmailID !== "" && !userRegistrationStore && (
              <>
                {EmailMask(userStore?.userEmailID)}
                {userStore?.encryptedCredentials && ` and ${userStore?.encryptedCredentials}.`}
              </>
            )}
          </SubTitleWrapper>
        </MainBoxContainer>
        <OtpComponentLogic
          setOtp={setOtp}
          otp={otp}
          invalidOtp={invalidOtp}
          resendOtp={resendOtp}
          setIsInvalidOtp={setIsInvalidOtp}
          VerifyHandler={() => {
            if (activeCounter && otp?.length > 5) {
              VerifyHandler()
            }
          }}
        />
        <ResendOtpWrapper>
          {error && otp?.length < 6 && (
            <ErrorMessages
              variant={isMobile ? "m-body-m" : "body-m"}
              sx={{ margin: "2vw 0vw 0vw 0vw", textAlign: "center" }}>
              {errorMessage}
            </ErrorMessages>
          )}
          {otpExpired?.length > 0 && !activeCounter && !hideActionBtn && (
            <ErrorMessages
              variant={isMobile ? "m-body-m" : "body-m"}
              sx={{ marginTop: "1vw", width: "60%", textAlign: "center" }}>
              {otpExpired}
            </ErrorMessages>
          )}
          {!hideActionBtn && (
            <Box sx={{ display: "flex" }}>
              {activeCounter ? (
                <MobileOtpTimer
                  mobileTitle={mobileTitle}
                  items={items}
                  setActiveCounter={setActiveCounter}
                  setOtpExpired={setOtpExpired}
                  activeCounter={activeCounter}
                  setOtpLink={setOtpLink}
                  reSetCounter={reSetCounter}
                  setReSetCounter={setReSetCounter}
                />
              ) : (
                <>
                  {!otpExpiredTimer && (
                    <ResendOtpText variant={isMobile ? "m-body-m" : "body-s"} onClick={() => handleResendOtp()}>
                      {CONSTANTS?.RESEND_OTP}
                    </ResendOtpText>
                  )}
                </>
              )}
              {activeCounter && otpLink && (
                <ResendOtpText
                  sx={{
                    margin: isMobile ? "0.6vw 0vw 0.6vw 2.6vw" : "0.6vw 1vw",
                  }}
                  variant={isMobile ? "m-body-m" : "body-s"}
                  onClick={() => handleResendOtp()}>
                  {CONSTANTS?.RESEND_OTP}
                </ResendOtpText>
              )}
            </Box>
          )}
          {!hideActionBtn && (activeCounter || (activeCounter && otp?.length > 0)) && (
            <RenderActionItem
              url={primaryAction?.url}
              title={primaryAction?.title}
              variant={primaryAction?.variant}
              navigationType={primaryAction?.urlType}
              isActionButtonType={true}
              onClick={() => {
                if (otp?.length > 5) {
                  setError(false)
                  VerifyHandler()
                } else {
                  setErrorMessage(ERROR_MESSAGES?.OTP_ERROR)
                  setError(true)
                }
              }}
              buttonStyles={{
                width: isMobile ? "27.969vw" : DesktopPxToVw(179),
                height: isMobile ? "9.531vw" : DesktopPxToVw(61),
                marginTop: isMobile ? "" : "1vw",
              }}
            />
          )}
        </ResendOtpWrapper>
      </MainBoxWrapper>
    </>
  )
}

export default observer(OtpScreen)
