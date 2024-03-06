import { Box, Divider, Grid, Typography } from "@mui/material"
import React from "react"
import { PortableText } from "../../lib/portable-text-serializers"
import { theme } from "../../lib/theme"
import { urlFor } from "../../lib-sanity"
import { HighlightBox } from "./Styles"

const PresidentialSuiteDetails = (props: any) => {
  return (
    <Grid>
      <Typography
        variant="heading-xs"
        sx={{ marginBottom: "1vw", padding: "0vw !important" }}>
        {props?.title}
      </Typography>
      <Typography variant="body-s">{props?.description}</Typography>
      <Box sx={{ display: "flex", margin: "1vw 0vw" }}>
        {props?.content?.map((item: any, index: number) => (
          <Box key={index} sx={{ paddingRight: "2vw" }}>
            <PortableText blocks={item?.content} />
          </Box>
        ))}
      </Box>
      <HighlightBox>
        {props?.logo?.asset?._ref && (
          <Box
            component="img"
            alt="logo"
            sx={{ marginBottom: "0.2vw" }}
            src={urlFor(props?.logo?.asset?._ref).url()}
          />
        )}
        <Typography
          variant="body-s"
          sx={{
            color: theme?.palette?.neuPalette?.hexTwo,
          }}>
          {props?.highLights}
        </Typography>
      </HighlightBox>
      <Divider sx={{ marginTop: "1.146vw" }} />
    </Grid>
  )
}

export default PresidentialSuiteDetails
