import React, { useContext } from "react"
import { theme } from "../../lib/theme"
import { urlFor } from "../../lib-sanity"
import { Typography, Box } from "@mui/material"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import {
  BoxContainer,
  CardWithTitleTabsTypography,
  LogoImageContentBox,
  LogoTitleBox,
  VerticalDivider,
} from "./styles/card-with-two-secondary-cta"
import { useMobileCheck } from "../../utils/isMobilView"

const CardWithTwoSecondaryCta = (props: any) => {
  const isMobile = useMobileCheck()
  const context = useContext(IHCLContext)
  const PortableText = context!.PortableText

  return (
    <BoxContainer>
      {props?.props?.map((item: any, index: number) => {
        return (
          <>
            <LogoTitleBox key={index}>
              {item?.logo?.asset?._ref && (
                <LogoImageContentBox>
                  <Box
                    alt={item?.logo?.altText || `-img`}
                    component={"img"}
                    height={"100%"}
                    src={urlFor(item?.logo?.asset?._ref).url()}
                  />
                </LogoImageContentBox>
              )}
              <Box sx={{ textAlign: "center" }}>
                {item?.singleContent?.map((item: any, index: number) => {
                  return <PortableText blocks={item} key={index} />
                })}
              </Box>
              <Box sx={{ width: "13.19vw" }}>
                <CardWithTitleTabsTypography variant="heading-xs">{item?.title}</CardWithTitleTabsTypography>
              </Box>
            </LogoTitleBox>
            {index !== 3 && <VerticalDivider orientation="vertical" flexItem />}
          </>
        )
      })}
    </BoxContainer>
  )
}

export default CardWithTwoSecondaryCta
