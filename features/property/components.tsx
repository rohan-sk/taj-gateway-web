import {
  Unknown,
  BlockSection,
  ComponentMap,
  RenderCardComponent,
  RenderNudgeComponent,
  SwitchCaseBlock,
  RenderBannerComponent,
} from "../../components"
import dynamic from "next/dynamic"
import { RenderShareComponent } from "../../components/share"
export const OffersRichTextCardLayoutPlaceholder = dynamic(
  () => import("./ui/offers-rich-text-card-layout-placeholder.component"),
)
export const ExclusiveOffers = dynamic(() => import("./ui/exclusive-offers-template"))
export const GroupWithTwoColumnGrid = dynamic(() => import("./ui/group/2-column-grid.component"))
export const DefaultGroupLayoutPlaceholder = dynamic(() => import("./ui/default-layout-placeholder-group.component"))
export const OpeningsLeftMediaRightContentCard = dynamic(
  () => import("../../components/card/openings-left-media-right-content.card.component"),
)
export const EpicureParticipatingHotelsChart = dynamic(
  () => import("./ui/epicure-participating-hotels-chart.group.component"),
)
export const CarousalTabsPlaceHolder = dynamic(() => import("./ui/group/carousal-with-tabs.group"))
export const HotelInformationCard = dynamic(() => import("./ui/hotel-information/hotel-information-card.component"))
export const HotelGalleryCarousel = dynamic(() => import("./ui/hotel-gallery-carousel"))
export const HotelDetailsGalleryGroup = dynamic(() => import("./ui/hotel-details-gallery-group"))
export const HotelLocationDirections = dynamic(() => import("./ui/hotel-location-directions"))
export const HotelRoomDetailsModelComponent = dynamic(() => import("./ui/hotel-room-details-modal-component"))
export const HotelRateDetailModal = dynamic(() => import("./ui/hotel-details-rate-detailsModal"))
export const RestaurantThreeCardCarousellayoutPlaceHolder = dynamic(
  () => import("./ui/restaurant-brand-3-card-carousel"),
)
export const HolidayLeftMediaRightContent = dynamic(() => import("./ui/group/media-with-right-card-content-component"))
export const HOLIDAYSHIGLIGHTEDTWOCARDCAROUSEL = dynamic(
  () => import("./ui/group/holidays-details-higlight-two-card-carousel"),
)
export const ThreeColumnGridHolidayDetails = dynamic(() => import("./ui/group/holiday-details-3-column-grid"))
export const HotelFacilities = dynamic(() => import("./ui/hotel-facilities"))
export const RenderFaqsComponent = dynamic(() => import("../../components/faq"))
export const HotelInformation = dynamic(() => import("./ui/hotel-information/hotel-information"))
export const HotelCardWithLeftMediaRightContent = dynamic(() => import("./ui/hotel-card-with-left-media-right-content"))
export const HotelDetailsGallery = dynamic(() => import("./ui/hotel-details-gallery"))
export const ThreeCardCarousellayoutPlaceHolder = dynamic(() => import("./ui/hotel-three-card-carousel"))
export const TwoColoumnGridLayoutPlaceholder = dynamic(() => import("./ui/hotel-two-coloumn-grid"))
export const HotelDineInDetails = dynamic(() => import("./ui/hotel-dine-in-details"))
export const OffersDatesTemplate = dynamic(() => import("./ui/offers-template-dates"))
export const OffersPackageTemplate = dynamic(() => import("./ui/offers-package-template"))
export const OffersMultiPackageTemplate = dynamic(() => import("./ui/offer-multi-package-template"))
export const OffersParticipatingHotelsTemplate = dynamic(() => import("./ui/offers-participating-hotels"))
export const Group = dynamic(() => import("../../components/group"))
export const RenderLayoutPlaceholder = dynamic(() => import("../../components/layoutPlaceholder"))

export const RenderTabsComponent = dynamic(() => import("../../components/tabs"))
export const PROPERTYHIGLIGHTEDTWOCARDCAROUSEL = dynamic(
  () => import("./ui/hotel-details-highlighted-two-card-carousel"),
)

export const HotelDetailsBgImageCarousel = dynamic(() => import("./ui/hotel-details-bg-image-carousel"))
export const HotelDetailsThreeColumnGrid = dynamic(() => import("./ui/hotel-details-three-column-grid"))
export const HotelDetailsLargeImage = dynamic(() => import("./ui/hotel-details-Large-image"))
export const HotelDetailsCarouselSingleMedia = dynamic(() => import("./ui/hotel-details-carousel-single-media"))
export const AllHotelsListingComponent = dynamic(() => import("./ui/hotel-listing-component"))
export const GalleryModalPlaceHolder = dynamic(() => import("./ui/hotel-details-gallery-modal-placeholder"))
export const OffersHotelDetailsPackageInclusions = dynamic(() => import("./ui/offers-hotel-details-package-inclusions"))

export const OffersMultiRichTextContent = dynamic(() => import("./ui/offers-multi-rich-text-content"))

export const ThreeColumnGridHolidays = dynamic(() => import("./ui/group/3-column-grid-holiday-component"))

export const OffersDestinationsGroup = dynamic(() => import("./ui/group/offers-destination-card-carousel-grid"))

export const GiftHampersTwoColumnCarousel = dynamic(() => import("./ui/group/gift-hampers-2-column-carousel"))

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
export const groupVariants: ComponentMap = {
  "details.group.group-with-specifications": HotelInformationCard,
  "details.group.group-with-four-row-three-column-grid": HotelDetailsGalleryGroup,
  "details.group.group-with-2-column-cards-grid-placeholder": GroupWithTwoColumnGrid,
}

export const stepper: ComponentMap = {}
export const cardVariants: ComponentMap = {}

export const placeholderVariants: ComponentMap = {}
export const layoutPlaceholderVariants: ComponentMap = {
  "ihcl.core.group.default": DefaultGroupLayoutPlaceholder,
  "ihcl.core.group.highlighted-2-card-carousel": PROPERTYHIGLIGHTEDTWOCARDCAROUSEL,
  "ihcl.core.group.group-with-3-column-cards-grid": HotelDetailsThreeColumnGrid,
  "ihcl.core.group.carousel-with-back-ground-image": HotelDetailsBgImageCarousel,
  "details.group.group-with-card-right-media-left-content-aspect-ratio-2:4": HotelCardWithLeftMediaRightContent,
  "ihcl.core.group.tabular-data": EpicureParticipatingHotelsChart,
  "details.group.3-card-carousel": ThreeCardCarousellayoutPlaceHolder,
  "details.group.group-with-card-left-media-right-content-aspect-ratio-2:4": HotelCardWithLeftMediaRightContent,
  "details.group.hotel-dine-in-details": HotelDineInDetails,
  "details.group.group-with-2-column-cards-grid": TwoColoumnGridLayoutPlaceholder,
  "details.group.group-with-four-row-three-column-grid": HotelDetailsGallery,
  "details.group.group-with-specifications": HotelInformation,
  "details.group.group-with-bullet-points": HotelFacilities,
  "details.group.group-with-maps": HotelLocationDirections,
  "details.group.media-image-carousel": HotelGalleryCarousel,
  "details.group.group-with-room-details": HotelRoomDetailsModelComponent,
  "bookings.group.rate-detail-modal": HotelRateDetailModal,
  "details.group.group-with-full-width-media": HotelDetailsLargeImage,
  "details.group.group-with-carousel-card-left-media-right-content-aspect-ratio-2:4": HotelDetailsCarouselSingleMedia,
  "details.group.2-column-grid-hotels-list": GroupWithTwoColumnGrid,
  "loyalty.2-card-carousel": GiftHampersTwoColumnCarousel,
  "details.group.group-with-2-column-cards-grid-placeholder": GroupWithTwoColumnGrid,
  "details.group.group-with-validity-dates": OffersDatesTemplate,
  "offers.group.3-column-grid-with-package-icons": OffersPackageTemplate,
  "offers.group.3-column-grid-with-multi-package-icons": OffersMultiPackageTemplate,
  "ihcl.core.group.group-with-3-column-cards-grid-placeholder": OffersParticipatingHotelsTemplate,
  "holidays.group.3-column-grid-with-participating-hotels": ThreeColumnGridHolidays,
  "ihcl.core.group.multi-static-with-tabs": ExclusiveOffers,
  "details.group.media-gallery-carousel": GalleryModalPlaceHolder,
  "ihcl.core.group.carousel-with-tabs-layout-placeholder": CarousalTabsPlaceHolder,
  "ihcl.core.group.carousel-with-three-column-grid-layout-placeholder": RestaurantThreeCardCarousellayoutPlaceHolder,
  "ihcl.core.group.3-column-grid-with-border-offers-layout-placeholder": OffersHotelDetailsPackageInclusions,
  "details.group.group-with-card-left-media-right-content-aspect-ratio-2:4-layout-placeholder":
    HolidayLeftMediaRightContent,
  "ihcl.core.group.highlighted-2-card-carousel-layout-placeholder": HOLIDAYSHIGLIGHTEDTWOCARDCAROUSEL,
  "ihcl.core.group.group-with-3-column-cards-grid-holiday-layout-placeholder": ThreeColumnGridHolidayDetails,
  "details.card.opening-soon-hotels-details": OpeningsLeftMediaRightContentCard,
  "details.group.group-4d-destination-grid": OffersDestinationsGroup,
  "offers.group.multiple-rich-text-content": OffersMultiRichTextContent,
  "ihcl.core.card.card-with-description-actions": OffersRichTextCardLayoutPlaceholder,
}
