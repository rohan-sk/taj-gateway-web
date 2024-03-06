import { axios } from "../../../../api/axios-instance"
import { ApiHandler, ApiMethod } from "../../../../types"
import { VERIFY_OTP_GATEWAY } from "./api-constants"

export const handler: ApiHandler = {
  createRequest: (url?: string, payload?: any) => {
    return {
      url,
      method: ApiMethod.post,
      data: payload,
    }
  },

  apiCall: async (data: any) => {
    const apiConfig = handler.createRequest(VERIFY_OTP_GATEWAY, data)
    const response = await axios(apiConfig)
    return handler.mapResponse("generate otp", response)
  },
  mapResponse: (title: string, response: any) => {
    const {
      data,
      status,
      headers,
    }: { data: any; status: number; headers: any } = response || {}
    if (status === 201) {
      return {
        error: false,
        data,
        headers,
      }
    } else {
      return { error: true, data: response }
    }
  },
}
