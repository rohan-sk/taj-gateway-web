import { axios } from "../../../../api/axios-instance"
import { ApiHandler, ApiMethod } from "../../../../types"
import { GENERATE_MEMBERID_OTP } from "./api-constants"

export const handler: ApiHandler = {
  createRequest: (url?: string, payload?: any) => {
    return {
      url,
      method: ApiMethod.post,
      data: payload,
    }
  },

  apiCall: async (data: any) => {
    const apiConfig = handler.createRequest(GENERATE_MEMBERID_OTP, data)
    const response = await axios(apiConfig)
    return handler.mapResponse("generate membership otp", response)
  },
  mapResponse: (title: string, response: any) => {
    const { data, status }: { data: any; status: number } = response || {}
    if (status === 201) {
      return {
        error: false,
        data,
        status,
      }
    } else {
      return { error: true, data: response }
    }
  },
}
