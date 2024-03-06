import React, { useContext, useEffect, useRef, useState } from "react"
import { theme } from "../../../../lib/theme"
import dynamic from "next/dynamic"
import { GAStore, UserStore } from "../../../../store"
import { GLOBAL_STORES } from "../../../../utils/Constants"
const SnackbarToast = dynamic(() => import("../../../../utils/SnackbarToast"))
import CountryJson from "../../loyalty-form/formData.json"
import { useMobileCheck } from "../../../../utils/isMobilView"
const LoadingSpinner = dynamic(() => import("../../../../utils/SpinnerComponent"))
const RenderActionItem = dynamic(() => import("../../../hoc/actions/action-items-ui"))
import { useAppNavigation } from "../../../../utils/NavigationUtility"
import { CalenderIcon } from "../../../../utils/customIcons"
const CountryCodeDropdown = dynamic(() => import("../../../../utils/CountryCodeDropdown"))
import { convertDateFormat, getDateBefore18Years } from "../../../../utils/getDate"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import TextfieldValidator from "../../../../utils/validations/TextfieldValidator"
import { Box, ClickAwayListener, Stack, Typography } from "@mui/material"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import { handler as tapEnquiryAPI } from "../../../../features/notification/api/handlers/tap-enquire"
import { handler as tapMeEnquiryAPI } from "../../../../features/notification/api/handlers/tap-me-enquire"
import {
  senderEmail,
  companyName,
  designation,
  senderMobile,
  customMessage,
  ERROR_MESSAGES,
  SalesCoordinatorName,
  senderFirstName,
  salutation,
  UserDateOfBirth,
  ExpectedNoOfNights,
  State,
  City,
} from "../../gift-card-form/constants"
import {
  ButtonsWrapper,
  ErrorMessageTypography,
  MainGridWrapper,
  TitleTypography,
  TapEnquireFormWrapper,
  NameStack,
  CommonStack,
} from "./tap-styles"
import salutationData from "../../../../utils/salutation-json.json"
import { triggerEvent } from "../../../../utils/analytics"
import { getCookie } from "../../../../utils/cookie"
import { useLoggedIn } from "../../../../utils/hooks/useLoggedIn"
import { MemberDataLayer } from "../../../../utils/analytics/member-data-layer"
const CustomDatePickerComponent = dynamic(() => import("../../../hoc/CustomDatePicker/custom-date-picker.component"))

import { acceptOnlyNumbers, restrictNumericSymbol } from "../../book-a-stay-form/utils"
import ReCAPTCHA from "react-google-recaptcha"
import { FunctionDateContainer } from "../wedding-enquire-forms/wedding-enquire-styles"
import captchaHandler from "../../common/utils/captchaHandler"
import { ReCaptchaStack } from "../khazana-enquiry-form/khazana-enquiry-form.styles"
import { nameFieldsRestrictions } from "../../common/utils/nameFieldRestrictionsHandler"
import { InputTextField, LinkDisableBlockContentBox, MultilineInputText } from "../../common/styles"
import { ENQUIRE_NOW_SUBMIT } from "../../../../utils/analytics/constants"
const EnquireDropDown = dynamic(() => import("../../common/form-drop-down-component"))
const MobileNumberField = dynamic(() => import("../../common/mobile-number-field.component"))
import { FormErrorIcon } from "../../common/form-components"
import { LoggedInUserDetails } from "../../common/utils/user-details"
import EnquireTextField from "../../common/form-input.component"

const TapEnquireComponent = (props: any) => {
  const isMobile = useMobileCheck()
  const isLoggedIn = useLoggedIn()
  const navigate = useAppNavigation()
  const context: any = useContext(IHCLContext)
  const PortableText = context!.PortableText

  const userStore = context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const dataLayer = MemberDataLayer(userStore, gaStoreData)
  const [date, setDate] = useState<Date>()
  const scrollRef = useRef<any>(null)
  const [userData, setUserData] = useState<any>()
  const [open, setOpen] = useState<boolean>(false)
  const [loader, setLoader] = useState<boolean>(false)
  const [snackMessage, setSnackMessage] = useState<string>("")
  const [countryCode, setCountryCode] = useState<string>("+91")
  const [openErrorMessage, setOpenErrorMessage] = useState<boolean>(false)
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const [emptyRecaptch, setEmptyRecaptch] = useState<boolean>(false)
  const [isVerified, setIsVerified] = useState(false)

  const [formValues, setFormValues] = useState<{
    [salutation]: string
    [senderFirstName]: string
    [senderMobile]: string
    [UserDateOfBirth]: string
    [senderEmail]: string
    [companyName]: string
    [designation]: string
    [ExpectedNoOfNights]: string
    [SalesCoordinatorName]: string
    [State]: string
    [City]: string
    [customMessage]: string
  }>({
    [salutation]: "",
    [senderFirstName]: "",
    [senderMobile]: "",
    [UserDateOfBirth]: "",
    [senderEmail]: "",
    [companyName]: "",
    [designation]: "",
    [ExpectedNoOfNights]: "",
    [SalesCoordinatorName]: "",
    [State]: "",
    [City]: "",
    [customMessage]: "",
  })

  const [formErrors, setFormErrors] = useState<{
    [salutation]: boolean
    [senderFirstName]: boolean
    [senderMobile]: boolean
    [UserDateOfBirth]: boolean
    [senderEmail]: boolean
    [companyName]: boolean
    [designation]: boolean
    [City]: boolean
    [State]: boolean
    reCaptcha: boolean
  }>({
    [salutation]: false,
    [senderFirstName]: false,
    [senderMobile]: false,
    [UserDateOfBirth]: false,
    [senderEmail]: false,
    [companyName]: false,
    [designation]: false,
    [City]: false,
    [State]: false,
    reCaptcha: false,
  })

  //user details
  const { userPhoneNumber, userSalutation, userCountryCode, userEmail, userFullName, userState, userCity, userDOB } =
    LoggedInUserDetails

  useEffect(() => {
    if (isLoggedIn) {
      setFormValues((prev: any) => ({
        ...prev,
        [salutation]:
          props?.items?.[0]?.clusterItems?.length > 0
            ? props?.items?.[0]?.clusterItems?.findIndex((item: any) => item?.key === userSalutation) >= 0
              ? userSalutation
              : ""
            : salutationData?.salutation?.findIndex((item: any) => item?.title === userSalutation) >= 0
            ? userSalutation
            : "",
        [senderFirstName]: userFullName,
        [senderEmail]: userEmail,
        [senderMobile]: userPhoneNumber,
        [City]: userCity,
        [State]: userState,
      }))
      setCountryCode(userCountryCode ? userCountryCode : "+91")
      if (userDOB) {
        const dateArr: any = userDOB?.split("-")
        if (Array?.isArray(dateArr) && dateArr?.length === 3) {
          const dateOfBirth = new Date(dateArr?.[0], dateArr?.[1] - 1, dateArr?.[2])
          setDate(dateOfBirth)
          setFormValues((prev: any) => ({
            ...prev,
            [UserDateOfBirth]: convertDateFormat(dateOfBirth)?.replaceAll("-", "/"),
          }))
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isLoggedIn,
    userCity,
    userCountryCode,
    userDOB,
    userEmail,
    userFullName,
    userPhoneNumber,
    userSalutation,
    userState,
  ])
  const handleChange = (e: any) => {
    const { name, value } = e?.target
    const { status } = TextfieldValidator(name, value)
    setFormValues({
      ...formValues,
      [name]: value,
    })
    setFormErrors({
      ...formErrors,
      [name]: !status,
    })
  }

  const handleSelectedValue = (e: any) => {
    const { name, value } = e?.target
    if (name === State) {
      setFormValues({
        ...formValues,
        [name]: value,
        [City]: "",
      })
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
      })
    }
    setFormErrors({
      ...formErrors,
      [name]: value ? value?.length === 0 : true,
    })
  }

  const handleDatePicker = (newValue: any) => {
    setDate(() => newValue)
    setFormErrors({
      ...formErrors,
      [UserDateOfBirth]: false,
    })
    setFormValues({
      ...formValues,
      [UserDateOfBirth]: convertDateFormat(newValue)?.replaceAll("-", "/"),
    })
    setOpen(newValue ? false : true)
  }
  const checkEmptyErrors = () => {
    let tempErrors: any = {
      [salutation]: formErrors?.[salutation],
      [senderFirstName]: formErrors?.[senderFirstName],
      [senderMobile]: formErrors?.[senderMobile],
      [senderEmail]: formErrors?.[senderEmail],
      [companyName]: formErrors?.[companyName],
      [designation]: formErrors?.[designation],
      [City]: formErrors?.[City],
      [State]: formErrors?.[State],
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
      [UserDateOfBirth]: date ? false : true,
      reCaptcha: isVerified ? false : true,
    }))
  }
  const handleSubmit = async () => {
    setLoader(true)
    if (props?.isTapForm) {
      const tapApiResponse = await tapEnquiryAPI?.apiCall(
        JSON.stringify({
          title: formValues?.[salutation],
          customerName: formValues?.[senderFirstName],
          companyName: formValues?.[companyName],
          designation: formValues?.[designation],
          email: formValues?.[senderEmail],
          mobile: formValues?.[senderMobile],
          dateOfBirth: convertDateFormat(date),
          expectedNightsInYear: formValues?.[ExpectedNoOfNights] ? `${Number(formValues?.[ExpectedNoOfNights])}` : "0",
          salesCoordinatorName: formValues?.[SalesCoordinatorName],
          city: formValues?.[City],
          state: formValues?.[State],
          mobileCountryCode: countryCode,
          enquiryContent: formValues?.[customMessage],
        }),
      )
      if (tapApiResponse?.error === false) {
        setLoader(false)
        if (tapApiResponse?.data?.cause) {
          navigate(props?.secondaryAction?.url, props?.secondaryAction?.urlType)
          // setOpenErrorMessage(true)
          // setSnackMessage(
          //   tapApiResponse?.data?.message || ERROR_MESSAGES?.mandatoryFields
          // )
        } else {
          navigate(props?.PrimaryAction?.url, props?.PrimaryAction?.urlType)
        }
      } else {
        setLoader(false)
        navigate(props?.secondaryAction?.url, props?.secondaryAction?.urlType)
        // setOpenErrorMessage(true)
        // setSnackMessage(ERROR_MESSAGES?.NETWORK_ERROR)
      }
    } else {
      const tapMeApiResponse = await tapMeEnquiryAPI?.apiCall(
        JSON.stringify({
          title: formValues?.[salutation],
          customerName: formValues?.[senderFirstName],
          companyName: formValues?.[companyName],
          designation: formValues?.[designation],
          email: formValues?.[senderEmail],
          mobile: formValues?.[senderMobile],
          dateOfBirth: convertDateFormat(date),
          expectedNightsInYear: formValues?.[ExpectedNoOfNights],
          salesCoordinatorName: formValues?.[SalesCoordinatorName],
          city: formValues?.[City],
          state: formValues?.[State],
          mobileCountryCode: countryCode,
          enquiryContent: formValues?.[customMessage],
        }),
      )
      if (tapMeApiResponse?.error === false) {
        setLoader(false)
        if (tapMeApiResponse?.data?.cause) {
          navigate(props?.secondaryAction?.url, props?.secondaryAction?.urlType)
          // setOpenErrorMessage(true)
          // setSnackMessage(
          //   tapMeApiResponse?.data?.message || ERROR_MESSAGES?.mandatoryFields
          // )
        } else {
          navigate(props?.PrimaryAction?.url, props?.PrimaryAction?.urlType)
        }
      } else {
        setLoader(false)
        navigate(props?.secondaryAction?.url, props?.secondaryAction?.urlType)
        // setOpenErrorMessage(true)
        // setSnackMessage(ERROR_MESSAGES?.DEFAULT_ERROR)
      }
    }
  }

  const handleScroll = () => {
    if (scrollRef?.current && !open) {
      const offset = 150
      if (isMobile) {
        const elementTop = scrollRef.current?.getBoundingClientRect().top
        const parentElement = global?.document?.getElementById("scrollable-form")
        if (elementTop >= 0) {
          parentElement?.scrollTo({
            top: elementTop + offset,
            behavior: "smooth",
          })
        }
      } else {
        const elementTop = scrollRef.current?.getBoundingClientRect().top
        scrollRef?.current?.scrollTo({
          top: elementTop + 20,
          behavior: "smooth",
        })
      }
    }

    if (isMobile) {
      if (global?.window?.document?.activeElement instanceof HTMLInputElement) {
        global?.window?.document?.activeElement.blur()
      }
    }
  }

  const handleEnquiry = () => {
    triggerEvent({
      action: ENQUIRE_NOW_SUBMIT,
      params: {
        ...dataLayer,
        eventName: props?.title,
        link_text: props?.PrimaryAction?.title,
        link_url: props?.PrimaryAction?.url,
        buttonLinkName: props?.PrimaryAction?.title,
        clientId: getCookie("_ga")?.slice(6),
        outbound: props?.PrimaryAction?.urlType === "internal" ? false : true,
        preferred_location: formValues?.[City],
        preferred_location_city: formValues?.[City],
        option_Selected: props?.PrimaryAction?.title,
        preferred_location_state: formValues?.[State],
        widget_title: props?.title,
        widget_type: props?._type,
        pageSection: props?.analytics?.sectionTitle?.[0],
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
      <TapEnquireFormWrapper ref={scrollRef}>
        <SnackbarToast open={openErrorMessage} onClose={() => setOpenErrorMessage(false)} Message={snackMessage} />
        <MainGridWrapper>
          <Box textAlign={"center"}>
            <TitleTypography
              variant={isMobile ? "m-heading-s" : "heading-s"}
              sx={{
                fontWeight: 300,
                marginBottom: isMobile ? MobilePxToVw(35) : DesktopPxToVw(40),
              }}>
              {props?.title}
            </TitleTypography>
          </Box>
          <NameStack>
            <Stack sx={{ width: "100%" }}>
              <EnquireDropDown
                label={props?.items?.[0]?.labelText}
                name={salutation}
                value={formValues?.[salutation]}
                items={
                  props?.items?.[0]?.clusterItems?.length > 0
                    ? props?.items?.[0]?.clusterItems
                    : salutationData?.salutation
                }
                property={props?.items?.[0]?.clusterItems?.length > 0 ? "key" : "title"}
                error={formErrors?.[salutation]}
                helperText={
                  props?.items?.[0]?.errorText ? props?.items?.[0]?.errorText : ERROR_MESSAGES?.empty_salutation
                }
                onChange={(e: any) => handleSelectedValue(e)}
              />
            </Stack>
            <EnquireTextField
              name={senderFirstName}
              inputProps={{ maxLength: 50 }}
              error={formErrors?.[senderFirstName]}
              value={formValues?.[senderFirstName]}
              helperText={props?.items?.[1]?.errorText}
              onChange={(e: any) => {
                nameFieldsRestrictions(e, handleChange)
              }}
              placeholder={props?.items?.[1]?.labelText}
              sx={{ width: isMobile ? "100%" : DesktopPxToVw(380) }}
            />
            <MobileNumberField
              name={senderMobile}
              formState={formValues}
              countryCode={countryCode}
              value={formValues?.[senderMobile]}
              setFormState={setFormValues}
              setErrorState={setFormErrors}
              setCountryCode={setCountryCode}
              errorState={formErrors?.[senderMobile]}
              helperText={props?.items?.[2]?.errorText}
              placeholder={props?.items?.[2]?.labelText}
            />
          </NameStack>
          <CommonStack>
            <Stack sx={{ width: "100%" }}>
              <Box
                onFocus={() => {
                  setOpen(true), handleScroll()
                }}>
                <ClickAwayListener onClickAway={() => setOpen(false)}>
                  <FunctionDateContainer $isOpen={open}>
                    <CustomDatePickerComponent
                      date={date}
                      isOpen={open}
                      sx={{
                        width: "100%",
                        height: "100%",
                      }}
                      defaultActiveStartDate={getDateBefore18Years()}
                      maxDate={getDateBefore18Years()}
                      onChange={handleDatePicker}
                      calendarIcon={() => <></>}
                      renderComponent={
                        <InputTextField
                          sx={{ width: "100%" }}
                          onKeyDown={(e: any) => e?.preventDefault()}
                          onFocus={(e: any) => setOpen(() => true)}
                          onClick={(e: any) => setOpen(() => true)}
                          variant="standard"
                          autoComplete="off"
                          placeholder={props?.items?.[3]?.labelText}
                          value={date ? convertDateFormat(date)?.replaceAll("-", "/") : ""}
                          helperText={
                            formErrors?.[UserDateOfBirth]
                              ? props?.items?.[3]?.errorText
                                ? props?.items?.[3]?.errorText
                                : ERROR_MESSAGES?.EMPTY_ADD_ON_DOB_ERROR
                              : ""
                          }
                          InputProps={{
                            endAdornment: formErrors?.[UserDateOfBirth] ? (
                              <FormErrorIcon />
                            ) : (
                              <Stack onClick={(prev: any) => setOpen(!prev)} justifyContent={"end"}>
                                <CalenderIcon
                                  sx={{
                                    height: "auto",
                                    width: isMobile ? MobilePxToVw(18) : DesktopPxToVw(18),
                                  }}
                                />
                              </Stack>
                            ),
                          }}
                        />
                      }
                      calendarWidth={isMobile ? MobilePxToVw(476) : DesktopPxToVw(578)}
                    />
                  </FunctionDateContainer>
                </ClickAwayListener>
              </Box>
            </Stack>
            <EnquireTextField
              name={senderEmail}
              inputProps={{ maxLength: 50 }}
              error={formErrors?.[senderEmail]}
              value={formValues?.[senderEmail]}
              onChange={(e: any) => handleChange(e)}
              helperText={props?.items?.[4]?.errorText}
              placeholder={props?.items?.[4]?.labelText}
              sx={{ width: isMobile ? "100%" : DesktopPxToVw(578) }}
            />
          </CommonStack>

          <CommonStack>
            <EnquireTextField
              name={companyName}
              sx={{ width: "100%" }}
              error={formErrors?.[companyName]}
              value={formValues?.[companyName]}
              helperText={props?.items?.[5]?.errorText}
              onChange={(e: any) => handleChange(e)}
              placeholder={props?.items?.[5]?.labelText}
            />
            <EnquireTextField
              name={designation}
              sx={{ width: "100%" }}
              error={formErrors?.[designation]}
              value={formValues?.[designation]}
              helperText={props?.items?.[6]?.errorText}
              onChange={(e: any) => {
                nameFieldsRestrictions(e, handleChange)
              }}
              placeholder={props?.items?.[6]?.labelText}
            />
          </CommonStack>
          <CommonStack>
            <EnquireTextField
              type="tel"
              sx={{ width: "100%" }}
              name={ExpectedNoOfNights}
              inputProps={{ maxLength: 3 }}
              onKeyDown={(e: any) => {
                restrictNumericSymbol(e)
              }}
              onChange={(e: any) => {
                acceptOnlyNumbers(e, handleChange)
              }}
              value={formValues?.[ExpectedNoOfNights]}
              helperText={props?.items?.[7]?.errorText}
              placeholder={props?.items?.[7]?.labelText}
            />
            <EnquireTextField
              sx={{ width: "100%" }}
              name={SalesCoordinatorName}
              onChange={(e: any) => handleChange(e)}
              value={formValues?.[SalesCoordinatorName]}
              placeholder={props?.items?.[8]?.labelText}
            />
          </CommonStack>
          <CommonStack>
            <EnquireDropDown
              label={props?.items?.[9]?.labelText}
              name={State}
              value={formValues?.[State]}
              items={CountryJson?.statesList?.filter((item: any) => item?.country === "India")?.[0]?.states}
              error={formErrors?.[State]}
              helperText={props?.items?.[9]?.errorText}
              property={"state"}
              onChange={(e: any) => handleSelectedValue(e)}
            />
            <EnquireDropDown
              label={props?.items?.[10]?.labelText}
              name={City}
              value={formValues?.[City]}
              items={CountryJson?.cityList?.filter((item: any) => item?.state === formValues?.[State])?.[0]?.city}
              error={formErrors?.[City]}
              helperText={props?.items?.[10]?.errorText}
              property={"city"}
              onChange={(e: any) => handleSelectedValue(e)}
            />
          </CommonStack>
          <Typography
            sx={{
              color: theme?.palette?.ihclPalette.hexSeventeen,
              fontSize: isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
            }}>
            {props?.items?.[11]?.labelText}
          </Typography>
          <MultilineInputText
            multiline
            autoComplete="off"
            variant="standard"
            name={customMessage}
            value={formValues?.[customMessage]}
            onChange={(e: any) => {
              if (e?.target?.value === "" || String(e?.target?.value)?.match(/^[A-Za-z0-9,. ]/)) {
                handleChange(e)
              }
            }}
            inputProps={{
              maxLength: 400,
            }}
          />
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
          <ButtonsWrapper>
            <RenderActionItem
              isActionButtonType={true}
              url={props?.PrimaryAction?.url}
              title={props?.PrimaryAction?.title}
              variant={props?.PrimaryAction?.variant}
              navigationType={props?.PrimaryAction?.urlType}
              buttonStyles={{
                minWidth: isMobile ? MobilePxToVw(222) : "12.563vw",
                display: "flex",
                margin: isMobile ? "6.525vw 0 9.375vw" : "2.083vw 0vw",
              }}
              onClick={() => {
                if (
                  formValues?.[salutation]?.length > 0 &&
                  formValues?.[senderFirstName]?.length > 0 &&
                  formValues?.[senderMobile]?.length > 0 &&
                  formValues?.[UserDateOfBirth]?.length > 0 &&
                  formValues?.[senderEmail]?.length > 0 &&
                  formValues?.[companyName]?.length > 0 &&
                  formValues?.[designation]?.length > 0 &&
                  formValues?.[City]?.length > 0 &&
                  formValues?.[State]?.length > 0 &&
                  !formErrors?.[salutation] &&
                  !formErrors?.[senderFirstName] &&
                  !formErrors?.[senderMobile] &&
                  !formErrors?.[UserDateOfBirth] &&
                  !formErrors?.[senderEmail] &&
                  !formErrors?.[companyName] &&
                  !formErrors?.[designation] &&
                  !formErrors?.[City] &&
                  !formErrors?.[State] &&
                  isVerified
                ) {
                  handleSubmit()
                  handleEnquiry()
                } else {
                  checkEmptyErrors()
                }
                if (emptyRecaptch === false) {
                  setEmptyRecaptch(() => true)
                }
              }}
            />
            <Box
              sx={{
                marginBottom: isMobile ? "12.813vw" : "",
                textAlign: "center",
              }}>
              {props?.content &&
                props?.content?.map((item: any, idx: number) => (
                  <LinkDisableBlockContentBox
                    isDisable={!isMobile && item?.content?.[0]?.markDefs?.[0]?.linkType === "mobile"}
                    component={"span"}
                    key={idx}>
                    <PortableText blocks={item?.content} />
                  </LinkDisableBlockContentBox>
                ))}
            </Box>
          </ButtonsWrapper>
        </MainGridWrapper>
      </TapEnquireFormWrapper>
    </>
  )
}

export default TapEnquireComponent
