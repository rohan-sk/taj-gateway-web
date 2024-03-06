import { Stack } from "@mui/material"
import { theme } from "../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { useMobileCheck } from "../../utils/isMobilView"
import {
  ContentTypography,
  StyledTypography,
} from "../forms/enquiry-forms/safaris-enquire-form/safaris-enquire-form.styles"
import CallIcon from "@mui/icons-material/Call"
import { Box } from "@mui/system"
import { PortableText } from "../../lib/portable-text-serializers"

const ReservationContactsCard = ({
  url,
  content,
  title,
  subTitle,
  ctaLabel,
  variant,
  image,
  urlType,
  mediaType,
  highLights,
  highlights,
  description,
  largeVariant,
  largeImage,
  videoAsset,
  alignmentVariant,
  charactersLimit,
  richText,
  primaryAction,
  showDividerForTitle,
  isMultiBlockContent,
  parameterMap,
}: any) => {
  const isMobile = useMobileCheck()
  return (
    <Stack gap={isMobile ? MobilePxToVw(20) : DesktopPxToVw(20)} flexDirection={isMobile ? "row" : "column"}>
      <Stack flexShrink={0} sx={{ width: isMobile ? MobilePxToVw(300) : "100%" }}>
        <StyledTypography sx={{ fontWeight: 700 }} variant={isMobile ? "m-body-sxl" : "body-ml"}>
          {title}
        </StyledTypography>
      </Stack>
      {highlights?.length > 0 && (
        <Stack>
          {highlights?.map((item: any, index: number) => {
            return (
              <Stack
                key={index}
                flexDirection={"row"}
                alignItems={isMobile ? "start" : "center"}
                gap={isMobile ? MobilePxToVw(7) : ""}>
                <CallIcon
                  style={{
                    marginRight: isMobile ? MobilePxToVw(12) : DesktopPxToVw(12),
                    color: theme?.palette?.ihclPalette?.hexOne,
                    width: isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
                  }}
                />
                {!isMobile ? (
                  <StyledTypography sx={{ lineHeight: "140%" }} variant={"body-s"}>
                    {item?.term}
                  </StyledTypography>
                ) : (
                  <Stack>
                    <StyledTypography sx={{ lineHeight: "140%" }} variant={"m-body-s"}>
                      {item?.term}
                    </StyledTypography>
                  </Stack>
                )}
              </Stack>
            )
          })}
        </Stack>
      )}
      {content?.map((item: any, index: number) => (
        <Box key={index}>
          <PortableText blocks={item} key={index} />
        </Box>
      ))}
    </Stack>
  )
}
export default ReservationContactsCard
