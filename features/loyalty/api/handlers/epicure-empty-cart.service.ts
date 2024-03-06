import { ApiMethod } from "../../../../types"
import { axios } from "../../../../api/axios-instance"
import { EPICURE_EMPTY_CART_API } from "./constants"

export const handler: any = {
  createRequest: (url?: string, headers: any = {}) => {
    return {
      url,
      method: ApiMethod.delete,
      headers: {
        ...headers,
      },
    }
  },
  apiCall: async () => {
    const apiConfig = handler.createRequest(EPICURE_EMPTY_CART_API, {
      customerHash: localStorage.getItem("customerHash")
            ? localStorage.getItem("customerHash")
            : localStorage.getItem("guestCustomerHash"),
      type: "MemberShip_Purchase",
    })
    const response = await axios(apiConfig)
    return handler.mapResponse("epicure empty cart", response)
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
