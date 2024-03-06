import React from "react"
import { Box, Typography } from "@mui/material"
import { ActionProps, aestheticItems } from "../types"
import { useAesthetics } from "../../utils/fetchAsthetics"
import RenderActionItem from "../hoc/actions/action-items-ui"
import {
  ActionButtonsBox,
  TwoLinksContentBox,
} from "./styles/nudge-with-action"
import { useMobileCheck } from "../../utils/isMobilView"

interface NudgeWithTwoLinksProps {
  _type: string
  description: string
  aesthetic: aestheticItems
  PrimaryAction: ActionProps
  secondaryAction: ActionProps
}

const NudgeWithTwoLinks = ({
  aesthetic,
  description,
  PrimaryAction,
  secondaryAction,
}: NudgeWithTwoLinksProps) => {
  const isMobile = useMobileCheck()
  const { cardPadding, cardBackgroundColor } = useAesthetics(aesthetic?._ref)

  return (
    <Box
      sx={{
        background: cardBackgroundColor || aesthetic?.backgroundColor?.hex,
        padding: isMobile
          ? cardPadding?.mobile || aesthetic?.padding?.mobile
          : cardPadding?.desktop || aesthetic?.padding?.desktop,
      }}>
      <TwoLinksContentBox>
        {description && (
          <Box
            sx={{
              textAlign: "center",
              maxWidth: isMobile ? "100%" : "35.63vw",
            }}
          >
            <Typography variant={isMobile ? "m-body-l" : "body-ml"}>
              {description}
            </Typography>
          </Box>
        )}
        <ActionButtonsBox>
          {PrimaryAction && (
            <RenderActionItem
              url={PrimaryAction?.url}
              isActionButtonType={false}
              title={PrimaryAction?.title}
              variant={PrimaryAction?.variant}
              navigationType={PrimaryAction?.urlType}
              buttonStyles={{ letterSpacing: "0.1em", whiteSpace: "nowrap" }}
            />
          )}
          {secondaryAction && (
            <RenderActionItem
              url={secondaryAction?.url}
              isActionButtonType={false}
              title={secondaryAction?.title}
              variant={secondaryAction?.variant}
              navigationType={secondaryAction?.urlType}
              buttonStyles={{ letterSpacing: "0.1em", whiteSpace: "nowrap" }}
            />
          )}
        </ActionButtonsBox>
      </TwoLinksContentBox>
    </Box>
  )
}

export default NudgeWithTwoLinks
