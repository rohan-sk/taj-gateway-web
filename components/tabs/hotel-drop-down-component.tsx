import React, { useContext, useEffect, useState } from "react"
import { theme } from "../../lib/theme"
import dynamic from "next/dynamic"
import { CONSTANTS, HOTEL_NAVIGATION_TABS, ICONS } from "../constants"
import { useAppNavigation } from "../../utils/NavigationUtility"
import {
  TabBox,
  MainBox,
  TabTitleTypo,
  StyledDownArrow,
  VerticalDivider,
  HorizontalDivider,
} from "./styles/drop-down-tabs"
import { Stack } from "@mui/material"
import { useRouter } from "next/router"
import { PathType } from "../../types"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { GLOBAL_STORES } from "../../utils/Constants"
import { PropertyStore } from "../../store"
import { hotelRoute } from "../../features/property/ui/constants"
import { MobilePxToVw } from "../../utils/DesktopFontCalc"
const BasicModal = dynamic(() => import("../hoc/modal/modal"))
const HotelDropdownTabsModal = dynamic(() => import("./hotel-drop-down-tabs-modal-components"))

type DropDownTabItems = {
  type: any
  url: string
  value: string
  key: string
}
type BasicTabItems = {
  url: string
  value: string
  type: PathType
}

const HotelDropDownTabs = () => {
  const numberTwo = CONSTANTS?.TWO
  const numberThree = CONSTANTS?.THREE
  const navigate = useAppNavigation()
  const router = useRouter()
  const [items, setItems] = useState<any>()
  const ihclContext = useContext(IHCLContext)
  const activePath = global?.window?.location?.pathname
  const [openModel, setOpenModel] = useState<boolean>(false)
  const handleModelOpening = () => setOpenModel(!openModel)
  const [selectedItem, setSelectedItem] = useState<any>(null)

  const propertyStore = ihclContext?.getGlobalStore(GLOBAL_STORES?.propertyStore) as PropertyStore

  useEffect(() => {
    let arr = HOTEL_NAVIGATION_TABS.filter((val: any) => {
      return propertyStore?.propertyData?.hotelNavigation?.[val?.key] === true
    })
    setItems(arr)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  const findActiveItem = items?.find((item: BasicTabItems) =>
    router?.asPath?.split("/")?.[router?.asPath?.split("/")?.findIndex((route: any) => route === hotelRoute) + 2]
      ? item?.url?.split("/")?.[1] ===
        router?.asPath?.split("/")?.[router?.asPath?.split("/")?.findIndex((route: any) => route === hotelRoute) + 2]
      : item?.url === "/",
  )
  const firstTwoArrayElements = findActiveItem ? items?.slice(0, numberTwo) : items?.slice(0, numberThree)

  const CheckIsActiveTabAvailable = firstTwoArrayElements?.includes(findActiveItem)

  const FinalTabsList = CheckIsActiveTabAvailable
    ? firstTwoArrayElements
    : findActiveItem && firstTwoArrayElements
    ? [...firstTwoArrayElements, ...[findActiveItem]]
    : firstTwoArrayElements
    ? [...firstTwoArrayElements]
    : []
  const isMoreAvailable: boolean = FinalTabsList.length <= 2
  const handleNavigation = (url: any, type: PathType | undefined) => {
    const routerArr = router?.asPath?.split("/")
    const hotelRouteIndex = routerArr?.findIndex((route: any) => route === hotelRoute)
    let navigationUrl =
      routerArr?.[hotelRouteIndex + 1] && hotelRouteIndex > -1
        ? `/${hotelRoute}/${routerArr?.[hotelRouteIndex + 1]}${url}`
        : url
    navigate(navigationUrl, type)
  }
  useEffect(() => {
    if (findActiveItem) {
      setSelectedItem(findActiveItem)
    }
  }, [findActiveItem])

  return (
    <>
      <HorizontalDivider />
      <MainBox>
        <TabBox>
          {FinalTabsList?.map((item: DropDownTabItems, index: number) => (
            <Stack direction={"row"} alignItems={"center"} key={index}>
              <TabTitleTypo
                variant="m-body-m"
                sx={{
                  cursor: "pointer",
                  fontWeight: item.key == selectedItem?.key ? 700 : 300,
                  letterSpacing: item.key == selectedItem?.key ? MobilePxToVw(1) : `0 !important`,
                }}
                onClick={() => {
                  handleNavigation(item?.url, item?.type)
                }}>
                {item?.value}
              </TabTitleTypo>
              <VerticalDivider flexItem orientation="vertical" />
            </Stack>
          ))}
          <TabBox>
            {FinalTabsList.length <= 2 && (
              <TabTitleTypo variant="m-body-m" onClick={handleModelOpening}>
                {CONSTANTS?.MORE}
              </TabTitleTypo>
            )}
            <StyledDownArrow
              sx={{ cursor: "pointer" }}
              onClick={handleModelOpening}
              $isMoreAvailable={isMoreAvailable}
            />
          </TabBox>
        </TabBox>
        {openModel && (
          <BasicModal
            width="100%"
            height="100%"
            open={openModel}
            bgcolor={theme?.palette?.background?.paper}
            handleClose={handleModelOpening}
            Component={
              <HotelDropdownTabsModal
                modalProps={items}
                navigate={handleNavigation}
                activePath={activePath}
                setOpenModel={setOpenModel}
              />
            }
            CloseIcon={ICONS?.CLOSE_GOLD_ICON}
            mSiteCloseStyles={{
              padding: `${MobilePxToVw(75)} ${MobilePxToVw(59)} ${MobilePxToVw(21)} ${MobilePxToVw(54)}`,
            }}
          />
        )}
      </MainBox>
      <HorizontalDivider />
    </>
  )
}

export default HotelDropDownTabs
