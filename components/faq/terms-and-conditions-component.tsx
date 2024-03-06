import React, { useState } from "react"
import AddIcon from "@mui/icons-material/Add"
import dynamic from "next/dynamic"
import RemoveIcon from "@mui/icons-material/Remove"
import { useMobileCheck } from "../../utils/isMobilView"
import { Box, Slide, Typography, AccordionSummary } from "@mui/material"
import {
  ContentAccordion,
  TitleWrapperContainer,
  TitleWrapperTypography,
  ContentArrowDirectionWrapper,
  PortableTextAccordionDetailsContainer,
} from "./styles/terms-and-conditions-component-styles"
const PortableText = dynamic(() =>
import("../../lib/portable-text-serializers").then((module) => module.PortableText)
)
interface TermsAndConditionsProps {
  items: any
  _key: string
  _type: string
  title: string
  metadata: any
  parentProps: number
  largeVariant: string
}
const TermsAndConditionsComponent = ({
  items,
  title,
}: TermsAndConditionsProps) => {
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
  return (
    <Box>
      {title && (
        <TitleWrapperContainer
          onClick={() => setShowDescription(!showDescription)}>
          <TitleWrapperTypography variant={isMobile ? "m-body-s" : "body-s"}>
            {title}
          </TitleWrapperTypography>
          <ContentArrowDirectionWrapper $showDescription={showDescription} />
        </TitleWrapperContainer>
      )}
      <Slide in={showDescription} direction="up" mountOnEnter unmountOnExit>
        <Box>
          {items?.length > 0 &&
            items?.map((item: any, index: number) => (
              <ContentAccordion
                key={index}
                expanded={selectedIndex === index}
                elevation={0}
                disableGutters={true}
                onClick={() => {
                  handleSelect(index)
                }}>
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
                    variant={isMobile ? "m-heading-xxs" : "heading-xs"}>
                    {item?.question}
                  </Typography>
                </AccordionSummary>
                <PortableTextAccordionDetailsContainer>
                  <PortableText blocks={item?.answer} />
                </PortableTextAccordionDetailsContainer>
              </ContentAccordion>
            ))}
        </Box>
      </Slide>
    </Box>
  )
}

export default TermsAndConditionsComponent
