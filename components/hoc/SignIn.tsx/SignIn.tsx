import { theme } from "../../../lib/theme"
import { ActionProps } from "../../types"
import { UserStore } from "../../../store"
import { Box, Typography } from "@mui/material"
import RenderActionItem from "../actions/action-items-ui"
import { CustomCheckBox } from "../CustomCheckBox/Checkbox"
import { useMobileCheck } from "../../../utils/isMobilView"
import React, { useContext, useEffect, useState } from "react"
import { senderMobile } from "../../forms/gift-card-form/constants"
import { useAppNavigation } from "../../../utils/NavigationUtility"
import CountryCodeDropdown from "../../../utils/CountryCodeDropdown"
import { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
import { ERROR_MESSAGES } from "../../forms/gift-card-form/constants"
import { PortableText } from "../../../lib/portable-text-serializers"
import { PlaceholderUtil } from "../../../utils/placeholder-switch-cases"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { CountryCodeDropDownMobileStyles } from "../../forms/gift-card-form/styles"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { PageContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import AuthenticLoginStore from "../../../features/login/store/authentication.login.store"
import {
  BoxWrapper,
  MainBoxWrapper,
  StyledInputField,
  ErrorMessageTypography,
  StyledInputFieldWrapper,
  TermsAndContritionWrapper,
} from "./sign-in.style"
import { getRecaptchaToken } from "../../../utils/recaptcha"

interface childrenInterface {
  marks: any
  text: string
  _type: string
}
interface markDefsItems {
  href: string
  type: string
  _type: string
}
interface singleContentInterface {
  children: childrenInterface[]
  markDefs: markDefsItems[]
  style: string
  _type: string
}
interface signInInterface {
  primaryAction?: ActionProps
  parameterMap?: parameterMapInterface[]
  title: string
  description?: string
  secondaryAction: ActionProps
  singleContent: singleContentInterface[]
  variant?: string
}

interface parameterMapInterface {
  value: string
}
interface formErrorInterface {
  senderMobile?: {
    senderMobile: boolean
  }
}

const SignIn = ({
  primaryAction,
  title,
  parameterMap,
  secondaryAction,
  singleContent,
  description,
  variant,
}: signInInterface) => {
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const IHCLContexts = useContext(IHCLContext)
  const modalContext = useContext(PageContext)

  const [number, setNumber] = useState<string>("")
  const [formErrors, setFormErrors] = useState<boolean>(false)
  const [countryCode, setCountryCode] = useState<string>("+91")
  const [checkBoxValue, setCheckBoxValue] = useState<boolean>(false)
  const [emptyFieldCheck, setEmptyFieldCheck] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [text, setText] = useState<{ terms: string; label: string }>({
    terms: "",
    label: "",
  })

  //placeholder switch case
  useEffect(() => {
    PlaceholderUtil(parameterMap, setText)
  }, [parameterMap])

  //store
  const userStore = IHCLContexts?.getGlobalStore(
    GLOBAL_STORES.userStore
  ) as UserStore
  const authenticLoginStore = modalContext?.getPageStore(
    PAGE_STORES.loginStore
  ) as AuthenticLoginStore

  const handleChangeForm = (event: any) => {
    event?.target?.value?.length <= 10 && event?.target?.value[0] > 5
      ? setNumber &&
        setNumber(
          Math.max(0, parseInt(event.target.value)).toString().slice(0, 10)
        )
      : event?.target?.value?.length == 0 && setNumber && setNumber("")
    if (event?.target?.value?.length < 10 && event?.target?.value[0] > 5) {
      setFormErrors(true)
    } else {
      setFormErrors(false)
    }
    if (event?.target?.value?.length == 0) {
      setFormErrors(false)
    }
  }

  const handlePhoneKeyRestrictions = (event: any) => {
    if (event?.key === "Enter") {
      if (number?.length > 9) {
        handleSubmit()
      } else {
        setEmptyFieldCheck(true)
      }
    }
  }

  const captureCheckBoxValues = () => {
    setCheckBoxValue(!checkBoxValue)
  }

  const handleSubmit = async () => {
    const recaptchaGenerated = await getRecaptchaToken()
    userStore?.setUserCountryCode(countryCode)
    userStore.setUserMobileNumber(number)
    const response = await authenticLoginStore?.generateOTP(
      JSON.stringify({
        phone: number,
        recaptchaToken: recaptchaGenerated,
      })
    )
    if (!response?.error) {
      if (response?.data?.userType?.toLowerCase() === "existing") {
        primaryAction && navigate(primaryAction?.url, primaryAction?.urlType)
      } else if (response?.data?.userType?.toLowerCase() === "new") {
        secondaryAction &&
          navigate(secondaryAction?.url, secondaryAction?.urlType)
      } else {
        setErrorMessage(
          response?.response?.data?.message || ERROR_MESSAGES?.NETWORK_ERROR
        )
      }
    } else {
      setErrorMessage(
        response?.response?.data?.message || ERROR_MESSAGES?.NETWORK_ERROR
      )
    }
  }

  return (
    <MainBoxWrapper>
      <Typography
        mb={isMobile ? "6.094vw" : "3.125vw"}
        variant={isMobile ? "m-heading-s" : "heading-s"}>
        {title}
      </Typography>
      <BoxWrapper
        sx={{
          width:
            variant === "ihclForms.placeholders.login-form"
              ? DesktopPxToVw(700)
              : DesktopPxToVw(500),
        }}>
        <CountryCodeDropDownMobileStyles>
          <CountryCodeDropdown
            dropdownStyle={{
              marginLeft: isMobile ? MobilePxToVw(60) : DesktopPxToVw(170), //"170px",
              width: isMobile ? MobilePxToVw(500) : DesktopPxToVw(450),
            }}
            countryCode={countryCode}
            setCountryCode={setCountryCode}
            backgroundColor={
              isMobile ? theme.palette.background.paper : "default"
            }
          />
        </CountryCodeDropDownMobileStyles>
        <StyledInputFieldWrapper>
          <StyledInputField
            sx={{
              width:
                variant === "ihclForms.placeholders.login-form"
                  ? DesktopPxToVw(700)
                  : DesktopPxToVw(500),
            }}
            value={number}
            placeholder={isMobile ? parameterMap?.[0]?.value : description}
            name={senderMobile}
            onChange={(e: any) => handleChangeForm(e)}
            variant="standard"
            type="tel"
            inputProps={{ maxLength: 12 }}
            onKeyDown={(event: any) => handlePhoneKeyRestrictions(event)}
          />
        </StyledInputFieldWrapper>
      </BoxWrapper>
      {/* <ErrorMessageTypographyWrapper> */}
      {((formErrors) ||
        (emptyFieldCheck && number?.length === 0)) && (
        <ErrorMessageTypography variant={isMobile ? "m-body-s" : "body-s"}>
          {ERROR_MESSAGES?.PHONE_NUMBER}
        </ErrorMessageTypography>
      )}
      {/* </ErrorMessageTypographyWrapper> */}
      {errorMessage?.length > 0 && (
        <ErrorMessageTypography>{errorMessage}</ErrorMessageTypography>
      )}
      <TermsAndContritionWrapper
        m={isMobile ? `${MobilePxToVw(40)} 0vw` : `${DesktopPxToVw(40)} 0vw`}
        className="portableText"
        $isMobile={isMobile}>
        <CustomCheckBox
          withBorder={true}
          onChange={captureCheckBoxValues}
          checked={checkBoxValue}
          isMarginRight={isMobile ? MobilePxToVw(20) : DesktopPxToVw(20)}
        />

        {singleContent && (
          <Box
            sx={{
              span: {
                fontSize: isMobile
                  ? "2.813vw !important"
                  : "1.146vw !important",
              },
            }}>
            <PortableText blocks={singleContent?.[0]} />
          </Box>
        )}
        <Typography
          variant={isMobile ? "m-body-m" : "body-m"}
          sx={{ paddingLeft: "1vw" }}>
          {text?.terms}
        </Typography>
      </TermsAndContritionWrapper>
      <Box>
        {(primaryAction?.title || secondaryAction?.title) && (
          <RenderActionItem
            url={primaryAction?.url || secondaryAction?.url}
            isActionButtonType={true}
            title={primaryAction?.title || secondaryAction?.title}
            variant={primaryAction?.variant || secondaryAction?.variant}
            navigationType={primaryAction?.urlType || secondaryAction?.urlType}
            onClick={() => {
              if (number?.length > 9 && checkBoxValue) {
                handleSubmit()
              } else {
                setEmptyFieldCheck(true)
              }
            }}
            buttonStyles={{
              letterSpacing: "1.8px",
            }}
          />
        )}
      </Box>
    </MainBoxWrapper>
  )
}

export default SignIn
