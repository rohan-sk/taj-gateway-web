import { ApiHandler, ApiMethod } from "../../../../types"

import { axios } from "../../../../api/axios-instance"
import { ORDER_CONFIRMATION } from "../../../booking/constants"

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
    const { data, status }: { data: any; status: number } = response || {}
    if (status === 200) {
      return {
        error: false,
        data,
      }
    } else {
      return { error: true, data: response }
    }
  },

  apiCall: async (orderID: string) => {
    const apiConfig = handler.createRequest(
      ORDER_CONFIRMATION,
      JSON.stringify({ orderId: orderID }),
      { JWTTOKEN: localStorage?.getItem("accessToken") }
    )
    const response = await axios(apiConfig)
    return handler.mapResponse("loyaltyConfirmation", response)
  },
}
