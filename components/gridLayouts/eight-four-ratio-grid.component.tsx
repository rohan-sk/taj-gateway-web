import React, { useContext, useEffect, useRef } from "react"
import { Box, Grid } from "@mui/material"
import dynamic from "next/dynamic"
import { useMobileCheck } from "../../utils/isMobilView"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { BookingFlowGrid } from "../group/styles/common-styled-components"
const LoadingSpinner = dynamic(() => import("../../utils/SpinnerComponent"))

const GridWithTwoColumnsEightByFourAspectRatio = ({ props }: any) => {
  const firstItem = props?.[0]
  const secondItem = props?.[1]
  const isMobile = useMobileCheck()
  const context = useContext(IHCLContext)

  return (
    <>
      <BookingFlowGrid container sx={{ minHeight: isMobile ? "50vh" : "unset" }}>
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
      </BookingFlowGrid>
    </>
  )
}

export default GridWithTwoColumnsEightByFourAspectRatio
