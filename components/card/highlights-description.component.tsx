import { Box, Grid, Typography } from "@mui/material"
import { urlFor } from "../../lib-sanity"
import dynamic from "next/dynamic"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import { ActionProps } from "../types"
import { FlexBox, PriceTitle, SmallTitle, StyledDivider } from "./styles/highlights-with-img"
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))

type HighlightsDescriptionProps = {
  content: any
  description: string
  primaryAction: ActionProps
  title: string
  highLights: string
  subTitle?: string
}

const HighlightsDescriptionComponent = ({
  content,
  description,
  primaryAction,
  title,
  highLights,
  subTitle,
}: HighlightsDescriptionProps) => {
  return (
    <Box>
      <Box>
        {title && <Typography variant="heading-xs">{title}</Typography>}
        {subTitle && <Typography variant="body-ml">{subTitle}</Typography>}
        <StyledDivider />
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Grid container spacing={6}>
              <Grid item xs={2}>
                <Box
                  component={"img"}
                  alt={content?.[0]?.content?.[1]?.altText || "card-Image"}
                  src={content[0]?.content[1]?.asset?._ref && urlFor(content[0]?.content[1]?.asset?._ref).url()}
                />
              </Grid>
              <Grid item xs={9}>
                <Typography>
                  <b>{content[0]?.content[3]?.children[0]?.text}</b>
                </Typography>
                <SmallTitle variant="body-ml" sx={{ fontSize: "18px" }}>
                  {content[0]?.content[4]?.children[0]?.text}
                </SmallTitle>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            {content?.slice(1)?.map((item: any, index: number) => {
              return (
                <Grid container spacing={6} key={index}>
                  <Grid item xs={2}>
                    <Box
                      component="img"
                      alt={item?.content?.[1]?.altText || "card-Image"}
                      src={item?.content[1]?.asset?._ref && urlFor(item?.content[1]?.asset?._ref).url()}
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <Typography>
                      <b>{item?.content[3]?.children[0]?.text}</b>
                    </Typography>
                    <SmallTitle variant="body-ml" sx={{ fontSize: "18px" }}>
                      {item?.content[4]?.children[0]?.text}
                    </SmallTitle>
                  </Grid>
                </Grid>
              )
            })}
          </Grid>
        </Grid>
        <StyledDivider />
        <FlexBox>
          <Typography variant="body-ml" sx={{ fontWeight: "700" }}>
            {highLights}
          </Typography>
          <PriceTitle variant="heading-s">
            &nbsp;
            {description}&nbsp;
          </PriceTitle>
          <SmallTitle variant="body-ml">plus taxes</SmallTitle>
        </FlexBox>
        <RenderActionItem
          url={primaryAction?.url}
          title={primaryAction?.title}
          navigationType={primaryAction}
          variant={primaryAction?.variant}
          isActionButtonType={true}
          buttonStyles={{ marginTop: DesktopPxToVw(21) }}
        />
      </Box>
    </Box>
  )
}

export default HighlightsDescriptionComponent
