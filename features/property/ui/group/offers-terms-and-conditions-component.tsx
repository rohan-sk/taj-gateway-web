import React, { useContext, useEffect, useState } from "react"
import { Box, Divider } from "@mui/material"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import { useMobileCheck } from "../../../../utils/isMobilView"
import { GLOBAL_STORES } from "../../../../utils/Constants"
import { OffersStore, PropertyStore } from "../../../../store"
import { fetchSpecificOffersDataWithHotelID } from "../../../../utils/fetchRoomData"
import { useRouter } from "next/router"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"

interface GroupWithTermsAndConditionsProps {
  items: any
  _key: string
  metadata: any
  _type: string
  variant: string
  parentProps: number
  hasAllLink: boolean
  largeVariant: string
  viewEventCallback: any
  allowAdditionalParameters: boolean
  title?: any
  aesthetic?: any
}
const OffersTermsAndConditionsComponent = ({
  items,
  variant,
  largeVariant,
  title,
  aesthetic,
}: GroupWithTermsAndConditionsProps) => {
  const router: any = useRouter()
  const context = useContext(IHCLContext)
  const [componentItemData, setComponentItemsData] = useState<any>()
  const itemsCount = items.length
  const propertyStore: any = context?.getGlobalStore(
    GLOBAL_STORES.propertyStore
  ) as PropertyStore
  const offerStore: any = context?.getGlobalStore(
    GLOBAL_STORES.offerStore
  ) as OffersStore
  const isMobile = useMobileCheck()
  useEffect(() => {
    async function fetchTNCs() {
      let response = router?.query?.slug
        ? await fetchSpecificOffersDataWithHotelID(
            propertyStore?.propertyData?._id || undefined,
            router?.query?.slug || undefined
          )
        : offerStore?.offersData
      if (response) {
        setComponentItemsData(
          response?.[0]?.displayGlobal
            ? response?.[0]?.tnc
            : response?.[0]?.hotels?.tnc || response?.tnc
        )
      }
    }

    fetchTNCs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  const defaultExpandState = offerStore?.offersData?.expandTnC || false
  let groupData = [
    {
      _type: items?.[0]?._type,
      largeVariant: items?.[0]?.largeVariant,
      _key: "ac4174ca5a6a",
      headingElement: title?.headingElement,
      title: items?.[0]?.title,
      defaultExpandState: defaultExpandState,
      items: [
        {
          answer: componentItemData,
        },
      ],
    },
  ]
  return (
    <>
      {componentItemData?.length > 0 && (
        <Box aria-label={isMobile ? variant : largeVariant}>
          {groupData?.map((item: any, index: number) => (
            <Box
              key={index}
              sx={{
                "&>div": {
                  margin: "unset",
                },
                "& span": {
                  fontSize: isMobile ? `${MobilePxToVw(22)}!important` : `${DesktopPxToVw(22)} !important`,
                },
              }}>
              {context?.renderComponent(item?._type, item, index)}
              {index + 1 < itemsCount ? (
                <Divider
                  sx={{
                    borderWidth: "0.0521vw",
                    margin: isMobile ? "0vw 8.594vw 0vw" : "1.042vw 0vw 0vw",
                  }}
                />
              ) : (
                <></>
              )}
            </Box>
          ))}
        </Box>
      )}
    </>
  )
}

export default OffersTermsAndConditionsComponent
