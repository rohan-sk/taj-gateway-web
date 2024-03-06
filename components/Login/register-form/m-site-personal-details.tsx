import { UserStore } from "../../../store"
import { observer } from "mobx-react-lite"
import { theme } from "../../../lib/theme"
import { useMobileCheck } from "../../../utils/isMobilView"
import { getRecaptchaToken } from "../../../utils/recaptcha"
import React, { useContext, useEffect, useRef } from "react"
import { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import CountryCodeDropdown from "../../../utils/CountryCodeDropdown"
import { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { MSiteInterface, SelectItemsInterface } from "../login-form.types"
import { formatDateWithMON, getDateBefore18Years } from "../../../utils/getDate"
import { Error_icon, senderFirstName } from "../../forms/gift-card-form/constants"
import { ConfirmEmailId, userLastName } from "../../forms/gift-card-form/constants"
import { Box, ClickAwayListener, InputAdornment, Select, Stack } from "@mui/material"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { ModalContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import CustomDatePickerComponent from "../../hoc/CustomDatePicker/custom-date-picker.component"
import { ERROR_MESSAGES, senderEmail, senderMobile } from "../../forms/gift-card-form/constants"
import AuthenticRegistrationStore from "../../../features/registration/store/authentic.registration.store"
import {
  MenuItems,
  MobileRegisterCalenderWrapper,
  MobileStayDateContainer,
  InputMobileTextField,
} from "../Styles/register.styles"
import {
  ConformEmailField,
  EmailField,
  EmailHintText,
  EmailTextWrapper,
  ErrorMessageTypography,
  ErrorTextTypography,
  GenderSelect,
  LastNameField,
  MobileNumberWrapper,
  PhoneNumberField,
  StyledInputLabel,
} from "./register-form.styles"
import {
  InputTextField,
  NewsLetterFormControl,
  NewsLetterMenuItem,
} from "../../forms/enquiry-forms/news-letter-form/news-letter-form.styles"

const MSitePersonalDetails = ({
  select,
  handleSelectedValue,
  salutations,
  values,
  errors,
  errorMessage,
  handleChangeForm,
  CalenderIcon,
  handleDatePicker,
  gender,
  defaultEmail,
  countryCode,
  setCountryCode,
  defaultPhone,
  setErrorMessage,
  setErrors,
  open,
  setOpen,
  date,
  fieldsData,
  setApiError,
  apiError,
}: MSiteInterface) => {
  const isMobile = useMobileCheck()
  const pageContext = useContext(ModalContext)
  const IHCLContexts = useContext(IHCLContext)

  const userStore = IHCLContexts?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore

  const authenticRegistrationStore = pageContext?.getPageStore(
    PAGE_STORES.registrationStore,
  ) as AuthenticRegistrationStore

  const scrollRef = useRef<any>(null)

  const handleEmailVerification = async () => {
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
  const keypadCloseForDatePicker = () => {
    if (document?.activeElement instanceof HTMLInputElement) {
      document?.activeElement?.blur()
    }
  }

  useEffect(() => {
    userStore?.setPersonalDetailsFormRef(scrollRef)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Stack
        ref={scrollRef}
        sx={{
          marginTop: "2.8vw",
          gap: "6.25vw",
          flexDirection: "row",
        }}>
        <NewsLetterFormControl variant="standard" sx={{ width: MobilePxToVw(144) }}>
          <StyledInputLabel>{fieldsData?.[0]?.labelText}</StyledInputLabel>
          <Select
            sx={{ width: MobilePxToVw(144) }}
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
            IconComponent={(props) => <KeyboardArrowDownIcon {...props} sx={{ cursor: "pointer" }} />}>
            {salutations?.map((item: SelectItemsInterface, index: number) => (
              <NewsLetterMenuItem key={index} value={item?.title}>
                {item?.title}
              </NewsLetterMenuItem>
            ))}
          </Select>
        </NewsLetterFormControl>
        <InputTextField
          sx={{ width: MobilePxToVw(356) }}
          variant="standard"
          label={fieldsData?.[1]?.labelText}
          value={values.senderFirstName}
          name={senderFirstName}
          error={errors.senderFirstName}
          InputProps={{
            endAdornment: (
              <>
                {authenticRegistrationStore?.userDataErrors?.firstNameError && values.senderFirstName?.length === 0 && (
                  <InputAdornment position="end">
                    <Box component="img" src={Error_icon} alt="Expand Image" />
                  </InputAdornment>
                )}
              </>
            ),
          }}
          helperText={
            (errors?.senderFirstName && values.senderFirstName.length > 0 && fieldsData?.[1]?.helperText) ||
            (values.senderFirstName.length === 0 &&
              authenticRegistrationStore?.userDataErrors?.firstNameError &&
              fieldsData?.[1]?.errorText)
          }
          onChange={(e) => handleChangeForm(e)}
        />
      </Stack>
      <LastNameField
        variant="standard"
        label={fieldsData?.[2]?.labelText}
        value={values.userLastName}
        name={userLastName}
        error={errors.userLastName}
        InputProps={{
          endAdornment: (
            <>
              {authenticRegistrationStore?.userDataErrors?.lastNameError && values.userLastName?.length === 0 && (
                <InputAdornment position="end">
                  <Box component="img" src={Error_icon} alt="Expand Image" />
                </InputAdornment>
              )}
            </>
          ),
        }}
        helperText={
          (errors?.userLastName && values.userLastName.length > 0 && fieldsData?.[2]?.helperText) ||
          (values.userLastName?.length === 0 &&
            authenticRegistrationStore?.userDataErrors?.lastNameError &&
            fieldsData?.[2]?.errorText)
        }
        onChange={(e) => handleChangeForm(e)}
      />
      <MobileRegisterCalenderWrapper
        sx={{ marginTop: "4.688vw!important " }}
        onClick={() => keypadCloseForDatePicker()}>
        <Stack onFocus={() => setOpen(true)}>
          <ClickAwayListener onClickAway={() => setOpen(false)}>
            <MobileStayDateContainer
              className="stay-date"
              $isOpen={open}
              sx={{
                "&, & .styledText": {
                  display: "flex",
                  alignItems: "baseline",
                },
              }}>
              <CustomDatePickerComponent
                date={date}
                isOpen={open}
                sx={{
                  height: { xs: "8.083vw", sm: "7vw" },
                  width: "39.844vw",
                }}
                onChange={handleDatePicker}
                maxDate={getDateBefore18Years()}
                defaultActiveStartDate={getDateBefore18Years()}
                calendarIcon={() => <></>}
                renderComponent={
                  <InputMobileTextField
                    placeholder={date ? date : fieldsData?.[3]?.labelText}
                    onKeyDown={(e: any) => e?.preventDefault()}
                    onFocus={() => {
                      setOpen(() => true, keypadCloseForDatePicker())
                    }}
                    onClick={(e: any) => {
                      setOpen(() => true), keypadCloseForDatePicker()
                    }}
                    variant="standard"
                    value={date ? formatDateWithMON(date) : ""}
                    InputProps={{
                      endAdornment: (
                        <Stack
                          onClick={(prev: any) => {
                            setOpen(!prev), keypadCloseForDatePicker()
                          }}
                          justifyContent={"end"}>
                          <CalenderIcon sx={{ width: isMobile ? "2.656vw" : "0.833vw" }} />
                        </Stack>
                      ),
                    }}
                  />
                }
                calendarWidth={MobilePxToVw(540)}
              />
            </MobileStayDateContainer>
          </ClickAwayListener>
          {(errors?.dob && ERROR_MESSAGES?.date_of_birth) ||
            (date?.toString()?.length === 0 && authenticRegistrationStore?.userDataErrors?.dateOfBirthError && (
              <ErrorTextTypography>{fieldsData?.[3]?.errorText}</ErrorTextTypography>
            ))}
        </Stack>
        <NewsLetterFormControl variant="standard">
          <StyledInputLabel>{fieldsData?.[4]?.labelText}</StyledInputLabel>
          <GenderSelect
            variant="standard"
            value={select?.gender}
            sx={{
              marginTop: `${MobilePxToVw(8)} !important`,
            }}
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
            IconComponent={(props) => <KeyboardArrowDownIcon {...props} sx={{ cursor: "pointer" }} />}>
            {gender?.map((item: SelectItemsInterface, index: number) => (
              <MenuItems key={index} value={item?.title}>
                {item?.title}
              </MenuItems>
            ))}
          </GenderSelect>
        </NewsLetterFormControl>
      </MobileRegisterCalenderWrapper>
      <EmailTextWrapper>
        <EmailField
          disabled={defaultEmail}
          variant="standard"
          label={fieldsData?.[5]?.labelText}
          value={values?.senderEmail}
          name={senderEmail}
          error={errors?.senderEmail}
          onBlur={() => handleEmailVerification()}
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
            (errors?.senderEmail && values?.senderEmail?.length > 0 && fieldsData?.[5]?.helperText) ||
            (values?.senderEmail?.length === 0 &&
              authenticRegistrationStore?.userDataErrors?.emailError &&
              fieldsData?.[5]?.errorText) ||
            (apiError && errorMessage?.senderEmail)
          }
          onChange={handleChangeForm}
        />
      </EmailTextWrapper>
      <ConformEmailField
        $value={values?.confirmEmail?.length > 0}
        variant="standard"
        label={fieldsData?.[6]?.labelText}
        value={values?.confirmEmail}
        name={ConfirmEmailId}
        error={errors?.confirmEmail}
        InputProps={{
          endAdornment: (
            <>
              {values?.confirmEmail?.length === 0 && authenticRegistrationStore?.userDataErrors?.confirmEmailError && (
                <InputAdornment position="end">
                  <Box component="img" src={Error_icon} alt="Expand Image" />
                </InputAdornment>
              )}
            </>
          ),
        }}
        helperText={
          (errors?.confirmEmail && values?.confirmEmail?.length > 0 && fieldsData?.[6]?.helperText) ||
          (values?.confirmEmail?.length === 0 &&
            authenticRegistrationStore?.userDataErrors?.confirmEmailError &&
            fieldsData?.[6]?.errorText)
        }
        onChange={handleChangeForm}
        inputProps={{ maxLength: 40 }}
      />
      {fieldsData?.[5]?.hintText && <EmailHintText variant="body-s">{fieldsData?.[5]?.hintText}</EmailHintText>}
      <MobileNumberWrapper>
        <CountryCodeDropdown countryCode={countryCode} setCountryCode={setCountryCode} isDisable={defaultPhone} />
        <PhoneNumberField
          disabled={defaultPhone}
          variant="standard"
          label={fieldsData?.[7]?.labelText}
          type="tel"
          onInput={(e: any) => {
            e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
          }}
          value={values?.senderMobile}
          name={senderMobile}
          error={errors?.senderMobile}
          onChange={handleChangeForm}
          inputProps={{ maxLength: 12 }}
        />
      </MobileNumberWrapper>
      {errors?.senderMobile && values?.senderMobile?.length > 0 && (
        <ErrorMessageTypography variant="body-s">{ERROR_MESSAGES?.PHONE_NUMBER}</ErrorMessageTypography>
      )}
    </>
  )
}

export default observer(MSitePersonalDetails)
