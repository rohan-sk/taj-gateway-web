import React, { useEffect, useState } from "react"
import { Box, Typography } from "@mui/material"
import { useMobileCheck } from "../../utils/isMobilView"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import GatewayUILogo from "../../public/gateway_ui_header_logo.svg"

const items = {
  data: [
    {
      title: "DESTINATIONS",
    },
    {
      title: "HOTELS",
    },
    {
      title: "DINING",
    },
    {
      title: "REWARDS",
    },
    {
      title: "MORE",
      chevronVal: true,
    },
    {
      title: "LOGIN / JOIN",
    },
    {
      title: "BOOK A STAY",
    },
  ],
}

const dropdownVals = {
  items: [
    { title: "One" },
    { title: "Two" },
    { title: "Three" },
    { title: "Four" },
    { title: "Five" },
    { title: "Six" },
    { title: "Seven" },
    { title: "Eight" },
    { title: "Nine" },
    { title: "Ten" },
    { title: "Eleven" },
    { title: "Tewlev" },
  ],
}

const HeroBanner = () => {
  const isMobile = useMobileCheck()
  const bannerImg =
    "https://cdn.sanity.io/images/ocl5w36p/production/d98d711a417d1dc9d1b0ca92ebb3b67cf5818e67-1920x930.png"

  const [navBottomColor, setNavBottomColor] = useState<any>("")
  const [moreItems, setMoreItems] = useState<boolean>(false)

  const navBarHandler = (title: string, dropdownVal: boolean) => {
    if (title !== "MORE") {
      setMoreItems(false)
      setNavBottomColor(title)
    }

    if (title === "MORE" && dropdownVal) {
      setNavBottomColor(title)
      setMoreItems(!moreItems)
    }
  }

  const [header, setHeader] = useState<any>(false)

  const [scrolledPast500, setScrolledPast500] = useState(false)
  const [headerColor, setHeaderColor] = useState("blue")
  const [lastScrollPosition, setLastScrollPosition] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY
      if (!scrolledPast500 && currentScrollPosition >= 300) {
        setScrolledPast500(true)
        setHeaderColor("red")
      } else if (scrolledPast500 && currentScrollPosition < 300 && currentScrollPosition < lastScrollPosition) {
        setScrolledPast500(false)
        setHeaderColor("blue")
      }
      setLastScrollPosition(currentScrollPosition)
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrolledPast500, lastScrollPosition, headerColor])

  return (
    <Box>
      <Box sx={{ position: "relative", height: "100%" }}>
        {bannerImg && <Box alt="Banner Img" width="100%" component="img" src={bannerImg} />}
        <Box
          sx={{
            top: 0,
            width: "100%",
            height: DesktopPxToVw(474),
            position: "absolute",
            background: "linear-gradient(to bottom, #00000090 5%, #D9D9D900 90%)",
          }}></Box>
        <Box
          sx={{
            bottom: 1,
            width: "100%",
            height: DesktopPxToVw(396),
            position: "absolute",
            background: "linear-gradient(to top, #00000090 5%, #D9D9D900 90%)",
          }}></Box>
      </Box>

      <Box
        sx={{
          position: "fixed",
          top: 0,
          width: "100%",
          paddingBottom: header ? "none" : "10px",
          background: headerColor,
        }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "0vw 4.166vw",
            marginTop: DesktopPxToVw(24),
            justifyContent: "space-between",
          }}>
          <Box>{GatewayUILogo && <Box alt="Navbar logo" component="img" src={GatewayUILogo?.src} />}</Box>
          <Box sx={{ display: "flex", gap: "3.12vw" }}>
            {items?.data?.slice(0, 5)?.map((item: any, index: number) => (
              <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  onClick={() => navBarHandler(item?.title, item?.chevronVal)}
                  sx={{
                    fontSize: item?.logo
                      ? isMobile
                        ? MobilePxToVw(30)
                        : DesktopPxToVw(30)
                      : isMobile
                      ? MobilePxToVw(24)
                      : DesktopPxToVw(24),
                    color: "#F2F0ED",
                    fontFamily: "chillax",
                    letterSpacing: "1.8px",
                    cursor: "pointer",
                    borderBottom: !item?.chevronVal && item?.title === navBottomColor ? "2.1px solid #FCB415" : "none",
                    fontWeight: item?.logo ? 700 : 500,
                  }}>
                  {item?.title}
                </Typography>
                {item?.chevronVal && <ExpandMoreIcon sx={{ color: "#F2F0ED" }} />}
              </Box>
            ))}
          </Box>
          <Box sx={{ display: "flex", gap: "3.12vw" }}>
            {items?.data?.slice(5, 7)?.map((item: any, index: number) => (
              <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  onClick={() => navBarHandler(item?.title, item?.chevronVal)}
                  sx={{
                    fontSize: item?.logo
                      ? isMobile
                        ? MobilePxToVw(30)
                        : DesktopPxToVw(30)
                      : isMobile
                      ? MobilePxToVw(24)
                      : DesktopPxToVw(24),
                    color: "#F2F0ED",
                    fontFamily: "chillax",
                    letterSpacing: "1.8px",
                    cursor: "pointer",
                    borderBottom: !item?.chevronVal && item?.title === navBottomColor ? "2.1px solid #FCB415" : "none",
                    fontWeight: item?.logo ? 700 : 500,
                  }}>
                  {item?.title}
                </Typography>
                {item?.chevronVal && <ExpandMoreIcon sx={{ color: "#F2F0ED" }} />}
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            background: "#ccc",
            overflow: "hidden",
            height: moreItems ? "400px" : "0px",
            transition: "height 1s ease-in-out",
          }}>
          {dropdownVals?.items?.map((itm: any, index: number) => (
            <Box key={index}>
              <Typography>{itm?.title}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ height: "1000px", width: "100%", background: "skyblue" }}></Box>
    </Box>
  )
}

export default HeroBanner
