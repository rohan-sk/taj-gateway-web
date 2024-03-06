import React, { useContext, useEffect, useState } from "react"
import { CustomCheckBox } from "../../hoc/CustomCheckBox/Checkbox"
import RenderActionItem from "../../hoc/actions/action-items-ui"
import { PortableText } from "../../../lib/portable-text-serializers"
import { ModalContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
import AuthenticRegistrationStore from "../../../features/registration/store/authentic.registration.store"
import { useAppNavigation } from "../../../utils/NavigationUtility"
import SnackbarToast from "../../../utils/SnackbarToast"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { GAStore, UserStore } from "../../../store"
import { observer } from "mobx-react-lite"
import type { AuthenticationCardAction } from "../login-form.types"
import { ErrorMessageTypography } from "../Styles/tabs.styles"
import { ERROR_MESSAGES } from "../../forms/gift-card-form/constants"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { useMobileCheck } from "../../../utils/isMobilView"
import { CheckboxWrapper, ContentWrapper, StyledBox, StyledCheckBox } from "../Styles/InitialScreen.styles"
import { ageFromDOB, dateFormatConverter } from "../../../utils/getDate"
import { theme } from "../../../lib/theme"
import { triggerEvent } from "../../../utils/analytics"
import { MemberDataLayer } from "../../../utils/analytics/member-data-layer"
import { getCookie } from "../../../utils/cookie"
import { CUSTOMER_HASH, LOGIN_METHOD, isUserLoggedIn } from "../../../utils/analytics/constants"
import useStorage from "../../../utils/useStorage"
import crypto from "crypto"

const AuthenticationCardAction = ({ props }: AuthenticationCardAction) => {
  const { primaryAction, parameterMap } = props

  const [openErrorMessage, setOpenErrorMessage] = useState<boolean>(false)
  const [snackMessage, setSnackMessage] = useState<string>("")
  const [termsCheck, setTermsCheck] = useState<boolean>(false)
  const [policyCheck, setPolicyCheck] = useState<boolean>(false)
  const [select, setSelect] = useState<boolean>(false)
  const [isDisable, setIsDisable] = useState<boolean>(false)
  const [mandatoryDetails, setMandatoryDetails] = useState(false)
  const pageContext = useContext(ModalContext)
  const navigate = useAppNavigation()
  const IHCLContexts = useContext(IHCLContext)
  const isMobile = useMobileCheck()
  const errorMessgae = parameterMap?.flatMap((item: any) => item?.key === "errorTextTnc" && item?.value)?.[0]
  //store
  const userStore = IHCLContexts?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const authenticRegistrationStore = pageContext?.getPageStore(
    PAGE_STORES.registrationStore,
  ) as AuthenticRegistrationStore
  const gaStoreData = IHCLContexts?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const { getItem } = useStorage()
  const dataLayer = MemberDataLayer(userStore, gaStoreData)
  const IndianUser = userStore?.userCountryCode?.includes("+")
    ? userStore?.userCountryCode === "+91"
    : `+${userStore?.userCountryCode}` === "+91"

  const TermsCheckBoxToggle = (e: any) => {
    setTermsCheck(!termsCheck)
  }
  const setPolicyCheckBoxToggle = (e: any) => {
    setPolicyCheck(!policyCheck)
  }

  useEffect(() => {
    if (authenticRegistrationStore?.validPersonalDetails == true || authenticRegistrationStore?.validAddress == true) {
      setIsDisable(true)
    } else {
      setIsDisable(false)
    }
  }, [authenticRegistrationStore?.validAddress, authenticRegistrationStore?.validPersonalDetails])

  const handleErrors = () => {
    let parsedData = authenticRegistrationStore?.userData
    let parsedAddress = authenticRegistrationStore?.userAddress
    let userData = { ...parsedData }
    let userAddress = { ...parsedAddress }
    if (authenticRegistrationStore?.userData?.firstName?.length === 0) {
      userData = {
        ...userData,
        firstName: ERROR_MESSAGES?.empty_firstName,
      }
    } else {
      userData = {
        ...userData,
        firstName: "",
      }
    }
    if (authenticRegistrationStore?.userData?.lastName?.length === 0) {
      userData = {
        ...userData,
        lastName: ERROR_MESSAGES?.empty_lastName,
      }
    } else {
      userData = {
        ...userData,
        lastName: "",
      }
    }
    if (userStore?.userCountryCode?.length === 0) {
      userData = {
        ...userData,
        phoneNumber: ERROR_MESSAGES?.empty_phoneNumber,
      }
    } else {
      userData = {
        ...userData,
        phoneNumber: "",
      }
    }
    if (authenticRegistrationStore?.userData?.email?.length === 0) {
      userData = {
        ...userData,
        email: ERROR_MESSAGES?.empty_email,
      }
    } else {
      userData = {
        ...userData,
        email: "",
      }
    }
    if (authenticRegistrationStore?.userData?.confirmEmail?.length === 0) {
      userData = {
        ...userData,
        confirmEmail: ERROR_MESSAGES?.empty_confirmEmail,
      }
    } else {
      userData = {
        ...userData,
        confirmEmail: "",
      }
    }
    if (authenticRegistrationStore?.userData?.dateOfBirth?.length === 0) {
      userData = {
        ...userData,
        dateOfBirth: ERROR_MESSAGES?.empty_dateOfBirth,
      }
    } else {
      userData = {
        ...userData,
        dateOfBirth: "",
      }
    }
    if (authenticRegistrationStore?.userAddress?.country?.length === 0) {
      userAddress = {
        ...userAddress,
        country: ERROR_MESSAGES?.empty_country_error,
      }
    } else {
      userAddress = {
        ...userAddress,
        country: "",
      }
    }
    if (authenticRegistrationStore?.userAddress?.region?.length === 0) {
      userAddress = {
        ...userAddress,
        region: ERROR_MESSAGES?.empty_state_error,
      }
    } else {
      userAddress = {
        ...userAddress,
        region: "",
      }
    }
    if (authenticRegistrationStore?.userAddress?.city?.length === 0) {
      userAddress = {
        ...userAddress,
        city: ERROR_MESSAGES?.empty_city_error,
      }
    } else {
      userAddress = {
        ...userAddress,
        city: "",
      }
    }
    if (authenticRegistrationStore?.userAddress?.pincode?.length === 0) {
      userAddress = {
        ...userAddress,
        pincode: ERROR_MESSAGES?.empty_pincode_error,
      }
    } else {
      userAddress = {
        ...userAddress,
        pincode: "",
      }
    }
    if (authenticRegistrationStore?.userAddress?.addressLine?.length === 0) {
      userAddress = {
        ...userAddress,
        addressLine: ERROR_MESSAGES?.empty_address_error,
      }
    } else {
      userAddress = {
        ...userAddress,
        addressLine: "",
      }
    }

    authenticRegistrationStore?.userDetailsErrorHandling(
      userData?.firstName,
      userData?.lastName,
      userData?.email,
      userData?.confirmEmail,
      userData?.phoneNumber,
      userData?.dateOfBirth,
    )
    authenticRegistrationStore?.userAddressErrorHandling(
      userAddress?.country,
      userAddress?.region,
      userAddress?.city,
      userAddress?.pincode,
      userAddress?.addressLine,
    )
    if (
      authenticRegistrationStore?.userDataErrors?.firstNameError ||
      authenticRegistrationStore?.userDataErrors?.lastNameError ||
      authenticRegistrationStore?.userDataErrors?.phoneNumberError ||
      authenticRegistrationStore?.userDataErrors?.emailError ||
      authenticRegistrationStore?.userDataErrors?.confirmEmailError ||
      authenticRegistrationStore?.userDataErrors?.dateOfBirthError ||
      authenticRegistrationStore?.userAddressErrors?.addressLine1Error ||
      authenticRegistrationStore?.userAddressErrors?.cityError ||
      authenticRegistrationStore?.userAddressErrors?.countryError ||
      authenticRegistrationStore?.userAddressErrors?.pincodeError ||
      authenticRegistrationStore?.userAddressErrors?.regionError
    ) {
      isMobile &&
        userStore?.personalDetailsFormRef &&
        userStore?.personalDetailsFormRef?.current?.scrollIntoView({
          block: "start",
          inline: "nearest",
          behavior: "smooth",
        })
    }
  }

  const handleSubmit = async () => {
    const createUserApi = await authenticRegistrationStore?.createUser(
      authenticRegistrationStore?.userData?.salutation,
      authenticRegistrationStore?.userData?.firstName,
      authenticRegistrationStore?.userData?.lastName,
      authenticRegistrationStore?.userData?.phoneNumber,
      authenticRegistrationStore?.userData?.email,
      dateFormatConverter(authenticRegistrationStore?.userData?.dateOfBirth),
      authenticRegistrationStore?.userData?.gender,
      authenticRegistrationStore?.userAddress,
    )
    if (createUserApi?.data?.status === 302) {
      setOpenErrorMessage(true)
      setSnackMessage(createUserApi?.data?.response)
      handleSignUp("signup_fail", "No", "Not LoggedIn")
    } else if (createUserApi?.data?.data?.updated) {
      global?.localStorage?.removeItem("userDialCode")
      navigate(primaryAction?.url, primaryAction?.checkBox || primaryAction?.urlType)
    } else if (createUserApi?.status == 201 && createUserApi?.data?.status?.code?.includes("200")) {
      global?.localStorage?.removeItem("userDialCode")
      userStore?.setUserDetailsStore(
        createUserApi?.data?.nameDetails?.salutation,
        createUserApi?.data?.nameDetails?.firstName,
        createUserApi?.data?.nameDetails?.lastName,
        createUserApi?.data?.primaryMobile?.isdCode,
        createUserApi?.data?.primaryMobile?.phoneNumber,
        createUserApi?.data?.primaryEmailId,
        createUserApi?.data?.customerHash,
        createUserApi?.data?.dob,
        createUserApi?.data?.gender,
        createUserApi?.data?.loyaltyInfo?.[0]?.loyaltyPoints,
        createUserApi?.data?.loyaltyInfo?.[0]?.currentSlab || "copper",
      )
      global?.window?.localStorage?.setItem("userFirstName", createUserApi?.data?.nameDetails?.firstName),
        global?.window?.localStorage?.setItem("userLastName", createUserApi?.data?.nameDetails?.lastName),
        global?.window?.localStorage?.setItem("userEmail", createUserApi?.data?.primaryEmailId),
        global?.window?.localStorage?.setItem("userPhoneNumber", createUserApi?.data?.primaryMobile?.phoneNumber),
        global?.window?.localStorage?.setItem("customerHash", createUserApi?.data?.customerHash),
        global?.window?.localStorage?.setItem("userDOB", createUserApi?.data?.dob),
        global?.window?.localStorage?.setItem("neupassStartDateInfo", createUserApi?.data?.neuPassInfo?.startDate),
        global?.window?.localStorage?.setItem("userNationality", createUserApi?.data?.addresses?.[0]?.country),
        global?.window?.localStorage?.setItem("userEmailVerified", createUserApi?.data?.emailVerified),
        global?.window?.localStorage?.setItem("userGender", createUserApi?.data?.gender),
        global?.window?.localStorage?.setItem("userSalutation", createUserApi?.data?.nameDetails?.salutation),
        global?.window?.localStorage?.setItem("userCountryCode", createUserApi?.data?.primaryMobile?.isdCode),
        global?.window?.localStorage?.setItem("userTICNumber", createUserApi?.data?.tcpNumber),
        global?.window?.localStorage?.setItem(
          "userTier",
          createUserApi?.data?.loyaltyInfo?.[0]?.currentSlab || "copper",
        )
      handleSignUp("signup_success", "Yes", "LoggedIn", "new")
      navigate(primaryAction?.url, primaryAction?.urlType)
    } else {
      setOpenErrorMessage(true)
      setSnackMessage(createUserApi?.data?.status?.message || createUserApi?.data?.response || createUserApi?.message)
    }
  }
  const handleSignUp = (eventName: string, member: string, status: string, type?: string) => {
    triggerEvent({
      action: eventName,
      params: {
        ...dataLayer,
        pageTitle: "Personal Details",
        // pageReferrerTitle: "<pageReferrerTitle>",
        // pageURL: "<pageURL>",
        // pageReferrerURL: "<pageReferrerURL>",
        pageSection: "Personal Details",
        platform: isMobile ? "Mobile" : "Desktop",
        isMember: member,
        membershipType: "",
        membershipNumber: "",
        memberEmailId: authenticRegistrationStore?.userData?.email
          ? crypto
              .createHash("sha256")
              .update(authenticRegistrationStore?.userData?.email || "")
              .digest("hex")
          : "",
        memberMobileNo: authenticRegistrationStore?.userData?.phoneNumber
          ? crypto
              .createHash("sha256")
              .update(authenticRegistrationStore?.userData?.phoneNumber || "")
              .digest("hex")
          : "",
        memberName:
          `${authenticRegistrationStore?.userData?.firstName}` + ` ${authenticRegistrationStore?.userData?.lastName}`,
        memberGender: authenticRegistrationStore?.userData?.gender,
        memberDOB: dateFormatConverter(authenticRegistrationStore?.userData?.dateOfBirth),
        memberAge: dateFormatConverter(authenticRegistrationStore?.userData?.dateOfBirth)
          ? ageFromDOB(authenticRegistrationStore?.userData?.dateOfBirth)
          : "",
        memberCountry: "",
        memberState: "",
        memberCity: "",
        memberPincode: "",
        encryptedMobileNo: authenticRegistrationStore?.userData?.phoneNumber
          ? crypto
              .createHash("sha256")
              .update(authenticRegistrationStore?.userData?.phoneNumber || "")
              .digest("hex")
          : "",
        encryptedEmailID: authenticRegistrationStore?.userData?.email
          ? crypto
              .createHash("sha256")
              .update(authenticRegistrationStore?.userData?.email || "")
              .digest("hex")
          : "",
        userId:
          getItem("customerHash") || CUSTOMER_HASH
            ? getItem("customerHash")?.toString() || CUSTOMER_HASH?.toString()
            : "",
        userPhoneNumber: authenticRegistrationStore?.userData?.phoneNumber
          ? crypto
              .createHash("sha256")
              .update(authenticRegistrationStore?.userData?.phoneNumber || "")
              .digest("hex")
          : "",
        journeyType: "SignUp",
        method: getItem("loginJourneyType") || LOGIN_METHOD || "",
        userInfoHash: authenticRegistrationStore?.userData?.phoneNumber
          ? crypto
              .createHash("sha256")
              .update(authenticRegistrationStore?.userData?.phoneNumber || "")
              .digest("hex")
          : "",
        linkText: primaryAction?.title,
        linkURL: primaryAction?.url,
        outbound: primaryAction?.urlType === "internal" ? false : true,
        clientId: getCookie("_ga")?.slice(6),
        buttonLinkName: primaryAction?.title,
        widget_title: "Personal Details",
        widget_type: "Card",
        userStatus: status,
        userType: type ? type : "",
      },
    })
  }
  return (
    <>
      <SnackbarToast open={openErrorMessage} onClose={() => setOpenErrorMessage(false)} Message={snackMessage} />
      <ContentWrapper sx={{ margin: "auto" }}>
        <StyledBox>
          <CheckboxWrapper>
            <CustomCheckBox withBorder name={"terms"} onChange={TermsCheckBoxToggle} checked={termsCheck} />
          </CheckboxWrapper>
          {props.content?.[0]?.content?.[0] && <PortableText blocks={props.content?.[0]?.content?.[0]} />}
        </StyledBox>
        <StyledCheckBox>
          <CheckboxWrapper>
            <CustomCheckBox withBorder name={"privacy"} onChange={setPolicyCheckBoxToggle} checked={policyCheck} />
          </CheckboxWrapper>
          {props.content?.[1]?.content?.[0] && <PortableText blocks={props.content?.[1]?.content?.[0]} />}
        </StyledCheckBox>
        {select && (!policyCheck || !termsCheck) && (
          <ErrorMessageTypography
            sx={{
              width: isMobile ? MobilePxToVw(512) : "auto",
            }}
            variant="body-m">
            {errorMessgae}
          </ErrorMessageTypography>
        )}
        <RenderActionItem
          url={primaryAction?.url}
          title={primaryAction?.title}
          variant={primaryAction?.variant}
          navigationType={primaryAction?.urlType}
          isActionButtonType={true}
          isDisable={!isDisable}
          onClick={() => {
            if (!isDisable) {
              if (
                IndianUser
                  ? termsCheck &&
                    policyCheck &&
                    authenticRegistrationStore?.userData?.firstName?.length > 0 &&
                    authenticRegistrationStore?.userData?.lastName?.length > 0 &&
                    authenticRegistrationStore?.userData?.phoneNumber?.length > 0 &&
                    authenticRegistrationStore?.userData?.email?.length > 0 &&
                    authenticRegistrationStore?.userData?.dateOfBirth?.toString()?.length > 0 &&
                    authenticRegistrationStore?.validPersonalDetails == false
                  : termsCheck &&
                    policyCheck &&
                    authenticRegistrationStore?.userData?.firstName?.length > 0 &&
                    authenticRegistrationStore?.userData?.lastName?.length > 0 &&
                    authenticRegistrationStore?.userData?.phoneNumber?.length > 0 &&
                    authenticRegistrationStore?.userData?.email?.length > 0 &&
                    authenticRegistrationStore?.userData?.dateOfBirth?.toString().length > 0 &&
                    authenticRegistrationStore?.userAddress?.city?.length > 0 &&
                    authenticRegistrationStore?.userAddress?.pincode?.length > 0 &&
                    authenticRegistrationStore?.userAddress?.country?.length > 0 &&
                    authenticRegistrationStore?.userAddress?.region?.length > 0 &&
                    authenticRegistrationStore?.userAddress?.addressLine?.length > 0 &&
                    authenticRegistrationStore?.validPersonalDetails == false &&
                    authenticRegistrationStore?.validAddress == false
              ) {
                setMandatoryDetails(false)
                handleSubmit()
                handleSignUp("personal_details_entered", "No", "Not LoggedIn")
              } else {
                if (termsCheck && policyCheck) {
                  setSelect(false)
                } else {
                  setSelect(true)
                }
                setMandatoryDetails(true)
                handleErrors()
              }
            }
          }}
          buttonStyles={{
            width: isMobile ? "80vw" : DesktopPxToVw(151),
            margin: isMobile ? "1vw 0vw 19vw 0vw" : "2vw 0vw 6vw 0vw",
          }}
        />
      </ContentWrapper>
    </>
  )
}

export default observer(AuthenticationCardAction)
