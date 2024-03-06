import React, { useState, useEffect, useContext } from "react"
import { useRouter } from "next/router"
import { PathType } from "../../types"
import { theme } from "../../lib/theme"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { MainBox, StyledDivider, StyledTab, StyledTabs } from "./styles/basic-tab"
import { DestinationHighlightsRoute, destinationsRoute, hotelRoute } from "../../features/property/ui/constants"
import { DESTINATION_NAVIGATION_TABS } from "../constants"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { GLOBAL_STORES } from "../../utils/Constants"
import { DestinationStore } from "../../store"

type BasicTabItems = {
  url: string
  value: string
  type: PathType
}

const DestinationTabComponent = () => {
  const router: any = useRouter()
  const navigate = useAppNavigation()
  const [items, setItems] = useState<any>()
  const ihclContext = useContext(IHCLContext)
  const destinationStore = ihclContext?.getGlobalStore(GLOBAL_STORES.destinationStore) as DestinationStore
  const [numberOfTabs, setNumberOfTabs] = useState<number>()
  const [value, setValue] = useState<number>()

  useEffect(() => {
    let arr = DESTINATION_NAVIGATION_TABS.filter((val: any) => {
      return destinationStore?.destinationData?.[0]?.destinationNavigation?.[val?.key] === true
    })
    setItems(arr)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  useEffect(() => {
    let indexValue = items?.findIndex((item: BasicTabItems) =>
      router?.query?.pid?.includes(`${DestinationHighlightsRoute}-`)
        ? item?.url?.split("/")?.[1] === `${DestinationHighlightsRoute}`
        : router?.query?.pid?.split("-in-")?.[0]
        ? item?.url?.split("/")?.[1] === router?.query?.pid?.split("-in-")?.[0]
        : item?.url === "/",
    )
    setValue(indexValue)
    setNumberOfTabs(items?.length)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [global?.window?.location?.pathname, items])

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handleNavigation = (url: any, type: PathType | undefined) => {
    let navigationUrl =
      url === `/${DestinationHighlightsRoute}`
        ? `/${destinationsRoute}/${DestinationHighlightsRoute}-${
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
  }

  return (
    <MainBox
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <StyledTabs
        centered
        value={value}
        variant={"standard"}
        onChange={handleChange}
        TabIndicatorProps={{
          style: { background: theme?.palette?.ihclPalette?.hexTwo },
        }}>
        {items?.map((item: BasicTabItems, index: number) => (
          <StyledTab
            key={index}
            label={item?.value}
            sx={{
              margin: numberOfTabs === 9 ? "0vw 1.875vw" : "0vw 2.60vw",
            }}
            onClick={() => handleNavigation(item?.url, item?.type)}
          />
        ))}
      </StyledTabs>
      <StyledDivider />
    </MainBox>
  )
}

export default DestinationTabComponent
