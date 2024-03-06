import { useBrowserCheck } from "./hooks/useBrowserCheck"

export const currencyPrettier = (amount: any, currencyCode = "INR") => {
  if (!isNaN(amount)) {
    let formattedAmount = amount?.toLocaleString(undefined, {
      maximumFractionDigits: 0,
      style: "currency",
      currency: currencyCode ? currencyCode : "INR",
    })

    return currencyCode !== "INR"
      ? `${formattedAmount}`
      : `${formattedAmount?.slice(0, 1)} ${formattedAmount?.slice(1)}`
  }
}

//without ₹ symbol with 2 decimal places
export const currencyWith2Decimals = (amount: any) => {
  // Format the number to have at least two decimal places
  const options = { minimumFractionDigits: 2 }
  const formattedNumber = parseFloat(amount).toLocaleString("en-IN", options)
  // Return the formatted number as a string
  return formattedNumber?.toString()
}

//with currency symbol with 2 decimal places
export const currency2DecimalSymbol = (amount: any = "0", currencyCode = "INR") => {
  const options = {
    maximumFractionDigits: 2,
    style: "currency",
    currency: currencyCode ? (currencyCode !== "India" ? currencyCode : "INR") : "INR",
  }
  const formattedAmount = parseFloat(amount)?.toLocaleString("en-IN", options)
  return currencyCode !== "INR" ? `${formattedAmount}` : `${formattedAmount?.slice(0, 1)} ${formattedAmount?.slice(1)}`
}

//format given amount without symbol
export const formatWithoutSymbol = (amount: any, currencyCode: string) => {
  if (currencyCode === "USD") {
    return amount?.toLocaleString("en-US")
  } else if (currencyCode === "INR") {
    return amount?.toLocaleString("en-IN")
  } else {
    return amount?.toLocaleString("en-US")
  }
}

//**Return format ==> symbol -100.00
export const formatCurrencyWithMinus = (amount: any, currencyCode?: string) => {
  const options = {
    style: "currency",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    currency: currencyCode ? currencyCode : "INR",
  }

  const formattedAmount = Math.abs(amount).toLocaleString(undefined, options)
  return currencyCode !== "INR"
    ? `- ${formattedAmount}`
    : `${formattedAmount?.slice(0, 1)} -${formattedAmount?.slice(1)}`
}

//**Return format ==> symbol +100.00
export const formatCurrencyWithPlus = (amount: any, currencyCode?: string) => {
  const options = {
    style: "currency",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    currency: currencyCode ? currencyCode : "INR",
  }

  const formattedAmount = parseFloat(amount).toLocaleString(undefined, options)
  return currencyCode !== "INR"
    ? `+ ${formattedAmount}`
    : `${formattedAmount?.slice(0, 1)} +${formattedAmount?.slice(1)}`
}

// converts amount 353785 => 353.78k
//Todo we have to  convert this utility to support the international currency, currently I'm writing static currency symbol
export const formatCurrency = (amount: number, currencyCode: string = "INR"): string => {
  if (currencyCode?.toUpperCase() === "INR") {
    const units = ["K", "M", "B", "T"]
    const magnitude = Math.max(0, Math.floor(Math.log10(amount) / 3))
    return amount >= 1000
      ? `₹${(amount / Math.pow(1000, magnitude)).toFixed(1)}${units[magnitude - 1]}`
      : amount?.toString()
  } else {
    return `${getCurrencySymbol(currencyCode)}${amount?.toString()}`
  }
}

// Returns the currency symbol for the given currency code
export const getCurrencySymbol = (currencyCode: string) => {
  try {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency: currencyCode,
    })?.formatToParts(1)?.[0]?.value
  } catch (error) {
    return currencyCode
  }
}

//* Written to get the country code from rooms availability response
export const getCurrencyCode = (roomsArray: any) => {
  //? Checks the country code in  rooms
  if (roomsArray?.["roomRates"]?.length > 0) {
    if (roomsArray?.["roomRates"]?.[0]?.rooms?.length) {
      const room = roomsArray?.["roomRates"]?.[0]?.rooms?.[0]
      if (room?.rateContent && room?.rateContent?.currencyCode) {
        return room?.rateContent?.currencyCode
      }
    }
  }
  //? Checks the country code in packages
  if (roomsArray?.["packagesRates"]?.length > 0) {
    if (roomsArray?.["packagesRates"]?.[0]?.rooms?.length) {
      const pkg = roomsArray?.["packagesRates"]?.[0]?.rooms?.[0]
      if (pkg?.rateContent && pkg?.rateContent?.currencyCode) {
        return pkg?.rateContent?.currencyCode
      }
    }
  }
  //? Checks the country code in member exclusive rates
  if (roomsArray?.["memberExclusiveRates"]?.length > 0) {
    const md = roomsArray?.["memberExclusiveRates"]?.[0]?.rooms?.[0]
    if (md?.rateContent && md?.rateContent?.currencyCode) {
      return md?.rateContent?.currencyCode
    }
  }
  //? Checks the country code in offers
  if (roomsArray?.["offerRates"]?.length > 0) {
    const offer = roomsArray?.["offerRates"]?.[0]?.rooms?.[0]
    if (offer?.daily?.length > 0 && offer?.daily?.[0]?.price?.currencyCode) {
      return offer?.daily?.[0]?.price?.currencyCode
    }
  }
  //? Checks the country code in promotions
  if (roomsArray?.["promotionRates"]?.length > 0) {
    const promo = roomsArray?.["promotionRates"]?.[0]?.rooms?.[0]
    if (promo?.daily?.length > 0 && promo?.daily?.[0]?.price?.currencyCode) {
      return promo?.daily?.[0]?.price?.currencyCode
    }
  }
}
// Number formate default indian numeric
export const numberFormatWithoutSymbol = (amount: any, currencyCode?: string) => {
  if (currencyCode === "USD") {
    return amount?.toLocaleString("en-US")
  } else {
    return amount?.toLocaleString("en-IN")
  }
}

//**Return format ==> symbol -₹100
export const formatCurrencyWithMinusWithoutDecimal = (amount: any) => {
  const formattedAmount = `₹ ${amount?.toLocaleString()}`
  return `- ${formattedAmount}`
}

//without ₹ symbol with - symbol and with 0 decimal places
export const currencyWithNoDecimalsWithMinus = (amount: any) => {
  // Format the number to have at least two decimal places
  const options = { minimumFractionDigits: 0 }
  const formattedNumber = `- ${parseFloat(amount).toLocaleString("en-IN", options)}`
  // Return the formatted number as a string
  return formattedNumber?.toString()
}

//**Return format ==> symbol - ₹ 100.00
export const formatCurrencyWithMinusOnlyIndia = (amount: any) => {
  const formattedAmount = amount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return `- ₹ ${formattedAmount}`
}
