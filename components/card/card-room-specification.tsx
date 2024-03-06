import React, { useContext, useState } from "react"
import { Box, Button, Divider, Grid, List, Typography } from "@mui/material"
import dynamic from "next/dynamic"
import { useMobileCheck } from "../../utils/isMobilView"
import {
  BoxContainer,
  BoxWrapper,
  GalleryButton,
  ButtonsWrapper,
  RequestButton,
  StyledText,
  StyledTypography,
  SubTitle,
  Title,
  UnOrderedList,
} from "../venueDetails/Styles"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import { urlFor } from "../../lib-sanity"
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))
const BasicModal = dynamic(() => import("../hoc/modal/modal"))
const GalleryCarousel = dynamic(() =>
import("../GalleryCarousel/GalleryCarousel").then((module) => module.GalleryCarousel)
)

const CardRoomSpecification = ({
  content,
  description,
  isMultiBlockContent,
  primaryAction,
  secondaryAction,
  title,
  url,
  urlType,
}: any) => {
  const context = useContext(IHCLContext)

  const commentBoxStyle = {
    color: "#AD8B3A",
    cursor: "pointer",
  }

  const ReadMore = ({ children }: any) => {
    const text = children
    const [isReadMore, setIsReadMore] = useState(true)
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore)
    }
    return (
      <StyledText variant={isMobile ? "body-l" : "body-ml"}>
        {isReadMore ? text?.slice(0, 180) : text}
        {text?.length > 100 && (
          <span onClick={toggleReadMore} style={commentBoxStyle} contentEditable="false">
            {isReadMore ? "...read more" : " read less"}
          </span>
        )}
      </StyledText>
    )
  }
  const isMobile = useMobileCheck()
  // const data = info?.data
  return (
    <Box
      sx={{
        margin: "0vw 18.90vw",
        boxShadow: "rgba(0, 0, 0, 0.1) -6px 10px 24px",
      }}>
      <Grid>
        {/* {showGallery ? (
        <GalleryCarousel />
      ) : ( */}
        <BoxWrapper>
          {/* commented this Title as of now due to Title changes */}
          {/* <Title variant={"heading-s"}>{title}</Title> */}
          <ReadMore>{description}</ReadMore>
          {/* <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            {item?.dimensions?.map((item: any, index: number) => {
              return (
                <Box
                  key={index}
                  sx={{ display: "flex", margin: "2% 3% 2% 0%" }}
                >
                  <Typography sx={{ paddingRight: "10px" }}>
                    <img src={item?.icon} alt="icon" />
                  </Typography>
                  <Typography variant="body-ml">{item?.dimension}</Typography>
                </Box>
              )
            })}
          </Box>
          <StyledTypography variant="body-ml">
            <img
              src={item?.starIcon}
              alt="icon"
              style={{ paddingRight: "2%" }}
            />
            {item?.text}
          </StyledTypography>
          <Divider sx={{ margin: "15px 0px" }} />
          <Box sx={{ marginTop: "2%" }}>
            <Title variant="body-l">{item?.ServicesAndAmenities}</Title>
            <UnOrderedList>
              {item?.Services?.map((item: any, index: number) => {
                return <li key={index}>{item?.text} </li>
              })}
            </UnOrderedList>
          </Box>
          <Box>
            <Title variant="body-l"> {item?.TechnologyTitle}</Title>
            <UnOrderedList>
              <li>{item?.TechnologySubTitle} </li>
            </UnOrderedList>
          </Box>
          <Box>
            <Title variant="body-l"> {item?.SeatingStyle}</Title>
            <BoxContainer>
              {item?.Seating?.map((item: any, index: number) => {
                return (
                  <li style={{ marginRight: "16%" }} key={index}>
                    {item?.text}
                  </li>
                )
              })}
            </BoxContainer>
          </Box>
          <Divider /> */}

          {content?.map((item: any, index: Number) => context?.renderComponent(item?._type, item))}
          <ButtonsWrapper>
            <RenderActionItem
              url={primaryAction?.url}
              title={primaryAction?.title}
              variant={primaryAction?.variant}
              navigationType={primaryAction?.urlType}
              isActionButtonType={true}
            />
            <RenderActionItem
              isActionButtonType={true}
              url={secondaryAction?.url}
              title={secondaryAction?.title}
              variant={secondaryAction?.variant}
              navigationType={secondaryAction?.urlType}
              image={secondaryAction?.image?.asset?._ref}
              buttonStyles={{
                display: "flex",
                minWidth: "12.7vw",
                justifyContent: "flex-start",
              }}
              buttonImgStyles={{
                width: "3.5vw",
                height: "auto",
                objectFit: "contain",
                marginRight: "1.5vw",
              }}
            />
          </ButtonsWrapper>
        </BoxWrapper>
        {/* )} */}
      </Grid>
    </Box>
  )
}

export default CardRoomSpecification
