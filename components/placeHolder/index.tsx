import dynamic from "next/dynamic"
import TitleWithSingleAction from "./business-services-with-action-component"
import { useContext } from "react"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { Unknown } from "../unknown.component"
import RoomSelectionTemplate from "../../features/my-account/ui/cancel-room-selection-template-component"
import GiftCardReloadDetails from "../card/gift-card-reload-details.component"
const EpicureCartSummery = dynamic(
  () => import("./epicure-cart-summery.component")
)
const EpicureNeuCoinsRedemption = dynamic(
  () => import("../../features/loyalty/UI/epicure-neu-coins-redeem.component")
)
const EpicurePaymentWidget = dynamic(
  () => import("../../features/loyalty/UI/epicure-payment-widget.component")
)

const HotelRoomsComponent = dynamic(
  () =>
    import(
      "../MyAccount/modify-booking/change-dates/render-hotel-rooms.component"
    )
)
const HotelChangeRoomsComponent = dynamic(
  () =>
    import(
      "../MyAccount/modify-booking/change-rooms/render-hotel-rooms.component"
    )
)

const SearchResultCardComponent = dynamic(
  () => import("../card/SearchResultCards/search-result-card.component")
)
const SearchResultCardComponentWithCity = dynamic(
  () =>
    import("../card/SearchResultCards/search-result-card-with-city-component")
)
const CartSummaryCard = dynamic(() => import("./cart-summary.component"))

const BookingAddOnRooms = dynamic(
  () => import("../../features/booking/ui/BookingAddOnRooms")
)
const GuestDetailsForm = dynamic(
  () => import("../../features/booking/ui/guest-details-form.component")
)
const RedeemAndSave = dynamic(
  () => import("../../features/booking/ui/redeem-and-save.component")
)
const PaymentDetails = dynamic(
  () => import("../../features/booking/ui/payment-details.component")
)
const BookingConfirmedGuestDetails = dynamic(
  () =>
    import(
      "../../features/booking/ui/booking-confirmed-guest-details.component"
    )
)
const BookingConfirmedRoomDetails = dynamic(
  () =>
    import("../../features/booking/ui/booking-confirmed-room-details.component")
)
const NeuCoinsRedemptionComponent = dynamic(
  () => import("../NeuCoinsRedemption/neu-coins-redemption.component")
)

const GoogleMapCard = dynamic(
  () => import("../card/card-with-google-map.component")
)

const ShoppingStickyCard = dynamic(
  () => import("./shopping-sticky-card.component")
)
const GcReviewImageForm = dynamic(
  () => import("../forms/gift-card-form/gcReviewImage.form")
)

const GcReviewDescriptionForm = dynamic(
  () => import("../forms/gift-card-form/gcReviewDescription.form")
)
const NeuCoinsRedemptionForBooking = dynamic(
  () => import("../../features/booking/ui/NeuCoinsRedemption")
)
const RedeemGiftCardForBooking = dynamic(
  () => import("../../features/booking/ui/redeem-gift-card.component")
)

import GiftCardReloadPriceBreakup from "../card/giftcardComponents/reload-giftcard-priceBreakup.component"
import ChangeRoomsCartSummary from "./change-rooms-cart-summary"
import PriceChangeChart from "../MyAccount/modify-booking/change-rooms/Price-change-chart.component"
import { GlobalContacts } from "../contactus/Globalcontacts"
import CancelOrderFailureModal from "../../features/my-account/ui/cancel-failure-modal.component"

const RenderPlaceHolderComponent = (props: any) => {
  const ihclContext = useContext(IHCLContext)
  const variant = props?.variant
  return (
    <>
      {!props?.isHidden && getComponentByVariant(variant, props, ihclContext)}
    </>
  )
}

const getComponentByVariant = (
  variant: string,
  props: any,
  ihclContext: any
) => {
  switch (variant) {
    case "myAccount.placeholders.change-rooms-cart-view":
      return <ChangeRoomsCartSummary {...props} />
    case "bookings.placeholders.cart-view":
      return <CartSummaryCard {...props} />
    case "bookings.placeholders.primary-guest-details":
      return <GuestDetailsForm {...props} />
    case "myAccount.placeholders.confirm-room-price-breakup":
      return <PriceChangeChart {...props} />
    case "bookings.placeholders.other-guest-details":
      const componentProps = { isOtherGuestDetailsForm: true, ...props }
      return <GuestDetailsForm {...componentProps} />
    case "bookings.placeholders.addons":
      return <BookingAddOnRooms {...props} />
    case "bookings.placeholders.redeem-save":
      return <RedeemAndSave {...props} />
    case "bookings.placeholders.payment-details":
      return <PaymentDetails {...props} />
    case "bookings.placeholders.confirmed-guest-details":
      return <BookingConfirmedGuestDetails {...props} />
    case "bookings.placeholders.confirmed-room-details":
      return <BookingConfirmedRoomDetails {...props} />
    case "businessServices.placeholders.title-with-single-action":
      return <TitleWithSingleAction {...props} />
    case "ihcl.core.search-result-component":
      return <SearchResultCardComponent {...props} />
    case "ihcl.core.search-result-component-city":
      return <SearchResultCardComponentWithCity {...props} />
    case "myAccount.placeholders.booking-change-dates":
      return <HotelRoomsComponent {...props} />
    case "myAccount.placeholders.booking-change-rooms":
      return <HotelChangeRoomsComponent {...props} />
    case "myAccount.placeholders.booking-cancellation":
      return <RoomSelectionTemplate {...props} />
    case "giftCards.placeholders.reload-details":
      return <GiftCardReloadDetails {...props} />
    case "giftCards.placeholders.reload-price-breakup":
      return <GiftCardReloadPriceBreakup {...props} />
    case "common-utils.placeholders.radio-button-filters":
      return <GlobalContacts {...props} />
    case "common-utils.placeholders.redeem-save":
      return <NeuCoinsRedemptionComponent {...props} />
    case "details.placeholders.hotels-location-in-map":
      return <GoogleMapCard {...props} />
    case "giftCards.placeholders.price-details":
      return <ShoppingStickyCard {...props} />
    case "giftCards.placeholders.card-details":
      return <GcReviewImageForm props={props} />
    case "giftCards.placeholders.amount-details":
      return <GcReviewDescriptionForm {...props} />
    case "myAccount.placeholders.alert-message-with-middle-aligned-button":
      return <CancelOrderFailureModal {...props} />
    case "myAccount.placeholders.alert-message-with-middle-aligned-button":
      return <CancelOrderFailureModal {...props} />
    case "loyalty.placeholders.cart-summary":
      return <EpicureCartSummery {...props} />
    case "loyalty.placeholders.payment":
      return <EpicurePaymentWidget props={props} />
    case "loyalty.placeholders.redeem":
      return <EpicureNeuCoinsRedemption props={props} />
    case "bookings.placeholders.neuCoins-redeem":
      return <NeuCoinsRedemptionForBooking {...props} />
    case "bookings.placeholders.gift-card-redeem":
      return <RedeemGiftCardForBooking {...props} />
    default:
      const DefaultComponent: any =
        ihclContext?.getPlaceholderVariant(variant) || Unknown
      return <DefaultComponent {...props} />
  }
}

export default RenderPlaceHolderComponent
