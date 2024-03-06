import React from "react"
import { urlFor } from "../../lib-sanity"
import { Box, Typography } from "@mui/material"
import { ActionProps, ImageProps } from "../types"
import ModalStore from "../../store/global/modal.store"
import RenderActionItem from "../hoc/actions/action-items-ui"
import {
  BoxWrapper,
  MainGrid,
  StyledTypography,
} from "./styles/nudge-wellness-success"
import { useMobileCheck } from "../../utils/isMobilView"
import { LinkDisableBlockContentBox } from "../forms/common/styles"
import { PortableText } from "../../lib/portable-text-serializers"

type NudgeWellnessJivaSuccessTypes = {
  title: string
  subtitle: string
  image: ImageProps
  PrimaryAction: ActionProps
  content: any
}

const NudgeWellnessJivaSuccess = ({
  image,
  title,
  subtitle,
  PrimaryAction,
  content,
}: NudgeWellnessJivaSuccessTypes) => {
  const modalStore = ModalStore.getInstance()
  const isMobile = useMobileCheck()

  return (
    <MainGrid>
      <BoxWrapper>
        {image?.asset?._ref && (
          <Box
            alt={"-img"}
            component={"img"}
            sx={{ mb: "1.667vw" }}
            src={urlFor(image?.asset?._ref).url()}
          />
        )}
        {title && (
          <StyledTypography variant={isMobile ? "m-heading-m" : "heading-m"}>
            {title}
          </StyledTypography>
        )}
        {subtitle && (
          <StyledTypography variant={isMobile ? "m-body-sl" : "body-m"}>
            {subtitle}
          </StyledTypography>
        )}
        {content &&
          content?.map((item: any, idx: number) => (
            <LinkDisableBlockContentBox
              component="span"
              sx={{ display: "inline" }}
              isDisable={
                !isMobile &&
                item?.content?.[0]?.markDefs?.[0]?.linkType === "mobile"
              }
              key={idx}>
              <PortableText blocks={item?.content} />
            </LinkDisableBlockContentBox>
          ))}
        {PrimaryAction?.title && (
          <Box onClick={() => modalStore?.closeModal()}>
            <RenderActionItem
              isActionButtonType={false}
              url={PrimaryAction?.url}
              title={PrimaryAction?.title}
              variant={PrimaryAction?.variant}
              buttonStyles={{ marginTop: "1.667vw" }}
              navigationType={PrimaryAction?.urlType}
            />
          </Box>
        )}
      </BoxWrapper>
    </MainGrid>
  )
}

export default NudgeWellnessJivaSuccess
