import { axios } from "../../../../api/axios-instance"
import { FETCH_ORDER } from "../../constants"
import { ApiHandler, ApiMethod } from "../../../../types"

export const handler: ApiHandler = {
  createRequest: (url, payload, headers) => {
    return {
      url,
      method: ApiMethod.get,
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
      FETCH_ORDER,
      {},
      {
        OrderId: orderID,
        JWTTOKEN: global?.window?.localStorage.getItem("accessToken"),
      }
    )
    const response = await axios(apiConfig)
    return handler.mapResponse("fetch order details", response)
  },
}
