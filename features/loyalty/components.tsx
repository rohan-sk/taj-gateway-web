import {
  Unknown,
  BlockSection,
  ComponentMap,
  RenderCardComponent,
  RenderBannerComponent,
  RenderCarouselComponent,
  RenderNudgeComponent,
  SwitchCaseBlock,
} from "../../components"
import dynamic from "next/dynamic"
import TabLinks from "../../components/TabsList"
import Modal from "../../components/hoc/ihcllModal"
import { RenderShareComponent } from "../../components/share"

export const RenderPlaceHolderComponent = dynamic(() => import("../../components/placeHolder"))
export const RenderLayoutPlaceholder = dynamic(() => import("../../components/layoutPlaceholder"))
export const RenderEpicureFaqComponents = dynamic(() => import("./UI/render-epicure-faq-components.component"))
export const RenderEpicureTermsAndConditionsComponent = dynamic(
  () => import("./UI/render-epicure-terms-and-conditions.component"),
)
export const RenderEpicurePageComponents = dynamic(() => import("./UI/render-epicure-page-components.component"))
export const RenderEpicureMembershipCards = dynamic(() => import("./UI/render-epicure-membership-cards.components"))
export const loyaltyConfirmationCardComponent = dynamic(
  () => import("../../components/card/loyalty-confirmation-card.component"),
)
export const RenderFaqsComponent = dynamic(() => import("../../components/faq"))

export const Group = dynamic(() => import("../../components/group"))

export const MembershipDetailsComponent = dynamic(
  () => import("../../components/card/membership-purchase-detail-card.component"),
)

export const MembershipProductPriceDetailComponent = dynamic(
  () => import("../../components/card/membership-product-price-detail.component"),
)
export const components: ComponentMap = {
  faqs: RenderFaqsComponent,
  group: Group,
  placeholder: RenderPlaceHolderComponent,
  unknown: Unknown,
  blockSection: BlockSection,
  card: RenderCardComponent,
  nudge: RenderNudgeComponent,
  banner: RenderBannerComponent,
  carousel: RenderCarouselComponent,
  link: RenderShareComponent,
  modal: Modal,
  layoutPlaceholder: RenderLayoutPlaceholder,
  switchCaseBlock: SwitchCaseBlock,
  tabLinks: TabLinks,
}
export const groupVariants: ComponentMap = {}

export const stepper: ComponentMap = {}
export const cardVariants: ComponentMap = {}

export const placeholderVariants: ComponentMap = {
  "loyalty.placeholders.membership-holder-details": MembershipDetailsComponent,
  "loyalty.placeholders.price-breakup-details": MembershipProductPriceDetailComponent,
}

export const layoutPlaceholderVariants: ComponentMap = {
  "loyalty.group.discount-carousel": RenderEpicurePageComponents,
  "loyalty.tier-card-with-right-aligned-content": RenderEpicureMembershipCards,
  "loyalty.card.outlined-border-with-actions": RenderEpicureFaqComponents,
  "loyalty.group.epicureprogram.terms-and-conditions": RenderEpicureTermsAndConditionsComponent,
}

export const switchCaseBlockVariants: ComponentMap = {
  "loyalty-loyalty-confirmation": loyaltyConfirmationCardComponent,
}
