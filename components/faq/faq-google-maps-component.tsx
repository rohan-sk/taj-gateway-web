import React from "react"
import { Typography, AccordionSummary, Grid, Box } from "@mui/material"
import dynamic from "next/dynamic"
import { Add, Remove } from "@mui/icons-material"
import FetchGoogleApi from "../accordion/google-map"
import {
  AccordionStyle,
  MapAccordionDetailsStyled,
  MapCallingBox,
  StyledAccordionSummary,
  TitleBoxStyled,
} from "./style"
import { useMobileCheck } from "../../utils/isMobilView"
import { theme } from "../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
const CustomMap =dynamic(() => import("../accordion/custom-map"))
const TwoRowTitle =dynamic(() => import("../hoc/title/TwoRowTitle"))
const PortableText = dynamic(() =>
import("../../lib/portable-text-serializers").then((module) => module.PortableText)
)

const FaqGoogleMapComponent = ({ props }: any) => {
  const coordinates = [
    { lat: 26.8982, lng: 75.8082 },
    { lat: 26.8289, lng: 75.8057 },
    { lat: 26.8956, lng: 75.8073 },
  ]
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const isMobile = useMobileCheck()
  const handleClick = (index: number) => {
    setSelectedIndex(index)
    index === selectedIndex ? setSelectedIndex(-1) : setSelectedIndex(index)
  }
  const TitleVisibleAlignment = () => {
    return (
      <TitleBoxStyled>
        <TwoRowTitle
          title={props?.title}
          isMobile={isMobile}
          width={isMobile ? "95%" : "25vw"}
          fontSize={isMobile ? "7.5vw" : "3.22vw"}
          dividerWidth={isMobile ? "6.25vw" : "2.166vw"}
          color={theme?.palette?.text?.primary}
        />
      </TitleBoxStyled>
    )
  }
  return (
    <Box>
      {isMobile && <TitleVisibleAlignment />}
      <Grid
        container
        columnSpacing={DesktopPxToVw(40)}
        direction={isMobile ? "column-reverse" : "row"}>
        <Grid item xl={6} lg={6} md={6} sm={isMobile ? 12 : 6} xs={12}>
          {!isMobile && <TitleVisibleAlignment />}
          {props?.items?.map((item: any, index: number) => (
            <AccordionStyle
              key={index}
              square={true}
              elevation={0}
              expanded={index === selectedIndex ? true : false}>
              <StyledAccordionSummary
                onClick={() => handleClick(index)}
                expandIcon={selectedIndex === index ? <Remove style={{ fontSize: "20px" }}/> : <Add style={{ fontSize: "20px" }}/>}>
                <Typography variant={isMobile ? "m-heading-xs" : "heading-xs"}>
                  {item?.question}
                </Typography>
              </StyledAccordionSummary>
              <MapAccordionDetailsStyled
                sx={
                  index == 0 ? { maxWidth: "100%!important", padding: "0" } : {}
                }>
                <PortableText blocks={item?.answer} />
                {isMobile && (
                  <Box my={MobilePxToVw(40)}>
                    <MapCallingBox sx={{ width: "100%" }}>
                      <CustomMap center={coordinates[index]} />
                    </MapCallingBox>
                  </Box>
                )}
              </MapAccordionDetailsStyled>
            </AccordionStyle>
          ))}
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={isMobile ? 12 : 6} xs={12}>
          {!isMobile && (
            <MapCallingBox>
              <CustomMap center={coordinates[selectedIndex]} />
              {/* <FetchGoogleApi /> */}
            </MapCallingBox>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}
export default FaqGoogleMapComponent
