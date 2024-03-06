import React, { useContext, useState } from "react"
import AddIcon from "@mui/icons-material/Add"
import dynamic from "next/dynamic"
import RemoveIcon from "@mui/icons-material/Remove"
import { useMobileCheck } from "../../utils/isMobilView"
const PortableText = dynamic(() =>
import("../../lib/portable-text-serializers").then((module) => module.PortableText)
)
import { AccordionSummary, Box, Slide, Typography } from "@mui/material"
import {
  TitleStack,
  StyledDownArrow,
  StyledAccordion,
  StyledAccordionDetails,
} from "./styles/center-aligned-single-dropdown."
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { GLOBAL_STORES } from "../../utils/Constants"
import OffersStore from "../../store/global/offers.store"
import { observer } from "mobx-react-lite"

const OffersDetailsFaqsComponent = (props: any) => {
  const isMobile = useMobileCheck()
  const [showDescription, setShowDescription] = useState<boolean>(false)
  const [selectedIndex, setSelectedIndex] = useState<number>(-1)
  const handleSelect = (updatingIndex: number) => {
    if (updatingIndex === selectedIndex) {
      setSelectedIndex(-1)
    } else {
      setSelectedIndex(updatingIndex)
    }
  }
  const Context = useContext(IHCLContext)
  const offerStore = Context?.getGlobalStore(
    GLOBAL_STORES.offerStore
  ) as OffersStore
  return (
    <Box sx={{ padding: isMobile ? "6.250vw 0vw" : "2.135vw 0vw 0.983vw" }}>
      <TitleStack onClick={() => setShowDescription(!showDescription)}>
        <Typography
          sx={{ cursor: "pointer" }}
          variant={isMobile ? "m-heading-xs" : "heading-s"}>
          {props?.title}
        </Typography>
        <StyledDownArrow
          sx={{
            transform: showDescription ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </TitleStack>
      {showDescription && (
        <Box>
          <Box sx={{ marginTop: "2.083vw" }}>
            {offerStore?.offersData?.offerFAQs?.items?.length > 0 &&
              offerStore?.offersData?.offerFAQs?.items?.map(
                (item: any, index: number) => (
                  <StyledAccordion
                    key={index}
                    expanded={selectedIndex === index}
                    elevation={0}
                    disableGutters={true}
                    onClick={() => {
                      handleSelect(index)
                    }}>
                    {item?.question && (
                      <AccordionSummary
                        expandIcon={
                          selectedIndex === index ? <RemoveIcon style={{ fontSize: "20px" }}/> : <AddIcon style={{ fontSize: "20px" }}/>
                        }
                        sx={{
                          "& .MuiAccordionSummary-content": {
                            margin: "1.667vw 0vw 1.406vw 0vw",
                          },
                        }}>
                        <Typography
                          maxWidth={isMobile ? "95%" : "59vw"}
                          variant={isMobile ? "m-heading-xs" : "heading-xs"}
                          sx={{ padding: isMobile ? "3.906vw 0vw" : "unset" }}>
                          {item?.question}
                        </Typography>
                      </AccordionSummary>
                    )}
                    <StyledAccordionDetails>
                      <PortableText blocks={item?.answer} />
                    </StyledAccordionDetails>
                  </StyledAccordion>
                )
              )}
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default observer(OffersDetailsFaqsComponent)
