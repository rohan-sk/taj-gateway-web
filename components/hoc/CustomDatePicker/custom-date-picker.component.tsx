import { Box } from "@mui/material"
import React from "react"
import { CustomCalendarWrapper, StyledText } from "./custom-date-picker-styles"
import { useMobileCheck } from "../../../utils/isMobilView"

import { observer } from "mobx-react-lite"

const IHCLDatePicker = dynamic(() => import("./IHCL-date-picker"), { ssr: false })

import dynamic from "next/dynamic"

function CustomDatePicker({
  date,
  onChange,
  placeholder,
  calendarWidth,
  renderComponent = false,
  calendarIcon,
  isCalendarLoading = false,
  zIndex,
  sx,
  onCalendarClose,
  onCalendarOpen,
  openCalendarOnFocus = true,
  ...rest
}: any) {
  const isMobile = useMobileCheck()

  return (
    <Box position={"relative"} width={"100%"} sx={sx}>
      <StyledText className="styledText" $zIndex={Boolean(calendarIcon) && zIndex}>
        {renderComponent}
      </StyledText>
      <CustomCalendarWrapper
        $isDouble={rest?.showDoubleView}
        $mobile={isMobile}
        $width={calendarWidth}
        $isDateExists={date}
        $renderComponent={renderComponent}
        $isCalendarLoading={isCalendarLoading}>
        <IHCLDatePicker
          rest={rest}
          calendarIcon={calendarIcon}
          date={date}
          onCalendarClose={onCalendarClose}
          onCalendarOpen={onCalendarOpen}
          openCalendarOnFocus={openCalendarOnFocus}
          onChange={onChange}
          placeholder={placeholder}
        />
      </CustomCalendarWrapper>
    </Box>
  )
}
export default observer(CustomDatePicker)
