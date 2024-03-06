import { Box, ClickAwayListener, FormControl, InputAdornment, MenuItem, Stack, Typography } from "@mui/material"
import dynamic from "next/dynamic"
import React, { useContext, useEffect, useRef, useState } from "react"
import { useMobileCheck } from "../../../../utils/isMobilView"
import { CalenderIcon } from "../../../../utils/customIcons"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { CONSTANTS } from "../../../constants"
import { useAppNavigation } from "../../../../utils/NavigationUtility"
import data from "../../loyalty-form/countryCityJson.json"
import { SelectCountryInterface } from "../../../Login/login-form.types"
import { handler as holidaysApi } from "../../../../features/notification/api/handlers/holidays-enquire"
import TextfieldValidator from "../../../../utils/validations/TextfieldValidator"
import { theme } from "../../../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import {
  BlockTextWrapper,
  CheckBoxWrapper,
  CitySelect,
  CountryState,
  EmailField,
  ErrorMessageTypography,
  InputText,
  MainGridWrapper,
  MobileNumberWrapper,
  NameField,
  NameFieldsWrapper,
  PhoneNumberField,
  SelectDropDownWrapper,
  SelectIncredibleJourney,
  StyledInputLabel,
  StyledMenuItem,
} from "./holiday-enquire-form-styles"
import {
  ERROR_MESSAGES,
  Error_icon,
  customMessage,
  senderEmail,
  senderFirstName,
  senderMobile,
} from "../../gift-card-form/constants"
import { UserStore } from "../../../../store"
import { GLOBAL_STORES } from "../../../../utils/Constants"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import { convertDateFormat, getNextDate } from "../../../../utils/getDate"
import { StayDateContainer } from "../../../contactus/styles/FeedBack-component-styles"
import { InputTextField } from "../news-letter-form/news-letter-form.styles"
import EnquireTextField from "../../common/form-input.component"
import { nameFieldsRestrictions } from "../../common/utils/nameFieldRestrictionsHandler"
import MobileNumberField from "../../common/mobile-number-field.component"
import ModalStore from "../../../../store/global/modal.store"
const RenderActionItem = dynamic(() => import("../../../hoc/actions/action-items-ui"))
const LoadingSpinner = dynamic(() => import("../../../../utils/SpinnerComponent"))
const SnackbarToast = dynamic(() => import("../../../../utils/SnackbarToast"))
const CustomDatePickerComponent = dynamic(() => import("../../../hoc/CustomDatePicker/custom-date-picker.component"))
const CustomCheckBox = dynamic(() =>
  import("../../../hoc/CustomCheckBox/Checkbox").then((module) => module.CustomCheckBox),
)
const PortableText = dynamic(() =>
  import("../../../../lib/portable-text-serializers").then((module) => module.PortableText),
)

const IncredibleJourneys = [
  {
    journeys: "Beach retreats",
  },
  {
    journeys: "Hill stations",
  },
  {
    journeys: "Royal India",
  },
  {
    journeys: "Urban oasis",
  },
  {
    journeys: "Wilderness getaways",
  },
  {
    journeys: "Spa retreats",
  },
  {
    journeys: "Cultural carnivals",
  },
  {
    journeys: "International holidays",
  },
]

type Disable = {
  senderFirstName: boolean
  senderMobile: boolean
  senderEmail: boolean
  countryCodeValue: boolean
  country: boolean
  city: boolean
}

const HolidayEnquireForm = (props: any) => {
  const context: any = useContext(IHCLContext)
  const modalStore = ModalStore.getInstance()
  const incredibleJourneyTitle = modalStore?.propertyData?.holidayOffer

  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()

  const [countryCode, setCountryCode] = useState<string>("+91")
  const [fromDate, setFromDate] = useState<any>(null)
  const [toDate, setToDate] = useState<any>(null)
  const [check, setChecked] = useState<boolean>(false)
  const [checkCall, setCheckCall] = useState<boolean>(false)
  const [openErrorMessage, setOpenErrorMessage] = useState<boolean>(false)
  const [snackMessage, setSnackMessage] = useState<string>("")
  const [terms, setTerms] = useState<boolean>(false)
  const [loader, setLoader] = useState<boolean>(false)
  const [userData, setUserData] = useState<any>()
  const [fromDateOpen, setFromDateOpen] = useState<boolean>(false)
  const [toDateOpen, setToDateOpen] = useState<boolean>(false)
  const scrollRef = useRef<any>(null)

  const [emptyFieldErrors, setEmptyFieldErrors] = useState<{
    emptyName: boolean
    emptyEmail: boolean
    emptyNumber: boolean
  }>({ emptyName: false, emptyEmail: false, emptyNumber: false })
  const [selectedValue, setSelectedValue] = useState<{
    incredibleJourney: string
    country: string
    city: string
  }>({
    incredibleJourney: "",
    country: "",
    city: "",
  })
  const [values, setValues] = useState<{
    senderFirstName: string
    senderMobile: string
    senderEmail: string
    customMessage: string
    companyName: string
  }>({
    senderFirstName: "",
    senderMobile: "",
    senderEmail: "",
    customMessage: "",
    companyName: "",
  })
  const [errors, setErrors] = useState<{
    senderFirstName: boolean
    senderEmail: boolean
    senderMobile: boolean
    customMessage: boolean
    companyName: boolean
  }>({
    senderFirstName: false,
    senderEmail: false,
    senderMobile: false,
    customMessage: false,
    companyName: false,
  })

  const [errorMessage, setErrorMessage] = useState<{
    senderEmail: string
    senderMobile: string
    customMessage: string
    senderFirstName: string
    companyName: string
  }>({
    senderFirstName: "",
    senderEmail: "",
    senderMobile: "",
    customMessage: "",
    companyName: "",
  })

  const [disable, setDisable] = useState<Disable>({
    senderFirstName: false,
    senderMobile: false,
    senderEmail: false,
    countryCodeValue: false,
    country: false,
    city: false,
  })

  const userStore = context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const customerHash = global?.localStorage?.getItem("customerHash")
  const currentDate = new Date()
  const featureDate = new Date(currentDate.setDate(currentDate.getDate() + 1))

  useEffect(() => {
    let address: any
    if (customerHash || userStore?.userDetails?.userHash) {
      setLoader(true)
      userStore?.getUserData().then((data: any) => {
        if (data?.error === false) {
          address = data?.data?.addresses?.filter((data: any) => {
            if (data?.isPrimary === "true") {
              setSelectedValue((prev: any) => {
                return {
                  ...prev,
                  country: data?.country,
                  city: data?.cityTown,
                }
              })
              setDisable((prev: any) => {
                return {
                  ...prev,
                  country: !(data?.country?.length <= 0 || data?.country === undefined || data?.country === null),
                  city: !(data?.cityTown?.length <= 0 || data?.cityTown === undefined || data?.cityTown === null),
                }
              })
            }
          })
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
      setValues((prev: any) => ({
        ...prev,

        [senderFirstName]: userData?.nameDetails?.firstName?.length > 0 ? userData?.nameDetails?.firstName : "",
        [senderEmail]: userData?.primaryEmailId?.length > 0 ? userData?.primaryEmailId : "",
        [senderMobile]: userData?.primaryMobile?.phoneNumber?.length > 0 ? userData?.primaryMobile?.phoneNumber : "",
      }))
      setCountryCode(userData?.primaryMobile?.isdCode?.length > 0 ? userData?.primaryMobile?.isdCode : "+91")
    }
    setDisable((prev: any) => ({
      ...prev,
      [senderFirstName]: !(
        userData?.nameDetails?.firstName?.length <= 0 ||
        userData?.nameDetails?.firstName === undefined ||
        userData?.nameDetails?.firstName === null
      ),
      [senderEmail]: !(
        userData?.primaryEmailId?.length <= 0 ||
        userData?.primaryEmailId === undefined ||
        userData?.primaryEmailId === null
      ),
      [senderMobile]: !(
        userData?.primaryMobile?.phoneNumber?.length <= 0 ||
        userData?.primaryMobile?.phoneNumber === undefined ||
        userData?.primaryMobile?.phoneNumber === null
      ),
      countryCodeValue: !(
        userData?.primaryMobile?.isdCode?.length < 0 ||
        userData?.primaryMobile?.isdCode === undefined ||
        userData?.primaryMobile?.isdCode === null
      ),
    }))
  }, [customerHash, userStore, userData])

  const handleSelectedValue = (event: any) => {
    const { name, value } = event.target
    if (name === "incredibleJourney") {
      setSelectedValue((prev: any) => {
        return {
          ...prev,
          incredibleJourney: value,
        }
      })
    }
    if (name === "country") {
      setSelectedValue((prev: any) => {
        return {
          ...prev,
          country: value,
        }
      })
    }
    if (name === "city") {
      setSelectedValue((prev: any) => {
        return {
          ...prev,
          city: value,
        }
      })
    }
  }

  const formValidation = (isFormValid: boolean, id: number) => {
    setErrors({ ...errors, [id]: !isFormValid })
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
        [name]: event?.target?.value,
      }
    })
    formValidation(status, name)
  }

  const handleSubmit = async () => {
    setLoader(true)
    const holidaysApiResponse = await holidaysApi?.apiCall(
      JSON.stringify({
        customerName: values?.senderFirstName,
        mobileCountryCode: countryCode,
        mobile: values?.senderMobile,
        email: values?.senderEmail,
        startDate: fromDate,
        endDate: toDate,
        country: selectedValue?.country,
        city: selectedValue?.city,
        packageName: selectedValue?.incredibleJourney,
        enquiryContent: values?.customMessage,
        holidaysOnCall: checkCall,
        acceptedTnC: check,
      }),
    )
    if (holidaysApiResponse?.error === false) {
      setLoader(false)
      if (holidaysApiResponse?.data?.cause) {
        navigate(props?.secondaryAction?.url, props?.secondaryAction?.urlType)
        // setOpenErrorMessage(true)
        // setSnackMessage(
        //   holidaysApiResponse?.data?.message || ERROR_MESSAGES?.mandatoryFields
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
  }
  const handleScroll = () => {
    if (scrollRef.current) {
      const elementTop = scrollRef.current.getBoundingClientRect().top
      const parentElement = document.getElementById("scrollable-form")
      const offset = 150
      parentElement?.scrollTo({
        top: elementTop + offset,
        behavior: "smooth",
      })
    }
    if (isMobile) {
      if (document.activeElement instanceof HTMLInputElement) {
        document.activeElement.blur()
      }
    }
  }
  useEffect(() => {
    if (incredibleJourneyTitle) {
      setSelectedValue((prev: any) => {
        return {
          ...prev,
          incredibleJourney: incredibleJourneyTitle,
        }
      })
    }
    return () => {
      modalStore.propertyData = {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incredibleJourneyTitle, modalStore.propertyData])

  return (
    <>
      {loader && <LoadingSpinner />}
      <MainGridWrapper ref={scrollRef}>
        <SnackbarToast open={openErrorMessage} onClose={() => setOpenErrorMessage(false)} Message={snackMessage} />
        <Typography
          variant={isMobile ? "m-heading-s" : "heading-s"}
          sx={{
            margin: "1vw 0vw 3vw 0vw !important",
            textAlign: "center",
            fontWeight: 300,
          }}>
          {props?.title}
        </Typography>
        <NameFieldsWrapper>
          <EnquireTextField
            name={senderFirstName}
            value={values.senderFirstName}
            error={errors?.senderFirstName}
            disabled={disable?.senderFirstName}
            helperText={props?.items?.[0]?.errorText}
            placeholder={props?.items?.[0]?.labelText}
            inputProps={{ maxLength: 50 }}
            onChange={(e: any) => nameFieldsRestrictions(e, handleChangeForm)}
          />
          <EnquireTextField
            name={senderEmail}
            value={values.senderEmail}
            error={errors?.senderEmail}
            disabled={disable?.senderEmail}
            inputProps={{ maxLength: 50 }}
            helperText={props?.items?.[1]?.errorText}
            onChange={(e: any) => handleChangeForm(e)}
            placeholder={props?.items?.[1]?.labelText}
          />
          <Stack>
            <MobileNumberField
              disable={disable?.senderMobile}
              name={senderMobile}
              formState={values}
              countryCode={countryCode}
              setFormState={setValues}
              setErrorState={setErrors}
              value={values?.[senderMobile]}
              setCountryCode={setCountryCode}
              errorState={errors?.[senderMobile]}
              helperText={props?.items?.[2]?.errorText}
              placeholder={props?.items?.[2]?.labelText}
            />
          </Stack>
        </NameFieldsWrapper>
        <SelectDropDownWrapper>
          <FormControl variant="standard">
            <StyledInputLabel sx={{ opacity: disable?.country ? "0.4" : 1 }}>
              {selectedValue?.country?.length <= 0 && props?.items?.[3]?.labelText}
            </StyledInputLabel>
            <CountryState
              variant="standard"
              value={selectedValue?.country}
              disabled={disable?.country}
              aria-disabled={disable?.country}
              name="country"
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
              IconComponent={() => <KeyboardArrowDownIcon sx={{ marginBottom: "0.4vw", cursor: "pointer" }} />}
              onChange={handleSelectedValue}>
              {data?.countryList?.map((item: SelectCountryInterface, index: number) => (
                <MenuItem key={index} value={item?.country}>
                  {item?.country}
                </MenuItem>
              ))}
            </CountryState>
          </FormControl>
          <FormControl variant="standard">
            <StyledInputLabel sx={{ opacity: disable?.city ? "0.4" : 1 }}>
              {selectedValue?.city?.length <= 0 && props?.items?.[4]?.labelText}
            </StyledInputLabel>
            <CitySelect
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
              disabled={disable?.city}
              aria-disabled={disable?.city}
              variant="standard"
              value={selectedValue?.city}
              name="city"
              IconComponent={() => <KeyboardArrowDownIcon sx={{ marginBottom: "0.4vw", cursor: "pointer" }} />}
              onChange={handleSelectedValue}>
              {selectedValue?.country &&
                data?.cityList?.map((cityItems: any, index: number) => (
                  <MenuItem key={index} value={cityItems?.city}>
                    {cityItems?.city}
                  </MenuItem>
                ))}
            </CitySelect>
          </FormControl>
        </SelectDropDownWrapper>
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            columnGap: DesktopPxToVw(40),
            rowGap: MobilePxToVw(35),
            mt: isMobile ? "4.688vw" : "initial",
          }}>
          <Box
            width={isMobile ? MobilePxToVw(476) : DesktopPxToVw(370)}
            mt={isMobile ? "initial" : "1.25vw"}
            onFocus={() => {
              setFromDateOpen(true), handleScroll()
            }}>
            <ClickAwayListener onClickAway={() => setFromDateOpen(false)}>
              <StayDateContainer $isOpen={fromDateOpen}>
                <CustomDatePickerComponent
                  date={fromDate}
                  isOpen={fromDateOpen}
                  minDate={featureDate}
                  sx={{ height: "2.083vw" }}
                  calendarIcon={() => <></>}
                  onChange={(selectedDate: any) => {
                    let formattedDate = convertDateFormat(selectedDate)
                    setFromDate(selectedDate)
                    setFromDateOpen(selectedDate ? false : true)
                    if (toDate && selectedDate >= toDate) {
                      setErrors((prev: any) => ({
                        ...prev,
                        toDate: selectedDate >= toDate,
                      }))
                      setToDate(() => null)
                    }
                    setValues((prev: any) => ({
                      ...prev,
                      fromDate: formattedDate,
                    }))
                  }}
                  renderComponent={
                    <InputTextField
                      placeholder={fromDate ? fromDate : props?.items?.[5]?.labelText}
                      onKeyDown={(e: any) => e?.preventDefault()}
                      onFocus={() => setFromDateOpen(() => true)}
                      onClick={(e: any) => setFromDateOpen(() => true)}
                      variant="standard"
                      value={fromDate ? convertDateFormat(fromDate) : ""}
                      InputProps={{
                        endAdornment: (
                          <Stack onClick={(prev: any) => setFromDateOpen(!prev)} justifyContent={"end"}>
                            <CalenderIcon sx={{ width: isMobile ? "2.656vw" : "0.833vw" }} />
                          </Stack>
                        ),
                      }}
                    />
                  }
                  calendarWidth={isMobile ? MobilePxToVw(476) : DesktopPxToVw(370)}
                />
              </StayDateContainer>
            </ClickAwayListener>
          </Box>
          <Box
            width={isMobile ? MobilePxToVw(476) : DesktopPxToVw(370)}
            mt={isMobile ? "1vw" : "1.25vw"}
            onFocus={() => {
              setToDateOpen(true), handleScroll()
            }}>
            <ClickAwayListener onClickAway={() => setToDateOpen(false)}>
              <StayDateContainer $isOpen={toDateOpen}>
                <CustomDatePickerComponent
                  date={toDate}
                  isOpen={toDateOpen}
                  minDate={fromDate ? getNextDate(fromDate) : featureDate}
                  sx={{ height: "2.083vw" }}
                  calendarIcon={() => <></>}
                  onChange={(selectedDate: any) => {
                    let formattedDate = convertDateFormat(selectedDate)
                    setToDate(selectedDate)
                    setToDateOpen(selectedDate ? false : true)
                    setValues((prev: any) => ({
                      ...prev,
                      toDate: formattedDate,
                    }))
                  }}
                  renderComponent={
                    <InputTextField
                      placeholder={toDate ? toDate : props?.items?.[6]?.labelText}
                      onKeyDown={(e: any) => e?.preventDefault()}
                      onFocus={() => setToDateOpen(() => true)}
                      onClick={(e: any) => setToDateOpen(() => true)}
                      variant="standard"
                      value={toDate ? convertDateFormat(toDate) : ""}
                      InputProps={{
                        endAdornment: (
                          <Stack onClick={(prev: any) => setToDateOpen(!prev)} justifyContent={"end"}>
                            <CalenderIcon sx={{ width: isMobile ? "2.656vw" : "0.833vw" }} />
                          </Stack>
                        ),
                      }}
                    />
                  }
                  calendarWidth={isMobile ? MobilePxToVw(476) : DesktopPxToVw(370)}
                />
              </StayDateContainer>
            </ClickAwayListener>
          </Box>

          <FormControl
            variant="standard"
            sx={{
              alignSelf: isMobile ? "center" : "self-end",
              // marginRight: isMobile ? "0vw" : "2vw",
            }}>
            {selectedValue?.incredibleJourney?.length <= 0 && (
              <StyledInputLabel>{props?.items?.[7]?.labelText}</StyledInputLabel>
            )}
            <SelectIncredibleJourney
              variant="standard"
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
              disabled={!!incredibleJourneyTitle}
              value={selectedValue?.incredibleJourney}
              name="incredibleJourney"
              onChange={(e: any) => handleSelectedValue(e)}
              IconComponent={() => <KeyboardArrowDownIcon sx={{ marginBottom: "0.4vw" }} />}>
              {(incredibleJourneyTitle ? [{ journeys: incredibleJourneyTitle }] : IncredibleJourneys)?.map(
                (item: any, index: number) => (
                  <StyledMenuItem key={index} value={item?.journeys} sx={{ fontFamily: "Inter", fontSize: "1vw" }}>
                    {item?.journeys}
                  </StyledMenuItem>
                ),
              )}
            </SelectIncredibleJourney>
          </FormControl>
        </Box>
        <Box sx={{ margin: "1vw 0vw" }}>
          <Typography
            sx={{
              color: theme?.palette?.ihclPalette.hexSeventeen,
              fontSize: isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
            }}>
            {props?.items?.[8]?.labelText}
          </Typography>
          <InputText
            multiline
            rows={1}
            sx={{
              width: isMobile ? "74vw !important" : "62.188vw",
              letterSpacing: "1px",
              marginTop: "1vw",
            }}
            variant="standard"
            name={customMessage}
            value={values.customMessage}
            onChange={(e: any) => handleChangeForm(e)}
            inputProps={{
              maxLength: CONSTANTS.TEXT_AREA_CHARACTER_LIMIT,
            }}
          />
        </Box>
        <CheckBoxWrapper>
          <BlockTextWrapper>
            <CustomCheckBox
              checked={check}
              onChange={() => {
                setChecked(!check)
              }}
            />
            <PortableText blocks={props?.items?.[9]?.content?.[0]} />
          </BlockTextWrapper>
          <Box sx={{ display: "flex", alignItems: "center", marginTop: "0.6vw" }}>
            <CustomCheckBox
              checked={checkCall}
              onChange={() => {
                setCheckCall(!checkCall)
              }}
            />
            <PortableText blocks={props?.items?.[10]?.content?.[0]} />
          </Box>
        </CheckBoxWrapper>
        {terms && (
          <ErrorMessageTypography sx={{ alignSelf: "center" }} variant="body-s">
            {ERROR_MESSAGES?.checkboxError}
          </ErrorMessageTypography>
        )}
        <RenderActionItem
          isActionButtonType={true}
          url={props?.PrimaryAction?.url}
          title={props?.PrimaryAction?.title}
          variant={props?.PrimaryAction?.variant}
          navigationType={props?.PrimaryAction?.urlType}
          buttonStyles={{
            width: isMobile ? "36.688vw" : "14vw",
            display: "flex",
            margin: isMobile ? "6.25vw 0vw 8.594vw" : "1.569vw 0vw 2.083vw",
          }}
          onClick={() => {
            if (
              values?.senderFirstName?.length > 0 &&
              values?.senderEmail?.length > 0 &&
              values?.senderMobile?.length > 0 &&
              errors?.senderFirstName === false &&
              errors?.senderEmail === false &&
              errors?.senderMobile === false &&
              check === true
            ) {
              setTerms(false)
              handleSubmit()
            } else {
              if (!check) {
                setTerms(true)
              }
              if (values?.senderFirstName?.length === 0) {
                setEmptyFieldErrors((prev: any) => {
                  return {
                    ...prev,
                    emptyName: true,
                  }
                })
              } else {
                setEmptyFieldErrors((prev: any) => {
                  return {
                    ...prev,
                    emptyName: false,
                  }
                })
              }
              if (values?.senderEmail?.length === 0) {
                setEmptyFieldErrors((prev: any) => {
                  return {
                    ...prev,
                    emptyEmail: true,
                  }
                })
              } else {
                setEmptyFieldErrors((prev: any) => {
                  return {
                    ...prev,
                    emptyEmail: false,
                  }
                })
              }
              if (values?.senderMobile?.length === 0) {
                setEmptyFieldErrors((prev: any) => {
                  return {
                    ...prev,
                    emptyNumber: true,
                  }
                })
              } else {
                setEmptyFieldErrors((prev: any) => {
                  return {
                    ...prev,
                    emptyNumber: false,
                  }
                })
              }
            }
          }}
        />
        {props?.singleContent && (
          <Box
            sx={{
              marginBottom: "2vw",
              paddingBottom: isMobile ? "8.594vw" : "",
            }}>
            {props?.singleContent?.map((item: any, idx: number) => (
              <PortableText blocks={item} key={idx} />
            ))}
          </Box>
        )}
      </MainGridWrapper>
    </>
  )
}

export default HolidayEnquireForm
