import { makeAutoObservable, runInAction } from "mobx"
import { handler as userLogout } from "../../features/sso/api/handlers/logout.service"
import { handler as getCustomerDetails } from "../../features/my-account/api/handler/getCustomerDetails.service"
import { handler as getCustomerMemberships } from "../../features/login/api/handlers/fetch-memberships"
import { handler as createSessionApi } from "../../features/login/api/handlers/create-session"
import { handler as generateAuthCodeApi } from "../../features/login/api/handlers/generate-auth-code"
import { handler as checkSessionApi } from "../../features/login/api/handlers/check-session"
import { handler as verifyAuthCodeApi } from "../../features/login/api/handlers/verify-authcode"
interface userDetailsInterface {
  salutation: string
  firstName: string
  lastName: string
  countryCode: string
  phone: string
  email: string
  userHash: string
  dob: string
  gender: string
  neuCoins: string
  userTICNumber?: string
  userAddresses?: any
  userTier?: string
  existingCustomer?: string
}
export class UserStore {
  constructor() {
    makeAutoObservable(this)
  }

  encryptedCredentials: string = ""
  loginTabIndex: number = 0
  userMobileNumber = ""
  userEmailID = ""
  userCountryCode = ""
  userEnteredMembershipID = ""
  userEnteredRegistrationMobileNumber = ""
  emailChangeRequest: boolean = false
  personalDetailsFormRef: any = undefined
  subscriptionEmail = ""
  refId = ""

  alreadySubscribed = false
  clearFooterEmail = false
  subscribedSuccessfully = true
  contactFilteredCoordinates: any[] = []
  userDetails: userDetailsInterface = {
    salutation: "",
    firstName: "",
    lastName: "",
    countryCode: "",
    phone: "",
    email: "",
    userHash: "",
    dob: "",
    gender: "",
    neuCoins: "",
    userTICNumber: "",
    userAddresses: [],
    userTier: "",
    existingCustomer: "",
  }

  setUserRedId = async (userRefId: string) => {
    runInAction(() => {
      this.refId = userRefId
    })
  }

  setUserDetailsStore = (
    userEnteredSalutation: string,
    userEnteredFirstName: string,
    userEnteredLastName: string,
    userEnteredCountryCode: string,
    userEnteredPhone: string,
    userEnteredEmail: string,
    userEnteredUserId: string,
    userEnteredUserDOB: string,
    userEnteredGender: string,
    userEnteredNeuCoins: string,
    userTICNumber?: string,
    userAddresses?: any,
    userEnteredTier?: string,
    userExistingCustomer?: string,
  ) => {
    runInAction(() => {
      this.userDetails.salutation = userEnteredSalutation
      this.userDetails.firstName = userEnteredFirstName
      this.userDetails.lastName = userEnteredLastName
      this.userDetails.countryCode = userEnteredCountryCode
      this.userDetails.phone = userEnteredPhone
      this.userDetails.email = userEnteredEmail
      this.userDetails.userHash = userEnteredUserId
      this.userDetails.dob = userEnteredUserDOB
      this.userDetails.gender = userEnteredGender
      this.userDetails.neuCoins = userEnteredNeuCoins
      this.userDetails.userTICNumber = userTICNumber
      this.userDetails.userAddresses = userAddresses
      this.userDetails.userTier = userEnteredTier
      this.userDetails.existingCustomer = userExistingCustomer
    })
  }

  setUserEncryptedCredentials = async (userEncryptedCredentials: string) => {
    runInAction(() => {
      this.encryptedCredentials = userEncryptedCredentials
    })
  }

  setUserMobileNumber = async (userEnteredMobileNumber: string) => {
    runInAction(() => {
      this.userMobileNumber = userEnteredMobileNumber
    })
  }

  setUserEmailID(userEnteredEmailID: string) {
    this.userEmailID = userEnteredEmailID
  }

  setLoginTabIndex(userEnteredIndex: number) {
    this.loginTabIndex = userEnteredIndex
  }

  setUserCountryCode = async (userEnteredCountryCode: string) => {
    runInAction(() => {
      this.userCountryCode = userEnteredCountryCode
    })
  }

  setEmailChangeRequest = async (change: boolean) => {
    runInAction(() => {
      this.emailChangeRequest = change
    })
  }

  setPersonalDetailsFormRef = async (change: any) => {
    runInAction(() => {
      this.personalDetailsFormRef = change
    })
  }

  setContactFilteredCoordinates = async (filteredCoordinates: any[]) => {
    runInAction(() => {
      this.contactFilteredCoordinates = filteredCoordinates
    })
  }

  setUserEnteredRegistrationMobileNumber(userEnteredMobileNumber: string) {
    this.userEnteredRegistrationMobileNumber = userEnteredMobileNumber
  }

  setSubscriptionEmail(enteredSubscriptionEmail: string) {
    runInAction(() => {
      this.subscriptionEmail = enteredSubscriptionEmail
    })
  }

  setFooterEmailClear(clearFooterEmail: boolean) {
    runInAction(() => {
      this.clearFooterEmail = clearFooterEmail
    })
  }

  setSubscribedSuccessfully(subscribedData: boolean) {
    runInAction(() => {
      this.subscribedSuccessfully = subscribedData
    })
  }

  setAlreadySubscribed(subscribed: boolean) {
    runInAction(() => {
      this.alreadySubscribed = subscribed
    })
  }

  clearUserMobileNumber = async () => {
    runInAction(() => {
      this.userMobileNumber = ""
    })
  }

  clearUserCountryCode = async () => {
    runInAction(() => {
      this.userCountryCode = ""
    })
  }

  clearUserEmailID = async () => {
    runInAction(() => {
      this.userEmailID = ""
    })
  }

  clearUserEnteredRegistrationMobileNumber = async () => {
    runInAction(() => {
      this.userEnteredRegistrationMobileNumber = ""
    })
  }

  updateUserEnteredMemberID = async (memberID: string) => {
    try {
      runInAction(() => {
        this.userEnteredMembershipID = memberID
      })
    } catch (error) {
      // eslint-disable-next-line
      console.log("error", error)
    }
  }

  userLogout = async () => {
    try {
      let response = await userLogout.apiCall()
      return response
    } catch (error) {
      // eslint-disable-next-line
      console.log("error at user logout", error)
    }
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

  fetchCustomerMemberships = async () => {
    try {
      const response = await getCustomerMemberships.apiCall()
      if (response?.error === false) {
        if (response?.data?.message?.length) {
          let epicureMemberID = response?.data?.message?.filter(
            (item: any) => item?.brandPlanName?.toLowerCase() === "ihcl_epicure",
          )
          let chambersMemberID = response?.data?.message?.filter(
            (item: any) => item?.brandPlanName?.toLowerCase() === "ihcl_chambers",
          )
          if (epicureMemberID !== undefined && epicureMemberID?.length > 0) {
            global?.window?.localStorage?.setItem("epicureMemberID", epicureMemberID?.[0]?.subscriptionId)
            if (epicureMemberID?.[0]?.brandPlanId?.toLowerCase() === "ev") {
              global?.window?.localStorage?.setItem("epicureMemberTier", "PRIVILEGED")
            } else if (epicureMemberID?.[0]?.brandPlanId?.toLowerCase() === "ep") {
              global?.window?.localStorage?.setItem("epicureMemberTier", "PREFERRED")
            } else if (epicureMemberID?.[0]?.brandPlanId?.toLowerCase() === "ec") {
              global?.window?.localStorage?.setItem("epicureMemberTier", "CORPORATE")
            }
            global?.window?.localStorage?.setItem("epicureMemberStartDate", epicureMemberID?.[0]?.startDate)
            global?.window?.localStorage?.setItem("epicureMemberEndDate", epicureMemberID?.[0]?.endDate)
          }
          if (chambersMemberID !== undefined && chambersMemberID?.length > 0) {
            if (chambersMemberID?.[0]?.brandPlanId?.toLowerCase() === "chg") {
              global?.window?.localStorage?.setItem("chambersMemberTier", "ChambersGlobal")
            } else if (chambersMemberID?.[0]?.brandPlanId?.toLowerCase() === "chn") {
              global?.window?.localStorage?.setItem("chambersMemberTier", "ChambersNational")
            }
            global?.window?.localStorage?.setItem("chambersMemberID", chambersMemberID?.[0]?.subscriptionId)
            global?.window?.localStorage?.setItem("chambersMemberStartDate", chambersMemberID?.[0]?.startDate)
            global?.window?.localStorage?.setItem("chambersMemberEndDate", chambersMemberID?.[0]?.endDate)
          }
        }
        return response
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log("error")
    }
  }

  createSessionApi = async () => {
    try {
      const response = await createSessionApi.apiCall()
      if (response?.error === false) {
        return response
      } else {
        return {
          response,
          error: true,
        }
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log("error")
    }
  }

  generateAuthCodeApi = async (codeChallenge: string) => {
    try {
      const response = await generateAuthCodeApi.apiCall(codeChallenge)
      if (response?.error === false) {
        return response
      } else {
        return {
          response,
          error: true,
        }
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log("error")
    }
  }

  checkSessionApi = async () => {
    try {
      const response = await checkSessionApi.apiCall()
      if (response?.error === false) {
        return response
      } else {
        return {
          response,
          error: true,
        }
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log("error")
    }
  }

  verifyAuthCodeApi = async (payload: any) => {
    try {
      const response = await verifyAuthCodeApi.apiCall(payload)
      if (response?.error === false) {
        return response
      } else {
        return {
          response,
          error: true,
        }
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log("error")
    }
  }
}

export default UserStore
