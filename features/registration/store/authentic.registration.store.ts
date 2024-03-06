import { makeAutoObservable, runInAction } from "mobx"
import { handler as createUser } from "../api/handlers/createUser.service"
import { handler as validateNewuserLogin } from "../../login/api/handlers/generateOTP.service"
import { handler as verifyNewUserOtp } from "../../login/api/handlers/verifyOTP.service"
import { handler as validateNewEmailUserLogin } from "../../login/api/handlers/generate-email-otp"
interface addressInterface {
  addressLine: string
  landmark: string
  street: string
  country: string
  region: string
  city: string
  pincode: string
}
export default class AuthenticRegistrationStore {
  validPersonalDetails = false
  validAddress = false
  data = []
  activeTabIndex = 0
  userData = {
    salutation: "",
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
  }
  userAddress = {
    addressLine: "",
    landmark: "",
    street: "",
    country: "",
    region: "",
    city: "",
    pincode: "",
  }

  userDataErrors = {
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    confirmEmailError: "",
    dateOfBirthError: "",
    phoneNumberError: "",
  }

  userAddressErrors = {
    countryError: "",
    regionError: "",
    cityError: "",
    pincodeError: "",
    addressLine1Error: "",
  }

  constructor() {
    makeAutoObservable(this)
  }

  validPersonalDetailsFormData = (validPersonalDetails: boolean) => {
    runInAction(() => {
      this.validPersonalDetails = validPersonalDetails
    })
  }

  validAddressFormData = (validAddress: boolean) => {
    runInAction(() => {
      this.validPersonalDetails = validAddress
    })
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

  personalDetailsStore = (
    salutation: string,
    firstName: string,
    lastName: string,
    email: string,
    enteredConfirmEmail: string,
    dateOfBirth: string,
    gender: string,
    phoneNumber: string
  ) => {
    runInAction(() => {
      this.userData.salutation = salutation
      this.userData.firstName = firstName
      this.userData.lastName = lastName
      this.userData.email = email
      this.userData.confirmEmail = enteredConfirmEmail
      this.userData.dateOfBirth = dateOfBirth
      this.userData.gender = gender
      this.userData.phoneNumber = phoneNumber
    })
  }

  userAddressStore = (
    address: string,
    country: string,
    state: string,
    city: string,
    pincode: string
  ) => {
    runInAction(() => {
      this.userAddress.addressLine = address
      this.userAddress.street = address
      this.userAddress.country = country
      this.userAddress.region = state
      this.userAddress.city = city
      this.userAddress.pincode = pincode
    })
  }

  userDetailsErrorHandling = (
    enteredFirstName: string,
    enteredLastName: string,
    enteredEmail: string,
    enteredConfirmEmail: string,
    enteredPhoneNumber: string,
    enteredDateOfBirth: string
  ) => {
    runInAction(() => {
      this.userDataErrors.firstNameError = enteredFirstName
      this.userDataErrors.lastNameError = enteredLastName
      this.userDataErrors.emailError = enteredEmail
      this.userDataErrors.confirmEmailError = enteredConfirmEmail
      this.userDataErrors.phoneNumberError = enteredPhoneNumber
      this.userDataErrors.dateOfBirthError = enteredDateOfBirth
    })
  }

  userAddressErrorHandling = (
    enteredCountry: string,
    enteredRegion: string,
    enteredCity: string,
    enteredPincode: string,
    enteredAddressLine1Error: string
  ) => {
    runInAction(() => {
      this.userAddressErrors.countryError = enteredCountry
      this.userAddressErrors.regionError = enteredRegion
      this.userAddressErrors.cityError = enteredCity
      this.userAddressErrors.pincodeError = enteredPincode
      this.userAddressErrors.addressLine1Error = enteredAddressLine1Error
    })
  }

  clearActiveIndex = async () => {
    runInAction(() => {
      this.activeTabIndex = 0
    })
  }

  clearPersonalDetailsStore = async () => {
    runInAction(() => {
      this.userData.salutation = ""
      this.userData.firstName = ""
      this.userData.lastName = ""
      this.userData.email = ""
      this.userData.confirmEmail = ""
      this.userData.dateOfBirth = ""
      this.userData.gender = ""
      this.userData.phoneNumber = ""
    })
  }

  clearUserAddress = async () => {
    runInAction(() => {
      this.userAddress.addressLine = ""
      this.userAddress.street = ""
      this.userAddress.country = ""
      this.userAddress.region = ""
      this.userAddress.city = ""
      this.userAddress.pincode = ""
    })
  }

  createUser = async (
    salutation: string,
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    dateOfBirth: string,
    gender: string,
    addresses: addressInterface
  ) => {
    try {
      const response = await createUser.createNewUser({
        salutation: salutation,
        firstname: firstName,
        lastname: lastName,
        phone,
        email,
        dob: dateOfBirth,
        gender: gender,
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
  validateNewloginUser = async (payload: any) => {
    try {
      const response = await validateNewuserLogin.apiCall(payload)
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

  validateNewEmailLoginUser = async (payload: any) => {
    try {
      const response = await validateNewEmailUserLogin.apiCall(payload)
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

  verifyNewloginUserOTP = async (payload: any) => {
    try {
      const response = await verifyNewUserOtp.apiCall(payload)
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
