import { Box, Stack, Typography } from "@mui/material"
import React, { useContext, useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import {
  CheckBoxErrorStack,
  FeedbackInputFieldGrid,
  FieldsGrid,
  TermsConditionsBox,
} from "./styles/FeedBack-component-styles"
import TextfieldValidator from "../../utils/validations/TextfieldValidator"
import { CalenderIcon } from "../../utils/customIcons"
import {
  ERROR_HOTEL,
  ERROR_MESSAGES,
  senderEmail,
  senderFirstName,
  senderMobile,
} from "../forms/gift-card-form/constants"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { ActionProps, singleContentInterface, FormFieldsType } from "../types"
import { useMobileCheck } from "../../utils/isMobilView"
import { CONSTANTS } from "../constants"
import { convertDateFormat } from "../../utils/getDate"
import {
  AutocompleteOptionTypography,
  AutocompletePaper,
  SearchAutocomplete,
} from "../card/styles/card-with-experience-form"
import { AutoCompleteCloseIcon, AutocompleteSearchIcon } from "../card/card-with-welllness-enquiry"
import { HotelInformation } from "../forms/book-a-stay-form/types"
import { useDebounce } from "../../utils/useDebounce"
import { GLOBAL_STORES } from "../../utils/Constants"
import SearchStore from "../../features/search/store/search.store"
import {
  acceptOnlyNumbers,
  handleHotelSearch,
  hotelRegexCheck,
  hotelSearchRestrictions,
  restrictNumericSymbol,
} from "../forms/book-a-stay-form/utils"
import { observer } from "mobx-react-lite"
import { handler as contactUsApi } from "../../features/notification/api/handlers/contact-us.enquire"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { PortableText } from "../../lib/portable-text-serializers"
import { theme } from "../../lib/theme"
import { useAesthetics } from "../../utils/fetchAsthetics"
import {
  ReCaptchaErrorTypography,
  ReCaptchaStack,
} from "../forms/enquiry-forms/khazana-enquiry-form/khazana-enquiry-form.styles"
import ReCAPTCHA from "react-google-recaptcha"
import captchaHandler from "../forms/common/utils/captchaHandler"
import { nameFieldsRestrictions } from "../forms/common/utils/nameFieldRestrictionsHandler"
import { getCookie } from "../../utils/cookie"
import { triggerEvent } from "../../utils/analytics"
import { GAStore, UserStore } from "../../store"
import { MemberDataLayer } from "../../utils/analytics/member-data-layer"
import { ENQUIRE_NOW_SUBMIT } from "../../utils/analytics/constants"
import { PathType } from "../../types"
import { ErrorMessageTypography, InputTextField, MultilineInputText } from "../forms/common/styles"
import { FunctionDateContainer } from "../forms/enquiry-forms/wedding-enquire-forms/wedding-enquire-styles"
import { FormErrorIcon } from "../forms/common/form-components"
const LoadingSpinner = dynamic(() => import("../../utils/SpinnerComponent"))
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))
const MobileNumberField = dynamic(() => import("../forms/common/mobile-number-field.component"))
const CustomDatePickerComponent = dynamic(() => import("../hoc/CustomDatePicker/custom-date-picker.component"))
const CustomCheckBox = dynamic(() => import("../hoc/CustomCheckBox/Checkbox").then((module) => module.CustomCheckBox))

type tabItems = {
  PrimaryAction: ActionProps
  content: [singleContentInterface]
  items: FormFieldsType[] | undefined
  largeVariant: string
  metadata: any
  _key: string
  _type: string
}
type FeedBackType = {
  tabItems: [tabItems]
}

type FormErrors = {
  [senderFirstName]: boolean
  [senderEmail]: boolean
  [senderMobile]: boolean
  acceptedTNC: boolean
  reCaptcha: boolean
}

type FormValues = {
  [senderFirstName]: string
  [senderEmail]: string
  [senderMobile]: string
  description: string
  acceptedTNC: boolean
}

const initialValues: FormValues = {
  [senderFirstName]: "",
  [senderEmail]: "",
  [senderMobile]: "",
  description: "",
  acceptedTNC: false,
}

const initialFormErrors: FormErrors = {
  [senderFirstName]: false,
  [senderEmail]: false,
  [senderMobile]: false,
  acceptedTNC: false,
  reCaptcha: false,
}
const initialHotelValues: HotelInformation = {
  name: "",
  id: "",
}
function FeedBackComponent({ PrimaryAction, items, type, aesthetic, secondaryAction, analytics, _type }: any) {
  const customerHash = global?.localStorage?.getItem("customerHash") || ""
  const phoneNumber = global?.localStorage?.getItem("userPhoneNumber") || ""
  const CountryCode = global?.localStorage?.getItem("userCountryCode") || ""
  const firstName = global?.localStorage?.getItem("userFirstName") || ""
  const lastName = global?.localStorage?.getItem("userLastName") || ""
  const email = global?.localStorage?.getItem("userEmail") || ""
  const { cardPadding } = useAesthetics(aesthetic?._ref)
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const context = useContext(IHCLContext)

  const searchStore = context?.getGlobalStore(GLOBAL_STORES.searchStore) as SearchStore

  const recaptchaRef = useRef<any>(null)

  const [formValues, setFormValues] = useState<FormValues>(initialValues)
  const [countryCode, setCountryCode] = useState<string>("+91")
  const [formErrors, setFormErrors] = useState<FormErrors>(initialFormErrors)
  const [date, setDate] = useState<any>(null)
  const [open, setOpen] = useState<boolean>(false)
  const [loader, setLoader] = useState<boolean>(false)
  const [isVerified, setIsVerified] = useState<boolean>(false)

  const [hotelInformation, setHotelInformation] = useState<HotelInformation | null>(initialHotelValues)
  const [error, setError] = useState<any>({ search: false })
  const [searchResultsResponseData, setResultsResponseData] = useState<any>([])
  const debouncedSearchTerm = useDebounce(hotelInformation, 300)
  const { searchResults } = searchStore
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const dataLayer = MemberDataLayer(UserStore, gaStoreData)
  const formValidation = (isFormValid: any, id: any) => {
    setFormErrors({ ...formErrors, [id]: !isFormValid })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event?.target
    setFormValues((prev: any) => ({ ...prev, acceptedTNC: checked }))
    setFormErrors((prev: FormErrors) => ({ ...prev, acceptedTNC: !checked }))
  }

  const handleChangeForm = (event: any) => {
    const { name, value } = event.target
    const { status } = TextfieldValidator(name, value)
    setFormValues((prev: any) => {
      return {
        ...prev,
        [name]: event?.target?.value,
      }
    })
    formValidation(status, name)
  }

  const handleDatePicker = (newValue: any) => {
    setDate(() => newValue)
  }

  useEffect(() => {
    setFormValues((prev: any) => {
      return {
        ...prev,
        [senderFirstName]: `${firstName} ${lastName}`?.trim(),
        [senderEmail]: email,
        [senderMobile]: phoneNumber,
      }
    })
    setCountryCode(CountryCode ? CountryCode : "+91")
  }, [firstName, lastName, customerHash, CountryCode, phoneNumber, email])

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchStore?.autoCompleteSearch(hotelInformation?.name ?? "")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm, searchStore])

  useEffect(() => {
    if (isVerified) {
      setFormErrors((prev: any) => ({ ...prev, reCaptcha: false }))
    }
  }, [isVerified])

  useEffect(() => {
    if (searchResults?.hotels?.data) {
      setResultsResponseData([
        {
          hotelsData: JSON?.parse(JSON?.stringify(searchResults?.hotels?.data))?.slice(0, CONSTANTS?.FIVE),
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
    setError((prev: any) => ({
      ...prev,
      search: true,
    }))
    setHotelInformation((prev: any) => null)
  }

  const checkEmptyFields = () => {
    setFormErrors((prev: any) => ({
      ...prev,
      [senderFirstName]: prev?.[senderFirstName]
        ? prev?.[senderFirstName]
        : formValues?.[senderFirstName]?.length === 0,
      [senderEmail]: prev?.[senderEmail] ? prev?.[senderEmail] : formValues?.[senderEmail]?.length === 0,
      [senderMobile]: prev?.[senderMobile] ? prev?.[senderMobile] : !(formValues?.[senderMobile]?.length > 0),
      acceptedTNC: formValues?.acceptedTNC === false,
      reCaptcha: !isVerified,
    }))
    setError(() => ({
      search: !(
        hotelInformation?.id &&
        hotelInformation?.name &&
        hotelInformation?.id?.length > 0 &&
        hotelInformation?.name?.length > 0
      ),
    }))
  }

  const checkValidity = () => {
    return (
      formValues?.[senderFirstName]?.length > 0 &&
      formValues?.[senderEmail]?.length > 0 &&
      formValues?.[senderMobile]?.length > 0 &&
      formValues?.acceptedTNC &&
      !Object?.values(formErrors)?.some((value: boolean) => value === true) &&
      !error?.search &&
      hotelInformation?.id &&
      hotelInformation?.id?.length > 0 &&
      isVerified
    )
  }
  const scrollRef = useRef<any>(null)
  useEffect(() => {
    if (open) {
      const handleScroll = () => {
        if (scrollRef?.current && open) {
          const elementTop = scrollRef?.current?.getBoundingClientRect()?.top
          const offset = 100 // Adjust this offset as needed
          window.scrollTo({
            top: elementTop + window.scrollY - offset,
            behavior: "smooth", // You can use 'auto' or 'smooth'
          })
        }
      }
      handleScroll()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const handleSubmit = async () => {
    setLoader(() => true)
    const response = await contactUsApi?.apiCall(
      JSON.stringify({
        enquiryType: type,
        customerName: formValues?.senderFirstName,
        email: formValues?.senderEmail,
        dateOfStay: convertDateFormat(date)?.replaceAll("-", "/") || "",
        hotel: hotelInformation?.name ?? "",
        mobile: formValues?.senderMobile,
        mobileCountryCode: countryCode,
        description: formValues?.description,
        acceptedTNC: true,
      }),
    )
    if (response?.error === false) {
      setLoader(() => false)
      if (response?.data?.cause) {
        navigate(secondaryAction?.url, secondaryAction?.urlType)
      } else {
        navigate(PrimaryAction?.url, PrimaryAction?.urlType)
      }
    } else {
      setLoader(() => false)
      navigate(secondaryAction?.url, secondaryAction?.urlType)
    }
    setDate(() => null)
    setFormValues(() => initialValues)
    setFormErrors(() => initialFormErrors)
    setError(() => ({ search: false }))
    setHotelInformation(() => initialHotelValues)
  }
  const handleEnquiry = (title: string, url: any, urlType: any) => {
    triggerEvent({
      action: ENQUIRE_NOW_SUBMIT,
      params: {
        ...dataLayer,
        preferred_location: hotelInformation?.name,
        event_date: convertDateFormat(date)?.replaceAll("-", "/"),
        eventName: type || "",
        link_text: title,
        link_url: url,
        buttonLinkName: title,
        clientId: getCookie("_ga")?.slice(6),
        outbound: urlType === PathType?.internal ? false : true,
        option_Selected: title,
        widget_title: type,
        widget_type: _type,
        pageSection: analytics?.sectionTitle?.[0],
      },
    })
  }

  return (
    <>
      {loader && <LoadingSpinner />}
      <Box
        sx={{
          padding: isMobile
            ? cardPadding?.mobile
            : cardPadding?.desktop
            ? cardPadding?.desktop
            : `0vw ${DesktopPxToVw(240)}`,
        }}>
        <FeedbackInputFieldGrid>
          <InputTextField
            autoComplete="off"
            variant="standard"
            name={senderFirstName}
            value={formValues?.senderFirstName}
            placeholder={items?.[0]?.labelText}
            helperText={
              formErrors?.senderFirstName
                ? items?.[0]?.errorText
                  ? items?.[0]?.errorText
                  : ERROR_MESSAGES?.FIRST_NAME
                : ""
            }
            InputProps={{
              endAdornment: <>{formErrors?.senderFirstName && <FormErrorIcon />}</>,
            }}
            onChange={(e: any) => {
              nameFieldsRestrictions(e, handleChangeForm)
            }}
          />
          <InputTextField
            autoComplete="off"
            variant="standard"
            name={"senderEmail"}
            value={formValues?.senderEmail}
            placeholder={items?.[1]?.labelText}
            InputProps={{
              endAdornment: <>{formErrors?.senderEmail && <FormErrorIcon />}</>,
            }}
            helperText={
              formErrors?.senderEmail ? (items?.[1]?.errorText ? items?.[1]?.errorText : ERROR_MESSAGES?.EMAIL) : ""
            }
            onChange={(e) => handleChangeForm(e)}
          />

          <Stack>
            <MobileNumberField
              formState={formValues}
              name={senderMobile}
              countryCode={countryCode}
              setFormState={setFormValues}
              setErrorState={setFormErrors}
              value={formValues?.[senderMobile]}
              setCountryCode={setCountryCode}
              errorState={formErrors?.[senderMobile]}
              helperText={items?.[2]?.errorText}
              placeholder={items?.[2]?.labelText}
            />
          </Stack>
        </FeedbackInputFieldGrid>
        <FieldsGrid>
          <SearchAutocomplete
            sx={{
              ".MuiInput-root": {
                paddingBottom: "0vw",
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
            noOptionsText={"No results found for your search"}
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
              const temp = {
                ...params,
                InputProps: {
                  ...params?.InputProps,
                  startAdornment: <AutocompleteSearchIcon />,
                  endAdornment: hotelInformation?.name && hotelInformation?.name?.length > 0 && (
                    <AutoCompleteCloseIcon handleClick={handleSearchClose} />
                  ),
                },
              }
              return (
                <InputTextField
                  variant="standard"
                  autoComplete="off"
                  placeholder={items?.[3]?.labelText}
                  {...temp}
                  onKeyDown={(e: any) => {
                    hotelSearchRestrictions(e)
                  }}
                  onChange={(event: any) => {
                    if (hotelRegexCheck(event)) {
                      handleHotelSearch(event, setHotelInformation, setError)
                    }
                  }}
                  helperText={error?.search ? (items?.[3]?.errorText ? items?.[3]?.errorText : ERROR_HOTEL) : ""}
                />
              )
            }}
          />
          <FunctionDateContainer sx={{ width: "100%" }}>
            <CustomDatePickerComponent
              date={date}
              isOpen={open}
              sx={{
                width: "100%",
                height: "100%",
              }}
              maxDate={new Date()}
              onCalendarClose={() => {
                setOpen(false)
              }}
              onCalendarOpen={() => {
                setOpen(true)
              }}
              onChange={handleDatePicker}
              calendarIcon={() => <></>}
              placeholder={items?.[4]?.labelText}
              renderComponent={
                <InputTextField
                  ref={scrollRef}
                  sx={{ width: "100%" }}
                  onKeyDown={(e: any) => e?.preventDefault()}
                  onFocus={() => setOpen(() => true)}
                  onClick={(e) => setOpen(() => true)}
                  variant="standard"
                  autoComplete="off"
                  placeholder={items?.[4]?.labelText}
                  value={date ? convertDateFormat(date)?.replaceAll("-", "/") : ""}
                  InputProps={{
                    endAdornment: (
                      <Stack onClick={(prev: any) => setOpen(!prev)} justifyContent={"end"}>
                        <CalenderIcon />
                      </Stack>
                    ),
                  }}
                />
              }
              calendarWidth={isMobile ? MobilePxToVw(476) : "100%"}
            />
          </FunctionDateContainer>
        </FieldsGrid>
        <Typography variant={isMobile ? "m-body-l" : "body-l"}>{items?.[5]?.labelText}</Typography>
        <MultilineInputText
          sx={{ mt: isMobile ? MobilePxToVw(95) : DesktopPxToVw(30) }}
          multiline
          fullWidth
          autoComplete="off"
          name={"description"}
          value={formValues?.description}
          onChange={(e) => {
            const { value } = e?.target
            if (value === "" || value?.match(/^[A-Za-z0-9,. ]{0,400}$/)) {
              setFormValues((prev: any) => ({
                ...prev,
                description: e?.target?.value,
              }))
            }
          }}
          variant="standard"
          inputProps={{ maxLength: 1500 }}
        />
        <CheckBoxErrorStack>
          <TermsConditionsBox>
            <CustomCheckBox
              onChange={(e: any) => {
                handleChange(e)
              }}
              checked={formValues?.acceptedTNC}
            />
            {items?.[6]?.content?.map((content: any, index: number) => (
              <Box
                sx={{
                  "& *": {
                    fontSize: isMobile ? `${MobilePxToVw(22)} !important` : `${DesktopPxToVw(22)} !important`,
                  },
                }}
                key={index}>
                <PortableText blocks={content} key={index} />
              </Box>
            ))}
          </TermsConditionsBox>
          {formErrors?.acceptedTNC && (
            <ErrorMessageTypography textAlign={"center"} alignSelf={"center !important"}>
              {items?.[6]?.errorText ? items?.[6]?.errorText : ""}
            </ErrorMessageTypography>
          )}
        </CheckBoxErrorStack>
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
        <Stack alignItems={"center"} mt={isMobile ? MobilePxToVw(50) : DesktopPxToVw(31)}>
          <RenderActionItem
            url={PrimaryAction?.url}
            title={PrimaryAction?.title}
            variant={PrimaryAction?.variant}
            navigationType={PrimaryAction?.urlType}
            isActionButtonType={true}
            onClick={() => {
              if (checkValidity()) {
                handleSubmit()
                handleEnquiry(PrimaryAction?.title, PrimaryAction?.url, PrimaryAction?.urlType)
              } else {
                checkEmptyFields()
              }
            }}
            buttonStyles={{
              letterSpacing: isMobile ? "0.05em !important" : "0.1em !important",
              width: isMobile ? "100%" : "fit-content",
            }}
          />
        </Stack>
      </Box>
    </>
  )
}
export default observer(FeedBackComponent)
