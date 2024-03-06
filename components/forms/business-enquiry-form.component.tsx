import React, { useState } from "react"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { AutoSizeTextArea } from "../BookingFlow/styles/primary.guest.details"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import {
  MainBox,
  EnquireButton,
  StyledTextField,
  TitleTypography,
  PrimaryFieldsBox,
  SecondaryFieldsBox,
} from "./styles/business-enquiry-form"

const BusinessEnquiryForm = (props: any) => {
  const [values, setValues] = useState<any>(null)
  const [selectedItems, setSelectedItems] = useState<any>(null)

  return (
    <MainBox>
      {props?.title && (
        <TitleTypography variant={"heading-s"}>{props?.title}</TitleTypography>
      )}
      <PrimaryFieldsBox>
        {props?.items?.map((data: any, index: number) => {
          if (data?.inputFieldType == "dropDown") {
            return (
              <FormControl
                key={index}
                variant="standard"
                sx={{
                  minWidth: "17.34vw",
                  marginTop:
                    index == props?.items?.length - 1 ? "1.93vw" : "0vw",
                }}>
                <InputLabel>{data?.labelText}</InputLabel>
                <Select IconComponent={KeyboardArrowDownIcon}>
                  {data?.clusterItems?.map((list: any, childIndex: number) => {
                    return (
                      <MenuItem
                        key={childIndex}
                        value={list?.key}
                        onClick={() => {
                          setSelectedItems(list?.items?.[0])
                        }}>
                        {list?.key}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            )
          } else {
            return (
              <StyledTextField
                key={index}
                name="name"
                variant="standard"
                value={values?.name}
                placeholder={data?.labelText}
              />
            )
          }
        })}
      </PrimaryFieldsBox>
      {selectedItems?.items?.length > 0 && (
        <SecondaryFieldsBox>
          {selectedItems?.items?.map((childData: any, index2: number) => {
            if (index2 !== selectedItems?.items?.length - 1) {
              return (
                <StyledTextField
                  key={index2}
                  name="name"
                  variant="standard"
                  value={values?.name}
                  placeholder={childData?.labelText}
                  sx={{
                    marginTop:
                      index2 == selectedItems?.items?.length - 1
                        ? "1.61vw"
                        : "0vw",
                  }}
                />
              )
            } else {
              return (
                <AutoSizeTextArea
                  key={index2}
                  minRows={4}
                  placeholder={childData?.labelText}
                  sx={{ background: "none", marginTop: "1.93vw" }}
                />
              )
            }
          })}
        </SecondaryFieldsBox>
      )}
      <EnquireButton variant="light-contained">
        {props?.PrimaryAction?.title}
      </EnquireButton>
    </MainBox>
  )
}

export default BusinessEnquiryForm
