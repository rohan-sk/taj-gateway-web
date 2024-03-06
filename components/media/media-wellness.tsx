import React, { Fragment, useContext } from "react"

import { ActionProps, ImageProps, VideoProps } from "../types"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"

interface MediaWellnessProps {
  props: MediaWellnessItems[]
}
type MediaWellnessItems = {
  url: string
  title: string
  bgColor: string
  urlType: string
  ctaLabel: string
  mediaType: string
  image: ImageProps
  titleColor: string
  description: string
  largeImage: ImageProps
  videoAsset: VideoProps
  primaryAction: ActionProps
  _type: string
}

const MediaWellness = ({ props }: MediaWellnessProps) => {
  const context = useContext(IHCLContext)
  return (
    <>
      {props?.map((item: MediaWellnessItems, index: number) => {
        return (
          <Fragment key={index}>
            {context?.renderComponent(item._type, {
              ...item,
            })}
          </Fragment>
        )
      })}
    </>
  )
}

export default MediaWellness
