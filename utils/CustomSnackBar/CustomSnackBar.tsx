import React from "react"
import { AlertBox, ToastText, SnackBarGrid } from "./CustomSnackStyles"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"

export const CustomSnackBar = ({
  snackBarOpen,
  setSnackBarOpen,
  snackMessage,
  topWeb = "6.250vw",
  topMob = "15vw",
  position = "fixed",
  width = "100%",
  autoHideDuration = 4000,
  closeIcon = "block",
}: any) => {
  const handleClose = () => {
    setSnackBarOpen(false)
  }
  const vertical = "top"
  const horizontal = "center"
  return (
    <SnackBarGrid
      open={snackBarOpen}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={{ vertical, horizontal }}
      $position={position}
      topWeb={topWeb}
      topMob={topMob}
      $width={width}>
      <AlertBox>
        <ToastText>{snackMessage}</ToastText>
        <CloseRoundedIcon
          onClick={handleClose}
          sx={{ cursor: "pointer", display: closeIcon }}
        />
      </AlertBox>
    </SnackBarGrid>
  )
}
