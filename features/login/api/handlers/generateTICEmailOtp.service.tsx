import { axios } from "../../../../api/axios-instance"
import { ApiHandler, ApiMethod } from "../../../../types"
import { TIC_GET_EMAIL_OTP_FOR_FORGOT_PASSWORD } from "./api-constants"

export const handler: ApiHandler = {
  createRequest: (url?: string, payload?: any) => {
    return {
      url,
      method: ApiMethod.post,
      data: payload,
    }
  },

  apiCall: async (data: any) => {
    const apiConfig = handler.createRequest(
      TIC_GET_EMAIL_OTP_FOR_FORGOT_PASSWORD,
      data
    )
    const response = await axios(apiConfig)
    return handler.mapResponse("generate tic forgot password email otp", response)
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
