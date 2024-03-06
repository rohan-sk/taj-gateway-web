import React from "react"
import { urlFor } from "../../lib-sanity"
import dynamic from "next/dynamic"
import { Box, Typography } from "@mui/material"
import { useMobileCheck } from "../../utils/isMobilView"
import {
  MainContainer,
  ActionPropsWrapper,
  ShareIconsContentWrapper,
} from "./styles/gift-card-buy-more-button-component-styles"
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))

const GiftCardBuyMoreButtonComponent = ({ icon, subtitle, PrimaryAction, secondaryAction, handleShareClick }: any) => {
  const isMobile = useMobileCheck()
  return (
    <MainContainer $isMobile={isMobile}>
      <ActionPropsWrapper $isMobile={isMobile}>
        <RenderActionItem
          url={PrimaryAction?.url}
          title={PrimaryAction?.title}
          variant={PrimaryAction?.variant}
          navigationType={PrimaryAction?.urlType}
          isActionButtonType={true}
        />
        <RenderActionItem
          url={secondaryAction?.url}
          title={secondaryAction?.title}
          variant={secondaryAction?.variant}
          navigationType={secondaryAction?.urlType}
          isActionButtonType={true}
        />
      </ActionPropsWrapper>
      <ShareIconsContentWrapper $isMobile={isMobile}>
        <Typography variant={isMobile ? "m-body-s" : "body-s"}>{subtitle} :</Typography>
        {icon?.map((icon: any, id: number) => (
          <Box
            key={id}
            component="img"
            alt={icon?.image?.altText || "Social image"}
            sx={{ cursor: "pointer" }}
            onClick={() => handleShareClick(icon?.url)}
            src={`${icon?.image?.asset?._ref && urlFor(icon?.image?.asset?._ref).url()}`}
          />
        ))}
      </ShareIconsContentWrapper>
    </MainContainer>
  )
}

export default GiftCardBuyMoreButtonComponent
