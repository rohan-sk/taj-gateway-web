import React, { useContext } from "react"
import { Box } from "@mui/material"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"

function VerticalLongList(props: any) {
  const context = useContext(IHCLContext)

  return (
    <>
      {Object?.values(props)?.map((item: any, index: number) => {
        return <Box key={index}>{context?.renderComponent(item?._type, item)}</Box>
      })}
    </>
  )
}

export default VerticalLongList
