import { theme } from "../../../lib/theme"
import { transientProps } from "../../../utils/transientProps"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { Tab, Box, Grid, Tabs, Stack, styled, Divider, TextField, Typography } from "@mui/material"

export const TitleContainer = styled(Box)(() => ({
  paddingTop: DesktopPxToVw(15),
}))

export const FormContainer = styled(Grid)(() => ({
  paddingBottom: DesktopPxToVw(40),
  justifyContent: "space-between",
}))

export const BalanceContainer = styled(Box)(() => ({
  paddingTop: DesktopPxToVw(20),
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  "@media (max-width: 640px)": {
    paddingTop: MobilePxToVw(90),
  },
}))

export const BalanceTitle = styled(Typography)(() => ({
  color: theme?.palette?.ihclPalette?.hexTwo,
  paddingTop: DesktopPxToVw(13),
}))

export const TitleTypography = styled(Typography)(() => ({
  lineHeight: "6vw",
  textAlign: "center",
}))

export const GridContainer = styled(Grid)(() => ({
  boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
  padding: "2vw 8vw 2.34vw 8vw",
  margin: "0vw 23.42vw",
}))

export const InputContainer = styled(TextField)(() => ({
  input: {
    fontSize: DesktopPxToVw(24),
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: "black",
      fontWeight: 300,
      opacity: 0.7,
      fontSize: DesktopPxToVw(24),
    },
    "@media (max-width: 640px)": {
      fontSize: MobilePxToVw(24),
      paddingTop: MobilePxToVw(30),
      "&::placeholder": {
        fontSize: MobilePxToVw(24),
      },
    },
  },
}))

export const TabsContainer = styled(Tabs)(() => ({
  borderBottom: `2px  solid ${theme?.palette?.ihclPalette?.hexNineteen}`,
  justifyContent: "center !important",
  "& .MuiTab-root.Mui-selected": {
    color: theme?.palette?.ihclPalette?.hexTwo,
  },
}))

export const BoxContainer = styled(Box)(() => ({
  padding: "0vw 10.5vw 3.1vw 10.5vw",
  "@media (max-width: 640px)": {
    padding: "1.563vw 2vw 8.594vw 2vw",
  },
}))

export const MainBoxWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}))

export const CustomTab = styled(Tab)(() => ({
  fontSize: "0.94vw",
  fontWeight: 300,
  paddingBottom: "1.5vw",
  margin: "0vw 3.490vw",
  color: theme?.palette?.text?.primary,
  "@media (max-width: 640px)": {
    width: "34vw",
    fontSize: "2.8vw !important",
    margin: "0vw 4.219vw 0.625vw ",
    padding: "1.875vw 0vw",
  },
}))

export const StyledTitle = styled(Typography)(() => ({
  paddingBottom: DesktopPxToVw(40),
  "@media (max-width: 640px)": {
    margin: "7vw 0vw 9.375vw",
    paddingBottom: "0vw",
  },
}))
export const InputTextField = styled(TextField)(() => ({
  "& .MuiInput-input": {
    fontSize: DesktopPxToVw(24),
  },
  "&  .MuiFormHelperText-root": {
    fontSize: DesktopPxToVw(18),
    color: theme?.palette?.ihclPalette?.hexThirtyTwo,
    fontFamily: "inter",
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
  "& .Mui-error": {
    ":after": {
      color: `${theme?.palette?.ihclPalette?.hexThirtyTwo} !important`,
      borderBottom: `2px solid ${theme?.palette?.ihclPalette?.hexThirtyTwo}!important`,
    },
    ":before": {
      color: `${theme?.palette?.ihclPalette?.hexThirtyTwo} !important`,
      borderBottomColor: `${theme?.palette?.ihclPalette?.hexThirtyTwo} !important`,
    },
  },
  "@media (max-width: 640px)": {
    input: {
      "&::placeholder": {
        fontSize: MobilePxToVw(24),
      },
    },
    "& .MuiInput-input": {
      fontSize: MobilePxToVw(24),
    },
    "&  .MuiFormHelperText-root": {
      fontSize: MobilePxToVw(18),
    },
  },
}))

export const BulkGridContainer = styled(Grid)(() => ({
  boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
  margin: "2vw 12vw",
  padding: "3.06vw 6.4vw",
  backgroundColor: theme?.palette?.background?.default,
  width: DesktopPxToVw(1468),
  "@media (max-width:640px)": {
    boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.1)",
    width: "100%",
    margin: 0,
    height: "100vh",
    maxHeight: "100vh",
    overflowY: "auto",
  },
}))
export const InputRow = styled(Box)(() => ({
  display: "flex",
  gap: "2vw",
  justifyContent: "center",
  margin: "2vw 0vw",
}))

export const LinkTypography = styled("span")(() => ({
  color: theme?.palette?.ihclPalette?.hexTwo,
  fontWeight: "300",
  cursor: "pointer",
}))

export const ModelContainer = styled(Box)(() => ({
  backgroundColor: theme?.palette?.ihclPalette?.hexOne,
  paddingTop: "4.16vw",
  width: DesktopPxToVw(1174),
  boxShadow: " -6px 10px 24px rgba(0, 0, 0, 0.1)",
  display: "flex",
  alignSelf: "center",
  "@media (max-width:640px)": {
    width: "100%",
    height: "93vh",
    padding: `${MobilePxToVw(55)} ${MobilePxToVw(82)} 0`,
    boxShadow: "unset",
    backgroundColor: theme?.palette?.background?.default,
  },
}))
export const OrderStatusBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: DesktopPxToVw(10),
}))

export const StepperSeparator = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  width: $isMobile ? MobilePxToVw(1) : DesktopPxToVw(208),

  border: `1px solid ${theme?.palette?.ihclPalette?.hexTwo}`,
  height: $isMobile ? MobilePxToVw(74) : DesktopPxToVw(1),
}))

export const OrderStatusStack = styled(
  Stack,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  justifyContent: "center",
  textAlign: "center",
  gap: $isMobile ? MobilePxToVw(10) : DesktopPxToVw(10),
}))

export const ContentContainerGrid: any = styled(Grid)(() => ({
  padding: "5.417vw 4.323vw 0vw 5.365vw",
  "@media (max-width:640px)": {
    padding: "0vw 12.813vw",
  },
}))

export const MobileCarousalStylesWrapper = styled(
  Box,
  transientProps,
)<{ $inactiveDotWidth: string }>(({ $inactiveDotWidth }) => ({
  "@media (max-width:640px)": {
    "& .slick-dots": {
      position: "static",
      bottom: "0",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "8.594vw 0vw 8.594vw 0vw",
      "& li>button": {
        width: "100%",
        height: "0.3125vw",
        background: `${theme?.palette?.ihclPalette?.hexSeventeen}20`,
      },
      "&>li": {
        margin: "0vw",
        width: $inactiveDotWidth,
      },
      "& .slick-active": {
        width: "12.5vw!important",
        background: `${theme?.palette?.ihclPalette?.hexFive}!important`,
        borderRadius: "10px",
        "& button": {
          background: `${theme?.palette?.ihclPalette?.hexFive}!important`,
        },
      },
    },
  },
}))

export const ActionItemFlexContainer = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "flex-start",
  "@media (max-width:640px)": {
    justifyContent: "flex-end",
  },
}))
export const TitleTypographyWrapper = styled(Box)(() => ({
  marginBottom: "8.594vw",
  marginTop: "10.156vw",
  textAlign: "center",
}))

export const MainContentWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  textAlign: "center",
  paddingBottom: $isMobile ? MobilePxToVw(25) : DesktopPxToVw(40),
  "& span": {
    fontSize: $isMobile ? MobilePxToVw(22) : DesktopPxToVw(18),
  },
}))

export const ActionPropsContentWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: $isMobile ? MobilePxToVw(27) : DesktopPxToVw(40),
  marginTop: $isMobile ? MobilePxToVw(55) : "unset",
}))

export const CustomCheckBoxContentWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: $isMobile ? "flex-start" : "center",
  paddingTop: $isMobile ? MobilePxToVw(27) : "unset",
}))

export const ActionButtonContentWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: $isMobile ? MobilePxToVw(27) : DesktopPxToVw(40),
  marginTop: $isMobile ? MobilePxToVw(55) : "unset",
}))

export const YourBalanceMainContentWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  border: $isMobile ? "unset" : `1px solid ${theme?.palette?.ihclPalette?.hexSixteen}`,
  padding: $isMobile ? `0vw ${MobilePxToVw(32)}` : `${DesktopPxToVw(80)} 0vw`,
}))

export const MainContentDescriptionWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: $isMobile ? `0vw ${MobilePxToVw(1)} ${MobilePxToVw(38)}` : `0vw ${DesktopPxToVw(270)} ${DesktopPxToVw(22)}`,
  textAlign: "center",
}))

export const GiftCardInputWrapper = styled(Grid)(() => ({
  display: "flex",
  justifyContent: "flex-end",
}))
export const CardBoxGC = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  justifyContent: "center",
  margin: $isMobile ? "2vw 0vw " : "1vw 0vw",
}))
export const PinCodeInputWrapper = styled(Grid)(() => ({
  display: "flex",
  justifyContent: "flex-start",
}))

export const ActionPropsWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: $isMobile ? MobilePxToVw(27) : DesktopPxToVw(40),
  marginTop: $isMobile ? MobilePxToVw(55) : "unset",
}))

export const ErrorMessageTypography = styled(
  Typography,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  color: theme?.palette?.ihclPalette?.hexTwentyOne,
  marginTop: $isMobile ? MobilePxToVw(10) : DesktopPxToVw(10),
}))

export const BalanceContentWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  paddingTop: $isMobile ? MobilePxToVw(65) : DesktopPxToVw(50),
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  flexDirection: "row",
}))

export const BalanceAmountContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}))

export const BalanceContentDivider = styled(
  Divider,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  margin: $isMobile ? `0vw ${MobilePxToVw(60)}` : `0vw ${DesktopPxToVw(60)}`,
  backgroundColor: theme?.palette?.ihclPalette?.hexSixteen,
}))

export const ReloadContentWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  border: $isMobile ? "unset" : `1px solid ${theme?.palette?.ihclPalette?.hexSixteen}`,
  padding: $isMobile ? `0vw ${MobilePxToVw(32)}` : `${DesktopPxToVw(80)} 0vw`,
}))

export const ReloadContentTitleContainer = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  justifyContent: "center",
  textAlign: "center",
  padding: $isMobile ? `0vw ${MobilePxToVw(5)} ${MobilePxToVw(34)}` : `0vw ${DesktopPxToVw(170)} ${DesktopPxToVw(20)}`,
}))

export const GiftCardNumberFieldWrapper = styled(Grid)(() => ({
  display: "flex",
  justifyContent: "flex-end",
}))

export const DenominationFieldWrapper = styled(Grid)(() => ({
  display: "flex",
  justifyContent: "flex-start",
}))

export const CustomCheckBoxWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: $isMobile ? "flex-start" : "center",
  paddingTop: $isMobile ? MobilePxToVw(50) : "unset",
  "& span": {
    fontSize: $isMobile ? MobilePxToVw(22) : DesktopPxToVw(22),
  },
}))

export const GiftCardManageTabsComponentWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  width: "100%",
  "& .tab-panel-box-container": {
    border: "unset",
    padding: $isMobile ? `${MobilePxToVw(35)} 0vw 0vw` : `${DesktopPxToVw(16)} 0vw 0vw}`,
  },
  "& .balance-content": {
    paddingTop: $isMobile ? MobilePxToVw(90) : DesktopPxToVw(10),
  },
  "& .you-balance-description": {
    padding: $isMobile
      ? `0vw ${MobilePxToVw(19)} ${MobilePxToVw(38)} !important`
      : `0vw ${DesktopPxToVw(290)} ${DesktopPxToVw(22)} !important`,
  },
  "& .reload-description": {
    padding: $isMobile
      ? `0vw ${MobilePxToVw(20)} ${MobilePxToVw(25)} !important`
      : `0vw ${DesktopPxToVw(237)} ${DesktopPxToVw(40)} !important`,
  },
  "& .order-status-description": {
    padding: $isMobile
      ? `0vw 0vw ${MobilePxToVw(25)} !important`
      : `0vw ${DesktopPxToVw(333)} ${DesktopPxToVw(38)} !important`,
  },
  "& .tab-order-status": {
    maxHeight: $isMobile ? MobilePxToVw(756) : DesktopPxToVw(460),
    overflow: "scroll",
    backgroundColor: `${theme?.palette?.background?.default} !important`,
    paddingBottom: `0vw !important`,
    "::-webkit-scrollbar-track": {
      backgroundColor: $isMobile
        ? `${theme?.palette?.background?.paper} !important`
        : `${theme?.palette?.background?.default} !important`,
    },
    "::-webkit-scrollbar": {
      display: "none",
    },
  },
  "& .order-status-data": {
    padding: $isMobile ? `${MobilePxToVw(55)} 0vw 0vw` : `${DesktopPxToVw(60)} ${DesktopPxToVw(67)} 0vw`,
  },
  "& .order-status-content": {
    backgroundColor: $isMobile ? theme?.palette?.background?.default : theme?.palette?.background?.paper,
  },
}))

export const OrderNumberInputContainer = styled(
  TextField,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  width: $isMobile ? "100%" : DesktopPxToVw(330),
  "& .MuiInputBase-input": {
    color: theme?.palette?.ihclPalette?.hexSeventeen,
    fontFamily: "Inter",
    fontSize: $isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
    fontStyle: "normal",
    fontWeight: 300,
    lineHeight: "150%",
  },
  input: {
    fontSize: DesktopPxToVw(24),
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: theme?.palette?.ihclPalette?.hexSeventeen,
      fontWeight: 300,
      opacity: 0.8,
      fontSize: DesktopPxToVw(24),
    },
    "@media (max-width: 640px)": {
      fontSize: MobilePxToVw(24),
      paddingTop: MobilePxToVw(30),
      "&::placeholder": {
        fontSize: MobilePxToVw(24),
      },
    },
  },
}))

export const OrderEmailInputContainer = styled(
  TextField,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  width: $isMobile ? "100%" : DesktopPxToVw(330),
  "& .MuiInputBase-input": {
    color: theme?.palette?.ihclPalette?.hexSeventeen,
    fontFamily: "Inter",
    fontSize: $isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
    fontStyle: "normal",
    fontWeight: 300,
    lineHeight: "150%",
  },
  input: {
    fontSize: DesktopPxToVw(24),
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: theme?.palette?.ihclPalette?.hexSeventeen,
      fontWeight: 300,
      opacity: 0.8,
      fontSize: DesktopPxToVw(24),
    },
    "@media (max-width: 640px)": {
      fontSize: MobilePxToVw(24),
      paddingTop: MobilePxToVw(30),
      "&::placeholder": {
        fontSize: MobilePxToVw(24),
      },
    },
  },
}))

export const MainGridContainer = styled(
  Grid,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  backgroundColor: $isMobile ? theme?.palette?.background?.paper : theme?.palette?.background?.default,
  boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
  margin: "2vw 12vw",
  padding: "3.06vw 6.4vw",
  width: DesktopPxToVw(1468),
  "@media (max-width:640px)": {
    boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.1)",
    width: "100%",
    margin: 0,
    height: "100vh",
    maxHeight: "100vh",
    overflowY: "auto",
    padding: `${MobilePxToVw(89)} ${MobilePxToVw(82)} 0vw`,
  },
}))

export const MediaCardComponentInsideModelWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  overflowY: "auto",
  maxHeight: $isMobile ? "unset" : "85vh",
  margin: $isMobile ? "unset" : `0 ${DesktopPxToVw(240)}`,
  backgroundColor: $isMobile ? theme?.palette?.background?.default : theme?.palette?.ihclPalette?.hexOne,
}))

export const RegisterAddressTabs = styled(Box)(() => ({
  paddingBottom: "initial",
  "@media(max-width:640px)": {
    paddingBottom: "8.438vw",
  },
  "& .tabpanel": {
    "@media(max-width:640px)": {
      paddingTop: "0vw",
    },
  },
}))

export const ReloadErrorMessageTypography: any = styled(
  Typography,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  color: theme?.palette?.ihclPalette?.hexTwentyOne,
  marginBottom: $isMobile ? MobilePxToVw(35) : DesktopPxToVw(30),
}))
