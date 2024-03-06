import { REMOVE_FROM_CART } from "../../constants"
import { axios } from "../../../../api/axios-instance"
import { ApiHandler, ApiMethod } from "../../../../types"

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

  apiCall: async (payload: any) => {
    const apiConfig = handler.createRequest(REMOVE_FROM_CART, payload, {
      CUSTOMERHASH: localStorage?.getItem("customerHash")
        ? localStorage?.getItem("customerHash")
        : localStorage?.getItem("guestCustomerHash"),
    })
    const response = await axios(apiConfig)
    return handler.mapResponse("Remove From Cart ", response)
  },
}
