import React, { useContext, useEffect, useState } from "react"
import { AccordionSummary, Box, Grid, Typography } from "@mui/material"
import dynamic from "next/dynamic"
import {
  AccordionStyle,
  MapAccordionDetailsStyled,
  MapCallingBox,
  TitleBoxStyled,
} from "../../../components/faq/style"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { useMobileCheck } from "../../../utils/isMobilView"
const CustomMap = dynamic(() =>  import("../../../components/accordion/custom-map"))
import { Add, Remove } from "@mui/icons-material"
const MultiRowTitle = dynamic(() => import("../../../components/hoc/title/multi-row-title"))
import useLocation from "../../../utils/hooks/useLocation"
const RenderActionItem = dynamic(() => import("../../../components/hoc/actions/action-items-ui"))
import { useBrowserCheck } from "../../../utils/hooks/useBrowserCheck"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { GLOBAL_STORES } from "../../../utils/Constants"
import { PropertyStore } from "../../../store"

const HotelLocationDirections = ({
  cardLargeVariant,
  groupLargeVariant,
  aesthetic,
  contentType,
  primaryAction,
  secondaryAction,
  charactersLimit,
  cardCharactersLimit,
  mobileCharactersLimit,
  mobileCardCharactersLimit,
  alignmentVariant,
  cardActionType,
  title,
  isHidden = false,
}: any) => {
  const getLocation = useLocation()
  const isMobile = useMobileCheck()
  const ihclContext = useContext(IHCLContext)
  const { propertyData } = ihclContext?.getGlobalStore(
    GLOBAL_STORES?.propertyStore
  ) as PropertyStore
  const { isSafari, isIos } = useBrowserCheck()
  const [sectionTitle, setTitle] = useState<any>()
  const [componentData, setComponentData] = useState<any>([])
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  let ctaActionData = cardActionType?.find(
    (action: any) => action?.actionType === "ctaLabel"
  )?.ctaLabel
  useEffect(() => {
    if (contentType === "hotelAddress") {
      setComponentData(propertyData?.hotelAddress?.locationAndDirectionsInfo)
      setTitle(propertyData?.hotelAddress?.sectionTitle)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertyData?.hotelId])

  const handleClick = (index: number) => {
    setSelectedIndex(index)
    index === selectedIndex ? setSelectedIndex(0) : setSelectedIndex(index)
  }
  const TitleVisibleAlignment = () => {
    return (
      <TitleBoxStyled>
        <MultiRowTitle
          subTitle={undefined}
          charactersLimit={isMobile ? mobileCharactersLimit : charactersLimit}
          alignmentVariant={alignmentVariant}
          aesthetic={aesthetic}
          isComponentFullWidth={false}
          isMobileComponentFullWidth={false}
          {...{
            title: { ...sectionTitle, headingElement: title?.headingElement },
          }}
        />
      </TitleBoxStyled>
    )
  }

  const redirectToGoogleMaps = async (
    DestinationLat: string,
    DestinationLng: string,
    url: string
  ) => {
    const origin =
      getLocation?.latitude && getLocation?.longitude
        ? `${getLocation?.latitude},${getLocation?.longitude}`
        : ""
    const storeLat = DestinationLat || ""
    const storeLng = DestinationLng || ""
    const destination = storeLat && storeLng ? `${storeLat},${storeLng}` : ""

    if (isIos) {
      window.open(`maps://?saddr=${origin}&daddr=${destination}`, "_blank")
    } else {
      window.open(
        `${url}?api=1&origin=${origin}&destination=${destination}&travelmode=car`,
        "_blank"
      )
    }
  }
  return (
    <>
      {componentData?.length > 0 && !isHidden && (
        <Box
          sx={{
            background: aesthetic?.isGradientEnabled
              ? `${aesthetic?.gradient}`
              : aesthetic?.backgroundColor?.hex,
            padding: isMobile
              ? aesthetic?.padding?.mobile
              : aesthetic?.padding?.desktop,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}>
          {isMobile && <TitleVisibleAlignment />}
          <Grid
            container
            columnSpacing={DesktopPxToVw(40)}
            direction={isMobile ? "column-reverse" : "row"}
            sx={{ marginTop: isMobile ? "-20px" : "" }}>
            <Grid item xl={6} lg={6} md={6} sm={isMobile ? 6 : 12} xs={12}>
              {!isMobile && <TitleVisibleAlignment />}
              {isMobile && (
                <Box mb={MobilePxToVw(40)}>
                  <MapCallingBox
                    sx={
                      isSafari
                        ? {
                            "& .MuiBox-root": {
                              width: "75vw !important",
                              height: "65vw !important",
                            },
                          }
                        : {}
                    }>
                    <CustomMap
                      center={{
                        lat: componentData?.[selectedIndex]?.locationDetails
                          ?.latitude
                          ? JSON.parse(
                              componentData?.[selectedIndex]?.locationDetails
                                ?.latitude
                            )
                          : 0,
                        lng: componentData?.[selectedIndex]?.locationDetails
                          ?.longitude
                          ? JSON.parse(
                              componentData?.[selectedIndex]?.locationDetails
                                ?.longitude
                            )
                          : 0,
                      }}
                      isTajPropertylogo={true}
                    />
                  </MapCallingBox>
                </Box>
              )}
              <Box sx={{ marginTop: !isMobile ? "-30px" : "" }}>
                {componentData?.map((item: any, index: number) => (
                  <AccordionStyle
                    key={index}
                    square={true}
                    elevation={0}
                    expanded={index === selectedIndex ? true : false}>
                    <AccordionSummary
                      onClick={() => handleClick(index)}
                      expandIcon={
                        selectedIndex === index ? (
                          <Remove style={{ fontSize: "20px" }} />
                        ) : (
                          <Add style={{ fontSize: "20px" }} />
                        )
                      }>
                      <Typography
                        variant={isMobile ? "m-heading-xs" : "heading-xs"}>
                        {item?.basicInfo?.title}
                      </Typography>
                    </AccordionSummary>
                    <MapAccordionDetailsStyled
                      sx={
                        index == 0
                          ? { maxWidth: "100%!important", padding: "0" }
                          : {}
                      }>
                      <Typography
                        sx={{
                          marginBottom: isMobile ? "1.563vw" : "1vw",
                          fontSize: isMobile
                            ? MobilePxToVw(22)
                            : DesktopPxToVw(22),
                          fontWeight: "300",
                        }}>
                        {item?.basicInfo?.description}
                      </Typography>

                      {index === 0 && (
                        <RenderActionItem
                          url={""}
                          onClick={() =>
                            redirectToGoogleMaps(
                              componentData?.[selectedIndex]?.locationDetails
                                ?.latitude,

                              componentData?.[selectedIndex]?.locationDetails
                                ?.longitude,
                              ctaActionData?.url
                            )
                          }
                          title={ctaActionData?.title}
                          navigationType={ctaActionData?.urlType}
                          variant={ctaActionData?.variant}
                          isActionButtonType={
                            ctaActionData?.variant === "link" ? false : true
                          }
                          buttonImgStyles={{
                            margin: isMobile ? "8vw 0vw" : "2vw 0vw",
                          }}
                        />
                      )}
                    </MapAccordionDetailsStyled>
                  </AccordionStyle>
                ))}
              </Box>
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={isMobile ? 6 : 12} xs={12}>
              {!isMobile && (
                <MapCallingBox
                  sx={
                    isSafari
                      ? {
                          "& .MuiBox-root": {
                            width: "36vw !important",
                            height: "31vw !important",
                          },
                        }
                      : {}
                  }>
                  <CustomMap
                    center={{
                      lat: componentData?.[selectedIndex]?.locationDetails
                        ?.latitude
                        ? JSON.parse(
                            componentData?.[selectedIndex]?.locationDetails
                              ?.latitude
                          )
                        : 0,
                      lng: componentData?.[selectedIndex]?.locationDetails
                        ?.longitude
                        ? JSON.parse(
                            componentData?.[selectedIndex]?.locationDetails
                              ?.longitude
                          )
                        : 0,
                    }}
                    isTajPropertylogo={true}
                  />
                </MapCallingBox>
              )}
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  )
}

export default HotelLocationDirections
