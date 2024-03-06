import React, { useEffect, useState } from "react"
import { useMobileCheck } from "../../utils/isMobilView"
import dynamic from "next/dynamic"
import fetchDateRangeLimit from "../../utils/fetchDateRangeLimit"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import {
  StackStyle,
  DateBoxRange,
  StackChild,
  TypographyChild,
  TypographyChildTitle,
} from "../header/styles/booking-menu"
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))
const BookingSEBDateCardComponent = ({ handleClose }: any) => {
  const isMobile = useMobileCheck()
  const [limitExceedModalData, setLimitExceedModalData] = useState<any>({})

  useEffect(() => {
    async function fetchDateRangeFunction() {
      let responseRange = await fetchDateRangeLimit()
      let responseData = responseRange?.checkAvailability?.[0]
      if (responseData) {
        setLimitExceedModalData(responseData)
      }
    }
    fetchDateRangeFunction()
  }, [])

  return (
    <>
      <StackStyle $isMobile={isMobile}>
        <StackChild $isMobile={isMobile}>
          <TypographyChildTitle $isMobile={isMobile} variant={isMobile ? "m-heading-s" : "heading-s"}>
            {"Your maximum nights limit is exceeded." || limitExceedModalData?.title}
          </TypographyChildTitle>
          <TypographyChild $isMobile={isMobile} variant={isMobile ? "m-body-ml" : "body-ml"}>
            {"Your maximum nights limit is exceeded" || limitExceedModalData?.subtitle}
          </TypographyChild>
          <DateBoxRange $isMobile={isMobile}>
            <RenderActionItem
              isActionButtonType={true}
              url={""}
              title={"OKAY" || limitExceedModalData?.PrimaryAction?.title}
              onClick={() => {
                handleClose()
              }}
              variant={limitExceedModalData?.PrimaryAction?.variant}
              navigationType={"dialog"}
              buttonStyles={{
                minWidth: isMobile ? MobilePxToVw(540) : DesktopPxToVw(280),
              }}
            />
          </DateBoxRange>
        </StackChild>
      </StackStyle>
    </>
  )
}

export default BookingSEBDateCardComponent
