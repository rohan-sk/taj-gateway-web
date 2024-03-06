import { FormFieldsType } from "../../types"
import { ActionProps, singleContentInterface } from "../../types"

export type ParticipatingHotelsType = {
  title: string
  singleContent: any
  items: FormFieldsType[]
  PrimaryAction: ActionProps
  content: singleContentInterface[]
  largeVariant: string
  subtitle: string
}
