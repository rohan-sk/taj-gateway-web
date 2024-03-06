import styled from "@emotion/styled"
import { theme } from "../../../../lib/theme"
import { Box, Divider, Grid, Stack, Typography } from "@mui/material"
import { SquareSharp, StarRate } from "@mui/icons-material"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { transientProps } from "../../../../utils/transientProps"

export const ScrollerBox = styled(Box)(() => ({
  overflowY: "scroll",
  flexDirection: "column",
  height: MobilePxToVw(896),
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme?.palette?.neuPalette?.hexSeven,
    borderRadius: MobilePxToVw(6),
  },
  "&::-webkit-scrollbar": {
    width: MobilePxToVw(2),
  },
}))

export const MainContainer = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  padding: $isMobile ? `0vw ${MobilePxToVw(82)}` : `${DesktopPxToVw(47)} ${DesktopPxToVw(40)} 0vw`,
}))

export const SpecificationsWrapperContainer = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  alignItems: $isMobile ? "flex-start" : "center",
  flexDirection: $isMobile ? "column" : "row",
  gap: $isMobile ? MobilePxToVw(31) : DesktopPxToVw(40),
}))

export const SpecificationsHorizontalDivider = styled(Divider)(() => ({
  opacity: 0.2,
  margin: `${DesktopPxToVw(18)} 0vw ${DesktopPxToVw(25)}`,
  backgroundColor: theme?.palette?.neuPalette?.hexSeventeen,
}))
export const StyledHorizontalDivider = styled(Divider)(() => ({
  width: '100%',
  backgroundColor: `${theme?.palette?.neuPalette?.hexSeventeen}20`,
}))

export const AmenitiesTitleTypography = styled(Typography)(() => ({
  opacity: 0.5,
  fontWeight: 700,
  color: theme?.palette?.neuPalette?.hexEleven,
}))

export const AmenitiesHorizontalDivider = styled(Divider)(() => ({
  opacity: 0.2,
  marginTop: DesktopPxToVw(25),
  backgroundColor: theme?.palette?.neuPalette?.hexSeventeen,
}))

export const AmenitiesWrapperContainer = styled(Box)(() => ({
  display: "flex",
  overflowY: "auto",
  gap: DesktopPxToVw(23),
  flexDirection: "column",
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme?.palette?.neuPalette?.hexSeven,
    borderRadius: DesktopPxToVw(6),
  },
  "&::-webkit-scrollbar": {
    width: DesktopPxToVw(5),
  },

}))

export const HighlightsWrapperContainer = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  gap: $isMobile ? MobilePxToVw(13) : DesktopPxToVw(16),
}))

export const HighlightsStarRate = styled(
  StarRate,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  width: $isMobile ? MobilePxToVw(21) : DesktopPxToVw(17),
  height: $isMobile ? MobilePxToVw(21) : DesktopPxToVw(17),
  color: theme?.palette?.neuPalette?.hexTwo,
}))

export const CategoryItemsWrapperContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  gap: DesktopPxToVw(10),
}))

export const IconsStack = styled(Stack)(() => ({
  minHeight: DesktopPxToVw(22),
  alignItems: "center",
  justifyContent: "center",
  '@media (max-width:640px)': {
    minHeight: MobilePxToVw(24),

  }
}))

export const CategoryItemsSquareSharp = styled(SquareSharp)(() => ({
  width: DesktopPxToVw(10),
  height: DesktopPxToVw(10),
  transform: "rotate(45deg)",
  color: theme?.palette?.neuPalette?.hexTwo,
}))

export const SpecificationsItemsWrapperContainer = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: $isMobile ? MobilePxToVw(15) : DesktopPxToVw(15),
}))

export const ActionButtonWrapperContainer = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: $isMobile ? "flex-end" : "flex-start",
  marginTop: $isMobile ? "0.8vw" : DesktopPxToVw(30),
  padding: $isMobile ? `5.5vw ${MobilePxToVw(75)}` : `0vw ${MobilePxToVw(14)}`,
  marginBottom: $isMobile ? "0.688vw" : "0vw",
  "@media (max-width: 600px)": {
    position: "absolute",
    bottom: MobilePxToVw(0),
    right: "0vw",
    backgroundColor: "#ffff",
    width: "100%",
  },
}))

export const AminitiesMobileview = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: MobilePxToVw(18),
}))

export const AminitiesViewMore = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}))

export const AminitiesTitle = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: MobilePxToVw(16),
}))

export const AminitiesMainGrid = styled(Grid)(() => ({
  marginTop: MobilePxToVw(35),
  padding: `0 ${MobilePxToVw(2)}`,
}))

export const StyledDivider = styled(Divider)(() => ({
  width: "100%",
  height: MobilePxToVw(1),
  borderColor: `${theme?.palette?.text?.primary}20`,
}))

export const ModalScrollContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: "column",
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme?.palette?.neuPalette?.hexSeven,
    borderRadius: MobilePxToVw(6),
  },
  "&::-webkit-scrollbar": {
    width: MobilePxToVw(2),
  },

}))
export const DescriptionContainer = styled(Box)(() => ({
  maxHeight: DesktopPxToVw(80),
  overflowY: "auto",
  '@media (max-width:640px)': {
    maxHeight: 'unset',
    overflowY: "auto"
  }
}))
export const ActionItemsContainer = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: $isMobile ? `${MobilePxToVw(30)} ${MobilePxToVw(81)}` : "",
  justifyContent: $isMobile ? "flex-end" : "flex-start",
  marginTop: $isMobile ? "0.8vw" : DesktopPxToVw(30),
  marginBottom: $isMobile ? "0.688vw" : "0vw",
  "@media (max-width: 600px)": {
    backgroundColor: "#ffff",
    width: "100%",
  },
}))
export const RoomDetailsMainContainer = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  padding: $isMobile ? `0vw   ` : `${DesktopPxToVw(47)} ${DesktopPxToVw(40)} ${DesktopPxToVw(40)}`,

}))
