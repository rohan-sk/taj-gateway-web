import { Grid, styled } from "@mui/material"
import { theme } from "../../../lib/theme"

export const FormGridContainer = styled(Grid)(() => ({
  margin: "2vw 12vw",
  padding: "3.06vw 6.4vw",
  backgroundColor: theme?.palette?.background?.default,
  width: "75vw",
  overflowY: "auto",
  "@media (max-width:640px)": {
    backgroundColor: theme?.palette?.background?.paper,
    margin: "0 auto",
    padding: "0",
    width: "100vw",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
}))
