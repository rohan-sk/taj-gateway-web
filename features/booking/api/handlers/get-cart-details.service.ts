import { axios } from "../../../../api/axios-instance"
import { ApiHandler, ApiMethod } from "../../../../types"
import { BOOKING_CONSTANT, GET_CART_DETAILS } from "../../constants"

export const handler: ApiHandler = {
  createRequest: (url: string, payload: any, headers: any) => {
    return {
      url,
      data: payload,
      method: ApiMethod.get,
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

  apiCall: async () => {
    const apiConfig = handler.createRequest(
      GET_CART_DETAILS,
      {},
      {
        CUSTOMERHASH:
          localStorage?.getItem("customerHash") || localStorage?.getItem("guestCustomerHash"),
        type: BOOKING_CONSTANT?.BOOKING_TYPE,
      }
    )
    const response = await axios(apiConfig)
    return handler.mapResponse("Get Cart Details ", response)
  },
}
