import React from "react"
import { handler as getPincodeApi } from "../features/sso/api/handlers/pincode-serviceability.service"

export const PincodeServiceability = async (value: any) => {
  const response = await getPincodeApi.apiCall(value)
  if (response?.error === false) {
    return {
      country: response?.data?.data?.country,
      state: response?.data?.data?.state,
      city: response?.data?.data?.city,
      pincode: response?.data?.data?.pincode,
    }
  } else {
    return { error: true, data: response?.data }
  }
}
