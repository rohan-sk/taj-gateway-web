import { Alert, Snackbar, Typography } from "@mui/material"
import React, { Fragment } from "react"
import { useMobileCheck } from "./isMobilView"

const SnackbarToast = ({ open, onClose, Message, SnackTop, severity="error" }: any) => {
  const isMobile = useMobileCheck()
  return (
    <Fragment >
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={4000}
        onClose={onClose}
        sx={{
          top: SnackTop || "60px !important",
          position: "fixed",
          width: "100%",
          borderRadius: "8px",
        }}>
        <Alert severity={severity} onClose={onClose}>
          <Typography variant={isMobile ? "m-body-s" : "body-s"}>
            {Message}
          </Typography>
        </Alert>
      </Snackbar>
    </Fragment>
  )
}

export default SnackbarToast
