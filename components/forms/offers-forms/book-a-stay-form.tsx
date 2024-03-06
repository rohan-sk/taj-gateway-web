import { Stack } from "@mui/system"
import { theme } from "../../../lib/theme"
import dynamic from "next/dynamic"
import { CONSTANTS } from "../../constants"
import Pluralize from "../../../utils/pluralize"
import { SearchIcon } from "../../../utils/customIcons"
import { useMobileCheck } from "../../../utils/isMobilView"
import React, { useContext, useEffect, useState } from "react"
const RenderActionItem = dynamic(() => import("../../hoc/actions/action-items-ui"))
const GuestRoomComponent = dynamic(() => import("../../banner/guestRooms/GuestRoomComponent"))
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { Box, Grid, Divider, Collapse, TextField, InputBase, ListItemText, ListItemButton } from "@mui/material"
import { ExpandMoreIcon, ExpandLessIcon, FullDividerStyle, CalendarMonthStyle } from "../../header/styles/booking-menu"
import { DefaultStyleBox, TitleTypography } from "../styles/business-enquiry-form"

const topics = [
  { title: "None", year: 1994 },
  { title: "Corporate Access Code", year: 1972 },
  { title: "Travel Agency Code", year: 1974 },
  { title: "Business Connect Code", year: 1974 },
  { title: "Special Rate Code", year: 1974 },
]
const BookAStayForm = (props: any) => {
  const [date, setDate] = useState<any>(["", ""])
  const isMobile = useMobileCheck()
  const [offer, setOffer] = useState<number>(-1)
  const [check, setCheck] = useState<boolean>(false)
  const [offerCode, setOfferCode] = useState<string>("")
  const [showOffer, setShowOffer] = useState<number>(-1)
  const [open, setOpen] = useState(false)
  const [roomsCount, setRoomsCount] = useState<any>([{ id: 1, adults: 1, child: 0, room: "ROOM", isSelected: false }])
  const [AdultChildRoomLabel, setAdultChildRoomLabel] = useState<string>("2  Adults, 1  Child - 1  Room")
  const [guestCount, setGuestCount] = useState<number>(1)
  const [adults, setAdults] = useState<number>(1)
  const [child, setChild] = useState<number>(0)
  const [expandGuestRoomCount, setExpandGuestRoomCount] = useState<boolean>(false)

  const handleClick = () => {
    setOpen(!open)
  }

  const Context = useContext(IHCLContext)
  const PortableText = Context!.PortableText

  useEffect(() => {
    const currentChildrenCount = roomsCount.reduce((total: number, current: any) => {
      return total + current?.child
    }, 0)
    setChild(currentChildrenCount)

    const currentAdultsCount = roomsCount.reduce((total: number, current: any) => {
      return total + current?.adults
    }, 0)
    setAdults(currentAdultsCount)
  }, [roomsCount])

  useEffect(() => {
    setAdultChildRoomLabel(() => {
      return `${Pluralize(CONSTANTS?.ADULTS.slice(0, 5), adults, false)}, ${child} ${
        child > 1 ? CONSTANTS?.CHILDREN : CONSTANTS?.CHILD
      } - 
      ${Pluralize(CONSTANTS?.ROOMS.slice(0, 4), roomsCount.length, false)}`
    })
  }, [adults, child, roomsCount])
  return (
    <Box>
      {props?.title && <TitleTypography variant={"heading-s"}>{props?.title}</TitleTypography>}
      <Grid container alignItems={"center"} columnSpacing={"40px"}>
        <Grid item xs={isMobile ? 12 : 4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "1.198vw",
              marginBottom: "4px",
            }}>
            <SearchIcon sx={{ width: "20px" }} />
            <InputBase
              fullWidth
              sx={{
                "& .MuiInputBase-input": {
                  color: theme?.palette?.ihclPalette?.hexEleven,
                  fontSize: "0.938vw",
                },
              }}
              placeholder="Hotel or Destination"
            />
          </Box>
          <Divider />
        </Grid>
        <Grid item xs={isMobile ? 12 : 4}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <CalendarMonthStyle sx={{ width: "17px" }} />
          </Stack>
          <Divider />
        </Grid>
        <Grid item xs={isMobile ? 12 : 4}>
          <ListItemButton onClick={handleClick} sx={{ padding: "0vw" }}>
            <ListItemText
              primary={AdultChildRoomLabel}
              sx={{
                paddingLeft: "1.094vw",
                "& .MuiTypography-root": {
                  fontSize: "1.237vw",
                  color: theme?.palette?.ihclPalette?.hexSeventeen,
                  opacity: 0.6,
                },
              }}
            />
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
          <FullDividerStyle />
          <Collapse in={open}>
            <DefaultStyleBox>
              <GuestRoomComponent
                roomsCount={roomsCount}
                setRoomsCount={setRoomsCount}
                setGuestCount={setGuestCount}
                setExpandGuestRoomCount={setExpandGuestRoomCount}
              />
            </DefaultStyleBox>
          </Collapse>
          <Divider />
        </Grid>
        <Grid xs={12} textAlign={"center"} m={"3.125vw 0vw 4.167vw 0vw"}>
          <RenderActionItem
            url={props?.PrimaryAction?.url}
            isActionButtonType={true}
            title={props?.PrimaryAction?.title}
            variant={props?.PrimaryAction?.variant}
            navigationType={props?.PrimaryAction?.urlType}
            buttonStyles={{
              letterSpacing: "0.1em",
              whiteSpace: "no-wrap",
            }}
          />
        </Grid>
      </Grid>
      <Box sx={{ textAlign: "center" }}>
        <PortableText blocks={props?.singleContent} />
      </Box>
    </Box>
  )
}

export default BookAStayForm
