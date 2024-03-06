import { Box, styled } from "@mui/material"

export const TitleBox = styled(Box)(() => ({
  zIndex: 1,
  position: "inherit",
  paddingTop: "5.73vw",
}))

export const TopGradientBox = styled(Box)(() => ({
  top: "0",
  width: "100%",
  height: "30%",
  position: "absolute",
  background:
    "linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(95, 95, 95, 0) 100%)",
}))

export const BottomGradientBox = styled(Box)(() => ({
  bottom: "0",
  width: "100%",
  height: "65%",
  position: "absolute",
  background:
    "linear-gradient(180deg, rgba(81, 81, 81, 0) 0%, rgba(0, 0, 0, 0.7) 77.08%)",
}))

export const DescriptionBox = styled(Box)(() => ({
  display: "flex",
  maxWidth: "90%",
  marginRight: "auto",
  flexDirection: "column",
}))

export const ActionBox = styled(Box)(() => ({
  display: "flex",
  cursor: "pointer",
  alignItems: "center",
  marginTop: "1.563vw",
}))

export const ImageBox = styled(Box)(() => ({
  width: "auto",
  height: "22.39vw",
  overflow: "hidden",
}))
export const CarousalCardContainer = styled(Box)(() => ({
  padding: "0vw 1.042vw ",
  width: "49.271vw !important",
}))

export const SecondaryActionBox = styled(Box)(() => ({
  display: "flex",
  margin: "0 auto",
  cursor: "pointer",
  paddingTop: "3.125vw",
  justifyContent: "center",
}))
export const CardContentBox = styled(Box)(() => ({
  gap: "0.6vw",
  margin: "auto",
  display: "flex",
  maxWidth: "85%",
  textAlign: "center",
  alignItems: "center",
  padding: "2.05vw 0vw",
  flexDirection: "column",
  justifyContent: "space-around",
}))
