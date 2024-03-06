import React, { useContext, useEffect, useState } from "react"
import { Box } from "@mui/material"
import { useRouter } from "next/router"
import { PathType } from "../../../types"
import { theme } from "../../../lib/theme"
import { observer } from "mobx-react-lite"
import { urlFor } from "../../../lib-sanity"
import { ROUTES } from "../../../utils/routes"
import LoyaltyStore from "../store/pageStore/loyalty.store"
import { useMobileCheck } from "../../../utils/isMobilView"
import BasicModal from "../../../components/hoc/modal/modal"
import { useLoggedIn } from "../../../utils/hooks/useLoggedIn"
import { CONSTANTS, ICONS } from "../../../components/constants"
import { useAppNavigation } from "../../../utils/NavigationUtility"
import { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
import { fetchAlertDialogData } from "../../../utils/fetchAlertDialogData"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import GiftCardStore from "../../giftCard/store/globalStore/gift-card.store"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { PageContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import { PLACEHOLDERS, Gold_Profile_icon } from "../../../components/forms/gift-card-form/constants"
import DataClearanceDialog from "../../../components/forms/loyalty-form/data-clearance-modal-component"
import {
  ButtonBox,
  ParentBoxHead,
  ImageBoxWrapper,
  StyledProfileIcon,
  BoxAppBarPurchase,
  StyledTitleEpicure,
  EpicureStyledAppBar,
  EpicureHeaderLogoBox,
  TypographyTitleEpicure,
} from "./epicure-header.styles"

const EpicurePurchaseFormHeader = (props: any) => {
  const { logo, secondaryLogo } = props?.[0]
  const IHCLContexts = useContext(IHCLContext)
  const pageContext = useContext(PageContext)
  const navigate = useAppNavigation()
  const isMobile = useMobileCheck()
  const isLoggedIn = useLoggedIn()
  const router = useRouter()
  const isEdit = router.query.editing === "true"

  // GC store
  const GCStore: any = IHCLContexts?.getGlobalStore(GLOBAL_STORES.giftCardStore) as GiftCardStore

  // epicure page store
  const epicurePageStore = pageContext?.getPageStore(
    PAGE_STORES.LOYALTY_STORES.loyaltyEpicureCardsStore,
  ) as LoyaltyStore

  // handle navigation
  const handleRoute = async (url: string, type: PathType | undefined) => {
    await navigate(url, type)
  }

  // useStates
  const [epicureCartClearance, setEpicureCartClearance] = useState<boolean>(false)
  const [isEpicureMyAccountClicked, setIsEpicureMyAccountClicked] = useState<boolean>(false)
  const [isEpicureTajLogoClicked, setIsEpicureTajLogoClicked] = useState<boolean>(false)
  const [giftcardCartClearance, setGiftcardCartClearance] = useState<boolean>(false)
  const [isGCTajLogoClicked, setIsGCTajLogoClicked] = useState<boolean>(false)
  const [modalData, setModalData] = useState<any>({})
  const [isGCMyAccountClicked, setIsGCMyAccountClicked] = useState<boolean>(false)
  const [isGcCartCreated, setIsGcCartCreated] = useState<boolean>(false)

  // fetching clear cart modal data
  const fetchDialogData = async () => {
    const data = await fetchAlertDialogData("loyalty-popup-message")
    if (data?.[0]?.epicurePopupMessage?.[0]?.items?.[0])
      setModalData(() => data?.[0]?.epicurePopupMessage?.[0]?.items?.[0])
  }

  // GC modal close click
  const giftCardHandleModalClose = () => {
    setGiftcardCartClearance(false)
    setIsGCTajLogoClicked(false)
    setIsGCMyAccountClicked(false)
  }

  // GC logo click
  const giftCardHandleLogoClick = () => {
    if (GCStore?.isUserTouchedForm ?? isGcCartCreated) {
      fetchDialogData()
      setGiftcardCartClearance(() => true)
      setIsGCTajLogoClicked(true)
      setIsGCMyAccountClicked(false)
    } else {
      setGiftcardCartClearance(() => false)
      setIsGCTajLogoClicked(false)
      router?.push(ROUTES.WITHOUTSEO_FOR_ROUTING?.HOMEPAGE)
    }
  }

  // GC Account click
  const giftCardHandleMyAccountClick = () => {
    if (isLoggedIn) {
      if (GCStore?.isUserTouchedForm ?? isGcCartCreated) {
        fetchDialogData()
        setGiftcardCartClearance(true)
        setIsGCMyAccountClicked(true)
        setIsGCTajLogoClicked(false)
      } else {
        setGiftcardCartClearance(() => false)
        setIsGCMyAccountClicked(false)
        navigate(ROUTES.WITHOUTSEO_FOR_ROUTING.MY_ACCOUNT.OVERVIEW, PathType?.internal)
      }
    } else {
      navigate(props?.[0]?.loginList?.[0]?.url, props?.[0]?.loginList?.[0]?.urlType)
    }
  }

  // epicure modal close
  const handleEpicureModalClose = () => {
    setEpicureCartClearance(false)
    setIsEpicureTajLogoClicked(false)
    setIsEpicureMyAccountClicked(false)
  }

  // epicure my account click
  const handleEpicureMyAccountClick = () => {
    if (isLoggedIn) {
      fetchDialogData()
      setEpicureCartClearance(true)
      setIsEpicureMyAccountClicked(true)
      setIsEpicureTajLogoClicked(false)
    } else {
      navigate(props?.[0]?.loginList?.[0]?.url, props?.[0]?.loginList?.[0]?.urlType)
    }
  }

  // epicure logo click
  const HandleEpicureLogoClick = () => {
    if (epicurePageStore) {
      fetchDialogData()
      setEpicureCartClearance(() => true)
      setIsEpicureTajLogoClicked(true)
      setIsEpicureMyAccountClicked(false)
    }
  }

  useEffect(() => {
    if (GCStore?.isUserTouchedForm || epicurePageStore) {
      window.history.pushState(null, "", `${window.location.pathname}${window?.location?.search}`)
      const fetchDialogData = async () => {
        const data = await fetchAlertDialogData("loyalty-popup-message")
        if (data?.[0]?.epicurePopupMessage?.[0]?.items?.[0])
          setModalData(() => data?.[0]?.epicurePopupMessage?.[0]?.items?.[0])
      }
      fetchDialogData()
      const handlePopstate = () => {
        setGiftcardCartClearance(() => true)
        setEpicureCartClearance(() => true)
        return false
      }
      window.addEventListener("popstate", handlePopstate)
    }
    return () => {
      window.removeEventListener("popstate", () => {
        GCStore?.updateIsUserTouchedForm(false)
        setGiftcardCartClearance(() => false)
        setEpicureCartClearance(() => false)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [GCStore?.isUserTouchedForm, epicurePageStore])

  useEffect(() => {
    const gcFetchCart = async () => {
      const cartRes = await GCStore?.gcFetchCart()
      setIsGcCartCreated(!cartRes?.error) //set this true if we get cart details
    }
    if (isEdit && GCStore?.buyingJourneySteps?.[1]?.selected) {
      gcFetchCart()
    } else if (
      (!GCStore?.buyingJourneySteps?.[1]?.completed && GCStore?.buyingJourneySteps?.[2]?.selected) ||
      (!GCStore?.buyingJourneySteps?.[1]?.completed && GCStore?.buyingJourneySteps?.[3]?.selected)
    ) {
      gcFetchCart()
    }
  }, [GCStore, isEdit])

  return (
    <>
      <ParentBoxHead id="main__Header">
        <EpicureStyledAppBar>
          <BoxAppBarPurchase>
            {logo && secondaryLogo && (
              <EpicureHeaderLogoBox
                onClick={() => {
                  if (epicurePageStore) {
                    HandleEpicureLogoClick()
                  } else {
                    giftCardHandleLogoClick()
                  }
                }}>
                <ImageBoxWrapper
                  alt="taj-logo"
                  component="img"
                  src={urlFor(secondaryLogo).url()}
                  $isMobile={isMobile}
                  width={isMobile ? MobilePxToVw(80) : DesktopPxToVw(67)}
                  height={isMobile ? MobilePxToVw(60) : DesktopPxToVw(59)}
                />
              </EpicureHeaderLogoBox>
            )}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ButtonBox>
                {props?.[0]?.loginList?.map((item: any, index: number) => (
                  <Box key={item?._key}>
                    {item?.title?.toLowerCase() == CONSTANTS?.LOGIN && isLoggedIn && (
                      <Box>
                        <StyledTitleEpicure
                          onClick={() => {
                            if (epicurePageStore) {
                              handleEpicureMyAccountClick()
                            } else {
                              giftCardHandleMyAccountClick()
                            }
                          }}
                          fontWeight={400}
                          variant={isMobile ? "m-body-ml" : "body-ml"}>
                          <StyledProfileIcon component="img" alt="profile-icon" src={Gold_Profile_icon} />
                          {!isMobile && <Box sx={{ cursor: "pointer" }}>{PLACEHOLDERS?.ACCOUNT}</Box>}
                        </StyledTitleEpicure>
                      </Box>
                    )}
                    {props?.[0]?.loginList?.length > 0 && (
                      <TypographyTitleEpicure
                        variant={isMobile ? "m-body-ml" : "body-ml"}
                        sx={{
                          display: item?.title?.toLowerCase() === CONSTANTS?.LOGIN && isLoggedIn ? "none" : "block",
                        }}
                        onClick={() => {
                          handleRoute(item?.url, item?.urlType)
                        }}>
                        {item?.title}
                      </TypographyTitleEpicure>
                    )}
                  </Box>
                ))}
              </ButtonBox>
            </Box>
          </BoxAppBarPurchase>
        </EpicureStyledAppBar>
      </ParentBoxHead>
      {(giftcardCartClearance || epicureCartClearance) && (
        <Box>
          <BasicModal
            top={isMobile ? "unset" : "30%"}
            height={isMobile ? "100%" : "unset"}
            left={isMobile ? "unset" : "25vw"}
            width={isMobile ? "100%" : "50vw"}
            open={epicurePageStore ? epicureCartClearance : giftcardCartClearance}
            handleClose={epicurePageStore ? handleEpicureModalClose : giftCardHandleModalClose}
            webCloseIcon={ICONS?.CLOSE_WHITE_ICON}
            CloseIcon={ICONS?.CLOSE_GOLD_ICON}
            bgcolor={theme?.palette?.background?.paper}
            ModalCloseButtonStyles={{ right: "0vw", top: "-2vw" }}
            ModalCloseButtonColor={theme?.palette?.ihclPalette?.hexOne}
            Component={
              <DataClearanceDialog
                {...{
                  ...modalData,
                  handleClose: epicurePageStore ? handleEpicureModalClose : giftCardHandleModalClose,
                  isTajLogoClicked: epicurePageStore ? isEpicureTajLogoClicked : isGCTajLogoClicked,
                  isMyAccountClicked: epicurePageStore ? isEpicureMyAccountClicked : isGCMyAccountClicked,
                }}
              />
            }
          />
        </Box>
      )}
    </>
  )
}

export default observer(EpicurePurchaseFormHeader)
