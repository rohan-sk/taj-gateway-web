import { axios } from "../../../../api/axios-instance"
import { ApiHandler, ApiMethod } from "../../../../types"
import { PRIVILEGE_PLUS_API } from "../../constants"

export const handler: ApiHandler = {
    createRequest: (url?: string, payload?: any) => {
        return {
            url,
            method: ApiMethod.post,
            data: payload,
        }
    },

    apiCall: async (data: any) => {
        const apiConfig = handler.createRequest(PRIVILEGE_PLUS_API, data)
        const response = await axios(apiConfig)
        return handler.mapResponse("Privilege Plus Enquiry", response)
    },
    mapResponse: (title: string, response: any) => {
        const { data, status }: { data: any; status: number } = response || {}
        if (status === 200) {
            return {
                error: false,
                data,
                status,
            }
        } else {
            return { error: true, data: response }
        }
    },
}