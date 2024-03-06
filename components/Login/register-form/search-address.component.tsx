import React, { useContext, useEffect, useState } from "react"
import { Stack } from "@mui/material"
import AddAddressByMap from "./add-address-by-map"
import { ModalContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import { PAGE_STORES } from "../../../utils/Constants"
import AuthenticRegistrationStore from "../../../features/registration/store/authentic.registration.store"
import { FormErrors, SearchAddressMainBox } from "../Styles/register.styles"
import { observer } from "mobx-react-lite"

const SearchAddress = (props: any) => {
  const initialAddress = {
    addressLine: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  }
  const pageContext = useContext(ModalContext)

  const registrationStore = pageContext?.getPageStore(
    PAGE_STORES.registrationStore
  ) as AuthenticRegistrationStore

  const [address, setAddress] = useState<any>(initialAddress)
  const [renderKey, setRenderKey] = useState<number>(0)
  useEffect(() => {
    if (
      address?.state?.length > 0 ||
      address?.pinCode?.length > 0 ||
      address?.country?.length > 0 ||
      address?.city?.length > 0 ||
      address?.addressLine?.length > 0
    ) {
      registrationStore?.validAddressFormData(true)
    } else {
      registrationStore?.validAddressFormData(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registrationStore])

  useEffect(() => {
    if (address) {
      registrationStore?.userAddressStore(
        address?.addressLine,
        address?.country,
        address?.state,
        address?.city,
        address?.pinCode
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    address?.addressLine,
    address?.city,
    address?.country,
    address?.pinCode,
    address?.state,
  ])

  const showEmptyError =
    !registrationStore?.validAddress &&
    address?.state?.length == 0 &&
    address?.pinCode?.length == 0 &&
    address?.country?.length == 0 &&
    address?.city?.length == 0 &&
    address?.addressLine?.length == 0

  return (
    <>
      <SearchAddressMainBox>
        <AddAddressByMap
          setRenderKey={setRenderKey}
          setAddress={setAddress}></AddAddressByMap>
        {showEmptyError && (
          <Stack sx={{ alignItems: "center" }}>
            <FormErrors error={true}>
              {registrationStore?.userAddressErrors?.addressLine1Error}
            </FormErrors>
          </Stack>
        )}
      </SearchAddressMainBox>
    </>
  )
}

export default observer(SearchAddress)
