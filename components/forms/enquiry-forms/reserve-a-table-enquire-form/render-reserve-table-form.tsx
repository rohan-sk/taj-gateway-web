import { Grid } from "@mui/material"
import React, { Fragment, useContext } from "react"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import { theme } from "../../../../lib/theme"

const RenderReserveTableForm = ({ props }: any) => {
  const context = useContext(IHCLContext)
  return (
    <Grid
      sx={{
        backgroundColor: theme?.palette?.background?.default,
        overflow: "auto",
      }}>
      {props && (
        <>
          {props?.map((item: any, index: number) => {
            return (
              <Fragment key={index}>
                {context?.renderComponent(item._type, {
                  ...item,
                })}
              </Fragment>
            )
          })}
        </>
      )}
    </Grid>
  )
}

export default RenderReserveTableForm
