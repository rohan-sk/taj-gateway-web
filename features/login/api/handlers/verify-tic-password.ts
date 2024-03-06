import { axios } from "../../../../api/axios-instance"
import { ApiHandler, ApiMethod } from "../../../../types"
import { TicPassword } from "./api-constants"

export const handler: ApiHandler = {
  createRequest: (url?: string, payload?: any) => {
    return {
      url,
      method: ApiMethod.post,
      data: payload,
    }
  },

  apiCall: async (data: any) => {
    const apiConfig = handler.createRequest(TicPassword, data)
    const response = await axios(apiConfig)
    return handler.mapResponse("Tic-password verification", response)
  },
  mapResponse: (title: string, response: any) => {
    const {
      data,
      status,
      headers,
    }: { data: any; status: number; headers: any } = response || {}
    if (status === 201) {
      return {
        error: false,
        data,
        headers,
      }
    } else {
      return { error: true, data: response }
    }
  },
}
