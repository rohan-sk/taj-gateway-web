import { makeAutoObservable, runInAction } from "mobx"

export class GAStore {
  pageData: any

  constructor() {
    makeAutoObservable(this)
  }

  setPageData = async (data: any) => {
    runInAction(() => {
      this.pageData = data
    })
  }
}

export default GAStore
