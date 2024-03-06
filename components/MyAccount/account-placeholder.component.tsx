import { Grid, Typography } from "@mui/material"
import React from "react"
import { PlaceholderTitle } from "./my-account.styles"

interface AccountTabInterface {
  title: string
}

const AccountPlaceholderComponent = (props: AccountTabInterface) => {
  const { title } = props
  return (
    <Grid>
      <PlaceholderTitle variant="heading-m">{title}</PlaceholderTitle>
    </Grid>
  )
}

export default AccountPlaceholderComponent
