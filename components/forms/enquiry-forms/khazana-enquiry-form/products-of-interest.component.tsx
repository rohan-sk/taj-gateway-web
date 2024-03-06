import React, { useContext } from "react"
import { theme } from "../../../../lib/theme"
import dynamic from "next/dynamic"
import CloseIcon from "@mui/icons-material/Close"
import hampersData from "./enquire-forms-json.json"
import { Box, Select, Stack, Typography } from "@mui/material"
import { useMobileCheck } from "../../../../utils/isMobilView"
import { ERROR_MESSAGES } from "../../gift-card-form/constants"
import { StyledInputLabel } from "./khazana-enquiry-form.styles"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import {
  MainBox,
  FormsWrapper,
  StyledMenuItem,
  KhazanaFormControl,
  StyledErrorMessage,
} from "./products-of-interest.styles"
import { InputTextField } from "../news-letter-form/news-letter-form.styles"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import { HamperStore } from "../../../../store"
import { GLOBAL_STORES } from "../../../../utils/Constants"
const EnquireDropDown = dynamic(() => import("../../common/form-drop-down-component"))
import { observer } from "mobx-react-lite"
import { insertUnExistenceRecord } from "../../book-a-stay-form/utils"

interface ProductsInterface {
  selectProduct: any[]
  setSelectProduct: Function
  data: any
  hamperFormData: any
  isHamperVariant: boolean
  productsList: any[]
  index: number
  props: any
  setProductErrors: Function
  productErrors: any
  isStaticHamper?: boolean
}
const ProductsOfInterest = ({
  selectProduct,
  setSelectProduct,
  data,
  isHamperVariant,
  productsList,
  index,
  props,
  productErrors,
  setProductErrors,
  isStaticHamper,
  hamperFormData,
}: ProductsInterface) => {
  const Context = useContext(IHCLContext)
  const hamperStore = Context?.getGlobalStore(GLOBAL_STORES.hamperStore) as HamperStore
  const isMobile = useMobileCheck()

  const removeDuplicatesAndSort = (arr: any, keyName: string): any[] => {
    if (Array?.isArray(arr) && arr?.length > 0) {
      let unique: any = []
      arr?.forEach((element: any) => {
        if (
          element &&
          unique?.findIndex((item: any) => item?.[keyName]?.toLowerCase() === element?.[keyName]?.toLowerCase()) === -1
        ) {
          unique?.push(element)
        }
      })
      return unique
    } else {
      return []
    }
  }

  const handleSelectedValue = async (event: any) => {
    const { name, value } = event.target
    let tempProducts = [...selectProduct]
    const updatedValues = tempProducts?.map((item) => {
      if (item?.id === data?.id) {
        const updatedVal = {
          ...item,
          [name]: value,
        }
        switch (name) {
          case "signatureHamper":
            return {
              ...updatedVal,
              productName: hamperStore?.selectedHamperInfo?.hotelInformation?.hotelName
                ? hamperStore?.selectedHamperInfo?.hotelInformation?.hotelName || ""
                : "",
            }
          default:
            return updatedVal
        }
      } else {
        return item
      }
    })
    setSelectProduct(updatedValues)
  }

  const fetchSignatureHampersList = () => {
    let filterSignatureHamper = (
      hamperFormData?.hamperNamesList?.length > 0 ? hamperFormData : hampersData
    )?.hamperNamesList?.map((obj: any) => {
      const resultSet = obj.hamperName?.filter(
        (name: any) =>
          !selectProduct?.some(
            (item) => item?.productName === name?.hamper && obj.signatureHamper === item?.signatureHamper,
          ),
      )
      const checkList = obj.hamperName?.map((val: any) => {
        return {
          ...val,
          disabled: selectProduct?.some(
            (i) => i?.productName?.includes(val?.hamper) && obj.signatureHamper === i?.signatureHamper,
          )
            ? true
            : false,
        }
      })
      return {
        ...obj,
        hamperName: checkList,
        disabled: resultSet?.length > 0 ? false : true,
      }
    })
    return filterSignatureHamper
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

  const productName = data?.productName
  const placeholder = props?.items?.[0]?.items
  const matchedItem = productErrors.find((item: any) => item?.id === data?.id)

  return (
    <MainBox $quantityErrorMessage={matchedItem?.productQuantity}>
      <FormsWrapper
        sx={{
          maxWidth: selectProduct?.length > 1 && isMobile ? MobilePxToVw(382) : "initial",
        }}>
        {isHamperVariant ? (
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              gap: isMobile ? "6.25vw" : "2.083vw",
              flexDirection: isMobile ? "column" : "row",
            }}>
            <Stack sx={{ flexGrow: 1 }}>
              <EnquireDropDown
                label={placeholder?.[0]?.labelText}
                value={productName || ""}
                name="productName"
                error={matchedItem?.products}
                helperText={placeholder?.[0]?.errorText}
                disable={!!isStaticHamper}
                property={"hamper"}
                items={insertUnExistenceRecord(
                  hamperStore?.selectedHamperInfo?.hotelInformation?.hotelName || "",
                  true,
                  "hamper",
                  Array?.isArray(
                    removeDuplicatesAndSort(
                      fetchSignatureHampersList()?.reduce(
                        (acc: any[], item: any) =>
                          Array?.isArray(item?.hamperName) ? [...acc, ...item?.hamperName] : acc,
                        [],
                      ),
                      "hamper",
                    ),
                  )
                    ? removeDuplicatesAndSort(
                        fetchSignatureHampersList()?.reduce(
                          (acc: any[], item: any) =>
                            Array?.isArray(item?.hamperName) ? [...acc, ...item?.hamperName] : acc,
                          [],
                        ),
                        "hamper",
                      )
                    : [],
                )}
                onChange={(e: any) => {
                  handleSelectedValue(e)
                  const updatedProductError = productErrors.map((product: any) => {
                    if (product?.id === data?.id) {
                      return {
                        ...product,
                        products: false,
                      }
                    } else {
                      return {
                        ...product,
                      }
                    }
                  })
                  setProductErrors(updatedProductError)
                }}
              />
            </Stack>
          </Box>
        ) : (
          <KhazanaFormControl
            variant="standard"
            sx={{
              width: isMobile ? "100%" : "38.75vw",
            }}>
            {productName?.length == 0 && (
              <StyledInputLabel>{`${placeholder?.[0]?.labelText ? placeholder?.[0]?.labelText : "Saree style"} ${
                index + 1
              }`}</StyledInputLabel>
            )}
            <Select
              sx={{
                "& .MuiSelect-nativeInput ": {
                  fontSize: "1.250vw !important",
                },
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
              value={productName}
              key={index}
              name="productName"
              onChange={(e: any) => {
                handleSelectedValue(e)
                const updatedProductError = productErrors.map((product: any) => {
                  if (product?.id === data?.id) {
                    return {
                      ...product,
                      products: false,
                    }
                  } else {
                    return {
                      ...product,
                    }
                  }
                })
                setProductErrors(updatedProductError)
              }}
              renderValue={() => <Typography>{productName}</Typography>}
              IconComponent={(props: any) => <ExpandMoreIcon {...props} />}>
              {productsList?.map((item: any, index: number) => (
                <StyledMenuItem key={index} value={item?.productName}>
                  {item?.productName}
                </StyledMenuItem>
              ))}
            </Select>
            {matchedItem?.products && (
              <StyledErrorMessage>{placeholder?.[0]?.errorText || ERROR_MESSAGES?.EMPTY_PRODUCTS}</StyledErrorMessage>
            )}
          </KhazanaFormControl>
        )}
        <Box>
          <InputTextField
            sx={{
              width: isMobile ? "27.813vw!important" : "6.146vw!important",
            }}
            variant="standard"
            name={"quantity"}
            value={data?.quantity}
            placeholder={
              isHamperVariant
                ? placeholder?.[1]?.labelText ?? "Quantity"
                : placeholder?.[1]?.labelText ?? "Quantity"
                ? placeholder?.[1]?.labelText ?? "Quantity"
                : "Quantity"
            }
            type="number"
            onInput={(e: any) => {
              e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 3)
            }}
            onChange={(e: any) => {
              handleSelectedValue(e)
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
          />
          <StyledErrorMessage>
            {matchedItem?.productQuantity &&
              ((isHamperVariant ? placeholder?.[2]?.errorText : placeholder?.[1]?.errorText) ||
                ERROR_MESSAGES?.EMPTY_PRODUCT_QUANTITY)}
          </StyledErrorMessage>
        </Box>
      </FormsWrapper>
      {selectProduct?.length > 1 && (
        <CloseIcon
          sx={{
            flexGrow: 0,
            flexShrink: 0,
            Width: isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
            height: isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
            fontWeight: 400,
            cursor: "pointer",
            marginTop: isMobile ? "0.781vw" : "",
          }}
          onClick={() => {
            removeThisProduct(data.id)
          }}
        />
      )}
    </MainBox>
  )
}

export default observer(ProductsOfInterest)
