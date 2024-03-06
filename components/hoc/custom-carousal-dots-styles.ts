import { Box, styled } from "@mui/material"
import { transientProps } from "../../utils/transientProps"
import { theme } from "../../lib/theme"

export const CarouselProgressiveBarStyles = styled(
  Box,
  transientProps
)<{
  $backGroundColor?: any
  $login?: boolean
  $marginTopProp?: string
  $inactiveDotWidth?: string
}>(({ $backGroundColor, $login, $marginTopProp, $inactiveDotWidth }) => ({
  "& .slick-dots": {
    position: "static",
    display: "flex !important",
    justifyContent: "center",
    marginTop: 0,
    "@media (max-width: 640px)": {
      marginTop: $login ? "0vw" : $marginTopProp ? $marginTopProp : "14.063vw",
    },
    //commenting this as of now , because it is looking odd
    // bottom: "-90px",
  },
  "& .slick-dots li": {
    margin: 0,
    width: $inactiveDotWidth ? $inactiveDotWidth : "auto",
    height: "auto",
    background: `${theme?.palette?.neuPalette?.hexSeventeen}20`,
  },

  "& .slick-dots li button": {
    opacity: 0.2,
    padding: "0vw",
    height: "0.3125vw",
    background: $backGroundColor
      ? theme?.palette?.neuPalette?.hexOne
      : theme?.palette?.neuPalette?.hexSeventeen,
  },

  "& .slick-dots li button::before": {
    content: "none",
  },

  "& .slick-dots li.slick-active button": {
    opacity: 1,
    width: "15.625vw",
    height: "0.3125vw",
    background: $backGroundColor
      ? `${theme?.palette?.neuPalette?.hexOne} !important`
      : `${theme?.palette?.neuPalette?.hexThree} !important`,
  },
}))
