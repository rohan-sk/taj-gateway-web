import React, { Fragment, useContext } from "react"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { GridWrapper } from "../Styles/register.styles"
import { Box } from "@mui/material"
import { urlFor } from "../../../lib-sanity"
import DesktopPxToVw from "../../../utils/DesktopFontCalc"
import { useMobileCheck } from "../../../utils/isMobilView"
import { PathType } from "../../types"
import { useAppNavigation } from "../../../utils/NavigationUtility"
import ModalStore from "../../../store/global/modal.store"

const RegisterForm = (props: any) => {
  const context = useContext(IHCLContext)
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const modalStore = ModalStore.getInstance()

  const handleClose = () => {
    modalStore?.closeModal()
    global?.localStorage?.removeItem("userDialCode")
  }

  return (
    <>
      {props?.data?.logo?.asset?._ref && !isMobile && (
        <Box
          component="img"
          src={urlFor(props?.data?.logo?.asset?._ref).url()}
          width={isMobile ? "16.719vw" : DesktopPxToVw(100)}
          alt="Map Pin-Point"
          onClick={() => {
            navigate("/homepage", PathType?.internal), handleClose()
          }}
          sx={{
            cursor: "pointer",
            margin:
              isMobile && props?.isPasswordScreen
                ? "5vw 0vw 9.881vw 8vw"
                : isMobile
                ? "0vw 0vw 0vw 8vw"
                : props?.isThankYouScreen
                ? "-1vw 0vw 0vw 3.2vw"
                : "-0.6vw 0vw 0vw 3.2vw",
          }}
        />
      )}
      <GridWrapper arai-label="scrollable-grid" id="register-scroll">
        {props?.data?.items && (
          <>
            {props?.data?.items?.map((item: any, index: number) => {
              return (
                <Fragment key={index}>
                  {context?.renderComponent(item._type, {
                    ...item,
                  })}
                </Fragment>
              )
            })}
          </>
        )}
      </GridWrapper>
    </>
  )
}

export default RegisterForm
