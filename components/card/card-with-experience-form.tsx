import React, { useContext, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import TextfieldValidator from "../../utils/validations/TextfieldValidator"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { theme } from "../../lib/theme"
import { handler as experienceApi } from "../../features/notification/api/handlers/experience-enquire"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { Box, Typography } from "@mui/material"

import { CountryCodeDropdownBox } from "../forms/gift-card-form/styles"
import { Email, Mobile, Name, YourEnquiry, Experience, TimeToCall } from "../forms/gift-card-form/constants"
import {
  BoxButton,
  BoxText,
  ErrorMessageTypography,
  ExperienceFormWrapper,
  InputRow,
  InputTextField,
  MandatoryErrorField,
} from "../card/styles/card-with-experience-form"
import { useMobileCheck } from "../../utils/isMobilView"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { FullBox } from "../forms/business-form/business-sme-form"
import { GLOBAL_STORES } from "../../utils/Constants"
import { GAStore, PropertyStore, UserStore } from "../../store"
import { triggerEvent } from "../../utils/analytics"
import { getCookie } from "../../utils/cookie"
import { MemberDataLayer } from "../../utils/analytics/member-data-layer"
import { acceptOnlyNumbers, getBusinessRecipientEmails, restrictNumericSymbol } from "../forms/book-a-stay-form/utils"
import { observer } from "mobx-react-lite"
import MemoizedHotelContactData from "./hotel-contact-text.component"
import { ENQUIRE_NOW_SUBMIT } from "../../utils/analytics/constants"
import { FormErrorIcon } from "../forms/common/form-components"
import { MultilineInputText } from "../forms/common/styles"
const CountryCodeDropdown = dynamic(() => import("../../utils/CountryCodeDropdown"))
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))
const SnackbarToast = dynamic(() => import("../../utils/SnackbarToast"))
const EnquireDropDown = dynamic(() => import("../forms/common/form-drop-down-component"))
const LoadingSpinner = dynamic(() => import("../../utils/SpinnerComponent"))

export type ExperienceFormValues = {
  [Email]: string
  [Name]: string
  [Mobile]: string
  [YourEnquiry]: string
  [Experience]: string
}
type ExperienceDisableFields = {
  [Name]: boolean
  [Email]: boolean
  [Mobile]: boolean
  countryCodeValue: boolean
}

const CardWithExperienceEnquiry = (props: any) => {
  let data = {
    therapy: [
      {
        type: "Jiva",
      },
      {
        type: "Wellness",
      },
      {
        type: "Venues",
      },
    ],
    enquire: "ENQUIRE",
  }

  let initialValues = {
    [Email]: "",
    [Name]: "",
    [Mobile]: "",
    [YourEnquiry]: "",
    [Experience]: "",
  }
  let FormErrors = {
    [Email]: false,
    [Name]: false,
    [Mobile]: false,
    [TimeToCall]: false,
  }
  let initialDisableValues: ExperienceDisableFields = {
    [Name]: false,
    [Email]: false,
    [Mobile]: false,
    countryCodeValue: false,
  }
  const [formValues, setFormValues] = useState<ExperienceFormValues>(initialValues)
  const [formErrors, setFormErrors] = useState<any>(FormErrors)
  const [ErrorMessage, setErrorMessage] = useState<any>()
  const [countryCode, setCountryCode] = useState<string>("+91")
  const [openErrorMessage, setOpenErrorMessage] = useState<boolean>(false)
  const [snackMessage, setSnackMessage] = useState<string>("")
  const navigate = useAppNavigation()
  const isMobile = useMobileCheck()
  const [loader, setLoader] = useState<boolean>(false)
  const [userData, setUserData] = useState<any>({})
  const [disable, setDisable] = useState<ExperienceDisableFields>(initialDisableValues)

  const Context = useContext(IHCLContext)
  const propertyStore = Context?.getGlobalStore(GLOBAL_STORES?.propertyStore) as PropertyStore
  const userStore = Context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const customerHash = global?.localStorage?.getItem("customerHash")
  const context = useContext(IHCLContext)
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const dataLayer = MemberDataLayer(userStore, gaStoreData)

  useEffect(() => {
    if (customerHash || userStore?.userDetails?.userHash) {
      setLoader(true)
      userStore?.getUserData().then((data: any) => {
        if (data?.error === false) {
          setLoader(false)
          setUserData(data?.data)
        } else {
          setLoader(false)
        }
      })
    }
  }, [customerHash, userStore])
  useEffect(() => {
    if (customerHash || userStore?.userDetails?.userHash) {
      setFormValues((prev: any) => {
        return {
          ...prev,
          [Name]: userData?.nameDetails?.firstName?.length > 0 ? userData?.nameDetails?.firstName : "",
          [Email]: userData?.primaryEmailId?.length > 0 ? userData?.primaryEmailId : "",
          [Mobile]: userData?.primaryMobile?.phoneNumber?.length > 0 ? userData?.primaryMobile?.phoneNumber : "",
        }
      })
      setCountryCode(userData?.primaryMobile?.isdCode?.length > 0 ? userData?.primaryMobile?.isdCode : "+91")
      setDisable((prev: any) => {
        return {
          ...prev,
          [Name]: !(
            userData?.nameDetails?.firstName?.length <= 0 ||
            userData?.nameDetails?.firstName === undefined ||
            userData?.nameDetails?.firstName === null
          ),
          [Email]: !(
            userData?.primaryEmailId?.length <= 0 ||
            userData?.primaryEmailId === undefined ||
            userData?.primaryEmailId === null
          ),
          [Mobile]: !(
            userData?.primaryMobile?.phoneNumber?.length <= 0 ||
            userData?.primaryMobile?.phoneNumber === undefined ||
            userData?.primaryMobile?.phoneNumber === null
          ),
          countryCodeValue: !(
            userData?.primaryMobile?.isdCode?.length <= 0 ||
            userData?.primaryMobile?.isdCode === undefined ||
            userData?.primaryMobile?.isdCode === null
          ),
        }
      })
    }
  }, [customerHash, userStore, userData])

  const formValidation = (isFormValid: any, id: any) => {
    setFormErrors({ ...formErrors, [id]: !isFormValid })
  }
  const handleChangeForm = (event: any) => {
    const { name, value } = event.target
    const { status, errorMsg } = TextfieldValidator(name, value)
    setErrorMessage((prevErrorMessages: any) => ({
      ...prevErrorMessages,
      [name]: errorMsg,
    }))
    setFormValues((prev: any) => {
      return {
        ...prev,
        [name]: event?.target?.value,
      }
    })
    formValidation(status, name)
  }

  const handleSubmit = async () => {
    setLoader(true)
    const experienceApiResponse = await experienceApi?.apiCall(
      JSON.stringify({
        customerName: formValues?.Name,
        email: formValues?.Email,
        gazeboExperience: formValues?.Experience,
        mobile: formValues?.Mobile,
        mobileCountryCode: countryCode,
        enquiryContent: formValues?.[YourEnquiry],
        businessRecipientEmail: getBusinessRecipientEmails(propertyStore, "experiences"),
      }),
    )
    if (experienceApiResponse?.error === false) {
      setLoader(false)
      if (experienceApiResponse?.data?.cause) {
        navigate(props?.secondaryAction?.url, props?.secondaryAction?.urlType)
        // setOpenErrorMessage(true)
        // setSnackMessage(
        //   experienceApiResponse?.data?.message ||
        //     ERROR_MESSAGES?.mandatoryFields
        // )
      } else {
        navigate(props?.PrimaryAction?.url, props?.PrimaryAction?.urlType)
      }
    } else {
      setLoader(false)
      navigate(props?.secondaryAction?.url, props?.secondaryAction?.urlType)
      // setOpenErrorMessage(true)
      // setSnackMessage(ERROR_MESSAGES?.mandatoryFields)
    }
  }
  const handleEnquiry = () => {
    triggerEvent({
      action: ENQUIRE_NOW_SUBMIT,
      params: {
        ...dataLayer,

        eventType: formValues?.[Experience],
        eventName: props?.title,
        eventPlace: "",
        eventTicketsQty: "",
        eventDate: "",
        link_text: props.PrimaryAction?.title,
        link_url: props.PrimaryAction?.url,
        buttonLinkName: props.PrimaryAction?.title,
        clientId: getCookie("_ga")?.slice(6),
        visitSource: "",
        outbound: props?.PrimaryAction?.urlType === "internal" ? false : true,
      },
    })
  }
  return (
    <>
      {loader && <LoadingSpinner />}
      <ExperienceFormWrapper
        sx={{
          backgroundColor: theme?.palette?.background?.default,
        }}>
        <SnackbarToast open={openErrorMessage} onClose={() => setOpenErrorMessage(false)} Message={snackMessage} />
        <Box
          textAlign={"center"}
          sx={{
            marginBottom: isMobile ? "9.375vw" : "2.865vw",
          }}>
          <Typography variant={isMobile ? "m-heading-s" : "heading-s"} sx={{ fontWeight: 300 }}>
            {props?.title}
          </Typography>
        </Box>

        <InputRow>
          <InputTextField
            disabled={disable?.[Name]}
            aria-disabled={disable?.[Name]}
            $width={"100%"}
            placeholder={props?.items?.[0]?.labelText}
            variant="standard"
            name={Name}
            value={formValues?.Name}
            error={formErrors?.Name}
            helperText={formErrors?.Name ? ErrorMessage?.Name : ""}
            onChange={(e) => handleChangeForm(e)}
            InputProps={{
              endAdornment: (
                <>
                  {formErrors?.Name &&
                    (formValues?.Name?.length === 0 || formValues?.Name === null || formValues?.Name == undefined) && (
                      <FormErrorIcon />
                    )}
                </>
              ),
            }}
          />
          <InputTextField
            $width={"100%"}
            disabled={disable?.[Email]}
            aria-disabled={disable?.[Email]}
            placeholder={props?.items?.[1]?.labelText}
            variant="standard"
            name={Email}
            error={formErrors?.[Email]}
            value={formValues?.[Email]}
            helperText={formErrors?.[Email] ? ErrorMessage?.[Email] : ""}
            onChange={(e) => handleChangeForm(e)}
            InputProps={{
              endAdornment: (
                <>
                  {formErrors?.Email &&
                    (formValues?.Email?.length === 0 ||
                      formValues?.Email === null ||
                      formValues?.Email == undefined) && <FormErrorIcon />}
                </>
              ),
            }}
          />
        </InputRow>
        <InputRow $mobile={isMobile} sx={{ alignItems: "end" }}>
          <Box>
            <CountryCodeDropdownBox>
              <CountryCodeDropdown
                countryCode={countryCode}
                setCountryCode={setCountryCode}
                isDisable={disable?.countryCodeValue}
                dropdownStyle={{
                  margin: isMobile ? `0 0 0 ${MobilePxToVw(63)}` : `0 0 0 ${DesktopPxToVw(245)}`,
                  width: isMobile ? "75vw" : "31.2vw",
                }}
              />
              <FullBox>
                <InputTextField
                  disabled={disable?.[Mobile]}
                  aria-disabled={disable?.[Mobile]}
                  $width={"100%"}
                  name={Mobile}
                  sx={{
                    "& input": {
                      marginLeft: isMobile ? "3.75vw" : "1.25vw",
                      "&::placeholder": {
                        marginLeft: isMobile ? "3.75vw" : "1.25vw",
                      },
                    },
                  }}
                  placeholder={props?.items?.[2]?.labelText}
                  type="tel"
                  value={formValues.Mobile}
                  error={formErrors.Mobile}
                  onKeyDown={restrictNumericSymbol}
                  onChange={(e: any) => {
                    acceptOnlyNumbers(e, handleChangeForm)
                  }}
                  variant="standard"
                  InputProps={{
                    endAdornment: (
                      <>
                        {formErrors?.Mobile &&
                          (formValues?.Mobile?.length === 0 ||
                            formValues?.Mobile === null ||
                            formValues?.Mobile == undefined) && <FormErrorIcon />}
                      </>
                    ),
                  }}
                />
              </FullBox>
            </CountryCodeDropdownBox>
            {formErrors?.Mobile && <ErrorMessageTypography>{ErrorMessage?.[Mobile]}</ErrorMessageTypography>}
          </Box>
          <Box>
            <EnquireDropDown
              label={props?.items?.[3]?.labelText}
              name={Experience}
              value={formValues?.[Experience]}
              items={props?.items?.[3]?.clusterItems?.length > 0 ? props?.items?.[3]?.clusterItems : data?.therapy}
              property={props?.items?.[0]?.clusterItems?.length > 0 ? "key" : "type"}
              error={formErrors?.[Experience] && formValues?.[Experience]?.length === 0}
              helperText={ErrorMessage?.[Experience]}
              onChange={(e: any) => handleChangeForm(e)}
            />
          </Box>
        </InputRow>
        <BoxText>
          <MandatoryErrorField>{props?.items?.[4]?.labelText}</MandatoryErrorField>
          <MultilineInputText
            multiline
            sx={{
              width: "100%",
            }}
            variant="standard"
            name={YourEnquiry}
            value={formValues?.[YourEnquiry]}
            onChange={(event: any) => {
              const { value } = event?.target
              if (value.match(/^[A-Za-z0-9., ]{0,400}$/)) handleChangeForm(event)
            }}
            inputProps={{
              maxLength: 400,
            }}
          />
        </BoxText>
        <BoxButton>
          <RenderActionItem
            url={props.PrimaryAction?.url}
            title={props.PrimaryAction?.title}
            variant={props.PrimaryAction?.variant}
            navigationType={props.PrimaryAction?.urlType}
            isActionButtonType={true}
            buttonStyles={{
              padding: isMobile ? "2.813vw 5.625vw" : "0.938vw 1.875vw",
              whiteSpace: "nowrap",
              alignSelf: "center",
              letterSpacing: "1.8px",
            }}
            onClick={() => {
              if (
                formValues?.[Email]?.length > 0 &&
                formValues?.[Name]?.length > 0 &&
                formValues?.[Mobile]?.length > 0 &&
                formErrors?.[Email] === false &&
                formErrors?.[Name] === false &&
                formErrors?.[Mobile] === false
              ) {
                handleSubmit()
                handleEnquiry()
              } else {
                if (
                  formValues?.[Email]?.length === 0 ||
                  formValues?.[Name]?.length === 0 ||
                  formValues?.[Mobile]?.length === 0
                ) {
                  setFormErrors((previousErrors: any) => ({
                    ...previousErrors,
                    [Name]:
                      formValues?.[Name]?.length > 0 ? !TextfieldValidator(Name, formValues?.[Name])?.status : true,
                    [Email]:
                      formValues?.[Email]?.length > 0 ? !TextfieldValidator(Email, formValues?.[Email])?.status : true,
                    [Mobile]:
                      formValues?.[Mobile]?.length > 0
                        ? !TextfieldValidator(Mobile, formValues?.[Mobile])?.status
                        : true,
                  }))
                  setErrorMessage((previousErrorMessages: any) => ({
                    ...previousErrorMessages,
                    [Name]: TextfieldValidator(Name, formValues?.[Name])?.errorMsg,
                    [Email]: TextfieldValidator(Email, formValues?.[Email])?.errorMsg,
                    [Mobile]: TextfieldValidator(Mobile, formValues?.[Mobile])?.errorMsg,
                  }))
                }
              }
            }}
          />
        </BoxButton>

        {props?.singleContent && (
          <Box
            sx={{
              marginTop: isMobile ? MobilePxToVw(205) : DesktopPxToVw(54),
              textAlign: "center",
              paddingBottom: isMobile ? "10.313vw" : "",
            }}>
            {props?.singleContent && (
              <MemoizedHotelContactData singleContent={props?.singleContent} propertyStore={propertyStore} />
            )}
          </Box>
        )}
      </ExperienceFormWrapper>
    </>
  )
}

export default observer(CardWithExperienceEnquiry)
