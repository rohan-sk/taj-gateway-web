import { axios } from "../../../../api/axios-instance"
import { ApiHandler, ApiMethod } from "../../../../types"
import { GENERATE_AUTH_CODE } from "./api-constants"

export const handler: ApiHandler = {
  createRequest: (url: string, payload: any, headers: any) => {
    return {
      url,
      method: ApiMethod.post,
      headers: {
        ...headers,
      },
      data: payload,
    }
  },

  apiCall: async (codeChallenge: string) => {
    const apiConfig = handler.createRequest(
      GENERATE_AUTH_CODE,
      {
        codeChallenge: codeChallenge,
      },
      {
        Authorization: `Bearer ${global?.window?.localStorage?.getItem(
          "accessToken"
        )}`,
      }
    )
    const response = await axios(apiConfig)
    return handler.mapResponse("generate auth code", response)
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
