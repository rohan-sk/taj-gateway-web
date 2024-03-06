import { makeAutoObservable, runInAction } from "mobx"
import { handler as manageGCCards } from "../../api/handlers/manageGC.service"
import { handler as gcOrderStatus } from "../../api/handlers/GCOrderStatus.service"

export default class manageGCStore {
  giftCardOrderId: string = ""
  activeAccordion: number | null = 0
  showRedeemAndPayment: boolean = false

  //* Using these boolean values to handle the payment sdk's
  initiatePaymentSDK: boolean = false
  terminatePaymentSDK: boolean = false
  totalAmountPayable: number = 0
  gcTenderModeDetails: any = {}

  constructor() {
    makeAutoObservable(this)
  }

  balanceEnquiry = async (payload: any) => {
    try {
      const response = await manageGCCards.GCBalanceEnquire(payload)
      return response
    } catch (error) {
      // eslint-disable-next-line
      console.log("error")
    }
  }

  GCReloadBalance = async (payload: any) => {
    try {
      const response = await manageGCCards.GCCreateOrderForReloadBalance(payload)
      global?.window?.localStorage.setItem("journey", "reloadGiftCard")
      window?.sessionStorage?.setItem("gcOrderId", response?.data?.orderId)
      return response
    } catch (error) {
      // eslint-disable-next-line
      console.log("error")
    }
  }

  GCOrderStatus = async (payload: any) => {
    try {
      const response = await gcOrderStatus.GCOrderStatus(payload)
      return response
    } catch (error) {
      // eslint-disable-next-line
      console.log("error")
    }
  }

  setInitiatePaymentSDK = (isInitiated: boolean) => {
    runInAction(() => {
      this.initiatePaymentSDK = isInitiated
    })
  }
  setTotalAmountPayable = (amount: number) => {
    runInAction(() => {
      this.totalAmountPayable = amount
    })
  }

  setTerminatePaymentSDK = (isTerminated: boolean) => {
    runInAction(() => {
      this.terminatePaymentSDK = isTerminated
    })
  }

  updateGcTenderModeDetails = async (data: any) => {
    runInAction(() => {
      this.gcTenderModeDetails = data
    })
  }

  updateOrderId(orderId: string) {
    runInAction(() => {
      this.giftCardOrderId = orderId
    })
  }

  clearOrderId = async () => {
    runInAction(() => {
      this.giftCardOrderId = ""
    })
  }

  updateShowRedeemAndPayment = async (change: boolean) => {
    runInAction(() => {
      this.showRedeemAndPayment = change
    })
  }

  updateActiveAccordion = async (accordionIndex: any) => {
    runInAction(() => {
      this.activeAccordion = accordionIndex
    })
  }

  AddTenderMode = async (payload: any) => {
    try {
      const response = await manageGCCards.AddTenderMode(payload)
      return response
    } catch (error) {
      // eslint-disable-next-line
      console.log("error")
    }
  }

  RemoveTenderMode = async (payload: any) => {
    try {
      const response = await manageGCCards.RemoveTenderMode(payload)
      return response
    } catch (error) {
      // eslint-disable-next-line
      console.log("error")
    }
  }

  GCMergeCart = async () => {
    try {
      const response = await manageGCCards.GCMergeCart()
      if (response?.data?._id) {
        global?.window?.localStorage?.removeItem("guestCustomerHash")
      }
      return response
    } catch (error) {
      // eslint-disable-next-line
      console.log("error")
    }
  }
  GCClearCart = async () => {
    try {
      const response = await manageGCCards.GCClearCart()
      if (response.status === 200) {
        return { clearedCart: true }
      } else return { clearedCart: false }
    } catch (error) {
      // eslint-disable-next-line
      console.log("error")
    }
  }
}
