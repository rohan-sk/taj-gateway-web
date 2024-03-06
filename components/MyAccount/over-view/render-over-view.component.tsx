import { Grid } from "@mui/material"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { Fragment, useContext } from "react"

const RenderOverViewComponent = ({ props }: any) => {
  const context = useContext(IHCLContext)
  return (
    <Grid>
      {props?.map((placeholder: any, index: number) => {
        return (
          <Fragment key={index}>
            {context?.renderComponent(placeholder._type, {
              ...placeholder,
              index,
            })}
          </Fragment>
        )
      })}
    </Grid>
  )
}

export default RenderOverViewComponent
