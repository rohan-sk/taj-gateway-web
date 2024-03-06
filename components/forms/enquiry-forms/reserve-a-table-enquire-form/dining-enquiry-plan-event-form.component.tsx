import { theme } from "../../../../lib/theme"
import dynamic from "next/dynamic"
import React, { useContext, useEffect, useState } from "react"
import { Box, FormControl, InputAdornment, Typography } from "@mui/material"
import { useMobileCheck } from "../../../../utils/isMobilView"
const RenderActionItem = dynamic(() => import("../../../hoc/actions/action-items-ui"))
import { useAppNavigation } from "../../../../utils/NavigationUtility"
const CountryCodeDropdown = dynamic(() => import("../../../../utils/CountryCodeDropdown"))
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import guestData from "../wedding-enquire-forms/wedding-enquire-json.json"
import TextfieldValidator from "../../../../utils/validations/TextfieldValidator"
import { StyledMenuItem } from "../khazana-enquiry-form/products-of-interest.styles"
import { MobileNumberWrapper } from "../wedding-enquire-forms/wedding-enquire-styles"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import { handler as DiningEnquiryPlanEventApi } from "../../../../features/notification/api/handlers/dining-enquiry-plan-event-form"
import {
  Name,
  Email,
  address,
  companyName,
  GuestNumber,
  senderMobile,
  customMessage,
  ERROR_MESSAGES,
  Date as DateConstant,
  Error_icon,
} from "../../gift-card-form/constants"
import {
  MainContainer,
  StyledTextField,
  GustDropDownSelect,
  TextFieldsContainer,
  DatePickerTextField,
  MainWrapperContainer,
  TextFieldsWrapperBox,
  DescriptionTextField,
  GustDropDownInputLabel,
  DescribeEventTypography,
  MobileNumberContainerBox,
  TextFieldsSecondWrapperBox,
  PlaneEventPhoneNumberField,
  StyledFormControl,
  DatePickerWrapper,
  EventPlanFormOverFlowWrapper,
} from "./dining-enquiry-plan-event-form-component-styled"
import {
  initialValuesTypes,
  initialErrorsTypes,
  DiningEnquiryPlanEventFormProps,
} from "./dining-enquiry-plan-event-form-types"
const SnackbarToast = dynamic(() => import("../../../../utils/SnackbarToast"))
import { ErrorMessageTypography } from "../khazana-enquiry-form/khazana-enquiry-form.styles"
import { CalenderIcon, ErrorIcon } from "../../../../utils/customIcons"
const LoadingSpinner = dynamic(() => import("../../../../utils/SpinnerComponent"))
import { GLOBAL_STORES } from "../../../../utils/Constants"
import { UserStore } from "../../../../store"

const initialValues = {
  Date: "",
  Name: "",
  Email: "",
  address: "TAJ FALAKNUMA PALACE, Hyderabad",
  companyName: "TAJ FALAKNUMA PALACE",
  GuestNumber: "",
  senderMobile: "",
  customMessage: "",
}
const initialErrorMessages = {
  Date: "",
  Name: "",
  Email: "",
  address: "",
  companyName: "",
  GuestNumber: "",
  senderMobile: "",
  customMessage: "",
}
const initialErrors = {
  Date: false,
  Name: false,
  Email: false,
  address: false,
  GuestNumber: false,
  companyName: false,
  senderMobile: false,
  customMessage: false,
}
const DiningEnquiryPlanEventForm = ({
  items,
  title,
  singleContent,
  PrimaryAction,
  secondaryAction,
}: DiningEnquiryPlanEventFormProps) => {
  const isMobile = useMobileCheck()
  const Context = useContext(IHCLContext)
  const PortableText = Context!.PortableText
  const userStore = Context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const customerHash = global?.localStorage?.getItem("customerHash")
  const [userData, setUserData] = useState<any>({})
  const [disable, setDisable] = useState<{
    Name: boolean
    Email: boolean
    senderMobile: boolean
    CountryCodeValue: boolean
  }>({
    Name: false,
    Email: false,
    senderMobile: false,
    CountryCodeValue: false,
  })
  const navigate = useAppNavigation()
  const [countryCode, setCountryCode] = useState<string>("+91")
  const [date, setDate] = useState<string>("")
  const [open, setOpen] = useState<boolean>(false)
  const [formattedDate, setFormattedDate] = useState<string>("")
  const [values, setValues] = useState<initialValuesTypes>(initialValues)
  const [errors, setErrors] = useState<initialErrorsTypes>(initialErrors)
  const [isValid, setIsValid] = useState<boolean>(false)
  const [openErrorMessage, setOpenErrorMessage] = useState<boolean>(false)
  const [snackMessage, setSnackMessage] = useState<string>("")
  const [loader, setLoader] = useState<boolean>(false)

  const [errorMessage, setErrorMessage] = useState<initialValuesTypes>(initialValues)
  const formValidation = (isFormValid: boolean, id: number) => {
    setErrors({ ...errors, [id]: !isFormValid })
  }

  const handleDatePicker = (newValue: any) => {
    const enteredDateFormat: any = new Date(Date.UTC(newValue?.$y, newValue?.$M, newValue?.$D))
    setFormattedDate(enteredDateFormat.toLocaleString("en-GB", { timeZone: "UTC" }).split(",")[0])
    setDate(enteredDateFormat.toISOString().split("T")[0])
  }

  const handleChangeForm = (event: any) => {
    const { name, value } = event.target
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
        [name]: value,
      }
    })
    formValidation(status, name)
  }

  const handleSubmit = async () => {
    setLoader(true)
    const response = await DiningEnquiryPlanEventApi?.apiCall(
      JSON.stringify({
        date: String(formattedDate).split("/").join("-"),
        email: values?.Email,
        location: values?.address,
        customerName: values?.Name,
        mobile: values?.senderMobile,
        mobileCountryCode: countryCode,
        restaurant: values?.companyName,
        noOfGuests: values?.GuestNumber,
        eventDescription: values?.customMessage,
      }),
    )
    if (response?.error === false) {
      setLoader(false)
      if (response?.data?.cause) {
        navigate(secondaryAction?.url, secondaryAction?.urlType)
        // setOpenErrorMessage(true)
        // setSnackMessage(
        //   response?.data?.message || ERROR_MESSAGES?.mandatoryFields
        // )
      } else if (response?.status === 200) {
        navigate(PrimaryAction?.url, PrimaryAction?.urlType)
      }
    } else if (response?.error === true) {
      navigate(secondaryAction?.url, secondaryAction?.urlType)
      setLoader(false)
      // setOpenErrorMessage(true)
      // setSnackMessage(response?.data?.message || ERROR_MESSAGES?.NETWORK_ERROR)
    } else {
      navigate(secondaryAction?.url, secondaryAction?.urlType)
      setLoader(false)
    }
  }
  const checkEmptyValidation = () => {
    if (
      values?.Name?.length === 0 ||
      values?.Email?.length === 0 ||
      values?.senderMobile?.length === 0 ||
      values?.GuestNumber?.length === 0 ||
      date?.length === 0
    ) {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        [Name]: values?.Name?.length === 0,
        [Email]: values?.Email?.length === 0,
        [senderMobile]: values?.senderMobile?.length === 0,
        [DateConstant]: date?.length === 0,
        [GuestNumber]: values?.GuestNumber?.length === 0,
        companyName: values?.companyName?.length === 0,
        address: values?.address?.length === 0,
      }))
      setErrorMessage((prevErrorMessage: any) => ({
        ...prevErrorMessage,
        [Name]: TextfieldValidator(Name, values?.Name)?.errorMsg,
        [Email]: TextfieldValidator(Email, values?.Email)?.errorMsg,
        [senderMobile]: TextfieldValidator(senderMobile, values?.senderMobile)?.errorMsg,
        [DateConstant]: date?.length === 0 ? ERROR_MESSAGES?.EMPTY_DATE_ERROR : "",
        [GuestNumber]: values?.GuestNumber?.length === 0 ? ERROR_MESSAGES?.EMPTY_GUEST_LIST_ERROR : "",
        companyName: values?.companyName?.length > 0 ? "" : ERROR_MESSAGES?.EMPTY_RESTAURANT_NAME,
        address: values?.address?.length > 0 ? "" : ERROR_MESSAGES?.EMPTY_RESTAURANT_LOCATION,
      }))
    }
  }

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
      setValues((prev: any) => {
        return {
          ...prev,
          Name: userData?.nameDetails?.firstName?.length > 0 ? userData?.nameDetails?.firstName : "",
          Email: userData?.primaryEmailId?.length > 0 ? userData?.primaryEmailId : "",
          senderMobile: userData?.primaryMobile?.phoneNumber?.length > 0 ? userData?.primaryMobile?.phoneNumber : "",
        }
      })
      setCountryCode(userData?.primaryMobile?.isdCode?.length > 0 ? userData?.primaryMobile?.isdCode : "+91")

      //setting disable fields
      setDisable((prev: any) => {
        return {
          ...prev,
          Name: !(
            String(userData?.nameDetails?.firstName)?.toLowerCase() === "undefined" ||
            userData?.nameDetails?.firstName?.length <= 0 ||
            userData?.nameDetails?.firstName === undefined ||
            userData?.nameDetails?.firstName === null
          ),
          Email: !(
            String(userData?.primaryEmailId)?.toLowerCase() === "undefined" ||
            userData?.primaryEmailId?.length <= 0 ||
            userData?.primaryEmailId === undefined ||
            userData?.primaryEmailId === null
          ),
          senderMobile: !(
            String(userData?.primaryMobile?.phoneNumber)?.toLowerCase() === "undefined" ||
            userData?.primaryMobile?.phoneNumber?.length <= 0 ||
            userData?.primaryMobile?.phoneNumber === undefined ||
            userData?.primaryMobile?.phoneNumber === null
          ),
          CountryCodeValue: !(
            userData?.primaryMobile?.isdCode?.length <= 0 ||
            userData?.primaryMobile?.isdCode === undefined ||
            userData?.primaryMobile?.isdCode === null
          ),
        }
      })
    }
  }, [customerHash, userData, userStore?.userDetails?.userHash])

  return (
    <>
      {loader && <LoadingSpinner />}
      <EventPlanFormOverFlowWrapper>
        <MainWrapperContainer $isMobile={isMobile}>
          <SnackbarToast open={openErrorMessage} onClose={() => setOpenErrorMessage(false)} Message={snackMessage} />
          <MainContainer $isMobile={isMobile}>
            {title && (
              <Box>
                <Typography variant={isMobile ? "m-heading-s" : "heading-s"} sx={{ fontWeight: 300 }}>
                  {title}
                </Typography>
              </Box>
            )}
            <TextFieldsContainer $isMobile={isMobile}>
              <TextFieldsWrapperBox $isMobile={isMobile}>
                <StyledTextField
                  variant="standard"
                  placeholder={items?.[0]?.labelText}
                  onChange={handleChangeForm}
                  value={values?.address}
                  disabled={values?.address?.length > 0}
                  name={address}
                  sx={{
                    width: isMobile ? "100%" : "29.844vw",
                    "& .Mui-disabled": {
                      "&:before": {
                        borderBottomStyle: "solid !important",
                      },
                    },
                  }}
                  error={errors?.address}
                  InputProps={{
                    endAdornment: (
                      <>
                        {errors?.address &&
                          (values?.address?.length === 0 ||
                            values?.address === null ||
                            values?.address == undefined) && (
                            <InputAdornment position="end">
                              <Box loading="lazy" component="img" src={Error_icon} alt="Expand Image" />
                            </InputAdornment>
                          )}
                      </>
                    ),
                  }}
                  helperText={
                    (errors?.address && values?.address.length > 0 && items?.[1]?.errorText) ||
                    (errors?.address && errorMessage?.address?.length > 0 && errorMessage?.address)
                  }
                />
                <StyledTextField
                  variant="standard"
                  placeholder={items?.[1]?.labelText}
                  value={values?.companyName}
                  disabled={values?.companyName?.length > 0}
                  name={companyName}
                  sx={{
                    width: isMobile ? "100%" : "29.844vw",
                    "& .Mui-disabled": {
                      "&:before": {
                        borderBottomStyle: "solid !important",
                      },
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <>
                        {errors?.companyName &&
                          (values?.companyName?.length === 0 ||
                            values?.companyName === null ||
                            values?.companyName == undefined) && (
                            <InputAdornment position="end">
                              <Box loading="lazy" component="img" src={Error_icon} alt="Expand Image" />
                            </InputAdornment>
                          )}
                      </>
                    ),
                  }}
                  onChange={handleChangeForm}
                  error={errors?.companyName}
                  helperText={
                    (errors?.companyName && items?.[0]?.errorText) ||
                    ((values?.companyName?.length === 0 ||
                      values?.companyName === null ||
                      values?.companyName == undefined) &&
                      errorMessage?.companyName)
                  }
                />
              </TextFieldsWrapperBox>
              <TextFieldsWrapperBox $isMobile={isMobile}>
                <DescriptionTextField
                  variant="standard"
                  placeholder={items?.[2]?.labelText}
                  value={values?.Name}
                  name={Name}
                  disabled={disable?.Name}
                  sx={{
                    width: isMobile ? "100%" : "19.115vw",
                  }}
                  onChange={handleChangeForm}
                  InputProps={{
                    endAdornment: (
                      <>
                        {errors?.Name &&
                          (values?.Name?.length === 0 || values?.Name === null || values?.Name == undefined) && (
                            <InputAdornment position="end">
                              <Box loading="lazy" component="img" src={Error_icon} alt="Expand Image" />
                            </InputAdornment>
                          )}
                      </>
                    ),
                  }}
                  helperText={errors?.Name && items?.[2]?.errorText}
                />
                <DescriptionTextField
                  variant="standard"
                  placeholder={items?.[3]?.labelText}
                  value={values?.Email}
                  name={Email}
                  disabled={disable?.Email}
                  sx={{
                    width: isMobile ? "100%" : "19.115vw",
                  }}
                  onChange={handleChangeForm}
                  InputProps={{
                    endAdornment: (
                      <>
                        {errors?.Email &&
                          (values?.Email?.length === 0 || values?.Email === null || values?.Email == undefined) && (
                            <InputAdornment position="end">
                              <Box loading="lazy" component="img" src={Error_icon} alt="Expand Image" />
                            </InputAdornment>
                          )}
                      </>
                    ),
                  }}
                  helperText={errors?.Email && items?.[3]?.errorText}
                />
                <MobileNumberContainerBox $isMobile={isMobile}>
                  <MobileNumberWrapper>
                    <CountryCodeDropdown
                      isDisable={disable?.CountryCodeValue}
                      countryCode={countryCode}
                      setCountryCode={setCountryCode}
                      backgroundColor={
                        isMobile ? theme?.palette?.background?.paper : theme?.palette?.background?.default
                      }
                      dropdownStyle={{
                        width: isMobile ? "75%" : "20vw",
                        marginLeft: isMobile ? "10vw" : "7vw",
                      }}
                    />
                    <PlaneEventPhoneNumberField
                      disabled={disable?.CountryCodeValue}
                      variant="standard"
                      placeholder={items?.[4]?.labelText}
                      type="tel"
                      onInput={(e: any) => {
                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                      }}
                      value={values?.senderMobile}
                      name={senderMobile}
                      inputProps={{ maxLength: 12 }}
                      sx={{
                        marginRight: "0vw",
                      }}
                      onChange={handleChangeForm}
                      InputProps={{
                        endAdornment: (
                          <>
                            {errors?.senderMobile &&
                              (values?.senderMobile?.length === 0 ||
                                values?.senderMobile === null ||
                                values?.senderMobile == undefined) && (
                                <InputAdornment position="end">
                                  <Box loading="lazy" component="img" src={Error_icon} alt="Expand Image" />
                                </InputAdornment>
                              )}
                          </>
                        ),
                      }}
                    />
                  </MobileNumberWrapper>
                  {errors?.senderMobile && values?.senderMobile.length < 10 && (
                    <ErrorMessageTypography sx={{ position: "relative" }}>
                      {items?.[4]?.errorText}
                    </ErrorMessageTypography>
                  )}
                </MobileNumberContainerBox>
              </TextFieldsWrapperBox>
              <TextFieldsSecondWrapperBox $isMobile={isMobile}>
                <StyledFormControl variant="standard" sx={{ alignSelf: "self-start" }}>
                  {values.GuestNumber?.length < 1 && (
                    <GustDropDownInputLabel>{items?.[5]?.labelText}</GustDropDownInputLabel>
                  )}
                  <GustDropDownSelect
                    variant="standard"
                    value={values?.GuestNumber}
                    name={GuestNumber}
                    onChange={handleChangeForm}
                    IconComponent={() =>
                      errors?.GuestNumber && values.GuestNumber?.length < 1 ? (
                        <Box loading="lazy" component="img" src={Error_icon} alt="Expand Image" />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )
                    }
                    $isMobile={isMobile}
                    sx={{ textAlign: "start" }}>
                    {guestData?.noOfGuests?.map((guestList: any, index: number) => (
                      <StyledMenuItem
                        key={index}
                        value={guestList?.guest}
                        sx={{
                          fontFamily: "Inter",
                          fontSize: isMobile ? "3.75vw" : "1.25vw",
                        }}>
                        {guestList?.guest}
                      </StyledMenuItem>
                    ))}
                  </GustDropDownSelect>
                  {errors?.GuestNumber && <ErrorMessageTypography>{errorMessage?.GuestNumber}</ErrorMessageTypography>}
                </StyledFormControl>
                <DatePickerWrapper>
                  {errors?.Date && date?.length === 0 && (
                    <ErrorMessageTypography sx={{ textAlign: "start" }}>{errorMessage?.Date}</ErrorMessageTypography>
                  )}
                </DatePickerWrapper>
              </TextFieldsSecondWrapperBox>
              <Box sx={{ textAlign: "start" }}>
                <DescribeEventTypography $isMobile={isMobile}>{items?.[7]?.labelText}</DescribeEventTypography>
                <DescriptionTextField
                  variant="standard"
                  value={values?.customMessage}
                  name={customMessage}
                  sx={{
                    width: "100%",
                  }}
                  onChange={handleChangeForm}
                  helperText={
                    errors?.customMessage &&
                    values?.customMessage.length > 0 &&
                    values?.companyName.length < 3 &&
                    items?.[7]?.errorText
                  }
                />
              </Box>
            </TextFieldsContainer>
            {isValid && (
              <Box sx={{ margin: isMobile ? "4.688vw 0vw" : "1.563vw 0vw" }}>
                <Typography
                  sx={{
                    color: theme?.palette?.ihclPalette?.hexTen,
                  }}
                  variant={isMobile ? "m-body-s" : "body-s"}>
                  {ERROR_MESSAGES?.mandatoryFields}
                </Typography>
              </Box>
            )}
            {PrimaryAction?.title && (
              <RenderActionItem
                url={PrimaryAction?.url}
                title={PrimaryAction?.title}
                navigationType={PrimaryAction?.urlType}
                variant={PrimaryAction?.variant}
                isActionButtonType={true}
                onClick={() => {
                  if (
                    values?.Name?.length > 0 &&
                    values?.Email?.length > 0 &&
                    values?.senderMobile?.length > 9 &&
                    values?.GuestNumber?.length > 0 &&
                    date?.length > 0 &&
                    values?.companyName?.length > 0 &&
                    values?.address?.length > 0 &&
                    errors?.address === false &&
                    errors?.companyName === false &&
                    errors?.Name == false &&
                    errors?.Email == false &&
                    errors?.senderMobile == false
                  ) {
                    handleSubmit()
                  } else {
                    checkEmptyValidation()
                  }
                }}
                buttonStyles={{
                  lineHeight: "140%",
                  letterSpacing: "0.1em",
                  marginTop: isMobile && !isValid ? "8.438vw" : !isValid ? "3.125vw" : "0vw",
                }}
              />
            )}
            {singleContent?.map((content: any, index: number) => (
              <Box key={index} mt={isMobile ? "4.688vw" : "2.083vw"}>
                <PortableText blocks={content} key={index} />
              </Box>
            ))}
          </MainContainer>
        </MainWrapperContainer>
      </EventPlanFormOverFlowWrapper>
    </>
  )
}

export default DiningEnquiryPlanEventForm
