import { Grid, Typography } from "@mui/material"
import React, { useContext } from "react"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { theme } from "../../../lib/theme"

const AuthenticationGroupGrid = ({ props, parameterMap }: any) => {
  const context = useContext(IHCLContext)
  return (
    <>
      <Typography
        variant="body-ml"
        sx={{
          fontFamily: theme?.palette?.font?.primaryFontFamily,
          letterSpacing: "-1.1px",
          fontWeight: 400,
        }}>
        {parameterMap?.[0]?.value}
      </Typography>
      <Grid
        container
        sx={{ justifyContent: "center", marginTop: "1.042vw !important" }}>
        {props.map((card: any, index: number) => {
          return (
            <Grid item xs={4.9} sm={4.9} md={4.9} lg={4.9} key={index}>
              {context?.renderComponent(card._type, card)}
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}

export default AuthenticationGroupGrid
