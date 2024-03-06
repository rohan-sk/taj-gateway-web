import { UserStore } from "../../../store"
import { CONSTANTS } from "../../constants"
import { urlFor } from "../../../lib-sanity"
import { useMobileCheck } from "../../../utils/isMobilView"
import { Box, InputAdornment, Typography } from "@mui/material"
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye"
import RenderActionItem from "../../hoc/actions/action-items-ui"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import { useAppNavigation } from "../../../utils/NavigationUtility"
import { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
import React, { Fragment, useContext, useEffect, useState } from "react"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { ImagesContainer, PasswordTextField } from "./reset-password.styles"
import { ErrorMessageTypography } from "../../forms/loyalty-form/form-styles"
import { ERROR_MESSAGES, Error_icon } from "../../forms/gift-card-form/constants"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import AuthenticLoginStore from "../../../features/login/store/authentication.login.store"
import { ModalContext } from "../../../PresentationalComponents/lib/prepare-page-context"

const ResetPassword = (props: any) => {
  const Context = useContext(IHCLContext)
  const PortableText = Context!.PortableText
  const modalContext = useContext(ModalContext)
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const [emptyError, setEmptyError] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(true)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(true)
  const [passwordType, setPasswordType] = useState<string>("password")
  const [confirmPasswordType, setConfirmPasswordType] = useState<string>("password")
  const [snackBarMessage, setSnackBarMessage] = useState<string>("")
  const [snackBarOpen, setSnackBarOpen] = useState<boolean>(false)
  const [password, setPassword] = useState<{
    newPassword: string
    confirmPassword: string
  }>({
    newPassword: "",
    confirmPassword: "",
  })
  const [error, setError] = useState<{
    newPassword: boolean
    confirmPassword: boolean
  }>({
    newPassword: false,
    confirmPassword: false,
  })

  //global store
  const userStore = Context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore

  //modal store
  const authenticLoginStore = modalContext?.getPageStore(PAGE_STORES.loginStore) as AuthenticLoginStore

  const handlePassword = (name: string) => {
    if (name === "password") {
      setShowPassword(!showPassword)
      if (passwordType === "password") {
        setPasswordType("text")
      } else {
        setPasswordType("password")
      }
    } else {
      setShowConfirmPassword(!showConfirmPassword)
      if (confirmPasswordType === "password") {
        setConfirmPasswordType("text")
      } else {
        setConfirmPasswordType("password")
      }
    }
  }

  const formValidation = (isFormValid: any, id: any) => {
    setError({ ...error, [id]: isFormValid })
  }

  useEffect(() => {
    if (password?.newPassword === password?.confirmPassword) {
      formValidation(false, "confirmPassword")
    } else {
      formValidation(true, "confirmPassword")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password?.confirmPassword, password?.newPassword])

  const disable = password?.newPassword?.length < 8 ? false : true
  const handleChangeForm = (event: any) => {
    const { name, value } = event?.target
    const charLimit = 8
    const passwordRegExp = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
    setPassword((prev: any) => {
      return {
        ...prev,
        [name]: value,
      }
    })
    if (name === "newPassword") {
      if (value?.length >= CONSTANTS?.THREE && value?.length <= charLimit && !isNaN(value.match(passwordRegExp))) {
        formValidation(true, name)
      } else {
        formValidation(false, name)
      }
    } else {
      if (name === "confirmPassword" && value === password?.newPassword) {
        formValidation(false, name)
      } else {
        formValidation(true, name)
      }
    }
  }
  const handleSubmit = async () => {
    let response = await authenticLoginStore?.resetPassword(
      JSON.stringify({
        email: userStore.userEmailID,
        password: password?.newPassword,
      }),
    )
    if (response?.error === false || response?.data?.error === false) {
      navigate(props?.primaryAction?.url, props?.primaryAction?.urlType)
    } else {
      setSnackBarOpen(true)
      setSnackBarMessage(response?.response?.data?.message || response?.data?.message || ERROR_MESSAGES?.NETWORK_ERROR)
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}>
      {props?.imageAsset?.largeImage?.length > 0 && (
        <ImagesContainer>
          {props?.imageAsset?.largeImage?.map((img: any, index: number) => (
            <Fragment key={index}>
              {img?.asset?._ref && (
                <Box
                  key={index}
                  component={"img"}
                  alt={`logo-img`}
                  sx={{
                    width:
                      index === 0
                        ? isMobile
                          ? MobilePxToVw(115)
                          : DesktopPxToVw(162)
                        : index === 1
                        ? isMobile
                          ? MobilePxToVw(143)
                          : DesktopPxToVw(200)
                        : isMobile
                        ? MobilePxToVw(97)
                        : DesktopPxToVw(135),
                    marginRight: "1vw",
                  }}
                  src={urlFor(img?.asset?._ref)?.url()}
                />
              )}
            </Fragment>
          ))}
        </ImagesContainer>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: isMobile ? "0vw 7.813vw" : "0vw auto",
        }}>
        {props?.title && (
          <Typography
            variant={isMobile ? "m-heading-s" : "heading-s"}
            sx={{ marginBottom: "1.8vw", textAlign: "center" }}>
            {props?.title}
          </Typography>
        )}
        <PasswordTextField
          sx={{ marginTop: isMobile ? "8.4vw" : "" }}
          variant="standard"
          placeholder={props?.parameterMap?.[0]?.value}
          value={password?.newPassword}
          name={"newPassword"}
          type={passwordType}
          error={error?.newPassword}
          InputProps={{
            endAdornment: (
              <>
                {emptyError && password?.newPassword?.length < 1 && (
                  <InputAdornment position="end">
                    <Box component="img" src={Error_icon} alt="Expand Image" />
                  </InputAdornment>
                )}
                {showPassword ? (
                  <VisibilityOffIcon sx={{ cursor: "pointer" }} onClick={() => handlePassword("password")} />
                ) : (
                  <RemoveRedEyeIcon sx={{ cursor: "pointer" }} onClick={() => handlePassword("password")} />
                )}
              </>
            ),
          }}
          helperText={
            (error?.newPassword && props?.parameterMap?.[2]?.value) ||
            (emptyError && password?.newPassword?.length < 1 && props?.parameterMap?.[2]?.value)
          }
          onChange={(e) => handleChangeForm(e)}
        />
        <PasswordTextField
          sx={{
            marginBottom: isMobile ? "5.250vw" : snackBarOpen ? "0vw" : "1.8vw",
            marginTop: isMobile ? "5.250vw" : "0.4vw",
          }}
          variant="standard"
          placeholder={props?.parameterMap?.[1]?.value}
          value={password?.confirmPassword}
          name={"confirmPassword"}
          type={confirmPasswordType}
          error={error?.confirmPassword}
          InputProps={{
            endAdornment: (
              <>
                {emptyError && password?.confirmPassword?.length < 1 && (
                  <InputAdornment position="end">
                    <Box component="img" src={Error_icon} alt="Expand Image" />
                  </InputAdornment>
                )}
                {showConfirmPassword ? (
                  <VisibilityOffIcon sx={{ cursor: "pointer" }} onClick={() => handlePassword("confirmPassword")} />
                ) : (
                  <RemoveRedEyeIcon sx={{ cursor: "pointer" }} onClick={() => handlePassword("confirmPassword")} />
                )}
              </>
            ),
          }}
          helperText={
            (error?.confirmPassword && password?.confirmPassword?.length > 1 && props?.parameterMap?.[3]?.value) ||
            (emptyError && password?.confirmPassword?.length < 1 && props?.parameterMap?.[3]?.value)
          }
          onChange={(e) => handleChangeForm(e)}
        />
        {snackBarOpen && (
          <ErrorMessageTypography sx={{ marginBottom: "1.8vw", width: "max-content" }}>
            {snackBarMessage}
          </ErrorMessageTypography>
        )}
        {props.singleContent && (
          <Box sx={{ marginTop: isMobile ? "7.969vw" : "initial" }}>
            <PortableText blocks={props.singleContent} />
          </Box>
        )}
        <RenderActionItem
          url={props?.primaryAction?.url}
          title={props?.primaryAction?.title}
          variant={props?.primaryAction?.variant}
          navigationType={props?.primaryAction?.urlType}
          isActionButtonType={true}
          isDisable={disable}
          buttonStyles={{
            margin: isMobile ? "6.344vw 0vw 25vw 0vw" : "2vw 0vw",
            width: isMobile ? "84.375vw" : "13.854vw",
            alignSelf: "center",
          }}
          onClick={() => {
            if (disable) {
              if (
                password?.newPassword?.length < CONSTANTS?.THREE ||
                password?.confirmPassword?.length < CONSTANTS?.THREE
              ) {
                setEmptyError(true)
              } else if (error?.newPassword === false && error?.confirmPassword === false) {
                handleSubmit()
              }
            }
          }}
        />
      </Box>
    </Box>
  )
}

export default ResetPassword
