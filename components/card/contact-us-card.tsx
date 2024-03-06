import { Divider, Grid, Typography } from "@mui/material"
import { Box } from "@mui/system"
import React, { useContext } from "react"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { useAesthetics } from "../../utils/fetchAsthetics"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import { useMobileCheck } from "../../utils/isMobilView"

const ContactUsCard = (props: any) => {
  const Context = useContext(IHCLContext)
  const PortableText = Context!.PortableText
  const isMobile = useMobileCheck()
  const { cardPadding, cardBackgroundColor } = useAesthetics(
    props?.aesthetic?._ref
  )

  return (
    <Box
      sx={{
        padding: props?.isMobile ? cardPadding?.mobile : cardPadding?.desktop,
        backgroundColor: props?.disableBg ? "transparent" : cardBackgroundColor,
      }}
    >
      {!props?.disableTitle && (
        <Typography
          variant={isMobile ? "m-heading-xs" : "heading-m"}
          textAlign="center"
          component={props?.headingElementForCard || "h3"}>
          {props?.title}
        </Typography>
      )}
      {props?.isMultiBlockContent ? (
        <Grid
          container
          rowGap={DesktopPxToVw(40)}
          columnSpacing={DesktopPxToVw(70)}
          mt={DesktopPxToVw(60)}
        >
          {props?.content.map((item: any, index: number) => (
            <Grid item xs={12} sm={12} md={4} key={index}>
              <PortableText blocks={item?.content} />
              <Divider
                sx={{
                  marginTop: DesktopPxToVw(30),
                  backgroundColor: "#8B8A84",
                }}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <PortableText blocks={props?.singleContent} />
      )}
    </Box>
  )
}

export default ContactUsCard
