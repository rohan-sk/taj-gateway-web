export const CHECK_AVAILABILITY = `${process.env.NEXT_PUBLIC_HUDINI_BASE_URL}check-availability`
export const HOTEL_AVAILABILITY = `${process.env.NEXT_PUBLIC_HUDINI_BASE_URL}hotel-availability`
export const DESTINATION_AVAILABILITY = `${process.env.NEXT_PUBLIC_HUDINI_BASE_URL}destination-availability`
export const RATE_PROMO_AVAILABILITY = `${process.env.NEXT_PUBLIC_HUDINI_BASE_URL}rate-promo-availability`
export const CHANGE_DATES_AVAILABILITY = `${process.env.NEXT_PUBLIC_HUDINI_BASE_URL}change-dates-availability`
export const ADD_TO_CART = `${process.env.NEXT_PUBLIC_CART_SERVICE_BASE_API_URL}add-to-cart`
export const EMPTY_CART = `${process.env.NEXT_PUBLIC_CART_SERVICE_BASE_API_URL}empty-cart`
export const MERGE_CART = `${process.env.NEXT_PUBLIC_CART_SERVICE_BASE_API_URL}merge-cart`
export const REMOVE_FROM_CART = `${process.env.NEXT_PUBLIC_CART_SERVICE_BASE_API_URL}item-remove`
export const MODIFY_BOOKING_CART = `${process.env.NEXT_PUBLIC_CART_SERVICE_BASE_API_URL}modify-booking`
export const CREATE_ORDER = `${process.env.NEXT_PUBLIC_ORDERS_BASE_URL}orders/create-order/booking`
export const GET_CART_DETAILS = `${process.env.NEXT_PUBLIC_CART_SERVICE_BASE_API_URL}fetch-cart`
export const ORDER_CONFIRMATION = `${process.env.NEXT_PUBLIC_ORDERS_BASE_URL}orders/confirm-order`
export const FETCH_ORDER = `${process.env.NEXT_PUBLIC_ORDERS_BASE_URL}orders/fetch-order`
export const ADD_TENDER_MODES = `${process.env.NEXT_PUBLIC_CART_SERVICE_BASE_API_URL}add-tender-mode`
export const FETCH_NEUCOINS = `${process.env.NEXT_PUBLIC_NEUCOINS_BASE_API_URL}fetch-neucoins`
export const DELETE_TENDER_MODE = `${process.env.NEXT_PUBLIC_CART_SERVICE_BASE_API_URL}delete-tender-mode`
export const CCAVENUE_ENCRYPTION_API = `${process.env.NEXT_PUBLIC_API_GATEWAY_BASE_URL}paymentService/v1/ccavenue/encrypt`
export const CANCEL_ORDER = `${process.env.NEXT_PUBLIC_ORDERS_BASE_URL}orders/cancel-booking`
export const MODIFY_BOOKING_ORDER = `${process.env.NEXT_PUBLIC_ORDERS_BASE_URL}orders/modify-booking`
export const SOCIAL_MEDIA_FEED = `${process.env.NEXT_PUBLIC_API_GATEWAY_BASE_URL}hudiniService/v1/social-media-feed`
export const UPDATE_PAYMENT_TYPE = `${process.env.NEXT_PUBLIC_CART_SERVICE_BASE_API_URL}payment-type`
export const GET_CALENDER_VIEW_DATA = `${process.env.NEXT_PUBLIC_API_GATEWAY_BASE_URL}hudiniService/v1/calendar-view`
export const GET_PAYMENT_LABELS = `${process.env.NEXT_PUBLIC_CART_SERVICE_BASE_API_URL}get-payment-label`
export const REMOVE_MULTIPLE_ROOMS_AT_INIT = `${process.env.NEXT_PUBLIC_CART_SERVICE_BASE_API_URL}delete-room`

export const POWERED_BY_WIDGET = "Sanity"
export const PAGELANG = "en-in"
export const AFFILIATION = "Taj"

export const BOOKING_CONSTANT = {
  itineraryNumber: "ITINERARY NUMBER",
  guestName: "GUEST NAME",
  FIRST_NAME: "FIRST NAME",
  LAST_NAME: "LAST NAME",
  bookingStatus: "BOOKING STATUS",
  paymentStatus: "PAYMENT STATUS",
  paymentMethod: "PAYMENT METHOD",
  checkIn: "CHECK IN",
  checkOut: "CHECK OUT",
  numberOfRooms: "NUMBER OF ROOMS",
  numberOfGuests: " NUMBER OF GUESTS",
  total: "Total",
  NEW_TOTAL: "New Total",
  redeemAll: "Redeem All",
  GET_OTP: "GET OTP",
  remove: "EDIT",
  voucherNumber: " Voucher number ",
  gcCard: "Gift card number",
  resendOtp: " Resend OTP",
  neucoinsRedeemed: "NeuCoins redeemed",
  successfullyRedeem: "Successfully redeemed Neucoins",
  balanceAmount: " Balance Amount",
  giftCardButton: "+ Add another Gift Card",
  GIFT_CARD_AMOUNT_REDEEMED: "Gift card amount redeemed",
  privacyPolicy:
    " I agree to receive marketing and promotional notifications from IHCL to the purposes mentioned in the Privacy policy",
  conditions:
    "I have read and agree to the General Terms & Conditions and Terms and Conditions for Tokenisation of Cards.",
  CONTINUE: "CONTINUE",
  OK: "OK",
  COPY: "COPY",
  VERIFY: "VERIFY",
  REDEEM: "REDEEM",
  GIFT_CARD: "GIFT_CARD",
  GIFT_CARD_MAX_LIMIT: 3,
  CHECK_BALANCE: "CHECK BALANCE",
  ADD_ANOTHER_GIFT_CARD: "+ ADD ANOTHER GIFT CARD",
  GUEST_INFO: "GUEST INFORMATION",
  BACK_TO_ACCOUNT: "BACK TO MY ACCOUNT",
  SELECTED_DATE: "SELECTED DATE",
  NEW_SELECTED_DATE: "NEW SELECTED DATE",
  CHANGE_FEE: "CHANGE FEE",
  PRICE_CHANGE: "Price Change",
  TOTAL_PRICE_CHANGE: "Total Price Change with Taxes",
  TOTAL_TAX_CHANGE: "Total Tax Change",
  CANCELLATION_POLICY: "Rate details and cancellation policy",
  RATE_DETAILS: "Rate Details",
  PACKAGE: "PACKAGE",
  NEW_PRICE: "New Price",
  ORIGINAL_PRICE: "Original Price",
  PRICE: "Price",
  TOTAL_PRICE: "Total Price",
  TOTAL_AMOUNT: "Total Amount",
  AMOUNT_PAID: "Amount Paid",
  PAID: "Paid",
  MEMBER_DISCOUNT: "Member Discount",
  ADD_ONS: "Add ons",
  VOUCHER_DISCOUNT: "Voucher Discount",
  TAX_AND_FEES: "Taxes and Fees",
  ROOM_TAX: "Goods and service tax",
  GST_LABEL: "GST",
  GC_REDEMPTION: "Gift Card Redemption",
  GC_REDEEMED: "Gift Card/s Redeemed",
  NEUCOIN: "NeuCoin",
  NEUCOINS_REDEMPTION: "NeuCoins Redemption",
  NEUCOIN_REDEMPTION: "NeuCoin Redemption",
  PRINT: "PRINT",
  SHARE: "SHARE",
  DOWNLOAD: "DOWNLOAD",
  DIFFERENCE: "Difference",
  PAY_AT_HOTEL: "PAY AT HOTEL",
  PAY_ONLINE: "PAY ONLINE",
  AMOUNT_PAID_PREVIOUSLY: "Amount Paid Previously",
  CANCELLATION_CHARGES: "Cancellation Charges",
  REVISED_TOTAL_PRICE: "Revised Total Price",
  PAYABLE_AMOUNT: "Payable Amount",
  BALANCE_REFUND: "Balance Refund",
  REFUNDABLE_AMOUNT: "Refundable Amount",
  BALANCE_PAYABLE: "Balance Payable",
  BALANCE_PAYABLE_AT_HOTEL: "Balance Payable at Hotel",
  BALANCE_COLLECTABLE: "Balance payable will be collected at the Hotel",
  AMOUNT_PAYABLE_AT_HOTEL: "Total Amount Payable at Hotel",
  COUPON_DISCOUNT: "Coupon Discount",
  DEPOSIT_PAID: "Deposit Paid",
  DEPOSIT_PAYABLE: "Deposit Payable",
  REFUND_DESCRIPTION:
    "*Refundable amount will be adjusted at the hotel during check-out. For any further assistance, please feel free to contact the hotel.",
  PAYABLE_DESCRIPTION:
    "*Payable amount will be adjusted at the hotel during check-out. For any further assistance, please feel free to contact the hotel.",
  NEGATIVE_BOOKING_STATUS: ["pending", "pending confirmation", "failed"],
  giftCardSuccessfullyRedeem: "Successfully redeemed",
  BOOKING_TYPE: "Hotel_Booking",
  CONTINUE_WITH_PAY_AT_HOTEL: " CONTINUE WITH PAY AT HOTEL",
  GIFT_CARD_REDEEMED_SUCCESSFULLY: "redeemed successfully.",
}
