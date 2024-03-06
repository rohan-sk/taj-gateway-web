import { ActionProps } from "../../../types"
import { theme } from "../../../../lib/theme"
import dynamic from "next/dynamic"
import { GAStore, UserStore } from "../../../../store"
import data from "./wedding-enquire-json.json"
import { CONSTANTS } from "../../../constants"
const CustomReadMore = dynamic(() => import("../../../hoc/CustomReadMore"))
import { GLOBAL_STORES } from "../../../../utils/Constants"
const SnackbarToast = dynamic(() => import("../../../../utils/SnackbarToast"))
import { useMobileCheck } from "../../../../utils/isMobilView"
import React, { useContext, useEffect, useRef, useState } from "react"
const LoadingSpinner = dynamic(() => import("../../../../utils/SpinnerComponent"))
const RenderActionItem = dynamic(() => import("../../../hoc/actions/action-items-ui"))
const CustomCheckBox = dynamic(() =>
  import("../../../hoc/CustomCheckBox/Checkbox").then((module) => module.CustomCheckBox),
)
import { useAppNavigation } from "../../../../utils/NavigationUtility"
import { Box, ClickAwayListener, InputAdornment, Stack, Typography } from "@mui/material"
const CountryCodeDropdown = dynamic(() => import("../../../../utils/CountryCodeDropdown"))
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import TextfieldValidator from "../../../../utils/validations/TextfieldValidator"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import { handler as weddingEnquireAPI } from "../../../../features/notification/api/handlers/wedding-enquire"
import { ReCaptchaStack, ReCaptchaErrorTypography } from "../khazana-enquiry-form/khazana-enquiry-form.styles"
import {
  senderEmail,
  senderMobile,
  customMessage,
  ERROR_MESSAGES,
  senderFirstName,
  ERROR_DESTINATION_HOTEL,
} from "../../gift-card-form/constants"
import {
  FullBox,
  CenterTextBox,
  CommonContainer,
  CountryCityGrid,
  WeddingFormWrapper,
  WeddingFormOverFlowWrapper,
  WeddingGridWrapper,
  NameTextFieldWrapper,
  CustomCheckBoxWrapper,
  DescriptionWrapperBox,
  FunctionDateContainer,
} from "./wedding-enquire-styles"
import { triggerEvent } from "../../../../utils/analytics"
import { getCookie } from "../../../../utils/cookie"
import { MemberDataLayer } from "../../../../utils/analytics/member-data-layer"
import { ENQUIRE_NOW_SUBMIT } from "../../../../utils/analytics/constants"
import {
  AutocompleteOptionTypography,
  AutocompletePaper,
  SearchAutocomplete,
} from "../../../card/styles/card-with-experience-form"
import {
  acceptOnlyNumbers,
  handleHotelSearch,
  hotelRegexCheck,
  hotelSearchRestrictions,
  restrictNumericSymbol,
} from "../../book-a-stay-form/utils"
import { CloseIcon, SearchIcon } from "../../../../utils/customIcons"
import { HotelInformation } from "../../book-a-stay-form/types"
import { useDebounce } from "../../../../utils/useDebounce"
import SearchStore from "../../../../features/search/store/search.store"
import { observer } from "mobx-react-lite"
import { convertDateFormat } from "../../../../utils/getDate"
import ModalStore from "../../../../store/global/modal.store"
const CustomDatePickerComponent = dynamic(() => import("../../../hoc/CustomDatePicker/custom-date-picker.component"))
import ReCAPTCHA from "react-google-recaptcha"
import { verifyCaptcha } from "../../../../utils/ServerActions"
import { FormErrorIcon, FormMenuProps, FormSelectArrowIcon } from "../../common/form-components"
import {
  ErrorMessageTypography,
  FormBlockContentBox,
  InputTextField,
  LinkDisableBlockContentBox,
  MultilineInputText,
} from "../../common/styles"
const EnquireDropDown = dynamic(() => import("../../common/form-drop-down-component"))
const EnquireTextField = dynamic(() => import("../../common/form-input.component"))
const MobileNumberField = dynamic(() => import("../../common/mobile-number-field.component"))
import captchaHandler from "../../common/utils/captchaHandler"
import { nameFieldsRestrictions } from "../../common/utils/nameFieldRestrictionsHandler"
import { PathType } from "../../../../types"

interface WeddingEnquireForm {
  items: any
  _key: string
  content: any
  _type: string
  title: string
  metadata: any
  variant: string
  parentProps: number
  description: string
  largeVariant: string
  charactersLimit?: number
  PrimaryAction: ActionProps
  isMultiBlockContent: boolean
}
type WeddingFormValues = {
  theme: string
  location: string
  quantity: string
  guestRooms: string
  noOfGuests: string
  senderEmail: string
  senderMobile: string
  functionDate: string
  customMessage: string
  senderFirstName: string
  datesFlexibility: string
  preferredLocation: string
  receiverFirstName: string
  check: boolean
}

type WeddingFormErrors = {
  theme?: boolean
  location?: boolean
  guestRooms?: boolean
  noOfGuests?: boolean
  senderEmail?: boolean
  senderMobile?: boolean
  functionDate?: boolean
  senderFirstName?: boolean
  datesFlexibility?: boolean
  preferredLocation?: boolean
  check: boolean
}
const WeddingEnquireForm = (props: any) => {
  const {
    items,
    title,
    description,
    singleContent,
    content,
    PrimaryAction,
    secondaryAction,
    charactersLimit,
    variant,
    largeVariant,
    analytics,
  } = props
  const Context = useContext(IHCLContext)
  const modalStore = ModalStore?.getInstance()
  const PortableText = Context!.PortableText
  const [countryCode, setCountryCode] = useState<string>("+91")
  const [loader, setLoader] = useState<boolean>(false)
  const [location, setLocation] = useState<string>(modalStore?.propertyData?.destination?.trim() || "")

  const [preferredLocation, setPreferredLocation] = useState<string | undefined>(undefined)
  const [formattedDate, setFormattedDate] = useState<string>("")
  const [date, setDate] = useState<any>(null)
  const [open, setOpen] = useState<boolean>(false)
  const [check, setChecked] = useState<boolean>(false)
  const [openErrorMessage, setOpenErrorMessage] = useState<boolean>(false)
  const [snackMessage, setSnackMessage] = useState<string>("")
  const [quantity, setQuantity] = useState<number>()
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const [error, setError] = useState<any>({ search: false })
  const [searchResultsResponseData, setResultsResponseData] = useState<any>([])
  const [userCode, setUserCode] = useState<string>("IN")
  const [hotelInformation, setHotelInformation] = useState<HotelInformation | null>({
    name: modalStore?.propertyData?.hotelName || "",
    id: modalStore?.propertyData?.hotelId || "",
  })
  const [isVerified, setIsVerified] = useState(false)
  const debouncedSearchTerm = useDebounce(hotelInformation, 300)
  const [checkBoxError, setCheckBoxError] = useState<boolean>(false)
  const [more, setMore] = useState<number>(
    charactersLimit ? charactersLimit : CONSTANTS?.FORM_DESCRIPTION_CHARACTER_LIMIT,
  )
  const recaptchaRef = useRef<any>(null)
  const placeholder = items
  const [values, setValues] = useState<WeddingFormValues>({
    senderFirstName: "",
    senderMobile: "",
    senderEmail: "",
    preferredLocation: "",
    functionDate: "",
    location: "",
    receiverFirstName: "",
    datesFlexibility: "",
    noOfGuests: "",
    guestRooms: "",
    quantity: "",
    theme: "",
    customMessage: "",
    check: false,
  })
  const [errors, setErrors] = useState<{
    senderFirstName: boolean
    senderEmail: boolean
    senderMobile: boolean
    preferredLocation: boolean
    functionDate: boolean
    datesFlexibility: boolean
    noOfGuests: boolean
    guestRooms: boolean
    theme: boolean
    location: boolean
    check: boolean
    reCaptcha: boolean
  }>({
    senderFirstName: false,
    senderEmail: false,
    senderMobile: false,
    preferredLocation: false,
    functionDate: false,
    datesFlexibility: false,
    noOfGuests: false,
    guestRooms: false,
    theme: false,
    check: false,
    location: false,
    reCaptcha: false,
  })

  const [disable, setDisable] = useState<{
    senderFirstName: boolean
    senderEmail: boolean
    senderMobile: boolean
    countryCode: boolean
  }>({
    senderFirstName: false,
    senderEmail: false,
    senderMobile: false,
    countryCode: false,
  })

  //user details
  const phoneNumber = global?.localStorage?.getItem("userPhoneNumber") || ""
  const customerHash = global?.localStorage?.getItem("customerHash") || ""
  const salutation = global?.localStorage?.getItem("userSalutation") || ""
  const CountryCode = global?.localStorage?.getItem("userCountryCode") || ""
  const firstName = global?.localStorage?.getItem("userFirstName") || ""
  const lastName = global?.localStorage?.getItem("userLastName") || ""
  const email = global?.localStorage?.getItem("userEmail") || ""
  const country = global?.localStorage?.getItem("userNationality") || ""
  const fullName = `${firstName} ${lastName}`?.trim()

  const userStore = Context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const context = useContext(IHCLContext)
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const dataLayer = MemberDataLayer(userStore, gaStoreData)
  const searchStore = context?.getGlobalStore(GLOBAL_STORES.searchStore) as SearchStore
  const { searchResults } = searchStore

  const scrollRef: any = useRef(null)

  useEffect(() => {
    if (customerHash) {
      setValues((prev: any) => {
        return {
          ...prev,
          salutation: salutation,
          [senderFirstName]: fullName,
          [senderEmail]: email,
          [senderMobile]: phoneNumber,
        }
      })
      setCountryCode(CountryCode ? CountryCode : "+91")
    }
  }, [customerHash, CountryCode, phoneNumber, email, salutation, fullName])

  //cleaning up propertyData when component is closed
  useEffect(() => {
    return () => {
      const propertyCleanUp = async () => {
        modalStore?.setPropertyData({})
      }
      propertyCleanUp()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchStore?.autoCompleteSearch(hotelInformation?.name ?? "")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm, searchStore])

  useEffect(() => {
    if (searchResults?.hotels?.data) {
      setResultsResponseData([
        {
          hotelsData: JSON?.parse(JSON?.stringify(searchResults?.hotels?.data)),
        },
      ])
    } else {
      setResultsResponseData([
        {
          hotelsData: [],
        },
      ])
    }
  }, [searchResults])

  const handleSearchClose = () => {
    setHotelInformation((prev: any) => null)
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
          top: elementTop + offset,
          behavior: "smooth",
        })
      }
    }

    if (isMobile) {
      if (document.activeElement instanceof HTMLInputElement) {
        document.activeElement.blur()
      }
    }
  }

  useEffect(() => {
    if (isVerified) {
      setErrors((prev: any) => ({ ...prev, reCaptcha: false }))
    }
  }, [isVerified])

  const handleDatePicker = (newValue: any) => {
    setOpen(newValue ? false : true)
    setDate(() => newValue)
    setErrors({
      ...errors,
      functionDate: newValue ? false : true,
    })
    setValues({
      ...values,
      functionDate: convertDateFormat(newValue)?.replaceAll("-", "/"),
    })
  }
  const handleChange = (e: any) => {
    const { name, value } = e?.target
    const { status } = TextfieldValidator(name, value)
    setValues({
      ...values,
      [name]: value,
    })
    setErrors({
      ...errors,
      [name]: !status,
    })
  }
  const handleSelectedValue = (e: any) => {
    const { name, value } = e?.target
    setValues({
      ...values,
      [name]: value,
    })
    setErrors({
      ...errors,
      [name]: value ? value?.length === 0 : true,
    })
  }

  const checkEmptyErrors = () => {
    let tempErrors: any = {
      senderFirstName: errors?.senderFirstName,
      senderMobile: errors?.senderMobile,
      senderEmail: errors?.senderEmail,
    }
    let tempFormValues: any = { ...values }
    Object?.entries(tempErrors)?.forEach(([key, error]: any) => {
      tempErrors = {
        ...tempErrors,
        [key]: error === true ? true : tempFormValues?.[key]?.length === 0,
      }
    })
    setErrors((prev: any) => ({
      ...prev,
      ...tempErrors,
      reCaptcha: !isVerified,
      check: !values?.check,
    }))
    setError((prev: any) => ({
      ...prev,
      search:
        hotelInformation?.name &&
        hotelInformation?.id &&
        hotelInformation?.name?.length > 0 &&
        hotelInformation?.id?.length > 0
          ? false
          : true,
    }))
  }

  const handleSubmit = async () => {
    const flexibleDates = values?.datesFlexibility?.toLocaleLowerCase() === "yes" ? true : false
    const guestRoomRequired = values?.guestRooms?.toLocaleLowerCase() === "yes" ? true : false

    setLoader(true)
    const weddingEnquireApiResponse = await weddingEnquireAPI?.apiCall(
      JSON.stringify({
        customerName: values?.senderFirstName,
        email: values?.senderEmail,
        mobileCountryCode: countryCode,
        mobile: values?.senderMobile,
        preferredLocation: hotelInformation?.name || "",
        functionDate: date ? values?.functionDate?.replaceAll("/", "-") : "",
        noOfGuests: values?.noOfGuests || 0,
        guestRoomsRequired: guestRoomRequired,
        eventBrief: values?.customMessage,
        yourCurrentLocation: location,
        acceptedTNC: values?.check,
      }),
    )
    if (weddingEnquireApiResponse?.error === false) {
      setLoader(false)
      if (weddingEnquireApiResponse?.data?.cause) {
        navigate(secondaryAction?.url, secondaryAction?.urlType)
        setOpenErrorMessage(true)
        setSnackMessage(weddingEnquireApiResponse?.data?.message || ERROR_MESSAGES?.mandatoryFields)
      } else {
        navigate(PrimaryAction?.url, PrimaryAction?.urlType)
      }
    } else {
      setLoader(false)
      navigate(secondaryAction?.url, secondaryAction?.urlType)
      setOpenErrorMessage(true)
      setSnackMessage(ERROR_MESSAGES?.NETWORK_ERROR)
    }
  }

  const handleDream = () => {
    triggerEvent({
      action: ENQUIRE_NOW_SUBMIT,
      params: {
        ...dataLayer,
        preferred_location: hotelInformation?.name || "",
        additionalEvent: values?.customMessage || "",
        current_location: location || "",
        buttonLinkName: PrimaryAction?.title || "",
        rooms_requirement: values?.guestRooms || "",
        event_date: date ? values?.functionDate?.replaceAll("/", "-") : "",
        dates_flexible: values?.datesFlexibility || "",
        event_type: title || "",
        event_guests_qty: values?.noOfGuests || "",
        no_of_rooms: values?.quantity ? Number(values?.quantity) : 0,
        link_text: PrimaryAction?.title || "",
        link_url: PrimaryAction?.url || "",
        eventName: title,
        widget_type: PrimaryAction?._type,
        widget_position: "",
        clientId: getCookie("_ga")?.slice(6),
        widget_title: title || "",
        widget_description: description || "",
        pageSection: props?.analytics?.sectionTitle?.[0] || analytics?.sectionTitle?.[0],
        option_Selected: PrimaryAction?.title,
        outbound: PrimaryAction?.urlType === PathType?.internal ? false : true,
      },
    })
  }
  return (
    <>
      {loader && <LoadingSpinner />}
      <WeddingFormOverFlowWrapper aria-label={isMobile ? variant : largeVariant} ref={scrollRef}>
        <WeddingGridWrapper>
          <WeddingFormWrapper>
            <SnackbarToast open={openErrorMessage} onClose={() => setOpenErrorMessage(false)} Message={snackMessage} />
            {title && (
              <FullBox sx={{ marginBottom: isMobile ? "3.125vw" : DesktopPxToVw(24) }}>
                <Typography variant={isMobile ? "m-heading-s" : "heading-s"}>{title}</Typography>
              </FullBox>
            )}
            <Box
              sx={{
                width: isMobile ? "100%" : DesktopPxToVw(1047),
                margin: "0 auto",
                marginBottom: isMobile ? "5.469vw" : "2.07vw",
              }}>
              {content?.map((content: any, index: number) => {
                return (
                  <LinkDisableBlockContentBox
                    isDisable={!isMobile && content?.content?.[0]?.markDefs?.[0]?.linkType === "mobile"}
                    key={index}
                    component={"span"}
                    textAlign={"center"}>
                    <PortableText blocks={content?.content} key={index} />
                  </LinkDisableBlockContentBox>
                )
              })}
            </Box>
            <NameTextFieldWrapper>
              <EnquireTextField
                name={senderFirstName}
                value={values.senderFirstName}
                error={errors?.senderFirstName}
                disabled={disable?.senderFirstName}
                placeholder={placeholder?.[0]?.labelText}
                onChange={(e: any) => {
                  nameFieldsRestrictions(e, handleChange)
                }}
                sx={{ width: "100%", gridArea: "formEmail" }}
                helperText={errors?.senderFirstName ? placeholder?.[0]?.errorText : ""}
              />
              <EnquireTextField
                name={senderEmail}
                error={errors?.senderEmail}
                value={values?.senderEmail}
                inputProps={{ maxLength: 50 }}
                disabled={disable?.senderEmail}
                onChange={(e: any) => handleChange(e)}
                placeholder={placeholder?.[1]?.labelText}
                helperText={errors?.senderEmail ? placeholder?.[1]?.errorText : ""}
              />
              <MobileNumberField
                formState={values}
                name={senderMobile}
                countryCode={countryCode}
                setFormState={setValues}
                setErrorState={setErrors}
                value={values?.[senderMobile]}
                setCountryCode={setCountryCode}
                errorState={errors?.[senderMobile]}
                helperText={props?.items?.[2]?.errorText}
                placeholder={props?.items?.[2]?.labelText}
              />
            </NameTextFieldWrapper>
            <Stack sx={{ marginBottom: isMobile ? "5.469vw" : "1.615vw" }}>
              <SearchAutocomplete
                onKeyDown={(e: any) => {
                  hotelSearchRestrictions(e)
                }}
                onChange={(event: any, newValue: any) => {
                  if (newValue) {
                    handleHotelSearch(event, setHotelInformation, setError, newValue)
                  }
                }}
                noOptionsText={"No results found for your search"}
                value={hotelInformation}
                getOptionLabel={(option: any) => option?.name}
                options={searchResultsResponseData?.[0]?.hotelsData || []}
                PaperComponent={({ children }: any) => <AutocompletePaper>{children}</AutocompletePaper>}
                renderOption={(props: any) => {
                  return (
                    <AutocompleteOptionTypography {...props} variant={isMobile ? "m-body-m" : "body-m"}>
                      {props.key}
                    </AutocompleteOptionTypography>
                  )
                }}
                renderInput={(params) => {
                  const temp = {
                    ...params,
                    InputProps: {
                      ...params?.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon
                            sx={{
                              height: "auto",
                              marginBottom: "0.12vw",
                              width: isMobile ? MobilePxToVw(22) : DesktopPxToVw(22),
                            }}
                          />
                        </InputAdornment>
                      ),
                      endAdornment: hotelInformation?.name && hotelInformation?.name?.length > 0 && (
                        <InputAdornment position="end">
                          <CloseIcon
                            onClick={handleSearchClose}
                            sx={{
                              cursor: "pointer",
                              height: isMobile ? "auto" : "0.8vw",
                              width: isMobile ? "2.5vw" : "1vw",
                            }}
                          />
                        </InputAdornment>
                      ),
                    },
                  }
                  return (
                    <InputTextField
                      sx={{
                        padding: "0vw !important",
                        "& input": {
                          padding: "0vw !important",
                        },
                      }}
                      autoComplete="off"
                      variant="standard"
                      placeholder={placeholder?.[3]?.labelText}
                      {...temp}
                      onKeyDown={(e: any) => {
                        hotelSearchRestrictions(e)
                      }}
                      onChange={(event: any) => {
                        if (hotelRegexCheck(event)) {
                          handleHotelSearch(event, setHotelInformation, setError)
                        }
                      }}
                      helperText={
                        error?.search
                          ? placeholder?.[3]?.errorText
                            ? placeholder?.[3]?.errorText
                            : ERROR_DESTINATION_HOTEL
                          : ""
                      }
                    />
                  )
                }}
              />
            </Stack>
            <CountryCityGrid>
              <Box
                onFocus={() => {
                  handleScroll()
                  setOpen(true)
                }}>
                <ClickAwayListener onClickAway={() => setOpen(false)}>
                  <FunctionDateContainer
                    $isOpen={open}
                    sx={{
                      minWidth: `${DesktopPxToVw(453)}!important`,
                      minHeight: isMobile ? "6.469vw !important" : "2.083vw",
                    }}>
                    <CustomDatePickerComponent
                      date={date}
                      isOpen={open}
                      sx={{
                        width: "100%",
                        height: "100%",
                      }}
                      onChange={handleDatePicker}
                      minDate={new Date()}
                      calendarIcon={() => <></>}
                      renderComponent={
                        <InputTextField
                          sx={{
                            "& input, & label": {
                              letterSpacing: "-0.5px",
                            },
                          }}
                          autoComplete="off"
                          placeholder={date ? date : placeholder?.[4]?.labelText}
                          InputProps={{
                            endAdornment: <>{errors?.functionDate && <FormErrorIcon />}</>,
                          }}
                          helperText={
                            errors?.functionDate
                              ? placeholder?.[4]?.errorText
                                ? placeholder?.[4]?.errorText
                                : "Please enter a valid function date"
                              : ""
                          }
                          onKeyDown={(e: any) => e?.preventDefault()}
                          onFocus={() => setOpen(() => true)}
                          onClick={(e: any) => setOpen(() => true)}
                          variant="standard"
                          value={date ? convertDateFormat(date)?.replaceAll("-", "/") : ""}
                        />
                      }
                      calendarWidth={isMobile ? MobilePxToVw(476) : DesktopPxToVw(585)}
                    />
                  </FunctionDateContainer>
                </ClickAwayListener>
              </Box>
              <Stack sx={{ width: "100%" }}>
                <EnquireDropDown
                  label={placeholder?.[5]?.labelText}
                  name="noOfGuests"
                  value={values?.noOfGuests}
                  items={
                    props?.items?.[5]?.clusterItems?.length > 0 ? props?.items?.[5]?.clusterItems : data?.noOfGuests
                  }
                  property={props?.items?.[5]?.clusterItems?.length > 0 ? "key" : "guest"}
                  onChange={(e: any) => handleSelectedValue(e)}
                />
              </Stack>
            </CountryCityGrid>
            <CommonContainer $webWidths={"1fr 1fr"}>
              <EnquireDropDown
                label={placeholder?.[6]?.labelText}
                name="guestRooms"
                value={values?.guestRooms}
                items={props?.items?.[6]?.clusterItems?.length > 0 ? props?.items?.[6]?.clusterItems : data?.guestRooms}
                property={props?.items?.[6]?.clusterItems?.length > 0 ? "key" : "required"}
                onChange={(e: any) => handleSelectedValue(e)}
              />
              <EnquireTextField
                sx={{ width: "100%" }}
                value={location}
                placeholder={placeholder?.[7]?.labelText}
                onChange={(e: any) => {
                  const { value } = e?.target
                  if (value === "" || value?.match(/^[a-zA-Z ]{0,50}$/)) {
                    setLocation(value)
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <>
                      {
                        <SearchIcon
                          sx={{
                            width: isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
                            marginRight: "0.5vw",
                          }}
                        />
                      }
                    </>
                  ),
                }}
              />
            </CommonContainer>

            <Stack sx={{ alignItems: "start" }}>
              <Typography variant={isMobile ? "m-body-l" : "body-l"}>{items?.[8]?.labelText}</Typography>
              <MultilineInputText
                variant={"standard"}
                multiline
                sx={{ mt: isMobile ? MobilePxToVw(33) : DesktopPxToVw(30) }}
                name={customMessage}
                value={values.customMessage}
                onChange={(e: any) => {
                  const { value } = e?.target
                  if (value === "" || value?.match(/^[A-Za-z0-9,. ]{0,400}$/)) {
                    handleChange(e)
                  }
                }}
                inputProps={{
                  autoComplete: "new-password",
                  maxLength: 400,
                }}
              />
            </Stack>
            {items?.[9]?.content && (
              <CustomCheckBoxWrapper $isMobile={isMobile}>
                <CustomCheckBox
                  checked={values?.check}
                  onChange={(e: any) => {
                    setValues((prev: any) => ({
                      ...prev,
                      check: e?.target?.checked,
                    }))
                    setErrors((prev: any) => ({
                      ...prev,
                      check: !e?.target?.checked,
                    }))
                  }}
                  isMarginRight={isMobile ? "0.781vw" : "1.042vw"}
                />
                {items?.[9]?.content?.map((content: any, index: number) => (
                  <FormBlockContentBox key={index}>
                    <PortableText blocks={content} key={index} />
                  </FormBlockContentBox>
                ))}
              </CustomCheckBoxWrapper>
            )}
            {errors?.check && (
              <CenterTextBox>
                <ErrorMessageTypography>
                  {placeholder?.[9]?.errorText ? placeholder?.[9]?.errorText : ERROR_MESSAGES?.checkboxError}
                </ErrorMessageTypography>
              </CenterTextBox>
            )}
            <ReCaptchaStack>
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_NOTIFICATION_RECAPTCHA_SITE_KEY || ""}
                ref={recaptchaRef}
                onChange={(token: string | null) => {
                  captchaHandler(token, setIsVerified)
                }}
              />
              {errors?.reCaptcha && (
                <ReCaptchaErrorTypography>{ERROR_MESSAGES?.EMPTY_RECAPTCHA}</ReCaptchaErrorTypography>
              )}
            </ReCaptchaStack>
            {PrimaryAction?.title && (
              <Box
                sx={{
                  margin: isMobile ? "8.594vw 0vw 5.469vw" : "1.563vw 0 2.083vw",
                }}>
                <RenderActionItem
                  isActionButtonType={true}
                  url={PrimaryAction?.url}
                  title={PrimaryAction?.title}
                  variant={PrimaryAction?.variant}
                  navigationType={PrimaryAction?.urlType}
                  buttonStyles={{
                    lineHeight: "140%",
                    letterSpacing: "1.8px",
                  }}
                  onClick={() => {
                    if (
                      values?.senderFirstName?.length > 0 &&
                      values?.senderEmail?.length > 0 &&
                      values?.senderMobile?.length > 0 &&
                      !error?.search &&
                      values?.check &&
                      !errors?.check &&
                      isVerified &&
                      hotelInformation?.name &&
                      hotelInformation?.name?.length > 0 &&
                      hotelInformation?.id &&
                      hotelInformation?.id?.length > 0 &&
                      errors?.senderFirstName === false &&
                      errors?.senderEmail === false &&
                      errors?.senderMobile === false
                    ) {
                      handleSubmit()
                      handleDream()
                    } else {
                      checkEmptyErrors()
                    }
                  }}
                />
              </Box>
            )}
          </WeddingFormWrapper>
          {description && !isMobile && (
            <DescriptionWrapperBox>
              <CustomReadMore length={more} variant={"body-ml"}>
                {description}
              </CustomReadMore>
            </DescriptionWrapperBox>
          )}
        </WeddingGridWrapper>
        {description && isMobile && (
          <DescriptionWrapperBox>
            <CustomReadMore length={more} variant={"m-body-sl"}>
              {description}
            </CustomReadMore>
          </DescriptionWrapperBox>
        )}
      </WeddingFormOverFlowWrapper>
    </>
  )
}

export default observer(WeddingEnquireForm)
