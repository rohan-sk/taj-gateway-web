import { Stack } from "@mui/system"
import { theme } from "../../../lib/theme"
import dynamic from "next/dynamic"
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react"
import { useMobileCheck } from "../../../utils/isMobilView"
import { useAppNavigation } from "../../../utils/NavigationUtility"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import TextfieldValidator from "../../../utils/validations/TextfieldValidator"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { handler as businessConnectApi } from "../../../features/notification/api/handlers/business-enquire"
const LoadingSpinner = dynamic(() => import("../../../utils/SpinnerComponent"))
import { City, dateOfBirth, formattedDateOfBirth } from "../../modal/constants"
import { Box, Button, Typography } from "@mui/material"
import {
  GSTNo,
  address,
  pinCode,
  senderEmail,
  senderMobile,
  ERROR_MESSAGES,
  senderLastName,
  senderFirstName,
  BusinessSMETitle,
  NameOFTheCompany,
  RegisteredAddress,
  Country,
  State,
  countryCodeValue,
} from "../gift-card-form/constants"
import {
  FullBox,
  BottomBox,
  BoxWrapper,
  MainWrapper,
  FormWrapper,
  NameFieldsContainer,
  RegisterContainer,
  AddressContainer,
} from "./business-sme-form"
import { Member, Company, MemberErrors, CompanyErrors, FieldChange } from "./types"
import { triggerEvent } from "../../../utils/analytics"
import { GAStore, UserStore } from "../../../store"
import { GLOBAL_STORES } from "../../../utils/Constants"
import { getCookie } from "../../../utils/cookie"
import { MemberDataLayer } from "../../../utils/analytics/member-data-layer"
import { PincodeServiceability } from "../../../utils/pincode-serviceability"
import { acceptOnlyNumbers } from "../book-a-stay-form/utils"
import {
  ReCaptchaErrorTypography,
  ReCaptchaStack,
} from "../enquiry-forms/khazana-enquiry-form/khazana-enquiry-form.styles"
import ReCAPTCHA from "react-google-recaptcha"
import captchaHandler from "../common/utils/captchaHandler"
import { InputTextField, LinkDisableBlockContentBox } from "../common/styles"
import { nameFieldsRestrictions } from "../common/utils/nameFieldRestrictionsHandler"
import { FormErrorIcon } from "../common/form-components"
import { ENQUIRE_NOW_SUBMIT } from "../../../utils/analytics/constants"
const RenderActionItem = dynamic(() => import("../../hoc/actions/action-items-ui"))
const SnackbarToast = dynamic(() => import("../../../utils/SnackbarToast"))
const MobileNumberField = dynamic(() => import("../common/mobile-number-field.component"))
const MemberSectionComponent = dynamic(() => import("./card-with-business-sme-member-form.component"))
import { handler as countryListService } from "../../../features/my-account/api/handler/get-country-state-city.service"
import CustomAutoCompleteComponent from "../../custom-auto-complete.component"

let randomId = 0
const idGenerator = () => {
  randomId += 1
  return randomId
}
let randomErrorId = 0
const errorIdGenerator = () => {
  randomErrorId += 1
  return randomErrorId
}

const initialCompanyValues: Company = {
  [senderFirstName]: "",
  [senderMobile]: "",
  [senderEmail]: "",
  [address]: "",
  [Country]: "India",
  [City]: "",
  [State]: "",
  [pinCode]: "",
  [GSTNo]: "",
}
const initialCompanyErrors: CompanyErrors = {
  [senderFirstName]: false,
  [senderMobile]: false,
  [senderEmail]: false,
  [address]: false,
  [Country]: false,
  [City]: false,
  [State]: false,
  [pinCode]: false,
  [GSTNo]: false,
  reCaptcha: false,
}
const member: Member = {
  id: 0,
  [senderFirstName]: "",
  [senderLastName]: "",
  [senderMobile]: "",
  [address]: "",
  [Country]: "India",
  [State]: "",
  [City]: "",
  [pinCode]: "",
  [dateOfBirth]: "",
  [senderEmail]: "",
  isIHCLLoyaltyMember: false,
  [countryCodeValue]: "+91",
  open: false,
}
const initialMemberErrors: MemberErrors = {
  [senderFirstName]: false,
  [senderLastName]: false,
  [senderMobile]: false,
  [address]: false,
  [Country]: false,
  [State]: false,
  [City]: false,
  [pinCode]: false,
  [dateOfBirth]: false,
  [senderEmail]: false,
}

const initialFieldChange: FieldChange = {
  [Country]: true,
  [State]: true,
}

const MEMBERS_LIMIT = 5
const BusinessSMEEnquiryForm = (props: any) => {
  //utils
  const navigate = useAppNavigation()
  const context = useContext(IHCLContext)
  const PortableText = context!.PortableText
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const userStore = context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore

  //refs
  const recaptchaRef = useRef<any>(null)

  //states
  const isMobile = useMobileCheck()
  const [loader, setLoader] = useState<boolean>(false)
  const [cityList, setCityList] = useState<string[]>([])
  const [stateList, setStateList] = useState<string[]>([])
  const [members, setMembers] = useState<Member[]>([member])
  const [isVerified, setIsVerified] = useState<boolean>(false)
  const [snackMessage, setSnackMessage] = useState<string>("")
  const [countryCode, setCountryCode] = useState<string>("+91")
  const [countryList, setCountryList] = useState<string[]>(["India"])
  const [openErrorMessage, setOpenErrorMessage] = useState<boolean>(false)
  const [companyDetails, setCompanyDetails] = useState<Company>(initialCompanyValues)
  const [isFieldChange, setIsFieldChange] = useState<FieldChange>(initialFieldChange)
  const [companyErrors, setCompanyErrors] = useState<CompanyErrors>(initialCompanyErrors)
  const [memberErrors, setMemberErrors] = useState<MemberErrors[]>([initialMemberErrors])

  const dataLayer = MemberDataLayer(userStore, gaStoreData)

  let getBgColor = theme?.palette?.background?.paper
  const inputStyle = {
    WebkitBoxShadow: `0 0 0 1000px ${getBgColor} inset !important`,
  }

  //setters
  const companyDetailsErrorSetter = (obj: any) => {
    setCompanyErrors((prev: any) => ({ ...prev, ...obj }))
  }
  const fieldChangeSetter = (obj: any) => {
    setIsFieldChange((prev: any) => ({ ...prev, ...obj }))
  }
  const companyDetailsSetter = (obj: any) => {
    setCompanyDetails((prev: any) => ({ ...prev, ...obj }))
  }

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
      fieldChangeSetter({ [Country]: false })
    }
  }
  const getCityList = async (newValue: any) => {
    const res: any = await countryListService?.getCities(newValue)
    setCityList([])
    if (!res?.error && res?.data) {
      setCityList(res?.data)
      fieldChangeSetter({ [State]: false })
    }
  }

  //onChange handlers
  const onCountryChange = (newValue: any) => {
    companyDetailsSetter({ [Country]: newValue, [State]: "", [City]: "" })
    fieldChangeSetter({ [Country]: true })
    setStateList([])
  }
  const onStateChange = (newValue: any) => {
    companyDetailsSetter({ [State]: newValue, [City]: "" })
    fieldChangeSetter({ [State]: true })
    setCityList([])
  }
  const onCityChange = (newValue: any) => {
    companyDetailsSetter({ [City]: newValue })
  }
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    const { status } = TextfieldValidator(name, value)
    companyDetailsSetter({ [name]: value })
    companyDetailsErrorSetter({ [name]: !status })
  }
  const handlePinCode = async (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    const isIndianAddress = companyDetails?.[Country]?.toLowerCase() === "india"
    const isEmpty = !companyDetails?.[Country]
    const { status } = TextfieldValidator(name, value)
    companyDetailsSetter({ [pinCode]: value })
    if (value?.length === 6) {
      const response = await PincodeServiceability(value)
      if (!response?.error) {
        companyDetailsSetter({
          [Country]: response?.country || "",
          [State]: response?.state || "",
          [City]: response?.city || "",
        })
        companyDetailsErrorSetter({
          [Country]: response?.country ? false : companyErrors?.[Country],
          [State]: response?.state ? false : companyErrors?.[State],
          [City]: response?.city ? false : companyErrors?.[City],
        })
        companyDetailsErrorSetter({ [pinCode]: false })
      } else {
        companyDetailsErrorSetter({ [pinCode]: isIndianAddress })
      }
    } else {
      companyDetailsErrorSetter({ [pinCode]: isIndianAddress || isEmpty ? !status : !value })
    }
  }

  //functions to check members validation
  const checkMembersValidity = () => {
    let foundInvalidity = false
    foundInvalidity = memberErrors?.reduce((inValid: boolean, singleMemberErrors: MemberErrors, index: number) => {
      const currentMember: any = { ...members?.[index] }
      if (inValid) {
        return inValid
      } else {
        const inValidMember = Object?.entries(singleMemberErrors)?.find(([key, errorState]: [string, boolean]) => {
          return errorState === true || currentMember?.[key]?.length === 0
        })
        return inValidMember ? true : false
      }
    }, false)
    return !foundInvalidity
  }
  const handleErrors = () => {
    let tempErrors: any = {
      [senderFirstName]: companyErrors?.[senderFirstName],
      [senderMobile]: companyErrors?.[senderMobile],
      [senderEmail]: companyErrors?.[senderEmail],
      [address]: companyErrors?.[address],
      [State]: companyErrors?.[State],
      [City]: companyErrors?.[City],
      [Country]: companyErrors?.[Country],
      [pinCode]: companyErrors?.[pinCode],
      [GSTNo]: companyErrors?.[GSTNo],
    }
    const tempCompanyDetails: any = { ...companyDetails }
    Object?.entries(tempErrors)?.forEach(([key, error]: any) => {
      tempErrors = {
        ...tempErrors,
        [key]: error === true ? true : tempCompanyDetails?.[key]?.length === 0,
      }
    })
    setCompanyErrors((prev: any) => ({
      ...prev,
      ...tempErrors,
      reCaptcha: !isVerified,
    }))

    const tempMembers: any = [...members]
    let tempMemberErrors: any = [...memberErrors]
    tempMemberErrors = tempMemberErrors?.map((singleMemberError: any, index: number) => {
      let tempSingleMemberError = { ...singleMemberError }
      const tempSingleMember: any = { ...tempMembers?.[index] }
      Object?.entries(tempSingleMemberError)?.forEach(([key, error]: any) => {
        tempSingleMemberError = {
          ...tempSingleMemberError,
          [key]: error === true ? true : tempSingleMember?.[key]?.length === 0,
        }
      })
      return tempSingleMemberError
    })
    setMemberErrors(() => tempMemberErrors)
  }

  const scrollRef: any = useRef()

  const handleScroll = (refs: any) => {
    if (scrollRef?.current && refs?.parentRef?.current && refs?.memberRef?.current && refs?.parentRef?.current) {
      const componentTop =
        refs?.parentRef?.current?.offsetTop +
        refs?.memberRef?.current?.getBoundingClientRect()?.top -
        refs?.parentRef?.current?.getBoundingClientRect()?.top -
        members?.reduce((sum, item) => (item?.open ? sum + 1 : sum), 1) * 40
      setTimeout(() => {
        scrollRef?.current?.scrollTo({
          top: componentTop,
          behavior: "smooth",
        })
      }, 100)
    }
  }
  const handleEnquiry = () => {
    triggerEvent({
      action: ENQUIRE_NOW_SUBMIT,
      params: {
        ...dataLayer,
        eventName: BusinessSMETitle,
        link_text: props?.PrimaryAction?.title,
        link_url: props?.PrimaryAction?.url,
        buttonLinkName: props?.PrimaryAction?.title,
        clientId: getCookie("_ga")?.slice(6),
        outbound: props?.PrimaryAction?.urlType === "internal" ? false : true,
        preferred_location: companyDetails?.City,
        preferred_location_city: companyDetails?.City,
        preferred_location_PIN: companyDetails?.pinCode,
        option_Selected: props?.PrimaryAction?.title,
        preferred_location_state: companyDetails?.[State],
        widget_title: BusinessSMETitle,
        widget_type: props?._type,
        pageSection: props?.analytics?.sectionTitle?.[0],
      },
    })
  }
  const handleSubmit = async () => {
    setLoader(true)
    const modifiedMemberData = members?.map((singleMember: Member) => {
      //mapping members data to API attributes
      return {
        firstName: singleMember?.[senderFirstName],
        lastName: singleMember?.[senderLastName],
        mobile: singleMember?.[senderMobile],
        mobileCountryCode: singleMember?.[countryCodeValue],
        address: singleMember?.[address],
        Country: singleMember?.[Country],
        state: singleMember?.[State],
        city: singleMember?.[City],
        pincode: singleMember?.[pinCode],
        dateOfBirth: singleMember?.[dateOfBirth],
        email: singleMember?.[senderEmail],
        isIHCLLoyaltyMember: singleMember?.isIHCLLoyaltyMember,
      }
    })
    const response = await businessConnectApi?.apiCall(
      //mapping company form details
      JSON.stringify({
        companyName: companyDetails?.[senderFirstName],
        telephone: companyDetails?.[senderMobile],
        registeredAddress: companyDetails?.[address],
        email: companyDetails?.[senderEmail],
        Country: companyDetails?.[Country],
        mobileCountryCode: countryCode,
        city: companyDetails?.[City],
        state: companyDetails?.[State],
        pincode: companyDetails?.[pinCode],
        gstINNo: companyDetails?.[GSTNo],
        membersList: modifiedMemberData,
      }),
    )
    if (response?.error === false) {
      setLoader(false)
      if (response?.data?.cause) {
        setOpenErrorMessage(true)
        setSnackMessage(response?.data?.message || ERROR_MESSAGES?.mandatoryFields)
      } else {
        navigate(props?.PrimaryAction?.url, props?.PrimaryAction?.urlType)
      }
    } else {
      setLoader(false)
      setOpenErrorMessage(true)
      setSnackMessage(ERROR_MESSAGES?.NETWORK_ERROR)
    }
  }

  //integrated getCountriesList
  useEffect(() => {
    getCountryList()
  }, [])

  useEffect(() => {
    if (isVerified) {
      companyDetailsSetter({ reCaptcha: false })
    }
  }, [isVerified])
  return (
    <>
      {loader && <LoadingSpinner />}
      <BoxWrapper ref={scrollRef}>
        <SnackbarToast open={openErrorMessage} onClose={() => setOpenErrorMessage(false)} Message={snackMessage} />
        <MainWrapper>
          <FormWrapper>
            <FullBox textAlign={"center"}>
              <Typography variant={isMobile ? "m-heading-s" : "heading-s"}>{props?.title}</Typography>
            </FullBox>
            <FullBox
              sx={{
                margin: isMobile ? "5.469vw 0 3.906vw 0" : "2.396vw 0 2.083vw 0",
              }}>
              <Typography variant={isMobile ? "m-body-l" : "body-l"} sx={{ fontWeight: 700 }}>
                {props?.subtitle}
              </Typography>
            </FullBox>
            {/* first row */}
            <NameFieldsContainer>
              <InputTextField
                sx={{ width: "100%" }}
                autoComplete="off"
                variant="standard"
                $WebkitBoxShadow={getBgColor}
                name={senderFirstName}
                value={companyDetails?.[senderFirstName]}
                onChange={(e: any) => {
                  nameFieldsRestrictions(e, handleChange)
                }}
                placeholder={
                  companyDetails?.[senderFirstName]
                    ? ""
                    : props?.items?.[0]?.labelText
                    ? props?.items?.[0]?.labelText
                    : NameOFTheCompany
                }
                InputProps={{
                  endAdornment: <>{companyErrors?.senderFirstName && <FormErrorIcon />}</>,
                  autoComplete: "new-password",
                }}
                helperText={
                  companyErrors?.senderFirstName
                    ? props?.items?.[0]?.errorText
                      ? props?.items?.[0]?.errorText
                      : ERROR_MESSAGES?.EMPTY_NAME_ERROR
                    : ""
                }
              />
              <InputTextField
                name={senderEmail}
                autoComplete="off"
                $WebkitBoxShadow={getBgColor}
                placeholder={
                  companyDetails?.[senderEmail]
                    ? ""
                    : props?.items?.[1]?.labelText
                    ? props?.items?.[1]?.labelText
                    : NameOFTheCompany
                }
                helperText={
                  companyErrors?.[senderEmail]
                    ? props?.items?.[1]?.errorText
                      ? props?.items?.[1]?.errorText
                      : ERROR_MESSAGES?.empty_email
                    : ""
                }
                InputProps={{
                  endAdornment: <>{companyErrors?.[senderEmail] && <FormErrorIcon />}</>,
                  style: inputStyle,
                  autoComplete: "new-password",
                }}
                value={companyDetails?.[senderEmail]}
                variant="standard"
                sx={{ width: "100%" }}
                onChange={handleChange}
              />
              <MobileNumberField
                name={senderMobile}
                countryCode={countryCode}
                formState={companyDetails}
                setCountryCode={setCountryCode}
                setFormState={setCompanyDetails}
                setErrorState={setCompanyErrors}
                value={companyDetails?.[senderMobile]}
                helperText={props?.items?.[2]?.errorText}
                errorState={companyErrors?.[senderMobile]}
                placeholder={props?.items?.[2]?.labelText}
                dropDownStyle={{
                  width: isMobile ? "75vw" : "19.5vw",
                  margin: isMobile ? "0 0 0 10vw" : "0 0 0 7vw",
                }}
              />
            </NameFieldsContainer>
            <RegisterContainer>
              <InputTextField
                autoComplete="off"
                $WebkitBoxShadow={getBgColor}
                sx={{ width: "100%" }}
                placeholder={
                  companyDetails?.[address]
                    ? ""
                    : props?.items?.[3]?.labelText
                    ? props?.items?.[3]?.labelText
                    : RegisteredAddress
                }
                variant="standard"
                value={companyDetails?.[address]}
                name={address}
                helperText={
                  companyErrors?.[address]
                    ? props?.items?.[3]?.errorText
                      ? props?.items?.[3]?.errorText
                      : ERROR_MESSAGES?.empty_address_error
                    : ""
                }
                InputProps={{
                  endAdornment: <>{companyErrors?.[address] && <FormErrorIcon />}</>,
                  style: inputStyle,
                  autoComplete: "new-password",
                }}
                onChange={handleChange}
              />
              <CustomAutoCompleteComponent
                showErrorIcon={companyErrors?.[Country]}
                value={companyDetails?.[Country]}
                onChange={(event: any, newValue: any, job: string) => {
                  if (newValue) {
                    onCountryChange(newValue)
                    companyDetailsErrorSetter({ [Country]: false })
                  } else if (job?.toLowerCase() === "clear") {
                    setStateList([])
                    companyDetailsSetter({
                      [Country]: "",
                      [State]: "",
                      [City]: "",
                    })
                  } else {
                    companyDetailsSetter({
                      [Country]: "",
                    })
                  }
                  companyDetailsSetter({
                    [pinCode]: "",
                  })
                }}
                options={countryList}
                noOptionsText={"Please wait fetching country list..."}
                renderInput={(params: any) => (
                  <InputTextField
                    {...params}
                    name={Country}
                    variant="standard"
                    $WebkitBoxShadow={getBgColor}
                    helperText={companyErrors?.[Country] && props?.items?.[4]?.errorText}
                    placeholder={props?.items?.[4]?.labelText}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password",
                    }}
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
            </RegisterContainer>
            <AddressContainer>
              <InputTextField
                autoComplete="off"
                type="tel"
                variant="standard"
                $WebkitBoxShadow={getBgColor}
                inputProps={{ maxLength: 6 }}
                placeholder={props?.items?.[5]?.labelText}
                name={pinCode}
                value={companyDetails?.[pinCode]}
                InputProps={{
                  endAdornment: <>{companyErrors?.[pinCode] && <FormErrorIcon />}</>,
                  autoComplete: "new-password",
                }}
                helperText={
                  companyErrors?.[pinCode]
                    ? props?.items?.[5]?.errorText
                      ? props?.items?.[5]?.errorText
                      : ERROR_MESSAGES?.empty_pincode_error
                    : ""
                }
                onChange={(e: any) => {
                  acceptOnlyNumbers(e, handlePinCode)
                }}
              />
              <CustomAutoCompleteComponent
                options={cityList}
                onOpen={() => {
                  isFieldChange?.[State] && !!companyDetails?.[State] && getCityList(companyDetails?.[State])
                }}
                showErrorIcon={companyErrors?.[City]}
                onChange={(event: any, newValue: any, job: string) => {
                  if (newValue) {
                    onCityChange(newValue)
                    companyDetailsErrorSetter({
                      [City]: false,
                    })
                  } else if (job?.toLowerCase() === "clear") {
                    companyDetailsSetter({ [City]: "" })
                  } else {
                    companyDetailsSetter({ [City]: "" })
                  }
                  companyDetailsSetter({
                    [pinCode]: "",
                  })
                }}
                value={companyDetails?.[City]}
                noOptionsText={
                  companyDetails?.[State]?.length > 0
                    ? isFieldChange?.[State]
                      ? "Please wait fetching city list..."
                      : ""
                    : "Please select a state"
                }
                renderInput={(params: any) => (
                  <InputTextField
                    {...params}
                    name={State}
                    variant="standard"
                    placeholder={props?.items?.[6]?.labelText}
                    helperText={companyErrors?.[City] && props?.items?.[6]?.errorText}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password",
                    }}
                  />
                )}
                getOptionLabel={(option: any) => option}
                sx={{
                  width: "100%",
                  ".MuiInput-input ": {
                    padding: "0vw !important",
                  },
                }}
              />
              <CustomAutoCompleteComponent
                value={companyDetails?.[State]}
                onChange={(event: any, newValue: any, job: string) => {
                  if (newValue) {
                    onStateChange(newValue)
                    companyDetailsErrorSetter({ [State]: false })
                  } else if (job?.toLowerCase() === "clear") {
                    setCityList([])
                    companyDetailsSetter({
                      [State]: "",
                      [City]: "",
                    })
                  } else {
                    companyDetailsSetter({
                      [State]: "",
                    })
                  }
                  companyDetailsSetter({
                    [pinCode]: "",
                  })
                }}
                onOpen={() => {
                  isFieldChange?.[Country] && !!companyDetails?.[Country] && getStateList(companyDetails?.[Country])
                }}
                options={stateList}
                noOptionsText={
                  companyDetails?.[Country]?.length > 0
                    ? isFieldChange?.[Country]
                      ? "Please wait fetching state list..."
                      : "Please select the country first"
                    : "Please select a country"
                }
                getOptionLabel={(option: any) => option}
                showErrorIcon={companyErrors?.[State]}
                renderInput={(params: any) => (
                  <InputTextField
                    {...params}
                    variant="standard"
                    $WebkitBoxShadow={getBgColor}
                    placeholder={props?.items?.[7]?.labelText}
                    helperText={companyErrors?.[State] && props?.items?.[7]?.errorText}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password",
                    }}
                  />
                )}
                sx={{
                  width: "100%",
                  ".MuiInput-input ": {
                    padding: "0vw !important",
                  },
                }}
              />
              <InputTextField
                autoComplete="off"
                inputProps={{
                  maxLength: 16,
                }}
                placeholder={props?.items?.[8]?.labelText}
                $WebkitBoxShadow={getBgColor}
                name={GSTNo}
                helperText={companyErrors?.gstNo && props?.items?.[8]?.errorText}
                InputProps={{
                  endAdornment: <>{companyErrors?.[GSTNo] && <FormErrorIcon />}</>,
                }}
                value={companyDetails?.[GSTNo]}
                onChange={handleChange}
                variant="standard"
                sx={{ width: "100%" }}
              />
            </AddressContainer>
            <FullBox
              sx={{
                marginTop: isMobile ? (companyErrors?.[pinCode] ? MobilePxToVw(60) : MobilePxToVw(40)) : "2.865vw",
                marginBottom: isMobile ? MobilePxToVw(15) : DesktopPxToVw(16),
              }}>
              <Typography variant={isMobile ? "m-body-l" : "body-l"} sx={{ fontWeight: 700 }}>
                {props?.items?.[9]?.labelText}
              </Typography>
            </FullBox>
            <MemberSectionComponent
              handleScroll={handleScroll}
              memberData={props?.items?.[9]?.clusterItems?.[0]?.items?.[0]?.items}
              members={members}
              countryList={countryList}
              setMembers={setMembers}
              memberErrors={memberErrors}
              setMemberErrors={setMemberErrors}
              isNotInitialClick={false}
              scrollRef={scrollRef}
            />
            {members?.length < MEMBERS_LIMIT && (
              <Button
                sx={{
                  padding: "0vw",
                  float: "right",
                  margin: isMobile ? `${MobilePxToVw(15)} 0vw 0vw` : `${DesktopPxToVw(16)} 0vw 0vw`,
                  height: "fit-content",
                }}
                variant="text"
                onClick={() => {
                  setMembers((prevMembers: Member[]) => [
                    ...prevMembers,
                    {
                      id: idGenerator(),
                      [countryCodeValue]: "+91",
                      [senderFirstName]: "",
                      [senderLastName]: "",
                      [senderMobile]: "",
                      [address]: "",
                      [Country]: "India",
                      [State]: "",
                      [City]: "",
                      [pinCode]: "",
                      [dateOfBirth]: "",
                      [formattedDateOfBirth]: "",
                      [senderEmail]: "",
                      isIHCLLoyaltyMember: true,
                      open: false,
                    },
                  ])
                  setMemberErrors((prevMemberErrors: MemberErrors[]) => [
                    ...prevMemberErrors,
                    {
                      id: errorIdGenerator(),
                      [senderFirstName]: false,
                      [senderLastName]: false,
                      [senderMobile]: false,
                      [address]: false,
                      [Country]: false,
                      [State]: false,
                      [City]: false,
                      [pinCode]: false,
                      [dateOfBirth]: false,
                      [formattedDateOfBirth]: false,
                      [senderEmail]: false,
                    },
                  ])
                }}>
                <Typography
                  variant={isMobile ? "m-body-s" : "link-m"}
                  sx={{
                    textDecoration: "none",
                    color: theme?.palette?.ihclPalette?.hexTwo,
                  }}>
                  +
                </Typography>
                <Typography
                  sx={{
                    color: theme?.palette?.ihclPalette?.hexTwo,
                  }}
                  variant={isMobile ? "m-body-s" : "link-m"}>
                  ADD MEMBER
                </Typography>
              </Button>
            )}
          </FormWrapper>
          <ReCaptchaStack>
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_NOTIFICATION_RECAPTCHA_SITE_KEY || ""}
              ref={recaptchaRef}
              onChange={(token: string | null) => {
                captchaHandler(token, setIsVerified)
              }}
            />
            {companyErrors?.reCaptcha && (
              <ReCaptchaErrorTypography>{ERROR_MESSAGES?.EMPTY_RECAPTCHA}</ReCaptchaErrorTypography>
            )}
          </ReCaptchaStack>
          <Stack width={"100%"} alignItems={"center"} mt={isMobile ? MobilePxToVw(35) : DesktopPxToVw(20)}>
            <RenderActionItem
              url={props?.PrimaryAction?.url}
              isActionButtonType={true}
              onClick={() => {
                if (
                  companyDetails?.[senderFirstName]?.length > 0 &&
                  companyDetails?.[senderEmail]?.length > 0 &&
                  companyDetails?.[senderMobile]?.length > 0 &&
                  companyDetails?.[Country]?.length > 0 &&
                  companyDetails?.[State]?.length > 0 &&
                  companyDetails?.[City]?.length > 0 &&
                  companyDetails?.[pinCode]?.length > 0 &&
                  companyDetails?.[GSTNo]?.length > 0 &&
                  isVerified &&
                  checkMembersValidity()
                ) {
                  handleEnquiry()
                  handleSubmit()
                } else {
                  handleErrors()
                }
              }}
              title={props?.PrimaryAction?.title ? props?.PrimaryAction?.title : "ENQUIRE"}
              variant={props?.PrimaryAction?.variant ? props?.PrimaryAction?.variant : "light-contained"}
              navigationType={props?.PrimaryAction?.urlType}
              buttonStyles={{
                letterSpacing: "0.1em",
              }}
            />
          </Stack>
        </MainWrapper>
        <BottomBox>
          <Box>
            {props?.content?.map((content: any, index: number) => {
              return (
                <LinkDisableBlockContentBox
                  isDisable={!isMobile && content?.content?.[0]?.markDefs?.[0]?.linkType === "mobile"}
                  component={"span"}
                  key={index}
                  textAlign={"center"}>
                  <PortableText blocks={content?.content} key={index} />
                </LinkDisableBlockContentBox>
              )
            })}
          </Box>
        </BottomBox>
      </BoxWrapper>
    </>
  )
}
export default BusinessSMEEnquiryForm
