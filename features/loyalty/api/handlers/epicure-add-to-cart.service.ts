import { ApiMethod } from "../../../../types"
import { axios } from "../../../../api/axios-instance"
import { EPICURE_ADD_TO_CART_API } from "./constants"

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
  apiCall: async (payload: any) => {
    const apiConfig = handler.createRequest(EPICURE_ADD_TO_CART_API, payload, {
      customerHash: localStorage.getItem("customerHash")
        ? localStorage.getItem("customerHash")
        : localStorage.getItem("guestCustomerHash"),
    })
    const response = await axios(apiConfig)
    return handler.mapResponse("epicure add to cart", response)
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
}
