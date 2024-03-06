import { Box, Button, Grid, Typography } from "@mui/material"
import { gridBreakPointsGenerator } from "../../../../components/card/SearchResultCards/search-card.component"
import { useMobileCheck } from "../../../../utils/isMobilView"
import {
  CenterGrid,
  IconCell,
  ItemContainer,
  ItemTitleContainer,
  ItemTitleTypography,
  ItemValueContainer,
  PaddedGrid,
  SeparatorWrapper,
  StyledSeparator,
  SubGrid,
  ValueCell,
  ValueTypography,
} from "./hotel-information-card.styles"
import { FullBox } from "../../../../components/forms/business-form/business-sme-form"
import RenderActionItem from "../../../../components/hoc/actions/action-items-ui"

import { useEffect, useState } from "react"
import {
  StyledChevronDown,
  StyledLoadMoreButton,
} from "../../../../components/group/styles/group-with-facilities-styles"
import { CONSTANTS, ICONS } from "../../../../components/constants"
import { getVideoUrl, urlFor } from "../../../../lib-sanity"
import { handler as WeatherAPI } from "../../api/weatherInfo.service"
import useLocation from "../../../../utils/hooks/useLocation"
import { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { useBrowserCheck } from "../../../../utils/hooks/useBrowserCheck"

const HotelInformationCard = ({ data, groupActionType, ctaActionData }: any) => {
  const isMobile = useMobileCheck()
  const getLocation = useLocation()
  const [factSheet, setFactSheet] = useState<any>()
  const [hotelClassification, setHotelClassification] = useState<any>()
  const [viewMoreItems, setViewMoreItems] = useState(false)
  const [currentHotelTemperature, setCurrentHotelTemperature] = useState()
  const hotelInfo = data?.hotelAvailability?.hotelInfo ?? []
  const { isIos } = useBrowserCheck()
  useEffect(() => {
    setViewMoreItems(isMobile ? false : true)
  }, [isMobile])
  useEffect(() => {
    setFactSheet(data?.hotelDocuments?.filter((item: any) => item?.identifier === "hotel-factsheet")?.[0])
    setHotelClassification(
      data?.hotelDocuments?.filter((item: any) => item?.identifier === "hotel-classification")?.[0],
    )
  }, [data])

  const redirectToGoogleMaps = async (DestinationLat: string, DestinationLng: string, url: string) => {
    const origin =
      getLocation?.latitude && getLocation?.longitude ? `${getLocation?.latitude},${getLocation?.longitude}` : ""
    const storeLat = DestinationLat || ""
    const storeLng = DestinationLng || ""
    const destination = storeLat && storeLng ? `${storeLat},${storeLng}` : ""

    if (isIos) {
      window.open(`maps://?saddr=${origin}&daddr=${destination}`, "_blank")
    } else {
      window.open(`${url}?api=1&origin=${origin}&destination=${destination}&travelmode=car`, "_blank")
    }
  }
  useEffect(() => {
    const fetchWatherInfo = async () => {
      const response = await WeatherAPI.apiCall(data?.hotelAddress?.latitude, data?.hotelAddress?.longitude)
      if (response?.data?.main?.temp) {
        setCurrentHotelTemperature(response?.data?.main?.temp)
      }
    }
    if (data?.hotelAddress?.latitude) {
      fetchWatherInfo()
    }
  }, [data?.hotelAddress])

  return (
    <Box>
      <Grid container>
        <SubGrid
          item
          {...gridBreakPointsGenerator(isMobile, 3.775)}
          sx={{
            borderBottomWidth: !isMobile || (isMobile && viewMoreItems) ? "1px " : "0px",
          }}>
          <PaddedGrid container rowGap={isMobile ? "4.668vw" : "0.781vw"}>
            <ItemContainer item sx={{ minHeight: "5.628vw" }}>
              <ItemTitleContainer>
                <ItemTitleTypography>{hotelInfo?.[0]?.title}</ItemTitleTypography>
              </ItemTitleContainer>
              {hotelInfo?.[0]?.list?.length > 0 && (
                <ItemValueContainer>
                  <IconCell>
                    {hotelInfo?.[0]?.icon?.asset?._ref && (
                      <Box
                        alt={`-time-img`}
                        width={isMobile ? "4.688vw" : "1.094vw"}
                        component={"img"}
                        src={urlFor(hotelInfo?.[0]?.icon?.asset?._ref).url()}
                      />
                    )}
                  </IconCell>
                  <ValueCell>
                    {hotelInfo?.[0]?.list?.map((info: any, index: number) => (
                      <FullBox key={index}>
                        <ValueTypography>{info?.item}</ValueTypography>
                      </FullBox>
                    ))}
                  </ValueCell>
                </ItemValueContainer>
              )}
            </ItemContainer>
            <ItemContainer item>
              <ItemTitleContainer>
                <ItemTitleTypography>{hotelInfo?.[2]?.title}</ItemTitleTypography>
              </ItemTitleContainer>
              {hotelInfo?.[2]?.list?.length > 0 && (
                <ItemValueContainer>
                  <IconCell>
                    {hotelInfo?.[2]?.icon?.asset?._ref && (
                      <Box
                        alt={`-time-img`}
                        width={isMobile ? "3.438vw" : "0.938vw"}
                        component={"img"}
                        src={urlFor(hotelInfo?.[2]?.icon?.asset?._ref).url()}
                      />
                    )}
                  </IconCell>
                  {hotelInfo?.[2]?.list?.map((info: any, index: number) => (
                    <FullBox key={index}>
                      <ValueTypography>{info?.item}</ValueTypography>
                    </FullBox>
                  ))}
                </ItemValueContainer>
              )}
            </ItemContainer>
            {(!isMobile || (isMobile && viewMoreItems)) && (
              <ItemContainer item sx={{ border: "none" }}>
                <ItemTitleContainer>
                  <ItemTitleTypography>{hotelInfo?.[4]?.title}</ItemTitleTypography>
                </ItemTitleContainer>
                {currentHotelTemperature !== undefined && (
                  <ItemValueContainer>
                    <IconCell>
                      {hotelInfo?.[4]?.icon?.asset?._ref && (
                        <Box
                          alt={`-temp-img`}
                          width={isMobile ? "1.875vw" : "0.625vw"}
                          component={"img"}
                          src={urlFor(hotelInfo?.[4]?.icon?.asset?._ref).url()}
                        />
                      )}
                    </IconCell>
                    <ValueCell>
                      <FullBox>
                        <ValueTypography>{`${currentHotelTemperature}`}&deg;c</ValueTypography>
                      </FullBox>
                    </ValueCell>
                  </ItemValueContainer>
                )}
              </ItemContainer>
            )}
          </PaddedGrid>
        </SubGrid>
        {!isMobile && (
          <PaddedGrid item {...gridBreakPointsGenerator(isMobile, 0.3375)}>
            <SeparatorWrapper>
              <StyledSeparator orientation={"vertical"} />
            </SeparatorWrapper>
          </PaddedGrid>
        )}
        <SubGrid
          item
          sx={{
            borderBottomWidth: !isMobile || (isMobile && viewMoreItems) ? "1px " : "0px",
          }}
          {...gridBreakPointsGenerator(isMobile, 3.775)}>
          <PaddedGrid container rowGap={isMobile ? "4.668vw" : "0.781vw"}>
            {(!isMobile || (isMobile && viewMoreItems)) && (
              <ItemContainer item sx={{ minHeight: "5.628vw" }}>
                <ItemTitleContainer>
                  <ItemTitleTypography>{hotelInfo?.[1]?.title}</ItemTitleTypography>
                </ItemTitleContainer>
                {hotelInfo?.[1]?.list?.length > 0 && (
                  <ItemValueContainer>
                    <IconCell>
                      {hotelInfo?.[1]?.icon?.asset?._ref && (
                        <Box
                          alt={`-temp-img`}
                          width={isMobile ? "3.75vw" : "1.25vw"}
                          component={"img"}
                          src={urlFor(hotelInfo?.[1]?.icon?.asset?._ref).url()}
                        />
                      )}
                    </IconCell>
                    <ValueCell>
                      {hotelInfo?.[1]?.list?.map((info: any, index: number) => (
                        <FullBox key={index}>
                          <ValueTypography>{info?.item}</ValueTypography>
                        </FullBox>
                      ))}
                    </ValueCell>
                  </ItemValueContainer>
                )}
              </ItemContainer>
            )}
            <ItemContainer item>
              <ItemTitleContainer>
                <ItemTitleTypography>{hotelInfo?.[3]?.title}</ItemTitleTypography>
              </ItemTitleContainer>
              {hotelInfo?.[3]?.list?.length > 0 && (
                <ItemValueContainer>
                  <IconCell>
                    {hotelInfo?.[3]?.icon?.asset?._ref && (
                      <Box
                        alt={`-temp-img`}
                        width={isMobile ? "4.063vw" : "1.354vw"}
                        component={"img"}
                        src={urlFor(hotelInfo?.[3]?.icon?.asset?._ref).url()}
                      />
                    )}
                  </IconCell>
                  <ValueCell>
                    <FullBox>
                      {hotelInfo?.[3]?.list?.map((info: any, index: number) => (
                        <FullBox key={index}>
                          <ValueTypography>{info?.item}</ValueTypography>
                        </FullBox>
                      ))}
                    </FullBox>
                  </ValueCell>
                </ItemValueContainer>
              )}
            </ItemContainer>
            {(!isMobile || (isMobile && viewMoreItems)) && (
              <ItemContainer item sx={{ border: "none" }}>
                <ItemTitleContainer>
                  <ItemTitleTypography>{hotelInfo?.[5]?.title}</ItemTitleTypography>
                </ItemTitleContainer>
                <ItemValueContainer>
                  {hotelInfo?.[5]?.icon?.asset?._ref && (
                    <IconCell>
                      <Box
                        alt={`-temp-img`}
                        width={"auto"}
                        maxHeight={"100%"}
                        component={"img"}
                        src={urlFor(hotelInfo?.[5]?.icon?.asset?._ref).url()}
                      />
                    </IconCell>
                  )}
                  <ValueCell>
                    {hotelInfo?.[5]?.list?.map((info: any, index: number) => (
                      <FullBox key={index}>
                        <ValueTypography>{info?.item}</ValueTypography>
                      </FullBox>
                    ))}
                  </ValueCell>
                </ItemValueContainer>
              </ItemContainer>
            )}
          </PaddedGrid>
        </SubGrid>
        {!isMobile && (
          <PaddedGrid item {...gridBreakPointsGenerator(isMobile, 0.3375)}>
            <SeparatorWrapper>
              <StyledSeparator orientation={"vertical"} />
            </SeparatorWrapper>
          </PaddedGrid>
        )}
        <SubGrid item {...gridBreakPointsGenerator(isMobile, 3.775)}>
          <PaddedGrid container height={"100%"} alignContent={"space-between"}>
            <ItemContainer item sx={{ border: "unset" }}>
              <ItemTitleContainer>
                <ItemTitleTypography>{"CONTACT"}</ItemTitleTypography>
              </ItemTitleContainer>
              <ItemValueContainer>
                {hotelInfo?.[7]?.icon?.asset?._ref && (
                  <IconCell>
                    <Box
                      alt={`-temp-img`}
                      width={isMobile ? "2.813vw" : "0.933vw"}
                      component={"img"}
                      src={
                        hotelInfo?.[7]?.icon?.asset?._ref?.length > 0
                          ? urlFor(hotelInfo?.[7]?.icon?.asset?._ref).url()
                          : ""
                      }
                    />
                  </IconCell>
                )}
                <ValueCell>
                  <FullBox>
                    {hotelInfo?.[7]?.list?.length > 0 && (
                      <ValueTypography>
                        {hotelInfo?.[7]?.list?.map((info: any) => info?.item ?? "")?.join(" ")}
                      </ValueTypography>
                    )}
                  </FullBox>
                  <FullBox>
                    <RenderActionItem
                      title={"VIEW MAP"}
                      url={""}
                      onClick={() => {
                        redirectToGoogleMaps(
                          data?.hotelAddress?.latitude,
                          data?.hotelAddress?.longitude,
                          ctaActionData?.url || "https://www.google.com/maps/dir/",
                        )
                      }}
                      variant={"light-contained"}
                      isActionButtonType={false}
                      navigationType={"dialog"}
                      buttonStyles={{
                        maxWidth: "fit-content",
                      }}
                    />
                  </FullBox>
                </ValueCell>
              </ItemValueContainer>
            </ItemContainer>
            {hotelInfo?.[6]?.list?.length > 0 && (
              <ItemValueContainer sx={{ pb: isMobile ? "6.25vw" : "" }}>
                {hotelInfo?.[6]?.icon?.asset?._ref && (
                  <IconCell sx={{ pr: isMobile ? "1vw" : "" }}>
                    <Box
                      alt={`-temp-img`}
                      width={isMobile ? "3.821vw" : "0.93vw"}
                      component={"img"}
                      src={urlFor(hotelInfo?.[6]?.icon?.asset?._ref).url()}
                    />
                  </IconCell>
                )}
                <ValueCell>
                  {hotelInfo?.[6]?.list?.map((info: any, index: number) => (
                    <FullBox key={index}>
                      <ValueTypography>{info?.item}</ValueTypography>
                    </FullBox>
                  ))}
                </ValueCell>
              </ItemValueContainer>
            )}
            {hotelInfo?.[8]?.list?.length > 0 && (
              <ItemValueContainer>
                {hotelInfo?.[8]?.icon?.asset?._ref && (
                  <IconCell>
                    <Box
                      alt={`-temp-img`}
                      width={isMobile ? "3.594vw" : "0.93vw"}
                      component={"img"}
                      src={urlFor(hotelInfo?.[8]?.icon?.asset?._ref).url()}
                    />
                  </IconCell>
                )}
                <ValueCell>
                  {isMobile
                    ? hotelInfo?.[8]?.list?.length > 0 && (
                        <ValueTypography>
                          {hotelInfo?.[8]?.list?.map((info: any) => info?.item ?? "")?.join(", ")}
                        </ValueTypography>
                      )
                    : hotelInfo?.[8]?.list?.map((info: any, index: number) => (
                        <FullBox key={index}>
                          <ValueTypography>{info?.item}</ValueTypography>
                        </FullBox>
                      ))}
                  {isMobile && (
                    <FullBox mb={MobilePxToVw(44)}>
                      <a href={`tel:${hotelInfo?.[8]?.list?.[0]?.item}`}>
                        <RenderActionItem
                          url={""}
                          variant={"light-contained"}
                          title={"CALL NOW"}
                          isActionButtonType={true}
                          navigationType={"internal"}
                          buttonStyles={{
                            width: "61.875vw",
                            marginTop: MobilePxToVw(55),
                          }}
                        />
                      </a>
                    </FullBox>
                  )}
                </ValueCell>
              </ItemValueContainer>
            )}
          </PaddedGrid>
        </SubGrid>
      </Grid>
      {(!isMobile || (isMobile && viewMoreItems)) && (
        <Grid
          container
          justifyContent={"center"}
          gap={"1.823vw"}
          sx={{
            marginTop: "2.083vw",
            paddingBottom: isMobile ? "4.688vw" : "",
          }}>
          {groupActionType?.[0] && factSheet?.file?.asset?._ref && (
            <Grid container={isMobile} item={isMobile} justifyContent={"center"}>
              <RenderActionItem
                url={`${getVideoUrl(factSheet?.file)}`}
                image={groupActionType?.[0]?.ctaLabel?.image}
                variant={"light-contained"}
                title={groupActionType?.[0]?.ctaLabel?.title}
                isActionButtonType={false}
                navigationType={"dialog"}
                buttonStyles={{
                  maxWidth: "fit-content",
                  display: "flex",
                  gap: "0.521vw",
                }}
                onClick={() => {
                  window?.open(`${getVideoUrl(factSheet?.file)}`)
                }}
              />
            </Grid>
          )}

          {groupActionType?.[1] && hotelClassification?.file?.asset?._ref && (
            <Grid container={isMobile} item={isMobile} justifyContent={"center"}>
              <RenderActionItem
                url={getVideoUrl(hotelClassification?.file)}
                image={groupActionType?.[1]?.ctaLabel?.image}
                variant={"light-contained"}
                title={groupActionType?.[1]?.ctaLabel?.title}
                isActionButtonType={false}
                navigationType={"dialog"}
                buttonStyles={{
                  maxWidth: "fit-content",
                  display: "flex",
                  gap: "0.521vw",
                }}
                onClick={() => {
                  window?.open(`${getVideoUrl(hotelClassification?.file)}`)
                }}
              />
            </Grid>
          )}
        </Grid>
      )}
      {isMobile && (
        <Grid container justifyContent={"center"}>
          <StyledLoadMoreButton
            variant="outlined"
            onClick={() => {
              setViewMoreItems((previousState) => !previousState)
            }}>
            <Typography>{`${CONSTANTS?.VIEW} ${!viewMoreItems ? CONSTANTS?.MORE : CONSTANTS?.LESS}`}</Typography>
            <StyledChevronDown $more={!viewMoreItems} />
          </StyledLoadMoreButton>
        </Grid>
      )}
    </Box>
  )
}
export default HotelInformationCard
