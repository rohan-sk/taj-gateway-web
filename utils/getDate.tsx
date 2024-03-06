export const getTodayDate = () => {
  var currentDate = new Date()
  var day = `${currentDate.getDate()}`?.padStart(2, "0") //? podStart will add 0 if required. For eg 1-3-2024 => 01-03-2024
  var month = `${currentDate.getMonth() + 1}`?.padStart(2, "0")
  var year = currentDate.getFullYear()
  return `${year}-${month}-${day}`
}

export const getTomorrowDate = () => {
  var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
  var day = `${currentDate.getDate()}`?.padStart(2, "0")
  var month = `${currentDate.getMonth() + 1}`?.padStart(2, "0")
  var year = currentDate.getFullYear()
  return `${year}-${month}-${day}`
}

export const getNextDate = (date: Date) => {
  // Create a new Date object using the input date
  const nextDate = new Date(date)
  // Increment the date by one day
  nextDate.setDate(nextDate.getDate() + 1)
  return nextDate
}
export const getDayAfterTomorrowDate = () => {
  var currentDate = new Date(new Date().getTime() + 48 * 60 * 60 * 1000)
  var day = `${currentDate.getDate()}`?.padStart(2, "0")
  var month = `${currentDate.getMonth() + 1}`?.padStart(2, "0")
  var year = currentDate.getFullYear()
  return `${year}-${month}-${day}`
}
export const getPreviousDate = (date: any) => {
  const previous = new Date(date)
  previous?.setDate(date?.getDate() - 1)
  return dateFormatConverter(previous)
}

//utility for to get previous date as date obj
export const getPreviousDateObj = (date: Date): Date => {
  const previousDate = new Date(date)
  previousDate?.setDate(date?.getDate() - 1)
  return previousDate
}

export const firstDateOfMonth = (): Date => {
  return new Date(new Date().getFullYear(), new Date().getMonth(), 1)
}
export const firstDateOfSelectedMonth = (date: Date): Date => {
  return new Date(date?.getFullYear(), date?.getMonth(), 1)
}

// date format==> DD/MM/YYYY
export const formatDateEnGB = (date: any) => {
  //this if condition is to convert DD-MM-YYYY to DD/MM/YYY
  if (String(date)?.includes("-")) {
    const newDate = date?.split("-")
    return `${newDate[2]}/${newDate[1]}/${newDate[0]}`
  } else {
    const eventFormat = new Date(Date.UTC(date?.$y, date?.$M, date?.$D))
    return eventFormat.toLocaleString("en-GB", { timeZone: "UTC" }).split(",")[0]
  }
}

// date format==> YYYY-MM-DD
export const formatDateWithHyphen = (date: string) => {
  const dateArray = date?.split("/")
  return `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`
}
// date format==> DD/MM/YYYY to DD-MM-YYYY
export const DateWithHyphen = (date: string) => {
  const dateArray = date?.split("/")
  return `${dateArray[0]}-${dateArray[1]}-${dateArray[2]}`
}

// date format==> date to DD MMM YYYY
export const formatToShortDate = (inputDateStr: any) => {
  if (inputDateStr) {
    const inputDate = new Date(inputDateStr)
    const day = inputDate?.getDate()
    const month = new Intl.DateTimeFormat("en", { month: "short" })?.format(inputDate)
    const year = inputDate?.getFullYear()
    return `${day} ${month} ${year}`
  } else {
    return null
  }
}

//* date format ===> DD-MMM -YYYY (01-Jan-2000)

export const formatDateWithMON = (date: any) => {
  {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const givenDate = new Date(date)

    const day = givenDate.getDate()

    const monthIndex = givenDate.getMonth()
    const monthName = monthNames[monthIndex]

    const year = givenDate.getFullYear()

    return `${day} ${monthName} ${year}`
  }
}

//* date format ===> DD-MMM -YYYY (Jan-01-2000)

export const formatDateWithMONTH = (date: any, checkComma: boolean) => {
  {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const givenDate = new Date(date)

    const day = givenDate.getDate()

    const monthIndex = givenDate.getMonth()
    const monthName = monthNames[monthIndex]

    const year = givenDate.getFullYear()

    if (checkComma) {
      return `${monthName} ${day}, ${year}`
    } else {
      return `${monthName} ${day} ${year}`
    }
  }
}

export const formatDateWithForwardSlashToDateMonthYear = (date: any) => {
  const eventFormat = new Date(Date.UTC(date.split("/")[2], date.split("/")[1], date.split("/")[0]))
  return formatDateWithMON(eventFormat)
}

// date format ===> DD-MONTH-YYYY

export const formatDateWithFullMonth = (date: any, checkCommaValue: boolean, isMonthCapitalize?: boolean) => {
  {
    const monthNames = [
      "JANUARY",
      "FEBRUARY",
      "MARCH",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUGUST",
      "SEPTEMBER",
      "OCTOBER",
      "NOVEMBER",
      "DECEMBER",
    ]
    const monthNamesCapitalize = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    const givenDate = new Date(date)

    const day = givenDate.getDate()

    const monthIndex = givenDate.getMonth()
    const monthName = isMonthCapitalize ? monthNamesCapitalize[monthIndex] : monthNames[monthIndex]

    const year = givenDate.getFullYear()

    if (checkCommaValue) {
      return `${monthName} ${day}, ${year}`
    } else {
      return `${day} ${monthName} ${year}`
    }
  }
}

export const getTimeFromDate = (date: any) => {
  const givenDate = new Date(date)
  const DateTime = givenDate.toLocaleString([])
  const timeArr = DateTime?.toString()?.split(" ")
  const time = timeArr?.[1]?.split(":")
  const timeFormat = timeArr?.[2]
  return `${time?.[0]}:${time?.[1]} ${timeFormat}`
}

//To convert any date formate into dd-mm-yyyy format
export const convertDateFormat = (dateString: any) => {
  // Parse the original date string
  const dateObj = new Date(dateString)

  // Extract day, month, and year components
  const day = dateObj.getDate()
  const month = dateObj.getMonth() + 1 // Months are zero-based
  const year = dateObj.getFullYear()

  // Pad single-digit day/month values with leading zeros
  const formattedDay = day < 10 ? `0${day}` : day
  const formattedMonth = month < 10 ? `0${month}` : month

  // Reconstruct the date in the desired format
  return `${formattedDay}-${formattedMonth}-${year}`
}

// Calculate the difference in milliseconds between the two dates
export const differenceInDays = (date1: Date, date2: Date): number => {
  const diffInMilliseconds = Math.abs(new Date(date2)?.getTime() - new Date(date1)?.getTime())
  // Convert milliseconds to days
  const millisecondsPerDay = 24 * 60 * 60 * 1000
  const diffInDays = Math.floor(diffInMilliseconds / millisecondsPerDay)

  return diffInDays
}

// Calculate the difference in milliseconds between the two dates allows negative values
export const diffInDaysAllowNegative = (date1: Date, date2: Date): number => {
  const diffInMilliseconds = new Date(date2)?.getTime() - new Date(date1)?.getTime()
  const millisecondsPerDay = 24 * 60 * 60 * 1000
  const diffInDays = Math.floor(diffInMilliseconds / millisecondsPerDay)
  return diffInDays
}

//To convert any date formate into yyyy-mm-dd format
export const dateFormatConverter = (dateString: any) => {
  // Parse the original date string
  const dateObj = new Date(dateString)

  // Extract day, month, and year components
  const day = dateObj.getDate()
  const month = dateObj.getMonth() + 1 // Months are zero-based
  const year = dateObj.getFullYear()

  // Pad single-digit day/month values with leading zeros
  const formattedDay = day < 10 ? `0${day}` : day
  const formattedMonth = month < 10 ? `0${month}` : month

  // Reconstruct the date in the desired format
  const formattedDate = `${year}-${formattedMonth}-${formattedDay}`

  return formattedDate
}
// Create a new Date object with the date 18 years ago
export const getDateBefore18Years = () => {
  const currentDate: Date = new Date()
  const year: number = currentDate.getFullYear() - 18
  const month: number = currentDate.getMonth()
  const day: number = currentDate.getDate()

  const dateBefore18Years: Date = new Date(year, month, day)
  return dateBefore18Years
}

//Create a new Date Object with the date 100 years ago
export const getDateBeforeCentenary = () => {
  const currentDate: Date = new Date()
  const year: number = currentDate.getFullYear() - 100
  const month: number = currentDate.getMonth()
  const day: number = currentDate.getDate()

  const dateBeforeCentenary: Date = new Date(year, month, day)
  return dateBeforeCentenary
}

//Create a new Date Object with the date of 1 years ago
export const getMinDate = () => {
  const today = new Date()
  const minDate = new Date(today)
  minDate.setDate(today.getDate() - 365) // Set the minimum date to 365 days in the past
  return minDate
}

export const getDateBefore1Month = (date: any) => {
  const year: number = date?.getFullYear()
  const month: number = date?.getMonth() - 1
  const day: number = date?.getDate()

  const dateBefore18Years: Date = new Date(year, month, day)
  return dateBefore18Years
}

export const getLastDateOfMonth = (currentDate: Date): Date => {
  // Clone the current date to avoid mutating the original date
  const date = new Date(currentDate)
  // Set the date to the first day of the next month
  date.setMonth(date.getMonth() + 1, 1)
  // Subtract 1 day to get the last day of the current month
  date.setDate(date.getDate() - 1)
  return date
}

export const isDateExpired = (date: Date): boolean => {
  const givenDateTime = new Date(date)
  const currentDateTime = new Date()
  // Compare the given date and time with the current date and time
  return givenDateTime <= currentDateTime
}
export const ageFromDOB = (date: any): number => {
  const dob: Date = new Date(date)
  const currentDate: Date = new Date()
  const ageDiff = currentDate.getFullYear() - dob.getFullYear()
  const hasBirthdayOccurred =
    currentDate.getMonth() > dob.getMonth() ||
    (currentDate.getMonth() === dob.getMonth() && currentDate.getDate() >= dob.getDate())
  return hasBirthdayOccurred ? ageDiff : ageDiff - 1
}

//? returns a new date based on a certain number of days from the current date
export const calculateFutureDate = (numberOfDaysToAdd: number) => {
  let currentDate = new Date()
  currentDate?.setDate(currentDate?.getDate() + numberOfDaysToAdd)
  return currentDate
}

export const addDaysToDate = (initialDate: any, numberOfDays: number) => {
  let newDate = new Date(initialDate)
  newDate.setDate(newDate.getDate() + numberOfDays)
  var day = `${newDate?.getDate()}`?.padStart(2, "0")
  var month = `${newDate?.getMonth() + 1}`?.padStart(2, "0")
  var year = newDate?.getFullYear()
  return `${year}-${month}-${day}`
}

/////// Numder Format with 1K, 100K, 1M, 100M, etc.,
export const formatNumberCount = (n: number) => {
  if (n < 1e3) {
    return n
  } else if (n >= 1e3 && n < 1e6) {
    return +(n / 1e3).toFixed(1) + "K"
  } else if (n >= 1e6 && n < 1e9) {
    return +(n / 1e6).toFixed(1) + "M"
  } else if (n >= 1e9 && n < 1e12) {
    return +(n / 1e9).toFixed(1) + "B"
  } else if (n >= 1e12) {
    return +(n / 1e12).toFixed(1) + "T"
  }
}

/////// Format time since seconds, minutes, hours, months & years
export const formatTimeSince = (createdDate: any) => {
  const date: any = new Date(createdDate)
  const currentDate: any = new Date()
  const differenceInSeconds = Math?.floor((currentDate - date) / 1000)

  if (differenceInSeconds < 60) {
    if (differenceInSeconds > 1) {
      return `${differenceInSeconds} seconds ago`
    } else {
      return `${differenceInSeconds} second ago`
    }
  } else if (differenceInSeconds < 3600) {
    const minutes = Math?.floor(differenceInSeconds / 60)
    if (minutes > 1) {
      return `${minutes} minutes ago`
    } else {
      return `${minutes} minute ago`
    }
  } else if (differenceInSeconds < 86400) {
    const hours = Math?.floor(differenceInSeconds / 3600)
    if (hours > 1) {
      return `${hours} hours ago`
    } else {
      return `${hours} hour ago`
    }
  } else if (differenceInSeconds < 2592000) {
    const days = Math?.floor(differenceInSeconds / 86400)
    if (days > 1) {
      return `${days} days ago`
    } else {
      return `${days} day ago`
    }
  } else if (differenceInSeconds < 31536000) {
    const months = Math?.floor(differenceInSeconds / 2592000)
    if (months > 1) {
      return `${months} months ago`
    } else {
      return `${months} month ago`
    }
  } else {
    const years = Math?.floor(differenceInSeconds / 31536000)
    if (years > 1) {
      return `${years} years ago`
    } else {
      return `${years} year ago`
    }
  }
}
