import { ApiMethod } from "../../../../types"
import { axios } from "../../../../api/axios-instance"
import { GET_COUNTRY_STATE_CITY } from "./account.constants"

export const handler: any = {
  createRequest: (url: string, payload: any) => {
    return {
      url,
      method: ApiMethod.get,
      params: payload?.params,
    }
  },

  mapResponse: (title: string, response: any) => {
    const { data, status }: { data: any; status: number } = response || {}
    if (status === 200 || status === 201) {
      return {
        error: false,
        data,
      }
    } else {
      return { error: true, data: response }
    }
  },

  getCountry: async () => {
    const apiConfig = handler.createRequest(GET_COUNTRY_STATE_CITY)
    const response = await axios(apiConfig)
    return handler.mapResponse("data", response)
  },

  getStates: async (country: string) => {
    const apiConfig = handler.createRequest(`${GET_COUNTRY_STATE_CITY}`, {
      params: { country },
    })
    const response = await axios(apiConfig)
    return handler.mapResponse("data", response)
  },

  getCities: async (state: string) => {
    const apiConfig = handler.createRequest(`${GET_COUNTRY_STATE_CITY}`, {
      params: { state },
    })
    const response = await axios(apiConfig)
    return handler.mapResponse("data", response)
  },
}
