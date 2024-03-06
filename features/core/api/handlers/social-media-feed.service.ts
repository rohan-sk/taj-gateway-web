import { axios } from "../../../../api/axios-instance"
import { ApiHandler, ApiMethod } from "../../../../types"
import { SOCIAL_MEDIA_FEED } from "../../../booking/constants"

export const handler: ApiHandler = {
  createRequest: (url: string, payload: any, headers: any) => {
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
    if (status === 200) {
      return {
        data,
        error: false,
      }
    } else {
      return { error: true, data }
    }
  },

  apiCall: async (startDate: any, endDate: any, brandId: string) => {
    const apiConfig = handler.createRequest(
      SOCIAL_MEDIA_FEED,
      {
        brands: [
          {
            brandID: brandId,
          },
        ],
        startDateEpoch: startDate,
        endDateEpoch: endDate,
        orderBYColumn: "MentionDateCreated",
        orderBY: "desc",
        oFFSET: 0,
        noOfRows: 100,
      },
      {}
    )
    const response = await axios(apiConfig)
    return handler.mapResponse("social media posts", response)
  },
}
