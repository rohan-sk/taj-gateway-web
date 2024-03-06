import { CONSTANTS } from "../../../components/constants"
import { GroupFilterWrappingBox } from "../../../components/group/styles/common-styled-components"
import SearchFilter from "./search-filter"
import DropDownFilter from "./drop-down-filter"
import { useMobileCheck } from "../../isMobilView"

const GroupFilterLogic = ({ props, backgroundColor, parameterMap, setFilteredProps, dynamicTabs, textColor }: any) => {
  const filterConfig = props?.filterConfig
  const isMobile = useMobileCheck()
  const numberOfFilter = filterConfig.length
  return (
    <>
      <GroupFilterWrappingBox
        sx={{
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "center" : "flex-end",
          justifyContent: isMobile
            ? "center"
            : props?.filterAlignment?.toLowerCase() === "end"
            ? "flex-end"
            : "flex-start",
          width: "100%",
        }}>
        {filterConfig?.map((filterTypeData: any, id: number) => {
          if (filterTypeData?.filterType?.toLowerCase() === CONSTANTS?.SEARCH_FIELD?.toLowerCase()) {
            return (
              <SearchFilter
                textColor={textColor}
                filterTypeData={filterTypeData}
                backgroundColor={backgroundColor}
                key={id}
                iconColor={filterConfig[0]?.iconColor?.hex ? filterConfig[0]?.iconColor?.hex : ""}
                props={props}
                setFilteredProps={setFilteredProps}
                numberOfFilter={numberOfFilter}
              />
            )
          } else if (filterTypeData?.filterType?.toLowerCase() === CONSTANTS?.DROP_DOWN?.toLowerCase()) {
            return (
              <DropDownFilter
                filterTypeData={filterTypeData}
                backgroundColor={backgroundColor}
                key={id}
                props={props}
                setFilteredProps={setFilteredProps}
                numberOfFilter={numberOfFilter}
              />
            )
          }
        })}
      </GroupFilterWrappingBox>
      {/* {isMobile ? (
        <>
          <TextFieldWrapper>
            {filterConfig?.[0]?.filterType?.toLowerCase() ===
              CONSTANTS?.SEARCH_FIELD?.toLowerCase() && (
              <CustomSearch
                fontSizeProp="3.750vw"
                value={searchTerm}
                setValue={setSearchTerm}
                backgroundColor={backgroundColor}
                placeholder={filterConfig?.[0]?.filterPlaceholder}
                maxWidth={"74.219vw"}
                styles={{
                  fontFamily: "Inter",
                  fontStyle: "normal",
                  fontWeight: 300,
                  lineHeight: "150%",
                  margin: `${MobilePxToVw(55)} 0vw`,
                  color: theme?.palette?.ihclPalette?.hexSeventeen,
                }}
              />
            )}
            {filterConfig?.[1]?.filterType?.toLowerCase() ===
              CONSTANTS?.DROP_DOWN?.toLowerCase() && (
              <CustomDropDown
                label={filterConfig?.[1]?.filterPlaceholder}
                data={[]}
                value={dropDownValue}
                placeHolder={filterConfig?.[1]?.filterPlaceholder}
                setValue={setDropDownValue}
                backgroundColor={backgroundColor}
                marginBottom={"1vw"}
              />
            )}
          </TextFieldWrapper>
        </>
      ) : (
        <>
          <ParameterMapWrappingBox
            sx={{
              alignItems: "flex-end",
              justifyContent: false
                ? "space-between"
                : filterConfig?.length == 2
                ? "flex-end"
                : filterConfig?.length > 1
                ? "flex-start"
                : "flex-end",
            }}>
            {filterConfig?.[0]?.filterType?.toLowerCase() ===
              CONSTANTS?.SEARCH_FIELD?.toLowerCase() && (
              <CustomSearch
                fontSizeProp="1.25vw"
                maxWidth={
                  isMobile ? null : parameterMap?.length > 3 ? "17.188vw" : null
                }
                value={searchTerm}
                setValue={setSearchTerm}
                backgroundColor={backgroundColor}
                placeholder={filterConfig?.[0]?.filterPlaceholder}
                styles={{
                  fontWeight: 300,
                  fontStyle: "normal",
                  fontFamily: "Inter",
                  color: theme?.palette?.ihclPalette?.hexSeventeen,
                }}
              />
            )}
            {filterConfig?.[1]?.filterType?.toLowerCase() ===
              CONSTANTS?.DROP_DOWN?.toLowerCase() && (
              <CustomDropDown
                label={filterConfig?.[1]?.filterPlaceholder}
                data={[]}
                value={dropDownValue}
                placeHolder={filterConfig?.[1]?.filterPlaceholder}
                setValue={setDropDownValue}
                backgroundColor={backgroundColor}
                minWidth={
                  isMobile ? null : parameterMap?.length > 3 ? "17.188vw" : null
                }
                margin={isMobile ? "0vw" : "-0.521vw 0vw 0vw"}
              />
            )}
          </ParameterMapWrappingBox>
        </>
      )} */}
    </>
  )
}

export default GroupFilterLogic
