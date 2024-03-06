import dynamic from "next/dynamic"
import { CenterAligner, MapContainer } from "./styles/card-with-google-map"
import { observer } from "mobx-react-lite"
import { GLOBAL_STORES } from "../../utils/Constants"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { UserStore } from "../../store"
import { useContext } from "react"
const CustomMap = dynamic(() => import("../accordion/custom-map"))
const GoogleMapCard = (props: any) => {
  const coordinates = { lat: 26.8982, lng: 75.8082 }
  const context = useContext(IHCLContext)
  const userStore = context?.getGlobalStore(
    GLOBAL_STORES.userStore
  ) as UserStore
  const { contactFilteredCoordinates } = userStore
  return (
    <>
      <CenterAligner>
        <MapContainer>
          <CustomMap
            center={contactFilteredCoordinates?.[0] || coordinates}
            isTajPropertylogo={true}
            isMultiCoordinates={true}
            multipleCoordinates={contactFilteredCoordinates}
          />
        </MapContainer>
      </CenterAligner>
    </>
  )
}
export default observer(GoogleMapCard)
