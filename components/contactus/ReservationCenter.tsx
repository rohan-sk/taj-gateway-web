import React, { useContext } from "react"
import { theme } from "../../lib/theme"
import { Box, Divider, Typography } from "@mui/material"
import {
  FlexBox,
  SubtitleBox,
  CountryName,
  CountryPhone,
  ContactDetailBox,
  BorderBox,
  MainBox,
  TitleTypography,
  ValueTypography,
} from "./styles/GlobalContactstyles"
import { parameterMapItems } from "../types"
import { useMobileCheck } from "../../utils/isMobilView"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"

export default function ReservationCenter({ props }: any) {
  props = props[0]
  const isMobile = useMobileCheck()
  const Context = useContext(IHCLContext)
  const PortableText = Context!.PortableText
  return (
    <Box sx={{ background: theme?.palette?.background?.paper }}>
      <ContactDetailBox>
        <SubtitleBox>
          <Typography variant={isMobile ? "m-body-sl" : "body-ml"}>{props?.subTitle}</Typography>
        </SubtitleBox>
        <Divider sx={{ bgcolor: theme?.palette?.ihclPalette?.hexTwelve }} />
        {props?.richText?.map((data: any, index: number) => (
          <>
            <FlexBox p={"1.042vw 0"}>
              <CountryName dangerouslySetInnerHTML={{ __html: data?.richTextKey }}></CountryName>
              <CountryPhone>{data?.richTextValue}</CountryPhone>
            </FlexBox>
            <Divider />
          </>
        ))}
        {props?.description && (
          <Box marginTop="1.72vw">
            <Typography variant={isMobile ? "m-body-sl" : "body-ml"}>{props?.description}</Typography>
          </Box>
        )}
        <Box>
          {props?.parameterMap && (
            <Box>
              {props?.parameterMap?.map((item: parameterMapItems, index: number) => (
                <BorderBox key={index}>
                  <MainBox>
                    <TitleTypography variant={isMobile ? "m-body-sl" : "body-ml"}>{item?.key}</TitleTypography>
                    <ValueTypography variant={isMobile ? "m-body-sl" : "body-ml"}>{item?.value}</ValueTypography>
                  </MainBox>
                </BorderBox>
              ))}
            </Box>
          )}
          {props?.singleContent && (
            <Box sx={{ marginTop: isMobile ? "2.5vw" : "1.719vw" }}>
              <Typography>
                <PortableText blocks={props?.singleContent} />
              </Typography>
            </Box>
          )}
        </Box>
      </ContactDetailBox>
    </Box>
  )
}
