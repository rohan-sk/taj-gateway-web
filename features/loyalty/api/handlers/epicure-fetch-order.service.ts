import { axios } from "../../../../api/axios-instance"
import { ApiHandler, ApiMethod } from "../../../../types"
import { EPICURE_FETCH_ORDER_API } from "./constants"

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
      EPICURE_FETCH_ORDER_API,
      {},
      {
        OrderId: orderID,
        JWTTOKEN: global?.window?.localStorage.getItem("accessToken"),
      },
    )
    const response = await axios(apiConfig)
    return handler.mapResponse("epicure fetch order", response)
  },
}
