import { Box, Button, InputAdornment, Typography } from "@mui/material"
import { Fragment, useEffect, useState } from "react"
import CloseIcon from "@mui/icons-material/Close"
import AddIcon from "@mui/icons-material/Add"
import DesktopPxToVw from "../../../../utils/DesktopFontCalc"
import { theme } from "../../../../lib/theme"
import {
  AddFiltersBox,
  AddFiltersText,
  FiltersInputBox,
  FilterSuggestionBox,
  PreferenceBox,
  PreferenceButton,
  PreferredButton,
  SearchInput,
} from "../styles"
import { CONSTANTS } from "../../../constants"

const PreferenceCardComponent = ({ filterText, type, filters }: any) => {
  const [addFilters, setAddFilters] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<Array<string>>([])
  const [availableFilters, setAvailableFilters] =
    useState<Array<string>>(filters)
  const [textSearch, setTextSearch] = useState("")
  const addFilterToList = (filter: string) => {
    setSelectedFilters([...selectedFilters, filter])
    setAvailableFilters([
      ...availableFilters.filter((text: string) => text !== filter),
    ])
  }
  const removeFromFilters = (filter: string) => {
    setAvailableFilters([...availableFilters, filter])
    setSelectedFilters([
      ...selectedFilters.filter((text: string) => text !== filter),
    ])
  }
  const searchFilter = (e: any) => {
    setTextSearch(e.target.value)

    setAvailableFilters([
      ...availableFilters.filter((text: string) =>
        text.toLowerCase()?.startsWith(e.target.value?.toLowerCase())
      ),
    ])
  }
  useEffect(() => {
    if (textSearch?.length < 1) {
      setAvailableFilters(filters)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textSearch])

  return (
    <Fragment>
      <PreferenceBox elevation={0}>
        <Typography variant="heading-xs" sx={{ width: DesktopPxToVw(250) }}>
          {filterText}
        </Typography>
        <FilterSuggestionBox>
          {selectedFilters?.map((filter: string, id: number) => (
            <PreferredButton
              key={id}
              disableRipple
              variant="light-contained"
              endIcon={
                <CloseIcon
                  onClick={() => removeFromFilters(filter)}
                  sx={{ color: theme?.palette?.neuPalette?.hexOne }}
                />
              }>
              {filter}
            </PreferredButton>
          ))}
        </FilterSuggestionBox>
      </PreferenceBox>
      {!addFilters && (
        <AddFiltersBox>
          <Typography
            variant="body-m"
            sx={{ color: theme?.palette?.neuPalette?.hexTwo }}>
            +
          </Typography>
          <AddFiltersText onClick={() => setAddFilters(true)} variant="body-m">
            {`ADD MORE IN ${type}`}
          </AddFiltersText>
        </AddFiltersBox>
      )}
      <Box>
        {addFilters && (
          <Box sx={{ marginBottom: DesktopPxToVw(40) }}>
            <FiltersInputBox>
              <SearchInput
                value={textSearch}
                onChange={searchFilter}
                placeholder="Destination"
                fullWidth
                startAdornment={
                  <InputAdornment position="start">
                    <Box component={"img"} src="./search-icon.png" />
                  </InputAdornment>
                }
              />
            </FiltersInputBox>
            <FilterSuggestionBox>
              {availableFilters?.map((text: string, index: number) => (
                <PreferenceButton
                  key={index}
                  onClick={() => addFilterToList(text)}
                  variant="light-outlined"
                  endIcon={
                    <AddIcon
                      sx={{ color: theme?.palette?.neuPalette?.hexSeventeen }}
                    />
                  }>
                  {text}
                </PreferenceButton>
              ))}
            </FilterSuggestionBox>
            <Button
              onClick={() => setAddFilters(false)}
              variant="light-contained"
              sx={{ marginTop: DesktopPxToVw(30) }}>
              {CONSTANTS?.SAVE}
            </Button>
          </Box>
        )}
      </Box>
    </Fragment>
  )
}

export default PreferenceCardComponent
