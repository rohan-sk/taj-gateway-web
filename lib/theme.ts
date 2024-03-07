import React from "react"
import { createTheme } from "@mui/material"
import DesktopPxToVw from "../utils/DesktopFontCalc"

const primaryColor = "#123C22"
const shape = { borderRadius: 4 }
const breakpoints = {
  xs: 0,
  sm: 600,
  md: 1024,
  lg: 1200,
  xl: 1536,
}
const primaryFontFamily = "Chillax"

const typography = {
  "heading-l": {
    fontFamily: primaryFontFamily,
    fontWeight: 400,
    fontSize: "3.23vw",
    lineHeight: "3.85vw",
    letterSpacing: "-0.05em",
    color: "#123C22",
  },
  "heading-m": {
    // 48px
    fontFamily: primaryFontFamily,
    fontWeight: 400,
    fontSize: "2.5vw",
    lineHeight: "2.96vw",
    letterSpacing: "-0.05em",
    color: "#123C22",
  },
  "heading-s": {
    // 32px
    fontWeight: 400,
    color: "#123C22",
    fontSize: "1.67vw",
    lineHeight: "1.82vw",
    fontFamily: primaryFontFamily,
    letterSpacing: "-0.05em",
  },
  "heading-xs": {
    //24px
    fontWeight: 400,
    color: "#0E3C20",
    fontSize: "1.25vw",
    lineHeight: "1.70vw",
    fontFamily: primaryFontFamily,
    letterSpacing: "-0.05em",
    //Mobile: fontSize: "3.75vw", lineHeight: "5.25vw",
  },
  "heading-xm": {
    //18px
    fontWeight: 400,
    fontSize: "0.938vw",
    lineHeight: "1.70vw",
    fontFamily: primaryFontFamily,
    letterSpacing: "-0.05em",
    color: "#123C22",
  },
  "heading-xxs": {
    //16px
    fontWeight: 400,
    fontSize: "0.83vw",
    lineHeight: "1.25vw",
    fontFamily: "supreme",
    color: "#123C22",
  },

  "body-xxl": {
    //50px
    fontWeight: 600,
    fontSize: "2.564vw",
    lineHeight: "3.59vw",
    fontFamily: "supreme",
    color: "#0E3C20",
    letterSpacing: "8%",
  },

  "body-xsl": {
    //40px
    fontWeight: 450,
    fontSize: "2.083vw",
    lineHeight: "2.917vw",
    fontFamily: "supreme",
    color: "#0E3C20",
    letterSpacing: "8%",
  },

  "body-xl": {
    //32px
    fontWeight: 300,
    fontSize: "1.66vw",
    lineHeight: "1.83vw",
    fontFamily: "supreme",
    color: "#0E3C20",
  },

  "body-l": {
    // 24px
    fontWeight: 300,
    fontSize: "1.25vw",
    lineHeight: "1.875vw",
    fontFamily: "supreme",
    color: "#0E3C20",
  },

  "body-x": {
    // 26px
    fontWeight: 300,
    fontSize: DesktopPxToVw(26),
    lineHeight: "1.875vw",
    fontFamily: "supreme",
    color: "#0E3C20",
  },
  "body-ml": {
    //22px
    fontWeight: 300,
    fontSize: DesktopPxToVw(22),
    lineHeight: "1.56vw",
    fontFamily: "supreme",
    color: "#0E3C20",
  },
  "body-m": {
    //20px
    fontWeight: 300,
    fontSize: DesktopPxToVw(20),
    lineHeight: "140%",
    fontFamily: "supreme",
    color: "#0E3C20",
  },
  "body-s": {
    //18px
    fontWeight: 300,
    fontSize: "0.938vw",
    lineHeight: "1.30vw",
    fontFamily: "supreme",
    color: "#0E3C20",
  },

  "body-xs": {
    //16px
    fontWeight: 300,
    fontSize: DesktopPxToVw(16),
    lineHeight: "1.25vw",
    fontFamily: "supreme",
    color: "#0E3C20",
  },

  "body-xxs": {
    //14px
    fontWeight: 300,
    fontSize: DesktopPxToVw(14),
    lineHeight: "1.25vw",
    fontFamily: "supreme",
    color: "#0E3C20",
  },

  "body-xxxs": {
    //12px
    fontWeight: 300,
    fontSize: "0.625vw",
    lineHeight: "1.25vw",
    fontFamily: "supreme",
    color: "#0E3C20",
  },

  "link-m": {
    fontWeight: 400,
    color: "#789038",
    fontSize: "0.9375vw",
    lineHeight: "1.3125vw",
    letterSpacing: "0.1em",
    fontFamily: "Chillax",
    textDecoration: "underline",
    cursor: "pointer",
  },

  //===================================================  Font variants for mobile screens   ====================================================

  "m-heading-l": {
    //62px
    fontWeight: 400,
    fontSize: "9.68vw",
    letterSpacing: "-0.05em",
    fontFamily: primaryFontFamily,
    color: "#123C22",
  },

  "m-heading-m": {
    //48px
    fontWeight: 400,
    fontSize: "7.5vw",
    letterSpacing: "-0.05em",
    fontFamily: primaryFontFamily,
    color: "#123C22",
  },

  "m-heading-s": {
    //32px
    fontWeight: 400,
    fontSize: "5vw",
    color: "#123C22",
    fontFamily: primaryFontFamily,
    letterSpacing: "-0.05em",
  },

  "m-heading-xs": {
    //24px
    fontWeight: 400,
    color: "#0E3C20",
    fontSize: "3.75vw",
    fontFamily: primaryFontFamily,
    letterSpacing: "-0.05em",
  },

  "m-heading-xxs": {
    //18px
    fontWeight: 400,
    fontSize: "2.8125vw",
    fontFamily: primaryFontFamily,
    letterSpacing: "-0.05em",
    color: "#123C22",
  },

  "m-body-xsl": {
    //24px
    fontWeight: 450,
    fontSize: "3.75vw",
    lineHeight: "5.313vw",
    fontFamily: "supreme",
    color: "#0E3C20",
    letterSpacing: "8%",
  },

  "m-body-xxl": {
    //30px
    fontWeight: 600,
    fontSize: "4.688vw",
    lineHeight: "6.719vw",
    fontFamily: "supreme",
    color: "#0E3C20",
    letterSpacing: "8%",
  },

  "m-body-xl": {
    //36px
    fontWeight: 400,
    fontSize: "5.625vw",
    lineHeight: "180%",
    fontFamily: "supreme",
    color: "#123C22",
  },
  "m-body-ml": {
    //26px
    fontWeight: 400,
    fontSize: "4.0625vw",
    fontFamily: "supreme",
    color: "#123C22",
  },
  "m-body-sxl": {
    //22px
    fontWeight: 400,
    fontSize: "3.438vw",
    lineHeight: "200%",
    fontFamily: "supreme",
    color: "#123C22",
  },
  "m-body-l": {
    // 24px
    fontWeight: 300,
    fontSize: "3.75vw",
    lineHeight: "140%",
    fontFamily: "supreme",
    color: "#123C22",
  },

  "m-body-sl": {
    //22px
    fontWeight: 300,
    fontSize: "3.438vw",
    lineHeight: "140%",
    fontFamily: "supreme",
    color: "#123C22",
  },

  "m-body-m": {
    //20px
    fontWeight: 300,
    fontSize: "3.125vw",
    fontFamily: "supreme",
    lineHeight: "140%",
    color: "#123C22",
  },

  "m-body-s": {
    //18px
    fontWeight: 300,
    color: "#123C22",
    fontSize: "2.81vw",
    fontFamily: "supreme",
  },

  "m-body-xs": {
    //16px
    fontWeight: 300,
    fontSize: "2.5vw",
    fontFamily: "supreme",
    color: "#123C22",
  },

  "m-body-xxs": {
    //12px
    fontWeight: 300,
    fontSize: "1.875vw",
    fontFamily: "supreme",
    color: "#123C22",
  },

  "m-text-link": {
    //18px
    fontWeight: 400,
    color: "#789038",
    fontSize: "2.81vw",
    lineHeight: "150%",
    fontFamily: "Chillax",
    textDecoration: "underline",
  },

  "m-link-m": {
    fontWeight: 400,
    color: "#789038",
    fontSize: "2.5vw",
    lineHeight: "140%",
    letterSpacing: "0.1em",
    fontFamily: "Chillax",
    textDecoration: "underline",
    cursor: "pointer",
  },

  button: {
    fontWeight: 700,
    fontSize: "0.93vw",
    lineHeight: "1.30vw",
  },
  // removing default variants
  h1: undefined,
  h2: undefined,
  h3: undefined,
  h4: undefined,
  h5: undefined,
  h6: undefined,
  caption: undefined,
  overline: undefined,
  subtitle1: undefined,
  subtitle2: undefined,
}

const components: any = {
  //   // Name of the component
  //   MuiInputBase: {
  //     variants: [
  //       {
  //         props: { variant: "rounded-border" },
  //         style: {
  //           border: '1px solid rgb(66, 66, 66)',
  //           padding: '4px 8px',
  //           borderRadius: '20px',
  //         },
  //       },
  //     ]
  //   },
  //   MuiAlert: {
  //     styleOverrides: {
  //       root: {
  //         minWidth: "328px",
  //       },
  //       filled: {
  //         color: "#FFF",
  //         textAlign: "center",
  //         padding: "16px",
  //         borderRadius: "16px",
  //         display: "flex",
  //         flexDirection: "column",
  //       },
  //       filledError: {
  //         backgroundColor: primaryColor,
  //       },
  //       icon: {
  //         padding: 0,
  //         justifyContent: "center",
  //         fontSize: "32px",
  //       },
  //       message: {
  //         fontSize: "16px",
  //         fontWeight: "bold",
  //         lineHeight: 1.5,
  //         margin: 0,
  //         padding: 0,
  //       },
  //     },
  //   },
  //   MuiPaper: {
  //     styleOverrides: {
  //       elevation0: {
  //         backgroundColor: "transparent",
  //       },
  //     },
  //   },
  //   MuiBottomNavigation: {
  //     styleOverrides: {
  //       root: { padding: "12px 0 10px", minHeight: "64px" },
  //     },
  //   },
  //   MuiBottomNavigationAction: {
  //     styleOverrides: {
  //       root: {
  //         padding: 0,
  //         "&.Mui-selected": {
  //           color: primaryColor,
  //         },
  //       },
  //       label: {
  //         fontSize: "12px",
  //         lineHeight: "16px",
  //         fontWeight: 400,
  //       },
  //     },
  //   },
  //   MuiCardMedia: {
  //     styleOverrides: {
  //       root: {
  //         backgroundSize: "cover",
  //         backgroundPosition: "50% 50%",
  //       },
  //     },
  //   },
  // MuiButtonBase: {
  //   defaultProps: {
  //     disableRipple: true,
  //   },
  // },
  MuiButton: {
    styleOverrides: {
      root: {
        width: "auto",
        fontWeight: "700",
        height: "3.1770vw",
        borderRadius: "100em",
        fontSize: "0.9375vw",
        textTransform: "none",
        lineHeight: "1.3125vw",
        minWidth: "auto",
        fontFamily: "Chillax",
        padding: "0.93vw 1.87vw",

        "@media (max-width: 640px)": {
          height: "9.53vw",
          lineHeight: "140%",
          fontSize: "2.8125vw",
          padding: "2.8125vw 5.625vw",
        },
      },
      containedPrimary: {
        backgroundColor: "#AD8B3A",
      },
    },
    variants: [
      {
        props: { variant: "light-contained" },
        style: {
          color: "#000000",
          backgroundColor: "#FCB415",
          " &:hover": {
            backgroundColor: "#AD8B3A",
          },
          "&.Mui-disabled": {
            color: "#8B8A84",
            backgroundColor: "#D7D5CF",
          },
        },
      },
      {
        props: { variant: "dark-contained" },
        style: {
          color: "#AD8B3A",
          backgroundColor: "#FFFFFF",
          " &:hover": {
            backgroundColor: "#FFFFFF",
          },
        },
      },
      {
        props: { variant: "light-outlined" },
        style: {
          color: "#AD8B3A",
          border: "1px solid #AD8B3A",
          "&.Mui-disabled": {
            color: "#8B8A84",
            backgroundColor: "#FFFFFF",
            border: "1px solid #8B8A84",
          },
        },
      },
      {
        props: { variant: "dark-outlined" },
        style: {
          color: "#FFFFFF",
          border: "1px solid #FFFFFF",
        },
      },
    ],
  },
  MuiTypography: {
    defaultProps: {
      variantMapping: {
        "heading-xl": "h1",
        "heading-l": "h2",
        "heading-m": "h3",
        "heading-s": "h4",
        "heading-xs": "h4",
        "m-heading-xs": "h4",
      },
    },
  },
  card: {
    borderRadius: "0px",
  },
}

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: "#FCB415",
    },
    text: {
      primary: primaryColor,
    },
    ihclPalette: {
      hexOne: "#FFFFFF",
      hexTwo: "#849E3D",
      hexThree: "#13130F",
      hexFour: "#292723",
      hexFive: "#0E3C20",
      hexSix: "#ececec",
      hexSeven: "#D9D9D9",
      hexEight: "#1E1E1E",
      hexNine: "#D9D9D9",
      hexTen: "#FF0000",
      hexEleven: "#000000",
      hexTwelve: "#8B8A84",
      hexThirteen: "#E3DBCB",
      hexFourteen: "#626260",
      hexFifteen: "#656263",
      hexSixteen: "#D7D5CF",
      hexSeventeen: "#123C22",
      hexEighteen: "#F7F3EB",
      hexNineteen: "#d7d7d6",
      hexTwenty: "#acaba8",
      hexTwentyOne: "#be3333",
      hexTwentyTwo: "#a1a1a1",
      hexTwentyThree: "#45443E",
      hexTwentyFour: "#4F9337",
      hexTwentyFive: "#DADAD9",
      hexTwentySix: "#292723",
      hexTwentySeven: "#D32F2F",
      hexTwentyEight: "#469739",
      hexTwentyNine: "#F6F5F5",
      hexThirty: "#ECEBEA",
      hexThirtyOne: "#C30F0F",
      hexThirtyTwo: "#982929",
      hexThirtyThree: "#7F7F7F",
      hexThirtyFour: "#0E3C20",

      linearGradientOne: `linear-gradient(180deg, rgba(81, 81, 81, 0) 0%, rgba(0, 0, 0, 0.9) 100%)`,
      linearGradientTwo: `linear-gradient(180deg, rgba(31, 31, 30, 0) 0%, #1A1919 65.62%)`,
      linearGradientThree: `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #F6F5F5 100%)`,
      linearGradientBottom: `linear-gradient(180deg, rgba(81, 81, 81, 0) 0%, rgba(0, 0, 0, 0.7) 77.08%)`,

      rgbaOne: "rgba(69, 68, 63, 0.2)",
      rgbaTwo: "rgba(0, 0, 0, 0)",
      rgbaThree: "rgba(215, 213, 207, 0.8)",
      rgbaFour: "rgba(0, 0, 0, 0.38)",
      rgbaFive: "rgba(0, 0, 0, 0.42)",
      rgbaSix: "rgba(0, 0, 0, 0.12)",
      rgbaSeven: "rgba(19, 19, 15, 0.5)",
    },
    background: {
      paper: "#F6F5F5",
      default: "#FFFFFF",
    },
    font: {
      primaryFontFamily: [primaryFontFamily, "sans-serif"].join(","),
    },
  },
  typography: {
    ...typography,
    fontFamily: ["supreme", "InterNeue", " supreme Neue", "sans-serif"].join(","),
  },
  components,
  shape,
})
theme.breakpoints.values = breakpoints

declare module "@mui/material/styles" {
  interface TypographyVariants {
    "heading-l": React.CSSProperties
    "heading-m": React.CSSProperties
    "heading-s": React.CSSProperties
    "heading-xs": React.CSSProperties
    "heading-xm": React.CSSProperties
    "m-heading-l": React.CSSProperties
    "m-heading-m": React.CSSProperties
    "m-heading-s": React.CSSProperties
    "m-heading-xs": React.CSSProperties
    "m-heading-xxs": React.CSSProperties
    "heading-xxs": React.CSSProperties
    "body-xxl": React.CSSProperties
    "body-xl": React.CSSProperties
    "body-l": React.CSSProperties
    "body-x": React.CSSProperties
    "body-ml": React.CSSProperties
    "body-m": React.CSSProperties
    "body-ms": React.CSSProperties
    "body-s": React.CSSProperties
    "m-body-xl": React.CSSProperties
    "m-body-ml": React.CSSProperties
    "m-body-l": React.CSSProperties
    "m-body-sl": React.CSSProperties
    "m-body-m": React.CSSProperties
    "m-body-s": React.CSSProperties
    "m-body-xs": React.CSSProperties
    "m-body-xxs": React.CSSProperties
    "body-xs": React.CSSProperties
    "body-xxs": React.CSSProperties
    "body-xxxs": React.CSSProperties
    "m-body-sxl": React.CSSProperties
    small: React.CSSProperties
    "x-small": React.CSSProperties
    "xx-small": React.CSSProperties
    "link-m": React.CSSProperties
    "m-link-m": React.CSSProperties
    "m-text-link": React.CSSProperties
    "body-xsl": React.CSSProperties
    "m-body-xsl": React.CSSProperties
    "m-body-xxl": React.CSSProperties
    button: React.CSSProperties
  }

  interface Palette {
    ihclPalette?: any
    font?: any
  }
  interface PaletteOptions {
    ihclPalette: {
      hexOne: React.CSSProperties["color"]
      hexTwo: React.CSSProperties["color"]
      hexThree: React.CSSProperties["color"]
      hexFour: React.CSSProperties["color"]
      hexFive: React.CSSProperties["color"]
      hexSix: React.CSSProperties["color"]
      hexSeven: React.CSSProperties["color"]
      hexEight: React.CSSProperties["color"]
      hexNine: React.CSSProperties["color"]
      hexTen: React.CSSProperties["color"]
      hexEleven: React.CSSProperties["color"]
      hexTwelve: React.CSSProperties["color"]
      hexThirteen: React.CSSProperties["color"]
      hexFourteen: React.CSSProperties["color"]
      hexFifteen: React.CSSProperties["color"]
      hexSixteen: React.CSSProperties["color"]
      hexSeventeen: React.CSSProperties["color"]
      hexEighteen: React.CSSProperties["color"]
      hexNineteen: React.CSSProperties["color"]
      hexTwenty: React.CSSProperties["color"]
      hexTwentyOne: React.CSSProperties["color"]
      hexTwentyTwo: React.CSSProperties["color"]
      linearGradientOne: React.CSSProperties["color"]
      linearGradientTwo: React.CSSProperties["color"]
      linearGradientThree: React.CSSProperties["color"]
      linearGradientBottom: React.CSSProperties["color"]
      rgbaOne: React.CSSProperties["color"]
      rgbaTwo: React.CSSProperties["color"]
      rgbaThree: React.CSSProperties["color"]
      rgbaFour: React.CSSProperties["color"]
      rgbaFive: React.CSSProperties["color"]
      rgbaSix: React.CSSProperties["color"]
      rgbaSeven: React.CSSProperties["color"]
      hexTwentyThree: React.CSSProperties["color"]
      hexTwentyFour: React.CSSProperties["color"]
      hexTwentyFive: React.CSSProperties["color"]
      hexTwentySix: React.CSSProperties["color"]
      hexTwentySeven: React.CSSProperties["color"]
      hexTwentyEight: React.CSSProperties["color"]
      hexTwentyNine: React.CSSProperties["color"]
      hexThirty: React.CSSProperties["color"]
      hexThirtyOne: React.CSSProperties["color"]
      hexThirtyTwo: React.CSSProperties["color"]
      hexThirtyThree: React.CSSProperties["color"]
      hexThirtyFour: React.CSSProperties["color"]
    }
    font: {
      primaryFontFamily: React.CSSProperties["fontFamily"]
    }
  }
}
// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    h1: false
    h2: false
    h3: false
    h4: false
    h5: false
    h6: false
    body1: false
    body2: false
    subtitle1: false
    subtitle2: false
    caption: false
    overline: false
    "link-m": true
    button: true
    small: true
    "xx-small": true
    "x-small": true
    "heading-xl": true
    "heading-ml": true
    "heading-l": true
    "heading-m": true
    "heading-ms": true
    "heading-s": true
    "heading-xxs": true
    "heading-xs": true
    "heading-xm": true
    "body-xxl": true
    "body-xl": true
    "body-l": true
    "body-x": true
    "body-ml": true
    "body-m": true
    "body-ms": true
    "body-s": true
    "body-xs": true
    "body-xxs": true
    "body-xxxs": true
    "m-heading-l": true
    "m-heading-m": true
    "m-heading-s": true
    "m-heading-xs": true
    "m-heading-xxs": true
    "m-body-xl": true
    "m-body-ml": true
    "m-body-l": true
    "m-body-sxl": true
    "m-body-sl": true
    "m-body-m": true
    "m-body-s": true
    "m-body-xs": true
    "m-body-xxs": true
    "m-text-link": true
    "m-link-m": true
    "body-xsl": true
    "m-body-xsl": true
    "m-body-xxl": true
  }
}
declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    "dark-outlined": true
    "dark-contained": true
    "light-outlined": true
    "light-contained": true
  }
}

export const fonts = {
  body: "supreme",
  heading: primaryFontFamily,
}
