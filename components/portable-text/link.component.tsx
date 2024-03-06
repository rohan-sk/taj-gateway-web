import { useRouter } from "next/router"
import { PathType, variantTypes } from "../../types"
import { Typography } from "@mui/material"
import { ReactNode, useCallback, useContext } from "react"
import { useMobileCheck } from "../../utils/isMobilView"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { theme } from "../../lib/theme"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { GLOBAL_STORES } from "../../utils/Constants"
import { UserStore } from "../../store"
import { useLoggedIn } from "../../utils/hooks/useLoggedIn"
import { CrossSiteNavigation } from "../../utils/sso/cross-site-navigation"
import LoyaltyGlobalStore from "../../features/loyalty/store/globalStore/loyalty-global-store"
import { useMembershipType } from "../../utils/hooks/useMembershipType"

interface LinkProps {
  children?: ReactNode
  variant?: variantTypes
  color: string
  value?: {
    href?: string
    type?: PathType
    linkType?: string
  }
}

function Link({ value, variant, children, color }: LinkProps) {
  const { href, type } = value || {}
  const router = useRouter()
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const context = useContext(IHCLContext)
  const userStore = context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const epicureGlobalStore = context?.getGlobalStore(GLOBAL_STORES.loyaltyGlobalStore) as LoyaltyGlobalStore
  const loggedIn = useLoggedIn()
  const isMobileLinkType = value?.linkType === "mobile"
  const isCrossBrandRedirectionType = value?.linkType == "crossBrand"
  const isHyperlink = value?.linkType === "hyperLink"
  const isEpicureProgramTnc = value?.linkType === "epicureTnC"
  const memberShipPurchaseType = useMembershipType(epicureGlobalStore?.epicureCardData)
  const epicureBankName = router?.query?.bankName
  const isEpicureUrl = `${href}/${memberShipPurchaseType || epicureBankName}`
  const handleClick = useCallback(
    () => {
      if (href) {
        isCrossBrandRedirectionType
          ? CrossSiteNavigation({ url: href, loggedIn, userStore })
          : isEpicureProgramTnc
          ? navigate(isEpicureUrl, type)
          : navigate(href, type)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router, href, loggedIn, userStore, isCrossBrandRedirectionType],
  )
  return (
    <Typography
      variant={variant || (isMobile ? (isEpicureProgramTnc ? "m-body-l" : "m-text-link") : "link-m")}
      onClick={isMobileLinkType && !isMobile ? () => {} : handleClick}
      sx={{
        cursor: "pointer",
        display: isMobileLinkType ? (isMobile ? "inline-flex" : "initial") : "initial",
        color: color
          ? color
          : isHyperlink
          ? theme?.palette?.neuPalette?.hexSeventeen
          : isMobileLinkType
          ? isMobile
            ? theme?.palette?.neuPalette?.hexTwo
            : theme?.palette?.neuPalette?.hexSeventeen
          : theme?.palette?.neuPalette?.hexTwo, // inline color override  the variant so, when we pass the variant inline css set as empty the color getting correctly
        textDecoration: "none",
        fontWeight: variant ? "" : "300", // inline fontWeight override  the variant so, when we pass the variant inline css set as empty the fontWeight getting correctly
        letterSpacing: "0",
        "&:hover": {
          textDecoration: isHyperlink ? "underline" : "none",
        },
      }}>
      {children}
    </Typography>
  )
}

export default Link
