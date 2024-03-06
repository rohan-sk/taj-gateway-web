import {
  Box,
  ClickAwayListener,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
  DesktopPxToVw,
  MobilePxToVw,
  theme,
  RestrictSpecialChar,
  data,
  AutoCompleteInput,
  useMobileCheck,
  useEffect,
  useState,
  epicureCardAddressInterface,
  FourRowGrid,
  ThreeRowGrid,
  StyledMenuItem,
  CheckBoxWrapper,
  StyledFormControl,
  LoyaltyStyledSelect,
  ErrorMessageTypography,
  EpicureCartFormControl,
  EpicureCartFormLabel,
  InputTextFieldEpicure,
  CustomAutoCompleteComponent,
  GSTNo,
  pinCode,
  address,
  Error_icon,
  PLACEHOLDERS,
  TOOL_TIP_ICON,
  CustomCheckBox,
  observer,
} from "./epicure-imports.component"

const EpicureFormAddress = ({
  values,
  select,
  disableForm,
  errors,
  disable,
  emptyFieldErrors,
  handleChange,
  loyaltyOpen,
  setLoyaltyOpen,
  loyaltyType,
  CustomWidthTooltip,
  setOpenToolTip,
  openToolTip,
  handleToolTip,
  handleSelectedValue,
  invalidPinCode,
  handlePincode,
  setSelect,
  voucherCode,
  voucherPin,
  handleVouchers,
  clusterItem,
  openForm,
  setOpenForm,
  epicureGlobalStore,
  loyaltyEnrollStore,
  props,
}: epicureCardAddressInterface) => {
  const [stateList, setStateList] = useState<Array<string>>([])
  const [cityList, setCityList] = useState<Array<string>>([])
  const isMobile = useMobileCheck()
  const tooltipText = props?.items?.[7]?.hintText
  const labels = props?.items

  const getCity = async (state: string) => {
    const cities: any = await epicureGlobalStore.getCities(state)
    setCityList(() => cities?.data)
  }
  const getStates = async (country: string) => {
    const states: any = await epicureGlobalStore.getStates(country)
    setStateList(() => states?.data)
  }

  useEffect(() => {
    getStates("India")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <ThreeRowGrid>
        {/**address field */}
        <InputTextFieldEpicure
          sx={{
            width: isMobile ? "100%" : "32.6vw",
            marginBottom: isMobile ? "2vw" : "",
            input: {
              "&:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 50px #FFFFFF inset !important",
              },
            },
          }}
          variant="standard"
          label={labels?.[6]?.labelText}
          value={values?.address}
          InputLabelProps={{
            shrink: values?.address?.length > 0 ? true : false,
          }}
          name={address}
          disabled={disableForm || disable?.disableAddress}
          helperText={
            (errors?.address && values?.address?.length > 0 && labels?.[6]?.helperText) ||
            (emptyFieldErrors?.address &&
              (values?.address?.length === 0 || values?.address === null || values?.address == undefined) &&
              labels?.[6]?.errorText)
          }
          onChange={(e: any) => handleChange(e)}
          InputProps={{
            endAdornment: (
              <>
                {emptyFieldErrors?.address &&
                  (values?.address?.length === 0 || values?.address === null || values?.address == undefined) && (
                    <InputAdornment position="end">
                      <Box
                        loading="lazy"
                        component="img"
                        width={isMobile ? MobilePxToVw(24) : DesktopPxToVw(24)}
                        src={Error_icon}
                        alt="Expand Image"
                      />
                    </InputAdornment>
                  )}
              </>
            ),
          }}
        />
        <StyledFormControl variant="standard">
          <EpicureCartFormLabel
            sx={{
              fontSize: isMobile ? "3.75vw !important" : "0.9375vw !important",
            }}
            disabled={disableForm || disable?.disableCountry}>
            {labels?.[7]?.labelText}
          </EpicureCartFormLabel>
          <LoyaltyStyledSelect
            open={loyaltyOpen?.country}
            onOpen={() => loyaltyType("country")}
            onClose={() => {
              setTimeout(() => {
                ;(document?.activeElement as HTMLElement)?.blur()
              }, 0)
              setLoyaltyOpen({ ...loyaltyOpen, country: false })
            }}
            variant="standard"
            value={select?.country}
            sx={{
              width: isMobile ? "100% !important" : "15.2vw",
              "& .MuiInput-input": {
                fontSize: isMobile ? `${MobilePxToVw(24)} !important` : `${DesktopPxToVw(18)} !important`,
              },
            }}
            disabled={disableForm || true}
            name="country"
            MenuProps={{
              PaperProps: {
                elevation: 0,
                sx: {
                  maxHeight: 300,
                  backgroundColor: theme?.palette?.background?.default,
                  borderRadius: "0",
                  boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
                  fontSize: isMobile ? MobilePxToVw(18) : DesktopPxToVw(18),
                },
              },
            }}
            IconComponent={(props: any) => (
              <>
                {emptyFieldErrors?.country &&
                (select?.country?.length === 0 || select?.country === null || select?.country == undefined) ? (
                  <Box
                    loading="lazy"
                    component="img"
                    width={isMobile ? MobilePxToVw(24) : DesktopPxToVw(24)}
                    src={Error_icon}
                    alt="Expand Image"
                  />
                ) : (
                  <ClickAwayListener onClickAway={() => setOpenToolTip(false)}>
                    <Box sx={{ width: "10%" }}>
                      {isMobile ? (
                        <CustomWidthTooltip
                          arrow
                          disableFocusListener
                          disableHoverListener
                          disableTouchListener
                          PopperProps={{
                            disablePortal: true,
                            sx: {
                              "& .MuiTooltip-arrow": {
                                color: theme?.palette?.neuPalette?.hexSixteen,
                              },
                            },
                          }}
                          open={openToolTip}
                          placement="top"
                          title={<Typography variant={isMobile ? "m-body-s" : "body-s"}>{tooltipText}</Typography>}>
                          <IconButton>
                            <Box
                              loading="lazy"
                              component="img"
                              width={isMobile ? MobilePxToVw(24) : DesktopPxToVw(22)}
                              src={TOOL_TIP_ICON}
                              onClick={() => handleToolTip()}
                            />
                          </IconButton>
                        </CustomWidthTooltip>
                      ) : (
                        <CustomWidthTooltip
                          arrow
                          placement="top"
                          PopperProps={{
                            sx: {
                              "& .MuiTooltip-arrow": {
                                color: theme?.palette?.neuPalette?.hexSixteen,
                              },
                            },
                          }}
                          title={<Typography variant={isMobile ? "m-body-s" : "body-s"}>{tooltipText}</Typography>}>
                          <IconButton sx={{ cursor: "default" }}>
                            <Box
                              loading="lazy"
                              component="img"
                              width={isMobile ? MobilePxToVw(24) : DesktopPxToVw(22)}
                              src={TOOL_TIP_ICON}
                            />
                          </IconButton>
                        </CustomWidthTooltip>
                      )}
                    </Box>
                  </ClickAwayListener>
                )}
              </>
            )}
            onChange={(e) => {
              handleSelectedValue(e, "country")
            }}>
            {data?.countryList?.slice(0, 1)?.map((item: any, index: number) => (
              <StyledMenuItem key={index} value={item?.country}>
                {item?.country}
              </StyledMenuItem>
            ))}
          </LoyaltyStyledSelect>
        </StyledFormControl>
      </ThreeRowGrid>
      <FourRowGrid>
        <InputTextFieldEpicure
          variant="standard"
          label={labels?.[10]?.labelText}
          value={values?.pinCode}
          name={pinCode}
          InputLabelProps={{
            shrink: values?.pinCode?.length > 0 ? true : false,
          }}
          disabled={disableForm || disable?.disablePinCode}
          onKeyDown={RestrictSpecialChar}
          sx={{
            transform: isMobile ? "scale(1) translate(0px, 0vw)" : "scale(1) translate(0px, 0.208vw)",
            width: isMobile ? "100%" : "15vw",
            input: {
              "&:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 50px #FFFFFF inset !important",
              },
            },
          }}
          type="number"
          InputProps={{
            endAdornment: (
              <>
                {emptyFieldErrors?.pinCode &&
                  (values?.pinCode?.length === 0 || values?.pinCode === null || values?.pinCode == undefined) && (
                    <InputAdornment position="end">
                      <Box
                        loading="lazy"
                        component="img"
                        width={isMobile ? MobilePxToVw(24) : DesktopPxToVw(24)}
                        src={Error_icon}
                        alt="Expand Image"
                      />
                    </InputAdornment>
                  )}
              </>
            ),
          }}
          onInput={(e: any) => {
            e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 6)
          }}
          helperText={
            (errors?.pinCode && values?.pinCode?.length > 0 && labels?.[10]?.helperText) ||
            (emptyFieldErrors?.pinCode &&
              (values?.pinCode?.length === 0 || values?.pinCode === null || values?.pinCode == undefined) &&
              labels?.[10]?.errorText) ||
            (invalidPinCode && labels?.[10]?.helperText)
          }
          onChange={(e: any) => handlePincode(e)}
        />
        <EpicureCartFormControl variant="standard">
          <CustomAutoCompleteComponent
            disabled={true}
            noOptionsText={stateList?.length === 0 ? "Please wait fetching states list..." : ""}
            value={select?.state}
            disableClearable={select?.state?.length === 0 ? true : false}
            options={(stateList && stateList) || []}
            onOpen={() => getStates("India")}
            onChange={(event: any, newValue: any) => {
              setSelect((prev: any) => {
                return {
                  ...prev,
                  state: newValue,
                  city: "",
                }
              })
              getCity(newValue)
            }}
            renderInput={(params: any) => (
              <AutoCompleteInput
                {...params}
                variant="standard"
                name="state"
                placeholder={PLACEHOLDERS?.STATE}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password",
                }}
              />
            )}
            getOptionLabel={(option: any) => option}
            sx={{
              "& .MuiInput-input": {
                transform: isMobile
                  ? "scale(1) translate(0, 0vw) !important"
                  : "scale(1) translate(0, 0.313vw) !important",
              },
              width: isMobile ? "100% !important" : "15.1vw",
              "& .MuiFormControl-root": {
                paddingBottom: isMobile ? "0vw !important" : "unset",
              },
              "& .MuiInputBase-root .MuiInput-input": {
                fontSize: isMobile ? MobilePxToVw(24) : DesktopPxToVw(18),
                fontWeight: 300,
              },
              "& .MuiInputLabel-root": {
                fontSize: isMobile ? MobilePxToVw(24) : `${DesktopPxToVw(18)} !important`,
              },
              "& input::placeholder": {
                fontSize: isMobile ? MobilePxToVw(24) : `${DesktopPxToVw(18)} !important`,
                fontWeight: 300,
              },
              "& .MuiSvgIcon-root": {
                width: isMobile ? `${MobilePxToVw(24)}!important` : `${DesktopPxToVw(30)}!important`,
                height: isMobile ? `${MobilePxToVw(24)}!important` : `${DesktopPxToVw(24)}!important`,
                color: theme?.palette?.neuPalette?.hexSeventeen,
                opacity: 0.4,
              },
              ".MuiFormLabel-root": {
                fontSize: isMobile ? MobilePxToVw(24) : `${DesktopPxToVw(18)} !important`,
              },
            }}
          />
          {emptyFieldErrors?.state &&
            (select?.state?.length === 0 || select?.state === null || select?.state == undefined) && (
              <Box position={"relative"}>
                <ErrorMessageTypography position={"absolute"}>{labels?.[8]?.errorText}</ErrorMessageTypography>
              </Box>
            )}
        </EpicureCartFormControl>
        <EpicureCartFormControl variant="standard">
          <CustomAutoCompleteComponent
            disabled={true}
            value={select?.city}
            disableClearable={select?.city?.length === 0 ? true : false}
            noOptionsText={
              !select?.state
                ? "Please select state first"
                : cityList?.length === 0
                ? "Please wait fetching cities list..."
                : ""
            }
            options={(cityList && cityList) || []}
            onOpen={() => getCity(select?.state)}
            onChange={(event: any, newValue: any) => {
              setSelect((prev: any) => {
                return {
                  ...prev,
                  city: newValue,
                }
              })
            }}
            renderInput={(params: any) => (
              <AutoCompleteInput
                {...params}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
                placeholder={PLACEHOLDERS?.CITY}
                name="city"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password",
                }}
              />
            )}
            getOptionLabel={(option: any) => option}
            sx={{
              "& .MuiInput-input": {
                transform: isMobile
                  ? "scale(1) translate(0, 0vw) !important"
                  : "scale(1) translate(0, 0.313vw) !important",
              },
              width: isMobile ? "100% !important" : "15.4550vw",
              "& .MuiFormControl-root": {
                paddingBottom: isMobile ? "0vw !important" : "unset",
              },
              "& .MuiInputBase-root .MuiInput-input": {
                fontSize: isMobile ? MobilePxToVw(24) : DesktopPxToVw(18),
                fontWeight: 300,
              },
              "& .MuiInputLabel-root": {
                fontSize: isMobile ? MobilePxToVw(24) : `${DesktopPxToVw(18)} !important`,
              },
              "& input::placeholder": {
                fontSize: isMobile ? MobilePxToVw(24) : `${DesktopPxToVw(18)} !important`,
                fontWeight: 300,
              },
              "& .MuiSvgIcon-root": {
                width: isMobile ? `${MobilePxToVw(24)}!important` : `${DesktopPxToVw(30)}!important`,
                height: isMobile ? `${MobilePxToVw(24)}!important` : `${DesktopPxToVw(24)}!important`,

                color: theme?.palette?.neuPalette?.hexSeventeen,
                opacity: 0.4,
              },
              ".MuiFormLabel-root": {
                fontSize: isMobile ? MobilePxToVw(24) : `${DesktopPxToVw(18)} !important`,
              },
            }}
          />
          {emptyFieldErrors?.city &&
            (select?.city?.length === 0 || select?.city === null || select?.city == undefined) && (
              <Box position={"relative"}>
                <ErrorMessageTypography position={"absolute"}>{labels?.[9]?.errorText}</ErrorMessageTypography>
              </Box>
            )}
        </EpicureCartFormControl>
      </FourRowGrid>
      <Grid
        sx={{
          display: "flex",
          gap: isMobile ? "6vw" : "2vw",
          flexDirection: isMobile ? "column" : "row",
          marginTop: isMobile ? "2vw" : "",
        }}>
        <InputTextFieldEpicure
          variant="standard"
          label={PLACEHOLDERS?.GST_NUMBER}
          value={values?.gstNo}
          name={GSTNo}
          disabled={disableForm}
          helperText={errors?.gstNo && values?.gstNo?.length > 0 && labels?.[11]?.errorText}
          onChange={(e: any) => handleChange(e)}
          inputProps={{ maxLength: 16 }}
          sx={{
            width: isMobile ? "100%" : "23.5vw",
            input: {
              "&:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 50px #FFFFFF inset !important",
              },
            },
          }}
        />
        {(epicureGlobalStore?.epicureCardData?.isTata ||
          epicureGlobalStore?.epicureCardData?.isShareHolder ||
          epicureGlobalStore?.epicureCardData?.isBankUrl) && (
          <InputTextFieldEpicure
            variant="standard"
            label={labels?.[15]?.labelText || "Voucher Code*"}
            value={voucherCode}
            disabled={disableForm}
            InputLabelProps={{
              shrink: voucherCode ? true : false,
            }}
            type="tel"
            name={"voucherCode"}
            onKeyDown={RestrictSpecialChar}
            helperText={
              (voucherCode &&
                voucherCode?.toString()?.length > 0 &&
                voucherCode?.toString()?.length < 19 &&
                labels?.[15]?.helperText) ||
              (loyaltyEnrollStore?.EmptyVoucherErrors?.voucherCode &&
                voucherCode?.toString()?.length < 1 &&
                labels?.[15]?.helperText)
            }
            onChange={(e: any) => handleVouchers(e)}
            sx={{
              "& .MuiFormHelperText-root": {
                width: "max-content",
              },
              width: isMobile ? "100%" : "24vw",
              input: {
                "&:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 50px #FFFFFF inset !important",
                },
              },
            }}
          />
        )}
        {(epicureGlobalStore?.epicureCardData?.isTata ||
          epicureGlobalStore?.epicureCardData?.isShareHolder ||
          epicureGlobalStore?.epicureCardData?.isBankUrl) && (
          <InputTextFieldEpicure
            variant="standard"
            label={labels?.[16]?.labelText || "Voucher Pin*"}
            value={voucherPin}
            name={"voucherPin"}
            onKeyDown={RestrictSpecialChar}
            disabled={disableForm}
            type="tel"
            InputLabelProps={{
              shrink: voucherPin ? true : false,
            }}
            helperText={
              (voucherPin &&
                voucherPin?.toString()?.length > 0 &&
                voucherPin?.toString()?.length < 6 &&
                labels?.[16]?.helperText) ||
              (loyaltyEnrollStore?.EmptyVoucherErrors?.voucherPin && !voucherPin && labels?.[16]?.helperText)
            }
            onChange={(e: any) => handleVouchers(e)}
            sx={{
              width: isMobile ? "100%" : "24vw",
              input: {
                "&:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 50px #FFFFFF inset !important",
                },
              },
            }}
          />
        )}
      </Grid>
      {clusterItem && (
        <Grid>
          <CheckBoxWrapper sx={{ alignItems: "flex-end" }}>
            <CustomCheckBox
              checked={openForm}
              isCheckBoxDisabled={disableForm}
              withBorder={true}
              onChange={() => {
                setOpenForm(!openForm)
              }}
            />
            <Typography
              variant={isMobile ? "m-body-m" : "heading-xs"}
              component={"h3"}
              sx={{
                fontSize: isMobile ? MobilePxToVw(20) : DesktopPxToVw(20),
              }}>
              {labels?.[14]?.labelText}
            </Typography>
          </CheckBoxWrapper>
        </Grid>
      )}
    </>
  )
}

export default observer(EpicureFormAddress)
