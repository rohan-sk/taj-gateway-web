import * as React from "react"

export type ComponentMap = {
  [key: string]: React.ComponentType<any>
}
export type ImageItems = {
  asset: { _ref: string }
  altText: string
}
export interface ImageProps {
  altText: string
  imageInfo: any
  length: number
  map: any
  image: ImageItems[]
  largeImage: ImageItems[]
  asset: { _ref: string; _type: string }
  _type: string
}
export interface NextSanityImageProps {
  src: string
  [key: string]: any
}

export type ActionProps = {
  _type: string
  url: string
  title: string
  urlType: any
  variant: string
  image: ImageProps
  allowOnHoverProperty: boolean
  featureVariant?: string
  OnHoverField: {
    image: ImageProps
    title: string
    url: string
    urlType: any
    variant: string
    _type: string
  }
}

export type VideoProps = {
  videoPlay: {
    asset: {
      _ref: string
    }
  }
  videoPlayIcon: {
    asset: {
      _ref: string
    }
  }
  playIcon: {
    asset: {
      _ref: string
    }
  }
  videoThumbnail: {
    asset: {
      _ref: string
    }
  }
  mobileVideoThumbnail: {
    asset: {
      _ref: string
    }
  }
  smallVideoThumbnail: {
    asset: {
      _ref: string
    }
  }
}

export type RichTextItems = {
  richTextKey: string
  richTextValue: string
  content: any
  identifier?: string
  highlightColor?: boolean
  _type: string
}

export enum PathType {
  dialog = "dialog",
  external = "external",
  internal = "internal",
}

export type ChipTextItems = {
  chipTextValue: string
}

export interface aestheticItems {
  _ref?: any
  _id?: any
  _type: string
  backgroundColor: any
  padding: any
  titleColor: any
  gradient?: any
  componentTopGradient?: any
  componentBottomGradient?: any
}
export interface parameterMapItems {
  value: string
  key: string
}

export interface childrenInterface {
  marks: any
  text: string
  _key?: string
  _type: string
}
export interface markDefsItems {
  href: string
  type: string
  _type: string
}
export interface singleContentInterface {
  children: childrenInterface[]
  markDefs: markDefsItems[]
  style: string
  _type: string
}
export interface FaqsItemsProps {
  answer: singleContentInterface
  question: string
  _key: string
}
export interface FormFieldsType {
  inputFieldType: string
  labelText: string
  metadata: {
    identifier: string
  }
  _key: string
  _type: string
  errorText?: string
  helperText?: string
}

export interface SpecificationTagsItems {
  tag: string
  _key: string
  metadata: { identifier: string }
}

export interface CardContentItems {
  _key: string
  _type: string
  urlType: string
  variant: string
  parentProps: number
  image?: ImageItems
  largeVariant: string
  largeImage?: ImageItems
  isHeroTitleFont: boolean
  aesthetic: aestheticItems
  primaryAction: ActionProps
  secondaryAction: ActionProps
  isMultiBlockContent: boolean
  singleContent: singleContentInterface[]
}

export interface LinkTypeItems {
  type: string
  _key: string
  _type: string
  variant: string
  parentProps: number
  mediaIcons: ActionProps[]
}
