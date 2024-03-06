import { useContext } from "react"
import { useMobileCheck } from "../../utils/isMobilView"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { Box, Grid } from "@mui/material"
import { gridBreakPointsGenerator } from "../card/SearchResultCards/search-card.component"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"

const ReservationContacts = ({
  props,
  variant,
  isDropDown,
  parameterMap,
  isSearchEnabled,
  preRenderItemsCount,
  backgroundColor,
  textColor,
}: any) => {
  const isMobile = useMobileCheck()
  const context = useContext(IHCLContext)

  return (
    <>
      {props?.length > 0 && (
        <Grid
          container
          rowGap={isMobile ? MobilePxToVw(30) : DesktopPxToVw(50)}>
          {props?.map((item: any, index: number) => {
            return (
              <Grid {...gridBreakPointsGenerator(isMobile, 3, 12)} key={index}>
                {context?.renderComponent(item?._type, item)}
              </Grid>
            )
          })}
        </Grid>
      )}
    </>
  )
}
export default ReservationContacts
