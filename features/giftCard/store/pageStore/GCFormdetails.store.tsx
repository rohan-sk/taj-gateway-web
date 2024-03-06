import { makeAutoObservable, runInAction } from "mobx"
import { handler as createGCOrder } from "../../api/handlers/createGCOrder.service"

export default class GiftCardFormDetailsStore {
  constructor() {
    makeAutoObservable(this)
  }
}
