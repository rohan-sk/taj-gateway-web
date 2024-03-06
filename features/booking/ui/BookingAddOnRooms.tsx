import React from "react"
import { theme } from "../../../lib/theme"
import dynamic from "next/dynamic"
import { CONSTANTS } from "../../../components/constants"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
const BookingAddOnInnerRooms = dynamic(() => import("./BookingAddOnInnerRooms"))
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material"
import {
  AddonsTitleText,
  AddOnsContentWrapper,
} from "../../../components/BookingFlow/styles/BookingAddOnStyles"

const BookingAddOnRooms = () => {
  const [expanded, setExpanded] = React.useState<string | boolean>(false)

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <AddOnsContentWrapper>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        sx={{
          boxShadow: "none",
          backgroundColor: theme?.palette?.neuPalette?.hexOne,
        }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: theme?.palette?.neuPalette?.hexSeventeen,fontSize:'20px' }} />}
          id="panel1bh-header"
          aria-controls="panel1bh-content">
          <AddonsTitleText>{CONSTANTS?.ACCORDION_TITLE_TEXT}</AddonsTitleText>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: "0vw auto" }}>
          <BookingAddOnInnerRooms />
        </AccordionDetails>
      </Accordion>
    </AddOnsContentWrapper>
  )
}

export default BookingAddOnRooms
