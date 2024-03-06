import { makeAutoObservable, runInAction } from "mobx"
import { handler as generateOTP } from "../api/handlers/generateOTP.service"
import { handler as verifyOTP } from "../api/handlers/verifyOTP.service"
import { handler as generateEmailOTP } from "../api/handlers/generate-email-otp"
import { handler as verifyEmailOTP } from "../api/handlers/verify-email-otp"
import { handler as verifyChangeEmailOTP } from "../api/handlers/verify-change-email-otp.service"
import { handler as generateMembershipIDOTP } from "../api/handlers/generate-membership-otp"
import { handler as verifyMembershipIDOTP } from "../api/handlers/verify-membership-number-otp"
import { handler as ticPasswordVerification } from "../api/handlers/verify-tic-password"
import { handler as generateTICEmailOtp } from "../api/handlers/generateTICEmailOtp.service"
import { handler as verifyTICEmailOtp } from "../api/handlers/verifyTICEmailOtp.service"
import { handler as resetPassword } from "../api/handlers/resetPassword.service"

export default class AuthenticLoginStore {
  data = []
  activeTabIndex = 0

  constructor() {
    makeAutoObservable(this)
  }
  updateData = async (tabs: any) => {
    runInAction(() => {
      this.data = tabs
    })
  }
  updateActiveIndex = async (activeTabIndex: number) => {
    runInAction(() => {
      this.activeTabIndex = activeTabIndex
    })
  }

  clearActiveIndex = async () => {
    runInAction(() => {
      this.activeTabIndex = 0
    })
  }

  generateOTP = async (payload: any) => {
    try {
      const response = await generateOTP.apiCall(payload)
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

  verifyOTP = async (payload: any) => {
    try {
      const response = await verifyOTP.apiCall(payload)
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

  generateEmailOTP = async (payload: any) => {
    try {
      const response = await generateEmailOTP.apiCall(payload)
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

  verifyEmailOTP = async (payload: any) => {
    try {
      const response = await verifyEmailOTP.apiCall(payload)
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
  verifyChangeEmailOTP = async (payload: any) => {
    try {
      const response = await verifyChangeEmailOTP.apiCall(payload)
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

  generateMembershipIDOTP = async (payload: any) => {
    try {
      const response = await generateMembershipIDOTP.apiCall(payload)
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

  verifyMembershipIDOTP = async (payload: any) => {
    try {
      const response = await verifyMembershipIDOTP.apiCall(payload)
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

  ticPasswordVerification = async (payload: any) => {
    try {
      const response = await ticPasswordVerification.apiCall(payload)
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

  generateTICEmailOtp = async (payload: any) => {
    try {
      const response = await generateTICEmailOtp.apiCall(payload)
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
  verifyTICEmailOtp = async (payload: any) => {
    try {
      const response = await verifyTICEmailOtp.apiCall(payload)
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

  resetPassword = async (payload: any) => {
    try {
      const response = await resetPassword.apiCall(payload)
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
