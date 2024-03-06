import React from "react"
import { Box } from "@mui/material"
import dynamic from "next/dynamic"
import { urlFor } from "../../lib-sanity"
import { AwardCardProps } from "./types/types"
import { useMobileCheck } from "../../utils/isMobilView"
import { DescriptionTypo, MainBox, TitleBox, TitleTypo } from "./styles/award-card"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
const CustomReadMore = dynamic(() => import("../hoc/CustomReadMore"))
import { useAppNavigation } from "../../utils/NavigationUtility"
import ModalStore from "../../store/global/modal.store"

const AwardCard = (props: AwardCardProps) => {
  const { title, description, image, largeImage, parentProps, cardActionType } = props
  const isFromSSO = parentProps?.fromSSO
  const isMobile = useMobileCheck()
  const awardImage = isMobile ? image?.asset?._ref : largeImage?.asset?._ref
  const navigate = useAppNavigation()
  const modalStore = ModalStore.getInstance()
  const cardNavigation = cardActionType?.[0]?.emptyLink

  const handleNavigation = () => {
    navigate(cardNavigation?.url, cardNavigation?.urlType)
    modalStore?.closeModal()
  }

  return (
    <MainBox>
      {awardImage && (
        <Box
          onClick={() => handleNavigation()}
          sx={{
            width: isMobile ? MobilePxToVw(200) : DesktopPxToVw(160),
            height: isMobile ? MobilePxToVw(176) : DesktopPxToVw(111),
            margin: isFromSSO ? "0vw 0 0.93vw 0" : "auto",
            cursor: "pointer",
          }}>
          <Box
            width={"100%"}
            height={"100%"}
            component="img"
            alt={(isMobile ? image?.altText : largeImage?.altText) || "award-Image"}
            sx={{
              objectFit: "contain",
            }}
            src={urlFor(awardImage).url()}
          />
        </Box>
      )}
      {title && (
        <TitleBox>
          <TitleTypo
            sx={{ margin: !awardImage ? "1.5vw 0 0.93vw 0" : "" }}
            variant={isMobile ? "m-heading-xs" : "heading-xs"}>
            {title}
          </TitleTypo>
        </TitleBox>
      )}
      {description && (
        <DescriptionTypo
          variant={isMobile ? "m-body-s" : "body-s"}
          sx={{
            margin: isFromSSO ? "0.9721vw 0vw 0vw 0vw !important" : "1.04vw 0vw 0vw 0vw",
          }}>
          <CustomReadMore variant={isMobile ? "m-body-s" : "body-s"} length={props?.charactersLimit}>
            {description}
          </CustomReadMore>
        </DescriptionTypo>
      )}
    </MainBox>
  )
}

export default AwardCard
