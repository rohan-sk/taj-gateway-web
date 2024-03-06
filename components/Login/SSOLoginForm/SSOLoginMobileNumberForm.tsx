import React, { useContext, useEffect, useState } from "react"
import { Box } from "@mui/material"
import dynamic from "next/dynamic"
import { theme } from "../../../lib/theme"
import { UserStore, GAStore } from "../../../store"
import { getRecaptchaToken } from "../../../utils/recaptcha"
import { useMobileCheck } from "../../../utils/isMobilView"
import { LOGIN_TYPE } from "../../../utils/analytics/constants"
import RenderActionItem from "../../hoc/actions/action-items-ui"
import { CustomCheckBox } from "../../hoc/CustomCheckBox/Checkbox"
import { useAppNavigation } from "../../../utils/NavigationUtility"
import CountryCodeDropdown from "../../../utils/CountryCodeDropdown"
import phoneNumberVerifier from "../../../utils/phone-number-verifier"
import { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
import SSOLoginMembershipTypeImages from "./SSOLoginMembershipTypeImages"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { MemberDataLayer } from "../../../utils/analytics/member-data-layer"
import GetDefaultValue from "../../../utils/validations/getDefaultValue"
import { ERROR_MESSAGES, senderMobile } from "../../forms/gift-card-form/constants"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { ModalContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import AuthenticLoginStore from "../../../features/login/store/authentication.login.store"
import { handleCredEntered } from "../../../utils/analytics/events/NonEcommerce/credentials-entered-event"
import AuthenticRegistrationStore from "../../../features/registration/store/authentic.registration.store"
import {
  CheckBoxWrapper,
  MobileNumberTextField,
  MobileNumberErrorMessage,
  TermsAndPrivacyTypography,
  MobileNumberAndCountryCodeWrapper,
} from "./SSOLoginFormsStyles"

const LoadingSpinner = dynamic(() => import("../../../utils/SpinnerComponent"))

const SSOLoginMobileNumberForm = ({ props }: any) => {
  const propItems = props?.tabs?.[0]?.tabItems?.[0]
  const invalidMobileNumberErrorMessage = propItems?.parameterMap?.[2]?.value || ""
  const termsConditionErrorMessage = propItems?.parameterMap?.[3]?.value || ""
  const isMobile = useMobileCheck()
  const navigate: any = useAppNavigation()
  const IHCLContexts = useContext(IHCLContext)
  const modalContext = useContext(ModalContext)
  const PortableText = IHCLContexts!.PortableText

  const [number, setNumber] = useState<string>("")
  const [error, setError] = useState<boolean>(false)
  const [select, setSelect] = useState<boolean>(false)
  const [loader, setLoader] = useState<boolean>(false)
  const [userCode, setUserCode] = useState<string>("IN")
  const [checkValue, setCheckValue] = useState<boolean>(false)
  const [countryCode, setCountryCode] = useState<string>("+91")
  const [emptyFieldCheck, setEmptyFieldCheck] = useState<boolean>(false)
  const [apiError, setApiError] = useState<string>("")
  const [mobileNumberButtonDisable, setMobileNumberButtonDisable] = useState<boolean>(false)

  const checkBoxToggleValue = () => setCheckValue(!checkValue)

  const gaStoreData = IHCLContexts?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  // global user store
  const userStore = IHCLContexts?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  // user page login store
  const authenticLoginStore = modalContext?.getPageStore(PAGE_STORES.loginStore) as AuthenticLoginStore
  // user sign up store
  const registrationStore = modalContext?.getPageStore(PAGE_STORES.registrationStore) as AuthenticRegistrationStore

  const dataLayer = MemberDataLayer(userStore, gaStoreData)

  const isInvalidMobileNumber = (error && number?.length > 4) || (emptyFieldCheck && !error && number?.length < 4)

  const isTncUnchecked = !checkValue && select && !error && !emptyFieldCheck

  useEffect(() => {
    setNumber("")
  }, [propItems])

  useEffect(() => {
    if (
      (propItems?.singleContent ? checkValue : true) &&
      (countryCode === "+91" ? number?.length > 9 : number?.length >= 4)
    ) {
      setMobileNumberButtonDisable(true)
    } else {
      setMobileNumberButtonDisable(false)
    }
  }, [checkValue, countryCode, number?.length, propItems?.singleContent])

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
    }
    if (!response?.error) {
      global?.localStorage?.setItem("userDialCode", userCode)
      response?.data?.refId && userStore?.setUserRedId(response?.data?.refId)
      setLoader(false)
      response?.data?.emailMasked && userStore?.setUserEncryptedCredentials(response?.data?.emailMasked)
      GetDefaultValue(response?.data?.userType) &&
        global?.window?.localStorage?.setItem("userType", response?.data?.userType)
      if (response?.data?.phoneNumberEnrolled === true) {
        global?.window?.localStorage?.setItem("loginJourneyType", "phoneNumberLogin")
      }
      if (
        (response?.data?.userType?.toLowerCase() === "existing" && !registrationStore) ||
        (response?.data?.userType?.toLowerCase() === "new" && registrationStore)
      ) {
        navigate(propItems?.primaryAction?.url, propItems?.primaryAction?.urlType)
      } else if (response?.data?.userType?.toLowerCase() === "new" && !registrationStore) {
        // login to sign up
        userStore?.setUserEnteredRegistrationMobileNumber(number)
        userStore?.setUserCountryCode(countryCode)
        navigate(propItems?.secondaryAction?.url, propItems?.secondaryAction?.urlType)
        // setOpenErrorMessage(true)
        // setSnackMessage(ERROR_MESSAGES?.EXISTING_USER)
      } else if (response?.data?.userType?.toLowerCase() === "existing" && registrationStore) {
        // sign up to login
        if (!propItems?.singleContent) {
          setApiError(ERROR_MESSAGES?.EXISTING_USER)
        } else {
          navigate(propItems?.secondaryAction?.url, propItems?.secondaryAction?.urlType)
        }
      } else if (response?.data?.userType === "migrated") {
        navigate(propItems?.primaryAction?.url, propItems?.primaryAction?.urlType)
      } else {
        setApiError(response?.data || ERROR_MESSAGES?.NON_EXISTING_USER)
      }
    } else {
      setLoader(false)
      setApiError(response?.response?.data?.message || ERROR_MESSAGES?.NETWORK_ERROR)
    }
  }

  const handlePhoneKeyRestrictions = (event: any) => {
    if (event?.key === "Enter") {
      if (number?.length < 4) {
        setEmptyFieldCheck(true)
      } else if (propItems?.singleContent ? !checkValue : checkValue) {
        setEmptyFieldCheck(false)
        setSelect(true)
      } else {
        setEmptyFieldCheck(false)
        handleSubmit()
      }
    }
  }

  const handleChangeForm = (event: any) => {
    const isVerified = phoneNumberVerifier(userCode, event?.target?.value)
    setApiError("")
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

  return (
    <Box>
      {loader && <LoadingSpinner />}
      <MobileNumberAndCountryCodeWrapper aria-label="SSOLoginMobileNumberForm">
        <CountryCodeDropdown
          setUserCode={setUserCode}
          titleStyles={{ fontFamily: "Inter" }}
          isCustomizedArrow={true}
          parentStyles={{
            minHeight: isMobile ? MobilePxToVw(40) : DesktopPxToVw(40),
            "&, & .MuiSelect-select.MuiSelect-standard.MuiInputBase-input.MuiInput-input, & .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-colorPrimary, & input~div":
              {
                display: "flex",
                alignItems: "center",
                gap: DesktopPxToVw(5),
                height: isMobile ? MobilePxToVw(40) : DesktopPxToVw(40),
              },
            "& span": {
              margin: "0vw",
              position: "unset",
            },
            "@media (max-Width:640px)": {
              "& .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-colorPrimary": {
                minWidth: "initial",
                paddingBottom: "0vw",
                height: MobilePxToVw(40),
              },
            },
          }}
          iconStyle={{
            position: "static !important",
            color: `${theme?.palette?.ihclPalette?.hexSeventeen}`,
            fontSize: isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
          }}
          dropdownStyle={{
            width: isMobile ? "100%" : DesktopPxToVw(700),
            marginLeft: isMobile ? "0vw" : DesktopPxToVw(300),
          }}
          countryCode={countryCode}
          setCountryCode={setCountryCode}
          setNumber={setNumber}
        />
        <MobileNumberTextField
          value={number}
          placeholder={propItems?.subTitle}
          name={senderMobile}
          onChange={handleChangeForm}
          variant="standard"
          onKeyDown={handlePhoneKeyRestrictions}
          inputProps={{ maxLength: countryCode === "+91" ? 10 : 14 }}
          type="tel"
        />
      </MobileNumberAndCountryCodeWrapper>
      {isInvalidMobileNumber && (
        <Box sx={{ position: "absolute", width: isMobile ? "82%" : "35%" }}>
          <MobileNumberErrorMessage>{invalidMobileNumberErrorMessage}</MobileNumberErrorMessage>
        </Box>
      )}
      {isTncUnchecked && (
        <Box sx={{ position: "absolute", width: isMobile ? "82%" : "35%" }}>
          <MobileNumberErrorMessage>{termsConditionErrorMessage}</MobileNumberErrorMessage>
        </Box>
      )}
      {apiError && (
        <Box sx={{ position: "absolute", width: isMobile ? "82%" : "35%" }}>
          <MobileNumberErrorMessage>{apiError}</MobileNumberErrorMessage>
        </Box>
      )}
      {propItems?.singleContent && (
        <CheckBoxWrapper>
          <CustomCheckBox withBorder={true} onChange={checkBoxToggleValue} checked={checkValue} />
          <TermsAndPrivacyTypography>
            {propItems?.singleContent?.map((item: any, index: number) => (
              <PortableText key={index} blocks={item} />
            ))}
          </TermsAndPrivacyTypography>
        </CheckBoxWrapper>
      )}

      <SSOLoginMembershipTypeImages props={props} />

      {propItems?.primaryAction?.title && (
        <RenderActionItem
          isDisable={mobileNumberButtonDisable}
          url={propItems?.primaryAction?.url}
          isActionButtonType={true}
          title={propItems?.primaryAction?.title}
          variant={propItems?.primaryAction?.variant}
          navigationType={propItems?.primaryAction?.urlType}
          onClick={() => {
            if (mobileNumberButtonDisable) {
              handleSubmit()
              handleCredEntered(
                "credentials_entered",
                propItems?.primaryAction?.urlType,
                propItems?.primaryAction?.url,
                propItems?.primaryAction?.title,
                dataLayer,
                userStore,
                props,
                number,
                "",
                "",
                LOGIN_TYPE,
              )
            }
          }}
          buttonStyles={{
            display: "flex",
            justifyContent: "center",
            margin: `${DesktopPxToVw(20)} auto 0vw auto`,
            "@media (max-width: 640px)": {
              width: "100%",
              margin: `0vw auto`,
            },
          }}
        />
      )}
    </Box>
  )
}

export default SSOLoginMobileNumberForm
