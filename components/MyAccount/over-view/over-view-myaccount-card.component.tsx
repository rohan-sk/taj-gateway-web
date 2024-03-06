import { Box, Grid, Stack, Typography } from "@mui/material"
import React, { Fragment } from "react"
import { CONSTANTS } from "../../constants"
import { useMobileCheck } from "../../../utils/isMobilView"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { urlFor } from "../../../lib-sanity"
import { ROOM_IMG } from "../../forms/gift-card-form/constants"
import RenderActionItem from "../../hoc/actions/action-items-ui"
import { formatDateWithMON } from "../../../utils/getDate"
import { theme } from "../../../lib/theme"
import CustomReadMore from "../../hoc/CustomReadMore"
import { useImageUtility } from "../../../utils/hooks/useImageUtility"

const OverViewMyAccountCard = ({ item, indexIdentifier, primaryAction }: any) => {
  const isMobile = useMobileCheck()
  const { getOptimizeImageUrl } = useImageUtility()
  const OfferImage = item?.thumbnail?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref
    ? isMobile
      ? urlFor(item?.thumbnail?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref)?.url()
      : urlFor(item?.thumbnail?.[0]?.imageAsset?.image?.[0]?.asset?._ref)?.url()
    : ROOM_IMG

  return (
    <Fragment key={indexIdentifier}>
      {isMobile ? (
        <Grid
          sx={{
            border: `1px solid ${theme?.palette?.ihclPalette?.hexTwentyFive}`,
          }}>
          <Box
            sx={{
              width: "100%",
              height: MobilePxToVw(323),
            }}
            component={"img"}
            src={getOptimizeImageUrl(OfferImage, 3)}
          />
          <Box sx={{ padding: "5vw" }}>
            <Typography
              sx={{ lineHeight: "140%" }}
              variant={isMobile ? "m-heading-xs" : "heading-xs"}
              mt={isMobile ? "3.125vw" : "1.042vw"}>
              {item?.title?.toUpperCase()}
            </Typography>

            <CustomReadMore variant={isMobile ? "m-body-s" : "body-s"} length={110}>
              {item?.description}
            </CustomReadMore>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: "3.125vw",
              }}>
              <Box>
                <Stack width={"100%"} rowGap={DesktopPxToVw(10)} sx={{ marginBottom: "1.813vw" }}>
                  <Stack width={"100%"} flexDirection="row" columnGap={DesktopPxToVw(20)}>
                    <Stack width={"100%"} flexDirection="row" gap={DesktopPxToVw(5)}>
                      <Typography variant={"m-body-xs"}>{CONSTANTS?.Balance_Expiry_Date}</Typography>
                    </Stack>
                  </Stack>
                </Stack>
                <Typography variant={"m-body-s"} style={{ fontWeight: 700 }}>
                  {item?.validThroughYear
                    ? "Round the Year"
                    : item?.validityDates?.[0]?.toDate
                    ? `${formatDateWithMON(item?.validityDates?.[0]?.toDate)}`
                    : "No Restrictions"}
                </Typography>
              </Box>
              <RenderActionItem
                buttonStyles={{
                  backgroundColor: theme?.palette?.ihclPalette?.hexTwo,
                  color: theme?.palette?.ihclPalette?.hexOne,
                }}
                url={`${primaryAction?.url}/${item?.identifier}`}
                title={primaryAction?.title}
                navigationType={primaryAction?.urlType}
                variant={primaryAction?.variant}
                isActionButtonType={true}
              />
            </Grid>
          </Box>
        </Grid>
      ) : (
        <Grid
          container
          sx={{
            display: "flex",
            border: `1px solid ${theme?.palette?.ihclPalette?.hexTwentyFive}`,
          }}>
          <Grid item sx={{ flexBasis: "75%", display: "flex" }}>
            <Box
              sx={{
                width: "10.052vw",
                objectFit: "cover",
                height: "100%",
              }}
              component={"img"}
              src={getOptimizeImageUrl(OfferImage, 5)}
            />
            <Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"} sx={{ padding: "1.563vw" }}>
              <Typography
                sx={{ lineHeight: "140%" }}
                variant={isMobile ? "m-heading-xs" : "heading-xs"}
                mt={isMobile ? "3.125vw" : "1.042vw"}>
                {item?.title?.toUpperCase()}
              </Typography>
              <CustomReadMore variant={isMobile ? "m-body-s" : "body-s"} length={140}>
                {item?.description}
              </CustomReadMore>
              <Stack width={"100%"} rowGap={DesktopPxToVw(10)}>
                <Stack width={"100%"} flexDirection="row" columnGap={DesktopPxToVw(20)}>
                  <Stack width={"100%"} flexDirection="row" gap={DesktopPxToVw(5)}>
                    <Typography variant={"body-xs"}>{CONSTANTS?.Balance_Expiry_Date}:</Typography>
                    <Typography variant={"body-s"} style={{ fontWeight: 700 }}>
                      {item?.validThroughYear
                        ? "Round the Year"
                        : item?.validityDates?.[0]?.toDate
                        ? `${formatDateWithMON(item?.validityDates?.[0]?.toDate)}`
                        : "No Restrictions"}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </Grid>
          <Grid flexBasis={"25%"} display={"flex"} alignItems={"center"}>
            <RenderActionItem
              buttonStyles={{
                backgroundColor: theme?.palette?.ihclPalette?.hexTwo,
                color: theme?.palette?.ihclPalette?.hexOne,
              }}
              url={`${primaryAction?.url}/${item?.identifier}`}
              title={primaryAction?.title}
              navigationType={primaryAction?.urlType}
              variant={primaryAction?.variant}
              isActionButtonType={true}
            />
          </Grid>
        </Grid>
      )}
    </Fragment>
  )
}

export default OverViewMyAccountCard
