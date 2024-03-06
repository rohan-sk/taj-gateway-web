import React, { useContext } from "react"
import { Box } from "@mui/material"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"

export const GalleryCarousel = ({ data }: any) => {
  const context = useContext(IHCLContext)
  return (
    <>
      {data?.items?.map((item: any, index: number) => {
        return (
          <Box key={index}>
            {context!.renderComponent(item._type, item, index)}
          </Box>
        )
      })}
    </>
  )
}
