import { fonts, theme } from "../../../lib/theme"
import { transientProps } from "../../../utils/transientProps"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { Box, Stack, Button, styled, Divider, TextField, Typography, TextareaAutosize } from "@mui/material"

export const GiftCardBox = styled(Box)(() => ({
  display: "flex",
  flexWrap: "nowrap",
  paddingTop: "1vw",

  "@media (max-width: 640px)": {
    flexWrap: "wrap",
    alignItems: "inherit",
    flexDirection: "column",
  },
}))

export const GiftCardGapBox = styled(Box)(() => ({
  display: "flex",
  paddingTop: "2.08vw",
  flexWrap: "wrap",
  gap: "1.3vw",
  width: "100%",
  "@media (max-width: 640px)": {
    flexDirection: "column",
    alignItems: "flex-start",
  },
}))

export const CharactersTypography = styled(
  Typography,
  transientProps,
)<{ $isMobile: boolean; $formValuesLength: boolean }>(({ $isMobile, $formValuesLength }) => ({
  float: "right",
  position: "relative",
  color: theme?.palette?.text?.primary,
  bottom: $isMobile ? ($formValuesLength ? 0 : MobilePxToVw(35)) : DesktopPxToVw(35),
}))

export const AutoSizeTextArea = styled(TextareaAutosize)(() => ({
  width: "100%",
  border: "none",
  fontWeight: 300,
  lineHeight: "150%",
  fontSize: DesktopPxToVw(18),
  fontFamily: "Inter",
  borderBottom: `0.05vw solid ${theme?.palette?.text?.primary}`,

  "&  .MuiFormHelperText-root": {
    color: theme?.palette?.text?.primary,
  },

  "&::placeholder": {
    opacity: 1,
    fontWeight: 400,
    fontFamily: "Inter",
    color: theme?.palette?.text?.primary,
    textOverflow: "ellipsis !important",
  },

  "&:hover": {
    borderBottom: `0.05vw solid ${theme?.palette?.text?.primary}`,
  },

  "&:focus": {
    outline: "none",
  },

  "@media (max-width: 640px)": {
    opacity: 1,
    fontSize: MobilePxToVw(18),
    paddingTop: MobilePxToVw(30),

    "&::placeholder": {
      fontWeight: 300,
      lineHeight: "150%",
    },
  },
}))

export const InputText = styled(TextField)(() => ({
  width: "22.96vw",
  "& .MuiInput-input": {
    fontWeight: "300 !important",
    lineHeight: "140%",
  },
  "& .Mui-error": {
    color: `${theme?.palette?.ihclPalette?.hexThirtyTwo} !important`,
  },
  "& .MuiInputBase-root.MuiInput-root": {
    "&::before": {
      borderBottomStyle: "solid!important",
    },
  },

  "& .MuiFormHelperText-root": {
    color: theme?.palette?.ihclPalette?.hexThirtyTwo,
  },

  input: {
    fontFamily: "Inter",
    fontWeight: 300,
    color: theme?.palette?.ihclPalette?.hexSeventeen,
    background: "none !important",
    "&::placeholder": {
      fontFamily: "Inter",
      opacity: 1,
      fontWeight: "300 !important",
      textOverflow: "ellipsis !important",
      color: theme?.palette?.ihclPalette?.hexSeventeen,
    },
  },

  "@media (max-width: 640px)": {
    width: "100%",
    "&  .MuiFormHelperText-root": {},
    padding: `${MobilePxToVw(15)} 0vw `,
    input: {
      "&::placeholder": {
        textOverflow: "ellipsis !important",
        fontWeight: 300,
        opacity: 1,
      },
    },
  },
}))

export const TypographyCheckBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "0.4vw",
  letterSpacing: "0",
  minWidth: "14.06vw",
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  "@media (max-width: 640px)": {
    padding: `${MobilePxToVw(15)} 0vw `,
  },
}))

export const SectionTitle = styled(Typography)(() => ({
  color: theme?.palette?.ihclPalette?.hexSeventeen,
}))
export const GCSectionTitle = styled(Typography)(() => ({
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  "@media (max-width: 640px)": {
    margin: `${MobilePxToVw(25)} 0vw`,
  },
}))

export const CountryCodeDropdownBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "flex-end",
  "& .MuiSvgIcon-root": {
    marginBottom: "0.3vw",
  },
  "@media (max-width:640px)": {
    height: "6.25vw",
    "& .MuiFormControl-root.MuiTextField-root": {
      marginBottom: "0px!important",
    },
    "& .MuiSvgIcon-root": {
      right: "0vw",
      marginBottom: "0vw",
    },
    "& .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-colorPrimary": {
      minWidth: "fit-content!important",
    },
  },
}))

export const BulkGiftMobileNumberBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "flex-end",
  height: "2.083vw",

  "@media (max-width:640px)": {
    height: "6.25vw",
    "& .MuiFormControl-root.MuiTextField-root": {
      marginBottom: "0px!important",
    },
    "& .MuiInputBase-root.MuiInput-root": {
      minWidth: "0vw",
    },
    "& input": {
      marginLeft: "2.5vw",
    },
    "& .MuiSvgIcon-root": {
      right: 0,
    },
  },
}))

export const PhoneWrapper = styled(Box)(() => ({
  display: "flex",
  gap: "2vw",
  alignItems: "end",
}))

export const ORBox = styled(Box)(() => ({
  gap: "0.521vw",
  display: "flex",
  padding: "0vw 1vw",
  alignItems: "center",
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  height: DesktopPxToVw(70),
  "@media (max-width: 640px)": {
    gap: "1.563vw",
    padding: "0vw",
    justifyContent: "center",
  },
}))

export const ORDivider: any = styled(Divider)(() => ({
  width: "2.083vw",
  height: "0.052vw",
  background: theme?.palette?.text?.primary,

  "@media (max-width: 640px)": {
    width: "6.25vw",
    height: "0.156vw",
  },
}))

export const AmountAndQtyBox = styled(Box)(() => ({
  columnGap: DesktopPxToVw(40),
  display: "flex",
  alignItems: "baseline",
  marginTop: DesktopPxToVw(10),
  "@media (max-width: 640px)": {
    rowGap: MobilePxToVw(19),
    flexDirection: "column",
    marginTop: MobilePxToVw(34),
  },
}))

export const AdditionalSubText = styled(
  Typography,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  fontWeight: "300",
  // paddingTop: DesktopPxToVw(10),               // Due to the ADDITIONAL DELIVERY METHODS Title is removed, so top padding commented
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  "@media (max-width: 640px)": {
    paddingTop: MobilePxToVw(10),
  },
  "> span": {
    fontSize: $isMobile ? MobilePxToVw(22) : DesktopPxToVw(18),
  },
}))

export const AutoCompleteInput = styled(TextField)(() => ({
  "& .MuiInputLabel-root": {
    opacity: 1,
    fontWeight: "300 !important",
    fontSize: DesktopPxToVw(24),
    color: theme?.palette?.ihclPalette?.hexSeventeen,
    "@media (max-width: 640px)": {
      fontSize: MobilePxToVw(24),
    },
  },
  "& .Mui-error": {
    color: `${theme?.palette?.ihclPalette?.hexThirtyTwo} !important`,
    ":after": {
      color: `${theme?.palette?.ihclPalette?.hexThirtyTwo} !important`,
      borderBottom: `2px solid ${theme?.palette?.ihclPalette?.hexThirtyTwo}!important`,
    },
    ":before": {
      color: `${theme?.palette?.ihclPalette?.hexThirtyTwo} !important`,
      borderBottomColor: `${theme?.palette?.ihclPalette?.hexThirtyTwo} !important`,
    },
  },
  "& .MuiInput-input": {
    fontWeight: "300 !important",
    color: theme?.palette?.ihclPalette?.hexSeventeen,
    fontSize: DesktopPxToVw(24),
  },
  paddingTop: "0.2vw",
  "&  .MuiFormHelperText-root": {
    fontFamily: "Inter",
    color: theme?.palette?.ihclPalette?.hexTen,
    fontSize: DesktopPxToVw(18),
    "@media (max-width: 640px)": {
      fontSize: MobilePxToVw(18),
    },
  },
  "& .MuiInputBase-root": {
    alignItems: "baseline",
  },
  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      fontWeight: 300,
      opacity: 1,
      fontSize: DesktopPxToVw(24),
      color: theme?.palette?.ihclPalette?.hexSeventeen,
    },
  },
  "@media (max-width: 640px)": {
    paddingBottom: "4.688vw",
    "& .MuiInput-input": {
      fontSize: MobilePxToVw(24),
    },
    input: {
      "&::placeholder": {
        fontSize: MobilePxToVw(24),
      },
    },
  },
  ".MuiFormLabel-root": {
    color: `${theme?.palette?.ihclPalette?.hexSeventeen} !important`,
    ".MuiFormLabel-asterisk": {
      color: `${theme?.palette?.ihclPalette?.hexSeventeen} !important`,
    },
  },
}))

export const MobileNumberInput = styled(TextField)(() => ({
  "& .MuiInput-input": {
    fontSize: DesktopPxToVw(24),
  },
  "& .MuiInputBase-root.MuiInput-root": {
    "&::before": {
      borderBottomStyle: "solid!important",
    },
  },
  input: {
    "&::placeholder": {
      paddingLeft: "0.5vw",
      textOverflow: "ellipsis !important",
      fontWeight: 500,
      opacity: 1,
      fontSize: DesktopPxToVw(24),
      color: theme?.palette?.ihclPalette?.hexSeventeen,
    },
  },
  "@media (max-width: 640px)": {
    "& .MuiInput-input": {
      width: "100%",
      fontSize: MobilePxToVw(24),
    },
    input: {
      paddingBottom: "0.5vw",
      "&::placeholder": {
        fontSize: MobilePxToVw(24),
      },
    },
  },
}))
export const FormBox = styled(Box)(() => ({
  "@media (max-width: 640px)": {
    padding: "0",
  },
  // padding: "0vw 12.5vw 0vw 12.5vw",
}))

export const FormInnerBox = styled(Box)(() => ({
  padding: "0vw 0vw 4vw 0vw",
}))

export const StyledButton = styled(
  Button,
  transientProps,
)<{ $active: boolean }>(({ $active }) => ({
  border: `1px solid ${theme?.palette?.ihclPalette?.hexTwo}`,
  backgroundColor: $active ? theme?.palette?.ihclPalette?.hexTwo : theme?.palette?.ihclPalette?.hexOne,
  color: $active ? theme?.palette?.ihclPalette?.hexOne : theme?.palette?.ihclPalette?.hexTwo,
  "&:hover": {
    backgroundColor: $active ? theme?.palette?.ihclPalette?.hexTwo : theme?.palette?.ihclPalette?.hexOne,
    color: $active ? theme?.palette?.ihclPalette?.hexOne : theme?.palette?.ihclPalette?.hexTwo,
  },
  whiteSpace: "nowrap",
  "@media (max-width: 640px)": {
    height: "11.094vw",
    fontSize: MobilePxToVw(22),
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: 300,
    lineHeight: "140%",
  },
}))

export const ButtonsBox = styled(Box)(() => ({
  gap: "1.042vw",
  display: "flex",

  "@media (max-width: 640px)": {
    gap: "3vw",
    justifyContent: "center",
    paddingTop: MobilePxToVw(30),
  },
}))

export const DateTextField = styled(
  TextField,
  transientProps,
)<{ $value: string }>(({ $value }) => ({
  width: "22.96vw",
  "& .Mui-error": {
    color: theme?.palette?.ihclPalette?.hexTen,
    fontSize: DesktopPxToVw(18),
    "@media (max-width: 640px)": {
      fontSize: MobilePxToVw(18),
    },
  },
  "& .MuiIconButton-root": {
    right: "1vw",
  },
  "& .Mui-error:before": {
    borderBottomColor:
      $value?.length === 0
        ? `${theme?.palette?.ihclPalette?.hexTwenty} !important`
        : theme?.palette?.ihclPalette?.hexTen,
    color: theme?.palette?.ihclPalette?.hexTen,
  },
  "& .MuiInput-input": {
    fontSize: DesktopPxToVw(24),
  },
  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      fontWeight: 300,
      opacity: 1,
      fontSize: DesktopPxToVw(24),
      color: theme?.palette?.ihclPalette?.hexSeventeen,
    },
  },
  "@media (max-width: 640px)": {
    width: "100%",
    margin: "6vw 0vw",
    "& .MuiInput-input": {
      fontSize: MobilePxToVw(24),
    },
    input: {
      "&::placeholder": {
        fontSize: MobilePxToVw(24),
      },
    },
  },
}))

export const CheckBoxTextWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  gap: DesktopPxToVw(100),

  "@media (max-width: 640px)": {
    width: "100%",
  },
}))
export const TitleTextWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  columnGap: DesktopPxToVw(20),
  alignItems: "center",
  "@media (max-width: 640px)": {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: MobilePxToVw(0),
  },
}))

export const PurchaseForBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  columnGap: DesktopPxToVw(10),
  "@media (max-width: 640px)": {
    width: "100%",
    columnGap: MobilePxToVw(27),
  },
}))

export const AdditionalDeliveryContainer = styled(
  Box,
  transientProps,
)<{ $selfPurchase: boolean }>(() => ({
  display: "flex",
  flexDirection: "column",
}))

export const CountryCodeDropDownMobileStyles = styled(Box)(() => ({
  "@media (max-width:640px)": {
    background: theme?.palette?.background?.paper,
    "& .MuiTypography-root": {
      margin: "0vw 0vw 0vw 1.406vw!important",
      lineHeight: "0vw",
      paddingBottom: "0vw",
      position: "static!important",
    },

    "& .MuiInputBase-root.MuiInput-root.MuiSelect-root": {
      padding: "3.2vw!important",
    },
    "& .MuiSelect-select.MuiSelect-standard.MuiInputBase-input.MuiInput-input": {
      background: theme?.palette?.background?.paper,
      minWidth: "0vw",
      width: "fit-content",
    },
    "& .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-colorPrimary": {
      paddingBottom: "3.3vw",
      width: "15.625vw",
      "@media (max-width:640px)": {
        paddingBottom: "0vw",
      },
    },
    "& .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-colorPrimary> .MuiBox-root": {
      marginLeft: "1vw",
    },
    "& .MuiSvgIcon-root": {
      right: "0vw!important",
    },
  },
}))

export const CountryCodeNumberInputMobileStyles = styled(Box)(() => ({
  flexGrow: "1",
  flexShrink: "1",
  WebkitFlexGrow: "1",
  WebkitFlexShrink: "1",
  "@media (max-width:640px)": {
    "& .MuiFormControl-root.MuiTextField-root": {
      width: "100%",
    },
    "& .MuiInputBase-root.MuiInput-root": {
      paddingBottom: "0vw",
      minWidth: "fit-content",
    },
    "& .MuiSvgIcon-root": {
      right: "0vw!important",
    },
    "& .MuiInput-input": {
      width: "100%!important",
    },
  },
}))

export const DatePickerMobileStylesWrapper = styled(Box)(() => ({
  "@media (max-width:640px)": {
    marginBottom: "5.469vw",
    "& .MuiFormControl-root.MuiTextField-root": {
      width: "100%",
    },
  },
}))

export const EventGuestWrapper = styled(Box)(() => ({
  display: "flex",
  width: "100%",
  gap: "2.083vw",
  "@media (max-width:640px)": {
    gap: '"3.125vw"',
    alignItems: "center",
  },
}))

export const TitleWrapper = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: DesktopPxToVw(35),
  "@media (max-width:640px)": {
    marginBottom: MobilePxToVw(60),
  },
}))

export const ErrorMessageTypography = styled(Typography)(() => ({
  textAlign: "start",
  fontSize: `${DesktopPxToVw(18)}!important`,
  fontFamily: fonts?.body,
  fontWeight: 300,
  color: theme?.palette?.ihclPalette?.hexThirtyTwo,
  alignSelf: "self-start",
  lineHeight: "140%",
  "@media (max-width: 640px)": {
    fontSize: `${MobilePxToVw(18)}!important`,
  },
}))

export const GiftCardPrimaryBox = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  flexWrap: $isMobile ? "wrap" : "nowrap",
  justifyContent: "space-between",
  gap: $isMobile ? MobilePxToVw(17) : DesktopPxToVw(40),
  paddingTop: $isMobile ? MobilePxToVw(14) : DesktopPxToVw(13),

  "@media (max-width: 640px)": {
    alignItems: "inherit",
    flexDirection: "column",
  },
}))

export const GiftCardSecondaryWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  flexWrap: $isMobile ? "wrap" : "nowrap",
  justifyContent: "space-between",
  gap: $isMobile ? MobilePxToVw(12) : DesktopPxToVw(40),
  paddingTop: $isMobile ? MobilePxToVw(17) : DesktopPxToVw(12),

  "@media (max-width: 640px)": {
    alignItems: "inherit",
    flexDirection: "column",
  },
}))

export const GiftCardReceiverAddressWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean; $pincodeError: any }>(({ $isMobile }) => ({
  display: "flex",
  flexWrap: $isMobile ? "wrap" : "nowrap",
  justifyContent: "space-between",
  gap: $isMobile ? MobilePxToVw(17) : DesktopPxToVw(40),
  paddingTop: $isMobile ? MobilePxToVw(17) : DesktopPxToVw(13),
  alignItems: "baseline",
  "@media (max-width: 640px)": {
    flexDirection: "column",
  },
}))

export const GiftCardStateContentWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  flexWrap: $isMobile ? "wrap" : "nowrap",
  justifyContent: "space-between",
  gap: $isMobile ? MobilePxToVw(12) : DesktopPxToVw(40),
  paddingTop: $isMobile ? MobilePxToVw(16) : DesktopPxToVw(20),

  "@media (max-width: 640px)": {
    alignItems: "inherit",
    flexDirection: "column",
  },
}))

export const GiftCardLocalizationProviderWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  flexWrap: "wrap",
  width: "100%",
  gap: $isMobile ? MobilePxToVw(33) : DesktopPxToVw(40),
  paddingTop: $isMobile ? MobilePxToVw(35) : DesktopPxToVw(30),
  "@media (max-width: 640px)": {
    flexDirection: "column",
    alignItems: "flex-start",
  },
}))

export const GiftCardCheckBoxTextWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  alignItems: "baseline",
  gap: DesktopPxToVw(10),
  paddingTop: $isMobile ? MobilePxToVw(35) : DesktopPxToVw(20),
  "@media (max-width: 640px)": {
    gap: MobilePxToVw(35),
    flexDirection: "column",
    alignItems: "flex-start",
  },
}))

export const VenueEnquiryMobileNumberInput = styled(TextField)(() => ({
  "& .MuiInput-input": {
    fontWeight: 300,
    lineHeight: "150%",
    fontFamily: "Inter",
    fontSize: DesktopPxToVw(24),
  },
  "& .MuiInputBase-root.MuiInput-root": {
    "&::before": {
      borderBottomStyle: "solid!important",
    },
  },
  input: {
    "&::placeholder": {
      opacity: 1,
      fontWeight: 300,
      paddingLeft: "0vw",
      lineHeight: "150%",
      fontFamily: "Inter",
      fontSize: DesktopPxToVw(24),
      textOverflow: "ellipsis !important",
      color: theme?.palette?.ihclPalette?.hexSeventeen,
    },
  },
  "@media (max-width: 640px)": {
    "& .MuiInput-input": {
      width: "100%",
      fontSize: MobilePxToVw(24),
    },
    input: {
      paddingBottom: "1.5vw",
      "&::placeholder": {
        fontSize: MobilePxToVw(24),
      },
    },
  },
}))

export const GiftCardQuantityInputFieldWrapper = styled(
  Stack,
  transientProps,
)<{ $isMobile: boolean; $quantityErrorMessage: boolean }>(({ $isMobile, $quantityErrorMessage }) => ({
  marginTop: $isMobile ? "-0.03vw" : "0.1vw",
  "& label": {
    color: $quantityErrorMessage
      ? `${theme?.palette?.ihclPalette?.hexThirtyTwo} !important`
      : theme?.palette?.ihclPalette?.hexSeventeen,
  },
  "& .MuiFormControl-root": {
    margin: $isMobile ? `13px 0vw 0vw` : "9px 0vw 0vw",
  },
  "& .MuiInputBase-root:before": {
    borderBottom: $quantityErrorMessage
      ? `1px solid ${theme?.palette?.ihclPalette?.hexThirtyTwo}`
      : `1px solid ${theme?.palette?.ihclPalette?.rgbaFive}`,
  },
  "& .MuiInputBase-root:after": {
    borderBottom: $quantityErrorMessage
      ? `2px solid ${theme?.palette?.ihclPalette?.hexThirtyTwo}`
      : `2px solid ${theme?.palette?.ihclPalette?.hexSeventeen}`,
  },
  ".MuiFormLabel-root": {
    color: `${theme?.palette?.ihclPalette?.hexSeventeen} !important`,
    ".MuiFormLabel-asterisk": {
      color: `${theme?.palette?.ihclPalette?.hexSeventeen} !important`,
    },
  },
}))

export const ErrorMessageTitle = styled(Typography)(() => ({
  color: theme?.palette?.ihclPalette?.hexThirtyTwo,
  fontSize: DesktopPxToVw(18),
  "@media (max-width: 640px)": {
    fontSize: "3vw",
    lineHight: "4vw",
  },
}))

export const CustomCheckBoxWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  "@media (max-width: 640px)": {
    width: "100%",
    justifyContent: "flex-start",
    gap: MobilePxToVw(57),
  },
}))

export const CustomCheckBoxContent = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  letterSpacing: "0",
  minWidth: "14.06vw",
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  padding: `0vw !important`,
  "@media (max-width: 640px)": {
    padding: `${MobilePxToVw(15)} 0vw `,
    gap: MobilePxToVw(20),
  },
}))

export const GiftCardsQuantityWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  justifyContent: "space-between",
  rowGap: $isMobile ? MobilePxToVw(10) : "",
  alignItems: $isMobile ? "center" : "normal",
  flexDirection: $isMobile ? "column" : "row",
  border: `1px solid ${theme?.palette?.ihclPalette?.hexTwo}`,
  padding: $isMobile ? MobilePxToVw(20) : DesktopPxToVw(20),
}))
// Gc Review Description container styles
export const GcReviewTotalAmountBox = styled(Box)(() => ({
  display: "flex",
  textAlign: "center",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: "2vw",
}))

// Gc Review card form styles

export const GcReviewCardFormCustomMessageBox = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  width: $isMobile ? "80%" : "100%",
  margin: $isMobile ? `0 ${MobilePxToVw(45)} ${MobilePxToVw(35)}` : "",
  padding: $isMobile ? MobilePxToVw(20) : DesktopPxToVw(20),
}))

export const ReceiverDetailsTitleTextWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  columnGap: DesktopPxToVw(40),
  alignItems: $isMobile ? "flex-start" : "center",
  flexDirection: $isMobile ? "column-reverse" : "row",
}))

export const GiftcardEnterDetailsMainWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  padding: $isMobile ? "unset" : `${DesktopPxToVw(60)}`,
  "& .MuiFormHelperText-root": {
    fontStyle: "normal",
    lineHeight: "1.875vw",
    fontFamily: "Inter",
    fontWeight: 300,
  },
}))

export const CustomerDetailsDataWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  paddingTop: $isMobile ? `${MobilePxToVw(55)}` : `${DesktopPxToVw(60)}`,
}))

export const RenderActionsButtonsBox = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean; $isCurrentPage: boolean }>(({ $isMobile, $isCurrentPage }) => ({
  display: "flex",
  gap: $isCurrentPage ? ($isMobile ? MobilePxToVw(15) : DesktopPxToVw(15)) : "0vw",
  justifyContent: $isCurrentPage ? "center" : "initial",
}))

export const YourMessageContainerWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  position: "relative",
  paddingTop: $isMobile ? MobilePxToVw(35) : DesktopPxToVw(34),
}))

export const PortableTextContentFontWrapper = styled(
  Stack,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  "> span": {
    fontSize: $isMobile ? MobilePxToVw(24) : DesktopPxToVw(18),
    letterSpacing: "-0.02em",
  },
}))

export const PortableTextBox = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  "> span": {
    fontSize: $isMobile ? MobilePxToVw(18) : DesktopPxToVw(18),
    whiteSpace: $isMobile ? "nowrap" : "normal",
  },
}))

export const AmountTypography = styled(
  Typography,
  transientProps,
)<{
  $isMobile: boolean
  $confirmationAlignment: any
  $isIos: boolean
  $isDownloadPagePDF: boolean
  $isDownloadPDFPageFromShareIcon: boolean
}>(({ $isMobile, $confirmationAlignment, $isIos, $isDownloadPagePDF, $isDownloadPDFPageFromShareIcon }) => ({
  position: "absolute",
  color: theme?.palette?.ihclPalette?.hexTwo,
  left: $isMobile
    ? $confirmationAlignment
      ? $isDownloadPDFPageFromShareIcon
        ? $isIos
          ? "105vw"
          : "85vw"
        : $isDownloadPagePDF
        ? $isIos
          ? "100vw"
          : "80vw"
        : $isIos
        ? "31vw"
        : MobilePxToVw(109.5)
      : MobilePxToVw(82)
    : $confirmationAlignment
    ? DesktopPxToVw(300)
    : DesktopPxToVw(152),
  bottom: $isMobile
    ? $confirmationAlignment
      ? $isDownloadPDFPageFromShareIcon
        ? $isIos
          ? "90vw"
          : "65vw"
        : $isDownloadPagePDF
        ? $isIos
          ? "117vw"
          : "80vw"
        : $isIos
        ? "50vw"
        : MobilePxToVw(150)
      : MobilePxToVw(127)
    : $confirmationAlignment
    ? $isDownloadPagePDF
      ? DesktopPxToVw(500)
      : DesktopPxToVw(470)
    : DesktopPxToVw(250),
  fontSize: $isMobile
    ? $confirmationAlignment && $isDownloadPDFPageFromShareIcon
      ? $isIos
        ? "40px"
        : "40px"
      : $confirmationAlignment && $isDownloadPagePDF
      ? $isIos
        ? "40px"
        : "40px"
      : $confirmationAlignment && $isIos
      ? "32px"
      : MobilePxToVw(32)
    : $confirmationAlignment
    ? $isDownloadPagePDF
      ? "40px"
      : "32px"
    : DesktopPxToVw(32),
  lineHeight: $confirmationAlignment ? "140%" : "",
}))

export const TCBox = styled(Box)(() => ({
  display: "flex",
  padding: " 2vw 0vw",
  justifyContent: "center",
  gap: DesktopPxToVw(20),
  alignItems: "center",
  "@media (max-width: 640px)": {
    margin: `${MobilePxToVw(30)} 0vw`,
    gap: MobilePxToVw(25),
  },
}))

export const SenderMobileWrapperContent = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  width: $isMobile ? "100%" : "50%",
  paddingTop: $isMobile ? MobilePxToVw(25) : "unset",
}))

export const ReceiverCountryCodeWrapperContent = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  width: $isMobile ? "100%" : "50%",
  paddingTop: $isMobile ? MobilePxToVw(25) : "unset",
}))

export const AdditionalReceiverCountryContent = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  width: $isMobile ? "100%" : "45%",
  paddingTop: $isMobile ? MobilePxToVw(25) : "unset",
}))

export const GiftCardReceiverFormSecondaryWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  flexWrap: $isMobile ? "wrap" : "nowrap",
  justifyContent: "space-between",
  gap: $isMobile ? MobilePxToVw(35) : DesktopPxToVw(40),
  paddingTop: $isMobile ? MobilePxToVw(17) : DesktopPxToVw(18),

  "@media (max-width: 640px)": {
    alignItems: "inherit",
    flexDirection: "column",
  },
}))
