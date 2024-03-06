import { Box, Typography, InputLabel, styled } from "@mui/material"
import { theme } from "../../lib/theme"
import { transientProps } from "../../utils/transientProps"

export const InputLabelTextStyle = styled(InputLabel)(() => ({
  fontFamily: "supreme",
  fontSize: "1.25vw",
  fontStyle: "normal",
  fontWeight: 300,
  lineHeight: "150%",
  top: "-0.521vw",
  "@media (max-width: 641px)": {
    fontSize: "3.75vw",
    top: "-3.125vw",
  },
}))

export const CommonCarouselStyles = styled(Box)`
  & .slick-dots {
    bottom: 2.5vw;
    position: relative;
    line-height: 0vw;
  }
  & .slick-dots li {
    width: auto;
    height: auto;
  }
  & .slick-dots li button {
    width: 0.4vw;
    padding: 0px;
    height: 0.4vw;
    background: gray;
    border-radius: 50%;
  }

  & .slick-dots li button::before {
    content: none;
    color: #afafaf;
  }

  & .slick-dots li.slick-active button {
    opacity: 1;
    width: 0.6vw;
    height: 0.6vw;
    background: #ad8b3a;
    border-radius: 15px;
  }
  & .slick-next {
    top: 50%;
    right: 0;
    z-index: 1;
    opacity: 1;
  }

  & .slick-next:before,
  & .slick-prev:before {
    opacity: 1;
    content: none;
  }

  & .slick-prev {
    left: 0;
    top: 50%;
    z-index: 1;
    opacity: 1;
  }

  .slick-vertical .slick-track {
    overflow: hidden;
    height: auto !important;
  }
`

// Common Modal Styles Start //
export const TypographyModalClose = styled(
  Typography,
  transientProps,
)<{
  $iconRight: string
  $iconTop: string
}>(({ $iconRight, $iconTop }) => ({
  position: "absolute",
  top: $iconTop,
  right: $iconRight,
  cursor: "pointer",
  zIndex: "999",
}))

export const MainBox = styled(Box)(() => ({
  " &:focus-visible": {
    outline: "-webkit-focus-ring-color auto 0",
  },
  bgcolor: "background.paper",
  position: "absolute",
  "::-webkit-scrollbar": {
    width: "3.12vw",
  },
  "@media (max-width: 641px)": {
    "::-webkit-scrollbar": {
      display: "none",
    },
  },

  "::-webkit-scrollbar-thumb": {
    border: `1.25vw solid ${theme?.palette?.ihclPalette?.hexOne}`,
    borderRadius: "2.5vw",
    backgroundColor: `${theme?.palette?.ihclPalette?.hexFifteen}`,
  },
}))
// Common Modal Styles End //

export const CommonCarouselContainerBox = styled(Box)(() => ({
  width: "100%",
  padding: "0vw 12.5vw",
}))
