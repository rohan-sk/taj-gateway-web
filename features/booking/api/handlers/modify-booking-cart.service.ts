import { MODIFY_BOOKING_CART } from "../../constants"
import { axios } from "../../../../api/axios-instance"
import { ApiHandler, ApiMethod } from "../../../../types"

export const handler: ApiHandler = {
  createRequest: (url: string, payload: any, headers: any) => {
    return {
      url,
      data: payload,
      method: ApiMethod.post,
      headers: {
        ...headers,
      },
    }
  },

  mapResponse: (title: string, response: any) => {
    const {
      data,
      status,
      headers,
    }: { data: any; status: number; headers: any } = response || {}
    if (status === 200) {
      headers?.guestuser &&
        global?.window?.localStorage?.setItem(
          "guestCustomerHash",
          headers?.guestuser
        )
      return {
        data,
        error: false,
      }
    } else {
      return { error: true, data: response }
    }
  },

  apiCall: async (payload: any) => {
    const apiConfig = handler.createRequest(MODIFY_BOOKING_CART, payload, {
      CUSTOMERHASH: localStorage?.getItem("customerHash")
        ? localStorage?.getItem("customerHash")
        : localStorage?.getItem("guestCustomerHash"),
    })
    const response = await axios(apiConfig)
    return handler.mapResponse("Modify booking Cart ", response)
  },
}
