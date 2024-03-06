import React, { useContext, useState } from "react"
import { Stack } from "@mui/material"
import { PathType } from "../../types"
import { useRouter } from "next/router"
import { theme } from "../../lib/theme"
import BasicModal from "../hoc/modal/modal"
import { CONSTANTS, ICONS } from "../constants"
import { MobilePxToVw } from "../../utils/DesktopFontCalc"
import DropdownTabsModal from "./drop-down-tabs-modal.component"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import {
  TabBox,
  MainBox,
  TabTitleTypo,
  StyledDownArrow,
  VerticalDivider,
  HorizontalDivider,
  SingleContentAsTitleWrapper,
} from "./styles/drop-down-tabs"

interface DropDownTabProps {
  props: DropDownTabItems[]
}

type DropDownTabItems = {
  type: any
  url: string
  title: string
  singleContent?: any
  urlType?: string | undefined
}

const DropDownTabs = ({ props }: DropDownTabProps) => {
  const context = useContext(IHCLContext)
  const PortableText = context!.PortableText
  const numberTwo = CONSTANTS?.TWO
  const numberThree = CONSTANTS?.THREE
  const navigate = useAppNavigation()
  const router = useRouter()
  const activePath = window.location.pathname.replace("/en-in", "")

  const activeTab: any = props.find(
    (item: DropDownTabItems) => item.url === activePath
  )
  const firstTwoArrayElements = activeTab
    ? props.slice(0, numberTwo)
    : props.slice(0, numberThree)

  const CheckIsActiveTabAvailable = firstTwoArrayElements.includes(activeTab)
  const FinalTabsList = CheckIsActiveTabAvailable
    ? firstTwoArrayElements
    : activeTab
    ? [...firstTwoArrayElements, ...[activeTab]]
    : [...firstTwoArrayElements]

  const isMoreAvailable: boolean = FinalTabsList.length <= 2

  const [openModel, setOpenModel] = useState<boolean>(false)

  const handleModelOpening = () => setOpenModel(!openModel)

  const handleNavigation = (url: any, type: PathType | undefined) => {
    let navigationUrl = router?.query?.hotelId
      ? `${url}?hotelId=${router?.query?.hotelId}`
      : url
    navigate(navigationUrl, type)
  }

  return (
    <>
      <HorizontalDivider />
      <MainBox>
        <TabBox>
          {FinalTabsList?.map((item: DropDownTabItems, index: number) => (
            <Stack direction={"row"} alignItems={"center"} key={index}>
              {item?.singleContent ? (
                <SingleContentAsTitleWrapper
                  $activeTabIndex={activePath === FinalTabsList?.[index]?.url}
                  onClick={() => {
                    handleNavigation(item?.url, item?.urlType as PathType)
                  }}>
                  {item?.singleContent?.map(
                    (content: string | {}, idx: number) => (
                      <PortableText blocks={content} key={idx} />
                    )
                  )}
                </SingleContentAsTitleWrapper>
              ) : (
                <TabTitleTypo
                  variant="m-body-m"
                  sx={{
                    fontWeight:
                      activePath === FinalTabsList?.[index]?.url
                        ? "700"
                        : "300",
                  }}
                  onClick={() => {
                    handleNavigation(item?.url, item?.urlType as PathType)
                  }}>
                  {item?.title}
                </TabTitleTypo>
              )}

              <VerticalDivider
                flexItem
                orientation="vertical"
                sx={{
                  height: item?.singleContent
                    ? MobilePxToVw(54)
                    : MobilePxToVw(24),
                }}
              />
            </Stack>
          ))}
          <TabBox onClick={handleModelOpening}>
            {FinalTabsList.length <= 2 && (
              <TabTitleTypo variant="m-body-m">{CONSTANTS?.MORE}</TabTitleTypo>
            )}
            <StyledDownArrow $isMoreAvailable={isMoreAvailable} />
          </TabBox>
        </TabBox>
        {openModel && (
          <BasicModal
            width="100%"
            height="100%"
            open={openModel}
            bgcolor={theme?.palette?.background?.paper}
            handleClose={handleModelOpening}
            CloseIcon={ICONS?.CLOSE_GOLD_ICON}
            Component={
              <DropdownTabsModal
                modalProps={props}
                navigate={handleNavigation}
                activePath={activePath}
                setOpenModel={setOpenModel}
              />
            }
            tajLogoTop={0}
            showLogo={true}
            tajLogoBottom={MobilePxToVw(8)}
            mSiteCloseStyles={{
              padding: `${MobilePxToVw(40)} ${MobilePxToVw(
                59
              )} 0 ${MobilePxToVw(54)}`,
            }}
          />
        )}
      </MainBox>
      <HorizontalDivider />
    </>
  )
}

export default DropDownTabs
