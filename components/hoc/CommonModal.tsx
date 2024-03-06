import React from "react";
import { Box, Modal } from "@mui/material";
import { TypographyModalClose, MainBox } from "./carousal-component-styles";
import CloseIcon from '@mui/icons-material/Close';

const CommonModal = ({
  top,
  left,
  height,
  width,
  Component,
  handleClose,
  open,
  backgroundColor,
  overflowData,
  iconRight = "9.37vw",
  iconTop = "10.63vw",
  display = "",
  alignItems = "",
  justifyContent = "",
}: any) => {
  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MainBox
          sx={{
            outline: "none !important",
            position: "absolute",
            top: top,
            left: left,
            width: width,
            height: height,
            bgcolor: backgroundColor,
            overflowY: overflowData,
            display: display,
            alignItems: alignItems,
            justifyContent: justifyContent,
          }}
        >
          <TypographyModalClose
            $iconRight={iconRight}
            $iconTop={iconTop}
            onClick={() => {
              handleClose();
            }}
          ><CloseIcon />
          </TypographyModalClose>
          {Component}
        </MainBox>
      </Modal>
    </Box>
  );
};
export default CommonModal;
