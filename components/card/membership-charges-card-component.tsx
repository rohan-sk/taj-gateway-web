import { Box, Typography } from "@mui/material"
import React from "react"
import { ImageProps } from "../types"
import { urlFor } from "../../lib-sanity"
import { useMobileCheck } from "../../utils/isMobilView"
import {
  MembershipChargesCardComponentBox,
  MembershipDescriptionTypography,
} from "./styles/membership-charges-card-component-styles"
import { theme } from "../../lib/theme"
interface MembershipChargesCardComponentProps {
  description: string
  isMultiBlockContent: boolean
  largeVariant: string
  logo: ImageProps
  title: string
  urlType: string
  _type: string
}
function MembershipChargesCardComponent({
  description,
  isMultiBlockContent,
  largeVariant,
  logo,
  title,
  urlType,
  _type,
}: MembershipChargesCardComponentProps) {
  const isMobile = useMobileCheck()
  const membershipChargeCardImage = logo?.asset?._ref
  return (
    <MembershipChargesCardComponentBox>
      {membershipChargeCardImage && (
        <Box>
          <Box
            width={"100%"}
            height={"100%"}
            component="img"
            alt={logo?.altText || "membership-charge-card"}
            sx={{ objectFit: "contain" }}
            src={urlFor(membershipChargeCardImage).url()}
          />
        </Box>
      )}
      {title && (
        <Box mt={isMobile ? "3.438vw" : "1.198vw"}>
          <Typography variant={isMobile ? "m-heading-xs" : "heading-xs"} sx={{ color: theme?.palette?.text?.primary }}>
            {title}
          </Typography>
        </Box>
      )}
      {description && (
        <Box mt={isMobile ? "0.938vw" : "0.313vw"}>
          <MembershipDescriptionTypography variant={isMobile ? "m-body-l" : "body-ml"}>
            {description}
          </MembershipDescriptionTypography>
        </Box>
      )}
    </MembershipChargesCardComponentBox>
  )
}

export default MembershipChargesCardComponent
