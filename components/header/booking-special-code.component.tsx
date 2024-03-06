import { Fragment, useContext, useState } from "react"
import { PathType } from "../types"
import dynamic from "next/dynamic"
import { theme } from "../../lib/theme"
import { CONSTANTS } from "../constants"
import { observer } from "mobx-react-lite"
import { ROUTES } from "../../utils/routes"
import { GLOBAL_STORES } from "../../utils/Constants"
import { useAppNavigation } from "../../utils/NavigationUtility"
const YellowBorderCheckbox = dynamic(() =>
  import("../hoc/yellow-border-checkbox").then((module) => module.YellowBorderCheckbox),
)
import { CloseGoldIcon, SelectedIcon } from "../../utils/customIcons"
import { ClickAwayListener, FormGroup, Stack, TextField, Typography } from "@mui/material"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import BookingFlowGlobalStore from "../../features/booking/store/globalStore/booking.flow.store"
import {
  FlexBox,
  CheckBox,
  AddButton,
  TermsTypography,
  SpecialCodeStack,
  ColumnDirectionBox,
  TermsLinkTypography,
  SpecialCodeDropDownBox,
  SpecialCodeDropDownDivider,
  InputTextField,
} from "./styles/booking-flow-header"
import SpecialCodeData from "../header/promo-codes.json"
import { ErrorTypography } from "./styles/booking-menu"

const BookingFlowSpecialCodeComponent = ({
  handleSpecialCode,
  boxStyles,
  currentRoomCount = 1,
  isGinger = false,
}: any) => {
  const navigate = useAppNavigation()
  const context: any = useContext(IHCLContext)

  //* Booking Flow Global Store
  const bookingFlowGlobalStore = context?.getGlobalStore(GLOBAL_STORES?.bookingFlowStore) as BookingFlowGlobalStore

  const { userEnteredPromoCode, setUserEnteredPromoCode, isCouponCodeOpen } = bookingFlowGlobalStore

  const [checked, setChecked] = useState<boolean>(false)
  const [userEnteredCode, setUserEnteredCode] = useState("")
  const [selectedIndex, setSelectedIndex] = useState<number>(isCouponCodeOpen ? 6 : -1)

  const isSpecialCodeExist =
    userEnteredPromoCode?.promoCode || userEnteredPromoCode?.couponCode || userEnteredPromoCode?.agentId

  const handleCode = (event: any) => {
    setUserEnteredCode(event.target.value)
  }

  const getAddButtonState = () => {
    // for Coupon Code
    // if (selectedIndex === SpecialCodeData?.promoCodes?.length - 0) {
    //   return !checked || userEnteredCode?.length < 3 || currentRoomCount > 1 || isGinger
    // }
    // else
    if (selectedIndex === 2) {
      // for Travel Agency Code
      return userEnteredCode?.length < 3 || isGinger
    } else {
      // for Other Codes
      return userEnteredCode?.length < 3
    }
  }

  const handlePromoCodeSelection = (index: number) => {
    if (isSpecialCodeExist && index !== 0) {
      handleSpecialCode()
    } else if (isSpecialCodeExist && index === 0) {
      setUserEnteredPromoCode({
        title: "",
        index: null,
        agentId: null,
        promoCode: null,
        couponCode: null,
      })
      handleSpecialCode()
    } else if (index !== 0) {
      setSelectedIndex(index)
    } else {
      handleSpecialCode()
    }
  }

  const handleRemoveSpecialCode = () => {
    setUserEnteredPromoCode({
      title: "",
      agentId: null,
      promoCode: null,
      couponCode: null,
      index: null,
    })
    //, handleSpecialCode()
  }
  return (
    <div aria-label="BookingFlowSpecialCodeComponent">
      <ClickAwayListener onClickAway={handleSpecialCode}>
        <SpecialCodeDropDownBox sx={{ ...boxStyles }}>
          {SpecialCodeData?.promoCodes?.map((code: any, index: number) => (
            <Fragment key={index}>
              <ColumnDirectionBox key={index}>
                <FlexBox
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={() => handlePromoCodeSelection(index)}>
                  <SelectedIcon
                    sx={{
                      height: "1vw",
                      width: "1.3vw",
                      paddingRight: "0.520vw",
                      visibility:
                        index == userEnteredPromoCode?.index || (index == 0 && !userEnteredPromoCode?.index)
                          ? "visible"
                          : "hidden",
                    }}
                  />
                  <Typography variant="body-ml">{code?.title}</Typography>
                </FlexBox>
                {((isSpecialCodeExist && index == userEnteredPromoCode?.index) ||
                  (index === selectedIndex && index !== 0)) && (
                  <ColumnDirectionBox>
                    {isSpecialCodeExist && index == userEnteredPromoCode?.index ? (
                      <SpecialCodeStack>
                        <Typography variant="body-ml" sx={{ color: theme.palette.ihclPalette.hexTwo }}>
                          {isSpecialCodeExist}
                        </Typography>
                        <CloseGoldIcon
                          sx={{
                            width: "0.8vw",
                            height: "0.8vw",
                            cursor: "pointer",
                          }}
                          onClick={() => handleRemoveSpecialCode()}
                        />
                      </SpecialCodeStack>
                    ) : (
                      <Stack flexDirection={"column"}>
                        <FormGroup
                          row
                          sx={{
                            flexWrap: "nowrap",
                            marginTop: "1.04vw",
                            marginLeft: "1.563vw",
                            justifyContent: "flex-start",
                          }}>
                          <InputTextField
                            variant="standard"
                            placeholder="Enter code"
                            required
                            value={userEnteredCode}
                            onChange={(e) => handleCode(e)}
                          />
                          <AddButton
                            disabled={getAddButtonState()}
                            onClick={() => {
                              setUserEnteredPromoCode({
                                index: index,
                                title: code?.title,
                                agentId: code?.agentId === "undefined" ? userEnteredCode : null,
                                promoCode: code?.promoCode === "undefined" ? userEnteredCode : null,
                                couponCode: code?.couponCode === "undefined" ? userEnteredCode : null,
                              })
                              handleSpecialCode()
                            }}>
                            {CONSTANTS?.ADD}
                          </AddButton>
                        </FormGroup>
                        {selectedIndex == 6 && (
                          <ErrorTypography textAlign={"center"}>
                            {isGinger
                              ? CONSTANTS?.COUPON_CODE_ERROR_MESSAGE
                              : currentRoomCount > 1
                              ? CONSTANTS?.COUPON_CODE_WARNING
                              : ""}
                          </ErrorTypography>
                        )}
                        {selectedIndex == 2 && isGinger && (
                          <ErrorTypography textAlign={"center"}>
                            {CONSTANTS?.TRAVEL_AGENCY_ERROR_MESSAGE}
                          </ErrorTypography>
                        )}
                      </Stack>
                    )}
                    {/* {selectedIndex === SpecialCodeData?.promoCodes?.length - 1 && (
                        <CheckBox>
                          <YellowBorderCheckbox
                            sx={{ marginRight: "0.521vw" }}
                            onChange={() => setChecked(!checked)}
                            checked={checked || !!userEnteredPromoCode?.title}
                          />
                          <TermsTypography>{CONSTANTS?.CHECK_BOX_LABEL}</TermsTypography>
                          <TermsLinkTypography
                            onClick={() => {
                              navigate(ROUTES?.CC_TERMS_AND_CONDITIONS, PathType.external)
                            }}>
                            {CONSTANTS?.TERMS_AND_CONDITIONS}
                          </TermsLinkTypography>
                        </CheckBox>
                      )} */}
                  </ColumnDirectionBox>
                )}
                {index !== SpecialCodeData?.promoCodes?.length - 1 && <SpecialCodeDropDownDivider />}
              </ColumnDirectionBox>
            </Fragment>
          ))}
        </SpecialCodeDropDownBox>
      </ClickAwayListener>
    </div>
  )
}

export default observer(BookingFlowSpecialCodeComponent)
