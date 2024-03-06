import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useMobileCheck } from "../../../../utils/isMobilView"
import {
  MemberShipCardWrapper,
  SpacerBox,
} from "../OverViewGiftCard/styles/over-view-membership-card"
import { urlFor } from "../../../../lib-sanity"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
const MembershipCardComponent = ({ item }: any) => {
  const isMobile = useMobileCheck()
  return (
    <>
      {item !== undefined && (
        <MemberShipCardWrapper
          $isMobile={isMobile}
          $isChamber={item?.title === "THE CHAMBERS"}>
          <SpacerBox $isMobile={isMobile}>
            <Typography
              variant={isMobile ? "m-body-s" : "body-s"}
              sx={{ fontWeight: 400 }}>
              {item?.membership}
            </Typography>
          </SpacerBox>
          <SpacerBox $isMobile={isMobile}>
            {(item?.image?.image?.asset?._ref ||
              item?.image?.largeImage?.asset?._ref) && (
              <Box
                component={"img"}
                width={isMobile ? MobilePxToVw(200) : DesktopPxToVw(270)}
                height={isMobile ? MobilePxToVw(133) : DesktopPxToVw(180)}
                src={urlFor(
                  isMobile
                    ? item?.image?.smallImage?.asset?._ref
                    : item?.image?.largeImage?.asset?._ref
                )?.url()}
              />
            )}
          </SpacerBox>
          <Box sx={{ minHeight: isMobile ? "5vw" : "1.8vw" }}>
            <Typography
              variant={isMobile ? "m-body-sl" : "body-ml"}
              sx={{
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}>
              {item?.type}
            </Typography>
          </Box>
        </MemberShipCardWrapper>
      )}
    </>
  )
}
export default MembershipCardComponent
