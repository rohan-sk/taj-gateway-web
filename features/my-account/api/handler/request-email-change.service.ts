import { ApiHandler, ApiMethod } from "../../../../types"
import { axios } from "../../../../api/axios-instance"
import { REQUEST_EMAIL_CHANGE } from "./account.constants"

export const handler: ApiHandler = {
  createRequest: (url, payload, headers) => {
    return {
      url,
      method: ApiMethod.post,
      data: payload,
      headers: {
        ...headers,
      },
    }
  },

  mapResponse: (title: string, response: any) => {
    const { data, status }: { data: any; status: number } = response || {}
    if (status === 201) {
      return {
        error: false,
        data,
      }
    } else {
      return { error: true, data: response }
    }
  },

  apiCall: async (payload: any) => {
    const apiConfig = handler.createRequest(
      REQUEST_EMAIL_CHANGE,
      {
        email: payload,
      },
      {
        Authorization: `Bearer ${global?.window?.localStorage?.getItem(
          "accessToken"
        )}`,
      }
    )
    const response = await axios(apiConfig)
    return handler.mapResponse("request email change", response)
  },
}
