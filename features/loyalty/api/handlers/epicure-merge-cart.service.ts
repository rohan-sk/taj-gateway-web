import { axios } from "../../../../api/axios-instance"
import { ApiHandler, ApiMethod } from "../../../../types"
import { EPICURE_MERGE_CART_API } from "./constants"

export const handler: ApiHandler = {
  createRequest: (url, payload, headers) => {
    return {
      url,
      method: ApiMethod.put,
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
        data: response,
      }
    } else {
      return { error: true, data: response }
    }
  },
  apiCall: async () => {
    const apiConfig = handler.createRequest(
      EPICURE_MERGE_CART_API,
      {},
      {
        CustomerHash: localStorage.getItem("customerHash"),
        GuestUser: localStorage.getItem("guestCustomerHash"),
        TYPE: "MemberShip_Purchase",
      },
    )
    const response = await axios(apiConfig)
    return handler.mapResponse("epicure merge cart", response)
  },
}
