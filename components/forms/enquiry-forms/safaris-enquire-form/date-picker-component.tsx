import { FunctionComponent, useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
const CustomDatePickerComponent = dynamic(() => import("../../../hoc/CustomDatePicker/custom-date-picker.component"))
import { InputTextField } from "./safaris-enquire-form.styles"
import { Stack } from "@mui/material"
import { CalenderIconSvg } from "../../../../utils/customIcons"
import { useMobileCheck } from "../../../../utils/isMobilView"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { convertDateFormat } from "../../../../utils/getDate"
import { theme } from "../../../../lib/theme"

type DatePicketType = {
  styles: any
  minDate?: Date
  error?: boolean
  color?: string
  onChange: Function
  helperText?: string
  placeholder: string
  background?: string
  isPageScroll: boolean
  calendarWidth?: string
  date: Date //use for DateObj
  isDefaultStartDate?: boolean
  CalendarIcon?: FunctionComponent
  value?: string //use for formatted date
}

const FormDatePicker = ({
  date,
  error,
  value,
  color,
  styles,
  minDate,
  onChange,
  background,
  helperText,
  placeholder,
  CalendarIcon,
  calendarWidth,
  isPageScroll = false,
  isDefaultStartDate = false,
}: DatePicketType) => {
  //utils
  const isMobile = useMobileCheck()

  //refs
  const scrollRef = useRef<any>(null)

  //states
  const [open, setOpen] = useState<boolean>(false)
  const [activeStartDate, setActiveStartDate] = useState<Date>(minDate ?? new Date())

  //functions
  const handleView = ({ activeStartDate }: any) => {
    if (activeStartDate <= new Date()) {
      setActiveStartDate(new Date())
    } else {
      setActiveStartDate(activeStartDate)
    }
  }

  //derived variables
  const formattedMinDate = minDate ? minDate?.toISOString()?.split(":")?.[0] : ""

  //effects
  useEffect(() => {
    if (open && scrollRef?.current && isPageScroll) {
      const handleScroll = () => {
        if (scrollRef?.current && open) {
          const elementTop = scrollRef?.current?.getBoundingClientRect()?.top
          const offset = 100 // Adjust this offset as needed
          window.scrollTo({
            top: elementTop + window.scrollY - offset,
            behavior: "smooth", // You can use 'auto' or 'smooth'
          })
        }
      }
      handleScroll()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useEffect(() => {
    if (minDate) {
      setActiveStartDate(minDate)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formattedMinDate])

  return (
    <CustomDatePickerComponent
      date={date}
      isOpen={open}
      minDate={minDate ? minDate : null}
      sx={{
        width: "100%",
        height: "100%",
        "& .styledText": {
          width: "100%",
        },
        ...styles,
      }}
      onChange={(value: any) => {
        onChange(value)
      }}
      activeStartDate={activeStartDate}
      onActiveStartDateChange={handleView}
      defaultActiveStartDate={isDefaultStartDate ? minDate : null}
      onCalendarClose={() => {
        setOpen(false)
      }}
      onCalendarOpen={() => {
        setOpen(true)
      }}
      calendarIcon={() => <></>}
      renderComponent={
        <InputTextField
          ref={scrollRef}
          sx={{
            width: "100%",
            "& .MuiInputBase-root.MuiInput-root": {
              "&::before, &::after": {
                borderColor: `${color ? color : theme?.palette?.ihclPalette?.hexOne} !important`,
              },
            },
            "& input, & textarea": {
              padding: "0vw",
              background: `${background ? background : theme?.palette?.ihclPalette?.hexThree} !important`,
              WebkitBoxShadow: `0 0 0 50px ${
                background ? background : theme?.palette?.ihclPalette?.hexThree
              } inset !important`,
              WebkitTextFillColor: `${color ? color : theme?.palette?.ihclPalette?.hexOne} !important`,
              "& input, & label, & input::placeholder, & textarea, & textarea::placeholder, & .MuiInputLabel-shrink.MuiInputLabel-standard, & .MuiInputLabel-shrink":
                {
                  color: `${color ? color : theme?.palette?.ihclPalette?.hexTwentyNine} !important`,
                },
            },
          }}
          onKeyDown={(e: any) => e?.preventDefault()}
          onClick={(e: any) => setOpen(() => true)}
          error={error ? error : false}
          helperText={error && helperText}
          variant="standard"
          autoComplete="off"
          placeholder={date ? "" : placeholder || "Date"}
          value={value ? value : date ? convertDateFormat(date)?.replaceAll("-", "/") : ""}
          InputProps={{
            autoComplete: "new-password",
            endAdornment: (
              <Stack justifyContent={"end"}>
                {CalendarIcon ? (
                  <CalendarIcon />
                ) : (
                  <CalenderIconSvg
                    sx={{
                      cursor: "pointer",
                      width: isMobile ? MobilePxToVw(17) : DesktopPxToVw(17),
                      height: isMobile ? MobilePxToVw(16) : DesktopPxToVw(16),
                    }}
                  />
                )}
              </Stack>
            ),
          }}
        />
      }
      calendarWidth={calendarWidth ? calendarWidth : isMobile ? MobilePxToVw(476) : "100%"}
    />
  )
}
export default FormDatePicker
