import { makeAutoObservable, runInAction } from "mobx"
import { handler as searchListing } from "../../api/handlers/searchListing.service"

export default class searchResultsListing {
  error = false
  query: string | null = ""
  loading: boolean = true
  searchResultsListingResponse: any = {}

  constructor() {
    makeAutoObservable(this)
  }
  async searchResultListingApi(query: string) {
    this.loading = true
    this.query = query
    this.searchResultsListingResponse = []
    try {
      let response = await searchListing.apiCall(query)
      this.searchResultsListingResponse = response
    } catch (error) {
      // eslint-disable-next-line
      console.log("error at search Results Page", error)
    }
    this.loading = false
  }
}
