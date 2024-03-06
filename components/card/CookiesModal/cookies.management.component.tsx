import { Box } from "@mui/material"
import React, { Fragment, useContext } from "react"
import dynamic from "next/dynamic"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
const CookiesManagement = dynamic(() => import("./cookies-management-system.group.component"))
import DesktopPxToVw from "../../../utils/DesktopFontCalc"
import { CloseIcon } from "../../../utils/customIcons"
import { CookiesModalContainer } from "./cookies-policy.styles"
import { useMobileCheck } from "../../../utils/isMobilView"

const CookiesManagementSystem = (props: any) => {
  const context = useContext(IHCLContext)
  const isMobile = useMobileCheck()
  return (
    <CookiesModalContainer sx={{ maxHeight: "100%", overflowY: "scroll" }}>
      {!isMobile && (
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <CloseIcon
            sx={{ width: DesktopPxToVw(18), cursor: "pointer" }}
            onClick={() => {
              props?.handleClose()
            }}
          />
        </Box>
      )}
      <Box sx={{ pr: isMobile ? "0vw" : "1vw" }}>
        <CookiesManagement {...props} />
      </Box>
    </CookiesModalContainer>
  )
}
export default CookiesManagementSystem
