import React, { Fragment, useContext } from "react"
import { Box } from "@mui/material"
import { urlFor } from "../../lib-sanity"
import { useImageUtility } from "../../utils/hooks/useImageUtility"
import { IHCLContext, useMobileCheck } from "../forms/loyalty-form/epicure-imports.component"
import {
  GroupWithBombayBrasserieInfoImageContainer,
  GroupWithBombayBrasserieInfoImageWrapper,
} from "./styles/group-with-bombay-brasserie-info-styles"

const GroupWithBombayBrasserieInfo = ({ props, largeImage, image }: any) => {
  const context = useContext(IHCLContext)
  const { getOptimizeImageUrl } = useImageUtility()
  const isMobile = useMobileCheck()
  return (
    <>
      {(isMobile ? image?.asset?._ref : largeImage?.asset?._ref) && (
        <GroupWithBombayBrasserieInfoImageWrapper>
          <GroupWithBombayBrasserieInfoImageContainer>
            <Box
              alt={`Restaurants-Info`}
              width={"100%"}
              height={"100%"}
              component={"img"}
              src={getOptimizeImageUrl(urlFor(isMobile ? image?.asset?._ref : largeImage?.asset?._ref).url(), 1)}
            />
          </GroupWithBombayBrasserieInfoImageContainer>
        </GroupWithBombayBrasserieInfoImageWrapper>
      )}
      {props?.map((item: any, index: number) => {
        return (
          <Fragment key={index}>
            {context?.renderComponent(item._type, {
              ...item,
            })}
          </Fragment>
        )
      })}
    </>
  )
}

export default GroupWithBombayBrasserieInfo
