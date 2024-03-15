import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import Typography from "@mui/material/Typography"
import { useMobileCheck } from "../../utils/isMobilView"
import { Button, ClickAwayListener, Collapse, Grid } from "@mui/material"
import { theme } from "../../lib/theme"
import { KeyboardArrowDown } from "@mui/icons-material"
import { GateWayAppBar, NavBarMoreContainer } from "./NavbarStyles"
import useDebouncedFunction from "../../utils/useDebouncedFunction"
import { useCallback, useEffect, useState } from "react"
import { CONSTANTS } from "../constants"
import { BookingMenuBox } from "../header/styles"
import dynamic from "next/dynamic"
import {
  CloseIconWhite,
  GateWayLargeLogo,
  GateWayLargeLogoSecondary,
  GateWayMobileLogoSecondary,
  HamburgerIcon,
} from "../../utils/customIcons"

const BookingMenu = dynamic(() => import("../header/booking-menu.component"))

const navItems = ["Destinations", "hotels", "Offers", "Neupass"]
const moreItems = [
  "About Gateway",
  "Events & Conferences",
  "Book Direct Offers",
  "Weddings",
  "Manage your Bookings",
  "Contact Us",
  "Wellness",
]

export default function GatewayNavbar() {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false)
  const [colorChange, setColorchange] = useState<boolean>(false)
  const [showBookingMenu, setShowBookingMenu] = useState<boolean>(false)
  const [openMore, setOpenMore] = useState<boolean>(false)

  const changeNavbarColor = useCallback(() => {
    if (mobileOpen) {
      setMobileOpen(() => false)
    }
    if (openMore) {
      setOpenMore(() => false)
    }
    if (window.scrollY >= 80) {
      setColorchange(true)
    } else {
      setColorchange(false)
    }
  }, [mobileOpen, openMore])

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
  }, [changeNavbarColor, debouncedScrollFunction])
  const colorWhite = theme?.palette?.ihclPalette?.hexOne

  const drawer = (
    <Box sx={{ textAlign: "center", backgroundColor: colorWhite }}>
      <List>
        {navItems.map((item) => (
          <ListItem key={item}>
            <ListItemButton sx={{ textAlign: "center" }}>
              <Typography variant="m-heading-xxs" sx={{ fontWeight: "600" }}>
                {item}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
  const MoreBar = (
    <Box sx={{ textAlign: "center", backgroundColor: colorWhite }}>
      <List disablePadding>
        {moreItems.map((item) => (
          <ListItem key={item}>
            <ListItemButton sx={{ textAlign: "center" }}>
              <Typography variant="heading-xs" sx={{ fontWeight: "600", textTransform: "uppercase" }}>
                {item}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
  return (
    <ClickAwayListener
      onClickAway={function (event: MouseEvent | TouchEvent): void {
        setMobileOpen(() => false)
        setOpenMore(() => false)
      }}>
      <Box sx={{ display: "flex", position: "relative" }}>
        <CssBaseline />
        <GateWayAppBar $colorChange={colorChange} elevation={isMobile ? 4 : 0}>
          <Grid
            container
            sx={{ alignItems: "center", justifyContent: isMobile ? "space-between" : "center", padding: "0px 80px" }}>
            <Grid item lg={3}>
              <Box>
                {isMobile ? (
                  <GateWayMobileLogoSecondary sx={{ width: "15.625vw" }} />
                ) : colorChange ? (
                  <GateWayLargeLogoSecondary />
                ) : (
                  <GateWayLargeLogo />
                )}
              </Box>
            </Grid>

            {!isMobile && (
              <Grid item lg={6}>
                <ClickAwayListener onClickAway={() => setOpenMore(false)}>
                  <>
                    {" "}
                    <Box sx={{ display: "flex", gap: "30px" }}>
                      {navItems.map((item) => (
                        <Typography
                          variant="heading-xs"
                          sx={{
                            textTransform: "uppercase",
                            fontWeight: "600",
                            color: colorChange ? theme?.palette?.ihclPalette?.hexFive : colorWhite,
                            cursor: "pointer",
                          }}
                          key={item}>
                          {item}
                        </Typography>
                      ))}
                      <Box sx={{ display: "inline-flex", cursor: "pointer" }} onClick={() => setOpenMore(!openMore)}>
                        <Typography
                          variant="heading-xs"
                          sx={{
                            textTransform: "uppercase",
                            fontWeight: "600",
                            color: colorChange ? theme?.palette?.ihclPalette?.hexFive : colorWhite,
                          }}>
                          More
                        </Typography>
                        <KeyboardArrowDown
                          sx={{
                            transform: openMore ? "rotate(180deg)" : "rotate(0deg)",
                            transitionDuration: "0.5s",
                            transitionProperty: "transform",
                            width: "auto",

                            height: "1.25vw",
                            color: colorChange
                              ? theme?.palette?.ihclPalette?.hexTwo
                              : theme?.palette?.ihclPalette?.hexOne,
                          }}
                        />
                      </Box>
                    </Box>
                    <NavBarMoreContainer $top={110} $height={"16.6vw"} $width={"400px"} $right={500}>
                      <Collapse in={openMore} timeout={300}>
                        {MoreBar}
                      </Collapse>
                    </NavBarMoreContainer>
                  </>
                </ClickAwayListener>
              </Grid>
            )}
            <Grid item lg={3}>
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "30px" }}>
                <Typography
                  variant={isMobile ? "m-heading-xs" : "heading-xs"}
                  sx={{
                    textTransform: "uppercase",
                    fontWeight: "600",
                    color: isMobile ? colorWhite : colorChange ? theme?.palette?.ihclPalette?.hexFive : colorWhite,
                  }}>
                  {CONSTANTS?.LOGIN}
                </Typography>
                {isMobile && (
                  <Box sx={{ cursor: "pointer" }} onClick={handleDrawerToggle}>
                    {mobileOpen ? <CloseIconWhite /> : <HamburgerIcon />}
                  </Box>
                )}
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
        {isMobile && (
          <NavBarMoreContainer $top={100} $height={"54.375vw"} $width={"50%"} $right={0}>
            <Collapse in={mobileOpen} timeout={300}>
              {drawer}
            </Collapse>
          </NavBarMoreContainer>
        )}
      </Box>
    </ClickAwayListener>
  )
}
