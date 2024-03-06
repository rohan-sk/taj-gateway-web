import React from "react"
import { CONSTANTS } from "../../constants"
import { BookAStayErrors } from "./types"
import { PathType } from "../../types"
import Pluralize from "../../../utils/pluralize"

//utility to count children, adults and created text for input field
export const guestTextGenerator = (roomsCount: any) => {
  let temp = {
    adult: 0,
    child: 0,
    text: "",
  }
  temp = roomsCount?.reduce(
    (prev: any, room: any) => ({
      ...prev,
      adult: prev?.adult + room?.adults,
      child: prev?.child + room?.child,
    }),
    temp,
  )
  temp.text = `${Pluralize(CONSTANTS?.ADULTS?.slice(0, 5), temp?.adult, false)}, ${temp?.child} ${
    temp?.child > 1 ? CONSTANTS?.CHILDREN : CONSTANTS?.CHILD
  } - ${Pluralize(CONSTANTS?.ROOM_SMALL, roomsCount?.length, false)}`
  return temp
}

//handler for autocomplete search
export const handleHotelSearch = (event: any, setHotelInformation: any, setError: any, newValue?: any) => {
  const { name, value } = event?.target
  if (newValue && newValue?.name?.length > 0) {
    setHotelInformation((prev: any) => ({
      ...prev,
      ...newValue,
      name: newValue?.name,
      id: newValue?.id,
    }))
  } else {
    setHotelInformation((prev: any) => ({
      ...prev,
      name: value,
      id: "",
    }))
  }
  if (newValue) {
    setError((prev: BookAStayErrors) => ({
      ...prev,
      search: newValue?.name?.length === 0,
    }))
  }
}

export const handleBookAHotelSearch = (event: any, setHotelInformation: any, setError: any, newValue?: any) => {
  const { name, value } = event?.target
  if (newValue && newValue?.hotelName?.length > 0) {
    setHotelInformation((prev: any) => ({
      ...prev,
      ...newValue,
      hotelName: newValue?.hotelName,
      hotelId: newValue?.hotelId,
      brandName: newValue?.brandName,
      identifier: newValue?.identifier,
    }))
  } else {
    setHotelInformation((prev: any) => ({
      ...prev,
      hotelName: value,
      hotelId: "",
      brandName: "",
      identifier: "",
    }))
  }
  setError((prev: any) => ({
    ...prev,
    search: newValue ? newValue?.hotelName?.length === 0 : value?.length === 0,
  }))
}

//utility to handle date selection
export const handleDateSelection = (date: any, setDate: any) => {
  if (`${date?.[0]?.$D}${date?.[0]?.$M}${date?.[0]?.$y}` === `${date?.[1]?.$D}${date?.[1]?.$M}${date?.[1]?.$y}`) {
    const selectedDate = new Date(`${date?.[1]?.$y}-${date?.[1]?.$M + 1}-${date?.[1]?.$D}`)
    const tomorrow = new Date(selectedDate)
    tomorrow.setDate(selectedDate.getDate() + 1)
    setDate([date?.[0], tomorrow])
  } else {
    setDate(date)
  }
}

//A function to insert Email and Phone number dynamically by targeting className
export const insertHotelContact = (
  propertyStore: any,
  isMobile: boolean,
  navigate: Function,
  isHotelRoute: boolean,
) => {
  const email = isHotelRoute
    ? propertyStore?.propertyData?.hotelContact?.email?.filter((item: any) => item?.type === "business")?.[0]?.email ||
      ""
    : propertyStore?.alternateEmail || ""

  let wellnessEmail = isHotelRoute
    ? propertyStore?.propertyData?.hotelContact?.email?.filter((item: any) => item?.type === "wellness")?.[0]?.email ||
      email
    : email
  let venueEmail = isHotelRoute
    ? propertyStore?.propertyData?.hotelContact?.email?.filter((item: any) => item?.type === "venues")?.[0]?.email ||
      email
    : email
  let hamperEmail = isHotelRoute
    ? propertyStore?.propertyData?.hotelContact?.email?.filter((item: any) => item?.type === "hampers")?.[0]?.email ||
      email
    : email

  const phone = isHotelRoute
    ? propertyStore?.propertyData?.hotelContact?.phone
        ?.filter((item: any) => item?.type === "business")?.[0]
        ?.mobile?.split(",")?.[0]
    : propertyStore?.alternatePhone || ""
  const wellnessPhone = isHotelRoute
    ? propertyStore?.propertyData?.hotelContact?.phone
        ?.filter((item: any) => item?.type === "wellness")?.[0]
        ?.mobile?.split(",")?.[0] || phone
    : phone
  const venuePhone = isHotelRoute
    ? propertyStore?.propertyData?.hotelContact?.phone
        ?.filter((item: any) => item?.type === "venues")?.[0]
        ?.mobile?.split(",")?.[0] || phone
    : phone

  const hamperPhone = isHotelRoute
    ? propertyStore?.propertyData?.hotelContact?.phone
        ?.filter((item: any) => item?.type === "hampers")?.[0]
        ?.mobile?.split(",")?.[0] || phone
    : phone

  //inserting email
  const emailElement: any = document?.querySelector(".enquiry-form-email")
  const venueEmailElement: any = document?.querySelector(".enquiry-form-venue-email")
  const wellnessEmailElement: any = document?.querySelector(".enquiry-form-wellness-email")
  const hamperEmailElement: any = document?.querySelector(".enquiry-form-hamper-email")

  if (emailElement) {
    emailElement.innerHTML = `${email || ""}`
    emailElement.href = `mailto:${email || ""}`
  }

  if (venueEmailElement) {
    venueEmailElement.innerHTML = `${venueEmail || ""}`
    venueEmailElement.href = `mailto:${venueEmail || ""}`
  }
  if (wellnessEmailElement) {
    wellnessEmailElement.innerHTML = `${wellnessEmail || ""}`
    wellnessEmailElement.href = `mailto:${wellnessEmail || "/"}`
  }
  if (hamperEmailElement) {
    hamperEmailElement.innerHTML = `${hamperEmail || ""}`
    hamperEmailElement.href = `mailto:${hamperEmail || "/"}`
  }

  //phone
  const mobileElement: any = document?.querySelector(".enquiry-form-phone")
  const venueMobileElement: any = document?.querySelector(".enquiry-form-venue-phone")
  const wellnessMobileElement: any = document?.querySelector(".enquiry-form-wellness-phone")
  const hamperMobileElement: any = document?.querySelector(".enquiry-form-hamper-phone")

  //inserting mobile
  if (mobileElement) {
    mobileElement.innerHTML = `${phone || ""}`
    if (!isMobile) {
      mobileElement.href = `#`
      mobileElement.addEventListener("click", function (event: any) {
        event.preventDefault()
      })
    } else {
      mobileElement.href = `tel:${phone || ""}`
      navigate(`tel:${phone || ""}`, PathType?.external)
    }
  }
  if (venueMobileElement) {
    venueMobileElement.innerHTML = `${venuePhone || ""}`
    venueMobileElement.href = `tel:${venuePhone || ""}`
    venueMobileElement.addEventListener("click", function (event: any) {
      if (isMobile) {
        navigate(`tel:${venuePhone || ""}`, PathType?.external)
      } else {
        event.preventDefault()
      }
    })
  }
  if (hamperMobileElement) {
    hamperMobileElement.innerHTML = `${hamperPhone || ""}`
    hamperMobileElement.href = `tel:${hamperPhone || ""}`
    hamperMobileElement.addEventListener("click", function (event: any) {
      if (isMobile) {
        navigate(`tel:${hamperPhone || ""}`, PathType?.external)
      } else {
        event.preventDefault()
      }
    })
  }
  if (wellnessMobileElement) {
    wellnessMobileElement.innerHTML = `${wellnessPhone || ""}`
    wellnessMobileElement.href = `tel:${wellnessPhone || ""}`
    wellnessMobileElement.addEventListener("click", function (event: any) {
      if (isMobile) {
        navigate(`tel:${wellnessPhone || ""}`, PathType?.external)
      } else {
        event.preventDefault()
      }
    })
  }
}

//? using in booking confirmation page
export const insertBookingReservationDetails = (reservationNumber: any, navigate: Function, isMobile: boolean) => {
  const reservationNumberElement: any = document?.querySelector(".booking-payment-hotel-reservation-number")
  if (reservationNumberElement) {
    reservationNumberElement.innerHTML = `${reservationNumber || ""}`
    reservationNumberElement.href = `mailto:${reservationNumber || ""}`
    reservationNumberElement.addEventListener("click", function (event: any) {
      navigate(`mailto:${reservationNumber || ""}`, PathType?.external)
    })
  }
}

//function to get business recipient emails
export const getBusinessRecipientEmails = (propertyStore: any, emailType: string) => {
  const businessEmail =
    propertyStore?.propertyData?.hotelContact?.email
      ?.filter((item: any) => item?.type === "business")
      ?.map((item: any) => item?.email) || []
  const typeBasedEmail =
    propertyStore?.propertyData?.hotelContact?.email
      ?.filter((item: any) => item?.type === emailType)
      ?.map((item: any) => item?.email) || []
  return typeBasedEmail?.length > 0 ? [...typeBasedEmail]?.flat() : businessEmail
}

//onkeydown handler to restrict keys for input [type = number]
export const restrictNumericSymbol = (e: any) => {
  ;["e", "E", "+", "-", "."]?.includes(e?.key) && e?.preventDefault()
}

//onChange handler allows on numbers
export const acceptOnlyNumbers = (e: any, handler: Function) => {
  if (String(e?.target?.value)?.match(/^[0-9]{0,14}$/)) {
    handler(e)
  }
}

export const hotelSearchRestrictions = (event: any) => {
  const { key } = event
  if (typeof key === typeof "" && !key?.match(/^[a-zA-Z0-9&.,\- ]{0,200}$/)) {
    event?.preventDefault()
  }
}

export const hotelRegexCheck = (event: any): boolean => {
  const { value } = event?.target
  const valid = typeof value === typeof "" && (value === "" || value?.match(/^[a-zA-Z0-9&.,\- ]{0,200}$/))
  return valid
}

//utility to Check the a record existed in the Array if not It will add and return an Array
export const insertUnExistenceRecord = (
  value: string,
  isObject: boolean,
  objectKey: string,
  previousArray: any[],
): any[] => {
  if (value) {
    const isExist =
      previousArray?.findIndex((item: any) => {
        return isObject
          ? item?.[objectKey] && item?.[objectKey]?.toLowerCase() === value?.toLowerCase()
          : item?.toLowerCase() === value?.toLowerCase()
      }) >= 0
    if (isExist) {
      return previousArray
    } else {
      const newValue = isObject ? { [objectKey]: value } : value
      return [...previousArray, newValue]
    }
  } else {
    return previousArray
  }
}
