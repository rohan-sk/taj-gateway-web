import React from "react"
import { Box } from "@mui/material"
import { theme } from "../../../lib/theme"
import { urlFor } from "../../../lib-sanity"
import ReferenceDataContext from "../ReferenceDataContext"
import {
  ModalContentBox,
  ModalSubTitleText,
  ModalTitleText,
  PropItemTitles,
  PropItemsCount,
} from "./ModalPropItemStyles"
import { useMobileCheck } from "../../../utils/isMobilView"
import { useAppNavigation } from "../../../utils/NavigationUtility"

export const PropItemsMsiteModalData = ({
  props,
  selectedIndex,
  setSelectedIndex,
  setOpenModal,
  numberOfCards,
  setCountToShowCards,
  setActiveIndex,
  activeIndex,
}: any) => {
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const modalSubTitle = ""
  const titleBorderColor = theme?.palette?.neuPalette?.rgbaOne
  function fontWeightFunc(index: number) {
    if (index === selectedIndex) {
      return 700
    } else {
      return 400
    }
  }
  return (
    <>
      <ReferenceDataContext.Consumer>
        {(modalDropdownContextData) => {
          const tajLogo =
            modalDropdownContextData?.modalDropdownContextData?.logo
          const modalTitle =
            modalDropdownContextData?.modalDropdownContextData?.title
          return (
            <Box sx={{ padding: "9.38vw" }}>
              {tajLogo && (
                <Box
                  width="16.72vw"
                  height="14.76vw"
                  component="img"
                  alt="Taj Logo"
                  src={urlFor(tajLogo).url()}
                />
              )}
              <ModalTitleText
                sx={{ marginBottom: modalSubTitle ? "0vw" : "5.12vw" }}>
                {modalTitle !== undefined && typeof modalTitle === "string" ? (
                  <>
                    {modalTitle?.split(",")[0] && modalTitle?.split(",")[0]}
                    , <br />
                    {modalTitle?.split(",")[1] && modalTitle?.split(",")[1]}
                  </>
                ) : (
                  <>
                    {isMobile ? (
                      <>
                        {modalTitle?.mobileTitle?.[0] &&
                          modalTitle?.mobileTitle?.[0]}
                        <br />
                        {modalTitle?.mobileTitle?.[1] &&
                          modalTitle?.mobileTitle?.[1]}
                      </>
                    ) : (
                      <>
                        {modalTitle?.desktopTitle?.[0] &&
                          modalTitle?.desktopTitle?.[0]}
                        <br />
                        {modalTitle?.desktopTitle?.[1] &&
                          modalTitle?.desktopTitle?.[1]}
                      </>
                    )}
                  </>
                )}
              </ModalTitleText>
              {modalSubTitle && (
                <ModalSubTitleText>{modalSubTitle}</ModalSubTitleText>
              )}
              <Box
                className="msite-modal"
                sx={{
                  height: global?.window?.innerHeight > 668 ? "65vh" : "55vh",
                  overflowY: "scroll",

                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                }}>
                {props?.map((propItemTitles: any, index: number) => {
                  return (
                    <ModalContentBox
                      onClick={() => {
                        setSelectedIndex(index)
                        setActiveIndex && setActiveIndex(index)
                        propItemTitles?.url && navigate(propItemTitles?.url, propItemTitles?.urlType)
                        setOpenModal()
                        numberOfCards && setCountToShowCards(numberOfCards)
                        propItemTitles?.handleProperty &&
                          propItemTitles?.handleProperty(index)
                      }}
                      key={index}
                      sx={{
                        borderTop:
                          index === 0
                            ? `2px solid ${titleBorderColor}`
                            : "none",
                      }}>
                      <PropItemTitles
                        variant="m-body-m"
                        sx={{
                          fontWeight: fontWeightFunc(index),
                        }}>
                        {propItemTitles?.title !== undefined &&
                        typeof propItemTitles?.title === "string"
                          ? propItemTitles?.title?.toUpperCase()
                          : isMobile
                          ? propItemTitles?.title?.mobileTitle?.toUpperCase() ||
                            propItemTitles?.title?.desktopTitle?.toUpperCase()
                          : propItemTitles?.title?.desktopTitle?.toUpperCase()}
                      </PropItemTitles>
                      {propItemTitles?.items?.length && (
                        <PropItemsCount
                          variant="m-body-m"
                          sx={{ fontWeight: fontWeightFunc(index) }}>
                          {propItemTitles?.items?.length}
                        </PropItemsCount>
                      )}
                    </ModalContentBox>
                  )
                })}
              </Box>
            </Box>
          )
        }}
      </ReferenceDataContext.Consumer>
    </>
  )
}
