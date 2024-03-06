import { axios } from "../../../../api/axios-instance"
import { ApiHandler, ApiMethod } from "../../../../types"
import { BOOKING_CONSTANT, DELETE_TENDER_MODE } from "../../constants"

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
    const { data, status, statusCode }: { data: any; status: number; statusCode: any } =
      response || {}
    if (statusCode?.value === 409) {
      return {
        error: true,
        data,
      }
    } else if (statusCode?.value === 500) {
      return {
        error: true,
        data,
      }
    } else if (statusCode?.value === 417) {
      return {
        error: true,
        data,
      }
    } else if (status === 200) {
      return {
        error: false,
        data,
      }
    } else {
      return { error: true, data: response }
    }
  },

  apiCall: async (payload: any) => {
    const apiConfig = handler.createRequest(DELETE_TENDER_MODE, payload, {
      CUSTOMERHASH:
        localStorage?.getItem("customerHash") || localStorage?.getItem("guestCustomerHash"),
      type: BOOKING_CONSTANT?.BOOKING_TYPE,
    })
    const response = await axios(apiConfig)
    return handler.mapResponse("Delete Tender Mode", response)
  },
}
