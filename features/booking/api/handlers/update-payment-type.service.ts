import { UPDATE_PAYMENT_TYPE } from "../../constants"
import { axios } from "../../../../api/axios-instance"
import { ApiHandler, ApiMethod } from "../../../../types"

export const handler: ApiHandler = {
  createRequest: (url, payload, headers) => {
    return {
      url,
      method: ApiMethod.post,
      data: payload,
      headers: {
        ...headers,
      },
    }
  },

  mapResponse: (title: string, response: any) => {
    const { data, status, statusCode }: { data: any; status: number; statusCode: any } =
      response || {}
    if (status === 200) {
      return {
        data,
        error: false,
      }
    } else if (statusCode?.value === 500) {
      return {
        data,
        error: true,
      }
    } else {
      return { error: true, data: response }
    }
  },

  apiCall: async (payload: any) => {
    const apiConfig = handler.createRequest(UPDATE_PAYMENT_TYPE, payload, {})
    const response = await axios(apiConfig)
    return handler.mapResponse("Update Payment Type", response)
  },
}
