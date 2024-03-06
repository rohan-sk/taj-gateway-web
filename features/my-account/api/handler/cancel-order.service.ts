import { axios } from "../../../../api/axios-instance"
import { ApiHandler, ApiMethod } from "../../../../types"
import { CANCEL_ORDER } from "../../../booking/constants"

export const handler: ApiHandler = {
  createRequest: (url, payload, headers) => {
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
      statusCode,
    }: { data: any; status: number; statusCode: any } = response || {}
    if (status === 200) {
      return {
        error: false,
        data,
      }
    } else if (statusCode?.value === 406) {
      return {
        data,
        error: true,
      }
    } else {
      return { error: true, data: response }
    }
  },

  apiCall: async (payload: any, authorizationId: any) => {
    const apiConfig = handler.createRequest(CANCEL_ORDER, payload, {
      authorization: authorizationId,
    })
    const response = await axios(apiConfig)
    return handler.mapResponse("cancel order", response)
  },
}
