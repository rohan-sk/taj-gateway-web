import { makeAutoObservable, runInAction } from "mobx"

export class GCStore {
  gcData: any
  gcSubcategoryData: any = {}
  constructor() {
    makeAutoObservable(this)
  }

  setStoreData = async (data: any) => {
    runInAction(() => {
      this.gcData = data
    })
  }
  setGcSubcategoryData = async (data: any) => {
    runInAction(() => {
      this.gcSubcategoryData = data
    })
  }
}

export default GCStore
