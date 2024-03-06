import { makeAutoObservable, runInAction } from "mobx"

export class HolidayStore {
  holidayData: any
  selectedHolidayFilter: any
  selectedHolidayTab: any
  constructor() {
    makeAutoObservable(this)
  }

  setHolidayData = async (data: any) => {
    runInAction(() => {
      this.holidayData = data
    })
  }

  setSelectedHolidayTab = async (val: any) => {
    runInAction(() => {
      this.selectedHolidayTab = val
    })
  }

  setSelectedHolidayFilter = async (val: any) => {
    runInAction(() => {
      this.selectedHolidayFilter = val
    })
  }

}

export default HolidayStore
