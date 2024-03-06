import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { PathType } from "../../types"
import { theme } from "../../lib/theme"
import { useAppNavigation } from "../../utils/NavigationUtility"
import {
  MainBox,
  StyledDivider,
  StyledTab,
  StyledTabs,
} from "./styles/basic-tab"
import { hotelRoute } from "../../features/property/ui/constants"

interface BasicTabsProps {
  props: BasicTabItems[]
}

type BasicTabItems = {
  url: string
  title: string
  type: PathType
}

const BasicTabs = ({ props }: BasicTabsProps) => {
  const router: any = useRouter()
  const navigate = useAppNavigation()

  const [numberOfTabs, setNumberOfTabs] = useState<number>()
  const [value, setValue] = useState<number>(
    props?.findIndex((item: BasicTabItems) =>
      item?.url?.includes(
        router?.query?.pid !== undefined
          ? router?.query?.pid[router?.query?.pid?.length - 1]
          : ""
      )
    )
  )

  useEffect(() => {
    let indexValue = props?.findIndex((item: BasicTabItems) =>
      item?.url?.includes(
        router?.query?.pid !== undefined
          ? router?.query?.pid[router?.query?.pid?.length - 1]
          : ""
      )
    )
    setValue(indexValue)
    setNumberOfTabs(props?.length)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [global?.window?.location?.pathname])

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  // useEffect(() => {
  //   if (global?.window !== undefined) {
  //     let headerDisplay: any =
  //       document.getElementsByClassName("toggleSticky")[0]
  //     global?.window.addEventListener("scroll", () => {
  //       let hide: any = document.getElementsByClassName("toggleCloseHeader")[0]
  //       if (window.scrollY >= 680) {
  //         hide.style.display = "none"
  //         headerDisplay?.style.position = "fixed"
  //         headerDisplay.style.top = 0
  //         headerDisplay.style.zIndex = "1"
  //         headerDisplay.style.backgroundColor =
  //           theme?.palette?.background?.default
  //         headerDisplay.style.width = "100%"
  //         headerDisplay.style.transition = "transform 3s ease-out"
  //       } else {
  //         hide.style.display = "block"
  //         headerDisplay.style.position = "unset"
  //       }
  //     })
  //   }
  // }, [])

  const handleNavigation = (url: any, type: PathType | undefined) => {
    const routerArr = router?.asPath?.split("/")
    const hotelRouteIndex = routerArr?.findIndex(
      (route: any) => route === hotelRoute
    )
    let navigationUrl = routerArr?.[hotelRouteIndex + 1] && hotelRouteIndex > - 1
      ? `/${hotelRoute}/${routerArr?.[hotelRouteIndex + 1]}${url}`
      : url
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
          style: { background: theme?.palette?.neuPalette?.hexTwo },
        }}>
        {props?.map((item: BasicTabItems, index: number) => (
          <StyledTab
            key={index}
            label={item?.title}
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

export default BasicTabs
