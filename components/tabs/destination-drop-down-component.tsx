import React, { useContext, useEffect, useState } from "react"
import { theme } from "../../lib/theme"
import { CONSTANTS, DESTINATION_NAVIGATION_TABS } from "../constants"
import BasicModal from "../hoc/modal/modal"
import { useAppNavigation } from "../../utils/NavigationUtility"
import {
  TabBox,
  TabTitleTypo,
  StyledDownArrow,
  VerticalDivider,
  HorizontalDivider,
  TabsBox,
} from "./styles/drop-down-tabs"
import { Stack } from "@mui/material"
import { useRouter } from "next/router"
import { PathType } from "../../types"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { GLOBAL_STORES } from "../../utils/Constants"
import { DestinationStore, PropertyStore } from "../../store"
import DestinationDropdownTabsModal from "./destination-drop-down-tabs-modal-components"
import {
  DestinationHighlightsRoute,
  destinationsRoute,
  hotelRoute,
} from "../../features/property/ui/constants"
import { MobilePxToVw } from "../../utils/DesktopFontCalc"

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

const DestinationDropDownTabs = () => {
  const [items, setItems] = useState<any>([])
  const [activeTab, setActiveTab] = useState(0)
  const [openModel, setOpenModel] = useState<boolean>(false)

  const numberTwo = CONSTANTS?.TWO
  const navigate = useAppNavigation()
  const router: any = useRouter()

  const activePath = router?.query?.pid?.includes("about-")
    ? `/about`
    : `/${router?.query?.pid?.split("-in-")?.[0]}`
  const ihclContext = useContext(IHCLContext)
  const destinationStore = ihclContext?.getGlobalStore(
    GLOBAL_STORES.destinationStore
  ) as DestinationStore

  const handleModelOpening = () => setOpenModel(!openModel)
  const firstTwoArrayElements = items?.slice(0, numberTwo)

  useEffect(() => {
    let arr = DESTINATION_NAVIGATION_TABS.filter((val: any) => {
      return (
        destinationStore?.destinationData?.[0]?.destinationNavigation?.[
          val?.key
        ] === true
      )
    })
    setItems(arr)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  useEffect(() => {
    let indexValue = items?.findIndex((item: BasicTabItems) =>
      router?.query?.pid?.includes("about-")
        ? item?.url?.split("/")?.[1] === "about"
        : router?.query?.pid?.split("-in-")?.[0]
        ? item?.url?.split("/")?.[1] === router?.query?.pid?.split("-in-")?.[0]
        : item?.url === "/"
    )
    setActiveTab(indexValue)
  }, [router, items])

  const CheckIsActiveTabAvailable = firstTwoArrayElements?.some((val: any) => {
    return val?.url === activePath
  })

  const FinalTabsList = CheckIsActiveTabAvailable
    ? firstTwoArrayElements
    : [...firstTwoArrayElements, items[activeTab]]

  const isMoreAvailable: boolean = FinalTabsList.length <= 2
  const handleNavigation = (url: any, type: PathType | undefined) => {
    let navigationUrl =
      url === `/${DestinationHighlightsRoute}`
        ? `/${destinationsRoute}/about-${
            router?.query?.pid?.includes(`${DestinationHighlightsRoute}-`)
              ? router?.query?.pid?.split(`${DestinationHighlightsRoute}-`)?.[1]
              : router?.query?.pid?.split("-in-")?.[1]
          }`
        : `/${destinationsRoute}/${url}-in-${
            router?.query?.pid?.includes(`${DestinationHighlightsRoute}-`)
              ? router?.query?.pid?.split(`${DestinationHighlightsRoute}-`)?.[1]
              : router?.query?.pid?.split("-in-")?.[1]
          }`
    navigate(navigationUrl, type)
  };

  return (
    <>
      <HorizontalDivider />
      <TabsBox p={FinalTabsList?.length === 1
        ? `${MobilePxToVw(27)} 0`
        : `${MobilePxToVw(27)} ${MobilePxToVw(60)}`}>
        <TabBox sx={{ justifyContent: "center" }}>
          {FinalTabsList?.map((item: DropDownTabItems, index: number) => (
            <Stack direction={"row"} alignItems={"center"} key={index}>
              <TabTitleTypo
                variant="m-body-m"
                sx={{
                  cursor: "pointer",
                  fontWeight:
                    activePath === FinalTabsList?.[index]?.url ? 700 : 300,
                }}
                onClick={() => {
                  handleNavigation(item?.url, item?.type)
                }}>
                {item?.value}
              </TabTitleTypo>
              {(index == 0 || items?.length > 2) && items?.length != 1 && (
                <VerticalDivider flexItem orientation="vertical" />
              )}
            </Stack>
          ))}
          {items?.length > 2 && (
            <TabBox sx={{ cursor: "pointer" }}>
              {FinalTabsList.length <= 2 && (
                <TabTitleTypo variant="m-body-m" onClick={handleModelOpening}>
                  {CONSTANTS?.MORE}
                </TabTitleTypo>
              )}
              <StyledDownArrow
                onClick={handleModelOpening}
                $isMoreAvailable={isMoreAvailable}
              />
            </TabBox>
          )}
        </TabBox>
        {openModel && (
          <BasicModal
            width="100%"
            height="100%"
            open={openModel}
            bgcolor={theme?.palette?.background?.paper}
            handleClose={handleModelOpening}
            Component={
              <DestinationDropdownTabsModal
                modalProps={items}
                navigate={handleNavigation}
                activePath={activePath}
                setOpenModel={setOpenModel}
              />
            }
          />
        )}
      </TabsBox>
      <HorizontalDivider />
    </>
  )
}

export default DestinationDropDownTabs
