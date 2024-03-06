import React, { useContext, useState } from "react"
import { Box, Typography } from "@mui/material"
import { useMobileCheck } from "../../../../utils/isMobilView"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import { GLOBAL_STORES } from "../../../../utils/Constants"
import BlogStore from "../../store/blog.store"
import { theme } from "../../../../lib/theme"
import { observer } from "mobx-react-lite"
import { useAesthetics } from "../../../../utils/fetchAsthetics"
import { aestheticItems, PathType } from "../../../../components"
import { useRouter } from "next/router"
import { useAppNavigation } from "../../../../utils/NavigationUtility"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { StoryThemeButtonWrapper, CardContentWrapper, TitleHyphenDivider } from "../styles/blog-cards-styles"
import RenderActionItem from "../../../../components/hoc/actions/action-items-ui"
import { CONSTANTS, externalNavigation } from "../../../../components/constants"
import userStore from "../../../../store/global/user.store"
import { useLoggedIn } from "../../../../utils/hooks/useLoggedIn"
import { CrossSiteNavigation } from "../../../../utils/sso/cross-site-navigation"

type StoryThemeTypes = {
  title: string
  ctaLabel: string
  url: string
  urlType: string
  variant: string
  aesthetic: aestheticItems
}

const StoriesThemeTitles = (props: StoryThemeTypes) => {
  const isMobile = useMobileCheck()
  const isLogin = useLoggedIn()
  const router = useRouter()
  const navigate = useAppNavigation()
  const routerPath = router?.asPath?.split("/")?.slice(0, 2)?.join("/")
  const ihclContext = useContext(IHCLContext)
  const [showThemes, setShowThemes] = useState<number>(CONSTANTS?.NINE)
  let cardpadding = useAesthetics(props?.aesthetic?._ref)?.cardPadding

  const blogStore = ihclContext?.getGlobalStore(GLOBAL_STORES?.blogStore) as BlogStore

  const handleActionClick = async (themes: any) => {
    const brand = themes?.brandName?.toUpperCase()
    const navUrl = externalNavigation[brand]
    if (themes?.brandName?.toLowerCase() !== "taj") {
      await CrossSiteNavigation({
        url: `${navUrl}/${themes?.identifier}?`,
        loggedIn: isLogin,
        userStore,
      })
    } else {
      navigate(`${routerPath}/${themes?.identifier}`, PathType?.internal)
    }
  }

  return (
    <Box sx={{ padding: isMobile ? cardpadding?.mobile : cardpadding?.desktop }}>
      {isMobile ? (
        <CardContentWrapper>
          {props?.title && (
            <>
              <TitleHyphenDivider />
              <Typography variant={"m-heading-m"} sx={{ letterSpacing: isMobile ? "0vw" : "1.2px" }}>
                {props?.title}
              </Typography>
            </>
          )}
        </CardContentWrapper>
      ) : (
        <>
          {props?.title && (
            <Typography variant={"heading-xs"} sx={{ letterSpacing: "1.2px" }}>
              {props?.title}
            </Typography>
          )}
        </>
      )}
      <Box
        sx={{
          borderBottom: `1px solid ${theme?.palette?.ihclPalette?.hexSeventeen}`,
        }}>
        {blogStore?.articleThemes?.slice(0, showThemes)?.map((themes: any, index: number) => (
          <Box
            key={index}
            sx={{
              margin:
                index === blogStore?.articleThemes?.length - 1
                  ? isMobile
                    ? `5vw 0vw 7.81vw 0vw`
                    : `1.66vw 0vw 2.08vw 0vw`
                  : isMobile
                  ? `5vw 0vw`
                  : `1.66vw 0vw`,
            }}>
            {themes?.title && (
              <Typography
                variant={isMobile ? "m-body-sl" : "body-ml"}
                sx={{ cursor: "pointer" }}
                onClick={() => handleActionClick(themes)}>
                {themes?.title}
              </Typography>
            )}
          </Box>
        ))}
        {blogStore?.articleThemes?.length > showThemes && props?.ctaLabel && (
          <StoryThemeButtonWrapper
            onClick={() => {
              setShowThemes(showThemes + CONSTANTS?.FIVE)
            }}>
            <RenderActionItem
              url={props?.url}
              isActionButtonType={true}
              variant={props?.variant}
              navigationType={props?.urlType}
              title={props?.ctaLabel}
              onClick={() => {}}
              buttonStyles={{
                letterSpacing: "1.8px",
                fontWeight: 400,
                padding: "0vw !important",
                height: "auto !important",
                color: theme?.palette?.ihclPalette?.hexTwo,
                textDecoration: "underline",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            />
            <ExpandMoreIcon sx={{ color: theme?.palette?.ihclPalette?.hexTwo }} />
          </StoryThemeButtonWrapper>
        )}
      </Box>
    </Box>
  )
}

export default observer(StoriesThemeTitles)
