import React, { useContext } from "react"
import { Box, Typography } from "@mui/material"
import { observer } from "mobx-react-lite"
import { urlFor } from "../../../../lib-sanity"
import { ActionProps, aestheticItems } from "../../../../components/types"
import { GLOBAL_STORES } from "../../../../utils/Constants"
import BlogStore from "../../store/blog.store"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import { useAesthetics } from "../../../../utils/fetchAsthetics"
import { useMobileCheck } from "../../../../utils/isMobilView"
import { useAppNavigation } from "../../../../utils/NavigationUtility"
import { PathType } from "../../../../types"
import { AuthorImageWrapper, AuthorViewStoriesButton, AuthorWrapper } from "../styles/blog-cards-styles"

type AuthorTypeDeclaration = {
  title: string
  aesthetic: aestheticItems
  primaryAction: ActionProps
}

function AboutAuthor(props: AuthorTypeDeclaration) {
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const { title, primaryAction, aesthetic } = props
  const ihclContext = useContext(IHCLContext)
  let authorCardPadding = useAesthetics(aesthetic?._ref)?.cardPadding

  const blogStore = ihclContext?.getGlobalStore(GLOBAL_STORES?.blogStore) as BlogStore

  return (
    <AuthorWrapper sx={{ margin: isMobile ? authorCardPadding?.mobile : authorCardPadding?.desktop }}>
      {title && (
        <Typography
          variant={isMobile ? "m-heading-xs" : "heading-xs"}
          sx={{ letterSpacing: isMobile ? "0vw" : "1.2px" }}>
          {title}
        </Typography>
      )}

      {blogStore?.blogData?.authorInfo?.image?.asset?._ref && (
        <AuthorImageWrapper>
          <Box
            alt="Author Image"
            component="img"
            width={"100%"}
            src={urlFor(blogStore?.blogData?.authorInfo?.image?.asset?._ref)?.url()}
            sx={{ borderRadius: "50%" }}
          />
        </AuthorImageWrapper>
      )}

      {blogStore?.blogData?.authorInfo?.title && (
        <Typography variant={isMobile ? "m-body-sl" : "body-ml"} sx={{ fontWeight: 700 }}>
          {blogStore?.blogData?.authorInfo?.title}
        </Typography>
      )}

      {blogStore?.blogData?.authorInfo?.description && (
        <Typography variant={isMobile ? "m-body-s" : "body-s"} sx={{ margin: isMobile ? "3.125vw 0vw" : "1.04vw 0vw" }}>
          {blogStore?.blogData?.authorInfo?.description}
        </Typography>
      )}

      {primaryAction?.title && (
        <AuthorViewStoriesButton
          onClick={() => {
            navigate(`/homepage`, PathType?.internal)
          }}>
          {primaryAction?.title}
        </AuthorViewStoriesButton>
      )}
    </AuthorWrapper>
  )
}

export default observer(AboutAuthor)
