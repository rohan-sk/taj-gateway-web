import { Box, FormControl, Select, Stack, Typography } from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
const RenderActionItem = dynamic(() => import("../../../hoc/actions/action-items-ui"))
import TextfieldValidator from "../../../../utils/validations/TextfieldValidator"
const CountryCodeDropdown = dynamic(() => import("../../../../utils/CountryCodeDropdown"))
import { ExpandMoreIcon } from "../../../header/styles/booking-menu"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { handler as reserveATableApi } from "../../../../features/notification/api/handlers/reserve-table-enquire"
const SnackbarToast = dynamic(() => import("../../../../utils/SnackbarToast"))
import { useAppNavigation } from "../../../../utils/NavigationUtility"
import {
  ButtonWrapper,
  ColumnFlexBox,
  DateTextField,
  EmailField,
  ErrorMessageTypography,
  MainGrid,
  MobileNumberWrapper,
  NameField,
  PhoneNumberField,
  SelectGuestList,
  SelectTimeSlots,
  StyledBox,
  StyledFormControl,
  StyledInputLabel,
  StyledMenuItem,
} from "./reserve-a-table-styles"
import {
  ERROR_MESSAGES,
  address,
  companyName,
  senderEmail,
  senderFirstName,
  senderMobile,
  customMessage,
} from "../../gift-card-form/constants"
import { useMobileCheck } from "../../../../utils/isMobilView"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { DescribeEventTypography, DescriptionTextField } from "./dining-enquiry-plan-event-form-component-styled"
import { DiningEnquiryPlanEventFormProps } from "./dining-enquiry-plan-event-form-types"
import { theme } from "../../../../lib/theme"
const LoadingSpinner = dynamic(() => import("../../../../utils/SpinnerComponent"))
import { AsyaFormControl } from "../khazana-enquiry-form/products-of-interest.styles"
import { GLOBAL_STORES } from "../../../../utils/Constants"
import { GAStore, UserStore } from "../../../../store"
import { triggerEvent } from "../../../../utils/analytics"
import { getCookie } from "../../../../utils/cookie"
import { useLoggedIn } from "../../../../utils/hooks/useLoggedIn"
import { UseAddress } from "../../../../utils/hooks/useAddress"
import { ageFromDOB } from "../../../../utils/getDate"
import { MemberDataLayer } from "../../../../utils/analytics/member-data-layer"

type Values = {
  senderFirstName: string
  senderEmail: string
  senderMobile: string
  companyName: string
  address: string
  restaurant: string
  date: string
  timeSlot: string
  noOfGuests: string
  customMessage: string
}

type ErrorMessage = {
  senderFirstName: string
  senderEmail: string
  senderMobile: string
  companyName: string
  address: string
  restaurant: string
  date: string
  timeSlot: string
  noOfGuests: string
  customMessage: string
}

type Errors = {
  senderFirstName?: boolean
  senderEmail?: boolean
  senderMobile?: boolean
  companyName?: boolean
  address?: boolean
  restaurant?: boolean
  date?: boolean
  timeSlot?: boolean
  noOfGuests?: boolean
  customMessage?: boolean
}
type TempErrors = {
  errors: Errors
  errorMessage: ErrorMessage
}
const initialState: Values | ErrorMessage = {
  senderFirstName: "",
  senderEmail: "",
  senderMobile: "",
  companyName: "",
  address: "",
  restaurant: "",
  date: "",
  timeSlot: "",
  noOfGuests: "",
  customMessage: "",
}

const guestsData = [
  {
    noOfGuests: "10",
  },
  {
    noOfGuests: "20",
  },
  {
    noOfGuests: "50",
  },
  {
    noOfGuests: "100",
  },
]
const timeSlots = [
  {
    time: "9am-12pm",
  },
  {
    time: "1pm-4pm",
  },
  {
    time: "4pm-6pm",
  },
]

const ReserveATableEnquireForm = ({
  title,
  items,
  singleContent,
  PrimaryAction,
  secondaryAction,
}: DiningEnquiryPlanEventFormProps) => {
  const Context = useContext(IHCLContext)
  const PortableText = Context!.PortableText
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const context: any = useContext(IHCLContext)
  const userStore = context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const customerHash = global?.localStorage?.getItem("customerHash")
  //states
  const [loader, setLoader] = useState<boolean>(false)
  const [openErrorMessage, setOpenErrorMessage] = useState<boolean>(false)
  const [snackMessage, setSnackMessage] = useState<string>("")
  const [countryCode, setCountryCode] = useState<string>("+91")
  const [date, setDate] = useState<string>("")
  const [formattedDate, setFormattedDate] = useState<string>("")
  const [open, setOpen] = useState<boolean>(false)
  const [values, setValues] = useState<Values>(initialState)
  const [errors, setErrors] = useState<Errors>({})
  const [userData, setUserData] = useState<any>()
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(initialState)
  const [disable, setDisable] = useState<{
    senderFirstName: boolean
    senderEmail: boolean
    senderMobile: boolean
    countryCodeValue: boolean
  }>({
    senderFirstName: false,
    senderEmail: false,
    senderMobile: false,
    countryCodeValue: false,
  })

  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const dataLayer = MemberDataLayer(userStore, gaStoreData)
  //functions

  //function to set form values and handle error scenarios
  const checkEmptyFields = () => {
    const tempErrors: TempErrors = {
      errors: {},
      errorMessage: {
        senderFirstName: "",
        senderEmail: "",
        senderMobile: "",
        companyName: "",
        address: "",
        restaurant: "",
        date: "",
        timeSlot: "",
        noOfGuests: "",
        customMessage: "",
      },
    }
    Object?.keys(values)?.reduce((accumulator: TempErrors, fieldKey: string) => {
      const tempAccumulator = accumulator
      if (fieldKey === "noOfGuests" || fieldKey === "timeSlot" || fieldKey === companyName || fieldKey === "date") {
        tempAccumulator.errors = {
          ...tempAccumulator?.errors,
          [fieldKey]: values?.[fieldKey]?.length === 0,
        }
        if (fieldKey === companyName || fieldKey === "date") {
          tempAccumulator.errorMessage = {
            ...tempAccumulator?.errorMessage,
            [fieldKey]: "Please fill this field",
          }
        } else {
          tempAccumulator.errorMessage = {
            ...tempAccumulator?.errorMessage,
            [fieldKey]: "Please select an option",
          }
        }
      } else if (
        fieldKey === senderFirstName ||
        fieldKey === senderEmail ||
        fieldKey === senderMobile ||
        fieldKey === address
      ) {
        const { status, errorMsg } = TextfieldValidator(fieldKey, values?.[fieldKey])
        tempAccumulator.errors = {
          ...tempAccumulator?.errors,
          [fieldKey]: fieldKey === address ? (values?.[fieldKey]?.length === 0 ? true : !status) : !status,
        }
        tempAccumulator.errorMessage = {
          ...tempAccumulator?.errorMessage,
          [fieldKey]: errorMsg,
        }
      }
      return tempAccumulator
    }, tempErrors)
    setErrors(() => tempErrors?.errors)
    setErrorMessage(() => tempErrors?.errorMessage)
  }

  //function to validate form
  const handleForm = ({ target: { name, value } }: any) => {
    setValues((previousValues: Values) => ({
      ...previousValues,
      [name]: value,
    }))
    if (name === "timeSlot" || name === "noOfGuests" || name === companyName) {
      setErrors((previousErrors) => ({
        ...previousErrors,
        [name]: value?.length === 0,
      }))
      if (name === companyName) {
        setErrorMessage((previousErrorMessage: ErrorMessage) => ({
          ...previousErrorMessage,
          [name]: value?.length === 0 ? "Please enter the restaurant name" : "",
        }))
      } else {
        setErrorMessage((previousErrorMessage: ErrorMessage) => ({
          ...previousErrorMessage,
          [name]: value?.length === 0 ? "Please select the option here" : "",
        }))
      }
    } else if (name === senderFirstName || name === senderMobile || name === senderEmail || name === address) {
      const { status, errorMsg } = TextfieldValidator(name, value)

      setErrors((previousErrors) => ({
        ...previousErrors,
        [name]: name === address ? (value?.length === 0 ? true : !status) : !status, // status false means condition not matches with regex then error become true
      }))
      setErrorMessage((previousErrorMessage: ErrorMessage) => ({
        ...previousErrorMessage,
        [name]: errorMsg,
      }))
    }
  }

  //function to handle date field
  const handleDatePicker = (newValue: any) => {
    const enteredDateFormat = new Date(Date.UTC(newValue?.$y, newValue?.$M, newValue?.$D))
    if (newValue === null) {
    } else {
      setFormattedDate(enteredDateFormat.toLocaleString("en-GB", { timeZone: "UTC" }).split(",")[0])
      setValues((previousValues: Values) => ({
        ...previousValues,
        date: enteredDateFormat?.toISOString()?.split("T")?.[0],
      }))
      setErrors((previousErrors: Errors) => ({
        ...previousErrors,
        date: enteredDateFormat.toISOString()?.split("T")?.[0]?.length === 0,
      }))
      setErrorMessage((previousErrorMessage: ErrorMessage) => ({
        ...previousErrorMessage,
        date: "Please choose the date",
      }))

      setDate(enteredDateFormat?.toISOString()?.split("T")?.[0])
    }
  }

  //function to submit form
  const handleSubmit = async () => {
    setLoader(true)
    const reserveATableApiResponse = await reserveATableApi?.apiCall(
      JSON.stringify({
        customerName: values?.senderFirstName,
        email: values?.senderEmail,
        mobile: values?.senderMobile,
        mobileCountryCode: countryCode,
        restaurant: values?.companyName,
        location: values?.address,
        noOfGuests: values?.noOfGuests,
        timeSlot: values?.timeSlot,
        date: String(formattedDate).split("/").join("-"),
        eventDescription: values?.customMessage,
      }),
    )
    if (reserveATableApiResponse?.error === false) {
      setLoader(false)
      if (reserveATableApiResponse?.data?.cause) {
        setOpenErrorMessage(true)
        navigate(secondaryAction?.url, secondaryAction?.urlType)
        setSnackMessage(reserveATableApiResponse?.data?.message || ERROR_MESSAGES?.mandatoryFields)
      } else {
        navigate(PrimaryAction?.url, PrimaryAction?.urlType)
      }
    } else {
      setLoader(false)
      navigate(secondaryAction?.url, secondaryAction?.urlType)
      setOpenErrorMessage(true)
      setSnackMessage(ERROR_MESSAGES?.DEFAULT_ERROR)
    }
  }
  const handleReserve = () => {
    triggerEvent({
      action: "reserveNow_Clicked",
      params: {
        ...dataLayer,
        buttonLinkName: PrimaryAction?.title || "",
        link_text: PrimaryAction?.title || "",
        link_url: PrimaryAction?.url || "",
        eventType: "",
        eventName: title || "",
        eventPlace: values.address || "",
        eventTicketsQty: values.noOfGuests || "",
        eventDate: date || "",
        clientId: getCookie("_ga")?.slice(6),
      },
    })
  }
  //effects

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
          senderFirstName: userData?.nameDetails?.firstName?.length > 0 ? userData?.nameDetails?.firstName : "",
          senderEmail: userData?.primaryEmailId?.length > 0 ? userData?.primaryEmailId : "",
          senderMobile: userData?.primaryMobile?.phoneNumber ?? "",
        }
      })
      setCountryCode(userData?.primaryMobile?.isdCode?.length > 0 ? userData?.primaryMobile?.isdCode : "+91")
      setDisable((prev: any) => ({
        ...prev,
        senderFirstName: !(
          userData?.nameDetails?.firstName?.length <= 0 ||
          userData?.nameDetails?.firstName === undefined ||
          userData?.nameDetails?.firstName === null
        ),
        senderEmail: !(
          userData?.primaryEmailId?.length <= 0 ||
          userData?.primaryEmailId === null ||
          userData?.primaryEmailId === undefined
        ),
        senderMobile: !(
          userData?.primaryMobile?.phoneNumber?.length <= 0 ||
          userData?.primaryMobile?.phoneNumber === undefined ||
          userData?.primaryMobile?.phoneNumber === null
        ),
        countryCodeValue: !(
          userData?.primaryMobile?.isdCode?.length <= 0 ||
          userData?.primaryMobile?.isdCode === undefined ||
          userData?.primaryMobile?.isdCode === null
        ),
      }))
    }
  }, [customerHash, userData, userStore?.userDetails?.userHash])

  return (
    <>
      {loader && <LoadingSpinner />}
      <MainGrid
        sx={{
          marginTop: isMobile ? "" : "1.042vw",
        }}>
        <SnackbarToast open={openErrorMessage} onClose={() => setOpenErrorMessage(false)} Message={snackMessage} />
        <Box>
          <Box textAlign={"center"} margin={isMobile ? "0vw 0vw 5.469vw" : "0vw 0vw 2.448vw"}>
            <Typography variant={isMobile ? "m-heading-s" : "heading-s"} sx={{ fontWeight: 300 }}>
              {title}
            </Typography>
          </Box>
          <Box>
            {/* 1st row */}
            <Stack
              flexDirection={isMobile ? "column" : "row"}
              columnGap={DesktopPxToVw(40)}
              rowGap={MobilePxToVw(40)}
              mb={isMobile ? MobilePxToVw(40) : DesktopPxToVw(36)}>
              <NameField
                fullWidth
                sx={{ width: isMobile ? "100%" : DesktopPxToVw(382) }}
                variant="standard"
                placeholder={"Name*"}
                disabled={disable?.senderFirstName}
                value={values.senderFirstName}
                name={senderFirstName}
                error={errors.senderFirstName}
                helperText={errors?.senderFirstName && (items?.[0]?.errorText ?? errorMessage?.senderFirstName)}
                onChange={(e: any) => handleForm(e)}
              />
              <EmailField
                disabled={disable?.senderEmail}
                fullWidth
                sx={{ width: isMobile ? "100%" : DesktopPxToVw(382) }}
                variant="standard"
                placeholder={"Email*"}
                value={values?.senderEmail}
                name={senderEmail}
                error={errors?.senderEmail}
                helperText={errors?.senderEmail && (items?.[1]?.errorText ?? errorMessage?.senderEmail)}
                onChange={(e: any) => handleForm(e)}
                inputProps={{ maxLength: 40 }}
              />
              <Stack flexDirection={"column"} width={isMobile ? "100%" : DesktopPxToVw(352)}>
                <MobileNumberWrapper>
                  <Box sx={{ width: isMobile ? "18.5vw" : "fit-content" }}>
                    <CountryCodeDropdown
                      countryCode={countryCode}
                      setCountryCode={setCountryCode}
                      isDisable={disable?.countryCodeValue}
                      dropdownStyle={{
                        width: isMobile ? "74.375vw" : "18.33vw",
                        margin: isMobile ? "0 0 0 10vw" : "0 0 0 6.5vw",
                      }}
                    />
                  </Box>
                  <PhoneNumberField
                    sx={{
                      "& input": {
                        marginLeft: "1.24vw",
                        "@media (max-width:640px)": {
                          marginLeft: "2vw",
                        },
                      },
                    }}
                    disabled={disable?.senderMobile}
                    fullWidth={isMobile}
                    variant="standard"
                    placeholder={"Mobile Number*"}
                    type="tel"
                    value={values?.senderMobile}
                    name={senderMobile}
                    error={errors?.senderMobile}
                    onChange={(e) => {
                      if (e?.target?.value?.match(/^[0-9]{0,10}$/)) handleForm(e)
                    }}
                    inputProps={{ maxLength: 12 }}
                  />
                </MobileNumberWrapper>
                {errors?.senderMobile && (
                  <ErrorMessageTypography>
                    {items?.[2]?.errorText ?? ERROR_MESSAGES?.PHONE_NUMBER}
                  </ErrorMessageTypography>
                )}
              </Stack>
            </Stack>
            {/* 2nd row */}
            <Stack
              flexDirection={isMobile ? "column" : "row"}
              columnGap={DesktopPxToVw(40)}
              rowGap={MobilePxToVw(40)}
              mb={isMobile ? MobilePxToVw(40) : DesktopPxToVw(36)}>
              <NameField
                fullWidth
                sx={{ width: isMobile ? "100%" : DesktopPxToVw(577) }}
                variant="standard"
                placeholder={"Location*"}
                value={values.address}
                name={address}
                error={errors.address}
                helperText={errors?.address && (items?.[3]?.errorText ?? errorMessage?.address)}
                onChange={(e: any) => handleForm(e)}
              />
              <NameField
                fullWidth
                sx={{ width: isMobile ? "100%" : DesktopPxToVw(577) }}
                variant="standard"
                placeholder={"Restaurant*"}
                value={values.companyName}
                name={companyName}
                error={errors.companyName}
                helperText={errors?.companyName && (items?.[4]?.errorText ?? errorMessage?.companyName)}
                onChange={(e: any) => handleForm(e)}
              />
            </Stack>
            {/* 3rd row */}
            <Stack
              justifyContent={"space-between"}
              flexDirection={isMobile ? "column" : "row"}
              columnGap={DesktopPxToVw(40)}
              rowGap={MobilePxToVw(40)}
              mb={isMobile ? MobilePxToVw(40) : DesktopPxToVw(36)}
              alignItems={"start"}
              width={"100%"}>
              <Box
                sx={{
                  display: "flex",
                  gap: isMobile ? "3.125vw" : "2.083vw",
                  width: isMobile ? "100%" : "unset",
                  alignItems: "start",
                  alignSelf: "start",
                  justifyContent: "space-between",
                }}>
                {/*Date*/}
                <Box width={isMobile ? MobilePxToVw(223) : DesktopPxToVw(382)}>
                  <ColumnFlexBox
                    sx={{
                      "& .MuiFormControl-root": {
                        height: isMobile ? "6.25vw" : "2.083vw",
                      },
                    }}>
                    {errors?.date && (
                      <ErrorMessageTypography>{items?.[5]?.errorText ?? errorMessage?.date}</ErrorMessageTypography>
                    )}
                  </ColumnFlexBox>
                </Box>
                {/*Time*/}
                <ColumnFlexBox
                  sx={{
                    width: isMobile ? MobilePxToVw(223) : DesktopPxToVw(382),
                  }}>
                  <AsyaFormControl
                    fullWidth={isMobile}
                    variant="standard"
                    sx={{
                      width: isMobile ? MobilePxToVw(223) : DesktopPxToVw(382),
                    }}>
                    {values?.timeSlot?.length == 0 && <StyledInputLabel>{"Time*"}</StyledInputLabel>}
                    <Select
                      style={{
                        width: isMobile ? "100%" : DesktopPxToVw(382),
                      }}
                      variant="standard"
                      value={values?.timeSlot}
                      name="timeSlot"
                      onChange={(e: any) => handleForm(e)}
                      sx={{
                        "& .MuiSelect-select": {
                          "&::focus": {
                            backgroundColor: isMobile
                              ? theme?.palette?.background?.paper
                              : theme?.palette?.background?.default,
                          },
                        },
                      }}
                      IconComponent={() => <KeyboardArrowDownIcon sx={{ marginBottom: "0.4vw" }} />}
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
                      }}>
                      {timeSlots?.map((item: any, index: number) => (
                        <StyledMenuItem
                          key={index}
                          value={item?.time}
                          sx={{
                            fontFamily: "supreme",
                            fontSize: isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
                          }}>
                          {item?.time}
                        </StyledMenuItem>
                      ))}
                    </Select>
                  </AsyaFormControl>
                  {errors?.timeSlot && (
                    <ErrorMessageTypography>{items?.[6]?.errorText ?? errorMessage?.timeSlot}</ErrorMessageTypography>
                  )}
                </ColumnFlexBox>
              </Box>
              <ColumnFlexBox sx={{ alignSelf: "start" }}>
                <AsyaFormControl
                  fullWidth={isMobile}
                  variant="standard"
                  sx={{
                    width: isMobile ? "100%" : DesktopPxToVw(354),
                  }}>
                  {values?.noOfGuests?.length == 0 && <StyledInputLabel>{"Guests*"}</StyledInputLabel>}
                  <Select
                    variant="standard"
                    value={values?.noOfGuests}
                    name="noOfGuests"
                    sx={{
                      "& .MuiSelect-select": {
                        "&::focus": {
                          backgroundColor: isMobile
                            ? theme?.palette?.background?.paper
                            : theme?.palette?.background?.default,
                        },
                      },
                    }}
                    onChange={(e: any) => handleForm(e)}
                    IconComponent={() => <KeyboardArrowDownIcon sx={{ marginBottom: "0.4vw" }} />}
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
                    }}>
                    {guestsData?.map((item: any, index: number) => (
                      <StyledMenuItem
                        key={index}
                        value={item?.noOfGuests}
                        sx={{
                          fontFamily: "supreme",
                          fontSize: isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
                        }}>
                        {item?.noOfGuests}
                      </StyledMenuItem>
                    ))}
                  </Select>
                </AsyaFormControl>
                {errors?.noOfGuests && (
                  <ErrorMessageTypography>{items?.[7]?.errorText ?? errorMessage?.noOfGuests}</ErrorMessageTypography>
                )}
              </ColumnFlexBox>
            </Stack>
            {/* 4th row */}
            <Stack
              flexDirection={isMobile ? "column" : "row"}
              columnGap={DesktopPxToVw(40)}
              rowGap={MobilePxToVw(40)}
              mb={isMobile ? MobilePxToVw(40) : DesktopPxToVw(36)}
              alignItems={"start"}
              width={"100%"}>
              <Box sx={{ textAlign: "start" }}>
                <DescribeEventTypography $isMobile={isMobile}>{items?.[8]?.labelText}</DescribeEventTypography>
                <DescriptionTextField
                  variant="standard"
                  multiline
                  value={values?.customMessage}
                  name={customMessage}
                  sx={{
                    width: isMobile ? MobilePxToVw(476) : DesktopPxToVw(1194),
                  }}
                  onChange={(e) => {
                    if (e?.target?.value?.match(/^[A-Za-z0-9., ]{0,400}$/)) {
                      handleForm(e)
                    }
                  }}
                  helperText={
                    errors?.customMessage &&
                    values?.customMessage.length > 0 &&
                    values?.companyName.length < 3 &&
                    items?.[7]?.errorText
                  }
                />
              </Box>
            </Stack>
          </Box>
          <ButtonWrapper
            sx={{
              margin: "0vw!important",
              marginTop: isMobile ? "8.594vw!important" : "2.083vw!important",
            }}>
            <RenderActionItem
              url={PrimaryAction?.url}
              isActionButtonType={true}
              title={PrimaryAction?.title}
              variant={PrimaryAction?.variant}
              navigationType={PrimaryAction?.urlType}
              buttonStyles={{
                letterSpacing: "0.1em",
                whiteSpace: "nowrap",
                width: isMobile ? MobilePxToVw(222) : DesktopPxToVw(222),
                marginBottom: isMobile ? MobilePxToVw(52) : DesktopPxToVw(46),
              }}
              onClick={() => {
                if (
                  values?.senderFirstName?.length > 0 &&
                  values?.senderEmail?.length > 0 &&
                  values?.senderMobile?.length > 0 &&
                  values?.companyName?.length > 0 &&
                  values?.address?.length > 0 &&
                  values?.timeSlot?.length > 0 &&
                  values?.noOfGuests?.length > 0 &&
                  date?.length > 0 &&
                  !errors?.senderFirstName &&
                  !errors?.senderEmail &&
                  !errors?.senderMobile &&
                  !errors?.address
                ) {
                  handleSubmit()
                  handleReserve()
                } else {
                  checkEmptyFields()
                }
              }}
            />
          </ButtonWrapper>
          <Box textAlign={"center"}>
            {singleContent && singleContent?.map((item: any, idx: number) => <PortableText blocks={item} key={idx} />)}
          </Box>
        </Box>
      </MainGrid>
    </>
  )
}

export default ReserveATableEnquireForm
