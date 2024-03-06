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
import Modal from "../../components/hoc/tdlModal"
import { RenderShareComponent } from "../../components/share"
import RenderPlaceHolderComponent from "../../components/placeHolder"

export const loyaltyConfirmationCardComponent = dynamic(
  () => import("../../components/card/loyalty-confirmation-card.component")
)
export const RenderFaqsComponent = dynamic(() => import("../../components/faq"))

export const Group = dynamic(() => import("../../components/group"))

export const MembershipDetailsComponent = dynamic(
  () =>
    import("../../components/card/membership-purchase-detail-card.component")
)

export const MembershipProductPriceDetailComponent = dynamic(
  () =>
    import("../../components/card/membership-product-price-detail.component")
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
  switchCaseBlock: SwitchCaseBlock,
  tabLinks: TabLinks,
}
export const groupVariants: ComponentMap = {}

export const stepper: ComponentMap = {}
export const cardVariants: ComponentMap = {}

export const placeholderVariants: ComponentMap = {}
export const switchCaseBlockVariants: ComponentMap = {}
