import React, { useContext } from "react"
import { useRouter } from "next/router"
import { theme } from "../../../lib/theme"
import { observer } from "mobx-react-lite"
import { Box, Button } from "@mui/material"
import { ROUTES } from "../../../utils/routes"
import { GLOBAL_STORES } from "../../../utils/Constants"
import { useMobileCheck } from "../../../utils/isMobilView"
import BookingFlowGlobalStore from "../store/globalStore/booking.flow.store"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { CONSTANTS } from "../../../components/constants"

const ContinueToConfirm = (props: any) => {
  const router = useRouter()
  const isMobile = useMobileCheck()
  const context: any = useContext(IHCLContext)

  const { orderDetails, userEnteredPromoCode } = context?.getGlobalStore(
    GLOBAL_STORES?.bookingFlowStore
  ) as BookingFlowGlobalStore
  const isCorporate = userEnteredPromoCode?.title?.toLowerCase()?.includes("corporate")

  return (
    <Box
      aria-label="ContinueToConfirm"
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: isMobile ? MobilePxToVw(40) : DesktopPxToVw(30),
        border: isCorporate ? "unset" : `1px solid ${theme?.palette?.neuPalette?.hexSixteen}`,
        margin: isMobile ? MobilePxToVw(30) : `${DesktopPxToVw(30)} 0 0 0`,
      }}>
      <Button
        variant={props?.primaryAction?.variant ?? "light-contained"}
        onClick={() => {
          router?.push(`${global?.window?.location?.origin}${ROUTES?.BOOKING?.CONFIRMED_PAGE}`)
        }}>
        {isCorporate ? CONSTANTS?.CONFIRM_BOOKING : props?.primaryAction?.title}
      </Button>
    </Box>
  )
}

export default observer(ContinueToConfirm)
