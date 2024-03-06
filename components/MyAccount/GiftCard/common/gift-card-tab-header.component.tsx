import { Typography } from "@mui/material"
import DesktopPxToVw from "../../../../utils/DesktopFontCalc"
import { useMobileCheck } from "../../../../utils/isMobilView"
import { GiftCardTabHeaderComponent } from "../gift-card-box.types"
import { HeaderBox } from "./styles"

const GiftCardTabHeaderComponent = ({
  label,
  value,
}: GiftCardTabHeaderComponent) => {
  const isMobile = useMobileCheck()
  return (
    <HeaderBox $isMobile={isMobile}>
      <Typography
        sx={{ fontSize: DesktopPxToVw(18) }}>{`${label} :`}</Typography>
      <Typography sx={{ fontSize: DesktopPxToVw(24) }}>
        <b>{value}</b>
      </Typography>
    </HeaderBox>
  )
}

export default GiftCardTabHeaderComponent
