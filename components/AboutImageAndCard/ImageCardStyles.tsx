import styled from "@emotion/styled"
import { Divider } from "@mui/material"
import { Box } from "@mui/system"

export const ImageCardContainer = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "auto auto",
  position: "relative",
  marginTop: "10%",
}))
export const DividerStyle = styled(Divider)(() => ({
  width: "40px",
  height: "1px",
  backgroundColor: "#45443F",
  display: "inline-block",
  position: "relative",
  bottom: 16,
}))

export const DescriptionContainer = styled(Box)(({ idx }: any) => ({
  width: "50%",
  height: "400px",
  display: "flex",
  boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
  right: idx ? "" : "0%",
  top: idx ? "-15%" : "20%",
  backgroundColor: "#fff",
  position: "absolute",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  padding: "0px 70px",
  gap: 20,
}))
