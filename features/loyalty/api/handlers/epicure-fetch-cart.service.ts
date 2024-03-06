import { ApiMethod } from "../../../../types"
import { axios } from "../../../../api/axios-instance"
import { EPICURE_FETCH_CART_API } from "./constants"

export const handler: any = {
  createRequest: (url?: string, headers: any = {}) => {
    return {
      url,
      method: ApiMethod.get,
      headers: {
        ...headers,
      },
    }
  },
  apiCall: async () => {
    const apiConfig = handler.createRequest(EPICURE_FETCH_CART_API, {
      customerHash: localStorage.getItem("customerHash")
        ? localStorage.getItem("customerHash")
        : localStorage.getItem("guestCustomerHash"),
      type: "MemberShip_Purchase",
    })
    const response = await axios(apiConfig)
    return handler.mapResponse("epicure fetch cart", response)
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
