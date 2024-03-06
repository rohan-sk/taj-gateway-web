import { axios } from "../../../../api/axios-instance"
import { ApiHandler, ApiMethod } from "../../../../types"
import { BOOKING_CONSTANT, EMPTY_CART } from "../../constants"

export const handler: ApiHandler = {
  createRequest: (url: string, payload: any, headers: any) => {
    return {
      url,
      data: payload,
      method: ApiMethod.delete,
      headers: {
        ...headers,
      },
    }
  },

  mapResponse: (title: string, response: any) => {
    const { data, status }: { data: any; status: number; headers: any } = response || {}
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
    const apiConfig = handler.createRequest(EMPTY_CART, "", {
      CUSTOMERHASH:
        localStorage?.getItem("customerHash") || localStorage?.getItem("guestCustomerHash"),
      type: BOOKING_CONSTANT?.BOOKING_TYPE,
    })
    const response = await axios(apiConfig)
    return handler.mapResponse("empty user cart", response)
  },
}
