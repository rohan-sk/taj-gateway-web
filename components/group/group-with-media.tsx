import React, { useContext } from "react"
import { Grid } from "@mui/material"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"

const GroupWithMedia = ({ props }: any) => {
  const context = useContext(IHCLContext)

  return (
    <Grid container>
      {props?.map((item: any, index: number) => (
        <Grid key={index} item md={12} lg={12} xl={12}>
          {context?.renderComponent(
            item?._type,
            { ...item, gridSize: 1 },
            index
          )}
        </Grid>
      ))}
    </Grid>
  )
}

export default GroupWithMedia
