import { makeAutoObservable, runInAction } from "mobx"
import { handler as EpicureFetchCartAPI } from "../../api/handlers/epicure-fetch-cart.service"
import { handler as getCountryStateCity } from "../../../my-account/api/handler/get-country-state-city.service"
import { handler as fetchNeuCoins } from "../../../booking/api/handlers/fetch-NeuCoins"

export default class LoyaltyGlobalStore {
  loading: boolean = false
  userNeuCoins = 0
  cardsLength: number = 1
  termsAndConditions: any = null

  epicureCardData = {
    bankName: "",
    isBankUrl: false,
    isShareHolder: false,
    isTata: false,
    memberShipPurchaseType: "",
    epicureType: "",
    neuCoins: "",
    price: "",
    tax: "",
    totalPayableAmount: "",
    discountAmount: "",
    discountPercentage: "",
    discountTax: "",
  }

  epicurePageData: any

  constructor() {
    makeAutoObservable(this)
  }

  updateEpicureTermsAndConditonsData = (data: any) => {
    runInAction(() => {
      this.termsAndConditions = data
    })
  }

  updateEpicurePageData = (data: any) => {
    runInAction(() => {
      this.epicurePageData = data
    })
  }

  updateEpicureCardsLength = (length: number) => {
    runInAction(() => {
      this.cardsLength = length
    })
  }

  updateEpicureCardData = async (
    cardBankName: string,
    cardIsBankUrl: boolean,
    cardIsShareHolder: boolean,
    cardIsTata: boolean,
    cardMemberShipPurchaseType: string,
    cardEpicureType: string,
    cardNeuCoins: string,
    cardPrice: string,
    cardTax: string,
    cardTotalPayableAmount: string,
    cardDiscountAmount: string,
    cardDiscountPercentage: string,
    cardDiscountTax: string
  ) => {
    runInAction(() => {
      this.epicureCardData.bankName = cardBankName
      this.epicureCardData.isBankUrl = cardIsBankUrl
      this.epicureCardData.isShareHolder = cardIsShareHolder
      this.epicureCardData.isTata = cardIsTata
      this.epicureCardData.memberShipPurchaseType = cardMemberShipPurchaseType
      this.epicureCardData.epicureType = cardEpicureType
      this.epicureCardData.neuCoins = cardNeuCoins
      this.epicureCardData.price = cardPrice
      this.epicureCardData.tax = cardTax
      this.epicureCardData.totalPayableAmount = cardTotalPayableAmount
      this.epicureCardData.discountAmount = cardDiscountAmount
      this.epicureCardData.discountPercentage = cardDiscountPercentage
      this.epicureCardData.discountTax = cardDiscountTax
    })
  }

  EpicureFetchCartAPI = async () => {
    this.loading = true
    try {
      const response = await EpicureFetchCartAPI.apiCall()
      this.loading = false
      return response
    } catch (error) {
      // eslint-disable-next-line
      console.log("error")
      this.loading = false
    }
  }

  fetchNeuCoins = async (authorizationID: any) => {
    try {
      const response = await fetchNeuCoins?.apiCall(authorizationID)
      if (!response?.error) {
        runInAction(() => {
          this.userNeuCoins =
            response?.data?.groupLoyaltyProgramDetails?.[0]?.loyaltyPoints
        })
        return response?.data?.groupLoyaltyProgramDetails?.[0]?.loyaltyPoints
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log("error")
    }
  }

  getCountries = async () => {
    // let response :any
    try {
      const response = await getCountryStateCity.getCountry()
      if (!response?.error) {
        return { ...response, error: false }
      } else {
        return { error: true, message: "please enter pincode" }
      }
    } catch (error) {
      console.log("error", error)
    }
  }

  getStates = async (payload: string) => {
    try {
      const response = await getCountryStateCity.getStates(payload)
      if (!response?.error) {
        return { ...response, error: false }
      }
      else {
        return { error: true, message: "please enter pincode" }
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log("error ===>", error)
    }
  }

  getCities = async (payload: string) => {
    try {
      const response = await getCountryStateCity.getCities(payload)
      if (!response?.error) {
        return { ...response, error: false }
      }
      else {
        return { error: true, message: "please enter pincode" }
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log("error ===>", error)
    }
  }
}