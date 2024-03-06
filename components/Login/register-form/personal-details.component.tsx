import { UserStore } from "../../../store"
import { observer } from "mobx-react-lite"
import { theme } from "../../../lib/theme"
import { urlFor } from "../../../lib-sanity"
import { CalenderIcon } from "../../../utils/customIcons"
import { useMobileCheck } from "../../../utils/isMobilView"
import MSitePersonalDetails from "./m-site-personal-details"
import { getRecaptchaToken } from "../../../utils/recaptcha"
import salutationData from "../../../utils/salutation-json.json"
import CountryCodeDropdown from "../../../utils/CountryCodeDropdown"
import { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
import { FormSelectArrowIcon } from "../../forms/common/form-components"
import { PlaceholderUtil } from "../../../utils/placeholder-switch-cases"
import { SelectItemsInterface, SignUpInterface } from "../login-form.types"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import TextfieldValidator from "../../../utils/validations/TextfieldValidator"
import { formatDateWithMON, getDateBefore18Years } from "../../../utils/getDate"
import { Error_icon, senderFirstName } from "../../forms/gift-card-form/constants"
import { ConfirmEmailId, userLastName } from "../../forms/gift-card-form/constants"
import React, { useCallback, useContext, useEffect, useRef, useState } from "react"
import { StayDateContainer } from "../../contactus/styles/FeedBack-component-styles"
import { MainGridWrapper, RegisterCalenderWrapper } from "../Styles/register.styles"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { ModalContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import CustomDatePickerComponent from "../../hoc/CustomDatePicker/custom-date-picker.component"
import { ERROR_MESSAGES, senderEmail, senderMobile } from "../../forms/gift-card-form/constants"
import AuthenticRegistrationStore from "../../../features/registration/store/authentic.registration.store"
import { Box, ClickAwayListener, InputAdornment, MenuItem, Select, Stack, Typography } from "@mui/material"
import {
  ConformEmailField,
  EmailField,
  EmailHintText,
  EmailTextFieldWrapper,
  ErrorMessageTypography,
  ErrorTextTypography,
  MobileNumberWrapper,
  PersonalDetailsNameContainer,
  PhoneNumberField,
  StyledInputLabel,
  TitleWrapper,
} from "./register-form.styles"
import {
  InputTextField,
  NewsLetterFormControl,
  NewsLetterStyledLabel,
} from "../../forms/enquiry-forms/news-letter-form/news-letter-form.styles"

const PersonalDetails = (props: SignUpInterface) => {
  const { title, parameterMap, items, logo } = props
  const userCode = global?.localStorage?.getItem("userDialCode")
  const [date, setDate] = useState<string>("")
  const [defaultPhone, setDefaultPhone] = useState<boolean>(false)
  const [defaultEmail, setDefaultEmail] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [apiError, setApiError] = useState<boolean>(false)
  const [isIndianUser, setIsIndianUser] = useState<boolean>(false)
  const [selectedCountry, setSelectedCountry] = useState<string>(userCode || "")
  const [select, setSelect] = useState<{ title: string; gender: string }>({
    title: "",
    gender: "",
  })
  const IHCLContexts = useContext(IHCLContext)
  const pageContext = useContext(ModalContext)
  const isMobile = useMobileCheck()
  const calendarRef: any = useRef(null)

  //store
  const userStore = IHCLContexts?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore

  const [countryCode, setCountryCode] = useState<string>(
    userStore?.userCountryCode?.includes("+") ? userStore?.userCountryCode : `+${userStore?.userCountryCode}` || "+91",
  )

  const [placeholder, setPlaceholder] = useState({
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    phoneNumber: "",
    gender: "",
    salutations: "",
    DOB: "",
    emailHintText: "",
    confirmTextField: "",
  })
  const [values, setValues] = useState({
    senderFirstName: "",
    userLastName: "",
    senderEmail: userStore?.userEmailID || "",
    senderMobile: userStore?.userMobileNumber || "",
    confirmEmail: userStore?.userEmailID || "",
  })
  const [errorMessage, setErrorMessage] = useState({
    senderMobile: "",
    senderEmail: "",
    senderFirstName: "",
    userLastName: "",
    confirmEmail: "",
  })
  const [errors, setErrors] = useState({
    senderFirstName: false,
    userLastName: false,
    senderEmail: false,
    senderMobile: false,
    confirmEmail: false,
    dob: false,
  })

  const authenticRegistrationStore = pageContext?.getPageStore(
    PAGE_STORES.registrationStore,
  ) as AuthenticRegistrationStore

  useEffect(() => {
    if (userStore?.userCountryCode === "+91" || countryCode === "+91") {
      setIsIndianUser(true)
    } else {
      setIsIndianUser(false)
    }
  }, [countryCode, userStore?.userCountryCode])

  useEffect(() => {
    if (!userStore?.userCountryCode) {
      userStore?.setUserCountryCode(countryCode)
    }
    authenticRegistrationStore?.personalDetailsStore(
      select?.title,
      values?.senderFirstName,
      values?.userLastName,
      values?.senderEmail,
      values?.confirmEmail,
      date,
      select?.gender,
      values?.senderMobile,
    )
  }, [authenticRegistrationStore, countryCode, date, select, userStore, values])

  useEffect(() => {
    if (errors?.senderFirstName || errors?.userLastName || errors?.senderEmail || errors?.confirmEmail || errors?.dob) {
      authenticRegistrationStore?.validPersonalDetailsFormData(true)
    } else {
      authenticRegistrationStore?.validPersonalDetailsFormData(false)
    }
  }, [
    authenticRegistrationStore,
    errors,
    errors?.confirmEmail,
    errors?.dob,
    errors?.senderFirstName,
    errors?.userLastName,
    errors?.senderMobile,
  ])

  const handleDefaultValues = () => {
    if (userStore?.userMobileNumber?.length > 1) {
      setDefaultPhone(true)
    } else {
      setDefaultPhone(false)
    }
    if (userStore?.userEmailID?.length > 1) {
      setDefaultEmail(true)
    } else {
      setDefaultEmail(false)
    }
  }
  useEffect(() => {
    handleDefaultValues()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //placeholder switch case
  useEffect(() => {
    PlaceholderUtil(parameterMap, setPlaceholder)
  }, [parameterMap])

  const formValidation = (isFormValid: any, id: any) => {
    setErrors({ ...errors, [id]: !isFormValid })
  }

  const handleConfirmEmail = () => {
    if (values?.senderEmail === values?.confirmEmail) {
      formValidation(true, "confirmEmail")
    } else {
      formValidation(false, "confirmEmail")
    }
  }

  //conform email error
  useEffect(() => {
    handleConfirmEmail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values?.confirmEmail, values?.senderEmail, values?.confirmEmail?.length])

  const handleChangeForm = (event: any) => {
    const { name, value } = event?.target
    const { status, errorMsg, fieldName } = TextfieldValidator(name, value)
    setErrorMessage((prev: any) => {
      return {
        ...prev,
        [fieldName]: errorMsg,
      }
    })
    setValues((prev: any) => {
      return {
        ...prev,
        [name]: event?.target?.value,
      }
    })
    formValidation(status, name)
    if (name === "confirmEmail") {
      setValues((prev: any) => {
        return {
          ...prev,
          confirmEmail: event?.target?.value,
        }
      })
      if (values?.senderEmail === event?.target?.value) {
        formValidation(true, name)
      } else {
        formValidation(false, name)
      }
    }
  }

  const handleSelectedValue = (event: any) => {
    const { name, value } = event?.target
    if (name === "salutation") {
      setSelect((prev: any) => {
        return {
          ...prev,
          title: value,
        }
      })
    } else {
      setSelect((prev: any) => {
        return {
          ...prev,
          [name]: value as string,
        }
      })
    }
  }

  const handleDatePicker = (newValue: any) => {
    setDate(newValue)
    setOpen(newValue ? false : true)
    if (newValue > new Date().setFullYear(new Date().getFullYear() - 18)) {
      setErrors((prev: any) => {
        return {
          ...prev,
          dob: true,
        }
      })
    } else {
      setErrors((prev: any) => {
        return {
          ...prev,
          dob: false,
        }
      })
    }
  }

  const myFunction = async () => {
    const recaptchaGenerated = await getRecaptchaToken()
    let response: any
    if (authenticRegistrationStore && authenticRegistrationStore?.userData?.email?.length > 0) {
      response = await authenticRegistrationStore?.validateNewEmailLoginUser(
        JSON.stringify({
          email: authenticRegistrationStore?.userData?.email,
          otp: false,
          recaptchaToken: recaptchaGenerated,
        }),
      )
    }
    if (response?.error === false) {
      setApiError(false)
      if (response?.data?.userType?.toLowerCase() === "new") {
        setErrorMessage((prev: any) => {
          return {
            ...prev,
            [senderEmail]: "",
          }
        })
        setApiError(false)
      } else if (
        response?.data?.userType?.toLowerCase() === "existing" ||
        response?.data?.userType?.toLowerCase() === "migrated"
      ) {
        authenticRegistrationStore?.validPersonalDetailsFormData(true)
        setApiError(true)
        setErrorMessage((prev: any) => {
          return {
            ...prev,
            senderEmail: ERROR_MESSAGES?.VERIFY_SIGN_UP_EMAIL,
          }
        })
      }
    } else {
      if (response?.response?.data?.code === "SSO-1196") {
        setApiError(false)
      } else {
        setApiError(true)
      }
      setApiError(true)
      setErrorMessage((prev: any) => {
        return {
          ...prev,
          [senderEmail]: response?.error
            ? response?.response?.data?.message
            : ERROR_MESSAGES?.EMAIL_VERIFICATION_API_FAILED,
        }
      })
    }
  }
  const handleOnKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    const pressedKey = e?.key
    if (pressedKey === "-" || pressedKey === "+") {
      e.preventDefault()
    }
  }, [])

  const handleScroll = () => {
    if (calendarRef?.current) {
      const elementTop = calendarRef?.current?.getBoundingClientRect()?.top
      const parentElement = document?.getElementById("register-scroll")
      const offset = 200 // Adjust this offset as needed
      parentElement?.scrollTo({
        top: elementTop + offset,
        behavior: "smooth", // You can use 'auto' or 'smooth'
      })
    }
  }

  useEffect(() => {
    open && handleScroll()
  }, [open])

  const dobError: boolean =
    (errors?.dob && ERROR_MESSAGES?.date_of_birth) ||
    (date?.toString()?.length === 0 && authenticRegistrationStore?.userDataErrors?.dateOfBirthError)
      ? true
      : false

  return (
    <MainGridWrapper $marginProp={isIndianUser} ref={calendarRef}>
      {logo?.asset?._ref && (
        <Box alt={`-img`} width={isMobile ? "32vw" : "14vw"} component={"img"} src={urlFor(logo?.asset?._ref).url()} />
      )}
      {title && (
        <TitleWrapper>
          <Typography variant={isMobile ? "m-heading-s" : "heading-s"}>{title}</Typography>
        </TitleWrapper>
      )}
      {isMobile ? (
        <MSitePersonalDetails
          select={select}
          handleSelectedValue={handleSelectedValue}
          salutations={salutationData?.salutation}
          values={values}
          errors={errors}
          errorMessage={errorMessage}
          handleChangeForm={handleChangeForm}
          CalenderIcon={CalenderIcon}
          date={date}
          open={open}
          setOpen={setOpen}
          handleDatePicker={handleDatePicker}
          getDateBefore18Years={getDateBefore18Years}
          gender={salutationData?.gender}
          defaultEmail={defaultEmail}
          countryCode={countryCode}
          setCountryCode={setCountryCode}
          defaultPhone={defaultPhone}
          setErrorMessage={setErrorMessage}
          setErrors={setErrors}
          fieldsData={items}
          apiError={apiError}
          setApiError={setApiError}
        />
      ) : (
        <Box sx={{ marginLeft: "2vw" }}>
          <PersonalDetailsNameContainer>
            <NewsLetterFormControl variant="standard">
              <NewsLetterStyledLabel>{items?.[0]?.labelText}</NewsLetterStyledLabel>
              <Select
                variant="standard"
                value={select?.title}
                name="salutation"
                onChange={handleSelectedValue}
                MenuProps={{
                  PaperProps: {
                    elevation: 0,
                    sx: {
                      maxHeight: 300,
                      backgroundColor: theme?.palette?.background?.default,
                      borderRadius: "0",
                      boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
                    },
                  },
                }}
                IconComponent={(props: any) => <FormSelectArrowIcon {...props} />}>
                {salutationData?.salutation?.map((item: SelectItemsInterface, index: number) => (
                  <MenuItem key={index} value={item?.title} sx={{ fontFamily: "supreme", fontSize: "1.35vw" }}>
                    {item?.title}
                  </MenuItem>
                ))}
              </Select>
            </NewsLetterFormControl>
            <InputTextField
              variant="standard"
              label={items?.[1]?.labelText}
              value={values.senderFirstName}
              name={senderFirstName}
              InputProps={{
                endAdornment: (
                  <>
                    {authenticRegistrationStore?.userDataErrors?.firstNameError &&
                      values.senderFirstName?.length === 0 && (
                        <InputAdornment position="end">
                          <Box component="img" src={Error_icon} alt="Expand Image" />
                        </InputAdornment>
                      )}
                  </>
                ),
              }}
              helperText={
                (errors?.senderFirstName && values?.senderFirstName?.length > 0 && items?.[1]?.helperText) ||
                (values?.senderFirstName?.length === 0 &&
                  authenticRegistrationStore?.userDataErrors?.firstNameError &&
                  items?.[1]?.errorText)
              }
              onChange={(e) => handleChangeForm(e)}
            />
            <InputTextField
              variant="standard"
              label={items?.[2]?.labelText}
              value={values?.userLastName}
              name={userLastName}
              InputProps={{
                endAdornment: (
                  <>
                    {authenticRegistrationStore?.userDataErrors?.lastNameError &&
                      values?.userLastName?.length === 0 && (
                        <InputAdornment position="end">
                          <Box component="img" src={Error_icon} alt="Expand Image" />
                        </InputAdornment>
                      )}
                  </>
                ),
              }}
              helperText={
                (errors?.userLastName && values?.userLastName?.length > 0 && items?.[2]?.helperText) ||
                (values?.userLastName?.length === 0 &&
                  authenticRegistrationStore?.userDataErrors?.lastNameError &&
                  items?.[2]?.errorText)
              }
              onChange={(e) => handleChangeForm(e)}
            />
          </PersonalDetailsNameContainer>
          <RegisterCalenderWrapper>
            <Box onFocus={() => setOpen(true)}>
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <StayDateContainer
                  className="stay-date"
                  $isOpen={open}
                  sx={{
                    "&, & .styledText": {
                      height: "fit-content !important",
                    },
                  }}>
                  <CustomDatePickerComponent
                    date={new Date()}
                    isOpen={open}
                    sx={{ height: "2.083vw" }}
                    onChange={handleDatePicker}
                    maxDate={getDateBefore18Years()}
                    defaultActiveStartDate={getDateBefore18Years()}
                    calendarIcon={() => <></>}
                    renderComponent={
                      <InputTextField
                        placeholder={date ? date : items?.[3]?.labelText}
                        onKeyDown={(e: any) => e?.preventDefault()}
                        onFocus={() => setOpen(() => true)}
                        onClick={(e: any) => setOpen(() => true)}
                        variant="standard"
                        value={date ? formatDateWithMON(date) : ""}
                        InputProps={{
                          endAdornment: (
                            <Stack onClick={(prev: any) => setOpen(!prev)} justifyContent={"end"}>
                              <CalenderIcon sx={{ width: isMobile ? "2.656vw" : "0.833vw" }} />
                            </Stack>
                          ),
                        }}
                      />
                    }
                    calendarWidth={isMobile ? MobilePxToVw(476) : DesktopPxToVw(453)}
                  />
                </StayDateContainer>
              </ClickAwayListener>
              {(errors?.dob && ERROR_MESSAGES?.date_of_birth) ||
                (date?.toString()?.length === 0 && authenticRegistrationStore?.userDataErrors?.dateOfBirthError && (
                  <ErrorTextTypography>{items?.[3]?.errorText}</ErrorTextTypography>
                ))}
            </Box>
            <NewsLetterFormControl variant="standard" sx={{ width: "100%" }}>
              <StyledInputLabel sx={{ lineHeight: "1.75vw" }}>{items?.[4]?.labelText}</StyledInputLabel>
              <Select
                sx={{
                  width: "100%",
                  "& .MuiSelect-select": {
                    py: "0px !important",
                  },
                }}
                variant="standard"
                value={select?.gender}
                MenuProps={{
                  PaperProps: {
                    elevation: 0,
                    sx: {
                      maxHeight: 300,
                      backgroundColor: theme?.palette?.background?.default,
                      borderRadius: "0",
                      boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
                    },
                  },
                }}
                name="gender"
                onChange={handleSelectedValue}
                IconComponent={(props: any) => <FormSelectArrowIcon {...props} />}>
                {salutationData?.gender?.map((item: SelectItemsInterface, index: number) => (
                  <MenuItem key={index} value={item?.title} sx={{ fontFamily: "supreme", fontSize: "1.35vw" }}>
                    {item?.title}
                  </MenuItem>
                ))}
              </Select>
            </NewsLetterFormControl>
          </RegisterCalenderWrapper>
          <EmailTextFieldWrapper sx={{ mt: dobError ? DesktopPxToVw(0) : DesktopPxToVw(20) }}>
            <EmailField
              disabled={defaultEmail}
              variant="standard"
              label={items?.[5]?.labelText}
              value={values?.senderEmail}
              name={senderEmail}
              onBlur={() => myFunction()}
              InputProps={{
                endAdornment: (
                  <>
                    {values?.senderEmail?.length === 0 && authenticRegistrationStore?.userDataErrors?.emailError && (
                      <InputAdornment position="end">
                        <Box component="img" src={Error_icon} alt="Expand Image" />
                      </InputAdornment>
                    )}
                  </>
                ),
              }}
              helperText={
                (apiError && values?.senderEmail?.length > 0 && errorMessage?.senderEmail) ||
                (errors?.senderEmail && values?.senderEmail?.length > 0 && items?.[5]?.helperText) ||
                (values?.senderEmail?.length === 0 &&
                  authenticRegistrationStore?.userDataErrors?.emailError &&
                  items?.[5]?.errorText)
              }
              onChange={handleChangeForm}
            />
            <ConformEmailField
              $value={values?.confirmEmail?.length > 0}
              variant="standard"
              label={items?.[6]?.labelText}
              value={values?.confirmEmail}
              name={ConfirmEmailId}
              // error={errors?.confirmEmail}
              InputProps={{
                endAdornment: (
                  <>
                    {values?.confirmEmail?.length === 0 &&
                      authenticRegistrationStore?.userDataErrors?.confirmEmailError && (
                        <InputAdornment position="end">
                          <Box component="img" src={Error_icon} alt="Expand Image" />
                        </InputAdornment>
                      )}
                  </>
                ),
              }}
              helperText={
                (errors?.confirmEmail && values?.confirmEmail?.length > 0 && items?.[6]?.helperText) ||
                (values?.confirmEmail?.length === 0 &&
                  authenticRegistrationStore?.userDataErrors?.confirmEmailError &&
                  items?.[6]?.errorText)
              }
              onChange={handleChangeForm}
              inputProps={{ maxLength: 40 }}
            />
          </EmailTextFieldWrapper>
          {items?.[5]?.hintText && <EmailHintText variant="body-s">{items?.[5]?.hintText}</EmailHintText>}
          <MobileNumberWrapper $marginProp={isIndianUser}>
            <CountryCodeDropdown
              dropdownStyle={{
                marginLeft: DesktopPxToVw(180),
                width: DesktopPxToVw(540),
              }}
              countryCode={countryCode}
              setCountryCode={setCountryCode}
              selectedCountry={selectedCountry}
              isDisable={defaultPhone}
            />
            <PhoneNumberField
              disabled={defaultPhone}
              variant="standard"
              label={items?.[7]?.labelText}
              type="tel"
              onKeyDown={handleOnKeyDown}
              onInput={(e: any) => {
                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
              }}
              value={values?.senderMobile}
              name={senderMobile}
              onChange={handleChangeForm}
              inputProps={{ maxLength: 12 }}
            />
          </MobileNumberWrapper>
          {errors?.senderMobile && values?.senderMobile?.length > 0 && (
            <ErrorMessageTypography variant="body-s">{ERROR_MESSAGES?.PHONE_NUMBER}</ErrorMessageTypography>
          )}
        </Box>
      )}
    </MainGridWrapper>
  )
}

export default observer(PersonalDetails)
