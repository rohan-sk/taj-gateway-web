import { AccordionDetails, AccordionSummary, Box } from "@mui/material"
import React, { useState } from "react"
import { AccordionTitle, StyledAccordion } from "../accordion/styles"
import { MinusIcon, PlusIcon } from "../../utils/customIcons"
import { useMobileCheck } from "../../utils/isMobilView"
import SiteMapAccordianDetailsList from "./sitemap-accordian-details-list.component"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"

const SiteMapAccordianComponent = (props: any) => {
  const [openAccordion, setOpenAccordion] = useState<boolean>(false)
  const isMobile = useMobileCheck()

  return (
    <Box p={`${DesktopPxToVw(0)} ${DesktopPxToVw(240)}`}>
      <StyledAccordion
        onClick={() => setOpenAccordion(!openAccordion)}
        disableGutters={true}
        expanded={openAccordion}
        key={props?.key}
        square={true}
        elevation={0}>
        <AccordionSummary
          expandIcon={
            openAccordion ? (
              <MinusIcon
                sx={{
                  height: "auto",
                  width: isMobile ? MobilePxToVw(20) : DesktopPxToVw(20),
                }}
              />
            ) : (
              <PlusIcon
                sx={{
                  width: isMobile ? MobilePxToVw(20) : DesktopPxToVw(20),
                  height: "auto",
                }}
              />
            )
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            bgcolor: props?.headerColor || "background.paper",
            padding: "0px",
          }}>
          <AccordionTitle variant={isMobile ? "m-heading-xs" : "heading-xs"}>
            {props?.title || "Accordion title"}
          </AccordionTitle>
        </AccordionSummary>
        <AccordionDetails>
          {props && <SiteMapAccordianDetailsList data={props} />}
        </AccordionDetails>
      </StyledAccordion>
    </Box>
  )
}

export default SiteMapAccordianComponent
