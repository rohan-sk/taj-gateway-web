import { Box } from "@mui/material"
import React, { useState } from "react"
import { GoldMoreIcon } from "../../utils/customIcons"
import { PortableText } from "../../lib/portable-text-serializers"
import { observer } from "mobx-react-lite"
import { childrenInterface, singleContentInterface } from "../types"

interface ReadMoreInterface {
  children: any
  length?: number
  sx?: any
  onClick?: Function
  color?: string
  variant?: string | undefined | null
  arrowStyles?: any
}
interface OuterMap {
  items: singleContentInterface[]
  count: number
}
interface InnerMap {
  children: childrenInterface[]
  count: number
}
const outerMap: OuterMap = {
  items: [],
  count: 0,
}
const innerMap: InnerMap = {
  count: 0,
  children: [],
}
const PortableTextReadMore = ({
  children,
  length = 0,
  sx = {},
  onClick,
  variant,
  arrowStyles = {},
  color,
}: ReadMoreInterface) => {
  const isModalViewAction = typeof onClick === "function"
  const [isReadMore, setIsReadMore] = useState<boolean>(true)
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore)
  }
  const mappedChildren: OuterMap = children?.reduce((outerAcc: OuterMap, outerItem: singleContentInterface) => {
    if (outerAcc?.count < length) {
      const mappedData = outerItem?.children?.reduce((acc: InnerMap, item: childrenInterface) => {
        if (acc?.count < length) {
          const text = item?.text
          const textLength = item?.text?.length || 0
          if (text) {
            if (acc?.count + textLength < length) {
              return {
                ...acc,
                children: [...acc?.children, item],
                count: acc?.count + textLength,
              }
            } else {
              return {
                ...acc,
                children: [...acc?.children, { ...item, text: text?.substring(0, length - acc?.count) }],
                count: length,
              }
            }
          } else {
            return acc
          }
        } else {
          return acc
        }
      }, innerMap)
      return {
        items: [...outerAcc?.items, { ...outerItem, children: mappedData?.children }],
        count: outerAcc?.count + mappedData?.count,
      }
    } else {
      return outerAcc
    }
  }, outerMap)

  let finalData = ((isModalViewAction && length) || (isReadMore && length) ? mappedChildren?.items : children)?.map(
    (item: any) => ({
      ...item,
      variant,
      color,
    }),
  )

  return (
    <>
      {children && (
        <Box sx={{ ...sx }}>
          {finalData?.map((item: any, idx: number) => (
            <PortableText key={idx} blocks={item} />
          ))}
          {length > 0 && mappedChildren?.count >= length && (
            <>
              {isReadMore && <span>{`...`}</span>}
              <span
                onClick={() => {
                  onClick ? onClick() : toggleReadMore()
                }}
                contentEditable="false"
                suppressContentEditableWarning={true}>
                <GoldMoreIcon
                  sx={{
                    transform: `rotate(${isReadMore ? "0" : "180"}deg) !important`,
                    display: "inherit !important",
                    cursor: "pointer",
                    ...arrowStyles,
                  }}
                />
              </span>
            </>
          )}
        </Box>
      )}
    </>
  )
}

export default observer(PortableTextReadMore)
