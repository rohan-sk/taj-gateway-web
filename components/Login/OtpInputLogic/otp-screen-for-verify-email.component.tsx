import React, { useContext, useEffect, useState } from "react"
import { UserStore } from "../../../store"
import { observer } from "mobx-react-lite"
import { theme } from "../../../lib/theme"
import { CONSTANTS } from "../../constants"
import { Box, Typography } from "@mui/material"
import EmailMask from "../../../utils/email-mask"
import { OTPScreenInterface } from "../login-form.types"
import ModalStore from "../../../store/global/modal.store"
import { useMobileCheck } from "../../../utils/isMobilView"
import LoadingSpinner from "../../../utils/SpinnerComponent"
import { getRecaptchaToken } from "../../../utils/recaptcha"
import { OtpComponentLogic } from "./OtpInput/OtpComponentLogic"
import RenderActionItem from "../../hoc/actions/action-items-ui"
import MobileOtpTimer from "./OtpInput/mobile-otp-timer.component"
import { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { generateCodeVerifier } from "../../../utils/sso/generate-code-verifier"
import { generateCodeChallenge } from "../../../utils/sso/generate-code-challenge"
import { ERROR_MESSAGES } from "../../forms/gift-card-form/constants"
import AccountStore from "../../../features/my-account/store/pageStore/account.store"
import { PageContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import AuthenticLoginStore from "../../../features/login/store/authentication.login.store"
import {
  ErrorMessages,
  MainBoxContainer,
  MainBoxWrapper,
  ResendOtpText,
  ResendOtpWrapper,
  StyledClearIcon,
  SubTitleWrapper,
} from "../Styles/OtpStyled"

const OtpScreenVerifyEmail = (props: OTPScreenInterface) => {
  const items = props?.data || props
  const primaryAction = items?.primaryAction
  const mobileTitle = items?.parameterMap?.[0]?.value
  const mobileSubTitle = items?.parameterMap?.[1]?.value
  //use states
  const [invalidOtp, setIsInvalidOtp] = useState<boolean>(false)
  const [counter, setCounter] = useState<number>(180)
  const [otp, setOtp] = useState<string>("")
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [otpExpired, setOtpExpired] = useState<string>("")
  const [otpExpiredTimer, setOtpExpiredTimer] = useState<boolean>(false)
  const [loader, setLoader] = useState<boolean>(false)
  const [resendOtp, setResendOtp] = useState(false)
  const [showContinueBtn, setShowContinueBtn] = useState(true)
  const [hideOtpScreen, setHideOtpScreen] = useState<boolean>(false)
  const [activeCounter, setActiveCounter] = useState<boolean>(true)
  const [reSetCounter, setReSetCounter] = useState<boolean>(false)
  const [otpLink, setOtpLink] = useState<boolean>(false)
  const isMobile = useMobileCheck()
  const IHCLContexts = useContext(IHCLContext)
  const pageContext = useContext(PageContext)
  const modalStore = ModalStore.getInstance()

  const authenticLoginStore = pageContext?.getPageStore(PAGE_STORES.loginStore) as AuthenticLoginStore

  //store
  const userStore = IHCLContexts?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore

  const accountStore = pageContext?.getPageStore(PAGE_STORES.ACCOUNT_STORES.myAccountStore) as AccountStore

  const VerifyHandler = async () => {
    setLoader(true)
    let response: any
    let codeVerifier: any
    let codeChallenge: any
    const refId: string = userStore?.refId
    codeVerifier = generateCodeVerifier()
    codeChallenge = generateCodeChallenge(codeVerifier)
    if (userStore?.emailChangeRequest) {
      response = await authenticLoginStore?.verifyChangeEmailOTP(
        JSON.stringify({
          email: userStore.userEmailID,
          otp: otp,
          refId: refId,
          codeVerifier: codeVerifier,
          codeChallenge: codeChallenge,
        }),
      )
    } else {
      let res = await authenticLoginStore?.verifyEmailOTP(
        JSON.stringify({
          email: userStore.userEmailID,
          otp: otp,
          refId: refId,
          codeVerifier: codeVerifier,
          codeChallenge: codeChallenge,
        }),
      )
      if (res?.error) {
        response = await res?.response
      } else {
        response = res
      }
    }
    if (response?.data?.code == "SSO-1072") {
      setHideOtpScreen(true)
      setShowContinueBtn(false)
      setLoader(false)
      setError(true)
      setResendOtp(!resendOtp)
      setErrorMessage(response?.data?.message)
      setOtp("")
    }
    if (response?.response?.data?.code == "SSO-1049") {
      setLoader(false)
      setActiveCounter(false)
    } else {
      setLoader(false)
      setActiveCounter(true)
    }
    if (response?.data?.code === "SSO-1048") {
      setLoader(false)
      setError(true)
      setErrorMessage(response?.data?.message)
      setOtp("")
    }
    if (response?.data?.message && response?.error) {
      setLoader(false)
      setError(true)
      setResendOtp(!resendOtp)
      setErrorMessage(response?.data?.message)
      setOtp("")
    } else if (response?.data?.code == "SSO-1051") {
      setLoader(false)
      setError(true)
      setResendOtp(!resendOtp)
      setErrorMessage(response?.data?.message)
      setOtp("")
    } else if (response?.data?.success) {
      setLoader(false)
      modalStore?.closeModal()
      userStore?.setUserRedId("")
      accountStore && accountStore?.updateEmailChangeRequestedSuccess(true)
    } else {
      setLoader(false)
      setResendOtp(!resendOtp)
      setOtp("")
      console.log("error", response)
    }
  }

  const handleResendOtp = async () => {
    let response: any
    if (userStore?.emailChangeRequest) {
      const recaptchaGenerated = await getRecaptchaToken()
      response = await authenticLoginStore?.generateEmailOTP(
        JSON.stringify({
          email: userStore.userEmailID || global?.localStorage?.getItem("userEmail"),
          sendOtp: true,
          recaptchaToken: recaptchaGenerated,
        }),
      )
      setLoader(true)
    }
    if (response?.error == false && response?.status === 201) {
      response?.data?.refId && userStore?.setUserRedId(response?.data?.refId)
      setLoader(false)
      setResendOtp(!resendOtp)
      setError(false)
      setOtp("")
      setCounter(180)
      setOtpExpiredTimer(false)
      setActiveCounter(true)
      setReSetCounter(true)
      setError(true)
      setErrorMessage(response?.data?.message)
    } else if (response?.error == true) {
      if (response?.response?.data?.code === "SSO-1115") {
        setHideOtpScreen(true)
      }
      setLoader(false)
      setErrorMessage(response?.data || response?.response?.data?.message || "Network Error.!")
    }
  }

  const handleCloseIcon = () => {
    setHideOtpScreen(false)
    userStore?.clearUserEmailID()
    modalStore?.closeModal()
    userStore?.setUserRedId("")
  }

  useEffect(() => {
    if (otp?.length > 5 && (activeCounter || (activeCounter && otp?.length > 5)) && !loader) {
      VerifyHandler()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCounter, otp?.length])

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
            <Typography
              variant={isMobile ? "m-body-l" : "body-l"}
              sx={{
                fontFamily: "Inter",
                lineHeight: isMobile ? "140%" : "",
                fontSize: isMobile ? "2.813vw" : "1.146vw",
                textAlign: "center",
              }}>
              {items?.title}
            </Typography>
          )}
          <SubTitleWrapper
            variant={isMobile ? "m-body-m" : "body-m"}
            sx={{
              fontSize: isMobile ? "2.813vw" : "1.146vw",
              fontWeight: 300,
              color: theme?.palette?.ihclPalette?.hexSeventeen,
            }}>
            {items?.subtitle} &nbsp;
            {userStore?.userEmailID !== "" && <> {EmailMask(userStore?.userEmailID)} </>}
          </SubTitleWrapper>
        </MainBoxContainer>
        <OtpComponentLogic
          setOtp={setOtp}
          otp={otp}
          invalidOtp={invalidOtp}
          resendOtp={resendOtp}
          setIsInvalidOtp={setIsInvalidOtp}
          VerifyHandler={() => {
            if (counter > 0 && otp?.length > 5) {
              VerifyHandler()
            }
          }}
        />
        <ResendOtpWrapper
          sx={{
            justifyContent: hideOtpScreen ? "center" : "normal",
            height: "100%",
            padding: hideOtpScreen ? (isMobile ? MobilePxToVw(50) : DesktopPxToVw(20)) : "0vw",
            gap: hideOtpScreen ? (isMobile ? MobilePxToVw(30) : DesktopPxToVw(30)) : "0vw",
          }}>
          {hideOtpScreen && error && errorMessage && (
            <ErrorMessages variant={isMobile ? "m-body-m" : "body-m"} sx={{ margin: "0vw" }}>
              {errorMessage}
            </ErrorMessages>
          )}
          {!hideOtpScreen && otp?.length === 0 && errorMessage && (
            <ErrorMessages variant={isMobile ? "m-body-m" : "body-m"} sx={{ margin: "1vw 0vw 0vw 0vw" }}>
              {errorMessage}
            </ErrorMessages>
          )}
          {otpExpired?.length > 0 && !activeCounter && !hideOtpScreen && (
            <ErrorMessages
              variant={isMobile ? "m-body-m" : "body-m"}
              sx={{ margin: "1vw 0vw", width: "60%", textAlign: "center" }}>
              {otpExpired}
            </ErrorMessages>
          )}
          <Box sx={{ display: "flex" }}>
            {activeCounter && !hideOtpScreen ? (
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
                {!otpExpiredTimer && !hideOtpScreen && (
                  <ResendOtpText
                    variant={isMobile ? "m-body-m" : "body-s"}
                    onClick={() => handleResendOtp()}
                    sx={{ marginTop: "0px" }}>
                    {CONSTANTS?.RESEND_OTP}
                  </ResendOtpText>
                )}
              </>
            )}
            {activeCounter && otpLink && !hideOtpScreen && (
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
          {showContinueBtn && !hideOtpScreen && (counter > 0 || (counter > 1 && otp?.length > 0)) && (
            <RenderActionItem
              url={primaryAction?.url}
              title={primaryAction?.title}
              variant={primaryAction?.variant}
              navigationType={primaryAction?.urlType}
              isActionButtonType={true}
              onClick={() => {
                if (otp?.length > 5 && (activeCounter || (activeCounter && otp?.length > 5)) && !loader) {
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

export default observer(OtpScreenVerifyEmail)
