import React from "react"
import RenderActionItem from "../../../components/hoc/actions/action-items-ui"
import { Box, Typography } from "@mui/material"
import { useMobileCheck } from "../../../utils/isMobilView"
import { ComparisonBox } from "../../../components/card/styles/card-with-card.component"
import { useLoggedIn } from "../../../utils/hooks/useLoggedIn"
import DesktopPxToVw from "../../../utils/DesktopFontCalc"

const EpicureViewComparision = (props: any) => {
  const { PrimaryAction } = props
  const isMobile = useMobileCheck()
  const isLoggedIn = useLoggedIn()
  return (
    <>
      <Box aria-label="EpicureViewComparision">
        {isMobile ? (
          <ComparisonBox>
            {PrimaryAction && (
              <RenderActionItem
                isActionButtonType={true}
                title={PrimaryAction?.title}
                variant={"light-outlined"}
                url={PrimaryAction?.url}
                navigationType={PrimaryAction?.urlType}
                isButtonChevron={true}
              />
            )}
          </ComparisonBox>
        ) : (
          <ComparisonBox>
            {PrimaryAction && (
              <RenderActionItem
                isActionButtonType={PrimaryAction?.variant !== "link"}
                title={PrimaryAction?.title}
                variant={PrimaryAction?.variant}
                url={PrimaryAction?.url}
                navigationType={PrimaryAction?.urlType}
                isButtonChevron={true}
              />
            )}
          </ComparisonBox>
        )}
      </Box>

      {isLoggedIn && !isMobile && props?.description && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: `${DesktopPxToVw(20)} ${DesktopPxToVw(0)} ${DesktopPxToVw(
              0
            )} `,
          }}>
          <Typography variant={isMobile ? "m-body-s" : "body-s"}>
            {props?.description}
          </Typography>
        </Box>
      )}
    </>
  )
}
export default EpicureViewComparision
