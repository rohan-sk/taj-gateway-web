import React from "react"
import { observer } from "mobx-react-lite"
import { Box, Typography } from "@mui/material"
import { formatCurrency } from "../../../utils/currency"
import { useMobileCheck } from "../../../utils/isMobilView"
import { dateFormatConverter } from "../../../utils/getDate"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"

function CustomDateTile({ leads, date, lengthOfStay = 1, isComplementary = false }: any) {
  const isMobile = useMobileCheck()
  const comparator = lengthOfStay > 1 ? "minimumavg" : "minimum"
  const getHotelInfo = (date: Date) => {
    const filteredDate = leads && leads?.filter((item: any) => item?.arrivalDate == dateFormatConverter(date))?.[0]
    if (filteredDate && filteredDate?.available) {
      const minPrice = filteredDate?.price?.filter((item: any) => item?.type?.toLowerCase() === comparator)?.[0]
      return formatCurrency(isComplementary ? minPrice?.tax?.amount : minPrice?.amount, minPrice?.currencyCode)
    } else if (!filteredDate?.available) {
      return <span>&#10006;</span>
    } else {
      return null
    }
  }

  const tileData = getHotelInfo(date)

  return tileData ? (
    <Box mb={isMobile ? MobilePxToVw(16) : DesktopPxToVw(16)} position={"relative"}>
      <Typography
        sx={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        fontSize={isMobile ? MobilePxToVw(14) : DesktopPxToVw(11)}>
        {tileData}
      </Typography>
    </Box>
  ) : null
}
export default observer(CustomDateTile)
