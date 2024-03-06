import { GAStore, PropertyStore, UserStore } from "../../store"
import { theme } from "../../lib/theme"
import { observer } from "mobx-react-lite"
import { useDebounce } from "../../utils/useDebounce"
import { GLOBAL_STORES } from "../../utils/Constants"
import { useMobileCheck } from "../../utils/isMobilView"
import React, { useContext, useEffect, useRef, useState } from "react"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { CloseIcon, SearchIcon } from "../../utils/customIcons"
import { HotelInformation } from "../forms/book-a-stay-form/types"
import SearchStore from "../../features/search/store/search.store"
import {
  acceptOnlyNumbers,
  getBusinessRecipientEmails,
  handleHotelSearch,
  hotelRegexCheck,
  hotelSearchRestrictions,
  restrictNumericSymbol,
} from "../forms/book-a-stay-form/utils"
import TextfieldValidator from "../../utils/validations/TextfieldValidator"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { handler as EventEnquiry } from "../../features/notification/api/handlers/event-enquiry"
import {
  DropBox,
  BoxWrapper,
  CheckboxBox,
  TextFieldsWrapper,
  FieldsContainer,
  LocationContainer,
  DateContainer,
  DateBox,
  GuestStack,
} from "../Enquire/Styles"
import { TitleWrapper } from "../forms/gift-card-form/styles"
import {
  ERROR_MESSAGES,
  Name,
  Mobile,
  Email,
  Guests,
  TentativeDate,
  Rooms,
  EventRequirement,
  companyName,
  EventType,
} from "../forms/gift-card-form/constants"
import { Box, Typography, InputAdornment, ClickAwayListener, Stack } from "@mui/material"
import { triggerEvent } from "../../utils/analytics"
import { getCookie } from "../../utils/cookie"
import { MemberDataLayer } from "../../utils/analytics/member-data-layer"
import { ENQUIRE_NOW_SUBMIT } from "../../utils/analytics/constants"
import dynamic from "next/dynamic"
import { convertDateFormat } from "../../utils/getDate"
import { useRouter } from "next/router"
import { hotelRoute } from "../../features/property/ui/constants"
import { FunctionDateContainer } from "../forms/enquiry-forms/wedding-enquire-forms/wedding-enquire-styles"
import { useLoggedIn } from "../../utils/hooks/useLoggedIn"
import {
  ReCaptchaErrorTypography,
  ReCaptchaStack,
} from "../forms/enquiry-forms/khazana-enquiry-form/khazana-enquiry-form.styles"
import ReCAPTCHA from "react-google-recaptcha"
import { AutocompleteOptionTypography, AutocompletePaper, SearchAutocomplete } from "./styles/card-with-experience-form"
import { FormErrorIcon, FormSelectArrowIcon } from "../forms/common/form-components"
import captchaHandler from "../forms/common/utils/captchaHandler"
import { MobilePxToVw } from "../../utils/DesktopFontCalc"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import ModalStore from "../../store/global/modal.store"
import { nameFieldsRestrictions } from "../forms/common/utils/nameFieldRestrictionsHandler"
import { InputTextField, MultilineInputText } from "../forms/common/styles"
import { LoggedInUserDetails } from "../forms/common/utils/user-details"

const EnquireTextField = dynamic(() => import("../forms/common/form-input.component"))
const EnquireDropDown = dynamic(() => import("../forms/common/form-drop-down-component"))
const CustomDatePickerComponent = dynamic(() => import("../hoc/CustomDatePicker/custom-date-picker.component"))
const MemoizedHotelContactData = dynamic(() => import("./hotel-contact-text.component"))
const SnackbarToast = dynamic(() => import("../../utils/SnackbarToast"))
const LoadingSpinner = dynamic(() => import("../../utils/SpinnerComponent"))
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))
const MobileNumberField = dynamic(() => import("../forms/common/mobile-number-field.component"))
const CustomCheckBox = dynamic(() => import("../hoc/CustomCheckBox/Checkbox").then((module) => module.CustomCheckBox))

let data = {
  eventType: [
    {
      type: "Meetings",
    },
    {
      type: "Social Events",
    },
    {
      type: "Weddings",
    },
    {
      type: "Business Retreats",
    },
    {
      type: "Conferences",
    },
    {
      type: "Exhibitions",
    },
    {
      type: "Group Travel",
    },
    {
      type: "Outdoor",
    },
  ],
  guestList: [
    {
      no: "1",
    },
    {
      no: "2",
    },
    {
      no: "3",
    },
    {
      no: "4",
    },
    {
      no: "5",
    },
  ],
  estimatedRooms: [
    {
      roomNo: 1,
    },
    {
      roomNo: 2,
    },
    {
      roomNo: 3,
    },
    {
      roomNo: 4,
    },
    {
      roomNo: 5,
    },
  ],
}
//types
type Errors = {
  [Name]: boolean
  [Email]: boolean
  [Mobile]: boolean
  reCaptcha: boolean
}

type Values = {
  [Name]: string
  [Email]: string
  [Mobile]: string
  [TentativeDate]: string
  [EventType]: string
  [Guests]: string
  [Rooms]: string
  [EventRequirement]: string
  [companyName]: string
}

//initial values
let initialValues: Values = {
  [Name]: "",
  [Email]: "",
  [Mobile]: "",
  [TentativeDate]: "",
  [EventType]: "",
  [Guests]: "",
  [Rooms]: "",
  [EventRequirement]: "",
  [companyName]: "",
}

let initialErrors: Errors = {
  [Name]: false,
  [Email]: false,
  [Mobile]: false,
  reCaptcha: false,
}

function CardWithForm(props: any) {
  //utils
  const router = useRouter()
  const isLoggedIn = useLoggedIn()
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const Context = useContext(IHCLContext)
  const modalStore = ModalStore?.getInstance()

  let getBgColor = isMobile ? theme?.palette?.neuPalette?.hexTwentyNine : theme?.palette?.neuPalette?.hexOne
  const inputStyle = {
    WebkitBoxShadow: `0 0 0 1000px ${getBgColor} inset`,
  }

  //stores
  const userStore = Context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const searchStore = Context?.getGlobalStore(GLOBAL_STORES.searchStore) as SearchStore
  const propertyStore = Context?.getGlobalStore(GLOBAL_STORES?.propertyStore) as PropertyStore
  const gaStoreData = Context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore

  const { searchResults } = searchStore

  const { userPhoneNumber, userCustomerHash, userSalutation, userCountryCode, userEmail, userFullName } =
    LoggedInUserDetails

  const dataLayer = MemberDataLayer(userStore, gaStoreData)
  const routerArr = router?.asPath?.split("/")
  const isHotelRoute = routerArr?.findIndex((route: any) => route === hotelRoute) > -1
  const hotelFlowHotelName = propertyStore?.propertyData?.hotelName || ""
  const hotelFlowHotelId = propertyStore?.propertyData?.hotelId || ""
  const modalStoreHotelName = modalStore?.propertyData?.hotelName || ""
  const modalStoreHotelId = modalStore?.propertyData?.hotelId || ""
  const prePopulatedHotelName = isHotelRoute ? hotelFlowHotelName : modalStoreHotelName
  const prePopulatedHotelId = isHotelRoute ? hotelFlowHotelId : modalStoreHotelId
  const isDisable = !!prePopulatedHotelName && !!prePopulatedHotelId

  //refs
  const scrollRef: any = useRef(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  //states
  const [formValues, setFormValues] = useState<Values>(initialValues)
  const [formErrors, setFormErrors] = useState<Errors>(initialErrors)
  const [isVerified, setIsVerified] = useState<boolean>(false)
  const [check, setCheck] = useState<boolean>(true)
  const [query, setQuery] = useState<boolean>(true)
  const [countryCode, setCountryCode] = useState<string>("+91")
  const [openErrorMessage, setOpenErrorMessage] = useState<boolean>(false)
  const [snackMessage, setSnackMessage] = useState<string>("")
  const [open, setOpen] = useState<boolean>(false)
  const [loader, setLoader] = useState<boolean>(false)
  const [date, setDate] = useState<any>(null)
  const [error, setError] = useState<any>({ search: false })
  const [hotelInformation, setHotelInformation] = useState<HotelInformation | null>({
    name: prePopulatedHotelName,
    id: prePopulatedHotelId,
  })
  const [searchResultsResponseData, setResultsResponseData] = useState<any>([])
  const debouncedSearchTerm = useDebounce(hotelInformation, 300)

  useEffect(() => {
    if (userCustomerHash && isLoggedIn) {
      setFormValues((prev: any) => {
        return {
          ...prev,
          [Name]: userFullName,
          [Email]: userEmail,
          [Mobile]: userPhoneNumber,
        }
      })
      setCountryCode(userCountryCode ? userCountryCode : "+91")
    }
  }, [isLoggedIn, userCountryCode, userCustomerHash, userEmail, userFullName, userPhoneNumber])

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
    setFormValues({
      ...formValues,
      [name]: value,
    })
    setFormErrors({
      ...formErrors,
      [name]: value ? value?.length === 0 : true,
    })
  }

  const handleDatePicker = (newValue: any) => {
    setDate(() => newValue)
    setFormValues((prev: any) => ({
      ...prev,
      [TentativeDate]: convertDateFormat(newValue),
    }))
    setFormErrors((prev: any) => ({
      ...prev,
      [TentativeDate]: false,
    }))
    setOpen(() => false)
  }

  const handleCompanyNameChange = (e: any) => {
    const { name, value } = e.target
    const { status } = TextfieldValidator(companyName, value)
    setFormErrors((prev: any) => {
      return {
        ...prev,
        [companyName]: value?.length === 0 ? false : !status,
      }
    })
    setFormValues((prev: any) => {
      return {
        ...prev,
        [companyName]: e?.target?.value,
      }
    })
  }

  useEffect(() => {
    return () => {
      modalStore?.setPropertyData({})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const standardEmails = props?.parameterMap
    ?.filter((item: any) => item?.key === "email")
    ?.map((item: any) => item?.value)
  const standardPhones = props?.parameterMap
    ?.filter((item: any) => item?.key === "mobile")
    ?.map((item: any) => item?.value)

  const businessEmails = isHotelRoute
    ? getBusinessRecipientEmails(propertyStore, "venue")
    : modalStore?.propertyData?.email?.length > 0
    ? modalStore?.propertyData?.email
    : standardEmails

  const handleSubmit = async () => {
    setLoader(() => true)
    let response = await EventEnquiry?.apiCall({
      customerName: formValues?.[Name],
      email: formValues?.[Email],
      mobileCountryCode: countryCode,
      mobile: formValues?.[Mobile],
      preferredLocation: hotelInformation?.name,
      eventType: formValues?.[EventType] || "",
      tentativeDate: date ? convertDateFormat(date) : "",
      noOfGuests: formValues?.[Guests],
      estimatedRoomCount: formValues?.[Rooms] || 0,
      eventDescription: formValues?.[EventRequirement],
      requireAnyRooms: check,
      isCorporateQuery: query,
      companyName: formValues?.[companyName],
      businessRecipientEmail: businessEmails?.map((item: any) => item?.trim()),
    })
    if (response?.error === false) {
      setLoader(() => false)
      if (response?.data?.cause) {
        navigate(props?.secondaryAction?.url, props?.secondaryAction?.urlType)
      } else {
        navigate(props?.PrimaryAction?.url, props?.PrimaryAction?.urlType)
      }
    } else {
      setLoader(() => false)
      navigate(props?.secondaryAction?.url, props?.secondaryAction?.urlType)
    }
  }

  const emptyCheckFields = () => {
    let tempErrors: any = {
      [Name]: formErrors?.[Name],
      [Mobile]: formErrors?.[Mobile],
      [Email]: formErrors?.[Email],
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
      reCaptcha: !isVerified,
    }))
    setError((prev: any) => ({
      ...prev,
      search: !(
        hotelInformation?.name &&
        hotelInformation?.id &&
        hotelInformation?.name?.length > 0 &&
        hotelInformation?.id?.length > 0
      ),
    }))
  }

  useEffect(() => {
    if (isVerified) {
      setFormErrors((prev: any) => ({ ...prev, reCaptcha: false }))
    }
  }, [isVerified])

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
        const elementTop = scrollRef?.current?.getBoundingClientRect().top
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
          top: elementTop + 80,
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
  const handleEnquiry = (title: string, urlType: any) => {
    triggerEvent({
      action: ENQUIRE_NOW_SUBMIT,
      params: {
        ...dataLayer,
        eventName: props?.title,
        link_text: title,
        link_url: props?.PrimaryAction?.url,
        buttonLinkName: title,
        clientId: getCookie("_ga")?.slice(6),
        outbound: urlType === "internal" ? false : true,
        option_Selected: title,
        widget_title: props?.title,
        widget_type: props?._type,
        pageSection: props?.analytics?.sectionTitle?.[0],
        rooms_requirement: check,
        event_date: date ? convertDateFormat(date) : "",
        event_type: formValues?.[EventType] || "",
        event_guests_qty: formValues?.[Guests],
        no_of_rooms: formValues?.[Rooms] || 0,
        corporate_enquiry: query,
        preferred_location: hotelInformation?.name,
      },
    })
  }

  return (
    <>
      {loader && <LoadingSpinner />}
      <BoxWrapper ref={scrollRef}>
        <SnackbarToast open={openErrorMessage} onClose={() => setOpenErrorMessage(false)} Message={snackMessage} />
        <TitleWrapper>
          <Typography variant={isMobile ? "m-heading-s" : "heading-s"} sx={{ fontWeight: 300 }}>
            {props.title}
          </Typography>
        </TitleWrapper>
        <FieldsContainer>
          <EnquireTextField
            name={Name}
            error={formErrors?.Name}
            value={formValues?.[Name]}
            placeholder={props?.items?.[0]?.labelText}
            onChange={(e: any) => {
              nameFieldsRestrictions(e, handleChange)
            }}
            inputProps={{ maxLength: 50, style: inputStyle }}
            helperText={formErrors?.Name && props?.items?.[0]?.errorText}
          />
          <EnquireTextField
            name={Email}
            error={formErrors?.[Email]}
            value={formValues?.[Email]}
            inputProps={{ style: inputStyle }}
            onChange={(e: any) => handleChange(e)}
            placeholder={props?.items?.[1]?.labelText}
            helperText={formErrors?.[Email] && props?.items?.[1]?.errorText}
          />
          <MobileNumberField
            name={Mobile}
            formState={formValues}
            countryCode={countryCode}
            value={formValues?.[Mobile]}
            setFormState={setFormValues}
            setErrorState={setFormErrors}
            setCountryCode={setCountryCode}
            errorState={formErrors?.[Mobile]}
            helperText={props?.items?.[2]?.errorText}
            placeholder={props?.items?.[2]?.labelText}
          />
        </FieldsContainer>
        <LocationContainer>
          <SearchAutocomplete
            disabled={isDisable}
            sx={{
              "& input": {
                padding: "0vw",
              },
            }}
            onKeyDown={(e: any) => {
              hotelSearchRestrictions(e)
            }}
            onChange={(event: any, newValue: any) => {
              if (newValue) {
                handleHotelSearch(event, setHotelInformation, setError, newValue)
              }
            }}
            value={hotelInformation}
            getOptionLabel={(option: any) => option.name}
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
              const { InputProps } = params
              const temp = {
                ...params,
                InputProps: {
                  ...InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        sx={{
                          height: "auto",
                          cursor: "pointer",
                          marginBottom: "0.22vw",
                          width: isMobile ? MobilePxToVw(22) : DesktopPxToVw(22),
                        }}
                      />
                    </InputAdornment>
                  ),
                  endAdornment: hotelInformation?.name && hotelInformation?.name?.length > 0 && !isDisable && (
                    <InputAdornment position="end">
                      <Box component={"div"} onClick={() => handleSearchClose()}>
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
                <InputTextField
                  variant="standard"
                  autoComplete="off"
                  name={"Find a Location"}
                  placeholder={props?.items?.[3]?.labelText}
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
                      ? props?.items?.[3]?.errorText
                        ? props?.items?.[3]?.errorText
                        : "Please Choose a Valid location"
                      : ""
                  }
                />
              )
            }}
          />
        </LocationContainer>
        <DateContainer>
          <DateBox
            onFocus={() => {
              handleScroll()
            }}>
            <ClickAwayListener
              onClickAway={() => {
                setOpen(false)
              }}>
              <FunctionDateContainer $isOpen={open}>
                <CustomDatePickerComponent
                  date={date}
                  isOpen={open}
                  sx={{
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                  }}
                  onCalendarClose={() => {
                    // setOpen(false)
                  }}
                  onCalendarOpen={() => {
                    setOpen(true)
                  }}
                  onChange={handleDatePicker}
                  minDate={new Date()}
                  calendarIcon={() => <></>}
                  renderComponent={
                    <InputTextField
                      sx={{ cursor: "pointer" }}
                      variant="standard"
                      autoComplete="off"
                      placeholder={date ? date : props?.items?.[4]?.labelText}
                      onKeyDown={(e: any) => e?.preventDefault()}
                      onFocus={() => setOpen(() => true)}
                      onClick={(e: any) => setOpen(() => true)}
                      value={date ? convertDateFormat(date)?.replaceAll("-", "/") : ""}
                      InputProps={{
                        autoComplete: "new-password",
                        endAdornment: <FormSelectArrowIcon />,
                      }}
                    />
                  }
                  calendarWidth={isMobile ? MobilePxToVw(476) : DesktopPxToVw(585)}
                />
              </FunctionDateContainer>
            </ClickAwayListener>
          </DateBox>
          <GuestStack>
            <EnquireDropDown
              label={props?.items?.[5]?.labelText}
              name={EventType}
              value={formValues?.[EventType]}
              items={props?.items?.[5]?.clusterItems?.length > 0 ? props?.items?.[5]?.clusterItems : data?.eventType}
              property={props?.items?.[5]?.clusterItems?.length > 0 ? "key" : "type"}
              onChange={(e: any) => handleSelectedValue(e)}
              helperText={props?.items?.[5]?.errorText}
            />
            <EnquireDropDown
              label={props?.items?.[6]?.labelText}
              name={Guests}
              value={formValues?.[Guests]}
              items={props?.items?.[6]?.clusterItems?.length > 0 ? props?.items?.[6]?.clusterItems : data?.guestList}
              property={props?.items?.[6]?.clusterItems?.length > 0 ? "key" : "no"}
              onChange={(e: any) => handleSelectedValue(e)}
              helperText={props?.items?.[6]?.errorText}
            />
          </GuestStack>
        </DateContainer>
        <TextFieldsWrapper
          sx={{
            marginBottom: isMobile ? MobilePxToVw(35) : DesktopPxToVw(35),
          }}>
          <CheckboxBox>
            <CustomCheckBox
              checked={check}
              onChange={() => {
                setCheck(!check)
                setFormValues({
                  ...formValues,
                  [Rooms]: "",
                })
              }}
            />
            <Typography
              variant={isMobile ? "m-body-l" : "body-l"}
              sx={{
                marginLeft: isMobile ? MobilePxToVw(21) : DesktopPxToVw(21),
              }}>
              {props?.items?.[7]?.labelText}
            </Typography>
          </CheckboxBox>
          <EnquireDropDown
            label={props?.items?.[8]?.labelText}
            name={Rooms}
            disable={!check}
            value={formValues?.[Rooms]}
            items={props?.items?.[8]?.clusterItems?.length > 0 ? props?.items?.[8]?.clusterItems : data?.estimatedRooms}
            property={props?.items?.[8]?.clusterItems?.length > 0 ? "key" : "roomNo"}
            onChange={(e: any) => handleSelectedValue(e)}
            helperText={props?.items?.[8]?.errorText}
          />
        </TextFieldsWrapper>
        <Stack flexDirection={"row"}>
          <Typography variant={isMobile ? "m-body-l" : "body-l"}>{props?.items?.[9]?.labelText}</Typography>
        </Stack>
        <MultilineInputText
          multiline
          sx={{
            marginBottom: isMobile ? MobilePxToVw(35) : DesktopPxToVw(35),
            paddingTop: isMobile ? MobilePxToVw(33) : DesktopPxToVw(18),
          }}
          variant="standard"
          name={EventRequirement}
          value={formValues?.[EventRequirement]}
          onChange={(e: any) => {
            if (String(e?.target?.value)?.match(/^[A-Za-z0-9,. ]{0,400}$/))
              setFormValues((prev: any) => {
                return {
                  ...prev,
                  [EventRequirement]: e?.target?.value,
                }
              })
          }}
        />
        <TextFieldsWrapper sx={{ marginBottom: DesktopPxToVw(40) }}>
          <CheckboxBox>
            <CustomCheckBox
              checked={query}
              withBorder
              onChange={() => {
                setQuery(!query)
                setFormValues((prev: any) => {
                  return {
                    ...prev,
                    [companyName]: "",
                  }
                })
              }}
            />
            <Typography
              variant={isMobile ? "m-body-l" : "body-l"}
              sx={{
                marginLeft: isMobile ? MobilePxToVw(21) : DesktopPxToVw(21),
              }}>
              {props?.items?.[10]?.labelText}
            </Typography>
          </CheckboxBox>
          <DropBox>
            <InputTextField
              autoComplete="off"
              disabled={!query}
              placeholder={props?.items?.[11]?.labelText}
              variant="standard"
              name={companyName}
              value={formValues?.[companyName]}
              InputProps={{
                autoComplete: "new-password",
              }}
              onChange={(e: any) => handleCompanyNameChange(e)}
            />
          </DropBox>
        </TextFieldsWrapper>
        <ReCaptchaStack>
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_NOTIFICATION_RECAPTCHA_SITE_KEY || ""}
            ref={recaptchaRef}
            onChange={(token: string | null) => {
              captchaHandler(token, setIsVerified)
            }}
          />
          {formErrors?.reCaptcha && (
            <ReCaptchaErrorTypography>{ERROR_MESSAGES?.EMPTY_RECAPTCHA}</ReCaptchaErrorTypography>
          )}
        </ReCaptchaStack>
        <Stack
          sx={{
            gap: "2.081vw",
            mt: isMobile ? MobilePxToVw(55) : DesktopPxToVw(40),
            mb: isMobile ? MobilePxToVw(35) : DesktopPxToVw(40),
          }}>
          <RenderActionItem
            type={"submit"}
            title={props.PrimaryAction?.title}
            variant={props.PrimaryAction?.variant}
            navigationType={props.PrimaryAction?.urlType}
            isActionButtonType={true}
            url={""}
            buttonStyles={{
              letterSpacing: "0.1em",
              width: isMobile ? "35.688vw" : "13vw",
              margin: isMobile ? `${MobilePxToVw(7)} auto ${MobilePxToVw(25)}` : "auto",
              whiteSpace: "noWrap !important",
            }}
            onClick={() => {
              if (
                formValues?.[Name]?.length > 0 &&
                formValues?.[Email]?.length > 0 &&
                formValues?.[Mobile]?.length > 0 &&
                !formErrors?.[Name] &&
                !formErrors?.[Email] &&
                !formErrors?.[Mobile] &&
                !error?.search &&
                isVerified &&
                hotelInformation?.name &&
                hotelInformation?.id
              ) {
                handleSubmit()
                handleEnquiry(props.PrimaryAction?.title, props.PrimaryAction?.urlType)
              } else {
                emptyCheckFields()
              }
            }}
          />
        </Stack>
        <Box>
          {props?.singleContent && (
            <MemoizedHotelContactData
              singleContent={props?.singleContent}
              propertyStore={propertyStore}
              modalData={{
                phone: modalStore?.propertyData?.phone || standardPhones,
                email: modalStore?.propertyData?.email || standardEmails,
              }}
              isHotelRoute={isHotelRoute}
            />
          )}
        </Box>
      </BoxWrapper>
    </>
  )
}

export default observer(CardWithForm)
