import React, { useContext } from "react"
import { Grid } from "@mui/material"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"

const GroupWithRichText = ({ props }: any) => {
  const context = useContext(IHCLContext)

  return (
    <Grid container>
      {props?.map((item: any, index: number) => (
        <Grid key={index} item md={6} lg={6} xl={6}>
          {context?.renderComponent(item?._type, item, index)}
        </Grid>
      ))}
    </Grid>
  )
}

export default GroupWithRichText
