import { urlFor } from "../../lib-sanity"
import { useMobileCheck } from "../../utils/isMobilView"
import dynamic from "next/dynamic"
import { CardMedia, Typography, Card } from "@mui/material"
import { DescriptionBox } from "./styles/card-with-right-aligned-content"
import { ActionProps, ImageProps } from "../types"
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))

type CardWithRightAlignedContentWithLinkProps = {
  action?: any
  title: string
  subtitle: string
  image: ImageProps
  description: string
  largeImage: ImageProps
  primaryAction: ActionProps
}

const CardWithRightAlignedContentWithLink = (props: CardWithRightAlignedContentWithLinkProps) => {
  const isMobile = useMobileCheck()

  return (
    <>
      ((isMobile && props?.image?.asset?._ref) || (!isMobile && props?.largeImage?.asset?._ref)) && (
      <>
        <Card sx={{ "&.MuiCard-root": { borderRadius: "0" } }}>
          <CardMedia
            alt={(isMobile ? props?.image?.altText : props?.largeImage?.altText) || "media"}
            component="img"
            src={urlFor(isMobile ? props?.image?.asset?._ref : props?.largeImage?.asset?._ref).url()}
          />
        </Card>
        <DescriptionBox $minHeight={props?.description?.length > 0} $isMobile={isMobile}>
          {props?.title && (
            <Typography variant="heading-xs" sx={{ maxWidth: "80%" }}>
              {props?.title}
            </Typography>
          )}
          {props?.description && <Typography variant="body-ml">{props?.description}</Typography>}
          {props?.primaryAction?.title && (
            <RenderActionItem
              url={props?.action?.primaryAction?.url}
              title={props?.primaryAction?.title}
              navigationType={props?.primaryAction?.urlType}
              variant={props?.primaryAction?.variant}
              isActionButtonType={false}
            />
          )}
        </DescriptionBox>
      </>
      )
    </>
  )
}

export default CardWithRightAlignedContentWithLink
