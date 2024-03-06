import React from "react"
import { Stack, Typography } from "@mui/material"
import { StyledDivider } from "./edit-rooms-styles"
import { formatDateWithMON } from "../../../../utils/getDate"
import { useMobileCheck } from "../../../../utils/isMobilView"
import { currency2DecimalSymbol } from "../../../../utils/currency"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { BoldLabelTypography, DatesStack, PackageDetailsBox } from "./styles/hotel-room-details"
import data from "./booking-json.json"

const NewSelectedDateComponent = ({ startDate, endDate, newRoom, roomPrice }: any) => {
  const isMobile = useMobileCheck()

  return (
    <>
      <Stack
        aria-label="NewSelectedDateComponent"
        my={isMobile ? MobilePxToVw(20) : DesktopPxToVw(20)}>
        <BoldLabelTypography variant={isMobile ? "m-body-s" : "body-s"}>
          {data?.newSelectedDates}
        </BoldLabelTypography>
        <DatesStack>
          {startDate && (
            <Typography variant={isMobile ? "m-body-m" : "body-m"} sx={{ fontWeight: 700 }}>
              {formatDateWithMON(startDate)}
            </Typography>
          )}
          {endDate && (
            <>
              <StyledDivider />
              <Typography variant={isMobile ? "m-body-m" : "body-m"} sx={{ fontWeight: 700 }}>
                {formatDateWithMON(endDate)}
              </Typography>
            </>
          )}
        </DatesStack>
        <BoldLabelTypography
          variant={isMobile ? "m-body-s" : "body-s"}
          mt={isMobile ? MobilePxToVw(20) : DesktopPxToVw(10)}>
          {data?.package}
        </BoldLabelTypography>
        <PackageDetailsBox>
          <Typography
            variant={isMobile ? "m-body-m" : "body-m"}
            width={isMobile ? MobilePxToVw(310) : "100%"}>
            {newRoom?.packageName}
          </Typography>
          <Typography
            variant={isMobile ? "m-body-l" : "body-l"}
            sx={{ fontWeight: 700, whiteSpace: "nowrap" }}>
            {currency2DecimalSymbol(roomPrice, newRoom?.currency)}
          </Typography>
        </PackageDetailsBox>
      </Stack>
    </>
  )
}

export default NewSelectedDateComponent
