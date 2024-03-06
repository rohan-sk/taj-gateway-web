import { theme } from "../../../lib/theme"
import { getClient } from "../../../lib-sanity"
import dynamic from "next/dynamic"
import { ParticipatingHotelsType } from "./types"
import SearchResult from "./search-result.component"
import { SearchIcon } from "../../../utils/customIcons"
import { useMobileCheck } from "../../../utils/isMobilView"
const LoadingSpinner = dynamic(() => import("../../../utils/SpinnerComponent"))
import React, { Fragment, useContext, useState } from "react"
import { Box, InputAdornment, Typography } from "@mui/material"
const RenderActionItem = dynamic(() => import("../../hoc/actions/action-items-ui"))
import { ErrorMessageTypography } from "../gift-card-form/styles"
import { fetchParticipatingHotelsData } from "../../../lib/utils"
import { ContactBox, InputFieldsBox, SearchResultBox } from "./styles"
import { InputTextField } from "../../modal/styles/manage-card.styles"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import TextfieldValidator from "../../../utils/validations/TextfieldValidator"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { getListWithBrandSorting } from "../../../utils/getListWithBrandSorting"

const ParticipatingHotelsComponent = ({
  title,
  items,
  content,
  PrimaryAction,
  largeVariant,
  subtitle,
}: ParticipatingHotelsType) => {
  const [formValue, setFormValue] = useState<string>("")
  const [formError, setFormError] = useState<any>()
  const [hotelData, setHotelData] = useState<any>([])
  const [showLoader, setShowLoader] = useState<boolean>(false)
  const [noResultsFound, setNoResultsFound] = useState<string>()
  const Context = useContext(IHCLContext)
  const isMobile = useMobileCheck()
  const fromNeupass = largeVariant === "membership.form.participating-hotel-search"

  const handleSubmit = async (event?: any) => {
    event?.preventDefault()
    setShowLoader(true)
    const query = fetchParticipatingHotelsData(formValue, fromNeupass)
    await getClient(true)
      .fetch(query)
      .then((data) => {
        setHotelData(getListWithBrandSorting(data))
      })
      .finally(() => {
        setNoResultsFound(items?.[0]?.errorText ? items?.[0]?.errorText : "")
        setShowLoader(false)
      })
  }
  const formValidation = (isFormValid: any, id: any) => {
    setFormError(!isFormValid)
  }
  const handleChangeForm = (event: any) => {
    const { name, value } = event.target
    const { status } = TextfieldValidator(name, value)
    setFormValue(event?.target?.value)
    formValidation(status, name)
    setNoResultsFound("")
  }
  let getBgColor = isMobile ? theme?.palette?.ihclPalette?.hexTwentyNine : theme?.palette?.ihclPalette?.hexOne
  const inputStyle = {
    WebkitBoxShadow: `0 0 0 1000px ${getBgColor} inset`,
  }

  const handlePhoneKeyRestrictions = (event: any) => {
    if (event?.key === "Enter" && !formError && formValue?.length > 0) {
      handleSubmit(event)
    }
  }

  return (
    <Fragment>
      {showLoader && <LoadingSpinner />}
      <Box
        sx={{
          textAlign: "center",
          marginBottom: isMobile ? MobilePxToVw(55) : "unset",
        }}>
        <Typography variant={isMobile ? "m-heading-s" : "heading-s"}>{title}</Typography>
        {subtitle && (
          <Typography
            sx={{ marginTop: isMobile ? MobilePxToVw(55) : DesktopPxToVw(30) }}
            component={"p"}
            variant={isMobile ? "m-body-s" : "body-m"}>
            {subtitle}
          </Typography>
        )}
      </Box>
      {(items?.[0]?.labelText || PrimaryAction?.title) && (
        <InputFieldsBox>
          {items?.[0]?.labelText && (
            <InputTextField
              required
              fullWidth
              placeholder={items?.[0]?.labelText}
              variant="standard"
              name={"city"}
              error={formError}
              onKeyDown={handlePhoneKeyRestrictions}
              value={formValue}
              inputProps={{ style: inputStyle }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      sx={{
                        width: isMobile ? MobilePxToVw(22) : DesktopPxToVw(22),
                      }}
                    />
                  </InputAdornment>
                ),
              }}
              helperText={formError && formValue?.length > 0 && items?.[0]?.helperText}
              onChange={(e: any) => handleChangeForm(e)}
            />
          )}
          {PrimaryAction?.title && (
            <RenderActionItem
              isDisable={!(formError || formValue?.length === 0)}
              url={""}
              title={PrimaryAction?.title}
              variant={PrimaryAction?.variant}
              navigationType={PrimaryAction?.urlType}
              isActionButtonType={true}
              buttonStyles={isMobile ? { marginTop: MobilePxToVw(55) } : { whiteSpace: "nowrap", marginTop: "-0.65vw" }}
              onClick={() => !formError && formValue?.length > 0 && handleSubmit()}
            />
          )}
        </InputFieldsBox>
      )}
      {(hotelData?.length > 0 || formValue?.length > 0) && (
        <Box sx={isMobile ? { padding: `${MobilePxToVw(40)} 0vw ${MobilePxToVw(20)} 0vw` } : { padding: "1.05vw 0vw" }}>
          {hotelData?.length > 0 ? (
            <Typography variant={isMobile ? "m-body-l" : "body-l"}>
              <b>{`${hotelData?.length} ${hotelData?.length == 1 ? "Hotel" : "Hotels"} `}</b>
              found for your search
            </Typography>
          ) : (
            <ErrorMessageTypography sx={{ fontSize: `${DesktopPxToVw(22)}!important` }}>
              {noResultsFound}
            </ErrorMessageTypography>
          )}
        </Box>
      )}
      {hotelData?.length > 0 && (
        <SearchResultBox>
          {hotelData?.map((data: any, id: number) => (
            <SearchResult key={id} data={data} />
          ))}
        </SearchResultBox>
      )}
      <ContactBox>
        <Typography
          variant="m-body-s"
          sx={{
            "& span": {
              fontSize: isMobile ? "3.438vw" : "1.146vw !important",
            },
          }}>
          {content?.map((item: any, index: number) => (
            <Fragment key={index}>
              {Context?.renderComponent(item._type, {
                ...item,
              })}
            </Fragment>
          ))}
        </Typography>
      </ContactBox>
    </Fragment>
  )
}

export default ParticipatingHotelsComponent
