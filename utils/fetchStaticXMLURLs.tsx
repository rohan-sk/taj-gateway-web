import { groq } from "next-sanity"
import { getClient } from "../lib-sanity"

export const fetchStaticXMLURLs = async () => {
    let data: any
    const query = groq`*[_type == "staticSiteMap"]{
        ...,
        }[0]
     `
    await getClient(true)
      .fetch(query)
      .then((res) => {
        data = res
      })
      .catch((err) => {
        data = err
      })
    return data
  }