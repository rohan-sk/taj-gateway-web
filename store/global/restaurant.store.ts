import { makeAutoObservable, runInAction } from "mobx"

export class RestaurantStore {
  restaurantData: any
  constructor() {
    makeAutoObservable(this)
  }

  setRestaurantData = async (data: any) => {
    runInAction(() => {
      this.restaurantData = data
    })
  }
}

export default RestaurantStore
