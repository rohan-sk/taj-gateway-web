import { axios } from "../../../../api/axios-instance"
import { ApiHandler, ApiMethod } from "../../../../types"
import { CREATE_SESSION } from "./api-constants"

export const handler: ApiHandler = {
  createRequest: (url: string, headers: any) => {
    return {
      url,
      method: ApiMethod.post,
      headers: {
        ...headers,
        "Access-Control-Allow-Credentials": true,
      },
    }
  },

  apiCall: async () => {
    const apiConfig = handler.createRequest(CREATE_SESSION, {
      Authorization: `Bearer ${global?.window?.localStorage?.getItem(
        "accessToken"
      )}`,
    })
    const response = await axios(apiConfig)
    return handler.mapResponse("create session", response)
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
