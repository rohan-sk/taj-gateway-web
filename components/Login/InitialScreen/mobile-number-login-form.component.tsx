import crypto from "crypto"
import { observer } from "mobx-react-lite"
import { urlFor } from "../../../lib-sanity"
import { Box, Typography } from "@mui/material"
import { getCookie } from "../../../utils/cookie"
import useStorage from "../../../utils/useStorage"
import { GAStore, UserStore } from "../../../store"
import { ageFromDOB } from "../../../utils/getDate"
import { MainGrid } from "../Styles/register.styles"
import { triggerEvent } from "../../../utils/analytics"
import { LoginFormInterface } from "../login-form.types"
import { useMobileCheck } from "../../../utils/isMobilView"
import { getRecaptchaToken } from "../../../utils/recaptcha"
import LoadingSpinner from "../../../utils/SpinnerComponent"
import React, { useContext, useEffect, useState } from "react"
import RenderActionItem from "../../hoc/actions/action-items-ui"
import { CustomCheckBox } from "../../hoc/CustomCheckBox/Checkbox"
import { useAppNavigation } from "../../../utils/NavigationUtility"
import CountryCodeDropdown from "../../../utils/CountryCodeDropdown"
import { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
import phoneNumberVerifier from "../../../utils/phone-number-verifier"
import GetDefaultValue from "../../../utils/validations/getDefaultValue"
import { MemberDataLayer } from "../../../utils/analytics/member-data-layer"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { CheckBoxWrapper, CheckBoxContainer } from "../Styles/InitialScreen.styles"
import { InputText, BoxWrapper, ErrorMessageTypography } from "../Styles/tabs.styles"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { ModalContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import AuthenticLoginStore from "../../../features/login/store/authentication.login.store"
import { POWERED_BY_WIDGET, AFFILIATION, PAGELANG } from "../../../features/booking/constants"
import { senderMobile, ERROR_MESSAGES, MobilePlaceholder } from "../../forms/gift-card-form/constants"
import AuthenticRegistrationStore from "../../../features/registration/store/authentic.registration.store"
import { handleCredEntered } from "../../../utils/analytics/events/NonEcommerce/credentials-entered-event"
import {
  EPICURE_TIER,
  CHAMBERS_TIER,
  USER_TIRE,
  EPICURE_ID,
  CHAMBERS_ID,
  USER_PHONE_NUMBER,
  TAJ_HOTELS,
  isUserLoggedIn,
  SIGNUP_WIDGET_TITLE,
  SIGNUP_JOURNEY_TYPE,
  NOT_LOGGEDIN,
  LOGIN_TYPE,
} from "../../../utils/analytics/constants"

const MobileNumberLoginForm = ({ props }: LoginFormInterface) => {
  const { title, subTitle, parameterMap, primaryAction, secondaryAction } = props
  const errorText: string = parameterMap?.[2]?.value || ""

  const IHCLContexts = useContext(IHCLContext)
  const PortableText = IHCLContexts!.PortableText
  const [check, setCheck] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [number, setNumber] = useState<string>("")
  const [select, setSelect] = useState<boolean>(false)
  const [emptyFieldCheck, setEmptyFieldCheck] = useState(false)
  const [countryCode, setCountryCode] = useState<string>("+91")
  const [apiErrorMessage, setAPIErrorMessage] = useState<string>("")
  const [disable, setDisable] = useState<boolean>(false)
  const [loader, setLoader] = useState<boolean>(false)
  const [userCode, setUserCode] = useState<string>("IN")

  const isMobile = useMobileCheck()
  const navigate: any = useAppNavigation()

  //store
  const userStore = IHCLContexts?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore

  const modalContext = useContext(ModalContext)
  const authenticLoginStore = modalContext?.getPageStore(PAGE_STORES.loginStore) as AuthenticLoginStore
  const registrationStore = modalContext?.getPageStore(PAGE_STORES.registrationStore) as AuthenticRegistrationStore
  const Context = useContext(IHCLContext)
  const pageStoreData = Context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const context = useContext(IHCLContext)
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const dataLayer = MemberDataLayer(userStore, gaStoreData)
  const { getItem } = useStorage()

  useEffect(() => {
    setNumber("")
  }, [props])

  useEffect(() => {
    if ((props.singleContent ? check : true) && (countryCode === "+91" ? number?.length > 9 : number?.length >= 4)) {
      setDisable(true)
    } else {
      setDisable(false)
    }
  }, [check, countryCode, number?.length, props.singleContent])

  const handleChangeForm = (event: any) => {
    const isVerified = phoneNumberVerifier(userCode, event?.target?.value)
    setAPIErrorMessage("")
    if (countryCode === "+91") {
      event?.target?.value?.length <= 10 && event?.target?.value[0] > 5
        ? setNumber && setNumber(Math.max(0, parseInt(event.target.value)).toString().slice(0, 10))
        : event?.target?.value?.length == 0 && setNumber && setNumber("")
    } else {
      event?.target?.value?.length <= 14 && event?.target?.value[0] > 1
        ? setNumber && setNumber(Math.max(0, parseInt(event.target.value)).toString().slice(0, 14))
        : event?.target?.value?.length == 0 && setNumber && setNumber("")
    }
    if (isVerified) {
      setError(false)
    } else {
      setError(true)
    }
    if (event?.target?.value?.length == 0) {
      setError(false)
    }
  }

  const handlePhoneKeyRestrictions = (event: any) => {
    if (event?.key === "Enter") {
      if (number?.length < 4) {
        setEmptyFieldCheck(true)
      } else if (props.singleContent ? !check : check) {
        setEmptyFieldCheck(false)
        setSelect(true)
      } else {
        setEmptyFieldCheck(false)
        handleSubmit()
      }
    }
  }

  const CheckBoxToggle = (e: any) => {
    setCheck(!check)
  }

  //Analytics Need to write a function and changes function Name

  const handleSubmit = async () => {
    const recaptchaGenerated = await getRecaptchaToken()
    setLoader(true)
    userStore.setUserMobileNumber(number)
    userStore?.setUserCountryCode(countryCode)
    registrationStore && userStore?.setUserEnteredRegistrationMobileNumber(number)
    let response
    if (authenticLoginStore) {
      response = await authenticLoginStore?.generateOTP(
        JSON.stringify({
          phone: number,
          countryCode: countryCode?.slice(1),
          recaptchaToken: recaptchaGenerated,
        }),
      )
    } else {
      response = await registrationStore.validateNewloginUser(
        JSON.stringify({
          phone: number,
          countryCode: countryCode?.slice(1),
          recaptchaToken: recaptchaGenerated,
        }),
      )
      global?.window?.localStorage?.setItem("loginJourneyType", "phoneNumberLogin")
    }
    if (!response?.error) {
      response?.data?.refId && userStore?.setUserRedId(response?.data?.refId)
      global?.localStorage?.setItem("userDialCode", userCode)
      setLoader(false)
      GetDefaultValue(response?.data?.userType) &&
        global?.window?.localStorage?.setItem("userType", response?.data?.userType)
      if (response?.data?.phoneNumberEnrolled === true) {
        global?.window?.localStorage?.setItem("loginJourneyType", "phoneNumberLogin")
      }
      if (
        (response?.data?.userType?.toLowerCase() === "existing" && !registrationStore) ||
        (response?.data?.userType?.toLowerCase() === "new" && registrationStore)
      ) {
        navigate(primaryAction?.url, primaryAction?.urlType)
      } else if (response?.data?.userType?.toLowerCase() === "new" && !registrationStore) {
        // login to sign up
        userStore?.setUserEnteredRegistrationMobileNumber(number)
        userStore?.setUserCountryCode(countryCode)
        navigate(secondaryAction?.url, secondaryAction?.urlType)
        // setOpenErrorMessage(true)
        // setSnackMessage(ERROR_MESSAGES?.EXISTING_USER)
      } else if (response?.data?.userType?.toLowerCase() === "existing" && registrationStore) {
        // sign up to login
        if (!props.singleContent) {
          setAPIErrorMessage(ERROR_MESSAGES?.EXISTING_USER)
        } else {
          navigate(secondaryAction?.url, secondaryAction?.urlType)
        }
      } else if (response?.data?.userType === "migrated") {
        navigate(primaryAction?.url, primaryAction?.urlType)
      } else {
        setAPIErrorMessage(response?.data || ERROR_MESSAGES?.NON_EXISTING_USER)
      }
    } else {
      setLoader(false)
      setAPIErrorMessage(response?.response?.data?.message || ERROR_MESSAGES?.NETWORK_ERROR)
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
          encryptedMobileNo:
            userStore?.userMobileNumber || number
              ? crypto
                  .createHash("sha256")
                  .update(userStore?.userMobileNumber || number)
                  .digest("hex")
              : "",
          buttonLinkName: primaryAction?.title,
          link_text: primaryAction?.title,
          link_url: primaryAction?.url,
          outbound: primaryAction?.urlType == "internal" ? false : true,
          membershipType: isUserLoggedIn
            ? `${CHAMBERS_TIER || EPICURE_TIER || CHAMBERS_TIER || "Neupass"} - ${USER_TIRE}`
            : "",
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

  const mobileError: boolean = (error && number?.length > 4) || (emptyFieldCheck && number?.length < 1)

  return (
    <>
      {loader && <LoadingSpinner />}
      <MainGrid
        sx={{
          padding: isMobile && registrationStore ? (props.singleContent ? "0vw 6.8vw" : "0vw 7.813vw") : "",
        }}
        aria-label="mobile-number-login-form">
        {props?.logo && (
          <Box
            component={"img"}
            alt={`logo-img`}
            width={isMobile ? "32vw" : "14vw"}
            sx={{
              marginBottom: registrationStore && isMobile ? "8.6vw" : "4vw",
              marginTop: registrationStore && isMobile ? "4.863vw" : "0vw",
            }}
            src={urlFor(props?.logo?.asset?._ref).url()}
          />
        )}
        {title && (
          <Typography
            sx={{
              marginBottom: props.singleContent?.[0] ? "4vw" : isMobile ? "6.4vw" : "2vw",
            }}
            variant={isMobile ? "m-heading-s" : "heading-s"}>
            {title}
          </Typography>
        )}
        <BoxWrapper
          sx={{
            display: "flex",
            alignItems: "flex-end",
            width: "100%",
            paddingTop: isMobile ? MobilePxToVw(20) : props.singleContent?.[0] ? DesktopPxToVw(0) : DesktopPxToVw(28),
          }}>
          <CountryCodeDropdown
            setUserCode={setUserCode}
            dropdownStyle={{
              width: isMobile ? "87vw" : DesktopPxToVw(700),
              marginLeft: isMobile ? "2vw" : "15.3vw",
              maxHeight: 250,
              "@media(max-height:400px)": {
                marginTop: "2.08vw",
                marginLeft: "15vw",
                width: "38.458333vw",
                maxHeight: 125,
              },
            }}
            iconStyle={{
              "@media(max-height:400px)": {
                "& .MuiSvgIcon-root": {
                  top: "1.5vw",
                },
              },
            }}
            menuItemStyles={{
              "@media(max-height:400px)": { height: "3.750vw" },
            }}
            countryCode={countryCode}
            setCountryCode={setCountryCode}
            setNumber={setNumber}
          />
          <InputText
            value={number}
            placeholder={isMobile ? MobilePlaceholder : subTitle}
            name={senderMobile}
            onChange={handleChangeForm}
            variant="standard"
            onKeyDown={handlePhoneKeyRestrictions}
            inputProps={{ maxLength: countryCode === "+91" ? 10 : 14 }}
            type="tel"
          />
        </BoxWrapper>
        {error && number?.length > 4 && <ErrorMessageTypography>{errorText}</ErrorMessageTypography>}
        {emptyFieldCheck && !error && number?.length < 4 && (
          <ErrorMessageTypography variant="body-m">{errorText}</ErrorMessageTypography>
        )}
        {!check && select && !error && !emptyFieldCheck && (
          <ErrorMessageTypography variant="body-m">{ERROR_MESSAGES?.checkboxError}</ErrorMessageTypography>
        )}
        {apiErrorMessage?.length > 0 && (
          <ErrorMessageTypography variant="body-m">{apiErrorMessage}</ErrorMessageTypography>
        )}
        <CheckBoxWrapper $error={mobileError || (!mobileError && !check && number?.length > 4 && select)}>
          {props.singleContent && (
            <>
              <CheckBoxContainer>
                <CustomCheckBox withBorder={true} onChange={CheckBoxToggle} checked={check} />
              </CheckBoxContainer>
              <PortableText blocks={props.singleContent?.[0]} />
            </>
          )}
        </CheckBoxWrapper>

        <RenderActionItem
          isDisable={disable}
          url={parameterMap?.[1]?.value}
          isDisableRippleEffect={!disable}
          title={primaryAction?.title}
          variant={primaryAction?.variant}
          isActionButtonType={true}
          navigationType={primaryAction?.urlType}
          onClick={() => {
            if (disable) {
              handleSubmit()
              handleCredEntered(
                "credentials_entered",
                primaryAction?.urlType,
                primaryAction?.url,
                primaryAction?.title,
                dataLayer,
                userStore,
                props,
                number,
                "",
                "",
                SIGNUP_JOURNEY_TYPE,
                SIGNUP_WIDGET_TITLE,
              )
            }
          }}
          buttonStyles={{
            width: isMobile ? "100%" : DesktopPxToVw(179),
            marginBottom: isMobile ? "8.59vw" : "0vw",
            marginTop: props.singleContent ? "0.6vw" : "-2vw",
          }}
        />
      </MainGrid>
    </>
  )
}

export default observer(MobileNumberLoginForm)
