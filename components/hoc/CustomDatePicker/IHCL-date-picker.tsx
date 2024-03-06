import React from "react"
import DatePicker from "react-date-picker"
import { theme } from "../../../lib/theme"
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded"
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded"

const IHCLDatePicker = ({
  rest,
  calendarIcon,
  date,
  onCalendarClose,
  onCalendarOpen,
  openCalendarOnFocus,
  onChange,
  placeholder,
}: any) => {
  function formatDay(date: Date): string {
    const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"]
    const dayIndex = date.getDay()
    return daysOfWeek[dayIndex]
  }
  return (
    <DatePicker
      {...rest}
      onFocus={(e: any) => (e.target.readOnly = true)}
      calendarIcon={calendarIcon}
      value={date}
      onCalendarClose={onCalendarClose ? onCalendarClose : () => {}}
      onCalendarOpen={onCalendarOpen ? onCalendarOpen : () => {}}
      openCalendarOnFocus={openCalendarOnFocus}
      onChange={onChange}
      formatShortWeekday={(locale: any, date: any) => formatDay(date)}
      dayPlaceholder={placeholder}
      monthPlaceholder={""}
      yearPlaceholder={""}
      showNeighboringMonth={false}
      showFixedNumberOfWeeks={false}
      next2Label={null}
      prev2Label={null}
      clearIcon={null}
      calendarType={"gregory"}
      onKeyDown={(e: any) => e.preventDefault()}
      prevLabel={<ArrowBackIosRoundedIcon fontSize={"small"} htmlColor={theme.palette.neuPalette.hexSeventeen} />}
      nextLabel={<ArrowForwardIosRoundedIcon fontSize={"small"} htmlColor={theme.palette.neuPalette.hexSeventeen} />}
      inlineFocusSelectedMonth={true}
    />
  )
}

export default IHCLDatePicker
