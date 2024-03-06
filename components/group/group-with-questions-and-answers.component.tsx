import React, { Fragment, useContext, useState } from "react"
import { Divider, AccordionSummary, AccordionDetails } from "@mui/material"
import { Remove } from "@mui/icons-material"
import AddIcon from "@mui/icons-material/Add"
import { useMobileCheck } from "../../utils/isMobilView"
import { FaqsItemsProps } from "../types"
import { AccordionTitle, MUIAccordionStyled } from "../accordion/styles"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { theme } from "../../lib/theme"

interface groupWithQuestionsAndAnswersComponentItems {
  _key: string
  _type: string
  largeVariant: string
  items: FaqsItemsProps[]
}
interface groupWithQuestionsAndAnswersComponentProps {
  props: groupWithQuestionsAndAnswersComponentItems
}
const GroupWithQuestionsAndAnswersComponent = ({ props }: groupWithQuestionsAndAnswersComponentProps) => {
  const context = useContext(IHCLContext)
  const isMobile = useMobileCheck()
  const PortableText = context!.PortableText

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const onchange = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>
      {(props?.items || [])?.map((item: FaqsItemsProps | any, index: number) => {
        return (
          <Fragment key={index}>
            <MUIAccordionStyled
              key={index}
              elevation={0}
              square={true}
              onChange={onchange}
              disableGutters={true}
              expanded={index == activeIndex ? true : false}
              sx={{ backgroundColor: theme?.palette?.ihclPalette?.hexOne }}>
              <AccordionSummary
                onClick={() => setActiveIndex(index)}
                expandIcon={
                  index == activeIndex ? (
                    <Remove style={{ fontSize: "20px" }} />
                  ) : (
                    <AddIcon style={{ fontSize: "20px" }} />
                  )
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                  padding: "0px",
                }}>
                <AccordionTitle variant={isMobile ? "m-heading-xs" : "heading-xs"}>{item?.question}</AccordionTitle>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  "&.MuiAccordionDetails-root": { padding: "1.66vw 0vw" },
                }}>
                {item?.answer?.map((content: string | {}, idx: number) => (
                  <PortableText blocks={content} key={idx} />
                ))}
              </AccordionDetails>
            </MUIAccordionStyled>
            <Divider sx={{ borderColor: theme?.palette?.ihclPalette?.hexSeventeen }} />
          </Fragment>
        )
      })}
    </>
  )
}

export default GroupWithQuestionsAndAnswersComponent
