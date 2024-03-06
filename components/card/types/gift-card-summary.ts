import { ActionProps, ImageProps, PathType, aestheticItems } from "../../types"

export type CardSummaryProps = {
  title?: string
  subtitle?: string
  parameterMap: any
  icon?: IconItems[]
  secondaryAction?: ActionProps
  PrimaryAction?: ActionProps
  aesthetic?: aestheticItems
  printPage?: boolean
  downloadPagePDF?:boolean
}

export type IconItems = {
  checkBox: PathType | undefined
  image: ImageProps
  url: string
}
