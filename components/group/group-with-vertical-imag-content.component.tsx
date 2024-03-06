import { Box } from "@mui/material"
import React, { useContext } from "react"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { GroupWithVerticalImagContentBox } from "./styles/group-with-vertical-imag-content-style"

function GroupWithVerticalImagContent({ props }: any) {
  const context = useContext(IHCLContext)
  return (
    <GroupWithVerticalImagContentBox>
      {props?.map((item: any, index: any) => (
        <Box key={index}>
          {context?.renderComponent(item?._type, item, index)}
        </Box>
      ))}
    </GroupWithVerticalImagContentBox>
  )
}

export default GroupWithVerticalImagContent
