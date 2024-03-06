import { InputAdornment, RadioGroup, Stack, Typography } from "@mui/material"
import {
  FilterStack,
  FlexBox,
  InputTextField,
  RadioButton,
  SaleOfficeFormControlLabel,
  ViewMapContainerBox,
  ViewMapLocationBox,
  ViewMapLocationOnIcon,
} from "./styles/GlobalContactstyles"
import { useMobileCheck } from "../../utils/isMobilView"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { SearchIcon } from "../../utils/customIcons"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { FullBox } from "../forms/business-form/business-sme-form"

export const GlobalContacts = ({
  parameterMap,
  searchLocation,
  setSearchLocation,
  alternateAllLinks,
  setRadioFilter,
  radioFilter,
}: any) => {
  const navigate = useAppNavigation()
  const isMobile = useMobileCheck()
  const handleClick = (url: any, urlType: any) => {
    navigate(url, urlType)
  }
  const handleRadioFilter = (e: any) => {
    setRadioFilter(e?.target?.value)
  }
  return (
    <FullBox sx={{ pb: isMobile ? MobilePxToVw(65) : "" }}>
      <FilterStack>
        <InputTextField
          sx={{
            width: isMobile ? "100%" : "22.083vw!important",
            "& .MuiInputBase-root": {
              height: "100%",
            },
          }}
          variant="standard"
          placeholder={parameterMap?.[0]?.value}
          name="location"
          value={searchLocation}
          onChange={(e: any) => {
            setSearchLocation(() => e?.target?.value)
          }}
          InputLabelProps={{ style: { fontSize: "2.083vw" } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  sx={{
                    height: "auto",
                    marginBottom: "0.22vw",
                    width: isMobile ? MobilePxToVw(22) : DesktopPxToVw(22),
                  }}
                />
              </InputAdornment>
            ),
          }}
        />
        <Stack flexDirection="row" alignItems="center">
          <Typography
            variant={isMobile ? "m-body-l" : "body-l"}
            sx={{ mr: isMobile ? "5.8vw" : "1.4vw" }}>
            {parameterMap?.[1]?.value}
          </Typography>
          <RadioGroup
            row
            onChange={handleRadioFilter}
            defaultValue={radioFilter || parameterMap?.[2]?.value}
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group">
            <SaleOfficeFormControlLabel
              value={parameterMap?.[2]?.value}
              name={parameterMap?.[2]?.value}
              control={<RadioButton />}
              label={
                <Typography
                  sx={{ lineHeight: "0vw" }}
                  variant={isMobile ? "m-body-sl" : "body-ml"}>
                  {parameterMap?.[2]?.value}
                </Typography>
              }
            />
            <SaleOfficeFormControlLabel
              value={parameterMap?.[3]?.value}
              name={parameterMap?.[3]?.value}
              control={<RadioButton />}
              label={
                <Typography variant={isMobile ? "m-body-sl" : "body-ml"}>
                  {parameterMap?.[3]?.value}
                </Typography>
              }
            />
          </RadioGroup>
        </Stack>
        <FlexBox>
          <ViewMapContainerBox
            onClick={() => {
              handleClick(
                alternateAllLinks?.[0]?.url,
                alternateAllLinks?.[0]?.urlType
              )
            }}>
            <ViewMapLocationOnIcon
              sx={{
                height: isMobile ? "4.375vw" : "1.45vw",
                width: isMobile ? "4.375vw" : "1.45vw",
              }}
            />

            <Typography variant={isMobile ? "m-body-sl" : "body-ml"}>
              {parameterMap?.[4]?.value}
            </Typography>
          </ViewMapContainerBox>
        </FlexBox>
      </FilterStack>
    </FullBox>
  )
}
