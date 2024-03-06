import { useContext, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { observer } from "mobx-react-lite"
import { theme } from "../../../lib/theme"
import { GAStore, UserStore } from "../../../store"
import { useMobileCheck } from "../../../utils/isMobilView"
import BookingsFlowStore from "../store/pageStore/booking.store"
import { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
import { Box, Stack, Select, MenuItem, Typography } from "@mui/material"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import BookingFlowGlobalStore from "../store/globalStore/booking.flow.store"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import TextfieldValidator from "../../../utils/validations/TextfieldValidator"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { PageContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import { CountryCodeDropdownBox } from "../../../components/forms/gift-card-form/styles"
import { ErrorMessageTypography } from "../../../components/hoc/SignIn.tsx/sign-in.style"
import data from "../../../components/BookingFlow/Json/primary.guest.details.json"
import {
  GSTNo,
  textArea,
  receiverEmail,
  customMessage,
  ERROR_MESSAGES,
  receiverMobile,
  receiverLastName,
  receiverFirstName,
  receiverCountry,
  memberShipNumber,
  PLACEHOLDERS,
  voucherNumber,
  voucherPin,
  EMPLOYEE_NUMBER,
  salutation,
} from "../../../components/forms/gift-card-form/constants"
import salutationData from "../../../utils/salutation-json.json"

import {
  MainBox,
  TitleBox,
  InputTextField,
  UserDetailsBox,
  AutoSizeTextArea,
  DropDownCheckBox,
  MemberShipFormControl,
  TermsAndConditionStack,
  MembershipTypeInputLabel,
  VoucherDetailsStack,
} from "../../../components/BookingFlow/styles/primary.guest.details"
import useStorage from "../../../utils/useStorage"
import { UseAddress } from "../../../utils/hooks/useAddress"
import { useLoggedIn } from "../../../utils/hooks/useLoggedIn"
import { ICONS, VoucherCugType } from "../../../components/constants"
import phoneNumberVerifier from "../../../utils/phone-number-verifier"
import { HotelDataLayer } from "../../../utils/analytics/hotel-data-layer"
import { MemberDataLayer } from "../../../utils/analytics/member-data-layer"
import { firstAlertData, secondAlertData } from "../JSON_Data/data-for-session-expiry"
import { handleViewCart } from "../../../utils/analytics/events/Ecommerce/Booking-Journey/view-cart"
import Cart from "../../../components/BookingFlow/Json/cart.summary.card.json"
import { insertUnExistenceRecord } from "../../../components/forms/book-a-stay-form/utils"

//*Components
const BasicModal = dynamic(() => import("../../../components/hoc/modal/modal"))
const EnquireDropDown = dynamic(() => import("../../../components/forms/common/form-drop-down-component"))
const BookingModalContent = dynamic(() => import("./booking-modal-content.component"))
const CountryCodeDropdown = dynamic(() => import("../../../utils/CountryCodeDropdown"))
const TimeCounter = dynamic(() => import("../../../components/placeHolder/time-counter.component"))
const CustomCheckBox = dynamic(() =>
  import("../../../components/hoc/CustomCheckBox/Checkbox").then((module) => module.CustomCheckBox),
)
const SessionExpiryAlert = dynamic(() => import("../../booking/ui/session-expiring-alert.component"))

const GuestDetailsForm = (props: any) => {
  const { title, subtitle } = props
  const router = useRouter()
  const { getItem } = useStorage()
  const isLoggedIn = useLoggedIn()
  const isMobile = useMobileCheck()
  const context: any = useContext(IHCLContext)
  const pageContext: any = useContext(PageContext)
  const PortableText = context!.PortableText

  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const userStore = context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const bookingFlowGlobalStore = context?.getGlobalStore(GLOBAL_STORES?.bookingFlowStore) as BookingFlowGlobalStore
  const bookingFlowPageStore = pageContext?.getPageStore(PAGE_STORES?.bookingFlowStore) as BookingsFlowStore

  const Email: any = global?.localStorage?.getItem("userEmail")
  const LastName: any = global?.localStorage?.getItem("userLastName")
  const FirstName: any = global?.localStorage?.getItem("userFirstName")
  const Salutation: any = global?.localStorage?.getItem("userSalutation")
  const PhoneNumber: any = global?.localStorage?.getItem("userPhoneNumber")
  const userMemberShipType: any = global?.localStorage?.getItem("userTier")
  const employeeNumber: any = global?.localStorage?.getItem("enum")
  const userMemberShipNumber =
    global?.localStorage?.getItem("chambersMemberID") ||
    global?.localStorage?.getItem("epicureMemberID") ||
    global?.localStorage?.getItem("userTICNumber")

  const { isUserCreatedOrder, setGuestFormDetails, setUserSelectedTCCheckBoxToPay, isUserSelectedTCCheckBoxToPay } =
    bookingFlowPageStore

  const {
    cartDetails,
    guestDetails,
    orderDetails,
    timeRemaining,
    emptyUserCart,
    setTimeRemaining,
    clearOrderResponse,
  } = bookingFlowGlobalStore

  const isSEB = Boolean(router?.query?.sebbalance)
  const cugOfferType = router?.query?.cugOfferType as string
  const orderID = orderDetails?.orderDetailsResponse?.orderId
  const isCUGOfferVoucherJourney = cugOfferType?.toLowerCase() === VoucherCugType?.toLowerCase()
  const currentCartDetailsLength = cartDetails?.cartDetailsResponse?.items?.[0]?.hotel?.[0]?.room?.length
  const isAllRoomsSelected = guestDetails?.data?.length === currentCartDetailsLength
  const finalSalutation = isSEB ? router?.query?.salutation : userStore?.userDetails?.salutation || Salutation || ""

  let initialErrors = {
    [GSTNo]: false,
    [receiverEmail]: false,
    [receiverMobile]: false,
    [receiverLastName]: false,
    [receiverFirstName]: false,
    [customMessage]: false,
    [textArea]: false,
    [voucherNumber]: false,
    [voucherPin]: false,
    [EMPLOYEE_NUMBER]: false,
    [salutation]: false,
  }
  let formErrorMsg = {
    [GSTNo]: "",
    [receiverEmail]: "",
    [receiverMobile]: "",
    [receiverLastName]: "",
    [receiverFirstName]: "",
    [customMessage]: "",
    [textArea]: "",
    [voucherNumber]: "",
    [voucherPin]: "",
    [salutation]: "",
    [EMPLOYEE_NUMBER]: "",
  }
  let initialValues = {
    [GSTNo]: "",
    voucherPin: "",
    voucherNumber: "",
    membershipType: "",
    specialRequest: "",
    memberShipNumber: userMemberShipNumber,
    [EMPLOYEE_NUMBER]: employeeNumber || "",
    [salutation]: isSEB ? router?.query?.salutation : userStore?.userDetails?.salutation || Salutation || "",
    [receiverEmail]: isSEB ? router?.query?.email : userStore?.userDetails?.email || Email || "",
    [receiverMobile]: isSEB ? router?.query?.mobile : userStore?.userDetails?.phone || PhoneNumber || "",
    [receiverLastName]: isSEB ? router?.query?.lname : userStore?.userDetails?.lastName || LastName || "",
    [receiverFirstName]: isSEB ? router?.query?.fname : userStore?.userDetails?.firstName || FirstName || "",
    [receiverCountry]: "",
    userCountryCode: "",
  }

  const initialDisableValues = {
    receiverFirstName: false,
    receiverLastName: false,
    receiverEmail: false,
    receiverMobile: false,
    [salutation]: false,
  }

  const memberShipType = userMemberShipType == "copper"

  const [userCode, setUserCode] = useState<string>("IN")
  const [isValid, setIsValid] = useState<boolean>(false)
  const [openForm, setOpenForm] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [formErrors, setFormErrors] = useState(initialErrors)
  const [countryCode, setCountryCode] = useState<string>("+91")
  const [ErrorMessage, setErrorMessage] = useState(formErrorMsg)
  const [formValues, setFormValues] = useState<any>(initialValues)
  const [sessionAlertData, setSessionAlertData] = useState<any>()
  const [shouldDisable, setShouldDisable] = useState<any>(initialDisableValues)
  const [visibleErrorMessage, setVisibleErrorMessage] = useState<boolean>(false)
  const [checked, setChecked] = useState<boolean>(isUserSelectedTCCheckBoxToPay)
  const userMail = userStore?.userDetails?.email || Email?.length > 4 ? Email : "" || ""

  const formValidation = (isFormValid: any, id: any) => {
    setFormErrors({ ...formErrors, [id]: !isFormValid })
  }

  const setFieldsDisable = () => {
    setShouldDisable({
      ...shouldDisable,
      salutation:
        salutationData?.salutation?.findIndex(({ title }: any) => title === finalSalutation?.replaceAll(".", "")) > -1
          ? true
          : false,
      receiverFirstName: FirstName === undefined || FirstName === null ? false : FirstName?.length > 0 ? true : false,
      receiverLastName: LastName === undefined || LastName === null ? false : LastName?.length > 0 ? true : false,
      receiverEmail: Email === undefined || Email === null ? false : Email?.length > 0 ? true : false,
      receiverMobile: PhoneNumber === undefined || PhoneNumber === null ? false : PhoneNumber?.length == 10,
    })
  }
  useEffect(() => {
    if (isLoggedIn) {
      setFormValues({
        [GSTNo]: "",
        membershipType: "",
        specialRequest: "",
        [salutation]: isSEB ? router?.query?.salutation : userStore?.userDetails?.salutation || Salutation || "",
        [receiverEmail]: isSEB ? router?.query?.email : userMail,
        [receiverMobile]: isSEB ? router?.query?.mobile : userStore?.userDetails?.phone || PhoneNumber || "",
        [receiverLastName]: isSEB ? router?.query?.lname : userStore?.userDetails?.lastName || LastName || "",
        [receiverFirstName]: isSEB ? router?.query?.fname : userStore?.userDetails?.firstName || FirstName || "",
        [receiverCountry]: countryCode,
        userCountryCode: userCode,
        [EMPLOYEE_NUMBER]: employeeNumber || "",
        isSEB: isSEB,
      })
      setFieldsDisable()
    } else {
      setFormValues({
        [GSTNo]: formValues?.[GSTNo] || "",
        membershipType: formValues?.membershipType || "",
        specialRequest: formValues?.specialRequest || "",
        [receiverEmail]: formValues?.[receiverEmail] || "",
        [receiverMobile]: formValues?.[receiverMobile] || "",
        [receiverLastName]: formValues?.[receiverLastName] || "",
        [receiverFirstName]: formValues?.[receiverFirstName] || "",
        [salutation]: formValues?.[salutation] || "",
        [receiverCountry]: countryCode,
        userCountryCode: userCode,
        [EMPLOYEE_NUMBER]: employeeNumber || "",
        isSEB: isSEB,
      })
      orderID && setFieldsDisable()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, userStore, orderID, countryCode, userCode])

  useEffect(() => {
    setGuestFormDetails({ ...formValues, [salutation]: formValues?.[salutation]?.replaceAll(".", "") })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues])
  useEffect(() => {
    if (
      formValues?.receiverFirstName?.length >= 3 &&
      formValues?.receiverLastName?.length >= 3 &&
      formValues?.receiverMobile?.length == 10 &&
      formValues?.receiverEmail?.length >= 5 &&
      formValues?.salutation?.length > 0
    ) {
      setIsValid(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    formErrors,
    isValid,
    formValues?.salutation?.length,
    formValues?.receiverEmail?.length,
    formValues?.receiverMobile?.length,
    formValues?.receiverLastName?.length,
    formValues?.receiverFirstName?.length,
    isAllRoomsSelected,
  ])

  useEffect(() => {
    if (
      formErrors?.[receiverFirstName] ||
      formErrors?.[receiverLastName] ||
      formErrors?.[receiverEmail] ||
      formErrors?.[receiverMobile] ||
      formErrors?.[EMPLOYEE_NUMBER] ||
      formErrors?.[salutation] ||
      formErrors?.[textArea] ||
      (formValues[GSTNo]?.length > 0 ? formErrors?.[GSTNo] : false)
    ) {
      bookingFlowPageStore?.updateFormErrors(true)
    } else {
      bookingFlowPageStore?.updateFormErrors(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formErrors])

  const handleSelectChange = (event: any) => {
    const { name, value } = event?.target
    setFormValues((prev: any) => ({
      ...prev,
      [name]: value,
    }))
    setFormErrors((prev: any) => ({
      ...prev,
      [name]: value?.length === 0,
    }))
    setErrorMessage((prev: any) => ({
      ...prev,
      [name]: ERROR_MESSAGES?.empty_salutation,
    }))
  }

  const handleChangeForm = (event: any) => {
    const { name, value } = event.target
    let isVerified: any
    if (name === receiverMobile) {
      isVerified = phoneNumberVerifier(userCode, event?.target?.value)
    }
    const { status, errorMsg, fieldName } = TextfieldValidator(name, value)
    setErrorMessage((prev: any) => {
      return {
        ...prev,
        [fieldName]: errorMsg,
      }
    })
    if (name == receiverMobile) {
      const result = countryCode === "+91" ? value.slice(0, 10) : value.slice(0, 16)
      const phoneNumber = isNaN(result) ? "" : result
      setFormValues((prev: any) => {
        return {
          ...prev,
          [name]: phoneNumber,
        }
      })
      formValidation(isVerified, name)
    } else if (name == voucherPin) {
      const vPin = isNaN(event?.target?.value) ? "" : event?.target?.value
      setFormValues((prev: any) => {
        return {
          ...prev,
          [name]: vPin,
        }
      })
      formValidation(isVerified, name)
    } else {
      setFormValues((prev: any) => {
        return {
          ...prev,
          [name]: event?.target?.value,
        }
      })
      formValidation(status, name)
    }
  }

  const handleVoucherNumber = (event: any) => {
    let CardNumber = event?.target?.value
    const name = event?.target?.name
    const { status, errorMsg, fieldName } = TextfieldValidator(name, CardNumber)
    setErrorMessage((prev: any) => {
      return {
        ...prev,
        [fieldName]: errorMsg,
      }
    })
    if (CardNumber > 19) {
      CardNumber = CardNumber.substr(0, 19)
    }
    const inputVal = CardNumber?.replace(/ /g, "")
    let inputNumbersOnly = inputVal?.replace(/\D/g, "")
    if (inputNumbersOnly?.length >= 16) {
      inputNumbersOnly = inputNumbersOnly.replace(/[`~!$%^@*()_|+\=?;:'"<>\{\}\[\]\\]/gi, "").substr(0, 16)
    }
    const splits = inputNumbersOnly?.match(/.{1,4}/g)
    let spacedNumber = ""
    if (splits) {
      spacedNumber = splits?.join(" ")
    }
    if (spacedNumber.slice(0, 1) !== "0") {
      setFormValues((prev: any) => {
        return {
          ...prev,
          [name]: spacedNumber?.trim(),
        }
      })
      formValidation(status, name)
    }
  }

  const handleTextForm = (event: any) => {
    const { name, value } = event.target
    setFormValues((prev: any) => {
      return {
        ...prev,
        [name]: event?.target?.value,
      }
    })
  }

  const address = UseAddress(userStore)
  const hotelDataLayer = HotelDataLayer()
  const dataLayer = MemberDataLayer(userStore, gaStoreData)
  const codes = bookingFlowGlobalStore?.userEnteredPromoCode

  useEffect(() => {
    handleViewCart(
      "view_cart",
      dataLayer,
      hotelDataLayer,
      bookingFlowGlobalStore,
      bookingFlowPageStore,
      address,
      getItem,
      isLoggedIn,
      codes,
      Cart,
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setChecked(isUserSelectedTCCheckBoxToPay)
  }, [isUserSelectedTCCheckBoxToPay])

  //? using to handle the session alert modals
  useEffect(() => {
    if (isMobile) {
      if (timeRemaining === 600) {
        setOpenModal(true)
        setSessionAlertData(firstAlertData)
      } else if (timeRemaining === 0) {
        ;(async () => {
          setSessionAlertData(secondAlertData)
          setOpenModal(true)
          await emptyUserCart()
          clearOrderResponse()
          setUserSelectedTCCheckBoxToPay(false)
        })()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRemaining, isMobile])

  const handleModalClose = () => {
    setOpenModal(false)
    if (timeRemaining === 0) {
      setTimeRemaining(-1)
    }
  }

  return (
    <>
      {orderID && isMobile && (
        <Box sx={{ textAlign: "center" }}>
          <TimeCounter count={900} render={orderID} />
        </Box>
      )}
      <MainBox aria-label={"GuestDetailsForm"}>
        <TitleBox>
          <Typography variant={isMobile ? "m-heading-s" : "heading-s"}>{title}</Typography>
        </TitleBox>
        <Typography
          component="div"
          variant={isMobile ? "m-body-s" : "body-s"}
          sx={{ mb: isMobile ? MobilePxToVw(10) : DesktopPxToVw(10) }}>
          {subtitle}
        </Typography>
        <UserDetailsBox alignItems={"start"}>
          <Box width={isMobile ? "100%" : "8vw"} mt={isMobile ? "0" : "5px"}>
            <EnquireDropDown
              name={salutation}
              disable={(isLoggedIn && shouldDisable?.[salutation]) || orderID || isSEB}
              label={data?.salutation}
              value={formValues?.[salutation]}
              onChange={handleSelectChange}
              error={formErrors?.[salutation]}
              helperText={formErrors?.[salutation] && formValues[salutation]?.length > 0 && ErrorMessage?.[salutation]}
              property={"title"}
              items={insertUnExistenceRecord(finalSalutation, true, "title", salutationData?.salutation)}
            />
          </Box>
          <InputTextField
            $width="18.3vw"
            variant="standard"
            name={receiverFirstName}
            placeholder={data?.firstName}
            value={formValues[receiverFirstName]}
            error={formErrors?.[receiverFirstName] && formValues[receiverFirstName]?.length > 0}
            disabled={(isLoggedIn && shouldDisable?.receiverFirstName) || orderID || isSEB}
            helperText={
              formErrors?.[receiverFirstName] &&
              formValues[receiverFirstName]?.length > 0 &&
              ErrorMessage[receiverFirstName]
            }
            onChange={(e: any) => handleChangeForm(e)}
            sx={{
              "& .MuiInputBase-root:before": {
                borderBottom: `1px solid ${theme?.palette?.neuPalette?.hexSeventeen}`,
              },
            }}
          />
          <InputTextField
            variant="standard"
            $width="18.3vw"
            name={receiverLastName}
            placeholder={data?.lastName}
            value={formValues[receiverLastName]}
            error={formErrors?.[receiverLastName] && formValues[receiverLastName]?.length > 0}
            disabled={(isLoggedIn && shouldDisable?.receiverLastName) || orderID || isSEB}
            helperText={
              formErrors?.[receiverLastName] &&
              formValues[receiverLastName]?.length > 0 &&
              ErrorMessage[receiverLastName]
            }
            onChange={(e) => handleChangeForm(e)}
            sx={{
              "& .MuiInputBase-root:before": {
                borderBottom: `1px solid ${theme?.palette?.neuPalette?.hexSeventeen}`,
              },
            }}
          />
        </UserDetailsBox>
        <UserDetailsBox>
          <InputTextField
            variant="standard"
            name={receiverEmail}
            placeholder={data?.Email}
            value={formValues[receiverEmail]}
            error={formErrors?.[receiverEmail] && formValues[receiverEmail]?.length > 0}
            disabled={(isLoggedIn && shouldDisable?.receiverEmail) || orderID || isSEB}
            helperText={
              formErrors?.[receiverEmail] && formValues[receiverEmail]?.length > 0 && ErrorMessage[receiverEmail]
            }
            onChange={(e) => handleChangeForm(e)}
            sx={{
              "& .MuiInputBase-root:before": {
                borderBottom: `1px solid ${theme?.palette?.neuPalette?.hexSeventeen}`,
              },
            }}
          />
          <Box width={isMobile ? "100%" : "50%"}>
            <CountryCodeDropdownBox
              sx={{
                width: isMobile ? "100%" : "23.6vw",
                "& .MuiSvgIcon-root": {
                  marginBottom: 0,
                },
              }}>
              <CountryCodeDropdown
                countryCode={countryCode}
                setCountryCode={setCountryCode}
                setUserCode={setUserCode}
                isDisable={isLoggedIn ? true : false || orderID || isSEB}
                dropdownStyle={{
                  width: isMobile ? MobilePxToVw(500) : DesktopPxToVw(450),
                  marginLeft: isMobile ? MobilePxToVw(60) : DesktopPxToVw(170), //"170px",
                }}
              />
              <InputTextField
                type="tel"
                variant="standard"
                name={receiverMobile}
                placeholder={data?.phone}
                onInput={(e: any) => {
                  e.target.value =
                    countryCode === "+91"
                      ? Math.max(0, parseInt(e.target.value))?.toString()?.slice(0, 10)
                      : Math.max(0, parseInt(e.target.value))?.toString()?.slice(0, 18)
                }}
                value={formValues?.receiverMobile}
                error={formErrors?.receiverMobile && formValues?.receiverMobile.length > 0}
                onChange={(e) => handleChangeForm(e)}
                sx={{
                  width: "20vw",
                  alignSelf: "flex-end",
                  "& .MuiInput-input": {
                    paddingLeft: "1vw",
                  },
                  "& .MuiFormHelperText-root": {
                    margin: "0",
                  },
                }}
                disabled={(isLoggedIn && shouldDisable?.receiverMobile) || orderID || isSEB}
                helperText={formErrors?.[receiverMobile]}
              />
            </CountryCodeDropdownBox>
            {formErrors?.receiverMobile && formValues?.receiverMobile.length > 0 && (
              <Typography
                variant={isMobile ? "m-body-xs" : "body-xs"}
                sx={{
                  fontWeight: 400,
                  color: theme?.palette?.neuPalette?.hexTwentySeven,
                  fontSize: isMobile ? `${MobilePxToVw(16)} !important` : DesktopPxToVw(20),
                }}>
                {ErrorMessage?.receiverMobile}
              </Typography>
            )}
          </Box>
        </UserDetailsBox>
        {isCUGOfferVoucherJourney && (
          <VoucherDetailsStack>
            <InputTextField
              variant="standard"
              name={voucherNumber}
              value={formValues?.[voucherNumber]}
              disabled={orderID}
              placeholder={PLACEHOLDERS?.VOUCHER_NUMBER}
              onChange={(e: any) => handleVoucherNumber(e)}
              error={formErrors?.voucherNumber && formValues?.[voucherNumber]?.length < 19}
              helperText={
                formErrors?.voucherNumber &&
                formValues?.[voucherNumber]?.length < 19 &&
                ERROR_MESSAGES?.VOUCHER_NUMBER_ERROR
              }
            />
            <InputTextField
              variant="standard"
              name={voucherPin}
              value={formValues?.[voucherPin]}
              disabled={orderID}
              placeholder={PLACEHOLDERS?.VOUCHER_PIN}
              onChange={(e: any) => handleChangeForm(e)}
              onInput={(e: any) => {
                e.target.value = Math?.max(0, parseInt(e?.target?.value))?.toString()?.slice(0, 6)
              }}
              error={formErrors?.voucherPin && formValues?.[voucherPin]?.length < 6}
              helperText={
                formErrors?.voucherPin && formValues?.[voucherPin]?.length < 6 && ERROR_MESSAGES?.VOUCHERS_PIN_ERROR
              }
            />
          </VoucherDetailsStack>
        )}
        {isLoggedIn && (
          <>
            <MemberShipFormControl variant="standard">
              {!formValues?.membershipType && (
                <MembershipTypeInputLabel
                  sx={{
                    color: userMemberShipType ? "rgb(0 0 0 / 38%)" : "default",
                  }}>
                  {memberShipType ? "Copper" : userMemberShipType ?? "MemberShip Type"}
                </MembershipTypeInputLabel>
              )}
              <Select
                disabled={isUserCreatedOrder || !!userMemberShipType || orderID}
                IconComponent={userMemberShipType ? () => null : KeyboardArrowDownIcon}
                onChange={(e: any) => {
                  setFormValues((prev: any) => {
                    return {
                      ...prev,
                      membershipType: e.target.value as string,
                    }
                  })
                }}
                label="membershipType"
                value={formValues?.membershipType}
                sx={{
                  lineHeight: "2vw",
                  "&.Mui-disabled": {
                    "&:before": {
                      borderBottomStyle: "solid !important",
                    },
                  },
                  "& .MuiInput-input:focus": {
                    backgroundColor: "white",
                  },
                  "& .MuiButtonBase-root.MuiCheckbox-root": {
                    display: "none",
                  },
                }}>
                {data?.list.map((Item, index) => (
                  <MenuItem key={index} value={Item?.value}>
                    <DropDownCheckBox>
                      <CustomCheckBox
                        withBorder={formValues?.membershipType === Item?.value ? true : false}
                        checked={formValues?.membershipType === Item?.value ? true : false}
                        onChange={() => {
                          setOpenForm(!openForm)
                        }}
                      />
                      <Typography variant={isMobile ? "m-body-l" : "body-ml"}>{Item?.value}</Typography>
                    </DropDownCheckBox>
                  </MenuItem>
                ))}
              </Select>
            </MemberShipFormControl>
            {
              //? we will uncomment this once we get the confirmation
              /* {(userMemberShipNumber || formValues?.memberShipNumber) && (
              <InputTextField
                variant="standard"
                name={memberShipNumber}
                value={formValues?.memberShipNumber}
                placeholder={data?.memberShipNumber}
                disabled={isLoggedIn || isUserCreatedOrder || orderID}
                sx={{
                  ml: isMobile ? MobilePxToVw(0) : DesktopPxToVw(40),
                  pt: isMobile ? MobilePxToVw(40) : DesktopPxToVw(35),
                }}
              />
            )} */
            }
          </>
        )}
        <UserDetailsBox
          sx={{
            paddingTop: isMobile ? MobilePxToVw(30) : DesktopPxToVw(30),
          }}>
          <InputTextField
            variant="standard"
            name={GSTNo}
            value={formValues[GSTNo]}
            error={formErrors?.[GSTNo] && formValues[GSTNo]?.length > 0}
            disabled={isUserCreatedOrder || orderID}
            placeholder={data?.gstNumber}
            inputProps={{ maxLength: 15 }}
            onChange={(e) => handleChangeForm(e)}
            helperText={formErrors?.[GSTNo] && formValues[GSTNo]?.length > 0 && ErrorMessage[GSTNo]}
            sx={{
              "& .MuiInputBase-root:before": {
                borderBottom: `1px solid ${theme?.palette?.neuPalette?.hexSeventeen}`,
              },
            }}
          />
          {isSEB && (
            <InputTextField
              variant="standard"
              name={EMPLOYEE_NUMBER}
              value={employeeNumber}
              error={formErrors?.[EMPLOYEE_NUMBER] && formValues[EMPLOYEE_NUMBER]?.length > 0}
              disabled={isUserCreatedOrder || orderID || isSEB}
              placeholder={data?.gstNumber}
              inputProps={{ maxLength: 15 }}
              onChange={(e) => handleChangeForm(e)}
              helperText={
                formErrors?.[EMPLOYEE_NUMBER] &&
                formValues[EMPLOYEE_NUMBER]?.length > 0 &&
                ErrorMessage[EMPLOYEE_NUMBER]
              }
              sx={{
                "& .MuiInputBase-root:before": {
                  borderBottom: `1px solid ${theme?.palette?.neuPalette?.hexSeventeen}`,
                },
              }}
            />
          )}
        </UserDetailsBox>
        <Box sx={{ paddingTop: isMobile ? "" : DesktopPxToVw(30) }}>
          <AutoSizeTextArea
            minRows={2.25}
            maxLength={500}
            name={textArea}
            placeholder={data?.request}
            disabled={isUserCreatedOrder || orderID}
            $isDisabled={isUserCreatedOrder || orderID}
            onChange={(e) => {
              handleTextForm(e)
            }}
            sx={{
              borderRadius: 0,
            }}
          />
          <Typography
            sx={{
              float: "right",
              fontSize: isMobile ? "2.5vw" : "0.9vw",
            }}>{`${formValues[textArea]?.length ?? 0}/500`}</Typography>
          {formValues[textArea]?.length > 0 && (
            <ErrorMessageTypography variant={isMobile ? "m-body-s" : "body-s"}>
              {formErrors?.[textArea] && ErrorMessage[textArea] && ERROR_MESSAGES?.SPECIAL_REQUEST}
            </ErrorMessageTypography>
          )}
        </Box>
        {visibleErrorMessage && (
          <Typography
            fontWeight={400}
            textAlign={"center"}
            color={theme?.palette?.neuPalette?.hexTwentySeven}
            mt={isMobile ? MobilePxToVw(24) : DesktopPxToVw(24)}
            fontSize={isMobile ? MobilePxToVw(16) : DesktopPxToVw(20)}>
            {subtitle}
          </Typography>
        )}
        <TermsAndConditionStack $isMobile={isMobile} $errorFieldsMessage={visibleErrorMessage}>
          {props?.singleContent?.map((content: any, index: number) => {
            const isClickable =
              (formErrors?.[salutation] && formValues?.[salutation]?.length > 0) ||
              (formErrors?.[receiverFirstName] && formValues[receiverFirstName]?.length > 0) ||
              (formErrors?.[receiverLastName] && formValues[receiverLastName]?.length > 0) ||
              (formErrors?.[receiverEmail] && formValues[receiverEmail]?.length > 0) ||
              (formErrors?.receiverMobile && formValues?.receiverMobile?.length > 0) ||
              formValues?.[salutation] === "" ||
              formValues[receiverFirstName] === "" ||
              formValues[receiverLastName] === "" ||
              formValues[receiverEmail] === "" ||
              formValues?.receiverMobile?.length < 5 ||
              (isCUGOfferVoucherJourney &&
                (!formValues?.[voucherNumber] ||
                  !formValues?.[voucherPin] ||
                  (formErrors?.voucherNumber && formValues?.[voucherNumber]?.length < 19) ||
                  (formErrors?.voucherPin && formValues?.[voucherPin]?.length < 6)))
            return (
              <Stack key={index} sx={{ flexDirection: "row" }}>
                <CustomCheckBox
                  withBorder
                  checked={checked}
                  isCheckBoxDisabled={isUserCreatedOrder && orderID}
                  onChange={() => {
                    if (!isClickable) {
                      setChecked(true)
                      setVisibleErrorMessage(false)
                      setUserSelectedTCCheckBoxToPay(true)
                    } else {
                      setVisibleErrorMessage(true)
                    }
                  }}
                  isMarginRight={isMobile ? MobilePxToVw(20) : DesktopPxToVw(20)}
                />
                <Box sx={{ alignSelf: "center" }}>
                  <PortableText blocks={content} />
                </Box>
              </Stack>
            )
          })}
        </TermsAndConditionStack>
        {openModal && (
          <BasicModal
            width={"100%"}
            height={"100%"}
            open={openModal}
            handleClose={handleModalClose}
            CloseIcon={ICONS?.CLOSE_GOLD_ICON}
            bgcolor={theme?.palette?.background?.default}
            mSiteCloseStyles={{
              padding: `${MobilePxToVw(67.5)} ${MobilePxToVw(59.45)} ${MobilePxToVw(45.63)} 0`,
            }}
            Component={
              <SessionExpiryAlert marginTop={113} data={sessionAlertData} handleModalClose={handleModalClose} />
            }
          />
        )}
      </MainBox>
    </>
  )
}

export default observer(GuestDetailsForm)
