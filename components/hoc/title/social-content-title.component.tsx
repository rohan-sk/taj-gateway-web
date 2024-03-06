import React, { useState } from "react"
import { ActionProps } from "../../types"
import { theme } from "../../../lib/theme"
import { urlFor } from "../../../lib-sanity"
import { Box, Stack, Typography } from "@mui/material"
import { useMobileCheck } from "../../../utils/isMobilView"
import { useAppNavigation } from "../../../utils/NavigationUtility"
import {
  ParentBox,
  ContentBox,
  VerticalDivider,
  SocialContentPrimaryActionButton,
  SocialContentSubTitleTypography,
} from "./styles"
import { PathType } from "../../../types"
import CustomReadMore from "../CustomReadMore"
import DesktopPxToVw from "../../../utils/DesktopFontCalc"

type SocialContentTitleProps = {
  title: TitleTypes
  subTitle: string
  secondaryAction: ActionProps
  instagramHandle?: string
  charactersLimit?: any
}

type TitleTypes = {
  mobileTitle: string[]
  desktopTitle: string[]
}

const SocialContentTitle = (props: SocialContentTitleProps) => {
  const {
    title,
    subTitle,
    secondaryAction,
    instagramHandle = "",
    charactersLimit,
  } = props
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const [isShown, setIsShown] = useState(secondaryAction?.allowOnHoverProperty)
  const Title = isMobile
    ? title?.mobileTitle
      ? title?.mobileTitle
      : title?.desktopTitle
    : title?.desktopTitle

  return (
    <ParentBox columnGap={isMobile ? "auto" : DesktopPxToVw(40)}>
      <ContentBox>
        {Title?.length > 0 &&
          Title?.map((title: string, index: number) => (
            <Stack key={index} alignItems={"center"}>
              <Typography
                lineHeight={"120%"}
                whiteSpace={"nowrap"}
                color={theme?.palette?.text?.primary}
                variant={isMobile ? "m-heading-m" : "heading-l"}>
                {title}
              </Typography>
            </Stack>
          ))}
        {subTitle && (
          <>
            {!isMobile && <VerticalDivider orientation="vertical" flexItem />}
            <CustomReadMore
              length={charactersLimit}
              variant={isMobile ? "m-body-m" : "body-ml"}>
              {subTitle}
            </CustomReadMore>
          </>
        )}
      </ContentBox>
      {secondaryAction && !isMobile && (
        <SocialContentPrimaryActionButton
          variant={"light-outlined"}
          onMouseEnter={() =>
            setIsShown(!secondaryAction?.allowOnHoverProperty)
          }
          onMouseLeave={() => setIsShown(secondaryAction?.allowOnHoverProperty)}
          onClick={() =>
            navigate(
              instagramHandle || secondaryAction?.url,
              PathType?.external || secondaryAction?.urlType
            )
          }>
          {secondaryAction?.image && isShown && (
            <Box
              width={"1.146vw"}
              alt={`top-img`}
              component={"img"}
              src={urlFor(secondaryAction?.image).url()}
            />
          )}
          {secondaryAction?.OnHoverField?.image && !isShown && (
            <Box
              width={"1.146vw"}
              alt={`top-img`}
              component={"img"}
              src={urlFor(secondaryAction?.OnHoverField?.image).url()}
            />
          )}
          {secondaryAction?.title}
        </SocialContentPrimaryActionButton>
      )}
    </ParentBox>
  )
}

export default SocialContentTitle
