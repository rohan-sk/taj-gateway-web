import React, { useContext, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Box, MenuItem } from "@mui/material"
import { theme } from "../../../lib/theme"
import { GAStore, UserStore } from "../../../store"
import { useMobileCheck } from "../../../utils/isMobilView"
import DesktopPxToVw from "../../../utils/DesktopFontCalc"
import { getRecaptchaToken } from "../../../utils/recaptcha"
import { LOGIN_TYPE } from "../../../utils/analytics/constants"
import RenderActionItem from "../../hoc/actions/action-items-ui"
import { CustomCheckBox } from "../../hoc/CustomCheckBox/Checkbox"
import { useAppNavigation } from "../../../utils/NavigationUtility"
import { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
import GetDefaultValue from "../../../utils/validations/getDefaultValue"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { MemberDataLayer } from "../../../utils/analytics/member-data-layer"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { ModalContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import AuthenticLoginStore from "../../../features/login/store/authentication.login.store"
import { ERROR_MESSAGES, receiverAddress, senderMobile } from "../../forms/gift-card-form/constants"
import { handleCredEntered } from "../../../utils/analytics/events/NonEcommerce/credentials-entered-event"
import {
  CheckBoxWrapper,
  MembershipNumberAndMemberTypeWrapper,
  MembershipNumberErrorMessage,
  MembershipNumberTextField,
  MembershipTypeSelectBox,
  TermsAndPrivacyTypography,
} from "./SSOLoginFormsStyles"

const LoadingSpinner = dynamic(() => import("../../../utils/SpinnerComponent"))
const SSOLoginMembershipTypeImages = dynamic(() => import("./SSOLoginMembershipTypeImages"))

const SSOLoginMembershipMobileNumberForm = ({ props }: any) => {
  const propItems = props?.tabs?.[2]?.tabItems?.[0]
  const errorTextMessage = propItems?.items?.[0]?.parameterMap?.[0]?.value || ""

  const isMobile = useMobileCheck()
  const navigate: any = useAppNavigation()
  const IHCLContexts = useContext(IHCLContext)
  const modalContext = useContext(ModalContext)
  const PortableText = IHCLContexts!.PortableText
  const checkBoxToggleValue = () => setCheckValue(!checkValue)

  const [error, setError] = useState<boolean>(false)
  const [loader, setLoader] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<boolean>(false)
  const [memberShipNo, setMemberShipNo] = useState<string>("")
  const [checkValue, setCheckValue] = useState<boolean>(false)
  const [membership, SetMembership] = useState<string>("NeuPass")
  const [labels, setLabels] = useState<string>("")
  const [isNewPassOpen, setIsNewPassOpen] = useState<boolean>(false)
  const [apiErrorMessage, SetApiErrorMessage] = useState<string>("")
  const [membershipButtonDisable, setMembershipButtonDisable] = useState<boolean>(false)

  const gaStoreData = IHCLContexts?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const userStore = IHCLContexts?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const authenticLoginStore = modalContext?.getPageStore(PAGE_STORES.loginStore) as AuthenticLoginStore
  const { updateUserEnteredMemberID, setUserMobileNumber, setUserCountryCode } = IHCLContexts?.getGlobalStore(
    GLOBAL_STORES.userStore,
  ) as UserStore

  const dataLayer = MemberDataLayer(userStore, gaStoreData)

  useEffect(() => {
    propItems?.items?.[0]?.type?.map((item: any) => {
      if (item?.name?.toLowerCase() === "neupass") setLabels(item?.placeholder)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const formValidation = (isFormValid: any, id: any) => {
    setError(!isFormValid)
  }

  const handleMembership = (event: any) => {
    SetMembership(event?.target?.value)
    setMemberShipNo("")
    propItems?.items?.[0]?.type?.map((item: any) => {
      if (item?.name?.toLowerCase() === event?.target?.value?.toLowerCase()) setLabels(item?.placeholder)
    })
  }

  useEffect(() => {
    if (
      membership?.toLowerCase()?.includes("chambers")
        ? (memberShipNo?.length === 4 || memberShipNo?.length === 12 || memberShipNo?.length === 16) && checkValue
        : (memberShipNo?.length === 12 || memberShipNo?.length === 16) && checkValue
    ) {
      setMembershipButtonDisable(true)
    } else {
      setMembershipButtonDisable(false)
    }
  }, [checkValue, memberShipNo?.length, membership])

  const handleChangeForm = (event: any) => {
    SetApiErrorMessage("")
    const { name, value } = event.target
    setMemberShipNo(isNaN(value) ? "" : event?.target?.value.replace(/[`~!$%^#&,.*()_|+\=?;:'"<>\{\}\[\]\\\/]/gi, ""))
    if (
      !(membership?.toLowerCase()?.includes("chambers")
        ? event?.target?.value?.length === 4 ||
          event?.target?.value?.length === 12 ||
          event?.target?.value?.length === 16
        : event?.target?.value?.length === 12 || event?.target?.value?.length === 16)
    ) {
      formValidation(true, name)
      setErrorMessage(true)
    } else {
      setErrorMessage(false)
      formValidation(false, name)
    }
  }

  const handlePhoneKeyRestrictions = (event: any) => {
    if (event?.key === "Enter" && error && checkValue) {
      if (membership?.toLowerCase() === "neupass") {
        handleSubmitNuePass()
      } else if (membership?.toLowerCase() === "epicure" || membership?.toLowerCase()?.includes("chambers")) {
        handleEpicureSubmit()
      }
    }
  }

  const handleSubmitNuePass = async () => {
    updateUserEnteredMemberID(memberShipNo)
    await navigate(
      propItems?.items?.[0]?.type?.[0]?.primaryAction?.url,
      propItems?.items?.[0]?.type?.[0]?.primaryAction?.urlType,
    )
  }

  const handleEpicureSubmit = async () => {
    setLoader(true)
    updateUserEnteredMemberID(memberShipNo)
    const recaptchaGenerated = await getRecaptchaToken()
    let response
    response = await authenticLoginStore?.generateMembershipIDOTP(
      JSON.stringify({
        memberId: memberShipNo,
        memberType: membership?.toLowerCase()?.includes("epicure") ? "epicure" : "chambers",
        recaptchaToken: recaptchaGenerated,
      }),
    )
    if (response?.status === 201 || response?.error === false) {
      response?.data?.emailMasked && userStore?.setUserEncryptedCredentials(response?.data?.emailMasked)
      response?.data?.refId && userStore?.setUserRedId(response?.data?.refId)
      if (membership?.toLowerCase() === "epicure") {
        global?.window?.localStorage?.setItem("loginJourneyType", "EpicureIdLogin")
        GetDefaultValue(response?.data?.userType) &&
          global?.window?.localStorage?.setItem("userType", response?.data?.userType)
      } else if (membership?.toLowerCase()?.includes("chambers")) {
        global?.window?.localStorage?.setItem("loginJourneyType", "ChambersIdLogin")
        GetDefaultValue(response?.data?.userType) &&
          global?.window?.localStorage?.setItem("userType", response?.data?.userType)
      }
      setLoader(false)
      await setUserMobileNumber(`${response?.data?.mobile}`)
      await setUserCountryCode(`${response?.data?.country}`)
      navigate(
        propItems?.items?.[0]?.type?.[1]?.primaryAction?.url,
        propItems?.items?.[0]?.type?.[1]?.primaryAction?.urlType,
      )
    } else {
      setLoader(false)
      setErrorMessage(true)
      SetApiErrorMessage(
        response?.response?.data?.errorMessage ||
          response?.response?.data?.message ||
          response?.data?.message ||
          ERROR_MESSAGES?.NETWORK_ERROR,
      )
    }
  }

  return (
    <Box>
      {loader && <LoadingSpinner />}
      <MembershipNumberAndMemberTypeWrapper aria-label="SSOLoginMembershipMobileNumberForm">
        <MembershipTypeSelectBox
          variant="standard"
          value={membership}
          open={isNewPassOpen}
          onOpen={() => {
            setIsNewPassOpen(true)
          }}
          onClose={() => {
            setIsNewPassOpen(false)
          }}
          sx={{
            fontFamily: "Inter",
            "& .MuiInputBase-input": {
              backgroundColor: theme?.palette?.background?.default,
            },
          }}
          IconComponent={() => (
            <KeyboardArrowDownIcon
              sx={{
                cursor: "pointer",
                transform: isNewPassOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
              onClick={() => {
                setIsNewPassOpen(!isNewPassOpen)
              }}
            />
          )}
          onChange={handleMembership}
          MenuProps={{
            PaperProps: {
              sx: {
                background: theme.palette.ihclPalette.hexOne,
                boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
              },
            },
          }}>
          {propItems?.items?.[0]?.type?.map((membership: any, index: number) => {
            return (
              <MenuItem key={index} value={membership?.name}>
                {membership?.name}
              </MenuItem>
            )
          })}
        </MembershipTypeSelectBox>
        <MembershipNumberTextField
          placeholder={labels}
          name={membership?.toLowerCase()?.includes("chambers") ? receiverAddress : senderMobile}
          onInput={(e: any) => {
            if (!membership?.toLowerCase()?.includes("chambers")) {
              e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 16)
            } else {
              e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 4)
            }
          }}
          type={membership?.toLowerCase()?.includes("chambers") ? "tel" : "text"}
          value={memberShipNo}
          variant="standard"
          onChange={handleChangeForm}
          onKeyDown={handlePhoneKeyRestrictions}
        />
      </MembershipNumberAndMemberTypeWrapper>
      {memberShipNo?.length > 0 && errorMessage && !error && (
        <Box sx={{ position: "absolute", width: isMobile ? "80%" : "36%" }}>
          <MembershipNumberErrorMessage>{errorTextMessage}</MembershipNumberErrorMessage>
        </Box>
      )}
      {apiErrorMessage && (
        <Box sx={{ position: "absolute", width: isMobile ? "80%" : "36%" }}>
          <MembershipNumberErrorMessage>{apiErrorMessage}</MembershipNumberErrorMessage>
        </Box>
      )}
      {propItems?.items?.[0]?.content && (
        <CheckBoxWrapper>
          <CustomCheckBox withBorder={true} onChange={checkBoxToggleValue} checked={checkValue} />
          <TermsAndPrivacyTypography>
            {propItems?.items?.[0]?.content?.map((item: any, index: number) => (
              <PortableText key={index} blocks={item} />
            ))}
          </TermsAndPrivacyTypography>
        </CheckBoxWrapper>
      )}

      <SSOLoginMembershipTypeImages props={props} />

      {propItems?.items?.[0]?.type?.[0]?.primaryAction?.title && (
        <RenderActionItem
          isDisable={membershipButtonDisable}
          url={propItems?.items?.[0]?.type?.[0]?.primaryAction?.url}
          isActionButtonType={true}
          title={propItems?.items?.[0]?.type?.[0]?.primaryAction?.title}
          variant={propItems?.items?.[0]?.type?.[0]?.primaryAction?.variant}
          navigationType={propItems?.items?.[0]?.type?.[0]?.primaryAction?.urlType}
          onClick={() => {
            if (membershipButtonDisable) {
              if (membership?.toLowerCase() === "neupass") {
                global?.window?.localStorage?.setItem("loginJourneyType", "NuePassIdLogin")
                handleSubmitNuePass()
                handleCredEntered(
                  "credentials_entered",
                  propItems?.items?.[0]?.type?.[0]?.primaryAction?.urlType,
                  propItems?.items?.[0]?.type?.[0]?.primaryAction?.url,
                  propItems?.items?.[0]?.type?.[0]?.primaryAction?.title,
                  dataLayer,
                  userStore,
                  props,
                  "",
                  "",
                  memberShipNo,
                  LOGIN_TYPE,
                )
              } else if (membership?.toLowerCase() === "epicure" || membership?.toLowerCase()?.includes("chambers")) {
                handleEpicureSubmit()
                handleCredEntered(
                  "credentials_entered",
                  propItems?.items?.[0]?.type?.[0]?.primaryAction?.urlType,
                  membership?.toLowerCase() === "epicure"
                    ? propItems?.items?.[0]?.type?.[1]?.primaryAction?.url
                    : propItems?.items?.[0]?.type?.[2]?.primaryAction?.url,
                  propItems?.items?.[0]?.type?.[0]?.primaryAction?.title,
                  dataLayer,
                  userStore,
                  props,
                  "",
                  "",
                  memberShipNo,
                  LOGIN_TYPE,
                )
              }
            }
          }}
          buttonStyles={{
            display: "flex",
            justifyContent: "center",
            margin: `${DesktopPxToVw(20)} auto 0vw auto`,
            "@media (max-width: 640px)": {
              width: "100%",
            },
          }}
        />
      )}
    </Box>
  )
}

export default SSOLoginMembershipMobileNumberForm
