import React from "react"
import { Box } from "@mui/material"
import { urlFor } from "../../../lib-sanity"
import { MembershipThreeImagesWrapperBox } from "./SSOLoginFormsStyles"

const SSOLoginMembershipTypeImages = ({ props }: any) => {
  return (
    <MembershipThreeImagesWrapperBox>
      {props?.image?.map((membershipImages: any, index: number) => (
        <Box key={index}>
          {membershipImages?.asset?._ref && (
            <Box
              width="100%"
              component={"img"}
              alt={`membership-img`}
              src={urlFor(membershipImages?.asset?._ref)?.url()}
            />
          )}
        </Box>
      ))}
    </MembershipThreeImagesWrapperBox>
  )
}

export default SSOLoginMembershipTypeImages
