import React, { useState } from "react"
import { theme } from "../../../lib/theme"
import AddIcon from "@mui/icons-material/Add"
import { AccordionSummary } from "@mui/material"
import RemoveIcon from "@mui/icons-material/Remove"
import { CONSTANTS } from "../../../components/constants"
import DesktopPxToVw from "../../../utils/DesktopFontCalc"
import innerRoomData from "../../../components/BookingFlow/Json/BookingAddOnInnerRoomJson.json"
import {
  LoadMoreActionBox,
  StyledExpandMoreIcon,
} from "../../../components/group/styles/common-styled-components"
import {
  InnerRoomAccordion,
  InnerRoomSubItemBox,
  InnerRoomAccordionTitle,
  InnerRoomSubItemsButton,
  InnerRoomAccordionDetails,
  EachRoomDescriptionWrapper,
  EachRoomDescriptionItemTitle,
  EachRoomDescriptionItemPrice,
  CheckBoxAndDescriptionWrapper,
  EachRoomDescriptionItemButton,
  EachRoomDescriptionItemCheckbox,
  EachRoomDescriptionItemDescription,
} from "../../../components/BookingFlow/styles/BookingAddOnStyles"

const BookingAddOnInnerRooms = () => {
  const numberOfItems = CONSTANTS?.THREE
  const iconColor = theme?.palette?.neuPalette?.hexSeventeen
  const [itemsToShow, setItemsToShow] = useState<number>(numberOfItems)
  const [expanded, setExpanded] = React.useState<number | false>(false)

  const handleChange = (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
    setItemsToShow(numberOfItems)
  }

  return (
    <>
      {innerRoomData?.innerItems?.map((innerRoomData: any, index: number) => (
        <>
          <InnerRoomAccordion expanded={expanded === index} onChange={handleChange(index)}>
            <AccordionSummary
              expandIcon={
                expanded === index ? (
                  <RemoveIcon sx={{ color: iconColor,fontSize:'20px' }} />
                ) : (
                  <AddIcon sx={{ color: iconColor,fontSize:'20px' }} />
                )
              }>
              <InnerRoomAccordionTitle>
                {innerRoomData?.title} {innerRoomData?.roomNumber}
              </InnerRoomAccordionTitle>
            </AccordionSummary>
            <InnerRoomAccordionDetails>
              {innerRoomData?.roomDescription
                ?.slice(0, itemsToShow)
                ?.map((allInnerItems: any, idx: number) => (
                  <InnerRoomSubItemBox
                    key={idx}
                    sx={{
                      marginTop: idx == 0 ? "auto" : DesktopPxToVw(21),
                    }}>
                    <CheckBoxAndDescriptionWrapper>
                      <EachRoomDescriptionItemCheckbox />
                      <EachRoomDescriptionWrapper>
                        <EachRoomDescriptionItemTitle>
                          {allInnerItems?.title}
                        </EachRoomDescriptionItemTitle>
                        <EachRoomDescriptionItemDescription>
                          {allInnerItems?.description}
                        </EachRoomDescriptionItemDescription>
                        <EachRoomDescriptionItemButton>
                          {allInnerItems?.viewDetailsButton}
                        </EachRoomDescriptionItemButton>
                      </EachRoomDescriptionWrapper>
                    </CheckBoxAndDescriptionWrapper>
                    <EachRoomDescriptionItemPrice>
                      ₹ {allInnerItems?.roomAmount}
                    </EachRoomDescriptionItemPrice>
                  </InnerRoomSubItemBox>
                ))}
              {innerRoomData?.roomDescription?.length != itemsToShow && (
                <LoadMoreActionBox
                  onClick={() => setItemsToShow(innerRoomData?.roomDescription?.length)}>
                  <InnerRoomSubItemsButton
                    variant="link-m"
                    sx={{
                      display: innerRoomData?.roomDescription?.length > 3 ? "block" : "none",
                    }}>
                    {CONSTANTS?.LOAD_MORE}
                    <StyledExpandMoreIcon />
                  </InnerRoomSubItemsButton>
                </LoadMoreActionBox>
              )}
            </InnerRoomAccordionDetails>
          </InnerRoomAccordion>
        </>
      ))}
    </>
  )
}

export default BookingAddOnInnerRooms
