import { useContext } from "react"
import { Box } from "@mui/material"
import dynamic from "next/dynamic"
import Title from "./hoc/title/title"
import { IHCLContext } from "../PresentationalComponents/lib/prepare-ihcl-context"
const MultiRowTitle = dynamic(() => import("./hoc/title/multi-row-title"))
import { useMobileCheck } from "../utils/isMobilView"
import { MobilePxToVw } from "../utils/DesktopFontCalc"

export interface BlockSectionProps {
  title: any
  content: any
  _type: "blockSection"
  identifier?: string
  bgColor?: string
}

export function BlockSection(props: any) {
  const identifier = props?.identifier
  const Context = useContext(IHCLContext)
  const isMobile = useMobileCheck()
  const PortableText = Context!.PortableText
  let componentPadding
  let bottom
  switch (identifier) {
    case "hotel-events":
      componentPadding = "5.75vw 12.5vw"
      break
    case "address":
      componentPadding = isMobile ? `${MobilePxToVw(15)} 0vw ${MobilePxToVw(30)}  ` : "0.5vw 2vw 2vw 0vw"
      bottom = "1px solid #8b8a84"
      break

    default:
      break
  }

  return (
    <>
      <Box sx={{ position: "relative" }}>
        <MultiRowTitle {...props} />
        <Box
          sx={{
            padding: componentPadding,
            backgroundColor: props?.bgColor,
            borderBottom: bottom,
          }}>
          <PortableText blocks={props.content} />
        </Box>
      </Box>
    </>
  )
}
