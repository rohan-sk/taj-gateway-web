import { makeAutoObservable, runInAction } from "mobx"
import { handler as getCustomerDetails } from "../../api/handler/getCustomerDetails.service"
import { handler as fetchNeuCoins } from "../../../booking/api/handlers/fetch-NeuCoins"
import { handler as fetchUserTransactionDetails } from "../../api/handler/get-txn-details.service"
import { handler as requestChangeEmailApi } from "../../api/handler/request-email-change.service"
import { handler as fetchUserBookingData } from "../../api/handler/get-user-bookings.service"
import { handler as createUser } from "../../../registration/api/handlers/createUser.service"
import { handler as overviewVouchersData } from "../../api/handler/get-user-overview-vouchers.service"
import { handler as fetchUserAddresses } from "../../api/handler/get-user-addresses.service"
import { handler as addUserAddress } from "../../api/handler/add-user-address.service"
import { handler as updateUserAddress } from "../../api/handler/update-user-address.service"
import { handler as deleteUserAddress } from "../../api/handler/delete-user-address.service"
import { handler as claimMissingNeuCoins } from "../../api/handler/claim-missing-neu-coins.service"
import { handler as getCountryStateCity } from "../../api/handler/get-country-state-city.service"
import { CHAMBERS_TAB } from "../../../../components/forms/gift-card-form/constants"

export default class AccountStore {
  constructor() {
    makeAutoObservable(this)
  }

  loading: boolean = false

  currentUserNeuCoins: number = 0

  userBookingData: any = {}

  emailChangeRequestedSuccess: boolean = false

  fetchNeuCoinsRequest: boolean = false

  updateEmailChangeRequestedSuccess = async (change: boolean) => {
    runInAction(() => {
      this.emailChangeRequestedSuccess = change
    })
  }

  /**
   * *active tab details
   */
  currentTab: { index: number; value: string; key: any } = {
    index: -1,
    value: "",
    key: null,
  }

  /**
   * *Total tabs data for Mobile site
   */
  mobileTabsData: any = []

  /**
   * *Selected tab child data
   */
  currentTabViewer: { data: any } = { data: null }

  /**
   * *Selected tab parent data
   */
  tabsData: { data: any } = { data: null }

  /**
   ** User Vouchers Data
   */
  userVouchers: any = {}

  /**
   ** User Addresses Data
   */
  userAddresses: any = {}

  //*
  activeTierLabel: string = ""

  updateCurrentTab = async (tabData: any) => {
    runInAction(() => {
      this.currentTab = tabData
    })
  }

  updateCurrentTabViewer = async (tabViewer: any) => {
    runInAction(() => {
      this.currentTabViewer = tabViewer
    })
  }

  updateTabsData = async (tabs: any) => {
    runInAction(() => {
      this.tabsData = tabs
    })
  }

  updateMobileTabsData = async (tabs: any) => {
    runInAction(() => {
      this.mobileTabsData = tabs
    })
  }

  getUserData = async () => {
    try {
      const response = await getCustomerDetails.apiCall()
      if (response?.error === false) {
        return response
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log("error")
    }
  }

  fetchUpdatedNeuCoins = async (authorizationID: any) => {
    this.fetchNeuCoinsRequest = true
    try {
      const response = await fetchNeuCoins.apiCall(authorizationID)
      if (!response?.error) {
        runInAction(() => {
          if (response?.data?.groupLoyaltyProgramDetails !== null) {
            this.currentUserNeuCoins = response?.data?.groupLoyaltyProgramDetails?.[0]?.loyaltyPoints
          }
        })
        return response?.data?.groupLoyaltyProgramDetails?.[0]?.loyaltyPoints
      }
    } catch (error) {
      console.log("error")
    } finally {
      this.fetchNeuCoinsRequest = false
    }
  }

  fetchUserBookingData = async (pageCount: any) => {
    this.loading = true
    try {
      const response = await fetchUserBookingData.apiCall(pageCount)
      if (!response?.error) {
        runInAction(() => {
          this.userBookingData = response?.data
        })
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log("error")
    }
    this.loading = false
  }

  createUser = async (
    salutation: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    dob: string,
    gender: string,
    nationality: string,
    addresses: any,
  ) => {
    try {
      const response = await createUser.createNewUser({
        salutation: salutation,
        firstname: firstName,
        lastname: lastName,
        phone: phoneNumber,
        email,
        dob: dob,
        gender: gender,
        nationality,
        addresses: { ...addresses },
      })
      if (response?.status === 201) {
        return response
      } else {
        return response
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log("error")
    }
  }

  setUserAddresses = async () => {
    try {
      const { data, error } = await fetchUserAddresses.apiCall()
      if (error === false) {
        runInAction(() => {
          this.userAddresses = data
        })
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log("error")
    }
  }

  addUserAddress = async (payload: any) => {
    try {
      const res = await addUserAddress.apiCall(payload)
      const { data, error } = res
      if (error === false) {
        this.setUserAddresses()
      } else {
        return { error, res }
      }
      return res
    } catch (error) {
      console.log("error", error)
      return error
    }
  }

  editUserAddress = async (payload: any) => {
    try {
      const { data, error } = await updateUserAddress.apiCall(payload)
      if (error === false) {
        this.setUserAddresses()
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log("error")
    }
  }
  deleteUserAddress = async (payload: any) => {
    try {
      const { data, error } = await deleteUserAddress.apiCall(payload)
      if (error === false) {
        this.setUserAddresses()
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log("error")
    }
  }
  setUserVouchers = async (productCategory: string) => {
    this.loading = true
    try {
      const response = await overviewVouchersData.apiCall(1, 150, productCategory)
      if (!response?.error) {
        runInAction(() => {
          this.userVouchers.pendingVouchers = [
            ...response?.data?.chamber?.pendingVouchers,
            ...response?.data?.epicure?.pendingVouchers,
          ]
          this.userVouchers.redeemedVouchers = [
            ...response?.data?.chamber?.redeemedVouchers,
            ...response?.data?.epicure?.redeemedVouchers,
          ]
        })
      }
    } catch (error) {
      console.error(error, "error at setUserVouchers")
    }
    this.loading = false
  }

  fetchTxnDetails = async () => {
    try {
      const response = await fetchUserTransactionDetails.apiCall()
      if (!response?.error) {
        return response?.data
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log("error ===>", error)
    }
  }
  requestChangeEmail = async (payload: any) => {
    try {
      const response = await requestChangeEmailApi.apiCall(payload)
      if (!response?.error) {
        return response?.data
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log("error ===>", error)
    }
  }
  claimMissingNeuCoins = async (payload: any) => {
    try {
      const response = await claimMissingNeuCoins.apiCall(payload)
      if (!response?.error) {
        return { ...response, error: false }
      } else {
        return { ...response, error: true }
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log("error ===>", error)
    }
  }

  setActvieTierLabel = (tier: any) => {
    runInAction(() => {
      this.activeTierLabel = tier
    })
  }

  getCountries = async () => {
    try {
      const response = await getCountryStateCity.getCountry()
      if (!response?.error) {
        return { ...response, error: false }
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log("error ===>", error)
    }
  }
  getStates = async (payload: string) => {
    try {
      const response = await getCountryStateCity.getStates(payload)
      if (!response?.error) {
        return { ...response, error: false }
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
    } catch (error) {
      // eslint-disable-next-line
      console.log("error ===>", error)
    }
  }
}
