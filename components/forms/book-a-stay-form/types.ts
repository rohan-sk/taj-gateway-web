import { theme } from "../../../lib/theme"
import { ActionProps, aestheticItems, parameterMapItems } from "../../types"
import { Comment, Email, Mobile, Name } from "../gift-card-form/constants"

export interface BookAStayCardComponentProps {
  url: string
  title: string
  _type: string
  urlType: string
  ctaLabel: string
  largeVariant: string
  alignmentVariant: string
  aesthetic: aestheticItems | any
  primaryAction: ActionProps
  isMultiBlockContent: boolean
  parameterMap: parameterMapItems[]
  variant?: string
}

export interface BookAStayPromoCodeErrors {
  search: boolean
  promoCode: boolean
  date: boolean
}
export interface BookAStayCouponCodeErrors {
  search: boolean
  couponCode: boolean
  date: boolean
}

export interface BookAStayAgencyIdErrors {
  search: boolean
  agencyId: boolean
  date: boolean
}

export interface BookAStayPackageErrors {
  search: boolean
  date: boolean
  package: boolean
}

export type BookAStayErrors =
  | BookAStayAgencyIdErrors
  | BookAStayCouponCodeErrors
  | BookAStayPromoCodeErrors
  | BookAStayPackageErrors

export interface HotelInformation {
  synxis_hotel_id?: string
  brand_name?: string
  identifier?: string
  name: string
  id: string
}

export const InputFontStyles = {
  width: "100%",
  fontFamily: "Inter",
  fontStyle: "normal",
  fontWeight: 300,
  lineHeight: "150%",
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  borderBottom: `0.05vw solid ${theme?.palette?.ihclPalette?.hexOne}`,
}
export interface OwnerBenefitsHotelInformation {
  hotelName: string
  id: string
  identifier: string
  brandName: string
}
export interface OfferBenefitsFormValues {
  [Name]: string
  [Email]: string
  [Mobile]: string
  [Comment]: string
}

export interface OfferBenefitsFormDisable {
  [Name]: boolean
  [Email]: boolean
  [Mobile]: boolean
  CountryCode: boolean
}
