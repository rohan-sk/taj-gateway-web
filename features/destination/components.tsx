import {
  Unknown,
  BlockSection,
  ComponentMap,
  RenderCardComponent,
  RenderNudgeComponent,
  SwitchCaseBlock,
  RenderBannerComponent,
} from "../../components";
import dynamic from "next/dynamic";
import { RenderShareComponent } from "../../components/share";

export const RenderFaqsComponent = dynamic(
  () => import("../../components/faq")
);

export const DestinationOfferCard = dynamic(
  () => import("./ui/group/destination-offers-card")
);

export const DestinationGroupWithFilterCards = dynamic(
  () => import("./ui/group/destination-group-filter-component")
);

export const Group = dynamic(() => import("../../components/group"));
export const RenderLayoutPlaceholder = dynamic(
  () => import("../../components/layoutPlaceholder")
);

export const RenderTabsComponent = dynamic(
  () => import("../../components/tabs")
);

export const DESTINATIONHIGHLIGHTSCARDCAROUSEL = dynamic(
  () =>
    import("./ui/group/details.group.center-card-carousel-layout-placeholder")
);

export const DestinationCarouselSingleMedia = dynamic(
  () => import("./ui/group/group-with-carousel-card-left-media-right-content")
);

export const SearchResultCardDestinationComponent = dynamic(
  () => import("./ui/searchComponent/search-result-card-in-destinations")
);

export const TwoColoumnGridLayoutPlaceholderDestination = dynamic(
  () => import("./ui/group/destination-2-column-grid")
);

export const DestinationRowCarousel = dynamic(
  () => import("./ui/group/destination-row-carousel")
);

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
};
export const groupVariants: ComponentMap = {};

export const stepper: ComponentMap = {};
export const cardVariants: ComponentMap = {};

export const placeholderVariants: ComponentMap = {};

export const layoutPlaceholderVariants: ComponentMap = {
  "ihcl.core.group.group-with-3-column-cards-grid-layout-placeholder":
    DESTINATIONHIGHLIGHTSCARDCAROUSEL,
  "details.group.group-with-carousel-card-left-media-right-content-aspect-ratio-2:4-layout-placeholder":
    DestinationCarouselSingleMedia,
  "details.group.3-card-carousel-layout-placeholder": DestinationOfferCard,
  "details.group.group-with-card-left-media-right-content-and-price-layout-placeholder":
    SearchResultCardDestinationComponent,
  "details.group.group-with-2-column-cards-grid-layout-placeholder":
    TwoColoumnGridLayoutPlaceholderDestination,
  "details.group.group-with-2-column-cards-grid-placeholder":
    TwoColoumnGridLayoutPlaceholderDestination,
  "details.group.group-with-two-row-box-tabs-layout-placeholder":
    DestinationGroupWithFilterCards,
    "details.group.group-with-row-carousel":
    DestinationRowCarousel
};
