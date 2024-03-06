import { theme } from "../../../lib/theme"
import { Box, styled } from "@mui/material"
import { transientProps } from "../../../utils/transientProps"

export const MobileCarousalStylesWrapper = styled(
  Box,
  transientProps,
)<{ $inactiveDotWidth: string; $backGroundColor?: any }>(({ $inactiveDotWidth, $backGroundColor }) => ({
  "@media (max-width:640px)": {
    "& .slick-dots": {
      position: "static",
      bottom: "0",
      display: "flex",
      alignItems: "center",
      "& button": {
        width: "100%",
        height: "0.3125vw",
        background: `${theme?.palette?.ihclPalette?.hexSeventeen}20`,
      },
      "& li": {
        margin: "0vw",
        width: `${$inactiveDotWidth} !important`,
        background: `${theme?.palette?.ihclPalette?.hexSeventeen}20`,
      },
      "& .slick-active": {
        width: "12.5vw !important",
        borderRadius: "10px",
        "& button": {
          background: `${
            $backGroundColor
              ? $backGroundColor === theme?.palette?.ihclPalette?.hexEleven ||
                $backGroundColor === theme?.palette?.ihclPalette?.hexFour ||
                $backGroundColor === theme?.palette?.ihclPalette?.hexThree?.toLowerCase()
                ? theme?.palette?.ihclPalette?.hexOne
                : theme?.palette?.ihclPalette?.hexSeventeen
              : theme?.palette?.ihclPalette?.hexFive
          } !important`,
        },
      },
    },
  },
}))
export const LoginWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  "@media (max-width: 640px)": {
    margin: "8.594vw 12.813vw",
    padding: "7.81vw 4.68vw",
    border: `1px solid ${theme?.palette?.ihclPalette?.hexTwo}`,
  },
}))
