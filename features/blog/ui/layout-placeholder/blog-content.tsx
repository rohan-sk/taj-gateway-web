import { Box } from "@mui/material"
import React, { useContext } from "react"
import { useMobileCheck } from "../../../../utils/isMobilView"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import { GLOBAL_STORES } from "../../../../utils/Constants"
import BlogStore from "../../store/blog.store"
import TableOfContent from "../table-of-content"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import RenderActionItem from "../../../../components/hoc/actions/action-items-ui"
import { theme } from "../../../../lib/theme"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import { useAppNavigation } from "../../../../utils/NavigationUtility"
import { useRouter } from "next/router"
import { CtaActionsWrapper, PreviuosNextActionBox } from "../styles/blog-cards-styles"
import { observer } from "mobx-react-lite"
import { ActionProps, PathType, aestheticItems } from "../../../../components"
import { useAesthetics } from "../../../../utils/fetchAsthetics"

type GroupActionType = {
  primaryAction: ActionProps
  secondaryAction: ActionProps
  ctaLabel: ActionProps
}

type BlogContentTypes = {
  groupLargeVariant: string
  groupMobileVariant: string
  cardLargeVariant: string
  cardMobileVariant: string
  aesthetic: aestheticItems
  groupActionType: GroupActionType[]
}

function GetContentItem(props: {
  largeVariant: string
  variant: string
  data: { contentType: string; text: string; _type: string; _key: string }
}) {
  return {
    variant: props?.variant,
    largeVariant: props?.largeVariant,
    data: {
      ...props?.data,
      contentType: props?.data?.contentType,
      text: props?.data?.text,
      _type: props?.data?._type,
      _key: props?.data?._key,
    },
  }
}

function BlogContent(props: BlogContentTypes) {
  const { groupLargeVariant, groupMobileVariant, cardLargeVariant, cardMobileVariant, aesthetic, ...rest } = props
  const navigate = useAppNavigation()
  const router = useRouter()
  const routerPath = router?.asPath?.split("/")?.slice(0, 2)?.join("/")
  const ihclContext = useContext(IHCLContext)
  const context = useContext(IHCLContext)
  const isMobile = useMobileCheck()
  let articleContentPadding = useAesthetics(aesthetic?._ref)?.cardPadding
  const blogStore = ihclContext?.getGlobalStore(GLOBAL_STORES?.blogStore) as BlogStore
  const { showTOC, articleContent, description, next, previous } = blogStore?.blogData || {}

  const buttonsStyle = {
    letterSpacing: "1.8px",
    fontWeight: 400,
    padding: "0vw",
    height: "auto",
    textDecoration: "underline",
    "&:hover": {
      textDecoration: "underline",
    },
  }

  return (
    <>
      {description && (
        <Box sx={{ padding: isMobile ? articleContentPadding?.mobile : articleContentPadding?.desktop }}>
          {context?.renderComponent(
            "card",
            GetContentItem({
              variant: cardMobileVariant,
              largeVariant: cardLargeVariant,
              data: {
                contentType: "text",
                text: description,
                _type: "contentItems",
                _key: "w249qij2ue",
              },
            }),
          )}
        </Box>
      )}

      {showTOC && (
        <Box sx={{ padding: isMobile ? "0vw" : articleContentPadding?.desktop }}>
          <TableOfContent />
        </Box>
      )}

      {articleContent && (
        <Box sx={{ padding: isMobile ? articleContentPadding?.mobile : articleContentPadding?.desktop }}>
          {Object?.values(articleContent)?.map((item: any, index: number) => (
            <Box key={index}>
              {context?.renderComponent(
                "card",
                GetContentItem({
                  variant: cardLargeVariant,
                  largeVariant: cardLargeVariant,
                  data: item,
                }),
              )}
            </Box>
          ))}
        </Box>
      )}

      {!isMobile && (
        <CtaActionsWrapper>
          <PreviuosNextActionBox sx={{ opacity: previous?.identifier ? 1 : 0.5 }}>
            <ChevronLeftIcon
              sx={{ color: theme?.palette?.ihclPalette?.hexTwo, cursor: previous?.identifier ? "pointer" : "initial" }}
            />
            <RenderActionItem
              url={rest?.groupActionType?.[0]?.ctaLabel?.url}
              isActionButtonType={true}
              variant={rest?.groupActionType?.[0]?.ctaLabel?.variant}
              navigationType={rest?.groupActionType?.[0]?.ctaLabel?.urlType}
              title={rest?.groupActionType?.[0]?.ctaLabel?.title}
              buttonStyles={{
                ...buttonsStyle,
                "&:hover": {
                  textDecoration: "underline",
                  cursor: previous?.identifier ? "pointer" : "initial",
                },
              }}
              onClick={() => {
                if (previous?.identifier) {
                  navigate(
                    `${routerPath}/${blogStore?.blogData?.theme?.identifier}/${previous?.identifier}`,
                    PathType?.internal,
                  )
                }
              }}
            />
          </PreviuosNextActionBox>

          <PreviuosNextActionBox sx={{ opacity: next?.identifier ? 1 : 0.5 }}>
            <RenderActionItem
              url={rest?.groupActionType?.[1]?.ctaLabel?.url}
              isActionButtonType={true}
              variant={rest?.groupActionType?.[1]?.ctaLabel?.variant}
              navigationType={rest?.groupActionType?.[1]?.ctaLabel?.urlType}
              title={rest?.groupActionType?.[1]?.ctaLabel?.title}
              buttonStyles={{
                ...buttonsStyle,
                "&:hover": {
                  textDecoration: "underline",
                  cursor: next?.identifier ? "pointer" : "initial",
                },
              }}
              onClick={() => {
                if (next?.identifier) {
                  navigate(
                    `${routerPath}/${blogStore?.blogData?.theme?.identifier}/${next?.identifier}`,
                    PathType?.internal,
                  )
                }
              }}
            />
            <ChevronRightIcon
              sx={{ color: theme?.palette?.ihclPalette?.hexTwo, cursor: next?.identifier ? "pointer" : "initial" }}
            />
          </PreviuosNextActionBox>
        </CtaActionsWrapper>
      )}
    </>
  )
}

export default observer(BlogContent)
