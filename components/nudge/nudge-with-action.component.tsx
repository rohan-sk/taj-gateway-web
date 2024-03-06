import React from "react"
import { theme } from "../../lib/theme"
import { Typography } from "@mui/material"
import {
  BackGroundColorContentBox,
  BackGroundColorParentBox,
} from "./styles/nudge-with-action"
import { useMobileCheck } from "../../utils/isMobilView"
import { ActionProps, aestheticItems } from "../types"
import RenderActionItem from "../hoc/actions/action-items-ui"
import { useAesthetics } from "../../utils/fetchAsthetics"
interface NudgeWithActionProps {
  title: string
  _type: string
  action: ActionProps
  aesthetic: aestheticItems
  PrimaryAction: ActionProps
  secondaryAction: ActionProps
}
const NudgeWithAction = ({
  title,
  aesthetic,
  PrimaryAction,
}: NudgeWithActionProps) => {
  const isMobile = useMobileCheck()
  const { cardPadding, cardBackgroundColor } = useAesthetics(aesthetic?._ref)

  return (
    <BackGroundColorParentBox
      $cardPadding={
        isMobile
          ? cardPadding?.mobile || aesthetic?.padding?.mobile
          : cardPadding?.desktop || aesthetic?.padding?.desktop
      }
      $cardBackgroundColor={
        cardBackgroundColor || aesthetic?.backgroundColor?.hex
      }
      aria-label={"ihcl.core.nudge.navigation"}>
      <BackGroundColorContentBox>
        <Typography
          variant={isMobile ? "m-heading-xs" : "heading-xs"}
          sx={{ color: aesthetic?.titleColor?.hex }}>
          {title}
        </Typography>
        {PrimaryAction && (
          <RenderActionItem
            url={PrimaryAction?.url}
            isActionButtonType={true}
            title={PrimaryAction?.title}
            variant={PrimaryAction?.variant}
            navigationType={PrimaryAction?.urlType}
            buttonStyles={{
              lineHeight: "140%",
              letterSpacing: "1.8px",
            }}
          />
        )}
      </BackGroundColorContentBox>
    </BackGroundColorParentBox>
  )
}

export default NudgeWithAction
