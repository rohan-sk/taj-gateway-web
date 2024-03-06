import { makeAutoObservable, runInAction } from "mobx"
import { handler as bookingConfirmation } from "../../api/handlers/booking.confirmation.service"
import { fetchHotelBanner } from "../../../../lib/utils"
export default class BookingConfirmationPageStore {
  error = false
  loading: boolean = true
  orderID: string | null = ""
  confirmationBanner: any = {}
  bookingConfirmationResponse: any = {}
  showComponents: any = {
    //? using to show the confirmation page components based on the booking and payment status conditions
    showTryAgain: false,
    showRoomDetails: true,
    showGuestDetails: true,
  }

  constructor() {
    makeAutoObservable(this)
  }

  setHotelBannerData = async (hotelId: string) => {
    try {
      const data = await fetchHotelBanner(hotelId)
      runInAction(() => {
        this.confirmationBanner = data
      })
    } catch (error) {
      // eslint-disable-next-line
      console.log("error at Confirm Banner", error)
    }
  }

  async bookingConfirmOrder(orderID: string) {
    runInAction(() => {
      this.orderID = orderID
    })
    try {
      const { error, data } = await bookingConfirmation.apiCall(orderID)
      runInAction(() => {
        this.error = error
        this.bookingConfirmationResponse = data
        //* Clearing the order id from the store after successful booking
        if (error === false) {
          this.orderID = ""
        }
      })
      if (!error) {
        sessionStorage?.removeItem("bookingOrderId")
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log("error at confirm Order", error)
    }
    this.loading = false
  }

  updateShowComponents = async (showTryAgain: boolean, showRoomDetails: boolean, showGuestDetails: boolean) => {
    try {
      runInAction(() => {
        this.showComponents = {
          showTryAgain: showTryAgain,
          showRoomDetails: showRoomDetails,
          showGuestDetails: showGuestDetails,
        }
      })
    } catch (error) {
      console.log("updateShowComponents", error)
    }
  }
}
