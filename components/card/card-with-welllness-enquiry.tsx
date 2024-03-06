import { CloseIcon, SearchIcon } from "../../utils/customIcons"
import dynamic from "next/dynamic"
import { useMobileCheck } from "../../utils/isMobilView"
import React, { useContext, useEffect, useRef, useState } from "react"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { FullBox } from "../forms/business-form/business-sme-form"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import TextfieldValidator from "../../utils/validations/TextfieldValidator"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { handler as TherapyEnquiry } from "../../features/notification/api/handlers/therapy-enquiry"
import {
  ReCaptchaErrorTypography,
  ReCaptchaStack,
} from "../forms/enquiry-forms/khazana-enquiry-form/khazana-enquiry-form.styles"
import { Box, Stack, Typography, InputAdornment, ClickAwayListener } from "@mui/material"
import {
  Name,
  Email,
  Mobile,
  Therapy,
  TimeSlot,
  GuestNumber,
  Date as DateConstant,
  ERROR_DESTINATION_HOTEL,
  ERROR_MESSAGES,
} from "../forms/gift-card-form/constants"
import {
  BulkGridContainer,
  ActionWrappingValidationContainer,
  AutocompletePaper,
  AutocompleteOptionTypography,
  SearchAutocomplete,
  SingleContentContainer,
  WellnessFirstRow,
  WellnessThirdRow,
} from "../card/styles/card-with-experience-form"
import { GLOBAL_STORES } from "../../utils/Constants"
import { GAStore, PropertyStore, UserStore } from "../../store"
import { triggerEvent } from "../../utils/analytics"
import { getCookie } from "../../utils/cookie"
import { MemberDataLayer } from "../../utils/analytics/member-data-layer"
import MemoizedHotelContactData from "./hotel-contact-text.component"
import { observer } from "mobx-react-lite"
import {
  getBusinessRecipientEmails,
  handleHotelSearch,
  hotelRegexCheck,
  hotelSearchRestrictions,
} from "../forms/book-a-stay-form/utils"
import { HotelInformation } from "../forms/book-a-stay-form/types"
import SearchStore from "../../features/search/store/search.store"
import { convertDateFormat } from "../../utils/getDate"
import ModalStore from "../../store/global/modal.store"
import { useRouter } from "next/router"
import { hotelRoute } from "../../features/property/ui/constants"
import { FunctionDateContainer } from "../forms/enquiry-forms/wedding-enquire-forms/wedding-enquire-styles"
import ReCAPTCHA from "react-google-recaptcha"
import captchaHandler from "../forms/common/utils/captchaHandler"
import { FormErrorIcon, FormSelectArrowIcon } from "../forms/common/form-components"
import { nameFieldsRestrictions } from "../forms/common/utils/nameFieldRestrictionsHandler"
import fetchWellnessSearchData from "../../utils/fetchWellnessSearchData"
import { ENQUIRE_NOW_SUBMIT } from "../../utils/analytics/constants"
import { PathType } from "../../types"
import { useLoggedIn } from "../../utils/hooks/useLoggedIn"
import { InputTextField } from "../forms/common/styles"
const EnquireTextField = dynamic(() => import("../forms/common/form-input.component"))
const CustomDatePickerComponent = dynamic(() => import("../hoc/CustomDatePicker/custom-date-picker.component"))
const EnquireDropDown = dynamic(() => import("../forms/common/form-drop-down-component"))
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))
const LoadingSpinner = dynamic(() => import("../../utils/SpinnerComponent"))
const SnackbarToast = dynamic(() => import("../../utils/SnackbarToast"))
const MobileNumberField = dynamic(() => import("../forms/common/mobile-number-field.component"))

export const AutocompleteSearchIcon = (props: any) => {
  const isMobile = useMobileCheck()
  return (
    <InputAdornment position="start">
      <SearchIcon
        sx={{
          height: "auto",
          cursor: "pointer",
          marginBottom: "0.22vw",
          width: isMobile ? MobilePxToVw(22) : DesktopPxToVw(22),
        }}
        {...props}
      />
    </InputAdornment>
  )
}

export const AutoCompleteCloseIcon = ({ handleClick }: any) => {
  const isMobile = useMobileCheck()
  return (
    <InputAdornment position="end">
      <Box
        component={"div"}
        onClick={() => {
          handleClick && handleClick()
        }}>
        <CloseIcon
          sx={{
            cursor: "pointer",
            marginRight: isMobile ? "1vw" : "",
            height: isMobile ? "auto" : "0.8vw",
            width: isMobile ? "2.5vw" : "1vw",
          }}
        />
      </Box>
    </InputAdornment>
  )
}

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
  preferredTime: [
    {
      roomNo: "10am-12pm",
    },
    {
      roomNo: "3pm-4pm",
    },
    {
      roomNo: "5pm-7pm",
    },
  ],
}

let initialValues = {
  [Email]: "",
  [Name]: "",
  [Mobile]: "",
  [Therapy]: "",
  [DateConstant]: "",
  [TimeSlot]: "",
  [GuestNumber]: "",
  reCaptcha: false,
}
let FormErrors = {
  [Email]: false,
  [Name]: false,
  [Mobile]: false,
  [Therapy]: false,
  [DateConstant]: false,
  [TimeSlot]: false,
  [GuestNumber]: false,
  reCaptcha: false,
}

const CardWithWellnessEnquiry = (props: any) => {
  //utils
  const isMobile = useMobileCheck()
  const isLoggedIn = useLoggedIn()
  const navigate = useAppNavigation()
  const context = useContext(IHCLContext)
  const router = useRouter()
  const modalStore = ModalStore?.getInstance()

  const userPhoneNumber = global?.localStorage?.getItem("userPhoneNumber") || ""
  const userCountryCode = global?.localStorage?.getItem("userCountryCode") || "+91"
  const userFirstName = global?.localStorage?.getItem("userFirstName") || ""
  const userLastName = global?.localStorage?.getItem("userLastName") || ""
  const userEmail = global?.localStorage?.getItem("userEmail") || ""
  const userFullName = `${userFirstName} ${userLastName}`?.trim()

  //stores
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const userStore = context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const propertyStore = context?.getGlobalStore(GLOBAL_STORES?.propertyStore) as PropertyStore
  const routerArr = router?.asPath?.split("/")
  const isHotelRoute = routerArr?.findIndex((route: any) => route === hotelRoute) > -1
  const hotelFlowHotelName = propertyStore?.propertyData?.hotelName || ""
  const hotelFlowHotelId = propertyStore?.propertyData?.hotelId || ""
  const modalStoreHotelName = modalStore?.propertyData?.hotelName || ""
  const modalStoreHotelId = modalStore?.propertyData?.hotelId || ""
  const prePopulatedHotelName = isHotelRoute ? hotelFlowHotelName : modalStoreHotelName
  const prePopulatedHotelId = isHotelRoute ? hotelFlowHotelId : modalStoreHotelId
  const isSearchDisable = !!prePopulatedHotelName && !!prePopulatedHotelId

  //refs
  const scrollRef = useRef<any>(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  //states
  const [date, setDate] = useState<any>("")
  const [open, setOpen] = useState<boolean>(false)
  const [loader, setLoader] = useState<boolean>(false)
  const [error, setError] = useState<any>({ search: false })
  const [isVerified, setIsVerified] = useState<boolean>(false)
  const [snackMessage, setSnackMessage] = useState<string>("")
  const [countryCode, setCountryCode] = useState<string>("+91")
  const [formErrors, setFormErrors] = useState<any>(FormErrors)
  const [formValues, setFormValues] = useState<any>(initialValues)
  const [openErrorMessage, setOpenErrorMessage] = useState<boolean>(false)
  const [searchResultsResponseData, setResultsResponseData] = useState<any>([])
  const [hotelInformation, setHotelInformation] = useState<HotelInformation | null>({
    name: prePopulatedHotelName,
    id: prePopulatedHotelId,
  })

  const dataLayer = MemberDataLayer(userStore, gaStoreData)

  useEffect(() => {
    if (isVerified) {
      setFormErrors((prev: any) => ({ ...prev, reCaptcha: false }))
    }
  }, [isVerified])

  useEffect(() => {
    return () => {
      modalStore?.setPropertyData({})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      setFormValues((prev: any) => {
        return {
          ...prev,
          [Email]: userEmail,
          [Name]: userFullName,
          [Mobile]: userPhoneNumber,
        }
      })
      setCountryCode(userCountryCode)
    }
  }, [isLoggedIn, userCountryCode, userEmail, userFullName, userPhoneNumber])

  const handleChangeForm = (event: any) => {
    const { name, value } = event.target
    const { status } = TextfieldValidator(name, value)
    setFormValues((prev: any) => {
      return {
        ...prev,
        [name]: value,
      }
    })
    if (name === GuestNumber || name === Therapy || name === TimeSlot) {
      setFormErrors((prev: any) => ({
        ...prev,
        [name]: value?.length === 0,
      }))
    } else {
      setFormErrors((prev: any) => ({
        ...prev,
        [name]: !status,
      }))
    }
  }

  const standardEmails = props?.parameterMap
    ?.filter((item: any) => item?.key === "email")
    ?.map((item: any) => item?.value)
  const standardPhones = props?.parameterMap
    ?.filter((item: any) => item?.key === "mobile")
    ?.map((item: any) => item?.value)

  const checkEmptyFields = () => {
    setFormErrors((prev: any) => ({
      ...prev,
      [DateConstant]: date === "",
      [Name]: prev?.[Name] ? prev?.[Name] : formValues?.[Name]?.length === 0,
      [Email]: prev?.[Email] ? prev?.[Email] : formValues?.[Email]?.length === 0,
      [Mobile]: prev?.[Mobile] ? prev?.[Mobile] : !(formValues?.[Mobile]?.length > 0),
      [Therapy]: prev?.[Therapy] ? prev?.[Therapy] : formValues?.[Therapy]?.length === 0,
      [TimeSlot]: prev?.[TimeSlot] ? prev?.[TimeSlot] : formValues?.[TimeSlot]?.length == 0,
      [GuestNumber]: prev?.[GuestNumber] ? prev?.[GuestNumber] : formValues?.[GuestNumber]?.length === 0,
      reCaptcha: !isVerified,
    }))
    setError(() => ({
      search: !(hotelInformation && hotelInformation?.name && hotelInformation?.id),
    }))
  }

  const handelSubmitForm = async () => {
    setLoader(true)
    let response = await TherapyEnquiry?.apiCall(
      JSON.stringify({
        acceptedTNC: false,
        email: formValues?.[Email],
        mobile: formValues?.[Mobile],
        date: convertDateFormat(date),
        mobileCountryCode: countryCode,
        customerName: formValues?.[Name],
        therapyName: formValues?.[Therapy],
        noOfGuests: formValues?.[GuestNumber],
        preferredHotel: hotelInformation?.name,
        preferredHotelCode: hotelInformation?.id,
        preferredTimeslot: formValues?.[TimeSlot],
        businessRecipientEmail: (isHotelRoute
          ? getBusinessRecipientEmails(propertyStore, "wellness")
          : modalStore?.propertyData?.email?.length > 0
          ? modalStore?.propertyData?.email
          : standardEmails
        )?.map((item: any) => item?.trim()),
      }),
    )

    if (response && response?.error === false) {
      setLoader(false)
      if (response?.data?.cause) {
        navigate(props?.secondaryAction?.url, props?.secondaryAction?.urlType)
      } else {
        navigate(props?.PrimaryAction?.url, props?.PrimaryAction?.urlType)
      }
    } else {
      setLoader(false)
      navigate(props?.secondaryAction?.url, props?.secondaryAction?.urlType)
    }
    if (!response?.error) {
      navigate(props?.PrimaryAction?.url, props?.PrimaryAction?.urlType)
    }
  }

  const handleDatePicker = (newValue: any) => {
    setOpen(() => false)
    setDate(() => newValue)
    setFormErrors((prev: any) => ({
      ...prev,
      [DateConstant]: false,
    }))
  }

  const handleEnquiry = () => {
    triggerEvent({
      action: ENQUIRE_NOW_SUBMIT,
      params: {
        ...dataLayer,
        event_date: convertDateFormat(date),
        preferred_location: hotelInformation?.name,
        event_guests_qty: formValues?.[GuestNumber],
        product_type: formValues?.[Therapy],
        option_Selected: props?.PrimaryAction?.title || "",
        eventName: props?.title || "",
        link_text: props?.PrimaryAction?.title || "",
        link_url: props?.PrimaryAction?.url,
        buttonLinkName: props?.PrimaryAction?.title || "",
        clientId: getCookie("_ga")?.slice(6),
        outbound: props?.PrimaryAction?.urlType === PathType?.internal ? false : true,
        widget_title: props?.title,
        widget_type: props?._type,
        pageSection: props?.analytics?.sectionTitle?.[0],
        event_time_slot: formValues?.[TimeSlot],
      },
    })
  }

  const handleScroll = () => {
    if (scrollRef?.current && !open) {
      const offset = 150
      if (isMobile) {
        const elementTop = scrollRef.current?.getBoundingClientRect()?.top
        const parentElement = global?.document?.getElementById("scrollable-form")
        if (elementTop >= 0) {
          parentElement?.scrollTo({
            top: elementTop + offset,
            behavior: "smooth",
          })
        }
      } else {
        setTimeout(() => {
          const elementTop = scrollRef.current?.getBoundingClientRect().top
          scrollRef?.current?.scrollTo({
            top: elementTop + offset,
            behavior: "smooth",
          })
        }, 100)
      }
    }

    if (isMobile) {
      if (global?.window?.document?.activeElement instanceof HTMLInputElement) {
        global?.window?.document.activeElement.blur()
      }
    }
  }

  useEffect(() => {
    const fetchWellnessHotelData = async () => {
      const res = await fetchWellnessSearchData("")

      if (Array?.isArray(res)) {
        setResultsResponseData(() => res)
      }
    }
    fetchWellnessHotelData()
  }, [])

  const handleSearchClose = () => {
    setHotelInformation((prev: any) => null)
  }

  return (
    <>
      {loader && <LoadingSpinner />}
      <BulkGridContainer
        ref={scrollRef}
        sx={{
          paddingBottom: !isMobile && open ? "11vw" : isMobile ? "10.313vw" : "3.125vw",
        }}>
        <SnackbarToast open={openErrorMessage} onClose={() => setOpenErrorMessage(false)} Message={snackMessage} />
        <FullBox
          sx={{
            textAlign: "center",
            marginBottom: isMobile ? MobilePxToVw(60) : DesktopPxToVw(55),
          }}>
          <Typography variant={isMobile ? "m-heading-s" : "heading-s"} sx={{ fontWeight: 300 }}>
            {props?.title}
          </Typography>
        </FullBox>

        <Stack gap={isMobile ? MobilePxToVw(35) : DesktopPxToVw(40)}>
          {/* 1st row */}
          <WellnessFirstRow>
            <EnquireTextField
              name={Name}
              error={formErrors?.[Name]}
              value={formValues?.[Name]}
              inputProps={{ maxLength: 50 }}
              helperText={props?.items?.[0]?.errorText}
              placeholder={props?.items?.[0]?.labelText}
              onChange={(e: any) => {
                nameFieldsRestrictions(e, handleChangeForm)
              }}
            />
            <EnquireTextField
              name={Email}
              error={formErrors?.[Email]}
              value={formValues?.[Email]}
              helperText={props?.items?.[1]?.errorText}
              placeholder={props?.items?.[1]?.labelText}
              onChange={(e: any) => handleChangeForm(e)}
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
          </WellnessFirstRow>
          {/* 2nd row */}
          <Stack sx={{ width: "100%" }}>
            <SearchAutocomplete
              onKeyDown={(e: any) => {
                hotelSearchRestrictions(e)
              }}
              disabled={isSearchDisable}
              onChange={(event: any, newValue: any) => {
                if (newValue) {
                  handleHotelSearch(event, setHotelInformation, setError, newValue)
                }
              }}
              noOptionsText={"No results found for your search"}
              value={hotelInformation}
              getOptionLabel={(option: any) => option.name}
              options={searchResultsResponseData || []}
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
                    startAdornment: <AutocompleteSearchIcon />,
                    endAdornment:
                      hotelInformation?.name &&
                      hotelInformation?.name?.length > 0 &&
                      (isSearchDisable ? <></> : <AutoCompleteCloseIcon handleClick={handleSearchClose} />),
                  },
                }
                return (
                  <InputTextField
                    autoComplete="off"
                    variant="standard"
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
                    helperText={error?.search && props?.items?.[3]?.errorText}
                  />
                )
              }}
            />
          </Stack>
          {/* 3rd row */}
          <WellnessThirdRow>
            <EnquireDropDown
              label={props?.items?.[4]?.labelText}
              name={Therapy}
              value={formValues?.[Therapy]}
              items={props?.items?.[4]?.clusterItems || [{}]}
              error={formErrors?.[Therapy]}
              property={"key"}
              onChange={(e: any) => handleChangeForm(e)}
              helperText={formErrors?.[Therapy] && props?.items?.[4]?.errorText}
            />
            <FullBox
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
                        autoComplete="off"
                        placeholder={date ? date : props?.items?.[5]?.labelText}
                        sx={{
                          marginTop: "unset",
                          letterSpacing: "unset",
                          width: "100%",
                          "& .MuiInputBase-root": {
                            height: "2.083vw",
                            "@media (max-width:640px)": {
                              height: "6.25vw",
                            },
                          },
                          "@media(max-width: 640px)": {
                            padding: " 0vw 0vw 2.34375vw",
                          },
                        }}
                        onKeyDown={(e: any) => e?.preventDefault()}
                        onFocus={() => setOpen(() => true)}
                        onClick={(e: any) => setOpen(() => true)}
                        variant="standard"
                        value={date ? convertDateFormat(date)?.replaceAll("-", "/") : ""}
                        helperText={formErrors?.[DateConstant] && props?.items?.[5]?.errorText}
                        InputProps={{
                          endAdornment: formErrors?.[DateConstant] ? (
                            <FormErrorIcon />
                          ) : (
                            <FormSelectArrowIcon
                              onClick={() => {
                                handleScroll()
                              }}
                            />
                          ),
                        }}
                      />
                    }
                    calendarWidth={isMobile ? MobilePxToVw(476) : DesktopPxToVw(585)}
                  />
                </FunctionDateContainer>
              </ClickAwayListener>
            </FullBox>
            <EnquireDropDown
              name={TimeSlot}
              value={formValues?.[TimeSlot]}
              error={formErrors?.[TimeSlot]}
              label={props?.items?.[6]?.labelText}
              onChange={(e: any) => handleChangeForm(e)}
              helperText={formErrors?.[TimeSlot] && props?.items?.[6]?.errorText}
              property={props?.items?.[6]?.clusterItems?.length > 0 ? "key" : "roomNo"}
              items={
                props?.items?.[6]?.clusterItems?.length > 0 ? props?.items?.[6]?.clusterItems : data?.preferredTime
              }
            />
            <EnquireDropDown
              name={GuestNumber}
              value={formValues?.[GuestNumber]}
              error={formErrors?.[GuestNumber]}
              label={props?.items?.[7]?.labelText}
              onChange={(e: any) => handleChangeForm(e)}
              property={props?.items?.[6]?.clusterItems?.length > 0 ? "key" : "no"}
              helperText={formErrors?.[GuestNumber] && props?.items?.[7]?.errorText}
              items={props?.items?.[7]?.clusterItems?.length > 0 ? props?.items?.[7]?.clusterItems : data?.guestList}
            />
          </WellnessThirdRow>
        </Stack>
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
        <ActionWrappingValidationContainer $isMobile={isMobile}>
          <RenderActionItem
            isActionButtonType={true}
            url={props.PrimaryAction?.url}
            title={props.PrimaryAction?.title}
            variant={props.PrimaryAction?.variant}
            navigationType={props.PrimaryAction?.urlType}
            buttonStyles={{
              width: isMobile ? MobilePxToVw(222) : DesktopPxToVw(222),
            }}
            onClick={() => {
              if (
                date &&
                !formErrors?.[Name] &&
                !formErrors?.[Email] &&
                hotelInformation?.id &&
                hotelInformation?.name &&
                !formErrors?.[TimeSlot] &&
                !formErrors?.[Therapy] &&
                !formErrors?.[GuestNumber] &&
                formValues?.[Name]?.length > 0 &&
                formValues?.[Email]?.length > 0 &&
                hotelInformation?.id?.length > 0 &&
                formValues?.[Therapy]?.length > 0 &&
                formValues?.[TimeSlot]?.length > 0 &&
                hotelInformation?.name?.length > 0 &&
                formValues?.[GuestNumber]?.length > 0 &&
                isVerified &&
                !formErrors?.reCaptcha
              ) {
                handleEnquiry()
                handelSubmitForm()
              } else {
                checkEmptyFields()
              }
            }}
          />
        </ActionWrappingValidationContainer>
        <SingleContentContainer>
          {props?.singleContent && (
            <MemoizedHotelContactData
              singleContent={props?.singleContent}
              propertyStore={propertyStore}
              isHotelRoute={isHotelRoute}
              modalData={{
                phone: modalStore?.propertyData?.phone || standardPhones,
                email: modalStore?.propertyData?.email || standardEmails,
              }}
            />
          )}
        </SingleContentContainer>
      </BulkGridContainer>
    </>
  )
}

export default observer(CardWithWellnessEnquiry)
