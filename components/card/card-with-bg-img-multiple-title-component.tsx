import { Box } from "@mui/material"
import React, { useContext } from "react"
import { urlFor } from "../../lib-sanity"
import { ActionProps } from "../types"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { BackGroundImageBox } from "./styles/card-with-bg-img-multiple-title-component"
interface parameterMapItems {
  key: string
  value: string
}
interface CardWithBackGroundImageTwoOptionsItems {
  title: string
  _key: string
  _type: string
  variant: string
  primaryAction: ActionProps
  parameterMap: parameterMapItems[]
}
interface assetItems {
  _ref: string
  _type: string
}
interface backgroundImage {
  asset: assetItems
  _type: string
}
interface CardWithBackGroundImageTwoOptionsProps {
  props: CardWithBackGroundImageTwoOptionsItems[]
  backgroundImage?: backgroundImage
}
const CardWithBackGroundImageTwoOptions = ({
  props,
  backgroundImage,
}: CardWithBackGroundImageTwoOptionsProps) => {
  const context = useContext(IHCLContext)
  return (
    <BackGroundImageBox
      sx={{
        background:
          backgroundImage?.asset?._ref &&
          `url(${urlFor(
            backgroundImage?.asset?._ref
          ).url()}) , linear-gradient(180deg, rgba(81, 81, 81, 0) 0%, rgba(0, 0, 0, 0.9) 0%) `,
      }}>
      <>
        {props?.map(
          (item: CardWithBackGroundImageTwoOptionsItems, index: number) => {
            return (
              <Box key={index}>
                {context!.renderComponent(item._type, item, index)}
              </Box>
            )
          }
        )}
      </>
    </BackGroundImageBox>
  )
}

export default CardWithBackGroundImageTwoOptions
