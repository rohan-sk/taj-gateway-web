import dynamic from "next/dynamic"
import { GAStore, UserStore } from "../../../../store"
import { GLOBAL_STORES } from "../../../../utils/Constants"
import { getCookie } from "../../../../utils/cookie"
import { useDebounce } from "../../../../utils/useDebounce"
import { ENQUIRE_NOW_SUBMIT } from "../../../../utils/analytics/constants"
import { nameFieldsRestrictions } from "../../../../components/forms/common/utils/nameFieldRestrictionsHandler"
import { triggerEvent } from "../../../../utils/analytics"
import { MemberDataLayer } from "../../../../utils/analytics/member-data-layer"
import { useMobileCheck } from "../../../../utils/isMobilView"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { formatDateWithMON, getMinDate, getNextDate, getPreviousDateObj } from "../../../../utils/getDate"
import { RestrictSpecialChar } from "../../../../utils/restrictSpecialChar"
import TextfieldValidator from "../../../../utils/validations/TextfieldValidator"
import { PageContext } from "../../../../PresentationalComponents/lib/prepare-page-context"
import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { Box, FormControl, Grid, InputAdornment, RadioGroup, Stack, Typography, Zoom } from "@mui/material"
import { validateErrorsAndSubmit } from "./validate-and-submit"
import { observer } from "mobx-react-lite"
import { InputTextField } from "../../../../components/forms/enquiry-forms/news-letter-form/news-letter-form.styles"
import { invoiceFieldsRestrictions } from "./InvoiceFieldsRestrictions"
import { PathType } from "../../../../types"
import { theme } from "../../../../lib/theme"
import { HotelInformation } from "../../../../components/forms/book-a-stay-form/types"
import { ExpandMoreIcon } from "../../../../components/header/styles/booking-menu"
import { AutoCompleteInput } from "../../../../components/forms/gift-card-form/styles"
import { StyledDivider } from "../../../../components/banner/styles"
import SearchStore from "../../../search/store/search.store"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import {
  NEUCOINS_LABELS_CONSTANTS,
  PLACEHOLDERS,
  amount,
  orderRefNumber,
  senderEmail,
  senderFirstName,
  senderMobile,
} from "../../../../components/forms/gift-card-form/constants"
import {
  AccountCalenderIcon,
  ButtonTickIcon,
  ClockIcon,
  CloseIcon,
  CommonSearchIcon,
  DocumentIcon,
  SearchIcon,
} from "../../../../utils/customIcons"
import {
  handleHotelSearch,
  hotelRegexCheck,
  hotelSearchRestrictions,
} from "../../../../components/forms/book-a-stay-form/utils"
import {
  WrapperBox,
  StyledButton,
  InputText,
  BorderBox,
  FormControlText,
  CustomRadio,
  TitleContainer,
  DocumentContainer,
} from "./styles"
import {
  OptionTypography,
  StyledAutocomplete,
  StyledPaper,
} from "../../../../components/card/styles/book-a-stay-default-card.styles"

const RenderActionItem = dynamic(() => import("../../../../components/hoc/actions/action-items-ui"))
const CountryCodeDropdown = dynamic(() => import("../../../../utils/CountryCodeDropdown"))
const BrowseFile = dynamic(() => import("./browse-file"))
const SuccessScreen = dynamic(() => import("./success-screen"))
const CustomDatePickerComponent = dynamic(
  () => import("../../../../components/hoc/CustomDatePicker/custom-date-picker.component"),
)

const ClaimMissingPoints = (props: any) => {
  const context = useContext(IHCLContext)
  const pageContextUse = useContext(PageContext)

  //* search store values
  const searchStore = context?.getGlobalStore(GLOBAL_STORES.searchStore) as SearchStore
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const dataLayer = MemberDataLayer(UserStore, gaStoreData)
  const { searchResults } = searchStore
  const isMobile = useMobileCheck()

  //refs
  const boxRef: any = useRef(null)

  const currentDate = new Date()
  const previousMonth = new Date(currentDate)
  previousMonth.setMonth(currentDate.getMonth() - 1)

  const initialFormValues = {
    reservationName: "",
    [senderEmail]: global?.window?.localStorage?.getItem("userEmail") || "",
    havePhysicalCopy: true,
    [senderFirstName]: "",
    [senderMobile]: global?.window?.localStorage?.getItem("userPhoneNumber") || "",
    [orderRefNumber]: "",
    [amount]: "",
    venueName: "",
    approximateTime: "",
  }

  //states
  const [forStay, setForStay] = useState<string>("forStay")
  const [formValues, setFormValues] = useState<any>(initialFormValues)
  const [document, setDocument] = useState<any>(null)
  const [error, setError] = useState<any>()
  const [searchResultsResponseData, setResultsResponseData] = useState<any>([])
  const [stayHotelName, setStayHotelName] = useState<HotelInformation | null>(null)
  const [otherHotelName, setOtherHotelName] = useState<HotelInformation | null>(null)
  const [formErrors, setFormErrors] = useState<any>()
  const [ErrorMessage, setErrorMessage] = useState<any>()
  const [stayDate, setStayDate] = useState<any>([])
  const [reservationDate, setReservationStayDate] = useState<any>("")
  const [requestSuccess, setRequestSuccess] = useState<boolean>(false)
  const [isFormSubmit, setIsFormSubmit] = useState<boolean>(false)
  const [isValidTime, setIsValidTime] = useState<boolean>(false)
  const [selectedType, setSelectedType] = useState<string>("check_in")
  const [refresh, setRefresh] = useState<any>(new Date().getTime())
  const [receiverCountryCode, setReceiverCountryCode] = useState<string>(
    global?.window?.localStorage?.getItem("userCountryCode") ?? "+91",
  )
  const [openCalender, setOpenCalender] = useState({
    checkInCheckOut: false,
    reservation: false,
  })

  //Debounce Hook
  const debouncedStaySearchTerm = useDebounce(stayHotelName, 300)
  const debouncedOtherSearchTerm = useDebounce(otherHotelName, 300)

  //useEffetcs
  useEffect(() => {
    if (searchResults?.hotels) {
      setResultsResponseData([
        {
          hotelsData: searchResults?.hotels?.data,
        },
      ])
    }
  }, [searchResults])

  useEffect(() => {
    if (!JSON.parse(formValues?.havePhysicalCopy)) {
      setDocument(null)
    }
  }, [formValues?.havePhysicalCopy])

  useEffect(() => {
    if (openCalender?.checkInCheckOut || openCalender?.reservation) {
      if (boxRef.current) {
        boxRef.current.scrollIntoView({
          block: "center",
          inline: "nearest",
          behavior: "smooth",
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCalender?.checkInCheckOut || openCalender?.reservation])

  useMemo(() => {
    if (debouncedStaySearchTerm) {
      searchStore?.autoCompleteSearch(stayHotelName?.name ?? "")
    } else if (debouncedOtherSearchTerm) {
      searchStore?.autoCompleteSearch(otherHotelName?.name ?? "")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedStaySearchTerm, searchStore, debouncedOtherSearchTerm])

  const handleSearchClose = () => {
    setError((prev: any) => ({
      ...prev,
      search: true,
    }))
    setStayHotelName(() => null)
  }

  const handleDateSelection = (date: any) => {
    const startDate = new Date(stayDate?.[0])
    if (selectedType === "check_in") {
      setStayDate([date?.[0], getNextDate(date?.[0])])
      setSelectedType("check_out")
      setOpenCalender((prev: any) => ({ ...prev, checkInCheckOut: true }))
    } else if (
      `${startDate?.getDate()}${startDate?.getMonth()}${startDate?.getFullYear()}` ===
      `${date?.[0]?.getDate()}${date?.[0]?.getMonth()}${date?.[0]?.getFullYear()}`
    ) {
      const tomorrow = new Date(startDate)
      tomorrow.setDate(new Date(startDate).getDate() + 1)
      setStayDate([startDate, tomorrow])
    } else if (date?.[0] <= startDate) {
      setStayDate([date?.[0], startDate])
    } else {
      setStayDate(
        startDate?.toString() === "Invalid Date"
          ? [getPreviousDateObj(date?.[0]), new Date(date?.[0])]
          : [startDate, date?.[0]],
      )
    }
  }

  const formValidation = (isFormValid: any, field: any) => {
    setFormErrors({ ...formErrors, [field]: !isFormValid })
  }

  const handleChangeForm = (event: any) => {
    const { name, value } = event.target
    const { status, errorMsg, fieldName } = TextfieldValidator(name, value, "fromClaimCoins")
    setErrorMessage((prev: any) => {
      return {
        ...prev,
        [fieldName]: errorMsg,
      }
    })
    setFormValues((prev: any) => {
      return {
        ...prev,
        [name]: event?.target?.value,
      }
    })
    formValidation(status, name)
  }

  const handleFileUpload = (e: any) => {
    const fileExtensions = ["jpg", "pdf", "jpeg"]

    const file = e.target.files[0]

    if (file) {
      const fileName = file.name
      const fileExtension = fileName.split(".").pop().toLowerCase()

      if (!fileExtensions.includes(fileExtension)) {
        alert("Only JPG and PDF files are allowed.")
      } else if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds the maximum limit of 5MB.")
      } else {
        setDocument(file)
      }
      setFormErrors({
        ...formErrors,
        document: false,
      })
    }
  }

  //Analytics
  const handleEnquiry = (title: string, urlType: any) => {
    triggerEvent({
      action: ENQUIRE_NOW_SUBMIT,
      params: {
        ...dataLayer,
        preferred_location: stayHotelName?.name || otherHotelName?.name,
        event_date: forStay === "forStay" ? `${stayDate?.[0]}-${stayDate?.[1]}` : reservationDate,
        additional_comment: "",
        bill_submitted: formValues?.havePhysicalCopy,
        eventName: forStay === "forStay" ? "Stay" : "Others",
        link_text: title,
        link_url: "",
        buttonLinkName: title,
        clientId: getCookie("_ga")?.slice(6),
        outbound: urlType === PathType?.internal ? false : true,
        option_Selected: title,
        widget_title: props?.title,
        widget_type: props?._type,
        pageSection: props?.title,
      },
    })
  }

  return (
    <Box
      ref={boxRef}
      sx={{
        paddingBottom: isMobile ? MobilePxToVw(0) : DesktopPxToVw(1),
      }}>
      {!isFormSubmit ? (
        <form>
          <BorderBox>
            <TitleContainer>
              <Typography
                variant={isMobile ? "m-body-l" : "body-l"}
                sx={{
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  paddingBottom: isMobile ? "5.469vw" : "unset",
                  paddingTop: isMobile ? MobilePxToVw(22) : DesktopPxToVw(0),
                }}>
                YOUR INFORMATION FOR
              </Typography>
              <WrapperBox $gap="1.563vw">
                <WrapperBox $gap="0.521vw">
                  <StyledButton
                    $active={forStay === "forStay"}
                    $width={"6.875vw"}
                    onClick={() => {
                      setForStay("forStay")
                      setOpenCalender({
                        checkInCheckOut: false,
                        reservation: false,
                      })
                    }}
                    startIcon={forStay === "forStay" && <ButtonTickIcon />}>
                    STAY
                  </StyledButton>
                  <StyledButton
                    $active={!(forStay === "forStay")}
                    $width={"8.438vw"}
                    onClick={() => {
                      setForStay("others")
                    }}
                    startIcon={forStay !== "forStay" && <ButtonTickIcon />}>
                    OTHERS
                  </StyledButton>
                </WrapperBox>
              </WrapperBox>
            </TitleContainer>

            <Grid
              container
              columnSpacing={4}
              sx={{
                paddingTop: isMobile ? MobilePxToVw(55) : DesktopPxToVw(40),
                alignItems: "start",
              }}>
              <Grid item md={5.85} sm={12} xs={12}>
                <InputTextField
                  variant="standard"
                  sx={{ width: "100%" }}
                  placeholder={props?.items?.[0]?.labelText}
                  onChange={(e: any) => {
                    nameFieldsRestrictions(e, handleChangeForm)
                  }}
                  value={formValues?.senderFirstName}
                  name={senderFirstName}
                  error={formErrors?.senderFirstName}
                  helperText={
                    formErrors?.senderFirstName &&
                    formValues.senderFirstName.length >= 0 &&
                    props?.items?.[0]?.errorText
                  }
                />
              </Grid>
              <Grid
                item
                md={5.85}
                sm={12}
                xs={12}
                sx={{
                  paddingTop: isMobile ? MobilePxToVw(35) : "unset",
                  display: "flex",
                }}>
                <CountryCodeDropdown
                  scroll
                  openingDelay={300}
                  menuHeight={250}
                  titleStyles={{ bottom: "0.2vw" }}
                  isCustomizedArrow={true}
                  parentStyles={{
                    minHeight: isMobile ? "6.25vw" : DesktopPxToVw(40),
                    "&, & .MuiSelect-select.MuiSelect-standard.MuiInputBase-input.MuiInput-input, & .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-colorPrimary, & input~div":
                      {
                        display: "flex",
                        alignItems: "center",
                        gap: DesktopPxToVw(5),
                        height: isMobile ? "6.25vw" : DesktopPxToVw(40),
                      },
                    "& span": {
                      margin: "0vw",
                      position: "unset",
                    },
                    "@media (max-Width:640px)": {
                      "& .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-colorPrimary": {
                        minWidth: "initial",
                        paddingBottom: "0vw",
                        height: "6.25vw",
                      },
                    },
                  }}
                  iconStyle={{
                    position: "static !important",
                    color: `${theme?.palette?.ihclPalette?.hexSeventeen} !important`,
                    width: isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
                    height: isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
                  }}
                  dropdownStyle={{
                    marginLeft: isMobile ? MobilePxToVw(60) : DesktopPxToVw(173),
                    width: isMobile ? MobilePxToVw(500) : DesktopPxToVw(455),
                  }}
                  customSelectStyles={{
                    paddingBottom: isMobile && "0.7vw !important",
                  }}
                  countryCode={receiverCountryCode}
                  setCountryCode={setReceiverCountryCode}
                />
                <InputTextField
                  onInput={(e: any) => {
                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                  }}
                  type="tel"
                  onKeyDown={RestrictSpecialChar}
                  variant="standard"
                  sx={{
                    width: "100%",
                    paddingLeft: "0vw",
                    // "& .MuiInputBase-input": {
                    //   padding:
                    //     isIos && isMobile && formErrors?.senderMobile
                    //       ? "0.25vw"
                    //       : "0vw",
                    // },
                    "& input, & label": {
                      paddingLeft: isMobile ? MobilePxToVw(14) : DesktopPxToVw(24),
                    },
                  }}
                  placeholder={props?.items?.[1]?.labelText}
                  value={isNaN(Number(formValues?.senderMobile)) ? "" : formValues?.senderMobile}
                  name={senderMobile}
                  onChange={(e: any) => handleChangeForm(e)}
                  error={formErrors?.senderMobile}
                  helperText={formErrors?.senderMobile && props?.items?.[1]?.errorText}
                />
              </Grid>
            </Grid>
            <Grid
              container
              columnSpacing={4}
              sx={{
                paddingTop: isMobile ? MobilePxToVw(35) : DesktopPxToVw(40),
              }}>
              <Grid item md={5.85} sm={12} xs={12}>
                <InputTextField
                  variant="standard"
                  sx={{ width: "100%", padding: "0vw" }}
                  placeholder={props?.items?.[2]?.labelText}
                  onChange={(e: any) => handleChangeForm(e)}
                  value={formValues?.senderEmail}
                  name={senderEmail}
                  error={formErrors?.senderEmail}
                  helperText={formErrors?.senderEmail && props?.items?.[2]?.errorText}
                />
              </Grid>

              <Grid item md={5.85} sm={12} xs={12} container sx={{ paddingTop: isMobile ? MobilePxToVw(35) : "unset" }}>
                <Grid item md={12} xs={12}>
                  <InputTextField
                    variant="standard"
                    sx={{ width: "100%" }}
                    placeholder={
                      forStay === "forStay" ? `${props?.items?.[3]?.labelText}` : `${props?.items?.[4]?.labelText}`
                    }
                    onChange={(e: any) => {
                      invoiceFieldsRestrictions(e, handleChangeForm)
                    }}
                    value={formValues?.[orderRefNumber]}
                    name={orderRefNumber}
                    error={forStay === "forStay" && formErrors?.[orderRefNumber]}
                    helperText={forStay === "forStay" && formErrors?.[orderRefNumber] && props?.items?.[3]?.errorText}
                  />
                </Grid>
              </Grid>
            </Grid>
            {forStay === "forStay" ? (
              <Grid
                container
                columnSpacing={4}
                sx={{
                  paddingTop: isMobile ? MobilePxToVw(35) : "unset",
                  display: "flex",
                }}>
                <Grid
                  item
                  md={5.85}
                  sm={12}
                  xs={12}
                  sx={{
                    paddingTop: isMobile ? MobilePxToVw(0) : DesktopPxToVw(55),
                  }}>
                  {/* using react-date-picker */}
                  <Box
                    position={"relative"}
                    width={"100%"}
                    key={refresh}
                    sx={{
                      borderBottom:
                        formErrors?.stayDate && stayDate?.length === 0
                          ? `0.026vw solid ${theme?.palette?.ihclPalette?.hexTwentySeven}` //red
                          : `0.026vw solid ${theme?.palette?.ihclPalette?.hexTwenty}`, //ash
                      ".react-date-picker__calendar--open": {
                        transform: "unset !important",
                        WebkitTransform: "unset !important",
                      },
                    }}>
                    <CustomDatePickerComponent
                      sx={{ cursor: "pointer" }}
                      date={stayDate}
                      isOpen={openCalender.checkInCheckOut}
                      onChange={handleDateSelection}
                      maxDate={new Date(new Date().setDate(new Date().getDate() - 1))} //get date till yesterday
                      minDate={getMinDate()}
                      calendarWidth={isMobile ? MobilePxToVw(410) : "100%"}
                      calendarIcon={null}
                      showDoubleView={false}
                      selectRange={true}
                      allowPartialRange
                      onCalendarClose={() => {
                        setRefresh(`${new Date().getTime()}`)
                        setOpenCalender({
                          ...openCalender,
                          checkInCheckOut: !openCalender.checkInCheckOut,
                        })
                      }}
                      focusSelectedMonth={true}
                      renderComponent={
                        <Stack
                          alignItems={"center"}
                          flexDirection={"row"}
                          paddingBottom={isMobile ? "1.4vw" : "0.4vw"}
                          onClick={() =>
                            setOpenCalender({
                              ...openCalender,
                              checkInCheckOut: !openCalender.checkInCheckOut,
                            })
                          }
                          columnGap={DesktopPxToVw(10)}>
                          <AccountCalenderIcon sx={{ height: isMobile ? "4.302vw" : "1.302vw" }} />

                          <Typography
                            onClick={() => setSelectedType("check_in")}
                            whiteSpace={"nowrap"}
                            variant={isMobile ? "m-body-sl" : "body-ml"}
                            sx={{
                              marginLeft: isMobile ? "3.094vw" : "0.54vw",
                              marginRight: isMobile ? "3.094vw" : "1.094vw",
                            }}>
                            {stayDate?.[0]
                              ? formatDateWithMON(stayDate?.[0])
                              : `${props?.items?.[5]?.checkBoxList?.[0]?.value}`}
                          </Typography>
                          <StyledDivider
                            sx={{
                              width: isMobile ? `${MobilePxToVw(50)} !important` : `${DesktopPxToVw(50)} !important`,
                            }}
                          />
                          <Typography
                            onClick={() => setSelectedType("check_out")}
                            whiteSpace={"nowrap"}
                            variant={isMobile ? "m-body-sl" : "body-ml"}
                            sx={{
                              marginLeft: isMobile ? "3.094vw" : "0.54vw",
                              marginRight: isMobile ? "3.094vw" : "1.094vw",
                            }}>
                            {stayDate?.[1]
                              ? formatDateWithMON(stayDate?.[1])
                              : `${props?.items?.[5]?.checkBoxList?.[1]?.value}`}
                          </Typography>
                        </Stack>
                      }></CustomDatePickerComponent>
                  </Box>
                  <Typography
                    sx={{
                      color: theme?.palette?.ihclPalette?.hexTwentySeven,
                      fontSize: isMobile ? MobilePxToVw(18) : DesktopPxToVw(18),
                      paddingTop: "0.12vw",
                    }}>
                    {formErrors?.stayDate && stayDate?.length === 0 && props?.items?.[5]?.errorText}
                  </Typography>
                </Grid>
                <Grid item md={5.85} sm={12} xs={12}>
                  <StyledAutocomplete
                    noOptionsText={"search hotel name"}
                    onKeyDown={(e: any) => {
                      hotelSearchRestrictions(e)
                    }}
                    onInput={(event: any) => {
                      if (event?.target.value) {
                        handleHotelSearch(event, setStayHotelName, setError, "")
                      }
                    }}
                    onChange={(event: any, newValue: any) => {
                      if (newValue) {
                        handleHotelSearch(event, setStayHotelName, setError, newValue)
                        setFormErrors((prev: any) => ({
                          ...prev,
                          hotelName: !newValue || !newValue?.name || !newValue?.brand_name,
                        }))
                      }
                    }}
                    getOptionLabel={(option: any) => option.name}
                    popupIcon={<ExpandMoreIcon />}
                    value={stayHotelName}
                    options={stayHotelName?.name ? searchResultsResponseData?.[0]?.hotelsData || [] : []}
                    PaperComponent={({ children }: any) => <StyledPaper>{children}</StyledPaper>}
                    renderOption={(props: any) => {
                      return (
                        <OptionTypography variant={isMobile ? "m-body-m" : "body-m"} {...props}>
                          {props.key}
                        </OptionTypography>
                      )
                    }}
                    renderInput={(params: any) => {
                      const { InputProps } = params

                      const temp = {
                        ...params,
                        InputProps: {
                          ...InputProps,
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon
                                sx={{
                                  height: isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
                                  marginBottom: isMobile ? "1.1vw" : "0.1vw",
                                  width: isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
                                  marginRight: isMobile ? "2.98vw" : "0.65vw",
                                }}
                              />
                            </InputAdornment>
                          ),
                          endAdornment: stayHotelName?.name && stayHotelName?.name?.length > 0 && (
                            <InputAdornment position="end">
                              <Box component={"div"} onClick={handleSearchClose}>
                                <CloseIcon
                                  sx={{
                                    cursor: "pointer",
                                    height: isMobile ? "auto" : "0.8vw",
                                    width: isMobile ? "2.5vw" : "1vw",
                                  }}
                                />
                              </Box>
                            </InputAdornment>
                          ),
                        },
                      }
                      return (
                        <AutoCompleteInput
                          sx={{
                            paddingTop: isMobile ? MobilePxToVw(35) : DesktopPxToVw(40),

                            paddingBottom: "0vw !important",
                            "& .MuiFormHelperText-root": {
                              color: `${theme?.palette?.ihclPalette?.hexTwentySeven} !important`,
                            },
                          }}
                          variant="standard"
                          error={
                            formErrors?.hotelName &&
                            (!stayHotelName || stayHotelName?.name || stayHotelName?.brand_name)
                          }
                          helperText={
                            formErrors?.hotelName &&
                            (!stayHotelName || stayHotelName?.name || stayHotelName?.brand_name) &&
                            props?.items?.[6]?.errorText
                          }
                          name={"name"}
                          placeholder={props?.items?.[6]?.labelText}
                          {...temp}
                          onChange={(event: any) => {
                            if (hotelRegexCheck(event)) {
                              handleHotelSearch(event, setStayHotelName, setError)
                            }
                          }}
                        />
                      )
                    }}
                  />
                </Grid>
              </Grid>
            ) : (
              <>
                <Grid
                  container
                  columnSpacing={4}
                  sx={{
                    paddingTop: isMobile ? MobilePxToVw(35) : DesktopPxToVw(40),
                    paddingBottom: "0vw !important",
                    display: "flex",
                  }}>
                  <Grid item md={5.85} sm={12} xs={12}>
                    <StyledAutocomplete
                      onChange={(event: any, newValue: any) => {
                        handleHotelSearch(event, setOtherHotelName, setError, newValue)
                      }}
                      onInput={(event: any) => {
                        handleHotelSearch(event, setOtherHotelName, setError)
                      }}
                      getOptionLabel={(option: any) => option.name}
                      popupIcon={<ExpandMoreIcon />}
                      value={otherHotelName}
                      options={otherHotelName?.name ? searchResultsResponseData?.[0]?.hotelsData || [] : []}
                      PaperComponent={({ children }: any) => <StyledPaper>{children}</StyledPaper>}
                      renderOption={(props: any) => {
                        return (
                          <OptionTypography variant={isMobile ? "m-body-m" : "body-m"} {...props}>
                            {props.key}
                          </OptionTypography>
                        )
                      }}
                      renderInput={(params: any) => {
                        const { InputProps } = params

                        const temp = {
                          ...params,
                          InputProps: {
                            ...InputProps,
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                sx={{
                                  paddingRight: isMobile ? MobilePxToVw(10) : DesktopPxToVw(12),
                                }}>
                                <CommonSearchIcon
                                  sx={{
                                    alignItems: "center",
                                    width: isMobile ? "3.906vw" : "1.287vw",
                                    height: isMobile ? "3.750vw" : "1.296vw",
                                  }}
                                />
                              </InputAdornment>
                            ),
                            endAdornment: otherHotelName?.name && otherHotelName?.name?.length > 0 && (
                              <InputAdornment position="end">
                                <Box
                                  component={"div"}
                                  onClick={() => {
                                    setOtherHotelName(() => null)
                                    setFormErrors({
                                      ...formErrors,
                                      otherHotelName: false,
                                    })
                                  }}>
                                  <CloseIcon
                                    sx={{
                                      cursor: "pointer",
                                      height: isMobile ? "auto" : "0.8vw",
                                      width: isMobile ? "2.5vw" : "1vw",
                                    }}
                                  />
                                </Box>
                              </InputAdornment>
                            ),
                          },
                        }
                        return (
                          <AutoCompleteInput
                            sx={{
                              "& .MuiFormHelperText-root": {
                                color: `${theme?.palette?.ihclPalette?.hexTwentySeven} !important`,
                              },
                            }}
                            variant="standard"
                            name={"name"}
                            error={otherHotelName === null && formErrors?.otherHotelName}
                            helperText={
                              formErrors?.otherHotelName && otherHotelName === null && props?.items?.[6]?.errorText
                            }
                            placeholder={props?.items?.[6]?.labelText}
                            {...temp}
                          />
                        )
                      }}
                    />
                  </Grid>
                  <Grid item md={5.85} sm={12} xs={12}>
                    <InputText
                      variant="standard"
                      name="venueName"
                      onChange={(e: any) => handleChangeForm(e)}
                      sx={{ width: "100%" }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            sx={{
                              paddingRight: isMobile ? MobilePxToVw(10) : DesktopPxToVw(12),
                            }}>
                            <CommonSearchIcon
                              sx={{
                                width: isMobile ? "3.906vw" : "1.287vw",
                                height: isMobile ? "3.750vw" : "1.296vw",
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      value={formValues?.venueName}
                      placeholder={props?.items?.[7]?.labelText}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  columnSpacing={4}
                  sx={{
                    paddingTop: isMobile ? MobilePxToVw(0) : DesktopPxToVw(40),
                    display: "flex",
                    // alignItems: "flex-end",
                  }}>
                  <Grid
                    item
                    md={5.85}
                    sm={12}
                    xs={12}
                    sx={{
                      paddingTop: isMobile ? MobilePxToVw(35) : DesktopPxToVw(17),
                    }}>
                    <Box
                      position={"relative"}
                      width={"100%"}
                      onFocus={() => {
                        setOpenCalender((prev: any) => ({
                          ...prev,
                          reservation: true,
                        }))
                      }}
                      sx={{
                        borderBottom: `0.026vw solid ${theme?.palette?.ihclPalette?.hexTwenty}`,
                      }}>
                      <CustomDatePickerComponent
                        maxDate={new Date()}
                        date={reservationDate}
                        isOpen={openCalender?.reservation}
                        sx={{
                          width: "100%",
                          cursor: "pointer",
                          paddingTop: isMobile ? MobilePxToVw(10) : "unset",
                        }}
                        onChange={(date: any) => {
                          setReservationStayDate(date)
                        }}
                        defaultActiveStartDate={new Date()}
                        calendarWidth={isMobile ? MobilePxToVw(410) : DesktopPxToVw(450)}
                        onCalendarOpen={() => {
                          setOpenCalender((prev: any) => ({
                            ...prev,
                            reservation: true,
                          }))
                        }}
                        onCalendarClose={() =>
                          setOpenCalender({
                            ...openCalender,
                            reservation: false,
                          })
                        }
                        calendarIcon={null}
                        renderComponent={
                          <Stack
                            alignItems={"center"}
                            flexDirection={"row"}
                            paddingBottom={isMobile ? "0vw" : "0.567vw"}
                            onClick={() =>
                              setOpenCalender({
                                ...openCalender,
                                reservation: !openCalender.reservation,
                              })
                            }
                            columnGap={DesktopPxToVw(10)}>
                            <AccountCalenderIcon
                              sx={{
                                width: isMobile ? "3.906vw" : "1.342vw",
                                height: isMobile ? "3.750vw" : "1.350vw",
                              }}
                            />
                            <Typography
                              whiteSpace={"nowrap"}
                              paddingLeft={isMobile ? "3.042vw" : "0.62vw"}
                              variant={isMobile ? "m-body-sl" : "body-ml"}>
                              {reservationDate?.length !== 0
                                ? formatDateWithMON(reservationDate)
                                : `${props?.items?.[8]?.labelText}`}
                            </Typography>
                          </Stack>
                        }
                      />
                    </Box>
                    <Typography
                      sx={{
                        color: theme?.palette?.ihclPalette?.hexTwentySeven,
                        fontSize: isMobile ? "2.5vw" : "1vw",
                      }}>
                      {formErrors?.reservationDate && ErrorMessage?.reservationDate}
                    </Typography>
                  </Grid>
                  <Grid item md={5.85} sm={12} xs={12}>
                    <InputTextField
                      variant="standard"
                      inputProps={{
                        maxLength: 5,
                      }}
                      value={formValues?.approximateTime}
                      sx={{
                        width: "100%",
                        paddingTop: isMobile ? MobilePxToVw(35) : "unset",
                      }}
                      onKeyDown={(e: any) => {
                        if (/\W|_/g.test(e?.key) || /^[a-z]+$/.test(e?.key)) {
                          e?.preventDefault()
                        } else if (e.key === "Backspace") {
                          setFormValues({
                            ...formValues,
                            approximateTime: formValues?.approximateTime?.slice(
                              0,
                              formValues?.approximateTime?.length - 1,
                            ),
                          })
                          e.preventDefault()
                        }
                      }}
                      onChange={(e: any) => {
                        const inputTime = e.target.value
                        const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/
                        setFormValues({
                          ...formValues,
                          approximateTime: inputTime,
                        })
                        if (formValues?.approximateTime?.length === 2) {
                          setFormValues({
                            ...formValues,
                            approximateTime: formValues?.approximateTime + ":" + e.target.value?.slice(2),
                          })
                        } else {
                          setFormValues({
                            ...formValues,
                            approximateTime: inputTime,
                          })
                        }

                        if (timeRegex.test(inputTime)) {
                          setIsValidTime(true)
                          e?.preventDefault()
                        } else {
                          setIsValidTime(false)
                        }
                      }}
                      error={!isValidTime && formValues?.approximateTime?.length > 0}
                      helperText={
                        formValues?.approximateTime?.length > 0 &&
                        !isValidTime &&
                        "Invalid time format. Please use (HH:MM)"
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            sx={{
                              marginRight: isMobile ? "1.96vw" : "0.347vw",
                            }}>
                            <ClockIcon
                              sx={{
                                width: isMobile ? "5.302vw" : "2.302vw",
                                height: isMobile ? "4.302vw" : "1.302vw",
                                paddingRight: "0.521vw",
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      placeholder={props?.items?.[9]?.labelText}
                    />
                  </Grid>
                </Grid>
              </>
            )}
            <Box
              sx={{
                paddingTop: isMobile ? MobilePxToVw(55) : DesktopPxToVw(40),
              }}>
              <Typography variant={isMobile ? "m-body-l" : "body-l"}>{props?.items?.[10]?.labelText}</Typography>
              <FormControl sx={{ width: "100%" }}>
                <RadioGroup
                  sx={{ display: "flex", rowGap: "1.042vw" }}
                  aria-labelledby="radio-buttons"
                  defaultValue="Yes"
                  name="radio-buttons-group"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setFormValues({
                      ...formValues,
                      havePhysicalCopy: (event.target as HTMLInputElement).value,
                    })
                  }}>
                  <FormControlText
                    sx={{
                      letterSpacing: "-0.026vw",
                      lineHeight: "3.5vw",
                      marginRight: "0vw",
                      paddingTop: isMobile ? "2.063vw" : "1.042vw",
                    }}
                    value={true}
                    control={<CustomRadio />}
                    label={props?.items?.[10]?.checkBoxList?.[0]?.value}
                    checked={JSON.parse(formValues?.havePhysicalCopy)}
                  />
                  {JSON.parse(formValues?.havePhysicalCopy) && (
                    <Zoom in={JSON.parse(formValues?.havePhysicalCopy)}>
                      <Box>
                        <BrowseFile handleFileUpload={handleFileUpload} setDocument={setDocument} />
                        {document?.name && (
                          <DocumentContainer>
                            <Box
                              sx={{
                                columnGap: "1.042vw",
                                display: "flex",
                                alignItems: "center",
                              }}>
                              <DocumentIcon />
                              <Typography
                                sx={{
                                  wordBreak: "break-all",
                                  padding: isMobile ? "0vw 2.1vw" : "0vw 0.6vw",
                                  fontSize: isMobile ? MobilePxToVw(22) : DesktopPxToVw(24),
                                }}>
                                {document?.name}
                              </Typography>
                            </Box>
                            <CloseIcon
                              onClick={() => setDocument(null)}
                              sx={{
                                cursor: "pointer",
                                width: isMobile ? "2.813vw" : "1.04vw",
                                height: isMobile ? "2.813vw" : "1.04vw",
                              }}
                            />
                          </DocumentContainer>
                        )}
                        <Typography
                          sx={{
                            color: theme?.palette?.ihclPalette?.hexTwentySeven,
                            fontSize: isMobile ? MobilePxToVw(18) : DesktopPxToVw(18),

                            paddingTop: isMobile ? "2vw" : "0.38vw",
                            paddingLeft: isMobile ? "2vw" : "2vw",
                          }}>
                          {formErrors?.document && props?.items?.[10]?.errorText}
                        </Typography>
                      </Box>
                    </Zoom>
                  )}

                  <FormControlText
                    sx={{ paddingTop: isMobile ? MobilePxToVw(2) : "unset" }}
                    value={false}
                    control={<CustomRadio />}
                    label={props?.items?.[10]?.checkBoxList?.[1]?.value}
                    checked={!JSON.parse(formValues?.havePhysicalCopy)}
                  />
                  {!JSON.parse(formValues?.havePhysicalCopy) && (
                    <Grid container>
                      <Grid item md={5.85} sm={12} xs={12}>
                        <InputTextField
                          variant="standard"
                          sx={{ width: "100%" }}
                          placeholder={props?.items?.[11]?.labelText}
                          type="number"
                          onKeyDown={RestrictSpecialChar}
                          value={formValues?.amount}
                          name={amount}
                          error={formErrors?.amount}
                          helperText={
                            formErrors?.amount && formValues.amount.length >= 0 && props?.items?.[11]?.errorText
                          }
                          onChange={(e: any) => handleChangeForm(e)}
                        />
                      </Grid>
                    </Grid>
                  )}
                </RadioGroup>
              </FormControl>
            </Box>
          </BorderBox>
          <Stack
            gap={2}
            direction={"row"}
            pt={4}
            justifyContent={isMobile ? "center" : "left"}
            paddingTop={isMobile ? "5.469vw" : "2.083vw"}>
            <RenderActionItem
              isActionButtonType={true}
              url=""
              title={"SUBMIT"}
              variant="light-contained"
              navigationType="internal"
              buttonStyles={{ letterSpacing: "1.8px" }}
              onClick={() => {
                validateErrorsAndSubmit(
                  forStay,
                  formValues,
                  stayDate,
                  setStayDate,
                  setFormErrors,
                  setErrorMessage,
                  formErrors,
                  stayHotelName,
                  pageContextUse,
                  setRequestSuccess,
                  setOpenCalender,
                  setFormValues,
                  initialFormValues,
                  setStayHotelName,
                  setOtherHotelName,
                  otherHotelName,
                  setReservationStayDate,
                  setDocument,
                  document,
                  ErrorMessage,
                  receiverCountryCode,
                  reservationDate,
                  setIsFormSubmit,
                ),
                  handleEnquiry("SUBMIT", "internal")
              }}
            />
            <RenderActionItem
              isActionButtonType={true}
              url=""
              type={"reset"}
              title={"CLEAR"}
              buttonStyles={{ letterSpacing: "1.8px" }}
              onClick={() => {
                setDocument(null)
                setFormValues(initialFormValues)
                setFormErrors({
                  ...formErrors,
                  senderEmail: false,
                  senderMobile: false,
                  senderFirstName: false,
                  checkIn: false,
                  checkOut: false,
                  orderRefNumber: false,
                  stayDate: false,
                  hotelName: false,
                  document: false,
                  otherHotelName: false,
                })
                setStayHotelName(null)
                setOtherHotelName(null)
                setStayDate(() => [])
                window.scroll(0, 400)
              }}
              variant="light-outlined"
              navigationType="internal"
            />
          </Stack>
        </form>
      ) : (
        <SuccessScreen
          {...props}
          setFormErrors={setFormErrors}
          setRequestSuccess={setRequestSuccess}
          setIsFormSubmit={setIsFormSubmit}
          requestSuccess={requestSuccess}
        />
      )}
    </Box>
  )
}

export default observer(ClaimMissingPoints)
