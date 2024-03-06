import { makeAutoObservable, runInAction } from "mobx"

export class HamperStore {
  hamperData: any
  selectedHamperInfo: any

  constructor() {
    makeAutoObservable(this)
  }

  setHamperData = async (data: any) => {
    runInAction(() => {
      this.hamperData = data
    })
  }


  setSelectedHamperInfo = async (data: any) => {
    runInAction(() => {
      this.selectedHamperInfo = data
    })
  }

  
}

export default HamperStore
