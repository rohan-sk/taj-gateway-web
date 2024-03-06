import React, { useState } from "react"
import { Box, Tooltip, IconButton, Typography } from "@mui/material"
import GoogleMapReact from "google-map-react"

//Commented to resolve build errors need to resolve this issue

import { useMobileCheck } from "../../utils/isMobilView"
// import { mapPinPointIcon, capturedGoogleMapKey } from "./Constants"
import { urlFor } from "../../lib-sanity"
import { theme } from "../../lib/theme"

const MarkerPoint = ({ icon, store, expandImg, setSelectedStore }: any) => {
  const [opened, setOpened] = useState(false)
  const StoreTiming = ({ storeValues }: any) => {
    const weekdaysTiming = storeValues?.map(
      (timings: any) =>
        timings?.openingTime?.formattedHour &&
        timings?.weekDay == "Mon" &&
        `Opens: ${timings?.openingTime?.formattedHour} to ${timings?.closingTime?.formattedHour}`,
    )
    return <>{storeValues && <Typography>{weekdaysTiming}</Typography>}</>
  }
  return (
    <>
      <Box sx={{ cursor: "pointer" }}>
        <Tooltip
          PopperProps={{
            sx: {
              "& .MuiTooltip-tooltip": {
                backgroundColor: theme?.palette?.ihclPalette?.hexOne,
                borderRadius: "0%",
                color: theme?.palette?.ihclPalette?.hexFourteen,
              },
              "& .MuiTooltip-arrow": {
                color: theme?.palette?.ihclPalette?.hexOne,
              },
            },
          }}
          title={
            <Box>
              <Box>
                <Typography>{store?.displayName}</Typography>
                <IconButton>
                  <Box component="img" src={expandImg} alt="Expand Image" onClick={() => setSelectedStore(store)} />
                </IconButton>
              </Box>
              <StoreTiming storeValues={store?.openingHours?.weekDayOpeningList} />
            </Box>
          }
          placement="top"
          open={opened}
          arrow>
          <Box component="img" onClick={() => setOpened(!opened)} src={icon} alt="Map Pin-Point" />
        </Tooltip>
      </Box>
    </>
  )
}

interface StoreRelatedVariableDeclaration {
  stores: Array<any>
  setSelectedStore: Function
  expandMoreImg: string
}

const FetchGoogleApi = ({ stores, expandMoreImg, setSelectedStore }: any) => {
  const isMobile = useMobileCheck()
  // const CMSImageUrl = process.env.NEXT_PUBLIC_S3_URL
  // const location_waring = `${CMSImageUrl}/location_warning_ae9290fde1.png`
  // console.log('location_waring: ', location_waring);
  // const mapPinPointIcon = `${urlFor(location_waring).url()}`
  const defaultProps = {
    center: {
      lat: 20.593683,
      lng: 78.962883,
    },
    zoom: isMobile ? 4 : 10,
  }

  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <Box style={{ height: "54.9vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
          }}
          center={defaultProps.center}
          zoom={defaultProps.zoom}>
          {/* {stores?.map((store: any, index: number) => (
            <MarkerPoint
              key={index}
              setSelectedStore={setSelectedStore}
              expandImg={expandMoreImg}
              store={store}
              lat={store?.geoPoint?.latitude}
              lng={store?.geoPoint?.longitude}
              // icon={location_waring}
            />
          ))} */}
        </GoogleMapReact>
      </Box>
    </Box>
  )
}

export default FetchGoogleApi
