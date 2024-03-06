import { axios } from "../../../../api/axios-instance"
import { ApiHandler, ApiMethod } from "../../../../types"
import { ADD_TENDER_MODES, BOOKING_CONSTANT } from "../../constants"

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
    const { data, status, statusCode }: { data: any; status: number; statusCode: any } =
      response || {}
    if (statusCode?.value === 409) {
      return {
        data,
        error: true,
      }
    } else if (statusCode?.value === 500) {
      return {
        data,
        error: true,
      }
    } else if (statusCode?.value === 417) {
      return {
        data,
        error: true,
      }
    } else if (status === 200) {
      return {
        data,
        error: false,
      }
    } else {
      return { error: true, data: data }
    }
  },

  apiCall: async (payload: any) => {
    const apiConfig = handler.createRequest(ADD_TENDER_MODES, payload, {
      CUSTOMERHASH:
        localStorage?.getItem("customerHash") || localStorage?.getItem("guestCustomerHash"),
      type: BOOKING_CONSTANT?.BOOKING_TYPE,
    })
    const response = await axios(apiConfig)
    return handler.mapResponse("Add Tender Modes", response)
  },
}
