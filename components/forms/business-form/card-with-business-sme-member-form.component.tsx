import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from "@mui/material"
import { MemberSection } from "./business-sme-form"
import { ExpandMoreIconStyled } from "../../group/styles/group-with-filter-cards"
import dynamic from "next/dynamic"
import { theme } from "../../../lib/theme"
import { useMobileCheck } from "../../../utils/isMobilView"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { Member, MemberPropsType } from "./types"
import { CloseIcon } from "../../../utils/customIcons"
import { useRef, useState } from "react"
import { updateArrayState } from "../common/utils/updateArrayState"
const MemberForm = dynamic(() => import("./member-form"))

const MemberSectionComponent = (props: MemberPropsType) => {
  const { members, setMembers, setMemberErrors, memberData, handleScroll, scrollRef } = props
  const isMobile = useMobileCheck()

  const [activeAccordion, setActiveAccordion] = useState<number>(-1)

  const membersParentRef = useRef()

  const handleCloseClick = (deletableIndex: any) => {
    setMembers((membersList: Member[]) =>
      membersList?.filter((singleMember: Member, index) => index !== deletableIndex),
    )
    setMemberErrors((membersList: Member[]) =>
      membersList?.filter((singleMember: Member, index) => index !== deletableIndex),
    )
  }

  return (
    <MemberSection ref={membersParentRef} sx={{ position: "relative" }}>
      {members?.map((memberDetails: any, index: number) => (
        <Stack
          flexDirection={"row"}
          key={index}
          alignItems={"start"}
          gap={isMobile ? MobilePxToVw(10) : DesktopPxToVw(10)}>
          <Accordion
            sx={{
              flexShrink: "1",
              boxShadow: "none",
              width: "100%",
              padding: `${isMobile ? MobilePxToVw(20) : DesktopPxToVw(20)} ${
                isMobile ? MobilePxToVw(40) : DesktopPxToVw(40)
              }`,
              "& .MuiAccordionSummary-content": {
                margin: "0vw",
                padding: isMobile ? "" : `${DesktopPxToVw(2.25)} 0vw`,
              },
              backgroundColor: isMobile ? theme?.palette?.background?.default : theme?.palette?.background?.paper,
            }}
            onChange={(element: any, expanded) => {
              setActiveAccordion(expanded ? index : -1)
              updateArrayState(setMembers, index, { open: expanded })
            }}>
            <AccordionSummary
              sx={{ padding: "0vw" }}
              expandIcon={
                <ExpandMoreIconStyled sx={{ color: theme?.palette?.ihclPalette?.hexSeventeen + "!important" }} />
              }>
              <Typography
                sx={{
                  fontWeight: 700,
                  lineHeight: "initial",
                }}
                variant={isMobile ? "m-body-ml" : "body-ml"}>
                {`Member  ${index + 1}`}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: "0vw" }}>
              <MemberForm
                memberId={index}
                {...props}
                memberData={memberData}
                currentMember={memberDetails}
                membersParentRef={membersParentRef}
                activeAccordion={activeAccordion}
              />
            </AccordionDetails>
          </Accordion>
          {members?.length > 1 && (
            <Stack
              sx={{
                flexShrink: "0",
              }}>
              <Stack
                onClick={() => {
                  handleCloseClick(index)
                }}
                sx={{ minHeight: isMobile ? MobilePxToVw(118) : DesktopPxToVw(80) }}
                justifyContent="center">
                <CloseIcon
                  sx={{ marginTop: "0.8vw", width: isMobile ? MobilePxToVw(12) : DesktopPxToVw(12), cursor: "pointer" }}
                />
              </Stack>
            </Stack>
          )}
        </Stack>
      ))}
    </MemberSection>
  )
}
export default MemberSectionComponent
