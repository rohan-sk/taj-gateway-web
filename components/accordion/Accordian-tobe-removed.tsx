import { Fragment, ReactNode, useContext } from "react"
import { Typography } from "@mui/material"
import { useMobileCheck } from "../../utils/isMobilView"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import { StyledAccordion } from "./styles"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { MinusIcon, PlusIcon } from "../../utils/customIcons"
import { MobilePxToVw } from "../../utils/DesktopFontCalc"

export interface AccordionProps {
  /**
   * title for the Accordion header
   */
  title?: string | ReactNode
  /**
   * available variant types for the Accordion Component
   */
  variant?: string

  /**
   * Sanity Items Schemed Array list
   */
  items?: any[]
  /**
   * Sanity Items Schemed Array list
   */
  headerColor?: string
  /**
   * Sanity Items Schemed Array list
   */
  bodyColor?: string
  /**
   * React Component Nodes
   */
  children?: ReactNode
  onChange?: (e: any, expanded: any) => void
  expanded?: boolean
  key?: string
  headingElementForCard?: any
}

/**
 * Short Description of Accordion Component
 */
export function Accordion({ ...props }: AccordionProps) {
  const context = useContext(IHCLContext)
  const items = props?.items
  const headingElementForCard: any = props?.headingElementForCard
  const isMobile = useMobileCheck()
  return (
    <StyledAccordion
      disableGutters={true}
      onChange={props?.onChange}
      key={props?.key}
      square={true}
      expanded={props?.expanded}
      elevation={0}>
      <AccordionSummary
        expandIcon={
          props?.expanded ? (
            <MinusIcon
              style={{
                width: isMobile ? "3.125vw" : "1.042vw",
                height: "auto",
              }}
            />
          ) : (
            <PlusIcon
              sx={{
                width: isMobile ? "3.125vw" : "1.042vw",
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
        <Typography
          variant={isMobile ? "m-heading-xs" : "heading-xs"}
          sx={{
            lineHeight: "140%",
            paddingRight: "7.29vw",
            margin: "0",
            "@media (max-width: 640px)": {
              paddingRight: MobilePxToVw(6),
            },
          }}
          component={headingElementForCard || "h3"}>
          {props?.title || "Accordion title"}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          bgcolor: props?.bodyColor || "background.paper",
        }}>
        {(items || [])?.map((item: any, index: number) => {
          return <Fragment key={index}>{context?.renderComponent(item._type, item, {})}</Fragment>
        })}
        <Typography sx={{ fontSize: "1.14vw" }}>{props?.children}</Typography>
      </AccordionDetails>
    </StyledAccordion>
  )
}
