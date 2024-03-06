import React from "react"
import { useRouter } from "next/router"
import { theme } from "../../lib/theme"
import { useMobileCheck } from "../../utils/isMobilView"
import { MobilePxToVw } from "../../utils/DesktopFontCalc"
import ReferenceDataContext from "../hoc/ReferenceDataContext"
import {
  TabTitleTypo,
  DropDownItemBox,
  GiftCardDropdownTitleText,
  GiftCardDropdownModelWrapper,
} from "./styles/drop-down-tabs"

interface DropdownTabsModalProps {
  navigate: Function
  activePath: string
  setOpenModel: Function
  modalProps: DropDownTabItems[]
}

type DropDownTabItems = {
  type: any
  url: string
  title: string
  urlType?: string
}

const DropdownTabsModal = ({ navigate, activePath, modalProps, setOpenModel }: DropdownTabsModalProps) => {
  const isMobile = useMobileCheck()
  const router = useRouter()
  return (
    <>
      <ReferenceDataContext.Consumer>
        {(modalDropdownContextData) => (
          <GiftCardDropdownModelWrapper aria-label="drop-down-tabs-model">
            <GiftCardDropdownTitleText>
              {modalDropdownContextData?.modalDropdownContextData?.title !== undefined &&
              typeof modalDropdownContextData?.modalDropdownContextData?.title === "string" ? (
                <>
                  {modalDropdownContextData?.modalDropdownContextData?.title?.split(",")[0] &&
                    modalDropdownContextData?.modalDropdownContextData?.title?.split(",")[0]}
                  , <br />
                  {modalDropdownContextData?.modalDropdownContextData?.title?.split(",")[1] &&
                    modalDropdownContextData?.modalDropdownContextData?.title?.split(",")[1]}
                </>
              ) : (
                <>
                  {isMobile ? (
                    <>
                      {modalDropdownContextData?.modalDropdownContextData?.title?.mobileTitle?.[0] &&
                        modalDropdownContextData?.modalDropdownContextData?.title?.mobileTitle?.[0]}
                      <br />
                      {modalDropdownContextData?.modalDropdownContextData?.title?.mobileTitle?.[1] &&
                        modalDropdownContextData?.modalDropdownContextData?.title?.mobileTitle?.[1]}
                      <br />
                      {modalDropdownContextData?.modalDropdownContextData?.title?.mobileTitle?.[2] &&
                        modalDropdownContextData?.modalDropdownContextData?.title?.mobileTitle?.[2]}
                    </>
                  ) : (
                    <>
                      {modalDropdownContextData?.modalDropdownContextData?.title?.desktopTitle?.[0] &&
                        modalDropdownContextData?.modalDropdownContextData?.title?.desktopTitle?.[0]}
                      <br />
                      {modalDropdownContextData?.modalDropdownContextData?.title?.desktopTitle?.[1] &&
                        modalDropdownContextData?.modalDropdownContextData?.title?.desktopTitle?.[1]}
                    </>
                  )}
                </>
              )}
            </GiftCardDropdownTitleText>
            {modalProps?.map((item: DropDownTabItems, index: number) => (
              <DropDownItemBox key={index} sx={{ maxHeight: MobilePxToVw(80) }}>
                <TabTitleTypo
                  sx={{
                    fontSize: "4.06vw",
                    lineHeight: "320%",
                    color: theme?.palette?.ihclPalette?.hexTwo,
                    fontWeight: activePath == item?.url ? 700 : 400,
                  }}
                  variant="m-body-m"
                  onClick={() => {
                    !!item?.url && navigate(item?.url, item?.urlType), setOpenModel(false)
                  }}>
                  {item?.title}
                </TabTitleTypo>
              </DropDownItemBox>
            ))}
          </GiftCardDropdownModelWrapper>
        )}
      </ReferenceDataContext.Consumer>
    </>
  )
}

export default DropdownTabsModal
