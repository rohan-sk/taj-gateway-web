import { makeAutoObservable, runInAction } from "mobx"

import { handler as MergeCart } from "../../api/handlers/merge-cart.service"
import { handler as addToCart } from "../../api/handlers/add-to-cart.service"
import { handler as CreateOrder } from "../../api/handlers/create-order.service"
import { handler as EmptyUserCart } from "../../api/handlers/empty-user-cart.service"
import { handler as GetCartDetails } from "../../api/handlers/get-cart-details.service"
import { handler as RemoveFromCart } from "../../api/handlers/remove-from-cart.service"
import { handler as AddTenderModes } from "../../api/handlers/add-tender-modes.service"
import { handler as ModifyBookingCart } from "../../api/handlers/modify-booking-cart.service"
import { handler as checkAvailability } from "../../api/handlers/check-availability.service"
import { handler as RemoveTenderModes } from "../../api/handlers/delete-tender-mode.service"
import { handler as CalenderViewSource } from "../../api/handlers/get-calendar-view.service"
import { handler as updatePaymentType } from "../../api/handlers/update-payment-type.service"
import { handler as GET_PAYMENT_LABELS } from "../../api/handlers/get-payment-labels.service"
import { handler as changeDatesAvailability } from "../../api/handlers/change-dates-availability.service"
import { handler as destinationAvailabilityApi } from "../../api/handlers/check-destination-availability.service"
import { handler as RemoveMultipleRoomsAtPaymentINIT } from "../../api/handlers/remove-multiple-rooms-at-init.service"
import { handler as fetchOrderDetails } from "../../api/handlers/fetch-order-details.service"
import { roomsAvailabilityTypes, destinationAvailabilityTypes } from "../../types"
import {
  GuestDetailsType,
  AddTenderModeType,
  DeleteTenderModesType,
  CreateOrderPayloadType,
  guestBookingScheduleType,
  StepperDetailsType,
  RemoveCartPayload,
} from "../types"
import { BOOKING_CONSTANT } from "../../constants"

export default class BookingFlowGlobalStore {
  constructor() {
    makeAutoObservable(this)
  }
  loading: boolean = false

  isGCRedeemed: boolean = false

  isCouponCodeOpen: boolean = false

  //* Using these boolean values to handle the payment sdk's
  initiatePaymentSDK: boolean = false
  terminatePaymentSDK: boolean = false

  analyticsHotelBookingData = {
    hotelCode: "",
    hotelType: "",
    brandName: "",
    synxisHotelId: "",
  }

  addTenderModesError: string = ""

  guestDetails: GuestDetailsType = {
    data: [{ id: 1, room: "ROOM", adults: 1, child: 0, isSelected: true }],
  }

  globalSearchedData: any = {}

  selectedVoucherDetails: any = {
    bitDate: "",
    memberId: "",
    privileges: "",
    pin: "",
    promoCode: "",
    memberType: "",
  }

  isSelectedComplimentaryVoucher: boolean = false

  isCouponApplied: boolean = false

  isCouponAdded: boolean = false

  stepperDetails: StepperDetailsType = {
    data: [],
  }

  cartDetails: any = {
    error: false,
    errorResponse: {},
    cartDetailsResponse: {},
  }

  orderDetails: any = {
    error: false,
    errorResponse: {},
    orderDetailsResponse: {},
    isInvalidVoucherDetails: false,
  }

  bookingOrderData: any = {
    error: false,
    bookingOrderResponse: {},
    errorResponse: {},
  }

  guestBookingSchedule: guestBookingScheduleType = {
    userCheckInDate: "",
    userCheckOutDate: "",
  }

  roomsAvailability: roomsAvailabilityTypes = {
    error: false,
    availabilityResponse: {},
  }

  destinationAvailability: destinationAvailabilityTypes = {
    error: false,
    availabilityResponse: {},
  }

  destinationAvailabilityData: any = []

  roomsNewPrice: any = []

  filteredHotelData: any = []

  calendarViewData: any = []

  destinationAvailabilityPayload: any = {}

  checkAvailabilityPayload: any = {
    endDate: "",
    numRooms: 1,
    adults: 1,
    children: 0,
    startDate: "",
    hotelId: "",
    rateFilter: "RRG,PKG,MD",
    memberTier: "Copper",
    package: "PKG",
    isOfferLandingPage: false,
    rateCode: null,
    promoCode: null,
    promoType: null,
    couponCode: null,
    agentId: null,
    agentType: null,
    isMyAccount: false,
    isCorporate: false,
    isLogin: false,
    isMemberOffer1: false,
    isMemberOffer2: false,
  }

  //? Using for checkAvailability Promo code (In booking mask)
  userEnteredPromoCode: any = {
    title: "",
    index: null,
    agentId: null,
    promoCode: null,
    couponCode: null,
  }

  addToCartPayload: any = {
    category: "Hotel booking",
    hotel: [
      {
        city: "HYD",
        state: "TS",
        pinCode: "500032",
        hotelAddress: "Hyd-1",
        hotelName: "",
        checkIn: "",
        checkOut: "",
        hotelId: "",
        rateFilter: "RRC",
        memberTier: "Copper",
        promoCode: "",
        promoType: "",
        storeId: "",
        hotelSponsorId: "",
        voucherRedemption: {
          bitDate: "",
          memberId: "",
          privileges: "",
          pin: "",
          isComplementary: false,
          type: "EPICURE",
        },
        country: "",
        emailId: "",
        mobileNumber: "",
        room: [
          {
            isPackageCode: false,
            message: "",
            cost: "",
            adult: "",
            roomId: "",
            roomName: "",
            children: "",
            packageCode: "",
            roomTypeCode: "",
            isServiceable: false,
            rateCode: "",
            currency: "INR",
            roomNumber: 1,
            packageName: "",
            roomImgUrl: "",
          },
        ],
      },
    ],
  }

  emptyCartPayload: any = {
    category: "Hotel booking",
    hotel: [
      {
        city: "HYD",
        state: "TS",
        pinCode: "500032",
        hotelAddress: "Hyd-1",
        hotelName: "",
        checkIn: "",
        checkOut: "",
        hotelId: "",
        rateFilter: "RRC",
        memberTier: "Copper",
        promoCode: "",
        promoType: "",
        storeId: "",
        hotelSponsorId: "",
        voucherRedemption: {
          bitDate: "",
          memberId: "",
          privileges: "",
          pin: "",
          isComplementary: false,
          type: "EPICURE",
        },
        country: "",
        emailId: "",
        mobileNumber: "",
        room: [
          {
            isPackageCode: false,
            message: "",
            cost: "",
            adult: "",
            roomId: "",
            roomName: "",
            children: "",
            packageCode: "",
            roomTypeCode: "",
            isServiceable: false,
            rateCode: "",
            currency: "INR",
            roomNumber: 1,
            packageName: "",
            roomImgUrl: "",
          },
        ],
      },
    ],
  }

  createOrderPayload: CreateOrderPayloadType = {
    email: "",
    phoneNo: "",
    lastName: "",
    firstName: "",
    salutation: "",
    GSTNumber: "",
    memberShipType: "",
    specialRequest: "",
    countryCode: "IN",
    membershipNo: "",
    title: "",
    gender: "",
    paymentMethod: "PAY ONLINE",
    agreedTnc: false,
    agreedPrivacyPolicy: false,
    voucherPin: "",
    voucherNumber: "",
  }

  addTenderModePayload: AddTenderModeType = {
    orderId: "",
    tenderMode: "",
    type: BOOKING_CONSTANT?.BOOKING_TYPE,
    tenderModeDetails: [
      {
        amount: 0,
        cardPin: "",
        cardNumber: "",
      },
    ],
  }

  deleteTenderModePayload: DeleteTenderModesType = {
    orderId: "",
    amount: 0,
    cardNumber: "",
    tenderMode: "",
    type: BOOKING_CONSTANT?.BOOKING_TYPE,
  }

  hotelDetails: any = {
    state: "TS",
    pinCode: "500032",
    hotelAddress: "Hyd-1",
    hotelName: "",
    hotelId: "",
  }

  listOfGiftCardsAddedToCart: any = []

  modifiedRoomsDetails: any = []

  changeDatesRoomsAvailability: any = []

  isModifiedSuccess: boolean = false

  roomsAdded: number = 0

  currentRoomId: number = 0

  bookingError: boolean = false

  cartError: boolean = false

  isAddToCartFailed: boolean = false

  couponError: boolean = false

  isCalendarLoading: boolean = false

  //? for Change rooms
  selectedRoomsDetails: any = []
  newChangedRooms: any = []

  //? tabs to show, which are getting from BE
  paymentLabelDetails: any = {
    error: false,
    paymentLabelsResponse: {},
  }

  //? Using to show guarantee amount and policy in the cart
  activeTab: string = ""

  countryCurrencyCode: string = ""

  //? Using to show the session alerts
  timeRemaining: number = -1
  openSessionAlertModal: boolean = false

  errorMessage: string = ""

  //? handles Promo code widget
  openCouponCodeWidget = (state: boolean) => {
    runInAction(() => {
      this.isCouponCodeOpen = state
    })
  }

  updateGuestDetails = (guestDetails: GuestDetailsType) => {
    runInAction(() => {
      this.guestDetails = guestDetails
    })
  }

  changeCurrentRoomId = (id: number) => {
    this.currentRoomId = id
  }

  updateAnalyticsHotelBookingData = (
    userHotelType: string,
    userHotelCode: string,
    userHotelBrandName: string,
    userHotelSynxisId: string,
  ) => {
    runInAction(() => {
      this.analyticsHotelBookingData.hotelType = userHotelType
      this.analyticsHotelBookingData.hotelCode = userHotelCode
      this.analyticsHotelBookingData.brandName = userHotelBrandName
      this.analyticsHotelBookingData.synxisHotelId = userHotelSynxisId
    })
  }

  updateStepperDetails = (stepperDetails: StepperDetailsType) => {
    runInAction(() => {
      this.stepperDetails = stepperDetails
    })
  }

  updateBookingError = (value: boolean) => {
    runInAction(() => {
      this.bookingError = value
    })
  }

  updateCartError = (value: boolean) => {
    runInAction(() => {
      this.cartError = value
    })
  }
  updateCouponError = (value: boolean) => {
    runInAction(() => {
      this.couponError = value
    })
  }

  setCartDetails = async (
    cost: any,
    adult: any,
    roomId: any,
    roomName: any,
    children: any,
    packageCode: any,
    roomTypeCode: any,
    roomNumber: Number,
    packageName: string,
    roomImage: string,
    rateCode: string,
    isPackage: boolean,
    currencyCode: string = "INR",
    category: string | null,
    isSEB: boolean = false,
    sebReqID: any,
  ) => {
    try {
      runInAction(() => {
        this.loading = true
        this
        this.addToCartPayload.hotel[0].hotelId = this.checkAvailabilityPayload?.hotelId
        this.addToCartPayload.category = category || "Hotel booking"
        this.addToCartPayload.hotel[0].room[0].adult = adult
        this.addToCartPayload.hotel[0].room[0].cost = cost
        this.addToCartPayload.hotel[0].room[0].roomId = roomId
        this.addToCartPayload.hotel[0].room[0].roomName = roomName
        this.addToCartPayload.hotel[0].room[0].children = children
        this.addToCartPayload.hotel[0].room[0].packageCode = packageCode
        this.addToCartPayload.hotel[0].room[0].roomTypeCode = roomTypeCode
        this.addToCartPayload.hotel[0].room[0].rateCode = rateCode
        this.addToCartPayload.hotel[0].room[0].roomNumber = roomNumber
        this.addToCartPayload.hotel[0].room[0].packageName = packageName ? packageName : "Best Flexible Rate With WiFi" //Todo For member rate deal tab we are not getting the rateContent from BE so hardcoded this, will remove once we get the data
        this.addToCartPayload.hotel[0].room[0].roomImgUrl = roomImage
        this.addToCartPayload.hotel[0].room[0].currency = currencyCode
        this.addToCartPayload.hotel[0].checkIn = this.checkAvailabilityPayload.startDate
        this.addToCartPayload.hotel[0].checkOut = this.checkAvailabilityPayload.endDate
        this.addToCartPayload.hotel[0].rateFilter = this.checkAvailabilityPayload?.rateFilter
        this.addToCartPayload.hotel[0].memberTier = this.checkAvailabilityPayload.memberTier
        this.addToCartPayload.hotel[0].room[0].isPackageCode = isPackage ? isPackage : false
        this.addToCartPayload.hotel[0].voucherRedemption.bitDate = this.selectedVoucherDetails.bitDate
        this.addToCartPayload.hotel[0].voucherRedemption.memberId = this.selectedVoucherDetails.memberId
        this.addToCartPayload.hotel[0].voucherRedemption.privileges = this.selectedVoucherDetails.privileges
        this.addToCartPayload.hotel[0].voucherRedemption.pin = this.selectedVoucherDetails.pin
        this.addToCartPayload.hotel[0].voucherRedemption.type = this.selectedVoucherDetails.memberType
        this.addToCartPayload.hotel[0].voucherRedemption.isComplementary = this.isSelectedComplimentaryVoucher
        this.addToCartPayload.hotel[0].promoCode =
          this.userEnteredPromoCode?.agentId ||
          this.userEnteredPromoCode?.couponCode ||
          this.userEnteredPromoCode?.promoCode
        this.addToCartPayload.hotel[0].promoType =
          this.userEnteredPromoCode?.index == 1 || this.userEnteredPromoCode?.index == 3
            ? "Corporate"
            : this.userEnteredPromoCode?.index == 4
            ? "group"
            : this.userEnteredPromoCode?.index == 5
            ? "Promotion"
            : this.userEnteredPromoCode?.index == 2
            ? "IATA"
            : this.userEnteredPromoCode?.index == 6
            ? "COUPON"
            : this.checkAvailabilityPayload.rateCode
            ? "offer"
            : ""
        this.addToCartPayload.hotel[0].isSeb = isSEB
        this.addToCartPayload.hotel[0].sebRequestId = sebReqID
      })
      const { error, data } = await addToCart.apiCall(this.addToCartPayload)
      runInAction(() => {
        this.cartDetails = {
          error: error,
          cartDetailsResponse: data?.cartDetails,
        }
        this.paymentLabelDetails = {
          error: error,
          paymentLabelsResponse: data?.paymentLabels,
        }
        this.isCouponApplied = false
        if (!error) {
          this.roomsAdded = this.roomsAdded + 1
          this.bookingError = false
          this.isAddToCartFailed = false
        } else {
          this.roomsAdded = this.roomsAdded
          if (data?.statusCode?.value === 406) {
            this.cartError = true
            this.isAddToCartFailed = true
            this.cartDetails = {
              error: error,
              errorResponse: data,
            }
          } else {
            this.bookingError = true
          }
        }
      })
    } catch (error) {
      console.log("error at add to cart", error)
    } finally {
      this.loading = false
    }
    this.loading = false
  }

  autoAddToCart = async () => {
    try {
      this.loading = true
      const { error, data } = await addToCart.apiCall(this.addToCartPayload)
      runInAction(() => {
        this.cartDetails = {
          error: error,
          cartDetailsResponse: data?.cartDetails,
        }
        this.paymentLabelDetails = {
          error: error,
          paymentLabelsResponse: data?.paymentLabels,
        }
        this.isCouponApplied = false
        if (!error) {
          this.roomsAdded = this.roomsAdded + 1
          this.bookingError = false
          this.isAddToCartFailed = false
        } else {
          this.roomsAdded = this.roomsAdded
          if (data?.statusCode?.value === 406) {
            this.cartError = true
            this.isAddToCartFailed = true
            this.cartDetails = {
              error: error,
              errorResponse: data,
            }
          } else {
            this.bookingError = true
          }
        }
      })
    } catch (error) {
      console.log("error at auto add to cart", error)
    } finally {
      this.loading = false
    }
    this.loading = false
  }

  setGuestBookingSchedule = (userCheckInDate: string, userCheckOutDate: string) => {
    runInAction(() => {
      this.guestBookingSchedule.userCheckInDate = userCheckInDate
      this.guestBookingSchedule.userCheckOutDate = userCheckOutDate
    })
  }

  setRoomsAvailability = async () => {
    this.loading = true
    try {
      const { error, data } = await checkAvailability.apiCall(this.checkAvailabilityPayload)
      runInAction(() => {
        this.roomsAvailability = { error: error, availabilityResponse: data }
        this.isModifiedSuccess = false
        this.couponError = !data?.isCouponCodeValid && Boolean(data?.couponCode)
        this.isCouponAdded = data?.isCouponCodeValid && Boolean(data?.couponCode)
        this.openCouponCodeWidget(false)
      })
    } catch (error) {
      this.couponError = false
      console.log("error at check availability", error)
    } finally {
      this.loading = false
    }
    this.loading = false
  }

  updateDestinationData = async (data: any) => {
    this.loading = true
    try {
      runInAction(() => {
        this.destinationAvailabilityData = [
          ...this.destinationAvailabilityData,
          ...data?.data?.getHotelLeadAvailability?.leadAvailability,
        ]
      })
    } catch (error) {
      console.log("error at check destination availability", error)
    } finally {
      this.loading = false
    }
  }

  setDestinationAvailability = async (payload: any) => {
    this.loading = true
    try {
      const { error, data } = await destinationAvailabilityApi.apiCall(payload)
      if (!error) {
        runInAction(() => {
          this.destinationAvailabilityPayload = payload
          this.destinationAvailability = {
            error: error,
            availabilityResponse: data,
          }
          this.updateDestinationData(data)
        })
      }
    } catch (error) {
      console.log("error at check destination availability", error)
    } finally {
      this.loading = false
    }
  }

  setModifyCheckAvailability = async () => {
    this.loading = true
    const details = this.stepperDetails?.data?.filter((step: any) => step?.isSelected)?.[0]
    try {
      const { error, data } = await checkAvailability.apiCall({
        children: details?.child,
        adults: details?.adults,
        endDate: details?.endDate,
        startDate: details?.startDate,
        hotelId: details?.hotelId,
        numRooms: details?.numRooms || 1,
        rateFilter: details?.rateFilter === undefined ? "RRC,PKG,MD" : details?.rateFilter,
        memberTier: details?.memberTier === undefined ? "Copper" : details?.memberTier,
        isOfferLandingPage: false,
        rateCode: details?.rateCode ? details?.rateCode : null,
        package: details?.package,
        promoCode: details?.promoCode ? details?.promoCode : null,
        promoType: details?.promoType ? details?.promoType : null,
        couponCode: details?.couponCode ? details?.couponCode : null,
        agentId: details?.agentId ? details?.agentId : null,
        agentType: details?.agentId ? "IATA" : null,
        isMyAccount: false,
        isCorporate: details?.isCorporate,
        isLogin: Boolean(global?.localStorage?.getItem("customerHash")),
      })
      runInAction(() => {
        this.roomsAvailability = { error: error, availabilityResponse: data }
        this.isModifiedSuccess = false
      })
    } catch (error) {
      console.log("error at Modify check availability", error)
    } finally {
      this.loading = false
    }
    this.loading = false
  }

  setChangeDatesAvailability = async (payload: any) => {
    this.loading = true
    try {
      const { error, data } = await changeDatesAvailability.apiCall(payload)
      runInAction(() => {
        if (!error) {
          this.changeDatesRoomsAvailability = {
            error: error,
            availabilityResponse: data,
          }
        } else {
          this.bookingError = true
          this.errorMessage = data
        }
      })
    } catch (error) {
      console.log("error at change dates check availability", error)
    } finally {
      this.loading = false
    }
  }

  emptyChangeDatesAvailability = async () => {
    runInAction(() => {
      this.changeDatesRoomsAvailability = {
        error: false,
        availabilityResponse: {},
      }
    })
  }

  setRoomsNewPrice = async (roomsNewData: any) => {
    this.roomsNewPrice = roomsNewData
  }

  setCheckAvailabilityPayload = (
    childCount: Number,
    adultCount: Number,
    roomCount: Number,
    endDate: string,
    startDate: string,
    hotelId: string | undefined,
    rateFilter: string | undefined,
    memberTier: string | undefined,
    isOfferLandingPage: boolean,
    rateCode: string,
    promoCode: string,
    couponCode: string,
    agentId: string,
    isMyAccount = false,
    isCorporate = false,
    memberSpecificOfferType?: string | undefined | null,
  ) => {
    runInAction(() => {
      this.checkAvailabilityPayload.children = childCount
      this.checkAvailabilityPayload.adults = adultCount
      this.checkAvailabilityPayload.endDate = endDate
      this.checkAvailabilityPayload.startDate = startDate
      this.checkAvailabilityPayload.hotelId = hotelId
      this.checkAvailabilityPayload.rateFilter = rateFilter === undefined ? "RRC,PKG,MD" : rateFilter
      this.checkAvailabilityPayload.memberTier = memberTier === undefined ? "Copper" : memberTier
      this.checkAvailabilityPayload.isOfferLandingPage = isOfferLandingPage ? isOfferLandingPage : false
      this.checkAvailabilityPayload.rateCode = rateCode ? rateCode : null
      this.checkAvailabilityPayload.promoCode = promoCode ? promoCode : null
      this.checkAvailabilityPayload.promoType =
        this.userEnteredPromoCode?.index == 1 || this.userEnteredPromoCode?.index == 3
          ? "Corporate"
          : this.userEnteredPromoCode?.index == 4
          ? "group"
          : promoCode
          ? "promotion"
          : null
      this.checkAvailabilityPayload.couponCode = couponCode ? couponCode : null
      this.checkAvailabilityPayload.agentId = agentId ? agentId : null
      this.checkAvailabilityPayload.agentType = agentId ? "IATA" : null
      this.checkAvailabilityPayload.isMyAccount = isMyAccount
      this.checkAvailabilityPayload.isCorporate = isCorporate
      this.checkAvailabilityPayload.isMemberOffer1 = isOfferLandingPage
        ? memberSpecificOfferType === "isMemberOffer1"
          ? true
          : false
        : false
      this.checkAvailabilityPayload.isMemberOffer2 = isOfferLandingPage
        ? memberSpecificOfferType === "isMemberOffer2"
          ? true
          : false
        : false
      this.checkAvailabilityPayload.isLogin = Boolean(global?.window?.localStorage?.getItem("accessToken"))
    })
  }

  setModifiedRooms = async (payload: any) => {
    this.loading = true
    try {
      const { error, data } = await ModifyBookingCart.apiCall(payload)
      runInAction(() => {
        this.modifiedRoomsDetails = { error: error, data: data }
        if (error) {
          this.isModifiedSuccess = false
          this.bookingError = true
        } else {
          this.isModifiedSuccess = true
          this.bookingError = false
        }
      })
    } catch (error) {
      this.loading = false
      this.isModifiedSuccess = false
      runInAction(() => {})
      console.log("error at Modify booking cart ", error)
    } finally {
      this.loading = false
    }
  }

  setInitialModifiedRooms = () => {
    runInAction(() => {
      this.modifiedRoomsDetails = { error: false, data: {} }
    })
  }

  setIsModifySuccess = (isModifiedSuccess: boolean) => {
    runInAction(() => {
      this.isModifiedSuccess = isModifiedSuccess
    })
  }

  updateNewChangedRooms = (newChangedRooms: any) => {
    runInAction(() => {
      this.newChangedRooms = newChangedRooms
    })
  }

  setAddToCartPayload = (payload: any) => {
    runInAction(() => {
      this.addToCartPayload = payload
    })
  }

  setRemoveFromCart = async (payload: RemoveCartPayload[]) => {
    try {
      const removeFromCartPayload: any = {
        hotelId: this.cartDetails.cartDetailsResponse?.items?.[0]?.hotel?.[0]?.hotelId,
        rooms: payload,
      }
      const { error, data } = await RemoveFromCart.apiCall(removeFromCartPayload)
      if (!error) {
        runInAction(() => {
          this.cartDetails = {
            error: error,
            cartDetailsResponse: data?.cartDetails,
          }
          this.paymentLabelDetails = {
            error: error,
            paymentLabelsResponse: data?.paymentLabels,
          }
        })
      } else {
        runInAction(() => {
          this.cartDetails = { error: error }
        })
      }
    } catch (error) {
      console.log("error at Remove cart ", error)
    }
  }

  setCreateOrder = async (payload: any, paymentType: string) => {
    try {
      this.loading = true
      runInAction(() => {
        this.createOrderPayload.salutation = payload?.salutation
        this.createOrderPayload.GSTNumber = payload?.gstNo
        this.createOrderPayload.email = payload?.email
        this.createOrderPayload.phoneNo = `${payload?.countryCode} ${payload?.phoneNumber}`
        this.createOrderPayload.lastName = payload?.lastName?.trim()
        this.createOrderPayload.firstName = payload?.firstName?.trim()
        this.createOrderPayload.memberShipType = payload?.membershipType
        this.createOrderPayload.specialRequest = payload?.specialRequest
        this.createOrderPayload.countryCode = payload?.countryCodeValue
        this.createOrderPayload.paymentMethod = paymentType ? paymentType : "PAY ONLINE"
        this.createOrderPayload.agreedTnc = true
        this.createOrderPayload.agreedPrivacyPolicy = true
        this.createOrderPayload.voucherPin = payload?.voucherPin
        this.createOrderPayload.voucherNumber = payload?.voucherNumber?.replaceAll(" ", "")
      })
      const { error, data } = await CreateOrder.apiCall(this.createOrderPayload)
      if (error === false) {
        runInAction(() => {
          this.orderDetails = { error: error, orderDetailsResponse: data }
          window?.sessionStorage?.setItem("bookingOrderId", data?.orderId)
          payload?.isSEB && global?.localStorage?.setItem("isSEB", payload?.isSEB)
          if (
            data?.orderLineItems?.[0]?.hotel?.promoType?.toLowerCase() === "coupon" &&
            !(data?.errorMessage?.length > 0)
          ) {
            this.fetchCartDetails()
          }
        })
      }
      localStorage.setItem("journey", "booking")
      this.loading = false
      if (error) {
        if (error && data?.statusCode?.value == 406) {
          //? Using for voucher journey
          this.orderDetails = { error: error, errorResponse: data, isInvalidVoucherDetails: error }
        } else {
          this.orderDetails = { error: error, errorResponse: data }
        }
      } else {
        this.countryCurrencyCode = ""
      }
      return data
    } catch (error) {
      this.loading = false
      console.log("error at Create Order ", error)
    } finally {
      this.loading = false
    }
  }

  getCartDetails = async () => {
    try {
      const { error, data } = await GetCartDetails.apiCall()
      runInAction(() => {
        this.cartDetails = { error: error, cartDetailsResponse: data }
      })
    } catch (error) {
      console.log("error at get cart details", error)
    }
  }

  handleCouponModal = async (state: boolean) => {
    runInAction(() => {
      this.isCouponApplied = state
      this.isCouponAdded = state
    })
  }

  fetchCartDetails = async () => {
    try {
      const { error, data } = await GetCartDetails.apiCall()
      runInAction(() => {
        this.cartDetails = {
          error: error,
          cartDetailsResponse: data?.cartDetails,
        }
        this.isCouponApplied = true
      })
    } catch (error) {
      console.log("error at get cart details", error)
    }
  }

  getOrderDetails = async (orderId: any) => {
    this.loading = true
    try {
      const { error, data } = await fetchOrderDetails.apiCall(orderId)
      runInAction(() => {
        if (error) {
          this.bookingOrderData = {
            error: error,
            errorResponse: data,
          }
        } else {
          this.bookingOrderData = {
            error: error,
            bookingOrderResponse: data,
          }
        }
        this.isCouponApplied = true
      })
    } catch (error) {
      this.loading = false
      console.log("error at get order details", error)
    } finally {
      this.loading = false
    }
  }

  addTenderModeToCart = async (
    orderId: string,
    tenderModeType: string,
    amount: number,
    cardPin?: any,
    cardNumber?: any,
  ) => {
    try {
      this.loading = true
      runInAction(() => {
        this.addTenderModePayload.orderId = orderId
        this.addTenderModePayload.tenderMode = tenderModeType
        this.addTenderModePayload.tenderModeDetails[0].amount = amount
        this.addTenderModePayload.tenderModeDetails[0].cardPin = cardPin
        this.addTenderModePayload.tenderModeDetails[0].cardNumber = cardNumber
      })
      const { error, data } = await AddTenderModes.apiCall(this.addTenderModePayload)
      if (error === false) {
        runInAction(() => {
          this.cartDetails = { error: error, cartDetailsResponse: data }
          this.isGCRedeemed = true
          this.addTenderModesError = ""
        })
      } else {
        runInAction(() => {
          this.addTenderModesError = data
        })
      }
    } catch (error) {
      console.log("error at add tender modes", error)
    } finally {
      this.loading = false
    }
  }

  removeTenderModeFromCart = async (orderId: string, tenderModeType: string, amount: number, cardNumber?: any) => {
    try {
      this.loading = true
      runInAction(() => {
        this.deleteTenderModePayload.orderId = orderId
        this.deleteTenderModePayload.amount = amount
        this.deleteTenderModePayload.cardNumber = cardNumber
        this.deleteTenderModePayload.tenderMode = tenderModeType
      })
      const { error, data } = await RemoveTenderModes.apiCall(this.deleteTenderModePayload)
      if (error === false) {
        runInAction(() => {
          this.cartDetails = { error: error, cartDetailsResponse: data }
          this.isGCRedeemed = false
        })
      }
    } catch (error) {
      console.log("error at remove tender mode", error)
    } finally {
      this.loading = false
    }
  }

  clearOrderResponse = () => {
    runInAction(() => {
      this.orderDetails.error = false
      this.orderDetails.errorResponse = {}
      this.orderDetails.orderDetailsResponse = {}
      this.orderDetails.isInvalidVoucherDetails = false
    })
  }
  clearAddToCartPayload = () => {
    runInAction(() => {
      this.addToCartPayload = this.emptyCartPayload
    })
  }
  clearCartResponse = () => {
    runInAction(() => {
      this.cartDetails.cartDetailsResponse = {}
    })
  }
  updateAddTenderModeErrorMessage = () => {
    runInAction(() => {
      this.addTenderModesError = ""
    })
  }
  setIsGCRedeemed = () => {
    runInAction(() => {
      this.isGCRedeemed = false
    })
  }
  setListOfGiftCardsAddedToCart = (giftCards: any) => {
    runInAction(() => (this.listOfGiftCardsAddedToCart = [...this.listOfGiftCardsAddedToCart, giftCards]))
  }

  setHotelDetails = async (hotelName: string, hotelAddress: String, pincode: string, state: string) => {
    try {
      runInAction(() => {
        this.hotelDetails.hotelName = hotelName
        this.hotelDetails.hotelAddress = hotelAddress
        this.hotelDetails.pinCode = pincode
        this.hotelDetails.state = state
      })
    } catch (error) {
      console.log("Hotel Details assignment error", error)
    }
  }

  setHotelNameAndAddress = async (
    hotelName: string,
    hotelAddress: String,
    country: string,
    pincode: string,
    state: string,
    city: string,
    hotelEmail?: string,
    hotelPhone?: string,
    subAccId?: string,
    hotelSponsorId?: string,
  ) => {
    try {
      runInAction(() => {
        this.addToCartPayload.hotel[0].hotelName = hotelName
        this.addToCartPayload.hotel[0].hotelAddress = hotelAddress
        this.addToCartPayload.hotel[0].pinCode = pincode
        this.addToCartPayload.hotel[0].country = country
        this.addToCartPayload.hotel[0].state = state
        this.addToCartPayload.hotel[0].city = city
        this.addToCartPayload.hotel[0].emailId = hotelEmail
        this.addToCartPayload.hotel[0].mobileNumber = hotelPhone
        this.addToCartPayload.hotel[0].storeId = subAccId
        this.addToCartPayload.hotel[0].hotelSponsorId = hotelSponsorId
      })
    } catch (error) {
      console.log("Hotel name and Address assignment error", error)
    }
  }

  //* for change rooms
  setSelectedRoomsDetails = async (roomsDetails: any) => {
    try {
      runInAction(() => {
        this.selectedRoomsDetails = roomsDetails
      })
    } catch (error) {
      console.log("Selected Rooms for Change rooms error", error)
    }
  }

  setLoading = (loaderState: boolean) => {
    runInAction(() => {
      this.loading = loaderState
    })
    return null
  }

  emptyUserCart = async () => {
    try {
      const { error } = await EmptyUserCart.apiCall()
      if (error === false) {
        this.clearCartResponse()
        this.isCouponApplied = false
        if (this.isAddToCartFailed) {
          this.autoAddToCart()
        }
      }
    } catch (error) {
      console.log("error at emptying user cart", error)
    }
  }

  mergeCart = async () => {
    try {
      const { error, data } = await MergeCart.apiCall()
      if (error === false) {
        runInAction(() => {
          this.cartDetails.cartDetailsResponse = data
        })
        global?.window?.localStorage?.removeItem("guestCustomerHash")
      }
    } catch (error) {
      console.log("error at merging cart", error)
    }
  }

  setUpdatePaymentType = async (payload: any) => {
    try {
      this.loading = true
      const { error, data } = await updatePaymentType.apiCall(payload)
      if (error === false) {
        runInAction(() => {
          this.cartDetails.error = error
          this.cartDetails.cartDetailsResponse = data
          this.bookingError = error
        })
      } else {
        runInAction(() => {
          this.bookingError = error
          this.cartDetails.error = error
          this.cartDetails.errorResponse = data
        })
      }
    } catch (error) {
      console.error("error at updatePaymentType", error)
    } finally {
      this.loading = false
    }
  }

  setInitiatePaymentSDK = (isInitiated: boolean) => {
    runInAction(() => {
      this.initiatePaymentSDK = isInitiated
    })
  }

  setGlobalSearchedData = (data: any) => {
    runInAction(() => {
      this.globalSearchedData = data
    })
  }

  setSelectedVoucherDetails = async (
    date: any,
    memberId: any,
    privilegeCode: any,
    voucherPin: any,
    voucherPromoCode: any,
    memberType: any,
  ) => {
    try {
      runInAction(() => {
        this.selectedVoucherDetails.bitDate = date
        this.selectedVoucherDetails.memberId = memberId
        this.selectedVoucherDetails.privileges = privilegeCode
        this.selectedVoucherDetails.pin = voucherPin
        this.selectedVoucherDetails.promoCode = voucherPromoCode
        this.selectedVoucherDetails.memberType = memberType
      })
    } catch (error) {
      console.error("error at updatePaymentType", error)
    }
  }

  setUserEnteredPromoCode = (code: any) => {
    runInAction(() => {
      this.userEnteredPromoCode.index = code?.index
      this.userEnteredPromoCode.title = code?.title
      this.userEnteredPromoCode.agentId = code?.agentId
      this.userEnteredPromoCode.promoCode = code?.promoCode
      this.userEnteredPromoCode.couponCode = code?.couponCode
    })
  }

  setTerminatePaymentSDK = (isTerminated: boolean) => {
    runInAction(() => {
      this.terminatePaymentSDK = isTerminated
    })
  }

  setCalenderViewData = async (payload: any) => {
    this.isCalendarLoading = true
    try {
      const { data, error } = await CalenderViewSource.apiCall(payload)
      if (error === false) {
        runInAction(() => {
          this.calendarViewData = data?.data?.getHotelLeadAvailability?.leadAvailability
        })
      } else {
        this.calendarViewData = []
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log("error")
    } finally {
      this.isCalendarLoading = false
    }
  }

  updateCalenderViewData = async (payload: any) => {
    this.isCalendarLoading = true
    try {
      const { data, error } = await CalenderViewSource.apiCall(payload)
      if (error === false) {
        runInAction(() => {
          this.calendarViewData = [...this.calendarViewData, ...data?.data?.getHotelLeadAvailability?.leadAvailability]
        })
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log("error")
    } finally {
      this.isCalendarLoading = false
    }
  }

  clearCalenderViewData = async () => {
    runInAction(() => {
      this.calendarViewData = []
    })
  }

  setFilteredHotelData = (data: any) => {
    runInAction(() => {
      this.filteredHotelData = data
    })
  }

  setPaymentLabels = async () => {
    try {
      const { data, error } = await GET_PAYMENT_LABELS.apiCall()
      if (!error) {
        runInAction(() => {
          this.paymentLabelDetails = {
            error: error,
            paymentLabelsResponse: data?.paymentLabels,
          }
          this.cartDetails = {
            error: error,
            cartDetailsResponse: data?.cartDetails,
          }
        })
      }
      return { data, error }
    } catch (error) {
      console.error("error at setPaymentLabels", error)
      return { data: null, error }
    }
  }

  setActiveTab = async (tab: string) => {
    runInAction(() => {
      this.activeTab = tab
    })
  }

  setCountryCurrencyCode = async (code: string) => {
    runInAction(() => {
      this.countryCurrencyCode = code
    })
  }

  clearPaymentLabelResponse = () => {
    runInAction(() => {
      this.paymentLabelDetails.paymentLabelsResponse = {}
    })
  }

  setTimeRemaining = (time: number) => {
    runInAction(() => {
      this.timeRemaining = time
    })
  }

  setIsSelectedComplimentaryVoucher = async (value: boolean) => {
    runInAction(() => {
      this.isSelectedComplimentaryVoucher = value
    })
  }

  removeMultipleRoomsAtPaymentINIT = async (payload: RemoveCartPayload[]) => {
    try {
      const removeFromCartPayload: any = {
        orderId: this.orderDetails?.orderDetailsResponse?.orderId || "",
        hotelId: this.cartDetails.cartDetailsResponse?.items?.[0]?.hotel?.[0]?.hotelId,
        rooms: payload,
      }
      const response = await RemoveMultipleRoomsAtPaymentINIT.apiCall(removeFromCartPayload)
      if (!response?.error) {
        runInAction(() => {
          this.cartDetails = {
            error: response?.error,
            cartDetailsResponse: response?.data?.cartDetails,
          }
          this.paymentLabelDetails = {
            error: response?.error,
            paymentLabelsResponse: response?.data?.paymentLabels,
          }
        })
      } else {
        runInAction(() => {
          this.cartDetails = { error: response?.error }
        })
      }
      return response
    } catch (error) {
      console.log("error at remove multiple rooms at payment init ", error)
      return { data: null, error: error }
    }
  }

  updateSessionAlertModal = (value: boolean) => {
    runInAction(() => {
      this.openSessionAlertModal = value
    })
  }

  updateBookingErrorMessage = (value: string = "") => {
    runInAction(() => {
      this.errorMessage = value
    })
  }

  setCartErrorResponse = () => {
    runInAction(() => {
      this.cartDetails.errorResponse = ""
      this.cartDetails.error = false
    })
  }
}
