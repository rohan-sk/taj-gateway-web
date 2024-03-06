import { PathType } from "../../types"
import { ImageProps } from "../types"

export interface FooterProps {
  title: string
  _type: any
  tagLine: string
  url: string
  logo: ImageProps
  icons: IconItems[]
  brand: BrandItems
  ctaLabel: CtaLabelItems[]
  showBottomNavigation: boolean
  hotelDetails: hotelDetailsItems[]
  supportDetails: supportDetailsItems[]
  downloadButtons: downloadButtonItems[]
  legalInformation: legalInformationItems[]
  faqs: any[]
}

export type IconItems = {
  title: string
  icons: IconSubItems[]
}
export type BrandItems = {
  title: string
  actionTypes: [
    {
      title: string
      image: ImageProps
      url: string
      urlType: string
    },
  ]
}
export type BrandActionTypes = {
  title: string
  image: ImageProps
  url: string
  urlType: string
}

export type CtaLabelItems = {
  title: string
  url: string
  urlType: PathType | undefined
}

export type hotelDetailsItems = {
  title: string
  quickLinks: QuickLinkItems[]
}

export type supportDetailsItems = {
  mail: string
  title: string
  tagLine: string
  href?: string
  urlType?: PathType
  value?: string
  phone: {
    current: string
  }
}

export type downloadButtonItems = {
  url: string
  title: string
  image: ImageProps
}

export type legalInformationItems = {
  url: string
  title: string
  urlType?: PathType
}

export type IconSubItems = {
  title: string
  largeImage: any
  image: ImageProps
  url: string
  urlType: string
}

export type QuickLinkItems = {
  url: string
  title: string
}
