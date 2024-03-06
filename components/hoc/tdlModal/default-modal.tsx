import { Box } from "@mui/material"
import { Fragment, Key, useContext } from "react"
import MUIModal from "@mui/material/Modal"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import ModalStore from "../../../store/global/modal.store"
import { useMobileCheck } from "../../../utils/isMobilView"
import { ModalCloseIcon } from "../../../utils/customIcons"

export const DIALOG_SIZE: any = {
  ALERT: {
    small: "40vh",
    medium: "70vh",
    large: "90vh",
  },
  BOTTOM_SHEET: {
    small: "70%",
    medium: "50%",
    large: "20%",
  },
  DEFAULT: {
    small: "40vh",
    medium: "70vh",
    large: "90vh",
  },
}

const DefaultModal = (props: any) => {
  const context = useContext(IHCLContext)
  const modalStore = ModalStore.getInstance()
  const isMobile = useMobileCheck()

  const style = {
    width: isMobile ? "100%" : "40%",
    bgcolor: "background.paper",
    boxShadow: 24,
    overflow: "hidden",
    height: isMobile
      ? "100%"
      : DIALOG_SIZE.DEFAULT[props.dialogSize] || "unset",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  }
  const modalBodyStyles = {
    padding: isMobile ? "0" : 2,
    flexDirection: "column",
    display: "flex",
    justifyContent: "center",
    height: "100%",
  }
  const modalButtonStyles = {
    position: "absolute",
    top: "40px",
    right: "40px",
  }
  const handleClose = () => {
    modalStore?.closeModal()
  }

  return (
    <MUIModal
      onClose={handleClose}
      aria-labelledby={props?.title}
      aria-describedby={props?.description}
      open={props?.visibility}>
      <Box sx={style}>
        <Box sx={modalBodyStyles}>
          <Box sx={modalButtonStyles} onClick={() => handleClose()}>
            <ModalCloseIcon sx={{ width: "20px" }} />
          </Box>

          {(props?.items || []).map(
            (item: { _type: string }, index: Key | null | undefined) => {
              return (
                <Fragment key={index}>
                  {context?.renderComponent(
                    item?._type,
                    { ...item, styles: { marginTop: "10px" } },
                    {}
                  )}
                </Fragment>
              )
            }
          )}
        </Box>
      </Box>
    </MUIModal>
  )
}

export default DefaultModal
