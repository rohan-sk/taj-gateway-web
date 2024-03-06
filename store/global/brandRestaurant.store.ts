import { makeAutoObservable, runInAction } from "mobx"

export class BrandRestaurantStore {
  brandRestaurantData: any
  constructor() {
    makeAutoObservable(this)
  }

  setBrandRestaurantData = async (data: any) => {
    runInAction(() => {
      this.brandRestaurantData = data
    })
  }
}

export default BrandRestaurantStore
