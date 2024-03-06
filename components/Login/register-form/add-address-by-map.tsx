/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react"
import GoogleMapReact from "google-map-react"
import { useMobileCheck } from "../../../utils/isMobilView"
import { Box } from "@mui/material"
import { theme } from "../../../lib/theme"
import Marker from "../../../utils/marker.component"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import CustomGoogleAutocomplete from "./custom-google-autocomplete.component"

interface MapValues {
  mapApiLoaded: boolean
  mapInstance: any
  mapApi: any
  geoCoder: any
  places: any[]
  center: { lat: number; lng: number }
  zoom: number
  address: any
  formatted_address: string
  draggable: boolean
  lat: number
  lng: number
  searchKey: string
}

const AddAddressByMap = ({ setAddress, setRenderKey }: any) => {
  const isMobile = useMobileCheck()
  const [showToolTip, setShowToolTip] = useState(false)
  const [mapDetails, setMapDetails] = useState<MapValues>({
    mapApiLoaded: false,
    mapInstance: null,
    mapApi: null,
    geoCoder: null,
    places: [],
    center: { lat: 20.593683, lng: 78.962883 },
    zoom: 9,
    draggable: true,
    formatted_address: "",
    address: {
      addressLine: "",
      city: "",
      state: "",
      country: "",
      pinCode: "",
    },
    lat: 20.593683,
    lng: 78.962883,
    searchKey: "",
  })

  // Get Current Location Coordinates
  const setCurrentLocation = (mapDetails: any) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMapDetails({
          ...mapDetails,
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      })
    }
  }

  const onMarkerInteraction = (
    childKey: any,
    childProps: any,
    mouse: { lat: any; lng: any }
  ) => {
    setMapDetails({
      ...mapDetails,
      draggable: false,
      lat: mouse?.lat,
      lng: mouse?.lng,
    })
  }
  const onMarkerInteractionMouseUp = (
    childKey: any,
    childProps: any,
    mouse: any
  ) => {
    setMapDetails({
      ...mapDetails,
      draggable: false,
      center: childProps?.center,
    })
  }

  const onChange = ({ center, zoom }: any) => {
    setMapDetails({
      ...mapDetails,
      zoom: zoom,
    })
    setShowToolTip(true)
  }

  const handleOnClick = (value: { lat: any; lng: any }) => {
    setMapDetails({
      ...mapDetails,
      lat: value?.lat,
      lng: value?.lng,
      center: {
        lat: value?.lat,
        lng: value?.lng,
      },
    })
    generateAddress(value?.lat, value?.lng)
    setShowToolTip(true)
  }

  const apiHasLoaded = (map: any, maps: any) => {
    setCurrentLocation(mapDetails)
    setMapDetails({
      ...mapDetails,
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps,
    })
    setShowToolTip(true)
  }

  const retrieveAddress = (address: any) => {
    return {
      addressLine: getAddressValue(
        ["premise", "sublocality", "locality"],
        address
      ),
      city:
        getAddressValue(["administrative_area_level_2"], address) ||
        getAddressValue(["administrative_area_level_3"], address),
      state: getAddressValue(["administrative_area_level_1"], address),
      country: getAddressValue(["country"], address),
      pinCode: getAddressValue(["postal_code"], address),
    }
  }

  const getAddressValue = (addressTypes: any, address: any) => {
    let values: string[] = []
    addressTypes?.forEach((addressType: any) => {
      address?.forEach((item: any) => {
        if (item?.types?.includes(addressType)) {
          values?.push(item?.long_name)
        }
      })
    })
    return values?.join(", ")
  }

  const generateAddress = (lat: any, lng: any) => {
    const geocoder = new global.window.google.maps.Geocoder()
    const location = new global.window.google.maps.LatLng(lat, lng)
    if (geocoder) {
      geocoder.geocode({ location }, (results: any, status: any) => {
        if (status === "OK") {
          if (results?.[0]) {
            setMapDetails({
              ...mapDetails,
              lat: lat,
              lng: lng,
              center: { lat: lat, lng: lng },
              formatted_address: results?.[0].formatted_address,
              address: retrieveAddress(results?.[0]?.address_components),
            })
            setAddress && setAddress(retrieveAddress(results?.[0]?.address_components))
            setRenderKey((prev: number) => prev + 1)
          } else {
            window.alert("No results found")
          }
        } else {
          window.alert("Geocoder failed due to: " + status)
        }
      })
    }
  }

  const mapOptions = {
    styles: [
      {
        featureType: "all",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: theme?.palette?.neuPalette?.hexTwo, // Set the desired text color
          },
        ],
      },
    ],
  }

  return (
    <Box width={"100%"} textAlign={"center"} className="add-by-map">
      <Box width={"100%"} mt={isMobile ? MobilePxToVw(60) : DesktopPxToVw(30)}>
        <CustomGoogleAutocomplete
          mapDetails={mapDetails}
          setMapDetails={setMapDetails}
          setShowToolTip={setShowToolTip}
          generateAddress={generateAddress}></CustomGoogleAutocomplete>
      </Box>

      <Box
        sx={{
          ".gm-fullscreen-control": {
            display: "none !important",
          },
        }}
        mt={isMobile ? MobilePxToVw(30) : DesktopPxToVw(30)}
        width={isMobile ? MobilePxToVw(540) : DesktopPxToVw(700)}
        height={isMobile ? MobilePxToVw(480) : DesktopPxToVw(274)}>
        <GoogleMapReact
          defaultZoom={9}
          zoom={mapDetails?.zoom}
          defaultCenter={mapDetails.center}
          center={mapDetails.center}
          draggable={mapDetails?.draggable}
          onChange={onChange}
          onChildMouseDown={onMarkerInteraction}
          onChildMouseUp={onMarkerInteractionMouseUp}
          onChildMouseMove={onMarkerInteraction}
          onChildClick={() => console.log("child click")}
          onClick={handleOnClick}
          bootstrapURLKeys={{
            key: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
            libraries: ["places", "geometry"],
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
          options={mapOptions}>
          <Marker
            text={mapDetails.formatted_address}
            lat={mapDetails.lat}
            lng={mapDetails.lng}
            showToolTip={showToolTip}
            setShowToolTip={setShowToolTip}
          />
        </GoogleMapReact>
      </Box>
    </Box>
  )
}

export default AddAddressByMap