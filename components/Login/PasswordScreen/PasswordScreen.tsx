import { Box, Grid, InputAdornment, Typography } from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import { LOGIN_CONSTANTS } from "../../constants"
import { CustomCheckBox } from "../../hoc/CustomCheckBox/Checkbox"
import { urlFor } from "../../../lib-sanity"
import { PlaceholderUtil } from "../../../utils/placeholder-switch-cases"
import RenderActionItem from "../../hoc/actions/action-items-ui"
import { useMobileCheck } from "../../../utils/isMobilView"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { ERROR_MESSAGES } from "../../forms/gift-card-form/constants"
import { PasswordScreenInterface } from "../login-form.types"
import { ModalContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
import AuthenticLoginStore from "../../../features/login/store/authentication.login.store"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { GAStore, UserStore } from "../../../store"
import { useAppNavigation } from "../../../utils/NavigationUtility"
import SnackbarToast from "../../../utils/SnackbarToast"
import {
  BoxWrapper,
  CheckboxWrapper,
  GridContainer,
  StyledTypography,
  SubTitleTypography,
  TitleTypography,
  StyledTextField,
  ButtonsWrapper,
} from "../Styles/Password.styles"
import ModalStore from "../../../store/global/modal.store"
import { getRecaptchaToken } from "../../../utils/recaptcha"
import {
  AFFILIATION,
  CHAMBERS_ID,
  CHAMBERS_TIER,
  EPICURE_ID,
  EPICURE_TIER,
  POWERED_BY_WIDGET,
  TAJ_HOTELS,
  USER_PHONE_NUMBER,
  USER_TIRE,
} from "../../../utils/analytics/constants"
import { ageFromDOB } from "../../../utils/getDate"
import { triggerEvent } from "../../../utils/analytics"
import { getCookie } from "../../../utils/cookie"
import useStorage from "../../../utils/useStorage"
import { useLoggedIn } from "../../../utils/hooks/useLoggedIn"
import { PAGELANG } from "../../../features/booking/constants"
import userStore from "../../../store/global/user.store"
import GetDefaultValue from "../../../utils/validations/getDefaultValue"
import { generateCodeVerifier } from "../../../utils/sso/generate-code-verifier"
import { generateCodeChallenge } from "../../../utils/sso/generate-code-challenge"
import crypto from "crypto"
const PasswordScreen = ({
  title,
  subTitle,
  imageAsset,
  primaryAction,
  parameterMap,
  ctaLabel,
  url,
  urlType,
  secondaryAction,
}: PasswordScreenInterface) => {
  const [value, setValue] = useState<string>("")
  const [passwordType, setPasswordType] = useState<string>("password")
  const [errorMessage, setErrorMessage] = useState<string | undefined>()
  const [visible, setVisible] = useState<boolean>(true)
  const [checkBoxValue, setCheckBoxValue] = useState<boolean>(false)
  const [openErrorMessage, setOpenErrorMessage] = useState<boolean>(false)
  const [snackMessage, setSnackMessage] = useState<string>("")
  const [placeholder, setPlaceholder] = useState<{
    label: string
    checkbox: string
  }>({ label: "", checkbox: "" })
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const modalContext = useContext(ModalContext)
  const modalStore = ModalStore.getInstance()
  const UserType = global?.window?.localStorage?.getItem("userType")
  const LoginMethod = global?.window?.localStorage?.getItem("loginJourneyType")

  const [userType, setUserType] = useState(UserType)
  const isLoggedIn = useLoggedIn()
  const isButtonDisable = value?.length > 0
  const { getItem } = useStorage()
  const UserEmail = global?.localStorage?.getItem("userEmail")
  const PhoneNumber = global?.localStorage?.getItem("userPhoneNumber")
  const IHCLContexts = useContext(IHCLContext)
  const authenticLoginStore = modalContext?.getPageStore(PAGE_STORES.loginStore) as AuthenticLoginStore
  const userStore = IHCLContexts?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const Context = useContext(IHCLContext)
  const pageStoreData = Context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const { setUserDetailsStore, userEnteredMembershipID, fetchCustomerMemberships } = IHCLContexts?.getGlobalStore(
    GLOBAL_STORES.userStore,
  ) as UserStore

  const handleChangeForm = (event: any) => {
    // setValue(event?.target?.value.replace(/[`~!%^,.()_|+\=?;:'"<>\{\}\[\]\\\/]/gi, "")) //? commented this regext text to fix IMC-577 since its not required
    setValue(event?.target?.value)
  }

  //placeholder switch case
  useEffect(() => {
    PlaceholderUtil(parameterMap, setPlaceholder)
  }, [parameterMap])

  const handlePhoneKeyRestrictions = (event: any) => {
    let keyCharCode = event.keyCode
    if (event?.key === "Enter") {
      handlePasswordVerification()
    }
    if ((keyCharCode >= 48 && keyCharCode <= 57) || keyCharCode == 8) {
      return true
    } else {
      return false
    }
  }

  const handlePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text")
    } else {
      setPasswordType("password")
    }
    setVisible(!visible)
  }

  const captureCheckBoxValues = () => {
    setCheckBoxValue(!checkBoxValue)
  }
  const handleOtpSubmitted = (response: any) => {
    triggerEvent({
      action: "user_verification",
      params: {
        pageReferrer: global?.window?.localStorage?.getItem("previousPageURL") ?? "",
        pageURL: global?.window?.location?.href,
        device: isMobile ? "Mobile" : "Desktop",
        clientId: getCookie("_ga")?.slice(6),
        widget_powered_by: POWERED_BY_WIDGET,
        login_method: getItem("loginJourneyType") || LoginMethod,
        encryptedEmailID:
          response?.data?.primaryEmailId || UserEmail
            ? crypto
                .createHash("sha256")
                .update(response?.data?.primaryEmailId || UserEmail || "")
                .digest("hex")
            : "",
        encryptedMobileNo: response?.data?.primaryMobile?.phoneNumber
          ? crypto
              .createHash("sha256")
              .update(response?.data?.primaryMobile?.phoneNumber || "")
              .digest("hex")
          : "",
        buttonLinkName: secondaryAction?.title,
        link_text: secondaryAction?.title,
        link_url: secondaryAction?.url,
        outbound: secondaryAction?.urlType == "internal" ? false : true,
        membershipType: `${
          getItem("epicureMemberTier") || EPICURE_TIER || getItem("chambersMemberTier") || CHAMBERS_TIER || "Neupass"
        } - ${getItem("userTier") || USER_TIRE}`,
        membershipNumber:
          getItem("chambersMemberID") ||
          CHAMBERS_ID ||
          getItem("epicureMemberID") ||
          EPICURE_ID ||
          getItem("userPhoneNumber") ||
          USER_PHONE_NUMBER ||
          "",
        memberEmailId:
          response?.data?.primaryEmailId || UserEmail
            ? crypto
                .createHash("sha256")
                .update(response?.data?.primaryEmailId || UserEmail || "")
                .digest("hex")
            : "",
        memberMobileNo: response?.data?.primaryMobile?.phoneNumber
          ? crypto
              .createHash("sha256")
              .update(response?.data?.primaryMobile?.phoneNumber || "")
              .digest("hex")
          : "",
        memberName:
          `${response?.data?.nameDetails?.firstName || ""}` + `${response?.data?.nameDetails?.lastName || ""}`,
        memberGender: response?.data?.gender ? response?.data?.gender : "",
        memberDOB: response?.data?.dob ? response?.data?.dob : "",
        memberAge: response?.data?.dob ? ageFromDOB(response?.data?.dob) : "",
        memberCountry: response?.data?.addresses?.[0]?.country ? response?.data?.addresses?.[0]?.country : "",
        memberState: response?.data?.addresses?.[0]?.state ? response?.data?.addresses?.[0]?.state : "",
        memberCity: response?.data?.addresses?.[0]?.cityTown ? response?.data?.addresses?.[0]?.cityTown : "",
        memberPincode: response?.data?.addresses?.[0]?.pinCode ? response?.data?.addresses?.[0]?.pinCode : "",
        ponitsToBeRedeemed: response?.data?.loyaltyInfo?.[0]?.loyaltyPoints
          ? response?.data?.loyaltyInfo?.[0]?.loyaltyPoints
          : "",
        existingCustomer: response?.data?.existingCustomer ? "Yes" : "No",
        isMember: response?.data?.loyalCustomer ? "Yes" : "No",
        userStatus: "Not LoggedIn",
        // widget_type: items?._type,
        widget_title: title,
        widget_description: subTitle,
        widget_position: "",
        journey_type: "LogIn",
        redemptionType: "",
        redemptionName: "",
        redemptionDescription: "",
        pointsType: "",
        brandName: AFFILIATION,
        userId: response?.data?.customerHash ? response?.data?.customerHash : "",
        userType: userType || UserType,
        eventType: "",
        eventName: "",
        eventPlace: "",
        eventTicketsQty: "",
        eventDate: "",
        specialCode: "",
        pageTitle: pageStoreData?.pageData?.pageTitle || "",
        pageHierarchy: JSON.parse(
          `["${TAJ_HOTELS}",` + `"${PAGELANG}",` + `"${AFFILIATION}",` + `"${pageStoreData?.pageData?.pageTitle}"]`,
        ),
        pageLanguage: PAGELANG,
        pageReferrerTitle: global?.window?.localStorage?.getItem("previousPageTitle") ?? "",
        location: "",
        pageSection: title,
      },
    })
  }
  const handlePasswordVerification = async () => {
    let codeVerifier = generateCodeVerifier()
    let codeChallenge = generateCodeChallenge(codeVerifier)
    const response = await authenticLoginStore?.ticPasswordVerification(
      JSON.stringify({
        tic: userEnteredMembershipID,
        password: value,
        codeVerifier: codeVerifier,
        codeChallenge: codeChallenge,
      }),
    )
    if (response?.data?.status?.code === "200") {
      if (response?.headers) {
        global?.window?.localStorage?.setItem("accessToken", response?.headers["x-access-token"])
        global?.window?.localStorage?.setItem("refreshToken", response?.headers["x-refresh-token"])
      }
      if (response?.headers?.["x-access-token"]) {
        fetchCustomerMemberships()
      }
      setUserDetailsStore(
        response?.data?.nameDetails?.salutation,
        response?.data?.nameDetails?.firstName,
        response?.data?.nameDetails?.lastName,
        response?.data?.primaryMobile?.isdCode,
        response?.data?.primaryMobile?.phoneNumber,
        response?.data?.primaryEmailId,
        response?.data?.customerHash,
        response?.data?.dob,
        response?.data?.gender,
        response?.data?.loyaltyInfo?.[0]?.loyaltyPoints,
        response?.data?.tcpNumber,
        response?.data?.addresses,
        response?.data?.loyaltyInfo?.[0]?.currentSlab || "copper",
        response?.data?.existingCustomer,
      ),
        global?.window?.localStorage?.setItem("customerHash", response?.data?.customerHash),
        global?.window?.localStorage?.setItem("userDOB", response?.data?.dob),
        global?.window?.localStorage?.setItem("neupassStartDateInfo", response?.data?.neuPassInfo?.startDate),
        global?.window?.localStorage?.setItem("userNationality", response?.data?.addresses?.[0]?.country),
        global?.window?.localStorage?.setItem("userEmailVerified", response?.data?.emailVerified),
        global?.window?.localStorage?.setItem("userGender", response?.data?.gender),
        global?.window?.localStorage?.setItem("userSalutation", response?.data?.nameDetails?.salutation),
        global?.window?.localStorage?.setItem("userFirstName", response?.data?.nameDetails?.firstName),
        global?.window?.localStorage?.setItem("userLastName", response?.data?.nameDetails?.lastName),
        global?.window?.localStorage?.setItem("userEmail", response?.data?.primaryEmailId),
        global?.window?.localStorage?.setItem("userCountryCode", response?.data?.primaryMobile?.isdCode),
        global?.window?.localStorage?.setItem("userPhoneNumber", response?.data?.primaryMobile?.phoneNumber)
      global?.window?.localStorage?.setItem("userTICNumber", response?.data?.tcpNumber)
      global?.window?.localStorage?.setItem("neuCoins", response?.data?.loyaltyInfo?.[0]?.loyaltyPoints),
        global?.window?.localStorage?.setItem(
          "userTier",
          response?.data?.loyaltyInfo?.[0]?.currentSlab.replace(/\*$/, "") || "copper",
        ),
        GetDefaultValue(response?.data?.existingCustomer) &&
          global?.window?.localStorage?.setItem("userType", response?.data?.existingCustomer === "Y" ? "existing" : "")
      handleOtpSubmitted(response)
      triggerEvent({
        action: "Login_Success",
        params: {
          pageReferrer: global?.window?.localStorage?.getItem("previousPageURL") ?? "",
          device: isMobile ? "Mobile" : "Desktop",
          clientId: getCookie("_ga")?.slice(6),
          widget_powered_by: POWERED_BY_WIDGET,
          login_method: getItem("loginJourneyType") || LoginMethod,
          encryptedEmailID:
            response?.data?.primaryEmailId || UserEmail
              ? crypto
                  .createHash("sha256")
                  .update(response?.data?.primaryEmailId || UserEmail || "")
                  .digest("hex")
              : "",
          encryptedMobileNo: response?.data?.primaryMobile?.phoneNumber
            ? crypto
                .createHash("sha256")
                .update(response?.data?.primaryMobile?.phoneNumber || "")
                .digest("hex")
            : "",
          buttonLinkName: secondaryAction?.title,
          link_text: secondaryAction?.title,
          link_url: secondaryAction?.url,
          outbound: primaryAction?.urlType == "internal" ? false : true,
          membershipType: `${
            getItem("epicureMemberTier") || EPICURE_TIER || getItem("chambersMemberTier") || CHAMBERS_TIER || "Neupass"
          } - ${getItem("userTier") || USER_TIRE}`,
          membershipNumber:
            getItem("epicureMemberID") ||
            EPICURE_ID ||
            getItem("chambersMemberID") ||
            CHAMBERS_ID ||
            getItem("userPhoneNumber") ||
            response?.data?.primaryMobile?.phoneNumber ||
            "",
          memberEmailId: response?.data?.primaryEmailId
            ? crypto
                .createHash("sha256")
                .update(response?.data?.primaryEmailId || "")
                .digest("hex")
            : "",
          memberMobileNo: response?.data?.primaryMobile?.phoneNumber
            ? crypto
                .createHash("sha256")
                .update(response?.data?.primaryMobile?.phoneNumber || "")
                .digest("hex")
            : "",
          memberName: `${response?.data?.nameDetails?.firstName}` + ` ${response?.data?.nameDetails?.lastName}`,
          memberGender: response?.data?.gender ? response?.data?.gender : "",
          memberDOB: response?.data?.dob ? response?.data?.dob : "",
          memberAge: response?.data?.dob ? ageFromDOB(response?.data?.dob) : "",
          memberCountry: response?.data?.addresses?.[0]?.country ? response?.data?.addresses?.[0]?.country : "",
          memberState: response?.data?.addresses?.[0]?.state ? response?.data?.addresses?.[0]?.state : "",
          memberCity: response?.data?.addresses?.[0]?.cityTown ? response?.data?.addresses?.[0]?.cityTown : "",
          memberPincode: response?.data?.addresses?.[0]?.pinCode ? response?.data?.addresses?.[0]?.pinCode : "",
          ponitsToBeRedeemed: response?.data?.loyaltyInfo?.[0]?.loyaltyPoints
            ? response?.data?.loyaltyInfo?.[0]?.loyaltyPoints
            : "",
          existingCustomer: response?.data?.existingCustomer ? "Yes" : "No",
          isMember: response?.data?.loyalCustomer ? "Yes" : "No",
          userStatus: "LoggedIn",
          pageReferrerTitle: global?.window?.localStorage?.getItem("previousPageTitle") ?? "",
          widget_type: urlType,
          widget_title: title,
          widget_description: subTitle,
          widget_position: "",
          journey_type: "LogIn",
          redemptionType: "",
          redemptionName: "",
          redemptionDescription: "",
          pointsType: "Neucoins",
          brandName: AFFILIATION,
          userId: response?.data?.customerHash ? response?.data?.customerHash : "",
          userType: response?.data?.existingCustomer ? "existing" : "",
          eventType: "",
          eventName: "",
          eventPlace: "",
          eventTicketsQty: "",
          eventDate: "",
          specialCode: "",
          pageTitle: pageStoreData?.pageData?.pageTitle || "",
          pageURL: global?.window?.location?.href,
          pageHierarchy: JSON.parse(
            `["${TAJ_HOTELS}",` + `"${PAGELANG}",` + `"${AFFILIATION}",` + `"${pageStoreData?.pageData?.pageTitle}"]`,
          ),
          pageLanguage: PAGELANG,
          location: "",
          pageSection: title,
        },
      })
      modalStore?.closeModal()
    } else {
      setErrorMessage(response?.response?.data?.message || ERROR_MESSAGES?.NETWORK_ERROR)
      triggerEvent({
        action: "Login_Fail",
        params: {
          pageReferrer: global?.window?.localStorage?.getItem("previousPageURL") ?? "",
          pageURL: global?.window?.location?.href,
          device: isMobile ? "Mobile" : "Desktop",
          clientId: getCookie("_ga")?.slice(6),
          widget_powered_by: POWERED_BY_WIDGET,
          login_method: getItem("loginJourneyType") || LoginMethod,
          encryptedEmailID:
            response?.data?.primaryEmailId || UserEmail
              ? crypto
                  .createHash("sha256")
                  .update(response?.data?.primaryEmailId || UserEmail || "")
                  .digest("hex")
              : "",
          encryptedMobileNo:
            userStore?.userMobileNumber || PhoneNumber
              ? crypto
                  .createHash("sha256")
                  .update(userStore?.userMobileNumber || PhoneNumber || "")
                  .digest("hex")
              : "",
          buttonLinkName: secondaryAction?.title,
          link_text: secondaryAction?.title,
          link_url: secondaryAction?.url,
          outbound: secondaryAction?.urlType == "internal" ? false : true,
          membershipType: isLoggedIn ? `${EPICURE_TIER || CHAMBERS_TIER || "Neupass"} - ${USER_TIRE}` : "",
          membershipNumber: EPICURE_ID || CHAMBERS_ID || USER_PHONE_NUMBER || userStore?.userEnteredMembershipID || "",
          memberEmailId: response?.data?.primaryEmailId
            ? crypto
                .createHash("sha256")
                .update(response?.data?.primaryEmailId || "")
                .digest("hex")
            : "",
          memberMobileNo: response?.data?.primaryMobile?.phoneNumber
            ? crypto
                .createHash("sha256")
                .update(response?.data?.primaryMobile?.phoneNumber || "")
                .digest("hex")
            : "",
          memberName:
            `${response?.data?.nameDetails?.firstName || ""}` + `${response?.data?.nameDetails?.lastName || ""}`,
          memberGender: response?.data?.gender ? response?.data?.gender : "",
          memberDOB: response?.data?.dob ? response?.data?.dob : "",
          memberAge: response?.data?.dob ? ageFromDOB(response?.data?.dob) : "",
          memberCountry: response?.data?.addresses?.[0]?.country ? response?.data?.addresses?.[0]?.country : "",
          memberState: response?.data?.addresses?.[0]?.state ? response?.data?.addresses?.[0]?.state : "",
          memberCity: response?.data?.addresses?.[0]?.cityTown ? response?.data?.addresses?.[0]?.cityTown : "",
          memberPincode: response?.data?.addresses?.[0]?.pinCode ? response?.data?.addresses?.[0]?.pinCode : "",
          ponitsToBeRedeemed: response?.data?.loyaltyInfo?.[0]?.loyaltyPoints
            ? response?.data?.loyaltyInfo?.[0]?.loyaltyPoints
            : "",
          existingCustomer: response?.data?.existingCustomer ? "Yes" : "No",
          isMember: response?.data?.loyalCustomer ? "Yes" : "No",
          userStatus: "Not LoggedIn",
          widget_type: urlType,
          widget_title: title,
          widget_description: subTitle,
          widget_position: "",
          journey_type: "LogIn",
          redemptionType: "",
          redemptionName: "",
          redemptionDescription: "",
          pointsType: "",
          brandName: AFFILIATION,
          userId: response?.data?.customerHash ? response?.data?.customerHash : "",
          userType: response?.data?.existingCustomer ? "existing" : "",
          eventType: "",
          eventName: "",
          eventPlace: "",
          eventTicketsQty: "",
          eventDate: "",
          specialCode: "",
          pageTitle: pageStoreData?.pageData?.pageTitle || "",
          pageHierarchy: JSON.parse(
            `["${TAJ_HOTELS}",` + `"${PAGELANG}",` + `"${AFFILIATION}",` + `"${pageStoreData?.pageData?.pageTitle}"]`,
          ),
          pageLanguage: PAGELANG,
          pageReferrerTitle: global?.window?.localStorage?.getItem("previousPageTitle") ?? "",
          location: "",
          pageSection: title,
        },
      })
    }
  }

  return (
    <GridContainer>
      <SnackbarToast open={openErrorMessage} onClose={() => setOpenErrorMessage(false)} Message={snackMessage} />
      {imageAsset?.largeImage && (
        <Box sx={{ display: "flex", gap: "2vw", alignItems: "end" }}>
          {imageAsset?.largeImage?.map((img: any, index: number) => (
            <Box
              key={index}
              component={"img"}
              alt={`logo-img`}
              width={
                isMobile
                  ? "22vw"
                  : index === 0
                  ? DesktopPxToVw(162)
                  : index === 1
                  ? DesktopPxToVw(200)
                  : DesktopPxToVw(135)
              }
              sx={{ marginRight: isMobile ? "2vw" : "0vw", marginTop: "1.5vw" }}
              src={urlFor(img?.asset?._ref)?.url()}
            />
          ))}
        </Box>
      )}
      {title && <TitleTypography variant={isMobile ? "m-heading-s" : "heading-s"}>{title}</TitleTypography>}
      {subTitle && (
        <SubTitleTypography sx={{ marginBottom: "2.5vw" }} variant={isMobile ? "m-body-sxl" : "body-ml"}>
          {subTitle}
        </SubTitleTypography>
      )}
      <Grid>
        <StyledTextField
          placeholder={placeholder?.label}
          name={LOGIN_CONSTANTS?.PASSWORD}
          value={value}
          type={passwordType}
          variant="standard"
          onChange={(e: any) => handleChangeForm(e)}
          onKeyDown={handlePhoneKeyRestrictions}
          helperText={errorMessage && errorMessage}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ cursor: "pointer" }}>
                {visible ? (
                  <VisibilityOffIcon onClick={handlePassword} />
                ) : (
                  <RemoveRedEyeIcon onClick={handlePassword} />
                )}
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Box sx={{ margin: isMobile ? "9vw 0vw 2vw 0vw" : "2.6vw 0vw 3.125vw" }}>
        <BoxWrapper>
          <CheckboxWrapper>
            <CustomCheckBox
              checked={checkBoxValue}
              withBorder={false}
              onChange={() => {
                captureCheckBoxValues()
              }}
            />
            {placeholder?.checkbox && (
              <Typography sx={{ marginLeft: "-0.8vw" }} variant={isMobile ? "m-body-sxl" : "body-ml"}>
                {placeholder?.checkbox}
              </Typography>
            )}
          </CheckboxWrapper>
          {ctaLabel && (
            <StyledTypography variant={isMobile ? "m-body-sxl" : "body-m"}>
              <RenderActionItem
                url={url}
                title={ctaLabel}
                variant={""}
                navigationType={urlType}
                isActionButtonType={false}
                linkStyles={{
                  textDecoration: "none !important",
                  fontSize: isMobile ? `${MobilePxToVw(22)}!important` : `${DesktopPxToVw(22)}`,
                }}
              />
            </StyledTypography>
          )}
        </BoxWrapper>
      </Box>
      <ButtonsWrapper>
        {primaryAction && (
          <RenderActionItem
            url={primaryAction?.url}
            title={primaryAction?.title}
            variant={primaryAction?.variant}
            navigationType={primaryAction?.urlType}
            isActionButtonType={true}
            buttonStyles={{
              width: isMobile ? "84vw" : "12.813vw",
              height: "2.813vw",
              marginTop: isMobile ? "4vw" : "0vw",
              marginRight: "1.2vw",
              fontSize: "0.938vw",
              fontFamily: "supreme",
              marginBottom: isMobile ? "40vw" : "",
            }}
            onClick={async () => {
              const recaptchaGenerated = await getRecaptchaToken()
              const response = await authenticLoginStore?.generateMembershipIDOTP({
                memberId: userEnteredMembershipID,
                recaptchaToken: recaptchaGenerated,
              })
              if (response?.status === 201 && response?.error === false) {
                primaryAction?.url && navigate(primaryAction?.url, primaryAction?.urlType)
              } else {
                setOpenErrorMessage(true)
                setSnackMessage(response?.response?.data?.message || LOGIN_CONSTANTS?.OTP_FAILED_ERROR)
              }
            }}
          />
        )}
        {secondaryAction && (
          <RenderActionItem
            url={secondaryAction?.url}
            title={secondaryAction?.title}
            variant={secondaryAction?.variant}
            navigationType={secondaryAction?.urlType}
            isActionButtonType={true}
            isDisable={isButtonDisable}
            buttonStyles={{
              width: isMobile ? "84vw" : DesktopPxToVw(137),
              marginTop: isMobile ? `${MobilePxToVw(68.7)}` : "0vw",
              height: "2.813vw",
              letterSpacing: "0.1em",
            }}
            onClick={() => {
              if (isButtonDisable) {
                handlePasswordVerification()
              }
            }}
          />
        )}
      </ButtonsWrapper>
    </GridContainer>
  )
}

export default PasswordScreen
