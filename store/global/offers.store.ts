import { makeAutoObservable, runInAction } from "mobx"

export class OffersStore {
  offersData: any
  vouchersData: any
  offersDataHotelTypeFilters: any
  selectedOfferData: any

  constructor() {
    makeAutoObservable(this)
  }
  setOffersData = async (data: any, filters: any) => {
    runInAction(() => {
      this.offersData = data
      this.offersDataHotelTypeFilters = filters
    })
  }
  setVouchersData = async (data: any) => {
    runInAction(() => {
      this.vouchersData = data
    })
  }
  setSelectedOfferTitle = async (data: any) => {
    runInAction(() => {
      this.selectedOfferData = data
    })
  }
}

export default OffersStore
