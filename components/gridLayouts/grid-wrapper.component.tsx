import { Box } from "@mui/material"
import React, { useContext } from "react"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"

const GridWrapper = ({ props }: any) => {
  const context = useContext(IHCLContext)

  return props?.map((item: any) => (
    <Box key={item?._key}>{context?.renderComponent(item?._type, item)}</Box>
  ))
}

export default GridWrapper
