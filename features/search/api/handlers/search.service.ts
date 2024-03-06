import { ApiMethod } from "../../../../types"

import { axios } from "../../../../api/axios-instance"

const API_GATEWAY = process?.env.NEXT_PUBLIC_SEARCH_BASE_API

export const handler: any = {
  createRequest: (url: string, payload: any, headers: any = {}) => {
    return {
      url,
      method: ApiMethod.get,
      data: payload,
      params: payload.params,
      headers: {
        ...headers,
      },
    }
  },

  createPost: (url: string, payload: any, headers: any = {}) => {
    return {
      url,
      method: ApiMethod.post,
      data: payload,
      headers: {
        ...headers,
      },
    }
  },

  autoCompleteSearch: async (
    searchTerm: string,
    distance?: string,
    lat?: string,
    long?: string
  ) => {
    const apiConfig = handler.createRequest(
      `${API_GATEWAY}suggestions-test`,
      {
        params: {
          q: searchTerm,
          limit: 10,
          latitude: lat,
          longitude: long,
          distance: distance,
        },
      },
      {}
    )
    const response = await axios(apiConfig)
    return response.data
  },

  searchClickRequest: async (item: any, version: any) => {
    const apiConfig = handler.createPost(
      `${API_GATEWAY}/api/v1/search/click`,
      item,
      { "accept-version": version || 2 }
    )
    const response = await axios(apiConfig)
    return response.data
  },

  spatialSearch: async (lat: string, long: string) => {
    const apiConfig = handler.createRequest(
      `${API_GATEWAY}spatial`,
      {
        params: { distance: "100", limit: 10, page: "1", lat: lat, long: long },
      },
      {}
    )
    const response = await axios(apiConfig)
    return response.data
  },
}
