import { Grid } from "@mui/material"
import React, { useContext } from "react"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { useMobileCheck } from "../../utils/isMobilView"
import { gridBreakPointsGenerator } from "../card/SearchResultCards/search-card.component"

function GroupWithHexagonalContentComponent({ props }: any) {
  const context = useContext(IHCLContext)
  const isMobile = useMobileCheck()
  return (
    <Grid container justifyContent={"space-between"}>
      {props?.map((item: any, index: number) => (
        <Grid
          item
          key={index}
          {...gridBreakPointsGenerator(
            isMobile,
            index === 2 || index == 3 ? 4 : 5.5,
            6
          )}
          sx={{
            position: index === 2 || index === 3 ? "relative" : "initial",
            height: index === 2 || index === 3 ? "13.021vw" : "26.042vw",
          }}>
          {context?.renderComponent(item?._type, item, index)}
        </Grid>
      ))}
    </Grid>
  )
}

export default GroupWithHexagonalContentComponent
