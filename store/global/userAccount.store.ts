import { makeAutoObservable, runInAction } from "mobx"
import { handler as myAccountOverviewData } from "../../features/my-account/api/handler/get-orders-count-overview.service"
import { handler as overviewVouchersData } from "../../features/my-account/api/handler/get-user-overview-vouchers.service"
import { handler as epicureMemberShipDetails } from "../../features/my-account/api/handler/fetch-epicure-membership-details.service"
import { fetchMemberExclusiveOffers } from "../../lib/utils"

export class UserAccountStore {
  myAccountOverview: any = {}
  myAccountVouchersData: any = {}
  myAccountOffersData: any = []
  epicureMemberShipCards: any = []
  epicureCards: any[] = []
  epicureRenewalCards: any[] = []
  neuPassCard = {
    membership: "",
    image: {},
    tier: "",
    coinBalance: "",
    startDate: "",
  }
  chambersCard = {
    membership: "",
    image: {},
    premiumBalance: "",
    startDate: "",
    expiryDate: "",
  }

  loading: boolean = false
  upComingBookingsLoading:boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  updateRenewalCardsData = async (filterData: any[]) => {
    runInAction(() => {
      this.epicureRenewalCards = filterData
    })
  }
  
  updateNeuPassCardData = async (
    userEnteredImage: any,
    userEnteredMembership: string,
    userEnteredTier: string,
    userEnteredCoinBalance: string,
    userEnteredStartDate: string
  ) => {
    runInAction(() => {
      this.neuPassCard.image = userEnteredImage
      this.neuPassCard.membership = userEnteredMembership
      this.neuPassCard.tier = userEnteredTier
      this.neuPassCard.coinBalance = userEnteredCoinBalance
      this.neuPassCard.startDate = userEnteredStartDate
    })
  }

  updateChambersCardData = async (
    userEnteredImage: any,
    userEnteredMembership: string,
    userEnteredPremiumBalance: string,
    userEnteredStartDate: string,
    userEnteredExpiryDate: string
  ) => {
    runInAction(() => {
      this.chambersCard.image = userEnteredImage
      this.chambersCard.membership = userEnteredMembership
      this.chambersCard.premiumBalance = userEnteredPremiumBalance
      this.chambersCard.startDate = userEnteredStartDate
      this.chambersCard.expiryDate = userEnteredExpiryDate
    })
  }

  updateEpicureCardsData = async (sortedData: any[]) => {
    runInAction(() => {
      this.epicureCards = sortedData
    })
  }

  fetchUserOverviewData = async () => {
    this.loading = true
    this.upComingBookingsLoading = true
    try {
      const response = await myAccountOverviewData.apiCall()
      if (!response?.error) {
        runInAction(() => {
          this.myAccountOverview = response?.data
        })
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log("error")
    }
    this.loading = false
    this.upComingBookingsLoading = false
  }

  fetchUserOverviewVouchersData = async () => {
    this.loading = true
    try {
      const response = await overviewVouchersData.apiCall(1, 2)
      if (!response?.error) {
        runInAction(() => {
          this.myAccountVouchersData = response?.data
        })
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log("error")
    }
    this.loading = false
  }

  epicureMemberShipDetails = async () => {
    try {
      const response = await epicureMemberShipDetails.apiCall()
      if (!response?.error) {
        runInAction(() => {
          this.epicureMemberShipCards = response?.data
        })
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log("error ===>", error)
    }
  }

  fetchMemberExclusiveOffers = async () => {
    try {
      const response: any = await fetchMemberExclusiveOffers()
      if (response?.length > 0) {
        runInAction(() => {
          this.myAccountOffersData = response
        })
      }
    } catch (error) {
      console.log("Offers error :", error)
    }
  }
}

export default UserAccountStore
