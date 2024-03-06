import dynamic from "next/dynamic"
const StepperCardsGroupComponent = dynamic(() => import("../components/group/stepper-cards.group.component"))
const GiftCardFormWrapperComponent = dynamic(() => import("../components/group/gift-card-form-wrapper.component"))
const RenderEpicureFormItems = dynamic(() => import("../features/loyalty/UI/render-epicure-form-items.component"))
const ComparisonModal = dynamic(() => import("../components/hoc/ComparisonModal"))
const RenderEpicureForm = dynamic(() => import("../features/loyalty/UI/render-epicure-form.component"))
const DefaultGroupwithOutActionBtns = dynamic(() => import("../components/group/default-group-without-action-btns"))
const RichText = dynamic(() => import("../components/group/richtext"))
const FeedbackTabs = dynamic(() => import("../components/contactus/FeedbackTabs"))
const DropDownTabs = dynamic(() => import("../components/tabs/drop-down-tabs.component"))
const ReservationCenter = dynamic(() => import("../components/contactus/ReservationCenter"))
const PortableDescription = dynamic(() => import("../components/portable-text/portable-text-title-desc"))
const MultipleCardsWithTabs = dynamic(() => import("../components/card/card-with-tabs-membership-component"))
const FoodTimingFacilities = dynamic(() => import("../components/group/group-with-food-timings-facilities"))
const DateTimingFacilities = dynamic(() => import("../components/group/group-with-date-facilities"))
const FacilitiesGrid = dynamic(() => import("../components/group/group-with-facilities-grid"))
const MediaImageCarousel = dynamic(() => import("../components/group/group-media-image-carousel"))
const GiftCardTabs = dynamic(() => import("../components/tabs/gift-card/gift-card-tabs.component"))
const LoyaltyGroupProductPayment = dynamic(() => import("../components/group/group-loyalty-product-payment"))
const GiftCardDynamicTitle = dynamic(() => import("../components/group/GiftCardDynamicTitle"))
const MobileTabsCarousel = dynamic(() => import("../components/carousal/mobile-tabs-carousel"))
const WebTabsCarousel = dynamic(() => import("../components/carousal/web-tabs-carousel"))
const HotelDropDownTabs = dynamic(() => import("../components/tabs/hotel-drop-down-component"))
const HotelTabComponent = dynamic(() => import("../components/tabs/hotel-tab-component"))
const DestinationTabComponent = dynamic(() => import("../components/tabs/destination-tab-component"))
const DestinationDropDownTabs = dynamic(() => import("../components/tabs/destination-drop-down-component"))
const HotelContactGroup = dynamic(() => import("../components/group/global-hotel-contact.group.component"))
const EventMediaCardFilter = dynamic(() => import("../components/carousal/sampleCarousel"))
const ReservationContacts = dynamic(() => import("../components/group/group-with-reservation-contacts.componet"))
const GCFailureSuccessComponent = dynamic(() => import("../components/group/gc-failure-success.component"))
const AccordionParent = dynamic(() => import("../components/GenericAccordion/accordion-parent.component"))
const ChambersTabsAndItemsGroup = dynamic(() => import("../components/group/chambers-tabs-and-items-group"))
const RenderOverViewComponent = dynamic(() => import("../components/MyAccount/over-view/render-over-view.component"))
const RenderAccountComponents = dynamic(() => import("../components/MyAccount/render-account-components"))
const AccountDetails = dynamic(() => import("../components/MyAccount/AccountHeader/account-details"))
const VenueItemDetails = dynamic(() => import("../components/venueDetails/VenueItemDetails"))
const SearchAddress = dynamic(() => import("../components/Login/register-form/search-address.component"))
const DefaultAccordionComponent = dynamic(() => import("../components/accordion/default-qa-component"))
const NudgeWithLoginForm = dynamic(() => import("../components/nudge/nudge-with-login-form"))
const TierCardWithContent = dynamic(() => import("../components/card/tier-card-with-content.component"))
const LoyaltyCardsEnrollForm = dynamic(() => import("../components/forms/loyalty-form/loyalty-cards-enroll-form"))
const CarouselWithFourCards = dynamic(() => import("../components/carousal/carousal-with-4-cards.component"))
const CarouselWithTwoCards = dynamic(() => import("../components/carousal/carousel-with-2-cards.component"))
const GroupPreviewCarousel = dynamic(() => import("../components/group/group-preview-carousel.component"))
const AlternateCardDescription = dynamic(() => import("../components/card/alternate-card-description"))
const MultiCards = dynamic(() => import("../components/card/multi-cards-component"))
const CardWithHover = dynamic(() => import("../components/card/card-with-hover.component"))
const MediaCardWithBgImageCarousal = dynamic(() => import("../components/carousal/media-card-with-bg-img.component"))
const GroupWithLargeMedia = dynamic(() => import("../components/banner/simple-banner.component"))
const CarousalTabs = dynamic(() => import("../components/carousal/tabs-in-carousal.component"))
const CarousalWithTitleCard = dynamic(() => import("../components/group/title-card-carousal.component"))
const GroupWithThreeColumnCardsGrid = dynamic(() => import("../components/group/3-column-group.component"))
const GroupWithThreeColumnGiftCardsGrid = dynamic(() => import("../components/group/3-column-group.forGC.component"))
const MultiCardsCarousal = dynamic(() => import("../components/carousal/multi-card-carousal.component"))
const CenterCardCarousal = dynamic(() => import("../components/carousal/center-card-carousal.component"))
const GroupWithMedia = dynamic(() => import("../components/group/group-with-media"))
const GroupWithRichText = dynamic(() => import("../components/group/group-with-rich-text.component"))
const GroupWithFilterCards = dynamic(() => import("../components/group/group-with-filter-cards.component"))
const GroupWithMultipleButtons = dynamic(() => import("../components/group/group-with-multiple-buttons.component"))
const BasicTabs = dynamic(() => import("../components/tabs/basic-tab-component"))
const MediaWellness = dynamic(() => import("../components/media/media-wellness"))
const SixCardsCarousal = dynamic(() => import("../components/carousal/six-cards-carousal.component"))
const SingleCardCarousal = dynamic(() => import("../components/carousal/single-card-carousal.component"))
const CardWithCard = dynamic(() => import("../components/card/card-with-card-component"))
const FourColumnCardsGrid = dynamic(() => import("../components/group/4-column-cards-grid.component"))
const SingleColumnCardsGrid = dynamic(() => import("../components/group/1-column-cards-grid.component"))
const CardWithGrid = dynamic(() => import("../components/card/card-with-grid-component"))
const TwoColumnGridForMsite = dynamic(() => import("../components/group/2-column-grid-for-mSite.component"))
const GroupWithSectionalTabsComponent = dynamic(() => import("../components/group/group-with-sectional-tabs.component"))
const GridWrapper = dynamic(() => import("../components/gridLayouts/grid-wrapper.component"))
const GroupWithPlaceHolder = dynamic(() => import("../components/group/group-with-place-holder.component"))
const DropdownMsiteSelector = dynamic(() => import("../components/group/group-with-dropdown-selector"))
const ContactUsComponent = dynamic(() => import("../components/group/contact-us-component"))
const FilterByContactInfo = dynamic(() => import("../components/group/filter-by-contact-info"))
const GroupWithMasonryCard = dynamic(() => import("../components/group/group-with-masonry-card"))
const LoyaltyChambersTabsImageContent = dynamic(() => import("../components/group/group-image-with-content"))
const GroupWithTwoColumnCardsGrid = dynamic(() => import("../components/group/2-column-cards-grid-content.component"))
const ThreeColumnGroupWithCarousal = dynamic(() => import("../components/group/3-column-group-with-carousal.component"))
const LoginFormWithMultipleTabsComponent = dynamic(
  () => import("../components/Login/new-login-form-with-multiple-tabs.component"),
)
const GroupWithThreeColumnCardsWithBorder = dynamic(
  () => import("../components/group/3-column-cards-with-border.component"),
)
const CardWithBackGroundImageTwoOptions = dynamic(
  () => import("../components/card/card-with-bg-img-multiple-title-component"),
)
const PropItemsMsiteModal = dynamic(() =>
  import("../components/hoc/CommonMsiteModalAlignment/PropItemsMsiteModal").then(
    (module) => module.PropItemsMsiteModal,
  ),
)
const GalleryCarousel = dynamic(() =>
  import("../components/GalleryCarousel/GalleryCarousel").then((module) => module.GalleryCarousel),
)
const ThankYouScreenCarousal = dynamic(
  () => import("../components/Login/thank-you-screen-carousal/thank-you-screen-carousal.component"),
)
const RenderReserveTableForm = dynamic(
  () => import("../components/forms/enquiry-forms/reserve-a-table-enquire-form/render-reserve-table-form"),
)
const RenderModifyBooking = dynamic(
  () => import("../components/MyAccount/modify-booking/render-modify-booking.component"),
)
const AccountHeaderLogout = dynamic(
  () => import("../components/MyAccount/AccountHeader/account-header-logout.component"),
)
const GroupWithThreeColumnWithTwoActionComponent = dynamic(
  () => import("../components/group/group-with-three-column-with-two-action-component"),
)
const OffersTermsAndConditionsComponent = dynamic(
  () => import("../features/property/ui/group/offers-terms-and-conditions-component"),
)
const WeddingTabsWithBackgroundColor = dynamic(
  () => import("../components/carousal/wedding-tabs-with-bgColor-carousel"),
)
const AuthenticationGroupGrid = dynamic(
  () => import("../components/Login/InitialScreen/authentication-group-grid.component"),
)
const CardWithRightAlignedHighlightsComponent = dynamic(
  () => import("../components/card/card-with-right-aligned-highlights.component"),
)
const MultiCardsCarousalWithBgImage = dynamic(
  () => import("../components/carousal/multi-cards-carousal-with-bg.component"),
)
const MultiCardsCarousalWithGoldColorText = dynamic(
  () => import("../components/carousal/multi-cards-carousel-with-gold-color-text"),
)
const GroupCarousalWithArrows = dynamic(
  () => import("../components/group/3-column-group-with-carousal-with-arrows.component"),
)
const CarouselWithTwoHighlightedCards = dynamic(
  () => import("../components/carousal/carousel-with-2-highlighted-cards.component"),
)
const CarouselWithOneHighlightedCard = dynamic(
  () => import("../components/carousal/carousal-with-1-highlighted-card.component"),
)
const GroupWithSingleCardCarousal = dynamic(
  () => import("../components/group/group-with-single-card-carousal.component"),
)
const GridWithTwoColumnsEightByFourAspectRatio = dynamic(
  () => import("../components/gridLayouts/eight-four-ratio-grid.component"),
)
const GroupWithVerticalImagContent = dynamic(
  () => import("../components/group/group-with-vertical-imag-content.component"),
)
const GroupWithHexagonalContentComponent = dynamic(
  () => import("../components/group/group-with-hexagonal-content-component"),
)
const RenderMembershipSuccessDetails = dynamic(
  () => import("../components/group/render-membership-success-details.components"),
)
const GroupWithQuestionsAndAnswersComponent = dynamic(
  () => import("../components/group/group-with-questions-and-answers.component"),
)
const GroupWithTermsAndConditionsComponent = dynamic(
  () => import("../components/group/group-with-terms-and-conditions-component"),
)
const GroupWithBombayBrasserieInfo = dynamic(
  () => import("../components/group/group-with-bombay-brasserie-restaurants"),
)
const GroupWidthBrasserieRestaurantsInfo = dynamic(
  () => import("../components/group/group-width-brasserie-restaurants-info"),
)

const GroupComponentRenderingUtility = ({
  context,
  isMobile,
  analyticsEventProps,
  filteredProps,
  backgroundColor,
  textColor,
  isLoyalty,
}: any) => {
  const {
    variant,
    largeVariant,
    aesthetic,
    initialSlide,
    characterLimitForItemDescription,
    isDropDown,
    isSearchEnabled,
    parameterMap,
    alternateAllLinks,
    preRenderItemsCount,
    primaryAction,
    secondaryAction,
    backgroundImage,
    items,
    analytics,
    tabsConfig,
    groupActionType,
    largeImage,
    image,
  } = filteredProps
  let tempVariant = (isMobile || !largeVariant) && variant ? variant : largeVariant

  const defaultComponents: any = {
    "ihcl.core.group.group-with-split-cards": {
      mobile: <CenterCardCarousal props={items} aesthetic={aesthetic} variant={variant} />,
      web: <CardWithHover props={items} {...analyticsEventProps} />,
    },
    "loyalty.group.carousel-with-selected-image-tabs": {
      mobile: (
        <MobileTabsCarousel props={items} initialSlide={initialSlide} largeVariant={variant} aesthetic={aesthetic} />
      ),
      web: (
        <WebTabsCarousel
          props={items}
          initialSlide={initialSlide}
          largeVariant={variant}
          aesthetic={aesthetic}
          preRenderItemsCount={preRenderItemsCount}
        />
      ),
    },
    "details.group.navigation-tabs": {
      mobile: <DropDownTabs props={items} />,
      web: <BasicTabs props={items} />,
    },
    "details.hotels.group.navigation-tabs": {
      mobile: <HotelDropDownTabs />,
      web: <HotelTabComponent />,
    },
    "details.group.destination.navigation-tabs": {
      mobile: <DestinationDropDownTabs />,
      web: <DestinationTabComponent />,
    },
    "aboutUs.group.split-cards": {
      mobile: <CenterCardCarousal props={items} aesthetic={aesthetic} variant={variant} />,
      web: <CardWithHover props={items} {...analyticsEventProps} largeVariant={variant} />,
    },
    "ihcl.core.group.carousel-with-tabs": (
      <CarousalTabs
        props={items}
        initialSlide={initialSlide}
        largeVariant={largeVariant}
        aesthetic={aesthetic}
        analytics={analytics}
        {...analyticsEventProps}
      />
    ),
    "ihcl.core.group.hotel-address-data": (
      <RichText
        props={items}
        isSearchEnabled={isSearchEnabled}
        isPaginationEnabled={true}
        variant={variant}
        secondaryAction={secondaryAction}
        preRenderItemsCount={preRenderItemsCount}
        alternateAllLinks={alternateAllLinks}
      />
    ),
    "ihcl.core.group.center-aligned-content": (
      <RichText props={items} isPaginationEnabled={false} secondaryAction={secondaryAction} />
    ),
    "partners.group.multiple-row-2-column-grid": <TwoColumnGridForMsite props={items} />,
    "details.group.group-with-card-left-media-right-content-with-tabs-aspect-ratio-2:4": (
      <WeddingTabsWithBackgroundColor props={filteredProps} aesthetic={aesthetic} />
    ),
    "details.group.reservation-contacts": (
      <ReservationContacts
        props={items}
        isDropDown={isDropDown}
        isSearchEnabled={isSearchEnabled}
        characterLimitForItemDescription={characterLimitForItemDescription}
        parameterMap={parameterMap}
        variant={variant}
        textColor={textColor}
        tabsConfig={tabsConfig}
        preRenderItemsCount={preRenderItemsCount}
        backgroundColor={backgroundColor}
      />
    ),
    "ihcl.core.group.group-with-3-column-cards-grid": (
      <GroupWithThreeColumnCardsGrid
        props={items}
        isDropDown={isDropDown}
        isSearchEnabled={isSearchEnabled}
        characterLimitForItemDescription={characterLimitForItemDescription}
        parameterMap={parameterMap}
        variant={variant}
        textColor={textColor}
        tabsConfig={tabsConfig}
        preRenderItemsCount={preRenderItemsCount}
        backgroundColor={backgroundColor}
      />
    ),
    "giftCards.group.2-by-3-grid": (
      <GroupWithThreeColumnGiftCardsGrid
        props={items}
        isDropDown={isDropDown}
        isSearchEnabled={isSearchEnabled}
        characterLimitForItemDescription={characterLimitForItemDescription}
        parameterMap={parameterMap}
        variant={variant}
        parentProps={filteredProps}
        preRenderItemsCount={preRenderItemsCount}
        analyticsEventProps={analyticsEventProps}
      />
    ),
    "single-column-grid": (
      <GroupWithTwoColumnCardsGrid
        props={items}
        parameterMap={parameterMap}
        preRenderItemsCount={preRenderItemsCount}
      />
    ),
    "details.group.group-with-2-column-cards-grid": (
      <GroupWithTwoColumnCardsGrid
        props={items}
        isDropDown={isDropDown}
        isSearchEnabled={isSearchEnabled}
        parameterMap={parameterMap}
        preRenderItemsCount={preRenderItemsCount}
        // seo={seo}
      />
    ),
    "ihcl.core.group.3-column-grid-with-border": (
      <GroupWithThreeColumnCardsWithBorder
        props={items}
        showDivider={true}
        renderItemsCount={filteredProps?.preRenderItemsCount}
      />
    ),
    "ihcl.core.group.multi-static-with-tabs": (
      <CarousalTabs
        disablePaddings={filteredProps?.disablePaddings || false}
        props={items}
        initialSlide={initialSlide}
        largeVariant={largeVariant}
        aesthetic={aesthetic}
        analytics={analytics}
        {...analyticsEventProps}
      />
    ),
    "ihcl.core.group.group-with-stepper-and-tabs": <GiftCardDynamicTitle {...filteredProps} />,
    "ihclForms.group.feedback-form": <FeedbackTabs props={items?.[0]} />,
    "loyalty.3-row-grid": (
      <GroupWithThreeColumnCardsGrid
        props={items}
        isDropDown={isDropDown}
        isSearchEnabled={isSearchEnabled}
        characterLimitForItemDescription={characterLimitForItemDescription}
        parameterMap={parameterMap}
        variant={variant}
        preRenderItemsCount={preRenderItemsCount}
      />
    ),
    "loyalty.tier-card-with-right-aligned-content": (
      <CardWithCard props={items} isLoyalty={isLoyalty} parentProps={filteredProps} />
    ),
    "loyalty.group-with-tiers": <GroupPreviewCarousel props={items} />,
    "ihcl.core.group.images-with-single-column-grid": (
      <SingleColumnCardsGrid props={items} {...filteredProps} textColor={textColor} />
    ),
    "variant-3": <ThreeColumnGroupWithCarousal props={items} />,
    "ihcl.core.group.carousel-with-three-column-grid": (
      <GroupCarousalWithArrows props={items} parentProps={filteredProps} />
    ),
    "loyalty.group.tabular-grid": <ComparisonModal props={filteredProps} />,
    "privacy-policy-accordian-with-description": <PortableDescription props={items} />,
    "variant-4": <ThreeColumnGroupWithCarousal props={items} />,
    "ihcl.core.group.four-column-rectangle-grid": <FourColumnCardsGrid {...filteredProps} />,
    "details.group.group-with-full-width-media": <GroupWithLargeMedia props={items} />,
    "businessServices.group.full-width-media-with-bottom-content": <GroupWithLargeMedia props={items} />,
    "details.group.center-card-carousel": (
      <MultiCardsCarousal props={items} aesthetic={aesthetic} alternateAllLinks={alternateAllLinks} />
    ),
    "details.group.group-with-card-left-media-right-content-aspect-ratio-2:4": <MediaWellness props={items} />,
    "ihcl.core.group.multiple-square-card-carousel": <SixCardsCarousal items={items} />,
    "ihcl.core.group.carousal-with-single-card-media": (
      <SingleCardCarousal props={items} parameterMap={parameterMap?.[0]} />
    ),
    "highlighted-1-card-carousel": <CarouselWithOneHighlightedCard props={items} />,
    "details.group.group-with-carousel-card-left-media-right-content-aspect-ratio-2:4": (
      <GroupWithSingleCardCarousal props={items} />
    ),
    "details.group.equally-occupied-section-with-text-bg-color": (
      <GroupWithSingleCardCarousal props={items} variant={tempVariant} />
    ),
    "details.group.tab-dropdown-selector": <DropdownMsiteSelector props={items} />,
    "ihcl.core.group.multiple-row-four-column-grid": <MultiCards props={items} />,
    "loyalty.group-with-comperative-specifications": <CardWithGrid props={items?.[0]} />,
    "loyalty.2-card-carousel": <CarouselWithTwoCards props={items} />,
    "loyalty.4-card-carousel": <CarouselWithFourCards props={items} />,
    "ihclForms.group.details-form": <LoyaltyCardsEnrollForm props={items} parentProps={filteredProps} />,
    "loyalty.group.form-details-with-neucoins": <LoyaltyCardsEnrollForm props={items} parentProps={filteredProps} />,
    "ihcl.core.group.grid-with-2-columns": <TwoColumnGridForMsite props={items} />,
    "tier-card-with-content": <TierCardWithContent props={items} />,
    "ihcl.core.group.signup-form": <NudgeWithLoginForm {...items?.[0]} />,
    "details.group.group-with-maps": <DefaultAccordionComponent props={items} />,
    "loyalty.group.group-of-gift-items-right-content": <CardWithRightAlignedHighlightsComponent props={items} />,
    "ihcl.core.group.8-4-ratio-grid-with-only-two-items": <GridWithTwoColumnsEightByFourAspectRatio props={items} />,
    "authentication.group.membership-carousel": <ThankYouScreenCarousal props={items} />,
    "ihcl.core.group.hotel-address-data-layout-placeholder": <HotelContactGroup {...filteredProps} />,
    "details.group.group-with-card-right-media-left-content-aspect-ratio-2:4": <GroupWithMedia props={items} />,
    "bookings.group.grid-wrapper": <GridWrapper props={items} />,
    "authentication.group.grey-grid": <AuthenticationGroupGrid props={items} parameterMap={parameterMap} />,
    "loyalty.group-4-cards-with-comperative-specifications": <MultipleCardsWithTabs props={items?.[0]} />,
    "bookings.group.booking-payment-return": <GroupWithPlaceHolder props={items} />,
    "offers.group.t&c-dropdown-content": <GroupWithTermsAndConditionsComponent {...filteredProps} />,
    "ihcl.core.group.contact-info": <ContactUsComponent props={items} />,
    "ihcl.core.group.filter-address-dropdown": <FilterByContactInfo props={items} />,
    "information-data": <GroupWithRichText props={items} />,
    "authentication.group.2-column-login-grid": <LoginFormWithMultipleTabsComponent data={filteredProps} />,
    "details.group.full-width-media-with-logo": <GroupWithLargeMedia props={items} />,
    "loyalty.group.image-with-content-aligned-space-between": <LoyaltyChambersTabsImageContent props={filteredProps} />,
    "loyalty.group.grid-with-only-two-items": <RenderEpicureForm props={filteredProps} />,
    "loyalty.group.grid-wrapper": <RenderEpicureFormItems props={filteredProps} />,
    "loyalty.group.center-aligned-space-between-image": <LoyaltyChambersTabsImageContent props={filteredProps} />,
    "giftCards.group.stepper-tabs": <StepperCardsGroupComponent props={filteredProps} />,
    "giftCards.group.form-wrapper": <GiftCardFormWrapperComponent props={filteredProps} />,
    "ihcl.core.group.group-with-multiple-buttons": <GroupWithMultipleButtons props={items} />,
    "ihcl.core.group.group-with-vertical-components": <GroupWithVerticalImagContent props={items} />,
    "alternate-image-with-description": <AlternateCardDescription props={items} />,
    "details.group.carousel-with-side-text-card": <MediaCardWithBgImageCarousal props={items} />,
    "details.group.group-with-room-details": <VenueItemDetails props={items} />,
    "myAccount.group.section-specific-details": <AccountDetails />,
    "myAccount.group.account-tabs-list": <RenderAccountComponents props={items} />,
    "details.group.media-image-carousel": <MediaImageCarousel props={items} />,
    "myAccount.group.overview-viewer": <RenderOverViewComponent props={items} />,
    "ihcl.core.group.toll-free-no": <ReservationCenter props={items} />,
    "details.group.group-with-rich-text-columns": <DateTimingFacilities props={items} primaryAction={primaryAction} />,
    "details.group.hotel-facilities": <FacilitiesGrid props={items} />,
    "details.group.hotel-dine-in-details": <FoodTimingFacilities props={items} />,
    "group-with-carousel": <GalleryCarousel props={items} />,
    "ihcl.core.group.group-with-sectional-tabs": <GroupWithSectionalTabsComponent props={items} />,
    "authentication.group.maps-with-aspect-ratio-6:6": <SearchAddress {...items} />,
    "ihcl.core.group.hexagonal-content": <GroupWithHexagonalContentComponent props={items} />,
    "myAccount.group.title-with-subHeader": <AccountHeaderLogout />,
    "myAccount.group.modify-booking-details": (
      <RenderModifyBooking props={items} alternateAllLinks={alternateAllLinks} parameterMap={parameterMap} />
    ),
    "loyalty.group.membership-purchase-details": <RenderMembershipSuccessDetails props={items} />,
    "loyalty.group.loyalty-product-payment-and-information": <LoyaltyGroupProductPayment props={items} />,
    "giftCards.group.horizontal-tabs": <GiftCardTabs props={items} />,
    "ihcl.core.group.option-selector-popup-modal": <PropItemsMsiteModal props={items} initialSlide={initialSlide} />,
    "partners.group.questions-and-answers": <GroupWithQuestionsAndAnswersComponent props={items?.[0]} />,
    "ihclForms.group.table-reservation": <RenderReserveTableForm props={items} />,
    "ihcl.core.group.highlighted-2-card-carousel": <CarouselWithTwoHighlightedCards props={items} />,
    "events.group.wedding-randomly-arranged-media": <GroupWithMasonryCard props={{ ...items, ...filteredProps }} />,
    "events.group.filter-tab-media": <EventMediaCardFilter {...filteredProps} />,
    "ihcl.core.group.accordion-wrapper": <AccordionParent {...filteredProps} />,
    "giftCards.group.failure-status": <GCFailureSuccessComponent {...filteredProps} />,
    "ihcl.core.group.default": <ChambersTabsAndItemsGroup {...filteredProps} />,
    "ihcl.core.group.default-without-action-button": <DefaultGroupwithOutActionBtns {...filteredProps} />,
    "details.group.3-card-carousel-with-center-aligned-carousel-icons": (
      <CarousalWithTitleCard
        props={items}
        largeVariant={largeVariant}
        characterLimitForItemDescription={characterLimitForItemDescription}
      />
    ),
    "details.group.3-card-carousel": (
      <CarousalWithTitleCard
        props={items}
        largeVariant={largeVariant}
        characterLimitForItemDescription={characterLimitForItemDescription}
        groupActionType={groupActionType}
      />
    ),
    "loyalty.group.discount-carousel": (
      <CarousalWithTitleCard
        props={items}
        largeVariant={largeVariant}
        characterLimitForItemDescription={characterLimitForItemDescription}
        groupActionType={groupActionType}
      />
    ),
    "businessServices.group.group-with-1:2-outer-padding": (
      <GroupWithThreeColumnWithTwoActionComponent props={items} alternateAllLinks={alternateAllLinks} />
    ),
    "businessServices.group.factSheet-download-action-with-bg-img": (
      <CardWithBackGroundImageTwoOptions props={items} backgroundImage={backgroundImage} />
    ),
    "offers.group.t&c-dropdown-content-layout-placeholder": (
      <OffersTermsAndConditionsComponent aesthetic={aesthetic} {...filteredProps} />
    ),
    "details.group.group-with-two-row-box-tabs": (
      <GroupWithFilterCards props={items} alternateAllLinks={alternateAllLinks} {...analyticsEventProps} />
    ),
    "ihcl.core.group.carousel-with-back-ground-image": (
      <MultiCardsCarousalWithBgImage props={items} {...analyticsEventProps} />
    ),
    "common-utils.group.center-moving-carousel-with-background-gradient": (
      <MultiCardsCarousalWithGoldColorText props={filteredProps} {...analyticsEventProps} />
    ),
    "common-utils.group.bombay-brasserie-info": (
      <GroupWithBombayBrasserieInfo props={items} largeImage={largeImage} image={image} />
    ),
    "common-utils.group.various-contact-details": <GroupWidthBrasserieRestaurantsInfo props={items} />,
  }
  if (tempVariant in defaultComponents) {
    if (typeof defaultComponents[tempVariant] === "object") {
      if (defaultComponents[tempVariant]?.mobile && isMobile) {
        return defaultComponents[tempVariant]?.mobile
      } else if (defaultComponents[tempVariant]?.web && !isMobile) {
        return defaultComponents[tempVariant].web
      } else {
        return defaultComponents[tempVariant]
      }
    }
  } else {
    const DefaultComponent: any = context?.getGroupVariant(variant) || (() => null)
    return <DefaultComponent {...items} />
  }
}
export default GroupComponentRenderingUtility
