import { Grid } from "@mui/material"
import React, { useContext } from "react"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { useMobileCheck } from "../../../utils/isMobilView"

const RenderEpicureFormItems = ({ props }: any) => {
  const context = useContext(IHCLContext)
  const isMobile = useMobileCheck();
  return (
    <>
      {props?.items?.map((item: any, index: number) => (
        <>
          <Grid item width={isMobile ? "100%" : "55.73vw"}>
            {context?.renderComponent(item?._type, item)}
          </Grid>
        </>
      ))}
    </>
  )
}

export default RenderEpicureFormItems
