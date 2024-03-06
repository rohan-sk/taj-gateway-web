import { makeAutoObservable, runInAction } from "mobx"

export class DestinationStore {
  destinationData: any
  selectedCountry: string = ""
  selectedDestinationFilter: string = ""
  nonTajDestinationsHotelsCount: number = 0
  tajDestinationsHotelsCount: number = 0

  constructor() {
    makeAutoObservable(this)
  }

  setDestinationData = async (data: any) => {
    runInAction(() => {
      this.destinationData = data
    })
  }

  setSelectedCountry = async (country: string) => {
    runInAction(() => {
      this.selectedCountry = country
    })
  }

  setSelectedDestinationFilter = async (val: string) => {
    runInAction(() => {
      this.selectedDestinationFilter = val
    })
  }

  setNonTajDestinationsHotelsCount = async (count: number) => {
    runInAction(() => {
      this.nonTajDestinationsHotelsCount = count
    })
  }
  setTajDestinationsHotelsCount = async (count: number) => {
    runInAction(() => {
      this.tajDestinationsHotelsCount = count
    })
  }
}

export default DestinationStore
