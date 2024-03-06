import React from "react"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { Box, InputLabel, Select, TextField, Typography } from "@mui/material"
import asyaData from "./asya-json.json"
import { theme } from "../../../../lib/theme"
import { InputText } from "../holiday-enquire-forms/holiday-enquire-form-styles"
import {
  AsyaFieldsContainer,
  AsyaFormControl,
  AsyaProductContainer,
  AsyaProductOuterGridWrapper,
  ProductMenuItem,
  QuantityWrapper,
  SizeQuantityContainer,
  StyledCloseIcon,
  StyledErrorMessage,
  StyledMenuItem,
  StyledSelect,
  StyledSizeFieldSelect,
} from "../khazana-enquiry-form/products-of-interest.styles"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { useMobileCheck } from "../../../../utils/isMobilView"
import {
  ERROR_MESSAGES,
  ProductPlaceHolders,
  quantity,
} from "../../gift-card-form/constants"

interface AsyaProductsInterface {
  selectProduct: any[]
  productErrors: any
  setSelectProduct: Function
  setProductErrors: Function
  data: any
  index: number
  props: any
}
const AsyaProductEnquire = ({
  selectProduct,
  setSelectProduct,
  productErrors,
  setProductErrors,
  data,
  index,
  props,
}: AsyaProductsInterface) => {
  const isMobile = useMobileCheck()
  const handleSelectedValue = async (event: any) => {
    const { name, value } = event.target
    let tempProducts = [...selectProduct]
    const updatedValues = tempProducts?.map((item) => {
      if (item?.id === data?.id) {
        if (name == "quantity") {
          const newValue = event.target.value
          if (newValue === "") return { ...item, [name]: "" }
          else if (
            Number(newValue) &&
            Number(newValue) > 0 &&
            Number(newValue) <= 1000
          ) {
            return {
              ...item,
              [name]: newValue,
            }
          } else {
            return item
          }
        } else if (name === "productType") {
          return {
            ...item,
            [name]: value,
            productName: "",
            size: "",
          }
        } else if (name === "productName") {
          return {
            ...item,
            [name]: value,
            size: "",
          }
        }
        const updatedVal = {
          ...item,
          [name]: value,
        }
        return updatedVal
      } else {
        return item
      }
    })
    setSelectProduct(updatedValues)
  }

  const removeThisProduct = (id: number) => {
    if (selectProduct?.length > 1) {
      let temp = [...selectProduct]
      let finalRes = temp.filter((singleProd: any) => {
        return singleProd.id !== id
      })
      setSelectProduct(finalRes)
      const filteredErrors = productErrors.filter((item: any) => item?.id != id)
      setProductErrors(filteredErrors)
    }
  }

  const massageType = data?.productType
  const productName = data?.productName
  const ProductSize = data?.size
  const matchedItem = productErrors.find((item: any) => item?.id === data?.id)

  return (
    <AsyaProductOuterGridWrapper $mobile={isMobile}>
      <AsyaProductContainer>
        <AsyaFieldsContainer $mobile={isMobile}>
          <AsyaFormControl
            variant="standard"
            sx={{
              "& .MuiSelect-select.MuiInputBase-input.MuiInput-input.MuiSelect-select":
                {
                  minHeight: "unset",
                },
            }}>
            {massageType?.length == 0 && (
              <InputLabel
                sx={{
                  fontWeight: 300,
                }}>
                {ProductPlaceHolders?.MASSAGE}
              </InputLabel>
            )}
            <Select
              sx={{
                width: isMobile ? "61.875vw" : "13.542vw",
              }}
              MenuProps={{
                PaperProps: {
                  elevation: 0,
                  sx: {
                    maxHeight: 300,
                    backgroundColor: theme?.palette?.background?.default,
                    borderRadius: "0",
                    boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
                  },
                },
              }}
              variant="standard"
              value={massageType}
              key={index}
              name="productType"
              onChange={(e: any) => {handleSelectedValue(e)
                const updatedProductError = productErrors.map((product: any) => {
                  if (product?.id === data?.id) {
                    return {
                      ...product,
                      hampers: !(e.target.value.length > 0),
                    }
                  } else {
                    return {
                      ...product,
                    }
                  }
                })
                setProductErrors(updatedProductError)
              }}
              IconComponent={() => (
                <KeyboardArrowDownIcon sx={{ marginBottom: "0.4vw" }} />
              )}>
              {asyaData?.massage?.map((item: any, index: number) => (
                <StyledMenuItem key={index} value={item?.name}>
                  {item?.name}
                </StyledMenuItem>
              ))}
            </Select>
            {matchedItem?.hampers && (
              <StyledErrorMessage>
                {ERROR_MESSAGES?.EMPTY_PRODUCTS}
              </StyledErrorMessage>
            )}
          </AsyaFormControl>
          <AsyaFormControl variant="standard">
            {productName?.length == 0 && (
              <InputLabel sx={{ fontWeight: 300 }}>
                {ProductPlaceHolders?.ASYA_POWERFUL_MASSAGE_BLEND}
              </InputLabel>
            )}
            <StyledSelect
              MenuProps={{
                PaperProps: {
                  elevation: 0,
                  sx: {
                    maxHeight: 300,
                    backgroundColor: theme?.palette?.background?.default,
                    borderRadius: "0",
                    boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
                  },
                },
              }}
              variant="standard"
              value={productName}
              key={index}
              name="productName"
              onChange={(e: any) => {handleSelectedValue(e)
                const updatedProductError = productErrors.map((product: any) => {
                  if (product?.id === data?.id) {
                    return {
                      ...product,
                      products: !(e.target.value.length > 0),
                    }
                  } else {
                    return {
                      ...product,
                    }
                  }
                })
                setProductErrors(updatedProductError)
              }}
              IconComponent={() => (
                <KeyboardArrowDownIcon sx={{ marginBottom: "0.4vw" }} />
              )}>
              {asyaData?.products
                ?.filter(
                  (item: any, index: number) => item?.name === massageType
                )?.[0]
                ?.productsList?.map((item: any, index: number) => (
                  <ProductMenuItem
                    $mobile={isMobile}
                    key={index}
                    value={item?.productName}
                    sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant={isMobile ? "m-body-s" : "body-s"}>
                      {item?.productName}
                    </Typography>
                    <Box
                    loading="lazy"
                      component={"img"}
                      alt="img"
                      src={item?.productImg}
                      sx={{
                        width: isMobile ? "8.125vw" : "2.708vw",
                        height: isMobile ? "100%" : "2.813vw",
                      }}
                    />
                  </ProductMenuItem>
                ))}
            </StyledSelect>
            {matchedItem?.products && (
              <StyledErrorMessage>
                {ERROR_MESSAGES?.EMPTY_PRODUCTS}
              </StyledErrorMessage>
            )}
          </AsyaFormControl>
          <SizeQuantityContainer $mobile={isMobile}>
            <AsyaFormControl
              variant="standard"
              sx={{
                width: isMobile ? MobilePxToVw(178) : DesktopPxToVw(118),
                "& .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-colorPrimary.MuiInputBase-formControl":
                  {
                    paddingBottom: "0vw!important",
                  },
              }}>
              {!(ProductSize?.length > 0) && (
                <InputLabel sx={{ fontWeight: 300 }}>
                  {ProductPlaceHolders?.SIZE}
                </InputLabel>
              )}
              <StyledSizeFieldSelect
                MenuProps={{
                  PaperProps: {
                    elevation: 0,
                    sx: {
                      maxHeight: 300,
                      backgroundColor: theme?.palette?.background?.default,
                      borderRadius: "0",
                      boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
                    },
                  },
                }}
                $mobile={isMobile}
                variant="standard"
                value={ProductSize}
                key={index}
                name="size"
                onChange={(e: any) => {handleSelectedValue(e)
                  const updatedProductError = productErrors.map((product: any) => {
                    if (product?.id === data?.id) {
                      return {
                        ...product,
                        size: !(e.target.value.length > 0),
                      }
                    } else {
                      return {
                        ...product,
                      }
                    }
                  })
                  setProductErrors(updatedProductError)
                }}
                IconComponent={() => <KeyboardArrowDownIcon />}
              >
                {asyaData?.productSize
                  ?.filter(
                    (item: any, index: number) =>
                      item?.productName === productName
                  )?.[0]
                  ?.sizes?.map((item: any, index: number) => (
                    <StyledMenuItem key={index} value={item?.size}>
                      {item?.size}
                    </StyledMenuItem>
                  ))}
              </StyledSizeFieldSelect>
              {matchedItem?.size && (
              <StyledErrorMessage>
                {ERROR_MESSAGES?.EMPTY_Size}
              </StyledErrorMessage>
            )}
            </AsyaFormControl>
            <QuantityWrapper>
              <InputText
                sx={{ width: "100%" }}
                variant="standard"
                name={"quantity"}
                value={data?.quantity === "" ? "" : Number(data?.quantity)}
                placeholder={ProductPlaceHolders?.QUANTITY}
                type="number"
                multiline
                onChange={(e: any) => {handleSelectedValue(e)
                  const updatedProductError = productErrors.map((product: any) => {
                    if (product?.id === data?.id) {
                      return {
                        ...product,
                        productQuantity: !(e.target.value.length > 0),
                      }
                    } else {
                      return {
                        ...product,
                      }
                    }
                  })
                  setProductErrors(updatedProductError)
                }}
                helperText={
                  matchedItem?.productQuantity &&
                  ERROR_MESSAGES?.EMPTY_PRODUCT_QUANTITY
                }
              />
            </QuantityWrapper>
          </SizeQuantityContainer>
        </AsyaFieldsContainer>
        <StyledCloseIcon
          $mobile={isMobile}
          onClick={() => {
            removeThisProduct(data.id)
          }}
        />
      </AsyaProductContainer>
    </AsyaProductOuterGridWrapper>
  )
}

export default AsyaProductEnquire
