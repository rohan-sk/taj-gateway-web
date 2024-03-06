import { ApiHandler, ApiMethod } from "../../../../types"
import { axios } from "../../../../api/axios-instance"
import { GET_CALENDER_VIEW_DATA } from "../../constants"

export const handler: ApiHandler = {
  createRequest: (url, payload, headers) => {
    return {
      url,
      method: ApiMethod.post,
      data: payload,
      params: payload.params,
      headers: {
        ...headers,
      },
    }
  },

  mapResponse: (title: string, response: any) => {
    const { data, status }: { data: any; status: number } = response || {}
    if (
      status === 200 &&
      data?.data?.getHotelLeadAvailability?.errorCode === "200"
    ) {
      return {
        error: false,
        data,
      }
    } else {
      return { error: true, data: response }
    }
  },

  apiCall: async (payload: any) => {
    const apiConfig = handler.createRequest(GET_CALENDER_VIEW_DATA, payload, {
      // customerHash: window?.localStorage.getItem("customerHash"),
    })
    const response = await axios(apiConfig)
    return handler.mapResponse("Calendar view data", response)
  },
}
