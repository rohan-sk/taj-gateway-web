import {
  Forms,
  Unknown,
  BlockSection,
  ComponentMap,
  SwitchCaseBlock,
  RenderCardComponent,
  RenderNudgeComponent,
  RenderBannerComponent,
  RenderCarouselComponent,
} from "../../components"
import dynamic from "next/dynamic"
import Modal from "../../components/hoc/ihcllModal"
import { RenderShareComponent } from "../../components/share"
import DownLoadPdf from "../../components/downloadPdf/DownLoadPdf"
const RenderAuthenticationComponents = dynamic(() => import("../../components/authentication"))
const RenderDividerComponent = dynamic(() => import("../../components/Divider"))
export const Group = dynamic(() => import("../../components/group"))
const RenderTabsComponent = dynamic(() => import("../../components/tabs"))
const RenderSiteMapComponent = dynamic(() => import("../../components/sitemap"))
const RenderFaqsComponent = dynamic(() => import("../../components/faq"))
const RenderStepperComponent = dynamic(() => import("../../components/stepper"))
const RenderCustomComponent = dynamic(() => import("../../components/customComponents"))
const InstagramSocialMediaComponent = dynamic(() => import("./ui/instagram-social-media-component"))

const RenderPlaceHolderComponent = dynamic(() => import("../../components/placeHolder"))

export const components: ComponentMap = {
  faqs: RenderFaqsComponent,
  group: Group,
  // placeholder: DownLoadPdf,
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
  sitemapPlaceholder: RenderSiteMapComponent,
  tabsComponent: RenderTabsComponent,
  stepper: RenderStepperComponent,
  divider: RenderDividerComponent,
  authentication: RenderAuthenticationComponents,
  // tabs:RenderTabSComponent
  formComponent: Forms,
  custom: RenderCustomComponent,
}
export const groupVariants: ComponentMap = {}
export const cardVariants: ComponentMap = {}
export const placeholderVariants: ComponentMap = {
  "common-utils.placeholders.social-feed": InstagramSocialMediaComponent,
}
export const dividerVariants: ComponentMap = {}
export const layoutPlaceholderVariants: ComponentMap = {}
export const switchCaseBlockVariants: ComponentMap = {}
export const authenticationVariants: ComponentMap = {}
export const customVariants: ComponentMap = {}
