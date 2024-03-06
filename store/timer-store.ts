import { makeAutoObservable } from "mobx"

export class Timer {
  secondsPassed = 1

  constructor() {
    makeAutoObservable(this)
  }

  increase() {
    this.secondsPassed += 1
  }

  reset() {
    this.secondsPassed = 0
  }
}
