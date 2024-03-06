import { makeAutoObservable, runInAction } from "mobx"
import { handler as confirmGCOrder } from "../../api/handlers/confirmGCOrder.service"

export default class GiftCardConfirmationPageStore {
  error = false
  orderID: string | null = ""
  loading: boolean = false
  paymentConfirmationResponse: any = {}

  constructor() {
    makeAutoObservable(this)
  }

  async confirmGCOrder(orderID: string) {
    runInAction(() => {
      this.orderID = orderID
    })
    try {
      this.loading = true
      const { error, data } = await confirmGCOrder.apiCall(orderID)
      runInAction(() => {
        this.error = error
        this.paymentConfirmationResponse = data
      })
      if (!error) {
        sessionStorage?.removeItem("bookingOrderId")
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log("error at confirm Order", error)
    } finally {
      this.loading = false
    }
  }
}
