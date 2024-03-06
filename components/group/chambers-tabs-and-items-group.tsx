import React, { useContext } from "react"
import { Box } from "@mui/material"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"

const ChambersTabsAndItemsGroup = (props: any) => {
  const context = useContext(IHCLContext)
  return (
    <>
      {props?.items?.map((item: any, index: number) => (
        <Box key={index}>
          {context?.renderComponent(item?._type, item, index)}
        </Box>
      ))}
    </>
  )
}

export default ChambersTabsAndItemsGroup
