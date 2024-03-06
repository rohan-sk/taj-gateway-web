import React, { useContext, useEffect, useState } from "react"
import { Box } from "@mui/material"
import dynamic from "next/dynamic"
import { GAStore, UserStore } from "../../../store"
import DesktopPxToVw from "../../../utils/DesktopFontCalc"
import { useMobileCheck } from "../../../utils/isMobilView"
import { getRecaptchaToken } from "../../../utils/recaptcha"
import { LOGIN_TYPE } from "../../../utils/analytics/constants"
import RenderActionItem from "../../hoc/actions/action-items-ui"
import { CustomCheckBox } from "../../hoc/CustomCheckBox/Checkbox"
import { useAppNavigation } from "../../../utils/NavigationUtility"
import { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
import SSOLoginMembershipTypeImages from "./SSOLoginMembershipTypeImages"
import TextfieldValidator from "../../../utils/validations/TextfieldValidator"
import GetDefaultValue from "../../../utils/validations/getDefaultValue"
import { MemberDataLayer } from "../../../utils/analytics/member-data-layer"
import { ERROR_MESSAGES, senderEmail } from "../../forms/gift-card-form/constants"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { ModalContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import AuthenticLoginStore from "../../../features/login/store/authentication.login.store"
import { handleCredEntered } from "../../../utils/analytics/events/NonEcommerce/credentials-entered-event"
import AuthenticRegistrationStore from "../../../features/registration/store/authentic.registration.store"
import {
  CheckBoxWrapper,
  EmailNumberTextField,
  EmailTextErrorMessage,
  TermsAndPrivacyTypography,
} from "./SSOLoginFormsStyles"

const SnackbarToast = dynamic(() => import("../../../utils/SnackbarToast"))
const LoadingSpinner = dynamic(() => import("../../../utils/SpinnerComponent"))

const SSOLoginEmailTextForm = ({ props }: any) => {
  const propItems = props?.tabs?.[1]?.tabItems?.[0]
  const errorTextMessage = propItems?.parameterMap?.[2]?.value || ""
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const IHCLContexts = useContext(IHCLContext)
  const modalContext = useContext(ModalContext)
  const PortableText = IHCLContexts!.PortableText

  const [email, setEmail] = useState<string>("")
  const [error, setError] = useState<boolean>(false)
  const [loader, setLoader] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<any>("")
  const [checkValue, setCheckValue] = useState<boolean>(false)
  const [apiErrorMessage, setApiErrorMessage] = useState<string>("")
  const [emailTextButtonDisable, setEmailTextButtonDisable] = useState<boolean>(false)

  const isEmailLogin = propItems?.singleContent?.length > 0
  const checkBoxToggleValue = () => setCheckValue(!checkValue)

  const gaStoreData = IHCLContexts?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const userStore = IHCLContexts?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const authenticLoginStore = modalContext?.getPageStore(PAGE_STORES.loginStore) as AuthenticLoginStore
  const registrationStore = modalContext?.getPageStore(PAGE_STORES.registrationStore) as AuthenticRegistrationStore

  const dataLayer = MemberDataLayer(userStore, gaStoreData)
  const formValidation = (isFormValid: any, id: any) => {
    setError(!isFormValid)
  }

  useEffect(() => {
    if (isEmailLogin ? email?.length > 0 && checkValue && !error : email?.length > 0 && !error) {
      setEmailTextButtonDisable(true)
    } else {
      setEmailTextButtonDisable(false)
    }
  }, [checkValue, email?.length, error, isEmailLogin])

  const handleChangeForm = (event: any) => {
    const { name, value } = event.target
    const { status, errorMsg, fieldName } = TextfieldValidator(name, value)
    setApiErrorMessage("")
    setErrorMessage((prev: any) => {
      return {
        ...prev,
        [fieldName]: errorMsg,
      }
    })
    formValidation(status, name)
    setEmail(event?.target?.value)
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
        }),
      )
    }
    if (response?.error === false) {
      setLoader(false)
      response?.data?.refId && userStore?.setUserRedId(response?.data?.refId)
      response?.data?.phoneMasked && userStore?.setUserEncryptedCredentials(response?.data?.phoneMasked)
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
        navigate(propItems?.primaryAction?.url, propItems?.primaryAction?.urlType)
      } else if (response?.data?.userType?.toLowerCase() === "new" && authenticLoginStore) {
        // login to sign up
        navigate(propItems?.secondaryAction?.url, propItems?.secondaryAction?.urlType)
        // setOpenErrorMessage(true)
        // setSnackMessage(ERROR_MESSAGES?.EXISTING_USER)
      } else if (response?.data?.userType?.toLowerCase() === "new" && registrationStore) {
        // sign up
        navigate(propItems?.parameterMap?.[1]?.value, propItems?.primaryAction?.urlType)
      } else if (
        (response?.data?.userType?.toLowerCase() === "existing" ||
          response?.data?.userType?.toLowerCase() === "migrated") &&
        registrationStore
      ) {
        // sign up to login
        navigate(propItems?.secondaryAction?.url, propItems?.secondaryAction?.urlType)
        // setOpenErrorMessage(true)
        // setSnackMessage(ERROR_MESSAGES?.NON_EXISTING_USER)
      } else if (authenticLoginStore && userStore?.userEnteredMembershipID !== "") {
        navigate(propItems?.primaryAction?.url, propItems?.primaryAction?.urlType)
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
      navigate(propItems?.primaryAction?.url, propItems?.primaryAction?.urlType)
    } else {
      setLoader(false)
      setApiErrorMessage(
        response?.data ||
          response?.data?.message ||
          response?.response?.data?.message ||
          response?.response?.data?.error ||
          "Network Error.!",
      )
    }
  }

  const handlePhoneKeyRestrictions = (event: any) => {
    if (event?.key === "Enter") {
      if (propItems.singleContent?.[0] && checkValue) {
        handleSubmit()
      }
    }
  }
  return (
    <Box>
      {loader && <LoadingSpinner />}
      <EmailNumberTextField
        placeholder={propItems?.subTitle}
        name={senderEmail}
        value={email}
        variant="standard"
        onChange={handleChangeForm}
        onKeyDown={handlePhoneKeyRestrictions}
      />
      {email?.length > 0 && error && (
        <Box sx={{ position: "absolute", width: isMobile ? "82%" : "35%" }}>
          <EmailTextErrorMessage>{errorTextMessage || errorMessage?.senderEmail}</EmailTextErrorMessage>
        </Box>
      )}

      {apiErrorMessage?.length > 0 && (
        <Box sx={{ position: "absolute", width: isMobile ? "82%" : "35%" }}>
          <EmailTextErrorMessage>{apiErrorMessage}</EmailTextErrorMessage>
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
          isDisable={emailTextButtonDisable}
          url={""}
          isActionButtonType={true}
          title={propItems?.primaryAction?.title}
          variant={propItems?.primaryAction?.variant}
          navigationType={propItems?.primaryAction?.urlType}
          onClick={() => {
            if (emailTextButtonDisable) {
              handleSubmit()
              handleCredEntered(
                "credentials_entered",
                propItems?.primaryAction?.urlType,
                propItems?.primaryAction?.url,
                propItems?.primaryAction?.title,
                dataLayer,
                userStore,
                props,
                "",
                email,
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
            },
          }}
        />
      )}
    </Box>
  )
}

export default SSOLoginEmailTextForm
