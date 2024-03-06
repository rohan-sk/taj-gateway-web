import React from "react"
import { theme } from "../../../lib/theme"
import { observer } from "mobx-react-lite"
import { Select } from "@mui/material"
import { useMobileCheck } from "../../../utils/isMobilView"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import {
  DropDownsStack,
  StyledInputLabel,
  VoucherFormControl,
  VoucherFilterMenuItem,
} from "../../../features/my-account/ui/styles/vouchers-filter-template"

/**
 * @returns
 * *Vouchers template UI in My Account voucher tab section
 */
const OffersFilterTemplate = ({
  filteredOffers,
  initialSelectedValue,
  setInitialSelectedValue,
}: any) => {
  const isMobile = useMobileCheck()

  //* * Offers dropdown data, need to replace with CMS data once get it
  const offerCategory: any = {
    mobileOfferType: "Category",
    webOfferType: "Select Offers Category",
    offers: [
      { offer: "All", labelType: "all" },
      { offer: "Stay", labelType: "stay" },
      { offer: "Dining", labelType: "dining" },
      { offer: "Spa", labelType: "spa" },
      { offer: "Experience", labelType: "experience" },
    ],
  }

  return (
    <>
      {filteredOffers?.length > 0 && (
        <DropDownsStack>
          <VoucherFormControl sx={{ width: isMobile ? "100%" : "13.229vw" }} variant="standard">
            <StyledInputLabel id="offer-input-label">
              {isMobile ? offerCategory?.mobileOfferType : offerCategory?.webOfferType}
            </StyledInputLabel>
            <Select
              id="offer-input"
              variant="standard"
              sx={{ width: "100%" }}
              label={initialSelectedValue}
              value={initialSelectedValue}
              labelId="offer-input-label"
              onChange={(e: any) => setInitialSelectedValue(e?.target?.value)}
              MenuProps={{
                PaperProps: {
                  elevation: 0,
                  sx: {
                    maxHeight: 300,
                    backgroundColor: theme?.palette?.background?.default,
                    borderRadius: "0",
                    boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
                  },
                },
              }}
              IconComponent={() => <KeyboardArrowDownIcon sx={{ cursor: "pointer" }} />}>
              {filteredOffers?.map((item: any, index: number) => (
                <VoucherFilterMenuItem key={index} value={item?.label}>
                  {item?.label}
                </VoucherFilterMenuItem>
              ))}
            </Select>
          </VoucherFormControl>
        </DropDownsStack>
      )}
    </>
  )
}

export default observer(OffersFilterTemplate)
