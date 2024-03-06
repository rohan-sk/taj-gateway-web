import { Box, Grid, Stack, Typography } from "@mui/material"
import { useMobileCheck } from "../../utils/isMobilView"
import { gridBreakPointsGenerator } from "./SearchResultCards/search-card.component"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { urlFor } from "../../lib-sanity"
import { useAesthetics } from "../../utils/fetchAsthetics"
import { theme } from "../../lib/theme"
import { SheRemainsContainer, SignatureMediaCardContainer } from "./styles/card-with-experience-form"
import { useImageUtility } from "../../utils/hooks/useImageUtility"
import { useEffect, useState } from "react"
import { ICONS } from "../constants"

const LeftMediaCardWithSignatureIcon = ({ title, subTitle, description, logo, largeImage, image, aesthetic }: any) => {
  const isMobile = useMobileCheck()
  const { cardPadding, textColor } = useAesthetics(aesthetic?._ref)
  const { getOptimizeImageUrl } = useImageUtility()
  const [loadedBgImg, setLoadedBgImg] = useState<string | null>(null)

  const imageRef = isMobile ? image?.asset?._ref : largeImage?.asset?._ref

  useEffect(() => {
    const imgUrl = imageRef && getOptimizeImageUrl(urlFor(imageRef)?.url(), isMobile ? 1 : 2)

    if (imgUrl) {
      const img = new Image()
      img.src = imgUrl
      img.onload = () => {
        setLoadedBgImg(img.src)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageRef])
  return (
    <>
      {!loadedBgImg && (
        <SheRemainsContainer>
          <Box
            alt={`taj-loader-img`}
            component={"img"}
            src={ICONS?.TAJ_LOADER}
            sx={{
              width: isMobile ? MobilePxToVw(100) : DesktopPxToVw(100),
              height: isMobile ? MobilePxToVw(100) : DesktopPxToVw(100),
            }}
          />
        </SheRemainsContainer>
      )}
      {loadedBgImg && title && (
        <SignatureMediaCardContainer container>
          <Grid {...gridBreakPointsGenerator(isMobile, 5, 12)}>
            <Stack>
              {loadedBgImg && <Box alt={`-img`} width={"100%"} height={"auto"} component={"img"} src={loadedBgImg} />}
            </Stack>
          </Grid>
          <Grid
            item
            {...gridBreakPointsGenerator(isMobile, 7, 12)}
            justifyContent={"center"}
            px={isMobile ? MobilePxToVw(60) : DesktopPxToVw(80)}
            pb={isMobile ? MobilePxToVw(150) : ""}>
            {title && (
              <Stack>
                <Typography
                  sx={{
                    color: textColor ? textColor : theme?.palette?.ihclPalette?.hexSeventeen,
                  }}
                  variant={isMobile ? "m-heading-s" : "heading-s"}>
                  {title}
                </Typography>
              </Stack>
            )}
            {subTitle && (
              <Stack
                sx={{
                  mt: isMobile ? "5.469vw" : "1.042vw",
                }}>
                <Typography
                  sx={{
                    color: textColor ? textColor : theme?.palette?.ihclPalette?.hexSeventeen,
                  }}
                  variant={isMobile ? "m-body-s" : "body-s"}>
                  {subTitle}
                </Typography>
              </Stack>
            )}
            {description && (
              <Stack sx={{ mt: isMobile ? "5.469vw" : "1.042vw" }}>
                <Typography
                  sx={{
                    color: textColor ? textColor : theme?.palette?.ihclPalette?.hexSeventeen,
                  }}
                  variant={isMobile ? "m-body-s" : "body-s"}>
                  {description}
                </Typography>
              </Stack>
            )}

            {logo?.asset?._ref && (
              <Stack sx={{ mt: isMobile ? "5.469vw" : "1.042vw", width: "100%" }}>
                <Box
                  alt={`-img`}
                  width={"100%"}
                  height={"auto"}
                  component={"img"}
                  src={urlFor(logo?.asset?._ref).url()}
                />
              </Stack>
            )}
          </Grid>
        </SignatureMediaCardContainer>
      )}
    </>
  )
}
export default LeftMediaCardWithSignatureIcon
