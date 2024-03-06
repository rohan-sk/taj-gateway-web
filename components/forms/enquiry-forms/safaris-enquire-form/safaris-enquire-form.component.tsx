import {
  ActionsContainer,
  CheckBoxCell,
  ContentTypography,
  DatesContainer,
  ErrorIconComponent,
  FieldsContainer,
  InputTextField,
  MainContainer,
  StyledDivider,
  StyledTypography,
  TextAreaField,
  TitleContainer,
} from "./safaris-enquire-form.styles"
import { theme } from "../../../../lib/theme"
import { useContext, useEffect, useState } from "react"
import {
  Country,
  ERROR_MESSAGES,
  receiverEmail,
  senderEmail,
  senderFirstName,
  senderLastName,
  senderMobile,
} from "../../gift-card-form/constants"
import { Box, Grid, Stack } from "@mui/material"
import dynamic from "next/dynamic"
import data from "../../loyalty-form/formData.json"
import { ErrorMessageTypography } from "../../common/styles"
import { useMobileCheck } from "../../../../utils/isMobilView"
import { useAesthetics } from "../../../../utils/fetchAsthetics"
import { useAppNavigation } from "../../../../utils/NavigationUtility"
import { convertDateFormat, getNextDate } from "../../../../utils/getDate"
import { IHCLContext, useLoggedIn } from "../../loyalty-form/epicure-imports.component"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import TextfieldValidator from "../../../../utils/validations/TextfieldValidator"
import { AestheticContainer } from "../../../group/styles/common-styled-components"
import { nameFieldsRestrictions } from "../../common/utils/nameFieldRestrictionsHandler"
import { gridBreakPointsGenerator } from "../../../card/SearchResultCards/search-card.component"
import { handler as safarisAPI } from "../../../../features/notification/api/handlers/safaris.enquire"
import { handler as countryListService } from "../../../../features/my-account/api/handler/get-country-state-city.service"
import { ENQUIRE_NOW_SUBMIT } from "../../../../utils/analytics/constants"
import { triggerEvent } from "../../../../utils/analytics"
import { GLOBAL_STORES } from "../../../../utils/Constants"
import { getCookie } from "../../../../utils/cookie"
import { GAStore, UserStore } from "../../../../store"
import { MemberDataLayer } from "../../../../utils/analytics/member-data-layer"
const FormDatePicker = dynamic(() => import("./date-picker-component"))
const FormDropDownComponent = dynamic(() => import("./form-drop-down.component"))
const LoadingSpinner = dynamic(() => import("../../../../utils/SpinnerComponent"))
const RenderActionItem = dynamic(() => import("../../../hoc/actions/action-items-ui"))
const CustomCheckBox = dynamic(() =>
  import("../../../hoc/CustomCheckBox/Checkbox").then((module) => module.CustomCheckBox),
)
const MobileNumberField = dynamic(() => import("../../common/mobile-number-field.component"))
const CustomAutoCompleteComponent = dynamic(() => import("../../../custom-auto-complete.component"))

const initialErrors = {
  toDate: false,
  fromDate: false,
  [Country]: false,
  salutation: false,
  [senderEmail]: false,
  [senderMobile]: false,
  [receiverEmail]: false,
  [senderLastName]: false,
  [senderFirstName]: false,
}
const initialValues = {
  toDate: "",
  adults: "",
  comment: "",
  fromDate: "",
  children: "",
  [Country]: "",
  salutation: "",
  [senderEmail]: "",
  [senderMobile]: "",
  [receiverEmail]: "",
  [senderLastName]: "",
  [senderFirstName]: "",
}

const SafariFromComponent = (props: any) => {
  const { items, title, subtitle, PrimaryAction, secondaryAction, description, aesthetic } = props

  //utils
  const isLoggedIn = useLoggedIn()
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const { cardPadding, cardBackgroundColor } = useAesthetics(aesthetic?._ref)
  const Context = useContext(IHCLContext)
  const userStore = Context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const gaStoreData = Context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const dataLayer = MemberDataLayer(userStore, gaStoreData)
  //user details
  const phoneNumber = global?.localStorage?.getItem("userPhoneNumber") || ""
  const CountryCode = global?.localStorage?.getItem("userCountryCode") || ""
  const salutation = global?.localStorage?.getItem("userSalutation") || ""
  const firstName = global?.localStorage?.getItem("userFirstName") || ""
  const country = global?.localStorage?.getItem("userNationality") || ""
  const lastName = global?.localStorage?.getItem("userLastName") || ""
  const email = global?.localStorage?.getItem("userEmail") || ""

  //states
  const [toDate, setToDate] = useState<any>(null)
  const [fromDate, setFromDate] = useState<any>(null)
  const [loader, setLoader] = useState<boolean>(false)
  const [hotelsError, setHotelsError] = useState(false)
  const [refresh, setRefresh] = useState<boolean>(false)
  const [checkBoxes, setCheckBoxes] = useState<any[]>([])
  const [values, setValues] = useState<any>(initialValues)
  const [errors, setErrors] = useState<any>(initialErrors)
  const [countryCode, setCountryCode] = useState<any>("+91")
  const [countryList, setCountryList] = useState<string[]>(["India"])

  const styles = {
    background: cardBackgroundColor || theme?.palette?.ihclPalette?.hexThree,
    "& label": {
      color: `${theme?.palette?.ihclPalette?.hexTwentyNine} !important`,
    },
    "& .MuiInputBase-root.MuiInput-root": {
      color: `${theme?.palette?.ihclPalette?.hexTwentyNine} !important`,
      "&::after, &::before": {
        borderColor: `${theme?.palette?.ihclPalette?.hexTwentyNine} !important`,
      },
    },
  }

  const getCountryList = async () => {
    const res: any = await countryListService?.getCountry()
    if (!res?.error && res?.data) {
      setCountryList(res?.data)
    }
  }
  const valueSetter = (obj: any = {}) => {
    setValues((prev: any) => ({ ...prev, ...obj }))
  }
  const errorSetter = (obj: any = {}) => {
    setErrors((prev: any) => ({ ...prev, ...obj }))
  }
  const onCountryChange = (newValue: any) => {
    valueSetter({ [Country]: newValue })
  }
  const checkEmptyErrors = () => {
    let tempErrors: any = {
      [Country]: errors?.[Country],
      salutation: errors?.salutation,
      [senderEmail]:
        values?.[receiverEmail]?.length > 0
          ? values?.[receiverEmail]?.toLowerCase() === values?.[senderEmail]?.toLowerCase()
          : errors?.[senderEmail],
      [senderMobile]: errors?.[senderMobile],
      // [receiverEmail]: errors?.[receiverEmail], // remove later
      [senderLastName]: errors?.[senderLastName],
      [senderFirstName]: errors?.[senderFirstName],
    }
    if (selectedHotels?.length === 0) {
      setHotelsError(true)
    }
    Object?.entries(tempErrors)?.forEach(([key, error]: any) => {
      tempErrors = {
        ...tempErrors,
        [key]: error === true ? true : values?.[key]?.length === 0,
      }
    })
    setErrors((prev: any) => ({ ...prev, ...tempErrors }))
  }

  const handleSubmit = async () => {
    setLoader(() => true)
    const response = await safarisAPI?.apiCall(
      JSON.stringify({
        endDate: values?.toDate,
        title: values?.salutation,
        comments: values?.comment,
        country: values?.[Country],
        startDate: values?.fromDate,
        email: values?.[senderEmail],
        mobile: values?.[senderMobile],
        mobileCountryCode: countryCode,
        lastName: values?.[senderLastName],
        adultCount: values?.adults || null,
        childCount: values?.children || null,
        firstName: values?.[senderFirstName],
        lodgesWishlist: selectedHotels || [],
        alternateEmail: values?.[receiverEmail],
      }),
    )
    if (response?.error === false) {
      setLoader(() => false)
      if (response?.data?.cause) {
        navigate(secondaryAction?.url, secondaryAction?.urlType)
      } else {
        navigate(PrimaryAction?.url, PrimaryAction?.urlType)
        handleEnquiry(response)
      }
    } else {
      setLoader(() => false)
      navigate(secondaryAction?.url, secondaryAction?.urlType)
    }
    setToDate(null)
    setFromDate(null)
    setHotelsError(false)
    setCheckBoxes(() => [])
    setValues(() => initialValues)
    setErrors(() => initialErrors)
    setRefresh((prev: boolean) => !prev)
  }

  const handleChange = (e: any) => {
    const { name, value } = e?.target
    const { status } = TextfieldValidator(name, value)
    setValues((prev: any) => ({ ...prev, [name]: value }))
    setErrors((prev: any) => ({ ...prev, [name]: !status }))
  }

  const handleOtherEmail = (name: any, value: any) => {
    const { status } = TextfieldValidator(name, value)
    value?.length > 0 && setErrors((prev: any) => ({ ...prev, [name]: !status }))
  }

  const handleEmail = (e: any) => {
    const { name, value } = e?.target
    const { status } = TextfieldValidator(name, value)
    const isEmailMatched =
      value?.length > 0 &&
      value?.toLowerCase() ===
        (name === senderEmail ? values?.[receiverEmail]?.toLowerCase() : values?.[senderEmail]?.toLowerCase())

    setValues((prev: any) => ({ ...prev, [name]: value }))
    if (isEmailMatched) {
      setErrors((prev: any) => ({ ...prev, [senderEmail]: true }))
    } else {
      const otherEmail = name === senderEmail ? receiverEmail : senderEmail
      setErrors((prev: any) => ({ ...prev, [name]: !status }))
      handleOtherEmail(otherEmail, values?.[otherEmail])
    }
  }

  const handleDropDown = (e: any) => {
    const { name, value } = e?.target
    setValues((prev: any) => ({ ...prev, [name]: value }))
    setErrors((prev: any) => ({ ...prev, [name]: false }))
  }

  const handleDate = (isToDate: boolean, selectedDate: Date) => {
    if (isToDate) {
      let formattedDate = convertDateFormat(selectedDate)
      setToDate(selectedDate)
      setErrors((prev: any) => ({ ...prev, toDate: false }))
      setValues((prev: any) => ({ ...prev, toDate: formattedDate }))
    } else {
      let formattedDate = convertDateFormat(selectedDate)
      setFromDate(selectedDate)
      if (toDate && selectedDate >= toDate) {
        setErrors((prev: any) => ({
          ...prev,
          toDate: selectedDate >= toDate,
        }))
        setToDate(() => null)
      }
      setValues((prev: any) => ({ ...prev, fromDate: formattedDate }))
    }
  }

  //variables
  const isBothEmailValid =
    values?.[senderEmail]?.length > 0 &&
    values?.[receiverEmail]?.length > 0 &&
    values?.[senderEmail]?.toLowerCase() !== values?.[receiverEmail]?.toLowerCase()
  const EMAIL_ERROR_TEXT = errors?.[senderEmail]
    ? values?.[senderEmail]?.length === 0
      ? items?.[6]?.errorText
      : isBothEmailValid || values?.[receiverEmail]?.length === 0
      ? items?.[6]?.errorText
      : "Email cannot be same as Alternate Email"
    : ""

  const ALTERNATE_EMAIL_ERROR_TEXT = errors?.[receiverEmail]
    ? values?.[receiverEmail]?.length === 0
      ? items?.[7]?.errorText
      : isBothEmailValid || values?.[senderEmail]?.length === 0
      ? items?.[7]?.errorText
      : "Email cannot be same as Alternate Email"
    : ""
  const selectedHotels = checkBoxes?.map((item: any) => item?.hotel)

  const hotels: any =
    items?.[items?.findIndex((item: any) => item?.checkBoxList && item?.checkBoxList?.length > 0)]?.checkBoxList?.map(
      (item: any) => item?.value,
    ) || []

  //effects
  useEffect(() => {
    if (isLoggedIn) {
      setValues((prev: any) => ({
        ...prev,
        [Country]: country,
        [senderEmail]: email,
        salutation: salutation,
        [senderLastName]: lastName,
        [senderMobile]: phoneNumber,
        [senderFirstName]: firstName,
      }))
      setCountryCode(CountryCode ? CountryCode : "+91")
    }
  }, [firstName, lastName, isLoggedIn, CountryCode, phoneNumber, email, salutation, country, refresh])

  useEffect(() => {
    getCountryList()
  }, [])
  const handleEnquiry = (response: any) => {
    const lodgesWishlist: string[] | undefined = response?.data?.lodgesWishlist
    const location: string = lodgesWishlist?.join("|") || ""
    triggerEvent({
      action: ENQUIRE_NOW_SUBMIT,
      params: {
        ...dataLayer,
        eventName: title || "",
        link_text: PrimaryAction?.title,
        link_url: PrimaryAction?.url,
        buttonLinkName: PrimaryAction?.title,
        clientId: getCookie("_ga")?.slice(6),
        outbound: PrimaryAction?.urlType === "internal" ? false : true,
        no_of_adults: response?.data?.adultCount,
        no_of_child: response?.data?.childCount,
        total_guests: Number(response?.data?.adultCount) + Number(response?.data?.childCount),
        arrival_date: response?.data?.plannedDate,
        departure_date: response?.data?.endDate,
        preferred_location: location,
        widget_title: title,
        widget_type: props?._type,
        pageSection: title,
        country_selected: response?.data?.Country,
      },
    })
  }

  return (
    <>
      {loader && <LoadingSpinner />}
      <AestheticContainer $padding={isMobile ? cardPadding?.mobile : cardPadding?.desktop}>
        <MainContainer
          sx={{
            background: cardBackgroundColor
              ? `${cardBackgroundColor} !important`
              : theme?.palette?.ihclPalette?.hexThree + "important",
          }}>
          {title && (
            <TitleContainer>
              <StyledDivider
                sx={{
                  width: isMobile ? MobilePxToVw(45) : DesktopPxToVw(80),
                }}
              />
              <Stack>
                <StyledTypography variant={isMobile ? "m-heading-m" : "heading-l"}>{title}</StyledTypography>
              </Stack>
              <StyledDivider
                sx={{
                  width: isMobile ? MobilePxToVw(45) : DesktopPxToVw(80),
                }}
              />
            </TitleContainer>
          )}
          {(subtitle || description) && (
            <Stack mb={isMobile ? MobilePxToVw(14) : DesktopPxToVw(60)}>
              {subtitle && (
                <Stack alignItems={"center"} textAlign={"center"}>
                  <StyledTypography variant={isMobile ? "m-body-sl" : "body-ml"}>{subtitle}</StyledTypography>
                </Stack>
              )}
              {description && (
                <Stack alignItems={"center"} textAlign={"center"}>
                  <StyledTypography variant={isMobile ? "m-body-sl" : "body-ml"}>{description}</StyledTypography>
                </Stack>
              )}
            </Stack>
          )}
          {items?.[0]?.labelText && items?.[0]?.inputFieldType === "boldText" && (
            <Stack alignItems={"start"} mb={isMobile ? MobilePxToVw(33) : DesktopPxToVw(20)}>
              <StyledTypography
                variant={isMobile ? "m-body-l" : "body-l"}
                sx={{
                  fontWeight: 700,
                  color: theme?.palette?.ihclPalette?.hexTwentyNine,
                }}>
                {items?.[0]?.labelText}
              </StyledTypography>
            </Stack>
          )}
          <FieldsContainer
            $columns={3}
            $webGridSize={`${DesktopPxToVw(300)} ${DesktopPxToVw(407)} ${DesktopPxToVw(407)}`}>
            <FormDropDownComponent
              styles={styles}
              name={"salutation"}
              onChange={handleDropDown}
              error={errors?.salutation}
              value={values?.salutation}
              label={items?.[1]?.labelText}
              helperText={ERROR_MESSAGES?.empty_salutation}
              data={data?.titles?.map((item: any) => item?.title)}
            />
            <InputTextField
              sx={{
                width: "100%",
              }}
              variant="standard"
              placeholder={items?.[2]?.labelText}
              error={values?.senderFirstName}
              name={senderFirstName}
              value={values?.[senderFirstName]}
              onChange={(e: any) => {
                nameFieldsRestrictions(e, handleChange)
              }}
              helperText={errors?.[senderFirstName] && items?.[2]?.errorText}
              inputProps={{ maxLength: 50 }}
              InputProps={{
                autoComplete: "new-password",
                endAdornment: <>{errors?.[senderFirstName] && <ErrorIconComponent />}</>,
              }}
            />
            <InputTextField
              sx={{
                width: "100%",
              }}
              variant="standard"
              placeholder={items?.[3]?.labelText}
              error={errors?.senderLastName}
              name={senderLastName}
              value={values?.senderLastName}
              inputProps={{ maxLength: 50 }}
              onChange={(e: any) => {
                nameFieldsRestrictions(e, handleChange)
              }}
              helperText={errors?.[senderLastName] && items?.[3]?.errorText}
              InputProps={{
                autoComplete: "new-password",
                endAdornment: <>{errors?.[senderLastName] && <ErrorIconComponent />}</>,
              }}
            />
          </FieldsContainer>
          <FieldsContainer $columns={2}>
            <MobileNumberField
              formState={values}
              name={senderMobile}
              countryCode={countryCode}
              setFormState={setValues}
              setErrorState={setErrors}
              value={values?.[senderMobile]}
              setCountryCode={setCountryCode}
              errorState={errors?.[senderMobile]}
              helperText={props?.items?.[4]?.errorText}
              placeholder={props?.items?.[4]?.labelText}
              color={theme?.palette?.ihclPalette?.hexTwentyNine}
              dropDownStyle={{
                width: isMobile ? "75vw" : DesktopPxToVw(570),
                margin: isMobile ? `0 0 0 ${MobilePxToVw(63)}` : `0 0 0 ${DesktopPxToVw(233)}`,
              }}
            />
            {/* country */}
            <CustomAutoCompleteComponent
              options={countryList}
              value={values?.[Country] ? values?.[Country] : null}
              sx={{
                width: "100%",
                "& .MuiInput-input ": {
                  padding: "0vw !important",
                },
                "& .MuiSvgIcon-root": { fill: theme?.palette?.ihclPalette?.hexTwentyNine },
              }}
              showErrorIcon={errors?.[Country]}
              getOptionLabel={(option: any) => option}
              arrowStyles={{ color: theme?.palette?.ihclPalette?.hexTwentyNine }}
              onChange={(e: any, newValue: any, job: string) => {
                if (newValue) {
                  onCountryChange(newValue)
                  errorSetter({ [Country]: false })
                } else if (job?.toLowerCase() === "clear") {
                  valueSetter({ [Country]: "" })
                } else {
                  valueSetter({ [Country]: "" })
                }
              }}
              renderInput={(params: any) => (
                <InputTextField
                  {...params}
                  name={Country}
                  variant="standard"
                  inputProps={{
                    ...params?.inputProps,
                    autoComplete: "new-password",
                  }}
                  placeholder={props?.items?.[5]?.labelText}
                  noOptionsText={"Please wait fetching country list..."}
                  helperText={errors?.[Country] && props?.items?.[5]?.errorText}
                />
              )}
            />
          </FieldsContainer>
          <FieldsContainer $columns={2}>
            <InputTextField
              sx={{
                width: "100%",
              }}
              variant="standard"
              name={senderEmail}
              onChange={handleEmail}
              error={errors?.[senderEmail]}
              value={values?.[senderEmail]}
              helperText={EMAIL_ERROR_TEXT}
              placeholder={items?.[6]?.labelText}
              InputProps={{
                autoComplete: "new-password",
                endAdornment: <>{errors?.[senderEmail] && <ErrorIconComponent />}</>,
              }}
            />
            <InputTextField
              sx={{
                width: "100%",
              }}
              variant="standard"
              name={receiverEmail}
              onChange={handleEmail}
              value={values?.[receiverEmail]}
              // error={errors?.[receiverEmail]}
              placeholder={items?.[7]?.labelText}
              // helperText={ALTERNATE_EMAIL_ERROR_TEXT}
              InputProps={{
                autoComplete: "new-password",
                // endAdornment: <>{errors?.[receiverEmail] && <ErrorIconComponent />}</>,
              }}
            />
          </FieldsContainer>
          <Stack
            mb={isMobile ? MobilePxToVw(35) : DesktopPxToVw(31)}
            columnGap={isMobile ? MobilePxToVw(20) : DesktopPxToVw(15)}
            rowGap={isMobile ? MobilePxToVw(35) : DesktopPxToVw(31)}>
            {items?.[8]?.labelText && (
              <ContentTypography variant={isMobile ? "m-body-l" : "body-l"}>{items?.[8]?.labelText}</ContentTypography>
            )}
            {hotels?.length > 0 && (
              <Grid container justifyContent={"space-between"} rowGap={isMobile ? "3.125vw" : ""}>
                {hotels?.map((hotel: any, index: number) => {
                  return (
                    <Grid item key={index} {...gridBreakPointsGenerator(isMobile, 2.4, 5.2)}>
                      <CheckBoxCell>
                        <CustomCheckBox
                          name={hotel}
                          onChange={(e: any) => {
                            if (e?.target?.checked) {
                              setHotelsError(false)
                            }
                            setCheckBoxes((prev: any) => {
                              if (e?.target?.checked) {
                                if (prev?.findIndex((item: any) => item?.id === index) === -1)
                                  return [...prev, { id: index, hotel: hotel }]
                              } else {
                                return prev?.filter((item: any) => item?.id !== index)
                              }
                            })
                          }}
                          checked={checkBoxes?.findIndex((item: any) => item?.id === index) >= 0}
                        />
                        <Box pt={isMobile ? "0.7vw" : "0.2vw"}>
                          <ContentTypography variant={isMobile ? "m-body-sl" : "body-ml"}>{hotel}</ContentTypography>
                        </Box>
                      </CheckBoxCell>
                    </Grid>
                  )
                })}
              </Grid>
            )}
            {hotelsError && (
              <Stack>
                <ErrorMessageTypography>
                  {items?.[8]?.ErrorText || "Please select lodges from the above list"}
                </ErrorMessageTypography>
              </Stack>
            )}
          </Stack>
          {items?.[9]?.labelText && items?.[9]?.inputFieldType === "boldText" && (
            <Stack mb={isMobile ? MobilePxToVw(18) : DesktopPxToVw(18)}>
              <ContentTypography
                variant={isMobile ? "m-body-l" : "body-l"}
                sx={{
                  fontWeight: 700,
                  color: theme?.palette?.ihclPalette?.TwentyNine,
                }}>
                {items?.[9]?.labelText}
              </ContentTypography>
            </Stack>
          )}
          {items?.[10]?.labelText && (
            <Stack mb={isMobile ? MobilePxToVw(35) : DesktopPxToVw(31)}>
              <ContentTypography variant={isMobile ? "m-body-l" : "body-l"}>{items?.[10]?.labelText}</ContentTypography>
            </Stack>
          )}
          <ContentTypography variant={isMobile ? "m-body-l" : "body-l"}>{items?.[11]?.labelText}</ContentTypography>
          <Stack mb={isMobile ? MobilePxToVw(35) : DesktopPxToVw(31)}>
            <TextAreaField
              rows={1}
              name={"comment"}
              variant="standard"
              value={values?.comment}
              onChange={handleChange}
              sx={{ marginTop: isMobile ? "6.25vw" : "2.083vw" }}
            />
          </Stack>
          {items?.[12]?.labelText && (
            <Stack mb={isMobile ? MobilePxToVw(35) : DesktopPxToVw(31)}>
              <StyledTypography variant={isMobile ? "m-body-l" : "body-l"}>{items?.[12]?.labelText}</StyledTypography>
            </Stack>
          )}
          <DatesContainer>
            <FormDatePicker
              date={fromDate}
              isPageScroll={true}
              minDate={new Date()}
              onChange={(selectedDate: any) => {
                handleDate(false, selectedDate)
              }}
              styles={{
                "@media (max-width:640px)": {
                  "& .react-calendar": {
                    transform: `translateX(-4.5vw)`,
                  },
                },
              }}
              placeholder={items?.[13]?.labelText}
            />
            <FormDatePicker
              date={toDate}
              isPageScroll={true}
              error={errors?.toDate}
              isDefaultStartDate={true}
              placeholder={items?.[14]?.labelText}
              styles={{
                "@media (max-width:640px)": {
                  "& .react-calendar": {
                    transform: `translateX(-38.5vw)`,
                  },
                },
              }}
              onChange={(selectedDate: any) => {
                handleDate(true, selectedDate)
              }}
              minDate={fromDate ? getNextDate(fromDate) : new Date()}
              helperText={items?.[14]?.errorText || "Please choose the date greater then from date"}
            />
          </DatesContainer>
          <FieldsContainer $columns={2}>
            <FormDropDownComponent
              styles={styles}
              name={"adults"}
              value={values?.adults}
              onChange={handleChange}
              label={items?.[15]?.labelText}
              data={
                props?.items?.[15]?.clusterItems?.length > 0
                  ? props?.items?.[15]?.clusterItems?.map((item: any) => item?.key)
                  : [1, 2, 3, 4, 5, 6, 7]
              }
            />
            <FormDropDownComponent
              styles={styles}
              name={"children"}
              onChange={handleChange}
              value={values?.children}
              label={items?.[16]?.labelText}
              data={
                props?.items?.[16]?.clusterItems?.length > 0
                  ? props?.items?.[16]?.clusterItems?.map((item: any) => item?.key)
                  : [1, 2, 3, 4, 5, 6, 7]
              }
            />
          </FieldsContainer>
          <ActionsContainer>
            <RenderActionItem
              url={PrimaryAction?.url}
              buttonStyles={{
                letterSpacing: "1.8px",
              }}
              title={PrimaryAction?.title}
              variant={PrimaryAction?.variant}
              navigationType={PrimaryAction?.urlType}
              isActionButtonType={PrimaryAction?.urlType !== "link"}
              onClick={() => {
                if (
                  !errors?.toDate &&
                  (values?.[receiverEmail]?.length > 0
                    ? values?.[receiverEmail]?.toLowerCase() !== values?.[senderEmail]?.toLowerCase()
                    : true) &&
                  !errors?.[Country] &&
                  !errors?.salutation &&
                  !errors?.[senderEmail] &&
                  !errors?.[senderMobile] &&
                  // !errors?.[receiverEmail] && //remove later
                  !errors?.[senderLastName] &&
                  !errors?.[senderFirstName] &&
                  selectedHotels?.length > 0 &&
                  values?.[Country]?.length > 0 &&
                  values?.salutation?.length > 0 &&
                  values?.[senderEmail]?.length > 0 &&
                  values?.[senderMobile]?.length > 0 &&
                  // values?.[receiverEmail]?.length > 0 && //remove later
                  values?.[senderLastName]?.length > 0 &&
                  values?.[senderFirstName]?.length > 0
                ) {
                  handleSubmit()
                } else {
                  checkEmptyErrors()
                }
              }}
            />
            <RenderActionItem
              url={secondaryAction?.url}
              title={secondaryAction?.title}
              variant={secondaryAction?.variant}
              navigationType={secondaryAction?.urlType}
              buttonStyles={{
                letterSpacing: "1.8px",
              }}
              onClick={() => {
                setToDate(null)
                setFromDate(null)
                setHotelsError(false)
                setCheckBoxes(() => [])
                setErrors(() => initialErrors)
                setValues(() => initialValues)
              }}
              isActionButtonType={secondaryAction?.urlType !== "link"}
            />
          </ActionsContainer>
        </MainContainer>
      </AestheticContainer>
    </>
  )
}
export default SafariFromComponent
