import { makeAutoObservable, runInAction } from "mobx"
import { handler as reloadGCBalance } from "../../api/handlers/confirmReloadGC.service"

export default class ReloadGiftCardPageStore {
  error = false
  orderID: string | null = ""
  loading: boolean = true
  paymentConfirmationResponse: any = {}

  constructor() {
    makeAutoObservable(this)
  }

  async reloadGCBalance(orderID: string) {
    runInAction(() => {
      this.orderID = orderID
    })
    try {
      const { error, data } = await reloadGCBalance.apiCall(orderID)
      runInAction(() => {
        this.error = error
        this.paymentConfirmationResponse = data
      })
    } catch (error) {
      // eslint-disable-next-line
      console.log("error at confirm Order", error)
    }
    this.loading = false
  }
}
