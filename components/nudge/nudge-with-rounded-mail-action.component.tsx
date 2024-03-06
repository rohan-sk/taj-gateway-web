import React, { useContext } from "react"
import { Typography, Grid, Box } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { useMobileCheck } from "../../utils/isMobilView"
import RenderActionItem from "../hoc/actions/action-items-ui"
import { ActionProps, aestheticItems } from "../types"
import { LinkRenderActionItemGrid, MarginBox, ParentGrid } from "./styles"
import { useAesthetics } from "../../utils/fetchAsthetics"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { theme } from "../../lib/theme"

type NudgeWithMailAction = {
  title: string
  subtitle: string
  PrimaryAction: ActionProps
  secondaryAction: ActionProps
  aesthetic: aestheticItems
  description?: string
  content?: any
}

const NudgeWithMailAction = ({
  title,
  subtitle,
  PrimaryAction,
  aesthetic,
  secondaryAction,
  description,
  content,
}: NudgeWithMailAction) => {
  const isMobile = useMobileCheck()
  const { cardPadding } = useAesthetics(aesthetic?._ref)
  const Context = useContext(IHCLContext)
  const PortableText = Context!.PortableText
return (
  <ParentGrid
    aria-label={"nudge-with-mail"}
    margin={
      isMobile
        ? cardPadding?.mobile || aesthetic?.padding?.mobile
        : cardPadding?.desktop || aesthetic?.padding?.desktop
    }>
    <Box
      sx={{
        padding: isMobile ? "6.25vw 4.68vw" : "auto",
      }}>
      {title && (
        <MarginBox>
          <Typography variant={isMobile ? "m-body-sl" : "heading-s"}>
            {title}
          </Typography>
        </MarginBox>
      )}
      {subtitle && (
        <MarginBox>
          <Typography
            variant={isMobile ? (title ? "m-body-s" : "m-body-sl") : "body-ml"}>
            {subtitle}
          </Typography>
        </MarginBox>
      )}
    </Box>
    <MarginBox m={content ? "unset" : "0 !important"}>
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
            letterSpacing: "1.8px",
            width: isMobile ? "90%" : "auto",
            alignSelf: "center",
            whiteSpace: "nowrap",
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
          <LinkRenderActionItemGrid>
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
          </LinkRenderActionItemGrid>
        </>
      )}
      {content &&
        content?.map((item: any, id: number) => (
          <Box key={id} sx={{ margin: isMobile ? "4.219vw" : "1.823vw" }}>
            <PortableText blocks={item} />
          </Box>
        ))}
    </MarginBox>
  </ParentGrid>
)
}

export default NudgeWithMailAction
