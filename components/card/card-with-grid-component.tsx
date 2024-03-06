import { theme } from "../../lib/theme"
import { GAStore, UserStore } from "../../store"
import dynamic from "next/dynamic"
import { CONSTANTS } from "../constants"
import { urlFor } from "../../lib-sanity"
import { observer } from "mobx-react-lite"
import { GLOBAL_STORES } from "../../utils/Constants"
import { useMobileCheck } from "../../utils/isMobilView"
import { useAesthetics } from "../../utils/fetchAsthetics"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import React, { useContext, useState } from "react"
import { useAppNavigation } from "../../utils/NavigationUtility"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import {
  Box,
  Grid,
  Stack,
  styled,
  Tooltip,
  Divider,
  IconButton,
  Typography,
  TooltipProps,
  tooltipClasses,
} from "@mui/material"
import {
  BoxWrapper,
  GridWrapper,
  MediaContent,
  DynamicStack,
  SingleRowGrid,
  CardMediaStyled,
  MainGridWrapper,
  LoadMoreWrapper,
  ButtonTypography,
  GridChildContainer,
  MainMediaWrapperContainer,
} from "./styles/card-with-grid"
import { triggerEvent } from "../../utils/analytics"
import { AFFILIATION, EPICURE, MEMBERSHIP, PAGE_LANG, TAJ_HOTELS } from "../../utils/analytics/constants"
import { getCookie } from "../../utils/cookie"
import { UseAddress } from "../../utils/hooks/useAddress"
import { MemberDataLayer } from "../../utils/analytics/member-data-layer"
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))

const CardWithGrid = ({ props }: any) => {
  const { showComparison, comparatives, specifications, aesthetic } = props
  const [isOpen, setIsOpen] = useState<boolean>(showComparison)
  const loadLength = 5
  const [cardsLength, setCardsLength] = useState<number>(loadLength)
  const isMobile = useMobileCheck()
  const { cardPadding } = useAesthetics(aesthetic?._ref)
  const context = useContext(IHCLContext)
  const navigate = useAppNavigation()

  //global user store
  const userStore = context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore

  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const dataLayer = MemberDataLayer(userStore, gaStoreData)
  const address = UseAddress(userStore)

  const handleClick = () => {
    setIsOpen(true)
  }
  const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: isMobile ? "64.688vw" : "21.563vw",
      backgroundColor: theme?.palette?.ihclPalette?.hexSixteen,
      color: theme?.palette?.ihclPalette?.hexSeventeen,
      padding: isMobile ? "1.563vw 3.750vw 1.875vw" : "0.521vw 1.250vw 0.625vw",
    },
  })

  const handleSelectEvent = (url: any, index: number, title: string, urlType: any, cardSelection: any, item: any) => {
    const cardTitle = cardSelection?.toLowerCase()?.includes("preferred") ? "Epicure Preferred" : "Epicure Privileged"
    const CardCost = cardSelection?.toLowerCase()?.includes("preferred") ? 25000 : 50000
    triggerEvent({
      action: "add_to_cart",
      params: {
        ...dataLayer,
        location: "",
        eventType: "",
        eventName: "",
        eventPlace: "",
        eventTicketsQty: "",
        eventDate: "",
        clientId: getCookie("_ga")?.slice(6),
        visitSource: "",
        datesToBook: "",
        arrivalDate: "",
        departureDate: "",
        noOfAdults: "",
        noOfChild: "",
        noOfRooms: "",
        brandName: "",
        giftCardCategory: "",
        giftCardType: "",
        giftCardValue: "",
        giftCardQuantity: "",
        offerName: "",
        offerCode: "",
        offerID: "",
        offerCategory: "",
        offerValidity: "",
        redemptionType: "",
        redemptionName: "",
        redemptionDescription: "",
        pointsType: "",
        pointstobeRedeemed: "",
        bookingType: "",
        bookingPaymentType: "",
        buttonLinkName: title,
        link_url: url,
        link_text: title,
        paymentType: "",
        outbound: urlType == "internal" ? false : true,
        userPinCode: address?.pinCode ? address?.pinCode : "",
        userState: address?.state ? address?.state : "",
        userCity: address?.cityTown ? address?.cityTown : "",
        pageHierarchy: JSON.parse(
          `["${TAJ_HOTELS}",` + `"${PAGE_LANG}",` + `"${AFFILIATION}",` + `"${url.replace("/", "").toUpperCase()}"]`,
        ),
        pageURL: `${global?.window?.location.origin}` + `${url}`,
        ecommerce: {
          currency: "INR",
          value: CardCost,
          items: [
            {
              item_id: "",
              item_name: cardTitle || "",
              affiliation: AFFILIATION,
              item_category: MEMBERSHIP,
              item_category2: cardSelection,
              price: CardCost || "",
              quantity: 1,
              index: index || 0,
            },
          ],
        },
      },
    })
  }

  return (
    <>
      {isOpen ? (
        <MainGridWrapper
          id="epicureSpecs"
          container
          sx={{ margin: 0 }}
          p={isMobile ? cardPadding?.mobile : cardPadding?.desktop}
          aria-label="card-with-grid-component">
          {comparatives && (
            <MainMediaWrapperContainer $isMobile={isMobile}>
              <MediaContent>
                <GridWrapper>
                  {comparatives?.map((item: any, index: number) => (
                    <BoxWrapper key={index}>
                      <CardMediaStyled
                        sx={{
                          marginBottom: isMobile ? "2.188vw" : "0.9vw",
                        }}
                        alt={(isMobile ? item?.image?.altText : item?.largeImage?.altText) || "media"}
                        component="img"
                        src={urlFor(isMobile ? item?.image?.asset?._ref : item?.largeImage?.asset?._ref).url()}
                      />
                      <Typography
                        variant={isMobile ? "m-body-m" : "body-m"}
                        sx={{
                          fontSize: isMobile ? MobilePxToVw(22) : DesktopPxToVw(22),
                        }}>
                        {item?.title}
                      </Typography>
                    </BoxWrapper>
                  ))}
                </GridWrapper>
              </MediaContent>
            </MainMediaWrapperContainer>
          )}

          <Grid item>
            <Grid item xs={12}>
              {specifications?.slice(0, cardsLength)?.map((item: any, index: number) => (
                <Box key={index}>
                  {index !== 0 && (
                    <Divider
                      style={{
                        backgroundColor: "transparent",
                      }}
                    />
                  )}
                  <SingleRowGrid>
                    <Box
                      sx={{
                        display: item?.icon ? "flex" : "unset",
                        alignItems: item?.icon ? (isMobile ? "end" : "center") : "unset",
                      }}>
                      <Typography variant={isMobile ? "m-heading-xs" : "heading-xs"}>{item?.title}</Typography>
                      {item?.icon && !isMobile && (
                        <CustomWidthTooltip
                          arrow
                          placement="top"
                          PopperProps={{
                            sx: {
                              "& .MuiTooltip-arrow": {
                                color: theme?.palette?.ihclPalette?.hexSixteen,
                              },
                            },
                          }}
                          title={
                            <Typography variant={isMobile ? "m-body-s" : "body-s"}>{item?.onHoverText}</Typography>
                          }>
                          <IconButton sx={{ cursor: "default" }}>
                            <Box component={item?.icon?.altText || "img"} src={urlFor(item?.icon?.asset)?.url()} />
                          </IconButton>
                        </CustomWidthTooltip>
                      )}
                    </Box>
                    {item?.comparativeSpefications?.map((items: any, index: number) => (
                      <Box key={index}>
                        <Box
                          sx={{
                            textAlign: "center",
                          }}>
                          {items?.title && (
                            <Typography
                              variant={isMobile ? "m-body-l" : "body-m"}
                              letterSpacing={isMobile ? "-0.03em" : "unset"}>
                              {items?.title}
                            </Typography>
                          )}
                          {items?.asset?._ref && (
                            <Box
                              alt={items?.altText || `tick-img`}
                              width={isMobile ? "13px" : "14px"}
                              component={"img"}
                              src={items?.asset?._ref && urlFor(items?.asset?._ref).url()}
                            />
                          )}
                        </Box>
                      </Box>
                    ))}
                  </SingleRowGrid>
                </Box>
              ))}
            </Grid>
            <Divider />
            <LoadMoreWrapper item xs={12} sx={{ marginTop: "3.854vw" }}>
              <Grid container alignItems={"center"}>
                <Grid xs={isMobile ? 12 : 8}>
                  {specifications?.length > cardsLength ? (
                    <>
                      {isMobile ? (
                        <Box
                          width={"37.188vw"}
                          m={"8.594vw auto"}
                          p={"2.5vw 7.344vw"}
                          border={`2px solid ${theme.palette.ihclPalette.hexTwo}`}>
                          <Typography
                            variant="m-body-s"
                            color={theme.palette.ihclPalette.hexTwo}
                            sx={{
                              letterSpacing: isMobile ? "0.281vw" : "unset",
                              fontWeight: 700,
                            }}
                            onClick={() => {
                              setCardsLength(specifications?.length)
                            }}>
                            {CONSTANTS?.LOAD_MORE}
                          </Typography>
                          <KeyboardArrowDownIcon
                            sx={{
                              lineHeight: "1.3125vw",
                              position: "absolute",
                              fontWeight: 400,
                              color: theme?.palette?.ihclPalette?.hexTwo,
                            }}
                          />
                        </Box>
                      ) : (
                        <Box>
                          <Typography
                            variant="link-m"
                            onClick={() => {
                              setCardsLength(specifications?.length)
                            }}>
                            {CONSTANTS?.LOAD_MORE}
                          </Typography>
                          <KeyboardArrowDownIcon
                            sx={{
                              lineHeight: "1.3125vw",
                              position: "absolute",
                              fontWeight: 400,
                              marginLeft: "0.521vw",
                              fontSize: "1.2vw",
                              color: theme?.palette?.ihclPalette?.hexTwo,
                            }}
                          />
                        </Box>
                      )}
                    </>
                  ) : (
                    <>
                      {isMobile ? (
                        <Box
                          width={"37.188vw"}
                          m={"8.594vw auto"}
                          p={"2.5vw 7.344vw"}
                          border={`2px solid ${theme.palette.ihclPalette.hexTwo}`}>
                          <Typography
                            variant="m-body-s"
                            color={theme.palette.ihclPalette.hexTwo}
                            sx={{
                              letterSpacing: isMobile ? "0.281vw" : "unset",
                              fontWeight: 700,
                            }}
                            onClick={() => {
                              setCardsLength(loadLength)
                              global?.window?.document?.getElementById("epicureSpecs")?.scrollIntoView()
                            }}>
                            {CONSTANTS?.LOAD_LESS}
                          </Typography>
                          <KeyboardArrowDownIcon
                            sx={{
                              lineHeight: "1.3125vw",
                              position: "absolute",
                              fontWeight: 400,
                              color: theme?.palette?.ihclPalette?.hexTwo,
                              transform: "rotate(180deg)",
                            }}
                          />
                        </Box>
                      ) : (
                        <Box>
                          <Typography
                            variant="link-m"
                            onClick={() => {
                              setCardsLength(loadLength)
                              global?.window?.document?.getElementById("epicureSpecs")?.scrollIntoView()
                            }}>
                            {CONSTANTS?.LOAD_LESS}
                          </Typography>
                          <KeyboardArrowDownIcon
                            sx={{
                              lineHeight: "1.3125vw",
                              position: "absolute",
                              fontWeight: 400,
                              fontSize: "1.2vw",
                              color: theme?.palette?.ihclPalette?.hexTwo,
                              transform: "rotate(180deg)",
                            }}
                          />
                        </Box>
                      )}
                    </>
                  )}
                </Grid>
                <GridChildContainer item xs={isMobile ? 12 : 4} sx={{ marginTop: "0vw" }}>
                  <Stack direction={"row"} columnGap={isMobile ? "2.5vw" : "2.604vw"}>
                    {comparatives?.map((item: any, index: number) => (
                      <Box key={index}>
                        <Stack direction={"column"} alignItems={"center"}>
                          {!isMobile && !item?.image && !item?.largeImage && (
                            <Typography variant="body-m" mb={isMobile ? MobilePxToVw(10) : DesktopPxToVw(21)}>
                              {item?.title}
                            </Typography>
                          )}
                          {isMobile ? (
                            <RenderActionItem
                              key={index}
                              url={item?.secondaryAction?.url}
                              title={item?.secondaryAction?.title}
                              variant={item?.secondaryAction?.variant}
                              navigationType={"internal"}
                              isActionButtonType={true}
                              buttonStyles={{
                                height: "fit-content !important",
                                padding: "2.8125vw 4vw !important",
                                minHeight: "9.53vw",
                                minWidth: isMobile ? "40.313vw" : "10.4vw",
                                letterSpacing: isMobile ? "0.281vw" : "unset",
                                whiteSpace: isMobile ? "nowrap" : "",
                              }}
                              onClick={() => {
                                handleSelectEvent(
                                  item?.secondaryAction?.url,
                                  index,
                                  item?.secondaryAction?.title,
                                  "internal",
                                  item?.title,
                                  item,
                                )
                                localStorage.setItem(
                                  "membershipType",
                                  item?.title?.toLowerCase() === "privileged" ? "PRIVILEGED" : "PREFERRED",
                                )
                                navigate(`${item?.secondaryAction?.url}#loyaltyForm`, item?.secondaryAction?.urlType)
                              }}
                            />
                          ) : (
                            <RenderActionItem
                              key={index}
                              url={item?.primaryAction?.url}
                              title={item?.primaryAction?.title}
                              variant={item?.primaryAction?.variant}
                              navigationType="internal"
                              isActionButtonType={true}
                              buttonStyles={{
                                minWidth: isMobile ? "40.313vw" : "10.4vw",
                                letterSpacing: isMobile ? "0.281vw" : "unset",
                              }}
                              onClick={() => {
                                handleSelectEvent(
                                  item?.primaryAction?.url,
                                  index,
                                  item?.primaryAction?.title,
                                  "internal",
                                  item?.title,
                                  item,
                                )
                                const cardType =
                                  item?.title?.toLowerCase() === "privileged" ? "privileged" : "preferred"
                                const programType =
                                  item?.primaryAction?.url?.split("?")?.[1]?.toLowerCase()?.includes("shareholder") ||
                                  item?.primaryAction?.url?.split("?")?.[1]?.toLowerCase()?.includes("tata")
                                const appendedUrl = programType
                                  ? `${item?.primaryAction?.url}&cardType=${cardType}#loyaltyForm`
                                  : `${item?.primaryAction?.url}?cardType=${cardType}#loyaltyForm`
                                navigate(appendedUrl, item?.primaryAction?.urlType)
                              }}
                            />
                          )}
                        </Stack>
                      </Box>
                    ))}
                  </Stack>
                </GridChildContainer>
              </Grid>
            </LoadMoreWrapper>
          </Grid>
        </MainGridWrapper>
      ) : (
        <Box width={"100%"} textAlign={"center"} sx={{ cursor: "pointer" }}>
          <DynamicStack $isMobile={isMobile} onClick={handleClick}>
            <ButtonTypography color={theme.palette.ihclPalette.hexTwo} variant={isMobile ? "m-body-s" : "body-ml"}>
              {CONSTANTS?.VIEW_COMPARSION}
            </ButtonTypography>
            <ExpandMoreIcon
              fontSize={isMobile ? "medium" : "large"}
              htmlColor={theme.palette.ihclPalette.hexTwo}></ExpandMoreIcon>
          </DynamicStack>
        </Box>
      )}
    </>
  )
}

export default observer(CardWithGrid)
