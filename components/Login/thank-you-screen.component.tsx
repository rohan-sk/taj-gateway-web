import { Box, Typography } from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import { urlFor } from "../../lib-sanity"
import RenderActionItem from "../hoc/actions/action-items-ui"
import { MainGrid } from "./Styles/InitialScreen.styles"
import ModalStore from "../../store/global/modal.store"
import { ThankYouScreenInterface } from "./login-form.types"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { useMobileCheck } from "../../utils/isMobilView"
import { theme } from "../../lib/theme"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { GLOBAL_STORES } from "../../utils/Constants"
import { UserStore } from "../../store"
import dynamic from "next/dynamic"
const LoadingSpinner = dynamic(() => import("../../utils/SpinnerComponent"))

const ThankYouScreen = (props: ThankYouScreenInterface) => {
  const { PrimaryAction, secondaryAction, title, largeImage, subtitle } = props
  const modalStore = ModalStore.getInstance()
  const pageNavigation = useAppNavigation()
  const navigate = useAppNavigation()
  const isPasswordScreen = PrimaryAction?.url?.toLowerCase() === "/neupass-login"

  const Context = useContext(IHCLContext)
  const [loader, setLoader] = useState<boolean>(true)
  //global user store
  const userStore = Context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore

  useEffect(() => {
    props && setLoader(false)
  }, [props])

  const handleClose = () => {
    modalStore?.closeModal()
  }

  const isMobile = useMobileCheck()

  const handleCloseIcon = () => {
    userStore?.clearUserEnteredRegistrationMobileNumber()
    userStore?.clearUserEmailID()
    userStore?.clearUserCountryCode()
    userStore?.clearUserMobileNumber()
    userStore?.updateUserEnteredMemberID("")
  }
  return (
    <>
      {loader ? (
        <LoadingSpinner componentLevel={true} />
      ) : (
        <MainGrid>
          {largeImage?.asset?._ref && (
            <Box
              alt={`-img`}
              width={isMobile ? "37.656vw" : "14vw"}
              component={"img"}
              sx={{
                marginBottom: isMobile ? "21vw" : isPasswordScreen ? "0vw" : "1.5vw",
                marginTop: isMobile ? "4vw" : isPasswordScreen ? "0vw" : "-0.4vw",
              }}
              src={urlFor(largeImage?.asset?._ref).url()}
            />
          )}
          {title && (
            <Typography
              variant={isMobile ? "m-heading-l" : "heading-l"}
              sx={{
                margin: isMobile ? "2vw 0vw 3vw 0vw" : isPasswordScreen ? "3vw 0vw 0.886vw 0vw" : "2vw 0vw 0.986vw 0vw",
                fontSize: isMobile ? "7.500vw" : "2.500vw",
                fontFamily: theme?.palette?.font?.primaryFontFamily,
                color: theme?.palette?.neuPalette?.hexSeventeen,
              }}>
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography
              variant={isMobile ? "m-body-l" : "body-l"}
              sx={{
                marginBottom: isMobile ? "9vw" : "2.2vw",
              }}>
              {subtitle}
            </Typography>
          )}
          <Box sx={{ marginBottom: isMobile ? "40vw" : "4.2vw" }}>
            {PrimaryAction && (
              <RenderActionItem
                url={PrimaryAction?.url}
                title={PrimaryAction?.title}
                variant={PrimaryAction?.variant}
                navigationType={PrimaryAction?.urlType}
                isActionButtonType={true}
                buttonStyles={{
                  width:
                    isPasswordScreen && isMobile
                      ? "84.375vw"
                      : isPasswordScreen
                      ? "10.052vw"
                      : isMobile
                      ? "47.031vw"
                      : "15.677vw",
                  margin: isPasswordScreen ? "0vw" : "1vw 0vw",
                  marginRight: isMobile ? "3.125vw" : "1.042vw",
                }}
                onClick={() => {
                  if (isPasswordScreen) {
                    userStore?.setLoginTabIndex(2)
                    handleCloseIcon()
                    navigate(PrimaryAction?.url, PrimaryAction?.urlType)
                  } else {
                    handleClose()
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
                buttonStyles={{
                  width: "auto",
                  margin: "1vw 0vw",
                }}
                onClick={() => {
                  handleClose()
                  pageNavigation(secondaryAction?.url, secondaryAction?.urlType)
                }}
              />
            )}
          </Box>
        </MainGrid>
      )}
    </>
  )
}

export default ThankYouScreen
