import { theme } from "../../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { Box, Divider, Select, Tab, Tabs, TextField, Typography, styled } from "@mui/material"

export const MainContentWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  margin: `${DesktopPxToVw(56)} 0vw ${DesktopPxToVw(90)} 0vw`,
  "@media (max-width: 640px)": {
    alignItems: "start",
    flexDirection: "column-reverse",
    margin: "0vw",
  },
}))

export const TabsContentWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: `0vw ${DesktopPxToVw(173)}`,
  "@media (max-width: 640px)": {
    width: "100%",
  },
}))

export const TabsContentWrapperTitle = styled(Typography)(() => ({
  textAlign: "center",
  letterSpacing: "1.6px",
  lineHeight: "100%",
  fontSize: DesktopPxToVw(32),
  "@media (max-width: 1440px)": {
    fontSize: DesktopPxToVw(30),
  },
  "@media (max-width: 640px)": {
    fontSize: MobilePxToVw(32),
    letterSpacing: "0px",
    margin: `${MobilePxToVw(20)} 0vw 0vw 0vw`,
  },
}))

export const TabsWrapperBox = styled(Box)(() => ({
  margin: `${DesktopPxToVw(0)} 0vw ${DesktopPxToVw(52.5)} 0vw`,
  "@media (max-width: 640px)": {
    margin: `${MobilePxToVw(35)} 0vw ${MobilePxToVw(70)} 0vw`,
  },
}))

export const TabsWrapper = styled(Tabs)(() => ({
  "& .MuiTab-root.Mui-selected": {
    color: theme?.palette?.neuPalette?.hexTwo,
  },
  ".MuiTabs-flexContainer": {
    display: "flex",
    gap: "1vw",
    justifyContent: "space-between",
    alignItems: "center",
  },
  "@media (max-width: 640px)": {
    ".MuiTabs-flexContainer": {
      gap: "2vw",
      justifyContent: "space-around",
    },
  },
}))

export const TabsHorizontalLine = styled(Divider)(() => ({
  bottom: 0,
  width: "100%",
  position: "absolute",
  ".MuiDivider-root": {
    width: "100%",
  },
  backgroundColor: theme?.palette?.neuPalette?.rgbaOne,
  height: DesktopPxToVw(2.8),
  "@media (max-width: 640px)": {
    height: MobilePxToVw(2.8),
  },
}))

export const EachTabWrapper = styled(Tab)(() => ({
  minHeight: DesktopPxToVw(60),
  fontSize: DesktopPxToVw(18),
  padding: "0vw",
  fontFamily: "Inter",
  fontWeight: 300,
  color: theme?.palette?.neuPalette?.hexSeventeen,
  "@media (max-width: 640px)": {
    width: MobilePxToVw(140),
    fontSize: MobilePxToVw(18),
    padding: MobilePxToVw(20),
  },
}))

export const MobileNumberAndCountryCodeWrapper = styled(Box)(() => ({
  display: "flex",
  alignItems: "end",
}))

export const MobileNumberTextField = styled(TextField)(() => ({
  width: "100%",
  input: {
    paddingLeft: DesktopPxToVw(20),
    fontSize: DesktopPxToVw(24),
    fontFamily: "Inter",
    "@media (max-width: 640px)": {
      fontSize: MobilePxToVw(24),
    },
    "&::placeholder": {
      opacity: 1,
      fontWeight: 300,
      fontFamily: "Inter",
      fontSize: DesktopPxToVw(24),
      color: theme?.palette?.neuPalette?.hexSeventeen,
      "@media (max-width: 640px)": {
        fontSize: MobilePxToVw(24),
      },
    },
  },
}))

export const MobileNumberErrorMessage = styled(Typography)(() => ({
  textAlign: "center",
  fontSize: DesktopPxToVw(18),
  fontWeight: 300,
  color: theme?.palette?.neuPalette?.hexThirtyTwo,
  "@media (max-width: 640px)": {
    fontSize: MobilePxToVw(18),
  },
}))

export const CheckBoxWrapper = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: `${DesktopPxToVw(35)} 0vw 0vw 0vw`,
  "@media (max-width: 640px)": {
    alignItems: "flex-start",
    margin: `${MobilePxToVw(35)} 0vw 0vw 0vw`,
    gap: MobilePxToVw(10),
  },
}))

export const MembershipTypeSelectBox = styled(Select)(() => ({
  fontSize: DesktopPxToVw(24),
  "@media (max-width: 640px)": {
    fontSize: MobilePxToVw(24),
    ".MuiSelect-select.MuiSelect-select": {
      paddingRight: MobilePxToVw(16),
    },
  },
}))

export const EmailNumberTextField = styled(MobileNumberTextField)(() => ({
  input: {
    paddingLeft: DesktopPxToVw(0),
  },
}))

export const MembershipThreeImagesWrapperBox = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  gap: DesktopPxToVw(60),
  margin: `${DesktopPxToVw(60)} 0vw ${DesktopPxToVw(80)} 0vw`,
  justifyContent: "space-around",
  alignItems: "flex-end",
  "@media (max-width: 640px)": {
    gap: "11vw",
    margin: `${MobilePxToVw(35)} 0vw ${MobilePxToVw(57)} 0vw`,
  },
}))

export const MembershipBenefitsCardWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  borderTop: "none",
  padding: `0px ${DesktopPxToVw(165)}`,
  borderRight: `1px solid ${theme?.palette?.neuPalette?.hexSeven}`,
  "@media (max-width: 640px)": {
    borderRight: "none",
    marginTop: MobilePxToVw(35),
  },
}))

export const NeupassLogoWrapper = styled(Box)(() => ({
  "@media (max-width: 640px)": {
    margin: `${MobilePxToVw(20)} 0vw`,
  },
}))

export const CardSubTitleTypography = styled(Typography)(() => ({
  letterSpacing: "1.2px",
  fontSize: DesktopPxToVw(22),
  fontFamily: theme?.palette?.font?.primaryFontFamily,
  lineHeight: "100%",
  margin: `${DesktopPxToVw(20)} 0vw ${DesktopPxToVw(20)} 0vw`,
  color: theme?.palette?.neuPalette?.hexSeventeen,
  "@media (max-width: 640px)": {
    fontSize: MobilePxToVw(24),
    marginTop: MobilePxToVw(20),
    marginBottom: MobilePxToVw(15),
  },
}))

export const CardTitleText = styled(Typography)(() => ({
  letterSpacing: "1.6px",
  lineHeight: "100%",
  fontSize: DesktopPxToVw(32),
  marginBottom: DesktopPxToVw(20),
  "@media (max-width: 1440px)": {
    fontSize: DesktopPxToVw(30),
  },
  "@media (max-width: 640px)": {
    letterSpacing: "0px",
    fontSize: MobilePxToVw(32),
    marginTop: MobilePxToVw(35),
    marginBottom: DesktopPxToVw(0),
  },
}))

export const MembershipBenefitsCardImagesWrapper = styled(Box)(() => ({
  display: "grid",
  gap: DesktopPxToVw(30),
  gridTemplateColumns: "repeat(2, 1fr)",
}))

export const MembershipBenefitsCardTitle = styled(Typography)(() => ({
  fontSize: DesktopPxToVw(18),
  fontFamily: "Inter",
  fontWeight: 300,
  color: theme?.palette?.neuPalette?.hexSeventeen,
  "@media (max-width: 640px)": {
    fontSize: MobilePxToVw(16),
    marginTop: MobilePxToVw(10),
  },
}))

export const TermsAndPrivacyTypography = styled(Typography)(() => ({
  "> span": {
    fontSize: DesktopPxToVw(18),
    fontFamily: "Inter",
  },
  "@media (max-width: 640px)": {
    marginTop: "1vw",
    "> span": {
      fontFamily: "Inter",
      fontSize: MobilePxToVw(18),
    },
  },
}))

export const EmailTextErrorMessage = styled(MobileNumberErrorMessage)(() => ({}))

export const MembershipNumberErrorMessage = styled(MobileNumberErrorMessage)(() => ({}))

export const MembershipNumberAndMemberTypeWrapper = styled(MobileNumberAndCountryCodeWrapper)(() => ({}))

export const MembershipNumberTextField = styled(MobileNumberTextField)(() => ({}))
