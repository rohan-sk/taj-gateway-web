import data from "./enquire-forms-json.json"
import AddIcon from "@mui/icons-material/Add"
import { theme } from "../../../../lib/theme"
import { getCookie } from "../../../../utils/cookie"
import { triggerEvent } from "../../../../utils/analytics"
import { GLOBAL_STORES } from "../../../../utils/Constants"
import React, { useContext, useEffect, useRef, useState } from "react"
import { useMobileCheck } from "../../../../utils/isMobilView"
import { acceptOnlyNumbers, restrictNumericSymbol } from "../../book-a-stay-form/utils"
import { SearchIcon } from "../../../../utils/customIcons"
import { GAStore, HamperStore, UserStore } from "../../../../store"
import { useAppNavigation } from "../../../../utils/NavigationUtility"
import { IconsWrapper } from "./products-of-interest.styles"
import { MemberDataLayer } from "../../../../utils/analytics/member-data-layer"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import TextfieldValidator from "../../../../utils/validations/TextfieldValidator"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import { handler as khazanaEnquiryAPI } from "../../../../features/notification/api/handlers/khazana-enquiry"
import { handler as hampersEnquiryAPI } from "../../../../features/notification/api/handlers/hampers-enquiry"
import { handler as asyaProductsEnquireApi } from "../../../../features/notification/api/handlers/asya-enquire"
import { Box, Typography, Stack } from "@mui/material"
import {
  POITypography,
  ButtonWrapper,
  SingleRowWrapper,
  ProductsContainer,
  KhazanaFormWrapper,
  CommonFieldWrapper,
  FormOverFlowWrapper,
  KhazanaTitleTypography,
  ErrorMessageTypography,
  ReCaptchaStack,
  ReCaptchaErrorTypography,
  LocationContainer,
} from "./khazana-enquiry-form.styles"
import {
  ADD_MORE,
  senderEmail,
  senderMobile,
  customMessage,
  ERROR_MESSAGES,
  senderFirstName,
} from "../../gift-card-form/constants"
import { observer } from "mobx-react-lite"
import ReCAPTCHA from "react-google-recaptcha"
import captchaHandler from "../../common/utils/captchaHandler"
import { nameFieldsRestrictions } from "../../common/utils/nameFieldRestrictionsHandler"
import { FormErrorIcon } from "../../common/form-components"
import ModalStore from "../../../../store/global/modal.store"
import dynamic from "next/dynamic"
import { ENQUIRE_NOW_SUBMIT } from "../../../../utils/analytics/constants"
import { LoggedInUserDetails } from "../../common/utils/user-details"
import { InputTextField, MultilineInputText } from "../../common/styles"
const LoadingSpinner = dynamic(() => import("../../../../utils/SpinnerComponent"))
const SnackbarToast = dynamic(() => import("../../../../utils/SnackbarToast"))
const RenderActionItem = dynamic(() => import("../../../hoc/actions/action-items-ui"))
const AsyaProductEnquire = dynamic(() => import("../asya-enquire-form/asya-product-enquire"))

const CountryCodeDropdown = dynamic(() => import("../../../../utils/CountryCodeDropdown"))
const ProductsOfInterest = dynamic(() => import("./products-of-interest.component"))
const MemoizedHotelContactData = dynamic(() => import("../../../card/hotel-contact-text.component"))
type Product = {
  id: number
  signatureHamper: string
  productName: string
  quantity: string | number
  size: string
  productCode: string
  productType: string
}
type ProductOfInterest = {
  id: number
  products: boolean
  productQuantity: boolean
}
type CommonFieldsType = {
  senderFirstName: string
  senderEmail: string
  senderMobile: string
  customMessage: string
  location: string
}

type CommonFieldsErrorsType = {
  senderFirstName: boolean
  senderEmail: boolean
  senderMobile: boolean
  dob: boolean
  customMessage: boolean
  location: boolean
  reCaptcha: boolean
}
var khazanaCount = 0
const idGenerator = () => {
  khazanaCount += 1
  return khazanaCount
}
var khazanaErrorCount = 0
const errorCountGenerator = () => {
  khazanaErrorCount += 1
  return khazanaErrorCount
}

const KhazanaEnquiryForm = (props: any) => {
  //utils
  const navigate = useAppNavigation()
  const isMobile = useMobileCheck()
  const context: any = useContext(IHCLContext)

  //stores
  const modalStore = ModalStore?.getInstance()
  const hamperStore = context?.getGlobalStore(GLOBAL_STORES.hamperStore) as HamperStore
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const userStore = context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const propertyStore = context?.getGlobalStore(GLOBAL_STORES?.propertyStore)

  //refs
  const recaptchaRef = useRef<any>(null)
  const itemsCountRef = useRef<any>(null)

  //states
  const [isVerified, setIsVerified] = useState<boolean>(false)
  const [countryCode, setCountryCode] = useState<string>("+91")
  const [isValid, setIsValid] = useState<boolean>(true)
  const [openErrorMessage, setOpenErrorMessage] = useState<boolean>(false)
  const [snackMessage] = useState<string>("")
  const [loader, setLoader] = useState<boolean>(false)
  const [dynamicHamperData, setDynamicHamperData] = useState<any>([])
  const [originalHampersData, setOriginalHampersData] = useState<any>([])
  const [selectProduct, setSelectProduct] = useState<Product[]>([
    {
      id: 0,
      signatureHamper: modalStore?.propertyData?.signatureHamper || "",
      productName: modalStore?.propertyData?.hotelName || "",
      quantity: "",
      size: "",
      productCode: "122",
      productType: "",
    },
  ])
  const initialProductErrors = {
    id: 0,
    products: false,
    productQuantity: false,
    hampers: false,
    size: false,
  }
  const [productErrors, setProductErrors] = useState<ProductOfInterest[]>([initialProductErrors])

  const [values, setValues] = useState<CommonFieldsType>({
    senderFirstName: "",
    senderEmail: "",
    senderMobile: "",
    customMessage: "",
    location: "",
  })

  const [errors, setErrors] = useState<CommonFieldsErrorsType>({
    senderFirstName: false,
    senderEmail: false,
    senderMobile: false,
    dob: false,
    customMessage: false,
    location: false,
    reCaptcha: false,
  })

  //variables
  const { userPhoneNumber, userCustomerHash, userSalutation, userCountryCode, userEmail, userFullName } =
    LoggedInUserDetails
  let getBgColor = isMobile ? theme?.palette?.neuPalette?.hexTwentyNine : theme?.palette?.neuPalette?.hexOne
  const inputStyle = {
    WebkitBoxShadow: `0 0 0 1000px ${getBgColor} inset`,
  }
  const standardEmails = props?.parameterMap
    ?.filter((item: any) => item?.key === "email")
    ?.map((item: any) => item?.value)
  const standardPhones = props?.parameterMap
    ?.filter((item: any) => item?.key === "mobile")
    ?.map((item: any) => item?.value)
  const checkItemsLength = selectProduct?.length

  //functions
  const removeDuplicatesAndSort = (arr: any, keyName: string): any[] => {
    if (Array?.isArray(arr) && arr?.length > 0) {
      let unique: any = []
      arr?.forEach((element: any) => {
        if (
          element &&
          unique?.findIndex((item: any) => item?.[keyName]?.toLowerCase() === element?.[keyName]?.toLowerCase()) === -1
        ) {
          unique?.push(element)
        }
      })
      return unique
    } else {
      return []
    }
  }
  const removeDuplicates = (arr: any) => {
    return arr?.filter((item: any, index: number) => !!item && arr?.indexOf(item) === index)
  }

  const formValidation = (isFormValid: boolean, id: number) => {
    setErrors({ ...errors, [id]: !isFormValid })
  }

  const handleChangeForm = (event: any) => {
    const { name, value } = event.target
    //here as a extra data I have passed countryCode to check other than Bharat to validate mobile number
    const { status } = TextfieldValidator(name, value, { countryCode })
    if (name === "location") {
      setValues((prev: any) => ({
        ...prev,
        location: value,
      }))
      setErrors((prev: any) => ({
        ...prev,
        location: value?.length === 0,
      }))
    } else {
      setValues((prev: any) => {
        return {
          ...prev,
          [name]: event?.target?.value,
        }
      })
      formValidation(status, name)
    }
  }

  const handleSubmit = async () => {
    let hamperValidity = true
    let asyaValidity = true
    let khazanaValidity = true
    const selectedHampersProducts = selectProduct?.map(
      ({ productName, quantity, signatureHamper, productCode }: any) => {
        hamperValidity = hamperValidity === false ? false : productName?.length > 0 && String(quantity)?.length > 0
        return {
          productName,
          quantity,
          signatureHampers: modalStore?.propertyData?.hamperTitle || signatureHamper,
          productCode,
        }
      },
    )
    const selectedAsyaProducts = selectProduct?.map(
      ({ productName, quantity, productCode, size, productType }: any) => {
        asyaValidity =
          asyaValidity === false
            ? false
            : productName?.length > 0 && String(quantity)?.length > 0 && size?.length > 0 && productType?.length > 0
        return { productName, quantity, productCode, size, productType }
      },
    )
    const selectedKhazanaProducts = selectProduct?.map(({ productName, quantity, productCode }: any) => {
      khazanaValidity = khazanaValidity === false ? false : productName?.length > 0 && String(quantity)?.length > 0
      return { productName, quantity, productCode }
    })
    if (props?.hamperVariant) {
      hamperValidity ? setIsValid(true) : setIsValid(false)
    } else if (props?.isAsyaVariant) {
      asyaValidity ? setIsValid(true) : setIsValid(false)
    } else {
      khazanaValidity ? setIsValid(true) : setIsValid(false)
    }

    if (
      (props?.isHamperVariant && hamperValidity) ||
      (props?.isAsyaVariant && asyaValidity) ||
      (!props?.isHamperVariant && !props?.isAsyaVaraint && khazanaValidity)
    ) {
      setLoader(true)
      if (props?.isHamperVariant) {
        const emailIds = removeDuplicates(
          selectProduct
            ?.map((product: any) =>
              originalHampersData
                ?.filter(
                  (item: any) =>
                    !!item?.hotelName && item?.hotelName?.toLowerCase() === product?.productName?.toLowerCase(),
                )
                ?.map((item: any) => item?.email || ""),
            )
            ?.flat(),
        )
        const hampersApiResponse = await hampersEnquiryAPI?.apiCall(
          JSON.stringify({
            customerName: values?.senderFirstName,
            mobileCountryCode: countryCode,
            mobile: values?.senderMobile,
            email: values?.senderEmail,
            location: values?.location,
            enquiryContent: values?.customMessage,
            interestedProducts: selectedHampersProducts,
            acceptedTNC: false,
            businessRecipientEmail:
              emailIds?.length > 0 ? emailIds : standardEmails?.length > 0 ? standardEmails : [props?.description],
          }),
        )
        if (hampersApiResponse?.error === false) {
          setLoader(false)
          if (hampersApiResponse?.data?.cause) {
            navigate(props?.secondaryAction?.url, props?.secondaryAction?.urlType)
            // setOpenErrorMessage(true)
            // setSnackMessage(
            //   hampersApiResponse?.data?.message ||
            //     ERROR_MESSAGES?.mandatoryFields
            // )
          } else {
            navigate(props?.PrimaryAction?.url, props?.PrimaryAction?.urlType)
          }
        } else {
          navigate(props?.secondaryAction?.url, props?.secondaryAction?.urlType)
          setLoader(false)
          // setOpenErrorMessage(true)
          // setSnackMessage(ERROR_MESSAGES?.mandatoryFields)
        }
      } else if (props?.isAsyaVariant) {
        const asyaEnquireApiResponse = await asyaProductsEnquireApi?.apiCall(
          JSON.stringify({
            customerName: values?.senderFirstName,
            mobileCountryCode: countryCode,
            mobile: values?.senderMobile,
            email: values?.senderEmail,
            location: values?.location,
            enquiryContent: values?.customMessage,
            interestedProducts: selectedAsyaProducts,
            acceptedTNC: false,
          }),
        )
        if (asyaEnquireApiResponse?.error === false) {
          setLoader(false)
          if (asyaEnquireApiResponse?.data?.cause) {
            navigate(props?.secondaryAction?.url, props?.secondaryAction?.urlType)
            // setOpenErrorMessage(true)
            // setSnackMessage(
            //   asyaEnquireApiResponse?.data?.message ||
            //     ERROR_MESSAGES?.mandatoryFields
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
      } else {
        const khazanaApiResponse = await khazanaEnquiryAPI?.apiCall(
          JSON.stringify({
            customerName: values?.senderFirstName,
            mobileCountryCode: countryCode,
            mobile: values?.senderMobile,
            email: values?.senderEmail,
            location: values?.location,
            enquiryContent: values?.customMessage,
            interestedProducts: selectedKhazanaProducts,
            acceptedTNC: false,
          }),
        )
        if (khazanaApiResponse?.error === false) {
          setLoader(false)
          if (khazanaApiResponse?.data?.cause) {
            navigate(props?.secondaryAction?.url, props?.secondaryAction?.urlType)
            // setOpenErrorMessage(true)
            // setSnackMessage(
            //   khazanaApiResponse?.data?.message ||
            //     ERROR_MESSAGES?.mandatoryFields
            // )
          } else {
            navigate(props?.PrimaryAction?.url, props?.PrimaryAction?.urlType)
          }
        } else {
          navigate(props?.secondaryAction?.url, props?.secondaryAction?.urlType)
          setLoader(false)
          // setOpenErrorMessage(true)
          // setSnackMessage(ERROR_MESSAGES?.NETWORK_ERROR)
        }
      }
    }
  }

  const handleEnquiry = () => {
    triggerEvent({
      action: ENQUIRE_NOW_SUBMIT,
      params: {
        ...dataLayer,
        eventName: props?.title || "",
        link_text: props?.PrimaryAction?.title || "",
        link_url: props?.PrimaryAction?.url || "",
        buttonLinkName: props?.PrimaryAction?.title || "",
        clientId: getCookie("_ga")?.slice(6),
        outbound: props?.PrimaryAction?.urlType === "internal" ? false : true,
        preferred_location: productName,
        current_location: values?.location,
        product_type: productType,
        product_quantity: productQty,
        option_Selected: props?.PrimaryAction?.title,
        widget_title: props?.title,
        widget_type: props?._type,
        pageSection: props?.analytics?.sectionTitle?.[0],
      },
    })
  }

  //effects
  //-Hampers dropdowns mapping
  useEffect(() => {
    if (props?.isHamperVariant) {
      const fetchData = async () => {
        const hamperMappedData = modalStore?.propertyData?.hotelsData
        setOriginalHampersData(modalStore?.propertyData?.hotelsData || [])

        if (Array?.isArray(hamperMappedData)) {
          let uniqueHampers = removeDuplicatesAndSort(
            hamperMappedData?.map((hamperData: any) => ({
              signatureHamper: hamperData?.title,
            })),
            "signatureHamper",
          )
          let hotelsMapping = uniqueHampers?.map((item: any) => {
            return {
              ...item,
              hamperName: removeDuplicatesAndSort(
                hamperMappedData
                  ?.filter(
                    (hamperData: any) => hamperData?.title?.toLowerCase() === item?.signatureHamper?.toLowerCase(),
                  )
                  ?.map((item: any) => ({
                    hamper: item?.hotelName,
                  })),
                "hamper",
              ),
            }
          })
          setDynamicHamperData(() => ({
            signatureHampersList: uniqueHampers,
            hamperNamesList: [...hotelsMapping],
          }))
        }
      }
      fetchData()
    }
  }, [hamperStore?.selectedHamperInfo, modalStore?.propertyData?.hotelsData, props?.isHamperVariant])

  //-reCaptcha
  useEffect(() => {
    if (isVerified) {
      setErrors((prev: any) => ({ ...prev, reCaptcha: false }))
    }
  }, [isVerified])

  const dataLayer = MemberDataLayer(userStore, gaStoreData)

  //-user details pre population
  useEffect(() => {
    if (userCustomerHash) {
      setValues((prev: any) => {
        return {
          ...prev,
          salutation: userSalutation,
          [senderFirstName]: userFullName,
          [senderEmail]: userEmail,
          [senderMobile]: userPhoneNumber,
        }
      })
      setCountryCode(userCountryCode ? userCountryCode : "+91")
    }
  }, [userCountryCode, userCustomerHash, userEmail, userFullName, userPhoneNumber, userSalutation])

  //-cleaning up property data
  useEffect(() => {
    return () => {
      modalStore?.setPropertyData({})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (itemsCountRef?.current) {
      itemsCountRef.current.scrollTop = itemsCountRef?.current?.scrollHeight
    }
  }, [checkItemsLength])

  //other
  const productsList = data?.productList?.filter(
    (item: any) => !selectProduct?.some((cItem: any) => cItem?.productName === item?.productName),
  )
  let productQty: any = ""
  let productType: any = []
  let productTypeKhazana: any = []
  let productName: any = []
  selectProduct?.map((item: any) => {
    if (item?.quantity) {
      productQty = productQty + `${item?.quantity} `
    }
    if (item?.signatureHamper) {
      productType = `${productType}` + `${item?.signatureHamper} `
    }
    if (item?.productName) {
      productTypeKhazana = `${productTypeKhazana}` + `${item?.productName} `
    }
    if (item?.productName) {
      productName = `${productName}` + `${item?.productName} `
    }
  })
  return (
    <>
      {loader && <LoadingSpinner />}
      <FormOverFlowWrapper>
        <KhazanaFormWrapper>
          <SnackbarToast open={openErrorMessage} onClose={() => setOpenErrorMessage(false)} Message={snackMessage} />
          <KhazanaTitleTypography sx={{ fontWeight: 300 }} variant={isMobile ? "m-heading-s" : "heading-s"}>
            {props?.title}
          </KhazanaTitleTypography>
          <SingleRowWrapper $mobile={isMobile}>
            <CommonFieldWrapper $mobile={isMobile}>
              <InputTextField
                autoComplete="off"
                variant="standard"
                placeholder={props?.items?.[0]?.labelText}
                value={values.senderFirstName}
                name={senderFirstName}
                inputProps={{ style: inputStyle, maxLength: 50 }}
                helperText={errors?.senderFirstName && props?.items?.[0]?.errorText}
                onChange={(e: any) => {
                  nameFieldsRestrictions(e, handleChangeForm)
                }}
                InputProps={{
                  autoComplete: "new-password",
                  endAdornment: <>{errors?.senderFirstName && <FormErrorIcon />}</>,
                }}
              />
            </CommonFieldWrapper>
            <CommonFieldWrapper $mobile={isMobile}>
              <InputTextField
                autoComplete="off"
                variant="standard"
                placeholder={props?.items?.[1]?.labelText}
                value={values?.senderEmail}
                name={senderEmail}
                helperText={errors?.senderEmail && props?.items?.[1]?.errorText}
                onChange={(e: any) => handleChangeForm(e)}
                InputProps={{
                  autoComplete: "new-password",
                  endAdornment: <>{errors?.senderEmail && <FormErrorIcon />}</>,
                }}
                inputProps={{ maxLength: 50, style: inputStyle }}
              />
            </CommonFieldWrapper>
          </SingleRowWrapper>
          <LocationContainer>
            <Stack
              sx={{
                width: "100%",
              }}>
              <Stack flexDirection={"row"}>
                <CountryCodeDropdown
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
                    color: `${theme?.palette?.neuPalette?.hexSeventeen} !important`,
                    fontSize: isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
                  }}
                  countryCode={countryCode}
                  setCountryCode={setCountryCode}
                  dropdownStyle={{
                    // marginLeft: isMobile ? MobilePxToVw(60) : DesktopPxToVw(50),
                    margin: isMobile ? `0 0 0 ${MobilePxToVw(63)}` : `0 0 0 ${DesktopPxToVw(218)}`,
                    width: isMobile ? "75vw" : "28.5vw",
                  }}
                />
                <InputTextField
                  variant="standard"
                  autoComplete="off"
                  placeholder={props?.items?.[2]?.labelText}
                  type="tel"
                  onKeyDown={(e: any) => {
                    restrictNumericSymbol(e)
                  }}
                  sx={{
                    "& input, & label": {
                      paddingLeft: isMobile ? MobilePxToVw(14) : DesktopPxToVw(24),
                    },
                  }}
                  value={values?.senderMobile}
                  name={senderMobile}
                  onChange={(e: any) => {
                    acceptOnlyNumbers(e, handleChangeForm)
                  }}
                  InputProps={{
                    autoComplete: "new-password",
                    endAdornment: <>{errors?.senderMobile && <FormErrorIcon />}</>,
                  }}
                  inputProps={{ maxLength: 12 }}
                />
              </Stack>
              {errors?.senderMobile && (
                <Stack position={"relative"}>
                  <ErrorMessageTypography position={"absolute"}>
                    {props?.items?.[2]?.errorText ? props?.items?.[2]?.errorText : ERROR_MESSAGES?.PHONE_NUMBER}
                  </ErrorMessageTypography>
                </Stack>
              )}
            </Stack>
            <InputTextField
              variant="standard"
              sx={{ width: "100%" }}
              placeholder={props?.items?.[3]?.labelText}
              autoComplete="off"
              name="location"
              value={values?.location}
              onChange={(e: any) => {
                const { value } = e?.target
                if (value === "" || value?.match(/^[a-zA-Z ]{0,200}$/)) {
                  handleChangeForm(e)
                }
              }}
              helperText={errors?.location ? props?.items?.[3]?.errorText : ""}
              InputProps={{
                autoComplete: "new-password",
                startAdornment: (
                  <>
                    {
                      <SearchIcon
                        sx={{
                          width: isMobile ? MobilePxToVw(22) : DesktopPxToVw(22),
                          marginRight: "0.5vw",
                          marginBottom: "0.2vw",
                        }}
                      />
                    }
                  </>
                ),
                endAdornment: <>{errors?.location && <FormErrorIcon />}</>,
              }}
            />
          </LocationContainer>

          <POITypography $mobile={isMobile} variant={isMobile ? "m-body-l" : "body-l"}>
            {props?.items?.[4]?.labelText}
          </POITypography>
          <Box>
            <ProductsContainer ref={itemsCountRef} $mobile={isMobile} $length={selectProduct?.length}>
              {props?.isAsyaVariant ? (
                <>
                  {selectProduct?.map((singleProduct: any, id: number) => (
                    <AsyaProductEnquire
                      data={singleProduct}
                      selectProduct={selectProduct}
                      productErrors={productErrors}
                      setProductErrors={setProductErrors}
                      key={id}
                      index={id}
                      setSelectProduct={setSelectProduct}
                      props={
                        props?.isHamperVariant
                          ? props?.items?.[4]?.clusterItems?.[0]
                          : props?.items?.[6]?.clusterItems?.[0]
                      }
                    />
                  ))}
                </>
              ) : (
                <>
                  {selectProduct?.map((singleProduct: any, id: number) => (
                    <ProductsOfInterest
                      data={singleProduct}
                      selectProduct={selectProduct}
                      key={id}
                      index={id}
                      isStaticHamper={modalStore?.propertyData?.isStaticHamper}
                      isHamperVariant={props?.isHamperVariant}
                      productsList={productsList}
                      setSelectProduct={setSelectProduct}
                      setProductErrors={setProductErrors}
                      productErrors={productErrors}
                      hamperFormData={dynamicHamperData}
                      props={
                        props?.isHamperVariant
                          ? props?.items?.[4]?.clusterItems?.[0]
                          : props?.items?.[6]?.clusterItems?.[0]
                      }
                    />
                  ))}
                </>
              )}
            </ProductsContainer>
            {productsList?.length > 0 && (
              <IconsWrapper
                onClick={() => {
                  let temp = [...selectProduct]
                  temp.push({
                    id: idGenerator(),
                    productName: "",
                    signatureHamper: "",
                    quantity: "",
                    size: "",
                    productCode: "122",
                    productType: "",
                  })
                  setSelectProduct(temp)
                  let tempProductsErrors = [...productErrors]
                  tempProductsErrors.push({
                    ...initialProductErrors,
                    id: errorCountGenerator(),
                  })
                  setProductErrors(tempProductsErrors)
                }}>
                {props?.isHamperVariant ? (
                  <></>
                ) : (
                  <>
                    <AddIcon
                      sx={{
                        color: theme?.palette?.neuPalette?.hexTwo,
                        fontSize: "large",
                      }}
                    />
                    <Typography variant={isMobile ? "m-text-link" : "link-m"} sx={{ display: "flex" }}>
                      {ADD_MORE}
                    </Typography>
                  </>
                )}
              </IconsWrapper>
            )}
          </Box>
          <Typography
            sx={{
              paddingBottom: isMobile ? "1.563vw" : "0.833vw",
              color: theme?.palette?.neuPalette.hexSeventeen,
              fontSize: isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
            }}>
            {props?.items?.[5]?.labelText}
          </Typography>
          <Stack sx={{ width: "100%" }}>
            <MultilineInputText
              sx={{ mt: isMobile ? MobilePxToVw(30) : DesktopPxToVw(14) }}
              multiline
              variant="standard"
              name={customMessage}
              value={values.customMessage}
              onChange={(event: any) => {
                const { value } = event?.target
                if (value.match(/^[A-Za-z0-9., ]{0,400}$/)) handleChangeForm(event)
              }}
              InputProps={{
                autoComplete: "new-password",
              }}
              inputProps={{
                maxLength: 400,
              }}
            />
          </Stack>
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
          <ButtonWrapper>
            {!isValid && (
              <ErrorMessageTypography sx={{ alignSelf: "center", marginTop: "2vw" }}>
                {ERROR_MESSAGES?.productDetails}
              </ErrorMessageTypography>
            )}

            <RenderActionItem
              isActionButtonType={true}
              url={props?.PrimaryAction?.url}
              title={props?.PrimaryAction?.title}
              variant={props?.PrimaryAction?.variant}
              navigationType={props?.PrimaryAction?.urlType}
              buttonStyles={{
                textAlign: "center",
                width: isMobile ? "34.688vw" : "11.563vw",
                padding: isMobile ? "2.813vw 5.625vw" : "0.938vw 1.875vw",
                margin: isMobile ? `${MobilePxToVw(40)} 0vw ${MobilePxToVw(55)}` : "2.083vw 0vw",
              }}
              onClick={() => {
                let isProductError: boolean[] = []
                const isProductHaveError = productErrors?.map((item) => {
                  const matchedItem = selectProduct.find((product: any) => product?.id === item?.id)
                  if (
                    !matchedItem?.productName ||
                    !matchedItem?.quantity ||
                    (props?.isAsyaVariant && !matchedItem?.size)
                  ) {
                    isProductError.push(true)
                  }
                  return {
                    ...item,
                    products: !matchedItem?.productName,
                    productQuantity: !matchedItem?.quantity,
                    size: props?.isAsyaVariant ? !matchedItem?.size : false,
                    hampers: props?.isHamperVariant || props?.isAsyaVariant ? !matchedItem?.signatureHamper : false,
                  }
                })
                const productError = isProductError.includes(true)
                productError && setProductErrors(isProductHaveError)

                if (
                  values?.senderFirstName?.length > 0 &&
                  values?.senderMobile?.length > 0 &&
                  values?.senderEmail?.length > 0 &&
                  errors?.senderFirstName === false &&
                  errors?.senderEmail === false &&
                  errors?.senderMobile === false &&
                  values?.location?.length > 0 &&
                  !errors?.location &&
                  !productError &&
                  isVerified
                ) {
                  handleSubmit()
                  handleEnquiry()
                } else {
                  if (!isVerified) {
                    setErrors((prev: any) => ({
                      ...prev,
                      reCaptcha: true,
                    }))
                  }
                  if (
                    values?.senderFirstName?.length === 0 ||
                    values?.senderEmail?.length === 0 ||
                    values?.senderMobile?.length === 0 ||
                    values?.location?.length === 0
                  ) {
                    setErrors((prevErrors: any) => ({
                      ...prevErrors,
                      [senderFirstName]:
                        values?.senderFirstName?.length > 0
                          ? !TextfieldValidator(senderFirstName, values?.senderFirstName)?.status
                          : true,

                      [senderEmail]:
                        values?.senderEmail?.length > 0
                          ? !TextfieldValidator(senderEmail, values?.senderEmail)?.status
                          : true,
                      [senderMobile]:
                        values?.senderMobile?.length > 0
                          ? !TextfieldValidator(senderMobile, values?.senderMobile)?.status
                          : true,
                      location: values?.location?.length === 0,
                    }))
                  }
                }
              }}
            />
            <Box>
              {props?.singleContent && (
                <MemoizedHotelContactData
                  singleContent={props?.singleContent}
                  propertyStore={propertyStore}
                  modalData={{
                    phone: modalStore?.propertyData?.phone ? [modalStore?.propertyData?.phone] : standardPhones,
                    email: modalStore?.propertyData?.email ? [modalStore?.propertyData?.email] : standardEmails,
                  }}
                  isHotelRoute={false}
                />
              )}
            </Box>
          </ButtonWrapper>
        </KhazanaFormWrapper>
      </FormOverFlowWrapper>
    </>
  )
}

export default observer(KhazanaEnquiryForm)
