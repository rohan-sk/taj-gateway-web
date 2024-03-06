import styled from "@emotion/styled"
import { Box } from "@mui/material"

export const SocialIconBox = styled(Box)(() => ({
  top: "0.88vw",
  right: "0.88vw",
  width: "1.145vw",
  height: "1.145vw",
  position: "absolute",
  "@media (max-width: 641px)": {
    top: "2.4vw",
    right: "2.4vw",
    width: "3.43vw",
    height: "3.28vw",
  },
}))
