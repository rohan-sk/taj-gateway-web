// react lib imports
import dynamic from "next/dynamic"
export { useRouter } from "next/router"
export { useContext, useEffect, useState, useRef } from "react"

// MUI imports
export {
  Grid,
  Box,
  InputAdornment,
  Select,
  Stack,
  Typography,
  ClickAwayListener,
  IconButton,
  Tooltip,
  styled,
  tooltipClasses,
} from "@mui/material"
export type { TooltipProps } from "@mui/material"
export { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
export { default as KeyboardArrowDownIcon } from "@mui/icons-material/KeyboardArrowDown"

// stores imports
export { UserStore } from "../../../store"
export { GAStore } from "../../../store"
export { observer } from "mobx-react-lite"
export { PageContext } from "../../../PresentationalComponents/lib/prepare-page-context"
export { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
export { default as LoyaltyStore } from "../../../features/loyalty/store/pageStore/loyalty.store"
export { default as LoyaltyGlobalStore } from "../../../features/loyalty/store/globalStore/loyalty-global-store"
export { default as GiftCardStore } from "../../../features/giftCard/store/globalStore/gift-card.store"
export { default as manageGCStore } from "../../../features/giftCard/store/pageStore/manageGC.store"

// utils imports
export { useMobileCheck } from "../../../utils/isMobilView"
export { UseAddress } from "../../../utils/hooks/useAddress"
export { MemberDataLayer } from "../../../utils/analytics/member-data-layer"
export { handleEpicureBeginCheckout } from "../../../utils/analytics/events/Ecommerce/Epicure-Journey/begin-checkout-epicure"
export { useLoggedIn } from "../../../utils/hooks/useLoggedIn"
export { default as DesktopPxToVw, MobilePxToVw } from "../../../utils/DesktopFontCalc"
export const LoadingSpinner = dynamic(() => import("../../../utils/SpinnerComponent"))
export { CalenderIcon } from "../../../utils/customIcons"
export { default as salutationData } from "../../../utils/salutation-json.json"
export { RestrictSpecialChar } from "../../../utils/restrictSpecialChar"
export {
  formatDateEnGB,
  formatDateWithHyphen,
  formatDateWithFullMonth,
  getDateBefore18Years,
  getDateBeforeCentenary,
} from "../../../utils/getDate"
export const CountryCodeDropdown = dynamic(() => import("../../../utils/CountryCodeDropdown"))
export { ROUTES } from "../../../utils/routes"
export { fetchAlertDialogData } from "../../../utils/fetchAlertDialogData"

// lib and hoc imports
export const RenderActionItem = dynamic(() => import("../../hoc/actions/action-items-ui"))
export const CustomCheckBox = dynamic(() =>
  import("../../hoc/CustomCheckBox/Checkbox").then((module) => module.CustomCheckBox),
)
export const PortableText = dynamic(() =>
  import("../../../lib/portable-text-serializers").then((module) => module.PortableText),
)
export { theme } from "../../../lib/theme"
export const CustomDatePickerComponent = dynamic(
  () => import("../../hoc/CustomDatePicker/custom-date-picker.component"),
)
export const BasicModal = dynamic(() => import("../../hoc/modal/modal"))

// json data
export { default as data } from "./formData.json"

// components
export { default as DataClearanceDialog } from "./data-clearance-modal-component"
export const CustomAutoCompleteComponent = dynamic(() => import("../../custom-auto-complete.component"))
export { FormSelectArrowIcon } from "../common/form-components"
export { default as EpicureFormAddress } from "./epicure-form-address.component"
export const AddOnCard = dynamic(() => import("./AddOnCard"))
export const EpicureCheckboxValidations = dynamic(() => import("./epicure-checkbox-validations.component"))
export const EpicureCardEnrollFormUI = dynamic(() => import("./epicure-form-ui.compomponent"))
export { default as TextfieldValidator } from "../../../utils/validations/TextfieldValidator"
export { default as GetDefaultValue } from "../../../utils/validations/getDefaultValue"
export { PincodeServiceability } from "../../../utils/pincode-serviceability"
export { EpicureFormInitialValues } from "./epicure-form-initial-values.component"

// interface
export type {
  epicureCardInterface,
  AddOnCardInterface,
  epicureCardAddressInterface,
  DefaultValuesInterface,
  InitialValuesInterface,
  cardsWithCardInterface,
  formDisableInitialValues,
  initialErrorInterface,
  initialSelectStateInterface,
} from "./loyalty-form.interface"
export type { ActionProps, aestheticItems, parameterMapItems } from "../../types"

// constants
export {
  lastName,
  firstName,
  senderEmail,
  receiverMobile,
  addOnEmail,
  addOnLastName,
  addOnMobile,
  GSTNo,
  pinCode,
  address,
  Error_icon,
  PLACEHOLDERS,
  TOOL_TIP_ICON,
  addOnFirstName,
} from "../gift-card-form/constants"
export { ICONS, CONSTANTS } from "../../constants"

// styles
export {
  FourRowGrid,
  FirstRowGrid,
  StyledWrapper,
  StyledMenuItem,
  MobileNumberWrapper,
  ErrorMessageTypography,
  EpicureCartFormControl,
  EpicureCartFormLabel,
  InputTextFieldEpicure,
  TentativeDateContainer,
  BoxCustom,
  AddOnFormControl,
  AddOnMainGrid,
  FlexWrapper,
  ThreeRowGrid,
  CheckBoxWrapper,
  StyledFormControl,
  LoyaltyStyledSelect,
  GridContainerWrapper,
  StackDataStyle,
  StackData,
} from "./form-styles"
export { AutoCompleteInput } from "../gift-card-form/styles"
