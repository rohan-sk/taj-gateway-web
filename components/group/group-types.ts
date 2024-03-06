import { ActionProps, ImageProps, RichTextItems } from "../types"

export interface GroupItems {
  url: string
  urlType: any
  _type: string
  title: string
  subTitle: string
  ctaLabel: string
  image: ImageProps
  highLights: string
  description: string
  largeImage: ImageProps
  richText: RichTextItems[]
  primaryAction: ActionProps
  secondaryAction: ActionProps
}
