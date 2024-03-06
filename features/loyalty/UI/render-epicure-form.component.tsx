import React, { Fragment, useContext } from "react"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { Grid } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { useMobileCheck } from "../../../utils/isMobilView"
import LoadingSpinner from "../../../utils/SpinnerComponent"

const RenderEpicureForm = ({ props }: any) => {
  const context = useContext(IHCLContext)
  const isMobile = useMobileCheck()
  const firstItem = props?.items?.[0]
  const secondItem = props?.items?.[1]
  return (
    <>
      <Grid
        sx={{
          justifyContent: "space-between",
          margin: `${DesktopPxToVw(40)} 0vw ${DesktopPxToVw(40)}`,
          minHeight: isMobile ? "50vh" : "unset",
          "@media (max-width: 640px)": {
            margin: "0vw",
            justifyContent: "center",
          },
        }}
        container>
        {isMobile ? (
          <Grid item sx={{ width: "inherit" }}>
            {firstItem?._type ? (
              context?.renderComponent(firstItem?._type, firstItem, 1)
            ) : (
              <LoadingSpinner componentLevel={true}></LoadingSpinner>
            )}
          </Grid>
        ) : (
          <>
            {firstItem && (
              <Grid item width={"55.73vw"}>
                {context?.renderComponent(firstItem?._type, firstItem, 1)}
              </Grid>
            )}
            {secondItem && (
              <Grid item width={"17.1875vw"}>
                {context?.renderComponent(secondItem?._type, secondItem, 1)}
              </Grid>
            )}
          </>
        )}
      </Grid>
    </>
  )
}

export default RenderEpicureForm
