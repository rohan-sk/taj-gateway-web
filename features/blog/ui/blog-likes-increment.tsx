import React, { useContext, useState } from "react"
import { Typography } from "@mui/material"
import { useMobileCheck } from "../../../utils/isMobilView"
import { VERTICAL_BAR } from "../constants"
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import CircularProgress from "@mui/material/CircularProgress"
import { formatNumberCount } from "../../../utils/getDate"
import { observer } from "mobx-react-lite"
import { LikesCountTypography, LikesIconAndCountBox } from "./styles/blog-cards-styles"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { GLOBAL_STORES } from "../../../utils/Constants"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import BlogStore from "../store/blog.store"
import { theme } from "../../../lib/theme"

const LikesIncrementCount = () => {
  const isMobile = useMobileCheck()
  const ihclContext = useContext(IHCLContext)
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const blogStore = ihclContext?.getGlobalStore(GLOBAL_STORES?.blogStore) as BlogStore
  const getLikesCount = blogStore?.blogData?.likes > 0 ? formatNumberCount(blogStore?.blogLikesCount) : 0

  async function handleToggleLikes() {
    if (!isClicked) {
      setIsClicked(true)
      await blogStore?.likeIncrement({
        blogId: blogStore?.blogData?._id,
        data: {},
      })
    }
  }

  const thumbIconStyles = {
    width: isMobile ? MobilePxToVw(26) : DesktopPxToVw(26),
    height: isMobile ? MobilePxToVw(26) : DesktopPxToVw(26),
  }

  return (
    <>
      <Typography variant={isMobile ? "m-body-sl" : "body-ml"}>{VERTICAL_BAR}</Typography>
      <LikesIconAndCountBox>
        {!isClicked ? (
          <ThumbUpOffAltIcon
            style={{
              ...thumbIconStyles,
              cursor: "pointer",
            }}
            onClick={() => handleToggleLikes()}
          />
        ) : (
          <ThumbUpIcon
            style={{
              ...thumbIconStyles,
              fill: theme?.palette?.neuPalette?.hexTwo,
            }}
          />
        )}
        <LikesCountTypography>{getLikesCount}</LikesCountTypography>
        {blogStore?.likeIncrementLoader && (
          <CircularProgress
            style={{
              marginLeft: isMobile ? "0.93vw" : "auto",
              width: isMobile ? MobilePxToVw(20) : DesktopPxToVw(20),
              height: isMobile ? MobilePxToVw(20) : DesktopPxToVw(20),
            }}
          />
        )}
      </LikesIconAndCountBox>
    </>
  )
}

export default observer(LikesIncrementCount)
