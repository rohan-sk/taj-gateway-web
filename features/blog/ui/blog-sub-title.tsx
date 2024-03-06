import React from "react"
import { Typography } from "@mui/material"
import { useMobileCheck } from "../../../utils/isMobilView"
import { BLOG_CONSTANTS, VERTICAL_BAR } from "../constants"
import { formatDateWithFullMonth } from "../../../utils/getDate"
import { observer } from "mobx-react-lite"
import { BlogThemePageTitle, BlogThemeTextAndLikesCount } from "./styles/blog-cards-styles"
import dynamic from "next/dynamic"

const LikesIncrementCount = dynamic(() => import("./blog-likes-increment"))

interface BlogTypeDeclaritions {
  authorInfo: any
  readTime: string
  _updatedAt: string
}

function BlogSubTitle({ readTime, _updatedAt, authorInfo }: BlogTypeDeclaritions) {
  const isMobile = useMobileCheck()

  return (
    <BlogThemePageTitle>
      <BlogThemeTextAndLikesCount>
        <Typography variant={isMobile ? "m-body-sl" : "body-ml"}>
          {"By "}
          <Typography variant={isMobile ? "m-body-sl" : "body-ml"}>{authorInfo?.title}</Typography>
        </Typography>
        {isMobile && <LikesIncrementCount />}
      </BlogThemeTextAndLikesCount>
      {!isMobile && <Typography variant={isMobile ? "m-body-sl" : "body-ml"}>{VERTICAL_BAR}</Typography>}
      <Typography variant={isMobile ? "m-body-sl" : "body-ml"}>
        {BLOG_CONSTANTS?.updatedOnText} {formatDateWithFullMonth(_updatedAt, true)} - {readTime}
      </Typography>
      {!isMobile && <LikesIncrementCount />}
    </BlogThemePageTitle>
  )
}

export default observer(BlogSubTitle)
