import React, { Fragment, useContext, useEffect } from "react"
import { Box } from "@mui/material"
import { useMobileCheck } from "../../../utils/isMobilView"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { useAppNavigation } from "../../../utils/NavigationUtility"
import ModalStore from "../../../store/global/modal.store"
import { urlFor } from "../../../lib-sanity"
import { observer } from "mobx-react-lite"
import { PathType } from "../../types"
import DesktopPxToVw from "../../../utils/DesktopFontCalc"

const SSOLoginModalDataForm = ({ props }: any) => {
  const isMobile = useMobileCheck()
  const context = useContext(IHCLContext)
  const navigate = useAppNavigation()
  const modalStore = ModalStore.getInstance()

  useEffect(() => {
    window.addEventListener("popstate", () => {
      modalStore?.closeModal()
    })
  }, [modalStore])

  return (
    <>
      {props?.logo?.asset?._ref && !isMobile && (
        <Box
          component="img"
          alt="Gold-taj-logo"
          height={DesktopPxToVw(72)}
          width={DesktopPxToVw(86)}
          src={urlFor(props?.logo?.asset?._ref)?.url()}
          onClick={() => {
            navigate("/homepage", PathType?.internal), modalStore?.closeModal()
          }}
          sx={{
            cursor: "pointer",
            marginLeft: DesktopPxToVw(62),
            "@media (max-width: 640px)": {
              display: "none",
            },
          }}
        />
      )}

      <Box>
        {props?.items?.map((item: any, index: number) => {
          return (
            <Fragment key={index}>
              {context?.renderComponent(item._type, {
                ...item,
              })}
            </Fragment>
          )
        })}
      </Box>
    </>
  )
}

export default observer(SSOLoginModalDataForm)
