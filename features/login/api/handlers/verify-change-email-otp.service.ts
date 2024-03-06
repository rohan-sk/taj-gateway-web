import { axios } from "../../../../api/axios-instance"
import { ApiHandler, ApiMethod } from "../../../../types"
import { VERIFY_CHANGE_EMAIL_OTP } from "./api-constants"

export const handler: ApiHandler = {
  createRequest: (url?: string, payload?: any, headers?: any) => {
    return {
      url,
      method: ApiMethod.post,
      headers: {
        ...headers,
      },
      data: payload,
    }
  },

  apiCall: async (data: any) => {
    const apiConfig = handler.createRequest(VERIFY_CHANGE_EMAIL_OTP, data, {
      Authorization: `Bearer ${global?.window?.localStorage?.getItem(
        "accessToken"
      )}`,
    })
    const response = await axios(apiConfig)
    return handler.mapResponse("verify change email otp", response)
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
