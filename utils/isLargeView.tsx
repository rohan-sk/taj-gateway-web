import { useMediaQuery, useTheme } from "@mui/material"

export const useIsLargeView = () => {
  const theme = useTheme()
  return useMediaQuery(theme.breakpoints.up("sm"))
}
