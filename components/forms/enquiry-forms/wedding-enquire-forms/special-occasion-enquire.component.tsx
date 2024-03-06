import { UserStore } from "../../../../store"
import { theme } from "../../../../lib/theme"
import dynamic from "next/dynamic"
import { CONSTANTS } from "../../../constants"
const CustomReadMore = dynamic(() => import("../../../hoc/CustomReadMore"))
const SnackbarToast = dynamic(() => import("../../../../utils/SnackbarToast"))
import { GLOBAL_STORES } from "../../../../utils/Constants"
import { useMobileCheck } from "../../../../utils/isMobilView"
import React, { useContext, useEffect, useState } from "react"
const LoadingSpinner = dynamic(() => import("../../../../utils/SpinnerComponent"))
import { Box, InputAdornment, Typography } from "@mui/material"
const CustomSearch = dynamic(() => import("../../../hoc/Search/CustomSearch").then((module) => module.CustomSearch))
const RenderActionItem = dynamic(() => import("../../../hoc/actions/action-items-ui"))
const CustomCheckBox = dynamic(() =>
  import("../../../hoc/CustomCheckBox/Checkbox").then((module) => module.CustomCheckBox),
)
import { useAppNavigation } from "../../../../utils/NavigationUtility"
const CountryCodeDropdown = dynamic(() => import("../../../../utils/CountryCodeDropdown"))
import { MobileNumberWrapper } from "./wedding-enquire-styles"
import TextfieldValidator from "../../../../utils/validations/TextfieldValidator"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import { ErrorMessageTypography } from "../khazana-enquiry-form/khazana-enquiry-form.styles"
import { handler as specialOccasionEnquireApi } from "../../../../features/notification/api/handlers/special-occasion-enquire"
import {
  ErrorsInterface,
  valuesInterface,
  errorMessagesInterface,
  SpecialEnquireDisableFields,
  SpecialOccasionEnquireFormProps,
} from "./special-occasion-enquire-form-types"
import { Name, Email, Mobile, Error_icon, ERROR_MESSAGES } from "../../gift-card-form/constants"
import {
  FullBox,
  StyledTextField,
  OccasionContainer,
  CheckBoxContainer,
  SpecialOccasionGrid,
  PhoneNumberContainer,
  DescriptionWrapperBox,
  SpecialOccasionMainBox,
  SpecialOccasionMultilineField,
} from "./special-occasion-enquire-form-component-styles"
import ModalStore from "../../../../store/global/modal.store"
import { observer } from "mobx-react-lite"
import { InputTextField } from "../../common/styles"

const SpecialOccasionEnquireForm = ({
  items,
  title,
  description,
  PrimaryAction,
  singleContent,
  charactersLimit,
  secondaryAction,
}: SpecialOccasionEnquireFormProps) => {
  const initialValues = {
    Name: "",
    Email: "",
    Mobile: "",
    additionalEvents: "",
    describeYourEvent: "",
  }
  const initialErrorMessages = {
    Name: "",
    Email: "",
    Mobile: "",
    additionalEvents: "",
    describeYourEvent: "",
  }
  const initialErrors = {
    Name: false,
    Email: false,
    Mobile: false,
    additionalEvents: false,
    describeYourEvent: false,
  }
  const initialDisableFields: SpecialEnquireDisableFields = {
    Name: false,
    Email: false,
    Mobile: false,
    CountryCodeValue: false,
  }
  const Context = useContext(IHCLContext)
  const modalStore = ModalStore?.getInstance()
  const PortableText = Context!.PortableText
  const navigate = useAppNavigation()
  const [userData, setUserData] = useState<any>({})
  const [disable, setDisable] = useState<SpecialEnquireDisableFields>(initialDisableFields)
  const [loader, setLoader] = useState<boolean>(false)
  const [values, setValues] = useState<valuesInterface>(initialValues)
  const [preferredLocation, setPreferredLocation] = useState<string>(modalStore?.propertyData?.destination || "")
  const [currentLocation, setCurrentLocation] = useState<string>("")
  const [errors, setErrors] = useState<ErrorsInterface>(initialErrors)
  const [openErrorMessage, setOpenErrorMessage] = useState<boolean>(false)
  const [snackMessage, setSnackMessage] = useState<string>("")
  const [check, setChecked] = useState<boolean>(false)
  const isMobile = useMobileCheck()
  const [countryCode, setCountryCode] = useState<string>("+91")
  const [checkBoxError, setCheckBoxError] = useState<boolean>(false)
  const [errorMessages, setErrorMessages] = useState<errorMessagesInterface>(initialErrorMessages)

  const formValidation = (isFormValid: boolean, id: number) => {
    setErrors({ ...errors, [id]: !isFormValid })
  }
  const [more, setMore] = useState<number>(
    charactersLimit ? charactersLimit : CONSTANTS?.FORM_DESCRIPTION_CHARACTER_LIMIT,
  )
  const handleChange = (event: any) => {
    const { name, value } = event?.target
    const { status, errorMsg, fieldName } = TextfieldValidator(name, value)
    setValues((prev: any) => {
      return {
        ...prev,
        [name]: value,
      }
    })
    setErrorMessages((prev: any) => {
      return {
        ...prev,
        [name]: errorMsg,
      }
    })

    formValidation(status, name)
  }
  const checkEmptyValidation = () => {
    setErrors((prevErrors: any) => ({
      ...prevErrors,
      [Name]: values?.Name?.length === 0 ? true : !TextfieldValidator(Name, values?.Name)?.status,
      [Email]: values?.Name?.length === 0 ? true : !TextfieldValidator(Email, values?.Email)?.status,
      [Mobile]: values?.Name?.length === 0 ? true : !TextfieldValidator(Mobile, values?.Mobile)?.status,
    }))
    setErrorMessages((prevErrorMessages: any) => ({
      ...prevErrorMessages,
      [Name]: TextfieldValidator(Name, values?.Name)?.errorMsg,
      [Email]: TextfieldValidator(Email, values?.Email)?.errorMsg,
      [Mobile]: TextfieldValidator(Mobile, values?.Mobile)?.errorMsg,
    }))
  }
  const handleSubmit = async () => {
    setLoader(() => true)
    const response = await specialOccasionEnquireApi?.apiCall(
      JSON.stringify({
        customerName: values?.Name,
        email: values?.Email,
        mobile: values?.Mobile,
        mobileCountryCode: countryCode,
        yourCurrentLocation: currentLocation,
        additionalEvents: values?.additionalEvents,
        eventBrief: values?.describeYourEvent,
        preferredLocation: preferredLocation,
        acceptedTNC: check,
      }),
    )
    if (response?.error === false) {
      setLoader(() => false)
      if (response?.data?.cause) {
        navigate(secondaryAction?.url, secondaryAction?.urlType)
        // setOpenErrorMessage(true)
        // setSnackMessage(
        //   response?.data?.message || ERROR_MESSAGES?.mandatoryFields
        // )
      } else if (response?.status === 200) {
        navigate(PrimaryAction?.url, PrimaryAction?.urlType)
      } else {
        navigate(secondaryAction?.url, secondaryAction?.urlType)
      }
    } else if (response?.error === true) {
      setLoader(() => false)
      navigate(secondaryAction?.url, secondaryAction?.urlType)
      // setOpenErrorMessage(true)
      // setSnackMessage(response?.data?.message || ERROR_MESSAGES?.NETWORK_ERROR)
    } else {
      setLoader(() => false)
      navigate(secondaryAction?.url, secondaryAction?.urlType)
    }
  }

  const userStore = Context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore

  const customerHash = global?.localStorage?.getItem("customerHash")

  useEffect(() => {
    let address: any
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
  }, [customerHash, setUserData, userStore])

  useEffect(() => {
    if (customerHash || userStore?.userDetails?.userHash) {
      //setting api values
      setValues((prev: any) => {
        return {
          ...prev,
          Name: userData?.nameDetails?.firstName?.length > 0 ? userData?.nameDetails?.firstName : "",
          Email: userData?.primaryEmailId?.length > 0 ? userData?.primaryEmailId : "",
          Mobile: userData?.primaryMobile?.phoneNumber,
        }
      })
      setCountryCode(userData?.primaryMobile?.isdCode?.length > 0 ? userData?.primaryMobile?.isdCode : "+91")

      //setting disable fields
      setDisable((prev: any) => {
        return {
          ...prev,
          Name: !(
            String(userData?.nameDetails?.firstName)?.toLowerCase() === "undefined" ||
            userData?.nameDetails?.firstName?.length <= 0 ||
            userData?.nameDetails?.firstName === undefined ||
            userData?.nameDetails?.firstName === null
          ),
          Email: !(
            String(userData?.primaryEmailId)?.toLowerCase() === "undefined" ||
            userData?.primaryEmailId?.length <= 0 ||
            userData?.primaryEmailId === undefined ||
            userData?.primaryEmailId === null
          ),

          Mobile: !(
            String(userData?.primaryMobile?.phoneNumber)?.toLowerCase() === "undefined" ||
            userData?.primaryMobile?.phoneNumber?.length <= 0 ||
            userData?.primaryMobile?.phoneNumber === undefined ||
            userData?.primaryMobile?.phoneNumber === null
          ),
          CountryCodeValue: !(
            userData?.primaryMobile?.isdCode?.length <= 0 ||
            userData?.primaryMobile?.isdCode === undefined ||
            userData?.primaryMobile?.isdCode === null
          ),
        }
      })
    }
  }, [customerHash, userData, userStore?.userDetails?.userHash])

  return (
    <>
      {loader && <LoadingSpinner />}
      <SpecialOccasionMainBox $isMobile={isMobile}>
        <SnackbarToast open={openErrorMessage} onClose={() => setOpenErrorMessage(false)} Message={snackMessage} />
        <OccasionContainer $isMobile={isMobile}>
          {title && (
            <Box>
              <Typography variant={isMobile ? "m-heading-s" : "heading-s"} sx={{ fontWeight: 300 }}>
                {title}
              </Typography>
            </Box>
          )}
          {singleContent?.map((content: any, index: number) => (
            <Box key={index} mt={isMobile ? "3.125vw" : "1.198vw"}>
              <PortableText blocks={content} key={index} />
            </Box>
          ))}
          {items && (
            <FullBox sx={{ marginTop: isMobile ? "5.463vw" : "2.083vw" }}>
              <SpecialOccasionGrid $webWidths={"17.188vw 23.646vw 17.188vw"}>
                <StyledTextField
                  disabled={disable?.Name}
                  aria-disabled={disable?.Name}
                  variant="standard"
                  placeholder={items?.[0]?.labelText}
                  value={values?.Name}
                  name={Name}
                  helperText={errors?.Name && errorMessages?.Name}
                  onChange={(e: any) => {
                    handleChange(e)
                  }}
                  InputProps={{
                    endAdornment: (
                      <>
                        {errors?.Name &&
                          (values?.Name?.length === 0 || values?.Name === null || values?.Name == undefined) && (
                            <InputAdornment position="end">
                              <Box loading="lazy" component="img" src={Error_icon} alt="Expand Image" />
                            </InputAdornment>
                          )}
                      </>
                    ),
                  }}
                />
                <StyledTextField
                  variant="standard"
                  disabled={disable?.Email}
                  aria-disabled={disable?.Email}
                  placeholder={items?.[1]?.labelText}
                  value={values?.Email}
                  name={Email}
                  onChange={(e: any) => {
                    handleChange(e)
                  }}
                  InputProps={{
                    endAdornment: (
                      <>
                        {errors?.Email &&
                          (values?.Email?.length === 0 || values?.Email === null || values?.Email == undefined) && (
                            <InputAdornment position="end">
                              <Box loading="lazy" component="img" src={Error_icon} alt="Expand Image" />
                            </InputAdornment>
                          )}
                      </>
                    ),
                  }}
                  helperText={errors?.Email && errorMessages?.Email}
                />
                <PhoneNumberContainer $isMobile={isMobile}>
                  <MobileNumberWrapper $isMobile={isMobile} sx={{ width: "100%!important" }}>
                    <CountryCodeDropdown
                      isDisable={disable?.CountryCodeValue}
                      countryCode={countryCode}
                      setCountryCode={setCountryCode}
                      dropdownStyle={{
                        width: isMobile ? "75vw" : "17.35vw",
                        margin: isMobile ? "0 0 0 10vw" : "0 0 0 5.85vw",
                      }}
                      backgroundColor={
                        isMobile ? theme?.palette?.background?.paper : theme?.palette?.background?.default
                      }
                    />
                    <InputTextField
                      disabled={disable?.Mobile}
                      aria-disabled={disable?.Mobile}
                      variant="standard"
                      placeholder={items?.[2]?.labelText}
                      type="tel"
                      onInput={(e: any) => {
                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                      }}
                      value={values?.Mobile}
                      name={Mobile}
                      error={errors?.Mobile}
                      onChange={(e: any) => {
                        handleChange(e)
                      }}
                      InputProps={{
                        endAdornment: (
                          <>
                            {errors?.Mobile &&
                              (values?.Mobile?.length === 0 ||
                                values?.Mobile === null ||
                                values?.Mobile == undefined) && (
                                <InputAdornment position="end">
                                  <Box loading="lazy" component="img" src={Error_icon} alt="Expand Image" />
                                </InputAdornment>
                              )}
                          </>
                        ),
                      }}
                      inputProps={{ maxLength: 12 }}
                      sx={{ marginRight: "0vw" }}
                    />
                  </MobileNumberWrapper>
                  {errors?.Mobile && (
                    <ErrorMessageTypography sx={{ position: "relative" }}>
                      {items?.[2]?.errorText}
                    </ErrorMessageTypography>
                  )}
                </PhoneNumberContainer>
              </SpecialOccasionGrid>
              <SpecialOccasionGrid $webWidths={"17.188vw 23.646vw 17.188vw"}>
                <CustomSearch
                  value={preferredLocation}
                  setValue={setPreferredLocation}
                  placeholder={items?.[3]?.labelText}
                  maxWidth={isMobile ? "100%" : "17.188vw"}
                  floatPosition={"none"}
                  fontSizeProp={isMobile ? "3.75vw" : "1.25vw"}
                />
                <CustomSearch
                  value={currentLocation}
                  setValue={setCurrentLocation}
                  placeholder={items?.[4]?.labelText}
                  maxWidth={isMobile ? "100%" : "23.646vw"}
                  floatPosition={"none"}
                  fontSizeProp={isMobile ? "3.75vw" : "1.25vw"}
                />
                <Box>
                  <StyledTextField
                    variant="standard"
                    placeholder={items?.[5]?.labelText}
                    value={values?.additionalEvents}
                    onChange={(e: any) => {
                      handleChange(e)
                    }}
                    name={"additionalEvents"}
                    sx={{
                      width: isMobile ? "100%" : "17.188vw",
                    }}
                  />
                </Box>
              </SpecialOccasionGrid>
              <Box sx={{ textAlign: "start" }}>
                <Typography
                  sx={{
                    marginBottom: isMobile ? "2.5vw" : "1.042vw",
                  }}
                  variant={isMobile ? "m-body-l" : "body-ml"}>
                  {items?.[6]?.labelText}
                </Typography>
                <SpecialOccasionMultilineField
                  multiline
                  variant="standard"
                  onChange={(e: any) => {
                    if (String(e?.target?.value)?.match(/^[A-Za-z0-9,. ]{0,400}$/)) handleChange(e)
                  }}
                  value={values?.describeYourEvent}
                  name={"describeYourEvent"}
                  sx={{
                    width: "100%",
                  }}
                  helperText={
                    errors?.describeYourEvent && values?.describeYourEvent.length > 0 && items?.[6]?.errorText
                  }
                />
              </Box>
            </FullBox>
          )}
          {items?.[7]?.content && (
            <CheckBoxContainer $isMobile={isMobile}>
              <CustomCheckBox
                checked={check}
                onChange={() => {
                  setChecked(!check)
                }}
                isMarginRight={isMobile ? "0.781vw" : "1.042vw"}
              />
              {items?.[7]?.content?.map((content: any, index: number) => (
                <Box key={index}>
                  <PortableText blocks={content} key={index} />
                </Box>
              ))}
            </CheckBoxContainer>
          )}
          {checkBoxError && (
            <Box>
              <Typography
                sx={{
                  color: theme?.palette?.ihclPalette?.hexTwentyOne,
                }}
                variant={isMobile ? "m-body-s" : "body-s"}>
                {ERROR_MESSAGES?.checkboxError}
              </Typography>
            </Box>
          )}
          {PrimaryAction?.title && (
            <RenderActionItem
              url={PrimaryAction?.url}
              title={PrimaryAction?.title}
              navigationType={PrimaryAction?.urlType}
              variant={PrimaryAction?.variant}
              isActionButtonType={true}
              buttonStyles={{
                lineHeight: "140%",
                letterSpacing: "0.1em",
                marginTop: isMobile ? "5.469vw" : "1.563vw",
              }}
              onClick={() => {
                if (check) {
                  setCheckBoxError(false)
                  checkEmptyValidation()
                  if (
                    values?.Name?.length > 0 &&
                    values?.Email?.length > 0 &&
                    values?.Mobile?.length > 9 &&
                    !errors?.Name &&
                    !errors?.Email &&
                    !errors?.Mobile
                  ) {
                    handleSubmit()
                  }
                } else {
                  setCheckBoxError(true)
                  checkEmptyValidation()
                }
              }}
            />
          )}
        </OccasionContainer>
        {description && (
          <DescriptionWrapperBox $isMobile={isMobile}>
            <Typography variant={isMobile ? "m-body-l" : "body-ml"}>
              {description.length > more ? (
                <CustomReadMore length={more} variant={isMobile ? "m-body-l" : "body-ml"}>
                  {description}
                </CustomReadMore>
              ) : (
                description
              )}
            </Typography>
          </DescriptionWrapperBox>
        )}
      </SpecialOccasionMainBox>
    </>
  )
}

export default observer(SpecialOccasionEnquireForm)
