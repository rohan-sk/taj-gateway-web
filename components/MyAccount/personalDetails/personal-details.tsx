import dynamic from "next/dynamic"
import { observer } from "mobx-react-lite"
import { theme } from "../../../lib/theme"
import AddIcon from "@mui/icons-material/Add"
import { CheckboxBox } from "../../Enquire/Styles"
import SnackbarToast from "../../../utils/SnackbarToast"
import { ButtonTickIcon } from "../../../utils/customIcons"
import { useMobileCheck } from "../../../utils/isMobilView"
import { getRecaptchaToken } from "../../../utils/recaptcha"
import { useAppNavigation } from "../../../utils/NavigationUtility"
import { PortableText } from "../../../lib/portable-text-serializers"
import { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
import { Box, Divider, Grid, Stack, Typography } from "@mui/material"
import React, { useContext, useEffect, useState, useRef } from "react"
import { CLICK_TO_ADD_YOUR } from "../../forms/gift-card-form/constants"
import { PlaceholderUtil } from "../../../utils/placeholder-switch-cases"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import AccountStore from "../../../features/my-account/store/pageStore/account.store"
import { PageContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import AuthenticLoginStore from "../../../features/login/store/authentication.login.store"
import { CONSTANTS, ADD_ADDRESS, ENTER_ADDRESS, SEARCH_ADDRESS } from "../../constants"
import { IHCLContext, UserStore } from "../../forms/loyalty-form/epicure-imports.component"
import { StyledButton, ChildGridWrapper, StyledTypography, DetailsGridWrapper } from "./personal-details.styles"
import {
  AddressInterface,
  UserDataInterface,
  PlaceholderInterface,
  PersonalDetailsInterface,
} from "./personal-details.types"
const AddAddress = dynamic(() => import("./add-address.component"))
const FieldDetails = dynamic(() => import("./field-details.component"))
const AddAddressByMap = dynamic(() => import("../../Login/register-form/add-address-by-map"))
const LoadingSpinner = dynamic(() => import("../../../utils/SpinnerComponent"))
const CustomCheckBox = dynamic(() =>
  import("../../hoc/CustomCheckBox/Checkbox").then((module) => module.CustomCheckBox),
)
const AddressField = dynamic(() => import("./address.component").then((module) => module.AddressField))

const PersonalDetails = ({ url, title, urlType, content, parameterMap }: PersonalDetailsInterface) => {
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()

  const pageContextUse = useContext(PageContext)
  const ihclContext = useContext(IHCLContext)
  const [userData, setUserData] = useState<any>()
  const [addAddress, setAddAddress] = useState(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [tab, setTab] = useState(ENTER_ADDRESS)
  const [addressErr, setAddressErr] = useState<boolean | null>(null)
  const addressRef: any = useRef(null)

  //store
  const accountStore = pageContextUse?.getPageStore(PAGE_STORES.ACCOUNT_STORES.myAccountStore) as AccountStore
  const userStore = ihclContext?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore

  useEffect(() => {
    accountStore?.getUserData().then((data: any) => {
      setUserData(data?.data)
    })
    accountStore?.setUserAddresses()
    if (accountStore?.emailChangeRequestedSuccess) {
      accountStore?.updateEmailChangeRequestedSuccess(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountStore?.emailChangeRequestedSuccess])

  const [userInfo, setUserInfo] = useState<UserDataInterface>({
    salutation: userData?.nameDetails?.salutation,
    firstName: userData?.nameDetails?.firstName || "",
    lastName: userData?.nameDetails?.lastName || "",
    email: "",
    phoneNumber: "" || "",
    gender: "" || "",
    dob: "" || "",
    nationality: "" || "",
    isEmailVerified: "" || "",
    addresses: [],
  })
  useEffect(() => {
    setUserInfo((prev: any) => {
      return {
        ...prev,
        firstName: userData?.nameDetails?.firstName,
        lastName: userData?.nameDetails?.lastName,
        email: userData?.primaryEmailId,
        phoneNumber:
          userData?.primaryMobile?.isdCode &&
          `${userData?.primaryMobile?.isdCode}-${userData?.primaryMobile?.phoneNumber}`,
        dob: userData?.dob,
        gender: userData?.gender,
        nationality: userData?.nationality,
        isEmailVerified: userData?.emailVerified,
        addresses: userData?.addresses,
        salutation: userData?.nameDetails?.salutation,
      }
    })
  }, [userData])

  const [value, setValue] = useState<PlaceholderInterface>({
    salutations: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    country: "",
  })

  const loadValue = 3
  const [loadMore, setLoadMore] = useState(loadValue)
  const [renderKey, setRenderKey] = useState<number>(0)
  const [snackBarMessage, setSnackBarMessage] = useState<string>("")
  const [snackBarOpen, setSnackBarOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState(false)

  //placeholder switch case
  useEffect(() => {
    PlaceholderUtil(parameterMap, setValue)
  }, [parameterMap])

  const addressAvailable: boolean = accountStore?.userAddresses?.data?.length > 0

  const initialAddress = {
    addressLine: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  }
  const [errors, setErrors] = useState({
    addressLine: false,
    city: false,
    state: false,
    country: false,
    pinCode: false,
  })

  const [address, setAddress] = useState<any>(initialAddress)
  const [check, setCheck] = useState<boolean>(false)
  const [addressId, setAddressId] = useState<string>("")
  const [clickAddressID, setClickAddressID] = useState<any>()
  const editAddressData = accountStore.userAddresses?.data?.filter((item: any) => item?.addressId === addressId)?.[0]
  const [updateAddress, setUpdateAddress] = useState<any>(editAddressData)
  const [addressError, setAddressError] = useState()

  const saveAddress = async () => {
    Object.keys(address)?.map((key: string) => {
      if (address?.[key]?.length == 0) {
        setErrors((prev: any) => ({
          ...prev,
          [key]: true,
        }))
      }
    })
    if (
      tab.toLowerCase() == SEARCH_ADDRESS.toLowerCase() &&
      address?.addressLine?.length < 1 &&
      address?.city?.length < 1 &&
      address?.country?.length < 1 &&
      address?.pinCode?.length < 1 &&
      address?.state?.length < 1
    ) {
      setAddressErr(true)
      return
    }
    if (
      address?.addressLine?.length > 3 &&
      address?.city?.length > 0 &&
      address?.country?.length > 0 &&
      address?.pinCode?.length > 3 &&
      address?.state?.length > 0
    ) {
      const res = await accountStore?.addUserAddress({
        ...address,
        isDefaultAddress: check,
      })

      if (res?.data?.errorCode === "400") {
        setAddressError(res?.data?.message)
        setAddressErr(true)
        if (addressRef?.current) {
          addressRef?.current?.scrollIntoView({
            block: "end",
          })
        }
        return
      }
      setAddress(initialAddress)
      setAddAddress(false)
      setErrors({
        ...errors,
      })
    }
  }

  const setAsDefaultAddress = (address: AddressInterface, id: string) => {
    accountStore?.editUserAddress({
      id: id,
      address: {
        ...address,
        isDefaultAddress: true,
        isPrimary: true,
      },
    })
  }

  useEffect(() => {
    if (isEditing) {
      setUpdateAddress(editAddressData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing])

  useEffect(() => {
    setUpdateAddress({
      ...updateAddress,
      addressLine: address?.addressLine,
      city: address?.city,
      country: address?.country,
      pinCode: address?.pinCode,
      state: address?.state,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  const editAddress = (addressData: any, updated: boolean) => {
    if (updated) {
      Object.keys(address)?.map((key: string) => {
        if (address?.[key]?.length == 0) {
          setErrors((prev: any) => ({
            ...prev,
            [key]: true,
          }))
        }
      })

      accountStore?.editUserAddress({
        id: updateAddress?.addressId,
        address: updateAddress,
      })
      setIsEditing(false)
      setAddAddress(false)

      // }
    } else {
      setIsEditing(true)
      setAddAddress(true)
      setAddressId(addressData?.addressId)
    }
  }
  const deleteUserAddress = (clickAddressID: any) => {
    setOpen(!open)
    accountStore?.deleteUserAddress({
      id: clickAddressID,
    })
    setIsEditing(false)
    setAddAddress(false)
  }

  const authenticLoginStore = pageContextUse?.getPageStore(PAGE_STORES.loginStore) as AuthenticLoginStore
  const handleVerifyEmail = async () => {
    setLoading(true)
    const recaptchaGenerated = await getRecaptchaToken()
    const response = await authenticLoginStore?.generateEmailOTP(
      JSON.stringify({
        email: userInfo?.email,
        sendOtp: true,
        recaptchaToken: recaptchaGenerated,
      }),
    )
    setLoading(false)
    if (!response?.error) {
      response?.data?.refId && userStore?.setUserRedId(response?.data?.refId)
      navigate(url, urlType)
    } else {
      setSnackBarOpen(true)
      setSnackBarMessage(response?.message || response?.response?.data?.message)
    }
    if (response?.response?.data?.code == "SSO-1072") {
      setSnackBarOpen(true)
      setSnackBarMessage(response?.response?.data?.message)
    }
  }
  useEffect(() => {
    setErrors({
      ...errors,
      addressLine: false,
      country: false,
      state: false,
      city: false,
      pinCode: false,
    })
    setAddress(initialAddress)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])

  return (
    <>
      {loading && <LoadingSpinner />}
      <SnackbarToast open={snackBarOpen} onClose={() => setSnackBarOpen(false)} Message={snackBarMessage} />
      <Grid
        container
        mt={isMobile ? MobilePxToVw(70) : 0}
        px={isMobile ? MobilePxToVw(50) : "unset"}
        aria-label="personal-details">
        <Box sx={{ width: "100%", textAlign: isMobile ? "center" : "inherit" }}>
          <Typography
            mb={isMobile ? MobilePxToVw(15) : DesktopPxToVw(35)}
            variant={isMobile ? "m-heading-s" : "heading-m"}>
            {title}
          </Typography>
        </Box>
        <ChildGridWrapper item xs={12} md={12}>
          {/* salutation */}
          <FieldDetails
            content={content}
            userInfo={userInfo}
            value={value}
            field={userInfo?.salutation}
            setUserInfo={setUserInfo}
            title={value?.salutations}
            type="salutation"
            withoutEdit={!userInfo?.salutation}
          />
          <Divider />
          {/* first name */}
          <FieldDetails
            content={content}
            userInfo={userInfo}
            value={value}
            field={userInfo?.firstName}
            setUserInfo={setUserInfo}
            title={value?.firstName}
            type="firstName"
            withoutEdit
          />
          <Divider />
          {/* last name */}
          <FieldDetails
            content={content}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            value={value}
            field={userInfo?.lastName}
            withoutEdit
            title={value?.lastName || ""}
            type="lastName"
          />

          <Grid container>
            <Grid item xs={12} md={3.5}></Grid>
            <Grid
              item
              xs={12}
              md={7.5}
              sx={{
                marginTop: isMobile ? "" : `-${DesktopPxToVw(20)}`,
                marginBottom: isMobile ? MobilePxToVw(30) : DesktopPxToVw(30),
              }}>
              <Typography
                variant="body-s"
                sx={{
                  "& span": {
                    fontSize: isMobile ? `${MobilePxToVw(18)}!important` : DesktopPxToVw(18),
                  },
                  pointerEvents: isMobile ? "all" : "none",
                }}>
                <PortableText blocks={content?.[0]?.content?.[0]} />
              </Typography>
            </Grid>
          </Grid>

          <Divider />
          {/* email */}
          <FieldDetails
            content={content}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            value={value}
            field={userInfo?.email}
            title={value?.email || ""}
            type="email"
            setIsEditing={setIsEditing}
            withoutEdit={!userInfo?.email}
            extraData={{ url, urlType }}
          />

          {/* email */}
          {!isEditing && (
            <Grid container>
              <Grid item xs={12} md={3.5}></Grid>
              {userInfo?.isEmailVerified === "false" && userInfo?.email && (
                <Grid
                  item
                  xs={12}
                  md={7.5}
                  sx={{
                    marginTop: isMobile ? "" : `-${DesktopPxToVw(20)}`,
                    marginBottom: isMobile ? MobilePxToVw(30) : DesktopPxToVw(30),
                  }}
                  onClick={() => {
                    handleVerifyEmail()
                  }}>
                  <Typography
                    variant="body-s"
                    sx={{
                      "& span": {
                        fontSize: isMobile ? `${MobilePxToVw(18)}!important` : DesktopPxToVw(18),
                      },
                      pointerEvents: isMobile ? "all" : "none",
                    }}>
                    <PortableText blocks={content?.[1]?.content?.[0]} />
                  </Typography>
                </Grid>
              )}
            </Grid>
          )}
          <Divider />
          {/* phone number */}
          <FieldDetails
            content={content}
            title={value?.phone}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            value={value}
            field={userInfo?.phoneNumber}
            type="mobileNumber"
            subtitle="To edit your phone number, add and/or verify your email address"
            withoutEdit
          />

          <Divider />
          {/* date of birth */}
          <FieldDetails
            content={content}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            value={value}
            field={userInfo?.dob}
            title={value?.dob}
            type="date"
            withoutEdit={userInfo?.dob}
          />
          <Divider />
          {/* Nationality */}
          <FieldDetails
            content={content}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            value={value}
            field={userInfo?.nationality}
            title={value?.country}
            type="nationality"
            placeholder={"Nationality"}
            withoutEdit={!userInfo?.nationality}
          />

          <Divider id="scroll-to-address" />
          {/* gender */}
          <FieldDetails
            content={content}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            value={value}
            field={userInfo?.gender}
            title={value?.gender}
            type="gender"
            placeholder={"Gender"}
            withoutEdit={!userInfo?.gender}
          />

          <Divider />
          {/* address */}
          <DetailsGridWrapper
            container
            ref={addressRef}
            alignItems={addressAvailable || addAddress ? "start !important" : "center"}>
            <Grid item xs={12} md={3.5}>
              <StyledTypography variant={isMobile ? "m-body-l" : "body-l"}>{value?.address}</StyledTypography>
            </Grid>
            <Grid item xs={12} md={8.5}>
              {addAddress && (
                <>
                  <Stack flexDirection={"column"} rowGap={isMobile ? MobilePxToVw(20) : DesktopPxToVw(20)}>
                    <Stack flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"}>
                      <Typography variant={isMobile ? "m-body-l" : "body-l"}>Add your address by</Typography>
                    </Stack>
                    <Stack flexDirection={"row"} columnGap={isMobile ? MobilePxToVw(20) : DesktopPxToVw(10)}>
                      <StyledButton
                        sx={{ width: "50%" }}
                        startIcon={tab === SEARCH_ADDRESS && <ButtonTickIcon />}
                        $active={tab === SEARCH_ADDRESS}
                        onClick={() => {
                          setTab(SEARCH_ADDRESS), setAddress(initialAddress), setAddressErr(false)
                        }}>
                        {SEARCH_ADDRESS}
                      </StyledButton>
                      <StyledButton
                        sx={{ width: "50%" }}
                        startIcon={tab === ENTER_ADDRESS && <ButtonTickIcon />}
                        $active={tab === ENTER_ADDRESS}
                        onClick={() => {
                          setTab(ENTER_ADDRESS), setAddressErr(false)
                        }}>
                        {ENTER_ADDRESS}
                      </StyledButton>
                    </Stack>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: isMobile ? "center" : "space-between",
                      }}>
                      {addAddress && (
                        <>
                          {tab === SEARCH_ADDRESS ? (
                            <Stack flexDirection={"column"} rowGap={isMobile ? MobilePxToVw(30) : DesktopPxToVw(40)}>
                              <AddAddressByMap setRenderKey={setRenderKey} setAddress={setAddress}></AddAddressByMap>
                              {address && (
                                <Box key={renderKey}>
                                  <AddAddress
                                    setAddress={setAddress}
                                    defaultValues={address ? address : initialAddress}
                                    address={address}
                                    errors={errors}
                                    setErrors={setErrors}
                                    setAddressErr={setAddressErr}
                                    accountStore={accountStore}
                                    tab={tab}
                                    addressId={isEditing ? addressId : ""}
                                    setAddressId={setAddressId}
                                    isEditing={isEditing}
                                  />
                                </Box>
                              )}
                            </Stack>
                          ) : (
                            <AddAddress
                              tab={tab}
                              setAddressId={setAddressId}
                              accountStore={accountStore}
                              setAddressErr={setAddressErr}
                              setAddress={setAddress}
                              setErrors={setErrors}
                              errors={errors}
                              isEditing={isEditing}
                              addressId={isEditing ? addressId : ""}
                              address={address ? address : initialAddress}
                            />
                          )}
                        </>
                      )}
                    </Box>
                    <Box width={"100%"}>
                      {addAddress && (
                        <>
                          {tab === SEARCH_ADDRESS && (
                            <>
                              <CheckboxBox>
                                <CustomCheckBox
                                  checked={check}
                                  onChange={() => {
                                    setCheck(!check)
                                  }}
                                />
                                <Typography variant={isMobile ? "m-body-l" : "body-l"}>
                                  Set as default address
                                </Typography>
                              </CheckboxBox>
                            </>
                          )}
                          {addressErr && addressError && (
                            <Typography
                              variant={isMobile ? "m-body-sl" : "body-s"}
                              sx={{
                                color: theme?.palette?.ihclPalette?.hexTwentySeven,
                              }}>
                              {addressError}
                            </Typography>
                          )}
                          <Stack flexDirection={"row"} justifyContent={"end"}>
                            <Typography
                              sx={{ display: "flex", justifyContent: "right" }}
                              variant={isMobile ? "m-link-m" : "link-m"}
                              onClick={() => {
                                isEditing ? editAddress(address, true) : saveAddress()
                                global?.window?.document?.getElementById("scroll-to-address")?.scrollIntoView()
                              }}>
                              {CONSTANTS?.SAVE}
                            </Typography>
                            <Divider
                              orientation="vertical"
                              sx={{
                                height: "20px",
                                margin: "0 10px",
                              }}></Divider>
                            <Typography
                              sx={{ display: "flex", justifyContent: "right" }}
                              variant={isMobile ? "m-link-m" : "link-m"}
                              onClick={() => {
                                setAddress(initialAddress)
                                setErrors({
                                  ...errors,
                                  addressLine: false,
                                  country: false,
                                  state: false,
                                  city: false,
                                  pinCode: false,
                                }),
                                  setAddAddress(false)
                                setIsEditing(false)
                                setAddressErr(false)
                                if (addressRef?.current) {
                                  addressRef?.current?.scrollIntoView({
                                    block: "end",
                                  })
                                }
                              }}>
                              {CONSTANTS.CANCEL}
                            </Typography>
                          </Stack>
                        </>
                      )}
                    </Box>
                  </Stack>
                </>
              )}
              {!addressAvailable && !addAddress && (
                <Typography
                  variant={isMobile ? "m-link-m" : "link-m"}
                  onClick={() => {
                    setAddAddress(true)
                  }}>
                  {`${CLICK_TO_ADD_YOUR} ${value?.address.toUpperCase()}`}
                </Typography>
              )}
              {addressAvailable && !addAddress && (
                <>
                  {accountStore?.userAddresses?.data
                    ?.filter((data: any) => data?.isPrimary)
                    .map((address: any, index: number) => (
                      <AddressField
                        data={address}
                        key={address?.addressId}
                        index={index}
                        setAsDefaultAddress={() => {}}
                        editAddress={editAddress}
                        setAddressErr={setAddressErr}
                      />
                    ))}
                  {accountStore?.userAddresses?.data
                    ?.filter((data: any) => !data.isPrimary)
                    ?.slice(0, loadMore)
                    ?.map((singleAddress: any, index: number) => (
                      <Box onClick={() => setClickAddressID(singleAddress?.addressId)} key={index}>
                        <AddressField
                          data={singleAddress}
                          clickAddressID={clickAddressID}
                          key={singleAddress?.addressId}
                          addressId={singleAddress?.addressId}
                          index={index}
                          setAsDefaultAddress={setAsDefaultAddress}
                          editAddress={editAddress}
                          deleteUserAddress={deleteUserAddress}
                          setAddressErr={setAddressErr}
                          setOpen={setOpen}
                          open={open}
                        />
                      </Box>
                    ))}
                  <Stack flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"}>
                    {addressAvailable && (
                      <Typography
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          columnGap: isMobile ? MobilePxToVw(10) : DesktopPxToVw(10),
                        }}
                        variant={isMobile ? "m-link-m" : "link-m"}
                        onClick={() => setAddAddress(true)}>
                        <AddIcon />
                        {ADD_ADDRESS}
                      </Typography>
                    )}
                    {accountStore?.userAddresses?.data?.length - 1 > loadMore && (
                      <Typography
                        sx={{
                          columnGap: isMobile ? MobilePxToVw(10) : DesktopPxToVw(10),
                        }}
                        variant={isMobile ? "m-link-m" : "link-m"}
                        onClick={() => setLoadMore((prev: number) => prev + 3)}>
                        {CONSTANTS?.VIEW_MORE_CAPS}
                      </Typography>
                    )}
                    {accountStore?.userAddresses?.data?.length - 2 < loadMore &&
                      accountStore?.userAddresses?.data?.length - 1 > loadValue && (
                        <Typography
                          sx={{
                            columnGap: isMobile ? MobilePxToVw(10) : DesktopPxToVw(10),
                          }}
                          variant={isMobile ? "m-link-m" : "link-m"}
                          onClick={() => {
                            setLoadMore(loadValue)
                          }}>
                          {CONSTANTS?.VIEW_LESS}
                        </Typography>
                      )}
                  </Stack>
                </>
              )}
            </Grid>
          </DetailsGridWrapper>
          {isMobile && <Divider />}
        </ChildGridWrapper>
      </Grid>
    </>
  )
}

export default observer(PersonalDetails)
