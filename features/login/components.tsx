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
import TabLinks from "../../components/TabsList"
import Modal from "../../components/hoc/tdlModal"
import { RenderShareComponent } from "../../components/share"
import RenderPlaceHolderComponent from "../../components/placeHolder"
import Group from "../../components/group"
import otpScreenComponent from "../../components/Login/OtpInputLogic/otpScreen.component"
import OtpScreenVerifyEmail from "../../components/Login/OtpInputLogic/otp-screen-for-verify-email.component"

export const components: ComponentMap = {
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

export const placeholderVariants: ComponentMap = {
  "authentication.mobile-number-verification": otpScreenComponent,
  "myAccount.placeholders.email-otp-verification": OtpScreenVerifyEmail,
}
export const switchCaseBlockVariants: ComponentMap = {}
