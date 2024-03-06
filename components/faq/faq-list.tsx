import { useEffect, useRef } from "react"
import { FAQ } from "../../types"
import { Box, useTheme } from "@mui/system"
import { Typography } from "@mui/material"
import { AccordionContainer, FAQContentBox, FaqItemStyle } from "./style"
import { useMobileCheck } from "../../utils/isMobilView"
import { Accordion } from "../accordion/Accordian-tobe-removed"
import { useState, SyntheticEvent, useContext } from "react"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"

interface Props {
  items: FAQ[]
  title?: string
  isModal?: boolean
  _type?: string
  brandName?: string
  programId?: string
  variant?: string
  widgetIndex?: number
  widgetSubtitle?: string
  metadata?: any
  headingElement?: any
}
const RenderFaqList = (props: any) => {
  const theme = useTheme()
  const [isClientLoaded, setIsClientLoaded] = useState<boolean>(false)
  const Context = useContext(IHCLContext)
  const { title, items, isModal, headingElement } = props
  const [expanded, setExpanded] = useState<string | false>(false)
  const PortableText = Context!.PortableText
  const viewEventWrapper = useRef()
  const isMobile = useMobileCheck()

  const onChange = (item: any) => (event: SyntheticEvent, isExpanded: boolean) =>
    setExpanded(isExpanded ? item._key : false)

  useEffect(() => {
    setIsClientLoaded(true)
  }, [])

  return (
    <Box ref={viewEventWrapper} sx={{ padding: "0 12.5vw 0vw 12.5vw" }}>
      <Box
        mb={isModal ? 2 : isMobile ? MobilePxToVw(47) : DesktopPxToVw(32)}
        pl={{ xs: isModal ? 2 : 0, sm: isModal ? 2 : 0 }}>
        <Typography
          sx={{ fontWeight: 700, color: theme?.palette?.primary?.main }}
          variant={isMobile ? "m-body-l" : "body-ml"}
          component={headingElement || "h2"}>
          {title}
        </Typography>
      </Box>
      <FAQContentBox isTitle={title}>
        {items &&
          items?.length > 0 &&
          items.map((faqItem: any, index: number) => {
            return (
              <Box
                key={faqItem?._key}
                sx={{
                  borderTop:
                    index === 0 ? `1px solid ${theme?.palette?.ihclPalette?.hexSeventeen}20!important` : "none",
                }}>
                <AccordionContainer>
                  <Accordion
                    title={faqItem?.question}
                    bodyColor={
                      expanded === faqItem?._key
                        ? `${theme?.palette?.ihclPalette?.hexOne}`
                        : `${theme?.palette?.background?.default}`
                    }
                    headingElementForCard={faqItem?.headingElementForCard}
                    headerColor={
                      expanded === faqItem?._key
                        ? `${theme?.palette?.ihclPalette?.hexOne}`
                        : `${theme?.palette?.background?.default}`
                    }
                    key={faqItem?._key}
                    onChange={onChange(faqItem)}
                    expanded={expanded === faqItem?._key}>
                    {isClientLoaded && faqItem?.answer && (
                      <>
                        <FaqItemStyle>
                          <PortableText blocks={faqItem?.answer} />
                        </FaqItemStyle>
                      </>
                    )}
                  </Accordion>
                </AccordionContainer>
              </Box>
            )
          })}
      </FAQContentBox>
    </Box>
  )
}

export default RenderFaqList
