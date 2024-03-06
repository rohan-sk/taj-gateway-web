import React, { useContext } from "react"
import { Box, Grid } from "@mui/material"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import { observer } from "mobx-react-lite"

function TwoColumnGrid(props: any) {
  const context = useContext(IHCLContext)

  return (
    <Grid container spacing={7.5}>
      {/* Blog Content */}
      <Grid item xs={12} sm={12} md={8} lg={8} key={props?.items?.[0]?._key}>
        {context?.renderComponent(props?.[0]?._type, props?.[0])}
      </Grid>
      {/* Blog Sub Content */}
      <Grid item xs={12} sm={12} md={4} lg={4} key={props?.items?.[0]?._key}>
        <Box>{context?.renderComponent(props?.[1]?._type, props?.[1])}</Box>
      </Grid>
    </Grid>
  )
}

export default observer(TwoColumnGrid)
