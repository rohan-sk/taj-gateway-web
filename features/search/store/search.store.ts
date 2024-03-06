import { makeAutoObservable } from "mobx"
// import { handler as getCount } from "@flash-commerce/api/handlers/itemCount"
import { handler as searchHandler } from "../api/handlers/search.service"
import { status } from "../../../types"

export default class SearchStore {
  status: status = status.done

  searchResults: any = undefined

  searchLoading: boolean = false
  searchQuery: string = ""
  redirect: string = ""
  redirectUrl = {
    url: "",
    programId: "",
    tcpBrand: "",
  }
  searchClickResults: any = {}
  searchClickLoading: boolean = false
  searchClickError: string | unknown = ""
  searchResultType: "autoSuggestion" | undefined = "autoSuggestion"
  scope: string = ""

  constructor() {
    makeAutoObservable(this)
    // this.fetchCartCount()
  }

  searchCleanup() {
    this.searchResultType = undefined
    this.searchResults = []
  }

  async autoCompleteSearch(
    query: string,
    distance?: string,
    lat?: string,
    long?: string
  ) {
    let response
    this.searchLoading = true
    this.searchQuery = query
    this.searchResultType = "autoSuggestion"
    this.searchResults = []
    this.redirect = ""
    this.redirectUrl = {
      url: "",
      programId: "",
      tcpBrand: "",
    }
    this.scope = ""
    try {
      if (query?.length == 0 || query?.length > 2) {
        response = await searchHandler.autoCompleteSearch(
          query,
          distance,
          lat,
          long
        )
        this.searchResults = response
        this.redirect = response?.redirect
        this.redirectUrl = response?.redirectUrl

        this.scope = response?.scope || ""
      } else {
        this.searchCleanup()
      }
    } catch (err) {
      // console.error(err)
    }
    this.status = status.done
    this.searchLoading = false
  }
  async spatialSearch(lat: string, long: string) {
    let response
    this.searchLoading = true
    this.searchResultType = "autoSuggestion"
    this.searchResults = []
    this.redirect = ""

    this.scope = ""
    try {
      response = await searchHandler.spatialSearch(lat, long)
      this.searchResults = response
      this.redirect = response?.redirect
      this.redirectUrl = response?.redirectUrl

      this.scope = response?.scope || ""
    } catch (err) {
      // console.error(err)
    }
    this.status = status.done
    this.searchLoading = false
  }

  async clearRedirectValue() {
    this.redirect = ""
  }
}
