import React, { useState } from "react"
import { theme } from "../../../lib/theme"
import { Add, Remove } from "@mui/icons-material"
import { useMobileCheck } from "../../../utils/isMobilView"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { PortableText } from "../../../lib/portable-text-serializers"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { Box, Divider, Typography, Accordion, AccordionDetails, AccordionSummary } from "@mui/material"

const PayAtHotelFaqs = (props: any) => {
  const isMobile = useMobileCheck()

  const [expanded, setExpanded] = useState<boolean>(false)
  const [selectedIndex, setSelectedIndex] = useState<number>(-1)

  const handleAccordion = () => {
    setExpanded(!expanded)
  }

  return (
    <Box aria-label="PayAtHotelFaqs">
      <Accordion
        square={true}
        elevation={0}
        disableGutters
        expanded={expanded}
        onChange={handleAccordion}
        sx={{ background: theme?.palette?.background.default }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            padding: 0,
            alignItems: "center",
            gap: "5px",
            minHeight: 0,
            margin: isMobile
              ? `${MobilePxToVw(50)} ${MobilePxToVw(0)} ${MobilePxToVw(30)}`
              : `${DesktopPxToVw(50)} ${DesktopPxToVw(0)} ${DesktopPxToVw(20)}`,
            "& .MuiAccordionSummary-content": {
              margin: 0,
              flexGrow: isMobile ? "1" : "inherit",
            },
          }}>
          <Typography variant={isMobile ? "m-heading-xs" : "heading-xs"}>{props?.[0]?.title}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 0 }}>
          {props?.[0]?.items?.map((item: any, index: number) => (
            <>
              <Accordion
                key={index}
                disableGutters={true}
                square={true}
                elevation={0}
                expanded={selectedIndex === index}
                sx={{
                  background: theme?.palette?.background.default,
                  "&.MuiPaper-root.MuiAccordion-root:before": {
                    height: 0,
                  },
                }}>
                <AccordionSummary
                  onClick={() => {
                    setSelectedIndex(index === selectedIndex ? -1 : index)
                  }}
                  expandIcon={selectedIndex === index ? <Remove /> : <Add />}
                  sx={{
                    minHeight: 0,
                    padding: isMobile
                      ? `${MobilePxToVw(32)} ${MobilePxToVw(0)} ${MobilePxToVw(25)}`
                      : `${DesktopPxToVw(32)} ${DesktopPxToVw(20)} ${DesktopPxToVw(25)}`,
                    "& .MuiAccordionSummary-content": {
                      margin: 0,
                    },
                  }}>
                  <Typography
                    variant={isMobile ? "m-heading-xxs" : "heading-xs"}
                    sx={{
                      fontSize: isMobile ? `${MobilePxToVw(20)}` : `${DesktopPxToVw(20)}`,
                    }}>
                    {item?.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    padding: isMobile
                      ? `${MobilePxToVw(14)} ${MobilePxToVw(20)} ${MobilePxToVw(40)}`
                      : `${DesktopPxToVw(14)} ${DesktopPxToVw(20)} ${DesktopPxToVw(40)}`,
                  }}>
                  <PortableText blocks={item?.answer} />
                </AccordionDetails>
              </Accordion>
              <Divider
                sx={{
                  height: DesktopPxToVw(1),
                  m: `${DesktopPxToVw(0)} ${DesktopPxToVw(20)}`,
                  background: theme?.palette?.ihclPalette?.hexSixteen,
                }}
              />
            </>
          ))}
          {props?.[0]?.content && (
            <Box
              sx={{
                padding: isMobile
                  ? `${MobilePxToVw(32)} ${MobilePxToVw(0)} ${MobilePxToVw(25)}`
                  : `${DesktopPxToVw(32)} ${DesktopPxToVw(20)} ${DesktopPxToVw(25)}`,
              }}>
              <PortableText blocks={props?.[0]?.content} />
            </Box>
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default PayAtHotelFaqs
