import React, { useEffect } from "react"
import { Box } from "@mui/system"
import dynamic from "next/dynamic"
import { theme } from "../../lib/theme"
import { useMobileCheck } from "../../utils/isMobilView"
import { useAppNavigation } from "../../utils/NavigationUtility"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { insertBookingReservationDetails, insertHotelContact } from "../forms/book-a-stay-form/utils"
const PortableText = dynamic(() => import("../../lib/portable-text-serializers").then((module) => module.PortableText))

const HotelContactData = ({
  singleContent,
  propertyStore,
  modalData,
  isHotelRoute,
  identifier = "",
  groupContent,
  reservationNumber,
}: any) => {
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()

  useEffect(() => {
    setTimeout(() => {
      if (identifier) {
        insertBookingReservationDetails(reservationNumber, navigate, isMobile)
      } else if (propertyStore || modalData) {
        insertHotelContact(
          {
            ...propertyStore,
            alternateEmail: modalData?.email?.[0] || "",
            alternatePhone: modalData?.phone?.[0] || "",
          },
          isMobile,
          navigate,
          isHotelRoute,
        )
      }
    }, 100)
  }, [propertyStore, modalData, isMobile, navigate, isHotelRoute, reservationNumber, groupContent, identifier])

  return (
    <Box
      sx={{
        "& *": {
          fontFamily: "Inter",
          fontSize: `${DesktopPxToVw(22)} !important`,
          color: theme?.palette?.neuPalette?.hexSeventeen,
          "@media (max-width:640px)": {
            fontSize: `${MobilePxToVw(22)} !important`,
          },
        },
        "& .enquire-form-text": {
          textAlign: "center",
          fontWeight: 300,
          color: theme?.palette?.neuPalette?.hexSeventeen,
          lineHeight: "140%",
        },
        "& a": {
          color: `${theme?.palette?.neuPalette?.hexTwo} !important`,
        },
        "& .enquiry-form-phone, & .enquiry-form-wellness-phone, & .enquiry-form-venue-phone, & .enquiry-form-hamper-phone":
          {
            cursor: "default !important",
            pointerEvents: "none",
            color: `${theme?.palette?.neuPalette?.hexSeventeen} !important`,
            "@media(max-width:640px)": {
              display: "inline-flex",
              pointerEvents: "initial",

              color: `${theme?.palette?.neuPalette?.hexTwo} !important`,
              cursor: "pointer !important",
            },
          },
      }}>
      {(groupContent || singleContent)?.map((item: any, idx: number) => (
        <PortableText blocks={item} key={idx} />
      ))}
    </Box>
  )
}

const MemoizedHotelContactData = React.memo(HotelContactData)
export default MemoizedHotelContactData
