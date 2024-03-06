import { groq } from "next-sanity";
import { getClient } from "../lib-sanity";

export const fetchDynamicSiteData = async (groqString: string) => {
    const query = groq`${groqString}`
    let data: any;
    await getClient(true)
      .fetch(query)
      .then((res) => {
        data = res
      })
      .catch((err) => {
        data = err
      })
      return data?.filter(({ url }: any, index: number) =>
      !data?.map(({ url }: any) => url)?.includes(url, index + 1)); 
  }