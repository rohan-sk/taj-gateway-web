import React, { } from "react"
import { useMobileCheck } from "../../../utils/isMobilView"
import dynamic from "next/dynamic"
import { Typography, Stack, Box } from "@mui/material"
const RenderActionItem = dynamic(() => import("../../../components/hoc/actions/action-items-ui"))
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { ContentWrapper } from "./styles/BookingConfirmedRoomDetails"

const BookingModalContent = (props: any) => {
  const { title, description, ctaTitle, clickHandler, icon } = props
  const isMobile = useMobileCheck()

  return (
    <ContentWrapper $isMobile={isMobile}>
      <Stack
        alignItems={"center"}
        flexDirection={"column"}
        rowGap={isMobile ? MobilePxToVw(40) : DesktopPxToVw(40)}>
        {icon && <Box loading="lazy" component="img" src={icon} alt="No Internet" />}
        {title && (
          <Typography
            maxWidth={isMobile ? MobilePxToVw(446) : DesktopPxToVw(637)}
            variant={isMobile ? "m-heading-s" : "heading-s"}
            sx={{
              textAlign: "center",
            }}>
            {title}
          </Typography>
        )}
        {description && (
          <Typography
            maxWidth={isMobile ? MobilePxToVw(470) : DesktopPxToVw(488)}
            variant={isMobile ? "m-body-sl" : "body-ml"}
            sx={{
              textAlign: "center",
            }}>
            {description}
          </Typography>
        )}
        {ctaTitle && (
          <RenderActionItem
            url={""}
            title={ctaTitle}
            navigationType={props?.ctaType}
            variant={"light-contained"}
            isActionButtonType={true}
            onClick={clickHandler}
          />
        )}
      </Stack>
    </ContentWrapper>
  )
}

export default BookingModalContent
