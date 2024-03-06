import React from "react"
import { ImageProps } from "../types"
import { urlFor } from "../../lib-sanity"
import { useMobileCheck } from "../../utils/isMobilView"
import { Box, CardMedia, Grid, Typography, Card, useTheme } from "@mui/material"

type CardWithTitleProps = {
  props: CardWithTitleItems[]
}

type CardWithTitleItems = {
  title: string
  image: ImageProps
  largeImage: ImageProps
}

const CardWithTitle = ({ props }: CardWithTitleProps) => {
  const theme = useTheme()
  const isMobile = useMobileCheck()

  return (
    <Grid container spacing={"2.081vw"}>
      {props?.map((item: CardWithTitleItems, index: number) => (
        <Grid key={index} item md={6} lg={3} xl={3} sx={{ mb: 4 }}>
          <Box
            sx={{
              position: "relative",
            }}>
            <Card
              sx={{
                "&.MuiCard-root": { borderRadius: "0", boxShadow: "none" },
              }}>
              {((isMobile && item?.image?.asset?._ref) || (!isMobile && item?.largeImage?.asset?._ref)) && (
                <Box>
                  <CardMedia
                    alt={(isMobile ? item?.image?.altText : item?.largeImage?.altText) || "media"}
                    component="img"
                    src={urlFor(isMobile ? item?.image?.asset?._ref : item?.largeImage?.asset?._ref).url()}
                  />
                </Box>
              )}
            </Card>
            {item?.title && (
              <Box
                sx={{
                  right: 0,
                  bottom: 0,
                  position: "absolute",
                  p: "1.45vw  0.93vw 1.19vw",
                  transform: "translateY(50%)",
                  width: isMobile ? "85%" : "95%",
                  boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
                  background: theme?.palette?.background?.default,
                }}>
                <Typography
                  variant="heading-xs"
                  sx={{
                    whiteSpace: "nowrap",
                    color: theme?.palette?.text?.primary,
                    fontSize: isMobile ? "3.75vw" : "1.25vw",
                  }}>
                  {item?.title}
                </Typography>
              </Box>
            )}
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}

export default CardWithTitle
