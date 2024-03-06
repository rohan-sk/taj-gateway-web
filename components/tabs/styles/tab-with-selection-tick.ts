import { Box, styled, Stack } from "@mui/material"
import { transientProps } from "../../../utils/transientProps"

export const ParentStack = styled(
  Stack,
  transientProps
)<{ $isConfirmBooking: boolean }>(({ $isConfirmBooking }) => ({
  gap: "1.042vw",
  flexDirection: "row",
  marginTop: $isConfirmBooking ? 0 : "3.125vw",
  "@media (max-width: 640px)": {
    gap: "3.125vw",
    margin: $isConfirmBooking ? 0 : "14.063vw 7.813vw 6.250vw 7.813vw",
  },
}))

export const TickImage: any = styled(Box)(() => ({
  width: "1.563vw",
  height: "1.563vw",

  "@media (max-width: 640px)": {
    width: "4.688vw",
    height: "4.688vw",
  },
}))
