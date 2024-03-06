import React, { useContext, useState } from "react"
import { Box, Typography } from "@mui/material"
import { useMobileCheck } from "../../../../utils/isMobilView"
import { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { CONSTANTS } from "../../../../components/constants"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import { GLOBAL_STORES } from "../../../../utils/Constants"
import BlogStore from "../../store/blog.store"
import RenderActionItem from "../../../../components/hoc/actions/action-items-ui"
import { theme } from "../../../../lib/theme"
import { observer } from "mobx-react-lite"
import { aestheticItems, PathType } from "../../../../components"
import { useAesthetics } from "../../../../utils/fetchAsthetics"
import { useAppNavigation } from "../../../../utils/NavigationUtility"
import { useRouter } from "next/router"
import {
  ArticleTagsActionBox,
  ArticleTagsWrapper,
  CardContentWrapper,
  EachArticleTag,
  TitleHyphenDivider,
} from "../styles/blog-cards-styles"

interface TagTypeDeclaritions {
  title: string
  ctaLabel: string
  url: string
  urlType: string
  variant: string
  aesthetic: aestheticItems
}

const ArticleTags = (props: TagTypeDeclaritions) => {
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const router = useRouter()
  const routerPath = router?.asPath?.split("/")?.slice(0, 2)?.join("/")
  const ihclContext = useContext(IHCLContext)
  const [showTags, setShowTags] = useState<number>(CONSTANTS?.TWO)
  const articleTagspadding = useAesthetics(props?.aesthetic?._ref)?.cardPadding
  const blogStore = ihclContext?.getGlobalStore(GLOBAL_STORES?.blogStore) as BlogStore
  const themeIdentifier = blogStore?.blogData?.theme?.identifier
  const blogIdentifier = blogStore?.blogData?.identifier
  const checkingTagIdentifier = router?.asPath === `${routerPath}/${themeIdentifier}/${blogIdentifier}`

  return (
    <Box sx={{ padding: isMobile ? articleTagspadding?.mobile : articleTagspadding?.desktop }}>
      {(checkingTagIdentifier ? blogStore?.blogData?.tags?.length > 0 : blogStore?.articleTags?.length > 0) && (
        <Box>
          {isMobile ? (
            <Box sx={{ marginBottom: isMobile ? MobilePxToVw(8) : "auto" }}>
              {props?.title && (
                <CardContentWrapper>
                  <TitleHyphenDivider />
                  <Typography variant={"m-heading-m"} sx={{ letterSpacing: isMobile ? "0vw" : "1.2px" }}>
                    {props?.title}
                  </Typography>
                </CardContentWrapper>
              )}
            </Box>
          ) : (
            <>
              {props?.title && (
                <Typography variant={"heading-xs"} sx={{ letterSpacing: "1.2px" }}>
                  {props?.title}
                </Typography>
              )}
            </>
          )}
        </Box>
      )}
      <ArticleTagsWrapper>
        {(checkingTagIdentifier ? blogStore?.blogData?.tags : blogStore?.articleTags)
          ?.slice?.(0, showTags)
          ?.map((tagTitles: any, index: number) => (
            <Box key={index}>
              {tagTitles?.title && (
                <EachArticleTag
                  onClick={() => {
                    navigate(`${routerPath}/tag/${tagTitles?.identifier}`, PathType?.internal)
                  }}>
                  {tagTitles?.title}
                </EachArticleTag>
              )}
            </Box>
          ))}
      </ArticleTagsWrapper>

      {(checkingTagIdentifier ? blogStore?.blogData?.tags?.length : blogStore?.articleTags?.length) > showTags &&
        props?.ctaLabel && (
          <ArticleTagsActionBox
            onClick={() => {
              setShowTags(showTags + CONSTANTS?.FIVE)
            }}>
            <RenderActionItem
              url={props?.url}
              isActionButtonType={true}
              variant={props?.variant}
              navigationType={props?.urlType}
              onClick={() => {}}
              title={props?.ctaLabel}
              buttonStyles={{
                letterSpacing: "1.8px",
                fontWeight: 400,
                padding: "0vw",
                height: "auto",
                color: theme?.palette?.ihclPalette?.hexTwo,
                textDecoration: "underline",
                "&:hover": {
                  textDecoration: "underline",
                },
                "@media (max-width: 640px)": {
                  padding: "0vw",
                  height: "auto",
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "none",
                  },
                },
              }}
            />
            <ExpandMoreIcon sx={{ color: theme?.palette?.ihclPalette?.hexTwo }} />
          </ArticleTagsActionBox>
        )}
    </Box>
  )
}

export default observer(ArticleTags)
