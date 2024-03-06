import React, { useRef } from "react"
import { Stack } from "@mui/material"
import { theme } from "../../lib/theme"
import { urlFor } from "../../lib-sanity"
import dynamic from "next/dynamic"
import { ImageProps, aestheticItems } from "../types"
import { useAesthetics } from "../../utils/fetchAsthetics"
import {
  MainStack,
  StyledLine,
  StyledImage,
  DividerStack,
  DividerBullet,
  DescriptionTypography,
} from "./styles/card-with-bullet-line-for-image"
import { useImageUtility } from "../../utils/hooks/useImageUtility"
const TwoRowTitle = dynamic(() => import("../hoc/title/TwoRowTitle"))

type CardWithBulletLineForImageTypes = {
  title: string
  description: string
  largeVariant: string
  largeImage: ImageProps
  aesthetic: aestheticItems
}

const CardWithBulletLineForImage = ({
  title,
  aesthetic,
  largeImage,
  description,
  largeVariant,
}: CardWithBulletLineForImageTypes) => {
  const imageRef = useRef<any>(null)
  const { getOptimizeImageUrl } = useImageUtility()
  const isLeftMedia = largeVariant === "loyalty.card.chambers-details"
  const { cardBackgroundColor, cardPadding, textColor } = useAesthetics(aesthetic?._ref)
  const isVerticalImage = imageRef?.current?.offsetHeight > imageRef?.current?.offsetWidth
  const titleColor = textColor ? textColor : aesthetic?.titleColor?.hex ? aesthetic?.titleColor?.hex : theme?.palette?.text?.primary

  return (
    <MainStack
      $leftMedia={isLeftMedia}
      $bgColor={cardBackgroundColor || aesthetic?.backgroundColor?.hex}
      $verticalImage={isVerticalImage}
      sx={{ padding: cardPadding?.desktop || aesthetic?.padding?.desktop }}>
      <Stack
        sx={{
          flexDirection: isLeftMedia ? "row-reverse" : "row",
        }}>
        {largeImage?.asset?._ref && (
          <StyledImage
            alt={largeImage?.altText || "-img"}
            ref={imageRef}
            component="img"
            $verticalImage={isVerticalImage}
            src={getOptimizeImageUrl(urlFor(largeImage?.asset?._ref).url(), 2)}
          />
        )}
        <DividerStack $leftMedia={isLeftMedia}>
          <StyledLine $fontColor={titleColor} $verticalImage={isVerticalImage} />
          <DividerBullet $fontColor={titleColor} />
        </DividerStack>
      </Stack>
      <Stack sx={{ width: "30.208vw" }}>
        {title && (
          <TwoRowTitle
            title={title}
            width={"100%"}
            fontSize={"2.5vw"}
            lineHeight={"110%"}
            dividerWidth={"2.083vw"}
            color={titleColor}
          />
        )}
        <DescriptionTypography variant="body-ml" $fontColor={titleColor}>
          {description}
        </DescriptionTypography>
      </Stack>
    </MainStack>
  )
}

export default CardWithBulletLineForImage
