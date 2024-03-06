import { useCallback, useEffect, useState } from "react"
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import { Box } from "@mui/material"
import { ICONS } from "../constants"

interface CustomMapInterface {
  center: { lat: number; lng: number }
  isTajPropertylogo?: boolean
  multipleCoordinates?: any[]
  isMultiCoordinates?: boolean
}
export default function CustomMap({
  center,
  isTajPropertylogo = false,
  multipleCoordinates,
  isMultiCoordinates = false,
}: CustomMapInterface) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
  })

  if (!isLoaded) return <div>Loading...</div>
  return (
    <Map
      center={center}
      isTajPropertylogo={isTajPropertylogo}
      multipleCoordinates={multipleCoordinates}
      isMultiCoordinates={isMultiCoordinates}
    />
  )
}

const containerStyle = {
  width: "100%",
  height: "100%",
}

const customMapStyle = [
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      { color: "#8C8786" },
      {
        lightness: 17,
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#FFFFFF" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#EDEDED" }],
  },
  {
    featureType: "poi.park",
    stylers: [{ color: "#F1F1F1" }],
  },
  {
    featureType: "landscape",
    elementType: "all",
    stylers: [{ color: "#EDEDED" }],
  },
  // Add more styling rules for different map features
]

const defaultCenter = { lat: 26.8982, lng: 75.8082 }
function Map({ center, isTajPropertylogo, multipleCoordinates, isMultiCoordinates }: CustomMapInterface) {
  const [mapState, setMapState] = useState<any>(null)
  const markers = multipleCoordinates
  const onLoad = useCallback((map: any) => setMapState(map), [])
  useEffect(() => {
    if (mapState && markers && markers?.length > 0 && isMultiCoordinates) {
      const bounds = new window.google.maps.LatLngBounds()
      markers?.map((marker: any) => {
        bounds?.extend({
          lat: marker.lat,
          lng: marker.lng,
        })
      })
      mapState?.fitBounds(bounds)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapState, markers])
  return (
    <Box
      style={{
        position: "absolute",
        zIndex: 0,
        width: "100%", // or you can use width: '100vw'
        height: "100%", // or you can use height: '100vh'
      }}>
      <GoogleMap
        onLoad={onLoad}
        zoom={14}
        center={center ?? defaultCenter}
        mapContainerStyle={containerStyle}
        options={{
          styles: isMultiCoordinates ? [] : customMapStyle,
        }}>
        {isMultiCoordinates ? (
          multipleCoordinates?.map((coordinate: any, index: number) => {
            return (
              <Marker
                key={index}
                position={coordinate}
                icon={{
                  url: isTajPropertylogo ? ICONS?.MARKER_TAJ_MAP_ICON : ICONS?.MARKER_MAP_ICON,
                  scaledSize: isTajPropertylogo ? new google.maps.Size(40, 67) : new google.maps.Size(40, 50),
                }}
              />
            )
          })
        ) : (
          <Marker
            position={center}
            icon={{
              url: isTajPropertylogo ? ICONS?.MARKER_TAJ_MAP_ICON : ICONS?.MARKER_MAP_ICON,
              scaledSize: isTajPropertylogo ? new google.maps.Size(40, 67) : new google.maps.Size(40, 50),
            }}
          />
        )}
      </GoogleMap>
    </Box>
  )
}
