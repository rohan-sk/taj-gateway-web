import { styled, TextField } from "@mui/material"
import { theme } from "../../../lib/theme"

export const StyledField = styled(TextField)(() => ({
  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: theme?.palette?.primary?.main,
      opacity: 1,
      fontSize: "1.25vw",
      "@media (max-width: 640px)": {
        fontSize: "3.17vw",
      },
    },
  },
}))
