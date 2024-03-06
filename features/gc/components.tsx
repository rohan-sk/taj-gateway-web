import { Group } from "@mui/icons-material"
import dynamic from "next/dynamic"
import {
  ComponentMap,
  Unknown,
  BlockSection,
  RenderCardComponent,
  RenderNudgeComponent,
  RenderShareComponent,
  SwitchCaseBlock,
  RenderBannerComponent,
} from "../../components"
import { RenderFaqsComponent } from "../booking/components"
import {
  RenderTabsComponent,
  RenderLayoutPlaceholder,
} from "../destination/components"
import GcLandingGrid from "./ui/gc-landing-grid.group"
import GroupWithSectionalTabs from "./ui/group-with-sectional-tabs.group"

export const components: ComponentMap = {
  faqs: RenderFaqsComponent,
  group: Group,
  unknown: Unknown,
  blockSection: BlockSection,
  card: RenderCardComponent,
  nudge: RenderNudgeComponent,
  link: RenderShareComponent,
  switchCaseBlock: SwitchCaseBlock,
  banner: RenderBannerComponent,
  tabsComponent: RenderTabsComponent,
  layoutPlaceholder: RenderLayoutPlaceholder,
}

export const groupVariants: ComponentMap = {}

export const cardVariants: ComponentMap = {}

export const placeholderVariants: ComponentMap = {}

export const layoutPlaceholderVariants: ComponentMap = {
  "giftCards.group.2-by-3-grid": GcLandingGrid,
  "ihcl.core.group.group-with-sectional-tabs": GroupWithSectionalTabs,
}
