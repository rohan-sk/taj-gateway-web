import React, { useState, useEffect, useContext, useRef } from "react"
import { useRouter } from "next/router"
import { PathType } from "../../types"
import { theme } from "../../lib/theme"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { MainBox, StyledDivider, StyledTab, StyledTabs } from "./styles/basic-tab"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import { hotelRoute } from "../../features/property/ui/constants"
import { HOTEL_NAVIGATION_TABS } from "../constants"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { GLOBAL_STORES } from "../../utils/Constants"
import { PropertyStore } from "../../store"

type BasicTabItems = {
  url: string
  value: string
  type: PathType
}

function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
  let timeoutId: NodeJS.Timeout

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(this, args), delay)
  }
}

const HotelTabComponent = () => {
  const router: any = useRouter()
  const navigate = useAppNavigation()
  const [items, setItems] = useState<any>()
  const ihclContext = useContext(IHCLContext)
  const propertyStore = ihclContext?.getGlobalStore(GLOBAL_STORES?.propertyStore) as PropertyStore
  const [numberOfTabs, setNumberOfTabs] = useState<number>()
  const [value, setValue] = useState<number>()
  const containerRef: any = useRef(null)

  useEffect(() => {
    let arr = HOTEL_NAVIGATION_TABS.filter((val: any) => {
      return propertyStore?.propertyData?.hotelNavigation?.[val?.key] === true
    })
    setItems(arr)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  useEffect(() => {
    let indexValue = items?.findIndex((item: BasicTabItems) =>
      global?.window?.location?.pathname?.split("/en-in")?.[1]?.split("/")?.[
        router?.asPath?.split("/")?.findIndex((route: any) => route === hotelRoute) + 2
      ]
        ? item?.url?.split("/")?.[1] ===
          global?.window?.location?.pathname?.split("/en-in")?.[1]?.split("/")?.[
            router?.asPath?.split("/")?.findIndex((route: any) => route === hotelRoute) + 2
          ]
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
    const routerArr = global?.window?.location?.pathname?.split("/en-in")?.[1]?.split("/")
    const hotelRouteIndex = routerArr?.findIndex((route: any) => route === hotelRoute)
    let navigationUrl =
      routerArr?.[hotelRouteIndex + 1] && hotelRouteIndex > -1
        ? `/${hotelRoute}/${routerArr?.[hotelRouteIndex + 1]}${url}`
        : url
    navigate(navigationUrl, type)
  }

  const handleScroll = () => {
    let header: any = document.getElementById("main__Header")

    if (containerRef?.current) {
      const scrollTop = containerRef.current?.getBoundingClientRect()?.y
      if (global?.window?.scrollY && scrollTop == 0) {
        header?.classList?.add("closeHeader")
      } else {
        header?.classList?.remove("closeHeader")
      }
    }
  }

  const debouncedHandleScroll = debounce(handleScroll, 80)

  useEffect(() => {
    global?.window?.addEventListener("scroll", debouncedHandleScroll)

    return () => {
      global?.window?.removeEventListener("scroll", debouncedHandleScroll)
    }
  }, [debouncedHandleScroll, containerRef])

  return (
    <>
      <MainBox
        ref={containerRef}
        sx={{
          padding: "0vw 12.5vw",
          backgroundColor: theme?.palette?.ihclPalette?.hexOne,
        }}>
        <StyledTabs
          sx={{
            "& .MuiTabs-flexContainer": {
              gap: items?.length <= 7 ? DesktopPxToVw(72) : "auto",
              justifyContent: items?.length <= 7 ? "center" : "space-between",
            },
          }}
          centered
          value={value}
          variant={"standard"}
          onChange={handleChange}
          TabIndicatorProps={{
            style: { background: theme?.palette?.ihclPalette?.hexTwo },
          }}>
          {items?.map((item: BasicTabItems, index: number) => (
            <StyledTab key={index} label={item?.value} onClick={() => handleNavigation(item?.url, item?.type)} />
          ))}
        </StyledTabs>
      </MainBox>
      <StyledDivider />
    </>
  )
}

export default HotelTabComponent
