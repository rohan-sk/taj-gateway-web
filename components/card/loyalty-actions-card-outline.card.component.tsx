import { Box, Typography } from "@mui/material"
import dynamic from "next/dynamic"
import { useMobileCheck } from "../../utils/isMobilView"
import { useAesthetics } from "../../utils/fetchAsthetics"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import {
  CtaBoxContainer,
  OutlineContainer,
  ContentCenterAligner,
  ActionButtonsContainer,
} from "../nudge/styles"
import { useBrowserCheck } from "../../utils/hooks/useBrowserCheck"
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))
const PortableText = dynamic(() =>
import("../../lib/portable-text-serializers").then((module) => module.PortableText)
)

const ActionsCardWithOutlined = (props: any) => {
  const {
    url,
    title,
    content,
    urlType,
    subTitle,
    subtitle,
    singleContent,
    ctaLabel,
    aesthetic,
    description,
    primaryAction,
    secondaryAction,
    cardActionType,
  } = props
  const isMobile = useMobileCheck()
  const { cardPadding, cardBackgroundColor } = useAesthetics(
    props?.cardAesthetic?._ref
  )
  const isContent =
    title || subTitle || subtitle || description || content || singleContent
  const { isIos } = useBrowserCheck()
  return (
    <Box
      aria-label={"multi-button-card"}
      sx={{
        width: "100%",
        padding: isMobile
          ? cardPadding?.mobile || aesthetic?.padding?.mobile
          : cardPadding?.desktop || aesthetic?.padding?.desktop,
        background: cardBackgroundColor || aesthetic?.backgroundColor?.hex,
      }}>
      <OutlineContainer $isContent={isContent}>
        {title && (
          <Typography variant={isMobile ? "m-body-l" : "body-l"}>
            {title}
          </Typography>
        )}
        {subTitle && (
          <Typography variant={isMobile ? "m-body-sl" : "body-ml"}>
            {subTitle}
          </Typography>
        )}
        {subtitle && (
          <Typography variant={isMobile ? "m-body-sl" : "body-ml"}>
            {subtitle}
          </Typography>
        )}
        {description && (
          <Typography variant={isMobile ? "m-body-sl" : "body-ml"}>
            {description}
          </Typography>
        )}
        {content && (
          <ContentCenterAligner>
            {content?.map((block: any, index: number) => (
              <PortableText blocks={block?.content} key={index} />
            ))}
          </ContentCenterAligner>
        )}
        {singleContent && (
          <Box mt={isMobile ? MobilePxToVw(10) : DesktopPxToVw(10)}>
            {singleContent?.map((content: string | {}, idx: number) => (
              <PortableText blocks={content} key={idx} />
            ))}
          </Box>
        )}
        <ActionButtonsContainer $marginTopRequired={isContent}>
          {primaryAction?.title && (
            <RenderActionItem
              isActionButtonType={
                primaryAction?.variant === "link" ? false : true
              }
              url={primaryAction?.url}
              title={primaryAction?.title}
              variant={primaryAction?.variant}
              navigationType={primaryAction?.urlType}
              buttonStyles={{
                letterSpacing: "0.08em",
                height: "unset!important",
                width: isMobile ? "min-content" : "unset",
                minWidth: isMobile ? `${MobilePxToVw(400)} !important` : "0vw",
                padding: isMobile
                  ? `${MobilePxToVw(18)} ${MobilePxToVw(32)}`
                  : `${DesktopPxToVw(18)} ${DesktopPxToVw(32)}`,
              }}
            />
          )}
          {secondaryAction?.title && (
            <RenderActionItem
              isActionButtonType={
                secondaryAction?.variant === "link" ? false : true
              }
              url={secondaryAction?.url}
              title={secondaryAction?.title}
              variant={secondaryAction?.variant}
              navigationType={secondaryAction?.urlType}
              buttonStyles={{
                letterSpacing: "0.02em",
                whiteSpace: isMobile ? "noWrap" : "unset",
                height: "unset !important",
                width: isMobile ? "min-content" : "unset",
                minWidth: isMobile ? `${MobilePxToVw(400)} !important` : "0vw",
                padding: isMobile
                  ? isIos
                    ? `${MobilePxToVw(18)} ${MobilePxToVw(11.8)} !important`
                    : `${MobilePxToVw(18)} ${MobilePxToVw(23.3)} !important`
                  : `${DesktopPxToVw(18)} ${DesktopPxToVw(32)}`,
              }}
            />
          )}
          {ctaLabel && (
            <RenderActionItem
              url={url}
              title={ctaLabel}
              isActionButtonType={true}
              navigationType={urlType}
              variant={"light-outlined"}
              buttonStyles={{
                letterSpacing: "0.1em",
                height: "unset!important",
                width: isMobile ? "min-content" : "unset",
                minWidth: isMobile ? `${MobilePxToVw(400)} !important` : "0vw",
                padding: isMobile
                  ? `${MobilePxToVw(18)} ${MobilePxToVw(32)}`
                  : `${DesktopPxToVw(18)} ${DesktopPxToVw(32)}`,
              }}
            />
          )}
        </ActionButtonsContainer>
      </OutlineContainer>
    </Box>
  )
}
export default ActionsCardWithOutlined
