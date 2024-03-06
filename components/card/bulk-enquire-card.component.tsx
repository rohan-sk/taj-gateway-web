import { theme } from "../../lib/theme"
import { Box, Stack, Typography } from "@mui/material"
import dynamic from "next/dynamic"
import React, { useContext, useEffect, useState, useRef } from "react"
import SnackbarToast from "../../utils/SnackbarToast"
import { useMobileCheck } from "../../utils/isMobilView"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { ActionProps, singleContentInterface } from "../types"
import { useAppNavigation } from "../../utils/NavigationUtility"
import CountryCodeDropdown from "../../utils/CountryCodeDropdown"
import {
  BULK_ENQUIRE_MAX_CARDS_QUANTITY,
  BULK_ENQUIRE_MIN_CARDS_QUANTITY,
  ERROR_MESSAGES,
  Error_icon,
} from "../forms/gift-card-form/constants"
import TextfieldValidator from "../../utils/validations/TextfieldValidator"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { handler as bulkGiftCardEnquireApi } from "../../features/notification/api/handlers/bulk-gift-card-enquire"
import { City, Name, Email, Mobile, Message, CardsQuantity } from "../modal/constants"
import {
  BulkEnquireContainer,
  BulkGCFormFieldsWrapper,
  FormWrapper,
  PrimaryActionErrorWrapperBox,
} from "./styles/card-with-experience-form"
import { ErrorMessageTypography } from "../forms/gift-card-form/styles"
import LoadingSpinner from "../../utils/SpinnerComponent"
import { triggerEvent } from "../../utils/analytics"
import { GAStore, UserStore } from "../../store"
import { GLOBAL_STORES } from "../../utils/Constants"
import { getCookie } from "../../utils/cookie"

import { useLoggedIn } from "../../utils/hooks/useLoggedIn"

import { MemberDataLayer } from "../../utils/analytics/member-data-layer"
import { acceptOnlyNumbers, restrictNumericSymbol } from "../forms/book-a-stay-form/utils"
import { PortableText } from "../../lib/portable-text-serializers"
import ReCAPTCHA from "react-google-recaptcha"
import captchaHandler from "../forms/common/utils/captchaHandler"
import { ReCaptchaStack } from "../forms/enquiry-forms/khazana-enquiry-form/khazana-enquiry-form.styles"
import { nameFieldsRestrictions } from "../forms/common/utils/nameFieldRestrictionsHandler"
import { InputTextField, LinkDisableBlockContentBox, MultilineInputText } from "../forms/common/styles"
import { ENQUIRE_NOW_SUBMIT } from "../../utils/analytics/constants"
const EnquireTextField = dynamic(() => import("../forms/common/form-input.component"))
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))
const MobileNumberField = dynamic(() => import("../forms/common/mobile-number-field.component"))
const FormErrorIcon = dynamic(() => import("../forms/common/form-components").then((module) => module.FormErrorIcon))

interface BulkEnquireCardComponentProps {
  items: any
  _key: string
  metadata: any
  title: string
  _type: string
  variant: string
  parentProps: number
  largeVariant: string
  PrimaryAction: ActionProps
  secondaryAction: ActionProps
  singleContent: singleContentInterface
  content: any
  analytics: any
}
const BulkEnquireCardComponent = ({
  title,
  items,
  PrimaryAction,
  secondaryAction,
  content,
  analytics,
  _type,
}: BulkEnquireCardComponentProps) => {
  type formValueType = {
    [Email]: string
    [Name]: string
    [Mobile]: string
    [CardsQuantity]: string
    [Message]: string
    [City]: string
  }
  type formErrorType = {
    [Email]?: boolean
    [Name]?: boolean
    [Mobile]?: boolean
    [CardsQuantity]?: boolean
    [Message]?: boolean
    [City]?: boolean
    reCaptcha?: boolean
  }

  type DisableFields = {
    [Email]: boolean
    [Name]: boolean
    [Mobile]: boolean
    CountryCodeValue: boolean
  }
  let initialValues = {
    [Email]: "",
    [Name]: "",
    [Mobile]: "",
    [CardsQuantity]: "",
    [Message]: "",
    [City]: "",
  }

  let FormErrors = {
    [Email]: false,
    [Name]: false,
    [Mobile]: false,
    [CardsQuantity]: false,
    [Message]: false,
    [City]: false,
    reCaptcha: false,
  }

  //utils
  const isLoggedIn = useLoggedIn()
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const Context = useContext(IHCLContext)

  const userStore = Context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore

  //states
  const [loader, setLoader] = useState<boolean>(false)
  const [formValues, setFormValues] = useState<formValueType>(initialValues)
  const [formErrors, setFormErrors] = useState<formErrorType>(FormErrors)
  const [countryCode, setCountryCode] = useState<string>("+91")
  const [openErrorMessage, setOpenErrorMessage] = useState<boolean>(false)
  const [snackMessage, setSnackMessage] = useState<string>("")
  const [disable, setDisable] = useState<DisableFields>({
    [Email]: false,
    [Name]: false,
    [Mobile]: false,
    CountryCodeValue: false,
  })
  const [userCode, setUserCode] = useState<string>("IN")
  const [isVerified, setIsVerified] = useState<boolean>(false)

  //global user store
  const gaStoreData = Context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const dataLayer = MemberDataLayer(userStore, gaStoreData)
  const customerHash = global?.localStorage?.getItem("customerHash") || ""
  const userFirstName = global?.localStorage?.getItem("userFirstName") || ""
  const userLastName = global?.localStorage?.getItem("userLastName") || ""
  const userCountryCode = global?.localStorage?.getItem("userCountryCode") || ""
  const userPhoneNumber = global?.localStorage?.getItem("userPhoneNumber") || ""
  const userEmail = global?.localStorage?.getItem("userEmail") || ""
  const userFullName = `${userFirstName} ${userLastName}`?.trim()
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const handleForm = (e: any) => {
    const { name, value } = e?.target
    const { status } = TextfieldValidator(name, value)
    setFormValues({
      ...formValues,
      [name]: value,
    })
    if (name === CardsQuantity) {
      setFormErrors((prev: any) => ({
        ...prev,
        [name]: value === "" ? true : Number(value) > BULK_ENQUIRE_MIN_CARDS_QUANTITY ? false : true,
      }))
    } else {
      setFormErrors({
        ...formErrors,
        [name]: !status,
      })
    }
  }

  const checkEmptyErrors = () => {
    let tempErrors: any = {
      [Name]: formErrors?.[Name],
      [Email]: formErrors?.[Email],
      [Mobile]: formErrors?.[Mobile],
    }
    let tempFormValues: any = { ...formValues }
    Object?.entries(tempErrors)?.forEach(([key, error]: any) => {
      tempErrors = {
        ...tempErrors,
        [key]: error === true ? true : tempFormValues?.[key]?.length === 0,
      }
    })
    setFormErrors((prev: any) => ({
      ...prev,
      ...tempErrors,
      [CardsQuantity]: formErrors?.[CardsQuantity]
        ? formErrors?.[CardsQuantity]
        : formValues?.[CardsQuantity] === ""
        ? true
        : false,
      reCaptcha: isVerified ? false : true,
    }))
  }

  const handleSubmit = async () => {
    setLoader(true)
    const bulkGiftCardEnquireApiResponse = await bulkGiftCardEnquireApi?.apiCall(
      JSON.stringify({
        customerName: formValues?.[Name],
        email: formValues?.[Email],
        mobile: formValues?.[Mobile],
        mobileCountryCode: countryCode,
        noOfCardsRequired: formValues?.[CardsQuantity] || null,
        location: formValues?.[City],
        enquiryContent: formValues?.[Message],
      }),
    )
    if (bulkGiftCardEnquireApiResponse?.error === false) {
      setLoader(false)
      if (bulkGiftCardEnquireApiResponse?.data?.cause) {
        navigate(secondaryAction?.url, secondaryAction?.urlType)
        setOpenErrorMessage(true)
        setSnackMessage(bulkGiftCardEnquireApiResponse?.data?.cause || ERROR_MESSAGES?.mandatoryFields)
      } else {
        navigate(PrimaryAction?.url, PrimaryAction?.urlType)
      }
    } else {
      setLoader(false)
      navigate(secondaryAction?.url, secondaryAction?.urlType)
      setOpenErrorMessage(true)
      setSnackMessage(bulkGiftCardEnquireApiResponse?.data?.message || ERROR_MESSAGES?.mandatoryFields)
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      setFormValues((prev: any) => ({
        ...prev,
        [Name]: userFullName,
        [Email]: userEmail,
        [Mobile]: userPhoneNumber,
      }))
      setCountryCode(userCountryCode || "+91")

      //setting disable fields
      setDisable((prev: any) => {
        return {
          ...prev,
          [Name]: userFullName?.length > 0,
          [Email]: userEmail?.length > 0,
          [Mobile]: userPhoneNumber?.length > 0,
          CountryCodeValue: userCountryCode?.length > 0,
        }
      })
    }
  }, [isLoggedIn, userCountryCode, userEmail, userFullName, userPhoneNumber])

  const handleEnquiry = () => {
    triggerEvent({
      action: ENQUIRE_NOW_SUBMIT,
      params: {
        ...dataLayer,
        eventName: title || "",
        link_text: PrimaryAction?.title,
        link_url: PrimaryAction?.url,
        buttonLinkName: PrimaryAction?.title,
        clientId: getCookie("_ga")?.slice(6),
        outbound: PrimaryAction?.urlType === "internal" ? false : true,
        current_location: formValues?.[City],
        product_type: "Gift Card",
        product_quantity: formValues?.[CardsQuantity] || null,
        option_Selected: PrimaryAction?.title,
        widget_title: title,
        widget_type: _type,
        pageSection: analytics?.sectionTitle?.[0],
      },
    })
  }

  useEffect(() => {
    if (isVerified) {
      setFormErrors((prev: any) => ({ ...prev, reCaptcha: false }))
    }
  }, [isVerified])

  return (
    <>
      {loader && <LoadingSpinner />}
      <BulkEnquireContainer>
        <SnackbarToast open={openErrorMessage} onClose={() => setOpenErrorMessage(false)} Message={snackMessage} />
        <Box textAlign={"center"}>
          <Typography variant={isMobile ? "m-heading-s" : "heading-s"}>{title}</Typography>
        </Box>
        <FormWrapper $isMobile={isMobile}>
          <BulkGCFormFieldsWrapper $webWidths={`1fr 1fr ${DesktopPxToVw(350)}`}>
            <EnquireTextField
              name={Name}
              inputProps={{
                maxLength: 50,
              }}
              value={formValues?.[Name]}
              disabled={disable?.[Name]}
              error={formErrors?.[Name]}
              helperText={items?.[0]?.errorText}
              placeholder={items?.[0]?.labelText}
              onChange={(e: any) => {
                nameFieldsRestrictions(e, handleForm)
              }}
            />
            <EnquireTextField
              name={Email}
              value={formValues?.[Email]}
              error={formErrors?.[Email]}
              disabled={disable?.[Email]}
              aria-disabled={disable?.[Email]}
              helperText={items?.[1]?.errorText}
              placeholder={items?.[1]?.labelText}
              onChange={(e: any) => handleForm(e)}
            />
            <MobileNumberField
              name={Mobile}
              formState={formValues}
              countryCode={countryCode}
              value={formValues?.[Mobile]}
              setFormState={setFormValues}
              setErrorState={setFormErrors}
              setCountryCode={setCountryCode}
              errorState={!!formErrors?.[Mobile]}
              helperText={items?.[2]?.errorText}
              placeholder={items?.[2]?.labelText}
              disable={disable?.[Mobile]}
            />
          </BulkGCFormFieldsWrapper>
          <BulkGCFormFieldsWrapper $webWidths="1fr 1fr">
            <EnquireTextField
              type="tel"
              name={CardsQuantity}
              value={formValues?.[CardsQuantity]}
              error={formErrors?.[CardsQuantity]}
              helperText={items?.[3]?.errorText}
              placeholder={items?.[3]?.labelText}
              onKeyDown={(e: any) => restrictNumericSymbol(e)}
              onChange={(e: any) => {
                const { value } = e?.target
                if (
                  !isNaN(value) &&
                  Number(value) < BULK_ENQUIRE_MAX_CARDS_QUANTITY &&
                  (value == 0 ? value?.length <= 1 : true)
                ) {
                  acceptOnlyNumbers(e, handleForm)
                }
              }}
            />
            <EnquireTextField
              name={City}
              value={formValues?.[City]}
              placeholder={items?.[4]?.labelText}
              onChange={(e: any) => {
                const { value } = e?.target
                if (value === "" || value?.match(/^[a-zA-Z ]{0,50}$/)) {
                  handleForm(e)
                }
              }}
            />
          </BulkGCFormFieldsWrapper>
          <Box sx={{ textAlign: "start" }}>
            <Typography
              variant={isMobile ? "m-body-l" : "body-l"}
              sx={{ marginBottom: isMobile ? "2.5vw" : "0.833vw" }}>
              {items?.[5]?.labelText}
            </Typography>
            <MultilineInputText
              sx={{
                marginTop: isMobile ? `${MobilePxToVw(33)}` : "1.563vw",
              }}
              multiline
              name={Message}
              autoComplete="off"
              variant="standard"
              value={formValues?.[Message]}
              InputProps={{
                autoComplete: "new-password",
              }}
              onChange={(e) => {
                if (String(e?.target?.value)?.match(/^[A-Za-z0-9,. ]{0,400}$/)) {
                  handleForm(e)
                }
              }}
            />
          </Box>
        </FormWrapper>
        <ReCaptchaStack>
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_NOTIFICATION_RECAPTCHA_SITE_KEY || ""}
            ref={recaptchaRef}
            onChange={(token: string | null) => {
              captchaHandler(token, setIsVerified)
            }}
          />
          {formErrors?.reCaptcha && (
            <ErrorMessageTypography
              sx={{
                alignSelf: "center",
              }}>
              {ERROR_MESSAGES?.EMPTY_RECAPTCHA}
            </ErrorMessageTypography>
          )}
        </ReCaptchaStack>
        <PrimaryActionErrorWrapperBox $isMobile={isMobile}>
          <RenderActionItem
            url={PrimaryAction?.url}
            title={PrimaryAction?.title}
            isActionButtonType={true}
            navigationType={PrimaryAction?.urlType}
            variant={PrimaryAction?.variant}
            buttonStyles={{
              lineHeight: "140%",
              letterSpacing: "1.8px",
            }}
            onClick={() => {
              if (
                !formErrors?.[Name] &&
                !formErrors?.[Email] &&
                !formErrors?.[Mobile] &&
                !formErrors?.[CardsQuantity] &&
                formValues?.[Name]?.length > 0 &&
                formValues?.[Email]?.length > 0 &&
                formValues?.[Mobile]?.length > 0 &&
                formValues?.[CardsQuantity] !== "" &&
                isVerified
              ) {
                handleSubmit()
                handleEnquiry()
              } else {
                checkEmptyErrors()
              }
            }}
          />
        </PrimaryActionErrorWrapperBox>
        <Stack
          sx={{
            mt: isMobile ? MobilePxToVw(90) : "1.563vw",
            alignItems: "center",
          }}>
          <Box sx={{ width: "100%", textAlign: "center" }}>
            {content &&
              content?.map((item: any, idx: number) => (
                <LinkDisableBlockContentBox
                  component="span"
                  sx={{ display: "inline" }}
                  isDisable={!isMobile && item?.content?.[0]?.markDefs?.[0]?.linkType === "mobile"}
                  key={idx}>
                  <PortableText blocks={item?.content} />
                </LinkDisableBlockContentBox>
              ))}
          </Box>
        </Stack>
      </BulkEnquireContainer>
    </>
  )
}

export default BulkEnquireCardComponent
