import { HOTEL_AVAILABILITY } from "../../constants"
import { axios } from "../../../../api/axios-instance"
import { ApiHandler, ApiMethod } from "../../../../types"

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
    const { data, status }: { data: any; status: number } = response || {}
    if (status === 200 && data?.errorCode === "200") {
      return {
        data,
        error: false,
      }
    } else {
      return { error: true, data }
    }
  },

  apiCall: async (payload: any) => {
    const apiConfig = handler.createRequest(HOTEL_AVAILABILITY, payload)
    const response = await axios(apiConfig)
    return handler.mapResponse("checkAvailability", response)
  },
}
