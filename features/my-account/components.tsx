/**
 * *Renders all the tabs under My Account Page
 */

import dynamic from "next/dynamic"
import RenderTabsComponent from "../../components/tabs"
import { RenderShareComponent } from "../../components/share"
import {
  Unknown,
  BlockSection,
  ComponentMap,
  SwitchCaseBlock,
  RenderCardComponent,
  RenderNudgeComponent,
  Forms,
} from "../../components"
const RenewalComponent = dynamic(() => import("../../components/MyAccount/Renewal/renewals.component"))
export const BookingDetails = dynamic(() => import("../../components/MyAccount/booking-history/booking-details"))
export const OverViewBooking = dynamic(() => import("../../components/MyAccount/over-view/over-view-booking"))
export const OverViewGiftCard = dynamic(
  () => import("../../components/MyAccount/over-view/OverViewGiftCard/over-view-gift-card"),
)
export const OverViewMembership = dynamic(
  () => import("../../components/MyAccount/over-view/OverViewMembershipCard/over-view-membership"),
)

export const OverViewVouchers = dynamic(() => import("../../components/MyAccount/over-view/over-view-vouchers"))
export const OverViewOffersBenefits = dynamic(
  () => import("../../components/MyAccount/over-view/over-view-offers-benefits"),
)
export const OverViewOffersBenefitsTab = dynamic(
  () => import("../../components/MyAccount/offerBenefits/offers-benefits"),
)
const VouchersFilterTemplate = dynamic(() => import("./ui/vouchers-filter-template.component"))
const GiftCardComponent = dynamic(() => import("../../components/MyAccount/GiftCard/gift-card.component"))
const PreferenceManagement = dynamic(
  () => import("../../components/MyAccount/PreferanceManagement/preferance-management"),
)
const MembershipCardComponent = dynamic(() => import("../../components/MyAccount/Membership/membership.component"))

const TransactionSummaryDetails = dynamic(
  () => import("./ui/TransactionSummary/transaction-summary-cards-template.component"),
)
export const RenderFaqsComponent = dynamic(() => import("../../components/faq"))
export const Group = dynamic(() => import("../../components/group"))

export const components: ComponentMap = {
  faqs: RenderFaqsComponent,
  group: Group,
  unknown: Unknown,
  blockSection: BlockSection,
  card: RenderCardComponent,
  nudge: RenderNudgeComponent,
  link: RenderShareComponent,
  switchCaseBlock: SwitchCaseBlock,
  tabsComponent: RenderTabsComponent,
  formComponent: Forms,
}
export const groupVariants: ComponentMap = {}

export const stepper: ComponentMap = {}
export const cardVariants: ComponentMap = {}

export const placeholderVariants: ComponentMap = {
  "myAccount.placeholders.bookings-viewer": BookingDetails,
  //GIFT CARD
  "myAccount.placeholders.gift-card-viewer": GiftCardComponent,
  //VOUCHERS
  "myAccount.placeholders.vouchers-viewer": VouchersFilterTemplate,
  //MEMBERSHIPS
  "myAccount.placeholders.membership-cards-viewer": MembershipCardComponent,
  //PREFERENCE MANAGEMENT
  "myAccount.placeholders.preference-management": PreferenceManagement,
  //over-view booking variant
  "myAccount.placeholders.hotel-booking-overview": OverViewBooking,
  //over-view offers and benefits variant
  "myAccount.placeholders.offers-and-benefits-overview": OverViewOffersBenefits,
  //over-view Vouchers variant
  "myAccount.placeholders.vouchers-overview": OverViewVouchers,
  //over-view gift card variant
  "myAccount.placeholders.gift-cards-overview": OverViewGiftCard,
  //over-view membership variant
  "myAccount.placeholders.membership-type-overview": OverViewMembership,
  //over-view offers variant
  "myAccount.placeholders.offers-viewer": OverViewOffersBenefitsTab,
  //RENEWALS
  "loyalty.placeholders.epicure-renewal": RenewalComponent,
}
