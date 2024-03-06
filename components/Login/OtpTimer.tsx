export const OtpTimer = (secondsLeft: number) => {
  let hours = Math.floor(secondsLeft / 60 / 60)
  let mins = Math.floor((secondsLeft / 60) % 60)
  let seconds = Math.floor(secondsLeft % 60)
  let displayHours = hours < 10 ? `0${hours}` : hours
  let displayMins = mins < 10 ? `0${mins}` : mins
  let displaySecs = seconds < 10 ? `0${seconds}` : seconds
  return {
    displayHours,
    displayMins,
    displaySecs,
  }
}
