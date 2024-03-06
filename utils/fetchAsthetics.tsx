import { groq } from "next-sanity"
import { useState, useEffect } from "react"
import { getClient } from "../lib-sanity"

export const useAesthetics = (ref: string) => {
  const [cardPadding, setCardPadding] = useState<any>()
  const [cardBackgroundColor, setCardBackgroundColor] = useState<string>()
  const [textColor, setTextColor] = useState<string>()
  const [extraData, setExtraData] = useState<any>()

  useEffect(() => {
    const fetchData = async () => {
      const query = groq`*[_id in ["${ref}"]]`
      getClient(true)
        .fetch(query)
        .then((data) => {
          setExtraData(data)
          setCardPadding(data?.[0]?.padding)
          setCardBackgroundColor(data?.[0]?.backgroundColor?.hex)
          setTextColor(data?.[0]?.titleColor?.hex)
        })
    }
    if (ref !== undefined) {
      fetchData()
    }
  }, [ref])

  return {
    cardPadding: cardPadding,
    cardBackgroundColor: cardBackgroundColor ? cardBackgroundColor : "",
    textColor: textColor ? textColor : "",
    extraData,
  }
}
