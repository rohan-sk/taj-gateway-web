import React, { useState } from "react";
import { useMobileCheck } from "../../../utils/isMobilView";
import {
  DateBoxRange,
  StackChild,
  StackStyle,
  DeleteModalSubTitle,
  DeleteModalTitle,
} from "../../header/styles/booking-menu";
import RenderActionItem from "../../hoc/actions/action-items-ui";
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc";
import { Box } from "@mui/system";
import { CONFIRM_DELETE_ADDRESS, CONFIRM_DELETE_ADDRESS_TEXT, CONSTANTS, ICONS } from "../../constants";
import { GoldTickCircleIcon } from "../../../utils/customIcons"

const DeleteAddressModalpopup = ({ deleteUserAddress, setOpen, open,data,clickAddressID }: any) => {
  const isMobile = useMobileCheck();
  return (
    <>
      <StackStyle $isMobile={isMobile}>
        <StackChild $isMobile={isMobile}>
          <GoldTickCircleIcon
            sx={{
              height: isMobile ? "10.938vw" : "3.646vw",
              width: isMobile ? "10.938vw" : "3.646vw",
              objectFit: "contain",
            }}
          />
          <DeleteModalTitle
            $isMobile={isMobile}
            variant={isMobile ? "m-heading-s" : "heading-s"}
          >
            {CONFIRM_DELETE_ADDRESS}
          </DeleteModalTitle>
          <DeleteModalSubTitle
            $isMobile={isMobile}
            variant={isMobile ? "m-body-ml" : "body-ml"}
          >
            {CONFIRM_DELETE_ADDRESS_TEXT}
          </DeleteModalSubTitle>
          <DateBoxRange
            sx={{ bottom: isMobile ? "35%" : "unset" }}
            $isMobile={isMobile}
          >
            <RenderActionItem
              isActionButtonType={true}
              url={""}
              title={CONSTANTS.CONFIRM_DELETE}
              onClick={() => deleteUserAddress(clickAddressID)}
              variant={"light-contained"}
              navigationType={"dialog"}
              buttonStyles={{
                minWidth: isMobile ? MobilePxToVw(321) : DesktopPxToVw(280),
              }}
            />

            <RenderActionItem
              isActionButtonType={true}
              url={""}
              title={CONSTANTS.CANCEL}
              onClick={() => setOpen(!open)}
              variant={"light-outlined"}
              navigationType={"dialog"}
              buttonStyles={{
                minWidth: isMobile ? MobilePxToVw(321) : DesktopPxToVw(280),
              }}
            />
          </DateBoxRange>
        </StackChild>
      </StackStyle>
    </>
  );
};

export default DeleteAddressModalpopup;
