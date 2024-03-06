import { fonts, theme } from "../../lib/theme"
import { CONSTANTS, ICONS } from "../constants"
import dynamic from "next/dynamic"
import { Box, Typography } from "@mui/material"
import { GLOBAL_STORES } from "../../utils/Constants"
import { useMobileCheck } from "../../utils/isMobilView"
import { useAesthetics } from "../../utils/fetchAsthetics"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { ActionProps, aestheticItems, parameterMapItems } from "../types"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import BookingFlowGlobalStore from "../../features/booking/store/globalStore/booking.flow.store"
import {
  HorizontalDivider,
  CouponCodeTextField,
  BookAStayCardTitleBox,
  BookAStayCardTitleDivider,
  BookAStayCardComponentBox,
  CheckInAndOutLabelTextField,
  BookAStayCardParameterMapBox,
  LocalizationProviderBox,
} from "./styles/book-a-stay-card-component-styles"
import { useContext, useRef, useState } from "react"
import { useAppNavigation } from "../../utils/NavigationUtility"
const CustomDropDown = dynamic(() =>
import("../hoc/CustomDropDown").then((module) => module.CustomDropDown)
)
const CustomSearch = dynamic(() =>
import("../hoc/Search/CustomSearch").then((module) => module.CustomSearch)
)
const RenderActionItem = dynamic(() =>
import("../hoc/actions/action-items-ui")
)

interface BookAStayCardComponentProps {
  url: string
  title: string
  _type: string
  urlType: string
  ctaLabel: string
  largeVariant: string
  alignmentVariant: string
  aesthetic: aestheticItems
  primaryAction: ActionProps
  isMultiBlockContent: boolean
  parameterMap: parameterMapItems[]
}
function BookAStayCardComponent({
  title,
  aesthetic,
  parameterMap,
  primaryAction,
  alignmentVariant,
  ...props
}: BookAStayCardComponentProps) {
  const { cardPadding } = useAesthetics(aesthetic?._ref)
  const [value, setValue] = useState<string>("")
  const [secondValue, setSecondValue] = useState<string>("")
  const [isRoom, setIsRoom] = useState<string>("")
  const [isCode, setIsCode] = useState<string>("")
  let data1 = ["2 Adults, 0 Child - 1 Room", "2 Adults, 2 Child - 1 Room"]
  const checkIn = useRef()
  const checkOut = useRef()
  const navigate = useAppNavigation()

  const context: any = useContext(IHCLContext)
  const isMobile = useMobileCheck()
  const withHyphens = alignmentVariant === "preceding-hyphen-title"

  const bookingFlowGlobalStore = context?.getGlobalStore(GLOBAL_STORES?.bookingFlowStore) as BookingFlowGlobalStore

  const CalenderIcon = () => {
    return (
      <Box
        component={"img"}
        src={ICONS?.CALENDER_ICON}
        alt={`CalendarIcon`}
        width={"100%"}
        height={"100%"}
      />
    )
  }

  const {
    cartDetails,
    guestDetails,
    guestBookingSchedule,
    updateGuestDetails,
    setRoomsAvailability,
    setGuestBookingSchedule,
    setCheckAvailabilityPayload,
  } = bookingFlowGlobalStore

  const [date, setDate] = useState<any>([
    guestBookingSchedule?.userCheckInDate ? guestBookingSchedule?.userCheckInDate : null,
    guestBookingSchedule?.userCheckOutDate ? guestBookingSchedule?.userCheckOutDate : null,
  ])

  return (
    <Box
      sx={{
        padding: `${isMobile ? cardPadding?.mobile : cardPadding?.desktop}`,
      }}>
      <BookAStayCardComponentBox $mobile={isMobile}>
        {title && (
          <BookAStayCardTitleBox $mobile={isMobile}>
            {withHyphens && !isMobile && <BookAStayCardTitleDivider />}
            <Typography variant={isMobile ? "m-heading-s" : "heading-s"} component={"h2"}>
              {title}
            </Typography>
            {withHyphens && !isMobile && <BookAStayCardTitleDivider />}
          </BookAStayCardTitleBox>
        )}
        {parameterMap && (
          <BookAStayCardParameterMapBox $mobile={isMobile}>
            {parameterMap?.map((item: parameterMapItems, index: number) => (
              <Box key={index}>
                {item?.key === "searchField" && (
                  <CustomSearch
                    value={value}
                    setValue={setValue}
                    maxWidth={isMobile ? "74.219vw" : "17.188vw"}
                    placeholder={item?.value}
                    fontSizeProp={isMobile ? "3.750vw" : "1.250vw"}
                    styles={{
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: 300,
                      fontSize: "1.25vw",
                      lineHeight: "150%",
                      color: theme?.palette?.neuPalette?.hexSeventeen,
                      marginBottom: isMobile ? "4.594vw" : "",
                    }}
                  />
                )}
                {item?.key === "checkInAndOutLabel" && (
                  <Box
                    sx={{
                      borderBottom: `1px solid ${theme?.palette?.neuPalette?.hexTwelve}`,
                      marginBottom: isMobile ? "4.594vw" : "",
                    }}>
                    <LocalizationProviderBox
                      sx={{
                        width: isMobile ? "74.219vw" : "24.063vw",
                        padding: "0!important",
                        alignItems: "baseline !important",
                      }}>
                      <Box
                        component={"img"}
                        src={ICONS?.CALENDER_ICON}
                        alt={"calender"}
                        width={isMobile ? "2.656vw" : "0.938vw"}
                      />
                    </LocalizationProviderBox>
                  </Box>
                )}
                {item?.key === "dropDown" && (
                  <CustomDropDown
                    label="City"
                    placeHolder={item?.value}
                    data={data1}
                    value={isRoom}
                    setValue={setIsRoom}
                    margin={{ margin: isMobile ? "0vw" : "-0.521vw 0vw 0vw" }}
                    minWidth={
                      isMobile ? "74.219vw" : item?.value === CONSTANTS?.SELECT_PACKAGE ? "12.500vw" : "18.958vw"
                    }
                    fontSize={"1.250vw"}
                  />
                )}
                {item?.key === "text" && (
                  <CouponCodeTextField
                    variant="standard"
                    placeholder={item?.value}
                    InputProps={{
                      style: {
                        width: isMobile ? "74.219vw" : "24.01vw",
                        fontFamily: "Inter",
                        fontStyle: "normal",
                        fontWeight: 300,
                        fontSize: isMobile ? "3.750vw" : "1.25vw",
                        lineHeight: "150%",
                        color: theme?.palette?.neuPalette?.hexSeventeen,
                        borderBottom: `0.05vw solid ${theme?.palette?.neuPalette?.hexOne}`,
                        marginBottom: isMobile ? "6.563vw" : "",
                      },
                    }}
                    $isMobile={isMobile}
                  />
                )}
              </Box>
            ))}
          </BookAStayCardParameterMapBox>
        )}
        {primaryAction && (
          <Box
            sx={{
              paddingTop: isMobile ? "2.344vw" : "3.125vw",
            }}>
            <RenderActionItem
              url={primaryAction?.url}
              isActionButtonType={true}
              title={primaryAction?.title}
              variant={primaryAction?.variant}
              navigationType={primaryAction?.urlType}
              buttonStyles={{
                letterSpacing: "0.1em",
              }}
            />
          </Box>
        )}
      </BookAStayCardComponentBox>
    </Box>
  )
}

export default BookAStayCardComponent
