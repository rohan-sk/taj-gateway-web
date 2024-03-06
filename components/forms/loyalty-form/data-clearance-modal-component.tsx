import {
  useContext,
  useRouter,
  observer,
  CONSTANTS,
  ROUTES,
  Stack,
  Typography,
  GLOBAL_STORES,
  StackDataStyle,
  StackData,
  useMobileCheck,
  ActionProps,
  aestheticItems,
  parameterMapItems,
  GiftCardStore,
  IHCLContext,
  RenderActionItem,
  PageContext,
  PAGE_STORES,
  manageGCStore,
  LoyaltyStore,
} from "./epicure-imports.component"

interface DataClearanceDialogProps {
  url: string
  title: string
  _type: string
  urlType: string
  ctaLabel: string
  largeVariant: string
  handleClose: Function
  alignmentVariant: string
  aesthetic: aestheticItems
  isTajLogoClicked: boolean
  PrimaryAction: ActionProps
  isMyAccountClicked: boolean
  isMultiBlockContent: boolean
  secondaryAction: ActionProps
  description: string
  parameterMap: parameterMapItems[]
}
const DataClearanceDialog = ({
  handleClose,
  parameterMap,
  PrimaryAction,
  secondaryAction,
  isTajLogoClicked,
  isMyAccountClicked,
  description,
}: DataClearanceDialogProps) => {
  const router = useRouter()
  const isMobile = useMobileCheck()

  const IHCLContexts = useContext(IHCLContext)
  const pageContext = useContext(PageContext)

  // epicure page store
  const epicurePageStore = pageContext?.getPageStore(
    PAGE_STORES.LOYALTY_STORES.loyaltyEpicureCardsStore,
  ) as LoyaltyStore

  const GCStore: any = IHCLContexts?.getGlobalStore(GLOBAL_STORES.giftCardStore) as GiftCardStore

  const giftCardManageStore = pageContext?.getPageStore(PAGE_STORES?.giftCardManageCard) as manageGCStore

  const goBackToPreviousPage = () => {
    if (GCStore.isUserTouchedForm) {
      const getGCStartPath = window?.sessionStorage.getItem("gcPurchaseStartPath")
      router.replace(getGCStartPath ?? "/")

      GCStore?.updateIsUserTouchedForm(false)
    } else global?.window?.history?.back()

    handleClose()
  }

  const handleClearCart = async () => {
    await giftCardManageStore?.GCClearCart()
    GCStore.updateCartDetails({}) // clearing cart details in store
    if (isTajLogoClicked) {
      GCStore?.updateIsUserTouchedForm(false)
      router?.push(ROUTES.WITHOUTSEO_FOR_ROUTING?.HOMEPAGE)
    } else if (isMyAccountClicked) {
      GCStore?.updateIsUserTouchedForm(false)
      router?.push(ROUTES.WITHOUTSEO_FOR_ROUTING.MY_ACCOUNT.OVERVIEW)
    } else {
      goBackToPreviousPage()
    }
    GCStore?.updateIsButtonDisabled(false)
    GCStore?.updateTcCheck(false)
  }

  const handleEpicureClearCart = async () => {
    await epicurePageStore?.EpicureEmptyCartAPI()
    if (isTajLogoClicked) {
      router?.push(ROUTES.WITHOUTSEO_FOR_ROUTING?.HOMEPAGE)
    } else if (isMyAccountClicked) {
      router?.push(ROUTES.WITHOUTSEO_FOR_ROUTING.MY_ACCOUNT.OVERVIEW)
    } else {
      global?.window?.history?.back()
    }
  }

  return (
    <>
      <StackDataStyle $isMobile={isMobile} aria-label="DataClearnceModalComponent">
        {parameterMap?.map?.(
          (item: any, index: number) =>
            ((isTajLogoClicked && item?.key === CONSTANTS?.TAJ_LOGO_CLICKED) ||
              (isMyAccountClicked && item?.key === CONSTANTS?.LOGIN_OR_MY_ACCOUNT_CLICKED) ||
              (!isTajLogoClicked && !isMyAccountClicked && item?.key === CONSTANTS?.BACK_BUTTON_CLICKED)) && (
              <Stack key={index}>
                <Typography variant={isMobile ? "m-heading-s" : "heading-s"}>
                  {isTajLogoClicked && item?.key === CONSTANTS?.TAJ_LOGO_CLICKED
                    ? item?.value
                    : isMyAccountClicked && item?.key === CONSTANTS?.LOGIN_OR_MY_ACCOUNT_CLICKED
                    ? item?.value
                    : !isTajLogoClicked &&
                      !isMyAccountClicked &&
                      item?.key === CONSTANTS?.BACK_BUTTON_CLICKED &&
                      item?.value}
                </Typography>
              </Stack>
            ),
        )}
        {description && <Typography variant={isMobile ? "m-body-l" : "body-l"}>{description}</Typography>}
        <StackData $isMobile={isMobile}>
          {PrimaryAction && (
            //* NO
            <RenderActionItem
              url={PrimaryAction?.url}
              isActionButtonType={true}
              title={PrimaryAction?.title}
              variant={PrimaryAction?.variant}
              navigationType={PrimaryAction?.urlType}
              buttonStyles={{
                width: isMobile ? "30.4vw" : "14vw",
              }}
              onClick={() => {
                handleClose()
              }}
            />
          )}
          {secondaryAction && (
            //* YES
            <RenderActionItem
              isActionButtonType={true}
              url={secondaryAction?.url}
              title={secondaryAction?.title}
              variant={secondaryAction?.variant}
              navigationType={secondaryAction?.urlType}
              buttonStyles={{
                width: isMobile ? "30.4vw" : "14vw",
              }}
              onClick={() => {
                if (epicurePageStore) {
                  handleEpicureClearCart()
                } else {
                  handleClearCart()
                }
              }}
            />
          )}
        </StackData>
      </StackDataStyle>
    </>
  )
}

export default observer(DataClearanceDialog)
