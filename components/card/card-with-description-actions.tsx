import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import dynamic from "next/dynamic"
import React, { useContext } from "react"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { useMobileCheck } from "../../utils/isMobilView"
import { ActionProps } from "../types"
import {
  CTAContentBox,
  CtaDescriptionBox,
} from "./styles/card-with-description-actions"
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))

type CardWithDescriptionAction = {
  ctaLabel: string
  primaryAction: ActionProps
  secondaryAction: ActionProps
  isComponentFullWidth: boolean
  content: any
  subTitle: string
  urlType: string
}

const CardWithDescriptionAction = ({
  isComponentFullWidth,
  primaryAction,
  content,
  secondaryAction,
  subTitle,
  ctaLabel,
  urlType,
}: CardWithDescriptionAction) => {
  const isMobile = useMobileCheck()
  const Context = useContext(IHCLContext)
  const PortableText = Context!.PortableText
  return (
    <Box
      sx={{
        padding: isComponentFullWidth ? "0vw" : "0vw 12.5vw 6.0vw 12.5vw",
      }}
    >
      <Box sx={{ mb: "4.16vw", letterSpacing: "0" }}>
        <PortableText blocks={content} />
      </Box>
      {/* {content && (
        <Typography
          variant="body-ml"
          sx={{ mt: "0.5vw", letterSpacing: "0" }}
          dangerouslySetInnerHTML={{
            __html: content[0]?.children[0]?.text,
          }}
        ></Typography>
      )} */}
      <CTAContentBox>
        {primaryAction?.title && (
          <RenderActionItem
            url={primaryAction?.url}
            variant={primaryAction?.variant}
            navigationType={primaryAction?.urlType}
            isActionButtonType={true}
            title={primaryAction?.title}
          />
        )}
        {secondaryAction?.title && (
          <RenderActionItem
            url={secondaryAction?.url}
            isActionButtonType={true}
            variant={secondaryAction?.variant}
            navigationType={secondaryAction?.urlType}
            title={secondaryAction?.title}
          />
        )}
      </CTAContentBox>
      <CtaDescriptionBox>
        <Typography variant="body-ml" sx={{ textAlign: "center" }}>
          {subTitle}
        </Typography>
        <RenderActionItem
          url=""
          isActionButtonType={true}
          variant={"light-contained"}
          navigationType={urlType}
          title={ctaLabel}
        />
      </CtaDescriptionBox>
    </Box>
  )
}

export default CardWithDescriptionAction
