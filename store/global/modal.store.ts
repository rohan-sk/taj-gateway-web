import { action, makeObservable, observable, runInAction } from "mobx"
import { groq } from "next-sanity"
import { getClient } from "../../lib-sanity"

export class Singleton {
  static instance: any

  constructor() {}
  static getInstance() {
    if (!this.instance) {
      this.instance = new this()
    }

    return this.instance
  }
}

export default class ModalStore extends Singleton {
  path: string | undefined
  visibility: boolean = false
  schema: any = {}
  variant: any = {}
  propertyData: any = {}
  currentIndex: number = 0

  constructor() {
    super()
    makeObservable(this, {
      visibility: observable,
      schema: observable,
      fetchDialogSchema: action,
      openModal: action,
      closeModal: action,
      setVisibility: action,
      setPropertyData: action,
    })
  }

  async fetchDialogSchema(path: string) {
    if (path == this.path && this.schema) {
      return this.schema
    }
    const query = groq`
    *[_type == "dialog" && path == '${path?.split("?")[0]}']{...,
      "items": items[ ((isHidden != true && (!(metadata.tags[] match "flutter.only"))) || (isHidden == true && metadata.tags[] match "pwa.only")) && ((metadata.startDate == nil || dateTime(now()) >= dateTime(metadata.startDate)) && (metadata.endDate == nil || dateTime(now()) <= dateTime(metadata.endDate)))]{
      ...,
      aesthetic->,
      _type == "group" => {
      ...,
      "items": @.items[ ((isHidden != true && (!(metadata.tags[] match "flutter.only"))) || (isHidden == true && metadata.tags[] match "pwa.only")) && ((metadata.startDate == nil || dateTime(now()) >= dateTime(metadata.startDate)) && (metadata.endDate == nil || dateTime(now()) <= dateTime(metadata.endDate)))]
      }
      }}[0]
      `
    const data = await getClient(true).fetch(query)
    if (!data) {
      return {}
    }
    runInAction(() => {
      this.schema = data
      this.path = path
    })
    return data
  }

  async openModal(path: string, variant?: any) {
    const schema = await this.fetchDialogSchema(path)
    if (schema) {
      runInAction(() => {
        this.visibility = true
        this.variant = variant
      })
    }
  }

  async closeModal() {
    runInAction(() => {
      this.visibility = false
    })
  }

  async setVisibility(visibility: boolean) {
    runInAction(() => {
      this.visibility = visibility
    })
  }

  async setPropertyData(data: any) {
    runInAction(() => {
      this.propertyData = data
    })
  }

  async setCurrentIndex(index: number) {
    runInAction(() => {
      this.currentIndex = index
    })
  }

  async clearPropertyData(data: any) {
    runInAction(() => {
      this.propertyData = {}
    })
  }
}
