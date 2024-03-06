import { useEffect, useState } from "react"
import { useMobileCheck } from "./isMobilView"
import { Box, Typography } from "@mui/material"
import { CONSTANTS, ICONS } from "../components/constants"
import RenderActionItem from "../components/hoc/actions/action-items-ui"
import { ContentWrapper, MainContainer } from "./styles/no-internet-styles"

const Offline = () => {
  const isMobile = useMobileCheck()
  const [showComponent, setShowComponent] = useState(true)

  const clickHandler = () => {
    setShowComponent(false)
  }

  useEffect(() => {
    setShowComponent(true)
  }, [showComponent])

  return showComponent ? (
    <MainContainer $isMobile={isMobile}>
      <ContentWrapper $isMobile={isMobile}>
        <Box component="img" src={ICONS?.NO_INTERNET_ICON} alt="No Internet" />
        <Typography
          variant={isMobile ? "m-heading-s" : "heading-s"}
          sx={{
            textAlign: "center",
          }}>
          {CONSTANTS?.UNSTABLE_CONNECTION}
        </Typography>
        <Typography
          variant={isMobile ? "m-body-sl" : "body-ml"}
          sx={{
            textAlign: "center",
          }}>
          {CONSTANTS?.CHECK_YOUR_INTERNET}
        </Typography>
        <RenderActionItem
          url={""}
          title={CONSTANTS?.REFRESH_THIS_PAGE}
          navigationType={CONSTANTS?.DIALOG}
          variant={undefined}
          isActionButtonType={false}
          onClick={clickHandler}
        />
      </ContentWrapper>
    </MainContainer>
  ) : (
    <></>
  )
}

const NoInternetConnection = (props: { children: any }) => {
  // state variable holds the state of the internet connection
  const [isOnline, setOnline] = useState(true)

  // On initization set the isOnline state.
  useEffect(() => {
    setOnline(navigator?.onLine)
  }, [])

  if (typeof window !== "undefined") {
    window?.addEventListener("online", () => {
      setOnline(true)
    })
    window?.addEventListener("offline", () => {
      setOnline(false)
    })
  }

  // if user is online, return the child component else return a custom component
  return isOnline ? props?.children : <Offline />
}

export default NoInternetConnection
