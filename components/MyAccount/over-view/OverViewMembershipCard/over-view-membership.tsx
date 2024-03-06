import { gridBreakPointsGenerator } from "../../../card/SearchResultCards/search-card.component"
import { useMobileCheck } from "../../../../utils/isMobilView"
import MembershipCardComponent from "./over-view-membership-card.component"
import { ExpandMoreIcon } from "../../../header/styles/booking-menu"
import { StyledAccordion } from "../OverViewGiftCard/styles/over-view-membership-card"
import fetchMembershipDetails from "../../../../utils/fetchMembershipData"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import { GLOBAL_STORES } from "../../../../utils/Constants"
import { UserAccountStore } from "../../../../store"
import { AccordionDetails, AccordionSummary, Box, Grid } from "@mui/material"
import React, { useEffect, useState, useContext, useCallback } from "react"
import { OverViewSectionsTitle, TitleWrapper } from "../styles/render-over-view"
import { observer } from "mobx-react-lite"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"

interface epicureCardsInterface {
  image: any
  type: string
  membership: string
  exists?: boolean
}
const OverViewMembership = ({ title, index }: any) => {
  const globalContext = useContext(IHCLContext)

  const accountStore: any = globalContext?.getGlobalStore(GLOBAL_STORES.userAccountStore) as UserAccountStore

  const isMobile = useMobileCheck()
  const [neuPassItem, setNeuPassItem] = useState<any>()
  const [accordionOpen, setAccordionOpen] = useState<boolean>(true)
  const [epicurePrivileged, setEpicurePrivileged] = useState<epicureCardsInterface>({
    image: "",
    type: "",
    membership: "",
    exists: false,
  })
  const [epicurePreferred, setEpicurePreferred] = useState<epicureCardsInterface>({
    image: "",
    type: "",
    membership: "",
    exists: false,
  })
  const [epicureBank, setEpicureBank] = useState<epicureCardsInterface>({
    image: "",
    type: "",
    membership: "",
    exists: false,
  })
  const [chambersItem, setChambersItem] = useState<any>()
  const handleAccordionChange = () => {
    setAccordionOpen(!accordionOpen)
  }

  const MemberShipDetails = useCallback(async () => {
    const response = await fetchMembershipDetails()
    if (response) {
      response?.map((card: any) => {
        if (
          global?.window?.localStorage?.getItem("userTier")?.toLocaleLowerCase()?.includes(card?.tier?.toLowerCase()) &&
          card?.tier
        ) {
          setNeuPassItem({
            ...neuPassItem,
            image: card?.image,
            membership: card?.type?.toUpperCase(),
            type: `${card?.tier?.toUpperCase()} MEMBER`,
          })
        }
        accountStore?.epicureMemberShipCards?.map((item: any) => {
          if (
            card?.tier &&
            item?.membership_plan_code?.toUpperCase() === "PRIVILEGED" &&
            card?.tier?.toLocaleUpperCase() === "PRIVILEGED" &&
            card?.type?.toLowerCase() === "epicure"
          ) {
            setEpicurePrivileged({
              ...epicurePrivileged,
              image: card?.image,
              membership: card?.type?.toUpperCase(),
              type: `${card?.tier?.toUpperCase()}`,
              exists: true,
            })
          }
          if (
            card?.tier &&
            item?.membership_plan_code?.toUpperCase() === "PREFERRED" &&
            card?.tier?.toLocaleUpperCase() === "PREFERRED"
          ) {
            setEpicurePreferred({
              ...epicurePreferred,
              image: card?.image,
              membership: card?.type?.toUpperCase(),
              type: `${card?.tier?.toUpperCase()}`,
              exists: true,
            })
          }
          const epicureCMS = response.find(
            (cItem: any) =>
              cItem.tier?.toLowerCase() === item.membership_plan_code?.toLowerCase() ||
              cItem?.planCode?.toLowerCase() === item.membership_plan_code?.toLowerCase(),
          )
          if (card?.type?.toLowerCase() === "epicurebank" && epicureCMS?.planCode) {
            setEpicureBank({
              ...epicurePreferred,
              image: card?.image,
              membership: epicureCMS?.planCode?.toUpperCase(),
              type: `${card?.type?.toUpperCase()}`,
              exists: true,
            })
          }
        })
        if (
          global?.window?.localStorage
            ?.getItem("chambersMemberTier")
            ?.toLocaleLowerCase()
            ?.includes(card?.tier?.toLocaleLowerCase())
        ) {
          setChambersItem({
            ...chambersItem,
            image: card?.image,
            membership: card?.type?.toUpperCase(),
            type:
              global?.window?.localStorage?.getItem("chambersMemberTier")?.toLocaleLowerCase() === "chambersglobal"
                ? "GLOBAL MEMBER"
                : "NATIONAL MEMBER",
          })
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountStore?.epicureMemberShipCards])

  useEffect(() => {
    MemberShipDetails()
  }, [MemberShipDetails])

  return (
    <Box
      sx={{
        marginBottom: isMobile ? "14.063vw" : DesktopPxToVw(100),
      }}>
      {isMobile ? (
        <StyledAccordion
          expanded={isMobile && accordionOpen}
          onClick={() => {
            handleAccordionChange()
          }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon style={{ fontSize: "20px" }} />}>
            <OverViewSectionsTitle>{title}</OverViewSectionsTitle>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container justifyContent={"space-between"} mt={"5.469vw"} rowGap={isMobile ? "4.688vw" : "1.563vw"}>
              {chambersItem && (
                <Grid
                  sx={{ display: chambersItem ? "block" : "none" }}
                  key={`${chambersItem?.membership}-${index}`}
                  item
                  {...gridBreakPointsGenerator(isMobile, 3.771, 5.77)}>
                  <MembershipCardComponent item={chambersItem} />
                </Grid>
              )}
              {neuPassItem && (
                <Grid
                  item
                  key={`${neuPassItem?.membership}-${index}`}
                  {...gridBreakPointsGenerator(isMobile, 3.771, 5.77)}>
                  <MembershipCardComponent item={neuPassItem} />
                </Grid>
              )}
              {epicurePrivileged?.exists === true && (
                <Grid
                  item
                  key={`${epicurePrivileged?.membership}-${index}`}
                  {...gridBreakPointsGenerator(isMobile, 3.771, 5.77)}>
                  <MembershipCardComponent item={epicurePrivileged} />
                </Grid>
              )}
              {epicurePreferred?.exists === true && (
                <Grid
                  item
                  key={`${epicurePreferred?.membership}-${index}`}
                  {...gridBreakPointsGenerator(isMobile, 3.771, 5.77)}>
                  <MembershipCardComponent item={epicurePreferred} />
                </Grid>
              )}
            </Grid>
          </AccordionDetails>
        </StyledAccordion>
      ) : (
        <>
          <TitleWrapper>
            <OverViewSectionsTitle mt={isMobile ? "" : DesktopPxToVw(0)} mb={isMobile ? "" : DesktopPxToVw(40)}>
              {title}
            </OverViewSectionsTitle>
            {/* Add Conditional Rendering based on total number of membership's */}
            {/* {<ViewAllLink variant="link-m">{lTANTS?.VIEW_ALL}</ViewAllLink>} */}
          </TitleWrapper>
          <Grid gap={DesktopPxToVw(23)} display={"flex"} flexWrap={"wrap"}>
            {chambersItem && (
              <Grid
                key={`${chambersItem?.membership}-${index}`}
                item
                {...gridBreakPointsGenerator(isMobile, 3.771, 5.77)}>
                <MembershipCardComponent item={chambersItem} />
              </Grid>
            )}
            {neuPassItem && (
              <Grid
                key={`${neuPassItem?.membership}-${index}`}
                item
                {...gridBreakPointsGenerator(isMobile, 3.771, 5.77)}>
                <MembershipCardComponent item={neuPassItem} />
              </Grid>
            )}
            {epicurePrivileged?.exists === true && (
              <Grid
                item
                key={`${epicurePrivileged?.membership}-${index}`}
                {...gridBreakPointsGenerator(isMobile, 3.771, 5.77)}>
                <MembershipCardComponent item={epicurePrivileged} />
              </Grid>
            )}
            {epicurePreferred?.exists === true && (
              <Grid
                item
                key={`${epicurePreferred?.membership}-${index}`}
                {...gridBreakPointsGenerator(isMobile, 3.771, 5.77)}>
                <MembershipCardComponent item={epicurePreferred} />
              </Grid>
            )}
            {epicureBank?.exists === true && (
              <Grid
                key={`${epicureBank?.membership}-${index}`}
                item
                {...gridBreakPointsGenerator(isMobile, 3.771, 5.77)}>
                <MembershipCardComponent item={epicureBank} />
              </Grid>
            )}
          </Grid>
        </>
      )}
    </Box>
  )
}

export default observer(OverViewMembership)
