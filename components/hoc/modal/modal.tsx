import React, { useEffect } from "react"
import { useRouter } from "next/router"
import { theme } from "../../../lib/theme"
import { ROUTES } from "../../../utils/routes"
import { CONSTANTS, ICONS } from "../../constants"
import { Box, Modal, Typography } from "@mui/material"
import { useMobileCheck } from "../../../utils/isMobilView"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { LogoBox, MainBox, InnerBox, CloseButtonBox } from "./styles"
import { useBrowserCheck } from "../../../utils/hooks/useBrowserCheck"

const BasicModal = ({
  top,
  left,
  open,
  width,
  height,
  bgcolor,
  Component,
  handleClose,
  overflowData,
  showLogo = false,
  tajLogoTop = "32px",
  ModalCloseButtonColor,
  ModalCloseButtonStyles,
  ModalCloseButtonDisplay,
  ModalCloseIconHeight,
  ModalCloseIconWidth,
  isMsiteCloseIconVisible = true,
  iconPosition,
  mobileTop,
  iconRight,
  mobileJustifyContent,
  mobileColor,
  mobileMargin,
  isDesktopInnerContentCenterAligned = true,
  CloseIcon,
  webCloseIcon,
  mSiteCloseStyles,
  hideScrollBar = false,
  msiteCloseIconStyles,
  tajLogoBottom,
}: any) => {
  const router = useRouter()
  const isMobile = useMobileCheck()
  const isMyAccountCheck = router?.asPath?.includes("my-account")

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <MainBox
          sx={{
            top: top,
            left: left,
            width: width,
            height: height,
            overflowY: overflowData,
            backdropFilter: `blur("5px")`,
            bgcolor: isMobile
              ? bgcolor || theme.palette.neuPalette.hexOne
              : bgcolor || "rgba(19, 19, 15, 0.50)",
            "::-webkit-scrollbar": {
              width: DesktopPxToVw(6),
              display: hideScrollBar ? "none" : "initial",
            },
            "@media (max-width: 640px)": {
              "::-webkit-scrollbar": {
                width: MobilePxToVw(6),
                display: hideScrollBar ? "none" : "initial",
              },
            },
            "::-webkit-scrollbar-thumb": {
              backgroundColor: theme?.palette?.neuPalette?.hexSeven,
              border: "1px solid transparent",
              borderRadius: "30%",
            },
          }}>
          <InnerBox
            sx={{
              justifyContent:
                isMobile && mobileJustifyContent
                  ? mobileJustifyContent
                  : !isMobile && isDesktopInnerContentCenterAligned
                  ? "center"
                  : "start",
            }}>
            {isMobile ? (
              <>
                {isMsiteCloseIconVisible && (
                  <LogoBox
                    sx={{
                      justifyContent: showLogo ? "space-between" : "flex-end",
                      ...mSiteCloseStyles,
                    }}
                    $isMyAccountCheck={isMyAccountCheck}>
                    {showLogo && (
                      <Box
                        sx={{
                          position: "relative",
                          top: tajLogoTop
                            ? isMyAccountCheck
                              ? MobilePxToVw(2)
                              : tajLogoTop
                            : "unset",
                          bottom: tajLogoBottom ? tajLogoBottom : "unset",
                        }}
                        alt={`-taj-logo`}
                        component={"img"}
                        width={"16.719vw"}
                        height={"14.766vw"}
                        src={ICONS?.TAJ_GOLD_LOGO}
                        onClick={() => {
                          router?.push(ROUTES?.WITHOUTSEO_FOR_ROUTING?.HOMEPAGE)
                          handleClose()
                        }}
                      />
                    )}
                    <Box
                      alt={`close-gold`}
                      component={"img"}
                      src={CloseIcon ? CloseIcon : ICONS?.CLOSE_BLACK_ICON}
                      sx={{
                        color: mobileColor
                          ? mobileColor
                          : theme?.palette?.neuPalette?.hexTwo,
                        position: iconPosition ? iconPosition : "",
                        top: mobileTop ? mobileTop : "",
                        right: iconRight ? iconRight : "",
                        margin: mobileMargin ? mobileMargin : "",
                        width: "6.406vw",
                        height: "6.1vw",
                        ...msiteCloseIconStyles,
                      }}
                      onClick={() => {
                        handleClose()
                      }}
                    />
                  </LogoBox>
                )}
              </>
            ) : (
              <CloseButtonBox style={{ ...ModalCloseButtonStyles }}>
                <Typography
                  variant="body-s"
                  sx={{
                    cursor: "pointer",
                    fontWeight: "700",
                    color:
                      ModalCloseButtonColor ?? theme?.palette?.primary?.main,
                    display: ModalCloseButtonDisplay ?? "flex",
                  }}
                  onClick={() => {
                    handleClose()
                  }}>
                  {CONSTANTS?.CLOSE}
                </Typography>
                <Box
                  onClick={() => {
                    handleClose()
                  }}
                  component="img"
                  src={webCloseIcon ? webCloseIcon : ICONS?.CLOSE_GOLD_ICON}
                  sx={{
                    cursor: "pointer",
                    marginLeft: "1.016vw",
                    height: ModalCloseIconHeight ?? "0.938vw",
                    width: ModalCloseIconWidth ?? "0.938vw",
                    color:
                      ModalCloseButtonColor ?? theme?.palette?.primary?.main,
                    filter:
                      ModalCloseButtonColor ===
                      theme?.palette?.background?.paper
                        ? "filter: grayscale(10%) brightness(200%);"
                        : "unset",
                  }}
                />
              </CloseButtonBox>
            )}
            {Component}
          </InnerBox>
        </MainBox>
      </Modal>
    </Box>
  )
}
export default BasicModal
