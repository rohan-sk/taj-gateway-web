import React, { useContext, useEffect, useState } from "react"
import { useMobileCheck } from "../../utils/isMobilView"
import { Box, Button, Typography } from "@mui/material"
import LoyaltyTabsChambersCardCarousal from "./loyalty-chambers-tabs-carousel-items"
import { theme } from "../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import LoyaltyTabsChambersCardCarousalMsite from "./loyalty-chambers-tabs-carousel-items-msite"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { PropItemsMsiteModalData } from "../hoc/CommonMsiteModalAlignment/PropItemsMsiteModalData"
import BasicModal from "../hoc/modal/modal"
import GroupWithThreeColumnCardsWithBorder from "../group/3-column-cards-with-border.component"
import { useAesthetics } from "../../utils/fetchAsthetics"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"

const LoyaltyChambersTabs = (props: any) => {
  const isMobile = useMobileCheck()
  const context = useContext(IHCLContext)
  const [selectTabIndex, setSelectTabIndex] = useState<any>(0)
  const [openModal, setOpenModal] = useState(false)
  const modalOpenHandler = () => setOpenModal(!openModal)
  const { extraData, cardBackgroundColor } = useAesthetics(props?.aesthetic?._ref)
  const tabsGradient = extraData?.[0]?.gradient
  const [tabData, setTabData] = useState<any>(props?.tabs?.[selectTabIndex]?.tabItems)

  useEffect(() => {
    setTabData(props?.tabs?.[selectTabIndex]?.tabItems)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectTabIndex])

  return (
    <>
      {isMobile ? (
        <Box sx={{ marginBottom: MobilePxToVw(55) }}>
          <Button
            variant="contained"
            onClick={modalOpenHandler}
            sx={{
              display: "flex",
              margin: "auto",
              alignItems: "center",
              justifyContent: "center",
              letterSpacing: "1.8px",
              paddingRight: `${MobilePxToVw(18)} !important`,
              ":hover": {
                backgroundColor: theme?.palette?.ihclPalette?.hexTwo,
              },
            }}>
            {props?.tabs?.[selectTabIndex]?.title}
            <ExpandMoreIcon style={{ marginLeft: MobilePxToVw(30) }} />
          </Button>
          {openModal && (
            <BasicModal
              width="100%"
              height="100%"
              open={openModal}
              bgcolor={theme.palette.background.paper}
              handleClose={modalOpenHandler}
              mobileTop={"10.625vw !important"}
              iconPosition={"absolute !important"}
              iconRight="9.375vw !important"
              Component={
                <PropItemsMsiteModalData
                  props={props?.tabs}
                  setOpenModal={setOpenModal}
                  selectedIndex={selectTabIndex}
                  setSelectedIndex={setSelectTabIndex}
                  // numberOfCards={numberOfCards}
                  // setCountToShowCards={setCountToShowCards}
                />
              }
            />
          )}
        </Box>
      ) : (
        <Box
          sx={{
            marginBottom: DesktopPxToVw(90),
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: tabsGradient,
            pb: DesktopPxToVw(30),
          }}>
          {props?.tabs?.map((tabsData: any, index: number) => (
            <Box
              key={index}
              onClick={() => setSelectTabIndex(index)}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: `${DesktopPxToVw(34)} ${DesktopPxToVw(46)}`,
                backgroundColor: selectTabIndex == index ? theme?.palette?.ihclPalette?.hexOne : "none",
                boxShadow: selectTabIndex == index ? "-6px 10px 24px 0px rgba(0, 0, 0, 0.10)" : "none",
              }}>
              {tabsData?.title && (
                <Typography
                  variant={isMobile ? "m-heading-xs" : "heading-xs"}
                  sx={{
                    cursor: "pointer",
                    color: selectTabIndex == index ? theme?.palette?.ihclPalette?.hexTwo : "inherit",
                  }}>
                  {tabsData?.title}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      )}
      {tabData?.map((card: any, index: number) => {
        return (
          <>
            {context?.renderComponent(card._type, {
              ...card,
            })}
          </>
        )
      })}
    </>
  )
}

export default LoyaltyChambersTabs
