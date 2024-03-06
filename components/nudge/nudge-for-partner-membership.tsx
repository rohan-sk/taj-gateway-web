import { Box, Typography } from "@mui/material"
import React, {useContext}from "react"
import { useMobileCheck } from "../../utils/isMobilView"
import { NudgeBoxWrapper, RenderActionItemGrid } from "./styles/nudge-for-partner-membership-style"
import { ActionProps, aestheticItems } from "../types"
import { useAesthetics } from "../../utils/fetchAsthetics"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import RenderActionItem from "../hoc/actions/action-items-ui"

type NudgeWithPartnerMembershipProps = {
  title: string
  subtitle: string
  content: any
  description: string
  PrimaryAction: ActionProps
  secondaryAction: ActionProps
  aesthetic: aestheticItems
}

function NudgeWithPartnerMembership({
  title,
  subtitle,
  content,
  description,
  PrimaryAction,
  secondaryAction,
  aesthetic
}: NudgeWithPartnerMembershipProps) {

  const isMobile = useMobileCheck()
  const { cardPadding } = useAesthetics(aesthetic?._ref)
  const Context = useContext(IHCLContext)
  const PortableText = Context!.PortableText

  return (
    <NudgeBoxWrapper $padding={cardPadding}>
        {title && (
          <Box>
            <Typography variant={isMobile ? "m-heading-s" : "heading-s"}>
              {title}
            </Typography>
          </Box>
        )}
        {subtitle && (
          <Box sx={{ margin: isMobile ? "3.125vw 5vw 0vw" : "0.629vw 0vw 0vw" }}>
            <Typography
              variant={
                isMobile ? (title ? "m-body-s" : "m-body-sl") : "body-ml"
              }>
              {subtitle}
            </Typography>
          </Box>
        )}
      <Box m={content ? "unset" : "0 !important"}>
        {secondaryAction?.title && (
          <RenderActionItem
            isActionButtonType={true}
            url={secondaryAction?.url}
            title={secondaryAction?.title}
            variant={secondaryAction?.variant}
            navigationType={secondaryAction?.urlType}
            buttonImgStyles={{ width: "8.711vw", height: "3.17vw" }}
            buttonStyles={{
              minWidth: "8.8vw",
              padding: `0px ${DesktopPxToVw(45)}`,
            }}
          />
        )}
        {PrimaryAction?.title && (
          <>
            <Box sx={{ width: "35vw", margin: "auto" }}>
              {description && (
                <Typography
                  variant="body-m"
                  sx={isMobile ? { fontSize: "3.438vw" } : {}}>
                  {description}
                </Typography>
              )}
            </Box>
            <RenderActionItemGrid>
              <RenderActionItem
                isActionButtonType={false}
                url={PrimaryAction?.url}
                title={PrimaryAction?.title}
                variant={PrimaryAction?.variant}
                navigationType={PrimaryAction?.urlType}
                buttonImgStyles={{ width: "8.711vw", height: "3.17vw" }}
                buttonStyles={{
                  minWidth: "8.8vw",
                }}
              />
            </RenderActionItemGrid>
          </>
        )}
        {content &&
          content?.map((item: any, id: number) => (
            <Box key={id} sx={{ margin: isMobile ? "4.219vw" : "1.823vw" }}>
              <PortableText blocks={item} />
            </Box>
          ))}
          </Box>
    </NudgeBoxWrapper>
  )
}

export default NudgeWithPartnerMembership
