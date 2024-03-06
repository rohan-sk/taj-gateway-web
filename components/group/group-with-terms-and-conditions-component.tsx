import React, { useContext } from "react"
import { Box, Divider } from "@mui/material"
import { useMobileCheck } from "../../utils/isMobilView"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"

interface GroupWithTermsAndConditionsProps {
  items: any
  _key: string
  metadata: any
  _type: string
  variant: string
  parentProps: number
  hasAllLink: boolean
  largeVariant: string
  viewEventCallback: any
  allowAdditionalParameters: boolean
}
const GroupWithTermsAndConditionsComponent = ({
  items,
  variant,
  largeVariant,
}: GroupWithTermsAndConditionsProps) => {
  const context = useContext(IHCLContext)
  const itemsCount = items.length
  const isMobile = useMobileCheck()
  return (
    <Box
      sx={{ marginTop: isMobile ? "-8.45vw" : "-4.156vw" }}
      aria-label={isMobile ? variant : largeVariant}>
      {items?.map((item: any, index: number) => (
        <Box
          key={index}
          sx={{
            "&>div": {
              margin: "unset",
            },
          }}>
          {context?.renderComponent(item?._type, item, index)}
          {index + 1 < itemsCount ? (
            <Divider
              sx={{
                borderWidth: "0.0521vw",
                margin: isMobile ? "0vw 8.594vw 0vw" : "1.042vw 0vw 0vw",
              }}
            />
          ) : (
            <></>
          )}
        </Box>
      ))}
    </Box>
  )
}

export default GroupWithTermsAndConditionsComponent
