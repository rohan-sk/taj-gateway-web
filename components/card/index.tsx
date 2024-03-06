import React, { useContext } from "react"
import dynamic from "next/dynamic"
import { useMobileCheck } from "../../utils/isMobilView"

const CardImageWithPrimaryButton = dynamic(() => import("./card-img-with-title-and-primary-button"))
const CardWithDescriptionAction = dynamic(() => import("./card-with-description-actions"))
const ReservationCenter = dynamic(() => import("../contactus/ReservationCenter"))
const SimpleCard = dynamic(() => import("./simple-card.component"))
const CardWithCta = dynamic(() => import("./card-with-cta.component"))
const CardWithDesc = dynamic(() => import("./card-with-desc.component"))

const CardWithHotelInformationCard = dynamic(() => import("./card-with-hotel-information.card.component"))

const TwoCardGrid = dynamic(() => import("../Login/InitialScreen/card-with-image-title.component"))
const MobileNumberLoginForm = dynamic(() => import("../Login/InitialScreen/mobile-number-login-form.component"))
const EmailAddressLoginForm = dynamic(() => import("../Login/InitialScreen/email-address-login-form.component"))
const ImageDescriptionCard = dynamic(() => import("../AboutImageAndCard/ImageDescriptionCard"))
const CardWithRightAlignedContent = dynamic(() => import("./card-with-right-aligned-content.component"))
const CardWithRightAlignedContentAndThreeActions = dynamic(
  () => import("./right-aligned-content-with-3-actions-card.component"),
)
const CardWithRightAlignedContentWithLink = dynamic(() => import("./card-with-right-aligned-content-with-link"))
const CardWithCarousal = dynamic(() => import("./card-with-carousal.component"))
const CardWithCenterAlignedContent = dynamic(() => import("./card-with-center-aligned-content"))
const CardWithRightAlignedTitle = dynamic(() => import("./card-with-right-aligned-title.component"))
const CardWithHalfImageAndContent = dynamic(() => import("./card-with-half-image-and-content.component"))
const TextOnCardWithCta = dynamic(() => import("./text-on-card-with-cta.component"))
const AwardCard = dynamic(() => import("./award-card.component"))
const CardWithRightAlignedContentWithThreeActionsForMsite = dynamic(
  () => import("./card-with-right-aligned-content-with-3-actions-for-mSite.component"),
)
const CardWithRightAlignedContentForMsite = dynamic(() => import("./card-with-right-aligned-content-for-mSite"))
const CardWithTagLine = dynamic(() => import("./card-with-tagline.component"))
const MediaWithContentComponent = dynamic(() => import("./media-with-content-component"))
const CardWithSubTitle = dynamic(() =>
  import("./card-with-subtitle.component").then((module) => module.CardWithSubTitle),
)
const ImageCarouselCardWithLeftContent = dynamic(() => import("./card-with-image-carousel-with-left-content"))
const CardWithHighlights = dynamic(() => import("./card-with-highlights-components"))
const CenterAlignedTitleCard = dynamic(() => import("./services-center-aligned-title-card"))
const CardRoomSpecification = dynamic(() => import("./card-room-specification"))
const CardWithEnquiryForm = dynamic(() => import("./card-with-enquiry-form"))
const CardWithGazeboExperienceModal = dynamic(() => import("./card-with-gazebo-experience"))
const MembershipChargesCardComponent = dynamic(() => import("./membership-charges-card-component"))

const BookAStayCardComponent = dynamic(() => import("./book-a-stay-card-component"))
const CardWithImageCenterBoldContent = dynamic(
  () => import("./card-with-image-bold-content-center-alignment.component"),
)
const BookAStayDefaultCardComponent = dynamic(() => import("./book-a-stay-default-card.component"))
const BookAStaySebComponent = dynamic(() => import("./book-a-stay-seb.component"))
const BookAStayCouponCardComponent = dynamic(
  () => import("../forms/book-a-stay-form/book-a-stay-coupon-card.component"),
)
const BookAStayAgencyCardComponent = dynamic(
  () => import("../forms/book-a-stay-form/book-a-stay-agency-card.component"),
)
const BookAStayAccessCardComponent = dynamic(
  () => import("../forms/book-a-stay-form/book-stay-access-code-card.component"),
)
const BookAStayPackageCardComponent = dynamic(
  () => import("../forms/book-a-stay-form/book-a-stay-package-card.component"),
)
const PersonalDetails = dynamic(() => import("../MyAccount/personalDetails/personal-details"))
const RenderVenueItems = dynamic(() => import("../venueDetails/RenderVenueItems"))
const PresidentialSuiteDetails = dynamic(() => import("../venueDetails/PresidentialSuiteDetails"))
const PasswordScreen = dynamic(() => import("../Login/PasswordScreen/PasswordScreen"))

const AuthenticationCardAction = dynamic(() => import("../Login/register-form/authentication-card-action.component"))
const CardWithHotelDetailsComponent = dynamic(() => import("./card-with-hotel-details.component"))
const HighlightsWithImgComponent = dynamic(() => import("./highlights-with-img.component"))
const CardWithBoldTitle = dynamic(() => import("./card-with-bold-title.component"))
const CardWithRightAlignedTitleAndCTA = dynamic(() => import("./card-with-right-aligned-title-and-cta"))
const CardWithCenterAlignedTitle = dynamic(() => import("./card-with-center-aligned-content.component"))
const CardWithImgContent = dynamic(() => import("./card-with-img-content"))
const CardWithTriangleShapeImgComponent = dynamic(() => import("./card-with-triangle-shape-img-component"))
const CardWithBackground = dynamic(() => import("../nudge/nudge-with-background.component"))

const CardWithBottomImage = dynamic(() => import("./card-with-bottom-image.component"))
const CardWithImageTitleTabsComponent = dynamic(() => import("./card-with-image-title-tabs.component"))
const CardWithTopContentWithCenterAction = dynamic(
  () => import("./card-with-top-content-with-center-aligned-action.component"),
)
const CardWithVerticleAlignedContent = dynamic(() => import("./card-with-verticle-aligned-content.component"))
const CardWithRightAlignedGiftItemsComponent = dynamic(() => import("./card-with-right-aligned-gift-items.component"))
const TestimonialCardComponent = dynamic(() => import("../testiminial-card.component"))
const SemiImageWithOverlappedContent = dynamic(() => import("./semi-image-with-overlapped-content.component"))
const CardWithRightAlignedHotelDataContent = dynamic(
  () => import("./card-with-right-aligned-hotel-data-content.component"),
)
const CardWithBulletLineForImage = dynamic(() => import("./card-with-bullet-line-for-image.component"))
const CardWithBorderLineContentComponent = dynamic(() => import("./card-with-border-line-content-component"))
const CardWithEqualWidthForMediaAndContent = dynamic(
  () => import("./card-with-equal-width-for-media-and-content.component"),
)
const ResetPassword = dynamic(() => import("../Login/reset-password/reset-password.component"))

const LeftMediaCardWithSignatureIcon = dynamic(
  () => import("./card-with-left-media-right-content-signature-icon.card.component"),
)
const ReservationContactsCard = dynamic(() => import("./card-with-reservation-contacts.component"))
const GcReviewCardForm = dynamic(() => import("../forms/gift-card-form/gcReviewCard.form"))

import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
const OfferRichTextActions = dynamic(() => import("./card-with-offers-richtext-actions.component"))
const CardWithDynamicFormOffers = dynamic(() => import("./card-with-offer-name-book-a-stay"))
const CardWithEqualWidthForMediaAndContentMSiteComponent = dynamic(
  () => import("./card-with-equal-width-for-media-and-content-m-site-component"),
)

const OpeningsLeftMediaRightContentCard = dynamic(() => import("./openings-left-media-right-content.card.component"))
const ActionsCardWithOutlined = dynamic(() => import("./loyalty-actions-card-outline.card.component"))

const CardWithTitleCtaForMsite = dynamic(() => import("./card-with-title-cta-for-msite"))

const CardWithDescAndRightCtaAlignment = dynamic(() => import("./card-with-desc-right-cta-alignment"))

const CardWithDiamondPoints = dynamic(() => import("./card-with-diamond-points"))
const CardDescriptionWithExternalLink = dynamic(() => import("./card-description-with-cta-component"))
const MediaCardWithSmallImage = dynamic(() => import("./media-card-with-small-image-component"))
const MediaCardWithMagazineImage = dynamic(() => import("./media-card-with-magazine-image-component"))
const AvatarCard = dynamic(() => import("./card-with-avatar"))
const NewsLetterSubscriptionResultCard = dynamic(
  () => import("./../forms/enquiry-forms/news-letter-form/news-letter-subscription-result.component"),
)
const MembershipLoginCard = dynamic(() => import("./membership-login-card"))
const ContactUsCard = dynamic(() => import("./contact-us-card"))
const CardMediaWithPopUpContentComponent = dynamic(() => import("./card-media-with-pop-up-content-component"))
const CardWithMediaAndContentInsidePopUpModel = dynamic(
  () => import("./card-with-media-and-content-inside-pop-up-model"),
)
const CardTitleOnHoverComponent = dynamic(() => import("./card-title-on-hover.component"))
const CardWithBrasserieRestaurantsDescription = dynamic(() => import("./card-with-brasserie-restaurants-description"))
const CardWithBoldTextHyperlinkComponent = dynamic(() => import("./card-with-bold-text-hyperlink-component"))
const CardWithTextHyperLinkComponents = dynamic(() => import("./card-with-text-hyperlink-components"))
const CardWithBrasserieContactItems = dynamic(() => import("./card-with-brasserie-contact-items"))
const CardWithBrasserieTextUnderlineComponent = dynamic(() => import("./card-with-brasserie-text-underline-component"))

export const RenderCardComponent = (props: any) => {
  const isMobile = useMobileCheck()
  const context = useContext(IHCLContext)
  const variant = isMobile ? props?.variant : props?.largeVariant

  switch (variant) {
    case "ihcl.core.card.card-with-right-aligned-title-and-link":
      return <CardWithCta {...props} />
    case "ihcl.core.card.card-with-focused-title":
      return <CardWithDesc {...props} characterLength={props?.characterLimit} />
    case "details.card.restaurant-contact-details":
      return <CardWithDescAndRightCtaAlignment {...props} characterLength={props?.characterLimit} />
    case "details.card.reservation-phone-numbers":
      return <ReservationContactsCard {...props} characterLength={props?.characterLimit} />
    case "businessServices.card.highlighted-text-with-description":
      return <CardWithHighlights {...props} />
    case "ihcl.core.card.social-media-square-card":
      return <SimpleCard {...props} />
    case "details.card.award-card":
      return <AwardCard {...props} />
    case "details.card.card-with-right-aligned-content":
      return isMobile ? <CardWithRightAlignedContentForMsite {...props} /> : <CardWithRightAlignedContent {...props} />
    case "card-with-right-aligned-content-with-link":
      return <CardWithRightAlignedContentWithLink {...props} />
    case "details.card.3-actions-with-right-aligned-content-card":
      return isMobile ? (
        <CardWithRightAlignedContentWithThreeActionsForMsite {...props} />
      ) : (
        <CardWithRightAlignedContentAndThreeActions {...props} />
      )
    case "ihcl.core.card.image-or-video-with-full-width":
      return <SimpleCard {...props} />
    case "details.card.semi-image-with-overlapped-content":
      return <SemiImageWithOverlappedContent {...props} />
    case "details.card.full-image-with-overlapped-content":
      return <ImageDescriptionCard {...props} />
    case "details.card.card-with-right-media-left-content-aspect-ratio-2:4":
      return <MediaWithContentComponent {...props} />
    case "details.card.card-with-left-media-right-content-aspect-ratio-2:4":
      return <MediaWithContentComponent {...props} />
    case "details.card.card-with-left-media-right-content-aspect-ratio-2:2":
      return <MediaWithContentComponent {...props} />
    case "card-carousel":
      return <CardWithCarousal {...props} />
    case "ihcl.core.card.4-column-grid-with-bold-title":
      return <CardWithImageCenterBoldContent {...props} />
    case "details.card.card-with-image-on-title":
      return <CardWithCarousal {...props} />
    case "ihcl.core.card.image-and-content-with-aspect-ratio-1:1":
      return <CardWithCenterAlignedContent {...props} />
    case "ihcl.core.card.rectangle-card-with-right-aligned-title-aspect-ratio-2:4":
      return <CardWithRightAlignedTitle {...props} />
    case "details.card.right-aligned-content-with-aspect-ratio-1:3":
      return <CardWithRightAlignedTitleAndCTA {...props} />
    case "details.card.left-align-content":
      return <CardWithHalfImageAndContent {...props} />
    case "card-with-description-actions":
      return <CardWithDescriptionAction {...props} />
    case "loyalty.image-aligned-button":
      return <CardImageWithPrimaryButton {...props} />
    case "loyalty.text-on-card-with-cta":
      return <TextOnCardWithCta {...props} />
    case "loyalty.group-with-tiers":
      return <TextOnCardWithCta {...props} />
    case "ihcl.core.card.card-ends-aligned-content":
      return <ReservationCenter props={props} />
    case "card-with-image-title":
      return <CardWithSubTitle largeImage={props?.largeImage} title={props?.title} />
    case "ihcl.core.card.city-card":
      return <CardWithTagLine props={props} />
    case "common-utils.card.thumbnail-city-card":
      return <CardWithTagLine props={props} />
    case "card-media-with-information":
      return <CardWithBoldTitle {...props} characterLength={props?.characterLimit} />
    case "loyalty.card.card-with-group-of-gift-items-right-content":
      return <HighlightsWithImgComponent {...props} />
    case "loyalty.card.card-with-hotel-details":
      return <CardWithHotelDetailsComponent {...props} />
    case "authentication.card.mobile-number-login-form":
      return <MobileNumberLoginForm props={props} />
    case "authentication.card.email-address-login-form":
      return <EmailAddressLoginForm props={props} />
    case "authentication.card.image-with-title":
      return <TwoCardGrid props={props} />
    case "ihcl.core.card.card-with-description-actions":
      return <OfferRichTextActions {...props} />
    case "authentication.card.action-labels":
      return <AuthenticationCardAction props={props} />
    case "partners.card.right-media-image-carousel-with-left-content":
      return <ImageCarouselCardWithLeftContent {...props} />
    case "businessServices.card.center-aligned-title-desc-actions":
      return <CenterAlignedTitleCard {...props} />
    case "details.card.room-specification":
      return <CardRoomSpecification {...props} />
    case "details.card.venue-quote-model-form":
      return <CardWithEnquiryForm {...props} />
    case "details.card.left-media-image-carousel-with-right-content":
      return <CardWithGazeboExperienceModal {...props} />
    case "authentication.card.membership-global-login-options":
      return <PasswordScreen {...props} />
    case "details.card.card-with-room-properties":
      return <PresidentialSuiteDetails {...props} />
    case "details.card.card-with-bullet-points":
      return <RenderVenueItems {...props} />
    case "myAccount.card.personal-details":
      return <PersonalDetails {...props} />
    case "businessServices.card.hotel-booking-steps":
      return <MembershipChargesCardComponent {...props} />
    case "ihcl.core.card.card-with-center-aligned-content":
      return <CardWithCenterAlignedTitle {...props} />
    case "offers.card.book-a-stay-special-employee-benefit":
      return <BookAStaySebComponent {...props} />
    case "details.card-book-a-stay-with-aspect-ratio-1:2":
      return <BookAStayDefaultCardComponent {...props} />
    case "offers.card.book-a-stay-with-agency-id":
      return <BookAStayAgencyCardComponent {...props} />
    case "offers.card.book-a-stay-with-packages":
      return <BookAStayPackageCardComponent {...props} />
    case "offers.card.book-a-stay-with-coupon":
      return <BookAStayCouponCardComponent {...props} />
    case "offers.card.book-a-stay-with-access-code":
      return <BookAStayAccessCardComponent {...props} />
    case "businessServices.card.right-media-left-content-in-between-variable-gap":
      return <MediaCardWithSmallImage {...props} />
    case "businessServices.card.left-media-right-content-in-between-variable-gap":
      return <MediaCardWithSmallImage {...props} />
    case "ihcl.core.card.media-with-bottom-and-top-content":
      return <CardWithImgContent {...props} />
    case "ihcl.core.card.triangle-shape-image-on-content":
      return isMobile ? (
        <CardWithBorderLineContentComponent {...props} />
      ) : (
        <CardWithTriangleShapeImgComponent {...props} />
      )
    case "events.card.she-remains-the-taj-modal":
      return <LeftMediaCardWithSignatureIcon {...props} />
    case "loyalty.card.card-with-background-image.horizontal-dual-actions":
      return <CardWithBackground {...props} />
    case "loyalty.card.outlined-border-with-actions":
      return <ActionsCardWithOutlined {...props} />
    case "giftCards.card.bottom-media-with-top-content":
      return <CardWithBottomImage {...props} />
    case "ihcl.core.card.image-title-tabs":
      return <CardWithImageTitleTabsComponent {...props} />
    case "giftCards.card.bottom-media-with-top-center-aligned-action":
      return <CardWithTopContentWithCenterAction {...props} />
    case "details.card-vertical-aligned-content-with-aspect-ratio-2:4":
      return <CardWithVerticleAlignedContent {...props} />
    case "partners.card.left-media-right-center-align-content":
      return <MediaCardWithMagazineImage {...props} />
    case "loyalty.card.left-media-with-group-of-gift-items-right-content":
      return <CardWithRightAlignedGiftItemsComponent {...props} />
    case "giftCards.card.square-card-with-profile":
      return <TestimonialCardComponent {...props} />
    case "aboutUs.card.hotel-data-with-address":
      return <CardWithRightAlignedHotelDataContent {...props} />
    case "details.card.contact-details-with-single-cta":
      return <CardWithHotelInformationCard {...props} />
    case "details.card.left-media-right-content-with-equally-occupied-space":
      return <CardWithEqualWidthForMediaAndContent {...props} />
    case "details.card.image-with-content-bg-color":
      return isMobile ? (
        <CardWithEqualWidthForMediaAndContentMSiteComponent {...props} />
      ) : (
        <CardWithEqualWidthForMediaAndContent {...props} />
      )
    case "loyalty.card.reverse-chambers-details":
      return <CardWithBulletLineForImage {...props} />
    case "loyalty.card.chambers-details":
      return <CardWithBulletLineForImage {...props} />
    case "authentication.card.reset-password":
      return <ResetPassword {...props} />
    case "ihclForms.card.description-with-cta":
      return <CardDescriptionWithExternalLink {...props} />
    case "events.card.circular-avatar-with-bottom-box":
      return <AvatarCard {...props} props={props} />
    case "notifications.card.subscription.confirmation":
      return <NewsLetterSubscriptionResultCard {...props} />
    case "offers.card.vertical-aligned-diamond-points":
      return <CardWithDiamondPoints {...props} />
    case "loyalty.card.epicure-membership-login":
      return <MembershipLoginCard {...props} />
    case "details.card.image-with-bottom-right-title":
      return <CardWithTitleCtaForMsite {...props} />
    case "ihcl.core.card.center-aligned-content":
      return <ContactUsCard {...props} />
    case "offers.card-book-a-stay-with-aspect-ratio-1:2":
      return <CardWithDynamicFormOffers {...props} />
    case "details.card.opening-soon-hotels-details":
      return <OpeningsLeftMediaRightContentCard {...props} />
    case "details.card.card-with-image-bottom-right-aligned-title":
      return isMobile ? <MediaWithContentComponent {...props} /> : <></>
    case "giftCards.card.holder-details":
      return <GcReviewCardForm {...props} />
    case "details.card.media-with-popup-content":
      return <CardMediaWithPopUpContentComponent {...props} />
    case "ihcl.core.card.with-left-media-right-content-inside-model":
      return <CardWithMediaAndContentInsidePopUpModel {...props} />
    case "ihcl.core.card.with-right-media-left-content-inside-model":
      return <CardWithMediaAndContentInsidePopUpModel {...props} />
    case "details.card.multiple-row-media-card-with-aspect-ratio-1:1":
      return <CardTitleOnHoverComponent {...props} />
    case "loyalty.card.neupass-membership-login":
      return <MembershipLoginCard {...props} />
    case "common-utils.card.bottom-description":
      return <CardWithBrasserieRestaurantsDescription {...props} />
    case "common-utils.card.bold-text-with-hyperlink":
      return <CardWithBoldTextHyperlinkComponent {...props} />
    case "common-utils.card.text-with-hyperlink":
      return <CardWithTextHyperLinkComponents {...props} />
    case "common-utils.card.contact-item":
      return <CardWithBrasserieContactItems {...props} />
    case "common-utils.card.text-underline":
      return <CardWithBrasserieTextUnderlineComponent {...props} />
    default: {
      const DefaultComponent: any = context?.getCardVariant(variant) || (() => null)
      return <DefaultComponent {...props} />
    }
  }
}
