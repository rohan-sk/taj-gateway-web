import React, { useContext } from "react"
import { Stack } from "@mui/material"
import { VideoProps } from "../types"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
interface GroupWithLargeMediaItems {
  _key: string
  _type: string
  urlType: string
  mediaType: string
  videoAsset: VideoProps
  isMultiBlockContent: boolean
}
interface GroupWithLargeMediaProps {
  props: GroupWithLargeMediaItems[]
}
const GroupWithLargeMedia = ({ props }: GroupWithLargeMediaProps) => {
  const context = useContext(IHCLContext)
  return (
    <>
      {props?.map((item: GroupWithLargeMediaItems, index: number) => {
        return (
          <Stack key={index}>
            {context!.renderComponent(item._type, item, index)}
          </Stack>
        )
      })}
    </>
  )
}

export default GroupWithLargeMedia
