import { Box } from "@mui/material"
import React, { useContext, useState } from "react"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { CONSTANTS } from "../constants"
import {
  DividerForBelowBorder,
  VisibleDataForFacilitiesTypography,
} from "./styles/group-with-facilities-styles"

function PortableTextForFacilities({ index, props, content }: any) {
  //commenting till the brian call
  const [pointsToShow, setPointsToShow] = useState(4)
  const Context = useContext(IHCLContext)
  const PortableText = Context!.PortableText
  return (
    <Box
      key={index}
      sx={{
        margin: "0",
        paddingBottom: props?.length - (index + 1) < 4 ? "0.72vw" : "0",
      }}
    >
      {content?.blockContent
        ?.slice?.(0, pointsToShow)
        ?.map((item: any, idx: number) => (
          <PortableText blocks={item} key={idx} />
        ))}
      {content?.blockContent?.length > pointsToShow && (
        <VisibleDataForFacilitiesTypography
          variant="body-ml"
          onClick={() => setPointsToShow(content?.blockContent?.length)}
        >{`... ${CONSTANTS?.MORE_TO_EXPAND_TEXT}`}</VisibleDataForFacilitiesTypography>
      )}
      <DividerForBelowBorder />
    </Box>
  )
}

export default PortableTextForFacilities
