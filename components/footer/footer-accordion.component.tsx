import React, { useState } from "react"
import { theme } from "../../lib/theme"
import MUIAccordion from "@mui/material/Accordion"
import { useMobileCheck } from "../../utils/isMobilView"
import { useAppNavigation } from "../../utils/NavigationUtility"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { handleFooter } from "../../utils/analytics/events/NonEcommerce/footer-event"
import { AccordionDetails, AccordionSummary, Grid, Typography } from "@mui/material"
import { AddIconStyle, RemoveIconStyle } from "../banner/guestRooms/GuestRoomStyles"
import { FooterTagLine } from "./styles"

const FooterAccordion = ({ props, dataLayer, gaStoreData, data }: any) => {
  const { items, title } = props
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()

  const [openAccordion, setOpenAccordion] = useState<boolean>(false)

  return (
    <MUIAccordion
      sx={{
        backgroundColor: `${theme?.palette?.secondary?.main} !important`,
      }}
      onClick={() => setOpenAccordion(!openAccordion)}
      disableGutters={true}
      onChange={props?.onChange}
      key={props?.key}
      square={true}
      expanded={openAccordion}
      elevation={0}>
      <AccordionSummary
        expandIcon={
          openAccordion ? (
            <RemoveIconStyle sx={{ color: theme?.palette?.ihclPalette?.hexThirtyFive }} />
          ) : (
            <AddIconStyle sx={{ color: theme?.palette?.ihclPalette?.hexThirtyFive }} />
          )
        }
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          padding: "0px",
        }}>
        <FooterTagLine
          variant={isMobile ? "m-body-s" : "heading-xxs"}
          sx={{
            color: theme?.palette?.ihclPalette?.hexThirtyFive,
          }}>
          {title || "Accordion title"}
        </FooterTagLine>
      </AccordionSummary>
      <AccordionDetails>
        <Grid
          container
          sx={{ alignItems: "flex-start" }}
          onClick={(e: any) => {
            e.stopPropagation()
          }}>
          {(items || [])?.map((item: any, index: number) => {
            return (
              <Grid
                item
                md={3}
                sm={4}
                xs={6}
                lg={3}
                key={index}
                sx={{
                  padding: isMobile ? `${MobilePxToVw(10)}!important` : `${DesktopPxToVw(10)}!important`,
                }}>
                <Typography
                  variant={isMobile ? "m-body-s" : "body-s"}
                  onClick={() => {
                    navigate(item?.url, item?.urlType),
                      handleFooter(
                        "destinationSelected",
                        item?.title,
                        item?.url,
                        dataLayer,
                        gaStoreData,
                        data?._type,
                        data?.title,
                        title,
                      )
                  }}
                  sx={{
                    color: `${theme?.palette?.ihclPalette?.hexOne} !important`,
                    cursor: "pointer",
                  }}>
                  {item?.title}
                </Typography>
              </Grid>
            )
          })}
        </Grid>
      </AccordionDetails>
    </MUIAccordion>
  )
}

export default FooterAccordion
