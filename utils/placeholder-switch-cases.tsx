export const PlaceholderUtil = (parameter: any, setPlaceholder: any) => {
  const placeholderValues = parameter?.map((placeholder: any) => {
    switch (placeholder?.key) {
      case "firstNameTextField":
        return setPlaceholder((prev: any) => {
          return {
            ...prev,
            firstName: placeholder?.value,
          }
        })
      case "lastNameTextField":
        return setPlaceholder((prev: any) => {
          return {
            ...prev,
            lastName: placeholder?.value,
          }
        })
      case "emailTextField":
        return setPlaceholder((prev: any) => {
          return {
            ...prev,
            email: placeholder?.value,
          }
        })
      case "confirmTextField":
        return setPlaceholder((prev: any) => {
          return {
            ...prev,
            confirmEmail: placeholder?.value,
          }
        })
      case "phoneNoDropdown":
        return setPlaceholder((prev: any) => {
          return {
            ...prev,
            phoneNumber: placeholder?.value,
          }
        })
      case "CalendarDOB":
        return setPlaceholder((prev: any) => {
          return {
            ...prev,
            DOB: placeholder?.value,
          }
        })
      case "salutationDropdown":
        return setPlaceholder((prev: any) => {
          return {
            ...prev,
            salutations: placeholder?.value,
          }
        })
      case "genderDropdown":
        return setPlaceholder((prev: any) => {
          return {
            ...prev,
            gender: placeholder?.value,
          }
        })
      case "addressTextField":
        return setPlaceholder((prev: any) => {
          return {
            ...prev,
            address: placeholder?.value,
          }
        })
      case "countryDropdown":
        return setPlaceholder((prev: any) => {
          return {
            ...prev,
            country: placeholder?.value,
          }
        })
      case "stateDropdown":
        return setPlaceholder((prev: any) => {
          return {
            ...prev,
            state: placeholder?.value,
          }
        })
      case "cityTextField":
        return setPlaceholder((prev: any) => {
          return {
            ...prev,
            city: placeholder?.value,
          }
        })
      case "pincodeDropdown":
        return setPlaceholder((prev: any) => {
          return {
            ...prev,
            pincode: placeholder?.value,
          }
        })
      case "mobileLabel":
        return setPlaceholder((prev: any) => {
          return {
            ...prev,
            label: placeholder?.value,
          }
        })
      case "checkBox":
        return setPlaceholder((prev: any) => {
          return {
            ...prev,
            terms: placeholder?.value,
          }
        })
      case "emailHintText":
        return setPlaceholder((prev: any) => {
          return {
            ...prev,
            emailHintText: placeholder?.value,
          }
        })
      case "cityDropdown":
        return setPlaceholder((prev: any) => {
          return {
            ...prev,
            city: placeholder?.value,
          }
        })
      case "addOnCheckBox":
        return setPlaceholder((prev: any) => {
          return {
            ...prev,
            checkboxValue: placeholder?.value,
          }
        })
      case "confirmTextField":
        return setPlaceholder((prev: any) => {
          return {
            ...prev,
            confirmTextField: placeholder?.value,
          }
        })
      case "passwordLabel":
        return setPlaceholder((prev: any) => {
          return {
            ...prev,
            label: placeholder?.value,
          }
        })
      case "checkBoxLabel":
        return setPlaceholder((prev: any) => {
          return {
            ...prev,
            checkbox: placeholder?.value,
          }
        })
      case "fullNameTextField":
        return setPlaceholder((prev: any) => {
          return {
            ...prev,
            name: placeholder?.value,
          }
        })
      case "displayNameTextField":
        return setPlaceholder((prev: any) => {
          return {
            ...prev,
            firstName: placeholder?.value,
          }
        })
      case "emailTextField":
        return setPlaceholder((prev: any) => {
          return {
            ...prev,
            email: placeholder?.value,
          }
        })
      case "phoneTextfield":
        return setPlaceholder((prev: any) => {
          return {
            ...prev,
            phone: placeholder?.value,
          }
        })
      case "dobTextfield":
        return setPlaceholder((prev: any) => {
          return {
            ...prev,
            dob: placeholder?.value,
          }
        })
      case "selectNationality":
        return setPlaceholder((prev: any) => {
          return {
            ...prev,
            country: placeholder?.value,
          }
        })
      case "selectGender":
        return setPlaceholder((prev: any) => {
          return {
            ...prev,
            gender: placeholder?.value,
          }
        })
      case "addressTextField":
        return setPlaceholder((prev: any) => {
          return {
            ...prev,
            address: placeholder?.value,
          }
        })
      case "countryTooltip":
        return setPlaceholder((prev: any) => {
          return {
            ...prev,
            countryTooltip: placeholder?.value,
          }
        })
    }
  })
}
