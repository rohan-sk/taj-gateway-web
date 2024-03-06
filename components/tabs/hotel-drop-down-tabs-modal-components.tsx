import { PathType } from "../types"
import { Box } from "@mui/material"
import { theme } from "../../lib/theme"
import { useRouter } from "next/router"
import { urlFor } from "../../lib-sanity"
import React, { useContext } from "react"
import { ROUTES } from "../../utils/routes"
import { PropertyStore } from "../../store"
import { GLOBAL_STORES } from "../../utils/Constants"
import { useMobileCheck } from "../../utils/isMobilView"
import ReferenceDataContext from "../hoc/ReferenceDataContext"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import {
  LogoBox,
  TabTitleTypo,
  DropDownItemBox,
  HotelTabTitleNameTypo,
  ModelContentWrapperBox,
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
  value?: string
}

const HotelDropdownTabsModal = ({ navigate, activePath, modalProps, setOpenModel }: DropdownTabsModalProps) => {
  const isMobile = useMobileCheck()
  const router = useRouter()
  const context: any = useContext(IHCLContext)
  const propertyStore = context?.getGlobalStore(GLOBAL_STORES.propertyStore) as PropertyStore

  const handleRoute = () => {
    setOpenModel(false)
    router?.push(ROUTES?.WITHOUTSEO_FOR_ROUTING?.HOMEPAGE)
  }
  const handleNavigation = (url: any, type: PathType | undefined) => {
    navigate(url, type)
    setOpenModel(false)
  }

  return (
    <>
      <ReferenceDataContext.Consumer>
        {(modalDropdownContextData) => (
          <ModelContentWrapperBox sx={{ overflowY: "auto" }}>
            {modalDropdownContextData?.modalDropdownContextData?.logo && (
              <LogoBox>
                <Box
                  onClick={handleRoute}
                  width="16.72vw"
                  height="14.76vw"
                  component="img"
                  alt="Taj Logo"
                  src={urlFor(modalDropdownContextData?.modalDropdownContextData?.logo).url()}
                />
              </LogoBox>
            )}
            <HotelTabTitleNameTypo>
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
                      {propertyStore?.propertyData?.hotelName ? (
                        propertyStore?.propertyData?.hotelName
                      ) : (
                        <>
                          {modalDropdownContextData?.modalDropdownContextData?.title?.mobileTitle?.[0] &&
                            modalDropdownContextData?.modalDropdownContextData?.title?.mobileTitle?.[0]}
                          <br />
                          {modalDropdownContextData?.modalDropdownContextData?.title?.mobileTitle?.[1] &&
                            modalDropdownContextData?.modalDropdownContextData?.title?.mobileTitle?.[1]}
                        </>
                      )}
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
            </HotelTabTitleNameTypo>
            {modalProps?.map((item: DropDownTabItems, index: number) => (
              <DropDownItemBox
                key={index}
                sx={{
                  borderTop: index === 0 ? `2px solid ${theme?.palette?.ihclPalette?.rgbaOne}` : "none",
                }}>
                <TabTitleTypo
                  sx={{
                    fontSize: "4.06vw",
                    lineHeight: "320%",
                    color: theme?.palette?.ihclPalette?.hexTwo,
                    fontWeight:
                      `/${activePath?.split("/")?.[activePath?.split("/")?.length - 1]?.toLowerCase()}` ==
                      item?.url?.toLowerCase()
                        ? 700
                        : 400,
                  }}
                  variant="m-body-m"
                  onClick={() => {
                    handleNavigation(item?.url, item?.type)
                  }}>
                  {item?.value}
                </TabTitleTypo>
              </DropDownItemBox>
            ))}
          </ModelContentWrapperBox>
        )}
      </ReferenceDataContext.Consumer>
    </>
  )
}

export default HotelDropdownTabsModal
