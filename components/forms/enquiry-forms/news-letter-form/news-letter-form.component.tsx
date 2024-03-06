import { GAStore, UserStore } from "../../../../store"
import { theme } from "../../../../lib/theme"
import dynamic from "next/dynamic"
import data from "../../loyalty-form/formData.json"

import { GLOBAL_STORES } from "../../../../utils/Constants"
import { useMobileCheck } from "../../../../utils/isMobilView"
import React, { useContext, useEffect, useRef, useState } from "react"
import { FullBox } from "../../business-form/business-sme-form"
import { useLoggedIn } from "../../../../utils/hooks/useLoggedIn"
import { useAppNavigation } from "../../../../utils/NavigationUtility"
import { Box, Stack, Typography } from "@mui/material"
import TextfieldValidator from "../../../../utils/validations/TextfieldValidator"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import { handler as emailSubscription } from "../../../../features/notification/api/handlers/email-subscription"
import { handler as countryListService } from "../../../../features/my-account/api/handler/get-country-state-city.service"
import {
  FirstRow,
  CommonGird,
  InputTextField,
  NewsLetterMenuItem,
  ActionItemContainer,
  FormFieldsContainer,
  NewsLetterStyledLabel,
  NewsLetterFormControl,
  ErrorMessageTypography,
  NewsLetterFormContainer,
  NewsLetterTitleContainer,
  NewsletterSelectContainer,
  SalutationSelect,
} from "./news-letter-form.styles"
import { Errors, Values, Disable } from "./news-letter-form.types"
import {
  City,
  State,
  Country,
  senderEmail,
  ERROR_MESSAGES,
  senderLastName,
  senderFirstName,
} from "../../gift-card-form/constants"
import ReCAPTCHA from "react-google-recaptcha"
import { verifyCaptcha } from "../../../../utils/ServerActions"
import { FormErrorIcon, FormSelectArrowIcon } from "../../common/form-components"
import { nameFieldsRestrictions } from "../../common/utils/nameFieldRestrictionsHandler"
import { triggerEvent } from "../../../../utils/analytics"
import { ENQUIRE_NOW_SUBMIT } from "../../../../utils/analytics/constants"
import { MemberDataLayer } from "../../../../utils/analytics/member-data-layer"
import { getCookie } from "../../../../utils/cookie"
import { PathType } from "../../../types"
import CustomAutoCompleteComponent from "../../../custom-auto-complete.component"
import { MobilePxToVw } from "../../loyalty-form/epicure-imports.component"
const RenderActionItem = dynamic(() => import("../../../hoc/actions/action-items-ui"))
const LoadingSpinner = dynamic(() => import("../../../../utils/SpinnerComponent"))
const CustomCheckBox = dynamic(() =>
  import("../../../hoc/CustomCheckBox/Checkbox").then((module) => module.CustomCheckBox),
)

const initialValues: Values = {
  salutation: "",
  [senderFirstName]: "",
  [senderLastName]: "",
  [senderEmail]: "",
  [Country]: "India",
  [State]: "",
  [City]: "",
  check: false,
  recaptcha: false,
}
const initialErrors: Errors = {
  salutation: false,
  [senderFirstName]: false,
  [senderLastName]: false,
  [senderEmail]: false,
  [Country]: false,
  [State]: false,
  [City]: false,
  recaptcha: false,
}

const initialDisable: Disable = {
  salutation: false,
  [senderFirstName]: false,
  [senderLastName]: false,
  [senderEmail]: false,
  [Country]: false,
  [State]: false,
  [City]: false,
}

const NewsLetterForm = (props: any) => {
  const { checkBoxList: salutationData } = props?.items?.[0] || {}

  const isLogin = useLoggedIn()
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const context = useContext(IHCLContext)

  const PortableText = context!.PortableText
  const captchaRef = useRef<ReCAPTCHA>(null)

  const [countryList, setCountryList] = useState(["India"])
  const [stateList, setStateList] = useState([])
  const [cityList, setCityList] = useState([])
  const [values, setValues] = useState<Values>(initialValues)
  const [errors, setErrors] = useState<Errors>(initialErrors)
  const [disable, setDisable] = useState<Disable>(initialDisable)
  const [loader, setLoader] = useState<boolean>(false)
  const [emptyCheck, setEmptyCheck] = useState<boolean>(false)
  const [isFieldChange, setIsFieldChange] = useState<any>({
    [Country]: true,
    [State]: true,
  })

  //global user store
  const userStore = context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const dataLayer = MemberDataLayer(UserStore, gaStoreData)

  //country state city api calling setters
  const getCountryList = async () => {
    const res: any = await countryListService?.getCountry()
    if (!res?.error && res?.data) {
      setCountryList(res?.data)
    }
  }
  const getStateList = async (newValue: any) => {
    const res: any = await countryListService?.getStates(newValue)
    if (!res?.error && res?.data) {
      setStateList(res?.data)
      isFieldChangeSetter(Country, false)
    }
  }
  const getCityList = async (newValue: any) => {
    const res: any = await countryListService?.getCities(newValue)
    setCityList([])
    if (!res?.error && res?.data) {
      setCityList(res?.data)
      isFieldChangeSetter(State, false)
    }
  }

  //setter Functions
  const valueSetter = (key: any, value: any) => {
    setValues((prev: any) => ({ ...prev, [key]: value }))
  }
  const errorSetter = (key: any, value: any) => {
    setErrors((prev: any) => ({ ...prev, [key]: value }))
  }
  const disableSetter = (key: any, value: any) => {
    setDisable((prev: any) => ({ ...prev, [key]: value }))
  }
  const isFieldChangeSetter = (key: any, value: any) => {
    setIsFieldChange((prev: any) => ({ ...prev, [key]: value }))
  }

  //footer email prepopulation
  useEffect(() => {
    valueSetter("senderEmail", userStore?.subscriptionEmail)
    disableSetter("senderEmail", true)
  }, [userStore])

  //integrated getCountriesList
  useEffect(() => {
    getCountryList()
  }, [])

  const onCountryChange = (newValue: any) => {
    valueSetter(Country, newValue)
    valueSetter(State, "")
    valueSetter(City, "")
    setStateList([])
    setCityList([])
    isFieldChangeSetter(Country, true)
  }
  const onStateChange = (newValue: any) => {
    valueSetter(State, newValue)
    valueSetter(City, "")
    setCityList([])
    isFieldChangeSetter(State, true)
  }
  const onCityChange = (newValue: any) => {
    valueSetter(City, newValue)
  }
  useEffect(() => {
    let tempSalutation = userStore?.userDetails?.salutation || global?.localStorage?.getItem("userSalutation") || ""
    const defaultAddress = userStore?.userDetails?.userAddresses?.find((item: any) => item?.isPrimary)
    const isExist = data?.salutation?.some(
      (item) => item?.title?.toLowerCase() === String(tempSalutation)?.toLocaleLowerCase(),
    )
    const tempDetails = {
      salutation: isExist ? tempSalutation : "",
      senderFirstName: userStore?.userDetails?.firstName || global?.localStorage.getItem("userFirstName") || "",
      senderLastName: userStore?.userDetails?.lastName || global?.localStorage?.getItem("userLastName") || "",
    }

    setValues((previousValues: Values) => ({
      ...previousValues,
      salutation:
        tempDetails?.salutation?.toLocaleLowerCase() === "null" ||
        tempDetails?.salutation?.toLocaleLowerCase() === "undefined"
          ? ""
          : tempDetails?.salutation,
      senderFirstName: tempDetails?.senderFirstName,
      senderLastName: tempDetails?.senderLastName,
      [State]: defaultAddress?.state || "",
      [City]: defaultAddress?.cityTown || "",
    }))

    setDisable((previousDisable: Disable) => ({
      ...previousDisable,
      salutation:
        tempDetails?.salutation?.length > 0 &&
        tempDetails?.salutation?.toLocaleLowerCase() !== "null" &&
        tempDetails?.salutation?.toLocaleLowerCase() !== "undefined" &&
        isExist &&
        isLogin
          ? true
          : false,
      senderFirstName: tempDetails?.senderFirstName?.length > 0 ? true : false,
      senderLastName: tempDetails?.senderLastName?.length > 0 ? true : false,
    }))
  }, [userStore, isLogin])

  const handleChange = ({ target: { name, value } }: any) => {
    const { status, errorMsg } = TextfieldValidator(name, value)
    valueSetter(name, value)
    if (name === "salutation") {
      errorSetter(name, false)
    } else {
      errorSetter(name, !status)
    }
  }

  async function handleCaptchaSubmission(token: string | null) {
    // Server function to verify captcha
    await verifyCaptcha(token)
      .then((response: any) => {
        valueSetter("recaptcha", true)
        errorSetter("recaptcha", false)
      })
      .catch((error: any) => {
        valueSetter("recaptcha", false)
        errorSetter("recaptcha", true)
      })
  }

  const handleCheck = () => {
    setValues((prevValues: Values) => ({
      ...prevValues,
      check: !prevValues?.check,
    }))
    setEmptyCheck(true)
  }

  const validateFormOnClick = () => {
    let tempErrors = {
      errors: initialErrors,
    }
    tempErrors = Object?.keys(values)?.reduce((previousErrors: typeof tempErrors, nameKey: string) => {
      if (nameKey === senderFirstName || nameKey === senderLastName || nameKey === senderEmail) {
        const { status, errorMsg } = TextfieldValidator(nameKey, values?.[nameKey])
        return {
          errors: {
            ...previousErrors?.errors,
            [nameKey]: !status,
          },
        }
      } else if (nameKey === Country || nameKey === State || nameKey === City || nameKey === "salutation") {
        return {
          errors: {
            ...previousErrors?.errors,
            [nameKey]: values?.[nameKey]?.length === 0,
          },
        }
      } else if (nameKey === "recaptcha") {
        return {
          errors: {
            ...previousErrors?.errors,
            [nameKey]: !values?.recaptcha,
          },
        }
      } else {
        return previousErrors
      }
    }, tempErrors)
    setErrors((prev: Errors) => tempErrors?.errors)
  }

  //form submission handler
  const handleSubmit = async () => {
    setLoader(() => true)
    const response = await emailSubscription?.apiCall(
      JSON.stringify({
        salutation: values?.salutation,
        firstName: values?.senderFirstName,
        lastName: values?.senderLastName,
        email: values?.senderEmail,
        country: values?.["Country*"],
        state: values?.["State*"],
        city: values?.["City*"],
        acceptedTnC: values?.check,
        acceptedPrivacyPolicy: values?.check,
      }),
    )
    userStore?.setSubscribedSuccessfully(true)
    if (response?.status === 200) {
      userStore?.setAlreadySubscribed(false)
      !isLogin && userStore?.setFooterEmailClear(true)
    } else if (response?.error === true && response?.data?.statusCode === 409) {
      userStore?.setAlreadySubscribed(true)
    } else if (response?.error === true && response?.data?.statusCode === 400) {
      userStore?.setSubscribedSuccessfully(false)
    } else {
      userStore?.setSubscribedSuccessfully(false)
    }
    if (response?.error === false) {
      setLoader(false)
      navigate(props?.PrimaryAction?.url, props?.PrimaryAction?.urlType)
    } else {
      setLoader(false)
      navigate(props?.PrimaryAction?.url, props?.PrimaryAction?.urlType)
    }
    setLoader(() => false)
  }

  const MenuProps = {
    PaperProps: {
      elevation: 0,
      sx: {
        maxHeight: 300,
        backgroundColor: theme?.palette?.background?.default,
        borderRadius: "0",
        boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
      },
    },
  }
  const handleEnquiry = (title: string, urlType: any, url: any) => {
    triggerEvent({
      action: ENQUIRE_NOW_SUBMIT,
      params: {
        ...dataLayer,
        eventName: props?.title,
        link_text: title,
        link_url: url,
        buttonLinkName: title,
        clientId: getCookie("_ga")?.slice(6),
        outbound: urlType === PathType?.internal ? false : true,
        preferred_location: values?.["City*"],
        preferred_location_city: values?.["City*"],
        option_Selected: title,
        preferred_location_state: values?.["State*"],
        widget_title: props?.title,
        widget_type: props?._type,
        pageSection: props?.analytics?.sectionTitle?.[0],
      },
    })
  }
  return (
    <>
      {loader && <LoadingSpinner />}
      <NewsLetterFormContainer aria-label={isMobile ? props?.variant : props?.largeVariant}>
        <NewsLetterTitleContainer>
          <Typography variant={isMobile ? "m-heading-s" : "heading-m"}>{props?.title}</Typography>
        </NewsLetterTitleContainer>
        <FormFieldsContainer>
          <FirstRow $webWidths={"7.5vw 1fr 1fr"}>
            <NewsletterSelectContainer sx={{ gridArea: "salutation" }}>
              <NewsLetterFormControl variant={"standard"}>
                {values?.salutation?.length === 0 && (
                  <NewsLetterStyledLabel>{props?.items?.[0]?.labelText}</NewsLetterStyledLabel>
                )}
                <SalutationSelect
                  disabled={disable?.salutation}
                  aria-disabled={disable?.salutation}
                  label={props?.items?.[0]?.labelText}
                  aria-label={props?.items?.[0]?.labelText}
                  value={values?.salutation}
                  name={"salutation"}
                  onChange={handleChange}
                  MenuProps={MenuProps}
                  IconComponent={(props: any) =>
                    errors?.salutation ? <FormErrorIcon /> : <FormSelectArrowIcon {...props} />
                  }>
                  {salutationData?.map((item: any, index: number) => (
                    <NewsLetterMenuItem key={index} value={item?.value}>
                      {item?.value}
                    </NewsLetterMenuItem>
                  ))}
                </SalutationSelect>
              </NewsLetterFormControl>
              {errors?.salutation && (
                <ErrorMessageTypography>
                  {props?.items?.[0]?.errorText ? props?.items?.[0]?.errorText : ERROR_MESSAGES?.empty_salutation}
                </ErrorMessageTypography>
              )}
            </NewsletterSelectContainer>
            <InputTextField
              sx={{
                gridArea: "firstName",
                label: {
                  "&.Mui-error": {
                    color: theme?.palette?.ihclPalette?.hexSeventeen,
                  },
                },
              }}
              variant="standard"
              label={values?.senderFirstName?.length === 0 ? props?.items?.[1]?.labelText : ""}
              aria-label={props?.items?.[1]?.labelText}
              disabled={disable?.senderFirstName}
              aria-disabled={disable?.senderFirstName}
              name={senderFirstName}
              value={values?.senderFirstName}
              onChange={(e: any) => {
                nameFieldsRestrictions(e, handleChange)
              }}
              helperText={
                errors?.senderFirstName
                  ? props?.items?.[1]?.errorText
                    ? props?.items?.[1]?.errorText
                    : ERROR_MESSAGES?.FIRST_NAME
                  : ""
              }
              InputProps={{
                autoComplete: "new-password",
                endAdornment: <>{errors?.senderFirstName && <FormErrorIcon />}</>,
              }}
            />
            <InputTextField
              sx={{
                gridArea: "lastName",
                label: {
                  "&.Mui-error": {
                    color: theme?.palette?.ihclPalette?.hexSeventeen,
                  },
                },
              }}
              variant="standard"
              label={values?.senderLastName?.length === 0 ? props?.items?.[2]?.labelText : ""}
              aria-label={props?.items?.[2]?.labelText}
              disabled={disable?.senderLastName}
              aria-disabled={disable?.senderLastName}
              name={senderLastName}
              value={values?.senderLastName}
              onChange={(e: any) => {
                nameFieldsRestrictions(e, handleChange)
              }}
              helperText={
                errors?.senderLastName
                  ? props?.items?.[2]?.errorText
                    ? props?.items?.[2]?.errorText
                    : ERROR_MESSAGES?.LAST_NAME
                  : ""
              }
              InputProps={{
                autoComplete: "new-password",
                endAdornment: <>{errors?.senderLastName && <FormErrorIcon />}</>,
              }}
            />
          </FirstRow>
          <CommonGird $webWidths={"1fr 1fr"}>
            <InputTextField
              variant="standard"
              label={values?.senderEmail?.length === 0 ? props?.items?.[3]?.labelText : ""}
              aria-label={props?.items?.[3]?.labelText}
              disabled={disable?.senderEmail}
              aria-disabled={disable?.senderEmail}
              error={errors?.senderEmail}
              name={senderEmail}
              onChange={handleChange}
              value={values?.senderEmail}
              helperText={
                errors?.senderEmail
                  ? props?.items?.[3]?.errorText
                    ? props?.items?.[3]?.errorText
                    : ERROR_MESSAGES?.EMAIL
                  : ""
              }
              InputProps={{
                autoComplete: "new-password",
                endAdornment: <>{errors?.senderEmail && <FormErrorIcon />}</>,
              }}
            />
            {/* country */}
            <CustomAutoCompleteComponent
              showErrorIcon={errors?.[Country]}
              value={values?.[Country]}
              onChange={(event: any, newValue: any, job: string) => {
                if (newValue) {
                  onCountryChange(newValue)
                  errorSetter(Country, false)
                } else if (job?.toLowerCase() === "clear") {
                  setStateList([])
                  valueSetter(Country, "")
                  valueSetter(State, "")
                  valueSetter(City, "")
                } else {
                  valueSetter(Country, "")
                }
              }}
              options={countryList}
              noOptionsText={"Please wait fetching country list..."}
              renderInput={(params: any) => (
                <InputTextField
                  {...params}
                  name={Country}
                  variant="standard"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                  helperText={errors?.[Country] && props?.items?.[4]?.errorText}
                  placeholder={props?.items?.[4]?.labelText}
                />
              )}
              getOptionLabel={(option: any) => option}
              sx={{
                width: "100%",
                "& .MuiInput-input ": {
                  padding: "0vw !important",
                },
              }}
            />
          </CommonGird>
          <CommonGird $webWidths={"1fr 1fr"}>
            {/* state */}
            <CustomAutoCompleteComponent
              value={values?.[State]}
              onChange={(event: any, newValue: any, job: string) => {
                if (newValue) {
                  onStateChange(newValue)
                  errorSetter(State, false)
                } else if (job?.toLowerCase() === "clear") {
                  setCityList([])
                  valueSetter(State, "")
                  valueSetter(City, "")
                } else {
                  valueSetter(State, "")
                }
              }}
              onOpen={() => {
                if (isFieldChange?.[Country]) {
                  getStateList(values?.[Country])
                }
              }}
              options={stateList}
              noOptionsText={
                isFieldChange?.[Country] ? "Please wait fetching state list..." : "Please select the country first"
              }
              getOptionLabel={(option: any) => option}
              showErrorIcon={errors?.[State]}
              renderInput={(params: any) => (
                <InputTextField
                  {...params}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                  variant="standard"
                  placeholder={props?.items?.[5]?.labelText}
                  helperText={errors?.[State] && props?.items?.[5]?.errorText}
                />
              )}
              sx={{
                width: "100%",
                ".MuiInput-input ": {
                  padding: "0vw",
                },
              }}
            />
            <CustomAutoCompleteComponent
              options={cityList}
              onOpen={() => {
                if (isFieldChange?.[State]) {
                  getCityList(values?.[State])
                }
              }}
              showErrorIcon={errors?.[City]}
              onChange={(event: any, newValue: any, job: string) => {
                if (newValue) {
                  onCityChange(newValue)
                  errorSetter(City, false)
                } else if (job?.toLowerCase() === "clear") {
                  valueSetter(City, "")
                } else {
                  valueSetter(City, "")
                }
              }}
              value={values?.[City]}
              noOptionsText={isFieldChange?.[State] ? "Please wait fetching city list..." : ""}
              renderInput={(params: any) => (
                <InputTextField
                  {...params}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                  name={State}
                  variant="standard"
                  placeholder={props?.items?.[6]?.labelText}
                  helperText={errors?.[City] && props?.items?.[6]?.errorText}
                />
              )}
              getOptionLabel={(option: any) => option}
              sx={{
                width: "100%",
                ".MuiInput-input ": {
                  padding: "0vw",
                },
              }}
            />
          </CommonGird>
          <Stack>
            <FullBox
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: isMobile ? MobilePxToVw(12) : "auto",
                alignItems: isMobile ? "start" : "end",
              }}>
              <CustomCheckBox name={"terms"} onChange={handleCheck} checked={values?.check} />
              {props?.items?.[7]?.content?.length > 0 && (
                <Box>
                  {props?.items?.[7]?.content?.map((item: any, index: number) => (
                    <PortableText blocks={item} key={index} />
                  ))}
                </Box>
              )}
            </FullBox>
            {!values?.check && emptyCheck && (
              <FullBox>
                <ErrorMessageTypography sx={{ textAlign: "center" }}>
                  {props?.items?.[7]?.errorText ? props?.items?.[7]?.errorText : ERROR_MESSAGES?.checkboxError}
                </ErrorMessageTypography>
              </FullBox>
            )}
          </Stack>
          <Stack sx={{ alignItems: "center" }}>
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_NOTIFICATION_RECAPTCHA_SITE_KEY || ""}
              ref={captchaRef}
              onChange={handleCaptchaSubmission}
            />
            {errors?.recaptcha && <ErrorMessageTypography>{ERROR_MESSAGES?.EMPTY_RECAPTCHA}</ErrorMessageTypography>}
          </Stack>
          <ActionItemContainer>
            <RenderActionItem
              isActionButtonType={true}
              url={props?.PrimaryAction?.url}
              title={props?.PrimaryAction?.title || "SUBMIT"}
              variant={props?.PrimaryAction?.variant}
              navigationType={props?.PrimaryAction?.urlType}
              onClick={() => {
                if (
                  values?.senderFirstName?.length > 0 &&
                  values?.senderLastName?.length > 0 &&
                  values?.["Country*"]?.length > 0 &&
                  values?.senderEmail?.length > 0 &&
                  values?.salutation?.length > 0 &&
                  values?.["State*"]?.length > 0 &&
                  values?.["City*"]?.length > 0 &&
                  !errors?.senderFirstName &&
                  !errors?.senderLastName &&
                  !errors?.senderEmail &&
                  !errors?.salutation &&
                  values?.recaptcha &&
                  values?.check
                ) {
                  handleSubmit()
                  handleEnquiry(
                    props?.PrimaryAction?.title || "SUBMIT",
                    props?.PrimaryAction?.urlType,
                    props?.PrimaryAction?.url,
                  )
                } else {
                  validateFormOnClick()
                  if (emptyCheck === false) {
                    setEmptyCheck(() => true)
                  }
                }
              }}
              buttonStyles={{
                textAlign: "center",
                letterSpacing: "1.8px",
              }}
            />
          </ActionItemContainer>
        </FormFieldsContainer>
      </NewsLetterFormContainer>
    </>
  )
}

export default NewsLetterForm
