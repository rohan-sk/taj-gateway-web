import { ApiMethod } from "../../../../types"
import { axios } from "../../../../api/axios-instance"
import {
  EPICURE_CART_ADD_TENDER_MODE_API,
  EPICURE_CART_DELETE_TENDER_MODE_API,
  EPICURE_CREATE_ORDER_API,
} from "./constants"

export const handler: any = {
  createRequest: (url?: string, payload?: any, headers: any = {}) => {
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

  apiCall: async (payload: any) => {
    const apiConfig = handler.createRequest(EPICURE_CREATE_ORDER_API, payload, {
      customerHash: localStorage.getItem("customerHash")
        ? localStorage.getItem("customerHash")
        : localStorage.getItem("guestCustomerHash"),
    })
    const response = await axios(apiConfig)
    return handler.mapResponse("epicure create order", response)
  },
}
