import React from "react"
import { theme } from "../../lib/theme"
import dynamic from "next/dynamic"
import { Box, Typography } from "@mui/material"
import { ActionProps, aestheticItems, singleContentInterface } from "../types"
import {
  CardTitleBox,
  ActionButtonBox,
  CardTitleDivider,
  CardDescriptionBox,
  CenterAlignedTitleCardContainer,
} from "./styles/center-aligned-title-card-styles"
import { useAesthetics } from "../../utils/fetchAsthetics"
import { useMobileCheck } from "../../utils/isMobilView"
import { useLoggedIn } from "../forms/loyalty-form/epicure-imports.component"
import { PortableText } from "../../lib/portable-text-serializers"
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))

interface primaryActionItems {
  url: string
  title: string
  _type: string
  urlType: string
  variant: string
}
interface CenterAlignedTitleCardItems {
  _type: string
  title: string
  urlType: string
  description: string
  largeVariant: string
  aesthetic: aestheticItems
  isMultiBlockContent: boolean
  secondaryAction: ActionProps
  primaryAction: primaryActionItems
  singleContent: singleContentInterface[]
}

const CenterAlignedTitleCard = ({
  title,
  aesthetic,
  description,
  primaryAction,
  secondaryAction,
  singleContent,
}: CenterAlignedTitleCardItems) => {
  const isMobile = useMobileCheck()
  const { cardPadding } = useAesthetics(aesthetic?._ref)
  const isUerLogin = useLoggedIn()

  return (
    <CenterAlignedTitleCardContainer $margin={aesthetic}>
      {title && (
        <CardTitleBox>
          {<CardTitleDivider />}
          <Box>
            <Typography sx={{ color: theme?.palette?.text?.primary }} variant={isMobile ? "m-heading-s" : "heading-s"}>
              {title}
            </Typography>
          </Box>
          {<CardTitleDivider />}
        </CardTitleBox>
      )}
      {description && (
        <CardDescriptionBox>
          <Typography variant={isMobile ? "m-body-l" : "body-ml"}>{description}</Typography>
        </CardDescriptionBox>
      )}
      <ActionButtonBox>
        {primaryAction?.title && (
          <RenderActionItem
            url={primaryAction?.url}
            isActionButtonType={true}
            title={primaryAction?.title}
            variant={primaryAction?.variant}
            navigationType={primaryAction?.urlType}
            buttonStyles={{ letterSpacing: "1.8px" }}
          />
        )}
        {secondaryAction?.title && !isUerLogin && (
          <RenderActionItem
            url={secondaryAction?.url}
            isActionButtonType={true}
            variant={secondaryAction?.variant}
            navigationType={secondaryAction?.urlType}
            title={secondaryAction?.title}
            buttonStyles={{ letterSpacing: "1.8px" }}
          />
        )}
        {singleContent &&
          singleContent?.map((block: any, index: Number) => (
            <PortableText key={index} blocks={{ ...block, variant: isMobile ? "m-body-sl" : "body-ml" }} />
          ))}
      </ActionButtonBox>
    </CenterAlignedTitleCardContainer>
  )
}

export default CenterAlignedTitleCard
