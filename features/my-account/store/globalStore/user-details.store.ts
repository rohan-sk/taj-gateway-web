import { cancelOrderPayloadType } from "../types"
import { makeAutoObservable, runInAction } from "mobx"
import { handler as CancelOrderHandler } from "../../api/handler/cancel-order.service"
import { handler as FindYourBooking } from "../../api/handler/find-your-booking.service"
import { handler as NueCoinsTransactionHandler } from "../../api/handler/nue-coins-transaction.service"

export default class UserDetailsStore {
  constructor() {
    makeAutoObservable(this)
  }
  loading: boolean = false

  cancelOrderDetails: any = {
    error: undefined,
    cancelOrderResponse: {},
  }

  neuCoinsTransactionDetails: any = {
    error: false,
    neuCoinsTransactionResponse: {},
  }

  findYourBooking: any = {
    error: false,
    bookingResponse: {},
  }

  setLoading = (loading: boolean) => {
    runInAction(() => {
      this.loading = loading
    })
  }

  fetchCancelOrder = async (
    payload: cancelOrderPayloadType,
    authorizationId: any
  ) => {
    try {
      this.loading = true
      const { error, data } = await CancelOrderHandler.apiCall(
        payload,
        authorizationId
      )
      if (error === false) {
        runInAction(() => {
          this.cancelOrderDetails = { error: error, cancelOrderResponse: data }
        })
      } else {
        runInAction(() => {
          this.cancelOrderDetails = { error: error, cancelOrderResponse: {} }
        })
      }
      return { error, data }
    } catch (error) {
      console.log("Error At Cancel Order ", error)
    } finally {
      this.loading = false
    }
  }

  fetchNueCoinsTransaction = async () => {
    try {
      const { error, data } = await NueCoinsTransactionHandler.apiCall()
      runInAction(() => {
        this.neuCoinsTransactionDetails = {
          error: error,
          neuCoinsTransactionResponse: data,
        }
      })
    } catch (error) {
      console.log("Error At NueCoins Transaction ", error)
    }
  }

  SetFindYourBooking = async (payload: any) => {
    try {
      this.loading = true
      const response = await FindYourBooking?.apiCall(payload)
      return response
    } catch (error) {
      console.log("error at find your booking", error)
    } finally {
      this.loading = false
    }
  }
}
