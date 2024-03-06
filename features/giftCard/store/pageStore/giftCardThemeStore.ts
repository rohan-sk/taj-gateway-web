import { makeAutoObservable, runInAction } from "mobx"
import { handler as manageGCCards } from "../../api/handlers/manageGC.service"

export default class GiftCardThemeStore {
  giftCardsData = []
  constructor() {
    makeAutoObservable(this)
  }
}
