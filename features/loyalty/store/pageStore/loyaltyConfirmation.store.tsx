import { makeAutoObservable, runInAction } from "mobx"
import { handler as confirmLoyaltyOrder } from "../../api/handlers/confirmLoyaltyOrder.service"

export default class LoyaltyConfirmationPageStore {
  error = false
  orderID: string | null = ""
  loading: boolean = true
  loyaltyConfirmationResponse: any = {}
  case: string = "success"
  epicureBanners: any

  constructor() {
    makeAutoObservable(this)
  }

  updateEpicureBannerData = async (bannersData: any) => {
    runInAction(() => {
      this.epicureBanners = bannersData
    })
  }

  async confirmLoyaltyOrder(orderID: string) {
    runInAction(() => {
      this.orderID = orderID
    })
    try {
      const { error, data } = await confirmLoyaltyOrder.apiCall(orderID)
      runInAction(() => {
        this.loading = false
        this.error = error
        this.loyaltyConfirmationResponse = data
        global?.window?.sessionStorage?.removeItem("order_id")
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
}
