import { Box, styled } from "@mui/material"
import { transientProps } from "../../../utils/transientProps"
import { theme } from "../../../lib/theme"

export const MobileCarousalStylesWrapper = styled(
  Box,
  transientProps
)<{ $inactiveDotWidth: string; $backGroundColor: any }>(
  ({ $inactiveDotWidth, $backGroundColor }) => ({
    "@media (max-width:640px)": {
      "& .slick-dots": {
        position: "static",
        bottom: "0",
        display: "flex",
        alignItems: "center",
        "& button": {
          width: "100%",
          height: "0.3125vw",
          background: `${theme?.palette?.neuPalette?.hexSeventeen}20`,
        },
        "& li": {
          margin: "0vw",
          width: `${$inactiveDotWidth} !important`,
          background: `${theme?.palette?.neuPalette?.hexSeventeen}20`,
        },
        "& .slick-active": {
          width: "12.5vw !important",
          borderRadius: "10px",
          "& button": {
            background: `${
              $backGroundColor
                ? $backGroundColor === theme?.palette?.neuPalette?.hexEleven
                  ? theme?.palette?.neuPalette?.hexOne
                  : theme?.palette?.neuPalette?.hexSeventeen
                : theme?.palette?.neuPalette?.hexFive
            } !important`,
          },
        },
      },
    },
  })
)
