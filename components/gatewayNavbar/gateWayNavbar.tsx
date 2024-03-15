import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import Divider from "@mui/material/Divider"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import Typography from "@mui/material/Typography"
import { useMobileCheck } from "../../utils/isMobilView"
import { Button, Collapse, Grid } from "@mui/material"
import { theme } from "../../lib/theme"
import { KeyboardArrowDown } from "@mui/icons-material"
import { GateWayAppBar } from "./NavbarStyles"
import useDebouncedFunction from "../../utils/useDebouncedFunction"
import { useEffect, useState } from "react"
import { CONSTANTS } from "../constants"
import { BookingMenuBox } from "../header/styles"
import dynamic from "next/dynamic"
import { GateWayLargeLogo, GateWayLargeLogoSecondary } from "../../utils/customIcons"
const BookingMenu = dynamic(() => import("../header/booking-menu.component"))

const navItems = ["Destinations", "hotels", "Offers", "Neupass", "more"]

export default function GatewayNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [colorChange, setColorchange] = useState(false)
  const [showBookingMenu, setShowBookingMenu] = useState<boolean>(false)

  const changeNavbarColor = () => {
    if (window.scrollY >= 80) {
      setColorchange(true)
    } else {
      setColorchange(false)
    }
  }
  const isMobile = useMobileCheck()
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  const debouncedScrollFunction = useDebouncedFunction(changeNavbarColor, 10)
  useEffect(() => {
    global?.window?.addEventListener("scroll", debouncedScrollFunction, { passive: true })

    return () => {
      window.removeEventListener("scroll", changeNavbarColor)
    }
  }, [debouncedScrollFunction])

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography sx={{ my: 2 }}>MUI</Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: "flex", position: "relative" }}>
      <CssBaseline />
      <GateWayAppBar $colorChange={colorChange} elevation={isMobile ? 4 : 0}>
        <Grid
          container
          sx={{ alignItems: "center", justifyContent: isMobile ? "space-between" : "center", padding: "0px 80px" }}>
          <Grid item lg={3}>
            <Box>
              {isMobile ? <GateWayLargeLogo /> : colorChange ? <GateWayLargeLogoSecondary /> : <GateWayLargeLogo />}
            </Box>
          </Grid>
          {!isMobile && (
            <Grid item lg={6}>
              <Box sx={{ display: "flex", gap: "30px" }}>
                {navItems.map((item) => (
                  <Typography
                    variant="heading-xs"
                    sx={{
                      textTransform: "uppercase",
                      fontWeight: "600",
                      color: colorChange ? theme?.palette?.ihclPalette?.hexFive : "#fff",
                    }}
                    key={item}>
                    {item}
                  </Typography>
                ))}

                <KeyboardArrowDown
                  sx={{
                    transform: false ? "rotate(180deg)" : "rotate(0deg)",
                    transitionDuration: "0.5s",
                    transitionProperty: "transform",
                    width: "auto",
                    cursor: "pointer",
                    height: "1.25vw",
                    color: colorChange ? theme?.palette?.ihclPalette?.hexTwo : theme?.palette?.ihclPalette?.hexOne,
                  }}
                />
              </Box>
            </Grid>
          )}
          <Grid item lg={3}>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "30px" }}>
              <Typography
                variant={isMobile ? "m-heading-xs" : "heading-xs"}
                sx={{
                  textTransform: "uppercase",
                  fontWeight: "600",
                  color: colorChange ? theme?.palette?.ihclPalette?.hexFive : "#fff",
                }}>
                {CONSTANTS?.LOGIN}
              </Typography>
              {!isMobile && (
                <Box sx={{ position: "relative" }}>
                  <Button
                    variant="light-contained"
                    sx={{ width: "200px" }}
                    onClick={() => {
                      setShowBookingMenu((prev: boolean) => !prev)
                    }}>
                    {showBookingMenu ? CONSTANTS?.CLOSE : "BOOK A STAY"}
                  </Button>
                  <BookingMenuBox>
                    <Collapse in={showBookingMenu} timeout={300}>
                      <Box>
                        <BookingMenu
                          setShowBookingMenu={setShowBookingMenu}
                          showBookingMenu={showBookingMenu}
                          // headerData={headerData}
                        />
                      </Box>
                    </Collapse>
                  </BookingMenuBox>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </GateWayAppBar>
    </Box>
  )
}
