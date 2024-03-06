import crypto from "crypto"
import { observer } from "mobx-react-lite"
import { urlFor } from "../../../lib-sanity"
import { Box, Typography } from "@mui/material"
import { getCookie } from "../../../utils/cookie"
import useStorage from "../../../utils/useStorage"
import { GAStore, UserStore } from "../../../store"
import { ageFromDOB } from "../../../utils/getDate"
import { triggerEvent } from "../../../utils/analytics"
import { LoginFormInterface } from "../login-form.types"
import { useMobileCheck } from "../../../utils/isMobilView"
import { getRecaptchaToken } from "../../../utils/recaptcha"
import LoadingSpinner from "../../../utils/SpinnerComponent"
import { PAGELANG } from "../../../features/booking/constants"
import RenderActionItem from "../../hoc/actions/action-items-ui"
import { CustomCheckBox } from "../../hoc/CustomCheckBox/Checkbox"
import { useAppNavigation } from "../../../utils/NavigationUtility"
import { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
import { PortableText } from "../../../lib/portable-text-serializers"
import GetDefaultValue from "../../../utils/validations/getDefaultValue"
import React, { Fragment, useContext, useEffect, useState } from "react"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { MemberDataLayer } from "../../../utils/analytics/member-data-layer"
import TextfieldValidator from "../../../utils/validations/TextfieldValidator"
import { senderEmail, ERROR_MESSAGES } from "../../forms/gift-card-form/constants"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { ModalContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import { EmailBoxWrapper, ImagesContainer, StyledTextField } from "../Styles/tabs.styles"
import AuthenticLoginStore from "../../../features/login/store/authentication.login.store"
import { CheckBoxWrapper, CheckBoxContainer, ErrorMessages } from "../Styles/InitialScreen.styles"
import { handleCredEntered } from "../../../utils/analytics/events/NonEcommerce/credentials-entered-event"
import AuthenticRegistrationStore from "../../../features/registration/store/authentic.registration.store"
import {
  AFFILIATION,
  CHAMBERS_ID,
  CHAMBERS_TIER,
  EPICURE_ID,
  EPICURE_TIER,
  LOGIN_TYPE,
  NOT_LOGGEDIN,
  POWERED_BY_WIDGET,
  SIGNUP_JOURNEY_TYPE,
  SIGNUP_WIDGET_TITLE,
  TAJ_HOTELS,
  USER_PHONE_NUMBER,
  USER_TIRE,
  isUserLoggedIn,
} from "../../../utils/analytics/constants"

const EmailAddressLoginForm = ({ props }: LoginFormInterface) => {
  const { subTitle, primaryAction, parameterMap, imageAsset, secondaryAction } = props
  const [email, setEmail] = useState<string>("")
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<any>("")
  const [check, setCheck] = useState<boolean>(false)
  const [apiErrorMessage, setApiErrorMessage] = useState<string>("")
  const [disable, setDisable] = useState<boolean>(false)
  const [loader, setLoader] = useState<boolean>(false)
  const navigate = useAppNavigation()
  const isMobile = useMobileCheck()
  const ihclContext = useContext(IHCLContext)
  const isEmailLogin = props?.singleContent?.length > 0
  const userStore = ihclContext?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const pageStoreData = ihclContext?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const modalContext = useContext(ModalContext)
  const authenticLoginStore = modalContext?.getPageStore(PAGE_STORES.loginStore) as AuthenticLoginStore
  const gaStoreData = ihclContext?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const dataLayer = MemberDataLayer(userStore, gaStoreData)
  const { getItem } = useStorage()

  // registration store
  const registrationStore = modalContext?.getPageStore(PAGE_STORES.registrationStore) as AuthenticRegistrationStore

  useEffect(() => {
    if (parameterMap) {
      parameterMap?.map((item: any, index: number) => {
        if (item?.key?.toLowerCase() === "errortext") {
          setErrorMessage(item?.value)
        }
      })
    }
  }, [parameterMap])

  useEffect(() => {
    if (isEmailLogin ? check && email?.length > 0 && !error : email?.length > 0 && !error) {
      setDisable(false)
    } else {
      setDisable(true)
    }
  }, [check, email?.length, error, isEmailLogin])

  const formValidation = (isFormValid: any, id: any) => {
    setError(!isFormValid)
  }

  const handleChangeForm = (event: any) => {
    const { name, value } = event.target
    const { status, errorMsg, fieldName } = TextfieldValidator(name, value)
    setApiErrorMessage("")
    formValidation(status, name)
    setEmail(event?.target?.value)
  }

  const handlePhoneKeyRestrictions = (event: any) => {
    if (event?.key === "Enter") {
      if (props.singleContent?.[0] ? check : !check) {
        handleSubmit()
      }
    }
  }

  const CheckBoxToggle = (e: any) => {
    setCheck(!check)
  }

  const handleSubmit = async () => {
    const recaptchaGenerated = await getRecaptchaToken()
    setLoader(true)
    let response
    userStore.setUserEmailID(email)
    if (authenticLoginStore && userStore?.userEnteredMembershipID !== "") {
      response = await authenticLoginStore?.generateTICEmailOtp(
        JSON.stringify({
          email: email,
        }),
      )
    } else if (authenticLoginStore) {
      response = await authenticLoginStore?.generateEmailOTP(
        JSON.stringify({
          email: email,
          sendOtp: true,
          recaptchaToken: recaptchaGenerated,
        }),
      )
    } else {
      response = await registrationStore?.validateNewEmailLoginUser(
        JSON.stringify({
          email: email,
          recaptchaToken: recaptchaGenerated,
          sendOtp: true,
        }),
      )
      global?.window?.localStorage?.setItem("loginJourneyType", "EmailIdLogin")
    }
    if (response?.error === false) {
      response?.data?.refId && userStore?.setUserRedId(response?.data?.refId)
      setLoader(false)
      GetDefaultValue(response?.data?.userType) &&
        global?.window?.localStorage?.setItem("userType", response?.data?.userType)
      if (response?.data?.emailEnrolled === true) {
        global?.window?.localStorage?.setItem("loginJourneyType", "EmailIdLogin")
      }
      if (
        (response?.data?.userType?.toLowerCase() === "existing" ||
          response?.data?.userType?.toLowerCase() === "migrated") &&
        authenticLoginStore &&
        isEmailLogin
      ) {
        // login
        navigate(primaryAction?.url, primaryAction?.urlType)
      } else if (response?.data?.userType?.toLowerCase() === "new" && authenticLoginStore) {
        // login to sign up
        navigate(secondaryAction?.url, secondaryAction?.urlType)
        // setOpenErrorMessage(true)
        // setSnackMessage(ERROR_MESSAGES?.EXISTING_USER)
      } else if (response?.data?.userType?.toLowerCase() === "new" && registrationStore) {
        // sign up
        navigate(parameterMap?.[1]?.value, primaryAction?.urlType)
      } else if (
        (response?.data?.userType?.toLowerCase() === "existing" ||
          response?.data?.userType?.toLowerCase() === "migrated") &&
        registrationStore
      ) {
        // sign up to login
        navigate(secondaryAction?.url, secondaryAction?.urlType)
        // setOpenErrorMessage(true)
        // setSnackMessage(ERROR_MESSAGES?.NON_EXISTING_USER)
      } else if (authenticLoginStore && userStore?.userEnteredMembershipID !== "") {
        navigate(primaryAction?.url, primaryAction?.urlType)
      } else {
        setApiErrorMessage(response?.data?.message || ERROR_MESSAGES?.NON_EXISTING_USER)
      }
    } else if (
      response?.error === false &&
      (response?.data?.userType?.toLowerCase() === "existing" ||
        response?.data?.userType?.toLowerCase() === "migrated") &&
      !isEmailLogin
    ) {
      setLoader(false)
      navigate(primaryAction?.url, primaryAction?.urlType)
    } else {
      setLoader(false)
      setApiErrorMessage(
        response?.data ||
          response?.data?.message ||
          response?.response?.data?.message ||
          response?.response?.data?.error ||
          "Network Error.!",
      )
      triggerEvent({
        action: "Login_Fail",
        params: {
          ...dataLayer,
          pageReferrer: global?.window?.localStorage?.getItem("previousPageURL") ?? "",
          pageURL: global?.window?.location?.href,
          device: isMobile ? "Mobile" : "Desktop",
          clientId: getCookie("_ga")?.slice(6),
          widget_powered_by: POWERED_BY_WIDGET,
          login_method: getItem("loginJourneyType") || global?.window?.localStorage?.getItem("loginJourneyType"),
          encryptedEmailID:
            userStore?.userEmailID || email
              ? crypto
                  .createHash("sha256")
                  .update(userStore?.userMobileNumber || email)
                  .digest("hex")
              : "",
          buttonLinkName: primaryAction?.title,
          link_text: primaryAction?.title,
          link_url: primaryAction?.url,
          outbound: primaryAction?.urlType == "internal" ? false : true,
          membershipType: isUserLoggedIn ? `${CHAMBERS_TIER || EPICURE_TIER || "Neupass"} - ${USER_TIRE}` : "",
          membershipNumber: CHAMBERS_ID || EPICURE_ID || USER_PHONE_NUMBER || "",
          memberEmailId: response?.data?.primaryEmailId ? response?.data?.primaryEmailId : "",
          memberMobileNo: response?.data?.primaryMobile?.phoneNumber ? response?.data?.primaryMobile?.phoneNumber : "",
          memberName:
            `${response?.data?.nameDetails?.firstName || ""}` + `${response?.data?.nameDetails?.lastName || ""}`,
          memberGender: response?.data?.gender ? response?.data?.gender : "",
          memberDOB: response?.data?.dob ? response?.data?.dob : "",
          memberAge: ageFromDOB(response?.data?.dob) ? ageFromDOB(response?.data?.dob) : "",
          memberCountry: response?.data?.addresses?.[0]?.country ? response?.data?.addresses?.[0]?.country : "",
          memberState: response?.data?.addresses?.[0]?.state ? response?.data?.addresses?.[0]?.state : "",
          memberCity: response?.data?.addresses?.[0]?.cityTown ? response?.data?.addresses?.[0]?.cityTown : "",
          memberPincode: response?.data?.addresses?.[0]?.pinCode ? response?.data?.addresses?.[0]?.pinCode : "",
          ponitsToBeRedeemed: response?.data?.loyaltyInfo?.[0]?.loyaltyPoints
            ? response?.data?.loyaltyInfo?.[0]?.loyaltyPoints
            : "",
          existingCustomer: response?.data?.existingCustomer ? "Yes" : "No",
          isMember: response?.data?.loyalCustomer ? "Yes" : "No",
          userStatus: NOT_LOGGEDIN,
          pageDescription: pageStoreData?.pageData?.pageDescription || "",
          widget_type: props?._type,
          widget_title: SIGNUP_WIDGET_TITLE,
          // widget_description: items?.description,
          widget_position: "",
          journey_type: response?.data?.userType?.toLowerCase() === "existing" ? LOGIN_TYPE : SIGNUP_JOURNEY_TYPE,
          redemptionType: "",
          redemptionName: "",
          redemptionDescription: "",
          pointsType: "",
          brandName: AFFILIATION,
          visitSource: "",
          userId: response?.data?.customerHash ? response?.data?.customerHash : "",
          userType: "",
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
          pageSection: SIGNUP_WIDGET_TITLE,
        },
      })
    }
  }
  let EmailError: boolean = email?.length > 0 && error

  return (
    <>
      {loader && <LoadingSpinner />}
      <EmailBoxWrapper
        sx={{
          padding:
            isMobile && registrationStore
              ? props.singleContent
                ? "0vw  6.8vw"
                : "0vw 7.813vw"
              : isMobile && !props.singleContent
              ? "0vw 7vw"
              : "",
        }}
        aria-label="email-address-login-form">
        {imageAsset?.largeImage?.length > 0 && (
          <ImagesContainer>
            {imageAsset?.largeImage?.map((img: any, index: number) => (
              <Fragment key={index}>
                {img?.asset?._ref && (
                  <Box
                    key={index}
                    component={"img"}
                    alt={`logo-img`}
                    sx={{
                      width:
                        index === 0
                          ? isMobile
                            ? MobilePxToVw(115)
                            : DesktopPxToVw(162)
                          : index === 1
                          ? isMobile
                            ? MobilePxToVw(143)
                            : DesktopPxToVw(200)
                          : isMobile
                          ? MobilePxToVw(97)
                          : DesktopPxToVw(135),
                      marginRight: "1vw",
                    }}
                    src={urlFor(img?.asset?._ref)?.url()}
                  />
                )}
              </Fragment>
            ))}
          </ImagesContainer>
        )}
        {props?.title && (
          <Typography
            variant={isMobile ? "m-heading-s" : "heading-s"}
            sx={{
              margin: isMobile ? "0vw 0vw 8.4vw 0vw" : "3.6vw 0vw 1vw 0vw",
            }}>
            {props?.title}
          </Typography>
        )}
        {subTitle && (
          <StyledTextField
            placeholder={subTitle}
            name={senderEmail}
            value={email}
            variant="standard"
            onChange={handleChangeForm}
            onKeyDown={handlePhoneKeyRestrictions}
          />
        )}
        {email?.length > 0 && error && <ErrorMessages>{errorMessage}</ErrorMessages>}
        {apiErrorMessage && (
          <ErrorMessages sx={{ mt: DesktopPxToVw(12), width: "max-content" }}>{apiErrorMessage}</ErrorMessages>
        )}
        {isEmailLogin && (
          <CheckBoxWrapper $error={EmailError}>
            <CheckBoxContainer>
              <CustomCheckBox withBorder={true} onChange={CheckBoxToggle} checked={check} />
            </CheckBoxContainer>
            {props?.singleContent?.[0] && <PortableText blocks={props.singleContent?.[0]} />}
          </CheckBoxWrapper>
        )}
        <RenderActionItem
          isDisable={!disable}
          isDisableRippleEffect={disable}
          url={parameterMap?.[1]?.url}
          title={primaryAction?.title}
          variant={primaryAction?.variant}
          navigationType={primaryAction?.urlType}
          isActionButtonType={true}
          buttonStyles={{
            width: isEmailLogin ? (isMobile ? "100%" : DesktopPxToVw(179)) : isMobile ? "100%" : DesktopPxToVw(323),
            marginBottom: isMobile ? "8.59vw" : "0vw",
            marginTop: isEmailLogin ? "0.6vw" : isMobile ? "8vw" : "2.8vw",
          }}
          onClick={() => {
            if (!disable) {
              handleSubmit()
              handleCredEntered(
                "credentials_entered",
                primaryAction?.urlType,
                primaryAction?.url,
                primaryAction?.title,
                dataLayer,
                userStore,
                props,
                "",
                email,
                "",
                SIGNUP_JOURNEY_TYPE,
                SIGNUP_WIDGET_TITLE,
              )
            }
          }}
        />
      </EmailBoxWrapper>
    </>
  )
}

export default observer(EmailAddressLoginForm)
