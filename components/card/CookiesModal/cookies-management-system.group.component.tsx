import { AccordionSummary, Box, FormGroup, Typography } from "@mui/material"
import {
  AccordionAntSwitchContainer,
  AccordionContainer,
  ActionButtonsContainer,
  StyledAccordion,
  StyledAccordionDetails,
} from "./cookies-policy.styles"
import dynamic from "next/dynamic"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import { AntSwitch } from "../styles/common-styles"
import { useMobileCheck } from "../../../utils/isMobilView"
import { Fragment, SyntheticEvent, useState } from "react"
import { FullBox } from "../../MyAccount/booking-history/booking-styles"
const CustomReadMore = dynamic(() => import ("../../hoc/CustomReadMore"))
const RenderActionItem = dynamic(() => import ("../../hoc/actions/action-items-ui"))
const PortableText = dynamic(() =>
  import("../../../lib/portable-text-serializers").then((module) => module.PortableText)
)

const ToggleSwitchAccordion = ({ onChange, expanded, key, item }: any) => {
  const isMobile = useMobileCheck()

  return (
    <AccordionAntSwitchContainer>
      <StyledAccordion
        key={key}
        expanded={expanded}
        onChange={onChange}
        elevation={0}
        disableGutters={true}>
        {item?.question && (
          <AccordionSummary
            expandIcon={expanded ? <RemoveIcon /> : <AddIcon />}
            sx={{
              flexDirection: "row-reverse",
              "& .MuiAccordionSummary-content": {
                display: "flex",
                justifyContent: "space-between",
                margin: "0vw",
                alignItems: "center",
              },
            }}>
            <Typography
              maxWidth={isMobile ? "95%" : "59vw"}
              variant={isMobile ? "m-heading-xs" : "heading-xs"}
              sx={{ padding: isMobile ? "3.906vw 0vw" : "unset" }}>
              {item?.question}
            </Typography>
          </AccordionSummary>
        )}
        {item?.answer?.length > 0 && (
          <StyledAccordionDetails
            sx={{ textAlign: "start", mt: DesktopPxToVw(10) }}>
            {item?.answer?.map((content: any, index: number) => (
              <Fragment key={index}>
                <PortableText blocks={content} />
              </Fragment>
            ))}
          </StyledAccordionDetails>
        )}
      </StyledAccordion>
      <Box
        sx={{
          display: "flex",
          mt: isMobile ? MobilePxToVw(26) : DesktopPxToVw(5),
        }}>
        <FormGroup>
          <AntSwitch inputProps={{ "aria-label": "ant design" }} />
        </FormGroup>
      </Box>
    </AccordionAntSwitchContainer>
  )
}

const CookiesManagement = (props: any) => {
  const { items, charactersLimit } = props
  const isMobile = useMobileCheck()
  const { PrimaryAction, secondaryAction } = items?.[2]
  const [expanded, setExpanded] = useState<string | false>(false)
  const onChange =
    (item: any) => (event: SyntheticEvent, isExpanded: boolean) =>
      setExpanded(isExpanded ? item._key : false)
  return (
    <Box>
      {items?.[0] && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "start",
            justifyContent: "start",
          }}>
          <FullBox>
            <Typography
              sx={{ mb: isMobile ? "3.125vw" : "0.938vw" }}
              variant={isMobile ? "m-heading-m" : "heading-m"}>
              {items?.[0]?.title}
            </Typography>
          </FullBox>
          <FullBox sx={{ mb: isMobile ? "3.125vw" : "0.938vw" }}>
            <CustomReadMore
              variant={isMobile ? "m-body-s" : "body-s"}
              length={charactersLimit}>
              {items?.[0]?.description}
            </CustomReadMore>
          </FullBox>
          <FullBox sx={{ mb: isMobile ? "4.688vw" : "1.146vw" }}>
            <RenderActionItem
              isActionButtonType={false}
              url={items?.[0]?.url}
              title={items?.[0]?.ctaLabel}
              variant={"outlined"}
              navigationType={items?.[0]?.urlType}
              buttonStyles={{ gap: DesktopPxToVw(1) }}
            />
          </FullBox>
        </Box>
      )}

      <AccordionContainer>
        {items?.[1]?.items?.map((item: any, index: any) => {
          return (
            <ToggleSwitchAccordion
              item={item}
              index={index}
              key={item?._key}
              onChange={onChange(item)}
              expanded={expanded === item?._key}
            />
          )
        })}
      </AccordionContainer>
      <ActionButtonsContainer>
        {secondaryAction?.title && (
          <RenderActionItem
            isActionButtonType={
              secondaryAction?.variant === "link" ? false : true
            }
            url={secondaryAction?.url}
            title={secondaryAction?.title}
            variant={secondaryAction?.variant}
            navigationType={secondaryAction?.urlType}
            buttonStyles={{
              letterSpacing: "0.1em",
            }}
          />
        )}
        {PrimaryAction?.title && (
          <RenderActionItem
            isActionButtonType={
              PrimaryAction?.variant === "link" ? false : true
            }
            url={PrimaryAction?.url}
            title={PrimaryAction?.title}
            variant={PrimaryAction?.variant}
            navigationType={PrimaryAction?.urlType}
            buttonStyles={{
              minWidth:
                PrimaryAction?.urlType === "dialog" ? "9.45vw" : "9.79vw",
              letterSpacing: "0.1em",
            }}
          />
        )}
      </ActionButtonsContainer>
    </Box>
  )
}

export default CookiesManagement
