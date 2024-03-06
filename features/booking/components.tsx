import {
  Unknown,
  BlockSection,
  ComponentMap,
  SwitchCaseBlock,
  RenderCardComponent,
  RenderBannerComponent,
  RenderCarouselComponent,
  RenderNudgeComponent,
} from "../../components"
import dynamic from "next/dynamic"
import TabLinks from "../../components/TabsList"
import Modal from "../../components/hoc/tdlModal"
import { RenderShareComponent } from "../../components/share"
import DownLoadPdf from "../../components/downloadPdf/DownLoadPdf"
import CartSummaryCard from "../../components/placeHolder/cart-summary.component"
import ChangeRoomsCartSummary from "../../components/placeHolder/change-rooms-cart-summary"
import paymentDetailsCcaComponent from "./ui/payment-details-cca.component"

export const Group = dynamic(() => import("../../components/group"))
const DetailsCard = dynamic(() => import("./ui/details.card.component"))
export const RenderFaqsComponent = dynamic(() => import("../../components/faq"))
const PayAtHotelCard = dynamic(() => import("./ui/pay-at-hotel-card.component"))
const PayAtHotelFaqs = dynamic(() => import("./ui/pay-at-hotel-faqs.components"))
const BookingConfirmationScreen = dynamic(() => import("./ui/BookingConfirmationScreen"))
const ContinueToConfirm = dynamic(() => import("./ui/continue-to-confirm-button.component"))

export const components: ComponentMap = {
  faqs: RenderFaqsComponent,
  group: Group,
  placeholder: DownLoadPdf,
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
export const groupVariants: ComponentMap = {
  "bookings.group.grid-with-8-2-ration": Group,
  "bookings.group.faqs": PayAtHotelFaqs,
}

export const stepper: ComponentMap = {
  "bookings.stepper.default": Group,
}
export const cardVariants: ComponentMap = {
  "Bookings.card.payment-description": PayAtHotelCard,
}
export const switchCaseBlock: ComponentMap = {
  "bookings.stepper.default": Group,
}

export const placeholderVariants: ComponentMap = {
  "bookings.placeholders.hotels-rooms": DetailsCard,
  "myAccount.placeholders.hotels-rooms": DetailsCard,
  "bookings.placeholders.hotels-packages": DetailsCard,
  "myAccount.placeholders.hotels-packages": DetailsCard,
  "bookings.placeholders.cart-view": CartSummaryCard,
  "change.rooms.placeholders.cart-view": ChangeRoomsCartSummary,
  "bookings.placeholders.payment-details-cc-avenue": paymentDetailsCcaComponent,
  "bookings.placeholders.default-button": ContinueToConfirm,
}
export const switchCaseBlockVariants: ComponentMap = {
  "bookings.switchCaseBlock.booking-confirmation": BookingConfirmationScreen,
}
