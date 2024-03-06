import styled from "@emotion/styled"
import { theme } from "../../../lib/theme"
import Checkbox from "@mui/material/Checkbox"
import { transientProps } from "../../../utils/transientProps"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const StyledCheckBox = styled(
  Checkbox,
  transientProps,
)<{ $withBorder: boolean; $marginRight: any; $isDisableChecked: boolean }>(
  ({ $withBorder, $marginRight, $isDisableChecked }) => ({
    padding: "0.2vw",
    borderRadius: "0%",
    width: DesktopPxToVw(40),
    height: DesktopPxToVw(40),
    marginRight: $marginRight ? $marginRight : "1.042vw",
    border: $withBorder
      ? $isDisableChecked
        ? `1px solid ${theme?.palette?.ihclPalette?.hexTwelve}`
        : `1px solid ${theme?.palette?.ihclPalette?.hexTwo}`
      : "",

    "@media (max-width: 640px)": {
      padding: "0.625vw",
      width: MobilePxToVw(40),
      height: MobilePxToVw(40),
    },
  }),
)
