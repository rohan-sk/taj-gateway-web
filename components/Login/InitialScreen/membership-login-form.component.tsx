import { Box } from "@mui/material"
import { observer } from "mobx-react-lite"
import { GAStore, UserStore } from "../../../store"
import { LoginFormInterface } from "../login-form.types"
import SnackbarToast from "../../../utils/SnackbarToast"
import { useMobileCheck } from "../../../utils/isMobilView"
import LoadingSpinner from "../../../utils/SpinnerComponent"
import React, { useContext, useEffect, useState } from "react"
import RenderActionItem from "../../hoc/actions/action-items-ui"
import { CustomCheckBox } from "../../hoc/CustomCheckBox/Checkbox"
import { useAppNavigation } from "../../../utils/NavigationUtility"
import { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
import { PortableText } from "../../../lib/portable-text-serializers"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { ModalContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import AuthenticLoginStore from "../../../features/login/store/authentication.login.store"
import { CheckBoxWrapper, CheckBoxContainer, ErrorMessages } from "../Styles/InitialScreen.styles"
import {
  senderMobile,
  ERROR_MESSAGES,
  receiverAddress,
  MembershipPlaceholder,
} from "../../forms/gift-card-form/constants"
import {
  StyledMenuItem,
  StyledTextField,
  MemberShipSelect,
  MembershipFieldWrapper,
  ErrorMessageTypography,
} from "../Styles/tabs.styles"
import { theme } from "../../../lib/theme"
import { getRecaptchaToken } from "../../../utils/recaptcha"
import GetDefaultValue from "../../../utils/validations/getDefaultValue"
import { MemberDataLayer } from "../../../utils/analytics/member-data-layer"
import { triggerEvent } from "../../../utils/analytics"
import { getCookie } from "../../../utils/cookie"
import crypto from "crypto"
const MembershipLoginForm = ({ props }: LoginFormInterface) => {
  const { label } = props
  const [memberShipNo, setMemberShipNo] = useState<string>("")
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<any>("")
  const [check, setCheck] = useState<boolean>(false)
  const [disable, setDisable] = useState<boolean>(false)
  const [membership, SetMembership] = useState<string>("NeuPass")
  const [loader, setLoader] = useState<boolean>(false)
  const [openErrorMessage, setOpenErrorMessage] = useState<boolean>(false)
  const [snackMessage, setSnackMessage] = useState<string>("")
  const [membershipData, setMembershipData] = useState<any>([])
  const isMobile = useMobileCheck()
  const navigate: any = useAppNavigation()
  const IHCLContexts = useContext(IHCLContext)
  const modalContext = useContext(ModalContext)
  const primaryAction = props?.type?.[0]?.primaryAction
  const navigationUrls = props?.type
  const [isNewPassOpen, setIsNewPassOpen] = useState<boolean>(false)

  const { updateUserEnteredMemberID, setUserMobileNumber, setUserCountryCode } = IHCLContexts?.getGlobalStore(
    GLOBAL_STORES.userStore,
  ) as UserStore

  const authenticLoginStore = modalContext?.getPageStore(PAGE_STORES.loginStore) as AuthenticLoginStore
  const gaStoreData = IHCLContexts?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const dataLayer = MemberDataLayer(UserStore, gaStoreData)
  useEffect(() => {
    if (props?.type) {
      let arrData = [...membershipData]
      props?.type?.map((item: any) => {
        let temp: any = {}
        temp.name = item.name
        arrData.push(temp)
      })
      setMembershipData(arrData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props?.type])

  useEffect(() => {
    if (
      membership?.toLowerCase()?.includes("chambers")
        ? memberShipNo?.length > 0 && check
        : (memberShipNo?.length === 16 || memberShipNo?.length === 12) && check
    ) {
      setDisable(true)
    } else {
      setDisable(false)
    }
  }, [check, memberShipNo?.length, membership])

  const formValidation = (isFormValid: any, id: any) => {
    setError(!isFormValid)
  }

  const handleMembership = (event: any) => {
    SetMembership(event?.target?.value)
  }
  const handleChangeForm = (event: any) => {
    const { name, value } = event.target
    setMemberShipNo(isNaN(value) ? "" : event?.target?.value.replace(/[`~!$%^#&,.*()_|+\=?;:'"<>\{\}\[\]\\\/]/gi, ""))
    if (
      !(membership?.toLowerCase()?.includes("chambers")
        ? event?.target?.value?.length > 3
        : event?.target?.value?.length === 16 || event?.target?.value?.length === 12)
    ) {
      formValidation(true, name)
      setErrorMessage(ERROR_MESSAGES?.MEMBERSHIP_ERROR)
    } else {
      setErrorMessage("")
      formValidation(false, name)
    }
  }

  const handlePhoneKeyRestrictions = (event: any) => {
    if (event?.key === "Enter" && error && check) {
      if (membership?.toLowerCase() === "neupass") {
        handleSubmitNuePass()
      } else if (membership?.toLowerCase() === "epicure" || membership?.toLowerCase()?.includes("chambers")) {
        handleEpicureSubmit()
      }
    }
  }

  const CheckBoxToggle = (e: any) => {
    setCheck(!check)
  }

  const handleSubmitNuePass = async () => {
    updateUserEnteredMemberID(memberShipNo)
    await navigate(primaryAction?.url, primaryAction?.urlType)
  }

  const handleEpicureSubmit = async () => {
    setLoader(true)
    updateUserEnteredMemberID(memberShipNo)
    const recaptchaGenerated = await getRecaptchaToken()
    let response
    response = await authenticLoginStore?.generateMembershipIDOTP(
      JSON.stringify({
        memberId: memberShipNo,
        memberType: membership?.toLowerCase() === "epicure" ? "epicure" : "chambers",
        recaptchaToken: recaptchaGenerated,
      }),
    )
    if (response?.status === 201 || response?.error === false) {
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
      navigate(navigationUrls?.[1]?.primaryAction?.url, navigationUrls?.[1]?.primaryAction?.urlType)
    } else {
      setLoader(false)
      setOpenErrorMessage(true)
      setSnackMessage(
        response?.response?.data?.errorMessage ||
          response?.data?.message ||
          response?.response?.data?.message ||
          ERROR_MESSAGES?.NETWORK_ERROR,
      )
    }
  }
  const membershipError: boolean = errorMessage && !error

  //Analytics Need to write a function and changes function Name

  return (
    <>
      {loader && <LoadingSpinner />}
      <SnackbarToast open={openErrorMessage} onClose={() => setOpenErrorMessage(false)} Message={snackMessage} />
      <Box
        sx={{
          marginTop: isMobile ? "2vw" : "",
          marginBottom: isMobile ? "8.6vw" : "0vw",
        }}
        aria-label="membership-login-form">
        <MembershipFieldWrapper>
          <MemberShipSelect
            variant="standard"
            placeholder={props?.items?.[2]?.labelText}
            value={membership}
            label={props?.items?.[2]?.labelText}
            open={isNewPassOpen}
            onOpen={() => {
              setIsNewPassOpen(true)
            }}
            onClose={() => {
              setIsNewPassOpen(false)
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
                  maxHeight: 250,
                  width: isMobile ? MobilePxToVw(160) : "12.240vw",
                  margin: isMobile ? { xs: "0vw", sm: "0vw" } : "0vw 0vw 0vw 2vw",
                  background: theme.palette.ihclPalette.hexOne,
                  boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
                },
              },
            }}>
            {membershipData?.map((membership: any, index: number) => {
              return (
                <StyledMenuItem key={index} value={membership?.name}>
                  {membership?.name}
                </StyledMenuItem>
              )
            })}
          </MemberShipSelect>
          <StyledTextField
            sx={{
              width: "26vw",
              "& .MuiInputBase-input": {
                "@media (max-width: 640px)": {
                  width: "60vw",
                  marginBottom: "0vw",
                  letterSpacing: "-0.5px",
                },
                paddingLeft: "2vw",
              },
            }}
            placeholder={isMobile ? MembershipPlaceholder : label}
            name={membership?.toLowerCase()?.includes("chambers") ? receiverAddress : senderMobile}
            onInput={(e: any) => {
              if (membership?.toLowerCase() !== "chambers") {
                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 16)
              }
            }}
            type={"tel"}
            value={memberShipNo}
            variant="standard"
            onChange={handleChangeForm}
            onKeyDown={handlePhoneKeyRestrictions}
          />
        </MembershipFieldWrapper>
        {errorMessage && !error && <ErrorMessages>{errorMessage}</ErrorMessages>}
        <CheckBoxWrapper
          sx={{
            margin: membershipError ? "0.7vw 0vw 2.6vw 0vw" : "2.813vw 0vw 2.6vw 0vw",
          }}>
          <CheckBoxContainer>
            <CustomCheckBox withBorder={true} onChange={CheckBoxToggle} checked={check} />
          </CheckBoxContainer>
          {props.content?.[0] && <PortableText blocks={props.content?.[0]} />}
        </CheckBoxWrapper>
        <RenderActionItem
          isDisable={disable}
          isDisableRippleEffect={!disable}
          url={primaryAction?.url}
          title={primaryAction?.title}
          variant={primaryAction?.variant}
          navigationType={primaryAction?.urlType}
          isActionButtonType={true}
          buttonStyles={{
            padding: isMobile ? "auto" : "",
            width: isMobile ? "100%" : DesktopPxToVw(179),
            marginTop: "0.6vw",
          }}
          onClick={() => {
            if (disable) {
              if (membership?.toLowerCase() === "neupass") {
                global?.window?.localStorage?.setItem("loginJourneyType", "NuePassIdLogin")

                handleSubmitNuePass()
              } else if (membership?.toLowerCase() === "epicure" || membership?.toLowerCase()?.includes("chambers")) {
                handleEpicureSubmit()
              }
            }
          }}
        />
      </Box>
    </>
  )
}

export default observer(MembershipLoginForm)
