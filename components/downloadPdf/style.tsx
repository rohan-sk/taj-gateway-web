import styled from "@emotion/styled"
import { Box } from "@mui/material"

export const DownLoadButtonBoxStyled = styled(Box)(() => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: "8px",
  "@media (max-width: 640px)": {
    display: "flex",
    justifyContent: "flex-start",
  },
}))
