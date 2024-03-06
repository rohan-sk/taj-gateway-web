import { MODIFY_BOOKING_ORDER } from "../../constants"
import { axios } from "../../../../api/axios-instance"
import { ApiHandler, ApiMethod } from "../../../../types"

export const handler: ApiHandler = {
  createRequest: (url: string, payload: any, headers: any) => {
    return {
      url,
      data: payload,
      method: ApiMethod.post,
      headers: {
        ...headers,
      },
    }
  },

  mapResponse: (title: string, response: any) => {
    const { data, status }: { data: any; status: number } = response || {}
    if (status === 200) {
      return {
        data,
        error: false,
      }
    } else {
      return { error: true, data: response }
    }
  },

  apiCall: async (orderId: any) => {
    const customerHash = localStorage?.getItem("customerHash") || localStorage?.getItem("guestCustomerHash")
    const apiConfig = handler.createRequest(
      MODIFY_BOOKING_ORDER,
      {
        customerHash: customerHash,
        orderId: orderId,
      },
      {
        CUSTOMERHASH: customerHash,
        Authorization:
          global?.window?.localStorage?.getItem("accessToken") &&
          `Bearer ${global?.window?.localStorage?.getItem("accessToken")}`,
      },
    )
    const response = await axios(apiConfig)
    return handler.mapResponse("Modify Order", response)
  },
}
