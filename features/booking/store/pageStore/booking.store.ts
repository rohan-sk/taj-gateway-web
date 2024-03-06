import { makeAutoObservable, runInAction } from "mobx"
import { CurrentStepperTypes, SelectedRoomDetailsType } from "../../types"
import { handler as fetchNeuCoins } from "../../api/handlers/fetch-NeuCoins"

export default class BookingsFlowStore {
  constructor() {
    makeAutoObservable(this)
  }
  selectedRoomType: Array<any> = []
  selectedRoomPrice: Array<any> = []
  discountPrice: Array<any> = []
  currentStepper: CurrentStepperTypes = {
    stepName: "ROOM",
  }

  selectedTab: Array<any> = []
  userNeuCoins = 0

  selectedRoomDetails: SelectedRoomDetailsType = {
    roomId: 0,
    roomName: "",
    roomPrice: "",
  }

  guestFormDetails: any = {
    gstNo: "",
    email: "",
    lastName: "",
    firstName: "",
    salutation: "",
    phoneNumber: "",
    membershipType: "",
    specialRequest: "",
    countryCode: "",
    countryCodeValue: "",
    voucherNumber: "",
    voucherPin: "",
  }

  isValid = false
  formError = false
  isUserClickedOnButton = false

  //** Using this boolean to enable the PAY-NOW and PAY-AT-HOTEL tabs in booking flow reservation tab
  isUserSelectedTCCheckBoxToPay: boolean = false

  isUserSelectedPromotionsCheckBoxToPay: boolean = true

  //**This boolean is using to disable all buttons in booking flow reservation tab after user creating the order.
  isUserCreatedOrder: boolean = false

  updateCurrentStepper = async (currentStepper: CurrentStepperTypes) => {
    runInAction(() => {
      this.currentStepper = currentStepper
    })
  }
  updateSelectedRoom = async (roomType: string) => {
    runInAction(() => {
      this.selectedRoomType.push(roomType)
    })
  }
  resetSelectedRoom = async () => {
    runInAction(() => {
      this.selectedRoomType = []
    })
  }
  updateSelectedRoomPrice = async (roomTypePrice: string) => {
    runInAction(() => {
      this.selectedRoomPrice.push(roomTypePrice)
    })
  }

  resetSelectedRoomPrice = async () => {
    runInAction(() => {
      this.selectedRoomPrice = []
    })
  }
  updateDiscountPrice = async (discountAmt: number) => {
    runInAction(() => {
      this.discountPrice.push(discountAmt)
    })
  }

  resetUpdateDiscountPrice = async () => {
    runInAction(() => {
      this.discountPrice = []
    })
  }
  updateSelectedTab = async (selectedTab: string) => {
    runInAction(() => {
      this.selectedTab.push(selectedTab)
    })
  }

  resetUpdateSelectedTab = async () => {
    runInAction(() => {
      this.selectedTab = []
    })
  }
  updateFormValidation = async (isFormValid: boolean) => {
    runInAction(() => {
      this.isValid = isFormValid
    })
  }

  updateFormErrors = async (isFormErrors: boolean) => {
    runInAction(() => {
      this.formError = isFormErrors
    })
  }

  fetchNeuCoins = async (authorizationID: any) => {
    try {
      const response = await fetchNeuCoins?.apiCall(authorizationID)
      if (!response?.error) {
        runInAction(() => {
          this.userNeuCoins = response?.data?.groupLoyaltyProgramDetails?.[0]?.loyaltyPoints
        })
        return response?.data?.groupLoyaltyProgramDetails?.[0]?.loyaltyPoints
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log("error")
    }
  }

  setGuestFormDetails = async (formValues: any) => {
    try {
      runInAction(() => {
        this.guestFormDetails.salutation = formValues?.salutation
        this.guestFormDetails.gstNo = formValues?.gstNo
        this.guestFormDetails.email = formValues?.receiverEmail
        this.guestFormDetails.lastName = formValues?.receiverLastName
        this.guestFormDetails.phoneNumber = formValues?.receiverMobile
        this.guestFormDetails.firstName = formValues?.receiverFirstName
        this.guestFormDetails.countryCode = formValues?.receiverCountry
        this.guestFormDetails.membershipType = formValues?.membershipType || global?.localStorage?.getItem("userTier")
        this.guestFormDetails.specialRequest = formValues?.textArea
        this.guestFormDetails.countryCodeValue = formValues?.userCountryCode
        this.guestFormDetails.isSEB = formValues?.isSEB
        this.guestFormDetails.voucherNumber = formValues?.voucherNumber
        this.guestFormDetails.voucherPin = formValues?.voucherPin
      })
    } catch (error) {
      console.log("error at set guest details form", error)
    }
  }

  setUserSelectedTCCheckBoxToPay = (check: boolean) => {
    runInAction(() => {
      this.isUserSelectedTCCheckBoxToPay = check
    })
  }

  setIsUserSelectedPromotionsCheckBoxToPay = (check: boolean) => {
    runInAction(() => {
      this.isUserSelectedPromotionsCheckBoxToPay = check
    })
  }

  setIsUserCreatedOrder = (orderCreated: boolean) => {
    runInAction(() => {
      this.isUserCreatedOrder = orderCreated
    })
  }
}
