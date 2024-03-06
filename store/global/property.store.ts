import { makeAutoObservable, runInAction } from "mobx"

export class PropertyStore {
  propertyData: any
  constructor() {
    makeAutoObservable(this)
  }

  setPropertyData = async (data: any) => {
    runInAction(() => {
      this.propertyData = data
    })
  }
}

export default PropertyStore
